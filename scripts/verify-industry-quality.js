#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const contentRoot = path.join(root, 'src/content/industry');
const loader = fs.readFileSync(path.join(root, 'src/lib/industryContent.ts'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');

assert.match(
  loader,
  /indexable:[\s\S]*metaDescription\.trim\(\) !== title\.trim\(\)[\s\S]*metaDescription\.includes\('涵盖'\)/,
  'industry pages must carry the duplicate-meta quality gate'
);
assert.match(
  loader,
  /getIndustrySitemapEntries[\s\S]*?article\.indexable/,
  'industry sitemap entries must exclude noindex pages'
);

let total = 0;
let duplicate = 0;
for (const locale of fs.readdirSync(contentRoot)) {
  const localeRoot = path.join(contentRoot, locale);
  if (!fs.statSync(localeRoot).isDirectory()) continue;
  for (const file of fs.readdirSync(localeRoot)) {
    if (!file.endsWith('.md')) continue;
    total += 1;
    const source = fs.readFileSync(path.join(localeRoot, file), 'utf8');
    const title = source.match(/^title:\s*"?([^"\n]+)/m)?.[1]?.trim();
    const description = source.match(/^meta_description:\s*"?([^"\n]+)/m)?.[1]?.trim();
    if (
      title &&
      description &&
      (title === description ||
        (description.startsWith(title) && description.includes('涵盖')))
    )
      duplicate += 1;
  }
}

assert.equal(total, 87368, 'industry content count changed');
assert.equal(duplicate, 45896, 'duplicate-meta inventory changed; review the quality gate');
assert(
  sitemap.includes('getIndustrySitemapEntries'),
  'sitemap must consume the filtered industry projection'
);

console.log(`Industry quality verification passed: ${duplicate}/${total} duplicate-meta pages noindexed`);
