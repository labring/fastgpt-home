/**
 * Post-build: copy ${locale}.html to index.html based on NEXT_PUBLIC_DEFAULT_LOCALE
 * so root URL serves the correct default language content without a redirect.
 */
const fs = require('fs');
const path = require('path');

// Normalize locale to base language code (zh-CN → zh, en-US → en, etc.)
function normalizeLocale(locale) {
  if (!locale) return 'en';
  if (locale.startsWith('zh')) return 'zh';
  if (locale.startsWith('en')) return 'en';
  if (locale.startsWith('ja')) return 'ja';
  return 'en';
}

const outDir = path.join(__dirname, '..', 'out');
const rawLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
const defaultLocale = normalizeLocale(rawLocale);
const sourceHtml = path.join(outDir, `${defaultLocale}.html`);
const indexHtml = path.join(outDir, 'index.html');

if (fs.existsSync(sourceHtml)) {
  fs.copyFileSync(sourceHtml, indexHtml);
  console.log(`Copied ${defaultLocale}.html → index.html (root defaults to ${defaultLocale})`);
} else {
  console.warn(`${defaultLocale}.html not found, skipping root index copy`);
}
