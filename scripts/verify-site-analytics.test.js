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
    'BaiDuAnalytics',
    'NEXT_PUBLIC_BAIDU_TONGJI',
    '49747f8b12850fd2f7824a9b7f3a4467',
    'https://hm.baidu.com/hm.js?'
  ],
  ['ClarityAnalytics', 'NEXT_PUBLIC_CLARITY_TONGJI', 'ybhfsnxoxi', 'https://www.clarity.ms/tag/']
];

test('China Site analytics preserve vendor queues, scope, loading, and deployment wiring', async () => {
  for (const [component, variable, id, prefix] of providers) {
    const { outputText } = ts.transpileModule(read(`src/app/${component}.tsx`), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
    });
    const render = (variant, key = id) => {
      const context = {
        exports: {},
        process: { env: { [variable]: key } },
        require: (name) => {
          if (name === '@/lib/siteRouting') return { currentSiteVariant: variant };
          if (name === 'next/script') return { default: () => null };
          return require(name);
        }
      };
      vm.runInNewContext(outputText, context);
      return context.exports.default();
    };

    for (const variant of ['io', 'preview']) assert.equal(render(variant), null);
    assert.equal(render('cn', ''), null);

    const script = render('cn');
    assert.equal(script.props.strategy, 'afterInteractive');
    assert.equal(typeof script.props.children, 'string');

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
      vm.runInNewContext(script.props.children, { window, document });
      if (hostname !== 'fastgpt.cn') {
        assert.equal(requests.length, 0, hostname);
        assert.equal(window._hmt, undefined);
        assert.equal(window.clarity, undefined);
        continue;
      }

      assert.equal(requests.length, 1);
      assert.equal(requests[0].src, prefix + id);
      assert.equal(requests[0].async, true);
      if (component === 'BaiDuAnalytics') {
        assert.deepEqual(Array.from(window._hmt[0]), ['_requirePlugin', 'UrlChangeTracker']);
        assert.equal(window._hmt.length, 1, 'The vendor owns initial and SPA pageview counts');
      } else {
        window.clarity('event', 'queued-before-sdk');
        assert.deepEqual(Array.from(window.clarity.q[0]), ['event', 'queued-before-sdk']);
      }
      const queue = window._hmt || window.clarity;
      vm.runInNewContext(script.props.children, { window, document });
      assert.equal(window._hmt || window.clarity, queue, 'Preserve existing vendor queues');
    }

    assert.equal(read('src/app/SiteAnalytics.tsx').split(`<${component} />`).length - 1, 1);
    assert.equal(read('src/app/DeferredSiteIntegrationsContent.tsx').includes(component), false);
    assert.ok(read('.github/workflows/fastgpt-home-image.yml').includes(`${variable}=${id}`));
    assert.ok(read('Dockerfile').includes(`ARG ${variable}\n`));
    assert.ok(read('Dockerfile').includes(`ENV ${variable}=$${variable}\n`));
    assert.ok(read('.env.template').includes(`${variable}=\n`));
  }

  let analyticsLoaded = false;
  const context = {
    exports: {},
    window: { location: { hostname: 'fastgpt.cn' } },
    require: (name) => {
      if (name === 'react')
        return { useEffect: (effect) => effect(), useState: () => [null, () => {}] };
      if (name === '@/lib/runAfterIdle') return { runAfterIdle: () => () => {} };
      if (name === './SiteAnalytics') {
        analyticsLoaded = true;
        return { default: () => null };
      }
      return require(name);
    }
  };
  vm.runInNewContext(
    ts.transpileModule(read('src/app/DeferredSiteIntegrations.tsx'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
    }).outputText,
    context
  );
  context.exports.default();
  await new Promise((resolve) => setImmediate(resolve));
  assert.ok(analyticsLoaded, 'Start analytics while idle integrations are still pending');
  assert.ok(read('src/app/layout.tsx').includes('<DeferredSiteIntegrations />'));

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
