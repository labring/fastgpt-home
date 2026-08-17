---
status: complete
phase: 08-production-delivery-live-verification
source:
  - 08-01-SUMMARY.md
  - 08-02-SUMMARY.md
  - 08-03-SUMMARY.md
  - 08-VERIFICATION.md
started: 2026-08-17T12:59:32Z
updated: 2026-08-17T13:18:00Z
decision_mode: automated-authorized
---

## Current Test

[re-verification complete]

## Tests

### 1. Immutable release artifact contract
expected: A verified cn or io export can be archived with a stable tree identity, prepared manifest, archive checksum, and rollback target.
result: pass
source: automated
evidence: npm run release:artifact-regression — 6 passed

### 2. Published provider delivery path
expected: The authorized production repository exposes the guarded workflow and a completed run records immutable CN/IO provider revisions and rollback targets.
result: issue
severity: blocker
source: automated
reported: GitHub REST returned 404 for guide-production-release.yml in both configured remote default branches; no provider receipt or release bundle exists.

### 3. Public bilingual Guide release
expected: `/guide` and all eight Guide articles return 200 on each owned domain with the required SEO, cache, sitemap, manifest, and provider-revision evidence.
result: issue
severity: blocker
source: automated
reported: Independent public baseline at 2026-08-17T12:56:43Z found 9/9 Guide paths returning 404 on fastgpt.cn, 9/9 returning 404 on fastgpt.io, and both release manifests returning 404. Both sitemaps returned 200 without Guide rows.

### 4. Auditable sitemap and manifest evidence
expected: The live JSON report records structured HTTP status, final URL, headers, body digest, and timestamps for the two sitemaps and two release manifests.
result: pass
severity: none
source: automated
reported: `verify-guide-live.js` now emits `variants.<variant>.surfaces` entries for `/sitemap.xml` and `/__release/manifest.json`; fixture assertions cover status, cache headers, and body digests for both variants.

## Summary

total: 4
passed: 2
issues: 2
pending: 0
skipped: 0
blocked: 0

## Gaps

- gap_id: G-08-2
  truth: "The production workflow is published and has recorded immutable provider revisions and rollback targets."
  status: failed
  severity: blocker
  test: 2
  reason: "No workflow on either checked remote default branch; no provider receipts."
  artifacts:
    - path: .github/workflows/guide-production-release.yml
      issue: Local-only workflow is absent from both checked GitHub defaults.
  missing:
    - Publish and run the guarded workflow with real provider credentials and explicit rollback targets.
- gap_id: G-08-3
  truth: "Both domains expose the full 18-page Guide release with final 200 and release identity evidence."
  status: failed
  severity: blocker
  test: 3
  reason: "All 18 Guide page probes and both manifest probes returned 404."
  artifacts:
    - path: .planning/phases/08-production-delivery-live-verification/08-LIVE-EVIDENCE.json
      issue: Blocked baseline records current public absence.
  missing:
    - Complete provider promotion, purge/propagation, and strict live verification with receipts.
