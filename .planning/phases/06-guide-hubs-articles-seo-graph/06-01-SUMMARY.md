---
phase: 06-guide-hubs-articles-seo-graph
plan: "01"
subsystem: seo-content
tags: [nextjs, guide, seo, json-ld, static-export, node-test]
requires:
  - phase: 05-guide-content-contract
    provides: Typed bilingual Guide registry and contained Markdown source reader
provides:
  - Closed root Guide article routes with registry-derived SEO and Article/BreadcrumbList schema
  - Validated publication groups, release dates, and required-asset dimensions
  - Dependency-free Guide SEO graph verification
affects: [06-02, 06-03, 06-04, 07-dual-variant-export]
actuals:
  tokens: 15446
  tasks: 3
  commits: 5
tech-stack:
  added: []
  patterns: [Owned Guide URL projection, registry-backed article metadata, source-only SEO graph verifier]
key-files:
  created:
    - src/lib/guideSeo.ts
    - src/components/guide/GuideArticleRoute.tsx
    - src/components/guide/GuideArticlePage.tsx
    - src/app/guide/[slug]/page.tsx
    - scripts/verify-guide-seo-graph.js
  modified:
    - src/content/guides/registry.json
    - src/content/guides/registry.ts
    - scripts/verify-guide-content.js
    - scripts/verify-guide-content.test.js
key-decisions:
  - "D-01 uses owned root /guide/<slug> canonicals with closed static parameters."
  - "D-03 and D-07 make groups and approved 2026-08-11 dates registry contracts."
  - "Article metadata, JSON-LD, and visible breadcrumbs consume one owned URL projection."
patterns-established:
  - "Guide routes delegate source loading and server rendering to GuideArticleRoute."
  - "Guide URL-bearing SEO values flow through guideSeo and siteRouting ownership helpers."
requirements-completed: [HUB-01, ARTICLE-01, ARTICLE-02, ARTICLE-03, SEO-04, SEO-05, SEO-06, SEO-07]
coverage:
  - id: D1
    description: "Eight closed root Guide article paths with canonical, alternates, Open Graph timing, and Article/BreadcrumbList schema"
    requirement: ARTICLE-01
    verification:
      - kind: integration
        ref: "node scripts/verify-guide-seo-graph.js --root-articles"
        status: pass
      - kind: integration
        ref: "npx --no-install tsc --noEmit"
        status: pass
    human_judgment: false
  - id: D2
    description: "Validated Guide publication groups, timing fields, and required-asset dimensions"
    requirement: HUB-01
    verification:
      - kind: unit
        ref: "scripts/verify-guide-content.test.js"
        status: pass
      - kind: integration
        ref: "npm run verify:guide-content"
        status: pass
    human_judgment: false
duration: 5m
completed: 2026-08-17
status: complete
---

# Phase 6 Plan 1: Guide Root Articles and SEO Graph Summary

**Eight static root Guide articles now render approved bilingual Markdown with registry-derived owned URLs, publication timing, and escaped crawler schema.**

## Performance

- **Duration:** 5m
- **Started:** 2026-08-17T05:22:17Z
- **Completed:** 2026-08-17T05:27:27Z
- **Tasks:** 3
- **Files modified:** 9

## Accomplishments

- Added the production Guide article shell, source-faithful body renderer, root route alias, owned canonical/alternate metadata, and Article/BreadcrumbList JSON-LD.
- Expanded root static generation from the tracer to all eight registry slugs with approved Open Graph and Article publication dates.
- Added 4/1/3 publication groups, all sixteen approved date pairs, responsive required-asset dimensions, mutation coverage, and a focused source graph verifier.

## Task Commits

1. **Task 1: Publish one root Guide article through every runtime layer** - `822ca24` (feat)
2. **Task 2: Add validated publication groups, dates, and future asset dimensions** - `d47ecb0` (test), `456eaf4` (feat)
3. **Task 3: Expand the root article tracer to all eight dated Guide routes** - `e648773` (feat), `85f1c2e` (fix)

## Files Created/Modified

- `src/lib/guideSeo.ts` - Central Guide paths, ownership projection, alternates, and metadata.
- `src/components/guide/GuideArticleRoute.tsx` - Server article shell and structured data.
- `src/components/guide/GuideArticlePage.tsx` - Accessible breadcrumb, H1, summary, body, and hub return presentation.
- `src/app/guide/[slug]/page.tsx` - Closed eight-slug default-locale route inventory.
- `src/content/guides/registry.json` and `src/content/guides/registry.ts` - Publication groups, approved dates, and asset dimensions.
- `scripts/verify-guide-content.js`, `scripts/verify-guide-content.test.js`, and `scripts/verify-guide-seo-graph.js` - Registry and SEO graph regression coverage.

## Decisions Made

- D-01 remains the approved owned root `/guide/<slug>` topology; localized adapters can share these canonicals.
- All registry date fields use the approved Week04 delivery date `2026-08-11`.
- Current asset and configured-link branches remain data-only until approved records supply a publishable surface.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Regression compatibility] Preserved the GUIDE-03 locale-pair failure prefix**
- **Found during:** Task 2
- **Issue:** The stronger entry-key validator changed an established mutation-test error prefix.
- **Fix:** Retained the `exact zh/en locale pair` prefix and appended the group contract detail.
- **Files modified:** `src/content/guides/registry.ts`, `scripts/verify-guide-content.js`
- **Verification:** `npm run verify:guide-content-regression`
- **Committed in:** `456eaf4`

**2. [Rule 1 - Type safety] Guarded required-asset dimensions before numeric comparison**
- **Found during:** Task 2
- **Issue:** TypeScript treated untrusted asset dimensions as `unknown`.
- **Fix:** Added numeric runtime guards before integer and positivity checks.
- **Files modified:** `src/content/guides/registry.ts`
- **Verification:** `npx --no-install tsc --noEmit`
- **Committed in:** `456eaf4`

**Total deviations:** 2 auto-fixed Rule 1 issues.
**Impact on plan:** Both changes preserve existing verification diagnostics and enforce the planned trust-boundary validation.

## Issues Encountered

`state.advance-plan` could not parse the pre-existing `Plan: Not started` state value. The completed-plan position was normalized to `Plan: 2 of 4` after the standard state metrics, roadmap, and requirements commands succeeded.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Plans 06-02 through 06-04 can consume `guideSeo`, the closed root article identity, and the validated registry fields for localized adapters, hubs, links, and sitemap coverage.

## Self-Check: PASSED

All nine implementation files exist and all five task commits resolve in Git history.
