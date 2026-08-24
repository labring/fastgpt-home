#!/usr/bin/env node

/** Verify Technical Page Identity projections in a static export. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parseNginxRedirectMap } = require('./lib/redirects');
const { getProductionBaseUrls, resolveSiteVariant } = require('./lib/site-variant');
const { getTechIdentities } = require('./lib/redirects');
const TECHNICAL_CONTENT_POLICY = require('../src/lib/technical-content-policy.json');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');
const NEXT_DIR = path.join(ROOT, '.next');
const ENTRIES_PATH = path.join(ROOT, 'src/components/tech-center/entries.json');
const TECH_ROUTE_SOURCE = path.join(ROOT, 'src/app/[lang]/[section]/[slug]/page.tsx');
const EXPECTED_TECHNICAL_PAGE_COUNT = TECHNICAL_CONTENT_POLICY.expectedPageCount;

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

function verifyArticleMetadata(outDir, route, canonical, robots) {
  const html = readHtml(outDir, route);
  assert.equal(getCanonical(html, route), canonical, `${route} has an unexpected canonical`);
  assert.equal(getRobots(html, route), robots, `${route} has an unexpected robots policy`);
  assert(
    html.includes(`"url":"${canonical}"`),
    `${route} JSON-LD does not resolve to its canonical URL`
  );
}

function verifySitemap(outDir, variant, canonicalUrls, reviewPaths, baseUrls) {
  const sitemap = readSitemap(outDir);
  if (variant === 'preview') {
    assert.equal(sitemap, null, 'Preview export contains a production sitemap');
    return;
  }

  assert(sitemap, `${variant} export is missing sitemap.xml`);
  const urls = new Set(sitemap);
  const canonicalSet = new Set(canonicalUrls);
  if (variant === 'cn') {
    assert.equal(
      sitemap.filter((url) => canonicalSet.has(url)).length,
      canonicalUrls.length,
      'CN sitemap contains an unexpected Technical Page cardinality'
    );
    for (const url of canonicalUrls) {
      assert(urls.has(url), `Sitemap is missing Technical Page ${url}`);
    }
    for (const pathName of reviewPaths) {
      for (const host of [baseUrls.cn, baseUrls.io]) {
        assert(!urls.has(`${host}${pathName}`), `Sitemap contains a review path ${pathName}`);
      }
    }
  } else if (variant === 'io') {
    assert.equal(
      sitemap.filter((url) => canonicalSet.has(url)).length,
      0,
      'IO sitemap contains Technical Page URLs'
    );
    for (const url of canonicalUrls) {
      assert(!urls.has(url), `IO sitemap contains ${url}`);
    }
    for (const pathName of reviewPaths) {
      for (const host of [baseUrls.cn, baseUrls.io]) {
        assert(!urls.has(`${host}${pathName}`), `IO sitemap contains a review path ${pathName}`);
      }
    }
  }
}

function verifyNginxRedirects(nextDir, variant) {
  const redirects = readNginxRedirects(nextDir);
  assert.equal(redirects.size, 0, `${variant} export contains locale redirects`);
}

function verifyWorkerRedirects(outDir, variant, identities) {
  if (variant === 'cn') return;

  const { redirects, source } = readWorkerRedirects(outDir);
  if (variant === 'preview') {
    assert.equal(redirects.size, 0, 'Preview Worker contains production redirects');
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
  env = process.env
} = {}) {
  const entries = JSON.parse(fs.readFileSync(ENTRIES_PATH, 'utf8'));
  const identities = getTechIdentities(ROOT);
  assert.equal(entries.length, EXPECTED_TECHNICAL_PAGE_COUNT, 'Unexpected Technical Page count');
  assert.equal(identities.length, EXPECTED_TECHNICAL_PAGE_COUNT, 'Unexpected identity count');
  assert(
    fs.readFileSync(TECH_ROUTE_SOURCE, 'utf8').includes('export const dynamicParams = false'),
    'Technical detail route must reject unpublished paths'
  );

  const baseUrls = getProductionBaseUrls(env);
  const canonicalUrls = identities.map((identity) => `${baseUrls.cn}${identity.canonicalPath}`);
  const reviewPaths = identities.map((identity) => identity.sourcePath);
  const robots = variant === 'preview' ? 'noindex, nofollow' : 'index, follow';

  if (variant === 'cn') {
    for (const identity of identities) {
      verifyArticleMetadata(
        outDir,
        identity.canonicalPath,
        `${baseUrls.cn}${identity.canonicalPath}`,
        robots
      );
      assert(
        !resolveHtmlPath(outDir, identity.sourcePath),
        `CN export contains ${identity.sourcePath}`
      );
    }
    assert(!resolveHtmlPath(outDir, '/reference/technical-page-not-published'));
  } else if (variant === 'io') {
    for (const identity of identities) {
      assert(
        !resolveHtmlPath(outDir, identity.canonicalPath),
        `IO export contains ${identity.canonicalPath}`
      );
      assert(
        !resolveHtmlPath(outDir, identity.sourcePath),
        `IO export contains ${identity.sourcePath}`
      );
    }
    assert(!resolveHtmlPath(outDir, '/reference/technical-page-not-published'));
  } else if (variant === 'preview') {
    for (const identity of identities) {
      verifyArticleMetadata(
        outDir,
        identity.sourcePath,
        `${baseUrls.cn}${identity.canonicalPath}`,
        robots
      );
      assert(
        !resolveHtmlPath(outDir, identity.canonicalPath),
        `Preview export contains ${identity.canonicalPath}`
      );
    }
  } else {
    throw new Error(`Unsupported Site Variant: ${variant}`);
  }

  verifySitemap(outDir, variant, canonicalUrls, reviewPaths, baseUrls);
  verifyNginxRedirects(nextDir, variant);
  verifyWorkerRedirects(outDir, variant, identities);

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
