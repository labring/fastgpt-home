---
phase: 08-production-delivery-live-verification
plan: "03"
subsystem: testing
tags: [live-verification, fetch, seo, provider-receipts]
requires:
  - phase: 08-production-delivery-live-verification
    provides: Immutable provider workflow and public release manifest contract
provides:
  - Dependency-free 18-route public Guide verification matrix
  - Explicit provider receipt and public release identity cross-checking
  - Timestamped blocked production baseline evidence
affects: [production-release, deploy-02]
actuals:
  tokens: 6944
  tasks: 2
  commits: 4
tech-stack:
  added: []
  patterns: [Bounded native fetch matrix, explicit provider evidence inputs]
key-files:
  created: [scripts/verify-guide-live.js, scripts/verify-guide-live.test.js, .planning/phases/08-production-delivery-live-verification/08-LIVE-EVIDENCE.json]
  modified: [package.json, .github/workflows/guide-production-release.yml]
key-decisions:
  - "Only explicit CN and IO provider receipts can establish provider deployment evidence."
  - "The baseline mode records public failures with blocked exit code 2 and never converts them into success."
requirements-completed: []
coverage:
  - id: D1
    description: Public Guide SEO, cache, manifest, and provider-revision verification matrix
    verification:
      - kind: integration
        ref: npm run verify:guide-live-regression
        status: pass
      - kind: other
        ref: 08-LIVE-EVIDENCE.json blocked public baseline
        status: fail
    human_judgment: true
    rationale: Real public production deployment and provider evidence are prerequisites for pass.
status: complete
---

# Phase 08 Plan 03: Public Live Verification Summary

**A native 18-page Guide verifier now checks public SEO, sitemap, cache, manifest, and provider identity surfaces while preserving the real blocked 404 baseline.**

## Performance

- **Duration:** 14m
- **Started:** 2026-08-17T12:56:00Z
- **Completed:** 2026-08-17T13:10:00Z
- **Tasks:** 2/2
- **Files modified:** 6

## Accomplishments

- Added bounded native HTTP checks for both Guide hubs, all sixteen articles, sitemaps, and release manifests.
- Required explicit CN/IO provider receipts and validated their immutable provider revisions against the public logical identity.
- Added a local 18-page fixture matrix and an honest baseline showing nine Guide 404s on each current public domain.

## Task Commits

1. **Task 1: Implement the dependency-free live Guide matrix and fixture tests** - `dde02ac`, `07c4b63`
2. **Task 2: Gate production workflow on live evidence and publish the phase matrix** - `019f35e`, `a373112`, `be87460`, `3486ed8`

## Decisions Made

- Custom base URLs project canonical, alternate, and sitemap expectations for deterministic local fixtures.
- Manifest cache headers, page cache evidence, release headers, and provider receipts are separate fail-closed surfaces.
- Generated IO release headers are canonicalized during tree hashing, preserving a stable public identity without a digest cycle.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Applied custom base URL projection to every SEO surface**
- **Found during:** Task 2
- **Issue:** Local fixture domains required canonical, alternate, and sitemap expectations independent of production hostnames.
- **Fix:** Used supplied base URLs for all live route projections and added an 18-page fixture regression.
- **Files modified:** `scripts/verify-guide-live.js`, `scripts/verify-guide-live.test.js`
- **Verification:** `npm run verify:guide-live-regression`
- **Committed in:** `a373112`

**2. [Rule 1 - Bug] Bound IO public manifest headers to the prepared artifact identity**
- **Found during:** Task 2
- **Issue:** Pages needs public `X-Release-*` evidence that matches the prepared manifest without changing its own identity recursively.
- **Fix:** Canonicalized generated release-header values in the tree hash and injected their final values before archive packaging.
- **Files modified:** `scripts/release-artifact.js`, `.github/workflows/guide-production-release.yml`
- **Verification:** `npm run release:artifact-regression`, `npm run verify:guide-live-regression`
- **Committed in:** `3486ed8`

## Issues Encountered

Public `fastgpt.cn` and `fastgpt.io` currently return 404 for all nine Guide paths per domain and 404 for both public release manifests. The recorded result is `blocked`; no deployment success, rollback target, or provider revision is inferred.

## User Setup Required

Run the guarded production workflow with authorized CN Kubernetes/GHCR and IO Cloudflare credentials, explicit rollback targets, and retained artifact evidence. Then rerun `npm run verify:guide-live` with both provider receipt paths.

## Next Phase Readiness

All local delivery and validation tooling is committed. DEPLOY-01 and DEPLOY-02 remain pending the authorized provider promotion and public 200 evidence.

## Self-Check: PASSED

- Live verifier, fixture tests, workflow gate, and public baseline files exist.
- Commits `dde02ac`, `07c4b63`, `019f35e`, `a373112`, `be87460`, and `3486ed8` exist.
- `npm run verify:guide-live-regression` passed; public baseline exited with blocked code 2 and records 9 cn + 9 io Guide 404s.
