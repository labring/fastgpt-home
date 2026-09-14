#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const sourcePath = path.join(__dirname, '..', 'src/components/learning-center/LearningCenterPage.tsx');
const source = fs.readFileSync(sourcePath, 'utf8');
const urls = [...source.matchAll(/url:\s*["']([^"']+)["']/g)].map((match) => match[1]);
const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index);
const forbidden = urls.filter(
  (url) =>
    /canva\.com\/design\/[^/]+\/[^/]+\/edit(?:[/?#]|$)/i.test(url) ||
    /^https?:\/\/(?:www\.)?(?:douyin|xiaohongshu|zhihu)\.com\/?$/i.test(url)
);

if (duplicates.length) {
  throw new Error(`Learning center contains duplicate URLs: ${[...new Set(duplicates)].join(', ')}`);
}

if (forbidden.length) {
  throw new Error(`Learning center contains unstable or platform-home URLs: ${forbidden.join(', ')}`);
}

console.log(`Learning center verification passed (${urls.length} links).`);
