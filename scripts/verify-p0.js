const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const baseUrl = (process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io').replace(/\/$/, '');
const socialImageUrl = `${baseUrl}/faq-social-preview.png`;
const faqId = 'Why-are-enterprises-paying-more';

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
  const metadata = await sharp(imagePath).metadata();

  assert.equal(metadata.width, 1200, 'FAQ social image width must be 1200');
  assert.equal(metadata.height, 630, 'FAQ social image height must be 630');
}

function verifyNginxHeaders() {
  const headerConfig = fs.readFileSync(path.join(rootDir, 'nginx-security-headers.conf'), 'utf8');
  const nginxConfig = fs.readFileSync(path.join(rootDir, 'nginx.conf'), 'utf8');
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
  assert.equal(includeCount, 11, 'Security headers must cover the server and all cache locations');
}

async function main() {
  await verifyImage();
  verifyNginxHeaders();

  for (const locale of ['en', 'zh']) {
    verifyFaqPage(`/${locale}/faq`);
    verifyFaqPage(`/${locale}/faq/${faqId}`);
  }

  console.log(`P0 verification passed for ${baseUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
