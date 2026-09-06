const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const budget = require('./fixtures/technical-center-budget.json');
const {
  verifyTechnicalCenter,
  verifyTechnicalCenterPagination
} = require('./verify-technical-center');

const root = path.resolve(__dirname, '..');

function writeArtifact(
  articleCount,
  script = 'console.log("technical center");',
  registrySize = 100000
) {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-center-budget-'));
  const chunkPath = path.join(outDir, '_next/static/chunks/app.js');
  fs.mkdirSync(path.dirname(chunkPath), { recursive: true });
  fs.writeFileSync(chunkPath, script);
  const registryPath = path.join(outDir, 'entries.json');
  const registry = Array.from({ length: registrySize }, (_, index) => ({
    slug: `/zh/technical-entry-${index}`
  }));
  fs.writeFileSync(registryPath, JSON.stringify(registry));
  const searchIndexPath = path.join(outDir, 'tech-center/search-index.json');
  fs.mkdirSync(path.dirname(searchIndexPath), { recursive: true });
  fs.writeFileSync(searchIndexPath, JSON.stringify(Array(registrySize).fill(null)));
  for (let index = 0; index < articleCount; index += 1) {
    const targetPath = path.join(outDir, 'zh', `technical-entry-${index}`, 'index.html');
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, '<main>Technical entry</main>');
  }
  fs.writeFileSync(
    path.join(outDir, 'tech-center.html'),
    `<main data-registry-count="${registrySize}">${Array.from(
      { length: articleCount },
      (_, index) => `<article><a href="/zh/technical-entry-${index}">Entry ${index}</a></article>`
    ).join('')}</main><script src="/_next/static/chunks/app.js"></script>`
  );
  return { outDir, registryPath, searchIndexPath };
}

test('large registries keep the server listing and initial JavaScript bounded', () => {
  const { outDir, registryPath } = writeArtifact(budget.maxInitialEntries);
  try {
    const result = verifyTechnicalCenter({ outDir, registryPath });
    assert.equal(result.initialEntries, budget.maxInitialEntries);
    assert.equal(result.serverListingLinks.length, budget.maxInitialEntries);
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
});

test('technical-center verifier rejects an initial JavaScript budget overrun', () => {
  const oversizedScript = 'x'.repeat(1024);
  const { outDir, registryPath } = writeArtifact(budget.maxInitialEntries, oversizedScript);
  try {
    assert.throws(
      () =>
        verifyTechnicalCenter({
          outDir,
          registryPath,
          baselineGzipBytes: 0,
          maxIncreaseBytes: 0
        }),
      /initial JavaScript is .* maximum is/
    );
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
});

test('technical-center verifier rejects an unbounded server listing', () => {
  const { outDir, registryPath } = writeArtifact(budget.maxInitialEntries + 1);
  try {
    assert.throws(
      () => verifyTechnicalCenter({ outDir, registryPath }),
      /initial listing has 13 entries; maximum is 12/
    );
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
});

test('technical-center verifier rejects a missing or stale search projection', () => {
  const registrySize = budget.maxInitialEntries + 1;
  const { outDir, registryPath, searchIndexPath } = writeArtifact(
    budget.maxInitialEntries,
    undefined,
    registrySize
  );
  try {
    fs.rmSync(searchIndexPath);
    assert.throws(
      () => verifyTechnicalCenter({ outDir, registryPath }),
      /Missing Technical Center search projection/
    );

    fs.writeFileSync(searchIndexPath, '[]');
    assert.throws(
      () => verifyTechnicalCenter({ outDir, registryPath }),
      new RegExp(`search projection has 0 entries; expected ${registrySize}`)
    );
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
});

test('technical-center verifier rejects a registry entry embedded in initial JavaScript', () => {
  const embeddedSlug = `/zh/technical-entry-${budget.maxInitialEntries}`;
  const { outDir, registryPath } = writeArtifact(budget.maxInitialEntries, embeddedSlug);
  try {
    assert.throws(
      () => verifyTechnicalCenter({ outDir, registryPath }),
      /is embedded in initial JavaScript/
    );
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
});

test('the route passes only a bounded projection and the client owns no registry import', () => {
  const routeSource = fs.readFileSync(
    path.join(root, 'src/app/[lang]/tech-center/page.tsx'),
    'utf8'
  );
  const clientSource = fs.readFileSync(
    path.join(root, 'src/components/tech-center/TechCenterPage.tsx'),
    'utf8'
  );
  const rootArticleSource = fs.readFileSync(
    path.join(root, 'src/app/tech-article-route.tsx'),
    'utf8'
  );
  const contentSource = fs.readFileSync(path.join(root, 'src/lib/tech-center-content.ts'), 'utf8');
  const articleSource = fs.readFileSync(
    path.join(root, 'src/components/tech-center/TechArticlePage.tsx'),
    'utf8'
  );

  assert.match(
    routeSource,
    /localeEntries\s*\.slice\(\(page - 1\) \* PAGE_SIZE, page \* PAGE_SIZE\)\s*\.map\(toTechSearchEntry\)/
  );
  assert.doesNotMatch(routeSource, /TECH_ENTRIES|CATEGORY_META/);
  assert.doesNotMatch(clientSource, /entries\.json|TECH_ENTRIES/);
  assert.match(clientSource, /TECH_CENTER_COPY/);
  assert.match(clientSource, /toLocaleLowerCase\(copy\.localeName\)/);
  assert.match(clientSource, /getTechnicalReviewPath/);
  assert.match(articleSource, /ARTICLE_COPY/);
  assert.match(articleSource, /getTechnicalReviewPath/);
  assert.match(rootArticleSource, /getDefaultLocaleForSiteVariant\(currentSiteVariant\)/);
  assert.match(rootArticleSource, /getTechArticle\(section, slug, preferredLocale\)/);
  assert.equal(
    (contentSource.match(/ownerParams\.length \? ownerParams : params\.slice\(0, 1\)/g) || [])
      .length,
    2
  );
  assert.match(clientSource, /value\.length !== expectedLength/);
  assert.match(clientSource, /new Set\(value\.map/);
});

test('every published Technical section has an owner-route entry point', () => {
  const entries = JSON.parse(
    fs.readFileSync(path.join(root, 'src/components/tech-center/entries.json'), 'utf8')
  );
  const sections = new Set(entries.map((entry) => entry.slug.split('/')[2]));

  for (const section of sections) {
    assert.equal(
      fs.existsSync(path.join(root, 'src/app', section, '[slug]/page.tsx')),
      true,
      `Missing owner route for Technical section: ${section}`
    );
  }
});

test('pagination export covers each locale and rejects missing pages, repeated entries and SEO drift', () => {
  for (const variant of ['cn', 'io', 'preview']) {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-pagination-'));
    const registry = ['zh', 'en'].flatMap((locale) =>
      Array.from({ length: locale === 'zh' ? 25 : 13 }, (_, index) => ({
        slug: `/${locale}/api/entry-${index}`
      }))
    );
    const registryPath = path.join(outDir, 'entries.json');
    fs.writeFileSync(registryPath, JSON.stringify(registry));
    fs.mkdirSync(path.join(outDir, '_next/static'), { recursive: true });
    fs.writeFileSync(path.join(outDir, '_next/static/app.js'), 'console.log("pagination");');
    const locales = variant === 'preview' ? ['zh', 'en'] : [variant === 'cn' ? 'zh' : 'en'];
    const sitemap = [];
    const baseUrl = (locale) => `https://fastgpt.${locale === 'zh' ? 'cn' : 'io'}`;
    const htmlFiles = [];
    try {
      for (const locale of locales) {
        const entries = registry.filter((entry) => entry.slug.startsWith(`/${locale}/`));
        const pageCount = Math.ceil(entries.length / 12);
        const hub = variant === 'preview' ? `/${locale}/tech-center` : '/tech-center';
        for (let page = 1; page <= pageCount; page += 1) {
          const suffix = page === 1 ? '' : `/page/${page}`;
          const canonical = `${baseUrl(locale)}/tech-center${suffix}`;
          const file = path.join(outDir, `${hub}${suffix}.html`);
          fs.mkdirSync(path.dirname(file), { recursive: true });
          const alternates = (page === 1 ? ['zh', 'en'] : [locale])
            .map(
              (lang) =>
                `<link rel="alternate" hreflang="${lang === 'zh' ? 'zh-CN' : 'en'}" href="${baseUrl(
                  lang
                )}/tech-center${suffix}"/>`
            )
            .join('');
          const cards = entries
            .slice((page - 1) * 12, page * 12)
            .map((entry) => {
              const route =
                variant === 'preview' ? entry.slug : entry.slug.replace(/^\/(zh|en)/, '');
              const articlePath = path.join(outDir, `${route}.html`);
              fs.mkdirSync(path.dirname(articlePath), { recursive: true });
              fs.writeFileSync(articlePath, '<main>Article</main>');
              return `<article><a href="${route}">Article</a></article>`;
            })
            .join('');
          const links = Array.from(
            { length: pageCount },
            (_, index) => `<a href="${hub}${index ? `/page/${index + 1}` : ''}">${index + 1}</a>`
          ).join('');
          const html = `<title>${
            locale === 'zh' ? `第 ${page} 页` : `Page ${page}`
          }</title><link rel="canonical" href="${canonical}"/><meta name="robots" content="${
            variant === 'preview' ? 'noindex, nofollow' : 'index, follow'
          }"/>${alternates}<main>${cards}<nav>${links}</nav></main><script type="application/ld+json">${JSON.stringify(
            {
              '@graph': [
                { '@type': 'CollectionPage', url: canonical },
                { '@type': 'BreadcrumbList', itemListElement: [{ item: canonical }] }
              ]
            }
          )}</script><script src="/_next/static/app.js"></script>`;
          fs.writeFileSync(file, html);
          htmlFiles.push(file);
          sitemap.push(canonical);
        }
      }
      if (variant !== 'preview')
        fs.writeFileSync(
          path.join(outDir, 'sitemap.xml'),
          `<urlset>${sitemap.map((url) => `<url><loc>${url}</loc></url>`).join('')}</urlset>`
        );
      const verify = () => verifyTechnicalCenterPagination({ outDir, variant, registryPath });
      assert.equal(verify().pages, variant === 'preview' ? 5 : variant === 'cn' ? 3 : 2);
      const file = htmlFiles[1];
      const html = fs.readFileSync(file, 'utf8');
      const hub = variant === 'preview' ? '/zh/tech-center' : '/tech-center';
      const cases = [
        [
          html.replace(
            /rel="canonical" href="[^"]+"/,
            'rel="canonical" href="https://fastgpt.cn/tech-center"'
          ),
          /canonical mismatch/
        ],
        [html.replace(/hreflang="(?:zh-CN|en)"/, 'hreflang="fr"'), /Missing .* hreflang/],
        [html.replace(/\/api\/entry-12/g, '/api/entry-0'), /incorrect server listing/],
        [html.replace(`<a href="${hub}">1</a>`, '<button>1</button>'), /no crawlable link/]
      ];
      for (const [invalid, message] of cases) {
        fs.writeFileSync(file, invalid);
        assert.throws(verify, message);
      }
      fs.rmSync(file);
      assert.throws(verify, /Missing static Technical Center HTML/);
      fs.writeFileSync(file, html);
      const invalidPath = path.join(outDir, `${hub}/page/1.html`);
      fs.writeFileSync(invalidPath, html);
      assert.throws(verify, /must return 404/);
    } finally {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  }
});
