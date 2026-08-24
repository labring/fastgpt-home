#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { getPublishedFaqIds, parseNginxRedirectMap } = require('./lib/redirects');
const {
  getCanonicalBaseUrl,
  getDefaultLocale,
  getPublishedLocaleCodes,
  getProductionBaseUrls,
  resolveSiteVariant
} = require('./lib/site-variant');
const { locales } = require('../src/config/site-routing.json');
const guideRegistry = require('../src/content/guides/registry.json').entries;

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const variant = resolveSiteVariant();
const defaultLocale = getDefaultLocale(variant);
const baseUrls = getProductionBaseUrls();
const baseUrl = getCanonicalBaseUrl(variant);
const techPath = '/tutorial/private-deployment-topology';
const compareSlugs = [
  'dify-vs-fastgpt',
  'ragflow-vs-fastgpt',
  'maxkb-vs-fastgpt',
  'self-build-vs-platform'
];
const pageLanguages = ['en', 'zh-CN', 'zh-Hant', 'ja', 'ar', 'vi', 'th', 'id', 'ms'];
const faqLanguages = ['en', 'zh-CN'];
const contactLanguages = ['en', 'zh-CN', 'zh-Hant'];
const htmlLangs = Object.fromEntries(
  Object.values(locales).map((locale) => [locale.hreflang, locale.htmlLang])
);
const localePaths = {
  en: '',
  'zh-CN': '',
  'zh-Hant': '/zh-hant',
  ja: '/ja',
  ar: '/ar',
  vi: '/vi',
  th: '/th',
  id: '/id',
  ms: '/ms'
};
const siteLocaleCodes = getPublishedLocaleCodes(variant);
const faqId = getPublishedFaqIds(rootDir).english.find(
  (id) => id === 'how-to-check-the-number',
);
if (!faqId) throw new Error('Missing stable bilingual FAQ fixture in the route registry');

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function resolveHtmlPath(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  const candidates = relativeRoute
    ? [path.join(outDir, `${relativeRoute}.html`), path.join(outDir, relativeRoute, 'index.html')]
    : [path.join(outDir, 'index.html')];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function resolveHtml(route) {
  const htmlPath = resolveHtmlPath(route);
  assert(htmlPath, `Missing static HTML for ${route}`);
  return fs.readFileSync(htmlPath, 'utf8');
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || [];
}

function getAttribute(tag, attribute) {
  return tag.match(new RegExp(`\\s${attribute}="([^"]*)"`, 'i'))?.[1];
}

function getTitle(html) {
  return html.match(/<title>([^<]+)<\/title>/i)?.[1] || '';
}

function getMetaDescription(html) {
  const meta = getTags(html, 'meta').find((tag) => getAttribute(tag, 'name') === 'description');
  return getAttribute(meta || '', 'content') || '';
}

function getHtmlLang(html) {
  return getAttribute(getTags(html, 'html')[0] || '', 'lang') || '';
}

function getRobots(html) {
  const meta = getTags(html, 'meta').find((tag) => getAttribute(tag, 'name') === 'robots');
  return getAttribute(meta || '', 'content') || '';
}

function getCanonical(html, route) {
  const tag = getTags(html, 'link').find(
    (candidate) => getAttribute(candidate, 'rel') === 'canonical'
  );
  assert(tag, `Missing canonical for ${route}`);
  return getAttribute(tag, 'href');
}

function getAlternates(html) {
  return Object.fromEntries(
    getTags(html, 'link')
      .filter((tag) => getAttribute(tag, 'rel') === 'alternate')
      .map((tag) => [getAttribute(tag, 'hreflang'), getAttribute(tag, 'href')])
      .filter(([language, href]) => language && href)
  );
}

function expectedLocaleUrl(language, pathSuffix = '') {
  if (language === 'zh-CN') return `${baseUrls.cn}${pathSuffix || '/'}`;
  if (language === 'en') return `${baseUrls.io}${pathSuffix || '/'}`;
  return `${baseUrls.io}${localePaths[language]}${pathSuffix}`;
}

function normalizeUrl(url) {
  return url ? new URL(url).href : url;
}

function verifyPage(route, locale, pathSuffix, languages) {
  const html = resolveHtml(route);
  assert.equal(
    getHtmlLang(html),
    htmlLangs[locale] || locale,
    `${route} has an unexpected html lang`
  );
  assert.equal(
    normalizeUrl(getCanonical(html, route)),
    normalizeUrl(expectedLocaleUrl(locale, pathSuffix)),
    `Unexpected canonical for ${route}`
  );

  const alternates = getAlternates(html);
  const expectedAlternateLanguages = [
    ...languages,
    ...(languages.includes('en') ? ['x-default'] : [])
  ].sort();
  assert.deepEqual(
    Object.keys(alternates).sort(),
    expectedAlternateLanguages,
    `${route} has an unexpected alternate set`
  );
  for (const language of languages) {
    assert.equal(
      normalizeUrl(alternates[language]),
      normalizeUrl(expectedLocaleUrl(language, pathSuffix)),
      `${route} has an unexpected ${language} alternate`
    );
  }
  assert.equal(
    normalizeUrl(alternates['x-default']),
    languages.includes('en') ? normalizeUrl(expectedLocaleUrl('en', pathSuffix)) : undefined,
    `${route} has an unexpected x-default alternate`
  );

  assert.equal(
    getRobots(html),
    variant === 'preview' ? 'noindex, nofollow' : 'index, follow',
    `${route} has an unexpected robots policy`
  );
}

function verifyRobotsFile() {
  const robots = fs.readFileSync(path.join(outDir, 'robots.txt'), 'utf8');
  assert(/User-Agent:\s*\*/i.test(robots), 'robots.txt must define a wildcard crawler rule');
  assert(robots.includes('Allow: /'), 'robots.txt must allow crawling');
  assert(!robots.includes('Disallow: /'), 'robots.txt must allow production metadata discovery');
  assert.equal(
    robots.includes('Sitemap:'),
    variant !== 'preview',
    'robots.txt has an unexpected sitemap declaration'
  );
}

function parseWorkerRedirects() {
  const workerPath = path.join(outDir, '_worker.js');
  assert(fs.existsSync(workerPath), 'Missing Cloudflare worker');
  const worker = fs.readFileSync(workerPath, 'utf8');
  const entries = worker.match(/const redirects = new Map\((\[[\s\S]*\])\);/)?.[1];
  assert(entries, 'Cloudflare worker has no redirect map');
  return { redirects: new Map(JSON.parse(entries)), worker };
}

function parseNginxRedirects() {
  return parseNginxRedirectMap(read('.next/nginx-redirects.conf'));
}

function verifyRedirects() {
  assert(!fs.existsSync(path.join(outDir, '_redirects')), 'Legacy Cloudflare redirects were exported');

  const nginxRedirects = parseNginxRedirects();
  if (variant === 'cn') {
    assert.equal(nginxRedirects.size, 0, 'CN build contains cross-domain locale redirects');
    return;
  }

  assert.equal(nginxRedirects.size, 0, `${variant} build contains Nginx redirects`);
  const { redirects, worker } = parseWorkerRedirects();

  if (variant === 'preview') {
    assert.equal(redirects.size, 0, 'Preview worker contains production redirects');
    assert(worker.includes("X-Robots-Tag', 'noindex, nofollow"));
    return;
  }

  assert(!redirects.has('/zh'), 'Worker redirects /zh to another domain');
  assert(!redirects.has('/en'), 'Worker redirects /en to another domain');
  assert(!redirects.has(`/zh/faq/${faqId}`), 'Worker redirects a locale-prefixed FAQ');
  assert(!redirects.has('/zh/tech-center'), 'Worker redirects a locale-prefixed tech center');
  assert(!redirects.has(`/zh${techPath}`), 'Worker redirects a locale-prefixed article');
  assert(!redirects.has('/zh/faq/not-published'), 'Worker redirects an unpublished FAQ');
  assert(!redirects.has('/ja/faq'), 'Worker redirects an unpublished Japanese FAQ');
  assert(!redirects.has('/ja/contact'), 'Worker redirects an unpublished Japanese Contact');
  assert(worker.includes('fallbackUrl.pathname = match[1] || \'/\''));
}

function verifySitemap() {
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  if (variant === 'preview') {
    assert(!fs.existsSync(sitemapPath), 'Preview build contains sitemap.xml');
    return;
  }

  assert(fs.existsSync(sitemapPath), 'Missing exported sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map((match) => {
    const block = match[1];
    return {
      url: block.match(/<loc>([^<]+)<\/loc>/i)?.[1],
      lastModified: block.match(/<lastmod>([^<]+)<\/lastmod>/i)?.[1]
    };
  });
  const urls = entries.map((entry) => entry.url).filter(Boolean);
  assert(urls.length > 1000, `Sitemap contains too few URLs: ${urls.length}`);
  assert.equal(new Set(urls).size, urls.length, 'Sitemap contains duplicate URLs');
  assert(
    urls.every((url) => url === baseUrl || url.startsWith(`${baseUrl}/`)),
    'Sitemap contains a foreign host'
  );
  assert(urls.includes(`${baseUrl}/`), 'Sitemap is missing the canonical home URL');
  assert(urls.includes(`${baseUrl}/price`), 'Sitemap is missing the canonical pricing URL');
  assert(urls.includes(`${baseUrl}/faq`), 'Sitemap is missing the canonical FAQ URL');
  assert(urls.includes(`${baseUrl}/faq/${faqId}`), 'Sitemap is missing a canonical FAQ detail URL');
  assert(urls.includes(`${baseUrl}/compare`), 'Sitemap is missing the canonical compare hub URL');
  assert(urls.includes(`${baseUrl}/contact`), 'Sitemap is missing the canonical Contact URL');
  assert.equal(
    urls.includes(`${baseUrls.io}/zh-hant/contact`),
    variant === 'io',
    'Sitemap has an unexpected Traditional Chinese Contact URL'
  );
  assert(!urls.some((url) => url.endsWith('/ja/contact')), 'Sitemap contains Japanese Contact');
  assert.equal(
    urls.includes(`${baseUrls.cn}/tech-center`),
    variant === 'cn',
    'Sitemap has an unexpected technical center URL'
  );

  const stableRoutes = siteLocaleCodes.map((locale) => {
    const prefix = locale === defaultLocale ? '' : `/${locale}`;
    return {
      prefix,
      paths: [prefix || '/', `${prefix}/price`, `${prefix}/contact`, `${prefix}/faq`]
    };
  }).flat();
  for (const entry of entries) {
    if (!entry.url || !entry.lastModified) continue;
    const pathname = new URL(entry.url).pathname;
    assert(
      !stableRoutes.some(({ prefix, paths }) =>
        paths.includes(pathname) || pathname.startsWith(`${prefix}/faq/`)
      ),
      `Stable URL has an unverifiable lastmod: ${entry.url}`
    );
  }

  const guideLocale = variant === 'cn' ? 'zh' : 'en';
  const guideDates = guideRegistry.map((entry) => entry[guideLocale].dateModified);
  const guideLastModified = new Date(`${guideDates.sort().at(-1)}T00:00:00Z`).toISOString();
  const expectedGuideDates = new Map([
    [`${baseUrl}/guide`, guideLastModified],
    ...guideRegistry.map((entry) => [
      `${baseUrl}/guide/${entry.slug}`,
      new Date(`${entry[guideLocale].dateModified}T00:00:00Z`).toISOString()
    ])
  ]);
  for (const [url, expectedLastModified] of expectedGuideDates) {
    const entry = entries.find((candidate) => candidate.url === url);
    assert(entry, `Sitemap is missing Guide URL ${url}`);
    assert.equal(entry.lastModified, expectedLastModified, `Unexpected lastmod for ${url}`);
  }
}

function verifyPublishedRoutes() {
  assert.equal(Boolean(resolveHtmlPath('/zh')), variant === 'cn' || variant === 'preview');
  assert.equal(Boolean(resolveHtmlPath('/ja')), variant === 'io' || variant === 'preview');
  assert(!resolveHtmlPath('/ja/faq'), 'Japanese FAQ must resolve as a real 404');
  assert.equal(
    Boolean(resolveHtmlPath('/ja/contact')),
    variant === 'io' || variant === 'preview',
    'Japanese Contact must be generated for international variants and absent from the CN build'
  );
  assert(!resolveHtmlPath('/ja/tech-center'), 'Japanese technical center must resolve as a real 404');
  assert.equal(Boolean(resolveHtmlPath('/zh/contact')), variant === 'cn' || variant === 'preview');
  assert.equal(
    Boolean(resolveHtmlPath('/zh-hant/contact')),
    variant === 'io' || variant === 'preview'
  );
  assert.equal(Boolean(resolveHtmlPath('/tech-center')), variant === 'cn');
  assert.equal(Boolean(resolveHtmlPath('/zh/tech-center')), variant === 'cn' || variant === 'preview');
  assert.equal(Boolean(resolveHtmlPath(techPath)), variant === 'cn');
  assert.equal(Boolean(resolveHtmlPath(`/zh${techPath}`)), variant === 'preview');
}

function verifyNotFoundFallback() {
  const html = resolveHtml('/404');
  const selector = `html${siteLocaleCodes
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `:not(:lang(${locale}))`)
    .join('')} .not-found-locale-${defaultLocale},`;
  assert(html.includes(selector), `404 page is missing the ${defaultLocale} fallback selector`);

  const script = html.match(
    /<script>\s*(\(\(\) => \{[\s\S]*?data-not-found-recovery[\s\S]*?\}\)\(\);)\s*<\/script>/
  )?.[1];
  assert(script, '404 page is missing the recovery script');

  function getRecoveryLinks(pathname) {
    const links = [];
    const container = {
      style: {},
      append(link) {
        links.push(link);
      }
    };
    vm.runInNewContext(script, {
      location: { pathname },
      document: {
        createElement(tagName) {
          assert.equal(tagName, 'a');
          return {};
        },
        querySelectorAll(query) {
          assert.equal(query, '[data-not-found-recovery]');
          return [container];
        }
      }
    });
    return { hrefs: links.map((link) => link.href), display: container.style.display };
  }

  const contactHrefs =
    variant === 'preview'
      ? ['/contact', '/zh/contact', '/zh-hant/contact']
      : [
          `${baseUrls.io}/contact`,
          `${baseUrls.cn}/contact`,
          `${baseUrls.io}/zh-hant/contact`
        ];
  const contactRecovery = getRecoveryLinks('/ja/contact/missing');
  assert.deepEqual(contactRecovery.hrefs, contactHrefs);
  assert.equal(contactRecovery.display, 'contents');

  const techRecovery = getRecoveryLinks('/ja/tutorial/missing');
  assert.deepEqual(techRecovery.hrefs, [
    variant === 'preview' ? '/zh/tech-center' : `${baseUrls.cn}/tech-center`
  ]);
  assert.deepEqual(getRecoveryLinks('/ja/missing').hrefs, []);
}

function verifyContactExperience() {
  const defaultContactHtml = resolveHtml('/contact');
  assert.equal(
    defaultContactHtml.includes('aria-label="Switch language"'),
    variant !== 'cn',
    'Default Contact page has an unexpected language switcher state'
  );

  if (variant === 'cn') return;

  const traditionalContactHtml = resolveHtml('/zh-hant/contact');
  const japaneseContactHtml = resolveHtml('/ja/contact');
  assert(
    japaneseContactHtml.includes('Contact FastGPT Sales'),
    'Japanese Contact must fall back to the English Contact copy'
  );
  if (process.env.NEXT_PUBLIC_CRM_API_URL) {
    for (const expectedCopy of [
      'placeholder="請輸入姓名"',
      'placeholder="請輸入手機號碼或電子郵件"',
      '>通路合作</option>',
      '>調研階段／競品比較</option>',
      '>人民幣 100 萬元以上</option>'
    ]) {
      assert(
        traditionalContactHtml.includes(expectedCopy),
        `Traditional Chinese Contact is missing ${expectedCopy}`
      );
    }
  } else if (variant === 'preview') {
    assert(
      traditionalContactHtml.includes('data-crm-preview="true"'),
      'Preview Traditional Chinese Contact is missing its disabled CRM notice'
    );
  } else {
    assert(
      traditionalContactHtml.includes('data-crm-config-error="true"'),
      'Traditional Chinese Contact has an unexpected unconfigured state'
    );
  }
  assert(
    traditionalContactHtml.includes('aria-label="Switch language"'),
    'Traditional Chinese Contact is missing its language switcher'
  );

  if (variant === 'preview') {
    assert(
      resolveHtml('/zh/contact').includes('aria-label="Switch language"'),
      'Preview Simplified Chinese Contact is missing its language switcher'
    );
  }
}

function verifyCompareMetadataLengths() {
  if (variant === 'cn') return;
  for (const route of ['/compare', ...compareSlugs.map((slug) => `/compare/${slug}`)]) {
    const html = resolveHtml(route);
    const title = getTitle(html);
    const description = getMetaDescription(html);
    assert(title.length >= 50 && title.length <= 60, `${route} title length is ${title.length}`);
    assert(
      description.length >= 150 && description.length <= 160,
      `${route} description length is ${description.length}`
    );
  }
}

function main() {
  verifyRobotsFile();
  verifyRedirects();
  verifyPublishedRoutes();
  verifyNotFoundFallback();
  verifyContactExperience();

  const rootLocale = defaultLocale === 'zh' ? 'zh-CN' : 'en';
  verifyPage('/', rootLocale, '', pageLanguages);
  verifyPage('/price', rootLocale, '/price', pageLanguages);
  verifyPage('/faq', rootLocale, '/faq', faqLanguages);
  verifyPage(`/faq/${faqId}`, rootLocale, `/faq/${faqId}`, faqLanguages);
  verifyPage('/compare', rootLocale, '/compare', faqLanguages);
  verifyPage('/contact', rootLocale, '/contact', contactLanguages);

  const contactHtml = resolveHtml('/contact');
  assert(
    /<a[^>]+href="\/"[^>]+aria-label="FastGPT Home"/.test(contactHtml) ||
      /<a[^>]+aria-label="FastGPT Home"[^>]+href="\/"/.test(contactHtml),
    'Default Contact page has an unexpected home link'
  );

  if (variant !== 'cn') {
    const japaneseHomeHtml = resolveHtml('/ja');
    assert(japaneseHomeHtml.includes('href="/contact"'));
    assert(!japaneseHomeHtml.includes('href="/ja/contact"'));
  }

  if (variant === 'preview') {
    verifyPage('/zh', 'zh-CN', '', pageLanguages);
    verifyPage('/ja', 'ja', '', pageLanguages);
    verifyPage('/zh/price', 'zh-CN', '/price', pageLanguages);
    verifyPage('/zh/faq', 'zh-CN', '/faq', faqLanguages);
    verifyPage('/zh/compare', 'zh-CN', '/compare', faqLanguages);
    verifyPage('/zh/contact', 'zh-CN', '/contact', contactLanguages);
    verifyPage('/zh-hant/contact', 'zh-Hant', '/contact', contactLanguages);
    const techHtml = resolveHtml('/zh/tech-center');
    assert.equal(getCanonical(techHtml, '/zh/tech-center'), `${baseUrls.cn}/tech-center`);
    assert.equal(getRobots(techHtml), 'noindex, nofollow');

    const techArticleHtml = resolveHtml(`/zh${techPath}`);
    assert.equal(getCanonical(techArticleHtml, `/zh${techPath}`), `${baseUrls.cn}${techPath}`);
    assert.equal(getRobots(techArticleHtml), 'noindex, nofollow');
    assert(techArticleHtml.includes('href="/zh/tutorial/fastgpt-self-host-config"'));
  } else if (variant === 'cn') {
    const legacyContactHtml = resolveHtml('/zh/contact');
    assert.equal(getCanonical(legacyContactHtml, '/zh/contact'), `${baseUrls.cn}/contact`);
    assert.equal(getRobots(legacyContactHtml), 'index, follow');
    const techArticleHtml = resolveHtml(techPath);
    assert.equal(getCanonical(techArticleHtml, techPath), `${baseUrls.cn}${techPath}`);
    assert(techArticleHtml.includes('href="/tutorial/fastgpt-self-host-config"'));
  } else {
    verifyPage('/zh-hant/contact', 'zh-Hant', '/contact', contactLanguages);
  }

  verifyCompareMetadataLengths();
  verifySitemap();
  console.log(`i18n SEO verification passed for ${variant} (${baseUrl})`);
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
