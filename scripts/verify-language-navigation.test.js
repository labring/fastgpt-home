const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const compiled = new Map();

function runtime(variant = 'io') {
  const storage = () => {
    const values = new Map();
    return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  };
  const localStorage = storage();
  const sessionStorage = storage();
  const document = { cookie: '' };
  const window = {
    location: { href: 'https://fastgpt.io/guide/example?utm_source=test#section' },
    history: {
      state: { next: 'preserved' },
      replaceState(state, _title, href) {
        this.state = state;
        window.location.href = new URL(href, window.location.href).href;
      }
    }
  };
  const cache = new Map();
  function load(file) {
    const base = path.resolve(root, file);
    const filename = [base, `${base}.ts`, `${base}.tsx`, `${base}.json`, path.join(base, 'index.ts')]
      .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    assert(filename, `Missing test dependency: ${file}`);
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    if (filename.endsWith('.json')) {
      module.exports = JSON.parse(fs.readFileSync(filename, 'utf8'));
      return module.exports;
    }
    if (!compiled.has(filename)) {
      compiled.set(filename, ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }
      }).outputText);
    }
    vm.runInNewContext(compiled.get(filename), {
      module, exports: module.exports,
      require: (name) => {
        if (name === 'server-only') return {};
        if (name.startsWith('@/')) return load(`src/${name.slice(2)}`);
        if (name.startsWith('.')) return load(path.resolve(path.dirname(filename), name));
        return require(name);
      },
      process: { env: { NEXT_PUBLIC_SITE_VARIANT: variant } },
      localStorage, sessionStorage, document, window, URL, URLSearchParams, console
    }, { filename });
    return module.exports;
  }
  return { load, localStorage, sessionStorage, document, window };
}

const navigation = (r) => r.load('src/lib/languageNavigation.ts');
const target = (locale, href) => ({ locale, href });

test('navigation hrefs retain locale paths, fragments, and external destinations', () => {
  for (const variant of ['cn', 'io', 'preview']) {
    const { getNavHref } = runtime(variant).load('src/lib/clientNavigation.ts');
    const chineseRoot = variant === 'cn' ? '' : '/zh';
    const englishRoot = variant === 'cn' ? '/en' : '';
    assert.equal(getNavHref('/price', 'zh'), `${chineseRoot}/price`);
    assert.equal(getNavHref('/zh/price', 'zh'), `${chineseRoot}/price`);
    assert.equal(getNavHref('/price', 'en'), `${englishRoot}/price`);
    assert.equal(getNavHref('#faq', 'zh'), `${chineseRoot || '/'}#faq`);
    assert.equal(getNavHref('/en/guide', 'zh'), '/en/guide');
    assert.equal(getNavHref(' https://doc.fastgpt.io/ ', 'zh'), 'https://doc.fastgpt.io/');
    assert.equal(getNavHref('//example.com/docs', 'zh'), '//example.com/docs');
    assert.equal(getNavHref('mailto:contact@example.com', 'zh'), 'mailto:contact@example.com');
    assert.equal(getNavHref('', 'zh'), '/');
  }
});

test('browser matching, explicit preferences, missing translations, and session dismissal', () => {
  const r = runtime();
  const n = navigation(r);
  const targets = n.getLanguageTargets({ pathname: '/' });
  for (const [input, expected] of [
    ['en-GB', 'en'], ['zh-CN', 'zh'], ['zh-SG', 'zh'], ['zh-TW', 'zh-hant'],
    ['zh_HK', 'zh-hant'], ['zh-Hant-MO', 'zh-hant'], ['fr-FR', undefined], ['', undefined]
  ]) assert.equal(n.matchLanguage(input), expected, input);
  assert.equal(n.getRecommendedLanguage('en', targets, ['fr-FR', 'ja-JP', 'en-US']), 'ja');
  assert.equal(n.getRecommendedLanguage('en', targets, ['en-US', 'ja-JP']), undefined);
  assert.equal(n.getRecommendedLanguage('en', targets, ['fr-FR']), undefined);
  r.document.cookie = 'other=1; NEXT_LOCALE=zh-TW';
  assert.equal(n.getRecommendedLanguage('en', targets, ['ja']), 'zh-hant');
  r.localStorage.setItem('preferredLang', 'ar');
  assert.equal(n.getRecommendedLanguage('en', targets, ['ja']), 'ar');
  const bilingual = n.getLanguageTargets({ pathname: '/guide/example', publishedLocales: ['en', 'zh'] });
  assert.equal(n.getRecommendedLanguage('en', bilingual, ['zh']), undefined);
  n.dismissLanguageRecommendation();
  assert.equal(n.getRecommendedLanguage('en', targets, ['ar']), undefined);
});

test('all three builds resolve only page-owned language targets', () => {
  for (const variant of ['cn', 'io', 'preview']) {
    const n = navigation(runtime(variant));
    const targets = n.getLanguageTargets({ pathname: '/ja/price', routeLocale: 'ja' });
    assert.equal(targets.length, 9);
    assert.equal(targets.find((t) => t.locale === 'zh').href,
      variant === 'preview' ? '/zh/price' : 'https://fastgpt.cn/price');
    assert.equal(targets.find((t) => t.locale === 'en').href,
      variant === 'preview' ? '/price' : 'https://fastgpt.io/price');
    assert.equal(targets.find((t) => t.locale === 'ar').href,
      variant === 'preview' ? '/ar/price' : 'https://fastgpt.io/ar/price');
    const guide = n.getLanguageTargets({
      pathname: '/zh/guide/example', routeLocale: 'zh', publishedLocales: ['zh', 'en'], reviewLocalePaths: true
    });
    assert.equal(guide.find((t) => t.locale === 'en').href,
      variant === 'preview' ? '/en/guide/example' : 'https://fastgpt.io/guide/example');
    const single = n.getLanguageTargets({ pathname: '/tutorial/example', publishedLocales: ['zh'] });
    assert.equal(single.length, 1);
    assert.equal(n.getRecommendedLanguage('zh', single, ['en']), undefined);
  }
});

test('FAQ links resolve through content identity, including different translated slugs', () => {
  for (const variant of ['cn', 'io', 'preview']) {
    const r = runtime(variant);
    const faq = r.load('src/faq');
    const seo = r.load('src/lib/faqSeo.ts');
    const id = faq.resolveFaqContentId('how-to-check-the-number', 'en');
    assert(id);
    const locales = faq.getFaqTranslationLocales(id, 'en');
    assert.equal(locales.length, 2);
    const links = seo.getFaqLanguageSwitchPaths(id, locales);
    const alternates = seo.getFaqAlternates('en', id, locales).languages;
    if (variant !== 'preview') {
      assert.equal(links.en, alternates.en);
      assert.equal(links.zh, alternates['zh-CN']);
    }
    faq.getFaqRouteKey = (contentId, locale) => contentId === 'shared-identity'
      ? { en: 'english-slug', zh: 'chinese-slug' }[locale] : undefined;
    const different = seo.getFaqLanguageSwitchPaths('shared-identity', ['en', 'zh', 'ja']);
    assert.equal(Object.keys(different).length, 2);
    assert.equal(different.en, variant === 'preview' ? '/faq/english-slug' : 'https://fastgpt.io/faq/english-slug');
    assert.equal(different.zh, variant === 'preview' ? '/zh/faq/chinese-slug' : 'https://fastgpt.cn/faq/chinese-slug');
  }
});

test('explicit navigation preserves query and fragment and transfers cross-origin choices', () => {
  const r = runtime();
  const n = navigation(r);
  const current = 'https://fastgpt.io/guide/old?utm_source=x&filter=a&filter=b#section';
  const chinese = n.getLanguageSwitchHref(target('zh', 'https://fastgpt.cn/guide/new'), current);
  assert.equal(chinese, 'https://fastgpt.cn/guide/new?utm_source=x&filter=a&filter=b&__fg_lang=zh#section');
  assert.equal(n.getLanguageSwitchHref(target('ja', 'https://fastgpt.io/ja'), current),
    'https://fastgpt.io/ja?utm_source=x&filter=a&filter=b#section');
  assert.equal(n.getLanguageSwitchHref(target('en', 'https://fastgpt.io/guide/old'), chinese),
    'https://fastgpt.io/guide/old?utm_source=x&filter=a&filter=b&__fg_lang=en#section');
  assert.equal(n.getLanguageSwitchHref(target('zh', '/zh/guide/new'), 'http://localhost:3000/en/guide/old?utm_source=x#section'),
    'http://localhost:3000/zh/guide/new?utm_source=x#section');
  r.window.location.href = chinese;
  const state = r.window.history.state;
  n.consumeLanguageChoice('zh');
  assert.equal(r.localStorage.getItem('preferredLang'), 'zh');
  assert.equal(r.window.location.href, 'https://fastgpt.cn/guide/new?utm_source=x&filter=a&filter=b#section');
  assert.equal(r.window.history.state, state);
  assert.equal(n.getRecommendedLanguage('zh', [target('zh', '/'), target('en', 'https://fastgpt.io/')], ['en']), undefined);
});

test('malformed, duplicate, and mismatched choice markers never change a preference', () => {
  for (const query of ['__fg_lang=fr', '__fg_lang=en', '__fg_lang=zh&__fg_lang=en', '__fg_lang=https://example.com']) {
    const r = runtime('cn');
    r.window.location.href = `https://fastgpt.cn/?${query}&utm_source=x#section`;
    navigation(r).consumeLanguageChoice('zh');
    assert.equal(r.localStorage.getItem('preferredLang'), null);
    assert.equal(r.window.location.href, 'https://fastgpt.cn/?utm_source=x#section');
  }
});

test('blocked storage still permits recommendations, closing, and explicit navigation', () => {
  const r = runtime();
  const n = navigation(r);
  r.localStorage.getItem = r.localStorage.setItem = () => { throw new Error('Storage blocked'); };
  r.sessionStorage.getItem = r.sessionStorage.setItem = () => { throw new Error('Storage blocked'); };
  Object.defineProperty(r.document, 'cookie', {
    get() { throw new Error('Cookies blocked'); },
    set() { throw new Error('Cookies blocked'); }
  });
  const targets = n.getLanguageTargets({ pathname: '/' });
  assert.equal(n.getRecommendedLanguage('en', targets, ['zh']), 'zh');
  assert.doesNotThrow(() => n.dismissLanguageRecommendation());
  const anchor = { href: '' };
  n.prepareLanguageLink(anchor, targets.find((t) => t.locale === 'zh'));
  assert.equal(anchor.href, 'https://fastgpt.cn/?utm_source=test&__fg_lang=zh#section');
  r.window.location.href = anchor.href;
  assert.equal(n.consumeLanguageChoice('zh'), true);
  assert.equal(r.window.location.href, 'https://fastgpt.cn/?utm_source=test#section');
});
