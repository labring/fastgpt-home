#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pages = [
  ['src/app/customers/layout.tsx', '/customers'],
  ['src/app/wiki/page.tsx', '/wiki'],
  ['src/app/videos/page.tsx', '/videos']
];

for (const [relativePath, route] of pages) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  assert.match(
    source,
    new RegExp(`getAlternates\\('zh', '${route}', \\['zh'\\]\\)`),
    `${route} must declare only its published Chinese alternate`
  );
}

console.log('Single-locale alternate verification passed');
