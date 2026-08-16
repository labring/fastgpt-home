#!/usr/bin/env node

/**
 * Verify the registry-backed English FAQ redirect projection and edge writer contracts.
 *
 * `--source` checks committed registry data and source writers only. Without the flag,
 * the verifier also checks the generated Worker or Nginx map for the selected variant.
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { getFaqRedirectProjection, parseNginxRedirectMap } = require('./lib/redirects');
const { resolveSiteVariant } = require('./lib/site-variant');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');
const NEXT_DIR = path.join(ROOT, '.next');
const IO_BASE_URL = 'https://fastgpt.io';
const EXPECTED_ELIGIBLE = 0;
const EXPECTED_DENIED_REPAIRS = 0;
const EXPECTED_LEDGER_DENIES = 0;

function fail(message, entry) {
  const context = entry
    ? ` (sourceSlug=${entry.sourceSlug}, contentId=${entry.contentId}, canonicalSlug=${entry.canonicalSlug})`
    : '';
  throw new Error(`[verify-faq-redirects] ${message}${context}`);
}

function encodedPathVariants(prefix, sourceSlug) {
  const encoded = encodeURIComponent(sourceSlug);
  const variants = new Set([encoded]);
  if (encoded !== sourceSlug) variants.add(sourceSlug);
  const paths = [];
  for (const value of variants) {
    paths.push(`${prefix}/${value}`, `${prefix}/${value}/`);
  }
  return paths;
}

function expectedTarget(entry) {
  return `${IO_BASE_URL}/faq/${encodeURIComponent(entry.canonicalSlug)}`;
}

function verifySourceProjection() {
  const projection = getFaqRedirectProjection(ROOT);
  const { registry, byLegacySource, deniedSources, eligible } = projection;
  const deniedRepairs = registry.records.filter(
    (record) => record.routeStatus === 'repaired' && record.collisionDisposition === 'no-redirect',
  );
  const ledgerDenies = registry.collisionLedger.filter(
    (entry) => entry.disposition === 'no-redirect',
  );

  assert.equal(eligible.length, EXPECTED_ELIGIBLE, 'Unexpected eligible redirect record count');
  assert.equal(
    deniedRepairs.length,
    EXPECTED_DENIED_REPAIRS,
    'Unexpected collision-denied repaired record count',
  );
  assert.equal(ledgerDenies.length, EXPECTED_LEDGER_DENIES, 'Unexpected collision ledger count');
  assert.equal(deniedSources.size, EXPECTED_DENIED_REPAIRS, 'Unexpected denied source cardinality');

  const canonicalSlugs = new Set(registry.records.map((record) => record.canonicalSlug));
  const legacySources = new Set(registry.records.flatMap((record) => record.legacySources));
  const seenSources = new Set();
  const seenTargets = new Set();

  for (const entry of eligible) {
    if (seenSources.has(entry.sourceSlug)) fail('Duplicate eligible source', entry);
    seenSources.add(entry.sourceSlug);
    if (!byLegacySource.has(entry.sourceSlug)) fail('Missing source candidate index', entry);
    if (!canonicalSlugs.has(entry.canonicalSlug)) fail('Missing canonical target', entry);
    if (legacySources.has(entry.canonicalSlug)) fail('Redirect target is another legacy alias', entry);
    if (deniedSources.has(entry.sourceSlug)) fail('Denied source was admitted', entry);
    if (!entry.sourceSlug || entry.sourceSlug === entry.canonicalSlug) {
      fail('Eligible source does not change to a final canonical slug', entry);
    }

    const target = expectedTarget(entry);
    if (!target.startsWith(`${IO_BASE_URL}/faq/`)) fail('Redirect target has a foreign owner', entry);
    if (seenTargets.has(target)) fail('Many-to-one redirect target', entry);
    seenTargets.add(target);
  }

  for (const record of registry.records) {
    if (record.routeStatus !== 'preserved') continue;
    if (seenSources.has(record.sourceSlug)) fail('Preserved source received a redirect', record);
  }
  for (const deniedSource of deniedSources) {
    if (seenSources.has(deniedSource)) {
      fail('Collision-denied source received a redirect', { sourceSlug: deniedSource, contentId: '<denied>' });
    }
  }

  const writerSource = fs.readFileSync(path.join(ROOT, 'scripts/lib/redirects.js'), 'utf8');
  assert(
    writerSource.includes('redirectUrl.search = url.search'),
    'Cloudflare Worker writer must preserve query strings',
  );
  const nginxSource = fs.readFileSync(path.join(ROOT, 'nginx.conf'), 'utf8');
  assert(
    nginxSource.includes('$locale_redirect_target$is_args$args'),
    'Nginx redirect writer must preserve query strings',
  );

  return projection;
}

function parseWorkerRedirects() {
  const workerPath = path.join(OUT_DIR, '_worker.js');
  assert(fs.existsSync(workerPath), `Missing Cloudflare Worker: ${workerPath}`);
  const worker = fs.readFileSync(workerPath, 'utf8');
  const encodedEntries = worker.match(/const redirects = new Map\((\[[\s\S]*?\])\);/)?.[1];
  assert(encodedEntries, 'Cloudflare Worker has no redirect map');
  return new Map(JSON.parse(encodedEntries));
}

function parseNginxRedirects() {
  const mapPath = path.join(NEXT_DIR, 'nginx-redirects.conf');
  assert(fs.existsSync(mapPath), `Missing Nginx redirect map: ${mapPath}`);
  return parseNginxRedirectMap(fs.readFileSync(mapPath, 'utf8'));
}

function verifyArtifacts(projection) {
  const variant = resolveSiteVariant();
  assert(['io', 'cn'].includes(variant), `Redirect artifact mode requires io or cn, received ${variant}`);
  const redirects = variant === 'io' ? parseWorkerRedirects() : parseNginxRedirects();
  const prefixes = variant === 'io' ? ['/faq', '/en/faq'] : ['/en/faq'];

  for (const entry of projection.eligible) {
    for (const prefix of prefixes) {
      for (const sourcePath of encodedPathVariants(prefix, entry.sourceSlug)) {
        assert.equal(
          redirects.get(sourcePath),
          expectedTarget(entry),
          `Missing direct 301 alias ${sourcePath} for ${entry.contentId}`,
        );
      }
    }
  }

  for (const sourceSlug of projection.deniedSources) {
    for (const prefix of ['/faq', '/en/faq']) {
      for (const sourcePath of encodedPathVariants(prefix, sourceSlug)) {
        assert(!redirects.has(sourcePath), `Denied source was emitted: ${sourcePath}`);
      }
    }
  }

  const canonicalTargets = new Set(
    projection.registry.records.map((record) => expectedTarget({ canonicalSlug: record.canonicalSlug })),
  );
  for (const entry of projection.eligible) {
    assert(canonicalTargets.has(expectedTarget(entry)), `Unknown canonical target: ${entry.canonicalSlug}`);
  }
}

function main() {
  const sourceOnly = process.argv.includes('--source');
  const projection = verifySourceProjection();
  if (!sourceOnly) verifyArtifacts(projection);
  console.log(
    `[verify-faq-redirects] passed (eligible=${projection.eligible.length}, denied=${projection.deniedSources.size}, ledger=${projection.registry.collisionLedger.length}${sourceOnly ? ', source-only' : ''})`,
  );
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
