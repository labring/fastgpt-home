#!/usr/bin/env node

/** Verify every registry-owned Guide pair emitted by the Preview static export. */

const fs = require('node:fs');
const path = require('node:path');
const { getAnchors, getJsonLdNodes, getJsonLdNode, verifyArticleDates, verifyUpdatedTime,
  buildGuideExpectation, verifyMetadata, verifyGuideSectionAnchors } = require('./verify-guide-export');
const { verifyBodyLinks } = require('./lib/technical-export');

const ROOT = path.resolve(__dirname, '..');
const REGISTRY = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src/content/guides/registry.json'), 'utf8')
);
const TECHNICAL_GUIDE_ROUTES = new Set(require('./lib/redirects').getTechIdentities(ROOT)
  .filter((identity) => identity.canonicalPath.startsWith('/guide/'))
  .map((identity) => identity.sourcePath));
const GUIDE_TRACER_SLUG = 'poc-30-day-design';

function fail(message) {
  throw new Error(`[verify-guide-preview] ${message}`);
}

function htmlPath(outDir, route) {
  const relative = route.replace(/^\//, '');
  const candidates = [
    path.join(outDir, `${relative}.html`),
    path.join(outDir, relative, 'index.html')
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath];
  });
}

function collectGuideRoutes(outDir, localePrefix) {
  const prefix = localePrefix ? `/${localePrefix}` : '';
  const guideRoot = path.join(outDir, localePrefix || '', 'guide');
  const routes = new Set();
  const hub = htmlPath(outDir, `${prefix}/guide`);
  if (hub) routes.add(`${prefix}/guide`);
  for (const filePath of walkFiles(guideRoot)) {
    if (!filePath.endsWith('.html')) continue;
    const relative = path.relative(guideRoot, filePath).split(path.sep).join('/');
    const slug = relative.replace(/\/index\.html$|\.html$/, '');
    const route = `${prefix}/guide/${slug}`;
    if (slug && slug !== 'index' && !TECHNICAL_GUIDE_ROUTES.has(route)) routes.add(route);
  }
  return routes;
}

function assertJsonLdTypes(html, expectedTypes, label) {
  const context = { variant: 'preview', slug: label };
  const nodes = getJsonLdNodes(html, context);
  for (const type of expectedTypes) getJsonLdNode(nodes, type, context, 'schema');
}

function verifyHtmlLanguage(html, slug, locale) {
  const expectedLang = locale === 'zh' ? 'zh-CN' : 'en-US';
  const lang = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1];
  if (lang !== expectedLang)
    fail(`${locale} ${slug} html lang expected ${expectedLang}, received ${lang || '(missing)'}`);
}

function hrefs(html) {
  return getAnchors(html).map((anchor) => anchor.href);
}

function verifyPage(outDir, slug, locale) {
  const routePrefix = `/${locale}`;
  const route = `${routePrefix}/guide/${slug}`;
  const filePath = htmlPath(outDir, route);
  if (!filePath) fail(`missing ${locale} Guide page ${route}`);
  const html = fs.readFileSync(filePath, 'utf8');
  const source = REGISTRY.entries.find((entry) => entry.slug === slug)?.[locale];
  if (!source) fail(`missing registry source for ${locale} ${slug}`);
  const host = locale === 'zh' ? 'https://fastgpt.cn' : 'https://fastgpt.io';
  const canonical = `${host}/guide/${slug}`;
  verifyHtmlLanguage(html, slug, locale);
  const context = { variant: 'preview', slug, filePath };
  const article = getJsonLdNode(getJsonLdNodes(html, context), 'Article', context, 'schema');
  verifyArticleDates(article, source, canonical);
  verifyUpdatedTime(html, { source }, { locale }, context);
  const expectation = { ...buildGuideExpectation(locale === 'zh' ? 'cn' : 'io'), variant: 'preview' };
  verifyMetadata(html, expectation.routes.get(`/guide/${slug}`), expectation, filePath);
  verifyGuideSectionAnchors(html, context);
  verifyBodyLinks(html, fs.readFileSync(path.join(ROOT, 'src/content/guides', locale, source.sourceName), 'utf8'), 'preview', outDir);
  assertJsonLdTypes(html, ['Article', 'BreadcrumbList'], `${locale} ${slug}`);
  const links = hrefs(html);
  const hubPath = `${routePrefix}/guide`;
  if (links.filter((href) => href === hubPath).length < 2) {
    fail(`${locale} ${slug} is missing prefixed Guide breadcrumb or return links`);
  }
  const homePath = locale === 'zh' ? '/zh' : '/';
  if (!links.includes(homePath)) fail(`${locale} ${slug} is missing its localized home link`);
}

/** Verify every exported Guide route against the current registry. */
function verifyGuidePreview({ outDir }) {
  const safeOutDir = path.resolve(outDir || '');
  if (!outDir || !fs.existsSync(safeOutDir)) fail(`output directory does not exist: ${safeOutDir}`);
  const expectedRoutes = new Set([
    ...['en', 'zh'].flatMap((prefix) => {
      const routePrefix = `/${prefix}`;
      return [
        `${routePrefix}/guide`,
        ...REGISTRY.entries.map((entry) => `${routePrefix}/guide/${entry.slug}`)
      ];
    })
  ]);
  const actualRoutes = new Set([
    ...collectGuideRoutes(safeOutDir, 'en'),
    ...collectGuideRoutes(safeOutDir, 'zh')
  ]);
  if (
    actualRoutes.size !== expectedRoutes.size ||
    [...expectedRoutes].some((route) => !actualRoutes.has(route))
  ) {
    fail(
      `Guide route inventory differs; expected ${expectedRoutes.size}, received ${actualRoutes.size}`
    );
  }
  if (htmlPath(safeOutDir, '/guide')) fail('Preview must omit the unprefixed Guide hub');
  for (const route of ['/en/guide', '/zh/guide']) {
    if (!htmlPath(safeOutDir, route)) fail(`missing Guide hub ${route}`);
    const html = fs.readFileSync(htmlPath(safeOutDir, route), 'utf8');
    const locale = route.startsWith('/zh') ? 'zh' : 'en';
    verifyHtmlLanguage(html, '', locale);
    const expectation = { ...buildGuideExpectation(locale === 'zh' ? 'cn' : 'io'), variant: 'preview' };
    verifyMetadata(html, expectation.routes.get('/guide'), expectation, htmlPath(safeOutDir, route));
    assertJsonLdTypes(html, ['CollectionPage', 'ItemList', 'BreadcrumbList'], `${locale} hub`);
    const links = hrefs(html);
    for (const entry of REGISTRY.entries) {
      const expected = `/${locale}/guide/${entry.slug}`;
      if (!links.includes(expected)) fail(`${locale} hub is missing card target ${expected}`);
    }
    const homePath = locale === 'zh' ? '/zh' : '/';
    if (!links.includes(homePath)) fail(`${locale} hub is missing its localized home link`);
  }
  for (const { slug } of REGISTRY.entries) {
    verifyPage(safeOutDir, slug, 'en');
    verifyPage(safeOutDir, slug, 'zh');
  }
  return {
    pages: REGISTRY.entries.length * 2,
    pairs: REGISTRY.entries.length,
    tracer: GUIDE_TRACER_SLUG
  };
}

/** Parse the static export directory argument. */
function parseArgs(argv) {
  if (argv.length !== 2 || argv[0] !== '--out-dir' || !argv[1] || argv[1].startsWith('--')) {
    throw new Error('Usage: node scripts/verify-guide-preview.js --out-dir <directory>');
  }
  return { outDir: path.resolve(ROOT, argv[1]) };
}

/** Run the Preview Guide contract and print bounded evidence. */
function main(argv = process.argv.slice(2)) {
  const result = verifyGuidePreview(parseArgs(argv));
  console.log(
    `[verify-guide-preview] Guide Preview HTML verified: ${result.pages} pages, ${result.pairs} bilingual pairs (tracer=${result.tracer})`
  );
  return result;
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { main, parseArgs, verifyGuidePreview };
