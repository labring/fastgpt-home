const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const {
  buildExpectedMatrix,
  loadExpectedManifests,
  runLiveVerification,
  validateProviderReceipt,
  parseArgs
} = require('./verify-guide-live.js');

async function fixture(variant, hosts) {
  const expected = buildExpectedMatrix()[variant];
  const manifest = {
    schemaVersion: 1,
    variant,
    expectedHost: `https://fastgpt.${variant === 'cn' ? 'cn' : 'io'}`,
    sourceCommit: 'abcdef1',
    provider: variant === 'cn' ? 'kubernetes' : 'cloudflare-pages',
    releaseRevision: `${variant}-revision`,
    artifactDigest: `${variant}-tree`,
    treeDigest: `${variant}-tree`,
    rollbackTarget: `${variant}-rollback`
  };
  const releaseHeaders = {
    releaseRevision: manifest.releaseRevision,
    artifactDigest: manifest.artifactDigest
  };
  const server = http.createServer((request, response) => {
    const route = request.url;
    if (route === '/sitemap.xml')
      return response.end(
        `<urlset>${expected.routes
          .map((item) => `<loc>${hosts[variant]}${item.route}</loc>`)
          .join('')}</urlset>`
      );
    if (route === '/__release/manifest.json') {
      response.setHeader('Cache-Control', 'no-store');
      response.setHeader('X-Release-Revision', manifest.releaseRevision);
      response.setHeader('X-Release-Artifact', manifest.artifactDigest);
      return response.end(JSON.stringify(manifest));
    }
    const page = expected.routes.find((item) => item.route === route);
    if (!page) {
      response.statusCode = 404;
      return response.end();
    }
    response.setHeader('Cache-Control', 'public, max-age=60');
    if (releaseHeaders.releaseRevision)
      response.setHeader('X-Release-Revision', releaseHeaders.releaseRevision);
    if (releaseHeaders.artifactDigest)
      response.setHeader('X-Release-Artifact', releaseHeaders.artifactDigest);
    const escapedH1 = page.h1
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
    return response.end(
      `<h1>${escapedH1}</h1><link rel="canonical" href="${hosts[variant]}${route}"><link rel="alternate" hreflang="zh-CN" href="${hosts.cn}${route}"><link rel="alternate" hreflang="en" href="${hosts.io}${route}"><link rel="alternate" hreflang="x-default" href="${hosts.io}${route}"><meta name="robots" content="index,follow">`
    );
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  manifest.expectedHost = `http://127.0.0.1:${server.address().port}`;
  return { server, manifest, releaseHeaders, port: server.address().port };
}

test('live matrix contains nine Guide routes per owned variant', () => {
  const matrix = buildExpectedMatrix();
  assert.equal(matrix.cn.routes.length, 9);
  assert.equal(matrix.io.routes.length, 9);
  assert.equal(matrix.cn.host, 'https://fastgpt.cn');
});

test('provider receipts require actual immutable provider revisions', () => {
  const manifest = {
    variant: 'cn',
    releaseRevision: 'revision',
    artifactDigest: 'tree',
    treeDigest: 'tree',
    rollbackTarget: 'previous'
  };
  assert.throws(() => validateProviderReceipt({}, manifest), /provider receipt/i);
  assert.throws(
    () =>
      validateProviderReceipt(
        {
          schemaVersion: 1,
          variant: 'cn',
          releaseRevision: 'revision',
          artifactDigest: 'tree',
          treeDigest: 'tree',
          archiveDigest: 'archive',
          rollbackTarget: 'previous',
          provider: {}
        },
        manifest
      ),
    /image digest/i
  );
  assert.throws(
    () =>
      validateProviderReceipt(
        {
          schemaVersion: 1,
          variant: 'cn',
          releaseRevision: 'revision',
          artifactDigest: 'tree',
          treeDigest: 'tree',
          archiveDigest: 'archive',
          rollbackTarget: 'previous',
          provider: { imageDigest: 'sha256:abc', kubernetesImage: 'image@sha256:abc' }
        },
        manifest
      ),
    /completed rollout/i
  );
});

test('IO first publish keeps the initial-production rollback sentinel', () => {
  const manifest = {
    schemaVersion: 1,
    variant: 'io',
    releaseRevision: 'revision',
    artifactDigest: 'tree',
    treeDigest: 'tree',
    rollbackTarget: 'initial-production'
  };
  const receipt = {
    schemaVersion: 1,
    variant: 'io',
    releaseRevision: 'revision',
    artifactDigest: 'tree',
    treeDigest: 'tree',
    archiveDigest: 'archive',
    rollbackTarget: 'initial-production',
    provider: {
      deploymentId: 'new-pages-id',
      deploymentUrl: 'https://new-pages.example',
      previousDeploymentUrl: null
    }
  };
  assert.doesNotThrow(() => validateProviderReceipt(receipt, manifest));
});

test('CLI only accepts baseline mode as an explicit flag', () => {
  assert.equal(parseArgs(['--allow-blocked-baseline']).allowBlockedBaseline, true);
  assert.equal(parseArgs(['--manifest', 'manifest.json']).manifest, 'manifest.json');
  assert.throws(() => parseArgs(['--unknown']), /unknown/i);
});

test('expected manifest loader accepts single and dual-variant files', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-manifest-'));
  try {
    const cn = { variant: 'cn' };
    const single = path.join(root, 'single.json');
    const dual = path.join(root, 'dual.json');
    fs.writeFileSync(single, JSON.stringify(cn));
    fs.writeFileSync(dual, JSON.stringify({ variants: { cn, io: { variant: 'io' } } }));
    assert.deepEqual(loadExpectedManifests(single), { cn });
    assert.deepEqual(Object.keys(loadExpectedManifests(dual)), ['cn', 'io']);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('local 18-page fixture validates SEO, cache, manifest headers, sitemap, and receipts', async () => {
  const hosts = { cn: '', io: '' };
  const cn = await fixture('cn', hosts);
  hosts.cn = `http://127.0.0.1:${cn.port}`;
  const io = await fixture('io', hosts);
  hosts.io = `http://127.0.0.1:${io.port}`;
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-live-'));
  try {
    const receipt = (variant, manifest) => ({
      schemaVersion: 1,
      ...manifest,
      archiveDigest: `${variant}-archive`,
      provider:
        variant === 'cn'
          ? {
              imageDigest: 'sha256:abc',
              kubernetesImage: 'image@sha256:abc',
              rollout: { status: 'completed' }
            }
          : { deploymentId: 'pages-id', deploymentUrl: 'https://pages.example' }
    });
    const cnReceipt = path.join(root, 'cn.json');
    const ioReceipt = path.join(root, 'io.json');
    fs.writeFileSync(cnReceipt, JSON.stringify(receipt('cn', cn.manifest)));
    fs.writeFileSync(ioReceipt, JSON.stringify(receipt('io', io.manifest)));
    const manifestPath = path.join(root, 'manifest.json');
    const writeManifest = (overrides = {}) =>
      fs.writeFileSync(
        manifestPath,
        JSON.stringify({
          variants: {
            cn: { ...cn.manifest, ...overrides.cn },
            io: { ...io.manifest, ...overrides.io }
          }
        })
      );
    writeManifest();
    const options = {
      baseUrlCn: hosts.cn,
      baseUrlIo: hosts.io,
      timeoutMs: 1000,
      providerEvidence: [cnReceipt, ioReceipt],
      manifest: manifestPath
    };
    const result = await runLiveVerification(options);
    assert.equal(result.status, 'passed');
    assert.equal(result.variants.cn.routes.length + result.variants.io.routes.length, 18);
    assert.equal(result.variants.io.manifest.headers['cache-control'], 'no-store');
    for (const variant of ['cn', 'io']) {
      assert.equal(result.variants[variant].surfaces['/sitemap.xml'].status, 200);
      assert.equal(result.variants[variant].surfaces['/__release/manifest.json'].status, 200);
      assert.match(result.variants[variant].surfaces['/sitemap.xml'].bodyDigest, /^[a-f0-9]{64}$/);
      assert.equal(
        result.variants[variant].surfaces['/__release/manifest.json'].headers['cache-control'],
        'no-store'
      );
    }
    writeManifest({ cn: { releaseRevision: 'wrong-revision' } });
    const expectedMismatch = await runLiveVerification(options);
    assert.equal(expectedMismatch.status, 'failed');
    assert.match(
      expectedMismatch.variants.cn.failures.join('\n'),
      /releaseRevision differs from expected manifest/
    );

    writeManifest();
    cn.releaseHeaders.releaseRevision = undefined;
    const missingHeader = await runLiveVerification(options);
    assert.equal(missingHeader.status, 'failed');
    assert.match(missingHeader.variants.cn.routes[0].failures.join(','), /release-revision/);

    cn.releaseHeaders.releaseRevision = cn.manifest.releaseRevision;
    cn.releaseHeaders.artifactDigest = 'wrong-artifact';
    const headerMismatch = await runLiveVerification(options);
    assert.equal(headerMismatch.status, 'failed');
    assert.match(headerMismatch.variants.cn.routes[0].failures.join(','), /release-artifact/);

    cn.releaseHeaders.artifactDigest = cn.manifest.artifactDigest;
    cn.manifest.expectedHost = 'https://wrong.example';
    const mismatch = await runLiveVerification(options);
    assert.equal(mismatch.status, 'failed');
    assert.match(
      mismatch.variants.cn.failures.join('\n'),
      /manifest:\[verify-guide-live\] manifest schema\/variant\/host mismatch/
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
    await Promise.all([
      new Promise((resolve) => cn.server.close(resolve)),
      new Promise((resolve) => io.server.close(resolve))
    ]);
  }
});
