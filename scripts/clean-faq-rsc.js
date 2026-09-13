/**
 * Remove replaceable RSC route payloads to stay within Cloudflare Pages' file limit.
 * HTML routes remain intact; client-side navigation falls back to a full page load.
 */
const fs = require('node:fs');
const path = require('node:path');

const outDir = path.join(__dirname, '..', 'out');
const CLOUDFLARE_PAGES_FILE_LIMIT = 20_000;

let removed = 0;

function cleanDir(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanDir(fullPath);
      if (fs.readdirSync(fullPath).length === 0) fs.rmdirSync(fullPath);
      continue;
    }

    const isSegmentPayload =
      entry.name.startsWith('__next.') &&
      entry.name.endsWith('.txt') &&
      (fs.existsSync(`${dir}.html`) || fs.existsSync(path.join(dir, 'index.html')));
    const isRoutePayload =
      entry.name.endsWith('.txt') &&
      fs.existsSync(fullPath.replace(/\.txt$/, '.html'));

    if (!isSegmentPayload && !isRoutePayload) continue;
    fs.unlinkSync(fullPath);
    removed++;
  }
}

cleanDir(outDir);

let total = 0;
function countFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      countFiles(path.join(dir, entry.name));
    } else {
      total++;
    }
  }
}
countFiles(outDir);
console.log(`[clean-faq-rsc] removed=${removed}; files=${total}`);

if (total > CLOUDFLARE_PAGES_FILE_LIMIT) {
  throw new Error(
    `Cloudflare Pages supports at most ${CLOUDFLARE_PAGES_FILE_LIMIT.toLocaleString('en-US')} files; found ${total}.`
  );
}
