---
phase: 07-dual-variant-release-evidence
plan: "01"
subsystem: testing
tags: [node-test, static-export, seo, sitemap, guide]
requires:
  - phase: 05-guide-content-contract
    provides: "Validated eight-slug bilingual Guide registry"
  - phase: 06-guide-hubs-articles-seo-graph
    provides: "Registry-derived Guide routes, SEO metadata, schemas, and sitemap wiring"
provides:
  - "Dependency-free Guide static export verifier for io and cn artifacts"
  - "Isolated nine-page io/cn artifact fixtures and focused CLI regression coverage"
  - "Stable direct and regression npm commands for Guide export evidence"
affects: [07-02-guide-export-negative-matrix, 07-03-dual-variant-release, 08-production-delivery]
actuals:
  tokens: 5942.25
  tasks: 2
  commits: 4
tech-stack:
  added: []
  patterns:
    - "Registry-driven static export verification uses Node built-ins and temporary output roots."
key-files:
  created:
    - scripts/verify-guide-export.js
    - scripts/verify-guide-export.test.js
  modified:
    - package.json
key-decisions:
  - "Project the owned Guide inventory as /guide plus the registry's eight lower-case slugs for each owner variant."
  - "Validate parsed HTML, JSON-LD, navigation, optional registry surfaces, and sitemap evidence with one scoped diagnostic prefix."
patterns-established:
  - "Focused export verifiers require explicit --out-dir and --variant arguments and keep fixture artifacts under temporary roots."
requirements-completed: [VERIFY-04, VERIFY-05]
coverage:
  - id: D1
    description: "The Guide export verifier validates exact nine-page io and cn inventories, localized HTML/SEO/schema/navigation surfaces, and exact sitemap URL sets."
    requirement: VERIFY-04
    verification:
      - kind: integration
        ref: "node --test scripts/verify-guide-export.test.js"
        status: pass
    human_judgment: false
  - id: D2
    description: "Focused CLI coverage proves explicit io/cn selection and the nine-page/nine-sitemap success report without using repository output."
    requirement: VERIFY-05
    verification:
      - kind: unit
        ref: "scripts/verify-guide-export.test.js#CLI reports the selected variant and exact Guide counts"
        status: pass
    human_judgment: false
  - id: D3
    description: "Existing Guide source and SEO graph contracts remain green alongside the new export verifier."
    requirement: VERIFY-04
    verification:
      - kind: integration
        ref: "npm run verify:guide-content && npm run verify:guide-seo-graph"
        status: pass
    human_judgment: false
duration: 5min
completed: 2026-08-17
status: complete
---

# Phase 7 Plan 1: Guide Export Evidence Summary

**Registry-driven Guide export verification now proves exact io/cn nine-page HTML and sitemap artifacts with localized SEO, schema, and navigation evidence.**

## Performance

- **Duration:** 5 min
- **Started:** 2026-08-17T06:38:40Z
- **Completed:** 2026-08-17T06:43:37Z
- **Tasks:** 2/2
- **Files modified:** 3

## Accomplishments

- Added a standalone Node-built-in verifier that projects the owned Guide hub and eight article routes from `registry.json`.
- Validated localized metadata, canonical/Open Graph URLs, exact alternate clusters, JSON-LD, cards, breadcrumbs, localized return links, configured registry surfaces, and sitemap ownership.
- Added isolated io/cn nine-page fixtures plus direct CLI coverage and stable npm commands.

## Task Commits

1. **Task 1: Trace registry identity through one complete io Guide export** — `17a64f6` (test), `3320a60` (feat)
2. **Task 2: Expand the verifier across every owned page and both variants** — `be82095` (feat)

## Files Created/Modified

- `scripts/verify-guide-export.js` — registry-driven static HTML and sitemap verifier with focused CLI entry point.
- `scripts/verify-guide-export.test.js` — isolated io/cn artifact fixtures, diagnostics, and CLI regression coverage.
- `package.json` — `verify:guide-export` and `verify:guide-export-regression` commands.

## Decisions Made

- The verifier owns only root `/guide` routes, leaving localized adapter routes outside the owned public inventory.
- Every artifact failure includes variant, hub-or-slug, resolved path, and surface for focused release debugging.

## TDD Gate Compliance

- RED: `17a64f6` recorded the missing export verifier through the io tracer fixture.
- GREEN: `3320a60` implemented the import-safe verifier and passed the tracer.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Diagnostic robustness] Preserved scoped diagnostics for malformed encoded output paths**
- **Found during:** Task 2
- **Issue:** A malformed encoded Guide filename could throw before the verifier attached its artifact context.
- **Fix:** Guarded route decoding so inventory validation reports the standard scoped failure.
- **Files modified:** `scripts/verify-guide-export.js`
- **Verification:** `node --test scripts/verify-guide-export.test.js`
- **Committed in:** `be82095`

---

**Total deviations:** 1 auto-fixed (1 Rule 2 diagnostic robustness correction).
**Impact on plan:** Artifact parsing retains the required release diagnostic dimensions.

## Issues Encountered

None.

## Verification

- `node --test scripts/verify-guide-export.test.js` — passed: 4 tests.
- `npm run verify:guide-content` — passed: 8 slugs and 16 documents.
- `npm run verify:guide-seo-graph` — passed: 5 source graph tests.
- `git diff --exit-code -- package-lock.json` — passed.

## Known Stubs

None.

## Next Phase Readiness

Plan 02 can add the negative artifact matrix over the stable registry-driven verifier and isolated fixture seam.

## Self-Check: PASSED

All task commits plus the verifier, regression suite, and package commands exist. Repository output, Guide source data, dependency objects, and `package-lock.json` remain unchanged.

---
*Phase: 07-dual-variant-release-evidence*
*Completed: 2026-08-17*
