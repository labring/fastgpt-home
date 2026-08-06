import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { expectedSlugs, validateManifest } from './validate_competitor_manifest.mjs';

const result = validateManifest({ write: true });
assert.deepEqual(result.manifest.pages.map((page) => page.slug).sort(), [...expectedSlugs].sort());
assert.equal(result.manifest.publicationOverride?.mode, 'direct-publish');
assert.equal(result.manifest.sourceInputs.some((input) => input.id === 'competitor-readme-v1.1' && input.version === 'V1.1 (2026-08-05)'), true);
assert.equal(result.manifest.pages.every((page) => page.sourceRefs.some((ref) => ref.id === 'draft-body' && ref.version === 'V1.1')), true);
assert.equal(result.manifest.pages.every((page) => page.sourceRefs.some((ref) => ref.id === 'fastgpt-support-contract' && ref.evidenceStatus === 'contract-required')), true);
assert.equal(result.manifest.pages.every((page) => page.dates.dateModified === '2026-08-05' && page.dates.nextReviewOn === '2026-11-03'), true);
assert.equal(result.manifest.pages.every((page) => page.status === 'published'), true, 'direct-publish override must retain published status');
assert.equal(result.failures.some((failure) => failure.gate === 'signoffs'), false);
assert.equal(result.waivedFailures.filter((failure) => failure.gate === 'signoffs').length, 12);
assert.equal(result.manifest.pages.every((page) => page.gates.contentAudit === 'passed'), true, 'content audit status is recorded independently');
assert.equal(fs.existsSync(path.join(process.cwd(), 'artifacts/phase3/competitor-pages-failures.json')), true);
console.log(`Manifest gate regression passed: ${result.failures.length} blockers, ${result.waivedFailures.length} waived signoff findings, all pages published under the direct-release override.`);
