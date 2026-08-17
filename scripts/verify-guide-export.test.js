const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const registry = require('../src/content/guides/registry.json');
const { verifyGuideExport } = require('./verify-guide-export');

const HUB_COPY = {
  en: {
    h1: 'FastGPT Guides',
    title: 'FastGPT Guides',
    description: 'Practical enterprise AI implementation and decision guides.',
    home: 'Home',
    guide: 'Guides',
    back: 'Back to guides'
  },
  zh: {
    h1: 'FastGPT 指南',
    title: 'FastGPT 指南',
    description: '企业 AI 落地与选型实践指南。',
    home: '首页',
    guide: '指南',
    back: '返回指南'
  }
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function writeRoute(root, route, html) {
  const filePath = path.join(root, `${route}.html`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html);
}

function alternates(slug) {
  const route = slug ? `/guide/${slug}` : '/guide';
  return [
    ['zh-CN', `https://fastgpt.cn${route}`],
    ['en', `https://fastgpt.io${route}`],
    ['x-default', `https://fastgpt.io${route}`]
  ]
    .map(([language, href]) => `<link rel="alternate" hreflang="${language}" href="${href}">`)
    .join('');
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function writeFixture(outDir, variant) {
  const locale = variant === 'cn' ? 'zh' : 'en';
  const host = variant === 'cn' ? 'https://fastgpt.cn' : 'https://fastgpt.io';
  const hub = HUB_COPY[locale];
  const routes = ['/guide', ...registry.entries.map((entry) => `/guide/${entry.slug}`)];

  const cards = registry.entries
    .map(
      (entry) =>
        `<a href="/guide/${entry.slug}"><h3>${escapeHtml(entry[locale].h1)}</h3></a>`
    )
    .join('');
  writeRoute(
    outDir,
    'guide',
    `<html><head><title>${escapeHtml(hub.title)}</title><meta name="description" content="${escapeHtml(hub.description)}"><link rel="canonical" href="${host}/guide"><meta property="og:url" content="${host}/guide">${alternates()}${jsonLd({
      '@graph': [
        { '@type': 'CollectionPage' },
        { '@type': 'ItemList' },
        { '@type': 'BreadcrumbList' }
      ]
    })}</head><body><nav><a href="/">${hub.home}</a></nav><h1>${escapeHtml(hub.h1)}</h1>${cards}</body></html>`
  );

  for (const entry of registry.entries) {
    const source = entry[locale];
    const canonical = `${host}/guide/${entry.slug}`;
    const asset =
      source.assetPolicy.status === 'required'
        ? `<img src="${source.assetPolicy.path}" alt="${escapeHtml(source.assetPolicy.alt)}">`
        : '';
    const related = source.configuredInternalLinks
      .map((link) => `<a href="${link.target}">${escapeHtml(link.label)}</a>`)
      .join('');
    const schema = [
      { '@type': 'Article' },
      { '@type': 'BreadcrumbList' },
      ...(source.schemaTokens.includes('HowTo') ? [{ '@type': 'HowTo' }] : [])
    ];
    writeRoute(
      outDir,
      `guide/${entry.slug}`,
      `<html><head><title>${escapeHtml(source.metaTitle)}</title><meta name="description" content="${escapeHtml(source.metaDescription)}"><link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}">${alternates(entry.slug)}${jsonLd({
        '@graph': schema
      })}</head><body><nav><a href="/">${hub.home}</a><a href="/guide">${hub.guide}</a></nav><h1>${escapeHtml(source.h1)}</h1>${asset}${related}<a href="/guide">${hub.back}</a></body></html>`
    );
  }

  fs.writeFileSync(
    path.join(outDir, 'sitemap.xml'),
    `<urlset>${routes.map((route) => `<url><loc>${host}${route}</loc></url>`).join('')}</urlset>`
  );
}

test('tracer accepts exact io Guide inventory', () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-guide-export-'));
  try {
    writeFixture(outDir, 'io');
    assert.deepEqual(verifyGuideExport({ outDir, variant: 'io' }), {
      variant: 'io',
      pages: 9,
      sitemapUrls: 9
    });
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
});

test('rejects invalid arguments and missing artifacts with scoped diagnostics', () => {
  assert.throws(
    () => verifyGuideExport({ outDir: path.join(os.tmpdir(), 'missing-guide-export'), variant: 'unknown' }),
    /variant=unknown slug=hub path=.* surface=arguments/
  );
});
