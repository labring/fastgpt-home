const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { stripTypeScriptTypes } = require('node:module');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const footer = read('src/components/home/Footer.tsx');
const columns = footer.slice(footer.indexOf('type ColumnLink'), footer.indexOf('function buildQrs'));
const navigation = read('src/lib/clientNavigation.ts').replaceAll('export ', '');
const locales = read('src/lib/locales.ts')
  .replace(/^import .*;\n/m, '')
  .replaceAll('export ', '');

test('footer links every locale to a published technical center on both sites', () => {
  const manifest = JSON.parse(read('src/config/site-routing.json'));
  for (const variant of ['io', 'cn']) {
    const context = {
      process: { env: { NEXT_PUBLIC_SITE_VARIANT: variant } },
      siteRoutingManifest: manifest,
      siteConfig: { userUrl: 'https://cloud.fastgpt.io' },
      getContactPublishedLocale: () => 'en',
      getGuideReviewPath: () => '/guide'
    };
    vm.createContext(context);
    vm.runInContext(stripTypeScriptTypes(`${locales}\n${navigation}\n${columns}`), context);
    for (const locale of Object.keys(manifest.locales)) {
      const dictionary = JSON.parse(read(`src/locales/${locale}.json`));
      const copy = dictionary.Home.footer.columns;
      const links = context.buildColumns(copy, locale).flatMap((column) => column.items);
      const techLinks = links.filter((link) => link.label === copy.links.items.tech);
      const publishedLocale = locale === 'zh' ? 'zh' : 'en';
      const defaultLocale = variant === 'cn' ? 'zh' : 'en';
      assert.equal(techLinks.length, 1, `${variant}/${locale}: technical center entry`);
      assert.equal(
        techLinks[0].href,
        publishedLocale === defaultLocale ? '/tech-center' : `/${publishedLocale}/tech-center`,
        `${variant}/${locale}: published route`
      );
      assert.equal(techLinks[0].external, false);
    }
  }
});
