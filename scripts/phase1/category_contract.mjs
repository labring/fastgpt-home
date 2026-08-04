#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readWorkbookSheet } from './identity_baseline.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '../..');
const DATA_ROOT = process.env.FASTGPT_W2_DATA_DIR ||
  '/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730';
const DEFAULT_WORKBOOK = path.join(
  DATA_ROOT,
  '存量修复/FastGPT-存量FAQ分类重挂对照表-V1.1-星触达-20260730.xlsx',
);
const DEFAULT_CONTRACT = path.join(SCRIPT_DIR, 'category_contract.json');
const DEFAULT_REPORT = path.join(REPO_ROOT, 'artifacts/phase1/category-contract-report.json');
const DEFAULT_GATE = path.join(REPO_ROOT, 'artifacts/phase1/publish-gate-contract.json');
const EXPECTED_HEADERS = ['序号', '原分类', '建议新分类', '置信度', '需人工复核', '问题（原文）', '线上 URL'];

function buildCategoryReport({ workbook = DEFAULT_WORKBOOK, contractFile = DEFAULT_CONTRACT } = {}) {
  const contract = JSON.parse(fs.readFileSync(contractFile, 'utf8'));
  const manifest = readWorkbookSheet(workbook, '分类重挂对照表', 4, 5, 2004);
  const errors = [];
  if (manifest.headers.join('\u0000') !== EXPECTED_HEADERS.join('\u0000')) {
    errors.push({ code: 'header-schema', expected: EXPECTED_HEADERS, actual: manifest.headers });
  }
  if (manifest.source_sha256 !== '751a479680bfc987b9394c7429100d8f09269cc7ad8a698ff97b34415a6733b0') {
    errors.push({ code: 'source-fingerprint', actual: manifest.source_sha256 });
  }
  if (manifest.data_row_count !== 2000) errors.push({ code: 'row-count', actual: manifest.data_row_count });

  const byZh = new Map(contract.categories.map((category) => [category.zh, category]));
  const categoryCounts = Object.fromEntries(contract.categories.map((category) => [category.id, 0]));
  const confidenceCounts = {};
  const reviewCounts = {};
  const rows = manifest.rows.map((row) => {
    const values = row.values;
    const category = byZh.get(values['建议新分类']);
    if (!category) {
      errors.push({ code: 'unknown-category', source_row: row.source_row, value: values['建议新分类'] });
    } else {
      categoryCounts[category.id] += 1;
    }
    confidenceCounts[values['置信度']] = (confidenceCounts[values['置信度']] || 0) + 1;
    reviewCounts[values['需人工复核']] = (reviewCounts[values['需人工复核']] || 0) + 1;
    return {
      source_row: row.source_row,
      original_category: values['原分类'],
      category_id: category?.id || null,
      category_zh: values['建议新分类'],
      confidence: values['置信度'],
      review_flag: values['需人工复核'],
      question: values['问题（原文）'],
      url: values['线上 URL'],
    };
  });

  for (const category of contract.categories) {
    if (categoryCounts[category.id] !== category.expected_count) {
      errors.push({ code: 'category-count', id: category.id, expected: category.expected_count, actual: categoryCounts[category.id] });
    }
  }
  for (const [key, expected] of Object.entries(contract.confidence_counts)) {
    if (confidenceCounts[key] !== expected) errors.push({ code: 'confidence-count', key, expected, actual: confidenceCounts[key] || 0 });
  }
  for (const [key, expected] of Object.entries(contract.review_counts)) {
    if (reviewCounts[key] !== expected) errors.push({ code: 'review-count', key, expected, actual: reviewCounts[key] || 0 });
  }

  return {
    status: errors.length ? 'blocked' : 'passed',
    source: {
      workbook,
      source_sha256: manifest.source_sha256,
      source_bytes: manifest.source_bytes,
      sheet: manifest.sheet,
      headers: manifest.headers,
      data_row_count: manifest.data_row_count,
      canonical_digest: manifest.canonical_digest,
    },
    categories: contract.categories,
    summary: {
      rows: rows.length,
      category_counts: categoryCounts,
      confidence_counts: confidenceCounts,
      review_counts: reviewCounts,
    },
    rows,
    errors,
    generated_at: new Date().toISOString(),
  };
}

function buildPublishGateContract() {
  return {
    version: 'W2-V1.1',
    status: 'contract',
    dry_run: { required: true, writes: 0, produces_conflict_list: true },
    blocking_inputs: [
      'source_fingerprint',
      'header_order',
      'row_count',
      'field_hashes',
      'duplicate_url',
      'unmatched_source',
      'url_question_conflict',
      'key_question_conflict',
      'missing_category_id_or_locale',
      'body_slug_url_change',
    ],
    fail_closed: { default: true, partial_write: false, conflict_rows_must_be_reported: true },
    subset_processing: { explicit_row_allowlist_required: true, implicit_filtering: false },
    batch: {
      immutable_batch_id_required: true,
      source_sha256_required: true,
      pre_write_row_snapshots_required: true,
      result_manifest_required: true,
      same_batch_same_fingerprint_replay: 'idempotent-no-op',
      changed_fingerprint: 'new-batch-and-new-dry-run',
    },
    rollback: {
      accepted_only_with_matching_batch_id: true,
      pre_write_snapshot_required: true,
      restores_body_slug_url_and_metadata: true,
    },
    implementation_owner: 'Phase 4',
  };
}

function parseArgs(argv) {
  const options = { workbook: DEFAULT_WORKBOOK, contractFile: DEFAULT_CONTRACT, write: DEFAULT_REPORT, gate: DEFAULT_GATE };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--workbook') options.workbook = argv[++index];
    else if (argument === '--contract') options.contractFile = argv[++index];
    else if (argument === '--write') options.write = argv[++index];
    else if (argument === '--gate') options.gate = argv[++index];
    else if (argument === '--help') options.help = true;
    else throw new Error(`Unknown argument: ${argument}`);
  }
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log('Usage: node category_contract.mjs [--workbook path] [--write path] [--gate path]');
    return 0;
  }
  const report = buildCategoryReport(options);
  fs.mkdirSync(path.dirname(options.write), { recursive: true });
  fs.writeFileSync(options.write, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  fs.writeFileSync(options.gate, `${JSON.stringify(buildPublishGateContract(), null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(report.summary));
  if (report.status !== 'passed') {
    console.error(JSON.stringify(report.errors));
    return 2;
  }
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) process.exitCode = main();

export { buildCategoryReport, buildPublishGateContract };
