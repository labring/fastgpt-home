/**
 * Post-build script: strip RSC (React Server Components) payload scripts
 * from static HTML files to produce cleaner HTML for SEO crawlers and AI fetchers.
 *
 * RSC payload = <script>self.__next_f.push(...)</script> blocks.
 * These are used for React hydration / client-side navigation prefetch.
 * Removing them means:
 *   - Static HTML content remains fully intact (SEO-friendly)
 *   - React hydration won't run → interactive features (accordion, dropdowns) won't work
 *   - Users with JS still see all content; they just can't interact with dynamic widgets
 *
 * For a mostly-static marketing site this is an acceptable trade-off.
 * If interactivity is needed, keep the RSC payload and rely on llms.txt for AI access.
 */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const DRY_RUN = process.argv.includes('--dry-run');

let totalFiles = 0;
let totalSaved = 0;

function stripRscPayload(htmlContent) {
  // Remove self.__next_f.push script blocks (RSC payload)
  return htmlContent.replace(/<script>self\.__next_f\.push\(.*?\)<\/script>/gs, '');
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const cleaned = stripRscPayload(original);
  const saved = original.length - cleaned.length;

  if (saved > 0) {
    totalFiles++;
    totalSaved += saved;
    const pct = ((saved / original.length) * 100).toFixed(1);
    console.log(`  ${path.relative(outDir, filePath)}: ${(saved / 1024).toFixed(1)}KB saved (${pct}%)`);

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, cleaned, 'utf8');
    }
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

console.log(DRY_RUN ? '[DRY RUN] Scanning HTML files...' : 'Stripping RSC payload from HTML files...');
walkDir(outDir);
console.log(`\n${DRY_RUN ? 'Would strip' : 'Stripped'} RSC payload from ${totalFiles} files, saving ${(totalSaved / 1024).toFixed(1)}KB total.`);

// Copy English page as root index.html (default language = English)
const enHtml = path.join(outDir, 'en.html');
const indexHtml = path.join(outDir, 'index.html');
if (!DRY_RUN && fs.existsSync(enHtml)) {
  fs.copyFileSync(enHtml, indexHtml);
  console.log('Copied en.html → index.html (root defaults to English)');
}
