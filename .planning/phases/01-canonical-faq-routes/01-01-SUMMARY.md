---
phase: 01-canonical-faq-routes
plan: 01
subsystem: routing
tags: [nextjs, faq, static-export, canonical-slugs]

requires: []
provides:
  - Committed English FAQ evidence and canonical route registry for all 1,400 authored records
  - Registry-backed English FAQ lookup, path generation, and static route parameters
  - Runnable route and registry invariant verification command
affects: [approved-metadata, coherent-seo-graph, redirects-release-gate]

actuals:
  tokens: 280180
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - Standard-library XLSX/XML snapshot generation with deterministic JSON output
    - Canonical-slug lookup by committed content identity

key-files:
  created:
    - scripts/generate-faq-route-registry.js
    - scripts/verify-faq-routes.js
    - src/faq/english-route-evidence.json
    - src/faq/generated-en-route-registry.json
  modified:
    - src/faq/index.ts
    - src/lib/localizedRoutes.ts
    - src/app/[lang]/faq/[id]/page.tsx
    - package.json

key-decisions:
  - Existing English object keys remain durable content IDs; canonical routes resolve through the committed registry.
  - Healthy mixed-case source slugs remain exact canonical paths when evidence-bound and unique; repaired allocations remain lowercase.
  - Historical collision candidates outside the current catalog remain opaque legacy-row IDs in explicit no-redirect ledger entries.
  - Root FAQ alias keeps its existing delegation and automatically consumes canonical IDs through getFaqIds(defaultLocale).

patterns-established:
  - Generator --write accepts reviewed workbook evidence; --check validates the committed snapshot without external files.
  - Route resolvers decode once and accept only validated canonical English slugs.

requirements-completed: [URL-01, URL-02, URL-03]

coverage:
  - id: D1
    description: Deterministic evidence snapshot and unique canonical registry cover every current English FAQ identity.
    requirement: URL-01
    verification:
      - kind: unit
        ref: node scripts/generate-faq-route-registry.js --check
        status: pass
      - kind: unit
        ref: npm run verify:faq-routes
        status: pass
    human_judgment: false
  - id: D2
    description: English FAQ lookup, canonical path generation, and localized/root static params share the registry.
    requirement: URL-02
    verification:
      - kind: integration
        ref: node scripts/verify-faq-routes.js --route-wiring
        status: pass
    human_judgment: false
  - id: D3
    description: Missing, unsafe, and collided source routes receive deterministic question-derived canonical slugs with malformed-route rejection.
    requirement: URL-03
    verification:
      - kind: unit
        ref: npm run verify:faq-routes
        status: pass
    human_judgment: false

duration: 20min
completed: 2026-08-16
status: complete
---

# Phase 1: Canonical FAQ Routes Summary

**All 1,400 authored English FAQ records now resolve through one committed deterministic canonical-slug registry.**

## Performance

- **Duration:** 20 min
- **Started:** 2026-08-16T00:55:00+08:00
- **Completed:** 2026-08-16T01:15:00+08:00
- **Tasks:** 3
- **Files modified:** 8 plus two generated JSON artifacts

## Accomplishments

- Captured 1,195 Week04 online URL rows plus 205 repository-current-key rows in a normalized evidence snapshot.
- Generated 1,400 sorted canonical records (786 preserved mixed-case routes, 614 deterministic repairs) and 149 explicit no-redirect collision ledger entries.
- Wired canonical English slugs into FAQ data lookup, path generation, localized static params, root alias coverage, and malformed-ID handling.
- Added route/registry checks under `npm run verify:faq-routes`.

## Task Commits

1. **Task 1: Generate the committed English route registry** - `737855a`
2. **Task 2: Wire canonical slugs into FAQ lookup and static routes** - `67c47a2`
3. **Task 3: Add the focused route and registry regression command** - `5682186`

## Files Created/Modified

- `scripts/generate-faq-route-registry.js` - Dependency-free workbook/evidence normalizer and deterministic registry generator.
- `src/faq/english-route-evidence.json` - Committed preserve/repair evidence snapshot.
- `src/faq/generated-en-route-registry.json` - Build-time canonical content ID and slug mapping.
- `src/faq/index.ts` - Canonical English lookup and canonical-keyed catalog.
- `src/lib/localizedRoutes.ts` - English canonical slug path adapter.
- `src/app/[lang]/faq/[id]/page.tsx` - Canonical resolver and malformed decode handling.
- `scripts/verify-faq-routes.js` - Assert-based registry and route-wiring verifier.
- `package.json` - `verify:faq-routes` command.

## Decisions Made

- Preserved existing English object keys as durable content identities and retained safe mixed-case online slugs exactly.
- Kept ambiguous legacy sources as no-redirect ledger entries, including opaque IDs for historical rows absent from the current catalog.
- Left metadata, sitemap, hreflang, and deployment redirect projection to their owning phases.

## Deviations from Plan

### Auto-fixed Issues

**1. Workbook collision rows referenced historical item numbers beyond the current 1,400-record catalog.**
- **Found during:** Task 1
- **Issue:** Failing on those valid audit rows would prevent reviewed workbook regeneration.
- **Fix:** Serialized out-of-catalog candidates as validated `legacy-row-N` identities while retaining current content IDs where available.
- **Files modified:** `scripts/generate-faq-route-registry.js`, `src/faq/generated-en-route-registry.json`
- **Verification:** Workbook `--write` and committed `--check` both pass.
- **Committed in:** `737855a`

**2. Collision source slugs were not guaranteed to equal a candidate content ID.**
- **Found during:** Task 1
- **Issue:** The audit ledger identifies ambiguous legacy paths independently from current durable IDs.
- **Fix:** Marked records whose evidence source slug appears in the collision ledger as collided and repaired, without guessing a redirect destination.
- **Files modified:** `scripts/generate-faq-route-registry.js`, `src/faq/generated-en-route-registry.json`
- **Verification:** Route registry and verifier pass with all 149 ledger entries.
- **Committed in:** `737855a`

**Total deviations:** 2 auto-fixed; both preserve fail-closed collision behavior.

## Issues Encountered

- The workbook's collision sheet includes 1,990-era row numbers while this milestone contains 1,400 current records; the registry now records those candidates explicitly as legacy row identities.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 2 can join approved metadata rows by `contentId` and consume `generated-en-route-registry.json`. Phase 3 can consume the same canonical slug map for canonical URLs, alternates, links, and sitemap entries. Phase 4 can project only unique legacy sources from `legacySources` and the no-redirect collision ledger.

---
*Phase: 01-canonical-faq-routes*
*Completed: 2026-08-16*
