const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const {
  buildRedirects,
  getTechIdentities,
  getTechRoutesToRemove,
  parseNginxRedirectMap,
  writeCloudflareWorker,
  writeNginxRedirectMap
} = require('./lib/redirects');
const { verifyTechnicalExport } = require('./verify-technical-export');
const root = path.resolve(__dirname, '..');
const baseUrls = { cn: 'https://fastgpt.cn', io: 'https://fastgpt.io' };
const EXPECTED_TECHNICAL_PAGE_COUNT = require('../src/components/tech-center/entries.json').length;
const bilingualSamePathIdentities = [
  {
    key: 'zh|/api/shared-guide',
    locale: 'zh',
    canonicalPath: '/api/shared-guide',
    sourcePath: '/zh/api/shared-guide'
  },
  {
    key: 'en|/api/shared-guide',
    locale: 'en',
    canonicalPath: '/api/shared-guide',
    sourcePath: '/en/api/shared-guide'
  }
];

function writeArticle(outDir, route, canonical, language, robots) {
  const contentPath = '/api/shared-guide';
  const filePath = path.join(outDir, `${route.replace(/^\//, '')}.html`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  for (const lang of ['zh', 'en']) {
    const source = path.join(outDir, `src/content/tech-center/${lang}${contentPath}.md`);
    fs.mkdirSync(path.dirname(source), { recursive: true });
    fs.writeFileSync(
      source,
      `---\nslug: /${lang}${contentPath}\ndate_published: 2026-01-01\ndate_modified: 2026-01-02\n---\n# Example article\n`
    );
  }
  fs.writeFileSync(path.join(outDir, 'src/content/tech-center/stage-returns.json'), '{}');
  const alternates = [
    ['zh-CN', baseUrls.cn],
    ['en', baseUrls.io],
    ['x-default', baseUrls.io]
  ]
    .map(([lang, host]) => `<link rel="alternate" hreflang="${lang}" href="${host}${contentPath}">`)
    .join('');
  fs.writeFileSync(
    filePath,
    `<link rel="canonical" href="${canonical}">${alternates}
    <meta name="robots" content="${robots}"><meta name="description" content="Example article">
    <meta property="og:url" content="${canonical}"><h1>Example article</h1>
    <script type="application/ld+json">${JSON.stringify({
      '@graph': [
        {
          '@type': 'TechArticle',
          mainEntityOfPage: { '@id': canonical },
          url: canonical,
          datePublished: '2026-01-01',
          dateModified: '2026-01-02'
        },
        { '@type': 'BreadcrumbList' }
      ]
    })}</script>`
  );
}

test('technical identities are unique and retain their owner-relative paths', () => {
  const identities = getTechIdentities(root);
  assert.equal(identities.length, EXPECTED_TECHNICAL_PAGE_COUNT);
  assert.equal(new Set(identities.map((identity) => identity.key)).size, identities.length);
  const tracer = identities.find((identity) => identity.key === 'zh|/tutorial/private-deployment-topology');
  assert.equal(tracer.sourcePath, '/zh/tutorial/private-deployment-topology');
  assert.equal(tracer.canonicalPath, '/tutorial/private-deployment-topology');
});

test('same-slug technical identities keep only the active production owner route', () => {
  const identities = [
    ...bilingualSamePathIdentities,
    {
      key: 'en|/api/english-only',
      locale: 'en',
      canonicalPath: '/api/english-only',
      sourcePath: '/en/api/english-only'
    }
  ];

  const cn = getTechRoutesToRemove(identities, 'cn');
  assert(cn.has('/zh/api/shared-guide'));
  assert(cn.has('/en/api/shared-guide'));
  assert(!cn.has('/api/shared-guide'));
  assert(cn.has('/api/english-only'));

  const io = getTechRoutesToRemove(identities, 'io');
  assert(io.has('/zh/api/shared-guide'));
  assert(io.has('/en/api/shared-guide'));
  assert(!io.has('/api/shared-guide'));
  assert(!io.has('/api/english-only'));

  const preview = getTechRoutesToRemove(identities, 'preview');
  assert(preview.has('/tech-center'));
  assert(preview.has('/api/shared-guide'));
  assert(preview.has('/api/english-only'));
  assert(!preview.has('/zh/api/shared-guide'));
  assert(!preview.has('/en/api/shared-guide'));
});

test('technical export verifier accepts the same canonical path in every site variant', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-bilingual-export-'));
  const env = {
    NEXT_PUBLIC_CN_HOME_URL: baseUrls.cn,
    NEXT_PUBLIC_IO_HOME_URL: baseUrls.io
  };
  const redirects = buildRedirects(root, env);

  try {
    for (const variant of ['cn', 'io', 'preview']) {
      const outDir = path.join(tempRoot, variant, 'out');
      const nextDir = path.join(tempRoot, variant, '.next');
      fs.mkdirSync(outDir, { recursive: true });
      if (variant === 'cn') {
        writeArticle(
          outDir,
          '/api/shared-guide',
          `${baseUrls.cn}/api/shared-guide`,
          'zh-CN',
          'index, follow'
        );
        fs.writeFileSync(
          path.join(outDir, 'sitemap.xml'),
          `<urlset><url><loc>${baseUrls.cn}/api/shared-guide</loc></url></urlset>`
        );
        writeNginxRedirectMap(nextDir, redirects.cnRedirects);
      } else if (variant === 'io') {
        writeArticle(
          outDir,
          '/api/shared-guide',
          `${baseUrls.io}/api/shared-guide`,
          'en',
          'index, follow'
        );
        fs.writeFileSync(
          path.join(outDir, 'sitemap.xml'),
          `<urlset><url><loc>${baseUrls.io}/api/shared-guide</loc></url></urlset>`
        );
        writeCloudflareWorker(outDir, redirects.ioRedirects, false);
        writeNginxRedirectMap(nextDir, new Map());
      } else {
        writeArticle(
          outDir,
          '/zh/api/shared-guide',
          `${baseUrls.cn}/api/shared-guide`,
          'zh-CN',
          'noindex, nofollow'
        );
        writeArticle(
          outDir,
          '/en/api/shared-guide',
          `${baseUrls.io}/api/shared-guide`,
          'en',
          'noindex, nofollow'
        );
        writeCloudflareWorker(outDir, new Map(), true);
        writeNginxRedirectMap(nextDir, new Map());
      }

      assert.deepEqual(
        verifyTechnicalExport({
          outDir,
          rootDir: outDir,
          nextDir,
          variant,
          env,
          identities: bilingualSamePathIdentities,
          expectedPageCount: 2
        }),
        { count: 2, variant }
      );
      const verify = () =>
        verifyTechnicalExport({
          outDir,
          rootDir: outDir,
          nextDir,
          variant,
          env,
          identities: bilingualSamePathIdentities
        });
      const articlePath = path.join(
        outDir,
        variant === 'preview' ? 'zh/api/shared-guide.html' : 'api/shared-guide.html'
      );
      const html = fs.readFileSync(articlePath, 'utf8');
      for (const mutate of [
        (body) => body.replace('rel="canonical"', 'rel="invalid-canonical"'),
        (body) => body.replace('name="robots"', 'name="invalid-robots"')
      ]) {
        fs.writeFileSync(articlePath, mutate(html));
        assert.throws(verify);
        fs.writeFileSync(articlePath, html);
      }
      fs.unlinkSync(articlePath);
      assert.throws(verify, /Missing Technical Page HTML/);
      fs.writeFileSync(articlePath, html);
      if (variant !== 'preview') {
        const sitemapPath = path.join(outDir, 'sitemap.xml');
        const sitemap = fs.readFileSync(sitemapPath, 'utf8');
        fs.writeFileSync(sitemapPath, '<urlset></urlset>');
        assert.throws(verify, /sitemap/i);
        fs.writeFileSync(sitemapPath, sitemap);
      }
      assert.doesNotThrow(verify);
    }
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('redirect fixtures preserve query strings for Worker and Nginx targets', async () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-redirect-'));
  const outDir = path.join(tempRoot, 'out');
  const nextDir = path.join(tempRoot, '.next');
  const identity = getTechIdentities(root).find((entry) => entry.locale === 'zh');
  const target = `${baseUrls.cn}${identity.canonicalPath}`;
  const redirects = new Map([[identity.sourcePath, target]]);

  try {
    fs.mkdirSync(outDir, { recursive: true });
    writeCloudflareWorker(outDir, redirects, false);
    writeNginxRedirectMap(nextDir, redirects);

    const workerModule = { exports: {} };
    const workerSource = fs.readFileSync(path.join(outDir, '_worker.js'), 'utf8');
    vm.runInNewContext(workerSource.replace('export default', 'module.exports ='), {
      URL,
      Response: {
        redirect(url, status) {
          return { location: String(url), status };
        }
      },
      module: workerModule
    });
    const workerResponse = await workerModule.exports.fetch(
      { url: `https://fastgpt.io${identity.sourcePath}?utm_source=release&x=1` },
      {}
    );
    assert.deepEqual(workerResponse, { location: `${target}?utm_source=release&x=1`, status: 301 });

    const nginxRedirects = parseNginxRedirectMap(
      fs.readFileSync(path.join(nextDir, 'nginx-redirects.conf'), 'utf8')
    );
    assert.equal(nginxRedirects.get(identity.sourcePath), target);
    assert.match(
      fs.readFileSync(path.join(root, 'nginx.conf'), 'utf8'),
      /return 301 \$locale_redirect_target\$is_args\$args;/
    );
    assert.equal(
      new URL(`${nginxRedirects.get(identity.sourcePath)}?utm_source=release&x=1`).href,
      `${target}?utm_source=release&x=1`
    );
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('isolated current metadata and language fixtures govern technical HTML in every variant', () => {
  const { verifyTechnicalPage } = require('./verify-technical-export');
  const { verifyReturn, verifyBodyLinks } = require('./lib/technical-export');
  const identity = { locale: 'zh', canonicalPath: '/api/example', sourcePath: '/zh/api/example' };
  const canonical = baseUrls.cn + identity.canonicalPath;
  const document = {
    metadata: { date_published: '2026-01-01', date_modified: '2026-02-02' },
    body: ''
  };
  const render = (modified, bilingual) => `<link rel="canonical" href="${canonical}">
    <link rel="alternate" hrefLang="zh-CN" href="${canonical}">
    ${
      bilingual
        ? `<link rel="alternate" hrefLang="en" href="${baseUrls.io}/api/example">
      <link rel="alternate" hrefLang="x-default" href="${baseUrls.io}/api/example">`
        : ''
    }
    <meta name="robots" content="ROBOTS"><meta name="description" content="An example article">
    <meta property="og:url" content="${canonical}"><h1>Example</h1>
    <script type="application/ld+json">${JSON.stringify({
      '@graph': [
        {
          '@type': 'TechArticle',
          mainEntityOfPage: { '@id': canonical },
          datePublished: document.metadata.date_published,
          dateModified: modified
        },
        { '@type': 'BreadcrumbList' }
      ]
    })}</script>`;
  for (const variant of ['cn', 'io', 'preview']) {
    const html = (date, bilingual) =>
      render(date, bilingual).replace(
        'ROBOTS',
        variant === 'preview' ? 'noindex, nofollow' : 'index, follow'
      );
    const options = { identity, identities: [identity], document, variant, baseUrls };
    verifyTechnicalPage(html('2026-02-02', false), options);
    assert.throws(() => verifyTechnicalPage(html('2026-01-01', false), options), /dateModified/);
    const bilingual = {
      ...options,
      identities: [identity, { ...identity, locale: 'en', sourcePath: '/en/api/example' }]
    };
    verifyTechnicalPage(html('2026-02-02', true), bilingual);
    assert.throws(
      () => verifyTechnicalPage(html('2026-02-02', false), bilingual),
      /published alternates/
    );
    assert.throws(
      () => verifyTechnicalPage(html('2026-02-02', true), options),
      /published alternates/
    );
    const target = '/zh/guide/example-issues';
    const href = variant === 'preview' ? target : '/guide/example-issues';
    const link = `<a data-stage-return="true" href="${href}">Return</a>`;
    verifyReturn(link, identity.sourcePath, target, variant);
    for (const broken of [
      '',
      link + link,
      link.replace('example-issues', 'wrong-issues'),
      `<script>${link}</script>`
    ])
      assert.throws(() => verifyReturn(broken, identity.sourcePath, target, variant));
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'article-links-'));
    try {
      const guide = variant === 'preview' ? '/zh/guide' : '/guide';
      const faq = variant === 'preview' ? '/zh/faq' : '/faq';
      for (const route of [guide, faq]) {
        const file = path.join(root, route + '.html');
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, '<h1>Hub</h1>');
      }
      const body = '[Guide](/zh/guide)\n[FAQ](/zh/faq)\n`[Example](/zh/missing)`';
      const links = `<a href="${guide}">Guide</a><a href="${faq}">FAQ</a>`;
      verifyBodyLinks(links, body, variant, root);
      assert.throws(
        () => verifyBodyLinks(`<script>${links}</script>`, body, variant, root),
        /visible link/
      );
      fs.unlinkSync(path.join(root, faq + '.html'));
      assert.throws(() => verifyBodyLinks(links, body, variant, root), /Unresolved internal link/);
      fs.mkdirSync(path.join(root, faq));
      assert.throws(() => verifyBodyLinks(links, body, variant, root), /Unresolved internal link/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});
