#!/usr/bin/env node

/**
 * Verify registry-owned Guide HTML and sitemap entries in one static export.
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT, 'src/content/guides/registry.json');
const GUIDE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VARIANTS = {
  io: { locale: 'en', host: 'https://fastgpt.io' },
  cn: { locale: 'zh', host: 'https://fastgpt.cn' }
};
const HUB_COPY = {
  en: {
    h1: 'FastGPT Guides',
    title: 'FastGPT Guides',
    description: 'Practical enterprise AI implementation and decision guides.',
    home: 'Home',
    guide: 'Guide',
    back: 'Back to guides'
  },
  zh: {
    h1: 'FastGPT 指南',
    title: 'FastGPT 指南',
    description: '企业 AI 落地与选型实践指南。',
    home: '首页',
    guide: '指南',
    back: '返回指南'
  }
};

function errorContext({ variant, slug, filePath, surface }) {
  return `variant=${variant} slug=${slug} path=${filePath} surface=${surface}`;
}

function fail(context, message) {
  throw new Error(`[verify-guide-export] ${errorContext(context)} ${message}`);
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 16)))
    .replace(/&#([0-9]+);/g, (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 10)))
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function stripHtml(value) {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || [];
}

function getAttribute(tag, attribute) {
  return decodeHtmlEntities(
    tag.match(new RegExp(`\\s${attribute}=["']([^"']*)["']`, 'i'))?.[1] || ''
  );
}

function getSingleTagContent(html, tagName, context) {
  const matches = [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi'))];
  if (matches.length !== 1) fail(context, `expected exactly one <${tagName}> element`);
  return stripHtml(matches[0][1]);
}

function getMetaContent(html, name, context) {
  const tag = getTags(html, 'meta').find(
    (candidate) => getAttribute(candidate, 'name').toLowerCase() === name.toLowerCase()
  );
  if (!tag) fail(context, `missing meta name=${name}`);
  return getAttribute(tag, 'content');
}

function getOpenGraphUrl(html, context) {
  const tag = getTags(html, 'meta').find(
    (candidate) => getAttribute(candidate, 'property').toLowerCase() === 'og:url'
  );
  if (!tag) fail(context, 'missing Open Graph URL');
  return getAttribute(tag, 'content');
}

function getCanonical(html, context) {
  const tag = getTags(html, 'link').find(
    (candidate) => getAttribute(candidate, 'rel').toLowerCase() === 'canonical'
  );
  if (!tag) fail(context, 'missing canonical link');
  return getAttribute(tag, 'href');
}

function getAlternates(html) {
  const alternates = {};
  for (const tag of getTags(html, 'link')) {
    if (getAttribute(tag, 'rel').toLowerCase() !== 'alternate') continue;
    const language = getAttribute(tag, 'hreflang');
    const href = getAttribute(tag, 'href');
    if (language && href) alternates[language] = href;
  }
  return alternates;
}

function getAnchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({
    href: getAttribute(`<a ${match[1]}>`, 'href'),
    text: stripHtml(match[2])
  }));
}

function getJsonLdTypes(html, context) {
  const types = new Set();
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!scripts.length) fail(context, 'missing JSON-LD script');

  const visit = (value) => {
    if (!value || typeof value !== 'object') return;
    const type = value['@type'];
    if (Array.isArray(type)) type.forEach((item) => types.add(item));
    else if (typeof type === 'string') types.add(type);
    for (const child of Object.values(value)) visit(child);
  };

  for (const script of scripts) {
    try {
      visit(JSON.parse(decodeHtmlEntities(script[1].trim())));
    } catch (error) {
      fail(context, `invalid JSON-LD: ${error.message}`);
    }
  }
  return types;
}

function loadRegistry(variant) {
  const context = { variant, slug: 'hub', filePath: REGISTRY_PATH, surface: 'registry' };
  let registry;
  try {
    registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  } catch (error) {
    fail(context, `unable to read registry: ${error.message}`);
  }
  if (!Array.isArray(registry.entries) || registry.entries.length !== 8) {
    fail(context, 'registry must contain exactly eight Guide entries');
  }
  const slugs = new Set();
  for (const entry of registry.entries) {
    if (!entry || typeof entry.slug !== 'string' || !GUIDE_SLUG.test(entry.slug)) {
      fail(context, 'registry contains an unsafe Guide slug');
    }
    if (slugs.has(entry.slug)) fail(context, `registry contains duplicate slug=${entry.slug}`);
    slugs.add(entry.slug);
    for (const locale of ['en', 'zh']) {
      const source = entry[locale];
      if (!source?.h1 || !source.metaTitle || !source.metaDescription || !Array.isArray(source.schemaTokens)) {
        fail(context, `registry snapshot is incomplete for slug=${entry.slug} locale=${locale}`);
      }
    }
  }
  return registry.entries;
}

function buildGuideExpectation(variant) {
  const projection = VARIANTS[variant];
  if (!projection) {
    fail({ variant: variant || 'missing', slug: 'hub', filePath: '<arguments>', surface: 'arguments' }, 'variant must be io or cn');
  }
  const entries = loadRegistry(variant);
  const routes = new Map();
  routes.set('/guide', { slug: 'hub', route: '/guide', source: HUB_COPY[projection.locale], hub: true });
  for (const entry of entries) {
    routes.set(`/guide/${entry.slug}`, {
      slug: entry.slug,
      route: `/guide/${entry.slug}`,
      source: entry[projection.locale],
      hub: false
    });
  }
  return { variant, ...projection, entries, routes };
}

function walkHtmlFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkHtmlFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function guideRouteFromFile(outDir, filePath) {
  const relative = path.relative(outDir, filePath).split(path.sep).join('/');
  if (relative === 'guide.html' || relative === 'guide/index.html') return '/guide';
  const match = relative.match(/^guide\/([^/]+)(?:\.html|\/index\.html)$/);
  if (!match) return undefined;
  try {
    return `/guide/${decodeURIComponent(match[1])}`;
  } catch {
    return undefined;
  }
}

function collectGuideRoutes(outDir, expectation) {
  const hubContext = { variant: expectation.variant, slug: 'hub', filePath: outDir, surface: 'inventory' };
  const files = [path.join(outDir, 'guide.html'), ...walkHtmlFiles(path.join(outDir, 'guide'))].filter((filePath) => fs.existsSync(filePath));
  const routes = new Map();
  for (const filePath of files) {
    const route = guideRouteFromFile(outDir, filePath);
    if (!route) continue;
    if (routes.has(route)) fail(hubContext, `duplicate Guide HTML route ${route}`);
    routes.set(route, filePath);
  }
  const actualRoutes = [...routes.keys()].sort();
  const expectedRoutes = [...expectation.routes.keys()].sort();
  if (actualRoutes.length !== expectedRoutes.length || actualRoutes.some((route, index) => route !== expectedRoutes[index])) {
    fail(hubContext, `expected exact Guide routes ${expectedRoutes.join(', ')}; found ${actualRoutes.join(', ') || '(none)'}`);
  }
  return routes;
}

function absoluteUrl(host, href) {
  return new URL(href, host).href;
}

function expectedAlternates(route) {
  return {
    'zh-CN': `https://fastgpt.cn${route}`,
    en: `https://fastgpt.io${route}`,
    'x-default': `https://fastgpt.io${route}`
  };
}

function assertEqual(context, actual, expected, surface) {
  if (actual !== expected) fail({ ...context, surface }, `expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
}

function verifyMetadata(html, page, expectation, filePath) {
  const context = { variant: expectation.variant, slug: page.slug, filePath, surface: 'metadata' };
  const canonical = `${expectation.host}${page.route}`;
  assertEqual(context, getSingleTagContent(html, 'title', context), page.source.title || page.source.metaTitle, 'title');
  assertEqual(context, getMetaContent(html, 'description', context), page.source.description || page.source.metaDescription, 'description');
  assertEqual(context, getCanonical(html, context), canonical, 'canonical');
  assertEqual(context, getOpenGraphUrl(html, context), canonical, 'og:url');

  const alternates = getAlternates(html);
  const expected = expectedAlternates(page.route);
  const languages = Object.keys(alternates).sort();
  const expectedLanguages = Object.keys(expected).sort();
  if (languages.length !== expectedLanguages.length || languages.some((language, index) => language !== expectedLanguages[index])) {
    fail({ ...context, surface: 'alternates' }, `expected alternate keys ${expectedLanguages.join(', ')}, received ${languages.join(', ')}`);
  }
  for (const [language, url] of Object.entries(expected)) {
    assertEqual(context, alternates[language], url, `alternate:${language}`);
  }
  assertEqual(context, getSingleTagContent(html, 'h1', context), page.source.h1, 'h1');
}

function verifyHub(html, page, expectation, filePath) {
  const context = { variant: expectation.variant, slug: page.slug, filePath, surface: 'schema' };
  const schemaTypes = getJsonLdTypes(html, context);
  for (const type of ['CollectionPage', 'ItemList', 'BreadcrumbList']) {
    if (!schemaTypes.has(type)) fail({ ...context, surface: 'schema' }, `missing JSON-LD type ${type}`);
  }
  const targets = new Set(getAnchors(html).map((anchor) => absoluteUrl(expectation.host, anchor.href)));
  for (const entry of expectation.entries) {
    const target = `${expectation.host}/guide/${entry.slug}`;
    if (!targets.has(target)) fail({ ...context, surface: 'navigation' }, `missing visible card target ${target}`);
  }
}

function verifyArticle(html, page, expectation, filePath) {
  const context = { variant: expectation.variant, slug: page.slug, filePath, surface: 'schema' };
  const schemaTypes = getJsonLdTypes(html, context);
  for (const type of page.source.schemaTokens) {
    if (!schemaTypes.has(type)) fail({ ...context, surface: 'schema' }, `missing JSON-LD type ${type}`);
  }

  const anchors = getAnchors(html);
  const links = new Set(anchors.map((anchor) => absoluteUrl(expectation.host, anchor.href)));
  for (const target of [expectation.host + '/', expectation.host + '/guide']) {
    if (!links.has(target)) fail({ ...context, surface: 'breadcrumb' }, `missing breadcrumb target ${target}`);
  }
  if (!anchors.some((anchor) => anchor.text === HUB_COPY[expectation.locale].back && absoluteUrl(expectation.host, anchor.href) === `${expectation.host}/guide`)) {
    fail({ ...context, surface: 'navigation' }, 'missing localized hub return link');
  }

  if (page.source.assetPolicy?.status === 'required') {
    const asset = getTags(html, 'img').find((tag) => getAttribute(tag, 'src') === page.source.assetPolicy.path);
    if (!asset) fail({ ...context, surface: 'asset' }, `missing required asset ${page.source.assetPolicy.path}`);
    assertEqual(context, getAttribute(asset, 'alt'), page.source.assetPolicy.alt, 'asset:alt');
  }
  for (const link of page.source.configuredInternalLinks || []) {
    const matching = anchors.find(
      (anchor) => anchor.text === link.label && absoluteUrl(expectation.host, anchor.href) === absoluteUrl(expectation.host, link.target)
    );
    if (!matching) fail({ ...context, surface: 'configured-link' }, `missing configured link ${link.label} → ${link.target}`);
  }
}

function parseSitemapUrls(outDir, expectation) {
  const filePath = path.join(outDir, 'sitemap.xml');
  const context = { variant: expectation.variant, slug: 'hub', filePath, surface: 'sitemap' };
  if (!fs.existsSync(filePath)) fail(context, 'missing sitemap.xml');
  const xml = fs.readFileSync(filePath, 'utf8');
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtmlEntities(match[1].trim()));
}

function verifySitemap(outDir, expectation) {
  const urls = parseSitemapUrls(outDir, expectation);
  const context = { variant: expectation.variant, slug: 'hub', filePath: path.join(outDir, 'sitemap.xml'), surface: 'sitemap' };
  const actual = urls.filter((url) => {
    try {
      const parsed = new URL(url);
      return parsed.pathname === '/guide' || /^\/guide\/[^/]+$/.test(parsed.pathname);
    } catch {
      return false;
    }
  });
  const expected = [...expectation.routes.keys()].map((route) => `${expectation.host}${route}`);
  if (new Set(actual).size !== actual.length) fail(context, 'contains duplicate Guide URLs');
  const sortedActual = [...actual].sort();
  const sortedExpected = [...expected].sort();
  if (sortedActual.length !== sortedExpected.length || sortedActual.some((url, index) => url !== sortedExpected[index])) {
    fail(context, `expected exact Guide sitemap URLs ${sortedExpected.join(', ')}; found ${sortedActual.join(', ') || '(none)'}`);
  }
  return actual.length;
}

function verifyGuideExport({ outDir, variant }) {
  const safeOutDir = outDir ? path.resolve(outDir) : '<missing>';
  const expectation = buildGuideExpectation(variant);
  if (!outDir || !fs.existsSync(safeOutDir) || !fs.statSync(safeOutDir).isDirectory()) {
    fail({ variant, slug: 'hub', filePath: safeOutDir, surface: 'output' }, 'output directory does not exist');
  }
  const routeFiles = collectGuideRoutes(safeOutDir, expectation);
  for (const [route, page] of expectation.routes) {
    const filePath = routeFiles.get(route);
    const html = fs.readFileSync(filePath, 'utf8');
    verifyMetadata(html, page, expectation, filePath);
    if (page.hub) verifyHub(html, page, expectation, filePath);
    else verifyArticle(html, page, expectation, filePath);
  }
  const sitemapUrls = verifySitemap(safeOutDir, expectation);
  return { variant, pages: routeFiles.size, sitemapUrls };
}

function parseArgs(argv) {
  let outDir;
  let variant;
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token !== '--out-dir' && token !== '--variant') {
      fail({ variant: variant || 'missing', slug: 'hub', filePath: outDir || '<missing>', surface: 'arguments' }, `unknown argument ${token}`);
    }
    const value = argv[++index];
    if (!value || value.startsWith('--')) {
      fail({ variant: variant || 'missing', slug: 'hub', filePath: outDir || '<missing>', surface: 'arguments' }, `missing value for ${token}`);
    }
    if (token === '--out-dir') outDir = path.resolve(ROOT, value);
    else variant = value;
  }
  if (!outDir) fail({ variant: variant || 'missing', slug: 'hub', filePath: '<missing>', surface: 'arguments' }, 'missing required --out-dir');
  if (!variant) fail({ variant: 'missing', slug: 'hub', filePath: outDir, surface: 'arguments' }, 'missing required --variant');
  if (!VARIANTS[variant]) fail({ variant, slug: 'hub', filePath: outDir, surface: 'arguments' }, 'variant must be io or cn');
  return { outDir, variant };
}

function main(argv = process.argv.slice(2)) {
  const result = verifyGuideExport(parseArgs(argv));
  console.log(`[verify-guide-export] variant=${result.variant} Guide HTML verified: ${result.pages} pages, ${result.sitemapUrls} sitemap URLs`);
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

module.exports = { parseArgs, buildGuideExpectation, verifyGuideExport, main };
