#!/usr/bin/env node

/** Verify Technical Page Identity projections in a static export. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { getContentPath, parseFrontMatter } = require('./import-technical-content');
const { getAlternates, getAnchors, getJsonLdNodes, getJsonLdNode, expectedAlternates,
  verifyArticleDates } = require('./verify-guide-export');
const { verifyBodyLinks, verifyReturn, visibleHtml } = require('./lib/technical-export');
const {
  buildRedirects,
  getTechIdentities,
  getTechRoutesToRemove,
  parseNginxRedirectMap
} = require('./lib/redirects');
const { getProductionBaseUrls, resolveSiteVariant } = require('./lib/site-variant');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');
const NEXT_DIR = path.join(ROOT, '.next');
const TECH_ROUTE_SOURCE = path.join(ROOT, 'src/app/[lang]/[section]/[slug]/page.tsx');

function getStaticRouteCandidates(outDir, route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  return relativeRoute
    ? [path.join(outDir, `${relativeRoute}.html`), path.join(outDir, relativeRoute, 'index.html')]
    : [path.join(outDir, 'index.html')];
}

function resolveHtmlPath(outDir, route) {
  return getStaticRouteCandidates(outDir, route).find((candidate) => fs.existsSync(candidate));
}

function readHtml(outDir, route) {
  const htmlPath = resolveHtmlPath(outDir, route);
  assert(htmlPath, `Missing Technical Page HTML for ${route}`);
  return fs.readFileSync(htmlPath, 'utf8');
}

function getAttribute(tag, attribute) {
  return tag.match(new RegExp(`\\s${attribute}="([^"]*)"`, 'i'))?.[1];
}

function getCanonical(html, route) {
  const tags = html.match(/<link\b[^>]*rel="canonical"[^>]*>/gi) || [];
  assert.equal(tags.length, 1, `${route}: expected one canonical`);
  return getAttribute(tags[0], 'href');
}

function getRobots(html, route) {
  const tag = (html.match(/<meta\b[^>]*name="robots"[^>]*>/i) || [])[0];
  assert(tag, `Missing robots metadata for ${route}`);
  return getAttribute(tag, 'content');
}

function getHreflang(html, route, language) {
  const tag = [...html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/gi)]
    .map((match) => match[0])
    .find((candidate) => getAttribute(candidate, 'hreflang') === language);
  assert(tag, `Missing ${language} hreflang metadata for ${route}`);
  return getAttribute(tag, 'href');
}

function readSitemap(outDir) {
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return null;
  return [...fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1]
  );
}

function readWorkerRedirects(outDir) {
  const workerPath = path.join(outDir, '_worker.js');
  assert(fs.existsSync(workerPath), 'Missing Cloudflare Worker export');
  const source = fs.readFileSync(workerPath, 'utf8');
  const encoded = source.match(/const redirects = new Map\((\[[\s\S]*?\])\);/)?.[1];
  assert(encoded, 'Cloudflare Worker has no redirect map');
  return { redirects: new Map(JSON.parse(encoded)), source };
}

function readNginxRedirects(nextDir) {
  const mapPath = path.join(nextDir, 'nginx-redirects.conf');
  assert(fs.existsSync(mapPath), `Missing Nginx redirect map: ${mapPath}`);
  return parseNginxRedirectMap(fs.readFileSync(mapPath, 'utf8'));
}

function verifyRedirectProjection(actual, expected, label) {
  assert.equal(actual.size, expected.size, `${label} has an unexpected redirect count`);
  for (const [source, target] of expected) {
    assert.equal(actual.get(source), target, `${label} has an unexpected target for ${source}`);
  }
}

function verifyTechnicalPage(
  html,
  { identity, identities, document, variant, baseUrls, target, outDir }
) {
  const route = variant === 'preview' ? identity.sourcePath : identity.canonicalPath;
  const canonical = `${baseUrls[identity.locale === 'zh' ? 'cn' : 'io']}${identity.canonicalPath}`;
  assert.equal(getCanonical(html, route), canonical, `${route} has an unexpected canonical`);
  assert.equal(
    getRobots(html, route),
    variant === 'preview' ? 'noindex, nofollow' : 'index, follow',
    `${route} has an unexpected robots policy`
  );
  const context = { variant, slug: identity.sourcePath, surface: 'metadata' };
  const locales = identities
    .filter((entry) => entry.canonicalPath === identity.canonicalPath)
    .map((entry) => entry.locale);
  assert.deepEqual(
    getAlternates(html, context),
    expectedAlternates(identity.canonicalPath, locales, {
      cn: { host: baseUrls.cn },
      io: { host: baseUrls.io }
    }),
    `${route}: published alternates`
  );
  const { metadata, body } = document;
  const nodes = getJsonLdNodes(html, context);
  const article = getJsonLdNode(
    nodes,
    metadata.schema_type === 'Article' ? 'Article' : 'TechArticle',
    context,
    'schema'
  );
  verifyArticleDates(
    article,
    { datePublished: metadata.date_published, dateModified: metadata.date_modified },
    canonical
  );
  getJsonLdNode(nodes, 'BreadcrumbList', context, 'schema');
  assert.equal((visibleHtml(html).match(/<h1\b/g) || []).length, 1, `${route}: H1 count`);
  const description = (html.match(/<meta\b[^>]*name="description"[^>]*>/i) || [])[0];
  assert(getAttribute(description || '', 'content')?.trim(), `${route}: description`);
  const social = (html.match(/<meta\b[^>]*property="og:url"[^>]*>/i) || [])[0];
  assert.equal(getAttribute(social || '', 'content'), canonical, `${route}: social URL`);
  for (const link of getAnchors(html).filter((link) => link.href.startsWith('#')))
    assert(
      visibleHtml(html).includes(`id="${link.href.slice(1)}"`),
      `${route}: unresolved heading ${link.href}`
    );
  verifyBodyLinks(html, body, variant, outDir);
  verifyReturn(html, identity.sourcePath, target, variant);
}

function verifySitemap(outDir, variant, identities, baseUrls) {
  const sitemap = readSitemap(outDir);
  if (variant === 'preview') {
    assert.equal(sitemap, null, 'Preview export contains a production sitemap');
    return;
  }

  assert(sitemap, `${variant} export is missing sitemap.xml`);
  const urls = new Set(sitemap);
  const ownerIdentities = identities.filter(
    (identity) => (identity.locale === 'zh' ? 'cn' : 'io') === variant
  );
  const allCanonicalUrls = new Set(
    identities.map(
      (identity) =>
        `${identity.locale === 'zh' ? baseUrls.cn : baseUrls.io}${identity.canonicalPath}`
    )
  );
  assert.equal(
    sitemap.filter((url) => allCanonicalUrls.has(url)).length,
    ownerIdentities.length,
    `${variant} sitemap contains an unexpected Technical Page cardinality`
  );
  for (const identity of identities) {
    const owner = identity.locale === 'zh' ? 'cn' : 'io';
    const canonical = `${baseUrls[owner]}${identity.canonicalPath}`;
    assert.equal(
      urls.has(canonical),
      owner === variant,
      `${variant} sitemap ownership drift for ${identity.key}`
    );
    for (const host of [baseUrls.cn, baseUrls.io]) {
      assert(
        !urls.has(`${host}${identity.sourcePath}`),
        `Sitemap contains a review path ${identity.sourcePath}`
      );
    }
  }
}

function verifyNginxRedirects(nextDir, variant, expected) {
  const redirects = readNginxRedirects(nextDir);
  verifyRedirectProjection(redirects, expected, `${variant} Nginx export`);
}

function verifyWorkerRedirects(outDir, variant, identities, expected) {
  if (variant === 'cn') return;

  const { redirects, source } = readWorkerRedirects(outDir);
  verifyRedirectProjection(redirects, expected, `${variant} Worker export`);
  if (variant === 'preview') {
    return;
  }

  assert(source.includes("fallbackUrl.pathname = match[1] || '/'"));
  for (const identity of identities) {
    assert(!redirects.has(identity.sourcePath), `IO Worker redirects ${identity.sourcePath}`);
  }
}

function verifyTechnicalExport({
  outDir = OUT_DIR,
  nextDir = NEXT_DIR,
  variant = resolveSiteVariant(),
  env = process.env,
  identities = getTechIdentities(ROOT),
  rootDir = ROOT,
  expectedPageCount = identities.length
} = {}) {
  assert.equal(identities.length, expectedPageCount, 'Unexpected identity count');
  assert(
    fs.readFileSync(TECH_ROUTE_SOURCE, 'utf8').includes('export const dynamicParams = false'),
    'Technical detail route must reject unpublished paths'
  );

  const baseUrls = getProductionBaseUrls(env);
  const redirectProjection = buildRedirects(ROOT, env);
  const returns = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/content/tech-center/stage-returns.json'), 'utf8'));
  const verifyPage = (identity) => {
    const route = variant === 'preview' ? identity.sourcePath : identity.canonicalPath;
    const file = path.join(rootDir, getContentPath(rootDir, identity));
    verifyTechnicalPage(readHtml(outDir, route), { identity, identities, variant, baseUrls,
      document: parseFrontMatter(fs.readFileSync(file, 'utf8'), file, false),
      target: returns[identity.sourcePath], outDir });
  };

  if (variant === 'cn' || variant === 'io') {
    const routesToRemove = getTechRoutesToRemove(identities, variant);
    for (const identity of identities) {
      const owner = identity.locale === 'zh' ? 'cn' : 'io';
      if (owner === variant) {
        verifyPage(identity);
      } else if (routesToRemove.has(identity.canonicalPath)) {
        assert(
          !resolveHtmlPath(outDir, identity.canonicalPath),
          `${variant} export contains non-owner route ${identity.canonicalPath}`
        );
      }
      assert(
        !resolveHtmlPath(outDir, identity.sourcePath),
        `${variant} export contains ${identity.sourcePath}`
      );
    }
    assert(!resolveHtmlPath(outDir, '/reference/technical-page-not-published'));
  } else if (variant === 'preview') {
    for (const identity of identities) {
      verifyPage(identity);
      assert(
        !resolveHtmlPath(outDir, identity.canonicalPath),
        `Preview export contains ${identity.canonicalPath}`
      );
    }
  } else {
    throw new Error(`Unsupported Site Variant: ${variant}`);
  }

  verifySitemap(outDir, variant, identities, baseUrls);
  verifyNginxRedirects(
    nextDir,
    variant,
    variant === 'cn' ? redirectProjection.cnRedirects : new Map()
  );
  verifyWorkerRedirects(
    outDir,
    variant,
    identities,
    variant === 'io' ? redirectProjection.ioRedirects : new Map()
  );

  return { count: identities.length, variant };
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--out-dir') {
      options.outDir = path.resolve(ROOT, argv[++index]);
    } else if (token === '--next-dir') {
      options.nextDir = path.resolve(ROOT, argv[++index]);
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }
  return options;
}

function main(argv = process.argv.slice(2)) {
  const result = verifyTechnicalExport(parseArgs(argv));
  console.log(
    `[verify-technical-export] Export-verified Technical Pages: ${result.count} (${result.variant})`
  );
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`[verify-technical-export] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  verifyTechnicalPage,
  getCanonical,
  getHreflang,
  getRobots,
  readSitemap,
  getStaticRouteCandidates,
  main,
  verifyTechnicalExport
};
