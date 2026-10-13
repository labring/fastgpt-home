const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');
const os = require('node:os');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
function loader(overrides = {}) {
  const modules = new Map();
  function load(name, parent = root) {
    if (Object.hasOwn(overrides, name)) return overrides[name];
    if (name === 'server-only') return {};
    if (!name.startsWith('.') && !name.startsWith('@/') && !path.isAbsolute(name))
      return require(name);
    const base = name.startsWith('@/')
      ? path.join(root, 'src', name.slice(2))
      : path.resolve(parent, name);
    const file = ['', '.ts', '.tsx', '.json', '/index.ts']
      .map((ext) => base + ext)
      .find((file) => fs.existsSync(file) && fs.statSync(file).isFile());
    assert(file, `Missing module: ${name}`);
    if (modules.has(file)) return modules.get(file).exports;
    if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'));
    const module = { exports: {} };
    modules.set(file, module);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
        jsx: ts.JsxEmit.ReactJSX
      }
    }).outputText;
    vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: file })(
      (name) => load(name, path.dirname(file)),
      module,
      module.exports
    );
    return module.exports;
  }
  return load;
}

test('self-contained articles keep their own navigation and layout', () => {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  let pathname;
  const navCalls = [];
  const load = loader({
    'next/navigation': { usePathname: () => pathname },
    '@/components/home/Navbar': (props) => {
      navCalls.push(props);
      return React.createElement('nav', null, 'Shared navigation');
    }
  });
  const Layout = load('@/components/home/HomeLayoutSwitcher').default;
  const props = {
    links: [{ label: 'Docs', href: '/docs' }],
    navCta: { trial: 'Try', consult: 'Talk' }
  };
  const render = () =>
    renderToStaticMarkup(
      React.createElement(Layout, props, React.createElement('article', null, 'Article content'))
    );
  for (pathname of [
    '/en/industry',
    '/zh/industry',
    '/en/industry/finance-d008-c126-f012',
    '/zh/reference/env-variables-reference',
    '/en/model/example',
    '/zh/glossary/example',
    '/en/faq/example',
    '/zh/tutorial/example',
    '/en/guide/example'
  ]) {
    assert.equal(render(), '<article>Article content</article>', pathname);
  }
  assert.equal(navCalls.length, 0);
  pathname = '/en/enterprise';
  assert.match(render(), /<nav>Shared navigation<\/nav>/);
  assert.deepEqual(navCalls, [{ links: props.links, t: props.navCta }]);
});

test('all technical recommendations retain their complete published order', () => {
  const load = loader();
  const { TECH_ENTRIES } = load('@/components/tech-center/data');
  const { getRelatedTechArticles } = load('@/lib/tech-center-content');
  for (const article of TECH_ENTRIES) {
    const group = TECH_ENTRIES.filter(
      (entry) =>
        entry.slug.split('/')[1] === article.slug.split('/')[1] &&
        entry.category === article.category
    );
    const position = group.indexOf(article);
    const expected = [...group.slice(position + 1), ...group.slice(0, position)].slice(0, 3);
    assert.deepEqual(
      getRelatedTechArticles(article).map((entry) => entry.slug),
      expected.map((entry) => entry.slug),
      article.slug
    );
  }
});

test('technical identities distinguish equal final slugs and preserve missing and one-item cases', () => {
  const entries = [
    { slug: '/en/api/same', category: 'api' },
    { slug: '/zh/api/same', category: 'api' },
    { slug: '/en/guide/same', category: 'api' },
    { slug: '/en/api/last', category: 'api' }
  ];
  const load = loader({ './entries.json': entries });
  const { getRelatedTechArticles } = load('@/lib/tech-center-content');
  assert.deepEqual(
    getRelatedTechArticles(entries[0]).map((e) => e.slug),
    ['/en/guide/same', '/en/api/last']
  );
  assert.deepEqual(
    getRelatedTechArticles(entries[2]).map((e) => e.slug),
    ['/en/api/last', '/en/api/same']
  );
  assert.deepEqual(getRelatedTechArticles(entries[1]), []);
  assert.deepEqual(getRelatedTechArticles({ slug: '/en/api/missing', category: 'api' }), [
    entries[0],
    entries[2],
    entries[3]
  ]);
});

test('all finalized FAQ category recommendations retain order, self-exclusion, and locale fallback', () => {
  const { getFaqData, getRelatedFaqs } = loader()('@/faq');
  for (const locale of ['en', 'zh', 'ja', 'zh-hant']) {
    const data = getFaqData(locale);
    for (const [routeKey, item] of Object.entries(data)) {
      const expected = Object.entries(data)
        .filter(([key, candidate]) => key !== routeKey && candidate.Category === item.Category)
        .slice(0, 4);
      assert.deepEqual(getRelatedFaqs(routeKey, locale), expected, `${locale}/${routeKey}`);
    }
    assert.deepEqual(getRelatedFaqs('missing', locale), []);
  }
});

test('article reads are shared within a real React server render and refreshed between renders', () => {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  const result = spawnSync(
    process.execPath,
    ['--conditions=react-server', '--test', '--test-name-pattern=^React server', __filename],
    { encoding: 'utf8', env }
  );
  assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
});

test(
  'React server rendering reads each article once and observes the next edit',
  { skip: !process.execArgv.includes('--conditions=react-server') },
  async () => {
    const React = require('react');
    const {
      renderToReadableStream
    } = require('next/dist/compiled/react-server-dom-webpack/server.node');
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'article-cache-'));
    const cwd = process.cwd();
    const article = { slug: '/en/api/cache-example', category: 'api' };
    const file = path.join(directory, 'src/content/tech-center/en/api/cache-example.md');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    let reads = 0;
    try {
      process.chdir(directory);
      const load = loader({
        './entries.json': [article],
        'node:fs': {
          ...fs,
          readFileSync: (...args) => {
            if (String(args[0]).endsWith('/api/cache-example.md')) reads++;
            return fs.readFileSync(...args);
          }
        }
      });
      const { getTechArticle, getTechEntry } = load('@/lib/tech-center-content');
      assert.equal(getTechEntry('api', 'cache-example', 'en').slug, article.slug);
      assert.equal(reads, 0);
      function Page() {
        const metadata = getTechArticle('api', 'cache-example', 'en');
        const body = getTechArticle('api', 'cache-example', 'en');
        assert.equal(metadata, body);
        return React.createElement('main', null, body.markdown);
      }
      for (const [index, body] of ['Original body.', 'Edited body.'].entries()) {
        fs.writeFileSync(file, `---\nslug: ${article.slug}\n---\n${body}`);
        const stream = await renderToReadableStream(React.createElement(Page), {});
        let rendered = '';
        for await (const chunk of stream) rendered += Buffer.from(chunk).toString();
        assert(rendered.includes(body), rendered);
        assert.equal(reads, index + 1);
      }
    } finally {
      process.chdir(cwd);
      fs.rmSync(directory, { recursive: true, force: true });
    }
  }
);

test('root article routes resolve ownership through the registry without extra body reads', async () => {
  const article = { slug: '/en/api/example', category: 'api' };
  const load = loader({
    './entries.json': [article],
    'node:fs': {
      ...fs,
      readFileSync: () => {
        throw new Error('Unexpected article read');
      }
    },
    '@/app/[lang]/[section]/[slug]/page': {
      __esModule: true,
      default: ({ params }) => params,
      generateMetadata: ({ params }) => params
    }
  });
  const { createRootTechArticleRoute } = load('@/app/tech-article-route');
  const result = await createRootTechArticleRoute('api').Page({
    params: Promise.resolve({ slug: 'example' })
  });
  assert.equal(result.lang, 'en');
  assert.equal(result.section, 'api');
});

test('CN publication applies the existing document and cloud URL policy to all dictionary strings', () => {
  const previous = process.env.NEXT_PUBLIC_SITE_VARIANT;
  try {
    for (const variant of ['cn', 'io', 'preview']) {
      process.env.NEXT_PUBLIC_SITE_VARIANT = variant;
      const { getPublicationUrls } = loader()('@/lib/siteRouting');
      for (const locale of ['en', 'zh', 'zh-hant', 'ja', 'ar', 'vi', 'th', 'id', 'ms']) {
        const original = fs.readFileSync(path.join(root, 'src/locales', `${locale}.json`), 'utf8');
        const expected =
          variant === 'cn'
            ? original
                .replaceAll('https://doc.fastgpt.io', 'https://doc.fastgpt.cn')
                .replaceAll('https://cloud.fastgpt.io', 'https://cloud.fastgpt.cn')
            : original;
        assert.equal(getPublicationUrls(original), expected, `${variant}/${locale}`);
      }
    }
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_VARIANT;
    else process.env.NEXT_PUBLIC_SITE_VARIANT = previous;
  }
});

test('Industry uses the production loader for identities, dates, and owner projections', () => {
  const article = (locale, slug, date = '2026-09-26') => `---
title: Example
slug: /${locale}/industry/${slug}
page_type: Scenario
application_area: research
meta_title: Example title
meta_description: Example description
keywords: useful, keywords
date_published: 2026-09-15
date_modified: ${date}
---

# Example

Reader content.
`;
  const files = {
    zh: { 'shared.md': article('zh', 'shared'), 'only.md': article('zh', 'only') },
    en: { 'shared.md': article('en', 'shared') }
  };
  const read = () =>
    loader({
      'node:fs': {
        ...fs,
        existsSync: () => true,
        readdirSync: (directory) =>
          Object.keys(files[path.basename(directory)]).map((name) => ({
            name,
            isFile: () => true
          })),
        readFileSync: (file) => files[path.basename(path.dirname(file))][path.basename(file)]
      }
    });
  const load = read();
  const content = load('@/lib/industryContent');
  assert.equal(content.industryArticles.length, 3);
  assert.equal(content.getIndustryArticle('en', 'shared').dateModified, '2026-09-26');
  assert.deepEqual(content.getIndustryArticle('en', 'shared').keywords, ['useful', 'keywords']);
  assert.deepEqual(content.getIndustryArticle('zh', 'only').publishedLocales, ['zh']);
  assert.deepEqual(content.getIndustryArticle('en', 'shared').publishedLocales, ['zh', 'en']);
  assert.equal(content.getIndustryOwnerParams('preview').length, 1);
  assert.equal(content.getIndustryReviewParams('preview').length, 3);
  assert.deepEqual(content.getIndustryOwnerParams('cn'), [{ slug: 'only' }, { slug: 'shared' }]);
  assert.deepEqual(content.getIndustryOwnerParams('io'), [{ slug: 'shared' }]);
  assert.equal(content.getIndustrySitemapEntries('cn').length, 2);
  assert.equal(content.getIndustrySitemapEntries('io').length, 1);
  const seo = load('@/lib/industrySeo');
  assert.equal(
    seo.getIndustryCanonicalUrl(content.getIndustryArticle('zh', 'shared')),
    'https://fastgpt.cn/industry/shared'
  );
  assert.equal(
    seo.getIndustryCanonicalUrl(content.getIndustryArticle('en', 'shared')),
    'https://fastgpt.io/industry/shared'
  );
  files.en['duplicate.md'] = article('en', 'shared');
  assert.throws(() => read()('@/lib/industryContent'), /duplicate slug/);
  delete files.en['duplicate.md'];
  files.en['shared.md'] = article('en', '../escape');
  assert.throws(() => read()('@/lib/industryContent'), /invalid slug/);
  files.en['shared.md'] = article('en', 'shared', '2026-02-30');
  assert.throws(() => read()('@/lib/industryContent'), /invalid date_modified/);
});

function industryFixture(files, overrides = {}) {
  return loader({
    'node:fs': {
      ...fs,
      existsSync: () => true,
      readdirSync: (directory) =>
        Object.keys(files[path.basename(directory)] || {}).map((name) => ({
          name,
          isFile: () => true
        })),
      readFileSync: (file) => files[path.basename(path.dirname(file))][path.basename(file)]
    },
    ...overrides
  });
}

function industrySource(slug, area, title = 'Example') {
  return `---
title: ${title}
slug: /industry/${slug}
page_type: Scenario
${area === undefined ? '' : `application_area: ${area}\n`}meta_title: ${title}
meta_description: Practical workflow guidance.
date_published: 2026-09-15
date_modified: 2026-09-26
---

# ${title}

Reader content.
`;
}

test('Industry classifies historical batches and explicitly authored research by workflow', () => {
  const files = {
    en: {
      'finance-pharma.md': industrySource(
        'finance-pharma',
        undefined,
        'Pharmaceutical equity research'
      ),
      'fin-report.md': industrySource('fin-report'),
      'biomed-rd.md': industrySource('biomed-rd'),
      'university.md': industrySource('university', 'research')
    }
  };
  const content = industryFixture(files)('@/lib/industryContent');
  assert.deepEqual(
    content.industryArticles.map(({ slug, area }) => [slug, area]),
    [
      ['biomed-rd', 'biomed'],
      ['fin-report', 'finance'],
      ['finance-pharma', 'finance'],
      ['university', 'research']
    ]
  );
  for (const [slug, area, error] of [
    ['new-workflow', undefined, /missing application_area/],
    ['new-workflow', 'unknown', /unknown application_area/],
    ['finance-pharma', 'biomed', /conflicting application_area/],
    ['fin-report', 'research', /conflicting application_area/],
    ['biomed-rd', 'finance', /conflicting application_area/]
  ]) {
    assert.throws(
      () =>
        industryFixture({ en: { 'invalid.md': industrySource(slug, area) } })(
          '@/lib/industryContent'
        ),
      (failure) => /invalid\.md/.test(failure.message) && error.test(failure.message)
    );
  }
  assert.throws(
    () =>
      industryFixture({
        en: {
          'duplicate-area.md': industrySource('university', 'finance\napplication_area: research')
        }
      })('@/lib/industryContent'),
    /duplicate application_area/
  );
});

test('Industry summaries expose the complete locale collection with stable pages and normalized URLs', () => {
  const financeSlugs = Array.from(
    { length: 25 },
    (_, index) => `finance-${String(index + 1).padStart(2, '0')}`
  );
  const files = {
    zh: Object.fromEntries(financeSlugs.map((slug) => [`${slug}.md`, industrySource(slug)])),
    en: {
      'finance-01.md': industrySource('finance-01'),
      'biomed-rd.md': industrySource('biomed-rd')
    }
  };
  files.zh['biomed-rd.md'] = industrySource('biomed-rd');
  files.zh['university.md'] = industrySource('university', 'research');
  const load = industryFixture(files);
  const content = load('@/lib/industryContent');
  const {
    getIndustryListing,
    getIndustryAreaCounts,
    getIndustryBrowseHref,
    isIndustrySummaryIndex
  } = load('@/lib/industryListing');
  const zh = content.getIndustrySummaries('zh');
  const en = content.getIndustrySummaries('en');
  assert.deepEqual(getIndustryAreaCounts(zh), { all: 27, finance: 25, biomed: 1, research: 1 });
  assert.deepEqual(getIndustryAreaCounts(en), { all: 2, finance: 1, biomed: 1, research: 0 });
  assert.deepEqual(Object.keys(zh[0]).sort(), ['area', 'description', 'href', 'slug', 'title']);
  assert.equal(zh[0].href, '/industry/biomed-rd');
  assert.equal(zh[0].description, 'Practical workflow guidance.');
  const list = (query, entries = zh) => getIndustryListing(entries, new URLSearchParams(query));
  assert.deepEqual(
    list('').entries.map(({ slug }) => slug),
    ['biomed-rd', ...financeSlugs.slice(0, 11)]
  );
  const traversal = [1, 2, 3].map((page) => list(`industry=finance&page=${page}`));
  assert.deepEqual(
    traversal.map(({ entries }) => entries.length),
    [12, 12, 1]
  );
  assert.deepEqual(
    traversal.flatMap(({ entries }) => entries.map(({ slug }) => slug)),
    financeSlugs
  );
  assert.equal(traversal[2].total, 25);
  assert.equal(traversal[2].pages, 3);
  for (const page of ['', 'bad', '0', '-1', '1.5', 'NaN', 'Infinity', '1e2', '+2', ' 2']) {
    assert.equal(list(`industry=finance&page=${encodeURIComponent(page)}`).page, 1, page);
  }
  for (const page of ['4', '999999999999999999999999999999999999']) {
    assert.equal(list(`industry=finance&page=${page}`).page, 3);
  }
  assert.equal(list('industry=unknown&page=2').industry, 'all');
  assert.equal(list('industry=research', en).industry, 'all');
  assert.equal(list('industry=research', zh).industry, 'research');
  assert.deepEqual(list('industry=research&page=9', []), {
    industry: 'all',
    page: 1,
    total: 0,
    pages: 1,
    entries: []
  });
  const url = new URL(
    'https://fastgpt.cn/industry?utm_source=test&industry=research&page=9#results'
  );
  assert.equal(
    getIndustryBrowseHref(url, list('industry=finance&page=2')),
    '/industry?utm_source=test&industry=finance&page=2#results'
  );
  assert.equal(
    getIndustryBrowseHref(url, { industry: 'all', page: 1 }),
    '/industry?utm_source=test#results'
  );
  const counts = getIndustryAreaCounts(zh);
  assert(isIndustrySummaryIndex(zh, counts, '/industry/'));
  for (const invalid of [
    null,
    {},
    zh.slice(1),
    [...zh.slice(1), zh[1]],
    [{ ...zh[0], href: 'javascript:alert(1)' }, ...zh.slice(1)],
    [{ ...zh[0], area: 'unknown' }, ...zh.slice(1)]
  ]) {
    assert.equal(isIndustrySummaryIndex(invalid, counts, '/industry/'), false);
  }
});

test('Industry hub renders twelve useful links and accessible browsing controls before data loads', () => {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const load = loader({
    '@/components/guide/GuideHubPage.module.css': {},
    '@/components/industry/IndustryBrowser.module.css': {}
  });
  const Page = load('@/components/industry/IndustryHubPage').default;
  const entries = Array.from({ length: 12 }, (_, index) => ({
    slug: `finance-${index + 1}`,
    area: 'finance',
    title: `Workflow ${index + 1}`,
    description: 'Practical workflow guidance.',
    href: `/industry/finance-${index + 1}`
  }));
  for (const locale of ['en', 'zh']) {
    const html = renderToStaticMarkup(
      React.createElement(Page, {
        locale,
        initialEntries: entries,
        counts: { all: 27, finance: 25, biomed: 2, research: 0 }
      })
    );
    assert.equal((html.match(/href="\/industry\/finance-/g) || []).length, 12);
    assert.match(html, /aria-pressed="true"/);
    assert.match(html, /role="status"/);
    assert.match(html, /aria-live="polite"/);
    assert.match(html, /27/);
    assert.match(html, locale === 'en' ? /Application area/ : /应用领域/);
    assert.doesNotMatch(html, /<button[^>]*>(?:Scientific Research|科研)<\/button>/);
  }
});

test('Industry summary routes and hub schema use the same publication collection', async () => {
  const { renderToStaticMarkup } = require('react-dom/server');
  const files = { zh: {}, en: {} };
  for (let index = 1; index <= 13; index++) {
    const slug = `finance-${String(index).padStart(2, '0')}`;
    for (const locale of ['zh', 'en']) files[locale][`${slug}.md`] = industrySource(slug);
  }
  const previous = process.env.NEXT_PUBLIC_SITE_VARIANT;
  try {
    for (const variant of ['cn', 'io', 'preview']) {
      process.env.NEXT_PUBLIC_SITE_VARIANT = variant;
      const load = industryFixture(files, {
        '@/components/guide/GuideHubPage.module.css': {},
        '@/components/industry/IndustryBrowser.module.css': {},
        '@/components/home/Navbar': () => null,
        '@/components/home/Footer': () => null,
        '@/components/home/HomeThemeFix': () => null,
        '@/lib/i18n': { getDictionary: async () => ({ JsonLd: { siteName: 'FastGPT' }, Home: {} }) }
      });
      const route = load('@/app/industry-index/[locale]/index.json/route');
      assert.deepEqual(
        route.generateStaticParams(),
        variant === 'preview'
          ? [{ locale: 'zh' }, { locale: 'en' }]
          : [{ locale: variant === 'cn' ? 'zh' : 'en' }]
      );
      const locales = variant === 'preview' ? ['zh', 'en'] : [variant === 'cn' ? 'zh' : 'en'];
      for (const locale of locales) {
        const response = await route.GET(new Request('https://example.com'), {
          params: Promise.resolve({ locale })
        });
        const summaries = await response.json();
        assert.deepEqual(summaries, load('@/lib/industryContent').getIndustrySummaries(locale));
        const prefix = variant === 'preview' ? `/${locale}/industry/` : '/industry/';
        assert.equal(summaries[0].href, `${prefix}finance-01`);
        const html = renderToStaticMarkup(
          await load('@/components/industry/IndustryHubRoute').IndustryHubRoute({ locale })
        );
        const cards = [...html.matchAll(/<a[^>]*href="([^"]*\/industry\/finance-[^"]+)"/g)].map(
          (match) => match[1]
        );
        const schemas = [
          ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)
        ].flatMap((match) => {
          const schema = JSON.parse(match[1]);
          return schema['@graph'] || [schema];
        });
        const items = schemas.find((schema) => schema['@type'] === 'ItemList').itemListElement;
        assert.deepEqual(
          cards,
          summaries.slice(0, 12).map(({ href }) => href)
        );
        const canonical = `https://fastgpt.${locale === 'zh' ? 'cn' : 'io'}/industry`;
        assert.deepEqual(
          items.map(({ url }) => url),
          summaries.slice(0, 12).map(({ slug }) => `${canonical}/${slug}`)
        );
        const metadata = load('@/lib/industrySeo').getIndustryHubMetadata(locale);
        assert.equal(metadata.alternates.canonical, canonical);
        assert.equal(items.length, 12);
      }
      assert.equal(
        (
          await route.GET(new Request('https://example.com'), {
            params: Promise.resolve({ locale: 'ja' })
          })
        ).status,
        404
      );
    }
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_VARIANT;
    else process.env.NEXT_PUBLIC_SITE_VARIANT = previous;
  }
});

test(
  'Industry export preserves publication URLs, summary assets, and first-page schema',
  {
    skip: !process.env.INDUSTRY_EXPORT_DIR
  },
  () => {
    const zlib = require('node:zlib');
    const { getCanonical, getHreflang, readSitemap } = require('./verify-technical-export');
    const out = path.resolve(process.env.INDUSTRY_EXPORT_DIR);
    const load = loader();
    const { currentSiteVariant, getDefaultLocaleForSiteVariant } = load('@/lib/siteRouting');
    assert(['cn', 'io'].includes(currentSiteVariant), 'Set NEXT_PUBLIC_SITE_VARIANT=cn or io');
    const locale = getDefaultLocaleForSiteVariant(currentSiteVariant);
    const content = load('@/lib/industryContent');
    const expected = content.getIndustrySummaries(locale);
    const json = fs.readFileSync(path.join(out, 'industry-index', locale, 'index.json'));
    const summaries = JSON.parse(json);
    assert.deepEqual(summaries, expected);
    const canonical = `https://fastgpt.${currentSiteVariant === 'cn' ? 'cn' : 'io'}/industry`;
    const html = fs.readFileSync(path.join(out, 'industry.html'), 'utf8');
    assert.equal(getCanonical(html, '/industry'), canonical);
    assert.equal(getHreflang(html, '/industry', 'zh-CN'), 'https://fastgpt.cn/industry');
    assert.equal(getHreflang(html, '/industry', 'en'), 'https://fastgpt.io/industry');
    const cards = [...html.matchAll(/<a[^>]*href="(\/industry\/[^"?#]+)"/g)].map(
      (match) => match[1]
    );
    assert.deepEqual(
      cards,
      expected.slice(0, 12).map(({ href }) => href)
    );
    const schemas = [
      ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)
    ].flatMap((match) => {
      const schema = JSON.parse(match[1]);
      return schema['@graph'] || [schema];
    });
    const items = schemas.find((schema) => schema['@type'] === 'ItemList').itemListElement;
    assert.deepEqual(
      items.map(({ url }) => url),
      expected.slice(0, 12).map(({ slug }) => `${canonical}/${slug}`)
    );
    const sitemap = readSitemap(out).filter((url) =>
      new URL(url).pathname.startsWith('/industry/')
    );
    assert.deepEqual(sitemap.sort(), expected.map(({ slug }) => `${canonical}/${slug}`).sort());
    for (const entry of summaries) {
      assert(
        fs.existsSync(path.join(out, `${entry.href}.html`)),
        `Missing article export: ${entry.href}`
      );
    }
    for (const area of ['finance', 'biomed', 'research']) {
      const group = summaries.filter((entry) => entry.area === area);
      for (const entry of [group[0], group.at(-1)].filter(Boolean)) {
        const articleHtml = fs.readFileSync(path.join(out, `${entry.href}.html`), 'utf8');
        assert.equal(getCanonical(articleHtml, entry.href), `${canonical}/${entry.slug}`);
      }
    }
    const scripts = [...html.matchAll(/<script[^>]*src="([^\"]+\.js)"/g)].map((match) => match[1]);
    const scriptBodies = scripts
      .filter((src) => src.startsWith('/_next/'))
      .map((src) => fs.readFileSync(path.join(out, src), 'utf8'));
    assert(!html.includes(expected[12].slug), 'Only the first page belongs in the HTML payload');
    assert(
      scriptBodies.every((body) => !body.includes(expected[12].slug)),
      'Summary collection leaked into JavaScript'
    );
    console.log(
      JSON.stringify({
        variant: currentSiteVariant,
        summaries: summaries.length,
        jsonBytes: json.length,
        gzipBytes: zlib.gzipSync(json).length,
        brotliBytes: zlib.brotliCompressSync(json).length,
        htmlBytes: Buffer.byteLength(html)
      })
    );
  }
);
