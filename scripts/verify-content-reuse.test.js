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
        const expected = variant === 'cn'
          ? original.replaceAll('https://doc.fastgpt.io', 'https://doc.fastgpt.cn').replaceAll('https://cloud.fastgpt.io', 'https://cloud.fastgpt.cn')
          : original;
        assert.equal(getPublicationUrls(original), expected, `${variant}/${locale}`);
      }
    }
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_VARIANT;
    else process.env.NEXT_PUBLIC_SITE_VARIANT = previous;
  }
});
