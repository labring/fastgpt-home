#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { applyBatch, buildBatchPlan, rollbackBatch } from './legacy_batch.mjs';

const fullPlan = buildBatchPlan();
assert.equal(fullPlan.status, 'blocked');
assert.equal(fullPlan.summary.source_rows, 2000);
assert.equal(fullPlan.summary.selected_rows, 2000);
assert.equal(fullPlan.summary.conflict_rows, 606);
assert.equal(fullPlan.summary.planned_writes, 0);
assert.deepEqual(fullPlan.errors, [{ code: 'full-batch-conflicts', count: 606 }]);
assert.equal(fullPlan.failures.length, 606);

const subsetPlan = buildBatchPlan({ allowlist: [5] });
assert.equal(subsetPlan.status, 'ready');
assert.deepEqual(subsetPlan.selection.source_rows, [5]);
assert.equal(subsetPlan.summary.planned_writes, 1);
assert.equal(subsetPlan.snapshots.length, 1);

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-phase4-'));
const stateFile = path.join(tempDir, 'state.json');
const batchDir = path.join(tempDir, 'batches');
const applied = applyBatch(subsetPlan, { stateFile, batchDir });
assert.equal(applied.replay, 'applied');
assert.equal(applied.summary.writes, 1);
assert.equal(JSON.parse(fs.readFileSync(stateFile, 'utf8'))[subsetPlan.snapshots[0].repo_key].category_id, subsetPlan.snapshots[0].after.category_id);

const replay = applyBatch(subsetPlan, { stateFile, batchDir });
assert.equal(replay.replay, 'idempotent-no-op');
assert.equal(replay.summary.writes, 1);

const changedSubset = buildBatchPlan({ allowlist: [5, 6] });
assert.equal(changedSubset.status, 'blocked');
assert.throws(() => applyBatch(changedSubset, { stateFile, batchDir }));

const manifestFile = path.join(batchDir, subsetPlan.batch_id, 'result.json');
assert.throws(() => rollbackBatch({ manifestFile, stateFile, batchId: 'wrong-batch' }));
const rollback = rollbackBatch({ manifestFile, stateFile, batchId: subsetPlan.batch_id });
assert.equal(rollback.status, 'rolled-back');
assert.equal(rollback.immutable_fields_verified, true);
assert.equal(JSON.parse(fs.readFileSync(stateFile, 'utf8'))[subsetPlan.snapshots[0].repo_key].category_id, null);

fs.rmSync(tempDir, { recursive: true, force: true });
console.log('Legacy batch regression passed: full batch blocked, explicit subset replayed idempotently, rollback verified.');

