/**
 * Post-build: copy en.html to index.html so root URL serves English content
 * without a redirect.
 */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const enHtml = path.join(outDir, 'en.html');
const indexHtml = path.join(outDir, 'index.html');

if (fs.existsSync(enHtml)) {
  fs.copyFileSync(enHtml, indexHtml);
  console.log('Copied en.html → index.html (root defaults to English)');
} else {
  console.warn('en.html not found, skipping root index copy');
}
