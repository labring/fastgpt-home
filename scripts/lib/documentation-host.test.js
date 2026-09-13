const assert = require('node:assert/strict');
const test = require('node:test');

const {
  parseTarget,
  runDocumentationHostContract,
  validateContract
} = require('./documentation-host');

const targets = {
  cn: 'https://docs-cn.example.test',
  io: 'https://docs-io.example.test'
};

function createContract(sample = ['/en/guide/example', '/en/guide/second']) {
  return {
    schemaVersion: 1,
    kind: 'documentation-host-owner-routing',
    repository: { url: 'https://github.com/labring/FastGPT' },
    revision: 'e0adc7c',
    targets,
    englishSample: { expectedCount: sample.length, paths: sample },
    rollback: {
      status: 'ready',
      tested: true,
      previousRevision: 'f7b1a2e',
      restorePaths: ['document/middleware.ts', 'document/app/robots.txt/route.ts']
    }
  };
}

function ownerBody(url) {
  const basePath = url.pathname.replace(/^\/(?:en|zh-CN)(?=\/|$)/, '/en');
  const zhPath = basePath.replace(/^\/en(?=\/|$)/, '/zh-CN');
  return [
    `<link rel="canonical" href="${url.origin}${url.pathname}/">`,
    `<link rel="alternate" hreflang="zh-CN" href="${targets.cn}${zhPath}">`,
    `<link rel="alternate" hreflang="en" href="${targets.io}${basePath}">`
  ].join('');
}

function createFetch({ loseQuery = false, wrongRobots = false, badCanonical = false } = {}) {
  return async (rawUrl) => {
    const url = new URL(rawUrl);
    const isCn = url.origin === targets.cn;
    const isOwner =
      (isCn && url.pathname.startsWith('/zh-CN/')) || (!isCn && url.pathname.startsWith('/en/'));
    const isRedirect =
      (isCn && url.pathname.startsWith('/en/')) || (!isCn && url.pathname.startsWith('/zh-CN/'));

    if (url.pathname === '/robots.txt') {
      const sitemap = wrongRobots ? targets.io : url.origin;
      return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap}/sitemap.xml\n`, {
        status: 200,
        headers: { 'content-type': 'text/plain; charset=utf-8' }
      });
    }
    if (url.pathname === '/sitemap.xml') {
      const sample = createContract().englishSample.paths;
      const paths = isCn ? sample.map((path) => path.replace('/en', '/zh-CN')) : sample;
      const body = paths.map((path) => `<url><loc>${url.origin}${path}</loc></url>`).join('');
      return new Response(`<urlset>${body}</urlset>`, {
        status: 200,
        headers: { 'content-type': 'application/xml; charset=utf-8' }
      });
    }
    if (isRedirect) {
      const locationOrigin = isCn ? targets.io : targets.cn;
      const location = `${locationOrigin}${url.pathname}${loseQuery ? '' : url.search}`;
      return new Response('', { status: 301, headers: { location } });
    }
    if (isOwner) {
      const body = badCanonical ? ownerBody(new URL(`${url.origin}/other`)) : ownerBody(url);
      return new Response(body, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' }
      });
    }
    return new Response('missing', { status: 404, headers: { 'content-type': 'text/plain' } });
  };
}

test('documentation host contract validates targets and sample paths', () => {
  assert.throws(() => parseTarget('http://docs.example.test', 'cn target'), /HTTPS/);
  assert.throws(() => parseTarget('https://localhost', 'cn target'), /public hostname/);
  assert.throws(
    () => validateContract(createContract(['/zh-CN/example']), targets),
    /locale prefix/
  );
  assert(
    validateContract({ ...createContract(), rollback: undefined }, targets).blockers.some(
      ({ code }) => code === 'documentation-host-rollback-missing'
    )
  );
});

test('documentation host runner checks owner pages, direct redirects, robots, sitemap, and rollback', async () => {
  const originalFetch = global.fetch;
  global.fetch = createFetch();
  try {
    const contract = createContract();
    const result = await runDocumentationHostContract({
      cnTarget: targets.cn,
      ioTarget: targets.io,
      contract
    });
    assert.equal(result.status, 'passed');
    assert.equal(result.englishSampleCount, 2);
    assert.deepEqual(result.ownerRouteCounts, { cn: 2, io: 2 });
    assert.equal(result.checks.length, 2 * 2 + 2 * 2 + 2 * 2);
    assert(result.checks.every((check) => check.status === 'passed'));

    const externalRollbackResult = await runDocumentationHostContract({
      targets,
      contract: { ...contract, rollback: undefined },
      rollback: contract.rollback
    });
    assert.equal(externalRollbackResult.status, 'passed');
  } finally {
    global.fetch = originalFetch;
  }
});

test('documentation host runner catches query loss, canonical drift, and foreign robots sitemap', async () => {
  const originalFetch = global.fetch;
  try {
    for (const options of [{ loseQuery: true }, { badCanonical: true }, { wrongRobots: true }]) {
      global.fetch = createFetch(options);
      const result = await runDocumentationHostContract({
        cnTarget: targets.cn,
        ioTarget: targets.io,
        contract: createContract()
      });
      assert.equal(result.status, 'blocked');
      assert(result.checks.some((check) => check.status === 'blocked'));
    }
  } finally {
    global.fetch = originalFetch;
  }
});
