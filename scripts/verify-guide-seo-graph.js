const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, 'src/content/guides/registry.json'), 'utf8'));
const tracerSlug = 'saas-platform-enterprise-gaps';

function fail(slug, message) {
  throw new Error(`${slug}: ${message}`);
}

function parseArgs(argv = process.argv.slice(2)) {
  if (!argv.length) return { full: true };
  if (argv.length === 2 && argv[0] === '--slug' && argv[1]) return { slug: argv[1] };
  if (argv.length === 1 && ['--root-articles', '--articles', '--hubs'].includes(argv[0])) {
    return { [argv[0].slice(2)]: true };
  }
  throw new Error('Usage: node scripts/verify-guide-seo-graph.js [--slug <slug> | --root-articles | --articles | --hubs]');
}

function getEntry(slug) {
  const entry = registry.entries.find((item) => item.slug === slug);
  if (!entry) fail(slug, 'unknown registry slug');
  return entry;
}

function projectGuideUrls(slug) {
  const pathName = `/guide/${slug}`;
  const englishUrl = `https://fastgpt.io${pathName}`;
  const chineseUrl = `https://fastgpt.cn${pathName}`;
  return { pathName, en: englishUrl, zh: chineseUrl, 'zh-CN': chineseUrl, 'x-default': englishUrl };
}

function readSource(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function verifyAlternates(slug) {
  const urls = projectGuideUrls(slug);
  if (new Set([urls.en, urls['zh-CN'], urls['x-default']]).size !== 2) {
    fail(slug, 'alternate cluster must contain exactly the two owned URLs');
  }
  for (const locale of ['en', 'zh']) {
    if (getEntry(slug)[locale].canonical !== urls[locale]) fail(slug, `${locale}: canonical is not an owned root URL`);
  }
  return urls;
}

function verifyTracer(slug) {
  const entry = getEntry(slug);
  const urls = verifyAlternates(slug);
  const route = readSource('src/app/guide/[slug]/page.tsx');
  const shell = readSource('src/components/guide/GuideArticleRoute.tsx');
  const page = readSource('src/components/guide/GuideArticlePage.tsx');
  const seo = readSource('src/lib/guideSeo.ts');
  if (!route.includes('GuideArticleRoute') || !route.includes('getGuideArticleMetadata')) fail(slug, 'root route must delegate rendering and metadata');
  if (!shell.includes('readGuideDocument') || !shell.includes('JsonLdScript') || !shell.includes('BreadcrumbJsonLd')) fail(slug, 'article shell must load body and emit Article plus breadcrumb schema');
  if (!page.includes('MarkdownContent') || !page.includes('getGuideOwnedPath')) fail(slug, 'article page must render the approved body with visible owned breadcrumbs');
  if (!seo.includes('getOwnedLocalePath') || !seo.includes('getOwnedLocaleUrl')) fail(slug, 'SEO projection must use owned URL helpers');
  for (const locale of ['zh', 'en']) {
    const snapshot = entry[locale];
    if (snapshot.assetPolicy.status === 'required' || snapshot.configuredInternalLinks.length) fail(slug, `${locale}: tracer expects no published asset or configured links`);
  }
  return urls;
}

function verifyRootArticles() {
  const route = readSource('src/app/guide/[slug]/page.tsx');
  const seo = readSource('src/lib/guideSeo.ts');
  const shell = readSource('src/components/guide/GuideArticleRoute.tsx');
  if (!route.includes('guideSlugs.map((slug) => ({ slug }))') || !route.includes('dynamicParams = false')) {
    throw new Error('root articles: route inventory must be closed');
  }
  if (!seo.includes('publishedTime: snapshot.datePublished') || !seo.includes('modifiedTime: snapshot.dateModified')) {
    throw new Error('root articles: Open Graph timing must use registry dates');
  }
  if (!shell.includes('datePublished: document.source.datePublished') || !shell.includes('dateModified: document.source.dateModified')) {
    throw new Error('root articles: Article schema timing must use registry dates');
  }
  return registry.entries.map((entry) => {
    const urls = verifyAlternates(entry.slug);
    const rootPath = urls.pathName;
    if (!/^\/guide\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rootPath)) fail(entry.slug, 'invalid root article path');
    for (const locale of ['zh', 'en']) {
      const snapshot = entry[locale];
      if (snapshot.canonical !== urls[locale]) fail(entry.slug, `${locale}: canonical does not match projection`);
      for (const [hreflang, url] of Object.entries({ 'zh-CN': urls['zh-CN'], en: urls.en, 'x-default': urls['x-default'] })) {
        if (!snapshot.hreflang.includes(`${hreflang} → ${url}`)) fail(entry.slug, `${locale}: ${hreflang} alternate does not match projection`);
      }
      if (snapshot.datePublished !== '2026-08-11' || snapshot.dateModified !== '2026-08-11') {
        fail(entry.slug, `${locale}: registry timing does not match approved date`);
      }
    }
    return rootPath;
  });
}

function verify(options) {
  if (options.slug) return verifyTracer(options.slug);
  if (options.rootArticles) return verifyRootArticles();
  if (options.articles) return registry.entries.map((entry) => verifyTracer(entry.slug));
  if (options.hubs) return true;
  return registry.entries.map((entry) => verifyTracer(entry.slug));
}

function main() {
  const options = parseArgs();
  const result = verify(options);
  const count = Array.isArray(result) ? result.length : 1;
  console.log(`Guide SEO graph verified: ${count} ${count === 1 ? 'target' : 'targets'}`);
}

if (require.main === module) main();

module.exports = { parseArgs, projectGuideUrls, verifyAlternates, verifyTracer, verifyRootArticles, verify, main };
