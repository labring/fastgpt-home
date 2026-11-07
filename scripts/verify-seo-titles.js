#!/usr/bin/env node
const assert = require('node:assert/strict');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const copy = require(path.join(root, 'src/lib/seoPageCopy.json'));
const pages = Object.values(copy);
const titles = new Set(pages.map(({ title }) => title));

assert.equal(pages.length, 3, 'expected three landing page metadata entries');
assert.equal(titles.size, pages.length, 'landing page titles must be unique');
for (const page of pages) {
  assert(page.title.length >= 20 && page.title.length <= 60, `invalid title length: ${page.title}`);
  assert(
    page.description.length >= 50 && page.description.length <= 120,
    `invalid description length: ${page.description}`
  );
}

const read = (relativePath) => require('node:fs').readFileSync(path.join(root, relativePath), 'utf8');
const customers = read('src/app/customers/layout.tsx');
const videos = read('src/app/videos/page.tsx');
const wiki = read('src/app/wiki/page.tsx');
for (const source of [customers, videos, wiki]) {
  assert.match(
    source,
    /title(?:\s*:\s*title|\s*:\s*WIKI_TITLE|,)/,
    'metadata title must use shared copy'
  );
  assert.match(
    source,
    /description(?:\s*:\s*description|\s*:\s*WIKI_DESCRIPTION|,)/,
    'metadata description must use shared copy'
  );
}
assert.match(
  customers,
  /openGraph:\s*\{[\s\S]*?title,[\s\S]*?description,[\s\S]*?\}[\s\S]*?twitter:\s*\{[\s\S]*?title,[\s\S]*?description,/,
  'customers social metadata must use shared copy'
);
assert.match(
  videos,
  /openGraph:\s*\{\s*title,\s*description,/,
  'videos OpenGraph metadata must use shared copy'
);
assert.match(
  wiki,
  /openGraph:\s*\{[\s\S]*?title:\s*WIKI_TITLE,[\s\S]*?description:\s*WIKI_DESCRIPTION/,
  'wiki OpenGraph metadata must use shared copy'
);
assert.match(
  wiki,
  /twitter:\s*\{[\s\S]*?title:\s*WIKI_TITLE,[\s\S]*?description:\s*WIKI_DESCRIPTION/,
  'wiki Twitter metadata must use shared copy'
);

console.log('SEO landing page metadata verification passed');
