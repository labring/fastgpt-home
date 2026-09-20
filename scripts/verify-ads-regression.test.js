const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const compiled = new Map();

function load(file, mocks = {}, globals = {}) {
  if (!compiled.has(file)) {
    compiled.set(
      file,
      ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2020,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true
        },
        fileName: file
      }).outputText
    );
  }
  const module = { exports: {} };
  vm.runInNewContext(
    `(function(require,module,exports){${compiled.get(file)}\n})`,
    {
      URL,
      URLSearchParams,
      ...globals
    },
    { filename: file }
  )((name) => (Object.hasOwn(mocks, name) ? mocks[name] : require(name)), module, module.exports);
  return module.exports;
}

test('UET sends three arguments to the loaded SDK and queues them before load', () => {
  for (const loaded of [false, true]) {
    const calls = [];
    const window = loaded ? { uetq: { push: (...args) => calls.push(args) } } : {};
    load('src/lib/uet.ts', {}, { window }).fireUetConversion();
    assert.deepEqual(JSON.parse(JSON.stringify(loaded ? calls[0] : window.uetq)), [
      'event',
      'lead_submit',
      {}
    ]);
  }
});

test('UET failures never escape to the saved lead', () => {
  const window = {
    uetq: {
      push() {
        throw new Error('SDK unavailable');
      }
    }
  };
  assert.doesNotThrow(() => load('src/lib/uet.ts', {}, { window }).fireUetConversion());
  assert.doesNotThrow(() => load('src/lib/uet.ts').fireUetConversion());
});

test('all Nginx and Cloudflare CSP policies allow the UET script and collection host', () => {
  for (const file of [
    'nginx-security-headers.conf',
    'nginx-embeddable-security-headers.conf',
    'public/_headers'
  ]) {
    const policies = fs
      .readFileSync(path.join(root, file), 'utf8')
      .split('\n')
      .filter((line) => /Content-Security-Policy.*default-src/.test(line));
    assert(policies.length, `${file}: CSP missing`);
    for (const policy of policies) {
      for (const directive of ['script-src', 'connect-src']) {
        const sources = policy.match(new RegExp(`${directive} ([^;]+)`))[1].split(/\s+/);
        assert(sources.includes('https://bat.bing.com'), `${file}: ${directive} blocks UET`);
        assert(!sources.includes('*.bing.com'), `${file}: keep the Bing permission scoped`);
      }
    }
  }
});

function elements(node) {
  if (!node || typeof node !== 'object') return [];
  return [node, ...[node.props?.children].flat(Infinity).flatMap(elements)];
}

// Execute the real component callbacks and inspect the JSON passed to its HTTP boundary.
function form(options = {}) {
  const state = [];
  let cursor = 0;
  let now = '2026-09-20T01:00:00.000Z';
  const requests = [];
  const events = [];
  const window = { location: new URL('https://fastgpt.cn/ads/brand' + (options.query ?? '')) };
  const storedUtm = {
    utm_source: 'stored-source',
    utm_medium: 'cpc',
    utm_campaign: 'stored-campaign',
    utm_term: 'stored-term',
    utm_content: 'Exact'
  };
  const mocks = {
    react: {
      useState(initial) {
        const i = cursor++;
        if (!(i in state)) state[i] = typeof initial === 'function' ? initial() : initial;
        return [
          state[i],
          (value) => {
            state[i] = typeof value === 'function' ? value(state[i]) : value;
          }
        ];
      }
    },
    '@/lib/adsAttribution': load('src/lib/adsAttribution.ts'),
    '@/components/contact/contactCopy': { CONTACT_OPTIONS: { consultationTopic: ['SaaS'] } },
    '@/lib/fetchWithTimeout': {
      async fetchWithTimeout(url, init) {
        requests.push({ url, ...init, payload: JSON.parse(init.body) });
        if (options.networkError) throw new Error('Offline');
        return {
          ok: options.ok !== false,
          json: async () => {
            if (options.badJson) throw new Error('Invalid JSON');
            return { submission_id: 'submission-1' };
          }
        };
      }
    },
    '@/lib/leadAttribution': {
      getLastTouchUtmSnapshot: () => (options.noStorage ? null : storedUtm),
      getVisitorId: () => options.visitorId ?? 'visitor-1',
      trackVisit: () => {
        events.push('visit');
        storedUtm.utm_campaign = 'changed-by-trackVisit';
      },
      reportAnonymousAttribution: async () => {}
    },
    '@/lib/rybbit': {
      trackRybbitEvent: (name, props) => {
        events.push({ name, props });
        if (options.analyticsError) throw new Error('Analytics unavailable');
      }
    },
    '@/lib/rybbitEvents': { RYBBIT_EVENTS: { businessConsultSubmitSuccess: 'lead-success' } },
    '@/lib/rybbitConversion': { getCurrentCanonicalPageUrl: () => 'https://fastgpt.cn/ads/brand' },
    '@/lib/siteRouting': { isPreviewSite: Boolean(options.preview) },
    '@/lib/uet': load('src/lib/uet.ts', {}, { window }),
    '@/components/ads/ads.module.css': {}
  };
  const Form = load('src/components/ads/AdsLeadForm.tsx', mocks, {
    window,
    Date: class extends Date {
      constructor() {
        super(now);
      }
    },
    process: { env: { NEXT_PUBLIC_CRM_API_URL: options.noCrm ? '' : 'https://crm.example.test/' } }
  }).default;
  function render() {
    cursor = 0;
    return Form({ copy: { title: 'Consult', subtitle: 'Contact us', button: 'Submit' } });
  }
  function change(name, value) {
    const field = elements(render()).find((node) => node.props?.name === name);
    field.props.onChange({ target: { value, checked: value } });
  }
  for (const [name, value] of Object.entries({
    name: ' Example ',
    phone: options.phone ?? ' test@example.test ',
    company: ' Company ',
    consultationTopic: 'SaaS'
  }))
    change(name, value);
  if (options.consent !== false) change('consent', true);
  return {
    render,
    change,
    requests,
    events,
    window,
    storedUtm,
    setTime: (value) => {
      now = value;
    },
    async submit() {
      await render().props.onSubmit({ preventDefault() {} });
      await new Promise((resolve) => setImmediate(resolve));
    }
  };
}

test('submission sends all 19 fields, using current URL and per-field storage fallback', async () => {
  const env = form();
  env.window.location.search = '?utm_source=bing&utm_campaign=&utm_term=updated';
  env.storedUtm.utm_content = 'updated-content';
  await env.submit();
  assert.equal(env.requests.length, 1);
  assert.equal(env.requests[0].url, 'https://crm.example.test/contacts/submit');
  assert.equal(env.requests[0].method, 'POST');
  assert.equal(env.requests[0].headers['Content-Type'], 'application/json');
  assert.deepEqual(env.requests[0].payload, {
    name: 'Example',
    phone: 'test@example.test',
    company: 'Company',
    consultation_topic: 'SaaS',
    position: null,
    used_open_source: null,
    project_stage: null,
    budget: null,
    notes: null,
    source: 'bing_ads',
    utm_source: 'bing',
    utm_medium: 'cpc',
    utm_campaign: 'stored-campaign',
    utm_term: 'updated',
    utm_content: 'updated-content',
    source_page_path: '/ads/brand',
    visitor_id: 'visitor-1',
    consent_at: '2026-09-20T01:00:00.000Z',
    consent_version: 'bing-ads-2026-09'
  });
  assert.equal(env.render().props.role, 'status');
  assert.equal(env.events[1].name, 'lead-success');
  assert.equal(env.events[1].props.submission_id, 'submission-1');
  assert.deepEqual(JSON.parse(JSON.stringify(env.window.uetq)), ['event', 'lead_submit', {}]);
});

test('direct visits preserve empty attribution fields and valid phone submission', async () => {
  const env = form({ noStorage: true, phone: '+86 138 0013 8000' });
  await env.submit();
  for (const field of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    assert.equal(env.requests[0].payload[field], '');
  }
  assert.equal(Object.keys(env.requests[0].payload).length, 19);
});

test('consent can be revoked, reticked, and must be renewed after reset', async () => {
  const env = form();
  env.change('consent', false);
  await env.submit();
  assert.equal(env.requests.length, 0);
  env.setTime('2026-09-20T02:00:00.000Z');
  env.change('consent', true);
  await env.submit();
  assert.equal(env.requests[0].payload.consent_at, '2026-09-20T02:00:00.000Z');
  elements(env.render())
    .find((node) => node.type === 'button')
    .props.onClick();
  assert.equal(
    elements(env.render()).find((node) => node.props?.name === 'consent').props.checked,
    false
  );
  env.change('phone', 'test@example.test');
  await env.submit();
  assert.equal(env.requests.length, 1);
});

test('invalid contact, missing consent, visitor ID or CRM prevent real submissions', async () => {
  for (const options of [
    { phone: 'bad' },
    { consent: false },
    { visitorId: '' },
    { noCrm: true }
  ]) {
    const env = form(options);
    await env.submit();
    assert.equal(env.requests.length, 0);
    assert(elements(env.render()).some((node) => node.props?.role === 'alert'));
    assert.equal(env.window.uetq, undefined);
  }
});

test('preview without CRM completes locally and emits no conversions', async () => {
  const env = form({ preview: true, noCrm: true });
  await env.submit();
  assert.equal(env.render().props.role, 'status');
  assert.equal(env.requests.length, 0);
  assert.equal(env.events.length, 0);
  assert.equal(env.window.uetq, undefined);
});

test('HTTP and network failures allow retry and emit no conversions', async () => {
  for (const options of [{ ok: false }, { networkError: true }]) {
    const env = form(options);
    await env.submit();
    assert(elements(env.render()).some((node) => node.props?.role === 'alert'));
    assert.equal(env.window.uetq, undefined);
    assert.deepEqual(env.events, ['visit']);
    assert.equal(
      elements(env.render()).find((node) => node.type === 'button').props.disabled,
      false
    );
  }
});

test('invalid analytics JSON and SDK failures preserve successful submission', async () => {
  for (const options of [{ badJson: true }, { analyticsError: true }]) {
    const env = form(options);
    env.window.uetq = {
      push() {
        throw new Error('UET unavailable');
      }
    };
    await env.submit();
    assert.equal(env.render().props.role, 'status');
  }
});

test('privacy policy is readable from the consent text', () => {
  const link = elements(form().render()).find((node) => node.type === 'a');
  assert.equal(link.props.href, 'https://doc.fastgpt.cn/docs/protocol/privacy');
  assert.equal(link.props.target, '_blank');
});

const pages = load('src/content/ads/pages.ts').adsLandingPages;

function validateRegistry(entries) {
  return load('src/content/ads/loader.ts', {
    'server-only': {},
    '@/content/ads/pages': { adsLandingPages: entries },
    '@/lib/siteRouting': { getSiteBaseUrl: () => 'https://fastgpt.cn' }
  });
}

test('registry keeps non-empty copy, HTTPS, paragraph count and unique slug constraints', () => {
  for (const mutate of [
    (items) => {
      items[0].h1 = ' ';
    },
    (items) => {
      items[0].readingLinks[0].url = 'http://fastgpt.cn/guide';
    },
    (items) => {
      items[0].sections.pop();
    },
    (items) => {
      items.push(items[0]);
    }
  ]) {
    const entries = structuredClone(pages);
    mutate(entries);
    assert.throws(() => validateRegistry(entries), /Invalid landing registry entry/);
  }
});

// Run the complete export verifier against a minimal eight-page export in memory.
function verifyExport(entries, mutateHtml = (html) => html, mutateOps = () => {}) {
  const dictionary = require('../src/locales/zh.json');
  const ops = structuredClone(require('../src/content/ads/ad-ops.json'));
  mutateOps(ops);
  const chrome = [
    ...dictionary.links.map((link) => link.label),
    dictionary.Home.navCta.consult,
    dictionary.Home.footer.tagline,
    dictionary.Home.footer.copyright.replace('{year}', String(new Date().getFullYear()))
  ].join(' ');
  const escape = (value) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('"', '&quot;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  function html(page) {
    return `<html lang="zh-CN"><head><meta name="robots" content="noindex,follow">
      <link rel="canonical" href="https://fastgpt.cn/ads/${page.slug}">
      <title>${escape(page.h1)} · FastGPT</title><meta name="description" content="${escape(
      page.subtitle
    )}"></head>
      <body>${chrome}<h1>${escape(page.h1)}</h1>
      <input name="name"><input name="phone"><input name="company"><select name="consultationTopic"></select>
      <input type="checkbox" name="consent"><a href="https://doc.fastgpt.cn/docs/protocol/privacy">《隐私政策》</a>
      ${page.readingLinks.map((link) => `<a href="${link.url}">${link.label}</a>`).join('')}
      ${page.form.title} ${page.form.button} ${page.trustLine}
      平台能力 ${page.why?.title ?? ''} ${page.why?.subtitle ?? ''}
      ${
        page.why
          ? page.why.cards
              .map(
                (card) =>
                  `${card.title} ${card.body} ${card.verdict ? `Dify 侧 ${card.verdict}` : ''}`
              )
              .join(' ')
          : '知识库维护看得见'
      }
      ${page.cases?.badge ?? '客户案例'} ${page.cases?.title ?? ''} ${page.cases?.subtitle ?? ''}
      ${
        page.cases
          ? page.cases.cards
              .map(
                (card) =>
                  `${card.title} ${card.metrics} ${card.org ?? ''} ${
                    card.url ? `<a href="${card.url}">Case</a>` : ''
                  }`
              )
              .join(' ')
          : '研发知识助手'
      }
      </body></html>`;
  }
  const files = new Map(
    entries.map((page) => [path.join(root, 'out/ads', `${page.slug}.html`), mutateHtml(html(page))])
  );
  const mockedFs = {
    ...fs,
    existsSync: (file) => file === path.join(root, 'out/ads'),
    readdirSync: () =>
      entries.map((page) => ({
        name: `${page.slug}.html`,
        isDirectory: () => false,
        isFile: () => true
      })),
    readFileSync(file, ...args) {
      if (files.has(file)) return files.get(file);
      if (file === path.join(root, 'src/content/ads/pages.ts'))
        return `export const adsLandingPages = ${JSON.stringify(entries)};`;
      if (file === path.join(root, 'src/content/ads/ad-ops.json')) return JSON.stringify(ops);
      return fs.readFileSync(file, ...args);
    }
  };
  let failure;
  vm.runInNewContext(fs.readFileSync(path.join(root, 'scripts/verify-ads.js'), 'utf8'), {
    __dirname: path.join(root, 'scripts'),
    require: (name) =>
      name === 'node:fs'
        ? mockedFs
        : name === './lib/site-variant'
        ? { resolveSiteVariant: () => 'cn' }
        : require(name),
    process: {
      exit: () => {
        throw new Error(failure);
      }
    },
    console: {
      log() {},
      error: (message) => {
        failure = message;
      }
    }
  });
}

function cardsOnlyPages() {
  const entries = structuredClone(pages);
  for (const page of entries) delete page.comparisonTable;
  const first = entries[0];
  first.why = { cards: first.why.cards };
  first.cases = { cards: first.cases.cards.map(({ url, ...card }) => card) };
  return entries;
}

test('loader and export verifier accept cards-only overrides and unlinked cases', () => {
  const entries = cardsOnlyPages();
  assert.doesNotThrow(() => validateRegistry(entries));
  assert.doesNotThrow(() => verifyExport(entries));
  entries[0].why.title = 'Required override heading';
  assert.throws(
    () => verifyExport(entries, (html) => html.replace('Required override heading', '')),
    /override title missing/
  );
  entries[0].cases.cards[0].url = 'https://fastgpt.cn/customers/example-case';
  assert.throws(
    () =>
      verifyExport(entries, (html) =>
        html.replace('href="https://fastgpt.cn/customers/example-case"', '')
      ),
    /must link/
  );
});

test('campaign audit accepts short keywords while retaining group and URL contracts', () => {
  const entries = cardsOnlyPages();
  entries[0].keywordGroup = 'AI';
  entries[0].h1 = 'AI 客服';
  const align = (ops) => {
    ops.pages[0].keywordGroup = 'AI';
    ops.pages[0].adTitles[0] = 'AI 客服';
  };
  assert.doesNotThrow(() => verifyExport(entries, undefined, align));
  assert.throws(() => verifyExport(entries), /keyword group differs/);
  assert.throws(
    () =>
      verifyExport(entries, undefined, (ops) => {
        align(ops);
        ops.pages[0].finalUrl = 'https://fastgpt.cn/ads/wrong';
      }),
    /final URL must follow/
  );
});
