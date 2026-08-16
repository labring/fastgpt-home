const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  appendP1HistoricalBaselineAdvisories
} = require('./verify-release');
const { buildOwnerExpectationSet, parseArgs } = require('./verify-faq-metadata');

const ROOT = path.resolve(__dirname, '..');

function failure(label, output, variant = 'io') {
  return { label, variant, command: 'npm run verify:p1', output };
}

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
  assert(cn.every((record) => record.variant === 'cn' && record.routeKey === record.contentId));

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
