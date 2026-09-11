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
      this.attributes = new Map([['href', href]]);
    }
    closest() {
      return this;
    }
    getAttribute(name) {
      return this.attributes.get(name) ?? null;
    }
    setAttribute(name, value) {
      const normalized = String(value);
      this.attributes.set(name, normalized);
      if (name === 'href') this.href = normalized;
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

function flushBackgroundWork() {
  return new Promise((resolve) => setImmediate(resolve));
}

function findElement(node, type) {
  if (!node || typeof node !== 'object') return undefined;
  if (node.type === type) return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const match = findElement(child, type);
    if (match) return match;
  }
}

test('consultation snapshot props flow from dialog through content to ContactForm', () => {
  const capture = {
    source: '案例详情-顶部商务咨询',
    entryPageUrl: '案例详情-顶部商务咨询｜https://fastgpt.cn/customers'
  };
  const dialogEnv = browser();
  const dialogState = [];
  let dialogCursor = 0;
  const ContentStub = () => null;
  dialogEnv.mocks.react = {
    lazy: () => ContentStub,
    Suspense: 'Suspense',
    useEffect: (callback) => callback(),
    useRef: (value) => ({ current: value }),
    useState: (initial) => {
      const index = dialogCursor++;
      if (!(index in dialogState)) dialogState[index] = initial;
      return [dialogState[index], (next) => {
        dialogState[index] = typeof next === 'function' ? next(dialogState[index]) : next;
      }];
    }
  };
  dialogEnv.mocks['next/navigation'] = {
    useParams: () => ({}),
    usePathname: () => '/customers'
  };
  const Dialog = dialogEnv.load('src/components/consultation/ConsultationDialog.tsx').default;
  Dialog();
  const trigger = new dialogEnv.Element('/contact?source=customers');
  trigger.dataset = { rybbitPropSource: 'customers_hero' };
  trigger.closest = () => trigger;
  dialogEnv.listeners.click({
    target: trigger,
    button: 0,
    preventDefault() {},
    defaultPrevented: false
  });
  dialogCursor = 0;
  const contentElement = findElement(Dialog(), ContentStub);
  assert.equal(contentElement?.props.rybbitConsultCapture?.source, capture.source);
  assert.equal(contentElement?.props.rybbitConsultCapture?.entryPageUrl, capture.entryPageUrl);

  const contentEnv = browser();
  const ContactFormStub = () => null;
  const copy = { badge: '', title: '', description: '', benefits: [], footer: '' };
  let contentStateCursor = 0;
  contentEnv.mocks.react = {
    useEffect: () => {},
    useState: () => [contentStateCursor++ === 0 ? false : copy, () => {}]
  };
  contentEnv.mocks['@/components/contact/ContactForm'] = ContactFormStub;
  contentEnv.mocks['@/components/contact/contactCopy'] = { getContactCopy: () => ({ close: '' }) };
  contentEnv.mocks['@/lib/locales'] = {
    localeDirections: { zh: 'ltr' },
    normalizeLocale: (locale) => locale
  };
  contentEnv.mocks['@/components/ui/dialog'] = {
    Dialog: 'Dialog',
    DialogContent: 'DialogContent',
    DialogDescription: 'DialogDescription',
    DialogHeader: 'DialogHeader',
    DialogTitle: 'DialogTitle'
  };
  contentEnv.mocks['lucide-react'] = {
    Clock3: 'Clock3', Network: 'Network', ShieldCheck: 'ShieldCheck', Sparkles: 'Sparkles'
  };
  const Content = contentEnv.load('src/components/consultation/ConsultationDialogContent.tsx').default;
  const formElement = findElement(
    Content({
      locale: 'zh',
      submissionSource: 'customers',
      rybbitConsultCapture: capture,
      triggerRef: { current: null },
      onClose() {}
    }),
    ContactFormStub
  );
  assert.equal(formElement?.props.rybbitConsultCapture?.source, capture.source);
  assert.equal(formElement?.props.rybbitConsultCapture?.entryPageUrl, capture.entryPageUrl);
});

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

test('landing sources survive dialog submission without replacing conversion context', async () => {
  for (const [surfaceSource, entrySource, entryLabel] of [
    [undefined, 'content_article_body_consult', '内容正文-商务咨询'],
    ['home-cn', 'tech_article_sidebar_consult', '技术文章-侧栏商务咨询'],
    ['customers', 'guide_article_sidebar_consult', '指南文章-侧栏商务咨询'],
    ['home-io', 'faq_detail_sidebar_consult', 'FAQ详情-侧栏商务咨询']
  ]) {
    const env = browser(false, {
      NEXT_PUBLIC_ATTRIBUTION_SOURCE: 'home-cn',
      NEXT_PUBLIC_CRM_API_URL: 'https://crm.example.test'
    });
    const sdk = env.load('src/lib/leadAttribution.ts');
    for (const [query, expected] of [
      ['', surfaceSource || 'home-cn'],
      ['?source=', surfaceSource || 'home-cn'],
      ['?source=%20%20', surfaceSource || 'home-cn'],
      ['?utm_source=google', surfaceSource || 'home-cn'],
      ['?source=%20partner%20', 'partner'],
      [`?source=${'x'.repeat(200)}`, 'x'.repeat(128)]
    ]) {
      env.window.location = new URL(`https://fastgpt.cn/customers${query}`);
      assert.equal(sdk.getSubmissionSource(surfaceSource), expected);
    }
    env.window.location = new URL('https://fastgpt.cn/customers');
    assert.equal(sdk.getSubmissionSource(' customers '), 'customers');
    assert.equal(sdk.getSubmissionSource(' '), 'home-cn');
    assert.equal(sdk.getSubmissionSource('x'.repeat(200)), 'x'.repeat(128));
    delete env.context.window;
    assert.equal(sdk.getSubmissionSource(surfaceSource), surfaceSource || 'home-cn');
    env.context.window = env.window;
    env.window.location = new URL('https://fastgpt.cn/customers?source=partner');

    const requests = [];
    const events = [];
    env.mocks['@/lib/fetchWithTimeout'] = {
      fetchWithTimeout: async (url, options) => {
        if (url.endsWith('/contacts/submit')) requests.push(JSON.parse(options.body));
        return { ok: true, json: async () => ({ submission_id: 'partner-test' }) };
      }
    };
    env.window.rybbit = { event: (name, props) => events.push({ name, ...props }) };
    const capture = env.load('src/lib/rybbitConversion.ts').createRybbitConsultCapture(entrySource);
    await renderForm(env, {
      submissionSource: surfaceSource,
      rybbitConsultCapture: capture
    }).submit();
    await flushBackgroundWork();
    assert.equal(requests.length, 1);
    assert.equal(requests[0].source, 'partner');
    assert.equal(events.length, 1);
    assert.equal(events[0].name, 'business_consult_submit_success');
    assert.equal(events[0].source, entryLabel);
    assert.equal(events[0].crm_visitor_id, requests[0].visitor_id);
  }
});

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
      await flushBackgroundWork();
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
    await flushBackgroundWork();
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

test('CRM success does not wait for a pending analytics response body', async () => {
  const env = browser(false, { NEXT_PUBLIC_CRM_API_URL: 'https://crm.example.test' });
  env.mocks['@/lib/fetchWithTimeout'] = {
    fetchWithTimeout: async () => ({
      ok: true,
      json: () => new Promise(() => {})
    })
  };
  let successes = 0;
  const form = renderForm(env, {
    onSuccess: () => {
      successes++;
    }
  });

  const result = await Promise.race([
    form.submit().then(() => 'submitted'),
    new Promise((resolve) => setTimeout(() => resolve('timed-out'), 50))
  ]);

  assert.equal(result, 'submitted');
  assert.equal(successes, 1);
  assert.equal(form.render().props.role, 'status');
});

test('CRM error does not wait for a pending response body before allowing retry', async () => {
  const env = browser(false, { NEXT_PUBLIC_CRM_API_URL: 'https://crm.example.test' });
  env.mocks['@/lib/fetchWithTimeout'] = {
    fetchWithTimeout: async () => ({
      ok: false,
      status: 500,
      json: () => new Promise(() => {})
    })
  };
  const form = renderForm(env);

  const result = await Promise.race([
    form.submit().then(() => 'settled'),
    new Promise((resolve) => setTimeout(() => resolve('timed-out'), 50))
  ]);

  assert.equal(result, 'settled');
  assert.equal(form.render().type, 'form');
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

test('native contact navigation prefers landing source and retains bounded CTA defaults', () => {
  const env = browser();
  const script = env.load('src/lib/contactLinkAttribution.ts').contactLinkAttributionScript;
  vm.runInContext(script, env.context);
  assert.equal(env.listenerOptions.pointerdown, true);
  assert.equal(env.listenerOptions.click, true);
  const anchor = new env.Element('/contact?source=customers&utm_source=stale#form');
  for (const [query, expectedSource, expectedUtm] of [
    ['', 'customers', null],
    ['?source=partner&utm_source=google&utm_medium=cpc&email=private', 'partner', 'google'],
    ['', 'customers', null],
    ['?source=second-partner', 'second-partner', null],
    ['?source=', 'customers', null],
    ['?source=partner', 'partner', null],
    ['?source=%20%20', 'customers', null]
  ]) {
    env.window.location = new URL(`https://fastgpt.cn/customers${query}`);
    for (const event of ['pointerdown', 'click']) {
      env.listeners[event]({ target: anchor });
      const url = new URL(anchor.href, env.window.location.origin);
      assert.equal(url.searchParams.get('source'), expectedSource);
      assert.equal(url.searchParams.get('utm_source'), expectedUtm);
      assert.equal(url.searchParams.has('email'), false);
      assert.equal(url.hash, '#form');
      assert.equal(
        url.searchParams.get('source'),
        env.load('src/lib/leadAttribution.ts').getSubmissionSource('customers')
      );
    }
  }
  env.window.location = new URL('https://fastgpt.cn/customers');
  anchor.setAttribute('href', `/contact?source=${'x'.repeat(200)}`);
  env.listeners.click({ target: anchor });
  assert.equal(
    new URL(anchor.href, env.window.location.origin).searchParams.get('source').length,
    128
  );
});

test('reused contact links retain empty defaults and accept component href updates', () => {
  for (const initialHref of [
    '/contact#form',
    '/contact?source=#form',
    '/contact?source=%20#form'
  ]) {
    const env = browser();
    vm.runInContext(
      env.load('src/lib/contactLinkAttribution.ts').contactLinkAttributionScript,
      env.context
    );
    const anchor = new env.Element(initialHref);
    for (const [query, expected] of [
      ['?source=partner', 'partner'],
      ['', null],
      ['?source=another-partner', 'another-partner'],
      ['?source=%20', null]
    ]) {
      env.window.location = new URL(`https://fastgpt.cn/customers${query}`);
      env.listeners.click({ target: anchor });
      const url = new URL(anchor.href, env.window.location.origin);
      assert.equal(url.searchParams.get('source'), expected);
      assert.equal(url.hash, '#form');
    }
    for (const [href, expected] of [
      ['/contact?source=campaign#updated', 'campaign'],
      ['/contact#updated', null]
    ]) {
      anchor.setAttribute('href', href);
      env.listeners.pointerdown({ target: anchor });
      env.listeners.click({ target: anchor });
      const url = new URL(anchor.href, env.window.location.origin);
      assert.equal(url.searchParams.get('source'), expected);
      assert.equal(url.hash, '#updated');
    }
  }
});

test('contact URL helpers forward only bounded attribution to localized destinations', () => {
  const env = browser();
  const { getContactUrl } = env.load('src/lib/contact.ts');
  const query = `?source=${'x'.repeat(200)}&utm_source=google&click_id=abc123&email=private`;
  for (const [locale, expectedPath] of [
    ['zh', '/contact'],
    ['zh-hant', '/zh-hant/contact'],
    ['ja', '/en/contact']
  ]) {
    const url = new URL(getContactUrl(locale, query), env.window.location.origin);
    assert.equal(url.pathname, expectedPath);
    assert.deepEqual(
      [...url.searchParams],
      [
        ['source', 'x'.repeat(128)],
        ['utm_source', 'google'],
        ['click_id', 'abc123']
      ]
    );
  }
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
