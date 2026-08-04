#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
import {
  extractFaqRecords,
  normaliseQuestion,
  readWorkbookSheet,
} from '../phase1/identity_baseline.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '../..');
const DATA_ROOT = process.env.FASTGPT_W2_DATA_DIR ||
  '/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730';
const DEFAULT_WORKBOOK = path.join(
  DATA_ROOT,
  '存量修复/FastGPT-存量FAQ补Meta-首批100条-V1.0-星触达-20260728.xlsx',
);
const DEFAULT_REPO_FILE = path.join(REPO_ROOT, 'src/faq/en.ts');
const DEFAULT_REPORT = path.join(REPO_ROOT, 'artifacts/phase4/meta-overlay-report.json');
const DEFAULT_MODULE = path.join(REPO_ROOT, 'src/faq/legacyMeta.ts');
const EXPECTED_SOURCE_SHA256 = 'd9aeb3ede23d29a2c2a65eee61df381366db68c0301df9cedeee2e7ae9489811';
const EXPECTED_HEADERS = ['no', 'category', 'question', 'title', 'description', 'keywords', 'url', '字符数(T/D)', '生成方式'];
const TARGET_FIELDS = ['Title', 'Description'];
const IMMUTABLE_FIELDS = ['Category', 'Question', 'Answers'];

function hash(value) {
  return crypto.createHash('sha256').update(JSON.stringify(value), 'utf8').digest('hex');
}

function literalText(node) {
  if (ts.isStringLiteralLike(node) || ts.isNumericLiteral(node)) return node.text;
  return undefined;
}

function propertyName(node) {
  if (!node.name) return undefined;
  if (ts.isIdentifier(node.name) || ts.isStringLiteralLike(node.name) || ts.isNumericLiteral(node.name)) {
    return node.name.text;
  }
  return undefined;
}

function extractFaqObjects(fileName = DEFAULT_REPO_FILE) {
  const sourceText = fs.readFileSync(fileName, 'utf8');
  const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let faqObject;
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    if (!statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(sourceFile) === 'faq' && ts.isObjectLiteralExpression(declaration.initializer)) {
        faqObject = declaration.initializer;
      }
    }
  }
  if (!faqObject) throw new Error(`Could not locate exported faq object in ${fileName}`);

  const records = [];
  for (const property of faqObject.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const key = propertyName(property);
    if (!key || !ts.isObjectLiteralExpression(property.initializer)) continue;
    const fields = {};
    for (const field of property.initializer.properties) {
      if (!ts.isPropertyAssignment(field)) continue;
      const name = propertyName(field);
      const value = literalText(field.initializer);
      if (name && value !== undefined) fields[name] = value;
    }
    if (typeof fields.Question !== 'string') throw new Error(`FAQ key ${key} has no literal Question field`);
    records.push({ repo_key: key, ...fields });
  }
  return records;
}

function validateMetaRows(manifest) {
  const errors = [];
  if (manifest.source_sha256 !== EXPECTED_SOURCE_SHA256) {
    errors.push({ code: 'source-fingerprint', expected: EXPECTED_SOURCE_SHA256, actual: manifest.source_sha256 });
  }
  if (manifest.sheet !== 'FAQ Data') errors.push({ code: 'sheet', actual: manifest.sheet });
  if (manifest.headers.join('\u0000') !== EXPECTED_HEADERS.join('\u0000')) {
    errors.push({ code: 'headers', expected: EXPECTED_HEADERS, actual: manifest.headers });
  }
  if (manifest.data_row_count !== 100) errors.push({ code: 'row-count', expected: 100, actual: manifest.data_row_count });
  const questions = new Set();
  const urls = new Set();
  for (const row of manifest.rows) {
    const values = row.values;
    const required = ['no', 'question', 'title', 'description', 'keywords', 'url'];
    for (const field of required) {
      if (!String(values[field] ?? '').trim()) errors.push({ code: 'missing-field', source_row: row.source_row, field });
    }
    const question = normaliseQuestion(values.question);
    const url = String(values.url).trim();
    if (questions.has(question)) errors.push({ code: 'duplicate-question', source_row: row.source_row });
    if (urls.has(url)) errors.push({ code: 'duplicate-url', source_row: row.source_row });
    questions.add(question);
    urls.add(url);
    const titleLength = Array.from(String(values.title)).length;
    const descriptionLength = Array.from(String(values.description)).length;
    if (titleLength < 35 || titleLength > 60) errors.push({ code: 'title-length', source_row: row.source_row, length: titleLength });
    if (descriptionLength < 125 || descriptionLength > 155) errors.push({ code: 'description-length', source_row: row.source_row, length: descriptionLength });
  }
  return errors;
}

function buildMetaReport({ workbook = DEFAULT_WORKBOOK, repoFile = DEFAULT_REPO_FILE } = {}) {
  const manifest = readWorkbookSheet(workbook, 'FAQ Data', 1, 2, 101);
  const sourceErrors = validateMetaRows(manifest);
  const repoRecords = extractFaqObjects(repoFile);
  const recordsByQuestion = new Map();
  for (const record of repoRecords) {
    const question = normaliseQuestion(record.Question);
    const list = recordsByQuestion.get(question) || [];
    list.push(record);
    recordsByQuestion.set(question, list);
  }

  const rows = manifest.rows.map((sourceRow) => {
    const values = sourceRow.values;
    const question = normaliseQuestion(values.question);
    const candidates = recordsByQuestion.get(question) || [];
    const matched = candidates.length === 1 ? candidates[0] : null;
    const before = matched ? {
      ...Object.fromEntries(IMMUTABLE_FIELDS.map((field) => [field, matched[field]])),
      ...Object.fromEntries(TARGET_FIELDS.map((field) => [field, matched[field]])),
    } : null;
    const after = matched ? {
      ...before,
      Title: String(values.title),
      Description: String(values.description),
    } : null;
    return {
      source_row: sourceRow.source_row,
      serial: String(values.no),
      url: String(values.url),
      question: String(values.question),
      repo_key: matched?.repo_key || null,
      match_method: matched ? 'question' : 'none',
      status: matched ? 'matched' : 'unmatched-source',
      conflict_reason: matched ? null : 'No unique repository FAQ has the normalized source question',
      source_fields: {
        title: String(values.title),
        description: String(values.description),
        keywords: String(values.keywords),
      },
      before_hash: before ? hash(before) : null,
      after_hash: after ? hash(after) : null,
      immutable_before_hash: before ? hash(Object.fromEntries(IMMUTABLE_FIELDS.map((field) => [field, before[field]]))) : null,
      immutable_after_hash: after ? hash(Object.fromEntries(IMMUTABLE_FIELDS.map((field) => [field, after[field]]))) : null,
    };
  });

  const matchedRows = rows.filter((row) => row.status === 'matched');
  const failures = rows.filter((row) => row.status !== 'matched');
  const report = {
    status: sourceErrors.length ? 'blocked' : 'preview',
    source: {
      workbook,
      source_sha256: manifest.source_sha256,
      source_bytes: manifest.source_bytes,
      sheet: manifest.sheet,
      headers: manifest.headers,
      data_row_count: manifest.data_row_count,
    },
    repository: {
      file: repoFile,
      record_count: repoRecords.length,
      unique_questions: recordsByQuestion.size,
    },
    summary: {
      source_rows: rows.length,
      matched_rows: matchedRows.length,
      unresolved_rows: failures.length,
      source_errors: sourceErrors.length,
      applied_fields: TARGET_FIELDS,
      writes: 0,
    },
    source_errors: sourceErrors,
    rows,
    generated_at: new Date().toISOString(),
  };
  report.report_digest = hash({ ...report, generated_at: undefined, report_digest: undefined });
  return { report, overlay: Object.fromEntries(matchedRows.map((row) => [row.repo_key, {
    Title: row.source_fields.title,
    Description: row.source_fields.description,
  }])) };
}

function renderOverlayModule(overlay) {
  const lines = [
    "import type { FaqItem } from './zh';",
    '',
    'export type LegacyFaqMeta = Pick<FaqItem, \'Title\' | \'Description\'>;',
    '',
    'export const legacyFaqMeta: Record<string, LegacyFaqMeta> = {',
  ];
  for (const key of Object.keys(overlay).sort()) {
    lines.push(`  ${JSON.stringify(key)}: ${JSON.stringify(overlay[key])},`);
  }
  lines.push('};', '');
  return `${lines.join('\n')}`;
}

function writeOutputs({ report, overlay }, reportFile, moduleFile) {
  fs.mkdirSync(path.dirname(reportFile), { recursive: true });
  fs.writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  fs.mkdirSync(path.dirname(moduleFile), { recursive: true });
  fs.writeFileSync(moduleFile, renderOverlayModule(overlay), 'utf8');
}

function parseArgs(argv) {
  const options = { workbook: DEFAULT_WORKBOOK, repoFile: DEFAULT_REPO_FILE, report: DEFAULT_REPORT, module: DEFAULT_MODULE };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--workbook') options.workbook = argv[++index];
    else if (argument === '--repo-file') options.repoFile = argv[++index];
    else if (argument === '--report') options.report = argv[++index];
    else if (argument === '--module') options.module = argv[++index];
    else if (argument === '--help') options.help = true;
    else throw new Error(`Unknown argument: ${argument}`);
  }
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log('Usage: node scripts/phase4/meta_overlay.mjs [--report path] [--module path]');
    return 0;
  }
  const result = buildMetaReport(options);
  writeOutputs(result, options.report, options.module);
  console.log(JSON.stringify(result.report.summary));
  return result.report.source.source_sha256 === EXPECTED_SOURCE_SHA256 && result.report.summary.source_rows === 100 ? 0 : 2;
}

if (import.meta.url === `file://${process.argv[1]}`) process.exitCode = main();

export {
  buildMetaReport,
  extractFaqObjects,
  renderOverlayModule,
};
