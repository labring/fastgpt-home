#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const handoffPath = path.join(root, 'artifacts/phase5/release-handoff.json');
const categoryPath = path.join(root, 'artifacts/phase4/category-batch-dry-run.json');
const manifestPath = path.join(root, 'artifacts/phase3/competitor-pages-manifest.json');
const outputPath = path.join(root, 'artifacts/phase5/direct-release.json');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function currentCommit() {
  const result = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : 'unknown';
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function buildDirectRelease() {
  const handoff = readJson(handoffPath);
  const category = readJson(categoryPath);
  const manifest = readJson(manifestPath);
  const directlyMappedCategoryRows = category.rows.filter((row) => row.status === 'selected' && row.repo_key);
  const publishedPages = manifest.pages.filter((page) => page.status === 'published');

  return {
  id: 'w2-direct-release',
  schemaVersion: 'W2-2026-08-05-direct-v1',
  generatedOn: new Date().toISOString(),
  preparedFromCommit: currentCommit(),
  authorization: {
    mode: 'direct-publish',
    authorizedOn: '2026-08-05',
    instruction: 'User explicitly authorized publication while waiving identity-conflict and comparison signoff gates.',
  },
  sourceHandoff: {
    file: 'artifacts/phase5/release-handoff.json',
    sha256: sha256(fs.readFileSync(handoffPath)),
  },
  publishable: {
    newFaq: handoff.counts.newFaq,
    comparisonPages: publishedPages.length,
    legacyMetaRuntimeReady: handoff.counts.legacyMetaRuntimeReady,
    legacyCategoryRuntimeMapped: directlyMappedCategoryRows.length,
  },
  deferredWithoutRuntimeObject: {
    legacyMetaSourceRows: handoff.counts.legacyMetaBlocked,
    legacyCategorySourceRows: handoff.counts.legacyCategoryConflicts,
  },
  waivedGates: [
    {
      id: 'legacy-meta-unmatched',
      reason: 'Publish the available runtime overlay and keep source rows without a runtime object out of the static bundle.',
    },
    {
      id: 'legacy-category-conflicts',
      reason: 'Apply every uniquely matched category row directly; source rows without a runtime object remain deferred.',
    },
    {
      id: 'comparison-signoffs',
      reason: 'Publish the four comparison pages under the explicit direct-publish authorization.',
    },
  ],
  operationalGate: {
    status: 'pending-deployment',
    workflow: '.github/workflows/fastgpt-home-image.yml',
    trigger: 'push upstream/main',
    liveVerification: ['comparison URLs', 'FAQ sitemap counts', 'canonical and robots metadata'],
  },
  rollback: {
    code: 'git revert the direct-release commit and push upstream/main to trigger the previous image deployment.',
    content: 'Restore preview statuses and remove the generated direct category overlay in the same revert.',
  },
  };
}

function main() {
  const release = buildDirectRelease();
  fs.writeFileSync(outputPath, `${JSON.stringify(release, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({
    outputPath,
    preparedFromCommit: release.preparedFromCommit,
    publishable: release.publishable,
    deferred: release.deferredWithoutRuntimeObject,
  }));
}

if (import.meta.url === `file://${process.argv[1]}`) main();

export { buildDirectRelease };
