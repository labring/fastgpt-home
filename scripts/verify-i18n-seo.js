#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.cn';
const variant = new URL(homeUrl).hostname.endsWith('.cn') ? 'cn' : 'io';
const baseUrls = {
  cn: 'https://fastgpt.cn',
  io: 'https://fastgpt.io'
};
const baseUrl = baseUrls[variant];
const faqId = 'Why-are-enterprises-paying-more';
const compareSlugs = [
  'dify-vs-fastgpt',
  'ragflow-vs-fastgpt',
  'maxkb-vs-fastgpt',
  'self-build-vs-platform'
];
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

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function resolveHtml(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  const candidates = relativeRoute
    ? [path.join(outDir, `${relativeRoute}.html`), path.join(outDir, relativeRoute, 'index.html')]
    : [path.join(outDir, 'index.html')];
  const htmlPath = candidates.find((candidate) => fs.existsSync(candidate));
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

function expectedLocaleUrl(language, pathSuffix) {
  const suffix = pathSuffix || '';
  if (language === 'zh' || language === 'zh-CN') return `${baseUrls.cn}${suffix}`;
  if (language === 'en') return `${baseUrls.io}${suffix}`;
  return `${baseUrls.io}${localePaths[language]}${suffix}`;
}

function verifyAlternates(route, html, pathSuffix, languages) {
  const alternates = getAlternates(html);
  for (const language of languages) {
    assert.equal(
      alternates[language],
      expectedLocaleUrl(language, pathSuffix),
      `${route} has an unexpected ${language} alternate`
    );
  }
  assert.equal(
    alternates['x-default'],
    expectedLocaleUrl('en', pathSuffix),
    `${route} has an unexpected x-default alternate`
  );
}

function verifyPage(route, pathSuffix, languages) {
  const html = resolveHtml(route);
  const expectedCanonical = expectedLocaleUrl(variant === 'cn' ? 'zh-CN' : 'en', pathSuffix);
  assert.equal(getCanonical(html, route), expectedCanonical, `Unexpected canonical for ${route}`);
  verifyAlternates(route, html, pathSuffix, languages);
}

function verifyRobots() {
  const robots = read('public/robots.txt');
  assert(robots.includes('User-agent: *'), 'robots.txt must define a wildcard crawler rule');
  assert(robots.includes('Allow: /'), 'robots.txt must allow the published site');
  assert(!robots.includes('Disallow: /'), 'robots.txt must not block a search engine');
  assert(
    robots.includes(`Sitemap: ${baseUrl}/sitemap.xml`),
    'robots.txt has the wrong sitemap URL'
  );
}

function verifyRedirects() {
  const redirects = read('public/_redirects');
  const nginx = read('nginx.conf');
  assert(
    redirects.includes('/zh https://fastgpt.cn/ 301'),
    'Missing cross-domain Chinese home redirect'
  );
  assert(
    redirects.includes('/zh/* https://fastgpt.cn/zh/:splat 301'),
    'Missing cross-domain Chinese path redirect'
  );
  assert(
    nginx.includes('fastgpt\\.io'),
    'Nginx must include the international host redirect scope'
  );
  assert(nginx.includes('fastgpt\\.cn'), 'Nginx must include the China host redirect scope');
  assert(
    nginx.includes('rewrite ^/(en|zh-hant|ja|ar|vi|th|id|ms)/'),
    'Missing China-to-international locale redirects'
  );
}

function verifySitemap() {
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), 'Missing exported sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert(urls.length > 1000, `Sitemap contains too few URLs: ${urls.length}`);
  assert.equal(new Set(urls).size, urls.length, 'Sitemap contains duplicate URLs');
  assert(
    urls.every((url) => url.startsWith(`${baseUrl}/`) || url === baseUrl),
    'Sitemap contains a foreign host'
  );

  const forbiddenPrefix =
    variant === 'cn' ? /^\/(en|zh-hant|ja|ar|vi|th|id|ms)(\/|$)/ : /^\/zh(\/|$)/;
  assert(
    urls.every((url) => !forbiddenPrefix.test(new URL(url).pathname)),
    'Sitemap contains a non-owned locale path'
  );
  assert(urls.includes(`${baseUrl}/`), 'Sitemap is missing the canonical home URL');
  assert(urls.includes(`${baseUrl}/price`), 'Sitemap is missing the canonical pricing URL');
  assert(urls.includes(`${baseUrl}/faq`), 'Sitemap is missing the canonical FAQ URL');
  assert(urls.includes(`${baseUrl}/faq/${faqId}`), 'Sitemap is missing a canonical FAQ detail URL');
  assert(urls.includes(`${baseUrl}/compare`), 'Sitemap is missing the canonical compare hub URL');
  for (const slug of compareSlugs) {
    assert(
      urls.includes(`${baseUrl}/compare/${slug}`),
      `Sitemap is missing the canonical compare URL for ${slug}`
    );
  }
}

function verifyCompareMetadataLengths() {
  if (variant !== 'io') return;

  const routes = ['/compare', ...compareSlugs.map((slug) => `/compare/${slug}`)];
  for (const route of routes) {
    const html = resolveHtml(route);
    const title = getTitle(html);
    const description = getMetaDescription(html);
    assert(
      title.length >= 50 && title.length <= 60,
      `Title for ${route} is outside the target range: ${title.length}`
    );
    assert(
      description.length >= 150 && description.length <= 160,
      `Description for ${route} is outside the target range: ${description.length}`
    );
  }
}

function verifyComparePages() {
  const compareLanguages = ['en', 'zh', 'zh-CN'];
  verifyPage('/compare', '/compare', compareLanguages);
  for (const slug of compareSlugs) {
    verifyPage(`/compare/${slug}`, `/compare/${slug}`, compareLanguages);
  }
}

function main() {
  verifyRobots();
  verifyRedirects();

  const pageLanguages = ['en', 'zh-CN', 'zh-Hant', 'ja', 'ar', 'vi', 'th', 'id', 'ms'];
  const faqLanguages = ['en', 'zh-CN'];
  verifyPage('/', '', pageLanguages);
  verifyPage('/price', '/price', pageLanguages);
  verifyPage('/faq', '/faq', faqLanguages);
  verifyPage(`/faq/${faqId}`, `/faq/${faqId}`, faqLanguages);
  verifyComparePages();
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
