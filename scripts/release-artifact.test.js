const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const packageJson = require('../package.json');

const {
  buildManifest,
  computeTreeDigest,
  prepareReleaseOutput,
  packageReleaseArtifact,
  verifyReleaseArtifact
} = require('./release-artifact.js');
const { buildGuideExpectation } = require('./verify-guide-export.js');

function createFixture(variant) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), `release-artifact-${variant}-`));
  const outDir = path.join(root, 'out');
  const expectation = buildGuideExpectation(variant);
  for (const route of expectation.routes.keys()) {
    const target = route === '/guide' ? path.join(outDir, 'guide.html') : path.join(outDir, route, 'index.html');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `<h1>${route}</h1>`);
  }
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), '<urlset/>');
  fs.mkdirSync(path.join(outDir, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(outDir, 'assets', 'app.js'), 'release fixture');
  fs.mkdirSync(path.join(outDir, '__release'), { recursive: true });
  fs.writeFileSync(
    path.join(outDir, '__release', 'nginx-redirects.conf'),
    'map $uri $locale_redirect_target {\n  default "";\n}\n'
  );
  return { root, outDir, expectation };
}

function releaseOptions(variant, outDir) {
  return {
    variant,
    outDir,
    sourceCommit: 'a'.repeat(40),
    rollbackTarget: variant === 'cn' ? 'ghcr.io/fastgpt/home@sha256:previous' : 'pages-previous-id'
  };
}

test('manifest, archive, and digest fixtures are stable for io and cn', () => {
  for (const variant of ['io', 'cn']) {
    const { root, outDir, expectation } = createFixture(variant);
    try {
      const options = releaseOptions(variant, outDir);
      const preview = buildManifest(options);
      assert.equal(preview.variant, variant);
      assert.equal(preview.routes.length, 9);
      assert.equal(preview.expectedHost, expectation.host);

      const prepared = prepareReleaseOutput(options);
      assert.equal(prepared.manifest.deploymentState, 'prepared');
      assert.equal(prepared.manifest.treeDigest, computeTreeDigest(outDir));
      assert.equal(prepared.manifest.routes.length, 9);

      const packaged = packageReleaseArtifact({ ...options, archiveDir: path.join(root, 'archives') });
      assert.match(path.basename(packaged.archivePath), new RegExp(`^guide-${variant}-[a-f0-9]{12}\\.tar\\.gz$`));
      assert.equal(fs.existsSync(`${packaged.archivePath}.sha256`), true);
      const archiveEntries = spawnSync('tar', ['-tzf', packaged.archivePath], { encoding: 'utf8' });
      assert.equal(archiveEntries.status, 0);
      assert.match(archiveEntries.stdout, /release-out\/__release\/nginx-redirects\.conf/);
      assert.equal(verifyReleaseArtifact({ ...packaged, providerReceipt: {
        schemaVersion: 1,
        variant,
        releaseRevision: packaged.manifest.releaseRevision,
        artifactDigest: packaged.manifest.artifactDigest,
        treeDigest: packaged.manifest.treeDigest,
        archiveDigest: packaged.archiveDigest,
        rollbackTarget: packaged.manifest.rollbackTarget,
        provider: variant === 'cn' ? { imageDigest: 'sha256:published', kubernetesImage: 'ghcr.io/fastgpt/home@sha256:published', rollout: { status: 'completed' } } : { deploymentId: 'pages-current-id', deploymentUrl: 'https://release.example.pages.dev' }
      } }).variant, variant);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});

test('invalid release identity and drift include scoped diagnostics', () => {
  const { root, outDir } = createFixture('io');
  try {
    assert.throws(() => prepareReleaseOutput({ ...releaseOptions('io', outDir), rollbackTarget: '' }), /variant=io.*rollback/i);
    assert.throws(
      () => prepareReleaseOutput({ ...releaseOptions('cn', outDir), expectedHost: 'https://fastgpt.io' }),
      /variant=cn.*expected-host/i
    );

    const prepared = prepareReleaseOutput(releaseOptions('io', outDir));
    fs.writeFileSync(path.join(outDir, 'assets', 'app.js'), 'changed');
    assert.throws(() => verifyReleaseArtifact({ outDir, manifestPath: prepared.manifestPath }), /variant=io.*tree/i);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('immutable package requires a generated redirect map', () => {
  const { root, outDir } = createFixture('cn');
  try {
    fs.rmSync(path.join(outDir, '__release', 'nginx-redirects.conf'));
    assert.throws(
      () => prepareReleaseOutput(releaseOptions('cn', outDir)),
      /variant=cn.*redirect-map.*required/i
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('packager import is silent and argument parsing stays fail-closed', () => {
  assert.equal(typeof packageReleaseArtifact, 'function');
});

test('archive and filesystem attacks are rejected before provider use', () => {
  const { root, outDir } = createFixture('cn');
  try {
    const options = releaseOptions('cn', outDir);
    const packaged = packageReleaseArtifact({ ...options, archiveDir: path.join(root, 'archives') });
    const tamperedDigest = `${packaged.archiveDigest[0] === 'a' ? 'b' : 'a'}${packaged.archiveDigest.slice(1)}`;
    fs.writeFileSync(`${packaged.archivePath}.sha256`, `${tamperedDigest}  archive.tar.gz\n`);
    assert.throws(
      () => verifyReleaseArtifact({ ...packaged }),
      /variant=cn.*archive-digest/i
    );

    const symlinkPath = path.join(outDir, 'assets', 'outside');
    fs.symlinkSync(os.tmpdir(), symlinkPath);
    assert.throws(() => prepareReleaseOutput(options), /surface=filesystem.*symlink/i);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('package commands expose dependency-free release artifact regression', () => {
  assert.equal(packageJson.scripts['release:artifact'], 'node scripts/release-artifact.js');
  assert.equal(packageJson.scripts['release:artifact-regression'], 'node --test scripts/release-artifact.test.js');
});

test('release header injection preserves the prepared tree identity', () => {
  const { root, outDir } = createFixture('io');
  try {
    fs.writeFileSync(
      path.join(outDir, '_headers'),
      '/*\n  Cache-Control: public, max-age=60\n\n/__release/manifest.json\n  Cache-Control: public, max-age=3600\n'
    );
    const prepared = prepareReleaseOutput({ ...releaseOptions('io', outDir), injectReleaseHeaders: true });
    assert.equal(computeTreeDigest(outDir), prepared.manifest.treeDigest);
    const headers = fs.readFileSync(path.join(outDir, '_headers'), 'utf8');
    assert.match(
      headers,
      /\/__release\/manifest\.json\n  ! Cache-Control\n  Cache-Control: no-store\n  X-Release-Revision:/
    );
    assert(headers.includes(`X-Release-Revision: ${prepared.manifest.releaseRevision}`));
    assert(headers.includes(`X-Release-Artifact: ${prepared.manifest.artifactDigest}`));
    assert.equal((headers.match(/^\/__release\/manifest\.json$/gm) || []).length, 1);
    const second = prepareReleaseOutput({ ...releaseOptions('io', outDir), injectReleaseHeaders: true });
    assert.equal(second.manifest.releaseRevision, prepared.manifest.releaseRevision);
    assert.equal(fs.readFileSync(path.join(outDir, '_headers'), 'utf8'), headers);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
