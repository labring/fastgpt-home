#!/usr/bin/env node

/** Verify Technical Page Identity projections in a static export. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
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
  const tag = (html.match(/<link\b[^>]*rel="canonical"[^>]*>/i) || [])[0];
  assert(tag, `Missing canonical metadata for ${route}`);
  return getAttribute(tag, 'href');
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

function verifyArticleMetadata(outDir, route, canonical, robots, language) {
  const html = readHtml(outDir, route);
  assert.equal(getCanonical(html, route), canonical, `${route} has an unexpected canonical`);
  assert.equal(getRobots(html, route), robots, `${route} has an unexpected robots policy`);
  assert.equal(
    getHreflang(html, route, language),
    canonical,
    `${route} has an unexpected hreflang owner URL`
  );
  assert(
    html.includes(`"url":"${canonical}"`),
    `${route} JSON-LD does not resolve to its canonical URL`
  );
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
  expectedPageCount = identities.length
} = {}) {
  assert.equal(identities.length, expectedPageCount, 'Unexpected identity count');
  assert(
    fs.readFileSync(TECH_ROUTE_SOURCE, 'utf8').includes('export const dynamicParams = false'),
    'Technical detail route must reject unpublished paths'
  );

  const baseUrls = getProductionBaseUrls(env);
  const redirectProjection = buildRedirects(ROOT, env);
  const robots = variant === 'preview' ? 'noindex, nofollow' : 'index, follow';

  if (variant === 'cn' || variant === 'io') {
    const routesToRemove = getTechRoutesToRemove(identities, variant);
    for (const identity of identities) {
      const owner = identity.locale === 'zh' ? 'cn' : 'io';
      if (owner === variant) {
        verifyArticleMetadata(
          outDir,
          identity.canonicalPath,
          `${baseUrls[owner]}${identity.canonicalPath}`,
          robots,
          identity.locale === 'zh' ? 'zh-CN' : 'en'
        );
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
      verifyArticleMetadata(
        outDir,
        identity.sourcePath,
        `${identity.locale === 'zh' ? baseUrls.cn : baseUrls.io}${identity.canonicalPath}`,
        robots,
        identity.locale === 'zh' ? 'zh-CN' : 'en'
      );
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
  getStaticRouteCandidates,
  main,
  verifyTechnicalExport
};
