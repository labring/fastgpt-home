const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { parseArgs, verifyGuideG1Release } = require('./verify-guide-release');
const { G1_GUIDE_SLUGS, G2_GUIDE_SLUGS } = require('./lib/guide-release');

const ROOT = path.resolve(__dirname, '..');

test('G1 release evidence isolates the two target identities and SOE G2', () => {
  const result = verifyGuideG1Release({ rootDir: ROOT });
  assert.deepEqual(result.g1Slugs, G1_GUIDE_SLUGS);
  assert.deepEqual(result.g2ExcludedSlugs, G2_GUIDE_SLUGS);
  assert.equal(result.g1IdentityCount, 2);
  assert.equal(result.sourceDocumentCount, 4);
  assert.deepEqual(result.ownerPages, { cn: 2, io: 2 });
});

test('G1 source verifier rejects a changed release identity digest', () => {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-guide-release-'));
  try {
    fs.cpSync(path.join(ROOT, 'src'), path.join(temporaryRoot, 'src'), { recursive: true });
    const manifestPath = path.join(temporaryRoot, 'src/content/guides/g1-release-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.identitySet[0].localesData.en.bodySha256 = '0'.repeat(64);
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    assert.throws(
      () => verifyGuideG1Release({ rootDir: temporaryRoot }),
      /identity projection differs/
    );
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
});

test('G1 verifier CLI is explicit and emits bounded evidence', () => {
  assert.deepEqual(parseArgs([]), { rootDir: process.cwd() });
  assert.deepEqual(parseArgs(['--root', ROOT]), { rootDir: ROOT });
  assert.throws(() => parseArgs(['--unexpected']), /Usage/);
  const result = spawnSync(process.execPath, ['scripts/verify-guide-release.js'], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /GUIDE_G1_RESULT=/);
  assert.match(result.stdout, /owner pages cn=2 io=2/);
});
