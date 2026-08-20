const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { getPublishedFaqIds } = require('./lib/redirects');
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

  const includeCount = (nginxConfig.match(/include \/etc\/nginx\/security-headers\.conf;/g) || [])
    .length;
  // Keep the release manifest endpoint covered alongside the server and cache locations.
  assert.equal(includeCount, 12, 'Security headers must cover the server, release manifest, and cache locations');
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
  assert(nginxConfig.includes('map_hash_bucket_size 256;'), 'Nginx map hash bucket is too small');
  assert(nginxConfig.includes('map_hash_max_size 16384;'), 'Nginx map hash table is too small');
  assert(
    dockerfile.includes('Docker publication supports only NEXT_PUBLIC_SITE_VARIANT=cn'),
    'Docker build does not enforce its CN-only publication boundary'
  );
  assert(dockerfile.includes('RUN nginx -t'), 'Docker image does not validate the Nginx config');
  const releaseStageStart = dockerfile.indexOf('AS release-runtime');
  const runtimeStageStart = dockerfile.indexOf('AS runtime');
  const releaseStage = dockerfile.slice(releaseStageStart, runtimeStageStart);
  const redirectMapCopy = releaseStage.indexOf(
    'COPY release-out/__release/nginx-redirects.conf /etc/nginx/generated-redirects.conf'
  );
  const redirectMapGuard = releaseStage.indexOf('test -s /etc/nginx/generated-redirects.conf');
  const nginxTest = releaseStage.indexOf('nginx -t');
  assert(
    releaseStageStart >= 0 && runtimeStageStart > releaseStageStart,
    'Dockerfile must keep release-runtime before the default runtime stage'
  );
  assert(
    redirectMapCopy >= 0 && redirectMapGuard > redirectMapCopy && nginxTest > redirectMapGuard,
    'Release runtime must copy and validate the generated Nginx redirect map'
  );

  const redirectMap = fs.readFileSync(path.join(rootDir, '.next', 'nginx-redirects.conf'), 'utf8');
  if (variant === 'cn') {
    assert(redirectMap.includes('"/zh" "https://fastgpt.cn/";'));
    assert(redirectMap.includes(`"/en/faq/${faqId}" "https://fastgpt.io/faq/${faqId}";`));
    assert(!redirectMap.includes('"/ja/faq"'), 'Nginx redirects an unpublished locale page');
  } else {
    assert(!redirectMap.includes('"https://'), `${variant} build contains Nginx redirects`);
  }
}

function verifyCloudflareRedirects() {
  assert(!fs.existsSync(path.join(outDir, '_redirects')), 'Legacy Cloudflare redirects were exported');
  if (variant === 'cn') return;

  const worker = fs.readFileSync(path.join(outDir, '_worker.js'), 'utf8');
  if (variant === 'preview') {
    assert(worker.includes('new Map([])'), 'Preview worker contains redirect rules');
    assert(worker.includes("X-Robots-Tag', 'noindex, nofollow"));
  } else {
    assert(worker.includes(`/zh/faq/${faqId}`));
    assert(worker.includes(`https://fastgpt.cn/faq/${faqId}`));
  }
}

async function main() {
  await verifyImage();
  verifyNginxHeaders();
  verifyCloudflareRedirects();

  verifyFaqPage('/faq');
  verifyFaqPage(`/faq/${faqId}`);

  console.log(`P0 verification passed for ${baseUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
