const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const test = require('node:test');

const ROOT = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

test('sitemap uses content dates instead of the build clock', () => {
  const source = read('src/app/sitemap.ts');
  const exportVerifier = read('scripts/verify-i18n-seo.js');

  assert.doesNotMatch(source, /new Date\(\s*\)/);
  assert.match(source, /const getLatestDate = \(dates: Date\[\]\)/);
  assert.match(source, /const guideLastModified = getLatestDate\(/);
  assert.match(source, /addEntry\(getGuideCanonicalUrl\(guideLocale\), guideLastModified\)/);
  assert.match(source, /const entry: MetadataRoute\.Sitemap\[number\] = \{ url \};/);
  assert.match(exportVerifier, /Stable URL has an unverifiable lastmod/);
  assert.match(exportVerifier, /expectedGuideDates/);
});

test('homepage images declare stable loading and accessibility semantics', () => {
  const hero = read('src/components/home/Hero.tsx');
  const highlights = read('src/components/home/ProductHighlights.tsx');
  const enterprise = read('src/components/enterprise/NormalCardGrid.tsx');

  assert.match(hero, /loading="lazy"/);
  assert.match(hero, /fetchPriority="low"/);
  assert.match(highlights, /style=\{\{ aspectRatio: `\$\{image\.width\} \/ \$\{image\.height\}` \}\}/);
  assert.match(highlights, /width=\{image\.width\}/);
  assert.match(highlights, /height=\{image\.height\}/);
  assert.doesNotMatch(highlights, /sizes=/);
  assert.match(enterprise, /alt=\{item\.title\}/);
});

test('feature image dimensions match the layout contract', async () => {
  const images = [
    ['producthighlights-Image1.jpg', 1600, 859],
    ['producthighlights-Image2.jpg', 1600, 859],
    ['producthighlights-Image3.jpg', 1600, 1049],
    ['producthighlights-Image4.jpg', 1600, 1049],
    ['producthighlights-Image5.jpg', 1600, 1049]
  ];

  for (const [name, width, height] of images) {
    const metadata = await sharp(
      path.join(ROOT, 'public/images/home/product/feature-new', name)
    ).metadata();
    assert.equal(metadata.width, width, `${name}: width`);
    assert.equal(metadata.height, height, `${name}: height`);
  }
});
