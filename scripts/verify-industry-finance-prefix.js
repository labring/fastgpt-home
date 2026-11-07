#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const contentRoot = path.join(root, 'src', 'content', 'industry');
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

const source = fs.readFileSync(path.join(root, 'src', 'lib', 'industryContent.ts'), 'utf8');
assert.match(source, /\^\(\?:finance\|finace\)-/, 'finance prefix classifier is stale');

const sitemapRoot = path.join(root, 'sitemaps', 'fastgpt.cn');
const manifest = JSON.parse(fs.readFileSync(path.join(sitemapRoot, 'manifest.json'), 'utf8'));
const industryShards = manifest.shards.filter((shard) => shard.bucket === 'industry');
const sitemap = industryShards
  .map((shard) => fs.readFileSync(path.join(sitemapRoot, shard.file), 'utf8'))
  .join('\n');
const migratedUrls = sitemap.match(/https:\/\/fastgpt\.cn\/industry\/finace-[^<]+/g) || [];
assert(migratedUrls.length <= 1080, 'migrated sitemap URL count exceeds source count');
assert.doesNotMatch(
  sitemap,
  /https:\/\/fastgpt\.cn\/industry\/fin-/,
  'legacy finance sitemap URL remains'
);

const sourceSlugs = new Set(
  migratedFiles.map((file) => file.replace(/\.md$/, '')).map((slug) => `/industry/${slug}`)
);
const sitemapSlugs = new Set(migratedUrls.map((url) => new URL(url).pathname));
assert(
  [...sitemapSlugs].every((slug) => sourceSlugs.has(slug)),
  'sitemap contains a finace URL absent from source'
);

const sourceParams = fs.readFileSync(path.join(root, 'src', 'lib', 'industryContent.ts'), 'utf8');
assert.match(
  sourceParams,
  /getIndustryOwnerParams[\s\S]*industryArticles/,
  'migrated static params must retain every source article'
);

console.log(
  `Industry finance prefix verification passed: ${migratedFiles.length} sources retained, ${migratedUrls.length} indexable`
);
