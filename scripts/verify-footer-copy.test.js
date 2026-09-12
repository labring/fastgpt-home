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
const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
const env = {};
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
    process: { env },
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
// Inspect React's escaped static markup; client effects require browser validation.
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/\s([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
}

function visibleText(html) {
  return html
    .replace(/<[^>]*>/g, '\n')
    .split('\n')
    .map((text) => text.trim())
    .filter(Boolean);
}

for (const variant of ['cn', 'io']) {
  test(`footer preserves approved copy, links and attributes on ${variant}`, () => {
    env.NEXT_PUBLIC_SITE_VARIANT = variant;
    env.NEXT_PUBLIC_USER_URL = `https://cloud.fastgpt.${variant}`;
    cache.clear();
    const Footer = load(path.join(root, 'src/components/home/Footer.tsx')).default;
    const localeFiles = fs
      .readdirSync(path.join(root, 'src/locales'))
      .filter((f) => f.endsWith('.json'));
    assert.deepEqual(localeFiles.sort(), Object.keys(baseline.text).sort());

    for (const file of localeFiles) {
      const locale = file.replace('.json', '');
      const t = JSON.parse(fs.readFileSync(path.join(root, 'src/locales', file), 'utf8')).Home
        .footer;
      const defaultLocale = variant === 'cn' ? 'zh' : 'en';
      const publishedLocale = locale === 'zh' ? 'zh' : 'en';
      const contactLocale = ['zh', 'zh-hant'].includes(locale) ? locale : 'en';
      const route = (language, page) =>
        `${language === defaultLocale ? '' : `/${language}`}/${page}`;
      const routes = {
        '{cloud}': env.NEXT_PUBLIC_USER_URL,
        '{contact}': route(contactLocale, 'contact'),
        '{guide}': '/guide',
        '{cases}': locale === 'zh' ? '/customers' : 'https://fastgpt.cn/customers',
        '{faq}': route(publishedLocale, 'faq'),
        '{tech}': route(publishedLocale, 'tech-center')
      };

      for (const police of [undefined, 'Police filing baseline']) {
        for (const registration of [undefined, 'Registration baseline']) {
          env.NEXT_PUBLIC_POLICE_FILING = police;
          env.NEXT_PUBLIC_FILING_ADDRESS = registration;
          const context = `${variant}/${locale}, police=${!!police}, registration=${!!registration}`;
          const html = renderToStaticMarkup(React.createElement(Footer, { t, locale }));
          assert.deepEqual(
            visibleText(html),
            [...baseline.text[file], ...[police, registration].filter(Boolean)],
            context
          );
          const anchors = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)];
          const links = anchors.map((match) =>
            attributes(match[0].slice(0, match[0].indexOf('>')))
          );
          const filingLinks = [
            ...(police ? ['https://beian.mps.gov.cn/'] : []),
            ...(registration ? ['https://beian.miit.gov.cn/'] : [])
          ];
          assert.deepEqual(
            links.map((link) => link.href),
            [
              ...baseline.links.map((href) => routes[href] || href),
              ...filingLinks,
              ...baseline.socials.map((social) => social.href)
            ],
            context
          );
          links.forEach((link) => {
            const external = link.href.startsWith('https://');
            assert.equal(link.target, external ? '_blank' : undefined, context);
            assert.equal(link.rel, external ? 'noopener noreferrer nofollow' : undefined, context);
            const cloud = link.href === routes['{cloud}'];
            const contact = link.href === routes['{contact}'];
            assert.equal(link['data-consultation-trigger'], contact ? 'true' : undefined, context);
            assert.equal(
              link['data-rybbit-event'],
              cloud ? 'cloud_service_click' : contact ? 'business_consult_click' : undefined,
              context
            );
            assert.equal(
              link['data-rybbit-prop-source'],
              cloud ? 'footer_cloud' : contact ? 'footer_private_deploy' : undefined,
              context
            );
          });
          const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => attributes(match[0]));
          assert.equal(images.length, 8, context);
          assert.deepEqual(
            images.slice(0, 3).map(({ src, alt }) => ({ src, alt })),
            baseline.qrSources.map((src, index) => ({
              src,
              alt: baseline.text[file].slice(-4, -1)[index]
            })),
            context
          );
          anchors.slice(-5).forEach((anchor, index) => {
            const social = baseline.socials[index];
            assert.equal(links.slice(-5)[index]['aria-label'], social.label, context);
            const icon = attributes(anchor[1].match(/<img\b[^>]*>/)[0]);
            assert.equal(icon.src, social.src, context);
            assert.equal(icon.alt, '', context);
          });
          assert.match(html, /<svg\b[^>]*aria-label="FastGPT"/, context);
        }
      }
    }
  });
}
