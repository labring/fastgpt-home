#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildDirectRelease } from './build_direct_release.mjs';

const release = buildDirectRelease();
assert.equal(release.authorization.mode, 'direct-publish');
assert.equal(release.publishable.newFaq, 60);
assert.equal(release.publishable.comparisonPages, 4);
assert.equal(release.publishable.legacyMetaRuntimeReady, 76);
assert.equal(release.publishable.legacyCategoryRuntimeMapped, 1394);
assert.equal(release.deferredWithoutRuntimeObject.legacyMetaSourceRows, 24);
assert.equal(release.deferredWithoutRuntimeObject.legacyCategorySourceRows, 606);
assert.equal(release.waivedGates.length, 3);
assert.equal(fs.existsSync('artifacts/phase5/direct-release.json'), true);

console.log(`Direct release validation passed: ${release.publishable.newFaq} FAQ, ${release.publishable.comparisonPages} comparison pages, ${release.publishable.legacyCategoryRuntimeMapped} category overlays.`);
