#!/usr/bin/env node

/**
 * Verify the approved FAQ metadata snapshot and, optionally, exported HTML.
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
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
const ZH_SOURCES = [
  path.join(ROOT, 'src/faq/zh.ts'),
  path.join(ROOT, 'src/faq/w2.ts'),
  path.join(ROOT, 'src/faq/w3.ts')
];
const EXPECTED_CHINESE_COUNT = 1490;

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

function serializeKeywords(value) {
  return value.split(', ').join(',');
}

function getTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  assert(match, 'Missing document title');
  return decodeHtmlEntities(match[1]);
}

function resolveHtml(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  const encodedRoute = relativeRoute
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  const routes = [...new Set([relativeRoute, encodedRoute].filter(Boolean))];
  const candidates = routes.length
    ? routes.flatMap((candidateRoute) => [
        path.join(OUT_DIR, `${candidateRoute}.html`),
        path.join(OUT_DIR, candidateRoute, 'index.html')
      ])
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

function propertyKey(property) {
  const { name } = property;
  if (name && (ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isIdentifier(name))) {
    return name.text;
  }
  return undefined;
}

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

function stringProperty(objectLiteral, propertyName, sourcePath, contentId) {
  const property = objectLiteral.properties.find(
    (candidate) => ts.isPropertyAssignment(candidate) && propertyKey(candidate) === propertyName,
  );
  const value = property && unwrapExpression(property.initializer);
  assert(
    value && ts.isStringLiteralLike(value) && value.text,
    `${path.relative(ROOT, sourcePath)} contentId=${contentId} requires ${propertyName}`,
  );
  return value.text;
}

function readChineseFaqRecords(sourcePath) {
  const source = fs.readFileSync(sourcePath, 'utf8');
  const sourceFile = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true);
  const records = new Map();
  const requiredFields = ['Question', 'Answers', 'Category', 'Title', 'Description', 'Keywords'];

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const contentId = propertyKey(property);
        const value = unwrapExpression(property.initializer);
        if (!contentId || !value || !ts.isObjectLiteralExpression(value)) continue;
        if (!value.properties.some((candidate) => propertyKey(candidate) === 'Question')) continue;
        assert(!records.has(contentId), `Duplicate ${path.basename(sourcePath)} contentId=${contentId}`);
        const record = { contentId, sourcePath };
        for (const field of requiredFields) {
          record[field] = stringProperty(value, field, sourcePath, contentId);
        }
        records.set(contentId, record);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  assert(records.size, `No Chinese FAQ records found in ${path.relative(ROOT, sourcePath)}`);
  return records;
}

function buildOwnerExpectationSet(variant, sourceContext) {
  assert(['io', 'cn'].includes(variant), `Unsupported owner variant: ${variant}`);
  const { artifact, faqRecords, routeIdentity } = sourceContext ?? loadSourceContext();
  if (variant === 'io') {
    const authoredById = new Map(faqRecords.map((record) => [record.contentId, record]));
    return artifact.records.map((record) => {
      const route = routeIdentity.byContentId.get(record.contentId);
      const authored = authoredById.get(record.contentId);
      assert(route, `io contentId=${record.contentId} is missing from the route registry`);
      assert(authored, `io contentId=${record.contentId} is missing from English FAQ source`);
      return {
        variant,
        contentId: record.contentId,
        routeKey: route.canonicalSlug,
        canonicalSlug: route.canonicalSlug,
        sourcePath: path.join(ROOT, 'src/faq/en.ts'),
        Title: record.title,
        Description: record.description,
        Keywords: record.keywords,
        Question: authored.Question,
        Answers: authored.Answers
      };
    });
  }

  const records = new Map();
  for (const sourcePath of ZH_SOURCES) {
    for (const [contentId, record] of readChineseFaqRecords(sourcePath)) {
      assert(!records.has(contentId), `Duplicate Chinese FAQ contentId=${contentId}`);
      records.set(contentId, record);
    }
  }
  assert.equal(records.size, EXPECTED_CHINESE_COUNT, `Expected ${EXPECTED_CHINESE_COUNT} Chinese FAQ records`);
  assert(
    [...records.keys()].some((contentId) => !routeIdentity.byContentId.has(contentId)),
    'Expected at least one Chinese-only FAQ identity absent from the English route registry',
  );
  return [...records.values()]
    .sort((left, right) => left.contentId.localeCompare(right.contentId, 'en'))
    .map((record) => ({ ...record, variant, routeKey: record.contentId }));
}

function verifyFaqHtml(record) {
  const route = `/faq/${record.routeKey}`;
  try {
    const { htmlPath, html } = resolveHtml(route);
    const expectedMetadata = normalizeFaqMetadataPolicy({
      title: record.Title,
      description: record.Description
    });
    assert.equal(getTitle(html), expectedMetadata.title, 'title mismatch');
    assert.equal(getMetaContent(html, 'name', 'description'), expectedMetadata.description, 'description mismatch');
    assert.equal(getMetaContent(html, 'name', 'keywords'), serializeKeywords(record.Keywords), 'keywords mismatch');
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripHtml(match[1]));
    assert.equal(headings.length, 1, 'must contain one H1');
    assert.equal(headings[0], record.Question, 'H1/question identity drift');
    assert(extractJsonLdQuestions(html).includes(record.Question), 'FAQ JSON-LD question identity drift');
  } catch (error) {
    throw new Error(
      `[faq-metadata] variant=${record.variant} contentId=${record.contentId} route=${route} source=${path.relative(ROOT, record.sourcePath)}: ${error.message}`,
    );
  }
}

function verifyCaseInsensitiveExportCollisions(expectations) {
  if (process.platform !== 'darwin') return;
  const paths = new Map();
  for (const record of expectations) {
    const exportPath = path.join(OUT_DIR, 'faq', `${record.routeKey}.html`);
    const key = exportPath.toLowerCase();
    const previous = paths.get(key);
    if (previous && previous !== record.routeKey) {
      const previousPath = path.join(OUT_DIR, 'faq', `${previous}.html`);
      const bothExist = fs.existsSync(previousPath) && fs.existsSync(exportPath);
      const sameFile = bothExist &&
        fs.realpathSync.native(previousPath) === fs.realpathSync.native(exportPath);
      if (!sameFile) {
        paths.set(key, record.routeKey);
        continue;
      }
      throw new Error(
        `[faq-metadata] macOS case-insensitive export collision: ${previous} and ${record.routeKey}; run --html on a case-sensitive build host`,
      );
    }
    paths.set(key, record.routeKey);
  }
}

function verifyHtmlExport(variant, sourceContext) {
  const expectations = buildOwnerExpectationSet(variant, sourceContext);
  verifyCaseInsensitiveExportCollisions(expectations);
  for (const record of expectations) verifyFaqHtml(record);
  return expectations.length;
}

function parseArgs(argv, env = process.env) {
  const options = { html: false, variant: undefined };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--html') options.html = true;
    else if (token === '--variant') {
      const variant = argv[++index];
      if (!variant) throw new Error('--variant requires io or cn');
      if (!['io', 'cn'].includes(variant)) throw new Error(`Unsupported --variant: ${variant}; use io or cn`);
      options.variant = variant;
    } else {
      throw new Error(`Unknown argument: ${token}`);
    }
  }
  if (options.variant && !options.html) throw new Error('--variant requires --html');
  if (options.html && !options.variant) {
    const variant = env.NEXT_PUBLIC_SITE_VARIANT;
    if (!['io', 'cn'].includes(variant)) throw new Error('--html requires --variant io|cn or NEXT_PUBLIC_SITE_VARIANT=io|cn');
    options.variant = variant;
  }
  return options;
}

function main(argv = process.argv.slice(2), env = process.env) {
  const options = parseArgs(argv, env);
  const sourceContext = loadSourceContext();
  const { artifact, faqRecords, routeIdentity } = sourceContext;
  const fallbackRecords = verifyCatalogOverlay(artifact, faqRecords);
  verifyFailureDiagnostics(artifact, faqRecords, routeIdentity);
  if (options.html) {
    const checked = verifyHtmlExport(options.variant, sourceContext);
    console.log(
      `[verify-faq-metadata] passed source + HTML checks (${options.variant}, ${checked} FAQ pages; ${artifact.records.length} mapped, ${fallbackRecords.length} fallback)`,
    );
    return;
  }
  console.log(
    `[verify-faq-metadata] passed source checks (${artifact.records.length} mapped, ${fallbackRecords.length} fallback, ${faqRecords.length} total)`,
  );
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { parseArgs, buildOwnerExpectationSet };
