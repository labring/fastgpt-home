/**
 * Remove replaceable RSC route payloads to keep the static export compact.
 * HTML routes remain intact; client-side navigation falls back to a full page load.
 */
const fs = require('node:fs');
const path = require('node:path');

const outDir = path.join(__dirname, '..', 'out');
const CLOUDFLARE_STATIC_ASSETS_FILE_LIMIT = Number(
  process.env.CLOUDFLARE_STATIC_ASSETS_FILE_LIMIT || 100_000
);

let removed = 0;

function isReplaceableRscPayload(dir, filename) {
  if (!filename.endsWith('.txt')) return false;

  const fullPath = path.join(dir, filename);
  if (fs.existsSync(fullPath.replace(/\.txt$/, '.html'))) return true;
  if (!filename.startsWith('__next.')) return false;

  return fs.existsSync(`${dir}.html`) || fs.existsSync(path.join(dir, 'index.html'));
}

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

    if (!isReplaceableRscPayload(dir, entry.name)) continue;
    fs.unlinkSync(fullPath);
    removed++;
  }
}

function runCleanup() {
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

  if (process.env.PREVIEW_METRICS_PATH) {
    fs.mkdirSync(path.dirname(process.env.PREVIEW_METRICS_PATH), { recursive: true });
    fs.writeFileSync(
      process.env.PREVIEW_METRICS_PATH,
      `${JSON.stringify(
        {
          rscPayloadFilesRemoved: removed,
          staticExportFilesAfterCleanup: total,
          staticAssetFileLimit: CLOUDFLARE_STATIC_ASSETS_FILE_LIMIT
        },
        null,
        2
      )}\n`
    );
  }

  if (total > CLOUDFLARE_STATIC_ASSETS_FILE_LIMIT) {
    throw new Error(
      `Static Assets supports at most ${CLOUDFLARE_STATIC_ASSETS_FILE_LIMIT.toLocaleString(
        'en-US'
      )} files; found ${total}.`
    );
  }
}

if (require.main === module) runCleanup();

module.exports = { isReplaceableRscPayload };
