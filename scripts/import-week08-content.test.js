const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { buildImport, normalizePath, technicalDocument } = require('./import-week08-content');
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
    const descriptions = {
      'error-codes-reference':
        'A grouped reference of the 123 error codes defined in the FastGPT open-source repository, with the numeric code, statusText and message key.',
      'workflow-nodes-reference':
        'A grouped reference of the 32 workflow nodes defined in the FastGPT open-source repository, with node type, tool support and parameter counts.'
    };
    const description =
      (page.locale === 'en' && descriptions[page.route.split('/').at(-1)]) ||
      'Example description for a complete imported article.';
    fs.writeFileSync(
      file,
      `---\ntitle: Example article\nslug: ${
        page.route
      }\nmeta_description: ${description}\n---\n\n# Example article\n\n${links
        .map((source) => `| [Article](${source}) | Area |`)
        .join('\n')}\n\n${originalClaims}\n\n## References\n`
    );
  }
  return root;
}
test('rejects invalid public paths and wrong-locale inputs', () => {
  assert.equal(normalizePath('/zh/guide/topic', 'zh'), '/guide/topic');
  for (const invalid of ['/guide/../topic', '/guide/topic?x=1', '/en/guide/topic', '/news/topic'])
    assert.throws(() => normalizePath(invalid, 'zh'));
});
test('repeat import preserves exact generated page and relationship sets', () => {
  const root = fixture();
  try {
    const first = buildImport(root);
    const repo = fs.mkdtempSync(path.join(root, 'applied-'));
    for (const [file, content] of first) {
      const target = path.join(repo, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, content);
    }
    const second = buildImport(root, repo);
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
test('rerunning an import preserves Guide entries added after the batch', () => {
  const sourceRoot = fixture();
  const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'week08-repository-'));
  try {
    const inputs = [
      'src/content/guides/registry.json',
      'src/content/guides/policy.json',
      'src/components/tech-center/entries.json'
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

test('unrelated numeric descriptions survive import and reference corrections reject drift', () => {
  const description = 'Check 32-bit images and code 501230 against version 4.32.0.';
  for (const locale of ['zh', 'en']) {
    const page = {
      locale,
      slug: 'model-serving-issues',
      route: '/guide/model-serving-issues',
      body: '# Model serving\n',
      metadata: { meta_description: description }
    };
    assert.equal(technicalDocument(page).projection.summary, description);
    if (locale === 'en') {
      for (const slug of ['error-codes-reference', 'workflow-nodes-reference'])
        assert.throws(
          () => technicalDocument({ ...page, slug, route: `/reference/${slug}` }),
          /description source changed/
        );
    }
  }
});
