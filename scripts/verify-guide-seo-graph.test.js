const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const ROOT = process.cwd();
const registry = require('../src/content/guides/registry.json');
const {
  buildGraphContext,
  projectArticleSurface,
  projectGuideSitemap,
  verify,
  verifyGraph
} = require('./verify-guide-seo-graph');

function cloneEntries() {
  return structuredClone(registry.entries);
}

function assertFailure(run, expression) {
  assert.throws(run, expression);
}

test('full source graph accepts the approved eight-pair registry', () => {
  assert.equal(verify(), 8);
  assert.equal(verifyGraph(buildGraphContext({ entries: cloneEntries() })), 8);
});

test('sitemap projects one owned hub and eight dated articles per variant', () => {
  for (const [locale, host] of [
    ['zh', 'fastgpt.cn'],
    ['en', 'fastgpt.io']
  ]) {
    const entries = projectGuideSitemap(locale, cloneEntries());
    assert.equal(entries.length, 9, `${locale}: sitemap count`);
    assert.equal(new Set(entries.map((entry) => entry.url)).size, 9, `${locale}: sitemap uniqueness`);
    assert.equal(entries[0].url, `https://${host}/guide`, `${locale}: hub URL`);
    for (const entry of entries.slice(1)) {
      assert.match(entry.url, new RegExp(`^https://${host}/guide/[a-z0-9-]+$`));
      assert.equal(entry.lastModified, '2026-08-11');
    }
  }
});

test('registry mutations name the affected slug and surface', () => {
  const cases = [
    {
      mutate(entries) {
        entries[0].group = 'industry';
      },
      error: /saas-platform-enterprise-gaps: groups: expected 4\/1\/3/
    },
    {
      mutate(entries) {
        entries[1].en.dateModified = '2026-02-30';
      },
      error: /self-build-three-year-tco: en: dateModified: invalid ISO date/
    },
    {
      mutate(entries) {
        entries[2].zh.canonical = 'https://fastgpt.io/guide/server-sizing-guide';
      },
      error: /server-sizing-guide: zh: canonical: owned URL drift/
    },
    {
      mutate(entries) {
        entries[3].en.hreflang = entries[3].en.hreflang.replace('x-default', 'fr');
      },
      error: /complex-doc-golden-set: en: alternates: exact reciprocal cluster/
    },
    {
      mutate(entries) {
        entries[4].zh.schemaTokens = ['Article'];
      },
      error: /support-bot-four-steps: zh: schema: Article and BreadcrumbList required/
    }
  ];

  for (const { mutate, error } of cases) {
    const entries = cloneEntries();
    mutate(entries);
    assertFailure(() => verifyGraph(buildGraphContext({ entries })), error);
  }
});

test('optional article projection activates only approved required assets and configured links', () => {
  const entries = cloneEntries();
  const source = entries[0].en;
  source.assetPolicy = {
    status: 'required',
    path: '/guide-approved.png',
    alt: 'Approved guide illustration',
    width: 1200,
    height: 630
  };
  source.configuredInternalLinks = [{ label: source.sourceInternalLinkLabels[0], target: '/guide' }];

  const projection = projectArticleSurface(entries[0], 'en');
  assert.equal(projection.asset.path, '/guide-approved.png');
  assert.deepEqual(projection.links, [{ label: source.sourceInternalLinkLabels[0], target: '/guide' }]);
  assert.equal(projectArticleSurface(cloneEntries()[0], 'en').asset, undefined);
  assert.deepEqual(projectArticleSurface(cloneEntries()[0], 'en').links, []);
});

test('source mutations identify route, schema, and sitemap drift without editing repository sources', () => {
  const originalSitemap = fs.readFileSync(path.join(ROOT, 'src/app/sitemap.ts'), 'utf8');
  const context = buildGraphContext({ entries: cloneEntries() });

  assertFailure(
    () => verifyGraph({ ...context, sources: { ...context.sources, sitemap: originalSitemap.replace('guideEntries', 'guideRecords') } }),
    /sitemap: guideEntries: missing registry identity/
  );
  assertFailure(
    () => verifyGraph({ ...context, sources: { ...context.sources, hubRoute: context.sources.hubRoute.replace("'ItemList'", "'List'") } }),
    /hubs: schema: ItemList is missing/
  );
  assertFailure(
    () => verifyGraph({ ...context, sources: { ...context.sources, localizedArticleRoute: context.sources.localizedArticleRoute.replace('dynamicParams = false', 'dynamicParams = true') } }),
    /articles: localized routes: closed params are missing/
  );
  assert.equal(fs.readFileSync(path.join(ROOT, 'src/app/sitemap.ts'), 'utf8'), originalSitemap);
});
