/**
 * Static export writes prerendered route-handler bodies with a `.body` suffix.
 * Blog thumbnails must be reachable at their public image URLs, so rename the
 * exported bodies inside thumbnail directories to their real file names.
 */
const fs = require('node:fs');
const path = require('node:path');

const outDir = path.join(__dirname, '..', 'out');
const BODY_SUFFIX = '.body';

let renamed = 0;

function fixDir(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixDir(fullPath);
      continue;
    }
    if (!entry.name.endsWith(BODY_SUFFIX)) continue;
    if (!fullPath.includes(`${path.sep}thumbnail${path.sep}`)) continue;
    fs.renameSync(fullPath, fullPath.slice(0, -BODY_SUFFIX.length));
    renamed += 1;
  }
}

fixDir(outDir);

if (renamed === 0) {
  console.error('[fix-blog-thumbnail-export] no thumbnail exports found in out/');
  process.exit(1);
}

console.log(`[fix-blog-thumbnail-export] renamed ${renamed} thumbnail exports`);
