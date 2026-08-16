#!/usr/bin/env node

/**
 * Generate and verify the build-time English FAQ metadata snapshot.
 *
 * The reviewed workbook is read with the platform unzip utility so this
 * script stays dependency-free. Runtime routes consume only the committed
 * JSON artifact; the external workbook is required for --write only.
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const limits = require('../src/lib/faqMetadata.constants.json');

const ROOT = path.resolve(__dirname, '..');
const FAQ_SOURCE = path.join(ROOT, 'src/faq/en.ts');
const ROUTE_REGISTRY = path.join(ROOT, 'src/faq/generated-en-route-registry.json');
const ROUTE_EVIDENCE = path.join(ROOT, 'src/faq/english-route-evidence.json');
const OUTPUT = path.join(ROOT, 'src/faq/generated-en-metadata.json');
const EXPECTED_RECORD_COUNT = 1195;
const EXPECTED_FAQ_COUNT = 1400;
const TITLE_MIN_LENGTH = 32;
const TITLE_MAX_INPUT_LENGTH = 50;
const FAQ_BRAND_SUFFIX = ' - FastGPT';
const FAQ_BRAND_SUFFIX_PATTERN = /\s*(?:[-|｜]\s*)?FastGPT\s*$/i;
const SENTENCE_BOUNDARIES = new Set(['.', '!', '?', '。', '！', '？', ';', '；']);
const DEFAULT_WORKBOOK_NAME =
  'FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx';

function fail(message) {
  throw new Error(`[faq-metadata] ${message}`);
}

function decodeXml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function unzipEntry(archivePath, entry) {
  try {
    return execFileSync('unzip', ['-p', archivePath, entry], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    });
  } catch (error) {
    fail(`Unable to read ${entry} from ${archivePath}: ${error.message}`);
  }
}

function parseAttributes(source) {
  const attributes = {};
  for (const match of source.matchAll(/([:\w-]+)\s*=\s*"([^"]*)"/g)) {
    attributes[match[1]] = decodeXml(match[2]);
  }
  return attributes;
}

function parseSharedStrings(xml) {
  if (!xml) return [];
  return [...xml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)].map((match) =>
    [...match[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)]
      .map((text) => decodeXml(text[1]))
      .join(''),
  );
}

function parseSheet(xml, sharedStrings = []) {
  return [...xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)].map((rowMatch) => {
    const row = {};
    for (const cellMatch of rowMatch[1].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const attributes = parseAttributes(cellMatch[1]);
      const column = attributes.r?.match(/^([A-Z]+)/)?.[1];
      if (!column) continue;
      const body = cellMatch[2] || '';
      const inlineText = [...body.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)]
        .map((match) => decodeXml(match[1]))
        .join('');
      const valueMatch = body.match(/<v\b[^>]*>([\s\S]*?)<\/v>/);
      let value = inlineText || (valueMatch ? decodeXml(valueMatch[1]) : '');
      if (attributes.t === 's' && value) value = sharedStrings[Number(value)] ?? value;
      row[column] = value;
    }
    return row;
  });
}

function readWorkbookSheets(archivePath) {
  if (!fs.existsSync(archivePath)) fail(`Workbook path does not exist: ${archivePath}`);
  const workbook = unzipEntry(archivePath, 'xl/workbook.xml');
  const relationships = unzipEntry(archivePath, 'xl/_rels/workbook.xml.rels');
  const relationshipTargets = Object.fromEntries(
    [...relationships.matchAll(/<Relationship\b([^>]*?)(?:\/>|>[^<]*<\/Relationship>)/g)].map(
      (match) => {
        const attributes = parseAttributes(match[1]);
        return [attributes.Id, attributes.Target];
      },
    ),
  );
  const sharedStrings = parseSharedStrings(
    (() => {
      try {
        return unzipEntry(archivePath, 'xl/sharedStrings.xml');
      } catch {
        return '';
      }
    })(),
  );
  const sheets = {};
  for (const match of workbook.matchAll(/<sheet\b([^>]*?)(?:\/>|>[^<]*<\/sheet>)/g)) {
    const attributes = parseAttributes(match[1]);
    const target = relationshipTargets[attributes['r:id']];
    if (!target) continue;
    const entry = target.replace(/^\//, '');
    sheets[attributes.name] = parseSheet(unzipEntry(archivePath, entry), sharedStrings);
  }
  return sheets;
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

function getPropertyKey(property) {
  const { name } = property;
  if (ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isIdentifier(name)) {
    return name.text;
  }
  fail(`Unsupported FAQ property name in ${FAQ_SOURCE}`);
}

function getStringProperty(objectLiteral, propertyName, contentId) {
  const property = objectLiteral.properties.find(
    (candidate) => ts.isPropertyAssignment(candidate) && getPropertyKey(candidate) === propertyName,
  );
  if (!property) fail(`Missing ${propertyName} for FAQ contentId ${contentId}`);
  const initializer = unwrapExpression(property.initializer);
  if (!initializer || !ts.isStringLiteralLike(initializer)) {
    fail(`${propertyName} for FAQ contentId ${contentId} must be a string literal`);
  }
  return initializer.text;
}

function readEnglishFaq() {
  const source = fs.readFileSync(FAQ_SOURCE, 'utf8');
  const sourceFile = ts.createSourceFile(FAQ_SOURCE, source, ts.ScriptTarget.Latest, true);
  let objectLiteral;
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'faq') continue;
      objectLiteral = unwrapExpression(declaration.initializer);
    }
  }
  if (!objectLiteral || !ts.isObjectLiteralExpression(objectLiteral)) {
    fail(`faq in ${FAQ_SOURCE} must be an object literal`);
  }

  const records = [];
  const seen = new Set();
  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) fail(`Unsupported property in ${FAQ_SOURCE}`);
    const contentId = getPropertyKey(property);
    if (seen.has(contentId)) fail(`Duplicate English FAQ contentId: ${contentId}`);
    seen.add(contentId);
    const value = unwrapExpression(property.initializer);
    if (!value || !ts.isObjectLiteralExpression(value)) {
      fail(`FAQ contentId ${contentId} must contain an object literal`);
    }
    records.push({
      contentId,
      Question: getStringProperty(value, 'Question', contentId),
      Answers: getStringProperty(value, 'Answers', contentId),
      Category: getStringProperty(value, 'Category', contentId)
    });
  }
  if (records.length !== EXPECTED_FAQ_COUNT) {
    fail(`Expected ${EXPECTED_FAQ_COUNT} English FAQ records, found ${records.length}`);
  }
  return records;
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`Unable to read ${filePath}: ${error.message}`);
  }
}

function loadRouteIdentity() {
  const registry = readJson(ROUTE_REGISTRY);
  const evidence = readJson(ROUTE_EVIDENCE);
  if (!Array.isArray(registry.records) || !Array.isArray(evidence.records)) {
    fail('Phase 1 route artifacts must contain records arrays');
  }
  const byContentId = new Map();
  for (const record of registry.records) {
    if (byContentId.has(record.contentId)) fail(`Duplicate route contentId: ${record.contentId}`);
    byContentId.set(record.contentId, record);
  }
  const bySourceSlug = new Map();
  for (const record of evidence.records) {
    if (bySourceSlug.has(record.sourceSlug)) {
      fail(`Duplicate route evidence sourceSlug: ${record.sourceSlug}`);
    }
    const route = byContentId.get(record.contentId);
    if (!route) fail(`Route evidence references unknown contentId: ${record.contentId}`);
    if (route.sourceSlug !== record.sourceSlug) {
      fail(`Route evidence sourceSlug drift for ${record.contentId}`);
    }
    bySourceSlug.set(record.sourceSlug, record.contentId);
  }
  return { registry, evidence, byContentId, bySourceSlug };
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function truncateAtBoundary(value, maxLength) {
  const characters = Array.from(value);
  if (characters.length <= maxLength) return value;

  const marker = '...';
  const contentLength = Math.max(1, maxLength - marker.length);
  const prefix = characters.slice(0, contentLength);
  let sentenceBoundary = -1;
  for (let index = 0; index < prefix.length; index += 1) {
    if (SENTENCE_BOUNDARIES.has(prefix[index])) sentenceBoundary = index;
  }
  const whitespaceBoundary = prefix.lastIndexOf(' ');
  const minimumBoundary = Math.floor(contentLength * 0.6);
  const boundary =
    sentenceBoundary >= minimumBoundary
      ? sentenceBoundary + 1
      : whitespaceBoundary >= minimumBoundary
        ? whitespaceBoundary
        : contentLength;
  return `${prefix.slice(0, boundary).join('').trimEnd()}${marker}`;
}

function normalizeFaqMetadataPolicy(input) {
  const title = 'title' in input ? input.title : input.Title;
  const description = 'description' in input ? input.description : input.Description;
  const titleBase = normalizeWhitespace(title).replace(FAQ_BRAND_SUFFIX_PATTERN, '').trim();
  const titleBudget = limits.TITLE_MAX_LENGTH - FAQ_BRAND_SUFFIX.length;
  const boundedTitle = truncateAtBoundary(titleBase || 'FastGPT', titleBudget);
  return {
    title: `${boundedTitle}${FAQ_BRAND_SUFFIX}`,
    description: truncateAtBoundary(
      normalizeWhitespace(description),
      limits.DESCRIPTION_MAX_LENGTH,
    )
  };
}

function sha256(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function compareContentIds(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function authoredDigests(record) {
  return {
    Question: sha256(record.Question),
    Answers: sha256(record.Answers),
    Category: sha256(record.Category)
  };
}

function failRecord(record, message) {
  const context = record?.workbookRow ? `row ${record.workbookRow}` : 'record';
  const id = record?.contentId ? ` contentId ${record.contentId}` : '';
  fail(`${context}${id}: ${message}`);
}

function assertMetadataFields(record) {
  for (const field of ['title', 'description', 'keywords']) {
    if (typeof record[field] !== 'string' || !record[field].trim()) {
      failRecord(record, `${field} must be a non-empty string`);
    }
  }

  const title = record.title.trim();
  const titleLength = Array.from(title).length;
  if (titleLength < TITLE_MIN_LENGTH || titleLength > TITLE_MAX_INPUT_LENGTH) {
    failRecord(
      record,
      `title length ${titleLength} must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_INPUT_LENGTH}`,
    );
  }
  if (FAQ_BRAND_SUFFIX_PATTERN.test(title)) {
    failRecord(record, 'title must be suffix-free before rendering');
  }
  const rendered = normalizeFaqMetadataPolicy({ title: record.title, description: record.description });
  const suffixCount = rendered.title.split(FAQ_BRAND_SUFFIX).length - 1;
  if (suffixCount !== 1 || !rendered.title.endsWith(FAQ_BRAND_SUFFIX)) {
    failRecord(record, 'rendered title must contain exactly one ` - FastGPT` suffix');
  }
  if (Array.from(rendered.title).length > limits.TITLE_MAX_LENGTH) {
    failRecord(
      record,
      `rendered title exceeds ${limits.TITLE_MAX_LENGTH} characters`,
    );
  }
  if (Array.from(record.description).length > limits.DESCRIPTION_MAX_LENGTH) {
    failRecord(
      record,
      `description exceeds ${limits.DESCRIPTION_MAX_LENGTH} characters before rendering`,
    );
  }
}

function buildRouteMaps(routeIdentity, faqRecords) {
  const sourceToContent = routeIdentity.bySourceSlug;
  const contentIds = new Set(faqRecords.map((record) => record.contentId));
  for (const [sourceSlug, contentId] of sourceToContent) {
    if (!contentIds.has(contentId)) fail(`Route identity references missing FAQ source ${contentId}`);
  }
  return routeIdentity;
}

function buildArtifactFromWorkbook(workbookPath, faqRecords, routeIdentity) {
  const sheets = readWorkbookSheets(workbookPath);
  const rows = sheets['FAQ Data'];
  if (!rows?.length) fail('Workbook is missing the FAQ Data sheet');
  const expectedHeaders = {
    A: 'no',
    B: 'category',
    C: 'question',
    D: 'title',
    E: 'description',
    F: 'keywords',
    G: '线上URL（08-11 实测可达）'
  };
  for (const [column, expected] of Object.entries(expectedHeaders)) {
    if (rows[0][column] !== expected) {
      fail(`FAQ Data header ${column} must be ${expected}, found ${rows[0][column] || '(empty)'}`);
    }
  }
  const dataRows = rows.slice(1);
  if (dataRows.length !== EXPECTED_RECORD_COUNT) {
    fail(`Expected ${EXPECTED_RECORD_COUNT} FAQ Data rows, found ${dataRows.length}`);
  }

  const faqById = new Map(faqRecords.map((record) => [record.contentId, record]));
  const seenSourceSlugs = new Set();
  const seenContentIds = new Set();
  const records = dataRows.map((row, index) => {
    const workbookRow = index + 2;
    const value = (column) => (typeof row[column] === 'string' ? row[column] : String(row[column] ?? ''));
    const onlineUrl = value('G');
    let parsed;
    try {
      parsed = new URL(onlineUrl);
    } catch {
      fail(`Workbook row ${workbookRow} has an invalid online URL: ${onlineUrl}`);
    }
    if (parsed.protocol !== 'https:' || parsed.hostname !== 'fastgpt.io' || parsed.port) {
      fail(`Workbook row ${workbookRow} must use an https fastgpt.io URL: ${onlineUrl}`);
    }
    if (parsed.search || parsed.hash) {
      fail(`Workbook row ${workbookRow} URL must not contain query/hash values: ${onlineUrl}`);
    }
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length !== 2 || parts[0] !== 'faq') {
      fail(`Workbook row ${workbookRow} must target /faq/<slug>: ${onlineUrl}`);
    }
    let sourceSlug;
    try {
      sourceSlug = decodeURIComponent(parts[1]);
    } catch {
      fail(`Workbook row ${workbookRow} has an invalid encoded slug: ${onlineUrl}`);
    }
    if (!sourceSlug || sourceSlug.includes('/')) {
      fail(`Workbook row ${workbookRow} has an unsafe FAQ slug: ${sourceSlug}`);
    }
    if (seenSourceSlugs.has(sourceSlug)) fail(`Workbook row ${workbookRow} duplicates source slug ${sourceSlug}`);
    seenSourceSlugs.add(sourceSlug);
    const contentId = routeIdentity.bySourceSlug.get(sourceSlug);
    if (!contentId) fail(`Workbook row ${workbookRow} references unknown source slug ${sourceSlug}`);
    if (seenContentIds.has(contentId)) {
      fail(`Workbook row ${workbookRow} maps to duplicate contentId ${contentId}`);
    }
    seenContentIds.add(contentId);
    const authored = faqById.get(contentId);
    if (!authored) fail(`Workbook row ${workbookRow} maps to missing FAQ contentId ${contentId}`);
    const record = {
      contentId,
      sourceSlug,
      workbookRow,
      title: value('D'),
      description: value('E'),
      keywords: value('F'),
      authoredDigests: authoredDigests(authored)
    };
    assertMetadataFields(record);
    return record;
  });

  records.sort((a, b) => compareContentIds(a.contentId, b.contentId));
  return {
    version: 1,
    source: {
      workbook: path.basename(workbookPath) || DEFAULT_WORKBOOK_NAME,
      sheet: 'FAQ Data',
      dataRows: EXPECTED_RECORD_COUNT
    },
    records
  };
}

function validateArtifact(artifact, faqRecords, routeIdentity) {
  if (!artifact || typeof artifact !== 'object') fail('Metadata artifact must be an object');
  if (artifact.version !== 1) fail(`Metadata artifact version must be 1, found ${artifact.version}`);
  if (!artifact.source || artifact.source.sheet !== 'FAQ Data') {
    fail('Metadata artifact source sheet must be FAQ Data');
  }
  if (artifact.source.dataRows !== EXPECTED_RECORD_COUNT) {
    fail(`Metadata artifact source row count must be ${EXPECTED_RECORD_COUNT}`);
  }
  if (!Array.isArray(artifact.records) || artifact.records.length !== EXPECTED_RECORD_COUNT) {
    fail(`Metadata artifact must contain exactly ${EXPECTED_RECORD_COUNT} records`);
  }
  const faqById = new Map(faqRecords.map((record) => [record.contentId, record]));
  const seenContentIds = new Set();
  const seenSourceSlugs = new Set();
  let previousContentId = '';
  for (const record of artifact.records) {
    if (!record || typeof record !== 'object') fail('Metadata artifact contains a malformed record');
    if (!record.contentId || record.contentId <= previousContentId) {
      failRecord(record, 'records must be sorted uniquely by contentId');
    }
    previousContentId = record.contentId;
    if (seenContentIds.has(record.contentId)) failRecord(record, 'duplicate contentId');
    seenContentIds.add(record.contentId);
    if (seenSourceSlugs.has(record.sourceSlug)) failRecord(record, 'duplicate sourceSlug');
    seenSourceSlugs.add(record.sourceSlug);
    const authored = faqById.get(record.contentId);
    if (!authored) failRecord(record, 'unknown contentId');
    if (routeIdentity.bySourceSlug.get(record.sourceSlug) !== record.contentId) {
      failRecord(record, `sourceSlug does not resolve to ${record.contentId} through Phase 1 evidence`);
    }
    if (!routeIdentity.byContentId.has(record.contentId)) {
      failRecord(record, 'contentId is missing from the Phase 1 route registry');
    }
    if (!Number.isInteger(record.workbookRow) || record.workbookRow < 2) {
      failRecord(record, 'workbookRow must be an integer greater than 1');
    }
    assertMetadataFields(record);
    const expectedDigests = authoredDigests(authored);
    if (JSON.stringify(record.authoredDigests) !== JSON.stringify(expectedDigests)) {
      failRecord(record, 'authored Question/Answers/Category digest drift');
    }
  }
  if (seenContentIds.size !== EXPECTED_RECORD_COUNT || seenSourceSlugs.size !== EXPECTED_RECORD_COUNT) {
    fail('Metadata artifact identity sets are incomplete');
  }
  return artifact;
}

function serializeArtifact(artifact) {
  return `${JSON.stringify(artifact, null, 2)}\n`;
}

function parseArgs(argv) {
  const args = [...argv];
  if (args.includes('--help') || args.includes('-h')) {
    console.log(
      'Usage: node scripts/generate-faq-metadata.js --write --workbook <path> | --check',
    );
    process.exit(0);
  }
  const write = args.includes('--write');
  const check = args.includes('--check');
  if (write && check) fail('Choose either --write or --check');
  const workbookIndex = args.indexOf('--workbook');
  if (workbookIndex >= 0 && !args[workbookIndex + 1]) fail('--workbook requires a path');
  const workbookPath = workbookIndex >= 0 ? path.resolve(args[workbookIndex + 1]) : null;
  if (write && !workbookPath) fail('--write requires --workbook <path>');
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--workbook') {
      index += 1;
      continue;
    }
    if (args[index] !== '--write' && args[index] !== '--check') {
      fail(`Unknown argument: ${args[index]}`);
    }
  }
  return { mode: write ? 'write' : 'check', workbookPath };
}

function writeAtomically(content) {
  const tempPath = `${OUTPUT}.tmp-${process.pid}`;
  try {
    fs.writeFileSync(tempPath, content, 'utf8');
    fs.renameSync(tempPath, OUTPUT);
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

function main(argv = process.argv.slice(2)) {
  const { mode, workbookPath } = parseArgs(argv);
  const faqRecords = readEnglishFaq();
  const routeIdentity = buildRouteMaps(loadRouteIdentity(), faqRecords);
  if (mode === 'write') {
    const artifact = buildArtifactFromWorkbook(workbookPath, faqRecords, routeIdentity);
    validateArtifact(artifact, faqRecords, routeIdentity);
    writeAtomically(serializeArtifact(artifact));
    console.log(`[generate-faq-metadata] wrote ${artifact.records.length} records`);
    return artifact;
  }

  const raw = fs.readFileSync(OUTPUT, 'utf8');
  const artifact = readJson(OUTPUT);
  validateArtifact(artifact, faqRecords, routeIdentity);
  if (serializeArtifact(artifact) !== raw) {
    fail('Committed metadata artifact is not deterministically serialized; run --write');
  }
  console.log(`[generate-faq-metadata] check passed (${artifact.records.length} records)`);
  return artifact;
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  EXPECTED_FAQ_COUNT,
  EXPECTED_RECORD_COUNT,
  FAQ_BRAND_SUFFIX,
  OUTPUT,
  authoredDigests,
  buildArtifactFromWorkbook,
  loadRouteIdentity,
  normalizeFaqMetadataPolicy,
  readEnglishFaq,
  serializeArtifact,
  validateArtifact
};
