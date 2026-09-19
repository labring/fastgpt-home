const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { readIndustrySources, verifyIndustryContent } = require('./verify-industry-content');

test('normalized fixture sources pass the Industry contract', () => {
  assert.doesNotThrow(() => verifyIndustryContent());
  const articles = readIndustrySources();
  assert.deepEqual(
    [...new Set(articles.map((article) => article.slug))],
    ['knowledge-base-retrieval']
  );
  assert.equal(articles.filter((article) => article.slug === 'knowledge-base-retrieval').length, 2);
  assert.ok(articles.every((article) => !article.body.includes('meta_description:')));
});

test('required fields, slug safety, and duplicate identities fail at the source boundary', () => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'industry-content-'));
  fs.mkdirSync(path.join(fixtureRoot, 'zh'));
  fs.writeFileSync(
    path.join(fixtureRoot, 'zh', 'unsafe.md'),
    '---\ntitle: Unsafe\nslug: /zh/industry/../unsafe\npage_type: Industry\nmeta_title: Unsafe\nmeta_description: Unsafe\ndate_modified: 2026-09-19\n---\n\n# Unsafe\n'
  );
  assert.throws(() => readIndustrySources(fixtureRoot), /invalid slug/);

  fs.writeFileSync(
    path.join(fixtureRoot, 'zh', 'unsafe.md'),
    '---\ntitle: Safe\nslug: /zh/industry/safe\npage_type: Industry\nmeta_title: Safe\nmeta_description: Safe\ndate_modified: 2026-09-19\n---\n\n# Safe\n'
  );
  fs.copyFileSync(path.join(fixtureRoot, 'zh', 'unsafe.md'), path.join(fixtureRoot, 'zh', 'duplicate.md'));
  assert.throws(() => readIndustrySources(fixtureRoot), /duplicate slug/);

  fs.writeFileSync(
    path.join(fixtureRoot, 'zh', 'duplicate.md'),
    '---\ntitle: Public\nslug: /zh/industry/public\npage_type: Industry\nmeta_title: Public\nmeta_description: Public\ndate_modified: 2026-09-19\n---\n\n# Public\n\ndelivery_schedule: internal\n'
  );
  assert.throws(() => readIndustrySources(fixtureRoot), /internal delivery metadata/);
});
