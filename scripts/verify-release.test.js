const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  appendP1HistoricalBaselineAdvisories,
  extractP1SuccessMeasurement
} = require('./verify-release');
const { buildOwnerExpectationSet, parseArgs } = require('./verify-faq-metadata');
const { normalizeFaqMetadataPolicy } = require('./generate-faq-metadata');

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
  const jsonLd = JSON.stringify({ '@type': 'Question', name: record.Question }).replaceAll('<', '\\u003c');
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
  return { label, variant, command: 'npm run verify:p1', output };
}

test('release coordinator composes Guide checks around each fresh variant export', () => {
  const source = fs.readFileSync(path.join(ROOT, 'scripts/verify-release.js'), 'utf8');
  const faqSteps = [
    'scripts/generate-faq-route-registry.js',
    'scripts/generate-faq-metadata.js',
    'scripts/verify-faq-routes.js',
    'scripts/verify-faq-metadata.js',
    'scripts/verify-faq-seo-graph.js',
    'scripts/verify-faq-redirects.js'
  ];
  const positions = faqSteps.map((step) => source.indexOf(step));

  assert(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((left, right) => left - right), positions);
  assert(source.includes('scripts/verify-guide-content.js'));
  assert(source.includes('scripts/verify-guide-seo-graph.js'));
  assert(source.includes('scripts/verify-guide-export.js'));
  assert(source.includes("const variants = options.variant ? [options.variant] : ['io', 'cn'];"));

  const variantLoop = source.slice(source.indexOf('for (const variant of variants)'));
  const firstCleanup = variantLoop.indexOf('clearBuildArtifacts()');
  const secondCleanup = variantLoop.indexOf('clearBuildArtifacts()', firstCleanup + 1);

  assert(firstCleanup < variantLoop.indexOf('runGuideSourceChecks'));
  assert(variantLoop.indexOf('runGuideSourceChecks') < variantLoop.indexOf('runVariantChecks'));
  assert(variantLoop.indexOf('runVariantChecks') < secondCleanup);
});

test('P1 successful evidence keeps the emitted KiB measurement', () => {
  const output = 'P1 verification passed for fastgpt.io: 259.8 KiB initial JavaScript gzip\n';
  assert.equal(extractP1SuccessMeasurement(output), '259.8 KiB initial JavaScript gzip');
  assert.equal(extractP1SuccessMeasurement('P1 verification passed'), undefined);
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

  assert.equal(io.length, 1195);
  assert.equal(cn.length, 1490);
  assert(io.every((record) => record.variant === 'io' && record.routeKey === record.canonicalSlug));
  assert(cn.every((record) => record.variant === 'cn' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.routeKey)));

  const registry = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'src/faq/generated-en-route-registry.json'), 'utf8'),
  );
  const registryIds = new Set(registry.records.map((record) => record.contentId));
  const chineseOnly = cn.find((record) => !registryIds.has(record.contentId));
  assert(chineseOnly, 'Expected a Chinese-only published FAQ record absent from the English route registry');
  for (const field of ['Title', 'Description', 'Keywords', 'Question', 'Answers']) {
    assert.equal(typeof chineseOnly[field], 'string', `Chinese-only ${field} must come from authored data`);
    assert(chineseOnly[field].length > 0, `Chinese-only ${field} must be populated`);
  }
});

const ioExpectations = buildOwnerExpectationSet('io');
const caseInsensitiveFixtureSkip =
  !isCaseSensitiveFilesystem() && hasCaseInsensitiveRouteCollision(ioExpectations);

test(
  'metadata HTML CLI reuses one loaded source context across every io fixture',
  {
    skip: caseInsensitiveFixtureSkip &&
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
          "    process.stderr.write(`[faq-metadata] expected one approved-artifact read, received ${artifactReads}\\n`);",
          '    process.exitCode = 1;',
          '  }',
          '});'
        ].join('\n'),
      );

      const result = spawnSync(
        process.execPath,
        ['--require', readCounterPath, 'scripts/verify-faq-metadata.js', '--html', '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8' },
      );
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /io, 1195 FAQ pages/);
    } finally {
      fs.rmSync(OUT_DIR, { recursive: true, force: true });
      if (preservedOut) fs.renameSync(preservedOutDir, OUT_DIR);
      fs.rmSync(temporaryDir, { recursive: true, force: true });
    }
  },
);

test('metadata CLI arguments are explicit and HTML-scoped', () => {
  assert.deepEqual(parseArgs([], { NEXT_PUBLIC_SITE_VARIANT: 'cn' }), { html: false, variant: undefined });
  assert.deepEqual(parseArgs(['--html', '--variant', 'io']), { html: true, variant: 'io' });
  assert.deepEqual(parseArgs(['--html'], { NEXT_PUBLIC_SITE_VARIANT: 'cn' }), { html: true, variant: 'cn' });
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
  const result = spawnSync(process.execPath, ['-e', "require('./scripts/verify-faq-metadata.js')"], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr, '');
});
