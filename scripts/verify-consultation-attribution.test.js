const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');

function browser(cookieEnabled = false) {
  const storage = new Map();
  const cookies = new Map();
  const listeners = {};
  const document = {
    referrer: 'https://www.google.com/',
    documentElement: { lang: 'zh' },
    addEventListener: (name, listener) => {
      listeners[name] = listener;
    }
  };
  Object.defineProperty(document, 'cookie', {
    get: () => [...cookies].map(([key, value]) => `${key}=${value}`).join('; '),
    set: (value) => {
      if (!cookieEnabled) return;
      const [pair] = value.split(';');
      const index = pair.indexOf('=');
      const key = pair.slice(0, index);
      if (/max-age=0(?:;|$)/i.test(value)) cookies.delete(key);
      else cookies.set(key, pair.slice(index + 1));
    }
  });
  const window = {
    location: new URL('https://fastgpt.cn/customers?utm_source=google&utm_medium=cpc'),
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key)
    }
  };
  class Element {
    constructor(href) {
      this.href = href;
    }
    closest() {
      return this;
    }
    getAttribute() {
      return this.href;
    }
    setAttribute(_name, value) {
      this.href = value;
    }
  }
  const context = vm.createContext({
    window,
    document,
    Element,
    URL,
    URLSearchParams,
    TextEncoder,
    TextDecoder,
    process: { env: { NEXT_PUBLIC_SITE_VARIANT: 'cn' } },
    console,
    setTimeout,
    clearTimeout,
    btoa,
    atob,
    structuredClone
  });
  const cache = new Map();
  function load(file) {
    const absolute = path.resolve(root, file);
    const resolved = ['', '.ts', '.tsx', '.mjs', '.json']
      .map((ext) => absolute + ext)
      .find((candidate) => fs.existsSync(candidate));
    assert(resolved, `Cannot resolve ${file}`);
    if (cache.has(resolved)) return cache.get(resolved).exports;
    if (resolved.endsWith('.json')) return JSON.parse(fs.readFileSync(resolved, 'utf8'));
    const module = { exports: {} };
    cache.set(resolved, module);
    const output = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
        jsx: ts.JsxEmit.ReactJSX
      },
      fileName: resolved.replace(/\.mjs$/, '.ts')
    }).outputText;
    const localRequire = (name) => {
      if (name === 'server-only') return {};
      if (name.startsWith('@/')) return load(`src/${name.slice(2)}`);
      if (name.startsWith('.')) return load(path.resolve(path.dirname(resolved), name));
      return require(name);
    };
    vm.runInContext(`(function(require,module,exports){${output}\n})`, context, {
      filename: resolved
    })(localRequire, module, module.exports);
    return module.exports;
  }
  return { window, document, load, context, listeners, Element };
}

const sources = [
  'home_hero',
  'home_bottom',
  'navbar_poc',
  'customers_hero',
  'customers_sidebar',
  'customers_bottom',
  'empty_state'
];

test('all consultation CTAs keep business context outside acquisition UTM', () => {
  const { load } = browser();
  const { getConsultationLinkProps } = load('src/customers/lib/consultation.ts');
  for (const source of sources) {
    const props = getConsultationLinkProps({
      source,
      solutionId: 42,
      solutionTitle: 'Example',
      solutionSlug: 'example-case'
    });
    assert.equal(props.href, '/contact?source=customers');
    assert.equal(props['data-consultation-trigger'], 'true');
    assert.equal(props['data-rybbit-prop-source'], source);
    assert.equal(props['data-rybbit-prop-solution_id'], '42');
    assert.equal(props['data-rybbit-prop-solution_slug'], 'example-case');
  }
});

test('consultation analytics context is immutable per form and does not use localStorage', () => {
  const env = browser();
  const conversion = env.load('src/lib/rybbitConversion.ts');
  const formSource = fs.readFileSync(path.join(root, 'src/components/contact/ContactForm.tsx'), 'utf8');
  assert.equal(typeof conversion.createRybbitConsultCapture, 'function');
  assert.equal(typeof conversion.resolveRybbitConsultEventContext, 'function');
  assert.match(formSource, /resolveRybbitConsultEventContext\(\s*rybbitConsultCapture,/);
  assert.doesNotMatch(formSource, /getRybbitConsultSource|clearRybbitConsultCapture/);

  env.window.location = new URL('https://fastgpt.cn/?utm_source=google');
  const homeCapture = conversion.createRybbitConsultCapture('home_hero_consult');
  env.window.location = new URL('https://fastgpt.cn/price');
  const priceCapture = conversion.createRybbitConsultCapture('price_cloud_custom');

  assert.deepEqual(JSON.parse(JSON.stringify(homeCapture)), {
    source: '首页-Banner商务咨询',
    entryPageUrl: '首页-Banner商务咨询｜https://fastgpt.cn/'
  });
  assert.deepEqual(JSON.parse(JSON.stringify(priceCapture)), {
    source: '价格页-云服务定制版商务咨询',
    entryPageUrl: '价格页-云服务定制版商务咨询｜https://fastgpt.cn/price'
  });
  assert.deepEqual(
    JSON.parse(
      JSON.stringify(
        conversion.resolveRybbitConsultEventContext(homeCapture, 'customers', 'https://fastgpt.cn/')
      )
    ),
    {
      source: '首页-Banner商务咨询',
      page_url: 'https://fastgpt.cn/',
      entry_page_url: '首页-Banner商务咨询｜https://fastgpt.cn/'
    }
  );
  assert.deepEqual(
    JSON.parse(
      JSON.stringify(
        conversion.resolveRybbitConsultEventContext(
          undefined,
          'customers',
          'https://fastgpt.cn/contact'
        )
      )
    ),
    {
      source: 'customers',
      page_url: 'https://fastgpt.cn/contact',
      entry_page_url: 'https://fastgpt.cn/contact'
    }
  );
  assert.equal(env.window.localStorage.getItem('fastgpt_rybbit_consult_source'), null);
  assert.equal(env.window.localStorage.getItem('fastgpt_rybbit_consult_page_url'), null);
});

for (const cookieEnabled of [false, true]) {
  test(`paid entry survives client navigation and submission (cookies: ${cookieEnabled})`, () => {
    const { load, window } = browser(cookieEnabled);
    const sdk = load('src/lib/leadAttribution.ts');
    sdk.trackVisit();
    const before = sdk.getAttributionPayload();
    assert.equal(before.last_touch_channel, 'paid_search · google');
    window.location = new URL('/customers/category/example-case', window.location.origin);
    const { getConsultationLinkProps } = load('src/customers/lib/consultation.ts');
    const { href } = getConsultationLinkProps({ source: 'customers_hero' });
    // Next Link navigates with the component href; document.referrer stays unchanged.
    window.location = new URL(href, window.location.origin);
    sdk.trackVisit();
    sdk.trackVisit(); // Anonymous reporting also tracks after ContactForm does.
    const after = sdk.getAttributionPayload();
    assert.equal(after.first_touch_channel, before.first_touch_channel);
    assert.equal(after.last_touch_channel, before.last_touch_channel);
    assert.equal(after.visitor_id, before.visitor_id);
    assert.equal(sdk.getSubmissionSource(), 'customers');
    assert.equal(
      sdk.getAttributionStorageStatus().status,
      cookieEnabled ? 'cookie' : 'localStorage-fallback'
    );
    window.location = new URL('/contact?utm_source=bing&utm_medium=cpc', window.location.origin);
    sdk.trackVisit();
    assert.equal(sdk.getAttributionPayload().last_touch_channel, 'paid_search · bing');
    assert.equal(sdk.getAttributionPayload().first_touch_channel, before.first_touch_channel);
  });
}

test('same-document navigation does not reapply the entry referrer', () => {
  const { load, window } = browser();
  const sdk = load('src/lib/leadAttribution.ts');
  sdk.trackVisit();
  window.location = new URL('/contact?source=customers', window.location.origin);
  sdk.trackVisit();
  assert.equal(sdk.getAttributionPayload().last_touch_channel, 'paid_search · google');
});

test('a fresh document still classifies external referrers', () => {
  const { load, window } = browser();
  window.location = new URL('https://fastgpt.cn/contact');
  const sdk = load('src/lib/leadAttribution.ts');
  sdk.trackVisit();
  assert.equal(sdk.getAttributionPayload().last_touch_channel, 'organic_search · Google');
});

test('native contact navigation preserves bounded CTA source and incoming acquisition', () => {
  const env = browser();
  const script = env.load('src/lib/contactLinkAttribution.ts').contactLinkAttributionScript;
  vm.runInContext(script, env.context);
  for (const query of ['', '?source=partner&utm_source=google&utm_medium=cpc&email=private']) {
    env.window.location = new URL(`https://fastgpt.cn/customers${query}`);
    const anchor = new env.Element('/contact?source=customers&utm_source=stale#form');
    for (const event of ['pointerdown', 'click']) env.listeners[event]({ target: anchor });
    const url = new URL(anchor.href, env.window.location.origin);
    assert.equal(url.searchParams.get('source'), 'customers');
    assert.equal(url.searchParams.get('utm_source'), query ? 'google' : null);
    assert.equal(url.searchParams.has('email'), false);
    assert.equal(url.hash, '#form');
  }
  const anchor = new env.Element(`/contact?source=${'x'.repeat(200)}`);
  env.listeners.click({ target: anchor });
  assert.equal(
    new URL(anchor.href, env.window.location.origin).searchParams.get('source').length,
    128
  );
});

test('consultation dialog intercepts normal CTA clicks but preserves modified-link behavior', () => {
  const env = browser();
  const listeners = [];
  const stateUpdates = [];
  const originalAddEventListener = env.document.addEventListener;
  env.document.addEventListener = (name, listener, capture) => {
    originalAddEventListener(name, listener, capture);
    listeners.push({ name, listener, capture });
  };
  const source = fs.readFileSync(
    path.join(root, 'src/components/consultation/ConsultationDialog.tsx'),
    'utf8'
  );
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true
    }
  }).outputText;
  const module = { exports: {} };
  const react = {
    lazy: (loader) => loader,
    Suspense: 'Suspense',
    useEffect: (callback) => callback(),
    useRef: (value) => ({ current: value }),
    useState: (value) => [value, (next) => stateUpdates.push(next)]
  };
  const localRequire = (name) => {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return { jsx: () => null };
    if (name === 'next/navigation')
      return { useParams: () => ({}), usePathname: () => '/customers' };
    if (name === '@/lib/locales') return { normalizeLocale: (value) => value };
    if (name === '@/lib/siteRouting') return { getDefaultLocaleForSiteVariant: () => 'zh' };
    if (name === '@/lib/rybbitConversion') {
      return { createRybbitConsultCapture: (source) => ({ source, entryPageUrl: source }) };
    }
    throw new Error(`Unexpected dependency: ${name}`);
  };
  vm.runInContext(`(function(require,module,exports){${output}\n})`, env.context, {
    filename: 'ConsultationDialog.tsx'
  })(localRequire, module, module.exports);
  module.exports.default();

  const click = listeners.find(({ name, capture }) => name === 'click' && capture);
  assert(click, 'ConsultationDialog must install a capture-phase click handler');
  const trigger = new env.Element('/contact?source=customers');
  trigger.dataset = { rybbitPropSource: 'customers_hero' };
  trigger.closest = (selector) =>
    selector === 'a[data-consultation-trigger="true"]' ? trigger : null;

  let prevented = false;
  click.listener({
    target: trigger,
    button: 0,
    defaultPrevented: false,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    preventDefault: () => {
      prevented = true;
    }
  });
  assert.equal(prevented, true, 'Normal CTA clicks must stay on the current page');
  assert.deepEqual(
    stateUpdates,
    [{ source: 'customers_hero', entryPageUrl: 'customers_hero' }, 'customers', true],
    'Normal CTA clicks must open the dialog with an immutable source snapshot'
  );

  stateUpdates.length = 0;
  prevented = false;
  click.listener({
    target: trigger,
    button: 0,
    defaultPrevented: false,
    metaKey: false,
    ctrlKey: true,
    shiftKey: false,
    altKey: false,
    preventDefault: () => {
      prevented = true;
    }
  });
  assert.equal(prevented, false, 'Modified CTA clicks must retain link navigation');
  assert.deepEqual(stateUpdates, [], 'Modified CTA clicks must not open the dialog');
});
