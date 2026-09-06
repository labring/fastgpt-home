const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { parseArgs, verifyGuideG2Release } = require('./verify-guide-g2-release');

const ROOT = path.resolve(__dirname, '..');

function copySourceTree() {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-guide-g2-release-'));
  fs.cpSync(path.join(ROOT, 'src'), path.join(temporaryRoot, 'src'), { recursive: true });
  return temporaryRoot;
}

test('G2 release evidence isolates the SOE identity and publishes exactly two owner pages', () => {
  const result = verifyGuideG2Release({ rootDir: ROOT });
  assert.deepEqual(result.g2Slugs, ['soe-policy-qa-deployment']);
  assert.deepEqual(result.g1Slugs, ['migrate-saas-to-selfhost', 'embed-ai-into-product']);
  assert.equal(result.g2IdentityCount, 1);
  assert.equal(result.sourceDocumentCount, 2);
  assert.deepEqual(result.ownerPages, { cn: 1, io: 1 });
});

test('G2 verifier rejects a changed identity projection', () => {
  const temporaryRoot = copySourceTree();
  try {
    const manifestPath = path.join(temporaryRoot, 'src/content/guides/g2-release-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.identitySet[0].localesData.en.bodySha256 = '0'.repeat(64);
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    assert.throws(
      () => verifyGuideG2Release({ rootDir: temporaryRoot }),
      /G2 identity projection differs/
    );
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
});

test('G2 verifier rejects rollback data that can remove a G1 identity', () => {
  const temporaryRoot = copySourceTree();
  try {
    const rollbackPath = path.join(temporaryRoot, 'src/content/guides/g2-rollback.json');
    const rollback = JSON.parse(fs.readFileSync(rollbackPath, 'utf8'));
    rollback.removeSlugs = ['migrate-saas-to-selfhost'];
    fs.writeFileSync(rollbackPath, `${JSON.stringify(rollback, null, 2)}\n`);
    assert.throws(
      () => verifyGuideG2Release({ rootDir: temporaryRoot }),
      /G2 rollback remove set differs/
    );
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
});

test('G2 verifier CLI supports an explicit root and emits bounded evidence', () => {
  assert.deepEqual(parseArgs([]), { rootDir: process.cwd() });
  assert.deepEqual(parseArgs(['--root', ROOT]), { rootDir: ROOT });
  assert.throws(() => parseArgs(['--unexpected']), /Usage/);
  const result = spawnSync(process.execPath, ['scripts/verify-guide-g2-release.js'], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /GUIDE_G2_RESULT=/);
  assert.match(result.stdout, /1 cn owner page, 1 io owner page/);
});
