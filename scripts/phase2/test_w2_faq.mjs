#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { readInputs, validateW2Data, extractExportedObject } from './validate_w2_faq.mjs';

const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const ZH_FILE = path.join(REPO_ROOT, 'src/faq/zh.ts');
const W2_FILE = path.join(REPO_ROOT, 'src/faq/w2.ts');

const inputs = readInputs();
const result = validateW2Data(inputs);
assert.equal(result.status, 'passed', JSON.stringify(result.errors));
assert.equal(result.baseline_rows, 60);
assert.equal(result.runtime_rows, 60);
assert.equal(result.english_rows, 1400);
assert.equal(Object.keys(inputs.runtime).length, 60);
assert.equal(Object.keys(inputs.english).some((key) => key in inputs.runtime), false);

const legacyZh = extractExportedObject(ZH_FILE, 'faqZhLegacy');
assert.equal(Object.keys(legacyZh).length, 1400);
assert.match(fs.readFileSync(ZH_FILE, 'utf8'), /\.\.\.faqW2Zh/);

const missing = structuredClone(inputs.runtime);
delete missing[Object.keys(missing)[0]];
assert.equal(validateW2Data({ ...inputs, runtime: missing }).status, 'blocked');

const changedMeta = structuredClone(inputs.runtime);
changedMeta[Object.keys(changedMeta)[0]].Description = 'changed description';
assert.equal(validateW2Data({ ...inputs, runtime: changedMeta }).status, 'blocked');

const changedAnswer = structuredClone(inputs.runtime);
changedAnswer[Object.keys(changedAnswer)[0]].Answers = 'changed answer';
assert.equal(validateW2Data({ ...inputs, runtime: changedAnswer }).status, 'blocked');

const changedSource = structuredClone(inputs.baseline);
changedSource.source.source_sha256 = '0'.repeat(64);
assert.equal(validateW2Data({ ...inputs, baseline: changedSource }).status, 'blocked');

const duplicated = structuredClone(inputs.baseline);
duplicated.rows[1].values.slug = duplicated.rows[0].values.slug;
assert.equal(validateW2Data({ ...inputs, baseline: duplicated }).status, 'blocked');

console.log('W2 FAQ source and runtime tests passed');
