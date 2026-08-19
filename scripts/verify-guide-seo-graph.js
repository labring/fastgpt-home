const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const registry = JSON.parse(
  fs.readFileSync(path.join(root, 'src/content/guides/registry.json'), 'utf8')
);
const locales = ['zh', 'en'];
const groups = ['decision', 'implementation', 'industry'];
const expectedGroups = {
  'saas-platform-enterprise-gaps': 'decision',
  'self-build-three-year-tco': 'decision',
  'server-sizing-guide': 'decision',
  'complex-doc-golden-set': 'decision',
  'support-bot-four-steps': 'implementation',
  'manufacturing-itops-invoice-audit': 'industry',
  'pharma-compliance-docs': 'industry',
  'education-retail-support-insight': 'industry'
};
const sourcePaths = {
  sitemap: 'src/app/sitemap.ts',
  guideSeo: 'src/lib/guideSeo.ts',
  rootArticleRoute: 'src/app/guide/[slug]/page.tsx',
  localizedArticleRoute: 'src/app/[lang]/guide/[slug]/page.tsx',
  articleRoute: 'src/components/guide/GuideArticleRoute.tsx',
  articlePage: 'src/components/guide/GuideArticlePage.tsx',
  rootHubRoute: 'src/app/guide/page.tsx',
  localizedHubRoute: 'src/app/[lang]/guide/page.tsx',
  hubRoute: 'src/components/guide/GuideHubRoute.tsx',
  hubPage: 'src/components/guide/GuideHubPage.tsx'
};

function fail(surface, message) {
  throw new Error(`${surface}: ${message}`);
}

function parseArgs(argv = process.argv.slice(2)) {
  if (!argv.length) return { full: true };
  if (argv.length === 2 && argv[0] === '--slug' && argv[1]) return { slug: argv[1] };
  if (argv.length === 1 && ['--root-articles', '--articles', '--hubs'].includes(argv[0])) {
    return { [argv[0].slice(2)]: true };
  }
  throw new Error(
    'Usage: node scripts/verify-guide-seo-graph.js [--slug <slug> | --root-articles | --articles | --hubs]'
  );
}

function readSource(rootDir, relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function buildGraphContext({ entries = registry.entries, rootDir = root, sources = {} } = {}) {
  const loadedSources = Object.fromEntries(
    Object.entries(sourcePaths).map(([name, relativePath]) => [
      name,
      readSource(rootDir, relativePath)
    ])
  );
  return { entries, rootDir, sources: { ...loadedSources, ...sources } };
}

function projectGuideUrls(slug) {
  const pathName = `/guide/${slug}`;
  const en = `https://fastgpt.io${pathName}`;
  const zh = `https://fastgpt.cn${pathName}`;
  return { pathName, en, zh, 'zh-CN': zh, 'x-default': en };
}

function projectGuideHubUrls() {
  return { en: 'https://fastgpt.io/guide', zh: 'https://fastgpt.cn/guide' };
}

function projectGuideSitemap(locale, entries) {
  const urls = projectGuideHubUrls();
  return [
    { url: urls[locale], lastModified: undefined },
    ...entries.map((entry) => ({
      url: projectGuideUrls(entry.slug)[locale],
      lastModified: entry[locale].dateModified
    }))
  ];
}

function projectArticleSurface(entry, locale) {
  const snapshot = entry[locale];
  return {
    asset: snapshot.assetPolicy.status === 'required' ? snapshot.assetPolicy : undefined,
    links: snapshot.configuredInternalLinks
  };
}

function requireSource(sources, source, token, message) {
  if (!sources[source].includes(token)) fail(source === 'sitemap' ? 'sitemap' : source, message);
}

function isIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

function verifySnapshot(entry, locale) {
  const snapshot = entry[locale];
  const urls = projectGuideUrls(entry.slug);
  if (!snapshot || typeof snapshot !== 'object') fail(entry.slug, `${locale}: snapshot: missing`);
  for (const field of ['h1', 'metaTitle', 'metaDescription', 'keywords']) {
    if (typeof snapshot[field] !== 'string' || !snapshot[field].trim()) {
      fail(entry.slug, `${locale}: metadata: invalid ${field}`);
    }
  }
  if (snapshot.canonical !== urls[locale])
    fail(entry.slug, `${locale}: canonical: owned URL drift`);
  const expectedAlternates = {
    'zh-CN': urls['zh-CN'],
    en: urls.en,
    'x-default': urls['x-default']
  };
  if (
    typeof snapshot.hreflang !== 'string' ||
    Object.entries(expectedAlternates).some(
      ([key, url]) => !snapshot.hreflang.includes(`${key} → ${url}`)
    ) ||
    !snapshot.hreflang.includes('x-default')
  ) {
    fail(entry.slug, `${locale}: alternates: exact reciprocal cluster`);
  }
  for (const field of ['datePublished', 'dateModified']) {
    if (!isIsoDate(snapshot[field])) fail(entry.slug, `${locale}: ${field}: invalid ISO date`);
  }
  if (
    !Array.isArray(snapshot.schemaTokens) ||
    !snapshot.schemaTokens.includes('Article') ||
    !snapshot.schemaTokens.includes('BreadcrumbList')
  ) {
    fail(entry.slug, `${locale}: schema: Article and BreadcrumbList required`);
  }
  const surface = projectArticleSurface(entry, locale);
  if (surface.asset) {
    const { path: assetPath, alt, width, height } = surface.asset;
    if (
      typeof assetPath !== 'string' ||
      !assetPath.startsWith('/') ||
      assetPath.includes('..') ||
      typeof alt !== 'string' ||
      !alt.trim() ||
      !Number.isInteger(width) ||
      !Number.isInteger(height) ||
      width <= 0 ||
      height <= 0
    ) {
      fail(entry.slug, `${locale}: asset: required projection is invalid`);
    }
  }
  if (!Array.isArray(surface.links))
    fail(entry.slug, `${locale}: links: configured projection is invalid`);
}

function verifyRegistry(entries) {
  if (!Array.isArray(entries) || entries.length !== 8)
    fail('registry', 'entries: expected eight slugs');
  const slugs = new Set();
  const counts = Object.fromEntries(groups.map((group) => [group, 0]));
  for (const entry of entries) {
    if (
      !entry ||
      typeof entry.slug !== 'string' ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)
    ) {
      fail('registry', 'slug: invalid identity');
    }
    if (slugs.has(entry.slug)) fail(entry.slug, 'registry: duplicate slug');
    slugs.add(entry.slug);
    if (!groups.includes(entry.group)) fail(entry.slug, 'groups: invalid publication group');
    if (entry.group !== expectedGroups[entry.slug]) fail(entry.slug, 'groups: expected 4/1/3');
    counts[entry.group] += 1;
    for (const locale of locales) verifySnapshot(entry, locale);
  }
  if (counts.decision !== 4 || counts.implementation !== 1 || counts.industry !== 3) {
    fail('registry', 'groups: expected 4/1/3');
  }
}

function verifySitemap(sources, entries) {
  requireSource(sources, 'sitemap', 'guideEntries', 'guideEntries: missing registry identity');
  requireSource(
    sources,
    'sitemap',
    'getGuideCanonicalUrl',
    'canonical helper: missing owned projection'
  );
  requireSource(
    sources,
    'sitemap',
    "currentSiteVariant === 'cn' ? 'zh' : 'en'",
    'variant locale: missing current ownership'
  );
  requireSource(
    sources,
    'sitemap',
    'addEntry(getGuideCanonicalUrl(guideLocale), guideLastModified)',
    'hub: missing content-derived date'
  );
  if (/const now\s*=\s*new Date\(\)/.test(sources.sitemap)) {
    fail('sitemap', 'lastmod: build clock must not mark every URL as changed');
  }
  requireSource(
    sources,
    'sitemap',
    'for (const entry of guideEntries)',
    'articles: missing registry iteration'
  );
  requireSource(
    sources,
    'sitemap',
    'new Date(entry[guideLocale].dateModified)',
    'articles: missing registry date'
  );
  for (const locale of locales) {
    const sitemap = projectGuideSitemap(locale, entries);
    if (sitemap.length !== 9 || new Set(sitemap.map((entry) => entry.url)).size !== 9) {
      fail('sitemap', `${locale}: expected one hub plus eight unique articles`);
    }
    const host = locale === 'zh' ? 'fastgpt.cn' : 'fastgpt.io';
    if (sitemap.some((entry) => new URL(entry.url).host !== host))
      fail('sitemap', `${locale}: owned host drift`);
  }
}

function verifyArticleSources(sources) {
  requireSource(
    sources,
    'rootArticleRoute',
    'guideSlugs.map((slug) => ({ slug }))',
    'root articles: closed params are missing'
  );
  requireSource(
    sources,
    'rootArticleRoute',
    'dynamicParams = false',
    'root articles: closed params are missing'
  );
  requireSource(
    sources,
    'rootArticleRoute',
    'getGuideArticleMetadata(locale, slug, { indexable: true })',
    'root articles: indexable metadata is missing'
  );
  requireSource(
    sources,
    'localizedArticleRoute',
    'getGuideBuildLocales().flatMap',
    'articles: localized routes: locale inventory is missing'
  );
  requireSource(
    sources,
    'localizedArticleRoute',
    'guideSlugs.map((slug) => ({ lang, slug }))',
    'articles: localized routes: slug inventory is missing'
  );
  requireSource(
    sources,
    'localizedArticleRoute',
    'dynamicParams = false',
    'articles: localized routes: closed params are missing'
  );
  requireSource(
    sources,
    'localizedArticleRoute',
    'getGuideArticleMetadata(locale, slug, { indexable: false })',
    'articles: localized routes: noindex metadata is missing'
  );
  requireSource(sources, 'articleRoute', 'readGuideDocument', 'articles: body loader is missing');
  requireSource(sources, 'articleRoute', "'Article'", 'articles: schema: Article is missing');
  requireSource(
    sources,
    'articleRoute',
    'BreadcrumbJsonLd',
    'articles: schema: BreadcrumbList is missing'
  );
  requireSource(
    sources,
    'articleRoute',
    "schemaTokens.includes('HowTo')",
    'articles: schema: HowTo gate is missing'
  );
  requireSource(
    sources,
    'articlePage',
    'MarkdownContent markdown={document.body}',
    'articles: authored body wiring is missing'
  );
  requireSource(
    sources,
    'articlePage',
    "assetPolicy.status === 'required'",
    'articles: required asset surface is missing'
  );
  requireSource(
    sources,
    'articlePage',
    'configuredInternalLinks.length > 0',
    'articles: configured link surface is missing'
  );
  requireSource(
    sources,
    'articlePage',
    'getGuideOwnedPath(locale)',
    'articles: visible navigation lacks owned projection'
  );
  requireSource(sources, 'guideSeo', 'getGuideAlternates', 'articles: alternate helper is missing');
  requireSource(
    sources,
    'guideSeo',
    'url: canonical',
    'articles: Open Graph canonical equality is missing'
  );
  requireSource(
    sources,
    'guideSeo',
    'publishedTime: snapshot.datePublished',
    'articles: Open Graph published date is missing'
  );
  requireSource(
    sources,
    'guideSeo',
    'modifiedTime: snapshot.dateModified',
    'articles: Open Graph modified date is missing'
  );
}

function verifyHubSources(sources) {
  requireSource(sources, 'rootHubRoute', 'GuideHubRoute', 'hubs: root route delegation is missing');
  requireSource(
    sources,
    'localizedHubRoute',
    'getGuideBuildLocales().map',
    'hubs: localized route inventory is missing'
  );
  requireSource(
    sources,
    'localizedHubRoute',
    'dynamicParams = false',
    'hubs: localized route params are open'
  );
  requireSource(
    sources,
    'localizedHubRoute',
    'getGuideHubMetadata(locale, { indexable: false })',
    'hubs: localized noindex metadata is missing'
  );
  requireSource(
    sources,
    'hubPage',
    "['decision', 'implementation', 'industry']",
    'hubs: fixed group order is missing'
  );
  requireSource(
    sources,
    'hubPage',
    'guideEntries.filter',
    'hubs: registry card projection is missing'
  );
  requireSource(
    sources,
    'hubPage',
    'getOwnedLocalePath(locale, getGuidePath(entry.slug))',
    'hubs: visible card URLs drift'
  );
  requireSource(
    sources,
    'hubRoute',
    'guideEntries.map',
    'hubs: ItemList registry projection is missing'
  );
  requireSource(sources, 'hubRoute', "'CollectionPage'", 'hubs: schema: CollectionPage is missing');
  requireSource(sources, 'hubRoute', "'ItemList'", 'hubs: schema: ItemList is missing');
  requireSource(sources, 'hubRoute', 'BreadcrumbJsonLd', 'hubs: schema: BreadcrumbList is missing');
  requireSource(
    sources,
    'hubRoute',
    'getGuideCanonicalUrl(locale)',
    'hubs: canonical projection is missing'
  );
}

function verifyGraph(context = buildGraphContext()) {
  verifyRegistry(context.entries);
  verifyArticleSources(context.sources);
  verifyHubSources(context.sources);
  verifySitemap(context.sources, context.entries);
  return context.entries.length;
}

function getEntry(entries, slug) {
  const entry = entries.find((item) => item.slug === slug);
  if (!entry) fail(slug, 'registry: unknown slug');
  return entry;
}

function verifyTracer(slug, context = buildGraphContext()) {
  verifyGraph(context);
  return projectGuideUrls(getEntry(context.entries, slug).slug);
}

function verifyRootArticles(context = buildGraphContext()) {
  verifyRegistry(context.entries);
  verifyArticleSources(context.sources);
  return context.entries.map((entry) => projectGuideUrls(entry.slug).pathName);
}

function verifyArticles(context = buildGraphContext()) {
  verifyRootArticles(context);
  return context.entries.map((entry) => projectGuideUrls(entry.slug).pathName);
}

function verifyHubs(context = buildGraphContext()) {
  verifyRegistry(context.entries);
  verifyHubSources(context.sources);
  return projectGuideSitemap('en', context.entries)[0].url;
}

function verify(options = {}, context = buildGraphContext()) {
  if (options.slug) return verifyTracer(options.slug, context);
  if (options.rootArticles) return verifyRootArticles(context);
  if (options.articles) return verifyArticles(context);
  if (options.hubs) return verifyHubs(context);
  return verifyGraph(context);
}

function main() {
  const result = verify(parseArgs());
  const count = Array.isArray(result) ? result.length : typeof result === 'number' ? result : 1;
  console.log(`Guide SEO graph verified: ${count} ${count === 1 ? 'target' : 'targets'}`);
}

if (require.main === module) main();

module.exports = {
  buildGraphContext,
  parseArgs,
  projectArticleSurface,
  projectGuideHubUrls,
  projectGuideSitemap,
  projectGuideUrls,
  verify,
  verifyAlternates: (slug, context = buildGraphContext()) =>
    projectGuideUrls(getEntry(context.entries, slug).slug),
  verifyArticles,
  verifyGraph,
  verifyHubs,
  verifyRootArticles,
  verifyTracer,
  main
};
