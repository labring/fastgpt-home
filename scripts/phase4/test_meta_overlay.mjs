#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildMetaReport } from './meta_overlay.mjs';

const { report, overlay } = buildMetaReport();
assert.equal(report.source.source_sha256, 'd9aeb3ede23d29a2c2a65eee61df381366db68c0301df9cedeee2e7ae9489811');
assert.equal(report.source.data_row_count, 100);
assert.equal(report.source_errors.length, 0);
assert.equal(report.summary.matched_rows, 76);
assert.equal(report.summary.unresolved_rows, 24);
assert.equal(Object.keys(overlay).length, 76);
assert.deepEqual(report.summary.applied_fields, ['Title', 'Description']);
assert.equal(report.rows.filter((row) => row.status === 'matched').every((row) => row.immutable_before_hash === row.immutable_after_hash), true);
assert.equal(report.rows.filter((row) => row.status === 'unmatched-source').every((row) => row.repo_key === null), true);
assert.equal(fs.existsSync('src/faq/legacyMeta.ts'), true);
assert.equal(fs.existsSync('artifacts/phase4/meta-overlay-report.json'), true);

console.log(`Meta overlay validation passed: ${report.summary.source_rows} source rows, ${report.summary.matched_rows} applied candidates, ${report.summary.unresolved_rows} explicit failures.`);
