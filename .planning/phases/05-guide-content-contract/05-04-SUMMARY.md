---
phase: 05-guide-content-contract
plan: "04"
subsystem: testing
tags: [node-test, guide-content, content-contract, regression]
requires:
  - phase: 05-01
    provides: "Typed Guide registry, source reader, and standalone verifier"
  - phase: 05-03
    provides: "Complete eight-pair repository-owned bilingual Guide corpus"
provides:
  - "Isolated node:test mutation coverage for every GUIDE-03 / D-08 failure class"
  - "Stable source-contract and regression npm verification commands"
affects: [phase-06-guide-publishing, phase-07-guide-release-verification]
actuals:
  tokens: 2360
  tasks: 2
  commits: 3
tech-stack:
  added: []
  patterns:
    - "Deep-cloned registry mutations and temporary source roots prove verifier failures without changing approved sources."
key-files:
  created:
    - scripts/verify-guide-content.test.js
  modified:
    - scripts/verify-guide-content.js
    - package.json
key-decisions:
  - "Use optional verifier context only for isolated fixture roots and cloned registries; the production CLI remains repository-root based."
  - "Treat a future required asset as a valid configuration state only when its contained public path exists and its authored alt text is non-empty."
  - "Report full-corpus document counts alongside slug counts so the 8×2 boundary is observable."
patterns-established:
  - "Content-contract regressions assert the affected slug, and configured-link cases assert the source label."
requirements-completed: [GUIDE-03]
coverage:
  - id: D1
    description: "Eight-case Guide contract mutation matrix covering registry, metadata, schema, asset, link, delivery-comment, and body-fidelity failures."
    requirement: GUIDE-03
    verification:
      - kind: unit
        ref: "scripts/verify-guide-content.test.js"
        status: pass
    human_judgment: false
  - id: D2
    description: "Stable npm source-contract and regression commands for the complete eight-slug, sixteen-document corpus."
    requirement: GUIDE-03
    verification:
      - kind: integration
        ref: "npm run verify:guide-content && npm run verify:guide-content-regression && npx --no-install tsc --noEmit"
        status: pass
    human_judgment: false
duration: 8min
completed: 2026-08-17
status: complete
---

# Phase 5 Plan 4: Guide Content Regression Contract Summary

**Dependency-free Guide mutation tests now prove all locked source-contract failures and expose stable 8×2 verification commands.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-08-17T04:17:07Z
- **Completed:** 2026-08-17T04:25:00Z
- **Tasks:** 2/2
- **Files modified:** 3

## Accomplishments

- Added a focused `node:test` matrix for duplicate slugs, incomplete pairs, localized metadata, schemas, required assets, configured links, delivery comments, and body suffixes.
- Kept mutation sources in temporary roots with `finally` cleanup and asserted committed source bytes stay unchanged.
- Published `verify:guide-content` and `verify:guide-content-regression` without dependency or lockfile changes.

## Task Commits

1. **Task 1: Prove every slug-specific negative contract with isolated mutations** — `ebdf2d5` (test), `1f4b3cf` (feat)
2. **Task 2: Publish stable phase verification commands and run the contract gate** — `f601b8d` (chore)

## Files Created/Modified

- `scripts/verify-guide-content.test.js` — isolated Node mutation matrix and import-silence test.
- `scripts/verify-guide-content.js` — injectable fixture context, strict diagnostics, required-asset validation, and complete document counts.
- `package.json` — stable Guide source and regression commands.

## Decisions Made

- Optional verifier context is limited to regression fixtures; production command semantics stay unchanged.
- Required assets and configured links remain inactive in the approved manifest until approved publication data exists.

## TDD Gate Compliance

- RED: `ebdf2d5` recorded the expected mutation-matrix failures.
- GREEN: `1f4b3cf` made every case pass with the minimal verifier changes.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Test fidelity] Matched the second-comment fixture across CRLF and LF delivery sources**
- **Found during:** Task 1
- **Issue:** The initial fixture replacement matched only LF, while approved source bytes include CRLF.
- **Fix:** Used a CRLF-aware boundary expression so the fixture always creates the intended second leading comment.
- **Files modified:** `scripts/verify-guide-content.test.js`
- **Verification:** All eight regression tests pass.
- **Committed in:** `1f4b3cf`

---

**Total deviations:** 1 auto-fixed (1 Rule 1 test-fidelity correction)
**Impact on plan:** The regression exercises the intended malformed-comment boundary for the approved delivery format.

## Issues Encountered

None.

## Verification

- `npm run verify:guide-content` — passed: `Guide content verified: 8 slugs, 16 documents`.
- `npm run verify:guide-content-regression` — passed: 8 tests.
- `npx --no-install tsc --noEmit` — passed.
- `git diff --exit-code -- package-lock.json` — passed.

## Known Stubs

None.

## Next Phase Readiness

Phase 6 can consume the locked source contract. Route, UI, canonical metadata, JSON-LD, sitemap, asset rendering, and export work remain assigned to later phases.

## Self-Check: PASSED

All three task commits and the verifier, regression suite, package commands, and summary file exist.

---
*Phase: 05-guide-content-contract*
*Completed: 2026-08-17*
