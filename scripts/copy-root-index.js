/**
 * Post-build: copy ${locale}.html to index.html based on NEXT_PUBLIC_DEFAULT_LOCALE
 * so root URL serves the correct default language content without a redirect.
 */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
const sourceHtml = path.join(outDir, `${defaultLocale}.html`);
const indexHtml = path.join(outDir, 'index.html');

if (fs.existsSync(sourceHtml)) {
  fs.copyFileSync(sourceHtml, indexHtml);
  console.log(`Copied ${defaultLocale}.html → index.html (root defaults to ${defaultLocale})`);
} else {
  console.warn(`${defaultLocale}.html not found, skipping root index copy`);
}
