/**
 * Post-build: copy ${locale}.html to index.html based on NEXT_PUBLIC_DEFAULT_LOCALE
 * so root URL serves the correct default language content without a redirect.
 */
const fs = require('fs');
const path = require('path');

// Normalize locale to the static route code (zh-CN → zh, zh-Hant → zh-hant, etc.)
function normalizeLocale(locale) {
  if (!locale) return 'en';
  const normalized = String(locale).toLowerCase().replace(/_/g, '-');
  if (
    normalized.startsWith('zh-hant') ||
    normalized.startsWith('zh-tw') ||
    normalized.startsWith('zh-hk') ||
    normalized.startsWith('zh-mo')
  ) {
    return 'zh-hant';
  }
  if (normalized.startsWith('zh')) return 'zh';
  if (normalized.startsWith('en')) return 'en';
  if (normalized.startsWith('ja')) return 'ja';
  if (normalized.startsWith('ar')) return 'ar';
  if (normalized.startsWith('vi')) return 'vi';
  if (normalized.startsWith('th')) return 'th';
  if (normalized.startsWith('id')) return 'id';
  if (normalized.startsWith('ms')) return 'ms';
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
