const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { directoryInventory } = require('./release-readiness');

// Gate against the Workers Free limit until the release account's plan is part of the contract.
const WORKER_ASSET_FILE_LIMIT = 20_000;
const WORKER_ASSET_SIZE_LIMIT = 25 * 1024 * 1024;

/** Enforce the Workers Static Assets file-count and largest-file size limits. */
function inspectWorkerAssets(
  assets,
  fileLimit = WORKER_ASSET_FILE_LIMIT,
  sizeLimit = WORKER_ASSET_SIZE_LIMIT
) {
  assert(assets.length > 0, 'Worker Static Assets inventory is empty');
  assert(
    assets.length <= fileLimit,
    `Worker Static Assets contain ${assets.length} files; limit is ${fileLimit}`
  );
  const largestAsset = assets.reduce(
    (largest, entry) => (entry.bytes > largest.bytes ? entry : largest),
    { path: '', bytes: 0 }
  );
  assert(
    largestAsset.bytes <= sizeLimit,
    `Worker Static Asset ${largestAsset.path} is ${largestAsset.bytes} bytes; limit is ${sizeLimit}`
  );
  return {
    assetCount: assets.length,
    largestAssetBytes: largestAsset.bytes,
    largestAssetPath: largestAsset.path
  };
}

/** Require a pinned Wrangler 4.x version with Workers Static Assets support. */
function verifyWranglerVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version || '');
  assert(match, `Wrangler must use an exact 4.x version, received ${version || '<missing>'}`);
  const major = Number(match[1]);
  const minor = Number(match[2]);
  assert(
    major === 4 && minor >= 34,
    `Worker Static Assets requires Wrangler 4.34.0 or newer, received ${version}`
  );
}

/** Verify a Worker Static Assets export, Wrangler configuration, and public asset boundary. */
function verifyWorkerArtifact({ outDir, configPath, wranglerVersion, requireSitemap = true }) {
  verifyWranglerVersion(wranglerVersion);
  const resolvedOutDir = path.resolve(outDir);
  const resolvedConfigPath = path.resolve(configPath);
  const workerPath = path.join(resolvedOutDir, '_worker.js');
  const ignorePath = path.join(resolvedOutDir, '.assetsignore');
  const config = JSON.parse(fs.readFileSync(resolvedConfigPath, 'utf8'));

  for (const file of [
    'index.html',
    '404.html',
    'robots.txt',
    ...(requireSitemap ? ['sitemap.xml'] : []),
    '_worker.js',
    '.assetsignore'
  ]) {
    assert(
      fs.statSync(path.join(resolvedOutDir, file)).isFile(),
      `Missing Worker publication file: ${file}`
    );
  }
  assert(fs.statSync(workerPath).size > 0, 'Generated Worker entrypoint is empty');
  assert(
    fs
      .readFileSync(ignorePath, 'utf8')
      .split(/\r?\n/)
      .some((entry) => entry.trim() === '/_worker.js' || entry.trim() === '_worker.js'),
    'Static Assets .assetsignore must exclude _worker.js'
  );
  assert(
    !fs.existsSync(path.join(resolvedOutDir, '_redirects')),
    'Legacy _redirects artifact is present'
  );
  assert.equal(config.name, 'fastgpt-io-worker', 'Unexpected Worker name');
  assert.equal(config.workers_dev, true, 'First-stage publication must use workers.dev');
  assert.equal(config.main, './out/_worker.js', 'Worker entrypoint must come from the export');
  assert.equal(config.assets?.directory, './out', 'Static Assets must use the complete export');
  assert.equal(config.assets?.binding, 'ASSETS', 'Worker must bind Static Assets as ASSETS');
  assert.equal(config.assets?.run_worker_first, true, 'Worker must run before Static Assets');
  assert.equal(
    config.assets?.not_found_handling,
    '404-page',
    'Static Assets must preserve the exported 404 page'
  );
  assert.equal(
    path.resolve(path.dirname(resolvedConfigPath), config.main),
    workerPath,
    'Wrangler entrypoint differs from the exported Worker'
  );
  assert.equal(
    path.resolve(path.dirname(resolvedConfigPath), config.assets.directory),
    resolvedOutDir,
    'Wrangler assets directory differs from the complete export'
  );

  const inventory = directoryInventory(resolvedOutDir, {
    root: resolvedOutDir,
    role: 'worker-static-assets',
    source: 'generated'
  });
  const assets = inventory.files.filter(
    ({ path: relativePath }) => !['_worker.js', '.assetsignore', '_headers'].includes(relativePath)
  );
  return inspectWorkerAssets(assets);
}

module.exports = { inspectWorkerAssets, verifyWorkerArtifact, verifyWranglerVersion };
