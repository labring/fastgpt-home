/**
 * Post-build script: remove RSC payload files from FAQ detail pages
 * to stay under Cloudflare Pages' 20,000 file limit.
 *
 * Keeps .html files intact for SEO (search engines crawl HTML, not RSC payloads).
 * Only affects client-side navigation prefetch — users will get a full page load
 * instead of RSC streaming when navigating to FAQ detail pages.
 */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

let removed = 0;
let kept = 0;

function cleanDir(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // FAQ detail pages have __next.*.txt files in subdirectories
      if (entry.name.startsWith('__next')) continue;
      // Check if this is a FAQ detail directory (contains __next.*.txt files)
      const subEntries = fs.readdirSync(fullPath);
      const hasRscFiles = subEntries.some(f => f.startsWith('__next.') && f.endsWith('.txt'));
      if (hasRscFiles) {
        // Remove RSC txt files, keep the directory if it has other content
        for (const sub of subEntries) {
          if (sub.startsWith('__next.') && sub.endsWith('.txt')) {
            fs.unlinkSync(path.join(fullPath, sub));
            removed++;
          }
        }
        // Remove empty directory
        const remaining = fs.readdirSync(fullPath);
        if (remaining.length === 0) {
          fs.rmdirSync(fullPath);
        }
      } else {
        cleanDir(fullPath);
      }
    } else {
      kept++;
    }
  }
}

// Clean FAQ directories for all locales
const locales = ['en', 'zh', 'ja'];
for (const locale of locales) {
  const faqDir = path.join(outDir, locale, 'faq');
  if (fs.existsSync(faqDir)) {
    console.log(`Cleaning RSC files in ${locale}/faq ...`);
    cleanDir(faqDir);
  }
}

console.log(`Done. Removed ${removed} RSC payload files, kept ${kept} files.`);

// Count total files in out/
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
console.log(`Total files in out/: ${total}`);
