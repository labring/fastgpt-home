const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');

function browser(cookieEnabled = false, env = {}) {
  const storage = new Map();
  const cookies = new Map();
  const listeners = {};
  const listenerOptions = {};
  const mocks = {};
  const document = {
    referrer: 'https://www.google.com/',
    documentElement: { lang: 'zh' },
    addEventListener: (name, listener, options) => {
      listeners[name] = listener;
      listenerOptions[name] = options;
    },
    removeEventListener: (name) => delete listeners[name]
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
    process: { env: { NEXT_PUBLIC_SITE_VARIANT: 'cn', ...env } },
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
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name === 'server-only') return {};
      if (name.startsWith('@/')) return load(`src/${name.slice(2)}`);
      if (name.startsWith('@customers/')) return load(`src/customers/${name.slice(11)}`);
      if (name.startsWith('.')) return load(path.resolve(path.dirname(resolved), name));
      return require(name);
    };
    vm.runInContext(`(function(require,module,exports){${output}\n})`, context, {
      filename: resolved
    })(localRequire, module, module.exports);
    return module.exports;
  }
  return { window, document, load, context, listeners, listenerOptions, mocks, Element };
}

function openDialog(env, props) {
  const updates = [];
  env.mocks.react = {
    lazy: (loader) => loader,
    Suspense: 'Suspense',
    useEffect: (callback) => callback(),
    useRef: (value) => ({ current: value }),
    useState: (value) => [value, (next) => updates.push(next)]
  };
  env.mocks['next/navigation'] = {
    useParams: () => ({}),
    usePathname: () => '/customers'
  };
  env.load('src/components/consultation/ConsultationDialog.tsx').default();
  const trigger = new env.Element(props.href);
  trigger.dataset = { rybbitPropSource: props['data-rybbit-prop-source'] };
  trigger.closest = (selector) =>
    selector === 'a[data-consultation-trigger="true"]' &&
    props['data-consultation-trigger'] === 'true'
      ? trigger
      : null;
  function click(modifiers = {}) {
    let prevented = false;
    updates.length = 0;
    env.listeners.click({
      target: trigger,
      button: 0,
      defaultPrevented: false,
      ...modifiers,
      preventDefault: () => {
        prevented = true;
      }
    });
    return { prevented, updates: [...updates] };
  }
  return click;
}

function renderForm(env, props = {}) {
  const state = [];
  let cursor = 0;
  const formRef = { current: { reportValidity: () => true } };
  env.mocks.react = {
    useEffect: () => {},
    useRef: () => formRef,
    useState: (initial) => {
      const index = cursor++;
      if (!(index in state)) state[index] = initial;
      return [
        state[index],
        (value) => {
          state[index] = typeof value === 'function' ? value(state[index]) : value;
        }
      ];
    }
  };
  const Form = env.load('src/components/contact/ContactForm.tsx').default;
  const render = () => {
    cursor = 0;
    return Form({ locale: 'zh', ...props });
  };
  function fields(node) {
    if (!node || typeof node !== 'object') return [];
    return [node, ...[node.props?.children].flat(Infinity).flatMap(fields)];
  }
  for (const { type, props: field } of fields(render())) {
    if (type === 'input' && field.type === 'text') {
      field.onChange({
        target: { value: field.name === 'phone' ? 'test@example.test' : 'Example' }
      });
    } else if (type === 'input' && field.type === 'radio') field.onChange();
    else if (field?.options) field.onChange(field.name, field.options[0]);
  }
  return { render, submit: () => render().props.onSubmit({ preventDefault() {} }) };
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

const sourceConfigurations = [
  undefined,
  '',
  '   ',
  'partner-cases',
  ' 合作 & partners+ ',
  'x'.repeat(160)
];

for (const configuredSource of sourceConfigurations) {
  test(`configured consultation source stays consistent: ${JSON.stringify(
    configuredSource
  )}`, async () => {
    const env = browser(false, {
      NEXT_PUBLIC_CUSTOMERS_SOURCE: configuredSource,
      NEXT_PUBLIC_CRM_API_URL: 'https://crm.example.test'
    });
    const expected = (configuredSource?.trim() || 'customers').slice(0, 128);
    const { getConsultationLinkProps } = env.load('src/customers/lib/consultation.ts');
    for (const source of sources) {
      const props = getConsultationLinkProps({
        source,
        solutionId: 42,
        solutionTitle: 'Example',
        solutionSlug: 'example-case'
      });
      const url = new URL(props.href, env.window.location.origin);
      assert.equal(url.pathname, '/contact');
      assert.deepEqual([...url.searchParams], [['source', expected]]);
      assert.equal(props['data-consultation-trigger'], 'true');
      assert.equal(props['data-rybbit-prop-source'], source);
      assert.equal(props['data-rybbit-prop-solution_id'], '42');
      assert.equal(props['data-rybbit-prop-solution_slug'], 'example-case');
    }
    const props = getConsultationLinkProps({ source: 'customers_hero' });
    const {
      prevented,
      updates: [capture, submissionSource, opened]
    } = openDialog(env, props)();
    assert.equal(prevented, true);
    assert.equal(opened, true);
    const requests = [];
    env.mocks['@/lib/fetchWithTimeout'] = {
      fetchWithTimeout: async (url, options) => {
        if (url.endsWith('/contacts/submit')) requests.push(JSON.parse(options.body));
        return { ok: true, json: async () => ({ submission_id: 'test-id' }) };
      }
    };
    await renderForm(env, { submissionSource, rybbitConsultCapture: capture }).submit();
    assert.equal(requests.length, 1);
    assert.equal(requests[0].source, expected);
    env.window.location = new URL(props.href, env.window.location.origin);
    assert.equal(env.load('src/lib/leadAttribution.ts').getSubmissionSource(), expected);
  });
}

test('independent forms keep their clicked context across overlapping submissions', async () => {
  const forms = [];
  const captures = [
    [
      'home_hero_consult',
      'https://fastgpt.cn/?utm_source=google#top',
      '首页-Banner商务咨询',
      'https://fastgpt.cn/'
    ],
    [
      'price_cloud_custom',
      'https://fastgpt.cn/price?private=value#plans',
      '价格页-云服务定制版商务咨询',
      'https://fastgpt.cn/price'
    ]
  ];
  let sharedStorage;
  for (const [source, url, label, page] of captures) {
    const env = browser(false, { NEXT_PUBLIC_CRM_API_URL: 'https://crm.example.test' });
    if (sharedStorage) env.window.localStorage = sharedStorage;
    else sharedStorage = env.window.localStorage;
    env.window.location = new URL(url);
    const capture = env.load('src/lib/rybbitConversion.ts').createRybbitConsultCapture(source);
    let finish;
    const events = [];
    let successes = 0;
    env.window.rybbit = {
      event: (name, props) => events.push({ name, ...JSON.parse(JSON.stringify(props)) })
    };
    env.mocks['@/lib/fetchWithTimeout'] = {
      fetchWithTimeout: (url) =>
        url.endsWith('/contacts/submit')
          ? new Promise((resolve) => {
              finish = resolve;
            })
          : Promise.resolve({ ok: true })
    };
    const form = renderForm(env, {
      submissionSource: 'business',
      rybbitConsultCapture: capture,
      onSuccess: () => {
        successes++;
      }
    });
    const pending = form.submit();
    forms.push(async () => {
      finish({ ok: true, json: async () => ({ submission_id: source }) });
      await pending;
      assert.equal(successes, 1);
      assert.equal(form.render().props.role, 'status');
      assert.equal(events.length, 1);
      assert.equal(events[0].name, 'business_consult_submit_success');
      assert.equal(events[0].submission_id, source);
      assert.equal(events[0].crm_visitor_id, env.load('src/lib/leadAttribution.ts').getVisitorId());
      assert.equal(events[0].source, label);
      assert.equal(events[0].page_url, page);
      assert.equal(events[0].entry_page_url, `${label}｜${page}`);
    });
  }
  await forms[1]();
  await forms[0]();
  assert.equal(sharedStorage.getItem('fastgpt_rybbit_consult_source'), null);
  assert.equal(sharedStorage.getItem('fastgpt_rybbit_consult_page_url'), null);
});

test('direct forms retain fallbacks and CRM success when analytics fail', async () => {
  for (const scenario of ['missing', 'empty', 'sdk-error', 'json-error', 'no-id']) {
    const env = browser(false, { NEXT_PUBLIC_CRM_API_URL: 'https://crm.example.test' });
    env.window.location = new URL('https://fastgpt.cn/contact?source=direct-business#form');
    env.window.localStorage.setItem('fastgpt_rybbit_consult_source', 'stale-source');
    const events = [];
    env.window.rybbit = {
      event: (_name, props) => {
        if (scenario === 'sdk-error') throw new Error('SDK failed');
        events.push(JSON.parse(JSON.stringify(props)));
      }
    };
    env.mocks['@/lib/fetchWithTimeout'] = {
      fetchWithTimeout: async () => ({
        ok: true,
        json: async () => {
          if (scenario === 'json-error') throw new Error('Invalid analytics response');
          return scenario === 'no-id' ? {} : { submission_id: 'test-id' };
        }
      })
    };
    let successes = 0;
    const form = renderForm(env, {
      rybbitConsultCapture: scenario === 'empty' ? { source: '', entryPageUrl: '' } : undefined,
      onSuccess: () => {
        successes++;
      }
    });
    await form.submit();
    assert.equal(successes, 1, scenario);
    assert.equal(form.render().props.role, 'status', scenario);
    assert.equal(events.length, ['missing', 'empty'].includes(scenario) ? 1 : 0, scenario);
    if (events.length) {
      assert.equal(events[0].source, 'direct-business');
      assert.equal(events[0].page_url, 'https://fastgpt.cn/contact');
      assert.equal(events[0].entry_page_url, 'https://fastgpt.cn/contact');
    }
  }
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

test('consultation dialog intercepts normal clicks and preserves native link gestures', () => {
  const env = browser();
  const props = env
    .load('src/customers/lib/consultation.ts')
    .getConsultationLinkProps({ source: 'customers_hero' });
  const click = openDialog(env, props);
  assert.equal(env.listenerOptions.click, true);
  const { prevented, updates } = click();
  assert.equal(prevented, true);
  assert.equal(updates[0].source, '案例详情-顶部商务咨询');
  assert.equal(updates[0].entryPageUrl, '案例详情-顶部商务咨询｜https://fastgpt.cn/customers');
  assert.equal(updates[1], 'customers');
  assert.equal(updates[2], true);
  for (const modifier of [
    { ctrlKey: true },
    { metaKey: true },
    { shiftKey: true },
    { altKey: true },
    { button: 1 },
    { defaultPrevented: true }
  ]) {
    assert.deepEqual(click(modifier), { prevented: false, updates: [] });
  }
});
