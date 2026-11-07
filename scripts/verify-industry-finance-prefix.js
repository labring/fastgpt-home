#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const contentRoot = path.join(root, 'src', 'content', 'industry');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'industry-finance-'));
const output = path.join(directory, 'industry.cjs');
const legacyFiles = [];
const migratedFiles = [];

for (const locale of fs.readdirSync(contentRoot)) {
  const localeRoot = path.join(contentRoot, locale);
  if (!fs.statSync(localeRoot).isDirectory()) continue;
  for (const file of fs.readdirSync(localeRoot)) {
    if (file.startsWith('fin-') && file.endsWith('.md')) legacyFiles.push(`${locale}/${file}`);
    if (file.startsWith('finace-') && file.endsWith('.md')) migratedFiles.push(file);
  }
}

assert.deepEqual(legacyFiles, [], `legacy industry slugs remain: ${legacyFiles.join(', ')}`);
assert.equal(migratedFiles.length, 1080, 'industry finance content count changed');

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
  const migrated = content.industryArticles.filter((article) => article.slug.startsWith('finace-'));
  const sitemapSlugs = new Set(content.getIndustrySitemapEntries('cn').map(({ slug }) => slug));
  assert.equal(migrated.length, 1080, 'finance loader inventory changed');
  assert(
    migrated.every((article) => sitemapSlugs.has(article.slug)),
    'finance sitemap inventory does not include every migrated source'
  );
  assert.equal(
    content.getIndustryOwnerParams('cn').filter(({ slug }) => slug.startsWith('finace-')).length,
    1080,
    'finance static params do not include every migrated source'
  );
  console.log(`Industry finance prefix verification passed: ${migrated.length} sources retained`);
} finally {
  fs.rmSync(directory, { recursive: true, force: true });
}
