const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { load } = require('js-yaml');
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

test('Worker artifact accepts relative export and configuration paths', () => {
  const fixture = createWorkerArtifact();
  try {
    const result = verifyWorkerArtifact({
      outDir: path.relative(process.cwd(), fixture.outDir),
      configPath: path.relative(process.cwd(), fixture.configPath),
      wranglerVersion: '4.136.3'
    });
    assert.equal(result.assetCount, 4);
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

test('Worker artifact rejects extra ignore rules and untrusted Wrangler settings', () => {
  const extraIgnore = createWorkerArtifact({ assetsIgnore: '_worker.js\n!_worker.js\n' });
  const extraConfig = createWorkerArtifact();
  const trustedConfig = path.join(extraConfig.root, 'trusted-wrangler.json');
  try {
    fs.writeFileSync(
      path.join(extraConfig.root, 'wrangler.json'),
      JSON.stringify({
        name: 'fastgpt-io-worker',
        main: './out/_worker.js',
        compatibility_date: '2026-09-23',
        workers_dev: true,
        build: { command: 'echo unsafe' },
        assets: {
          directory: './out',
          binding: 'ASSETS',
          run_worker_first: true,
          not_found_handling: '404-page'
        }
      })
    );
    fs.copyFileSync(path.join(extraConfig.root, 'wrangler.json'), trustedConfig);
    fs.writeFileSync(
      trustedConfig,
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
    assert.throws(
      () => verifyWorkerArtifact({ ...extraIgnore, wranglerVersion: '4.136.3' }),
      /contain only the _worker\.js exclusion/
    );
    assert.throws(
      () =>
        verifyWorkerArtifact({
          ...extraConfig,
          trustedConfigPath: trustedConfig,
          wranglerVersion: '4.136.3'
        }),
      /differs from the trusted publication profile/
    );
  } finally {
    fs.rmSync(extraIgnore.root, { recursive: true, force: true });
    fs.rmSync(extraConfig.root, { recursive: true, force: true });
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

test('Worker release uses its dedicated environment credential', () => {
  const workflowPath = path.join(
    __dirname,
    '..',
    '.github/workflows/international-worker-release.yml'
  );
  const workflowSource = fs.readFileSync(workflowPath, 'utf8');
  const workflow = load(workflowSource);
  const job = workflow.jobs.deploy;
  const credentialSteps = job.steps.filter((step) => step.env?.CLOUDFLARE_API_TOKEN);

  assert.equal(job.environment, 'international-worker-production');
  assert.equal(credentialSteps.length, 2);
  for (const step of credentialSteps) {
    assert.equal(step.env.CLOUDFLARE_API_TOKEN, '${{ secrets.CLOUDFLARE_WORKER_API_TOKEN }}');
    assert.equal(step.env.CLOUDFLARE_ACCOUNT_ID, '${{ vars.CLOUDFLARE_ACCOUNT_ID }}');
  }
  assert.doesNotMatch(workflowSource, /secrets\.CLOUDFLARE_API_TOKEN/);
});
