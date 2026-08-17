---
phase: 06-guide-hubs-articles-seo-graph
plan: "03"
subsystem: seo-content
tags: [nextjs, guide, seo, json-ld, accessibility, static-export]
requires:
  - phase: 06-guide-hubs-articles-seo-graph
    provides: Registry-derived Guide URLs, metadata helpers, and closed article routes
provides:
  - Indexable owned-root Guide hub with eight registry-backed cards in fixed 4/1/3 groups
  - Closed localized Guide hub adapters with shared canonical and noindex-follow metadata
  - CollectionPage, ItemList, and BreadcrumbList data aligned with the visible catalog
affects: [06-04, 07-dual-variant-export]
actuals:
  tokens: 2433.25
  tasks: 2
  commits: 2
tech-stack:
  added: []
  patterns: [Server-rendered registry hub, owned URL projection for visible cards and JSON-LD]
key-files:
  created:
    - src/components/guide/GuideHubPage.tsx
    - src/components/guide/GuideHubPage.module.css
    - src/components/guide/GuideHubRoute.tsx
    - src/app/guide/page.tsx
    - src/app/[lang]/guide/page.tsx
  modified: []
key-decisions:
  - "The visible card groups and ItemList share registry order so the crawler graph matches the catalog."
  - "Localized hub adapters preserve owned root canonicals while remaining noindex-follow."
patterns-established:
  - "Guide hub routes delegate localized server rendering and schema construction to GuideHubRoute."
  - "Hub cards use getOwnedLocalePath with Guide path helpers for every published destination."
requirements-completed: [HUB-01, SEO-04, SEO-05, SEO-06, SEO-07]
coverage:
  - id: D1
    description: "Registry-backed Guide hub exposes the approved decision, implementation, and industry card groups with matching JSON-LD."
    requirement: HUB-01
    verification:
      - kind: integration
        ref: "node scripts/verify-guide-seo-graph.js --hubs"
        status: pass
      - kind: integration
        ref: "npx --no-install tsc --noEmit"
        status: pass
    human_judgment: false
  - id: D2
    description: "Root and localized hub adapters share owned canonical identity, alternate projection, and closed static locale parameters."
    requirement: SEO-04
    verification:
      - kind: integration
        ref: "node scripts/verify-guide-seo-graph.js --hubs"
        status: pass
      - kind: integration
        ref: "git diff --exit-code -- package-lock.json"
        status: pass
    human_judgment: false
duration: 2m
completed: 2026-08-17
status: complete
---

# Phase 6 Plan 3: Guide Hubs and SEO Graph Summary

**Owned FastGPT Guide hubs now publish all eight localized articles as accessible 4/1/3 registry cards with matching canonical metadata and crawler graph.**

## Performance

- **Duration:** 2m
- **Started:** 2026-08-17T13:40:25+08:00
- **Completed:** 2026-08-17T13:42:25+08:00
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Added an indexable default-locale `/guide` hub with three semantic groups, server-rendered card links, responsive layout, and keyboard focus visibility.
- Added CollectionPage, ItemList, and Home → Guide BreadcrumbList data sourced from the same registry and owned URL helpers as the visible catalog.
- Added closed localized Guide hub parameters with root canonical identity, exact helper-generated alternates, matching Open Graph URL, and noindex-follow metadata.

## Task Commits

1. **Task 1: Render the indexable root hub as three exact registry groups** - `cda642d` (feat)
2. **Task 2: Add the closed localized hub adapter and responsive accessibility gate** - `01bdd8e` (feat)

## Files Created/Modified

- `src/components/guide/GuideHubPage.tsx` - Renders the typed group sequence, visible breadcrumb, and localized full-card links.
- `src/components/guide/GuideHubPage.module.css` - Supplies responsive light-theme layout and visible focus treatment.
- `src/components/guide/GuideHubRoute.tsx` - Composes the localized server shell and registry-derived schema graph.
- `src/app/guide/page.tsx` - Provides the default-locale indexable root adapter.
- `src/app/[lang]/guide/page.tsx` - Generates only owned Guide locale adapters and applies noindex-follow metadata.

## Decisions Made

- Keep card, breadcrumb, canonical, and schema URLs on the central owned Guide projection.
- Preserve the validated registry order inside each fixed publication group, which yields the required 4/1/3 catalog and ItemList order.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

TypeScript refreshed `tsconfig.tsbuildinfo` during verification; the generated artifact was restored before each task commit.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Plan 06-04 can consume the owned Guide hub identity and registry-backed card projection for final sitemap and regression coverage.

## Self-Check: PASSED

All five implementation files and both task commits resolve in the worktree; the hub verifier, strict TypeScript check, and lockfile guard pass.
