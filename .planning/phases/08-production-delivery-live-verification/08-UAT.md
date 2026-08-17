---
status: complete
phase: 08-production-delivery-live-verification
source:
  - 08-01-SUMMARY.md
  - 08-02-SUMMARY.md
  - 08-03-SUMMARY.md
  - 08-VERIFICATION.md
started: 2026-08-17T12:59:32Z
updated: 2026-08-17T13:23:31Z
decision_mode: automated-authorized
---

## Current Test

[re-verification complete — gaps found]

## Tests

### 1. Immutable release artifact contract
expected: A verified cn or io export can be archived with a stable tree identity, prepared manifest, archive checksum, and rollback target.
result: pass
source: automated
evidence: npm run release:artifact-regression — 6 passed

### 2. Local provider rollback and receipt controls
expected: Before provider mutation, the workflow validates each dispatch rollback target against the provider-derived current revision. CN normalizes a current tag through authenticated GHCR metadata before exact input comparison. IO accepts the explicit initial-production sentinel for the first publish when no active production row exists, then records a null previous URL; later releases require the exact active production ID. CN writes its final receipt after completed rollout; IO retains its previous deployment URL and purge evidence.
result: pass
source: automated
evidence: Ruby YAML/ordering assertions passed; node --test scripts/verify-release.test.js and scripts/verify-guide-live.test.js cover tag-to-digest normalization, the initial-production receipt sentinel, provider ordering, and completed-rollout guards; one documented case-sensitive filesystem skip remains.

### 3. Published provider delivery path
expected: The authorized production repository exposes the guarded workflow and a completed run records provider-derived CN/IO rollback targets plus final immutable provider revisions.
result: issue
severity: blocker
source: automated
reported: GitHub API returned 404 for guide-production-release.yml on main in both configured repositories. The local workflow is provider-safe, while no published workflow run, provider receipt, release bundle, deployed revision, or rollback record exists.

### 4. Public bilingual Guide release
expected: /guide and all eight Guide articles return 200 on each owned domain with the required SEO, cache, sitemap, manifest, and provider-revision evidence.
result: issue
severity: blocker
source: automated
reported: Baseline started 2026-08-17T13:21:26.839Z found 18 Guide route 404s and two release-manifest 404s. Both sitemaps returned 200; every route and support surface records status, finalUrl, headers, and bodyDigest.

### 5. Auditable sitemap and manifest evidence
expected: The live JSON report records structured HTTP status, final URL, headers, body digest, and timestamps for the two sitemaps and two release manifests.
result: pass
source: automated
evidence: Fresh 08-LIVE-EVIDENCE.json assertion verified two sitemap 200s, two manifest 404s, and all required structured fields.

## Summary

total: 5
passed: 3
issues: 2
pending: 0
skipped: 0
blocked: 0

DEPLOY-01 and DEPLOY-02 remain blocked pending a published authorized workflow run, provider receipts, and public 200 evidence.

## Gaps

- gap_id: G-08-3
  truth: "The production workflow is published and has recorded immutable provider revisions and provider-derived rollback targets."
  status: failed
  severity: blocker
  test: 3
  reason: "Both checked remote defaults lack guide-production-release.yml and no completed provider evidence exists."
  artifacts:
    - path: .github/workflows/guide-production-release.yml
      issue: Local source guards pass; the authorized remote workflow and receipts remain absent.
  missing:
    - Publish and run the guarded workflow with authorized provider credentials.
    - Preserve the final CN/IO receipts, IO purge evidence, archives, manifests, and live matrix.
- gap_id: G-08-4
  truth: "Both domains expose the full 18-page Guide release with final 200 and release identity evidence."
  status: failed
  severity: blocker
  test: 4
  reason: "All 18 Guide page probes and both manifest probes returned 404."
  artifacts:
    - path: .planning/phases/08-production-delivery-live-verification/08-LIVE-EVIDENCE.json
      issue: Blocked baseline records current public absence with structured support-surface evidence.
  missing:
    - Complete provider promotion, purge/propagation, and strict live verification with final receipts.
