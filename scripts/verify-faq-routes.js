#!/usr/bin/env node

/**
 * Verify English FAQ identity, canonical slugs, and static route wiring.
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const FAQ_SOURCE = path.join(ROOT, 'src/faq/en.ts');
const EVIDENCE_PATH = path.join(ROOT, 'src/faq/english-route-evidence.json');
const REGISTRY_PATH = path.join(ROOT, 'src/faq/generated-en-route-registry.json');
const LOCALIZED_ROUTE = path.join(ROOT, 'src/app/[lang]/faq/[id]/page.tsx');
const ROOT_ROUTE = path.join(ROOT, 'src/app/faq/[id]/page.tsx');
const SAFE_REPAIRED_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SAFE_SOURCE_SLUG = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
const SAFE_PRESERVED_SLUG = SAFE_REPAIRED_SLUG;
const EVIDENCE_SOURCES = new Set(['week04-online-url', 'repository-current-key']);

function unwrapExpression(expression) {
  let current = expression;
  while (
    current &&
    (ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isTypeAssertionExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

function propertyKey(property) {
  const { name } = property;
  if (ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isIdentifier(name)) {
    return name.text;
  }
  throw new Error('English FAQ contains an unsupported property key');
}

function readStringProperty(objectLiteral, propertyName, contentId) {
  const property = objectLiteral.properties.find(
    (candidate) =>
      ts.isPropertyAssignment(candidate) && propertyKey(candidate) === propertyName,
  );
  assert(property, `Missing ${propertyName} for ${contentId}`);
  const value = unwrapExpression(property.initializer);
  assert(value && ts.isStringLiteralLike(value), `${propertyName} for ${contentId} is not a string`);
  return value.text;
}

function readEnglishFaq() {
  const sourceFile = ts.createSourceFile(
    FAQ_SOURCE,
    fs.readFileSync(FAQ_SOURCE, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
  let objectLiteral;
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === 'faq') {
        objectLiteral = unwrapExpression(declaration.initializer);
      }
    }
  }
  assert(objectLiteral && ts.isObjectLiteralExpression(objectLiteral), 'faq source is not an object');

  const records = [];
  const seen = new Set();
  for (const property of objectLiteral.properties) {
    assert(ts.isPropertyAssignment(property), 'English FAQ contains an unsupported property');
    const contentId = propertyKey(property);
    assert(!seen.has(contentId), `Duplicate English contentId: ${contentId}`);
    seen.add(contentId);
    const value = unwrapExpression(property.initializer);
    assert(value && ts.isObjectLiteralExpression(value), `FAQ ${contentId} is not an object`);
    records.push({
      contentId,
      Category: readStringProperty(value, 'Category', contentId),
      Question: readStringProperty(value, 'Question', contentId),
      Answers: readStringProperty(value, 'Answers', contentId),
    });
  }
  assert(records.length > 0, 'English FAQ source is empty');
  return records;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function slugifyQuestion(question) {
  const ascii = question
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x00-\x7F]/g, '');
  return ascii.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function verifyRegistry(records, evidence, registry) {
  const sourceIds = new Set(records.map((record) => record.contentId));
  const evidenceById = new Map();
  for (const entry of evidence.records) {
    assert(sourceIds.has(entry.contentId), `Evidence references unknown ${entry.contentId}`);
    assert(!evidenceById.has(entry.contentId), `Duplicate evidence ${entry.contentId}`);
    assert(EVIDENCE_SOURCES.has(entry.evidenceSource), `Invalid evidence source ${entry.contentId}`);
    assert(typeof entry.sourceSlug === 'string' && entry.sourceSlug.length > 0, `Missing source slug ${entry.contentId}`);
    evidenceById.set(entry.contentId, entry);
  }
  assert.equal(evidenceById.size, records.length, 'Evidence/source key cardinality mismatch');

  assert.equal(registry.records.length, records.length, 'Registry/source key cardinality mismatch');
  const sourceById = new Map(records.map((record) => [record.contentId, record]));
  const registryById = new Map();
  const canonicalBySlug = new Map();
  for (const entry of registry.records) {
    assert(sourceById.has(entry.contentId), `Registry references unknown ${entry.contentId}`);
    assert(!registryById.has(entry.contentId), `Duplicate registry contentId ${entry.contentId}`);
    assert(!canonicalBySlug.has(entry.canonicalSlug), `Duplicate canonical slug ${entry.canonicalSlug}`);
    assert(SAFE_PRESERVED_SLUG.test(entry.canonicalSlug), `Unsafe canonical slug ${entry.canonicalSlug}`);
    assert.equal(entry.evidenceSource, evidenceById.get(entry.contentId).evidenceSource);
    assert.equal(entry.sourceSlug, evidenceById.get(entry.contentId).sourceSlug);
    assert(['preserved', 'repaired'].includes(entry.routeStatus), `Invalid route status ${entry.contentId}`);
    assert(['none', 'no-redirect'].includes(entry.collisionDisposition), `Invalid collision disposition ${entry.contentId}`);
    if (entry.routeStatus === 'preserved') {
      assert.equal(entry.sourceSlug.toLowerCase(), entry.canonicalSlug, `Preserved slug was not normalized for ${entry.contentId}`);
      assert.equal(entry.collisionDisposition, 'none', `Collided record was preserved ${entry.contentId}`);
    } else {
      assert(SAFE_REPAIRED_SLUG.test(entry.canonicalSlug), `Repaired slug is not lowercase ${entry.contentId}`);
      assert.notEqual(entry.canonicalSlug, '', `Repaired slug is empty ${entry.contentId}`);
      assert(entry.repairReason.length > 0, `Repaired record lacks reason ${entry.contentId}`);
    }
    registryById.set(entry.contentId, entry);
    canonicalBySlug.set(entry.canonicalSlug, entry);
  }
  assert.equal(registryById.size, records.length, 'Registry contentId cardinality mismatch');
  assert.equal(canonicalBySlug.size, records.length, 'Registry canonical slug cardinality mismatch');
  assert.deepEqual(
    [...registryById.keys()],
    [...registryById.keys()].slice().sort((a, b) => a.localeCompare(b)),
    'Registry records are not sorted by contentId',
  );

  for (const entry of registry.records) {
    const source = sourceById.get(entry.contentId);
    if (entry.routeStatus !== 'repaired') continue;
    const candidate = slugifyQuestion(source.Question);
    assert(entry.canonicalSlug.startsWith(candidate || 'faq-'), `Repair does not derive from Question ${entry.contentId}`);
  }

  const ledgerSlugs = new Set();
  for (const entry of registry.collisionLedger) {
    assert(typeof entry.sourceSlug === 'string' && entry.sourceSlug.length > 0, 'Collision ledger has no source slug');
    assert(!ledgerSlugs.has(entry.sourceSlug), `Duplicate collision ledger slug ${entry.sourceSlug}`);
    assert.equal(entry.disposition, 'no-redirect', `Collision ledger redirects ${entry.sourceSlug}`);
    assert(Array.isArray(entry.candidateContentIds) && entry.candidateContentIds.length >= 2, `Collision ledger is incomplete ${entry.sourceSlug}`);
    assert.equal(new Set(entry.candidateContentIds).size, entry.candidateContentIds.length, `Collision ledger candidates repeat ${entry.sourceSlug}`);
    for (const contentId of entry.candidateContentIds) {
      assert(sourceById.has(contentId) || /^legacy-row-[1-9][0-9]*$/.test(contentId), `Unknown collision candidate ${contentId}`);
    }
    ledgerSlugs.add(entry.sourceSlug);
  }
  const preserved = registry.records.filter((entry) => entry.routeStatus === 'preserved');
  assert(preserved.length > 0, 'No healthy source slugs were preserved');
  assert(
    preserved.some((entry) => entry.evidenceSource === 'week04-online-url'),
    'Week04 source slugs were not retained',
  );
  for (const entry of registry.records) {
    if (!SAFE_SOURCE_SLUG.test(entry.sourceSlug)) {
      assert.equal(entry.routeStatus, 'repaired', `Unsafe source was preserved ${entry.contentId}`);
    }
    if (entry.collisionDisposition === 'no-redirect') {
      assert.equal(entry.routeStatus, 'repaired', `Collided source was preserved ${entry.contentId}`);
    }
  }
  return { canonicalBySlug, sourceById };
}

function verifyRouteRoundTrips(canonicalBySlug) {
  for (const [canonicalSlug, entry] of canonicalBySlug) {
    const route = `/faq/${encodeURIComponent(canonicalSlug)}`;
    const encodedId = route.slice('/faq/'.length);
    const decodedId = decodeURIComponent(encodedId);
    assert.equal(canonicalBySlug.get(decodedId)?.contentId, entry.contentId, `Route round-trip failed ${canonicalSlug}`);
  }

  const resolve = (value) => {
    try {
      return canonicalBySlug.get(decodeURIComponent(value))?.contentId;
    } catch {
      return undefined;
    }
  };
  for (const value of ['', 'unknown-faq', '%', '%E0%A4%A', '%2F']) {
    assert.equal(resolve(value), undefined, `Malformed route resolved: ${value}`);
  }
}

function verifyRouteWiring(canonicalBySlug) {
  const localized = fs.readFileSync(LOCALIZED_ROUTE, 'utf8');
  const root = fs.readFileSync(ROOT_ROUTE, 'utf8');
  assert(localized.includes('getFaqIds('), 'Localized FAQ route does not use registry-backed IDs');
  assert(localized.includes('getFaqItem('), 'Localized FAQ route does not use registry-backed lookup');
  assert(localized.includes('dynamicParams = false'), 'Localized FAQ route allows dynamic params');
  assert(root.includes('getFaqIds(defaultLocale)'), 'Root FAQ route does not use registry-backed IDs');
  assert(root.includes('dynamicParams = false'), 'Root FAQ route allows dynamic params');
  assert(canonicalBySlug.size > 0, 'Static parameter coverage is empty');
}

function runGeneratorCheck() {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/generate-faq-route-registry.js'), '--check'], {
    cwd: ROOT,
    stdio: 'pipe',
  });
}

function main() {
  const routeWiringOnly = process.argv.includes('--route-wiring');
  const records = readEnglishFaq();
  const evidence = readJson(EVIDENCE_PATH);
  const registry = readJson(REGISTRY_PATH);
  const { canonicalBySlug } = verifyRegistry(records, evidence, registry);
  verifyRouteRoundTrips(canonicalBySlug);
  verifyRouteWiring(canonicalBySlug);
  if (!routeWiringOnly) runGeneratorCheck();
  console.log('FAQ route verification passed');
}

try {
  main();
} catch (error) {
  console.error(`FAQ route verification failed: ${error.message}`);
  process.exitCode = 1;
}
