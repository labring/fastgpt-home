const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const registry = require('../src/content/guides/registry.json');
const { assertNoCaseFoldCollisions, parseArgs, verifyGuideExport } = require('./verify-guide-export');

const HUB_COPY = {
  en: {
    h1: 'FastGPT Guides',
    title: 'FastGPT Guides',
    description: 'Practical enterprise AI implementation and decision guides.',
    home: 'Home',
    guide: 'Guide',
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

function writeRoute(root, route, html, style = 'flat') {
  const filePath =
    style === 'nested' ? path.join(root, route, 'index.html') : path.join(root, `${route}.html`);
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

function updatedAt(source, locale) {
  const [year, month, day] = source.dateModified.split('-').map(Number);
  if (locale === 'zh') return `更新于 ${year}年${month}月${day}日`;
  const date = new Date(Date.UTC(year, month - 1, day));
  const label = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: locale === 'zh' ? 'numeric' : 'long',
    day: 'numeric'
  }).format(date);
  return `Last updated ${label}`;
}

function writeFixture(outDir, variant, { entries = registry.entries, style = 'flat' } = {}) {
  const locale = variant === 'cn' ? 'zh' : 'en';
  const host = variant === 'cn' ? 'https://fastgpt.cn' : 'https://fastgpt.io';
  const hub = HUB_COPY[locale];
  const routes = ['/guide', ...entries.map((entry) => `/guide/${entry.slug}`)];

  const cards = entries
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
        {
          '@type': 'CollectionPage',
          url: `${host}/guide`,
          name: hub.h1,
          description: hub.description,
          inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US'
        },
        {
          '@type': 'ItemList',
          itemListElement: entries.map((entry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: entry[locale].h1,
            url: `${host}/guide/${entry.slug}`
          }))
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: hub.home, item: `${host}/` },
            { '@type': 'ListItem', position: 2, name: hub.guide, item: `${host}/guide` }
          ]
        }
      ]
    })}</head><body><nav aria-label="Breadcrumb"><a href="/">${hub.home}</a></nav><h1>${escapeHtml(hub.h1)}</h1>${cards}</body></html>`,
    style
  );

  for (const entry of entries) {
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
      {
        '@type': 'Article',
        headline: source.h1,
        description: source.metaDescription,
        inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: hub.home, item: `${host}/` },
          { '@type': 'ListItem', position: 2, name: hub.guide, item: `${host}/guide` },
          { '@type': 'ListItem', position: 3, name: source.h1, item: canonical }
        ]
      },
      ...(source.schemaTokens.includes('HowTo')
        ? [
            {
              '@type': 'HowTo',
              name: source.h1,
              description: source.metaDescription,
              url: canonical,
              inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US'
            }
          ]
        : [])
    ];
    writeRoute(
      outDir,
      `guide/${entry.slug}`,
      `<html><head><title>${escapeHtml(source.metaTitle)}</title><meta name="description" content="${escapeHtml(source.metaDescription)}"><link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}">${alternates(entry.slug)}${jsonLd({
        '@graph': schema
      })}</head><body><nav aria-label="Breadcrumb"><a href="/">${hub.home}</a><a href="/guide">${hub.guide}</a></nav><h1>${escapeHtml(source.h1)}</h1><p class="GuideArticlePage_summary__fixture">${escapeHtml(source.metaDescription)}</p><time datetime="${source.dateModified}">${updatedAt(source, locale)}</time>${asset}${related}<a href="/guide">${hub.back}</a></body></html>`,
      style
    );
  }

  fs.writeFileSync(
    path.join(outDir, 'sitemap.xml'),
    `<urlset>${routes.map((route) => `<url><loc>${host}${route}</loc></url>`).join('')}</urlset>`
  );
}

function mutateRoute(outDir, route, mutate, style = 'flat') {
  const filePath = style === 'nested' ? path.join(outDir, route, 'index.html') : path.join(outDir, `${route}.html`);
  fs.writeFileSync(filePath, mutate(fs.readFileSync(filePath, 'utf8')));
  return filePath;
}

function assertScopedFailure(run, { variant, slug, filePath, surface, reason }) {
  assert.throws(run, (error) => {
    assert.match(error.message, new RegExp(`variant=${variant} slug=${slug} path=${filePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} surface=${surface}`));
    assert.match(error.message, reason);
    return true;
  });
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

test('happy artifact matrix accepts exact io and cn Guide inventories', () => {
  for (const variant of ['io', 'cn']) {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `verify-guide-export-${variant}-`));
    try {
      writeFixture(outDir, variant);
      assert.deepEqual(verifyGuideExport({ outDir, variant }), {
        variant,
        pages: 9,
        sitemapUrls: 9
      });
      assert.equal(fs.existsSync(path.join(outDir, 'guide.html')), true);
      assert.equal(fs.readdirSync(path.join(outDir, 'guide')).filter((name) => name.endsWith('.html')).length, 8);
    } finally {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  }
});

test('rejects invalid arguments and missing artifacts with scoped diagnostics', () => {
  assert.throws(
    () => verifyGuideExport({ outDir: path.join(os.tmpdir(), 'missing-guide-export'), variant: 'unknown' }),
    /variant=unknown slug=hub path=.* surface=arguments/
  );
  assert.throws(() => parseArgs(['--variant', 'io']), /variant=io slug=hub path=<missing> surface=arguments/);
  assert.throws(() => parseArgs(['--out-dir', 'fixture']), /variant=missing slug=hub path=.* surface=arguments/);
});

test('CLI reports the selected variant and exact Guide counts', () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-guide-export-cli-'));
  try {
    writeFixture(outDir, 'cn');
    const output = execFileSync(
      process.execPath,
      [path.join(__dirname, 'verify-guide-export.js'), '--out-dir', outDir, '--variant', 'cn'],
      { encoding: 'utf8' }
    );
    assert.match(output, /variant=cn Guide HTML verified: 9 pages, 9 sitemap URLs/);
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
});

test('Guide export surface mutations reject localized hub and article drift with scoped diagnostics', () => {
  const sourceBefore = fs.readFileSync(path.join(__dirname, '../src/content/guides/registry.json'));
  const standard = registry.entries.find((entry) => !entry.en.schemaTokens.includes('HowTo'));
  const howTo = registry.entries.find((entry) => entry.en.schemaTokens.includes('HowTo'));
  assert(standard);
  assert(howTo);

  for (const variant of ['io', 'cn']) {
    const locale = variant === 'cn' ? 'zh' : 'en';
    const host = variant === 'cn' ? 'https://fastgpt.cn' : 'https://fastgpt.io';
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `verify-guide-export-surfaces-${variant}-`));
    try {
      const cases = [
        {
          slug: 'hub',
          route: 'guide',
          surface: 'title',
          reason: /received/, 
          mutate: (html) => html.replace(`<title>${HUB_COPY[locale].title}</title>`, '<title>Wrong title</title>')
        },
        {
          slug: 'hub',
          route: 'guide',
          surface: 'description',
          reason: /received/,
          mutate: (html) => html.replace('content="Practical enterprise AI implementation and decision guides."', 'content="Wrong description"').replace('content="企业 AI 落地与选型实践指南。"', 'content="Wrong description"')
        },
        {
          slug: 'hub',
          route: 'guide',
          surface: 'canonical',
          reason: /received/,
          mutate: (html) => html.replace(`rel="canonical" href="${host}/guide"`, `rel="canonical" href="${host}/wrong"`)
        },
        {
          slug: 'hub',
          route: 'guide',
          surface: 'og:url',
          reason: /received/,
          mutate: (html) => html.replace(`property="og:url" content="${host}/guide"`, `property="og:url" content="${host}/wrong"`)
        },
        {
          slug: 'hub',
          route: 'guide',
          surface: 'alternate:en',
          reason: /received/,
          mutate: (html) => html.replace('hreflang="en" href="https://fastgpt.io/guide"', 'hreflang="en" href="https://fastgpt.io/wrong"')
        },
        {
          slug: 'hub',
          route: 'guide',
          surface: 'alternates',
          reason: /alternate keys/,
          mutate: (html) => html.replace(/<link rel="alternate" hreflang="x-default"[^>]*>/, '')
        },
        {
          slug: 'hub',
          route: 'guide',
          surface: 'h1',
          reason: /received/,
          mutate: (html) => html.replace(`<h1>${HUB_COPY[locale].h1}</h1>`, '<h1>Wrong H1</h1>')
        },
        {
          slug: 'hub',
          route: 'guide',
          surface: 'schema:CollectionPage',
          reason: /CollectionPage/,
          mutate: (html) => html.replace('CollectionPage', 'WrongPage')
        },
        {
          slug: 'hub',
          route: 'guide',
          surface: 'navigation',
          reason: /visible card target/,
          mutate: (html) => html.replace(`href="/guide/${registry.entries[0].slug}"`, 'href="/guide/wrong"')
        },
        {
          slug: 'hub',
          route: 'guide',
          surface: 'schema:ItemList',
          reason: /ItemList/,
          mutate: (html) => html.replace('"position":1', '"position":99')
        },
        {
          slug: 'hub',
          route: 'guide',
          surface: 'schema:BreadcrumbList',
          reason: /BreadcrumbList/,
          mutate: (html) => html.replace(`"item":"${host}/"`, `"item":"${host}/wrong"`)
        }
      ];

      for (const mutation of cases) {
        writeFixture(outDir, variant);
        const filePath = mutateRoute(outDir, mutation.route, mutation.mutate);
        assertScopedFailure(() => verifyGuideExport({ outDir, variant }), { ...mutation, variant, filePath });
        fs.rmSync(outDir, { recursive: true, force: true });
        fs.mkdirSync(outDir);
      }

      for (const entry of [standard, howTo]) {
        const source = entry[locale];
        const route = `guide/${entry.slug}`;
        const articleCases = [
          ['title', /received/, (html) => html.replace(`<title>${escapeHtml(source.metaTitle)}</title>`, '<title>Wrong title</title>')],
          ['description', /received/, (html) => html.replace(`content="${escapeHtml(source.metaDescription)}"`, 'content="Wrong description"')],
          ['canonical', /received/, (html) => html.replace(`rel="canonical" href="${host}/guide/${entry.slug}"`, `rel="canonical" href="${host}/wrong"`)],
          ['og:url', /received/, (html) => html.replace(`property="og:url" content="${host}/guide/${entry.slug}"`, `property="og:url" content="${host}/wrong"`)],
          ['alternate:zh-CN', /received/, (html) => html.replace(`hreflang="zh-CN" href="https://fastgpt.cn/guide/${entry.slug}"`, 'hreflang="zh-CN" href="https://fastgpt.cn/wrong"')],
          ['h1', /received/, (html) => html.replace(`<h1>${escapeHtml(source.h1)}</h1>`, '<h1>Wrong H1</h1>')],
          ['updated', /updated/, (html) => html.replace(`datetime="${source.dateModified}"`, 'datetime="2026-01-01"')],
          ['schema:Article', /Article/, (html) => html.replace('"headline":', '"wrongHeadline":')],
          ['schema:BreadcrumbList', /BreadcrumbList/, (html) => html.replace(`"item":"${host}/guide"`, `"item":"${host}/wrong"`)],
          ['breadcrumb', /breadcrumb target/, (html) => html.replace(`href="/">${HUB_COPY[locale].home}`, `href="/wrong">${HUB_COPY[locale].home}`)],
          ['navigation', /hub return/, (html) => html.replace(`>${HUB_COPY[locale].back}</a>`, '>Wrong return</a>')]
        ];
        if (source.schemaTokens.includes('HowTo')) {
          articleCases.push(['schema:HowTo', /HowTo/, (html) => html.replace('"@type":"HowTo"', '"@type":"WrongHowTo"')]);
        }
        for (const [surface, reason, mutate] of articleCases) {
          writeFixture(outDir, variant);
          const filePath = mutateRoute(outDir, route, mutate);
          assertScopedFailure(() => verifyGuideExport({ outDir, variant }), { variant, slug: entry.slug, filePath, surface, reason });
          fs.rmSync(outDir, { recursive: true, force: true });
          fs.mkdirSync(outDir);
        }
      }

      const entries = structuredClone(registry.entries);
      const activated = entries[0][locale];
      activated.assetPolicy = { status: 'required', path: '/guide-asset.png', alt: `Guide asset ${locale}` };
      activated.configuredInternalLinks = [{ label: `Guide link ${locale}`, target: '/pricing' }];
      writeFixture(outDir, variant, { entries });
      const assetPath = mutateRoute(outDir, `guide/${entries[0].slug}`, (html) => html.replace('/guide-asset.png', '/wrong-asset.png'));
      assertScopedFailure(() => verifyGuideExport({ outDir, variant, entries }), { variant, slug: entries[0].slug, filePath: assetPath, surface: 'asset', reason: /required asset/ });
      writeFixture(outDir, variant, { entries });
      const linkPath = mutateRoute(outDir, `guide/${entries[0].slug}`, (html) => html.replace(`>${activated.configuredInternalLinks[0].label}</a>`, '>Wrong link</a>'));
      assertScopedFailure(() => verifyGuideExport({ outDir, variant, entries }), { variant, slug: entries[0].slug, filePath: linkPath, surface: 'configured-link', reason: /configured link/ });
      writeFixture(outDir, variant);
      const malformedPath = mutateRoute(outDir, `guide/${howTo.slug}`, (html) => html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '<script type="application/ld+json">{</script>'));
      assertScopedFailure(() => verifyGuideExport({ outDir, variant }), { variant, slug: howTo.slug, filePath: malformedPath, surface: 'schema', reason: /invalid JSON-LD/ });
    } finally {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  }
  assert.deepEqual(fs.readFileSync(path.join(__dirname, '../src/content/guides/registry.json')), sourceBefore);
});

test('Guide export inventory and CLI regressions reject route, sitemap, and argument drift', () => {
  const sourceBefore = fs.readFileSync(path.join(__dirname, '../src/content/guides/registry.json'));
  const script = path.join(__dirname, 'verify-guide-export.js');

  for (const variant of ['io', 'cn']) {
    const host = variant === 'cn' ? 'https://fastgpt.cn' : 'https://fastgpt.io';
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), `verify-guide-export-inventory-${variant}-`));
    try {
      writeFixture(outDir, variant, { style: 'nested' });
      assert.deepEqual(verifyGuideExport({ outDir, variant }), { variant, pages: 9, sitemapUrls: 9 });
      fs.rmSync(outDir, { recursive: true, force: true });
      fs.mkdirSync(outDir);

      const inventoryCases = [
        {
          name: 'missing route',
          mutate: () => fs.rmSync(path.join(outDir, 'guide', `${registry.entries[0].slug}.html`)),
          reason: /expected exact Guide routes/
        },
        {
          name: 'extra route',
          mutate: () => writeRoute(outDir, 'guide/unapproved-guide', '<html></html>'),
          reason: /expected exact Guide routes/
        },
        {
          name: 'flat and nested duplicate',
          mutate: () => writeRoute(outDir, 'guide', '<html></html>', 'nested'),
          reason: /duplicate Guide HTML route \/guide/
        },
        {
          name: 'unsafe nested route',
          mutate: () => writeRoute(outDir, 'guide/unapproved/nested', '<html></html>'),
          reason: /invalid Guide HTML output path/
        }
      ];
      for (const inventoryCase of inventoryCases) {
        writeFixture(outDir, variant);
        inventoryCase.mutate();
        assertScopedFailure(() => verifyGuideExport({ outDir, variant }), {
          variant,
          slug: 'hub',
          filePath: outDir,
          surface: 'inventory',
          reason: inventoryCase.reason
        });
        fs.rmSync(outDir, { recursive: true, force: true });
        fs.mkdirSync(outDir);
      }

      writeFixture(outDir, variant);
      writeRoute(outDir, 'en/guide', '<html><body>adapter</body></html>');
      writeRoute(outDir, 'zh/guide', '<html><body>adapter</body></html>');
      assert.deepEqual(verifyGuideExport({ outDir, variant }), { variant, pages: 9, sitemapUrls: 9 });

      const sitemapCases = [
        ['wrong owner', (xml) => xml.replace(host, variant === 'cn' ? 'https://fastgpt.io' : 'https://fastgpt.cn'), /expected exact Guide sitemap URLs/],
        ['duplicate', (xml) => xml.replace('</urlset>', `<url><loc>${host}/guide</loc></url></urlset>`), /duplicate Guide URLs/],
        ['extra', (xml) => xml.replace('</urlset>', `<url><loc>${host}/guide/unapproved-guide</loc></url></urlset>`), /expected exact Guide sitemap URLs/],
        ['missing', (xml) => xml.replace(`<url><loc>${host}/guide/${registry.entries[0].slug}</loc></url>`, ''), /expected exact Guide sitemap URLs/],
        ['malformed', (xml) => xml.replace('</urlset>', '<url><loc>https://[bad</loc></url></urlset>'), /invalid sitemap URL/]
      ];
      for (const [, mutate, reason] of sitemapCases) {
        writeFixture(outDir, variant);
        const sitemapPath = path.join(outDir, 'sitemap.xml');
        fs.writeFileSync(sitemapPath, mutate(fs.readFileSync(sitemapPath, 'utf8')));
        assertScopedFailure(() => verifyGuideExport({ outDir, variant }), {
          variant,
          slug: 'hub',
          filePath: sitemapPath,
          surface: 'sitemap',
          reason
        });
        fs.rmSync(outDir, { recursive: true, force: true });
        fs.mkdirSync(outDir);
      }

      writeFixture(outDir, variant === 'io' ? 'cn' : 'io');
      assert.throws(() => verifyGuideExport({ outDir, variant }), /variant=.* slug=hub path=.* surface=title/);

      writeFixture(outDir, variant);
      for (const args of [[], ['--out-dir', outDir], ['--variant', variant], ['--unknown', 'value'], ['--out-dir', outDir, '--variant', 'invalid']]) {
        const result = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /variant=.* slug=hub path=.* surface=arguments/);
      }
      const success = spawnSync(process.execPath, [script, '--out-dir', outDir, '--variant', variant], { encoding: 'utf8' });
      assert.equal(success.status, 0);
      assert.match(success.stdout, new RegExp(`variant=${variant} Guide HTML verified: 9 pages, 9 sitemap URLs`));
      fs.rmSync(path.join(outDir, 'guide', `${registry.entries[0].slug}.html`));
      const failed = spawnSync(process.execPath, [script, '--out-dir', outDir, '--variant', variant], { encoding: 'utf8' });
      assert.notEqual(failed.status, 0);
      assert.match(failed.stderr, /variant=.* slug=hub path=.* surface=inventory/);
    } finally {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  }

  assert.throws(
    () =>
      assertNoCaseFoldCollisions(
        ['/guide/Case-Sensitive.html', '/guide/case-sensitive.html'],
        { variant: 'io', slug: 'hub', filePath: '<fixture>', surface: 'inventory' }
      ),
    /variant=io slug=hub path=<fixture> surface=inventory.*Case-Sensitive.*case-sensitive.*case-sensitive export host/
  );
  const importCheck = spawnSync(process.execPath, ['-e', "require('./scripts/verify-guide-export')"], {
    cwd: path.join(__dirname, '..'),
    encoding: 'utf8'
  });
  assert.equal(importCheck.status, 0);
  assert.equal(importCheck.stdout, '');
  assert.equal(importCheck.stderr, '');
  assert.deepEqual(fs.readFileSync(path.join(__dirname, '../src/content/guides/registry.json')), sourceBefore);
});
