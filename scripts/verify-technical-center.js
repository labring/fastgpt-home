#!/usr/bin/env node

/** Verify the bounded Technical Center listing and its initial JavaScript budget. */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const { getProductionBaseUrls, resolveSiteVariant } = require('./lib/site-variant');
const { getCanonical, getHreflang, getRobots, readSitemap } = require('./verify-technical-export');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');
const BUDGET = require('./fixtures/technical-center-budget.json');

function resolveHtml(outDir, route) {
  const candidates = getStaticRouteCandidates(outDir, route);
  const htmlPath = candidates.find((candidate) => fs.existsSync(candidate));
  assert(htmlPath, `Missing static Technical Center HTML for ${route}`);
  return htmlPath;
}

function getStaticRouteCandidates(outDir, route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  return [
    path.join(outDir, `${relativeRoute}.html`),
    path.join(outDir, relativeRoute, 'index.html')
  ];
}

function getInitialJavaScriptGzipBytes(html, outDir) {
  const scriptSources = getInitialJavaScriptSources(html);
  let gzipBytes = 0;

  for (const source of scriptSources) {
    const scriptPath = path.join(outDir, source.replace(/^\//, ''));
    assert(fs.existsSync(scriptPath), `Missing initial JavaScript asset ${source}`);
    gzipBytes += zlib.gzipSync(fs.readFileSync(scriptPath), { level: 9 }).length;
  }

  assert(scriptSources.size > 0, 'Technical Center HTML has no initial JavaScript assets');
  return gzipBytes;
}

function getInitialJavaScriptSources(html) {
  return new Set(
    [...html.matchAll(/<script[^>]+src="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((source) => source?.startsWith('/_next/') && source.endsWith('.js'))
  );
}

function verifyRegistryIsOutsideInitialJavaScript(html, outDir, registryPath, maxInitialEntries) {
  const scriptSources = getInitialJavaScriptSources(html);
  const initialJavaScript = [...scriptSources]
    .map((source) => fs.readFileSync(path.join(outDir, source.replace(/^\//, '')), 'utf8'))
    .join('\n');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const embeddedEntry = registry.slice(maxInitialEntries).find((entry) => {
    return typeof entry.slug === 'string' && initialJavaScript.includes(entry.slug);
  });
  assert(
    !embeddedEntry,
    `Technical registry entry ${embeddedEntry?.slug} is embedded in initial JavaScript`
  );
}

function verifySearchProjection(searchIndexPath, registryPath, locale) {
  assert(
    fs.existsSync(searchIndexPath),
    `Missing Technical Center search projection ${searchIndexPath}`
  );
  const projection = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const expectedRegistry = locale
    ? registry.filter((entry) => entry.slug?.startsWith(`/${locale}/`))
    : registry;
  assert(Array.isArray(projection), 'Technical Center search projection must be an array');
  if (locale) {
    assert(
      projection.every((entry) => entry.locale === locale),
      `Technical Center search projection contains a non-${locale} identity`
    );
  }
  assert.equal(
    projection.length,
    expectedRegistry.length,
    `Technical Center search projection has ${projection.length} entries; expected ${expectedRegistry.length}`
  );
  return projection.length;
}

function countInitialEntries(html) {
  return (html.match(/<article(?:\s|>)/g) || []).length;
}

function getServerListingLinks(html, outDir) {
  const articles = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map((match) => match[0]);
  return articles.map((article, index) => {
    const href = article.match(/<a\b[^>]*href="(\/[^"#?]+)"/i)?.[1];
    assert(href, `Technical Center server entry ${index + 1} has no public link`);
    assert(
      !href.startsWith('//'),
      `Technical Center server entry ${index + 1} has an invalid link`
    );
    const relativePath = href.replace(/^\/+/, '').replace(/\/$/, '');
    const candidates = getStaticRouteCandidates(outDir, `/${relativePath}`);
    assert(
      candidates.some((candidate) => fs.existsSync(candidate)),
      `Technical Center server entry ${index + 1} links to missing route ${href}`
    );
    return href;
  });
}

function verifyTechnicalCenter({
  outDir = OUT_DIR,
  route = BUDGET.route,
  maxInitialEntries = BUDGET.maxInitialEntries,
  baselineGzipBytes = BUDGET.baselineGzipBytes,
  maxIncreaseBytes = BUDGET.maxIncreaseBytes,
  registryPath = path.join(ROOT, 'src/components/tech-center/entries.json'),
  searchIndexPath,
  locale
} = {}) {
  const htmlPath = resolveHtml(outDir, route);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const searchEntries = verifySearchProjection(
    searchIndexPath || path.join(outDir, 'tech-center/search-index.json'),
    registryPath,
    locale
  );
  const initialEntries = countInitialEntries(html);
  assert(initialEntries > 0, 'Technical Center HTML has no server-rendered entries');
  assert(
    initialEntries <= maxInitialEntries,
    [
      `Technical Center initial listing has ${initialEntries} entries; `,
      `maximum is ${maxInitialEntries}`
    ].join('')
  );
  const serverListingLinks = getServerListingLinks(html, outDir);

  const gzipBytes = getInitialJavaScriptGzipBytes(html, outDir);
  verifyRegistryIsOutsideInitialJavaScript(html, outDir, registryPath, maxInitialEntries);
  const maxGzipBytes = baselineGzipBytes + maxIncreaseBytes;
  assert(
    gzipBytes <= maxGzipBytes,
    [
      `Technical Center initial JavaScript is ${(gzipBytes / 1024).toFixed(1)} KiB gzip; `,
      `maximum is ${(maxGzipBytes / 1024).toFixed(1)} KiB`
    ].join('')
  );

  return {
    gzipBytes,
    htmlPath,
    initialEntries,
    maxGzipBytes,
    route,
    searchEntries,
    serverListingLinks
  };
}

function verifyTechnicalCenterPagination({
  outDir = OUT_DIR,
  variant = resolveSiteVariant(),
  registryPath = path.join(ROOT, 'src/components/tech-center/entries.json')
} = {}) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const baseUrls = getProductionBaseUrls();
  const locales = variant === 'preview' ? ['zh', 'en'] : [variant === 'cn' ? 'zh' : 'en'];
  const sitemap = readSitemap(outDir);
  const expectedSitemap = [];
  const checkedScripts = new Set();
  let pages = 0;

  for (const locale of locales) {
    const entries = registry.filter((entry) => entry.slug.startsWith(`/${locale}/`));
    const pageCount = Math.ceil(entries.length / BUDGET.maxInitialEntries);
    const baseUrl = baseUrls[locale === 'zh' ? 'cn' : 'io'];
    const hub = variant === 'preview' ? `/${locale}/tech-center` : '/tech-center';
    const pagePath = (page) => (page === 1 ? hub : `${hub}/page/${page}`);

    for (let page = 1; page <= pageCount; page += 1) {
      const route = pagePath(page);
      const html = fs.readFileSync(resolveHtml(outDir, route), 'utf8');
      const canonical = `${baseUrl}/tech-center${page === 1 ? '' : `/page/${page}`}`;
      const expectedEntries = entries.slice(
        (page - 1) * BUDGET.maxInitialEntries,
        page * BUDGET.maxInitialEntries
      );
      assert.deepEqual(
        getServerListingLinks(html, outDir),
        expectedEntries.map((entry) =>
          variant === 'preview' ? entry.slug : entry.slug.replace(/^\/(zh|en)/, '')
        ),
        `${route} has an incorrect server listing`
      );
      assert.equal(getCanonical(html, route), canonical, `${route} canonical mismatch`);
      assert.equal(
        getRobots(html, route),
        variant === 'preview' ? 'noindex, nofollow' : 'index, follow',
        `${route} robots mismatch`
      );
      const alternateLocales = page === 1 ? ['zh', 'en'] : [locale];
      assert.equal(
        (html.match(/<link\b[^>]*\shreflang="/gi) || []).length,
        alternateLocales.length,
        `${route} hreflang count mismatch`
      );
      for (const alternateLocale of alternateLocales) {
        const alternateUrl =
          page === 1
            ? `${baseUrls[alternateLocale === 'zh' ? 'cn' : 'io']}/tech-center`
            : canonical;
        assert.equal(
          getHreflang(html, route, alternateLocale === 'zh' ? 'zh-CN' : 'en'),
          alternateUrl
        );
      }
      if (page > 1) {
        assert(
          html
            .match(/<title>(.*?)<\/title>/s)?.[1]
            .includes(locale === 'zh' ? `第 ${page} 页` : `Page ${page}`),
          `${route} title omits its page number`
        );
      }
      const schemas = [
        ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)
      ].flatMap((match) => {
        const value = JSON.parse(match[1]);
        return value['@graph'] || [value];
      });
      assert.equal(
        schemas.find((value) => value['@type'] === 'CollectionPage')?.url,
        canonical,
        `${route} CollectionPage URL mismatch`
      );
      const breadcrumb = schemas.find((value) => value['@type'] === 'BreadcrumbList');
      assert.equal(
        breadcrumb?.itemListElement.at(-1)?.item,
        canonical,
        `${route} breadcrumb mismatch`
      );
      const links = new Set(
        [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1])
      );
      for (const target of [1, page - 1, page + 1].filter(
        (value) => value >= 1 && value <= pageCount
      )) {
        assert(
          links.has(pagePath(target)),
          `${route} has no crawlable link to ${pagePath(target)}`
        );
      }
      const scriptKey = [...getInitialJavaScriptSources(html)].sort().join(',');
      if (!checkedScripts.has(scriptKey)) {
        const gzipBytes = getInitialJavaScriptGzipBytes(html, outDir);
        assert(
          gzipBytes <= BUDGET.baselineGzipBytes + BUDGET.maxIncreaseBytes,
          `${route} exceeds the initial JavaScript budget`
        );
        verifyRegistryIsOutsideInitialJavaScript(
          html,
          outDir,
          registryPath,
          BUDGET.maxInitialEntries
        );
        checkedScripts.add(scriptKey);
      }
      if (variant !== 'preview') expectedSitemap.push(canonical);
      pages += 1;
    }

    for (const page of ['0', '1', '-1', '01', '1.5', 'invalid', String(pageCount + 1)]) {
      assert(
        getStaticRouteCandidates(outDir, `${hub}/page/${page}`).every(
          (file) => !fs.existsSync(file)
        ),
        `${hub}/page/${page} must return 404`
      );
    }
  }

  if (variant === 'preview') {
    assert.equal(sitemap, null, 'Preview contains a production sitemap');
    assert(
      !fs.existsSync(path.join(outDir, 'tech-center/page')),
      'Preview contains owner pagination routes'
    );
  } else {
    assert(sitemap, 'Missing production sitemap');
    assert.deepEqual(
      sitemap.filter((url) => /\/tech-center(?:\/page\/\d+)?$/.test(url)).sort(),
      expectedSitemap.sort(),
      'Technical Center sitemap coverage mismatch'
    );
    for (const locale of ['zh', 'en']) {
      assert(
        !fs.existsSync(path.join(outDir, locale, 'tech-center')),
        `Production contains /${locale}/tech-center aliases`
      );
    }
  }
  return { pages, variant };
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--out-dir') {
      const outDir = argv[++index];
      if (!outDir || outDir.startsWith('--')) {
        throw new Error('--out-dir requires a directory');
      }
      options.outDir = path.resolve(ROOT, outDir);
    } else if (token === '--route') {
      options.route = argv[++index];
      if (!options.route || options.route.startsWith('--')) {
        throw new Error('--route requires a route');
      }
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }
  return options;
}

function main(argv = process.argv.slice(2)) {
  const variant = resolveSiteVariant();
  const options = parseArgs(argv);
  const locale = variant === 'io' ? 'en' : 'zh';
  const route = options.route || (variant === 'preview' ? '/zh/tech-center' : BUDGET.route);
  const searchIndexPath = path.join(
    options.outDir || OUT_DIR,
    locale === 'zh' ? 'tech-center/search-index.json' : 'tech-center/search-index.en.json'
  );
  const result = verifyTechnicalCenter({ ...options, route, locale, searchIndexPath });
  const pagination = verifyTechnicalCenterPagination(options);
  console.log(
    [
      `[verify-technical-center] passed: ${result.route}, `,
      `${result.initialEntries} server entries, `,
      `${result.searchEntries} search entries, `,
      `${pagination.pages} static listing pages, `,
      `${(result.gzipBytes / 1024).toFixed(1)} KiB initial JavaScript gzip`
    ].join('')
  );
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  countInitialEntries,
  getInitialJavaScriptGzipBytes,
  getStaticRouteCandidates,
  getServerListingLinks,
  main,
  verifyTechnicalCenter,
  verifyTechnicalCenterPagination,
  verifyRegistryIsOutsideInitialJavaScript,
  verifySearchProjection
};
