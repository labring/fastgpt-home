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
    for (const registeredEntry of entries) {
      for (const locale of ['zh', 'en']) {
        const asset = registeredEntry[locale].assetPolicy;
        if (asset.status !== 'required') continue;
        const sourceAsset = path.join(ROOT, 'public', asset.path);
        const fixtureAsset = path.join(temporaryRoot, 'public', asset.path);
        fs.mkdirSync(path.dirname(fixtureAsset), { recursive: true });
        fs.copyFileSync(sourceAsset, fixtureAsset);
      }
    }
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

test('approved Guide corpus reports the complete 16x2 contract', () => {
  const result = spawnSync(process.execPath, ['scripts/verify-guide-content.js'], {
    cwd: ROOT,
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, 'Guide content verified: 16 slugs, 32 documents\n');
  assert.equal(result.stderr, '');
});

test('Finance Research and Daily Report pairs are complete authorized industry Guides', () => {
  for (const [slug, topic] of [
    ['finance-research-retrieval', /financial research|研报检索/i],
    ['finance-daily-report-automation', /financial|财报|数据播报/i]
  ]) {
    const entry = findEntry(registry.entries, slug);
    assert(entry, `${slug} must be registered`);
    assert.equal(entry.group, 'industry');
    assert.deepEqual(entry.en.schemaTokens, ['Article', 'BreadcrumbList']);
    assert.deepEqual(entry.zh.schemaTokens, ['Article', 'BreadcrumbList']);
    for (const locale of ['zh', 'en']) {
      assert.equal(entry[locale].assetPolicy.status, 'required');
      assert.equal(entry[locale].assetPolicy.width, 1200);
      assert.equal(entry[locale].assetPolicy.height, 630);
      assert.equal(entry[locale].configuredInternalLinks.length, 3);
      const sourcePath = path.join(ROOT, 'src/content/guides', locale, entry[locale].sourceName);
      const { body } = parseDeliverySource(
        fs.readFileSync(sourcePath, 'utf8'),
        { ...entry[locale], slug: entry.slug }
      );
      assert.match(body, topic);
      assert.match(body, /## References/);
      assert.match(body, /\[[^\]]+\]\(https:\/\/[^)]+\)/);
      assert.doesNotMatch(body, /KB|核验日|verified on|```mermaid/i);
    }
  }
});

test('POC tracer is a complete bilingual decision Guide with a real step contract', () => {
  const entry = findEntry(registry.entries, 'poc-30-day-design');
  assert(entry, 'poc-30-day-design must be registered');
  assert.equal(entry.group, 'decision');
  assert.deepEqual(entry.en.schemaTokens, ['HowTo', 'Article', 'BreadcrumbList']);
  assert.deepEqual(entry.zh.schemaTokens, ['HowTo', 'Article', 'BreadcrumbList']);

  for (const locale of ['zh', 'en']) {
    assert.equal(entry[locale].assetPolicy.status, 'requested-unapproved');
    assert.equal(entry[locale].configuredInternalLinks.length, 3);
    const sourcePath = path.join(ROOT, 'src/content/guides', locale, entry[locale].sourceName);
    const source = fs.readFileSync(sourcePath, 'utf8');
    const { body } = parseDeliverySource(source, { ...entry[locale], slug: entry.slug });

    assert.match(body, /\n1\.\s+/);
    assert.match(body, /## References/);
    assert.match(body, /\[[^\]]+\]\(https:\/\/[^)]+\)/);
    assert.doesNotMatch(body, /KB 5\.1|核验日|verified on \*\*2026-07-20\*\*/i);
    assert.doesNotMatch(body, /```mermaid/);
  }
});

test('Database and Human Review pairs are complete bilingual implementation Guides', () => {
  const expected = [
    ['database-qa-integration-guide', /database|数据库/i],
    ['scheduled-report-automation', /human review|人工审核/i]
  ];

  for (const [slug, topic] of expected) {
    const entry = findEntry(registry.entries, slug);
    assert(entry, `${slug} must be registered`);
    assert.equal(entry.group, 'implementation');
    assert.deepEqual(entry.en.schemaTokens, ['HowTo', 'Article', 'BreadcrumbList']);
    assert.deepEqual(entry.zh.schemaTokens, ['HowTo', 'Article', 'BreadcrumbList']);

    for (const locale of ['zh', 'en']) {
      assert.equal(entry[locale].assetPolicy.status, 'none');
      assert.equal(entry[locale].configuredInternalLinks.length, 3);
      const sourcePath = path.join(ROOT, 'src/content/guides', locale, entry[locale].sourceName);
      const { body } = parseDeliverySource(
        fs.readFileSync(sourcePath, 'utf8'),
        { ...entry[locale], slug: entry.slug }
      );

      assert.match(body, topic);
      assert.match(body, /## References/);
      assert.match(body, /\[[^\]]+\]\(https:\/\/[^)]+\)/);
      assert.doesNotMatch(body, /```mermaid|KB 2\.3|核验日|verified on \*\*2026-07-20\*\*/i);
    }
  }
});

test('verifier imports are silent and side-effect free', () => {
  const result = spawnSync(
    process.execPath,
    ['-e', "require('./scripts/verify-guide-content.js')"],
    {
      cwd: ROOT,
      encoding: 'utf8'
    }
  );

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
  assertFailure(
    () => verifyGuideRegistry(incompletePair),
    /server-sizing-guide: exact zh\/en locale pair/
  );

  const invalidSchema = structuredClone(registry.entries);
  findEntry(invalidSchema, 'server-sizing-guide').zh.schemaTokens = ['FAQPage'];
  assertFailure(
    () => verifyGuideRegistry(invalidSchema),
    /server-sizing-guide: zh: invalid schema/
  );
});

test('registry enforces slug-locale source filenames', () => {
  const entries = structuredClone(registry.entries);
  findEntry(entries, 'server-sizing-guide').zh.sourceName = 'legacy-server-sizing.zh.md';
  assertFailure(
    () => verifyGuideRegistry(entries),
    /server-sizing-guide: zh: sourceName must be server-sizing-guide\.zh\.md/
  );
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

test('registry requires approved publication groups and release dates', () => {
  const entry = findEntry(registry.entries, 'saas-platform-enterprise-gaps');
  assert.equal(entry.group, 'decision');
  assert.equal(entry.zh.datePublished, '2026-08-11');
  assert.equal(entry.en.dateModified, '2026-08-20');

  const invalidGroup = structuredClone(registry.entries);
  findEntry(invalidGroup, 'saas-platform-enterprise-gaps').group = 'unknown';
  assertFailure(() => verifyGuideRegistry(invalidGroup), /invalid publication group/);

  const invalidDate = structuredClone(registry.entries);
  findEntry(invalidDate, 'saas-platform-enterprise-gaps').zh.datePublished = '2026-02-30';
  assertFailure(() => verifyGuideRegistry(invalidDate), /invalid datePublished/);
});

test('English Guide metadata stays within complete search-snippet boundaries', () => {
  const shortTitle = structuredClone(registry.entries);
  findEntry(shortTitle, 'server-sizing-guide').en.metaTitle = 'Short title';
  assertFailure(
    () => verifyGuideRegistry(shortTitle),
    /server-sizing-guide: en: invalid meta title/
  );

  const unfinishedDescription = structuredClone(registry.entries);
  findEntry(unfinishedDescription, 'server-sizing-guide').en.metaDescription =
    'A'.repeat(149) + ' and';
  assertFailure(
    () => verifyGuideRegistry(unfinishedDescription),
    /server-sizing-guide: en: invalid meta description/
  );
});

test('required assets need positive responsive dimensions', () => {
  const entries = structuredClone(registry.entries);
  findEntry(entries, 'server-sizing-guide').zh.assetPolicy = {
    status: 'required',
    path: '/logo.svg',
    alt: 'FastGPT logo',
    width: 0,
    height: 640
  };

  assertFailure(() => verifyGuideRegistry(entries), /positive dimensions/);
});

test('configured links fail with the source label for every invalid target category', () => {
  for (const target of [
    '',
    '#guide',
    'https://example.com/guide/x',
    'not a URL',
    'https://fastgpt.io/guide/unknown'
  ]) {
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
    (locale, source) =>
      locale === 'en' ? source.replace('Meta title:', 'Meta title: changed ') : source,
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
    source.replace(/-->\r?\n\r?\n#/, '-->\n<!-- second -->\n#')
  ];

  for (const malformed of malformedSources) {
    assertFailure(
      () => parseDeliverySource(malformed, expected),
      /saas-platform-enterprise-gaps: .*delivery comment/
    );
  }
  const normalizedSource = fs
    .readFileSync(path.join(ROOT, 'src/content/guides/en', entry.en.sourceName), 'utf8')
    .replace(/\r\n?/g, '\n');
  assert.equal(
    crypto.createHash('sha256').update(normalizedSource).digest('hex'),
    entry.en.sourceSha256
  );
});

test('LF and CRLF delivery sources share one normalized source hash', () => {
  const entry = findEntry(registry.entries, 'server-sizing-guide');
  const source = fs.readFileSync(
    path.join(ROOT, 'src/content/guides/en', entry.en.sourceName),
    'utf8'
  );
  const lfSource = source.replace(/\r\n?/g, '\n');
  const sourceSha256 = crypto.createHash('sha256').update(lfSource).digest('hex');
  const expected = { ...entry.en, slug: entry.slug, sourceSha256 };

  assert.deepEqual(
    parseDeliverySource(lfSource, expected),
    parseDeliverySource(lfSource.replace(/\n/g, '\r\n'), expected)
  );
});
