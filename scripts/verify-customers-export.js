#!/usr/bin/env node
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const { getDefaultLocale, resolveSiteVariant } = require('./lib/site-variant');

const rootDir = process.cwd();
const outDir = path.resolve(rootDir, process.argv[2] || 'out');
const solutionsDir = path.join(rootDir, 'content', 'customers', 'solutions');
const categoriesFile = path.join(rootDir, 'content', 'customers', 'categories.json');
const customersOutDir = path.join(outDir, 'customers');
const cnBaseUrl = (process.env.NEXT_PUBLIC_CN_HOME_URL || 'https://fastgpt.cn').replace(/\/+$/, '');
const customersBaseUrl = `${cnBaseUrl}/customers`;
const siteVariant = resolveSiteVariant();
const contactPath = getDefaultLocale(siteVariant) === 'zh' ? '/contact' : '/zh/contact';
const EXPECTED_SOLUTION_COUNT = 89;
const EXPECTED_CATEGORY_COUNT = 17;
const EXPECTED_ROUTE_COUNT = 107;
const forbiddenContent = [
  'AI 可读解决方案正文',
  'FastGPT 客户案例中心 AI 可读目录',
  '/api/cta/click',
  'NEXT_PUBLIC_AI_GATEWAY_KEY',
  'AI 智能匹配案例',
  '> **演示视频**',
  '> **系统截图**',
  '官方演示视频',
  '脱敏案例材料',
  'https://fastgpt.cn/zh/contact/embed',
  'open-form-modal',
  '正在准备表单内容'
];
const forbiddenBundleContent = ['/api/cta/click', 'NEXT_PUBLIC_AI_GATEWAY_KEY', 'AI 智能匹配案例'];
const forbiddenPublicDataKeys = ['caseNo', 'caseOrg', 'clearanceLevel', 'citedNumbers'];

function walkFiles(dir, extension) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkFiles(file, extension);
    return entry.isFile() && entry.name.endsWith(extension) ? [file] : [];
  });
}

function countOccurrences(source, token) {
  return source.split(token).length - 1;
}

function assertCanonical(html, route, htmlFile) {
  const expectedUrl = `${customersBaseUrl}${route.slice('/customers'.length)}`;
  assert(
    html.includes(`<link rel="canonical" href="${expectedUrl}"/>`),
    `Customer canonical mismatch for ${route}: ${htmlFile}`
  );
}

function assertConsultationLink(html, source, htmlFile, solutionSlug) {
  const params = new URLSearchParams({
    source: 'customers',
    utm_source: 'customers',
    utm_medium: 'referral',
    utm_campaign: source === 'empty_state' ? 'requirement-match' : 'poc-application'
  });
  if (solutionSlug) params.set('utm_term', solutionSlug);
  params.set('utm_content', source);

  const href = `${contactPath}?${params.toString()}`;
  assert(
    html.replaceAll('&amp;', '&').includes(`href="${href}"`),
    `Missing customer consultation link for ${source}: ${htmlFile}`
  );
}

const solutionFiles = walkFiles(solutionsDir, '.json');
assert(solutionFiles.length > 0, 'Customer export verification requires solution data');
const solutions = solutionFiles.map((sourceFile) =>
  JSON.parse(fs.readFileSync(sourceFile, 'utf8'))
);
const categories = JSON.parse(fs.readFileSync(categoriesFile, 'utf8'));
assert.equal(
  solutions.length,
  EXPECTED_SOLUTION_COUNT,
  `Expected ${EXPECTED_SOLUTION_COUNT} customer solutions, found ${solutions.length}`
);
assert.equal(
  categories.length,
  EXPECTED_CATEGORY_COUNT,
  `Expected ${EXPECTED_CATEGORY_COUNT} customer categories, found ${categories.length}`
);
const expectedRouteSet = new Set(['/customers']);

for (const solution of solutions) {
  const route = `/customers/${solution.categorySlug}/${solution.slug}`;
  const htmlFile = path.join(outDir, 'customers', solution.categorySlug, `${solution.slug}.html`);
  expectedRouteSet.add(route);
  assert(fs.existsSync(htmlFile), `Missing customer detail export: ${htmlFile}`);

  const html = fs.readFileSync(htmlFile, 'utf8');
  assertCanonical(html, route, htmlFile);
  assertConsultationLink(html, 'navbar_poc', htmlFile);
  assertConsultationLink(html, 'customers_hero', htmlFile, solution.slug);
  assertConsultationLink(html, 'customers_sidebar', htmlFile, solution.slug);
  assertConsultationLink(html, 'customers_bottom', htmlFile, solution.slug);
  assert.equal(
    countOccurrences(html, 'id="solution-article"'),
    1,
    `Customer detail must contain one rendered article: ${htmlFile}`
  );
  for (const token of forbiddenContent) {
    assert(
      !html.includes(token),
      `Customer detail contains forbidden content ${token}: ${htmlFile}`
    );
  }
}

for (const category of categories) {
  const route = `/customers/categories/${category.slug}`;
  const htmlFile = path.join(customersOutDir, 'categories', `${category.slug}.html`);
  expectedRouteSet.add(route);
  assert(fs.existsSync(htmlFile), `Missing customer category export: ${htmlFile}`);
  assertCanonical(fs.readFileSync(htmlFile, 'utf8'), route, htmlFile);
}

const homeFile = path.join(outDir, 'customers.html');
assert(fs.existsSync(homeFile), `Missing customer home export: ${homeFile}`);
const homeHtml = fs.readFileSync(homeFile, 'utf8');
assertCanonical(homeHtml, '/customers', homeFile);
assertConsultationLink(homeHtml, 'navbar_poc', homeFile);
assertConsultationLink(homeHtml, 'home_hero', homeFile);
assertConsultationLink(homeHtml, 'home_bottom', homeFile);
for (const token of forbiddenContent) {
  assert(!homeHtml.includes(token), `Customer home contains forbidden content ${token}`);
}

const customerPayloadFiles = [
  homeFile,
  path.join(outDir, 'customers.txt'),
  ...walkFiles(path.join(outDir, 'customers'), '.html'),
  ...walkFiles(path.join(outDir, 'customers'), '.txt')
].filter(fs.existsSync);
for (const payloadFile of customerPayloadFiles) {
  const payload = fs.readFileSync(payloadFile, 'utf8');
  for (const token of forbiddenContent) {
    assert(
      !payload.includes(token),
      `Customer export contains forbidden content ${token}: ${payloadFile}`
    );
  }
  for (const key of forbiddenPublicDataKeys) {
    assert(
      !payload.includes(key),
      `Customer export contains internal data key ${key}: ${payloadFile}`
    );
  }
}

const actualRoutes = [
  '/customers',
  ...walkFiles(customersOutDir, '.html').map((htmlFile) => {
    const relativePath = path.relative(outDir, htmlFile).split(path.sep).join('/');
    return `/${relativePath.slice(0, -'.html'.length)}`;
  })
].sort();
const expectedRoutes = [...expectedRouteSet].sort();
assert.equal(
  expectedRoutes.length,
  EXPECTED_ROUTE_COUNT,
  `Expected ${EXPECTED_ROUTE_COUNT} customer routes, found ${expectedRoutes.length}`
);
assert.deepEqual(actualRoutes, expectedRoutes, 'Customer export route set mismatch');

if (siteVariant === 'cn') {
  const sitemapFile = path.join(outDir, 'sitemap.xml');
  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  const customerSitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .filter((url) => url === customersBaseUrl || url.startsWith(`${customersBaseUrl}/`))
    .sort();
  const expectedSitemapUrls = expectedRoutes
    .map((route) => `${customersBaseUrl}${route.slice('/customers'.length)}`)
    .sort();
  assert.deepEqual(customerSitemapUrls, expectedSitemapUrls, 'Customer sitemap route set mismatch');
}

const chunksDir = path.join(outDir, '_next', 'static', 'chunks');
assert(fs.existsSync(chunksDir), `Missing customer JavaScript chunks: ${chunksDir}`);
for (const chunkFile of walkFiles(chunksDir, '.js')) {
  const source = fs.readFileSync(chunkFile, 'utf8');
  for (const token of [...forbiddenBundleContent, ...forbiddenPublicDataKeys]) {
    assert(!source.includes(token), `Customer JavaScript contains forbidden content ${token}`);
  }
}

console.log(
  `Customer export verification passed: ${expectedRoutes.length} routes (${solutions.length} details, ${categories.length} categories)`
);
