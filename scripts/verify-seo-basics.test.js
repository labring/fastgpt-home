const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const ROOT = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

test('sitemap uses content dates instead of the build clock', () => {
  const source = read('src/app/sitemap.ts');

  assert.doesNotMatch(source, /const now\s*=\s*new Date\(\)/);
  assert.match(source, /const getLatestDate = \(dates: Date\[\]\)/);
  assert.match(source, /const guideLastModified = getLatestDate\(/);
  assert.match(source, /addEntry\(getGuideCanonicalUrl\(guideLocale\), guideLastModified\)/);
  assert.match(source, /const entry: MetadataRoute\.Sitemap\[number\] = \{ url \};/);
});

test('homepage images declare stable loading and accessibility semantics', () => {
  const hero = read('src/components/home/Hero.tsx');
  const highlights = read('src/components/home/ProductHighlights.tsx');
  const enterprise = read('src/components/enterprise/NormalCardGrid.tsx');

  assert.match(hero, /fetchPriority="high"/);
  assert.match(highlights, /style=\{\{ aspectRatio: `\$\{image\.width\} \/ \$\{image\.height\}` \}\}/);
  assert.match(highlights, /width=\{image\.width\}/);
  assert.match(highlights, /height=\{image\.height\}/);
  assert.match(highlights, /sizes="\(max-width: 640px\) 100vw, \(max-width: 1024px\) 50vw, 33vw"/);
  assert.match(enterprise, /alt=\{item\.title\}/);
});
