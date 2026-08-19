#!/usr/bin/env node

const assert = require('node:assert/strict');

const customersUrl = stripTrailingSlash(
  process.env.CUSTOMERS_VERIFY_URL || 'https://fastgpt.cn/customers'
);
const canonicalCustomersUrl = stripTrailingSlash(
  process.env.CUSTOMERS_VERIFY_CANONICAL_URL || customersUrl
);
const originUrl = stripTrailingSlash(process.env.CUSTOMERS_VERIFY_ORIGIN_URL || '');
const adminUrl = stripTrailingSlash(process.env.CUSTOMERS_VERIFY_ADMIN_URL || '');
const proxySecret = process.env.CUSTOMERS_PROXY_SECRET || '';
const previousProxySecret = process.env.CUSTOMERS_PROXY_SECRET_PREVIOUS || '';
const expectedOrigin = new URL(customersUrl).origin;
const expectedBasePath = new URL(customersUrl).pathname;
const detailSampleSize = Number.parseInt(process.env.CUSTOMERS_VERIFY_DETAIL_COUNT || '10', 10);
const oldPublicValues = [
  'solutions.fastgpt.cn',
  ['FastGPT', 'Solutions'].join(' '),
  ['Solutions', 'Center'].join(' '),
  ['解决', '方案中心'].join('')
];
let sampleCustomer;
let publishedCustomers = [];

function stripTrailingSlash(value) {
  return value.replace(/\/$/, '');
}

function customerPath(pathname) {
  const suffix = pathname === '/' ? '' : pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${customersUrl}${suffix}`;
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    redirect: 'manual',
    signal: AbortSignal.timeout(15_000),
    ...options
  });
  return response;
}

function assertNoOldPublicIdentity(source, label) {
  for (const value of oldPublicValues) {
    assert(!source.includes(value), `${label} still contains old public identity: ${value}`);
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasTagAttributes(html, tagName, attributes) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || [];
  return tags.some((tag) =>
    Object.entries(attributes).every(([name, value]) =>
      new RegExp(`\\b${name}=["']${escapeRegex(value)}["']`, 'i').test(tag)
    )
  );
}

function assertProxyHeaders(response, label) {
  assert.equal(
    response.headers.get('x-fastgpt-route'),
    'customers-proxy',
    `${label} must be served by the dedicated proxy route`
  );
  assert.equal(
    response.headers.get('x-content-type-options'),
    'nosniff',
    `${label} is missing nosniff`
  );
  assert.equal(
    response.headers.get('x-frame-options'),
    'DENY',
    `${label} is missing frame protection`
  );
  const contentSecurityPolicy = response.headers.get('content-security-policy') || '';
  assert(
    contentSecurityPolicy.includes("default-src 'self'"),
    `${label} is missing the customers security policy`
  );
  assert(
    contentSecurityPolicy.includes("frame-src 'self' https://cloud.fastgpt.cn"),
    `${label} blocks the customer chatbot iframe`
  );
  assert.equal(
    contentSecurityPolicy.match(/default-src/g)?.length,
    1,
    `${label} contains duplicate Content-Security-Policy values`
  );
}

function assertHtmlIdentity(html, expectedUrl, label, requireJsonLd = false) {
  assert(
    hasTagAttributes(html, 'link', { rel: 'canonical', href: expectedUrl }),
    `${label} canonical URL is not ${expectedUrl}`
  );
  assert(
    hasTagAttributes(html, 'meta', { property: 'og:url', content: expectedUrl }),
    `${label} og:url is not ${expectedUrl}`
  );
  if (requireJsonLd) {
    const jsonLdBodies = [
      ...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
    ].map((match) => match[1]);
    assert(
      jsonLdBodies.some((body) => body.includes(expectedUrl)),
      `${label} JSON-LD does not reference ${expectedUrl}`
    );
  }
  assertNoOldPublicIdentity(html, label);
  assertMountedBrowserPaths(html, label);
}

function assertMountedBrowserPaths(html, label) {
  const attributePattern = /(?:href|src|action)=["']([^"']+)["']/gi;
  for (const match of html.matchAll(attributePattern)) {
    const rawValue = match[1].replaceAll('&amp;', '&').trim();
    if (
      !rawValue ||
      rawValue.startsWith('#') ||
      rawValue.startsWith('data:') ||
      rawValue.startsWith('blob:') ||
      rawValue.startsWith('mailto:') ||
      rawValue.startsWith('tel:') ||
      rawValue.startsWith('javascript:')
    ) {
      continue;
    }

    const url = new URL(rawValue, customersUrl);
    if (url.origin !== expectedOrigin) continue;
    assert(
      url.pathname === expectedBasePath || url.pathname.startsWith(`${expectedBasePath}/`),
      `${label} contains a same-origin browser path outside ${expectedBasePath}: ${rawValue}`
    );
  }
}

function assertRedirect(
  response,
  expectedUrl,
  label,
  allowedStatuses = [301, 307, 308],
  baseUrl = customersUrl
) {
  assert(
    allowedStatuses.includes(response.status),
    `${label} must redirect, received ${response.status}`
  );
  const location = response.headers.get('location');
  assert(location, `${label} redirect is missing a Location header`);
  assert.equal(
    new URL(location, baseUrl).toString(),
    expectedUrl,
    `${label} redirect target is wrong`
  );
}

async function verifyHtmlPage(requestUrl, canonicalUrl, label, requireJsonLd = false) {
  const response = await request(requestUrl);
  assert.equal(response.status, 200, `${label} must return 200`);
  assertProxyHeaders(response, label);
  const html = await response.text();
  assertHtmlIdentity(html, canonicalUrl, label, requireJsonLd);
  return html;
}

function extractSameOriginAssets(html, baseUrl = customersUrl) {
  const urls = new Set();
  const attributePattern = /(?:href|src)=["']([^"']+)["']/g;
  for (const match of html.matchAll(attributePattern)) {
    const rawValue = match[1].replaceAll('&amp;', '&');
    if (rawValue.startsWith('#') || rawValue.startsWith('data:')) continue;

    const url = new URL(rawValue, baseUrl);
    if (url.origin !== expectedOrigin) continue;
    if (!url.pathname.startsWith(expectedBasePath)) continue;
    if (url.pathname.includes('/_next/') || /\.(?:css|js|svg|png|webp|ico)$/.test(url.pathname)) {
      urls.add(url.toString());
    }
  }
  return [...urls];
}

function extractCssAssets(css, cssUrl) {
  const urls = new Set();
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    const rawValue = match[1].trim();
    if (!rawValue || rawValue.startsWith('data:') || rawValue.startsWith('#')) continue;

    const url = new URL(rawValue, cssUrl);
    if (url.origin !== expectedOrigin) continue;
    assert(
      url.pathname === expectedBasePath || url.pathname.startsWith(`${expectedBasePath}/`),
      `CSS asset escaped the customers mount: ${rawValue} in ${cssUrl}`
    );
    urls.add(url.toString());
  }
  return [...urls];
}

async function verifyApiContract(pathname, options, expectedStatus, label) {
  const response = await request(customerPath(pathname), options);
  assert.equal(response.status, expectedStatus, `${label} must return ${expectedStatus}`);
  assertProxyHeaders(response, label);
  assert.match(
    response.headers.get('cache-control') || '',
    /no-store/i,
    `${label} must be explicitly non-cacheable`
  );
  return response;
}

async function verifyMainSiteDiscovery() {
  for (const pathname of ['/', '/faq', '/price']) {
    const response = await request(`${expectedOrigin}${pathname}`);
    assert.equal(response.status, 200, `main-site ${pathname} must remain available`);
    assert.notEqual(
      response.headers.get('x-fastgpt-route'),
      'customers-proxy',
      `main-site ${pathname} must not enter the customers upstream`
    );
  }

  const robotsResponse = await request(`${expectedOrigin}/robots.txt`);
  assert.equal(robotsResponse.status, 200, 'root robots.txt must return 200');
  const robots = await robotsResponse.text();
  assert(
    robots.includes(`Sitemap: ${canonicalCustomersUrl}/sitemap.xml`),
    'root robots.txt must discover the customers sitemap'
  );

  const rootLlmsResponse = await request(`${expectedOrigin}/llms.txt`);
  assert.equal(rootLlmsResponse.status, 200, 'root llms.txt must return 200');
  const rootLlms = await rootLlmsResponse.text();
  assert(rootLlms.includes(canonicalCustomersUrl), 'root llms.txt must discover Customer Stories');
  assertNoOldPublicIdentity(rootLlms, 'root llms.txt');
}

async function verifyMountedContent(customers) {
  publishedCustomers = customers.filter(
    (customer) => customer.id && customer.categorySlug && customer.slug
  );
  const semanticCustomers = publishedCustomers.slice(0, detailSampleSize);
  assert(
    semanticCustomers.length >= Math.min(detailSampleSize, 10),
    `customers API returned only ${semanticCustomers.length} semantic samples`
  );
  sampleCustomer = semanticCustomers[0];

  const categoriesIndexResponse = await request(customerPath('/categories'));
  assertRedirect(
    categoriesIndexResponse,
    `${customersUrl}/#customers`,
    'categories index',
    [307, 308]
  );

  const categorySlugs = [
    ...new Set(semanticCustomers.map((customer) => customer.categorySlug))
  ].slice(0, 3);
  assert(categorySlugs.length >= 3, 'verification requires at least three published categories');
  for (const categorySlug of categorySlugs) {
    await verifyHtmlPage(
      customerPath(`/categories/${categorySlug}`),
      `${canonicalCustomersUrl}/categories/${categorySlug}`,
      `category ${categorySlug}`,
      true
    );
  }

  for (const customer of semanticCustomers) {
    const publicPath = `/${customer.categorySlug}/${customer.slug}`;
    const canonicalUrl = `${canonicalCustomersUrl}${publicPath}`;
    await verifyHtmlPage(customerPath(publicPath), canonicalUrl, `customer ${customer.slug}`, true);
  }

  const detailApiResponse = await request(customerPath(`/api/customers/${sampleCustomer.id}`));
  assert.equal(detailApiResponse.status, 200, 'customer detail API must return 200');
  assertProxyHeaders(detailApiResponse, 'customer detail API');
  assert.match(
    detailApiResponse.headers.get('cache-control') || '',
    /no-store/i,
    'customer detail API must be explicitly non-cacheable'
  );
  const detailPayload = await detailApiResponse.json();
  assert.equal(detailPayload.id, sampleCustomer.id, 'customer detail API returned the wrong entry');

  const expectedSemanticUrl = `${customersUrl}/${sampleCustomer.categorySlug}/${sampleCustomer.slug}`;
  const objectIdResponse = await request(
    customerPath(`/${sampleCustomer.categorySlug}/${sampleCustomer.id}`)
  );
  assertRedirect(objectIdResponse, expectedSemanticUrl, 'ObjectId customer route', [301, 308]);

  const wrongCategoryResponse = await request(
    customerPath(`/wrong-category/${sampleCustomer.slug}`)
  );
  assertRedirect(wrongCategoryResponse, expectedSemanticUrl, 'wrong category route', [301, 308]);

  const legacyIdResponse = await request(customerPath(`/solution/${sampleCustomer.id}`));
  assertRedirect(legacyIdResponse, expectedSemanticUrl, 'legacy customer ID route', [301, 308]);

  const legacyPrefixedResponse = await request(
    customerPath(`/solutions/${sampleCustomer.categorySlug}/${sampleCustomer.slug}`)
  );
  assertRedirect(
    legacyPrefixedResponse,
    expectedSemanticUrl,
    'legacy prefixed customer route',
    [301, 308]
  );

  const markdownResponse = await request(customerPath(`/solution/${sampleCustomer.id}/markdown`));
  assert.equal(markdownResponse.status, 200, 'customer Markdown route must return 200');
  assertProxyHeaders(markdownResponse, 'customer Markdown route');
  assert.match(
    markdownResponse.headers.get('content-type') || '',
    /text\/(plain|markdown)/i,
    'customer Markdown route must return readable text'
  );
  const markdown = await markdownResponse.text();
  assert(markdown.includes(sampleCustomer.title), 'customer Markdown route is missing its title');
  assert(
    markdown.includes(
      `${canonicalCustomersUrl}/${sampleCustomer.categorySlug}/${sampleCustomer.slug}`
    )
  );
  assertNoOldPublicIdentity(markdown, 'customer Markdown route');

  for (const missingPath of ['/missing-page', '/missing-category/missing-customer']) {
    const response = await request(customerPath(missingPath));
    assert.equal(response.status, 404, `${missingPath} must return a real 404`);
    assertProxyHeaders(response, missingPath);
    const html = await response.text();
    assert(html.includes('页面不存在'), `${missingPath} must render the customer 404 page`);
    assert(
      hasTagAttributes(html, 'meta', { name: 'robots', content: 'noindex' }),
      `${missingPath} must be noindex`
    );
  }

  return semanticCustomers;
}

async function verifyMachineReadableAssets() {
  const manifestResponse = await request(customerPath('/manifest.webmanifest'));
  assert.equal(manifestResponse.status, 200, 'customers manifest must return 200');
  assertProxyHeaders(manifestResponse, 'customers manifest');
  const manifest = await manifestResponse.json();
  assert.equal(manifest.name, 'FastGPT 客户案例中心', 'manifest brand is incorrect');
  assert.equal(manifest.start_url, '/customers', 'manifest start_url must use the mount');
  assert.equal(manifest.scope, '/customers', 'manifest scope must use the mount');
  assert(Array.isArray(manifest.icons) && manifest.icons.length >= 2, 'manifest icons are missing');

  const iconPaths = new Set(['/customers/icon.svg', '/customers/apple-icon.png']);
  for (const icon of manifest.icons) {
    assert(iconPaths.has(icon.src), `manifest icon escaped the customers mount: ${icon.src}`);
  }
  for (const iconPath of iconPaths) {
    const response = await request(`${expectedOrigin}${iconPath}`);
    assert.equal(response.status, 200, `${iconPath} must return 200`);
    assertProxyHeaders(response, iconPath);
  }

  const robotsResponse = await request(customerPath('/robots.txt'));
  assert.equal(robotsResponse.status, 200, 'customers robots.txt must return 200');
  assertProxyHeaders(robotsResponse, 'customers robots.txt');
  const robots = await robotsResponse.text();
  assert(
    robots.includes(`${canonicalCustomersUrl}/sitemap.xml`),
    'customers robots sitemap is wrong'
  );
  assertNoOldPublicIdentity(robots, 'customers robots.txt');
}

async function verifyPublicApiContracts() {
  const jsonHeaders = { 'Content-Type': 'application/json' };

  await verifyApiContract(
    `/api/customers/${sampleCustomer.id}/like`,
    { method: 'POST', headers: jsonHeaders, body: JSON.stringify({ action: 'invalid' }) },
    400,
    'customer like API'
  );
  await verifyApiContract(
    '/api/customers/not-a-valid-id/view',
    { method: 'POST', headers: jsonHeaders, body: '{}' },
    400,
    'customer view API'
  );
  await verifyApiContract(
    `/api/customers/${sampleCustomer.id}/vote`,
    { method: 'POST', headers: jsonHeaders, body: JSON.stringify({ type: 'invalid' }) },
    400,
    'customer vote API'
  );
  await verifyApiContract(
    '/api/ai-summary',
    { method: 'POST', headers: jsonHeaders, body: '{}' },
    400,
    'AI summary API'
  );
  await verifyApiContract(
    '/api/ai-qa',
    { method: 'POST', headers: jsonHeaders, body: '{}' },
    400,
    'AI QA API'
  );

  const smartSearchResponse = await verifyApiContract(
    '/api/smart-search',
    { method: 'POST', headers: jsonHeaders, body: '{}' },
    200,
    'smart search API'
  );
  assert.deepEqual(await smartSearchResponse.json(), {
    matched_case: null,
    matched_solution: null
  });

  const starsResponse = await verifyApiContract(
    '/api/github-stars',
    undefined,
    200,
    'GitHub Stars API'
  );
  const starsPayload = await starsResponse.json();
  assert(
    typeof starsPayload.rawValue === 'number' && typeof starsPayload.value === 'string',
    'GitHub Stars API returned an unexpected payload'
  );

  const categoriesResponse = await verifyApiContract(
    '/api/categories',
    undefined,
    200,
    'categories API'
  );
  const categoriesPayload = await categoriesResponse.json();
  assert(Array.isArray(categoriesPayload), 'categories API must return an array');

  const privateApiResponse = await request(customerPath('/api/v1/customers'));
  assert.equal(
    privateApiResponse.status,
    404,
    'admin v1 API must not be exposed by the public app'
  );
  assertProxyHeaders(privateApiResponse, 'blocked admin v1 API');
}

async function verifyPublicProxy() {
  await verifyMainSiteDiscovery();

  const homeResponse = await request(customersUrl);
  assert.equal(homeResponse.status, 200, 'customers homepage must return 200');
  assertProxyHeaders(homeResponse, 'customers homepage');
  const homeHtml = await homeResponse.text();
  assert(homeHtml.includes('FastGPT 客户案例中心'), 'customers homepage brand is missing');
  assertHtmlIdentity(homeHtml, canonicalCustomersUrl, 'customers homepage', true);

  const assets = extractSameOriginAssets(homeHtml);
  assert(assets.length > 0, 'customers homepage did not expose any mounted assets');
  const cssAssets = [];
  for (const assetUrl of assets) {
    const response = await request(assetUrl);
    assert(response.status < 400, `mounted asset failed (${response.status}): ${assetUrl}`);
    assertProxyHeaders(response, `mounted asset ${new URL(assetUrl).pathname}`);
    if ((response.headers.get('content-type') || '').includes('text/css')) {
      const css = await response.text();
      assertNoOldPublicIdentity(css, `stylesheet ${new URL(assetUrl).pathname}`);
      cssAssets.push(...extractCssAssets(css, assetUrl));
    }
    if (new URL(assetUrl).pathname.includes('/_next/static/')) {
      assert.match(
        response.headers.get('cache-control') || '',
        /max-age=31536000.*immutable/i,
        `hashed Next.js asset is missing immutable caching: ${assetUrl}`
      );
    }
  }
  assert(
    assets.some((assetUrl) => new URL(assetUrl).pathname.includes('/_next/static/')),
    'customers homepage must expose a hashed Next.js asset'
  );
  for (const assetUrl of new Set(cssAssets)) {
    const response = await request(assetUrl);
    assert(response.status < 400, `CSS dependency failed (${response.status}): ${assetUrl}`);
    assertProxyHeaders(response, `CSS dependency ${new URL(assetUrl).pathname}`);
  }

  await verifyMachineReadableAssets();

  const apiResponse = await request(customerPath('/api/customers?limit=100'));
  assert.equal(apiResponse.status, 200, 'customers list API must return 200');
  assertProxyHeaders(apiResponse, 'customers list API');
  assert.match(
    apiResponse.headers.get('cache-control') || '',
    /no-store/i,
    'customers API must be explicitly non-cacheable'
  );
  const apiBody = await apiResponse.text();
  assertNoOldPublicIdentity(apiBody, 'customers list API');
  const apiPayload = JSON.parse(apiBody);
  const customers = apiPayload.solutions || apiPayload.data || apiPayload;
  assert(
    Array.isArray(customers) && customers.length > 0,
    'customers list API must return entries'
  );
  const semanticCustomers = await verifyMountedContent(customers);
  await verifyPublicApiContracts();

  const sitemapResponse = await request(customerPath('/sitemap.xml'));
  assert.equal(sitemapResponse.status, 200, 'customers sitemap must return 200');
  const sitemap = await sitemapResponse.text();
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert(locations.length > 0, 'customers sitemap must contain at least one URL');
  assert.equal(
    new Set(locations).size,
    locations.length,
    'customers sitemap contains duplicate URLs'
  );
  for (const location of locations) {
    assert(
      location === canonicalCustomersUrl || location.startsWith(`${canonicalCustomersUrl}/`),
      `sitemap URL is outside the customers mount: ${location}`
    );
  }
  assertNoOldPublicIdentity(sitemap, 'customers sitemap');
  for (const customer of publishedCustomers) {
    const canonicalUrl = `${canonicalCustomersUrl}/${customer.categorySlug}/${customer.slug}`;
    assert(locations.includes(canonicalUrl), `customers sitemap is missing ${canonicalUrl}`);
  }

  for (const filename of ['llms.txt', 'llms-full.txt']) {
    const response = await request(customerPath(`/${filename}`));
    assert.equal(response.status, 200, `${filename} must return 200`);
    assertProxyHeaders(response, filename);
    const body = await response.text();
    assert(
      body.includes(canonicalCustomersUrl),
      `${filename} must reference ${canonicalCustomersUrl}`
    );
    assertNoOldPublicIdentity(body, filename);
  }
}

async function verifyOriginGate() {
  if (!originUrl) return;

  const rootResponse = await request(`${originUrl}/`);
  assert(
    [301, 308].includes(rootResponse.status),
    `origin root without a proxy secret must redirect, received ${rootResponse.status}`
  );
  assert.equal(
    rootResponse.headers.get('location'),
    canonicalCustomersUrl,
    'origin root must target the canonical customers homepage'
  );

  for (const customer of publishedCustomers) {
    const legacyPath = `/solutions/${customer.categorySlug}/${customer.slug}`;
    const expectedLegacyTarget = `${canonicalCustomersUrl}/${customer.categorySlug}/${customer.slug}`;
    const legacyResponse = await request(`${originUrl}${legacyPath}`);
    assertRedirect(
      legacyResponse,
      expectedLegacyTarget,
      `legacy origin customer ${customer.slug}`,
      [301, 308]
    );
  }

  const migrationQuery = '?utm_source=legacy&utm_campaign=customers-migration';
  const queryResponse = await request(
    `${originUrl}/solutions/${sampleCustomer.categorySlug}/${sampleCustomer.slug}${migrationQuery}`
  );
  assertRedirect(
    queryResponse,
    `${canonicalCustomersUrl}/${sampleCustomer.categorySlug}/${sampleCustomer.slug}${migrationQuery}`,
    'legacy origin query preservation',
    [301, 308]
  );

  const missingSecretResponse = await request(`${originUrl}${expectedBasePath}/api/customers`);
  assert.equal(
    missingSecretResponse.status,
    404,
    'origin must conceal APIs without a proxy secret'
  );

  const wrongSecretResponse = await request(`${originUrl}${expectedBasePath}/api/customers`, {
    headers: { 'X-Customers-Proxy-Secret': 'invalid-secret-value' }
  });
  assert.equal(wrongSecretResponse.status, 404, 'origin must conceal APIs from an invalid secret');

  if (proxySecret) {
    const validSecretResponse = await request(`${originUrl}${expectedBasePath}/api/customers`, {
      headers: { 'X-Customers-Proxy-Secret': proxySecret }
    });
    assert.equal(validSecretResponse.status, 200, 'origin must accept the current proxy secret');
  }

  if (previousProxySecret) {
    const previousSecretResponse = await request(`${originUrl}${expectedBasePath}/api/customers`, {
      headers: { 'X-Customers-Proxy-Secret': previousProxySecret }
    });
    assert.equal(
      previousSecretResponse.status,
      200,
      'origin must accept the previous secret during the rotation window'
    );
  }
}

async function verifyAdminIsolation() {
  const publicAdminResponse = await request(customerPath('/admin'));
  assertRedirect(
    publicAdminResponse,
    canonicalCustomersUrl,
    'public admin route isolation',
    [307, 308]
  );

  const publicLoginResponse = await request(customerPath('/login'));
  assertRedirect(
    publicLoginResponse,
    canonicalCustomersUrl,
    'public login route isolation',
    [307, 308]
  );

  if (!adminUrl) return;

  const loginResponse = await request(`${adminUrl}/login`);
  assert.equal(loginResponse.status, 200, 'admin login must return 200 without a basePath');
  const loginHtml = await loginResponse.text();
  assert(loginHtml.includes('FastGPT Customer Stories'), 'admin login brand is missing');
  assert(loginHtml.includes('/_next/static/'), 'admin assets must use root /_next paths');
  assert(!loginHtml.includes('/customers/_next/'), 'admin assets must not use the public basePath');
  assertNoOldPublicIdentity(loginHtml, 'admin login');

  const protectedAdminResponse = await request(`${adminUrl}/admin/customers`);
  assertRedirect(
    protectedAdminResponse,
    `${adminUrl}/login`,
    'protected admin route',
    [307, 308],
    adminUrl
  );
}

async function main() {
  await verifyPublicProxy();
  await verifyOriginGate();
  await verifyAdminIsolation();
  console.log(`Customers proxy verification passed for ${customersUrl}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
