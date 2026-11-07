#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'industry-inventory-'));
const output = path.join(directory, 'industry.cjs');

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
  const files = [
    ['industryContent.ts', 'industry.cjs'],
    ['industryListing.ts', 'industryListing.js'],
    ['siteRouting.ts', 'siteRouting.js'],
    ['locales.ts', 'locales.js']
  ];
  for (const [source, target] of files) {
    let code = transpile(path.join(root, 'src/lib', source));
    if (source === 'industryContent.ts') code = code.replace('require("server-only");', '');
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
  return require(output);
}

try {
  const content = loadIndustry();
  const articles = content.industryArticles;
  const identities = new Set(articles.map(({ locale, slug }) => `${locale}|${slug}`));

  assert.equal(identities.size, articles.length, 'industry identities must be unique');
  assert.deepEqual(
    [...new Set(articles.map(({ locale }) => locale))].sort(),
    ['en', 'zh'],
    'industry locales'
  );
  for (const locale of ['zh', 'en']) {
    const localeArticles = articles.filter((article) => article.locale === locale);
    assert(localeArticles.length > 0, `${locale} industry inventory is empty`);
    assert.equal(
      content.getIndustrySummaries(locale).length,
      localeArticles.length,
      `${locale} summaries must include every article`
    );
    assert.equal(
      content.getIndustrySitemapEntries(locale === 'zh' ? 'cn' : 'io').length,
      localeArticles.length,
      `${locale} sitemap entries must include every article`
    );
  }

  for (const [host, variant] of [
    ['fastgpt.cn', 'cn'],
    ['fastgpt.io', 'io']
  ]) {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(root, 'sitemaps', host, 'manifest.json'), 'utf8')
    );
    const shards = manifest.shards.filter((shard) => shard.bucket === 'industry');
    assert(shards.length > 0, `${host} industry sitemap is empty`);
    for (const shard of shards) {
      assert(fs.existsSync(path.join(root, 'sitemaps', host, shard.file)), `${shard.file} missing`);
    }
    assert.equal(
      content.getIndustryOwnerParams(variant).length,
      articles.filter((article) =>
        variant === 'cn' ? article.locale === 'zh' : article.locale === 'en'
      ).length,
      `${host} static industry params do not match inventory`
    );
  }

  console.log(`Industry inventory verification passed: ${articles.length} articles`);
} finally {
  fs.rmSync(directory, { recursive: true, force: true });
}
