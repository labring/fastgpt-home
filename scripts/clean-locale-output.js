#!/usr/bin/env node
/** Finalize static output for the selected site variant. */
const fs = require('node:fs');
const path = require('node:path');
const {
  buildRedirects,
  getTechIdentities,
  getTechRoutesToRemove,
  writeCloudflareWorker,
  writeNginxRedirectMap
} = require('./lib/redirects');
const {
  getUrlAliasAuthorityDigest,
  getUrlAliasAuthoritySummary,
  readUrlAliasAuthority
} = require('./lib/url-alias-authority');
const { getPublishedLocaleCodes, localeCodes, resolveSiteVariant } = require('./lib/site-variant');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const nextDir = path.join(rootDir, '.next');
const variant = resolveSiteVariant();
const allowedLocales = new Set(getPublishedLocaleCodes(variant));
const techIdentities = getTechIdentities(rootDir);
const aliasAuthority = readUrlAliasAuthority(rootDir);
const aliasAuthoritySummary = getUrlAliasAuthoritySummary(aliasAuthority);
const aliasAuthorityMetadata = {
  authorityDigest: getUrlAliasAuthorityDigest(aliasAuthority),
  authoritySourceCount: aliasAuthority.records.length,
  authorityTargetCount: aliasAuthoritySummary.targets,
  authoritySourceHosts: aliasAuthoritySummary.sourceHosts,
  authorityManyToOneTargets: aliasAuthoritySummary.manyToOneTargets
};

function removePath(targetPath) {
  if (!fs.existsSync(targetPath)) return 0;
  fs.rmSync(targetPath, { recursive: true, force: true });
  return 1;
}

function removeRouteDocuments(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  if (!relativeRoute) return 0;
  return [
    path.join(outDir, `${relativeRoute}.html`),
    path.join(outDir, `${relativeRoute}.txt`)
  ].reduce((count, targetPath) => count + removePath(targetPath), 0);
}

function removeRoute(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  if (!relativeRoute) return 0;
  return removeRouteDocuments(route) + removePath(path.join(outDir, relativeRoute));
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

for (const route of getTechRoutesToRemove(techIdentities, variant)) {
  removed += route === '/tech-center' ? removeRouteDocuments(route) : removeRoute(route);
}

if (variant === 'preview') {
  removed += removeRoute('/guide');
} else {
  removed += removeRoute('/zh/guide');
  removed += removeRoute('/en/guide');
}

const { cnRedirects, ioRedirects } = buildRedirects(rootDir);
writeNginxRedirectMap(nextDir, variant === 'cn' ? cnRedirects : new Map(), aliasAuthorityMetadata);
removePath(path.join(outDir, '_redirects'));

let previewHtmlPatched = 0;
if (variant === 'preview') {
  for (const entry of fs.readdirSync(outDir)) {
    if (entry.startsWith('sitemap')) removed += removePath(path.join(outDir, entry));
  }
  previewHtmlPatched = patchPreviewRobots();
  writeCloudflareWorker(outDir, new Map(), true, aliasAuthorityMetadata);
} else if (variant === 'io') {
  writeCloudflareWorker(outDir, ioRedirects, false, aliasAuthorityMetadata);
}

console.log(
  `[clean-locale-output] variant=${variant}; kept=${[...allowedLocales].join(
    ','
  )}; removed=${removed}; previewHtmlPatched=${previewHtmlPatched}`
);
