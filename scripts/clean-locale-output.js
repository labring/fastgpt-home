#!/usr/bin/env node
/** Finalize static output for the selected site variant. */
const fs = require('node:fs');
const path = require('node:path');
const {
  buildRedirects,
  getTechPaths,
  writeCloudflareWorker,
  writeNginxRedirectMap
} = require('./lib/redirects');
const {
  getDefaultLocale,
  getPublishedLocaleCodes,
  localeCodes,
  resolveSiteVariant
} = require('./lib/site-variant');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const nextDir = path.join(rootDir, '.next');
const variant = resolveSiteVariant();
const defaultLocale = getDefaultLocale(variant);
const allowedLocales = new Set(getPublishedLocaleCodes(variant));
const techPaths = getTechPaths(rootDir);

function removePath(targetPath) {
  if (!fs.existsSync(targetPath)) return 0;
  fs.rmSync(targetPath, { recursive: true, force: true });
  return 1;
}

function removeRoute(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  if (!relativeRoute) return 0;
  return [
    path.join(outDir, `${relativeRoute}.html`),
    path.join(outDir, `${relativeRoute}.txt`),
    path.join(outDir, relativeRoute)
  ].reduce((count, targetPath) => count + removePath(targetPath), 0);
}

function walkHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtmlFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function patchPreviewRobots() {
  let patched = 0;
  for (const filePath of walkHtmlFiles(outDir)) {
    const html = fs.readFileSync(filePath, 'utf8');
    const robotsPattern = /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/gi;
    const robotsTag = '<meta name="robots" content="noindex, nofollow"/>';
    const nextHtml = robotsPattern.test(html)
      ? html.replace(robotsPattern, robotsTag)
      : html.replace(/<\/head>/i, `${robotsTag}</head>`);
    if (nextHtml !== html) {
      fs.writeFileSync(filePath, nextHtml);
      patched += 1;
    }
  }
  return patched;
}

let removed = 0;
for (const locale of localeCodes) {
  if (allowedLocales.has(locale)) continue;
  removed += removePath(path.join(outDir, locale));
  removed += removePath(path.join(outDir, `${locale}.html`));
  removed += removePath(path.join(outDir, `${locale}.txt`));
}

// The technical center currently publishes complete content only in Simplified Chinese.
if (defaultLocale !== 'zh') removed += removeRoute('/tech-center');
for (const techPath of techPaths) {
  const canonicalPath = techPath.replace(/^\/zh(?=\/)/, '');
  removed += removeRoute(variant === 'cn' ? techPath : canonicalPath);
}

const { cnRedirects, ioRedirects } = buildRedirects(rootDir);
writeNginxRedirectMap(nextDir, variant === 'cn' ? cnRedirects : new Map());
removePath(path.join(outDir, '_redirects'));

let previewHtmlPatched = 0;
if (variant === 'preview') {
  for (const entry of fs.readdirSync(outDir)) {
    if (entry.startsWith('sitemap')) removed += removePath(path.join(outDir, entry));
  }
  previewHtmlPatched = patchPreviewRobots();
  writeCloudflareWorker(outDir, new Map(), true);
} else if (variant === 'io') {
  writeCloudflareWorker(outDir, ioRedirects, false);
}

console.log(
  `[clean-locale-output] variant=${variant}; kept=${[...allowedLocales].join(',')}; removed=${removed}; previewHtmlPatched=${previewHtmlPatched}`
);
