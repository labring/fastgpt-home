const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const providers = [
  [
    'baidu-tongji',
    'NEXT_PUBLIC_BAIDU_TONGJI',
    '49747f8b12850fd2f7824a9b7f3a4467',
    'https://hm.baidu.com/hm.js?'
  ],
  ['clarity-tongji', 'NEXT_PUBLIC_CLARITY_TONGJI', 'ybhfsnxoxi', 'https://www.clarity.ms/tag/']
];

const { outputText } = ts.transpileModule(read('src/app/SiteAnalytics.tsx'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
});

test('SiteAnalytics initializes CRM identity without global consultation storage', () => {
  const source = read('src/app/SiteAnalytics.tsx');

  assert.doesNotMatch(source, /installRybbitConsultSourceCapture/);
  assert.match(source, /onLoad=\{identifyRybbitVisitor\}/);
  assert.match(source, /onReady=\{identifyRybbitVisitor\}/);
});

function renderScripts(variant, env) {
  const Script = () => null;
  const scripts = [];
  const context = {
    exports: {},
    process: { env },
    require: (name) => {
      if (name === '@/lib/siteRouting') return { currentSiteVariant: variant };
      if (name === 'next/script') return { default: Script };
      if (name === 'react') return { ...require('react'), useEffect: () => {} };
      if (name === '@/lib/rybbitIdentity') return { identifyRybbitVisitor: () => {} };
      return require(name);
    }
  };
  vm.runInNewContext(outputText, context);
  function visit(node) {
    for (const child of require('react').Children.toArray(node)) {
      if (child.type === Script) scripts.push(child.props);
      else if (child.props) visit(child.props.children);
    }
  }
  visit(context.exports.default());
  return scripts;
}

test('Site analytics preserve vendor queues, scope, loading, and deployment wiring', async () => {
  for (const [scriptId, variable, id, prefix] of providers) {
    const render = (variant, key = id) =>
      renderScripts(variant, { [variable]: key }).find((script) => script.id === scriptId);

    for (const variant of ['io', 'preview']) assert.equal(render(variant), undefined);
    assert.equal(render('cn', ''), undefined);

    const script = render('cn');
    assert.equal(script.strategy, 'afterInteractive');
    assert.equal(typeof script.children, 'string');

    for (const hostname of [
      'fastgpt.cn',
      'fastgpt.io',
      'preview.pages.dev',
      'localhost',
      'customers.fastgpt.cn',
      'fastgpt.cn.example.com'
    ]) {
      const requests = [];
      const window = { location: { hostname } };
      const document = {
        createElement: () => ({}),
        head: { appendChild: (element) => requests.push(element) },
        getElementsByTagName: () => [
          {
            parentNode: { insertBefore: (element) => requests.push(element) }
          }
        ]
      };
      vm.runInNewContext(script.children, { window, document });
      if (hostname !== 'fastgpt.cn') {
        assert.equal(requests.length, 0, hostname);
        assert.equal(window._hmt, undefined);
        assert.equal(window.clarity, undefined);
        continue;
      }

      assert.equal(requests.length, 1);
      assert.equal(requests[0].src, prefix + id);
      assert.equal(requests[0].async, true);
      if (scriptId === 'baidu-tongji') {
        assert.deepEqual(Array.from(window._hmt[0]), ['_requirePlugin', 'UrlChangeTracker']);
        assert.equal(window._hmt.length, 1, 'The vendor owns initial and SPA pageview counts');
      } else {
        window.clarity('event', 'queued-before-sdk');
        assert.deepEqual(Array.from(window.clarity.q[0]), ['event', 'queued-before-sdk']);
      }
      const queue = window._hmt || window.clarity;
      vm.runInNewContext(script.children, { window, document });
      assert.equal(window._hmt || window.clarity, queue, 'Preserve existing vendor queues');
    }

    assert.ok(read('.github/workflows/fastgpt-home-image.yml').includes(`${variable}=${id}`));
    assert.ok(read('Dockerfile').includes(`ARG ${variable}\n`));
    assert.ok(read('Dockerfile').includes(`ENV ${variable}=$${variable}\n`));
    assert.ok(read('.env.template').includes(`${variable}=\n`));
  }

  for (const variant of ['cn', 'io', 'preview']) {
    for (let enabled = 0; enabled < 16; enabled++) {
      const env = {
        NEXT_PUBLIC_BAIDU_TONGJI: enabled & 1 ? providers[0][2] : '',
        NEXT_PUBLIC_CLARITY_TONGJI: enabled & 2 ? providers[1][2] : '',
        NEXT_PUBLIC_RYBBIT_TONGJI: enabled & 4 ? 'https://track.fastgpt.cn/script.js' : '',
        NEXT_PUBLIC_RYBBIT_TONGJI_SITEID: '42',
        NEXT_PUBLIC_GOOGLE_ID: enabled & 8 ? 'G-TEST123' : ''
      };
      const scripts = renderScripts(variant, env);
      const expected = [
        ...(variant === 'cn' && enabled & 1 ? ['baidu-tongji'] : []),
        ...(variant === 'cn' && enabled & 2 ? ['clarity-tongji'] : []),
        ...(enabled & 4 ? ['rybbit-tongji'] : []),
        ...(enabled & 8
          ? ['https://www.googletagmanager.com/gtag/js?id=G-TEST123', 'gtag-init']
          : [])
      ];
      assert.deepEqual(
        scripts.map((script) => script.id || script.src),
        expected
      );
      for (const script of scripts) {
        const early = ['baidu-tongji', 'clarity-tongji'].includes(script.id);
        assert.equal(script.strategy, early ? 'afterInteractive' : 'lazyOnload');
      }
      const rybbit = scripts.find((script) => script.id === 'rybbit-tongji');
      if (rybbit) {
        assert.equal(rybbit.src, env.NEXT_PUBLIC_RYBBIT_TONGJI);
        assert.equal(rybbit['data-site-id'], '42');
      }
      const google = scripts.find((script) => script.id === 'gtag-init');
      if (google) {
        const window = { location: { pathname: '/price' }, dataLayer: [['existing']] };
        window.window = window;
        vm.runInNewContext(google.children, window);
        assert.equal(window.dataLayer[0][0], 'existing');
        assert.equal(window.dataLayer[1][0], 'js');
        assert.equal(window.dataLayer[2][0], 'config');
        assert.equal(window.dataLayer[2][1], env.NEXT_PUBLIC_GOOGLE_ID);
        assert.equal(window.dataLayer[2][2].page_path, '/price');
      }
    }
  }

  async function renderIntegrations(hostname, unmount = false) {
    const Analytics = () => null;
    const Attribution = () => null;
    const state = [];
    let cursor = 0;
    let effect;
    let idle;
    let cancelled = false;
    const context = {
      exports: {},
      window: { location: { hostname } },
      require: (name) => {
        if (name === 'react')
          return {
            useEffect: (callback) => {
              effect = callback;
            },
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
        if (name === '@/lib/runAfterIdle')
          return {
            runAfterIdle: (callback) => {
              idle = callback;
              return () => {
                cancelled = true;
              };
            }
          };
        if (name === './SiteAnalytics') return { default: Analytics };
        if (name === './LeadAttribution') return { default: Attribution };
        return require(name);
      }
    };
    vm.runInNewContext(
      ts.transpileModule(read('src/app/DeferredSiteIntegrations.tsx'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
      }).outputText,
      context
    );
    const render = () => {
      cursor = 0;
      return require('react')
        .Children.toArray(context.exports.default().props.children)
        .map((child) =>
          child.type === Analytics
            ? 'analytics'
            : child.type === Attribution
            ? 'attribution'
            : 'unexpected'
        );
    };
    assert.deepEqual(render(), [], 'Wait for hydration');
    const cleanup = effect();
    if (unmount) cleanup();
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(render(), unmount ? [] : ['analytics'], 'Mount analytics before idle');
    idle();
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(
      render(),
      unmount ? [] : ['analytics', 'attribution'],
      'Mount attribution after idle'
    );
    assert.equal(cancelled, unmount, 'Cancel idle work on unmount');
  }
  for (const hostname of ['fastgpt.cn', 'fastgpt.io', 'preview.pages.dev', 'localhost']) {
    await renderIntegrations(hostname);
  }
  await renderIntegrations('fastgpt.cn', true);

  for (const file of [
    'nginx-security-headers.conf',
    'nginx-embeddable-security-headers.conf',
    'public/_headers'
  ]) {
    const policies = read(file)
      .split('\n')
      .filter((line) => line.includes('default-src'));
    assert.ok(policies.length > 0, file);
    for (const policy of policies) {
      const connect = policy.match(/connect-src ([^;]+)/)?.[1].split(/\s+/);
      for (const host of ['https://hm.baidu.com', '*.clarity.ms', 'https://c.bing.com']) {
        assert.ok(connect?.includes(host), `${file}: connect-src must allow ${host}`);
      }
    }
  }
});
