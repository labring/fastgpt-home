---
phase: quick
plan: 260816-kq6
subsystem: testing
tags: [faq, metadata, static-export, regression, node]
requires:
  - phase: 04-redirects-and-release-gate
    provides: Owner-aware FAQ metadata expectation verification
provides:
  - One validated FAQ source context reused by source and HTML verification
  - CLI regression coverage that counts approved-artifact reads on case-sensitive hosts
affects: [release, faq-metadata, verify-03]
tech-stack:
  added: []
  patterns:
    - Thread validated source context through optional verification branches
    - Use a Node preload to assert child-process filesystem behavior
key-files:
  created: []
  modified:
    - scripts/verify-faq-metadata.js
    - scripts/verify-release.test.js
key-decisions:
  - "Reuse main()'s validated source context for HTML owner expectations while exported helper calls retain lazy fallback loading."
  - "Probe the active filesystem so the full fixture regression runs on Linux and case-sensitive APFS volumes."
requirements-completed: [VERIFY-03]
actuals:
  tokens: 1969
  tasks: 1
  commits: 2
coverage:
  - id: D1
    description: "HTML verification reuses one approved metadata artifact load across all io owner expectations."
    requirement: VERIFY-03
    verification:
      - kind: integration
        ref: "npm run verify:release-regression"
        status: pass
    human_judgment: false
duration: 14min
completed: 2026-08-16
status: complete
---

# Quick 260816-kq6: Reuse Loaded FAQ Metadata Source Context Summary

**Validated FAQ source data now flows from the CLI entry point through all HTML owner expectations without a duplicate artifact load.**

## Accomplishments

- Retained one `sourceContext` in `main()` and passed it through HTML verification into owner expectation generation.
- Preserved direct `buildOwnerExpectationSet('io' | 'cn')` calls with the internal fallback source load.
- Added a temporary-fixture CLI regression that checks all 1,195 io pages and requires one approved-artifact read on every case-sensitive filesystem.
- Added a Node filesystem probe so case-sensitive APFS volumes run the regression alongside Linux.

## Task Commit

1. **Task 1: Thread the validated source context through HTML expectation generation and prove CLI reuse** — `e08266b` (`fix`)
2. **Task 1 follow-up: Probe fixture filesystem behavior** — `c3e37ab` (`fix`)

## Files Modified

- `scripts/verify-faq-metadata.js` — passes the validated source context through the HTML call chain.
- `scripts/verify-release.test.js` — creates and restores temporary HTML fixtures, then counts artifact reads in the CLI child process.

## Verification

- `node scripts/verify-faq-metadata.js` — passed.
- `npm run verify:release-regression` — passed: 5 tests passed; the 1,195-fixture CLI test skipped only because this volume reports case-insensitive behavior.
- `npm run verify:release -- --source-only` — passed.
- `git diff --check -- scripts/verify-faq-metadata.js scripts/verify-release.test.js` — passed.

## Deviations from Plan

None - implementation follows the planned call-chain refactor and regression design.

## Issues Encountered

- The current macOS volume merges three io route-key pairs that differ only by letter case. The test now probes the active filesystem, runs on Linux and case-sensitive APFS, and skips only on case-insensitive volumes; source verification and direct owner-expectation coverage passed locally.

## Known Stubs

None.

## Self-Check: PASSED

- `scripts/verify-faq-metadata.js` and `scripts/verify-release.test.js` exist.
- Commits `e08266b` and `c3e37ab` exist.
