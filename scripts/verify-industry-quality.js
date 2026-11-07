#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'industry-quality-')), 'industry.cjs');

function transpile(file) {
  const ts = require('typescript');
  return ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true
    }
  }).outputText;
}

function loadIndustry() {
  const directory = path.dirname(out);
  const files = [
    ['industryContent.ts', 'industry.cjs'],
    ['industryListing.ts', 'industryListing.js'],
    ['siteRouting.ts', 'siteRouting.js'],
    ['locales.ts', 'locales.js']
  ];
  for (const [source, target] of files) {
    let code = transpile(path.join(root, 'src/lib', source));
    if (source === 'industryContent.ts') {
      code = code.replace('require("server-only");', '');
    }
    code = code
      .replaceAll('@/lib/industryListing', './industryListing')
      .replaceAll('@/lib/siteRouting', './siteRouting')
      .replaceAll('@/lib/locales', './locales')
      .replaceAll('@/config/site-routing.json', './site-routing.json');
    fs.writeFileSync(path.join(directory, target), code);
  }
  fs.writeFileSync(
    path.join(directory, 'site-routing.json'),
    JSON.stringify(require('../src/config/site-routing.json'))
  );
  return require(out);
}

try {
  const content = loadIndustry();
  const bySlug = new Map(content.industryArticles.map((article) => [article.slug, article]));
  const education = bySlug.get('education-d001-c001-f002');
  const finance = bySlug.get('finance-d012-c110-f015');
  const brokenRetail = bySlug.get('retail-d002-c003-f005');
  const placeholder = content.industryArticles.find((article) =>
    article.qualityIssues.includes('placeholder-body')
  );
  const longLegacy = content.industryArticles.find((article) => article.slug === finance.slug);
  const topic = content.industryArticles.find((article) =>
    article.qualityIssues.includes('topic-mismatch')
  );
  const shortBody = content.getIndustryQualityIssues(
    'retail',
    'Retail customer order lookup',
    '## Configuration\n\nShort retail content.',
    'A distinct retail description for orders and customers.',
    { article_section: 'Retail' }
  );

  assert.equal(content.industryArticles.length, 87368, 'industry content count changed');
  assert.equal(
    content.industryArticles.filter((article) => article.qualityIssues.includes('short-body'))
      .length,
    0,
    'current corpus has no short-body records'
  );
  assert(shortBody.includes('short-body'), 'short-body quality fixture must be noindexed');
  assert.equal(
    content.industryArticles.filter((article) => article.indexable).length,
    30956,
    'indexable inventory changed; review the quality gate'
  );
  assert.equal(education.indexable, true, 'legacy education content must remain indexable');
  assert.equal(finance.indexable, false, 'finance cross-industry content must be noindex');
  assert(finance.qualityIssues.includes('cross-industry'));
  assert(finance.qualityIssues.includes('duplicate-meta'));
  assert.equal(brokenRetail.qualityIssues.includes('broken-section'), true);
  for (const article of [placeholder, longLegacy, topic]) {
    assert(article, 'missing quality fixture');
    assert.equal(article.indexable, false, `expected noindex for ${article.slug}`);
  }
  assert.equal(
    content.getIndustrySitemapEntries('cn').some((entry) => entry.slug === finance.slug),
    false
  );
  assert.equal(
    content.getIndustryOwnerParams('cn').some((entry) => entry.slug === finance.slug),
    true
  );
  assert.equal(
    content.getIndustrySummaries('zh').some((entry) => entry.slug === finance.slug),
    false
  );
  assert.equal(content.getIndustryArticle('zh', finance.slug).indexable, false);
  const cnManifest = JSON.parse(
    fs.readFileSync(path.join(root, 'sitemaps/fastgpt.cn/manifest.json'))
  );
  const ioManifest = JSON.parse(
    fs.readFileSync(path.join(root, 'sitemaps/fastgpt.io/manifest.json'))
  );
  for (const [host, manifest, expected] of [
    ['fastgpt.cn', cnManifest, 10201],
    ['fastgpt.io', ioManifest, 15639]
  ]) {
    const industryShards = manifest.shards.filter((shard) => shard.bucket === 'industry');
    const urls = industryShards.flatMap((shard) =>
      [
        ...fs
          .readFileSync(path.join(root, 'sitemaps', host, shard.file), 'utf8')
          .matchAll(/<loc>(.*?)<\/loc>/g)
      ].map((match) => match[1])
    );
    assert.equal(urls.length, expected, `${host} industry sitemap inventory changed`);
    assert(!urls.some((url) => url.endsWith(`/industry/${finance.slug}`)));
  }

  console.log(
    `Industry quality verification passed: ${
      content.industryArticles.filter((article) => article.indexable).length
    }/${content.industryArticles.length} indexable`
  );
} finally {
  fs.rmSync(path.dirname(out), { recursive: true, force: true });
}
