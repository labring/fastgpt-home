/**
 * Post-build: produce clean, curl-friendly HTML files.
 *
 * 1. Remove RSC payload scripts (self.__next_f.push)
 * 2. Remove JS chunk <script src="/_next/..."> tags (not needed without hydration)
 * 3. Fix hidden content: remove opacity:0 / transform:scale inline styles
 * 4. Remove the theme-switching inline script
 * 5. Keep: CSS links, meta tags, structured data (ld+json), and all HTML content
 *
 * Result: curl returns clean HTML with full DOM content, perfect for
 * HTML-to-markdown conversion.
 */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const DRY_RUN = process.argv.includes('--dry-run');

let totalFiles = 0;
let totalSaved = 0;

function cleanHtml(html) {
  let result = html;

  // 1. Remove RSC payload scripts
  result = result.replace(/<script>self\.__next_f\.push\(.*?\)<\/script>/gs, '');

  // 2. Remove JS chunk script tags (src="/_next/static/chunks/...")
  result = result.replace(/<script\s+src="?\/_next\/static\/chunks\/[^"]*"?[^>]*><\/script>/g, '');

  // 3. Remove preload script tags
  result = result.replace(/<link\s+rel="preload"\s+as="script"[^>]*\/?>/g, '');

  // 4. Remove the theme-switching inline script (the big IIFE)
  result = result.replace(/<script>\(\(a,b,c,d,e,f,g,h\)=>.*?\)<\/script>/gs, '');

  // 5. Remove noModule polyfill script
  result = result.replace(/<script\s+src="[^"]*"\s+noModule=""[^>]*><\/script>/g, '');

  // 6. Fix hidden hero content: remove opacity:0 and transform:scale(0.5)
  result = result.replace(/style="opacity:0;transform:scale\(0\.5\)"/g, '');

  // 7. Remove display:none on video modal (keep the content accessible)
  result = result.replace(/style="display:none"(\s+class="fixed inset-0)/g, 'style="display:none"$1');

  // 8. Remove empty <div hidden="">...</div>
  result = result.replace(/<div hidden=""><!--\$--><!--\/\$--><\/div>/g, '');

  // 9. Remove next-size-adjust meta
  result = result.replace(/<meta name="next-size-adjust" content=""\/?>/g, '');

  // 10. Remove RSC bootstrap script
  result = result.replace(/<script>\(self\.__next_f=self\.__next_f\|\|\[\]\)\.push\(\[0\]\)<\/script>/g, '');

  // 11. Remove the _R_ bootstrap script tag
  result = result.replace(/<script\s+src="[^"]*"\s+id="_R_"[^>]*><\/script>/g, '');

  return result;
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const cleaned = cleanHtml(original);
  const saved = original.length - cleaned.length;

  if (saved > 0) {
    totalFiles++;
    totalSaved += saved;
    const pct = ((saved / original.length) * 100).toFixed(1);
    console.log(`  ${path.relative(outDir, filePath)}: ${(original.length / 1024).toFixed(1)}KB → ${(cleaned.length / 1024).toFixed(1)}KB (${pct}% smaller)`);

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

console.log(DRY_RUN ? '[DRY RUN] Scanning...' : 'Cleaning HTML for curl-friendly output...');
walkDir(outDir);
console.log(`\n${DRY_RUN ? 'Would clean' : 'Cleaned'} ${totalFiles} files, saved ${(totalSaved / 1024).toFixed(1)}KB total.`);
