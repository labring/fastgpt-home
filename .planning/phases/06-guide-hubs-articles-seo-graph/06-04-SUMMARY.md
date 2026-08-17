---
phase: 06-guide-hubs-articles-seo-graph
plan: "04"
subsystem: seo-content
tags: [nextjs, sitemap, seo, static-export, node-test, regression]
requires:
  - phase: 06-guide-hubs-articles-seo-graph
    provides: Owned Guide route, registry, metadata, schema, and hub projections
provides:
  - Current-variant Guide sitemap entries for one hub and eight owned articles
  - Dependency-free source graph verifier with isolated mutation coverage
  - Stable Phase 6 Guide SEO graph regression command
affects: [07-dual-variant-export, 08-production-delivery]
actuals:
  tokens: 7373.25
  tasks: 2
  commits: 3
tech-stack:
  added: []
  patterns: [Registry-derived sitemap projection, in-memory source graph mutation validation]
key-files:
  created:
    - scripts/verify-guide-seo-graph.test.js
  modified:
    - src/app/sitemap.ts
    - scripts/verify-guide-seo-graph.js
    - package.json
key-decisions:
  - "The sitemap selects only the current owned Guide locale and reuses its existing seenUrls guard."
  - "The graph gate models URL-bearing registry surfaces in memory and inspects source wiring without requiring an export artifact."
patterns-established:
  - "Guide sitemap rows derive hub and article URLs through getGuideCanonicalUrl and article dates through localized registry snapshots."
  - "Guide graph mutations use deep-cloned registries and source maps, preserving repository sources during regression coverage."
requirements-completed: [HUB-01, ARTICLE-01, ARTICLE-02, ARTICLE-03, SEO-04, SEO-05, SEO-06, SEO-07]
coverage:
  - id: D1
    description: Current cn and io Guide sitemap projections contain one owned hub and eight unique dated article canonicals.
    requirement: SEO-07
    verification:
      - kind: integration
        ref: "npm run verify:guide-seo-graph"
        status: pass
    human_judgment: false
  - id: D2
    description: Source-level Guide registry, routes, metadata, alternates, schemas, cards, optional surfaces, and sitemap wiring reject contextual drift.
    requirement: SEO-04
    verification:
      - kind: unit
        ref: "scripts/verify-guide-seo-graph.test.js"
        status: pass
    human_judgment: false
  - id: D3
    description: The Phase 5 source contract and strict Guide TypeScript surface remain compatible with the Phase 6 graph gate.
    requirement: ARTICLE-01
    verification:
      - kind: integration
        ref: "npm run verify:guide-content && npm run verify:guide-content-regression && npx --no-install tsc --noEmit"
        status: pass
    human_judgment: false
duration: 5m
completed: 2026-08-17
status: complete
---

# Phase 6 Plan 4: Guide Sitemap and SEO Graph Summary

**Guide sitemap discovery now exposes exactly one current-variant hub and eight dated article canonicals, guarded by a dependency-free source graph regression suite.**

## Performance

- **Duration:** 5m
- **Started:** 2026-08-17T05:43:50Z
- **Completed:** 2026-08-17T05:48:38Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Added registry-derived Guide hub and article rows to the existing deduplicated sitemap for the current cn or io site variant.
- Rebuilt the Phase 6 source gate around isolated registry and source-map projections for groups, routes, metadata, alternates, schemas, optional visitor surfaces, and sitemap coverage.
- Added `verify:guide-seo-graph` to run the full verifier and Node mutation suite from committed sources.

## Task Commits

1. **Task 1: Prove the complete registry-to-sitemap Guide graph** - `fe68eb2` (test), `0cf9e6a` (feat)
2. **Task 2: Publish one stable Phase 6 regression command and run the source gate** - `c7a5b4e` (chore)

## Files Created/Modified

- `src/app/sitemap.ts` - Adds current-variant Guide canonical rows through the existing `seenUrls` assembly.
- `scripts/verify-guide-seo-graph.js` - Validates the complete registry-to-route-to-schema-to-sitemap source graph.
- `scripts/verify-guide-seo-graph.test.js` - Exercises isolated registry and source wiring mutations without changing repository files.
- `package.json` - Provides the stable source-only graph regression command.

## Decisions Made

- Keep sitemap discovery limited to the current owned Guide locale and all eight registry entries; localized adapter paths remain outside crawler discovery.
- Keep Phase 6 verification source-based so Phase 7 can own case-sensitive dual-export and HTML evidence.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Regression diagnostics] Made group and source mutations identify their actual drift surface**
- **Found during:** Task 1
- **Issue:** A group-count check could name a neighboring slug, and a source fixture replaced only one registry token.
- **Fix:** Added the locked slug-to-group contract and replaced every fixture token occurrence.
- **Files modified:** `scripts/verify-guide-seo-graph.js`, `scripts/verify-guide-seo-graph.test.js`
- **Verification:** `node --test scripts/verify-guide-seo-graph.test.js`
- **Committed in:** `0cf9e6a`

**Total deviations:** 1 auto-fixed Rule 1 issue.
**Impact on plan:** The regression suite now delivers the required slug/surface-specific failure contract.

## Issues Encountered

Strict TypeScript verification refreshes the tracked incremental build file; it was restored after each verification run.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 7 can use `npm run verify:guide-seo-graph` as its source prerequisite before producing case-sensitive cn and io export evidence.

## Self-Check: PASSED

All four implementation files exist, all three task commits resolve in Git history, and the full source gate plus lockfile guard passed.
