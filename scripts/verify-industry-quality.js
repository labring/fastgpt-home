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
  const byIdentity = new Map(
    content.industryArticles.map((article) => [`${article.locale}|${article.slug}`, article])
  );
  const education = bySlug.get('education-d001-c001-f002');
  const finance = bySlug.get('finance-d012-c110-f015');
  const brokenRetail = byIdentity.get('zh|retail-d002-c003-f005');
  const indexableRetail = content.industryArticles.filter(
    (article) => article.area === 'retail' && article.indexable
  );
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
  assert(
    content.industryArticles.some((article) => article.indexable),
    'industry quality gate must retain indexable content'
  );
  assert.equal(education.indexable, true, 'legacy education content must remain indexable');
  assert.equal(finance.indexable, false, 'finance cross-industry content must be noindex');
  assert(finance.qualityIssues.includes('cross-industry'));
  assert(finance.qualityIssues.includes('duplicate-meta'));
  assert.equal(brokenRetail.qualityIssues.includes('broken-section'), false);
  assert(indexableRetail.length > 0, 'retail pages must retain their valid indexable subset');
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
  for (const [host, locale] of [
    ['fastgpt.cn', 'zh'],
    ['fastgpt.io', 'en']
  ]) {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(root, 'sitemaps', host, 'manifest.json'))
    );
    const industryShards = manifest.shards.filter((shard) => shard.bucket === 'industry');
    const entries = industryShards.flatMap((shard) =>
      [
        ...fs
          .readFileSync(path.join(root, 'sitemaps', host, shard.file), 'utf8')
          .matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/g)
      ].map((match) => {
        const url = match[1].match(/<loc>(.*?)<\/loc>/)?.[1];
        const lastmod = match[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
        return { url, lastmod };
      })
    );
    const actual = new Set(entries.map(({ url }) => new URL(url).pathname.split('/').at(-1)));
    assert(
      [...actual].every(Boolean),
      `${host} contains a sitemap URL without an industry slug`
    );
    const expectedBySlug = new Map(
      content.industryArticles
        .filter((article) => article.locale === locale && article.indexable)
        .map((article) => [article.slug, article.dateModified])
    );
    assert.deepEqual(
      [...actual].sort(),
      [...expectedBySlug.keys()].sort(),
      `${host} sitemap must match its indexable inventory`
    );
    for (const { url, lastmod } of entries) {
      const slug = new URL(url).pathname.split('/').at(-1);
      assert.equal(lastmod, expectedBySlug.get(slug), `${host} lastmod mismatch for ${slug}`);
    }
    assert(!entries.some(({ url }) => url.endsWith(`/industry/${finance.slug}`)));
  }

  console.log(
    `Industry quality verification passed: ${
      content.industryArticles.filter((article) => article.indexable).length
    }/${content.industryArticles.length} indexable`
  );
} finally {
  fs.rmSync(path.dirname(out), { recursive: true, force: true });
}
