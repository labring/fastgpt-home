---
phase: 07-dual-variant-release-evidence
plan: "02"
subsystem: testing
tags: [node-test, static-export, seo, sitemap, guide, regression]
requires:
  - phase: 07-dual-variant-release-evidence
    plan: "01"
    provides: "Import-safe Guide export verifier and isolated io/cn fixtures"
provides:
  - "Complete isolated Guide HTML, JSON-LD, navigation, asset, link, route, sitemap, case-fold, and CLI mutation matrix"
  - "Fail-closed Guide schema projection, malformed output-path, and deterministic case-fold collision checks"
affects: [07-03-dual-variant-release, 08-production-delivery]
actuals:
  tokens: 8770
  tasks: 2
  commits: 4
tech-stack:
  added: []
  patterns:
    - "Node built-in temporary fixtures mutate rendered artifacts and cloned registry entries without changing approved Guide sources."
key-files:
  created: []
  modified:
    - scripts/verify-guide-export.js
    - scripts/verify-guide-export.test.js
decisions:
  - "Guide artifact verification checks ordered JSON-LD projections alongside rendered metadata and links."
  - "Guide route identity fails closed for malformed nested outputs and deterministic case-fold collisions."
metrics:
  duration: 8m
  completed: 2026-08-17
status: complete
---

# Phase 7 Plan 2: Guide Export Regression Matrix Summary

**Guide export evidence now isolates every localized rendered surface and exact owner inventory failure with scoped diagnostics.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-08-17T06:46:38Z
- **Completed:** 2026-08-17T06:54:41Z
- **Tasks:** 2/2
- **Files modified:** 2

## Accomplishments

- Added io/cn mutation coverage for hub and article metadata, alternates, JSON-LD projections, breadcrumbs, cards, returns, required assets, configured links, and malformed JSON-LD.
- Proved exact root ownership through missing, extra, duplicate flat/nested, adapter, wrong-owner, wrong-locale, sitemap, malformed URL, and case-fold fixtures.
- Validated guarded CLI argument handling, successful per-variant output counts, nonzero artifact failure, and silent imports.

## Task Commits

1. **Task 1: Mutate every rendered Guide contract surface** — `1308d80` (RED), `c66f6c6` (GREEN)
2. **Task 2: Prove exact inventory, path safety, and focused CLI behavior** — `51eb21e` (RED), `52da5da` (GREEN)

## Files Created/Modified

- `scripts/verify-guide-export.js` — validates ordered schema fields, duplicate tags/alternates, malformed nested Guide output paths, and case-fold route collisions.
- `scripts/verify-guide-export.test.js` — drives full isolated io/cn surface, inventory, sitemap, case, and CLI mutation coverage.

## Decisions Made

- Tests pass cloned registry entries directly into the production expectation builder, keeping conditional asset/link fixtures source-safe.
- Case-fold collision checks accept synthetic route spellings, which makes the regression deterministic on case-insensitive workspaces and Linux.

## Verification

- `npm run verify:guide-export-regression` — passed: 6 tests.
- `npm run verify:guide-content` — passed: 8 slugs, 16 documents.
- `npm run verify:guide-seo-graph` — passed: source graph plus 5 regression tests.
- SHA-256 checks confirmed `registry.json`, all authored Guide documents, and `package-lock.json` stayed byte-stable.

## TDD Gate Compliance

- RED: `1308d80` and `51eb21e` recorded the surface and inventory regressions before their verifier behavior existed.
- GREEN: `c66f6c6` and `52da5da` implemented the smallest fail-closed verifier changes and passed the complete regression matrix.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None.

## Self-Check: PASSED

- Confirmed both verifier files and this summary exist.
- Confirmed all four TDD commits exist in reachable history.
- Re-ran the full Guide export regression suite successfully.
