#!/usr/bin/env node

/**
 * Verify registry-owned Guide HTML and sitemap entries in one static export.
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT, 'src/content/guides/registry.json');
const POLICY_PATH = path.join(ROOT, 'src/content/guides/policy.json');
const GUIDE_ENTRY_COUNT = JSON.parse(fs.readFileSync(POLICY_PATH, 'utf8')).entryCount;
const GUIDE_TRACER_SLUG = 'poc-30-day-design';
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

function stripAriaHiddenContent(value) {
  return value.replace(
    /<([a-z][\w:-]*)\b[^>]*\baria-hidden=["']true["'][^>]*>[\s\S]*?<\/\1>/gi,
    ''
  );
}

function getSingleTagContent(html, tagName, context) {
  const matches = [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi'))];
  if (matches.length !== 1) fail(context, `expected exactly one <${tagName}> element`);
  return stripHtml(matches[0][1]);
}

function getMetaContent(html, name, context) {
  const tags = getTags(html, 'meta').filter(
    (candidate) => getAttribute(candidate, 'name').toLowerCase() === name.toLowerCase()
  );
  if (tags.length !== 1) fail(context, `expected exactly one meta name=${name}`);
  return getAttribute(tags[0], 'content');
}

function getOpenGraphUrl(html, context) {
  const tags = getTags(html, 'meta').filter(
    (candidate) => getAttribute(candidate, 'property').toLowerCase() === 'og:url'
  );
  if (tags.length !== 1) fail(context, 'expected exactly one Open Graph URL');
  return getAttribute(tags[0], 'content');
}

function getCanonical(html, context) {
  const tags = getTags(html, 'link').filter(
    (candidate) => getAttribute(candidate, 'rel').toLowerCase() === 'canonical'
  );
  if (tags.length !== 1) fail(context, 'expected exactly one canonical link');
  return getAttribute(tags[0], 'href');
}

function getAlternates(html, context) {
  const alternates = {};
  for (const tag of getTags(html, 'link')) {
    if (getAttribute(tag, 'rel').toLowerCase() !== 'alternate') continue;
    const language = getAttribute(tag, 'hreflang');
    const href = getAttribute(tag, 'href');
    if (!language || !href) fail(context, 'alternate link requires hreflang and href');
    if (alternates[language]) fail(context, `duplicate alternate key ${language}`);
    alternates[language] = href;
  }
  return alternates;
}

function getAnchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({
    href: getAttribute(`<a ${match[1]}>`, 'href'),
    text: stripHtml(stripAriaHiddenContent(match[2]))
  }));
}

function getGuideSections(html) {
  return [...html.matchAll(/<h[2-6]\b([^>]*)>([\s\S]*?)<\/h[2-6]>/gi)]
    .map((match) => ({
      id: getAttribute('<h ' + match[1] + '>', 'id'),
      text: stripHtml(match[2])
    }))
    .filter((heading) => heading.id.startsWith('guide-section-'));
}

function verifyGuideSectionAnchors(html, context) {
  const sections = getGuideSections(html);
  if (!sections.length) return;

  const sectionsById = new Map();
  for (const section of sections) {
    if (sectionsById.has(section.id)) {
      fail({ ...context, surface: 'anchors' }, 'duplicate Guide section id ' + section.id);
    }
    sectionsById.set(section.id, section);
  }

  const fragmentAnchors = getAnchors(html).filter((anchor) => anchor.href.startsWith('#guide-section-'));
  if (!fragmentAnchors.length) {
    fail({ ...context, surface: 'anchors' }, 'Guide section headings require visible fragment links');
  }

  const referencedIds = new Set();
  for (const anchor of fragmentAnchors) {
    const targetId = anchor.href.slice(1);
    const section = sectionsById.get(targetId);
    if (!section) {
      fail(
        { ...context, surface: 'anchors' },
        'fragment link ' + anchor.href + ' has no matching Guide heading'
      );
    }
    if (section.text !== anchor.text) {
      fail(
        { ...context, surface: 'anchors' },
        'fragment link ' + anchor.href + ' label must match heading text'
      );
    }
    referencedIds.add(targetId);
  }

  for (const section of sections) {
    if (!referencedIds.has(section.id)) {
      fail(
        { ...context, surface: 'anchors' },
        'Guide heading ' + section.id + ' is missing from the visible TOC'
      );
    }
  }
}

function getJsonLdNodes(html, context) {
  const nodes = [];
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!scripts.length) fail(context, 'missing JSON-LD script');

  const visit = (value) => {
    if (!value || typeof value !== 'object') return;
    if (typeof value['@type'] === 'string' || Array.isArray(value['@type'])) nodes.push(value);
    for (const child of Object.values(value)) visit(child);
  };

  for (const script of scripts) {
    try {
      visit(JSON.parse(decodeHtmlEntities(script[1].trim())));
    } catch (error) {
      fail(context, `invalid JSON-LD: ${error.message}`);
    }
  }
  return nodes;
}

function hasJsonLdType(node, type) {
  return node['@type'] === type || (Array.isArray(node['@type']) && node['@type'].includes(type));
}

function getJsonLdNode(nodes, type, context, surface) {
  const node = nodes.find((candidate) => hasJsonLdType(candidate, type));
  if (!node) fail({ ...context, surface }, `missing JSON-LD type ${type}`);
  return node;
}

function assertSchemaValue(context, actual, expected, surface, field) {
  if (actual !== expected) {
    fail({ ...context, surface }, `${surface} ${field} expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
}

function assertBreadcrumbUrls(context, node, expectedUrls, surface) {
  const actualUrls = node.itemListElement?.map((item) => item.item || item.url) || [];
  if (
    actualUrls.length !== expectedUrls.length ||
    actualUrls.some((url, index) => url !== expectedUrls[index])
  ) {
    fail(
      { ...context, surface },
      `${surface} expected ordered breadcrumb URLs ${expectedUrls.join(', ')}, received ${actualUrls.join(', ') || '(none)'}`
    );
  }
}

function loadRegistry(variant, entries) {
  const context = { variant, slug: 'hub', filePath: REGISTRY_PATH, surface: 'registry' };
  let resolvedEntries = entries;
  if (!resolvedEntries) {
    try {
      resolvedEntries = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8')).entries;
    } catch (error) {
      fail(context, `unable to read registry: ${error.message}`);
    }
  }
  const expectedEntryCount = entries ? entries.length : GUIDE_ENTRY_COUNT;
  if (!Array.isArray(resolvedEntries) || resolvedEntries.length !== expectedEntryCount) {
    fail(context, `registry must contain exactly ${expectedEntryCount} Guide entries`);
  }
  const slugs = new Set();
  for (const entry of resolvedEntries) {
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
  return resolvedEntries;
}

function buildGuideExpectation(variant, { entries } = {}) {
  const projection = VARIANTS[variant];
  if (!projection) {
    fail({ variant: variant || 'missing', slug: 'hub', filePath: '<arguments>', surface: 'arguments' }, 'variant must be io or cn');
  }
  const resolvedEntries = loadRegistry(variant, entries);
  const routes = new Map();
  routes.set('/guide', { slug: 'hub', route: '/guide', source: HUB_COPY[projection.locale], hub: true });
  for (const entry of resolvedEntries) {
    routes.set(`/guide/${entry.slug}`, {
      slug: entry.slug,
      route: `/guide/${entry.slug}`,
      source: entry[projection.locale],
      hub: false
    });
  }
  return { variant, ...projection, entries: resolvedEntries, routes };
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

function assertNoCaseFoldCollisions(routes, context) {
  const byFoldedRoute = new Map();
  for (const route of routes) {
    const folded = route.toLocaleLowerCase('en-US');
    const previous = byFoldedRoute.get(folded);
    if (previous && previous !== route) {
      fail(
        context,
        `case-fold Guide route collision ${previous} and ${route}; use a case-sensitive export host`
      );
    }
    byFoldedRoute.set(folded, route);
  }
}

function collectGuideRoutes(outDir, expectation) {
  const hubContext = { variant: expectation.variant, slug: 'hub', filePath: outDir, surface: 'inventory' };
  const files = [path.join(outDir, 'guide.html'), ...walkHtmlFiles(path.join(outDir, 'guide'))].filter((filePath) => fs.existsSync(filePath));
  const routes = new Map();
  for (const filePath of files) {
    const route = guideRouteFromFile(outDir, filePath);
    if (!route) fail(hubContext, `invalid Guide HTML output path ${filePath}`);
    if (routes.has(route)) fail(hubContext, `duplicate Guide HTML route ${route}`);
    routes.set(route, filePath);
  }
  assertNoCaseFoldCollisions([...routes.keys()], hubContext);
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

function expectedUpdatedText(dateModified, locale) {
  const [year, month, day] = dateModified.split('-').map(Number);
  if (locale === 'zh') return `更新于 ${year}年${month}月${day}日`;
  const date = new Date(Date.UTC(year, month - 1, day));
  const formatted = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: locale === 'zh' ? 'numeric' : 'long',
    day: 'numeric'
  }).format(date);
  return `Last updated ${formatted}`;
}

function verifyUpdatedTime(html, page, expectation, context) {
  const summary = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>\s*<time\b([^>]*)>([\s\S]*?)<\/time>/gi)].find(
    (match) => stripHtml(match[1]) === page.source.metaDescription,
  );
  if (!summary) fail({ ...context, surface: 'updated' }, 'updated time must immediately follow the summary');
  const times = [...html.matchAll(/<time\b([^>]*)>([\s\S]*?)<\/time>/gi)];
  if (times.length !== 1) fail({ ...context, surface: 'updated' }, 'expected exactly one updated time element');
  assertEqual(context, getAttribute(`<time ${summary[2]}>`, 'datetime'), page.source.dateModified, 'updated');
  assertEqual(context, stripHtml(summary[3]), expectedUpdatedText(page.source.dateModified, expectation.locale), 'updated');
}

function verifyMetadata(html, page, expectation, filePath) {
  const context = { variant: expectation.variant, slug: page.slug, filePath, surface: 'metadata' };
  const canonical = `${expectation.host}${page.route}`;
  assertEqual(context, getSingleTagContent(html, 'title', context), page.source.title || page.source.metaTitle, 'title');
  assertEqual(context, getMetaContent(html, 'description', context), page.source.description || page.source.metaDescription, 'description');
  assertEqual(context, getCanonical(html, context), canonical, 'canonical');
  assertEqual(context, getOpenGraphUrl(html, context), canonical, 'og:url');

  const alternates = getAlternates(html, { ...context, surface: 'alternates' });
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

function verifySharedShell(html, page, expectation, filePath) {
  const context = { variant: expectation.variant, slug: page.slug, filePath, surface: 'shell' };
  const navbarClasses = ['fixed', 'top-0', 'left-0', 'right-0', 'z-50'];
  const navbars = getTags(html, 'nav').filter((tag) => {
    const classes = new Set(getAttribute(tag, 'class').split(/\s+/));
    return navbarClasses.every((className) => classes.has(className));
  });
  if (navbars.length !== 1) fail(context, 'expected exactly one shared homepage navbar');
  if (getTags(html, 'footer').length !== 1) fail(context, 'expected exactly one shared homepage footer');
}

function verifyHub(html, page, expectation, filePath) {
  const context = { variant: expectation.variant, slug: page.slug, filePath, surface: 'schema' };
  const nodes = getJsonLdNodes(html, context);
  for (const type of ['CollectionPage', 'ItemList', 'BreadcrumbList']) {
    getJsonLdNode(nodes, type, context, `schema:${type}`);
  }
  const canonical = `${expectation.host}${page.route}`;
  const collectionPage = getJsonLdNode(nodes, 'CollectionPage', context, 'schema:CollectionPage');
  assertSchemaValue(context, collectionPage.url, canonical, 'schema:CollectionPage', 'url');
  assertSchemaValue(context, collectionPage.name, page.source.h1, 'schema:CollectionPage', 'name');
  assertSchemaValue(context, collectionPage.description, page.source.description, 'schema:CollectionPage', 'description');
  assertSchemaValue(
    context,
    collectionPage.inLanguage,
    expectation.locale === 'zh' ? 'zh-CN' : 'en-US',
    'schema:CollectionPage',
    'inLanguage'
  );
  const itemList = getJsonLdNode(nodes, 'ItemList', context, 'schema:ItemList');
  const expectedItems = expectation.entries.map((entry, index) => ({
    position: index + 1,
    name: entry[expectation.locale].h1,
    url: `${expectation.host}/guide/${entry.slug}`
  }));
  const actualItems = (itemList.itemListElement || []).map(({ position, name, url }) => ({ position, name, url }));
  if (JSON.stringify(actualItems) !== JSON.stringify(expectedItems)) {
    fail({ ...context, surface: 'schema:ItemList' }, 'ItemList entries must match the ordered registry projection');
  }
  assertBreadcrumbUrls(
    context,
    getJsonLdNode(nodes, 'BreadcrumbList', context, 'schema:BreadcrumbList'),
    [`${expectation.host}/`, canonical],
    'schema:BreadcrumbList'
  );
  const targets = new Set(getAnchors(html).map((anchor) => absoluteUrl(expectation.host, anchor.href)));
  for (const entry of expectation.entries) {
    const target = `${expectation.host}/guide/${entry.slug}`;
    if (!targets.has(target)) fail({ ...context, surface: 'navigation' }, `missing visible card target ${target}`);
  }
}

function verifyArticle(html, page, expectation, filePath) {
  const context = { variant: expectation.variant, slug: page.slug, filePath, surface: 'schema' };
  const nodes = getJsonLdNodes(html, context);
  for (const type of page.source.schemaTokens) {
    getJsonLdNode(nodes, type, context, `schema:${type}`);
  }
  const canonical = `${expectation.host}${page.route}`;
  const language = expectation.locale === 'zh' ? 'zh-CN' : 'en-US';
  const article = getJsonLdNode(nodes, 'Article', context, 'schema:Article');
  verifyUpdatedTime(html, page, expectation, context);
  assertSchemaValue(context, article.headline, page.source.h1, 'schema:Article', 'headline');
  assertSchemaValue(context, article.description, page.source.metaDescription, 'schema:Article', 'description');
  assertSchemaValue(context, article.inLanguage, language, 'schema:Article', 'inLanguage');
  assertSchemaValue(context, article.mainEntityOfPage?.['@id'], canonical, 'schema:Article', 'mainEntityOfPage.@id');
  assertBreadcrumbUrls(
    context,
    getJsonLdNode(nodes, 'BreadcrumbList', context, 'schema:BreadcrumbList'),
    [`${expectation.host}/`, `${expectation.host}/guide`, canonical],
    'schema:BreadcrumbList'
  );
  if (page.source.schemaTokens.includes('HowTo')) {
    const howTo = getJsonLdNode(nodes, 'HowTo', context, 'schema:HowTo');
    assertSchemaValue(context, howTo.name, page.source.h1, 'schema:HowTo', 'name');
    assertSchemaValue(context, howTo.description, page.source.metaDescription, 'schema:HowTo', 'description');
    assertSchemaValue(context, howTo.url, canonical, 'schema:HowTo', 'url');
    assertSchemaValue(context, howTo.inLanguage, language, 'schema:HowTo', 'inLanguage');
  }

  const anchors = getAnchors(html);
  verifyGuideSectionAnchors(html, context);
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
  const actual = [];
  for (const url of urls) {
    try {
      const parsed = new URL(url);
      if (parsed.pathname === '/guide' || parsed.pathname.startsWith('/guide/')) actual.push(url);
    } catch {
      fail(context, `invalid sitemap URL ${url}`);
    }
  }
  const expected = [...expectation.routes.keys()].map((route) => `${expectation.host}${route}`);
  if (new Set(actual).size !== actual.length) fail(context, 'contains duplicate Guide URLs');
  const sortedActual = [...actual].sort();
  const sortedExpected = [...expected].sort();
  if (sortedActual.length !== sortedExpected.length || sortedActual.some((url, index) => url !== sortedExpected[index])) {
    fail(context, `expected exact Guide sitemap URLs ${sortedExpected.join(', ')}; found ${sortedActual.join(', ') || '(none)'}`);
  }
  return actual.length;
}

function verifyGuideExport({ outDir, variant, entries }) {
  const safeOutDir = outDir ? path.resolve(outDir) : '<missing>';
  const expectation = buildGuideExpectation(variant, { entries });
  if (!outDir || !fs.existsSync(safeOutDir) || !fs.statSync(safeOutDir).isDirectory()) {
    fail({ variant, slug: 'hub', filePath: safeOutDir, surface: 'output' }, 'output directory does not exist');
  }
  const routeFiles = collectGuideRoutes(safeOutDir, expectation);
  for (const [route, page] of expectation.routes) {
    const filePath = routeFiles.get(route);
    const html = fs.readFileSync(filePath, 'utf8');
    verifyMetadata(html, page, expectation, filePath);
    verifySharedShell(html, page, expectation, filePath);
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
  const tracer = buildGuideExpectation(result.variant).entries.some(
    (entry) => entry.slug === GUIDE_TRACER_SLUG
  )
    ? GUIDE_TRACER_SLUG
    : 'missing';
  console.log(
    `[verify-guide-export] variant=${result.variant} Guide HTML verified: ${result.pages} pages, ${result.sitemapUrls} sitemap URLs (tracer=${tracer})`
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

module.exports = { assertNoCaseFoldCollisions, parseArgs, buildGuideExpectation, verifyGuideExport, main };
