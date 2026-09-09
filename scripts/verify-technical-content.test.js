const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const {
  assertDeniedIdentitiesAbsent,
  buildImportPlan,
  buildSearchProjection,
  foldIdentity,
  validateIdentitySet,
  verifyImportPlanNoDrift,
  verifyTechnicalContent,
  writeImportPlan
} = require('./import-technical-content');

const root = path.resolve(__dirname, '..');
const fixture = path.join(root, 'scripts/fixtures/technical-page-delivery');

test('representative delivery normalizes the canonical path and body', () => {
  const plan = buildImportPlan({ repoRoot: root, sourcePath: fixture });
  const openSandbox = plan.pages.find(
    (page) => page.source.file === 'reference/fastgpt-opensandbox-env-config.md'
  );
  const secretPage = plan.pages.find(
    (page) => page.identity.canonicalPath === '/reference/fastgpt-chatglm2-m3e-api-test'
  );

  assert.equal(plan.pages.length, 3);
  assert.deepEqual(
    plan.pages.map((page) => page.operation),
    ['update', 'update', 'update']
  );
  assert.equal(openSandbox.identity.canonicalPath, '/reference/fastgpt-opensandbox-env-config');
  assert.equal(
    plan.pages.filter((page) =>
      page.identity.canonicalPath.endsWith('fastgpt-opensandbox-env-config')
    ).length,
    2
  );
  assert.match(secretPage.normalizedDocument, /YOUR_API_KEY/);
  assert.doesNotMatch(secretPage.normalizedDocument, /sk-aaabbb/);
  assert.equal(plan.denials.length, 1);
});

test('normalizes bare source citations into descriptive Markdown links', () => {
  const tempSource = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-content-delivery-'));
  fs.cpSync(fixture, tempSource, { recursive: true });
  const sourceFile = path.join(tempSource, 'reference/fastgpt-opensandbox-env-config.md');
  const source = fs.readFileSync(sourceFile, 'utf8');
  fs.writeFileSync(
    sourceFile,
    source.replace(/> 来源：\[[^\]]+\]\((https:\/\/[^)]+)\)/, '> 来源：$1')
  );

  const plan = buildImportPlan({ repoRoot: root, sourcePath: tempSource });
  const page = plan.pages.find(
    (candidate) => candidate.identity.canonicalPath === '/reference/fastgpt-opensandbox-env-config'
  );

  assert.match(page.normalizedDocument, /> 来源：\[FastGPT 官方文档\]\(https:\/\/doc\.fastgpt\.cn/);
});

test('redacts FastGPT API credentials during import', () => {
  const tempSource = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-content-credential-'));
  try {
    fs.cpSync(fixture, tempSource, { recursive: true });
    const sourceFile = path.join(tempSource, 'reference/fastgpt-opensandbox-env-config.md');
    const credential = `fastgpt-${'A'.repeat(48)}`;
    fs.appendFileSync(sourceFile, `\nAuthorization: Bearer ${credential}\n`);
    const plan = buildImportPlan({ repoRoot: root, sourcePath: tempSource });
    const page = plan.pages.find(
      (candidate) => candidate.source.file === 'reference/fastgpt-opensandbox-env-config.md'
    );
    assert(page.normalizedDocument.includes('Authorization: Bearer YOUR_API_KEY'));
    assert(!page.normalizedDocument.includes(credential));
  } finally {
    fs.rmSync(tempSource, { recursive: true, force: true });
  }
});

test('normalizes structural escaped line endings', () => {
  const tempSource = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-content-delivery-'));
  fs.cpSync(fixture, tempSource, { recursive: true });
  const sourceFile = path.join(tempSource, 'reference/fastgpt-opensandbox-env-config.md');
  const source = fs.readFileSync(sourceFile, 'utf8');
  fs.writeFileSync(
    sourceFile,
    source.replace('## 具体配置\n\n', '## 环境变量配置\\n\\n## 具体配置\n\n')
  );

  const plan = buildImportPlan({ repoRoot: root, sourcePath: tempSource });
  const page = plan.pages.find(
    (candidate) => candidate.identity.canonicalPath === '/reference/fastgpt-opensandbox-env-config'
  );

  assert.match(page.normalizedDocument, /## 环境变量配置\n\n## 具体配置/);
});

test('identity folding rejects full-identity collisions and permits repeated final slugs', () => {
  assert.equal(
    foldIdentity({ locale: 'ZH', canonicalPath: '/Reference/Example' }),
    'zh|/reference/example'
  );
  assert.notEqual(
    foldIdentity({ locale: 'zh', canonicalPath: '/deploy/example' }),
    foldIdentity({ locale: 'zh', canonicalPath: '/reference/example' })
  );
  assert.equal(
    foldIdentity({ locale: 'de', canonicalPath: '/straße/example' }),
    foldIdentity({ locale: 'DE', canonicalPath: '/STRASSE/example' })
  );
  assert.doesNotThrow(() =>
    validateIdentitySet([
      { locale: 'zh', canonicalPath: '/deploy/example' },
      { locale: 'zh', canonicalPath: '/reference/example' }
    ])
  );
  assert.throws(
    () =>
      validateIdentitySet([
        { locale: 'zh', canonicalPath: '/reference/example' },
        { locale: 'zh', canonicalPath: '/ｒｅｆｅｒｅｎｃｅ/example' }
      ]),
    /identity collision/i
  );
  assert.throws(
    () =>
      buildSearchProjection([
        { slug: '/zh/reference/example', title: 'One', summary: 'One', category: 'reference' },
        {
          slug: '/zh/ｒｅｆｅｒｅｎｃｅ/example',
          title: 'Two',
          summary: 'Two',
          category: 'reference'
        }
      ]),
    /identity collision/i
  );
});

test('materialized plans pass the zero-drift check and denied identities stay out of projections', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-content-authority-'));
  fs.mkdirSync(path.join(tempRoot, 'src/components/tech-center'), { recursive: true });
  fs.writeFileSync(path.join(tempRoot, 'src/components/tech-center/entries.json'), '[\n]\n');
  const plan = buildImportPlan({ repoRoot: tempRoot, sourcePath: fixture });

  writeImportPlan(plan, tempRoot);
  assert.doesNotThrow(() => verifyImportPlanNoDrift(plan, tempRoot));

  const denied = { locale: 'zh', canonicalPath: '/reference/blocked-page' };
  const projection = {
    title: 'Blocked page',
    slug: '/zh/reference/blocked-page',
    category: 'reference',
    categoryLabel: 'Reference',
    sourceType: 'Official docs',
    summary: 'Blocked page',
    minutes: 1
  };
  assert.throws(
    () => assertDeniedIdentitiesAbsent([{ identity: denied }], [projection], []),
    /Denied technical content identity/
  );
});

test('schema drift fails with an actionable error', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-content-'));
  fs.cpSync(fixture, tempRoot, { recursive: true });
  const manifestPath = path.join(tempRoot, 'delivery.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.accepted[0].unexpected = true;
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  assert.throws(() => buildImportPlan({ repoRoot: root, sourcePath: tempRoot }), /schema drift/i);

  delete manifest.accepted[0].unexpected;
  manifest.accepted[0].wordCount = '0';
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  assert.throws(() => buildImportPlan({ repoRoot: root, sourcePath: tempRoot }), /wordCount/i);
});

test('delivery trust boundaries validate public sources, citation counts, and lowercase routes', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-content-boundary-'));
  fs.cpSync(fixture, tempRoot, { recursive: true });
  const manifestPath = path.join(tempRoot, 'delivery.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  manifest.accepted[0].source = 'http://example.com/source';
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  assert.throws(
    () => buildImportPlan({ repoRoot: root, sourcePath: tempRoot }),
    /public HTTPS URL/i
  );

  manifest.accepted[0].source = 'https://2130706433/';
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  assert.throws(
    () => buildImportPlan({ repoRoot: root, sourcePath: tempRoot }),
    /public HTTPS URL/i
  );

  manifest.accepted[0].source = 'https://[fd00::1]/';
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  assert.throws(
    () => buildImportPlan({ repoRoot: root, sourcePath: tempRoot }),
    /public HTTPS URL/i
  );

  manifest.accepted[0].source = 'https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox';
  manifest.accepted[0].sourceCount = 0;
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  assert.throws(() => buildImportPlan({ repoRoot: root, sourcePath: tempRoot }), /sourceCount/i);

  manifest.accepted[0].sourceCount = 1;
  manifest.accepted[0].slug = 'Deploy/fastgpt-opensandbox-env-config';
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  assert.throws(() => buildImportPlan({ repoRoot: root, sourcePath: tempRoot }), /lowercase/i);
});

test('check mode leaves committed projections byte-for-byte unchanged', () => {
  const outputs = [
    'src/components/tech-center/entries.json',
    'public/tech-center/search-index.json',
    'public/tech-center/search-index.en.json',
    'src/content/tech-center/deploy/fastgpt-opensandbox-env-config.md',
    'src/content/tech-center/reference/fastgpt-opensandbox-env-config.md',
    'src/content/tech-center/reference/fastgpt-chatglm2-m3e-api-test.md'
  ];
  const before = outputs.map((relativePath) => fs.readFileSync(path.join(root, relativePath)));
  const result = spawnSync(
    process.execPath,
    ['scripts/import-technical-content.js', '--check', '--source', fixture],
    { cwd: root, encoding: 'utf8' }
  );

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Technical content drift/);
  outputs.forEach((relativePath, index) => {
    assert.deepEqual(fs.readFileSync(path.join(root, relativePath)), before[index], relativePath);
  });
});

test('public search projection contains only discovery fields and matches the registry', () => {
  const entries = JSON.parse(
    fs.readFileSync(path.join(root, 'src/components/tech-center/entries.json'), 'utf8')
  );
  const projection = buildSearchProjection(entries);
  const zhProjection = projection.filter((entry) => entry.locale === 'zh');
  const enProjection = projection.filter((entry) => entry.locale === 'en');
  const firstEntry = entries.find((entry) => entry.slug === '/zh/tutorial/private-deployment-topology');

  assert.deepEqual(Object.keys(projection[0]), [
    'identity',
    'title',
    'description',
    'category',
    'locale',
    'publicPath',
    'sourceType',
    'minutes'
  ]);
  assert.deepEqual(projection.find((entry) => entry.identity === 'zh|/tutorial/private-deployment-topology'), {
    identity: 'zh|/tutorial/private-deployment-topology',
    title: firstEntry.title,
    description: firstEntry.summary,
    category: firstEntry.category,
    locale: 'zh',
    publicPath: '/tutorial/private-deployment-topology',
    sourceType: firstEntry.sourceType,
    minutes: firstEntry.minutes
  });
  assert.equal(new Set(projection.map((entry) => entry.identity)).size, entries.length);
  assert.deepEqual([...new Set(projection.flatMap((entry) => Object.keys(entry)))].sort(), [
    'category',
    'description',
    'identity',
    'locale',
    'minutes',
    'publicPath',
    'sourceType',
    'title'
  ]);
  assert.deepEqual(
    JSON.parse(fs.readFileSync(path.join(root, 'public/tech-center/search-index.json'), 'utf8')),
    zhProjection
  );
  assert.deepEqual(
    JSON.parse(fs.readFileSync(path.join(root, 'public/tech-center/search-index.en.json'), 'utf8')),
    enProjection
  );
});

test('source verification covers every indexed page and catches content drift without batch ledgers', () => {
  assert.equal(
    verifyTechnicalContent(root).length,
    require('../src/components/tech-center/entries.json').length
  );
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'technical-content-verification-'));
  try {
    const plan = buildImportPlan({ repoRoot: repo, sourcePath: fixture });
    writeImportPlan(plan, repo);
    assert.equal(verifyTechnicalContent(repo).length, 3);
    const bodyPath = path.join(repo, plan.pages[0].normalizedBodyPath);
    const registryPath = path.join(repo, 'src/components/tech-center/entries.json');
    const searchPath = path.join(repo, 'public/tech-center/search-index.json');
    const renameSync = fs.renameSync;
    const originalRegistry = fs.readFileSync(registryPath);
    const changed = buildImportPlan({ repoRoot: repo, sourcePath: fixture });
    changed.pages[0].projection.title = 'Changed title';
    let writes = 0;
    fs.renameSync = (...args) => {
      if (++writes === 3) throw new Error('Injected write failure');
      return renameSync(...args);
    };
    try {
      assert.throws(() => writeImportPlan(changed, repo), /Injected write failure/);
    } finally {
      fs.renameSync = renameSync;
    }
    assert.deepEqual(fs.readFileSync(registryPath), originalRegistry);
    assert.equal(verifyTechnicalContent(repo).length, 3);
    for (const [filePath, change, message] of [
      [bodyPath, () => null, /Missing technical body/],
      [bodyPath, (bytes) => bytes.replace('slug: /zh/', 'slug: /en/'), /metadata drift/],
      [bodyPath, (bytes) => bytes + '\nsk-' + 'unexpectedCredential123456789', /secret-shaped/],
      [bodyPath, (bytes) => bytes + '\nfastgpt-' + 'A'.repeat(48), /secret-shaped/],
      [
        registryPath,
        (bytes) => JSON.stringify([...JSON.parse(bytes), JSON.parse(bytes)[0]]),
        /identity collision/
      ],
      [searchPath, () => '[]\n', /search projection/]
    ]) {
      const original = fs.readFileSync(filePath, 'utf8');
      const changed = change(original);
      if (changed === null) fs.unlinkSync(filePath);
      else fs.writeFileSync(filePath, changed);
      try {
        assert.throws(() => verifyTechnicalContent(repo), message);
      } finally {
        fs.writeFileSync(filePath, original);
      }
    }
    const registryBytes = fs.readFileSync(registryPath, 'utf8');
    const searchBytes = fs.readFileSync(searchPath, 'utf8');
    fs.writeFileSync(registryPath, JSON.stringify(JSON.parse(registryBytes).slice(1)));
    fs.writeFileSync(searchPath, JSON.stringify(JSON.parse(searchBytes).slice(1), null, 2) + '\n');
    assert.throws(() => verifyTechnicalContent(repo), /Unindexed technical body/);
    fs.writeFileSync(registryPath, registryBytes);
    fs.writeFileSync(searchPath, searchBytes);
    assert.equal(verifyTechnicalContent(repo).length, 3);
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test('stage membership follows explicit roles and the selected table', () => {
  const { verifyStageNavigation } = require('./import-technical-content');
  const stage = '/zh/guide/example-issues';
  const source = '/zh/api/example';
  const reference = '/zh/reference/environment';
  const ordinaryGuide = '/zh/guide/ordinary-guide';
  const overview = '/zh/guide/deployment-issue-landscape';
  const entries = [stage, source, overview, reference, ordinaryGuide].map((slug) => ({ slug }));
  const metadata = { page_type: '问题清单聚合页', stage_members_heading: 'Members' };
  const body = `[Overview](${overview})
## Members
| Article | Area |
| --- | --- |
| [Article](${source}) | API |

## Related references
[Reference](${reference})
| Reference | Area |
| --- | --- |
| [Guide](${ordinaryGuide}) | Guide |
`;
  const document = (text = body, meta = metadata) =>
    new Map([
      [stage, { metadata: meta, body: text }],
      [ordinaryGuide, { metadata: { page_type: 'Tutorial' }, body: '# Ordinary guide' }]
    ]);
  const returns = { [source]: stage };
  const verify = (e = entries, d = document(), r = returns, g = []) =>
    verifyStageNavigation(e, d, r, g);
  verify();
  verify(entries, document(body + '\nRevised operational wording.'));
  verify(entries, document(body, { ...metadata, page_type: 'Issue list' }));
  // A source-shaped link in another cell is an editorial reference.
  verify(entries, document(body.replace('| API |', `| [Reference](${reference}) |`)));
  const later = '/zh/api/later';
  verify(
    [...entries, { slug: later }],
    document(
      body.replace(
        '\n\n## Related references',
        `\n| [Later](${later}) | API |\n\n## Related references`
      )
    ),
    { ...returns, [later]: stage }
  );
  // Stage identity is independent of its URL section.
  const moved = '/zh/troubleshoot/example-stage';
  const movedDocuments = document();
  movedDocuments.set(moved, movedDocuments.get(stage));
  movedDocuments.delete(stage);
  verify(
    entries.map((entry) => (entry.slug === stage ? { slug: moved } : entry)),
    movedDocuments,
    { [source]: moved }
  );
  assert.throws(() => verify(entries.slice(1)), /Unresolved stage target/);
  assert.throws(
    () => verify(entries.filter((entry) => entry.slug !== source)),
    /Unresolved return source/
  );
  assert.throws(() => verify([...entries, entries[1]]), /Duplicate content owner/);
  assert.throws(
    () => verify(entries, document(), returns, [{ slug: 'example-issues', zh: {} }]),
    /Duplicate content owner/
  );
  assert.throws(
    () => verify(entries, document(), { [source]: ordinaryGuide }),
    /Unresolved stage target/
  );
  assert.throws(() => verify(entries, document(), {}), /missing reverse mapping/);
  assert.throws(
    () => verify(entries, document(body.replace(`[Overview](${overview})`, ''))),
    /missing landscape/
  );
  assert.throws(
    () => verify(entries, document(body, { page_type: 'Issue list' })),
    /missing stage_members_heading/
  );
  assert.throws(
    () => verify(entries, document(body.replace('## Members', '## Renamed'))),
    /expected one member section/
  );
  assert.throws(
    () => verify(entries, document(body + '\n## Members\n')),
    /expected one member section/
  );
  assert.throws(
    () => verify(entries, document(body.replace('| --- | --- |', '| invalid | --- |'))),
    /invalid member table/
  );
  assert.throws(
    () => verify(entries, document(body.replace(`[Article](${source})`, 'Article'))),
    /one article per member row/
  );
  assert.throws(
    () =>
      verify(
        entries,
        document(
          body.replace(
            '\n\n## Related references',
            `\n| [Duplicate](${source}) | API |\n\n## Related references`
          )
        )
      ),
    /duplicate stage member/
  );
  assert.throws(
    () => verify(entries, document(body.replace(source, '/zh/api/missing')), {}),
    /Unresolved stage member/
  );
  // An ordinary paragraph link cannot substitute for membership in the selected table.
  assert.throws(
    () => verify(entries, document(body.replace(source, reference) + `\n[Article](${source})`)),
    /missing article link/
  );
  const foreign = '/en/api/example';
  assert.throws(
    () => verify([...entries, { slug: foreign }], document(), { [foreign]: stage }),
    /Cross-locale/
  );
  assert.throws(
    () => verify([...entries, { slug: foreign }], document(body.replace(source, foreign)), {}),
    /Cross-locale/
  );
  assert.throws(
    () =>
      verify(
        entries,
        document(
          body
            .replace('## Members', '## Members\n```md')
            .replace('## Related references', '```\n## Related references')
        )
      ),
    /expected one member table/
  );
  const secondTable =
    '\n| Reference | Area |\n| --- | --- |\n| [Ref](' + reference + ') | Reference |\n';
  assert.throws(
    () =>
      verify(
        entries,
        document(body.replace('## Related references', secondTable + '\n## Related references'))
      ),
    /expected one member table/
  );
});
