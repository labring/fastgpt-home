#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildHandoff } from './build_release_handoff.mjs';

const handoff = buildHandoff();
assert.equal(handoff.releaseStatus, 'blocked');
assert.equal(handoff.counts.newContent, 64);
assert.equal(handoff.counts.newFaq, 60);
assert.equal(handoff.counts.comparisonPages, 4);
assert.equal(handoff.counts.legacyRepairs, 2100);
assert.equal(handoff.counts.legacyMetaSource, 100);
assert.equal(handoff.counts.legacyMetaRuntimeReady, 76);
assert.equal(handoff.counts.legacyMetaBlocked, 24);
assert.equal(handoff.counts.legacyCategorySource, 2000);
assert.equal(handoff.counts.legacyCategoryConflicts, 606);
assert.equal(handoff.counts.legacyCategoryWrites, 0);

assert.equal(handoff.newContentItems.length, 64);
assert.equal(handoff.legacyRepairItems.length, 2100);
assert.equal(handoff.newContentItems.filter((item) => item.type === 'new-faq').length, 60);
assert.equal(handoff.newContentItems.filter((item) => item.type === 'comparison-page').length, 4);
assert.equal(handoff.legacyRepairItems.filter((item) => item.type === 'legacy-meta').length, 100);
assert.equal(handoff.legacyRepairItems.filter((item) => item.type === 'legacy-category').length, 2000);
assert.equal(handoff.newContentItems.every((item) => item.url && item.sourceSha256 && item.batch && item.result), true);
assert.equal(handoff.legacyRepairItems.every((item) => item.url && item.sourceSha256 && item.batch && item.result), true);
assert.equal(handoff.newContentItems.filter((item) => item.type === 'comparison-page').every((item) => item.status === 'preview'), true);
assert.equal(handoff.blockers.some((blocker) => blocker.id === 'legacy-category-conflicts'), true);
assert.equal(handoff.blockers.some((blocker) => blocker.id === 'comparison-signoffs'), true);
assert.equal(handoff.blockers.some((blocker) => blocker.id === 'browser-evidence-pending'), false);
assert.equal(handoff.gateResults.legacyCategories, 'blocked');
assert.equal(handoff.gateResults.browser, 'passed');
assert.equal(fs.existsSync('artifacts/phase5/release-handoff.json'), true, 'run the handoff builder before this test');

console.log(`Release handoff validation passed: ${handoff.counts.newContent} new items, ${handoff.counts.legacyRepairs} legacy repair rows, ${handoff.blockers.length} blockers retained.`);
