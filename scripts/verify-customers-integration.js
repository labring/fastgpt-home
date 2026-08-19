#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const customersUrl = 'https://fastgpt.cn/customers';
const localeCodes = ['en', 'zh', 'zh-hant', 'ja', 'ar', 'vi', 'th', 'id', 'ms'];
const llmsPaths = ['llms.txt', ...localeCodes.map((locale) => `${locale}/llms.txt`)];

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

for (const locale of localeCodes) {
  const dictionary = JSON.parse(read(`src/locales/${locale}.json`));
  const customersLink = dictionary.links.find((link) => link.href === customersUrl);
  assert(customersLink, `${locale} navigation must link to ${customersUrl}`);
}

const englishDictionary = JSON.parse(read('src/locales/en.json'));
assert.equal(
  englishDictionary.links.find((link) => link.href === customersUrl)?.label,
  'Customer Stories',
  'English navigation must use the Customer Stories brand'
);

const chineseDictionary = JSON.parse(read('src/locales/zh.json'));
assert.equal(
  chineseDictionary.links.find((link) => link.href === customersUrl)?.label,
  '客户案例中心',
  'Chinese navigation must use the 客户案例中心 brand'
);

const footer = read('src/components/home/Footer.tsx');
assert(
  footer.includes(`href: '${customersUrl}'`),
  'Footer must link to the customer stories center'
);

const navbar = read('src/components/home/Navbar.tsx');
assert(
  navbar.includes("link.href.includes('fastgpt.cn/customers')"),
  'Navbar analytics must recognize the customers URL'
);

const robots = read('public/robots.txt');
assert(robots.includes('Sitemap:'), 'Root sitemap is missing');

const robotsGenerator = read('scripts/generate-robots.js');
assert(
  robotsGenerator.includes("${isCn ? `\\nSitemap: ${customersUrl}/sitemap.xml` : ''}"),
  'CN robots generation must expose the customers sitemap'
);

for (const llmsPath of llmsPaths) {
  assert(
    read(`public/${llmsPath}`).includes(customersUrl),
    `public/${llmsPath} must expose the customer stories center`
  );
}

const legacyReferences = [
  ...localeCodes.map((locale) => `src/locales/${locale}.json`),
  'src/components/home/Navbar.tsx',
  'src/components/home/Footer.tsx',
  'scripts/generate-robots.js',
  'scripts/generate-llms.js'
].filter((relativePath) => read(relativePath).includes('solutions.fastgpt.cn'));

assert.deepEqual(
  legacyReferences,
  [],
  `Legacy solutions host remains in: ${legacyReferences.join(', ')}`
);

const legacyBrandValues = [
  ['解决', '方案中心'].join(''),
  ['Solutions', 'Center'].join(' '),
  ['FastGPT', 'Solutions'].join(' ')
];
const oldBrandReferences = [
  ...localeCodes.map((locale) => `src/locales/${locale}.json`),
  'scripts/generate-llms.js',
  ...llmsPaths.map((llmsPath) => `public/${llmsPath}`)
].filter((relativePath) => {
  const source = read(relativePath);
  return legacyBrandValues.some((value) => source.includes(value));
});

assert.deepEqual(
  oldBrandReferences,
  [],
  `Legacy brand remains in: ${oldBrandReferences.join(', ')}`
);

const nginxConfig = read('nginx.conf');
assert(
  nginxConfig.includes('include /etc/nginx/customers-proxy.conf;'),
  'Nginx must load the runtime-generated customers proxy'
);

const proxyRoutes = read('nginx-customers-proxy-routes.conf');
for (const requiredRoute of [
  'location = /customers',
  'location ^~ /customers/api/',
  'location ^~ /customers/_next/static/',
  'location ^~ /customers/'
]) {
  assert(proxyRoutes.includes(requiredRoute), `Customers proxy route is missing: ${requiredRoute}`);
}
assert(
  proxyRoutes.includes('Cache-Control "private, no-store"'),
  'Customers API responses must be explicitly non-cacheable'
);
assert(
  proxyRoutes.includes('add_header X-FastGPT-Route "customers-proxy" always;'),
  'Customers routes must opt out of inherited Home security headers and expose route identity'
);
assert.equal(
  proxyRoutes.match(/include \/etc\/nginx\/security-headers\.conf;/g)?.length,
  4,
  'Every customers proxy location must load the authoritative security headers'
);

const proxyTemplate = read('nginx-customers-proxy-location.conf.template');
for (const requiredDirective of [
  'proxy_pass https://@@CUSTOMERS_ORIGIN_HOST@@$request_uri;',
  'proxy_ssl_server_name on;',
  'proxy_set_header X-Customers-Proxy-Secret "@@CUSTOMERS_PROXY_SECRET@@";',
  'proxy_redirect off;',
  'proxy_hide_header Content-Security-Policy;'
]) {
  assert(
    proxyTemplate.includes(requiredDirective),
    `Customers proxy directive is missing: ${requiredDirective}`
  );
}

const securityHeaders = read('nginx-security-headers.conf');
assert(
  securityHeaders.includes("frame-src 'self' https://cloud.fastgpt.cn"),
  'Customers CSP must allow the FastGPT chatbot iframe'
);

const entrypoint = read('docker-entrypoint-customers.sh');
assert(
  entrypoint.includes('CUSTOMERS_PROXY_ENABLED'),
  'Customers proxy must require an explicit runtime enable flag'
);
assert(
  entrypoint.includes('*[!A-Za-z0-9_-]*') && entrypoint.includes('${#proxy_secret}'),
  'Customers proxy must validate secret entropy before starting Nginx'
);

const envTemplate = read('.env.template');
for (const variableName of [
  'CUSTOMERS_PROXY_ENABLED',
  'CUSTOMERS_ORIGIN_HOST',
  'CUSTOMERS_PROXY_SECRET',
  'CUSTOMERS_DNS_RESOLVER'
]) {
  assert(envTemplate.includes(`${variableName}=`), `.env.template is missing ${variableName}`);
}

const imageWorkflow = read('.github/workflows/fastgpt-home-image.yml');
assert(
  !imageWorkflow.includes('kubectl') && !imageWorkflow.includes('KUBE_CONFIG'),
  'Home image workflow must not own Sealos or Kubernetes deployment configuration'
);
assert(
  imageWorkflow.includes('docker/build-push-action') &&
    imageWorkflow.includes('ghcr.io/${{ github.repository }}'),
  'Home image workflow must build and publish an image for the deployment platform'
);

const proxyRunbook = read('docs/customers-proxy-runbook.md');
for (const requiredSection of [
  '## Sealos Environment Variables',
  '## Release Order',
  '## Rollback'
]) {
  assert(proxyRunbook.includes(requiredSection), `Customers runbook is missing ${requiredSection}`);
}

console.log('Customers integration verification passed');
