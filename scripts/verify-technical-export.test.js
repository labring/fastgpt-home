const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const {
  getTechIdentities,
  parseNginxRedirectMap,
  writeCloudflareWorker,
  writeNginxRedirectMap
} = require('./lib/redirects');
const { verifyTechnicalExport } = require('./verify-technical-export');
const TECHNICAL_CONTENT_POLICY = require('../src/lib/technical-content-policy.json');

const root = path.resolve(__dirname, '..');
const baseUrls = { cn: 'https://fastgpt.cn', io: 'https://fastgpt.io' };
const EXPECTED_TECHNICAL_PAGE_COUNT = TECHNICAL_CONTENT_POLICY.expectedPageCount;

test('technical identities are unique and retain their owner-relative paths', () => {
  const identities = getTechIdentities(root);
  assert.equal(identities.length, EXPECTED_TECHNICAL_PAGE_COUNT);
  assert.equal(new Set(identities.map((identity) => identity.key)).size, identities.length);
  assert.equal(identities[0].sourcePath, '/zh/tutorial/private-deployment-topology');
  assert.equal(identities[0].canonicalPath, '/tutorial/private-deployment-topology');
});

test('technical export verifier accepts a complete China projection', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-export-'));
  const outDir = path.join(tempRoot, 'out');
  const nextDir = path.join(tempRoot, '.next');
  fs.mkdirSync(outDir, { recursive: true });

  try {
    const identities = getTechIdentities(root);
    const sitemap = [];
    for (const identity of identities) {
      const canonical = `${baseUrls.cn}${identity.canonicalPath}`;
      const routePath = path.join(outDir, `${identity.canonicalPath.slice(1)}.html`);
      fs.mkdirSync(path.dirname(routePath), { recursive: true });
      fs.writeFileSync(
        routePath,
        `<link rel="canonical" href="${canonical}"><meta name="robots" content="index, follow"><script>{"url":"${canonical}"}</script>`
      );
      sitemap.push(`<url><loc>${canonical}</loc></url>`);
    }

    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), `<urlset>${sitemap.join('')}</urlset>`);
    writeCloudflareWorker(outDir, new Map(), false);
    writeNginxRedirectMap(nextDir, new Map());

    assert.deepEqual(
      verifyTechnicalExport({
        outDir,
        nextDir,
        variant: 'cn',
        env: {
          NEXT_PUBLIC_CN_HOME_URL: baseUrls.cn,
          NEXT_PUBLIC_IO_HOME_URL: baseUrls.io
        }
      }),
      { count: EXPECTED_TECHNICAL_PAGE_COUNT, variant: 'cn' }
    );
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('redirect fixtures preserve query strings for Worker and Nginx targets', async () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-redirect-'));
  const outDir = path.join(tempRoot, 'out');
  const nextDir = path.join(tempRoot, '.next');
  const identity = getTechIdentities(root).find((entry) => entry.locale === 'zh');
  const target = `${baseUrls.cn}${identity.canonicalPath}`;
  const redirects = new Map([[identity.sourcePath, target]]);

  try {
    fs.mkdirSync(outDir, { recursive: true });
    writeCloudflareWorker(outDir, redirects, false);
    writeNginxRedirectMap(nextDir, redirects);

    const workerModule = { exports: {} };
    const workerSource = fs.readFileSync(path.join(outDir, '_worker.js'), 'utf8');
    vm.runInNewContext(workerSource.replace('export default', 'module.exports ='), {
      URL,
      Response: {
        redirect(url, status) {
          return { location: String(url), status };
        }
      },
      module: workerModule
    });
    const workerResponse = await workerModule.exports.fetch(
      { url: `https://fastgpt.io${identity.sourcePath}?utm_source=release&x=1` },
      {}
    );
    assert.deepEqual(workerResponse, { location: `${target}?utm_source=release&x=1`, status: 301 });

    const nginxRedirects = parseNginxRedirectMap(
      fs.readFileSync(path.join(nextDir, 'nginx-redirects.conf'), 'utf8')
    );
    assert.equal(nginxRedirects.get(identity.sourcePath), target);
    assert.match(
      fs.readFileSync(path.join(root, 'nginx.conf'), 'utf8'),
      /return 301 \$locale_redirect_target\$is_args\$args;/
    );
    assert.equal(
      new URL(`${nginxRedirects.get(identity.sourcePath)}?utm_source=release&x=1`).href,
      `${target}?utm_source=release&x=1`
    );
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});
