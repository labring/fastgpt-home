#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildIdentityReport,
  extractFaqRecords,
  normaliseQuestion,
  normaliseUrl,
} from './identity_baseline.mjs';
import { buildCategoryReport, buildPublishGateContract } from './category_contract.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '../..');
const DATA_ROOT = process.env.FASTGPT_W2_DATA_DIR ||
  '/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730';
const WORKBOOK = path.join(DATA_ROOT, '存量修复/FastGPT-存量FAQ分类重挂对照表-V1.1-星触达-20260730.xlsx');
const REPO_FILE = path.join(REPO_ROOT, 'src/faq/en.ts');
const CONTRACT = path.join(SCRIPT_DIR, 'category_contract.json');

function testIdentityReport() {
  const records = extractFaqRecords(REPO_FILE);
  assert.equal(records.length, 1400);
  assert.equal(new Set(records.map((record) => record.repo_key)).size, 1400);
  assert.equal(new Set(records.map((record) => record.question)).size, 1400);

  assert.equal(normaliseQuestion('  e\u0301  '), 'é');
  assert.equal(normaliseUrl('HTTPS://FASTGPT.IO/en/faq/foo%2Dbar/'), 'https://fastgpt.io/en/faq/foo-bar');

  const report = buildIdentityReport({ workbook: WORKBOOK, repoFile: REPO_FILE });
  assert.equal(report.status, 'blocked');
  assert.equal(report.source.source_sha256, '751a479680bfc987b9394c7429100d8f09269cc7ad8a698ff97b34415a6733b0');
  assert.deepEqual(report.source.headers, ['序号', '原分类', '建议新分类', '置信度', '需人工复核', '问题（原文）', '线上 URL']);
  assert.equal(report.summary.rows, 2000);
  assert.equal(report.summary.unique_urls, 1990);
  assert.equal(report.summary.unique_questions, 1990);
  assert.equal(report.summary.question_matches, 1400);
  assert.equal(report.summary.unmatched_objects, 590);
  assert.equal(report.summary.duplicate_url_groups, 10);
  assert.equal(report.duplicate_url_groups.every((group) => group.source_rows.length === 2), true);
  assert.equal(report.rows.length, 2000);
  assert.equal(new Set(report.rows.map((row) => row.source_row)).size, 2000);
  assert.equal(report.rows.filter((row) => row.status === 'duplicate-url').length, 20);
  assert.equal(report.rows.filter((row) => row.status === 'matched').length, 1394);
  assert.equal(report.rows.every((row) => row.source_identity.source_sha256 === report.source.source_sha256), true);
  assert.equal(report.rows.every((row) => typeof row.raw.url === 'string' && typeof row.raw.question === 'string'), true);
}

function testCategoryAndGate() {
  const report = buildCategoryReport({ workbook: WORKBOOK, contractFile: CONTRACT });
  assert.equal(report.status, 'passed');
  assert.equal(report.summary.rows, 2000);
  assert.deepEqual(report.summary.category_counts, {
    'data-and-document-processing': 350,
    'deployment-and-security': 292,
    'content-and-creativity': 272,
    'industry-applications': 234,
    'concepts-and-selection': 223,
    'office-and-collaboration-automation': 190,
    'platform-value-and-trends': 164,
    'integration-and-development': 140,
    'customer-service-and-support': 135,
  });
  assert.deepEqual(report.summary.confidence_counts, { LLM: 913, '高': 576, '低': 468, '中': 43 });
  assert.deepEqual(report.summary.review_counts, { '': 619, '是': 468, '抽检': 913 });
  assert.equal(report.rows.every((row) => row.category_id), true);
  assert.equal(report.rows.every((row) => row.url && row.question), true);
  assert.equal(report.source.source_sha256, '751a479680bfc987b9394c7429100d8f09269cc7ad8a698ff97b34415a6733b0');

  const gate = buildPublishGateContract();
  assert.equal(gate.dry_run.required, true);
  assert.equal(gate.dry_run.writes, 0);
  assert.equal(gate.fail_closed.default, true);
  assert.equal(gate.fail_closed.partial_write, false);
  assert.equal(gate.batch.same_batch_same_fingerprint_replay, 'idempotent-no-op');
  assert.equal(gate.rollback.accepted_only_with_matching_batch_id, true);
}

testIdentityReport();
testCategoryAndGate();
console.log('identity baseline and category contract tests passed');
