#!/usr/bin/env node

/**
 * Build an auditable identity report for the 2,000-row W2 inventory.
 * Production FAQ data is read only; this command writes evidence artifacts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '../..');
const DEFAULT_DATA_ROOT = process.env.FASTGPT_W2_DATA_DIR ||
  '/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730';
const DEFAULT_WORKBOOK = path.join(
  DEFAULT_DATA_ROOT,
  '存量修复/FastGPT-存量FAQ分类重挂对照表-V1.1-星触达-20260730.xlsx',
);
const DEFAULT_REPO_FILE = path.join(REPO_ROOT, 'src/faq/en.ts');
const DEFAULT_OUTPUT = path.join(REPO_ROOT, 'artifacts/phase1/identity-baseline.json');
const EXPECTED_SOURCE_SHA256 = '751a479680bfc987b9394c7429100d8f09269cc7ad8a698ff97b34415a6733b0';
const INVENTORY_HEADERS = ['序号', '原分类', '建议新分类', '置信度', '需人工复核', '问题（原文）', '线上 URL'];

function normaliseQuestion(value) {
  return String(value ?? '').normalize('NFC').trim();
}

function normaliseUrl(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return '';
  const url = new URL(raw);
  url.hostname = url.hostname.toLowerCase();
  url.hash = '';
  try {
    url.pathname = decodeURIComponent(url.pathname);
  } catch {
    // Preserve malformed percent sequences so the row remains auditable.
  }
  url.pathname = url.pathname.replace(/\/+$/, '') || '/';
  return url.toString();
}

import requireCrypto from 'node:crypto';

function canonicalDigest(report) {
  const payload = Object.fromEntries(
    Object.entries(report).filter(([key]) => key !== 'generated_at' && key !== 'report_digest'),
  );
  return requireCrypto.createHash('sha256')
    .update(JSON.stringify(payload, null, 0), 'utf8')
    .digest('hex');
}

function readWorkbookSheet(workbook, sheet, headerRow, dataStartRow, dataEndRow) {
  const args = [
    path.join(SCRIPT_DIR, 'xlsx_reader.py'),
    '--workbook', workbook,
    '--sheet', sheet,
    '--header-row', String(headerRow),
    '--data-start-row', String(dataStartRow),
    '--data-end-row', String(dataEndRow),
  ];
  const candidates = [
    process.env.W2_PYTHON,
    process.env.PYTHON,
    'python3',
    '/Users/longnv/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',
  ].filter(Boolean);
  let lastError = 'No Python interpreter was available';
  for (const candidate of [...new Set(candidates)]) {
    const result = spawnSync(candidate, args, { encoding: 'utf8' });
    if (result.status === 0) {
      try {
        return JSON.parse(result.stdout);
      } catch (error) {
        lastError = `Reader emitted invalid JSON: ${error.message}`;
      }
    } else {
      lastError = (result.stderr || result.stdout || `exit ${result.status}`).trim();
    }
  }
  throw new Error(`XLSX reader failed: ${lastError}`);
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

function extractFaqRecords(fileName = DEFAULT_REPO_FILE) {
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
    if (typeof fields.Question !== 'string') {
      throw new Error(`FAQ key ${key} does not have a literal Question field`);
    }
    records.push({ repo_key: key, question: fields.Question });
  }
  return records;
}

function mapUrlToKey(repoKey) {
  return normaliseUrl(`https://fastgpt.io/en/faq/${encodeURIComponent(repoKey)}`);
}

function pathKey(urlValue) {
  try {
    const url = new URL(urlValue);
    const segments = url.pathname.split('/').filter(Boolean);
    return segments.length ? decodeURIComponent(segments.at(-1)) : '';
  } catch {
    return '';
  }
}

function buildIdentityReport({ workbook = DEFAULT_WORKBOOK, repoFile = DEFAULT_REPO_FILE } = {}) {
  const manifest = readWorkbookSheet(workbook, '分类重挂对照表', 4, 5, 2004);
  const repoRecords = extractFaqRecords(repoFile);
  const repoByQuestion = new Map();
  const repoByUrl = new Map();
  const repoByKey = new Map(repoRecords.map((record) => [record.repo_key, record]));
  for (const record of repoRecords) {
    const question = normaliseQuestion(record.question);
    const list = repoByQuestion.get(question) || [];
    list.push(record.repo_key);
    repoByQuestion.set(question, list);
    repoByUrl.set(mapUrlToKey(record.repo_key), record.repo_key);
  }

  const rows = manifest.rows.map((row) => {
    const values = row.values;
    const rawUrl = String(values['线上 URL'] ?? '');
    const rawQuestion = String(values['问题（原文）'] ?? '');
    const url = normaliseUrl(rawUrl);
    const question = normaliseQuestion(rawQuestion);
    const urlKey = repoByUrl.get(url);
    const questionKeys = repoByQuestion.get(question) || [];
    const keyFromPath = pathKey(url);
    const keyEvidence = repoByKey.has(keyFromPath) ? keyFromPath : undefined;
    const duplicateGroup = null;
    let status = 'unmatched-source';
    let matchMethod = 'none';
    let repoKey;
    let conflictReason;

    if (urlKey && questionKeys.length === 1 && urlKey !== questionKeys[0]) {
      status = 'url-question-conflict';
      conflictReason = 'URL evidence and unique question evidence point to different repo keys';
    } else if (keyEvidence && questionKeys.length === 1 && keyEvidence !== questionKeys[0]) {
      status = 'key-question-conflict';
      conflictReason = 'URL path key and unique question evidence point to different repo keys';
    } else if (urlKey && questionKeys.length === 1) {
      status = 'matched';
      matchMethod = 'url+question';
      repoKey = urlKey;
    } else if (questionKeys.length === 1) {
      status = 'matched';
      matchMethod = 'question';
      repoKey = questionKeys[0];
    } else if (urlKey) {
      status = 'url-question-conflict';
      conflictReason = 'URL evidence has no unique matching question';
    } else if (keyEvidence) {
      status = 'key-question-conflict';
      conflictReason = 'URL path key has no unique matching question';
    }

    return {
      source_row: row.source_row,
      source_identity: {
        source_sha256: manifest.source_sha256,
        sheet: manifest.sheet,
        row: row.source_row,
      },
      raw: {
        serial: values['序号'],
        url: rawUrl,
        question: rawQuestion,
        original_category: values['原分类'],
        suggested_category: values['建议新分类'],
        confidence: values['置信度'],
        review_flag: values['需人工复核'],
      },
      normalized: { url, question },
      candidate_evidence: {
        url_repo_key: urlKey || null,
        question_repo_keys: questionKeys,
        path_repo_key: keyEvidence || null,
      },
      repo_key: repoKey || null,
      match_method: matchMethod,
      status,
      conflict_reason: conflictReason || null,
      duplicate_group: duplicateGroup,
    };
  });

  const byUrl = new Map();
  for (const row of rows) {
    const list = byUrl.get(row.normalized.url) || [];
    list.push(row);
    byUrl.set(row.normalized.url, list);
  }
  const duplicateGroups = [];
  for (const [url, group] of byUrl) {
    if (group.length <= 1) continue;
    const id = `duplicate-url-${duplicateGroups.length + 1}`;
    const sourceRows = group.map((row) => row.source_row);
    duplicateGroups.push({ id, normalized_url: url, source_rows: sourceRows });
    for (const row of group) {
      row.status = 'duplicate-url';
      row.duplicate_group = id;
      row.conflict_reason = 'Normalized URL occurs in more than one source row';
    }
  }

  const uniqueQuestions = new Set(rows.map((row) => row.normalized.question));
  const questionMatches = new Set(
    rows.filter((row) => row.candidate_evidence.question_repo_keys.length === 1)
      .map((row) => row.normalized.question),
  );
  const unmatchedQuestions = new Set(
    rows.filter((row) => row.candidate_evidence.question_repo_keys.length === 0)
      .map((row) => row.normalized.question),
  );
  const report = {
    status: 'blocked',
    source: {
      workbook,
      source_sha256: manifest.source_sha256,
      source_bytes: manifest.source_bytes,
      sheet: manifest.sheet,
      headers: manifest.headers,
      data_row_count: manifest.data_row_count,
      canonical_digest: manifest.canonical_digest,
    },
    repository: {
      file: repoFile,
      record_count: repoRecords.length,
      unique_keys: new Set(repoRecords.map((record) => record.repo_key)).size,
      unique_questions: repoByQuestion.size,
    },
    summary: {
      rows: rows.length,
      unique_urls: byUrl.size,
      unique_questions: uniqueQuestions.size,
      question_matches: questionMatches.size,
      unmatched_objects: unmatchedQuestions.size,
      duplicate_url_groups: duplicateGroups.length,
      duplicate_rows: rows.filter((row) => row.status === 'duplicate-url').length,
      conflict_rows: rows.filter((row) => row.status !== 'matched').length,
    },
    duplicate_url_groups: duplicateGroups,
    rows,
    generated_at: new Date().toISOString(),
  };
  report.report_digest = canonicalDigest(report);
  return report;
}

function parseArgs(argv) {
  const options = { workbook: DEFAULT_WORKBOOK, repoFile: DEFAULT_REPO_FILE, write: DEFAULT_OUTPUT };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--workbook') options.workbook = argv[++index];
    else if (argument === '--repo-file') options.repoFile = argv[++index];
    else if (argument === '--write') options.write = argv[++index];
    else if (argument === '--help') options.help = true;
    else throw new Error(`Unknown argument: ${argument}`);
  }
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log('Usage: node identity_baseline.mjs [--workbook path] [--repo-file path] [--write path]');
    return 0;
  }
  const report = buildIdentityReport(options);
  fs.mkdirSync(path.dirname(options.write), { recursive: true });
  fs.writeFileSync(options.write, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(report.summary));
  return report.source.source_sha256 === EXPECTED_SOURCE_SHA256 ? 0 : 2;
}

if (import.meta.url === `file://${process.argv[1]}`) process.exitCode = main();

export {
  buildIdentityReport,
  extractFaqRecords,
  normaliseQuestion,
  normaliseUrl,
  readWorkbookSheet,
};
