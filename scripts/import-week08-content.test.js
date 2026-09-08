const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { buildImport, normalizePath } = require('./import-week08-content');
const { verifySource, verifyPage, verifyReturn } = require('./verify-week08-content');
const publication = require('../src/content/week08/publication.json');
const returns = require('../src/content/tech-center/stage-returns.json');
const corrections = require('../src/content/week08/publication-corrections.json');

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'week08-import-'));
  for (const page of publication.pages) {
    const file = path.join(root, page.source);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const links = Object.keys(returns).filter(
      (source) => returns[source] === `/${page.locale}${page.route}`
    );
    const originalClaims = corrections
      .filter((entry) => entry.locale === page.locale && page.route.endsWith(`/${entry.slug}`))
      .flatMap((entry) => entry.replacements.map((replacement) => replacement.before))
      .join('\n\n');
    fs.writeFileSync(
      file,
      `---\ntitle: Example article\nslug: ${
        page.route
      }\nmeta_description: Example description for a complete imported article.\n---\n\n# Example article\n\n${links
        .map((source) => `| [Article](${source}) | Area |`)
        .join('\n')}\n\n${originalClaims}\n\n## References\n`
    );
  }
  return root;
}
test('Week08 source contract preserves 38 identities and 797 existing article bodies', () => {
  assert.equal(verifySource().returns, 797);
});
test('page verification accepts React HTML attributes and checks schema canonical identity', () => {
  const route = '/guide/api-integration-acceptance';
  const page = publication.pages.find((entry) => entry.locale === 'zh' && entry.route === route);
  const canonical = `https://fastgpt.cn${route}`;
  const schema = {
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    datePublished: publication.date,
    dateModified: publication.date
  };
  const render = (article) => `
    <link rel="canonical" href="${canonical}"/>
    <link rel="alternate" hrefLang="zh-CN" href="${canonical}"/>
    <link rel="alternate" hrefLang="en" href="https://fastgpt.io${route}"/>
    <link rel="alternate" hrefLang="x-default" href="https://fastgpt.io${route}"/>
    <meta name="description" content="Enterprise API integration acceptance and regression guidance."/>
    <meta property="og:url" content="${canonical}"/>
    <meta name="robots" content="index, follow"/>
    <script type="application/ld+json">${JSON.stringify(article)}</script>
    <script type="application/ld+json">{"@type":"BreadcrumbList"}</script>
    <h1>API integration acceptance</h1><time dateTime="${publication.date}"></time>
    <a href="/guide/version-upgrade-decision">Upgrade</a>
    <a href="/guide/backup-restore-drill">Restore</a>
    <a href="/guide/observability-baseline">Observe</a><a href="/price">Pricing</a>`;
  for (const html of [render(schema), render(schema).replaceAll('hrefLang', 'hreflang')]) {
    assert.doesNotThrow(() => verifyPage(html, page, 'cn'));
  }
  assert.throws(
    () =>
      verifyPage(
        render({ ...schema, mainEntityOfPage: { '@id': 'https://example.com' } }),
        page,
        'cn'
      ),
    /article schema and dates/
  );
  assert.throws(
    () => verifyPage(render({ ...schema, url: 'https://example.com' }), page, 'cn'),
    /article schema and dates/
  );
});
test('rejects invalid public paths and wrong-locale inputs', () => {
  assert.equal(normalizePath('/zh/guide/topic', 'zh'), '/guide/topic');
  for (const invalid of ['/guide/../topic', '/guide/topic?x=1', '/en/guide/topic', '/news/topic'])
    assert.throws(() => normalizePath(invalid, 'zh'));
});
test('repeat import preserves exact generated page and relationship sets', () => {
  const root = fixture();
  try {
    const first = buildImport(root);
    const second = buildImport(root);
    assert.deepEqual(first, second);
    assert.equal(JSON.parse(first.get('src/content/week08/publication.json')).pages.length, 38);
    assert.equal(
      Object.keys(JSON.parse(first.get('src/content/tech-center/stage-returns.json'))).length,
      797
    );
    const file = path.join(root, publication.pages[0].source);
    fs.copyFileSync(file, path.join(path.dirname(file), 'duplicate.md'));
    assert.throws(() => buildImport(root), /collision/);
    fs.unlinkSync(path.join(path.dirname(file), 'duplicate.md'));
    const stage = publication.pages.find((page) =>
      page.route.endsWith('/api-authentication-issues')
    );
    const stageFile = path.join(root, stage.source);
    fs.writeFileSync(
      stageFile,
      fs
        .readFileSync(stageFile, 'utf8')
        .replace(/\[Article\]\([^)]+\)/, '[Article](/en/api/unpublished)')
    );
    assert.throws(() => buildImport(root), /Unresolved return source/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
test('observable return navigation rejects duplicates, missing and wrong-owner links', () => {
  const valid =
    '<a data-stage-return="true" href="/guide/model-serving-issues">Back to issue list</a>';
  verifyReturn(valid, '/en/model/example', '/en/guide/model-serving-issues', 'io');
  for (const html of ['', valid + valid, valid.replace('href="/', 'href="/zh/')])
    assert.throws(() =>
      verifyReturn(html, '/en/model/example', '/en/guide/model-serving-issues', 'io')
    );
});

test('rerunning an import preserves Guide entries added after the batch', () => {
  const sourceRoot = fixture();
  const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'week08-repository-'));
  try {
    const inputs = [
      'src/content/guides/registry.json',
      'src/content/guides/policy.json',
      'src/components/tech-center/entries.json',
      ...Object.values(publication.preserved).map((entry) => entry.file)
    ];
    for (const file of inputs) {
      fs.mkdirSync(path.dirname(path.join(repoRoot, file)), { recursive: true });
      fs.copyFileSync(path.join(__dirname, '..', file), path.join(repoRoot, file));
    }
    const registryPath = path.join(repoRoot, 'src/content/guides/registry.json');
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const later = { ...registry.entries[0], slug: 'later-publication' };
    registry.entries.push(later);
    fs.writeFileSync(registryPath, JSON.stringify(registry));
    const result = buildImport(sourceRoot, repoRoot);
    const updated = JSON.parse(result.get('src/content/guides/registry.json'));
    assert.deepEqual(
      updated.entries.find((entry) => entry.slug === later.slug),
      later
    );
    assert.equal(updated.entries.length, registry.entries.length);
  } finally {
    fs.rmSync(sourceRoot, { recursive: true, force: true });
    fs.rmSync(repoRoot, { recursive: true, force: true });
  }
});
