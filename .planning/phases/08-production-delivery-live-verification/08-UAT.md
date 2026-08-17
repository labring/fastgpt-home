---
status: complete
phase: 08-production-delivery-live-verification
source:
  - 08-01-SUMMARY.md
  - 08-02-SUMMARY.md
  - 08-03-SUMMARY.md
  - 08-VERIFICATION.md
started: 2026-08-17T12:59:32Z
updated: 2026-08-17T13:08:48Z
decision_mode: automated-authorized
---

## Current Test

[re-verification complete — blocked]

## Tests

### 1. Immutable release artifact contract
expected: A verified cn or io export can be archived with a stable tree identity, prepared manifest, archive checksum, and rollback target.
result: pass
source: automated
evidence: npm run release:artifact-regression — 6 passed

### 2. Published provider delivery path
expected: The authorized production repository exposes the guarded workflow and a completed run records provider-derived CN/IO rollback targets plus final immutable provider revisions.
result: issue
severity: blocker
source: automated
reported: Both configured GitHub default branches return 404 for guide-production-release.yml; no provider receipt or release bundle exists. The local workflow also trusts dispatch rollback strings, reads Pages deployment state after deploy, and writes the CN receipt before Kubernetes rollout status without preserving the final rollout result.

### 3. Public bilingual Guide release
expected: `/guide` and all eight Guide articles return 200 on each owned domain with the required SEO, cache, sitemap, manifest, and provider-revision evidence.
result: issue
severity: blocker
source: automated
reported: Baseline at 2026-08-17T13:07:31Z found 9/9 Guide paths returning 404 on fastgpt.cn, 9/9 returning 404 on fastgpt.io, and both release manifests returning 404. Both sitemaps returned 200 without Guide rows.

### 4. Auditable sitemap and manifest evidence
expected: The live JSON report records structured HTTP status, final URL, headers, body digest, and timestamps for the two sitemaps and two release manifests.
result: pass
source: automated
evidence: `verify-guide-live.js` emits `variants.<variant>.surfaces` entries for `/sitemap.xml` and `/__release/manifest.json`; the 4-case fixture regression asserts these fields for both variants.

## Summary

total: 4
passed: 2
issues: 2
pending: 0
skipped: 0
blocked: 0

## Gaps

- gap_id: G-08-2
  truth: "The production workflow is published and has recorded immutable provider revisions and provider-derived rollback targets."
  status: failed
  severity: blocker
  test: 2
  reason: "The workflow is absent from both checked remote defaults; local receipt ordering and rollback capture are incomplete."
  artifacts:
    - path: .github/workflows/guide-production-release.yml
      issue: CN receipt precedes rollout status; provider rollback state is never read before mutation.
  missing:
    - Read each current provider revision before mutation and bind it as rollback target.
    - Persist final post-rollout CN and final IO receipts, then publish and run the guarded workflow with authorized credentials.
- gap_id: G-08-3
  truth: "Both domains expose the full 18-page Guide release with final 200 and release identity evidence."
  status: failed
  severity: blocker
  test: 3
  reason: "All 18 Guide page probes and both manifest probes returned 404."
  artifacts:
    - path: .planning/phases/08-production-delivery-live-verification/08-LIVE-EVIDENCE.json
      issue: Blocked baseline records current public absence with structured support-surface evidence.
  missing:
    - Complete provider promotion, purge/propagation, and strict live verification with final receipts.
