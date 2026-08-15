#!/usr/bin/env node

/**
 * Verify the approved FAQ metadata snapshot and, optionally, exported HTML.
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  EXPECTED_FAQ_COUNT,
  EXPECTED_RECORD_COUNT,
  OUTPUT,
  loadRouteIdentity,
  normalizeFaqMetadataPolicy,
  readEnglishFaq,
  validateArtifact
} = require('./generate-faq-metadata');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');
const FAQ_INDEX_SOURCE = path.join(ROOT, 'src/faq/index.ts');
const FAQ_SOURCE = path.join(ROOT, 'src/faq/en.ts');
const TITLE_SUFFIX = ' - FastGPT';

function readArtifact() {
  try {
    return JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
  } catch (error) {
    throw new Error(`[faq-metadata] Unable to read ${OUTPUT}: ${error.message}`);
  }
}

function loadSourceContext() {
  const faqRecords = readEnglishFaq();
  const routeIdentity = loadRouteIdentity();
  const artifact = readArtifact();
  validateArtifact(artifact, faqRecords, routeIdentity);
  return { artifact, faqRecords, routeIdentity };
}

function verifyCatalogOverlay(artifact, faqRecords) {
  assert.equal(faqRecords.length, EXPECTED_FAQ_COUNT, `Expected ${EXPECTED_FAQ_COUNT} English FAQ records`);
  assert.equal(artifact.records.length, EXPECTED_RECORD_COUNT, `Expected ${EXPECTED_RECORD_COUNT} metadata records`);
  const artifactIds = new Set(artifact.records.map((record) => record.contentId));
  const fallbackRecords = faqRecords.filter((record) => !artifactIds.has(record.contentId));
  assert.equal(
    fallbackRecords.length,
    EXPECTED_FAQ_COUNT - EXPECTED_RECORD_COUNT,
    'The out-of-batch FAQ fallback count must remain 205',
  );

  const source = fs.readFileSync(FAQ_INDEX_SOURCE, 'utf8');
  for (const required of [
    "./generated-en-metadata.json",
    'approvedEnglishFaqMetadataByContentId',
    'faqEnWithApprovedMetadata',
    'Title: approved.title',
    'Description: approved.description',
    'Keywords: approved.keywords',
    'legacyFaqMeta[id]',
    "applyLegacyCategoryOverlay(faqEnWithApprovedMetadata, 'en')"
  ]) {
    assert(source.includes(required), `FAQ catalog overlay is missing ${required}`);
  }

  const authoredIds = new Set(faqRecords.map((record) => record.contentId));
  for (const record of artifact.records) {
    assert(authoredIds.has(record.contentId), `${record.contentId} is missing from authored FAQ source`);
    assert(record.title && record.description && record.keywords, `${record.contentId} has incomplete approved metadata`);
  }
  return fallbackRecords;
}

function expectMutationFailure(label, artifact, faqRecords, routeIdentity, mutate, expectedText) {
  const mutated = JSON.parse(JSON.stringify(artifact));
  mutate(mutated);
  assert.throws(
    () => validateArtifact(mutated, faqRecords, routeIdentity),
    (error) => {
      assert.match(error.message, new RegExp(expectedText));
      return true;
    },
    `${label} mutation must fail with a record-level diagnostic`,
  );
}

function verifyFailureDiagnostics(artifact, faqRecords, routeIdentity) {
  expectMutationFailure(
    'duplicate source slug',
    artifact,
    faqRecords,
    routeIdentity,
    (mutated) => {
      mutated.records[1].sourceSlug = mutated.records[0].sourceSlug;
    },
    'sourceSlug',
  );
  expectMutationFailure(
    'authored content drift',
    artifact,
    faqRecords,
    routeIdentity,
    (mutated) => {
      mutated.records[0].authoredDigests.Question = '0'.repeat(64);
    },
    'authored Question/Answers/Category digest drift',
  );
  expectMutationFailure(
    'missing approved title',
    artifact,
    faqRecords,
    routeIdentity,
    (mutated) => {
      mutated.records[0].title = '';
    },
    'title must be a non-empty string',
  );
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, codePoint) =>
      String.fromCodePoint(Number.parseInt(codePoint, 16)),
    )
    .replace(/&#([0-9]+);/g, (_, codePoint) =>
      String.fromCodePoint(Number.parseInt(codePoint, 10)),
    )
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function stripHtml(value) {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || [];
}

function getAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`\\s${attribute}="([^"]*)"`, 'i'));
  return match?.[1];
}

function getMetaContent(html, attribute, value) {
  const tag = getTags(html, 'meta').find((candidate) => getAttribute(candidate, attribute) === value);
  assert(tag, `Missing meta ${attribute}="${value}"`);
  return decodeHtmlEntities(getAttribute(tag, 'content') || '');
}

function getTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  assert(match, 'Missing document title');
  return decodeHtmlEntities(match[1]);
}

function resolveHtml(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  const candidates = relativeRoute
    ? [path.join(OUT_DIR, `${relativeRoute}.html`), path.join(OUT_DIR, relativeRoute, 'index.html')]
    : [path.join(OUT_DIR, 'index.html')];
  const htmlPath = candidates.find((candidate) => fs.existsSync(candidate));
  assert(htmlPath, `Missing static HTML for ${route}; checked ${candidates.join(', ')}`);
  return { htmlPath, html: fs.readFileSync(htmlPath, 'utf8') };
}

function extractJsonLdQuestions(html) {
  const questions = [];
  for (const match of html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    const jsonText = decodeHtmlEntities(match[1].trim());
    try {
      const parsed = JSON.parse(jsonText);
      const visit = (value) => {
        if (!value || typeof value !== 'object') return;
        if (value['@type'] === 'Question' && typeof value.name === 'string') questions.push(value.name);
        for (const child of Object.values(value)) {
          if (child && typeof child === 'object') visit(child);
        }
      };
      visit(parsed);
    } catch {
      // Other JSON-LD blocks may contain framework placeholders; FAQ blocks are checked below.
    }
  }
  return questions;
}

function verifyFaqHtml(record, route) {
  const { htmlPath, html } = resolveHtml(`/faq/${route.canonicalSlug}`);
  const expectedMetadata = normalizeFaqMetadataPolicy({
    title: record.title,
    description: record.description
  });
  assert.equal(getTitle(html), expectedMetadata.title, `${record.contentId} title mismatch in ${htmlPath}`);
  assert.equal(
    getMetaContent(html, 'name', 'description'),
    expectedMetadata.description,
    `${record.contentId} description mismatch in ${htmlPath}`,
  );
  assert.equal(
    getMetaContent(html, 'name', 'keywords'),
    record.keywords,
    `${record.contentId} keywords mismatch in ${htmlPath}`,
  );

  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripHtml(match[1]));
  assert.equal(headings.length, 1, `${record.contentId} must contain one H1`);
  const authored = route.authored;
  assert.equal(headings[0], authored.Question, `${record.contentId} H1/question identity drift`);
  const questions = extractJsonLdQuestions(html);
  assert(questions.includes(authored.Question), `${record.contentId} FAQ JSON-LD question identity drift`);
}

function verifyHtmlExport(artifact, faqRecords, routeIdentity) {
  const faqById = new Map(faqRecords.map((record) => [record.contentId, record]));
  for (const record of artifact.records) {
    const route = routeIdentity.byContentId.get(record.contentId);
    assert(route, `${record.contentId} is missing from the route registry`);
    verifyFaqHtml(record, { ...route, authored: faqById.get(record.contentId) });
  }
  return artifact.records.length;
}

function main(argv = process.argv.slice(2)) {
  const htmlMode = argv.includes('--html');
  const unexpected = argv.filter((arg) => arg !== '--html');
  assert.equal(unexpected.length, 0, `Unknown arguments: ${unexpected.join(', ')}`);
  const { artifact, faqRecords, routeIdentity } = loadSourceContext();
  const fallbackRecords = verifyCatalogOverlay(artifact, faqRecords);
  verifyFailureDiagnostics(artifact, faqRecords, routeIdentity);
  if (htmlMode) {
    const checked = verifyHtmlExport(artifact, faqRecords, routeIdentity);
    console.log(
      `[verify-faq-metadata] passed source + HTML checks (${checked} mapped, ${fallbackRecords.length} fallback)`,
    );
    return;
  }
  console.log(
    `[verify-faq-metadata] passed source checks (${artifact.records.length} mapped, ${fallbackRecords.length} fallback, ${faqRecords.length} total)`,
  );
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
