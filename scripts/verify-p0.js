const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const sharp = require('sharp');
const {
  buildRedirects,
  getPublishedFaqIds,
  parseNginxRedirectMap
} = require('./lib/redirects');
const { getCanonicalBaseUrl, resolveSiteVariant } = require('./lib/site-variant');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const variant = resolveSiteVariant();
const baseUrl = getCanonicalBaseUrl(variant);
const socialImageUrl = `${baseUrl}/faq-social-preview.png`;
const faqId = getPublishedFaqIds(rootDir).english.find(
  (id) => id === 'how-to-check-the-number',
);
if (!faqId) throw new Error('Missing stable bilingual FAQ fixture in the route registry');
const maxSocialImageBytes = 200_000;

function verifyRedirectProjection(actual, expected, label) {
  assert.equal(actual.size, expected.size, `${label} has an unexpected redirect count`);
  for (const [source, target] of expected) {
    assert.equal(actual.get(source), target, `${label} has an unexpected target for ${source}`);
  }
}

function resolveHtml(route) {
  const relativeRoute = route.replace(/^\//, '');
  const candidates = [
    path.join(outDir, `${relativeRoute}.html`),
    path.join(outDir, relativeRoute, 'index.html')
  ];
  const htmlPath = candidates.find((candidate) => fs.existsSync(candidate));

  assert(htmlPath, `Missing static HTML for ${route}`);
  return fs.readFileSync(htmlPath, 'utf8');
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\s+[^>]*>`, 'g')) || [];
}

function hasMeta(html, attribute, value, content) {
  return getTags(html, 'meta').some(
    (tag) => tag.includes(`${attribute}="${value}"`) && tag.includes(`content="${content}"`)
  );
}

function verifyFaqPage(route) {
  const html = resolveHtml(route);

  assert(hasMeta(html, 'property', 'og:image', socialImageUrl), `${route} is missing og:image`);
  assert(hasMeta(html, 'property', 'og:image:width', '1200'), `${route} is missing og:image:width`);
  assert(
    hasMeta(html, 'property', 'og:image:height', '630'),
    `${route} is missing og:image:height`
  );
  assert(
    hasMeta(html, 'name', 'twitter:image', socialImageUrl),
    `${route} is missing twitter:image`
  );
  assert(html.includes('"@type":"FAQPage"'), `${route} is missing FAQPage JSON-LD`);
}

async function verifyImage() {
  const imagePath = path.join(rootDir, 'public', 'faq-social-preview.png');
  const exportedImagePath = path.join(outDir, 'faq-social-preview.png');
  const metadata = await sharp(imagePath).metadata();
  const { size } = fs.statSync(imagePath);

  assert(fs.existsSync(exportedImagePath), 'Missing exported FAQ social image');
  assert.equal(metadata.width, 1200, 'FAQ social image width must be 1200');
  assert.equal(metadata.height, 630, 'FAQ social image height must be 630');
  assert(
    size < maxSocialImageBytes,
    `FAQ social image must be smaller than ${maxSocialImageBytes} bytes`
  );
  assert.equal(
    fs.statSync(exportedImagePath).size,
    size,
    'Exported FAQ social image must match the source asset'
  );
}

function verifyNginxHeaderCoverage(config) {
  const scopes = [];
  // ponytail: This checks the current multiline blocks; inline blocks need a Nginx parser.
  for (const line of config.split('\n').map((line) => line.trim())) {
    if (line.startsWith('#')) continue;
    if (line.endsWith('{')) {
      scopes.push({ name: line, directives: [] });
    } else if (line === '}') {
      const scope = scopes.pop();
      const isServer = scope.name.startsWith('server ');
      if (isServer || scope.directives.some((directive) => directive.startsWith('add_header '))) {
        const expected = isServer
          ? /^include \/etc\/nginx\/security-headers\.conf;$/
          : /^include \/etc\/nginx\/(?:embeddable-)?security-headers\.conf;$/;
        assert(
          scope.directives.some((directive) => expected.test(directive)),
          `Security headers missing from ${scope.name}`
        );
      }
    } else if (scopes.length) {
      scopes[scopes.length - 1].directives.push(line);
    }
  }
}

function verifyNginxHeaders() {
  const headerConfig = fs.readFileSync(path.join(rootDir, 'nginx-security-headers.conf'), 'utf8');
  const embeddableHeaderConfig = fs.readFileSync(
    path.join(rootDir, 'nginx-embeddable-security-headers.conf'),
    'utf8'
  );
  const nginxConfig = fs.readFileSync(path.join(rootDir, 'nginx.conf'), 'utf8');
  const dockerfile = fs.readFileSync(path.join(rootDir, 'Dockerfile'), 'utf8');
  const requiredHeaders = [
    'Strict-Transport-Security',
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Content-Security-Policy',
    'Referrer-Policy'
  ];

  for (const header of requiredHeaders) {
    assert(headerConfig.includes(`add_header ${header} `), `Missing ${header}`);
  }

  verifyNginxHeaderCoverage(nginxConfig);
  assert(headerConfig.includes('add_header X-Frame-Options "DENY"'), 'Default pages must deny framing');
  assert(
    !embeddableHeaderConfig.includes('X-Frame-Options'),
    'Embeddable pages must not send X-Frame-Options'
  );
  assert(
    embeddableHeaderConfig.includes('frame-ancestors *'),
    'Embeddable pages must allow framing from external pages'
  );
  assert(
    nginxConfig.includes('location ~ ^/(?:contact|(?:en|zh|zh-hant|ja|ar|vi|th|id|ms)/contact)$'),
    'Contact routes must use a dedicated embeddable location'
  );
  assert(
    nginxConfig.includes('include /etc/nginx/embeddable-security-headers.conf;'),
    'Contact routes must use the embeddable security headers'
  );
  assert(
    nginxConfig.includes('location ~ ^/(?:contact/embed|(?:en|zh|zh-hant)/contact/embed)$'),
    'Contact embed routes must use a dedicated embeddable location'
  );

  const cloudflareHeaders = fs.readFileSync(path.join(rootDir, 'public', '_headers'), 'utf8');
  assert(
    cloudflareHeaders.includes('/contact\n  ! X-Frame-Options'),
    'Cloudflare contact rule must detach X-Frame-Options'
  );
  assert(
    cloudflareHeaders.includes('/*/contact\n  ! X-Frame-Options'),
    'Cloudflare localized contact rule must detach X-Frame-Options'
  );
  assert(
    cloudflareHeaders.includes('/contact/embed\n  ! X-Frame-Options'),
    'Cloudflare contact embed rule must detach X-Frame-Options'
  );
  assert(
    cloudflareHeaders.includes('/*/contact/embed\n  ! X-Frame-Options'),
    'Cloudflare localized contact embed rule must detach X-Frame-Options'
  );

  assert(
    nginxConfig.includes('include /etc/nginx/generated-redirects.conf;'),
    'Nginx is missing the generated redirect map'
  );
  assert(
    nginxConfig.includes('return 301 $locale_redirect_target$is_args$args;'),
    'Nginx must preserve query parameters on canonical redirects'
  );
  assert(
    nginxConfig.includes('$locale_fallback_path'),
    'Nginx must internally fall back locale-prefixed routes'
  );
  assert(
    nginxConfig.includes(
      'try_files $uri $uri.html $locale_fallback_path $locale_fallback_path.html $locale_fallback_path/ $uri/ =404;'
    ),
    'Nginx locale fallback must run before a locale asset directory can redirect'
  );
  assert(nginxConfig.includes('map_hash_bucket_size 256;'), 'Nginx map hash bucket is too small');
  assert(nginxConfig.includes('map_hash_max_size 16384;'), 'Nginx map hash table is too small');
  assert(
    dockerfile.includes('Docker publication supports only NEXT_PUBLIC_SITE_VARIANT=cn'),
    'Docker build does not enforce its CN-only publication boundary'
  );
  assert(dockerfile.includes('RUN nginx -t'), 'Docker image does not validate the Nginx config');
  const redirectMap = parseNginxRedirectMap(
    fs.readFileSync(path.join(rootDir, '.next', 'nginx-redirects.conf'), 'utf8')
  );
  const expected = variant === 'cn' ? buildRedirects(rootDir).cnRedirects : new Map();
  verifyRedirectProjection(redirectMap, expected, `${variant} Nginx export`);
}

async function verifyCloudflareRedirects() {
  assert(!fs.existsSync(path.join(outDir, '_redirects')), 'Legacy Cloudflare redirects were exported');
  if (variant === 'cn') return;

  const worker = fs.readFileSync(path.join(outDir, '_worker.js'), 'utf8');
  const encoded = worker.match(/const redirects = new Map\((\[[\s\S]*?\])\);/)?.[1];
  assert(encoded, 'Cloudflare Worker has no redirect map');
  const redirects = new Map(JSON.parse(encoded));
  const expected = variant === 'io' ? buildRedirects(rootDir).ioRedirects : new Map();
  verifyRedirectProjection(redirects, expected, `${variant} Worker export`);
  if (variant === 'preview') {
    assert(worker.includes("X-Robots-Tag', 'noindex, nofollow"));
  } else {
    assert(!redirects.has('/zh'), 'Worker redirects /zh to another domain');
    assert(!redirects.has('/en'), 'Worker redirects /en to another domain');
    assert(worker.includes("fallbackUrl.pathname = match[1] || '/';"));
  }

  const context = { Headers, Map, Request, Response, URL };
  vm.runInNewContext(worker.replace('export default', 'globalThis.worker ='), context);
  const requests = [];
  const response = await context.worker.fetch(
    new Request(`${baseUrl}/zh/price?source=locale-fallback-test`),
    {
      ASSETS: {
        async fetch(request) {
          const url = new URL(request.url);
          requests.push(`${url.pathname}${url.search}`);
          return url.pathname === '/price'
            ? new Response('default language', { status: 200 })
            : new Response('missing', { status: 404 });
        }
      }
    }
  );
  assert.equal(response.status, 200, 'Worker did not serve the default-language route');
  assert.equal(await response.text(), 'default language');
  assert.deepEqual(requests, [
    '/zh/price?source=locale-fallback-test',
    '/price?source=locale-fallback-test'
  ]);
}

async function main() {
  await verifyImage();
  verifyNginxHeaders();
  await verifyCloudflareRedirects();

  verifyFaqPage('/faq');
  verifyFaqPage(`/faq/${faqId}`);

  console.log(`P0 verification passed for ${baseUrl}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { verifyNginxHeaderCoverage };
