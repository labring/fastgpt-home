/**
 * Static export writes prerendered route-handler bodies at their public file names,
 * so exported blog thumbnails must already be real images inside out/. The route
 * handler swallows render failures into an error payload, so check the bytes rather
 * than only the file count.
 */
const fs = require('node:fs');
const path = require('node:path');

const outDir = path.join(__dirname, '..', 'out');
const blogApiDir = path.join(outDir, 'api', 'blog');
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

let checked = 0;
const invalid = [];

function isImageBytes(file) {
  const head = Buffer.alloc(4);
  const descriptor = fs.openSync(file, 'r');
  try {
    fs.readSync(descriptor, head, 0, head.length, 0);
  } finally {
    fs.closeSync(descriptor);
  }
  return file.endsWith('.png') ? head.equals(PNG_MAGIC) : head[0] === 0x3c;
}

function verifyDir(dir) {
  if (!fs.existsSync(dir)) return;

  const isThumbnailDir = path.basename(dir) === 'thumbnail';
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      verifyDir(fullPath);
      continue;
    }
    if (!isThumbnailDir) continue;
    checked += 1;
    if (!isImageBytes(fullPath)) invalid.push(path.relative(outDir, fullPath));
  }
}

verifyDir(blogApiDir);

if (checked === 0) {
  console.error('[verify-blog-thumbnail-export] no thumbnail exports found in out/api/blog');
  process.exit(1);
}

if (invalid.length) {
  console.error(
    `[verify-blog-thumbnail-export] ${invalid.length} exported thumbnail(s) are not images:\n${invalid
      .slice(0, 10)
      .join('\n')}`
  );
  process.exit(1);
}

console.log(`[verify-blog-thumbnail-export] verified ${checked} thumbnail exports`);
