#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  getCanonicalBaseUrl,
  getDefaultLocale,
  getProductionBaseUrls,
  resolveSiteVariant
} = require('./lib/site-variant');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const variant = resolveSiteVariant();
const productionBaseUrls = getProductionBaseUrls();
const baseUrl = getCanonicalBaseUrl(variant);
const defaultLocale = getDefaultLocale(variant);
const englishRouteRegistry = require('../src/faq/generated-en-route-registry.json');
const sampleFaqId = englishRouteRegistry.records.find(
  (record) => record.contentId === 'Why-are-enterprises-paying-more',
)?.canonicalSlug;
assert(sampleFaqId, 'Missing canonical route for the P2 FAQ sample contentId');
const {
  TITLE_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH
} = require('../src/lib/faqMetadata.constants.json');

function resolveHtml(route, required = true) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  const candidates = relativeRoute
    ? [path.join(outDir, `${relativeRoute}.html`), path.join(outDir, relativeRoute, 'index.html')]
    : [path.join(outDir, 'index.html')];
  const htmlPath = candidates.find((candidate) => fs.existsSync(candidate));

  if (required) assert(htmlPath, `Missing static HTML for ${route}`);
  return htmlPath ? fs.readFileSync(htmlPath, 'utf8') : null;
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, codePoint) =>
      String.fromCodePoint(Number.parseInt(codePoint, 16))
    )
    .replace(/&#([0-9]+);/g, (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 10)))
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || [];
}

function getAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`\\s${attribute}="([^"]*)"`, 'i'));
  return match?.[1];
}

function getMetaContent(html, attribute, value) {
  const tag = getTags(html, 'meta').find((candidate) => {
    return getAttribute(candidate, attribute) === value;
  });
  assert(tag, `Missing meta ${attribute}="${value}"`);
  return decodeHtmlEntities(getAttribute(tag, 'content') || '');
}

function getTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  assert(match, 'Missing document title');
  return decodeHtmlEntities(match[1]);
}

function getHeadingLevels(html) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>[\s\S]*?<\/h\1>/gi)].map((match) => Number(match[1]));
}

function verifyHeadingSequence(route, html) {
  const levels = getHeadingLevels(html);
  assert(levels.length > 0, `${route} has no headings`);
  assert.equal(levels[0], 1, `${route} must begin with an h1`);
  assert.equal(
    levels.filter((level) => level === 1).length,
    1,
    `${route} must contain exactly one h1`
  );

  for (let index = 1; index < levels.length; index += 1) {
    assert(
      levels[index] <= levels[index - 1] + 1,
      `${route} skips from h${levels[index - 1]} to h${levels[index]}`
    );
  }

  return levels;
}

function getExpectedCanonicalPath(route) {
  const defaultPrefix = `/${defaultLocale}`;
  if (route === defaultPrefix) return '/';
  if (route === `${defaultPrefix}/price`) return '/price';
  if (route === `${defaultPrefix}/contact`) return '/contact';
  if (route === `${defaultPrefix}/faq` || route.startsWith(`${defaultPrefix}/faq/`)) {
    return route.slice(defaultPrefix.length);
  }
  return route;
}

function verifyCanonical(route, html, expectedPath) {
  const canonical = getTags(html, 'link').find((tag) => getAttribute(tag, 'rel') === 'canonical');
  assert(canonical, `Missing canonical for ${route}`);
  const canonicalHref = getAttribute(canonical, 'href');
  assert(canonicalHref, `Canonical is missing an href for ${route}`);

  if (expectedPath) {
    const expectedBaseUrl =
      variant === 'preview' && (route === '/zh' || route.startsWith('/zh/'))
        ? productionBaseUrls.cn
        : baseUrl;
    const canonicalPath =
      expectedBaseUrl === productionBaseUrls.cn && variant === 'preview'
        ? route.slice('/zh'.length) || '/'
        : expectedPath;
    assert.equal(
      new URL(canonicalHref).href,
      new URL(`${expectedBaseUrl}${canonicalPath}`).href,
      `Unexpected canonical for ${route}`
    );
  }
}

function verifyPageMetadata(
  route,
  html,
  { enforceLength = false, verifyCanonicalTarget = true } = {}
) {
  const title = getTitle(html);
  const description = getMetaContent(html, 'name', 'description');

  if (enforceLength) {
    assert(
      Array.from(title).length <= TITLE_MAX_LENGTH,
      `${route} title exceeds ${TITLE_MAX_LENGTH} characters: ${Array.from(title).length}`
    );
    assert(
      Array.from(description).length <= DESCRIPTION_MAX_LENGTH,
      `${route} description exceeds ${DESCRIPTION_MAX_LENGTH} characters: ${
        Array.from(description).length
      }`
    );

    for (const [attribute, value, expected] of [
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', description]
    ]) {
      assert.equal(
        getMetaContent(html, attribute, value),
        expected,
        `${route} ${attribute}="${value}" must match document metadata`
      );
    }
  }
  verifyCanonical(route, html, verifyCanonicalTarget ? getExpectedCanonicalPath(route) : undefined);
}

function walkHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtmlFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function isFaqDetailFile(filePath) {
  const relativePath = path.relative(outDir, filePath).split(path.sep);
  const faqIndex = relativePath.indexOf('faq');
  if (faqIndex < 0) return false;

  const afterFaq = relativePath.slice(faqIndex + 1);
  return afterFaq.length > 0 && !(afterFaq.length === 1 && afterFaq[0] === 'index.html');
}

function verifyAllFaqMetadata() {
  const faqFiles = walkHtmlFiles(outDir).filter(isFaqDetailFile);
  assert(faqFiles.length > 0, 'No FAQ detail HTML files found');

  for (const filePath of faqFiles) {
    const html = fs.readFileSync(filePath, 'utf8');
    const relativePath = `/${path.relative(outDir, filePath).split(path.sep).join('/')}`;
    verifyPageMetadata(relativePath, html, {
      enforceLength: true,
      verifyCanonicalTarget: false
    });
  }

  return faqFiles.length;
}

function verifyDefaultLocaleMigrationCoverage() {
  if (variant === 'preview') return 0;

  const legacyLocaleDir = path.join(outDir, defaultLocale);
  const legacyFaqDir = path.join(legacyLocaleDir, 'faq');
  const canonicalFaqDir = path.join(outDir, 'faq');
  const legacyFaqFiles = walkHtmlFiles(legacyFaqDir);

  assert(legacyFaqFiles.length > 0, `No legacy ${defaultLocale} FAQ detail HTML files found`);

  for (const legacyFilePath of legacyFaqFiles) {
    const relativePath = path.relative(legacyFaqDir, legacyFilePath);
    const canonicalFilePath = path.join(canonicalFaqDir, relativePath);
    assert(
      fs.existsSync(canonicalFilePath),
      `Missing canonical FAQ migration target for /${defaultLocale}/faq/${relativePath}`
    );
  }

  return legacyFaqFiles.length;
}

function main() {
  const routes = ['/', '/price', '/contact', '/faq', `/faq/${sampleFaqId}`];

  for (const route of [
    '/en',
    '/zh',
    `/${defaultLocale}/price`,
    `/${defaultLocale}/contact`,
    '/zh-hant/contact',
    '/en/faq',
    '/zh/faq'
  ]) {
    if (resolveHtml(route, false)) routes.push(route);
  }

  for (const route of [`/en/faq/${sampleFaqId}`, `/zh/faq/${sampleFaqId}`]) {
    if (resolveHtml(route, false)) routes.push(route);
  }

  const htmlByRoute = new Map(routes.map((route) => [route, resolveHtml(route)]));

  for (const [route, html] of htmlByRoute) {
    verifyHeadingSequence(route, html);
    verifyPageMetadata(route, html, { enforceLength: route.includes('/faq/') });
  }

  for (const route of ['/en', '/zh'].filter((candidate) => resolveHtml(candidate, false))) {
    const levels = getHeadingLevels(htmlByRoute.get(route));
    assert(
      levels.every((level) => level <= 3),
      `${route} must use h1 through h3 only`
    );
    assert(!levels.includes(4), `${route} still contains h4 headings`);
    assert(!levels.includes(5), `${route} still contains h5 headings`);
  }

  for (const route of ['/faq', '/en/faq', '/zh/faq'].filter((candidate) =>
    resolveHtml(candidate, false)
  )) {
    const levels = getHeadingLevels(htmlByRoute.get(route));
    assert.equal(levels[0], 1, `${route} must expose the FAQ title as h1`);
    assert(levels.includes(2), `${route} must expose FAQ card headings as h2`);
  }

  for (const route of [
    `/faq/${sampleFaqId}`,
    `/en/faq/${sampleFaqId}`,
    `/zh/faq/${sampleFaqId}`
  ].filter((candidate) => resolveHtml(candidate, false))) {
    const levels = getHeadingLevels(htmlByRoute.get(route));
    assert.deepEqual(levels.slice(0, 3), [1, 2, 3], `${route} must keep h1 -> h2 -> h3 order`);
  }

  const sitemapPath = path.join(outDir, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    const legacyPrefix = `${baseUrl}/${defaultLocale}`;
    const legacySitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((match) => match[1])
      .filter((url) => url === legacyPrefix || url.startsWith(`${legacyPrefix}/`));
    assert.equal(legacySitemapUrls.length, 0, 'Sitemap contains default-locale prefixed URLs');
  }

  const faqFileCount = verifyAllFaqMetadata();
  const migratedFaqFileCount = verifyDefaultLocaleMigrationCoverage();
  console.log(
    `P2 verification passed for ${baseUrl}: ${faqFileCount} FAQ detail pages checked, ${migratedFaqFileCount} ${defaultLocale} migration targets matched`
  );
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
