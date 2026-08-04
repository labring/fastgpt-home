#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';

const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const BASELINE_FILE = path.join(REPO_ROOT, 'artifacts/phase1/faq-source-baseline.json');
const W2_FILE = path.join(REPO_ROOT, 'src/faq/w2.ts');
const EN_FILE = path.join(REPO_ROOT, 'src/faq/en.ts');
const EXPECTED_SOURCE_SHA256 = '53a6f0d89f1ef2cd688e4c50dc7b59d69276a8ebb24e65f9979e0156e8a85547';
const RUNTIME_FIELDS = ['Category', 'Question', 'Answers', 'Title', 'Description', 'Keywords'];
const SOURCE_FIELDS = ['category', 'question', 'answer', 'title', 'description', 'keywords'];

function sha256(value) {
  return crypto.createHash('sha256').update(String(value), 'utf8').digest('hex');
}

function propertyName(node) {
  if (!node.name) return undefined;
  if (ts.isIdentifier(node.name) || ts.isStringLiteralLike(node.name)) return node.name.text;
  return undefined;
}

function literalText(node) {
  if (ts.isStringLiteralLike(node) || ts.isNumericLiteral(node)) return node.text;
  return undefined;
}

function extractExportedObject(fileName, exportName) {
  const source = fs.readFileSync(fileName, 'utf8');
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let initializer;
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(sourceFile) === exportName && ts.isObjectLiteralExpression(declaration.initializer)) {
        initializer = declaration.initializer;
      }
    }
  }
  if (!initializer) throw new Error(`Could not locate object ${exportName} in ${fileName}`);
  const records = {};
  for (const property of initializer.properties) {
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
    records[key] = fields;
  }
  return records;
}

function readInputs({ baselineFile = BASELINE_FILE, w2File = W2_FILE, enFile = EN_FILE } = {}) {
  return {
    baseline: JSON.parse(fs.readFileSync(baselineFile, 'utf8')),
    runtime: extractExportedObject(w2File, 'faqW2Zh'),
    english: extractExportedObject(enFile, 'faq'),
  };
}

function validateW2Data({ baseline, runtime, english }) {
  const errors = [];
  if (baseline.status !== 'passed') errors.push({ code: 'baseline-status', actual: baseline.status });
  if (baseline.source?.source_sha256 !== EXPECTED_SOURCE_SHA256) {
    errors.push({ code: 'source-fingerprint', actual: baseline.source?.source_sha256 });
  }
  const rows = baseline.rows || [];
  const expected = new Map();
  for (const row of rows) {
    const slug = row.values?.slug;
    if (!slug) {
      errors.push({ code: 'missing-slug', source_row: row.source_row });
      continue;
    }
    if (expected.has(slug)) errors.push({ code: 'duplicate-slug', slug });
    expected.set(slug, row.values);
  }
  const runtimeKeys = Object.keys(runtime);
  if (rows.length !== 60) errors.push({ code: 'baseline-row-count', actual: rows.length });
  if (runtimeKeys.length !== 60) errors.push({ code: 'runtime-row-count', actual: runtimeKeys.length });
  for (const slug of runtimeKeys) {
    if (Object.prototype.hasOwnProperty.call(english, slug)) errors.push({ code: 'english-key-collision', slug });
  }
  for (const [slug, source] of expected) {
    const item = runtime[slug];
    if (!item) {
      errors.push({ code: 'missing-runtime-row', slug });
      continue;
    }
    for (let index = 0; index < RUNTIME_FIELDS.length; index += 1) {
      const runtimeField = RUNTIME_FIELDS[index];
      const sourceField = SOURCE_FIELDS[index];
      const expectedValue = String(source[sourceField] ?? '');
      if (item[runtimeField] !== expectedValue) {
        errors.push({ code: 'field-drift', slug, field: runtimeField });
      }
      if (sourceField !== 'category' && rowFieldHash(source, sourceField) !== sourceFieldHashForBaseline(baseline, slug, sourceField)) {
        errors.push({ code: 'baseline-field-hash', slug, field: sourceField });
      }
    }
  }
  return {
    status: errors.length ? 'blocked' : 'passed',
    source_sha256: baseline.source?.source_sha256,
    baseline_rows: rows.length,
    runtime_rows: runtimeKeys.length,
    english_rows: Object.keys(english).length,
    errors,
  };
}

function rowFieldHash(source, field) {
  return sha256(String(source[field] ?? ''));
}

function sourceFieldHashForBaseline(baseline, slug, field) {
  const row = (baseline.rows || []).find((candidate) => candidate.values?.slug === slug);
  return row?.field_hashes?.[field] || '';
}

function main() {
  const result = validateW2Data(readInputs());
  console.log(JSON.stringify(result));
  return result.status === 'passed' ? 0 : 2;
}

if (import.meta.url === `file://${process.argv[1]}`) process.exitCode = main();

export { extractExportedObject, readInputs, validateW2Data };
