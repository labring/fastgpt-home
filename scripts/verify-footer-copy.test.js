const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const root = path.resolve(__dirname, '..');
const baselinePath = path.join(__dirname, 'fixtures/footer-copy.json');
const cache = new Map();
function load(file) {
  const resolved = ['', '.ts', '.tsx', '.json']
    .map((ext) => file + ext)
    .find((candidate) => fs.existsSync(candidate));
  if (resolved.endsWith('.json')) return JSON.parse(fs.readFileSync(resolved, 'utf8'));
  if (cache.has(resolved)) return cache.get(resolved).exports;
  const module = { exports: {} };
  cache.set(resolved, module);
  const code = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true
    }
  }).outputText;
  const localRequire = (name) => {
    if (name.endsWith('.module.css')) return {};
    if (name === 'next/image') return (props) => React.createElement('img', props);
    if (name === 'server-only') return {};
    if (name.startsWith('@/')) return load(path.join(root, 'src', name.slice(2)));
    if (name.startsWith('.')) return load(path.resolve(path.dirname(resolved), name));
    return require(name);
  };
  vm.runInNewContext(`(function(require,module,exports){${code}\n})`, {
    process: {
      env: {
        NEXT_PUBLIC_SITE_VARIANT: 'cn',
        NEXT_PUBLIC_POLICE_FILING: 'Police filing baseline',
        NEXT_PUBLIC_FILING_ADDRESS: 'Registration baseline'
      }
    },
    Date: class extends Date {
      getFullYear() {
        return 2026;
      }
    },
    URL,
    URLSearchParams,
    console
  })(localRequire, module, module.exports);
  return module.exports;
}
const Footer = load(path.join(root, 'src/components/home/Footer.tsx')).default;
function capture() {
  return Object.fromEntries(
    fs
      .readdirSync(path.join(root, 'src/locales'))
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const t = JSON.parse(fs.readFileSync(path.join(root, 'src/locales', file), 'utf8')).Home
          .footer;
        const html = renderToStaticMarkup(
          React.createElement(Footer, { t, locale: file.replace('.json', '') })
        );
        return [
          file,
          {
            copy: t,
            text: html
              .replace(/<[^>]*>/g, '\n')
              .split('\n')
              .map((text) => text.trim())
              .filter(Boolean),
            accessible: [...html.matchAll(/\b(?:alt|aria-label)="([^"]*)"/g)].map(
              (match) => match[0]
            ),
            links: [...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map((match) => match[1])
          }
        ];
      })
  );
}
test('footer preserves approved text, order, accessible labels and links in every locale', () => {
  assert.deepEqual(capture(), JSON.parse(fs.readFileSync(baselinePath, 'utf8')));
});
