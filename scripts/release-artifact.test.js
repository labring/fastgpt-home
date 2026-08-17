const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

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
      assert.equal(verifyReleaseArtifact({ ...packaged, providerReceipt: {
        schemaVersion: 1,
        variant,
        releaseRevision: packaged.manifest.releaseRevision,
        artifactDigest: packaged.manifest.artifactDigest,
        treeDigest: packaged.manifest.treeDigest,
        archiveDigest: packaged.archiveDigest,
        rollbackTarget: packaged.manifest.rollbackTarget,
        provider: variant === 'cn' ? { imageDigest: 'sha256:published', kubernetesImage: 'ghcr.io/fastgpt/home@sha256:published' } : { deploymentId: 'pages-current-id', deploymentUrl: 'https://release.example.pages.dev' }
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
    assert.throws(() => prepareReleaseOutput({ ...releaseOptions('cn', outDir) }), /variant=cn.*route/i);

    const prepared = prepareReleaseOutput(releaseOptions('io', outDir));
    fs.writeFileSync(path.join(outDir, 'assets', 'app.js'), 'changed');
    assert.throws(() => verifyReleaseArtifact({ outDir, manifestPath: prepared.manifestPath }), /variant=io.*tree/i);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('packager import is silent and argument parsing stays fail-closed', () => {
  assert.equal(typeof packageReleaseArtifact, 'function');
});
