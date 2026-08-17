const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const ROOT = path.resolve(__dirname, '..');
const registry = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src/content/guides/registry.json'), 'utf8')
);
const {
  parseArgs,
  parseDeliverySource,
  verifyGuideContent,
  verifyGuideRegistry
} = require('./verify-guide-content');

function findEntry(entries, slug) {
  return entries.find((entry) => entry.slug === slug);
}

function assertFailure(action, expression) {
  assert.throws(action, expression);
}

function withGuideRoot(slug, mutate, verify) {
  const entries = structuredClone(registry.entries);
  const entry = findEntry(entries, slug);
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-guide-content-'));
  const sources = [];

  try {
    for (const locale of ['zh', 'en']) {
      const sourcePath = path.join(ROOT, 'src/content/guides', locale, entry[locale].sourceName);
      const source = fs.readFileSync(sourcePath, 'utf8');
      const fixturePath = path.join(
        temporaryRoot,
        'src/content/guides',
        locale,
        entry[locale].sourceName
      );
      fs.mkdirSync(path.dirname(fixturePath), { recursive: true });
      fs.writeFileSync(fixturePath, mutate(locale, source));
      sources.push({ sourcePath, source });
    }
    verify({ entries, rootDir: temporaryRoot });
  } finally {
    for (const { sourcePath, source } of sources) {
      assert.equal(fs.readFileSync(sourcePath, 'utf8'), source);
    }
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

test('approved Guide corpus reports the complete 8x2 contract', () => {
  const result = spawnSync(process.execPath, ['scripts/verify-guide-content.js'], {
    cwd: ROOT,
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, 'Guide content verified: 8 slugs, 16 documents\n');
  assert.equal(result.stderr, '');
});

test('verifier imports are silent and side-effect free', () => {
  const result = spawnSync(process.execPath, ['-e', "require('./scripts/verify-guide-content.js')"], {
    cwd: ROOT,
    encoding: 'utf8'
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr, '');
});

test('CLI parser retains focused slug and locale modes', () => {
  assert.deepEqual(parseArgs(['--slug', 'server-sizing-guide']), { slug: 'server-sizing-guide' });
  assert.deepEqual(parseArgs(['--locale', 'en']), { locale: 'en' });
  assertFailure(() => parseArgs(['--locale', 'fr']), /invalid locale/);
});

test('registry rejects duplicate slugs, incomplete pairs, and invalid schemas', () => {
  const duplicate = structuredClone(registry.entries);
  duplicate.push(structuredClone(findEntry(duplicate, 'saas-platform-enterprise-gaps')));
  assertFailure(() => verifyGuideRegistry(duplicate), /saas-platform-enterprise-gaps: duplicate/);

  const incompletePair = structuredClone(registry.entries);
  delete findEntry(incompletePair, 'server-sizing-guide').en;
  assertFailure(() => verifyGuideRegistry(incompletePair), /server-sizing-guide: exact zh\/en locale pair/);

  const invalidSchema = structuredClone(registry.entries);
  findEntry(invalidSchema, 'server-sizing-guide').zh.schemaTokens = ['FAQPage'];
  assertFailure(() => verifyGuideRegistry(invalidSchema), /server-sizing-guide: zh: invalid schema/);
});

test('a required asset must be a contained public path with authored alt text', () => {
  const entries = structuredClone(registry.entries);
  findEntry(entries, 'server-sizing-guide').zh.assetPolicy = {
    status: 'required',
    path: '/guide/server-sizing-guide.png',
    alt: ''
  };

  assertFailure(() => verifyGuideRegistry(entries), /server-sizing-guide: zh: required asset/);
});

test('configured links fail with the source label for every invalid target category', () => {
  for (const target of ['', '#guide', 'https://example.com/guide/x', 'not a URL', 'https://fastgpt.io/guide/unknown']) {
    const entries = structuredClone(registry.entries);
    const snapshot = findEntry(entries, 'server-sizing-guide').zh;
    const label = snapshot.sourceInternalLinkLabels[0];
    snapshot.configuredInternalLinks = [{ label, target }];

    assertFailure(
      () => verifyGuideRegistry(entries),
      new RegExp(`server-sizing-guide: zh:${label}: invalid owned target`)
    );
  }
});

test('isolated source fixtures expose localized metadata and body suffix drift', () => {
  withGuideRoot(
    'saas-platform-enterprise-gaps',
    (locale, source) => (locale === 'en' ? source.replace('Meta title:', 'Meta title: changed ') : source),
    ({ entries, rootDir }) => {
      assertFailure(
        () => verifyGuideContent({ slug: 'saas-platform-enterprise-gaps' }, { entries, rootDir }),
        /saas-platform-enterprise-gaps: metadata/
      );
    }
  );

  withGuideRoot(
    'saas-platform-enterprise-gaps',
    (locale, source) => (locale === 'en' ? `${source}changed body suffix` : source),
    ({ entries, rootDir }) => {
      assertFailure(
        () => verifyGuideContent({ slug: 'saas-platform-enterprise-gaps' }, { entries, rootDir }),
        /saas-platform-enterprise-gaps: body differs/
      );
    }
  );
});

test('delivery parser rejects each malformed leading-comment boundary', () => {
  const entry = findEntry(registry.entries, 'saas-platform-enterprise-gaps');
  const source = fs.readFileSync(
    path.join(ROOT, 'src/content/guides/en', entry.en.sourceName),
    'utf8'
  );
  const expected = { ...entry.en, slug: entry.slug };
  const malformedSources = [
    `\n${source}`,
    source.replace('-->', ''),
    source.replace('-->\n\n#', '-->\n<!-- second -->\n#')
  ];

  for (const malformed of malformedSources) {
    assertFailure(
      () => parseDeliverySource(malformed, expected),
      /saas-platform-enterprise-gaps: .*delivery comment/
    );
  }
  assert.equal(
    crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, 'src/content/guides/en', entry.en.sourceName))).digest('hex'),
    entry.en.sourceSha256
  );
});
