const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { readIndustrySources, verifyIndustryContent } = require('./verify-industry-content');

test('normalized fixture sources pass the Industry contract', () => {
  assert.doesNotThrow(() => verifyIndustryContent());
  const articles = readIndustrySources();
  assert.equal(articles.length, 19080);
  assert.equal(articles.filter((article) => article.locale === 'zh').length, 10080);
  assert.equal(articles.filter((article) => article.locale === 'en').length, 9000);
  assert.equal(new Set(articles.map((article) => article.slug)).size, 10080);
  const slugCounts = new Map();
  for (const article of articles)
    slugCounts.set(article.slug, (slugCounts.get(article.slug) || 0) + 1);
  assert.equal(articles.filter((article) => slugCounts.get(article.slug) === 2).length, 18000);
  assert.ok(articles.every((article) => article.metadata.date_published === '2026-09-15'));
  assert.ok(articles.every((article) => article.metadata.date_modified === '2026-09-15'));
  assert.ok(
    articles
      .filter((article) => article.locale === 'zh')
      .every((article) => article.metadata.keywords)
  );
  assert.ok(
    articles
      .filter((article) => article.locale === 'en')
      .every((article) => !article.metadata.keywords)
  );
  assert.ok(articles.every((article) => !article.body.includes('meta_description:')));
});

test('required fields, slug safety, and duplicate identities fail at the source boundary', () => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'industry-content-'));
  fs.mkdirSync(path.join(fixtureRoot, 'zh'));
  fs.writeFileSync(
    path.join(fixtureRoot, 'zh', 'unsafe.md'),
    '---\ntitle: Unsafe\nslug: /zh/industry/../unsafe\npage_type: Industry\nmeta_title: Unsafe\nmeta_description: Unsafe\ndate_published: 2026-09-19\ndate_modified: 2026-09-19\n---\n\n# Unsafe\n'
  );
  assert.throws(() => readIndustrySources(fixtureRoot), /invalid slug/);

  fs.writeFileSync(
    path.join(fixtureRoot, 'zh', 'unsafe.md'),
    '---\ntitle: Safe\nslug: /zh/industry/safe\npage_type: Industry\nmeta_title: Safe\nmeta_description: Safe\ndate_published: 2026-09-19\ndate_modified: 2026-09-19\n---\n\n# Safe\n'
  );
  fs.copyFileSync(
    path.join(fixtureRoot, 'zh', 'unsafe.md'),
    path.join(fixtureRoot, 'zh', 'duplicate.md')
  );
  assert.throws(() => readIndustrySources(fixtureRoot), /duplicate slug/);

  fs.writeFileSync(
    path.join(fixtureRoot, 'zh', 'duplicate.md'),
    '---\ntitle: Public\nslug: /zh/industry/public\npage_type: Industry\nmeta_title: Public\nmeta_description: Public\ndate_published: 2026-09-19\ndate_modified: 2026-09-19\n---\n\n# Public\n\ndelivery_schedule: internal\n'
  );
  assert.throws(() => readIndustrySources(fixtureRoot), /internal delivery metadata/);
});

test('publication boundaries keep locale-aware alternates and export cleanup', () => {
  const root = path.join(__dirname, '..');
  const seo = fs.readFileSync(path.join(root, 'src/lib/seo.ts'), 'utf8');
  const industrySeo = fs.readFileSync(path.join(root, 'src/lib/industrySeo.ts'), 'utf8');
  const industryHubRoute = fs.readFileSync(
    path.join(root, 'src/components/industry/IndustryHubRoute.tsx'),
    'utf8'
  );
  const industryHubPage = fs.readFileSync(path.join(root, 'src/app/industry/page.tsx'), 'utf8');
  const footer = fs.readFileSync(path.join(root, 'src/components/home/Footer.tsx'), 'utf8');
  const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const cleanup = fs.readFileSync(path.join(root, 'scripts/clean-locale-output.js'), 'utf8');

  assert.match(seo, /if \(availableLocales\.includes\('en'\)\)/);
  assert.match(industrySeo, /getAlternates\(article\.locale/);
  assert.match(industryHubRoute, /IndustryHubPage/);
  assert.match(industryHubPage, /getIndustryHubMetadata/);
  assert.match(footer, /t\.links\.items\.industry/);
  assert.match(sitemap, /getIndustryHubCanonicalUrl/);
  assert.match(cleanup, /removeRoute\('\/industry'\)/);
  assert.match(cleanup, /const ownerLocale = variant === 'cn' \? 'zh' : 'en';/);
  assert.match(cleanup, /removeRoute\(`\/\$\{ownerLocale\}\/industry`\)/);
});
