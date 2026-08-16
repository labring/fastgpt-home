#!/usr/bin/env node

/**
 * Generate and verify the build-time English FAQ route registry.
 *
 * The workbook is intentionally read with the platform unzip utility so this
 * script stays dependency-free. The committed JSON snapshot is the default
 * input for --check, which keeps production builds independent of the source
 * workbook's filesystem location.
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const FAQ_SOURCE = path.join(ROOT, 'src/faq/en.ts');
const EVIDENCE_OUTPUT = path.join(ROOT, 'src/faq/english-route-evidence.json');
const REGISTRY_OUTPUT = path.join(ROOT, 'src/faq/generated-en-route-registry.json');
const SAFE_REPAIRED_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SAFE_SOURCE_SLUG = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
const SAFE_PRESERVED_SLUG = SAFE_REPAIRED_SLUG;
const EVIDENCE_SOURCES = new Set(['week04-online-url', 'repository-current-key']);

function fail(message) {
  throw new Error(message);
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
  const sheets = {};
  const sharedStrings = parseSharedStrings(
    (() => {
      try {
        return unzipEntry(archivePath, 'xl/sharedStrings.xml');
      } catch {
        return '';
      }
    })(),
  );

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
    records.push({ contentId, question: getStringProperty(value, 'Question', contentId) });
  }
  if (!records.length) fail('English FAQ source is empty');
  return records;
}

function slugFromUrl(value, rowNumber) {
  if (!value) fail(`Workbook row ${rowNumber} is missing its online URL`);
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail(`Workbook row ${rowNumber} has an invalid online URL: ${value}`);
  }
  if (parsed.hostname !== 'fastgpt.io') {
    fail(`Workbook row ${rowNumber} must use fastgpt.io: ${value}`);
  }
  const parts = parsed.pathname.split('/').filter(Boolean);
  if (parts.length !== 2 || parts[0] !== 'faq') {
    fail(`Workbook row ${rowNumber} must target /faq/<slug>: ${value}`);
  }
  return decodeURIComponent(parts[1]);
}

function parseCandidateNumbers(value) {
  if (!value || value === '—' || value === '-') return [];
  const numbers = value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => Number(part));
  if (numbers.some((number) => !Number.isInteger(number) || number < 1)) {
    fail(`Invalid collision candidate list: ${value}`);
  }
  return numbers;
}

function readXlsxEvidence(archivePath, faqRecords) {
  const sheets = readWorkbookSheets(archivePath);
  const rows = sheets['FAQ Data'];
  if (!rows?.length) fail('Workbook is missing the FAQ Data sheet');

  const bySourceSlug = new Map();
  const sourceById = new Map(faqRecords.map((record) => [record.contentId, record]));
  for (const [index, row] of rows.slice(1).entries()) {
    const rowNumber = index + 2;
    const sourceSlug = slugFromUrl(row.G, rowNumber);
    if (bySourceSlug.has(sourceSlug)) fail(`Duplicate workbook online URL slug: ${sourceSlug}`);
    const record = sourceById.get(sourceSlug);
    if (!record) fail(`Workbook row ${rowNumber} references unknown FAQ slug: ${sourceSlug}`);
    // The workbook question is editorial metadata and can differ from the
    // authored question. The verified online slug is the stable join key.
    bySourceSlug.set(sourceSlug, {
      contentId: record.contentId,
      sourceSlug,
      onlineUrl: row.G,
      evidenceSource: 'week04-online-url'
    });
  }

  const collisionLedger = [];
  const collisionRows = sheets['写了也看不见-需先改slug'] || [];
  const seenCollisionSlugs = new Set();
  for (const [index, row] of collisionRows.slice(1).entries()) {
    if (row.B !== '200' || Number(row.C) < 2) continue;
    const sourceSlug = row.A;
    if (!sourceSlug || seenCollisionSlugs.has(sourceSlug)) {
      fail(`Duplicate or missing collision source slug at workbook row ${index + 2}`);
    }
    seenCollisionSlugs.add(sourceSlug);
    const candidateNumbers = [...new Set([
      ...parseCandidateNumbers(row.D),
      ...parseCandidateNumbers(row.E)
    ])];
    if (candidateNumbers.length < 2) {
      fail(`Collision row ${index + 2} needs at least two candidate content IDs`);
    }
    const candidateContentIds = candidateNumbers.map((number) =>
      faqRecords[number - 1]?.contentId || `legacy-row-${number}`,
    );
    collisionLedger.push({ sourceSlug, candidateContentIds, disposition: 'no-redirect' });
  }

  return {
    records: [...bySourceSlug.values()].sort((a, b) => a.contentId.localeCompare(b.contentId)),
    collisionLedger: collisionLedger.sort((a, b) => a.sourceSlug.localeCompare(b.sourceSlug))
  };
}

function readJsonEvidence(filePath, faqRecords) {
  let input;
  try {
    input = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`Unable to parse evidence JSON ${filePath}: ${error.message}`);
  }
  const rows = Array.isArray(input) ? input : input.records;
  if (!Array.isArray(rows)) fail(`Evidence JSON ${filePath} must contain a records array`);
  const byId = new Map(faqRecords.map((record) => [record.contentId, record]));
  const bySourceSlug = new Map();
  for (const [index, row] of rows.entries()) {
    const contentId = row.contentId;
    const sourceSlug = row.sourceSlug || contentId;
    const record = byId.get(contentId);
    if (!record) fail(`Evidence row ${index + 1} references unknown contentId: ${contentId}`);
    if (bySourceSlug.has(sourceSlug)) fail(`Duplicate evidence source slug: ${sourceSlug}`);
    if (row.question && row.question !== record.question) {
      fail(`Evidence question does not match ${contentId}`);
    }
    bySourceSlug.set(sourceSlug, {
      contentId,
      sourceSlug,
      ...(row.onlineUrl ? { onlineUrl: row.onlineUrl } : {}),
      evidenceSource: row.evidenceSource || 'week04-online-url'
    });
  }
  const collisionLedger = input.collisionLedger || [];
  return {
    records: [...bySourceSlug.values()].sort((a, b) => a.contentId.localeCompare(b.contentId)),
    collisionLedger: collisionLedger.map((entry) => ({
      sourceSlug: entry.sourceSlug,
      candidateContentIds: [...entry.candidateContentIds],
      disposition: entry.disposition || 'no-redirect'
    })).sort((a, b) => a.sourceSlug.localeCompare(b.sourceSlug))
  };
}

function readEvidence(filePath, faqRecords) {
  if (!filePath) return JSON.parse(fs.readFileSync(EVIDENCE_OUTPUT, 'utf8'));
  if (!fs.existsSync(filePath)) fail(`Evidence path does not exist: ${filePath}`);
  return filePath.toLowerCase().endsWith('.json')
    ? readJsonEvidence(filePath, faqRecords)
    : readXlsxEvidence(filePath, faqRecords);
}

function normalizeEvidence(evidence, faqRecords) {
  const byId = new Map(faqRecords.map((record) => [record.contentId, record]));
  const records = new Map();
  for (const entry of evidence.records || []) {
    const record = byId.get(entry.contentId);
    if (!record) fail(`Evidence references unknown contentId: ${entry.contentId}`);
    if (!entry.sourceSlug) fail(`Evidence for ${entry.contentId} is missing sourceSlug`);
    if (!EVIDENCE_SOURCES.has(entry.evidenceSource)) {
      fail(`Evidence for ${entry.contentId} has invalid evidenceSource: ${entry.evidenceSource}`);
    }
    if (records.has(entry.contentId)) fail(`Duplicate evidence contentId: ${entry.contentId}`);
    records.set(entry.contentId, {
      contentId: entry.contentId,
      sourceSlug: entry.sourceSlug,
      ...(entry.onlineUrl ? { onlineUrl: entry.onlineUrl } : {}),
      evidenceSource: entry.evidenceSource
    });
  }
  for (const record of faqRecords) {
    if (!records.has(record.contentId)) {
      records.set(record.contentId, {
        contentId: record.contentId,
        sourceSlug: record.contentId,
        evidenceSource: 'repository-current-key'
      });
    }
  }
  const collisionLedger = (evidence.collisionLedger || []).map((entry) => {
    if (!entry.sourceSlug || entry.disposition !== 'no-redirect') {
      fail(`Invalid collision ledger entry for ${entry.sourceSlug || '(missing slug)'}`);
    }
    if (!Array.isArray(entry.candidateContentIds) || entry.candidateContentIds.length < 2) {
      fail(`Collision ledger entry ${entry.sourceSlug} needs at least two candidates`);
    }
    const candidates = [...new Set(entry.candidateContentIds)];
    for (const contentId of candidates) {
      if (!byId.has(contentId) && !/^legacy-row-[1-9][0-9]*$/.test(contentId)) {
        fail(`Collision ${entry.sourceSlug} references unknown ${contentId}`);
      }
    }
    return {
      sourceSlug: entry.sourceSlug,
      candidateContentIds: candidates,
      disposition: 'no-redirect'
    };
  });
  const ledgerSlugs = new Set();
  for (const entry of collisionLedger) {
    if (ledgerSlugs.has(entry.sourceSlug)) fail(`Duplicate collision ledger slug: ${entry.sourceSlug}`);
    ledgerSlugs.add(entry.sourceSlug);
  }
  return {
    records: [...records.values()].sort((a, b) => a.contentId.localeCompare(b.contentId)),
    collisionLedger: collisionLedger.sort((a, b) => a.sourceSlug.localeCompare(b.sourceSlug))
  };
}

function slugifyQuestion(question) {
  const ascii = question
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x00-\x7F]/g, '');
  return ascii.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function allocateSlug(candidate, contentId, reserved) {
  const base = candidate || `faq-${crypto.createHash('sha256').update(contentId).digest('hex').slice(0, 8)}`;
  if (!reserved.has(base)) return base;
  const digest = crypto.createHash('sha256').update(contentId).digest('hex').slice(0, 8);
  let slug = `${base}-${digest}`;
  let suffix = 2;
  while (reserved.has(slug)) slug = `${base}-${digest}-${suffix++}`;
  return slug;
}

function buildRegistry(faqRecords, evidence) {
  const normalized = normalizeEvidence(evidence, faqRecords);
  const byContentId = new Map(normalized.records.map((record) => [record.contentId, record]));
  const collisionById = new Set(
    normalized.collisionLedger.flatMap((entry) => entry.candidateContentIds),
  );
  const collisionSourceSlugs = new Set(
    normalized.collisionLedger.map((entry) => entry.sourceSlug),
  );
  const sourceSlugGroups = new Map();
  for (const record of normalized.records) {
    const foldedSlug = record.sourceSlug.toLowerCase();
    const group = sourceSlugGroups.get(foldedSlug) || [];
    group.push(record);
    sourceSlugGroups.set(foldedSlug, group);
  }
  const foldedCollisionIds = new Set(
    [...sourceSlugGroups.values()]
      .filter((group) => group.length > 1)
      .flatMap((group) => group.map((record) => record.contentId)),
  );
  const sourceSlugs = new Map();
  for (const record of faqRecords) {
    const evidenceRecord = byContentId.get(record.contentId);
    if (!evidenceRecord) fail(`Missing normalized evidence for ${record.contentId}`);
    if (sourceSlugs.has(evidenceRecord.sourceSlug)) {
      fail(`Duplicate source slug ${evidenceRecord.sourceSlug} for ${record.contentId}`);
    }
    sourceSlugs.set(evidenceRecord.sourceSlug, record.contentId);
  }

  const reserved = new Set();
  const records = [];
  for (const record of faqRecords) {
    const evidenceRecord = byContentId.get(record.contentId);
    const collided =
      collisionById.has(record.contentId) ||
      collisionSourceSlugs.has(evidenceRecord.sourceSlug) ||
      foldedCollisionIds.has(record.contentId);
    const preserve =
      SAFE_SOURCE_SLUG.test(evidenceRecord.sourceSlug) &&
      !collided &&
      sourceSlugs.get(evidenceRecord.sourceSlug) === record.contentId;
    if (preserve) reserved.add(evidenceRecord.sourceSlug.toLowerCase());
    records.push({
      contentId: record.contentId,
      sourceSlug: evidenceRecord.sourceSlug,
      canonicalSlug: preserve ? evidenceRecord.sourceSlug.toLowerCase() : '',
      routeStatus: preserve ? 'preserved' : 'repaired',
      evidenceSource: evidenceRecord.evidenceSource,
      collisionDisposition: collided ? 'no-redirect' : 'none',
      repairReason: preserve
        ? []
        : [
            ...(SAFE_SOURCE_SLUG.test(evidenceRecord.sourceSlug) ? [] : ['unsafe-source']),
            ...(collided ? ['collided-source'] : []),
            ...(evidenceRecord.evidenceSource === 'repository-current-key'
              ? ['missing-online-evidence']
              : [])
          ],
      legacySources: [evidenceRecord.sourceSlug]
    });
  }

  for (const record of records.filter((entry) => entry.routeStatus === 'repaired').sort((a, b) =>
    a.contentId.localeCompare(b.contentId),
  )) {
    const source = faqRecords.find((entry) => entry.contentId === record.contentId);
    const candidate = slugifyQuestion(source.question);
    record.canonicalSlug = allocateSlug(candidate, record.contentId, reserved);
    reserved.add(record.canonicalSlug);
  }

  const seenCanonical = new Set();
  for (const record of records) {
    const safeCanonicalSlug =
      record.routeStatus === 'repaired' ? SAFE_REPAIRED_SLUG : SAFE_PRESERVED_SLUG;
    if (!safeCanonicalSlug.test(record.canonicalSlug)) {
      fail(`Unsafe canonical slug for ${record.contentId}: ${record.canonicalSlug}`);
    }
    if (seenCanonical.has(record.canonicalSlug)) {
      fail(`Duplicate canonical slug: ${record.canonicalSlug}`);
    }
    seenCanonical.add(record.canonicalSlug);
  }

  return {
    version: 1,
    records: records.sort((a, b) => a.contentId.localeCompare(b.contentId)),
    collisionLedger: normalized.collisionLedger
  };
}

function normalizeSnapshot(faqRecords, evidence) {
  const normalized = normalizeEvidence(evidence, faqRecords);
  return {
    version: 1,
    records: normalized.records,
    collisionLedger: normalized.collisionLedger
  };
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`Unable to read ${filePath}: ${error.message}`);
  }
}

function parseArgs(argv) {
  const args = [...argv];
  const mode = args.includes('--write') ? 'write' : 'check';
  const evidenceIndex = args.indexOf('--evidence');
  const positional = args.filter((arg) => !['--write', '--check', '--evidence'].includes(arg));
  const evidencePath = evidenceIndex >= 0 ? args[evidenceIndex + 1] : positional[0];
  if (evidenceIndex >= 0 && !evidencePath) fail('--evidence requires a path');
  return { mode, evidencePath: evidencePath ? path.resolve(evidencePath) : process.env.FAQ_ROUTE_EVIDENCE };
}

function main() {
  const { mode, evidencePath } = parseArgs(process.argv.slice(2));
  const faqRecords = readEnglishFaq();
  const evidence = readEvidence(evidencePath, faqRecords);
  const normalizedSnapshot = normalizeSnapshot(faqRecords, evidence);
  const registry = buildRegistry(faqRecords, normalizedSnapshot);
  const expectedEvidence = `${JSON.stringify(normalizedSnapshot, null, 2)}\n`;
  const expectedRegistry = `${JSON.stringify(registry, null, 2)}\n`;

  if (mode === 'write') {
    fs.writeFileSync(EVIDENCE_OUTPUT, expectedEvidence);
    fs.writeFileSync(REGISTRY_OUTPUT, expectedRegistry);
    console.log(`FAQ route registry written (${registry.records.length} records)`);
    return;
  }

  const actualEvidence = fs.readFileSync(EVIDENCE_OUTPUT, 'utf8');
  const actualRegistry = fs.readFileSync(REGISTRY_OUTPUT, 'utf8');
  if (actualEvidence !== expectedEvidence) fail(`Evidence snapshot drifted: ${EVIDENCE_OUTPUT}`);
  if (actualRegistry !== expectedRegistry) fail(`Route registry drifted: ${REGISTRY_OUTPUT}`);
  console.log(`FAQ route registry check passed (${registry.records.length} records)`);
}

try {
  main();
} catch (error) {
  console.error(`FAQ route registry failed: ${error.message}`);
  process.exitCode = 1;
}
