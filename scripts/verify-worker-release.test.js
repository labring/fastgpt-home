const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { inspectWorkerAssets, verifyWorkerArtifact } = require('./lib/worker-publication');

function createWorkerArtifact({ assetsIgnore = '/_worker.js\n', legacyRedirects = false } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-worker-artifact-'));
  const outDir = path.join(root, 'out');
  fs.mkdirSync(outDir);
  for (const file of ['index.html', '404.html', 'robots.txt', 'sitemap.xml']) {
    fs.writeFileSync(path.join(outDir, file), file);
  }
  fs.writeFileSync(path.join(outDir, '_worker.js'), 'export default { fetch() {} };');
  fs.writeFileSync(path.join(outDir, '.assetsignore'), assetsIgnore);
  if (legacyRedirects) fs.writeFileSync(path.join(outDir, '_redirects'), '');
  const configPath = path.join(root, 'wrangler.json');
  fs.writeFileSync(
    configPath,
    JSON.stringify({
      name: 'fastgpt-io-worker',
      main: './out/_worker.js',
      compatibility_date: '2026-09-23',
      workers_dev: true,
      assets: {
        directory: './out',
        binding: 'ASSETS',
        run_worker_first: true,
        not_found_handling: '404-page'
      }
    })
  );
  return { root, outDir, configPath };
}

test('Worker artifact validates its deployment contract and hides the entrypoint', () => {
  const fixture = createWorkerArtifact();
  try {
    const result = verifyWorkerArtifact({ ...fixture, wranglerVersion: '4.136.3' });
    assert.equal(result.assetCount, 4);
    assert.equal(result.largestAssetBytes, 'sitemap.xml'.length);
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
});

test('Worker artifact rejects a public entrypoint, legacy redirects, and unsupported Wrangler', () => {
  const exposed = createWorkerArtifact({ assetsIgnore: '' });
  const legacy = createWorkerArtifact({ legacyRedirects: true });
  const oldWrangler = createWorkerArtifact();
  try {
    assert.throws(
      () => verifyWorkerArtifact({ ...exposed, wranglerVersion: '4.136.3' }),
      /\.assetsignore.*_worker\.js/i
    );
    assert.throws(
      () => verifyWorkerArtifact({ ...legacy, wranglerVersion: '4.136.3' }),
      /legacy.*_redirects/i
    );
    assert.throws(
      () => verifyWorkerArtifact({ ...oldWrangler, wranglerVersion: '4.33.9' }),
      /Wrangler 4\.34\.0 or newer/
    );
  } finally {
    for (const fixture of [exposed, legacy, oldWrangler]) {
      fs.rmSync(fixture.root, { recursive: true, force: true });
    }
  }
});

test('Worker Static Assets enforce both file-count and largest-file limits', () => {
  assert.deepEqual(
    inspectWorkerAssets(
      [
        { path: 'index.html', bytes: 20 },
        { path: 'robots.txt', bytes: 10 }
      ],
      2,
      20
    ),
    { assetCount: 2, largestAssetBytes: 20, largestAssetPath: 'index.html' }
  );
  assert.throws(
    () =>
      inspectWorkerAssets(
        [
          { path: 'a', bytes: 1 },
          { path: 'b', bytes: 1 }
        ],
        1,
        10
      ),
    /contain 2 files; limit is 1/
  );
  assert.throws(
    () => inspectWorkerAssets([{ path: 'large.bin', bytes: 11 }], 1, 10),
    /large\.bin is 11 bytes; limit is 10/
  );
});
