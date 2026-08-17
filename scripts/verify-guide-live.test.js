const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { buildExpectedMatrix, runLiveVerification, validateProviderReceipt, parseArgs } = require('./verify-guide-live.js');

async function fixture(variant, hosts) {
  const expected = buildExpectedMatrix()[variant];
  const manifest = { schemaVersion: 1, variant, expectedHost: `https://fastgpt.${variant === 'cn' ? 'cn' : 'io'}`, sourceCommit: 'abcdef1', provider: variant === 'cn' ? 'kubernetes' : 'cloudflare-pages', releaseRevision: `${variant}-revision`, artifactDigest: `${variant}-tree`, treeDigest: `${variant}-tree`, rollbackTarget: `${variant}-rollback` };
  const server = http.createServer((request, response) => {
    const route = request.url;
    if (route === '/sitemap.xml') return response.end(`<urlset>${expected.routes.map((item) => `<loc>${hosts[variant]}${item.route}</loc>`).join('')}</urlset>`);
    if (route === '/__release/manifest.json') { response.setHeader('Cache-Control', 'no-store'); response.setHeader('X-Release-Revision', manifest.releaseRevision); response.setHeader('X-Release-Artifact', manifest.artifactDigest); return response.end(JSON.stringify(manifest)); }
    const page = expected.routes.find((item) => item.route === route);
    if (!page) { response.statusCode = 404; return response.end(); }
    response.setHeader('Cache-Control', 'public, max-age=60'); response.setHeader('X-Release-Revision', manifest.releaseRevision); response.setHeader('X-Release-Artifact', manifest.artifactDigest);
    return response.end(`<h1>${page.h1}</h1><link rel="canonical" href="${hosts[variant]}${route}"><link rel="alternate" hreflang="zh-CN" href="${hosts.cn}${route}"><link rel="alternate" hreflang="en" href="${hosts.io}${route}"><link rel="alternate" hreflang="x-default" href="${hosts.io}${route}"><meta name="robots" content="index,follow">`);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { server, manifest, port: server.address().port };
}

test('live matrix contains nine Guide routes per owned variant', () => {
  const matrix = buildExpectedMatrix();
  assert.equal(matrix.cn.routes.length, 9);
  assert.equal(matrix.io.routes.length, 9);
  assert.equal(matrix.cn.host, 'https://fastgpt.cn');
});

test('provider receipts require actual immutable provider revisions', () => {
  const manifest = { variant: 'cn', releaseRevision: 'revision', artifactDigest: 'tree', treeDigest: 'tree', rollbackTarget: 'previous' };
  assert.throws(() => validateProviderReceipt({}, manifest), /provider receipt/i);
  assert.throws(() => validateProviderReceipt({ schemaVersion: 1, variant: 'cn', releaseRevision: 'revision', artifactDigest: 'tree', treeDigest: 'tree', archiveDigest: 'archive', rollbackTarget: 'previous', provider: {} }, manifest), /image digest/i);
  assert.throws(() => validateProviderReceipt({ schemaVersion: 1, variant: 'cn', releaseRevision: 'revision', artifactDigest: 'tree', treeDigest: 'tree', archiveDigest: 'archive', rollbackTarget: 'previous', provider: { imageDigest: 'sha256:abc', kubernetesImage: 'image@sha256:abc' } }, manifest), /completed rollout/i);
});

test('CLI only accepts baseline mode as an explicit flag', () => {
  assert.equal(parseArgs(['--allow-blocked-baseline']).allowBlockedBaseline, true);
  assert.throws(() => parseArgs(['--unknown']), /unknown/i);
});

test('local 18-page fixture validates SEO, cache, manifest headers, sitemap, and receipts', async () => {
  const hosts = { cn: '', io: '' }; const cn = await fixture('cn', hosts); hosts.cn = `http://127.0.0.1:${cn.port}`; const io = await fixture('io', hosts); hosts.io = `http://127.0.0.1:${io.port}`;
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-live-'));
  try {
    const receipt = (variant, manifest) => ({ schemaVersion: 1, ...manifest, archiveDigest: `${variant}-archive`, provider: variant === 'cn' ? { imageDigest: 'sha256:abc', kubernetesImage: 'image@sha256:abc', rollout: { status: 'completed' } } : { deploymentId: 'pages-id', deploymentUrl: 'https://pages.example' } });
    const cnReceipt = path.join(root, 'cn.json'); const ioReceipt = path.join(root, 'io.json'); fs.writeFileSync(cnReceipt, JSON.stringify(receipt('cn', cn.manifest))); fs.writeFileSync(ioReceipt, JSON.stringify(receipt('io', io.manifest)));
    const result = await runLiveVerification({ baseUrlCn: hosts.cn, baseUrlIo: hosts.io, timeoutMs: 1000, providerEvidence: [cnReceipt, ioReceipt] });
    assert.equal(result.status, 'passed'); assert.equal(result.variants.cn.routes.length + result.variants.io.routes.length, 18); assert.equal(result.variants.io.manifest.headers['cache-control'], 'no-store');
    for (const variant of ['cn', 'io']) {
      assert.equal(result.variants[variant].surfaces['/sitemap.xml'].status, 200);
      assert.equal(result.variants[variant].surfaces['/__release/manifest.json'].status, 200);
      assert.match(result.variants[variant].surfaces['/sitemap.xml'].bodyDigest, /^[a-f0-9]{64}$/);
      assert.equal(result.variants[variant].surfaces['/__release/manifest.json'].headers['cache-control'], 'no-store');
    }
  } finally { fs.rmSync(root, { recursive: true, force: true }); await Promise.all([new Promise((resolve) => cn.server.close(resolve)), new Promise((resolve) => io.server.close(resolve))]); }
});
