/**
 * Post-build: Next static export emits one root <html> tag from app/layout.tsx.
 * Patch exported HTML files so crawlers and no-JS readers see the locale from
 * the URL path before the inline lang script runs in the browser.
 */
const fs = require('fs');
const path = require('path');
const { locales } = require('../src/config/site-routing.json');
const { getDefaultLocale, resolveSiteVariant } = require('./lib/site-variant');

const outDir = path.join(__dirname, '..', 'out');
const variant = resolveSiteVariant();
const defaultLocale = getDefaultLocale(variant);

function inferLocale(filePath) {
  const relative = path.relative(outDir, filePath).split(path.sep).join('/');
  if (relative === 'index.html') return defaultLocale;

  const [firstSegment] = relative.split('/');
  const rootPageLocale = firstSegment.replace(/\.html$/, '');

  if (Object.hasOwn(locales, rootPageLocale)) return rootPageLocale;
  if (Object.hasOwn(locales, firstSegment)) return firstSegment;

  return null;
}

function walkHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtmlFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function patchHtmlTag(html, locale) {
  return html.replace(/<html\b[^>]*>/i, (tag) => {
    let nextTag = tag;

    if (/\blang=/.test(nextTag)) {
      nextTag = nextTag.replace(/\blang=(["']).*?\1/i, `lang="${locale.htmlLang}"`);
    } else {
      nextTag = nextTag.replace(/^<html/i, `<html lang="${locale.htmlLang}"`);
    }

    if (/\bdir=/.test(nextTag)) {
      nextTag = nextTag.replace(/\bdir=(["']).*?\1/i, `dir="${locale.dir}"`);
    } else {
      nextTag = nextTag.replace(/^<html/i, `<html dir="${locale.dir}"`);
    }

    return nextTag;
  });
}

let patched = 0;

for (const filePath of walkHtmlFiles(outDir)) {
  const localeCode = inferLocale(filePath);
  if (!localeCode) continue;

  const locale = locales[localeCode];
  const html = fs.readFileSync(filePath, 'utf8');
  const patchedHtml = patchHtmlTag(html, locale);

  if (patchedHtml !== html) {
    fs.writeFileSync(filePath, patchedHtml);
    patched += 1;
  }
}

console.log(`Patched html lang/dir in ${patched} exported HTML files`);
