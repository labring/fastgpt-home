#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(
  path.join(root, 'src/app/videos/page.tsx'),
  'utf8'
);
const metadata = fs.readFileSync(
  path.join(root, 'src/components/learning-center/videoSchemaMetadata.ts'),
  'utf8'
);
const videos = fs.readFileSync(
  path.join(root, 'src/components/learning-center/LearningCenterPage.tsx'),
  'utf8'
);

assert(source.includes("'@type': 'VideoObject'"), 'videos page must emit VideoObject schema');
assert(source.includes("'@type': 'ItemList'"), 'videos page must emit an ItemList');
const records = metadata.match(/^  BV[a-zA-Z0-9]+: \{/gm) || [];
assert.equal(records.length, 45, `expected 45 video metadata records, found ${records.length}`);
assert.equal(
  (metadata.match(/uploadDate: '20\d{2}-\d{2}-\d{2}T/g) || []).length,
  records.length,
  'every video must have an ISO upload date'
);
assert.equal(
  (metadata.match(/thumbnailUrl: 'https:\/\//g) || []).length,
  records.length,
  'every video must have an HTTPS thumbnail'
);
assert.equal(
  (metadata.match(/duration: 'PT/g) || []).length,
  records.length,
  'every video must have an ISO duration'
);
const pageBvids = new Set(
  [...videos.matchAll(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/g)].map((match) => match[1])
);
const schemaBvids = new Set(
  [...metadata.matchAll(/^  (BV[a-zA-Z0-9]+): \{/gm)].map((match) => match[1])
);
assert.deepEqual([...schemaBvids].sort(), [...pageBvids].sort(), 'video schema/source mismatch');

console.log('Video schema verification passed');
