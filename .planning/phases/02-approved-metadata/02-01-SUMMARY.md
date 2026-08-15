---
phase: 02-approved-metadata
plan: 01
subsystem: seo
tags: [faq, metadata, static-export, node]

# Dependency graph
requires:
  - phase: 01-canonical-faq-routes
    provides: "Durable English contentId/sourceSlug evidence and canonical route registry"
provides:
  - "Deterministic 1,195-row approved metadata snapshot keyed by contentId"
  - "Build-time English FAQ metadata overlay with legacy fallback for 205 records"
  - "Source verifier with mutation diagnostics and optional exported-HTML fidelity checks"
affects: [03-coherent-seo-graph, 04-redirects-and-release-gate]

# Actuals (#2632)
actuals:
  tokens: 240545
  tasks: 2
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Dependency-free Node XLSX/XML parsing with deterministic atomic JSON snapshots"
    - "ContentId-keyed metadata overlays preserve authored FAQ fields and route identity"

key-files:
  created:
    - scripts/generate-faq-metadata.js
    - src/faq/generated-en-metadata.json
    - scripts/verify-faq-metadata.js
  modified:
    - src/faq/index.ts
    - package.json

key-decisions:
  - "The workbook FAQ Data online URL is decoded once and joined through Phase 1 evidence to a durable contentId."
  - "Artifact records retain raw approved title, description, and keyword strings while runtime title/description expectations mirror the shared normalizer policy."
  - "HTML keyword verification compares Next's comma-joined keyword-array serialization; source verification retains the exact approved comma-space string."
  - "Healthy mixed-case route preservation remains authoritative; macOS case-insensitive export collisions are surfaced as an environment diagnostic for case-sensitive hosts."

patterns-established:
  - "Generator --write requires the reviewed workbook; --check reads only committed JSON and repository source."
  - "Verifier mutation checks prove duplicate, authored-digest, and missing-field failures include record diagnostics."

requirements-completed: [META-01, META-02, META-03]

coverage:
  - id: D1
    description: "Exactly 1,195 workbook rows map one-to-one to Phase 1 content identities in a deterministic snapshot."
    requirement: META-01
    verification:
      - kind: integration
        ref: "node scripts/generate-faq-metadata.js --write --workbook <Week04 workbook>"
        status: pass
      - kind: integration
        ref: "node scripts/generate-faq-metadata.js --check"
        status: pass
      - kind: integration
        ref: "npm run verify:faq-metadata"
        status: pass
    human_judgment: false
  - id: D2
    description: "Mapped FAQ records receive approved metadata through the existing static route catalog."
    requirement: META-02
    verification:
      - kind: integration
        ref: "npm run verify:faq-metadata"
        status: pass
      - kind: e2e
        ref: "npm run verify:faq-metadata -- --html"
        status: fail
    human_judgment: true
    rationale: "HTML evidence requires a case-sensitive export host; macOS overwrites three preserved mixed-case route pairs."
  - id: D3
    description: "Authored Question, Answers, and Category values remain source-owned and digest-stable for all mapped records."
    requirement: META-03
    verification:
      - kind: integration
        ref: "npm run verify:faq-metadata (authored digest and mutation diagnostics)"
        status: pass
      - kind: integration
        ref: "npm run verify:faq-routes"
        status: pass
    human_judgment: false

# Metrics
duration: 18m
completed: 2026-08-16
status: complete
---

# Phase 2: Approved Metadata Summary

**The approved Week04 metadata now flows from a deterministic 1,195-row workbook snapshot into the English FAQ catalog with authored-content protection and record-level verification.**

## Performance

- **Duration:** 18 min
- **Started:** 2026-08-16T01:58:00+08:00
- **Completed:** 2026-08-16T02:16:19+08:00
- **Tasks:** 2
- **Files modified:** 5 production files plus this summary

## Accomplishments

- Added a dependency-free workbook parser and deterministic `--write`/`--check` generator for exactly 1,195 approved rows.
- Added the contentId-keyed overlay, preserving legacy fallback metadata for 205 out-of-batch FAQ records and leaving authored Question, Answers, Category, and Phase 1 routes intact.
- Added source and optional static-HTML verification with raw metadata fidelity, title/description policy checks, authored SHA-256 digests, full catalog coverage, mutation diagnostics, H1/FAQ JSON-LD identity checks, and a runnable npm command.

## Task Commits

Each task was committed atomically:

1. **Task 1: Generate and consume the approved metadata snapshot** - `9814db4` (feat(02))
2. **Task 2: Verify approved metadata and static export fidelity** - `0367391` (test(02))

Follow-up correctness fix:

3. **HTML export collision diagnostics and keyword serialization** - `e30a2a0` (fix(02))

**Plan metadata:** `5e0cb62` (docs(02): create approved metadata plan)

## Files Created/Modified

- `scripts/generate-faq-metadata.js` - Dependency-free XLSX/XML reader, contentId join, policy-equivalent metadata normalization, authored digest snapshot, atomic writer, and offline check mode.
- `src/faq/generated-en-metadata.json` - 1,195 sorted approved records with raw source fields and provenance.
- `src/faq/index.ts` - Approved Title/Description/Keywords overlay before the existing category overlay.
- `scripts/verify-faq-metadata.js` - Source verifier, mutation diagnostics, and optional HTML metadata/H1/FAQ JSON-LD checks.
- `package.json` - `verify:faq-metadata` command.

## Decisions Made

- Kept raw approved keyword punctuation and ordering in the artifact; normalized only the framework's serialized HTML representation for export comparison.
- Preserved all Phase 1 mixed-case routes. The verifier reports case-insensitive local filesystem collisions so release verification runs on a case-sensitive host.
- Used webpack only as a build diagnostic because the repository's existing Turbopack font resolver is unavailable in this environment; no dependency or build configuration was added.

## Deviations from Plan

### Auto-fixed Issues

**1. [Correctness] Deterministic contentId ordering**
- **Found during:** Task 1 generator acceptance checks
- **Issue:** Locale-aware sorting differed from bytewise validation for mixed-case content IDs.
- **Fix:** Added one bytewise comparator shared by artifact generation ordering and validation.
- **Files modified:** `scripts/generate-faq-metadata.js`
- **Verification:** Workbook `--write`, `--check`, source verifier, and TypeScript check pass.
- **Committed in:** `9814db4`

**2. [Runtime fidelity] Keyword metadata serialization**
- **Found during:** Task 2 HTML verification
- **Issue:** Next serializes the route keyword array with comma separators while the source artifact intentionally retains comma-space wording.
- **Fix:** Compared HTML against the framework's comma-joined array while keeping source-mode exact raw-string checks.
- **Files modified:** `scripts/verify-faq-metadata.js`
- **Verification:** Source verifier passes; HTML mode reaches the environment collision guard.
- **Committed in:** `e30a2a0`

**3. [Diagnostics] Case-insensitive static export collision**
- **Found during:** Task 2 HTML verification on macOS
- **Issue:** Three pairs of healthy mixed-case slugs map to one local filename on the case-insensitive filesystem.
- **Fix:** Added a clear case-sensitive-host diagnostic without changing canonical route allocation.
- **Files modified:** `scripts/verify-faq-metadata.js`
- **Verification:** `npm run verify:faq-metadata -- --html` reports the collision before comparing the overwritten page.
- **Committed in:** `e30a2a0`

**Total deviations:** 3 auto-fixed (correctness, runtime fidelity, diagnostics)
**Impact on plan:** Metadata source delivery is complete; static HTML proof remains host-dependent and requires a case-sensitive build environment.

## Issues Encountered

- `npm run build` with the repository's default Turbopack path fails before application compilation because `@vercel/turbopack-next/internal/font/google/font` is absent and the requested Google font assets return 404. `npx next build --webpack` succeeds and generates 1,445 static pages; post-build cleanup succeeds with the io variant.
- `npm run verify:faq-metadata -- --html` stops on the documented macOS case-insensitive mixed-case route collision. The Phase 1 route policy remains intact for case-sensitive static hosts.
- `npm run verify:p2` reaches the pre-existing hard-coded `Why-are-enterprises-paying-more` sample path, while Phase 1 now assigns that content a repaired canonical slug. The focused Phase 2 source and route verifiers pass.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 3 can consume `generated-en-metadata.json`, the contentId overlay, and the Phase 1 route registry. Run the full HTML verifier and release checks on a case-sensitive build host, then update the stale Phase 1 sample route in the existing P2 verifier as part of the SEO graph/release verification work.

---
*Phase: 02-approved-metadata*
*Completed: 2026-08-16*
