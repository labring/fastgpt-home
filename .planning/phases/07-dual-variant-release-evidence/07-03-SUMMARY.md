---
phase: 07-dual-variant-release-evidence
plan: "03"
subsystem: testing
tags: [node-test, static-export, github-actions, docker, seo, guide]
requires:
  - phase: 07-dual-variant-release-evidence
    plan: "02"
    provides: "Complete registry-driven Guide export verifier and mutation matrix"
provides:
  - "Single FAQ plus Guide release coordinator with per-variant source and artifact evidence"
  - "Successful per-variant P1 KiB evidence while retaining the blocking 260 KiB budget"
  - "Ubuntu and container-local paths for case-sensitive dual-variant verification"
affects: [08-production-delivery, release, static-export]
actuals:
  tokens: 2964.75
  tasks: 2
  commits: 4
tech-stack:
  added: []
  patterns:
    - "Release coordination runs Guide source gates immediately before each clean variant build and its export gate before cleanup."
    - "Build-only Linux evidence uses the existing locked npm tree and failure-only retained artifacts."
key-files:
  created:
    - .github/workflows/guide-release-verification.yml
    - Dockerfile.verify
  modified:
    - scripts/verify-release.js
    - scripts/verify-release.test.js
key-decisions:
  - "The existing verify:release command remains the only aggregate FAQ and Guide gate."
  - "Ubuntu CI and Dockerfile.verify own case-sensitive export evidence while Phase 8 retains delivery operations."
requirements-completed: [VERIFY-04, VERIFY-05]
coverage:
  - id: D1
    description: "The release coordinator composes existing FAQ checks with Guide source, export, ordering, option, cleanup, and P1 measurement evidence."
    requirement: VERIFY-04
    verification:
      - kind: integration
        ref: "npm run verify:release-regression && npm run verify:release -- --source-only"
        status: pass
    human_judgment: false
  - id: D2
    description: "Ubuntu and container-local runners execute the identical full io/cn release gate on a case-sensitive filesystem."
    requirement: VERIFY-05
    verification:
      - kind: integration
        ref: "node --test --test-name-pattern=Linux release evidence stays build-only scripts/verify-release.test.js"
        status: pass
      - kind: manual_procedural
        ref: "GitHub Guide Release Verification job or docker build --file Dockerfile.verify --tag fastgpt-guide-release-verify ."
        status: unknown
    human_judgment: true
    rationale: "The local workspace is case-insensitive and Docker is unavailable; a case-sensitive Ubuntu or container host must run the full export."
metrics:
  duration: 3m
  completed: 2026-08-17
status: complete
---

# Phase 7 Plan 3: Dual-Variant Release Evidence Summary

**The single release gate now composes FAQ and Guide source/export checks for fresh io and cn artifacts, emits P1 KiB evidence, and has case-sensitive Ubuntu and container runners.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-08-17T07:00:00Z
- **Completed:** 2026-08-17T07:03:12Z
- **Tasks:** 2/2
- **Files modified:** 4

## Accomplishments

- Extended `verify:release` with Guide content and SEO source gates, per-variant Guide export checks, and measured successful P1 output.
- Preserved existing FAQ checks, CLI options, artifact cleanup/retention, cardinality, generated-public restoration, P1 budget, and advisory behavior.
- Added a read-only Ubuntu 24.04 workflow plus a Node 24 verification Dockerfile that run the same full release command with locked dependencies.

## Task Commits

1. **Task 1: Compose one fresh FAQ plus Guide release gate** — `fdb66cd` (test), `8fcf5df` (feat)
2. **Task 2: Add case-sensitive Ubuntu evidence and container-local fallback** — `cf0594a` (test), `a7b01d8` (feat)

## Files Created/Modified

- `scripts/verify-release.js` — coordinates Guide source and exported-artifact gates with FAQ verification and P1 evidence.
- `scripts/verify-release.test.js` — protects Guide lifecycle ordering, P1 measurement extraction, and build-only runner structure.
- `.github/workflows/guide-release-verification.yml` — Ubuntu 24.04 pull-request/manual release evidence with failure-only artifact retention.
- `Dockerfile.verify` — container-local Node 24 release verification fallback.

## Decisions Made

- The public release command retains its established options and runs io before cn; Guide source checks execute once for source-only and freshly before every selected build.
- The P1 success log includes the child verifier's measured KiB value while the existing 260 KiB failure remains aggregate-blocking.
- The verification runners stay within repository build and artifact evidence; delivery, live HTTP, cache, revision, and rollback work remain Phase 8.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Test precision] Accepted GitHub Actions expression syntax for failure-only artifact upload**
- **Found during:** Task 2
- **Issue:** The structural regression expected shorthand `if: failure()` while GitHub Actions needs the expression form with the retained-artifact existence guard.
- **Fix:** Matched the valid `${{ failure() && hashFiles(...) != '' }}` expression.
- **Files modified:** `scripts/verify-release.test.js`
- **Verification:** `node --test --test-name-pattern="Linux release evidence stays build-only" scripts/verify-release.test.js`
- **Committed in:** `a7b01d8`

---

**Total deviations:** 1 auto-fixed Rule 1 test-precision correction.
**Impact on plan:** The failure-only artifact policy remains valid and regression-covered.

## Issues Encountered

- The local filesystem is case-insensitive, so full exports remain intentionally blocked before build work.
- Docker is unavailable in this environment; the checked-in Ubuntu workflow and `Dockerfile.verify` provide the required full-evidence paths.

## Verification

- `npm run verify:release-regression` — passed: 8 tests, 1 case-sensitive-host skip.
- `npm run verify:release -- --source-only` — passed: all FAQ and Guide source checks.
- `node --test --test-name-pattern="Linux release evidence stays build-only" scripts/verify-release.test.js` — passed.
- `git diff --check` — passed.
- `git diff --exit-code e9efba2fd702bc2c596075aef2fc56c84f77c431 HEAD -- Dockerfile package-lock.json` — passed.

## Known Stubs

None.

## Next Phase Readiness

Phase 8 receives a reproducible case-sensitive release-evidence command. Full io/cn exports, exact nine-page Guide inventories, and both 260 KiB P1 measurements run through the Ubuntu workflow or verification Dockerfile.

## Self-Check: PASSED

Confirmed all four task commits are reachable and all four planned implementation files plus this summary exist.
