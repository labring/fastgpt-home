#!/usr/bin/env node

/** Verify the eight bilingual Guide pairs emitted by the Preview static export. */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const REGISTRY = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src/content/guides/registry.json'), 'utf8')
);
const REQUIRED_SLUGS = [
  'poc-30-day-design',
  'database-qa-integration-guide',
  'scheduled-report-automation',
  'finance-research-retrieval',
  'finance-daily-report-automation',
  'migrate-saas-to-selfhost',
  'embed-ai-into-product',
  'soe-policy-qa-deployment'
];

function fail(message) {
  throw new Error(`[verify-guide-preview] ${message}`);
}

function decode(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
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
    if (slug && slug !== 'index') routes.add(`${prefix}/guide/${slug}`);
  }
  return routes;
}

function assertJsonLdTypes(html, expectedTypes, label) {
  const scripts = [
    ...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
  ];
  if (!scripts.length) fail(`${label} is missing JSON-LD`);
  const types = new Set();
  const visit = (value) => {
    if (!value || typeof value !== 'object') return;
    if (typeof value['@type'] === 'string') types.add(value['@type']);
    if (Array.isArray(value['@type'])) value['@type'].forEach((type) => types.add(type));
    Object.values(value).forEach(visit);
  };
  scripts.forEach((script) => {
    try {
      visit(JSON.parse(script[1]));
    } catch {
      fail(`${label} contains invalid JSON-LD`);
    }
  });
  for (const type of expectedTypes)
    if (!types.has(type)) fail(`${label} is missing JSON-LD ${type}`);
}

function verifySharedMetadata(html, slug, locale) {
  const expectedLang = locale === 'zh' ? 'zh-CN' : 'en-US';
  const lang = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1];
  if (lang !== expectedLang)
    fail(`${locale} ${slug} html lang expected ${expectedLang}, received ${lang || '(missing)'}`);
  const alternates = new Map();
  for (const tag of html.match(/<link\b[^>]*>/gi) || []) {
    const hreflang = tag.match(/\bhreflang=["']([^"']+)["']/i)?.[1];
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (hreflang && href) alternates.set(hreflang, decode(href));
  }
  const route = `/guide${slug ? `/${slug}` : ''}`;
  for (const [language, href] of [
    ['zh-CN', `https://fastgpt.cn${route}`],
    ['en', `https://fastgpt.io${route}`],
    ['x-default', `https://fastgpt.io${route}`]
  ]) {
    if (alternates.get(language) !== href)
      fail(`${locale} ${slug || 'hub'} hreflang ${language} differs`);
  }
}

function singleMatch(html, expression, label) {
  const matches = [...html.matchAll(expression)];
  if (matches.length !== 1) fail(`${label} expected one match, received ${matches.length}`);
  return decode(matches[0][1]);
}

function hrefs(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)].map((match) =>
    decode(match[1])
  );
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
  verifySharedMetadata(html, slug, locale);
  assertJsonLdTypes(html, ['Article', 'BreadcrumbList'], `${locale} ${slug}`);
  if (
    singleMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/gi, `${locale} ${slug} title`) !==
    source.metaTitle
  ) {
    fail(`${locale} ${slug} title differs from registry`);
  }
  if (
    singleMatch(
      html,
      /<meta\s+name=["']description["'][^>]*content=["']([^"']*)["']/gi,
      `${locale} ${slug} description`
    ) !== source.metaDescription
  ) {
    fail(`${locale} ${slug} description differs from registry`);
  }
  if (
    singleMatch(
      html,
      /<link\s+rel=["']canonical["'][^>]*href=["']([^"']*)["']/gi,
      `${locale} ${slug} canonical`
    ) !== canonical
  ) {
    fail(`${locale} ${slug} canonical differs from registry`);
  }
  if (
    singleMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi, `${locale} ${slug} h1`).replace(
      /<[^>]+>/g,
      ''
    ) !== source.h1
  ) {
    fail(`${locale} ${slug} h1 differs from registry`);
  }
  const links = hrefs(html);
  const hubPath = `${routePrefix}/guide`;
  if (links.filter((href) => href === hubPath).length < 2) {
    fail(`${locale} ${slug} is missing prefixed Guide breadcrumb or return links`);
  }
  const homePath = locale === 'zh' ? '/zh' : '/';
  if (!links.includes(homePath)) fail(`${locale} ${slug} is missing its localized home link`);
}

/** Verify every exported Guide route and the eight Week06 bilingual pairs. */
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
    verifySharedMetadata(html, '', locale);
    assertJsonLdTypes(html, ['CollectionPage', 'ItemList', 'BreadcrumbList'], `${locale} hub`);
    const links = hrefs(html);
    for (const entry of REGISTRY.entries) {
      const expected = `/${locale}/guide/${entry.slug}`;
      if (!links.includes(expected)) fail(`${locale} hub is missing card target ${expected}`);
    }
    const homePath = locale === 'zh' ? '/zh' : '/';
    if (!links.includes(homePath)) fail(`${locale} hub is missing its localized home link`);
  }
  for (const slug of REQUIRED_SLUGS) {
    verifyPage(safeOutDir, slug, 'en');
    verifyPage(safeOutDir, slug, 'zh');
  }
  return {
    pages: REQUIRED_SLUGS.length * 2,
    pairs: REQUIRED_SLUGS.length,
    tracer: REQUIRED_SLUGS[0]
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
