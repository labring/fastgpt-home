const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const packageJson = require('../package.json');
const packageLock = require('../package-lock.json');

const {
  appendP1HistoricalBaselineAdvisories,
  createReleaseRecord,
  extractP1SuccessMeasurement,
  finalizeReleaseRecord,
  getSourceExecutionOrder,
  getSourceNodeSteps,
  getSourceNpmSteps,
  getVariantExecutionOrder,
  getVariantSteps,
  parseArgs: parseReleaseArgs
} = require('./verify-release');
const { recordStep, recordVariantOutcome } = require('./lib/release-record');
const { variantEnvironment } = require('./lib/release-artifacts');
const { buildOwnerExpectationSet, parseArgs } = require('./verify-faq-metadata');
const { normalizeFaqMetadataPolicy } = require('./generate-faq-metadata');
const { verifyNginxHeaderCoverage } = require('./verify-p0');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function writeFaqFixture(record) {
  const metadata = normalizeFaqMetadataPolicy({
    title: record.Title,
    description: record.Description
  });
  const jsonLd = JSON.stringify({ '@type': 'Question', name: record.Question }).replaceAll(
    '<',
    '\\u003c'
  );
  const html = [
    '<!doctype html>',
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<meta name="description" content="${escapeHtml(metadata.description)}">`,
    `<meta name="keywords" content="${escapeHtml(record.Keywords.split(', ').join(','))}">`,
    `<h1>${escapeHtml(record.Question)}</h1>`,
    `<script type="application/ld+json">${jsonLd}</script>`
  ].join('');
  const fixturePath = path.join(OUT_DIR, 'faq', `${record.routeKey}.html`);
  fs.mkdirSync(path.dirname(fixturePath), { recursive: true });
  fs.writeFileSync(fixturePath, html);
}

function hasCaseInsensitiveRouteCollision(records) {
  const routeKeys = new Set();
  for (const { routeKey } of records) {
    const normalized = routeKey.toLowerCase();
    if (routeKeys.has(normalized)) return true;
    routeKeys.add(normalized);
  }
  return false;
}

function isCaseSensitiveFilesystem() {
  const probeDir = fs.mkdtempSync(path.join(ROOT, '.faq-case-probe-'));
  const uppercaseProbe = path.join(probeDir, 'CaseProbe');
  const lowercaseProbe = path.join(probeDir, 'caseprobe');
  try {
    fs.writeFileSync(uppercaseProbe, 'case probe');
    return !fs.existsSync(lowercaseProbe);
  } finally {
    fs.rmSync(probeDir, { recursive: true, force: true });
  }
}

function failure(label, output, variant = 'io') {
  const id = label.startsWith('P1 ') ? 'p1.export' : 'test.failure';
  return { id, label, variant, command: 'npm run verify:p1', output };
}

test('Nginx security headers follow the active server and cache locations', () => {
  const config = fs.readFileSync(path.join(ROOT, 'nginx.conf'), 'utf8');
  verifyNginxHeaderCoverage(config);
  for (const match of config.matchAll(/include \/etc\/nginx\/(?:embeddable-)?security-headers\.conf;/g)) {
    const missingInclude = config.slice(0, match.index) + config.slice(match.index + match[0].length);
    assert.throws(() => verifyNginxHeaderCoverage(missingInclude), /Security headers missing/);
  }
  verifyNginxHeaderCoverage(config.replace(/  location \/images\/ \{[\s\S]*?\n  \}/, ''));
  assert.throws(
    () => verifyNginxHeaderCoverage(config + '\nlocation /new/ {\nadd_header Cache-Control "public";\n}\n'),
    /Security headers missing from location \/new\//
  );
});

test('production deploys the built digest and restores the previous image on rollout failure', () => {
  const workflow = require('js-yaml').load(
    fs.readFileSync(path.join(ROOT, '.github/workflows/fastgpt-home-image.yml'), 'utf8')
  );
  const job = workflow.jobs['build-fastgpt-landingpage-images'];
  assert.equal(
    job.if,
    "github.repository == 'labring/fastgpt-home' && github.ref == 'refs/heads/main'"
  );
  assert.deepEqual(workflow.on.push.branches, ['main']);
  assert.equal(workflow.concurrency['cancel-in-progress'], false);
  const step = job.steps.find((step) => step.name === 'Deploy image and verify rollout');
  assert.equal(step.env.IMAGE_DIGEST, '${{ steps.build.outputs.digest }}');
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'release-rollout-'));
  const trace = path.join(temporary, 'commands.jsonl');
  const digest = `sha256:${'a'.repeat(64)}`;
  try {
    fs.writeFileSync(
      path.join(temporary, 'kubectl'),
      `#!${process.execPath}
const fs = require('node:fs');
const args = process.argv.slice(2);
const previous = fs.existsSync(process.env.TRACE) ? fs.readFileSync(process.env.TRACE, 'utf8') : '';
fs.appendFileSync(process.env.TRACE, JSON.stringify(args) + '\\n');
if (args[0] === 'get') console.log('ghcr.io/labring/fastgpt-home@sha256:' + 'b'.repeat(64));
if (args[0] === 'rollout' && (process.env.FAIL_ROLLOUT === 'all' ||
    (process.env.FAIL_ROLLOUT === 'first' && !previous.includes('rollout')))) process.exit(1);
`,
      { mode: 0o755 }
    );
    for (const scenario of ['success', 'first', 'all', 'invalid-digest']) {
      fs.rmSync(trace, { force: true });
      const result = spawnSync('bash', ['-eu', '-o', 'pipefail', '-c', step.run], {
        encoding: 'utf8',
        env: {
          ...process.env,
          PATH: `${temporary}:${process.env.PATH}`,
          TRACE: trace,
          KUBE_CONFIG: Buffer.from('test configuration').toString('base64'),
          IMAGE_NAME: workflow.env.IMAGE_NAME,
          IMAGE_DIGEST: scenario === 'invalid-digest' ? 'latest' : digest,
          FAIL_ROLLOUT: scenario
        }
      });
      assert.equal(
        result.status,
        scenario === 'success' ? 0 : 1,
        scenario +
          ': ' +
          result.stderr +
          (fs.existsSync(trace) ? fs.readFileSync(trace, 'utf8') : '')
      );
      const commands = fs.existsSync(trace)
        ? fs
            .readFileSync(trace, 'utf8')
            .trim()
            .split('\n')
            .map((line) => JSON.parse(line))
        : [];
      const changes = commands.filter(([command]) => command === 'set');
      assert.equal(
        changes.length,
        scenario === 'invalid-digest' ? 0 : scenario === 'success' ? 1 : 2
      );
      if (changes.length)
        assert.equal(changes[0][3], `fastgpt-home=${workflow.env.IMAGE_NAME}@${digest}`);
      if (changes.length === 2)
        assert.equal(
          changes[1][3],
          `fastgpt-home=${workflow.env.IMAGE_NAME}@sha256:${'b'.repeat(64)}`
        );
    }
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});

test('release plans compose FAQ, Guide, and variant checks with stable step IDs', () => {
  const sourceIds = getSourceNodeSteps().map(([stepId]) => stepId);
  assert.deepEqual(
    sourceIds.filter((stepId) => stepId.startsWith('faq-')),
    [
      'faq-route-registry.source',
      'faq-metadata-snapshot.source',
      'faq-routes.source',
      'faq-metadata-legacy.source',
      'faq-metadata.source',
      'faq-seo-graph.source',
      'faq-redirects.source'
    ]
  );

  const variantOrder = getVariantExecutionOrder('cn');
  assert.equal(variantOrder[0], 'variant.build');
  assert(variantOrder.indexOf('variant.build') < variantOrder.indexOf('guide.export'));
});

test('release coordinator checks technical content and every site variant', () => {
  const sourceCommands = getSourceNpmSteps().flatMap(([, , args]) => args);
  for (const command of [
    'verify:technical-content',
    'verify:technical-content-regression',
    'verify:technical-center-regression',
    'verify:technical-export-regression'
  ])
    assert(sourceCommands.includes(command), command);
  for (const variant of ['cn', 'io', 'preview']) {
    const variantIds = getVariantExecutionOrder(variant);
    assert.equal(variantIds.filter((id) => id === 'variant.build').length, 1);
  }
});

test('release coordinator records and gates the case-only alias slice independently', () => {
  const sourceStep = getSourceNodeSteps().find(([stepId]) => stepId === 'case-only.source');
  const regressionStep = getSourceNpmSteps().find(([stepId]) => stepId === 'case-only.regression');
  const httpStep = getVariantSteps('cn').find((step) => step.id === 'case-only.http');

  assert.equal(sourceStep[2], 'scripts/verify-case-only-aliases.js');
  assert.deepEqual(regressionStep[2], ['verify:case-only-regression']);
  assert.deepEqual(httpStep.args, ['--variant', 'cn', '--slice', 'case-only']);
  assert.equal(
    getVariantSteps('preview').some((step) => step.id === 'case-only.http'),
    false
  );
  assert.equal(packageJson.scripts['verify:case-only'], 'node scripts/verify-case-only-aliases.js');
  assert.equal(
    packageJson.scripts['verify:case-only-regression'],
    'node --test scripts/verify-case-only-aliases.test.js'
  );
  assert.equal(packageJson.scripts['verify:guide-authorization'], undefined);
  assert.equal(packageJson.scripts['verify:guide-authorization-regression'], undefined);
  assert.equal(
    packageJson.scripts['verify:guide-g2-release'],
    'node scripts/verify-guide-g2-release.js'
  );
  assert.equal(
    packageJson.scripts['verify:guide-g2-release-regression'],
    'node --test scripts/verify-guide-g2-release.test.js'
  );
});

test('release coordinator accepts the preview Site Variant', () => {
  assert.deepEqual(parseReleaseArgs(['--variant', 'preview']), {
    sourceOnly: false,
    keepArtifacts: false,

    variant: 'preview'
  });
});

test('release records retain command results, duration, and rollback inventory', () => {
  const record = createReleaseRecord({ sourceOnly: true });
  assert(Array.isArray(record.rollback.inventory));
  recordStep(
    record,
    'technical-content.source',
    'Technical content',
    'node scripts/verify-technical-content.js',
    undefined,
    'passed',
    'Technical content verified: 4007 pages',
    undefined,
    123
  );
  assert.equal(record.commands.at(-1).status, 'passed');
  assert.equal(record.commands.at(-1).durationMs, 123);
  assert.equal(record.commands.at(-1).output, 'Technical content verified: 4007 pages');
  finalizeReleaseRecord(record, [], { sourceOnly: true });
  assert.equal(record.status, 'source-verified');
  recordStep(
    record,
    'variant.build',
    'Build CN',
    'npm run build',
    'cn',
    'passed',
    'Built',
    undefined,
    456
  );
  recordVariantOutcome(record, 'cn', [], 1);
  assert.equal(record.variants[0].buildDurationMs, 456);
  finalizeReleaseRecord(record, [], {});
  assert.equal(record.status, 'export-verified');
  finalizeReleaseRecord(
    record,
    [{ id: 'url-alias.artifacts', variant: 'cn', output: 'Corrupt map' }],
    {}
  );
  assert.equal(record.status, 'failed');
  assert.equal(record.variants[0].outcome, 'failed');
});

test('preview release gates skip production-only FAQ artifacts and sitemap cardinality', () => {
  const previewIds = getVariantSteps('preview').map((step) => step.id);
  const cnIds = getVariantSteps('cn').map((step) => step.id);

  assert(previewIds.includes('i18n-seo.export'));
  assert.equal(previewIds.includes('faq-metadata.html'), false);
  assert.equal(previewIds.includes('faq-seo-graph.html'), false);
  assert.equal(previewIds.includes('url-alias.blackbox'), false);
  assert(cnIds.includes('faq-metadata.html'));
  assert(cnIds.includes('faq-seo-graph.html'));
});

test('release source checks run content hygiene first and block dirty published Markdown', () => {
  assert.equal(
    packageJson.scripts['verify:content-hygiene'],
    'node scripts/verify-content-hygiene.js --mode source'
  );
  assert.equal(
    packageJson.scripts['verify:content-hygiene-regression'],
    'node --test scripts/verify-content-hygiene.test.js'
  );
  assert.match(
    packageJson.scripts.prebuild,
    /^node scripts\/verify-content-hygiene\.js --mode source && /
  );

  const sourceOrder = getSourceExecutionOrder();
  assert(sourceOrder.indexOf('content-hygiene.source') < sourceOrder.indexOf('typescript.source'));

  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-release-hygiene-'));
  const fixtureRoot = path.join(temporaryRoot, 'repo');
  try {
    fs.cpSync(ROOT, fixtureRoot, {
      recursive: true,
      filter: (source) =>
        !['.git', '.next', 'node_modules', 'out', '.release-artifacts'].includes(
          path.basename(source)
        )
    });
    const dirtyPath = path.join(
      fixtureRoot,
      'src/content/guides/temporary-content-hygiene-dirty.md'
    );
    fs.writeFileSync(dirtyPath, '# Temporary fixture\n\nFact Source: internal KB\n');
    const buildInfoPath = path.join(fixtureRoot, 'tsconfig.tsbuildinfo');
    // 显式创建 fixture，避免依赖仓库实际产物（该文件已加入 gitignore，干净 CI 中不存在）。
    fs.writeFileSync(buildInfoPath, 'build-info-fixture-bytes');
    const buildInfoBefore = fs.readFileSync(buildInfoPath);
    const result = spawnSync(process.execPath, ['scripts/verify-release.js', '--source-only'], {
      cwd: fixtureRoot,
      encoding: 'utf8',
      env: {
        ...process.env,
        PATH: `${path.join(ROOT, 'node_modules/.bin')}${path.delimiter}${process.env.PATH}`
      }
    });
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /content hygiene source verification/);
    assert.match(result.stderr, /temporary-content-hygiene-dirty\.md/);
    assert.deepEqual(fs.readFileSync(buildInfoPath), buildInfoBefore);
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
});

test('contact animations load GSAP only after the client mounts', () => {
  const source = fs.readFileSync(path.join(ROOT, 'src/components/contact/ContactPage.tsx'), 'utf8');

  assert.doesNotMatch(
    source,
    /^import .* from ['"](?:@gsap\/react|gsap(?:\/ScrollTrigger)?)['"];$/m
  );
  assert.match(source, /import\('gsap'\)/);
  assert.match(source, /import\('gsap\/ScrollTrigger'\)/);
  assert(source.indexOf('gsapRuntime.registerPlugin') > source.indexOf('useEffect('));
  assert.match(source, /context\?\.revert\(\)/);
});

test('root layout keeps the retired consultation modal out of initial JavaScript', () => {
  const layout = fs.readFileSync(path.join(ROOT, 'src/app/layout.tsx'), 'utf8');

  assert.doesNotMatch(layout, /ConsultationProvider/);
  assert.equal(
    fs.existsSync(path.join(ROOT, 'src/components/contact/ConsultationProvider.tsx')),
    false
  );
});

test('retired consultation modal dependencies and APIs stay removed', () => {
  const consultation = fs.readFileSync(path.join(ROOT, 'src/lib/consultation.ts'), 'utf8');
  const contactForm = fs.readFileSync(
    path.join(ROOT, 'src/components/contact/ContactForm.tsx'),
    'utf8'
  );

  assert.equal(packageJson.dependencies?.['@gsap/react'], undefined);
  assert.equal(packageJson.devDependencies?.['@gsap/react'], undefined);
  assert.equal(packageLock.packages?.['node_modules/@gsap/react'], undefined);
  assert.equal(fs.existsSync(path.join(ROOT, 'src/components/contact/dialogCopy.ts')), false);
  assert.doesNotMatch(consultation, /\bgetLocaleFromPathname\b/);
  assert.doesNotMatch(contactForm, /\bonDone\b/);
});

test('source-only release leaves the existing build info bytes unchanged', () => {
  const buildInfoPath = path.join(ROOT, 'tsconfig.tsbuildinfo');
  const releaseRecordPath = path.join(ROOT, '.release-artifacts', 'release-verification.json');
  const readReleaseRecord = () =>
    fs.existsSync(releaseRecordPath) ? fs.readFileSync(releaseRecordPath) : undefined;

  // 干净 CI 中 tsconfig.tsbuildinfo 不存在（已 gitignore），测试临时创建 fixture 并在结束后清理，
  // 避免依赖仓库实际产物，同时保持 cwd=ROOT 以复用 node_modules。
  const createdFixture = !fs.existsSync(buildInfoPath);
  if (createdFixture) fs.writeFileSync(buildInfoPath, 'build-info-fixture-bytes');

  try {
    const before = fs.readFileSync(buildInfoPath);
    const releaseRecordBefore = readReleaseRecord();
    const result = spawnSync(process.execPath, ['scripts/verify-release.js', '--source-only'], {
      cwd: ROOT,
      encoding: 'utf8'
    });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.deepEqual(fs.readFileSync(buildInfoPath), before);
    assert.deepEqual(readReleaseRecord(), releaseRecordBefore);
  } finally {
    if (createdFixture) fs.rmSync(buildInfoPath, { force: true });
  }
});

test('release build and workflow wiring preserve source hygiene while enforcing completed HTML exports', () => {
  const verificationWorkflow = fs.readFileSync(
    path.join(ROOT, '.github/workflows/guide-release-verification.yml'),
    'utf8'
  );

  assert.equal(
    packageJson.scripts.prebuild.split(' && ')[0],
    'node scripts/verify-content-hygiene.js --mode source'
  );
  assert.equal(
    packageJson.scripts['verify:content-hygiene-html'],
    'node scripts/verify-content-hygiene.js --mode html --root out'
  );
  assert.match(
    packageJson.scripts.build,
    /fix-html-lang\.js && node --test scripts\/verify-content-sidebar-cta\.test\.js && node scripts\/verify-technical-export\.js && node scripts\/verify-content-hygiene\.js --mode html --root out$/
  );
  assert(getSourceExecutionOrder().includes('typescript.source'));
  for (const pattern of [
    'src/**',
    'content/competitors/**',
    'scripts/verify-content-hygiene.js',
    'scripts/fix-html-lang.js'
  ])
    assert(verificationWorkflow.includes(pattern), pattern);
});

test('P1 successful evidence keeps the emitted KiB measurement', () => {
  const output =
    'P1 verification passed for https://fastgpt.io: 259.8 KiB initial JavaScript gzip\n';
  assert.equal(extractP1SuccessMeasurement(output), '259.8 KiB initial JavaScript gzip');
  assert.equal(extractP1SuccessMeasurement('P1 verification passed'), undefined);
});

test('release variants inherit shared configuration and isolate site overrides', () => {
  const baseEnv = {
    NEXT_PUBLIC_CRM_API_URL: 'https://crm.example.com',
    CN_NEXT_PUBLIC_USER_URL: 'https://cloud.fastgpt.cn',
    CN_NEXT_PUBLIC_FILING_ADDRESS: 'CN filing',
    IO_NEXT_PUBLIC_ATTRIBUTION_COOKIE_DOMAIN: '.fastgpt.io',
    CN_NEXT_PUBLIC_HOME_URL: 'https://untrusted.example.com'
  };
  for (const variant of ['cn', 'io', 'preview']) {
    const env = variantEnvironment(variant, baseEnv);
    assert.equal(env.NEXT_PUBLIC_CRM_API_URL, baseEnv.NEXT_PUBLIC_CRM_API_URL);
    assert.equal(env.NEXT_PUBLIC_SITE_VARIANT, variant);
    assert.equal(env.NEXT_PUBLIC_HOME_URL, `https://fastgpt.${variant === 'cn' ? 'cn' : 'io'}`);
    assert.equal(env.NEXT_PUBLIC_FILING_ADDRESS, variant === 'cn' ? 'CN filing' : undefined);
    assert.equal(
      env.NEXT_PUBLIC_USER_URL,
      variant === 'cn' ? 'https://cloud.fastgpt.cn' : undefined
    );
    assert.equal(
      env.NEXT_PUBLIC_ATTRIBUTION_COOKIE_DOMAIN,
      variant === 'io' ? '.fastgpt.io' : undefined
    );
  }
});

test('P1 budget failures remain aggregate failures and add a separate baseline advisory', () => {
  const failures = [
    failure('P1 HTML verification (io)', 'Initial JavaScript is 267.0 KiB gzip, budget is 260 KiB')
  ];
  const original = structuredClone(failures);
  const advisories = [];

  appendP1HistoricalBaselineAdvisories(failures, 0, advisories);

  assert.deepEqual(failures, original);
  assert.equal(advisories.length, 1);
  assert.match(advisories[0].output, /c77cf48/);
  assert.match(advisories[0].output, /266\.9 KiB/);
  assert.match(advisories[0].output, /\+0\.1 KiB/);
  assert.match(advisories[0].output, /260 KiB/);
  assert.equal(advisories[0].command, original[0].command);
  assert.equal(advisories[0].variant, 'io');
});

test('unrelated failures retain order and do not create baseline advisories', () => {
  const failures = [
    failure('P0 HTML verification (io)', 'header mismatch'),
    failure('P2 HTML verification (cn)', 'canonical mismatch', 'cn')
  ];
  const original = structuredClone(failures);
  const advisories = [];

  appendP1HistoricalBaselineAdvisories(failures, 0, advisories);

  assert.deepEqual(failures, original);
  assert.deepEqual(advisories, []);
});

test('owner expectation sets use published owner route keys and source data', () => {
  const io = buildOwnerExpectationSet('io');
  const cn = buildOwnerExpectationSet('cn');

  assert.equal(io.length, 1400);
  assert.equal(cn.length, 1490);
  assert(io.every((record) => record.variant === 'io' && record.routeKey === record.canonicalSlug));
  assert(
    cn.every(
      (record) => record.variant === 'cn' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.routeKey)
    )
  );

  const registry = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'src/faq/generated-en-route-registry.json'), 'utf8')
  );
  const registryIds = new Set(registry.records.map((record) => record.contentId));
  const chineseOnly = cn.find((record) => !registryIds.has(record.contentId));
  assert(
    chineseOnly,
    'Expected a Chinese-only published FAQ record absent from the English route registry'
  );
  for (const field of ['Title', 'Description', 'Keywords', 'Question', 'Answers']) {
    assert.equal(
      typeof chineseOnly[field],
      'string',
      `Chinese-only ${field} must come from authored data`
    );
    assert(chineseOnly[field].length > 0, `Chinese-only ${field} must be populated`);
  }
});

const ioExpectations = buildOwnerExpectationSet('io');
const caseInsensitiveFixtureSkip =
  !isCaseSensitiveFilesystem() && hasCaseInsensitiveRouteCollision(ioExpectations);

test(
  'metadata HTML CLI reuses one loaded source context across every io fixture',
  {
    skip:
      caseInsensitiveFixtureSkip &&
      'io route keys require a case-sensitive filesystem; CI runs this regression on a compatible host'
  },
  () => {
    const temporaryDir = fs.mkdtempSync(path.join(path.dirname(ROOT), 'fastgpt-faq-metadata-'));
    const preservedOutDir = path.join(temporaryDir, 'out');
    const readCounterPath = path.join(temporaryDir, 'read-counter.js');
    let preservedOut = false;

    try {
      if (fs.existsSync(OUT_DIR)) {
        fs.renameSync(OUT_DIR, preservedOutDir);
        preservedOut = true;
      }
      fs.mkdirSync(OUT_DIR, { recursive: true });
      for (const record of ioExpectations) writeFaqFixture(record);

      const artifactPath = path.join(ROOT, 'src/faq/generated-en-metadata.json');
      fs.writeFileSync(
        readCounterPath,
        [
          "const fs = require('node:fs');",
          "const path = require('node:path');",
          `const artifactPath = ${JSON.stringify(artifactPath)};`,
          'const readFileSync = fs.readFileSync;',
          'let artifactReads = 0;',
          'fs.readFileSync = function readFileSyncWithCounter(file, ...args) {',
          '  if (path.resolve(String(file)) === artifactPath) artifactReads += 1;',
          '  return readFileSync.call(this, file, ...args);',
          '};',
          "process.on('exit', () => {",
          '  if (artifactReads !== 1) {',
          '    process.stderr.write(`[faq-metadata] expected one approved-artifact read, received ${artifactReads}\\n`);',
          '    process.exitCode = 1;',
          '  }',
          '});'
        ].join('\n')
      );

      const result = spawnSync(
        process.execPath,
        [
          '--require',
          readCounterPath,
          'scripts/verify-faq-metadata.js',
          '--html',
          '--variant',
          'io'
        ],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /io, 1400 FAQ pages/);
    } finally {
      fs.rmSync(OUT_DIR, { recursive: true, force: true });
      if (preservedOut) fs.renameSync(preservedOutDir, OUT_DIR);
      fs.rmSync(temporaryDir, { recursive: true, force: true });
    }
  }
);

test('metadata CLI arguments are explicit and HTML-scoped', () => {
  assert.deepEqual(parseArgs([], { NEXT_PUBLIC_SITE_VARIANT: 'cn' }), {
    html: false,
    variant: undefined
  });
  assert.deepEqual(parseArgs(['--html', '--variant', 'io']), { html: true, variant: 'io' });
  assert.deepEqual(parseArgs(['--html'], { NEXT_PUBLIC_SITE_VARIANT: 'cn' }), {
    html: true,
    variant: 'cn'
  });
  for (const argv of [
    ['--variant', 'io'],
    ['--html', '--variant'],
    ['--html', '--variant', 'fr'],
    ['--unexpected']
  ]) {
    assert.throws(() => parseArgs(argv), /--html|--variant|Unknown argument/);
  }
});

test('requiring the metadata verifier is silent and side-effect free', () => {
  const result = spawnSync(
    process.execPath,
    ['-e', "require('./scripts/verify-faq-metadata.js')"],
    {
      cwd: ROOT,
      encoding: 'utf8'
    }
  );
  assert.equal(result.status, 0);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr, '');
});
