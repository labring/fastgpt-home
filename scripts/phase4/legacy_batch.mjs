#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractFaqObjects } from './meta_overlay.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '../..');
const DEFAULT_IDENTITY = path.join(REPO_ROOT, 'artifacts/phase1/identity-baseline.json');
const DEFAULT_CATEGORIES = path.join(REPO_ROOT, 'artifacts/phase1/category-contract-report.json');
const DEFAULT_REPO_FILE = path.join(REPO_ROOT, 'src/faq/en.ts');
const DEFAULT_OUTPUT = path.join(REPO_ROOT, 'artifacts/phase4/category-batch-dry-run.json');
const DEFAULT_BATCH_DIR = path.join(REPO_ROOT, 'artifacts/phase4/batches');
const CATEGORY_SOURCE_SHA256 = '751a479680bfc987b9394c7429100d8f09269cc7ad8a698ff97b34415a6733b0';

function hash(value) {
  return crypto.createHash('sha256').update(stableStringify(value), 'utf8').digest('hex');
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(fileName, 'utf8'));
}

function writeJson(fileName, value) {
  fs.mkdirSync(path.dirname(fileName), { recursive: true });
  fs.writeFileSync(fileName, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function readAllowlist(fileName) {
  if (!fileName) return null;
  const value = readJson(fileName);
  if (!Array.isArray(value) || value.some((row) => !Number.isInteger(row))) {
    throw new Error('Allowlist must be a JSON array of integer source row numbers');
  }
  const unique = [...new Set(value)].sort((a, b) => a - b);
  if (unique.length !== value.length) throw new Error('Allowlist contains duplicate source rows');
  return unique;
}

function repoSnapshot(repoFile) {
  const records = extractFaqObjects(repoFile);
  return new Map(records.map((record) => [record.repo_key, {
    repo_key: record.repo_key,
    url: `https://fastgpt.io/en/faq/${encodeURIComponent(record.repo_key)}`,
    Category: record.Category,
    Question: record.Question,
    Answers: record.Answers,
    Title: record.Title,
    Description: record.Description,
    Keywords: record.Keywords,
  }]));
}

function immutableFields(record) {
  return {
    repo_key: record.repo_key,
    url: record.url,
    Question: record.Question,
    Answers: record.Answers,
  };
}

function buildBatchPlan({
  identityFile = DEFAULT_IDENTITY,
  categoryFile = DEFAULT_CATEGORIES,
  repoFile = DEFAULT_REPO_FILE,
  allowlist = null,
} = {}) {
  const identity = readJson(identityFile);
  const categories = readJson(categoryFile);
  if (categories.source.source_sha256 !== CATEGORY_SOURCE_SHA256) {
    throw new Error(`Unexpected category source fingerprint: ${categories.source.source_sha256}`);
  }
  if (identity.summary.rows !== 2000 || categories.summary.rows !== 2000) {
    throw new Error('Category batch requires exactly 2,000 source rows');
  }
  const categoryByRow = new Map(categories.rows.map((row) => [row.source_row, row]));
  const identityByRow = new Map(identity.rows.map((row) => [row.source_row, row]));
  const repo = repoSnapshot(repoFile);
  const selectedRows = allowlist ? allowlist : categories.rows.map((row) => row.source_row);
  const selectionSet = new Set(selectedRows);
  const failures = [];
  const rowResults = categories.rows.map((categoryRow) => {
    const identityRow = identityByRow.get(categoryRow.source_row);
    const selected = selectionSet.has(categoryRow.source_row);
    const record = identityRow?.repo_key ? repo.get(identityRow.repo_key) : null;
    const reasons = [];
    if (!identityRow) reasons.push('missing-identity-row');
    if (identityRow?.status !== 'matched') reasons.push(identityRow?.status || 'unmatched-source');
    if (!categoryRow.category_id) reasons.push('missing-category-id');
    if (selected && !record) reasons.push('missing-repository-object');
    const status = reasons.length ? 'blocked' : selected ? 'selected' : 'not-selected';
    if (status === 'blocked') failures.push({
      source_row: categoryRow.source_row,
      repo_key: identityRow?.repo_key || null,
      identity_status: identityRow?.status || 'missing-identity-row',
      reasons,
    });
    const captureSnapshot = allowlist !== null && selected && Boolean(record);
    const before = captureSnapshot ? {
      ...immutableFields(record),
      Category: record.Category,
      category_id: null,
      Title: record.Title,
      Description: record.Description,
      Keywords: record.Keywords,
    } : null;
    const after = before ? { ...before, category_id: categoryRow.category_id } : null;
    return {
      source_row: categoryRow.source_row,
      serial: categoryRow.source_row - 4,
      selected,
      status,
      reasons,
      repo_key: identityRow?.repo_key || null,
      source_identity_status: identityRow?.status || 'missing-identity-row',
      original_category: categoryRow.original_category,
      category_id: categoryRow.category_id,
      category_zh: categoryRow.category_zh,
      confidence: categoryRow.confidence,
      review_flag: categoryRow.review_flag,
      question: categoryRow.question,
      url: categoryRow.url,
      before_hash: before ? hash(before) : null,
      after_hash: after ? hash(after) : null,
      immutable_before_hash: before ? hash(immutableFields(before)) : null,
      immutable_after_hash: after ? hash(immutableFields(after)) : null,
      before,
      after,
    };
  });
  const selectedRowsWithFailures = rowResults.filter((row) => row.selected && row.status === 'blocked');
  const fullBatch = allowlist === null;
  const batchErrors = [
    ...(fullBatch && failures.length ? [{ code: 'full-batch-conflicts', count: failures.length }] : []),
    ...(!fullBatch && selectedRowsWithFailures.length ? [{ code: 'allowlist-conflicts', count: selectedRowsWithFailures.length }] : []),
  ];
  const allowlistDigest = hash(selectedRows);
  const batchId = `category-${CATEGORY_SOURCE_SHA256.slice(0, 12)}-${allowlistDigest.slice(0, 12)}`;
  const plannedRows = rowResults.filter((row) => row.selected && row.status === 'selected');
  const status = batchErrors.length ? 'blocked' : 'ready';
  return {
    status,
    operation: 'category',
    mode: 'dry-run',
    batch_id: batchId,
    source: {
      source_sha256: categories.source.source_sha256,
      canonical_digest: categories.source.canonical_digest,
      sheet: categories.source.sheet,
      data_row_count: categories.source.data_row_count,
    },
    selection: {
      type: fullBatch ? 'full' : 'explicit-allowlist',
      source_rows: selectedRows,
      allowlist_digest: allowlistDigest,
    },
    summary: {
      source_rows: rowResults.length,
      selected_rows: selectedRows.length,
      matched_rows: rowResults.filter((row) => row.source_identity_status === 'matched').length,
      conflict_rows: failures.length,
      planned_writes: status === 'ready' ? plannedRows.length : 0,
      writes: 0,
      nine_category_counts: categories.summary.category_counts,
      confidence_counts: categories.summary.confidence_counts,
      review_counts: categories.summary.review_counts,
    },
    errors: batchErrors,
    failures,
    rows: rowResults,
    snapshots: status === 'ready' ? plannedRows.map((row) => ({
      source_row: row.source_row,
      repo_key: row.repo_key,
      before: row.before,
      after: row.after,
      before_hash: row.before_hash,
      after_hash: row.after_hash,
      immutable_before_hash: row.immutable_before_hash,
      immutable_after_hash: row.immutable_after_hash,
    })) : [],
    generated_at: new Date().toISOString(),
  };
}

function applyBatch(plan, { stateFile, batchDir = DEFAULT_BATCH_DIR } = {}) {
  if (plan.status !== 'ready') throw new Error('Cannot apply a blocked batch');
  if (!stateFile) throw new Error('Apply requires an explicit state file');
  const manifestFile = path.join(batchDir, plan.batch_id, 'result.json');
  if (fs.existsSync(manifestFile)) {
    const previous = readJson(manifestFile);
    if (previous.batch_id === plan.batch_id && previous.source.source_sha256 === plan.source.source_sha256 && previous.selection.allowlist_digest === plan.selection.allowlist_digest) {
      return { ...previous, replay: 'idempotent-no-op' };
    }
    throw new Error('Existing batch identity does not match the requested input');
  }
  const state = fs.existsSync(stateFile) ? readJson(stateFile) : {};
  const next = { ...state };
  for (const snapshot of plan.snapshots) {
    next[snapshot.repo_key] = { ...(next[snapshot.repo_key] || {}), category_id: snapshot.after.category_id };
  }
  const result = {
    ...plan,
    mode: 'apply',
    applied_rows: plan.snapshots.map((snapshot) => snapshot.source_row),
    summary: { ...plan.summary, writes: plan.snapshots.length },
    replay: 'applied',
  };
  const batchPath = path.join(batchDir, plan.batch_id);
  writeJson(path.join(batchPath, 'pre-write-snapshot.json'), plan.snapshots);
  writeJson(path.join(batchPath, 'result.json'), result);
  writeJson(stateFile, next);
  return result;
}

function rollbackBatch({ manifestFile, stateFile, batchId }) {
  const result = readJson(manifestFile);
  if (result.batch_id !== batchId) throw new Error('Rollback batch ID does not match the manifest');
  const state = readJson(stateFile);
  const next = { ...state };
  for (const snapshot of result.snapshots) {
    const current = next[snapshot.repo_key];
    if (!current || current.category_id !== snapshot.after.category_id) {
      throw new Error(`Rollback post-write state mismatch for ${snapshot.repo_key}`);
    }
    next[snapshot.repo_key] = { ...current, category_id: snapshot.before.category_id };
  }
  writeJson(stateFile, next);
  const rollback = {
    batch_id: batchId,
    status: 'rolled-back',
    restored_rows: result.snapshots.map((snapshot) => snapshot.source_row),
    immutable_fields_verified: result.snapshots.every((snapshot) => snapshot.immutable_before_hash === snapshot.immutable_after_hash),
    generated_at: new Date().toISOString(),
  };
  writeJson(path.join(path.dirname(manifestFile), 'rollback.json'), rollback);
  return rollback;
}

function parseArgs(argv) {
  const options = {
    identity: DEFAULT_IDENTITY,
    categories: DEFAULT_CATEGORIES,
    repo: DEFAULT_REPO_FILE,
    output: DEFAULT_OUTPUT,
    batchDir: DEFAULT_BATCH_DIR,
    mode: 'dry-run',
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--identity') options.identity = argv[++index];
    else if (argument === '--categories') options.categories = argv[++index];
    else if (argument === '--repo') options.repo = argv[++index];
    else if (argument === '--output') options.output = argv[++index];
    else if (argument === '--batch-dir') options.batchDir = argv[++index];
    else if (argument === '--allowlist') options.allowlist = argv[++index];
    else if (argument === '--mode') options.mode = argv[++index];
    else if (argument === '--state-file') options.stateFile = argv[++index];
    else if (argument === '--manifest') options.manifest = argv[++index];
    else if (argument === '--batch-id') options.batchId = argv[++index];
    else if (argument === '--help') options.help = true;
    else throw new Error(`Unknown argument: ${argument}`);
  }
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log('Usage: node scripts/phase4/legacy_batch.mjs [--mode dry-run|apply|rollback] [--allowlist rows.json]');
    return 0;
  }
  if (options.mode === 'rollback') {
    if (!options.manifest || !options.stateFile || !options.batchId) throw new Error('Rollback requires --manifest, --state-file, and --batch-id');
    console.log(JSON.stringify(rollbackBatch({ manifestFile: options.manifest, stateFile: options.stateFile, batchId: options.batchId })));
    return 0;
  }
  const plan = buildBatchPlan({
    identityFile: options.identity,
    categoryFile: options.categories,
    repoFile: options.repo,
    allowlist: readAllowlist(options.allowlist),
  });
  if (options.mode === 'apply') {
    console.log(JSON.stringify(applyBatch(plan, { stateFile: options.stateFile, batchDir: options.batchDir }).summary));
    return 0;
  }
  writeJson(options.output, plan);
  console.log(JSON.stringify({ status: plan.status, batch_id: plan.batch_id, summary: plan.summary, errors: plan.errors }));
  return plan.status === 'blocked' ? 2 : 0;
}

if (import.meta.url === `file://${process.argv[1]}`) process.exitCode = main();

export { applyBatch, buildBatchPlan, rollbackBatch, stableStringify };
