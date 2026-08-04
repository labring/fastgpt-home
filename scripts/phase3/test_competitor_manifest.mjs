import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { expectedSlugs, validateManifest } from './validate_competitor_manifest.mjs';

const result = validateManifest({ write: true });
assert.deepEqual(result.manifest.pages.map((page) => page.slug).sort(), [...expectedSlugs].sort());
assert.equal(result.manifest.pages.every((page) => page.status === 'preview'), true, 'pending signoffs must fail closed');
assert.equal(result.failures.some((failure) => failure.gate === 'signoffs'), true);
assert.equal(result.manifest.pages.every((page) => page.gates.contentAudit === 'passed'), true, 'content audit status is recorded independently');
assert.equal(fs.existsSync(path.join(process.cwd(), 'artifacts/phase3/competitor-pages-failures.json')), true);
console.log(`Manifest gate regression passed: ${result.failures.length} blockers keep all pages in preview.`);
