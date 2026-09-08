const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { getPublishedFaqIds, getTechIdentities } = require('./lib/redirects');
const { getDefaultLocale, resolveSiteVariant } = require('./lib/site-variant');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'out');

const surfaces = {
  guide: {
    consultSource: 'guide_article_sidebar_consult',
    trialSource: 'guide_article_sidebar_trial',
    requiresCategory: false
  },
  tech: {
    consultSource: 'tech_article_sidebar_consult',
    trialSource: 'tech_article_sidebar_trial',
    requiresCategory: true
  },
  faq: {
    consultSource: 'faq_detail_sidebar_consult',
    trialSource: 'faq_detail_sidebar_trial',
    requiresCategory: true
  }
};

function walkHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkHtmlFiles(filePath);
    return entry.isFile() && entry.name.endsWith('.html') ? [filePath] : [];
  });
}

function routeFromFile(filePath) {
  const relative = path.relative(outDir, filePath).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'/index.html'.length)}`;
  return `/${relative.slice(0, -'.html'.length)}`;
}

function resolveHtmlPath(route) {
  const relative = route.replace(/^\/+|\/+$/g, '');
  return [path.join(outDir, `${relative}.html`), path.join(outDir, relative, 'index.html')].find(
    (candidate) => fs.existsSync(candidate)
  );
}

function findAnchors(html, source) {
  return [
    ...html.matchAll(new RegExp(`<a\\b[^>]*data-rybbit-prop-source="${source}"[^>]*>`, 'gi'))
  ].map((match) => ({ tag: match[0], index: match.index ?? -1 }));
}

function getAttribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];
}

function expectedContactHref(locale, defaultLocale) {
  const contactLocale = locale === 'zh' || locale === 'zh-hant' ? locale : 'en';
  return contactLocale === defaultLocale ? '/contact' : `/${contactLocale}/contact`;
}

function addPage(
  pages,
  surface,
  route,
  locale,
  slug = decodeURIComponent(route.split('/').pop())
) {
  pages.set(route, { surface, route, locale, slug });
}

function getExpectedTechPages(variant) {
  const defaultLocale = getDefaultLocale(variant);

  return getTechIdentities(root).flatMap((identity) => {
    if (variant === 'preview') {
      return [{ route: identity.sourcePath, ...identity }];
    }
    return identity.locale === defaultLocale
      ? [{ route: identity.canonicalPath, ...identity }]
      : [];
  });
}

function getExpectedPages(variant) {
  const defaultLocale = getDefaultLocale(variant);
  const pages = new Map();
  const faqIds = getPublishedFaqIds(root)[defaultLocale === 'zh' ? 'chinese' : 'english'];
  const guideSlugs = JSON.parse(
    fs.readFileSync(path.join(root, 'src/content/guides/registry.json'), 'utf8')
  ).entries.map((entry) => entry.slug);
  const guideLocales = JSON.parse(
    fs.readFileSync(path.join(root, 'src/content/guides/policy.json'), 'utf8')
  ).locales;

  for (const slug of faqIds) addPage(pages, 'faq', `/faq/${slug}`, defaultLocale);
  for (const slug of guideSlugs) {
    if (variant === 'preview') {
      for (const locale of guideLocales) {
        addPage(pages, 'guide', `/${locale}/guide/${slug}`, locale);
      }
    } else {
      addPage(pages, 'guide', `/guide/${slug}`, defaultLocale);
    }
  }

  for (const page of getExpectedTechPages(variant)) {
    addPage(pages, 'tech', page.route, page.locale, page.sourcePath);
  }

  for (const filePath of walkHtmlFiles(outDir)) {
    const route = routeFromFile(filePath);
    const match = route.match(/^\/(?:([^/]+)\/)?(faq|guide)\/[^/]+$/);
    if (match) addPage(pages, match[2], route, match[1] || defaultLocale);
  }

  return { defaultLocale, pages: [...pages.values()] };
}

function verifyPage(page, defaultLocale) {
  const config = surfaces[page.surface];
  const htmlPath = resolveHtmlPath(page.route);
  assert(htmlPath, `Missing ${page.surface} HTML: ${page.route}`);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const consultAnchors = findAnchors(html, config.consultSource);
  const trialAnchors = findAnchors(html, config.trialSource);

  assert.equal(consultAnchors.length, 1, `${page.route} consult CTA count`);
  assert.equal(trialAnchors.length, 1, `${page.route} trial CTA count`);
  const consult = consultAnchors[0];
  const trial = trialAnchors[0];
  assert(consult.index < trial.index, `${page.route} consult CTA must precede trial CTA`);

  const contactHref = expectedContactHref(page.locale, defaultLocale);
  assert.equal(getAttribute(consult.tag, 'href'), contactHref, `${page.route} contact href`);
  assert(resolveHtmlPath(contactHref), `${page.route} contact target is missing`);
  assert.equal(getAttribute(consult.tag, 'data-rybbit-event'), 'business_consult_click');
  assert.equal(getAttribute(trial.tag, 'data-rybbit-event'), 'cloud_service_click');

  const trialHref = getAttribute(trial.tag, 'href');
  assert(trialHref, `${page.route} trial href is empty`);
  const trialUrl = new URL(trialHref);
  assert(
    ['http:', 'https:'].includes(trialUrl.protocol) && trialUrl.hostname,
    `${page.route} trial href`
  );

  for (const anchor of [consult, trial]) {
    assert.equal(
      getAttribute(anchor.tag, 'data-rybbit-prop-slug'),
      page.slug,
      `${page.route} slug`
    );
    if (config.requiresCategory) {
      assert(getAttribute(anchor.tag, 'data-rybbit-prop-category'), `${page.route} category`);
    }
  }
}

test('production Technical expectations follow Site Variant locale ownership', () => {
  const identities = getTechIdentities(root);

  for (const variant of ['cn', 'io']) {
    const defaultLocale = getDefaultLocale(variant);
    const actual = getExpectedTechPages(variant)
      .map((page) => page.route)
      .sort();
    const expected = identities
      .filter((identity) => identity.locale === defaultLocale)
      .map((identity) => identity.canonicalPath)
      .sort();

    assert.deepEqual(actual, expected, `${variant} Technical routes`);
  }
});

test('every exported content detail has a consultation-first attributed sidebar CTA', () => {
  assert(fs.existsSync(outDir), `Missing static export: ${outDir}`);
  const variant = resolveSiteVariant();
  const { defaultLocale, pages } = getExpectedPages(variant);
  for (const page of pages) verifyPage(page, defaultLocale);
});
