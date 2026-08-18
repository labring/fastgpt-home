const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const {
  getDefaultLocale,
  getPublishedLocaleCodes,
  resolveSiteVariant
} = require('./lib/site-variant');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'out');

const titles = {
  en: 'Contact FastGPT Sales',
  zh: 'FastGPT 商务咨询',
  'zh-hant': 'FastGPT 商務諮詢'
};
const variant = resolveSiteVariant();
const defaultLocale = getDefaultLocale(variant);
const publishedLocales = getPublishedLocaleCodes(variant);
const contactLocales = publishedLocales.filter((locale) => titles[locale]);

function resolveHtmlPath(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  const candidates = relativeRoute
    ? [path.join(output, `${relativeRoute}.html`), path.join(output, relativeRoute, 'index.html')]
    : [path.join(output, 'index.html')];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function resolveHtml(route) {
  const htmlPath = resolveHtmlPath(route);
  assert(htmlPath, `Missing static HTML for ${route}`);
  return fs.readFileSync(htmlPath, 'utf8');
}

function getContactHrefs(html) {
  return [...html.matchAll(/href="([^"]*\/contact(?:[?#][^"]*)?)"/g)].map((match) => match[1]);
}

function getExpectedContactRoute(locale) {
  const contactLocale = locale === 'zh' || locale === 'zh-hant' ? locale : 'en';
  return contactLocale === defaultLocale ? '/contact' : `/${contactLocale}/contact`;
}

async function verifyContactQueryFlow() {
  const { appendForwardedAttributionQuery, getForwardedAttributionQuery } = await import(
    pathToFileURL(path.join(root, 'src/lib/attribution/query.mjs')).href
  );
  const contactSource = fs.readFileSync(path.join(root, 'src/lib/contact.ts'), 'utf8');
  const formSource = fs.readFileSync(
    path.join(root, 'src/components/contact/ContactForm.tsx'),
    'utf8'
  );
  const attributionSource = fs.readFileSync(path.join(root, 'src/lib/leadAttribution.ts'), 'utf8');
  const contactLinkScriptSource = fs.readFileSync(
    path.join(root, 'src/lib/contactLinkAttribution.ts'),
    'utf8'
  );

  assert.match(
    contactSource,
    /appendForwardedAttributionQuery\(path, search\)/,
    'Contact URL helper must use the shared query-forwarding helper'
  );
  assert.match(
    contactLinkScriptSource,
    /document\.addEventListener\('pointerdown'/,
    'Contact links must preserve attribution before React hydration'
  );
  assert.match(
    formSource,
    /source:\s*getSubmissionSource\(\)/,
    'Contact submission must send the current explicit source'
  );
  assert.match(
    attributionSource,
    /new URLSearchParams\(window\.location\.search\)\.get\('source'\)/,
    'Submission source must come from the current landing URL'
  );

  const landingQuery =
    'source=partner&utm_source=google&utm_campaign=launch&click_id=abc123&email=drop-me';
  assert.equal(
    getForwardedAttributionQuery(landingQuery),
    'source=partner&utm_source=google&utm_campaign=launch&click_id=abc123',
    'Contact query forwarding must preserve approved attribution values only'
  );
  assert.equal(
    appendForwardedAttributionQuery('/zh-hant/contact#consultation', landingQuery),
    '/zh-hant/contact?source=partner&utm_source=google&utm_campaign=launch&click_id=abc123#consultation',
    'Contact query forwarding must preserve the localized path and hash'
  );
  assert.equal(
    new URLSearchParams(getForwardedAttributionQuery(landingQuery)).has('email'),
    false,
    'Contact query forwarding must remove unrelated values'
  );
  assert.equal(
    new URLSearchParams(getForwardedAttributionQuery(`source=${'x'.repeat(200)}`)).get('source')
      ?.length,
    128,
    'Contact query forwarding must enforce the source field cap'
  );
}

function verifyBuiltResourcePolicy() {
  const forbiddenResources = [
    'fael3z0zfze.feishu.cn/share/base/form',
    'picsum.photos',
    'api.fontshare.com'
  ];
  const serviceAssetLanguages = ['en', 'zh'];
  for (const language of serviceAssetLanguages) {
    let totalBytes = 0;
    for (let index = 1; index <= 4; index += 1) {
      const assetPath = path.join(
        root,
        'public/images/home/solutions/sol-i18n',
        `sol${index}-${language}.webp`
      );
      assert(fs.existsSync(assetPath), `Missing local Contact service asset: ${assetPath}`);
      const size = fs.statSync(assetPath).size;
      assert(size <= 250 * 1024, `${path.relative(root, assetPath)} exceeds the 250 KB asset limit`);
      totalBytes += size;
    }
    assert(
      totalBytes <= 800 * 1024,
      `Contact service assets for ${language} exceed the 800 KB total limit`
    );
  }
  const outputFiles = [];

  function collectFiles(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        collectFiles(target);
      } else if (/\.(?:css|html|js|json|map|txt)$/.test(entry.name)) {
        outputFiles.push(target);
      }
    }
  }

  collectFiles(output);
  for (const file of outputFiles) {
    const content = fs.readFileSync(file, 'utf8');
    for (const resource of forbiddenResources) {
      assert(!content.includes(resource), `${path.relative(root, file)} contains ${resource}`);
    }
  }
}

function verifyCrmState() {
  const defaultContactHtml = resolveHtml('/contact');
  const hasExplicitCrmEnv = Object.prototype.hasOwnProperty.call(process.env, 'NEXT_PUBLIC_CRM_API_URL');
  const crmConfigured = Boolean(process.env.NEXT_PUBLIC_CRM_API_URL?.trim());
  const isPreview = variant === 'preview';
  const hasConfigError = defaultContactHtml.includes('data-crm-config-error');
  const hasPreviewNotice = defaultContactHtml.includes('data-crm-preview="true"');
  const hasForm = defaultContactHtml.includes('<form');

  assert(!(hasConfigError && hasPreviewNotice), 'Contact page exposes conflicting CRM states');

  if (hasExplicitCrmEnv && crmConfigured) {
    assert(hasForm, 'Configured Contact page is missing its form');
    assert(!hasConfigError, 'Configured CRM still shows config error');
    assert(!hasPreviewNotice, 'Configured CRM still shows preview-only state');
    return;
  }

  if (hasExplicitCrmEnv && !crmConfigured && isPreview) {
    assert(hasForm, 'Preview Contact page is missing its form');
    assert(hasPreviewNotice, 'Preview Contact page is missing its disabled CRM notice');
    return;
  }

  if (hasExplicitCrmEnv && !crmConfigured) {
    assert(hasConfigError, 'Production Contact page must expose the missing CRM configuration error');
    return;
  }

  assert(
    hasForm || hasConfigError || hasPreviewNotice,
    'Contact page does not expose a recognizable CRM state'
  );
}

function getContactPath(href) {
  if (!href || href.startsWith('#') || /^(?:https?:|\/\/|mailto:|tel:|javascript:)/i.test(href)) {
    return null;
  }

  const [withoutHash] = href.split('#', 1);
  const [pathname] = withoutHash.split('?', 1);
  return /(?:^|\/)contact(?:\/embed)?\/?$/.test(pathname) ? pathname : null;
}

function verifyAllBuiltContactLinks() {
  const htmlFiles = [];

  function collectHtmlFiles(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) collectHtmlFiles(target);
      else if (entry.name.endsWith('.html')) htmlFiles.push(target);
    }
  }

  collectHtmlFiles(output);
  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(/href="([^"]+)"/g)) {
      const contactPath = getContactPath(match[1]);
      if (!contactPath) continue;
      assert(
        resolveHtmlPath(contactPath),
        `${path.relative(root, file)} points to missing Contact HTML at ${contactPath}`
      );
    }
  }
}

function verifyContactEmbedRoutes() {
  const embedSourcePaths = [
    path.join(root, 'src/app/contact/embed/page.tsx'),
    path.join(root, 'src/app/[lang]/contact/embed/page.tsx')
  ];
  for (const sourcePath of embedSourcePaths) {
    const source = fs.readFileSync(sourcePath, 'utf8');
    assert.match(
      source,
      /<ContactForm locale=\{locale\} variant="modal" \/>/,
      `${path.relative(root, sourcePath)} must render the Contact form`
    );
  }

  const buildLocales = contactLocales.filter((locale) => locale !== defaultLocale);
  if (buildLocales.length === 0) buildLocales.push(defaultLocale);
  const routes = ['/contact/embed', ...buildLocales.map((locale) => `/${locale}/contact/embed`)];

  for (const route of routes) {
    const html = resolveHtml(route);
    assert(html.includes('data-contact-embed="true"'), `${route} is missing its embed marker`);
    // ContactForm is a client component, so its form element is not present in static HTML.
    assert(!html.includes('data-published-locales'), `${route} must not render the site Navbar`);
  }
}

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(target);
    return /\.(?:ts|tsx)$/.test(entry.name) ? [target] : [];
  });
}

async function main() {
  const pages = [
    ['contact.html', titles[defaultLocale] || titles.en],
    ...contactLocales
      .filter((locale) => locale !== defaultLocale)
      .map((locale) => [`${locale}/contact.html`, titles[locale] || titles.en])
  ];

  for (const [file, title] of pages) {
    const content = fs.readFileSync(path.join(output, file), 'utf8');
    assert.match(content, new RegExp(title), `${file} is missing its localized title`);
    assert.ok(
      content.includes('rgba(59,130,246,0.12)'),
      `${file} is missing the unified contact hero treatment`
    );
    assert.ok(
      !content.includes('rgba(251,208,223'),
      `${file} still contains the legacy purple contact treatment`
    );
  }

  const homepageRoutes = publishedLocales.map((locale) => ({
    locale,
    route: locale === defaultLocale ? '/' : `/${locale}`
  }));

  for (const { locale, route } of homepageRoutes) {
    const content = resolveHtml(route);
    const expectedHref = getExpectedContactRoute(locale);
    const contactHrefs = getContactHrefs(content);
    assert(contactHrefs.length > 0, `${route} is missing a Contact CTA`);
    assert(
      contactHrefs.every((href) => href === expectedHref),
      `${route} contains an unreachable Contact href: ${contactHrefs.join(', ')}`
    );
    assert(
      resolveHtmlPath(expectedHref),
      `${route} points to missing static HTML at ${expectedHref}`
    );
  }

  for (const file of sourceFiles(path.join(root, 'src'))) {
    const content = fs.readFileSync(file, 'utf8');
    for (const resource of [
      'fael3z0zfze.feishu.cn/share/base/form',
      'picsum.photos',
      'api.fontshare.com'
    ]) {
      assert(
        !content.includes(resource),
        `${path.relative(root, file)} still references ${resource}`
      );
    }
  }

  await verifyContactQueryFlow();
  verifyBuiltResourcePolicy();
  verifyCrmState();
  verifyAllBuiltContactLinks();
  verifyContactEmbedRoutes();

  console.log(
    `Contact page verification passed: ${pages.length} routes, ${homepageRoutes.length} localized entry paths, all Contact links, embeds, CRM state and attribution flow verified.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
