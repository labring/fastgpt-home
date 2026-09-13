const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { PathnameContext } = require('next/dist/shared/lib/hooks-client-context.shared-runtime');
const { variantEnvironment } = require('./lib/release-artifacts');
const ROOT = path.resolve(__dirname, '..');

// Load the real page, routing data, loader and recovery component. Only unrelated visual
// leaves and Next's browser-only loading boundary are substituted in this Node check.
async function renderer(variant, removeRecovery = false) {
  const cache = new Map();
  const pending = [];
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'));
    const module = { exports: {} };
    cache.set(file, module);
    let source = fs.readFileSync(file, 'utf8');
    if (removeRecovery && file.endsWith('/NotFoundRecovery.tsx'))
      source = 'export default function NotFoundRecovery() { return null; }';
    const output = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true
      }
    }).outputText;
    function localRequire(name) {
      if (/\/(HomeThemeFix|FastGPTLogo|CloudEntryLink)$/.test(name)) return () => null;
      if (name === 'next/dynamic')
        return (loader, options) => {
          assert.equal(options.ssr, false, 'Keep the shared static 404 client boundary');
          let Component;
          pending.push(
            loader().then((loaded) => {
              Component = loaded.default;
            })
          );
          return (props) => React.createElement(Component, props);
        };
      if (name.startsWith('@/') || name.startsWith('.')) {
        const target = name.startsWith('@/')
          ? path.join(ROOT, 'src', name.slice(2))
          : path.resolve(path.dirname(file), name);
        const resolved = ['', '.ts', '.tsx', '/index.ts']
          .map((suffix) => target + suffix)
          .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
        assert(resolved, `Unresolved component dependency: ${name}`);
        return load(resolved);
      }
      return require(name);
    }
    new Function('require', 'module', 'exports', 'process', output)(
      localRequire,
      module,
      module.exports,
      { env: variantEnvironment(variant) }
    );
    return module.exports;
  }
  const Page = load(path.join(ROOT, 'src/components/home/NotFoundPage.tsx')).default;
  await Promise.all(pending);
  return (pathname) => {
    const html = renderToStaticMarkup(
      React.createElement(PathnameContext.Provider, { value: pathname }, React.createElement(Page))
    );
    // The page renders one copy per display language; verify a single visible-language panel.
    const panel = html.match(/<div class="not-found-locale [\s\S]*?<\/main>/)?.[0];
    assert(panel, 'Missing localized 404 panel');
    return [...panel.matchAll(/<a\b[^>]*data-not-found-recovery[^>]*>/g)].map(
      ([tag]) => tag.match(/href="([^"]*)"/)[1]
    );
  };
}

for (const variant of ['cn', 'io', 'preview']) {
  test(`${variant}: real 404 page renders recovery links through its loader and component`, async () => {
    const render = await renderer(variant);
    const target = (locale, route) =>
      variant === 'preview'
        ? `/${locale}${route}`
        : `https://fastgpt.${locale === 'zh' ? 'cn' : 'io'}${route}`;
    for (const pathname of ['/ja/tutorial/missing', '/tutorial/missing'])
      assert.deepEqual(
        render(pathname),
        ['zh', 'en'].map((locale) => target(locale, '/tech-center'))
      );
    assert.deepEqual(
      render('/en/guide/missing'),
      ['zh', 'en'].map((locale) => target(locale, '/guide'))
    );
    assert.deepEqual(render('/en/guide/image-architecture-issues'), [
      target('zh', '/guide/image-architecture-issues')
    ]);
    assert.deepEqual(
      render('/ja/reference/env-variables-reference'),
      ['zh', 'en'].map((locale) => target(locale, '/reference/env-variables-reference'))
    );
    assert.deepEqual(
      render('/ja/contact/missing'),
      variant === 'preview'
        ? ['/contact', '/zh/contact', '/zh-hant/contact']
        : [
            'https://fastgpt.io/contact',
            'https://fastgpt.cn/contact',
            'https://fastgpt.io/zh-hant/contact'
          ]
    );
    assert.deepEqual(render('/ja/missing'), []);
    assert.deepEqual(render(null), []);
    const broken = await renderer(variant, true);
    assert.throws(
      () =>
        assert.deepEqual(
          broken('/en/guide/missing'),
          ['zh', 'en'].map((locale) => target(locale, '/guide'))
        ),
      /deep-equal/
    );
  });
}
