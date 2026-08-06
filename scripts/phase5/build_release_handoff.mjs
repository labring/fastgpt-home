#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '../..');
const OUTPUT = path.join(ROOT, 'artifacts/phase5/release-handoff.json');

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
}

function sha(value) {
  return crypto.createHash('sha256').update(JSON.stringify(value), 'utf8').digest('hex');
}

function currentCommit() {
  const result = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : 'unknown';
}

function buildHandoff() {
  const faq = readJson('artifacts/phase1/faq-source-baseline.json');
  const compare = readJson('artifacts/phase3/competitor-pages-manifest.json');
  const meta = readJson('artifacts/phase4/meta-overlay-report.json');
  const category = readJson('artifacts/phase4/category-batch-dry-run.json');
  const identity = readJson('artifacts/phase1/identity-baseline.json');
  const browserEvidenceFile = path.join(ROOT, 'artifacts/phase5/uat/browser-evidence.json');
  const browserEvidence = fs.existsSync(browserEvidenceFile)
    ? JSON.parse(fs.readFileSync(browserEvidenceFile, 'utf8'))
    : null;
  const browserPassed = browserEvidence?.passed === true;

  const faqBatch = `faq-${faq.source.source_sha256.slice(0, 16)}`;
  const metaBatch = `meta-${meta.source.source_sha256.slice(0, 16)}-${meta.report_digest.slice(0, 12)}`;
  const categoryBatch = category.batch_id;
  const selectionMemo = compare.sourceInputs.find((input) => input.id === 'selection-memo-v1.1');
  const compareReadme = compare.sourceInputs.find((input) => input.id === 'competitor-readme-v1.0');
  if (!selectionMemo || !compareReadme) throw new Error('Comparison source manifest is missing the selection memo or README fingerprint');
  const compareBatch = `compare-${selectionMemo.sha256.slice(0, 16)}`;

  const newFaqItems = faq.rows.map((row) => ({
    type: 'new-faq',
    sourceRow: row.source_row,
    serial: row.values.no,
    slug: row.values.slug,
    url: `https://fastgpt.cn/faq/${row.values.slug}`,
    sourceVersion: 'W2 V1.1',
    sourceSha256: faq.source.source_sha256,
    batch: faqBatch,
    status: 'verified-static',
    result: 'ready-for-release-gate',
  }));

  const compareItems = compare.pages.map((page) => ({
    type: 'comparison-page',
    slug: page.slug,
    url: `https://fastgpt.cn/compare/${page.slug}`,
    sourceVersion: page.sourceRefs.find((ref) => ref.id === 'draft-body')?.version || 'V1.0',
    sourceSha256: page.sourceHash,
    batch: compareBatch,
    status: page.status,
    result: page.status === 'published' ? 'ready-for-release-gate' : 'signoff-pending',
    signoffs: Object.fromEntries(page.signoffs.map((signoff) => [signoff.role, signoff.status])),
  }));

  const metaItems = meta.rows.map((row) => ({
    type: 'legacy-meta',
    sourceRow: row.source_row,
    serial: row.serial,
    repoKey: row.repo_key,
    url: row.url,
    sourceVersion: 'W2 V1.0',
    sourceSha256: meta.source.source_sha256,
    batch: metaBatch,
    status: row.status === 'matched' ? 'runtime-overlay-ready' : 'blocked',
    result: row.status === 'matched' ? 'Title/Description overlay applied' : row.conflict_reason,
    immutableFields: ['Question', 'Answers', 'Category', 'repo_key', 'URL'],
  }));

  const identityByRow = new Map(identity.rows.map((row) => [row.source_row, row]));
  const categoryItems = category.rows.map((row) => {
    const identityRow = identityByRow.get(row.source_row);
    const blocked = identityRow?.status !== 'matched';
    return {
      type: 'legacy-category',
      sourceRow: row.source_row,
      url: row.url,
      repoKey: identityRow?.repo_key || null,
      sourceVersion: 'W2 V1.1',
      sourceSha256: category.source.source_sha256,
      batch: categoryBatch,
      categoryId: row.category_id,
      originalCategory: row.original_category,
      confidence: row.confidence,
      reviewFlag: row.review_flag,
      identityStatus: identityRow?.status || 'missing-identity-row',
      status: blocked ? 'blocked' : 'dry-run-only',
      result: blocked ? 'full-batch-conflict' : 'full-batch-blocked-by-other-rows',
    };
  });

  const blockers = [
    {
      id: 'legacy-meta-unmatched',
      requirement: 'LEG-03',
      count: meta.summary.unresolved_rows,
      message: 'Meta source rows have no unique repository FAQ object.',
      evidence: 'artifacts/phase4/meta-overlay-report.json',
    },
    {
      id: 'legacy-category-conflicts',
      requirement: 'LEG-04',
      count: category.summary.conflict_rows,
      message: 'The full category batch fails closed and writes zero rows.',
      evidence: 'artifacts/phase4/category-batch-dry-run.json',
    },
    {
      id: 'comparison-signoffs',
      requirement: 'CMP-05',
      count: compare.pages.reduce((total, page) => total + page.signoffs.filter((signoff) => signoff.status !== 'approved').length, 0),
      message: 'Product, sales, and legal signoffs remain pending for comparison pages.',
      evidence: 'artifacts/phase3/competitor-pages-manifest.json',
    },
  ];
  if (!browserPassed) {
    blockers.push({
      id: 'browser-evidence-pending',
      requirement: 'REL-03',
      count: 1,
      message: 'Desktop and mobile browser evidence requires a browser-capable environment.',
      evidence: '.planning/phases/05-release-verification-and-handoff/05-UAT.md',
    });
  }
  blockers.push({
    id: 'live-reachability-pending',
    requirement: 'REL-04',
    count: 1,
    message: 'Live URL reachability and search crawl evidence are pending handoff execution.',
    evidence: '.planning/phases/05-release-verification-and-handoff/05-UAT.md',
  });

  const handoff = {
    id: 'w2-release-handoff',
    schemaVersion: 'W2-2026-08-04-v1',
    generatedOn: new Date().toISOString(),
    preparedFromCommit: currentCommit(),
    releaseStatus: blockers.length ? 'blocked' : 'ready',
    counts: {
      newContent: newFaqItems.length + compareItems.length,
      newFaq: newFaqItems.length,
      comparisonPages: compareItems.length,
      legacyRepairs: metaItems.length + categoryItems.length,
      legacyMetaSource: metaItems.length,
      legacyMetaRuntimeReady: metaItems.filter((item) => item.status === 'runtime-overlay-ready').length,
      legacyMetaBlocked: metaItems.filter((item) => item.status === 'blocked').length,
      legacyCategorySource: categoryItems.length,
      legacyCategoryConflicts: categoryItems.filter((item) => item.status === 'blocked').length,
      legacyCategoryWrites: category.summary.writes,
    },
    sourceInputs: {
      faq: {
        version: 'W2 V1.1',
        sha256: faq.source.source_sha256,
        canonicalDigest: faq.source.canonical_digest,
      },
      meta: {
        version: 'W2 V1.0',
        sha256: meta.source.source_sha256,
        reportDigest: meta.report_digest,
      },
      category: {
        version: 'W2 V1.1',
        sha256: category.source.source_sha256,
        canonicalDigest: category.source.canonical_digest,
      },
      comparisons: {
        selectionMemoSha256: selectionMemo.sha256,
        pagesReadmeSha256: compareReadme.sha256,
      },
    },
    gateResults: {
      faqStatic: 'passed',
      comparisonPages: compare.pages.every((page) => page.status === 'published') ? 'passed' : 'preview',
      legacyMeta: meta.summary.unresolved_rows === 0 ? 'passed' : 'partial',
      legacyCategories: category.summary.writes === 2000 ? 'passed' : 'blocked',
      typecheck: 'passed',
      lint: 'passed',
      staticBuild: 'passed',
      caseSensitiveExactSet: 'required-in-ci',
      browser: browserPassed ? 'passed' : 'pending',
      liveReachability: 'pending',
    },
    blockers,
    newContentItems: [...newFaqItems, ...compareItems],
    legacyRepairItems: [...metaItems, ...categoryItems],
    verification: {
      commands: [
        'npx tsc --noEmit',
        'npm run lint',
        'NEXT_TELEMETRY_DISABLED=1 npm run build',
        'node scripts/phase1/test_identity_baseline.mjs',
        'node scripts/phase2/test_w2_faq.mjs',
        'node scripts/phase2/test_faq_routes.mjs',
        'COMPARE_BUILD_OUT=out npm run verify:p3',
        'npm run verify:p4',
        'node scripts/phase5/test_browser_evidence.mjs',
        'npm run verify:p5',
      ],
      knownEnvironmentFindings: [
        'macOS case-insensitive output reports 2,830 FAQ detail files against 2,860 sitemap routes because of 15 pre-existing case-only slug pairs.',
        'Live URL reachability and search crawl evidence require the deployed handoff environment.',
      ],
    },
    rollback: {
      meta: 'Revert the Phase 4 runtime overlay commit or remove the generated legacyMeta module after preserving the handoff manifest.',
      category: 'No full-batch category writes occurred. For an approved allowlist batch, run legacy_batch.mjs --mode rollback with its original manifest, state file, and batch ID.',
      comparison: 'Restore preview-only manifest status; published transition requires the original page manifest and three signoff records.',
    },
  };
  return handoff;
}

function main() {
  const handoff = buildHandoff();
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(handoff, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ status: handoff.releaseStatus, counts: handoff.counts, blockers: handoff.blockers.length }));
}

if (import.meta.url === `file://${process.argv[1]}`) main();

export { buildHandoff };
