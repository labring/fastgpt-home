---
phase: 06-guide-hubs-articles-seo-graph
plan: "02"
subsystem: seo-content
tags: [nextjs, guide, seo, json-ld, static-export, markdown]
requires:
  - phase: 06-guide-hubs-articles-seo-graph
    provides: Closed root Guide article routes, registry-derived content, and owned SEO helpers
provides:
  - Complete bilingual Guide article rendering with conditional approved asset and link surfaces
  - Closed localized article adapters with root canonical identity and noindex-follow metadata
  - Article-mode regression coverage for routes, optional surfaces, and schema-token policy
affects: [06-03, 06-04, 07-dual-variant-export]
actuals:
  tokens: 5113
  tasks: 2
  commits: 2
tech-stack:
  added: []
  patterns: [Registry-gated Guide optional surfaces, owned-root canonical localized adapters]
key-files:
  created:
    - src/app/[lang]/guide/[slug]/page.tsx
  modified:
    - src/components/guide/GuideArticlePage.tsx
    - src/components/guide/GuideArticleRoute.tsx
    - src/lib/guideSeo.ts
    - src/app/guide/[slug]/page.tsx
    - scripts/verify-guide-seo-graph.js
key-decisions:
  - "Guide article H1, visible breadcrumbs, and JSON-LD names share one localized copy record."
  - "Localized adapters retain their owned root canonicals and use noindex-follow metadata."
  - "Asset and internal-link UI remains gated by validated registry records."
patterns-established:
  - "Guide localized routes cross getGuideBuildLocales with guideSlugs and close dynamic params."
  - "Guide metadata uses an indexable option object for consistent root and adapter policy."
requirements-completed: [ARTICLE-01, ARTICLE-02, ARTICLE-03, SEO-04, SEO-05, SEO-06, SEO-07]
coverage:
  - id: D1
    description: Complete localized article body, navigation, optional surfaces, and Article/BreadcrumbList/HowTo schema.
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
    description: Closed root and localized article inventories with owned canonical and noindex-follow adapter metadata.
    requirement: SEO-04
    verification:
      - kind: integration
        ref: "node scripts/verify-guide-seo-graph.js --articles"
        status: pass
      - kind: integration
        ref: "npm run verify:guide-content"
        status: pass
    human_judgment: false
duration: 3m
completed: 2026-08-17
status: complete
---

# Phase 6 Plan 2: Localized Guide Articles Summary

**Bilingual Guide articles now render their full approved Markdown, token-gated schema, and closed localized adapters while preserving one owned root canonical per locale.**

## Performance

- **Duration:** 3m
- **Started:** 2026-08-17T05:32:55Z
- **Completed:** 2026-08-17T05:35:33Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Rendered the validated full body beneath its exact route-owned H1, with shared visible/JSON-LD Home → Guide → article breadcrumbs.
- Added registry-gated `next/image` and configured-link sections, plus Article, BreadcrumbList, and approved HowTo nodes.
- Added closed `/[lang]/guide/[slug]` static adapters that preserve root canonicals and use noindex-follow metadata.

## Task Commits

1. **Task 1: Expand the article route to every authored block and approved optional surface** - `e99a2ad` (feat)
2. **Task 2: Close the root and localized article inventories around owned canonicals** - `f5c5116` (feat)

## Files Created/Modified

- `src/components/guide/GuideArticlePage.tsx` - Renders full Markdown, breadcrumbs, return navigation, and guarded asset/link surfaces.
- `src/components/guide/GuideArticleRoute.tsx` - Emits Article, BreadcrumbList, and token-gated HowTo JSON-LD from registry content.
- `src/app/[lang]/guide/[slug]/page.tsx` - Generates only owned Guide locale/slug adapter pairs and rejects unknown params.
- `src/lib/guideSeo.ts` - Provides option-based root/indexability metadata with noindex-follow adapters.
- `scripts/verify-guide-seo-graph.js` - Verifies closed article inventory, schema-token policy, and launch-time empty optional branches.

## Decisions Made

- Keep approved optional visitor surfaces data-gated: current unapproved assets and empty link mappings create no visible nodes.
- Reuse the existing Markdown, article-style, and escaped JSON-LD primitives instead of adding rendering dependencies.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - SEO metadata] Corrected adapter robot behavior and metadata options**
- **Found during:** Task 2
- **Issue:** The existing metadata helper accepted a boolean and emitted `noindex,nofollow`, while the localized adapter contract requires `{ indexable: false }` and `noindex,follow`.
- **Fix:** Adopted the option object for Guide hub/article metadata and emitted `follow: true` for non-indexable adapters.
- **Files modified:** `src/lib/guideSeo.ts`, `src/app/guide/[slug]/page.tsx`
- **Verification:** `node scripts/verify-guide-seo-graph.js --articles` and `npx --no-install tsc --noEmit`
- **Committed in:** `f5c5116`

**Total deviations:** 1 auto-fixed Rule 1 issue.
**Impact on plan:** The fix aligns adapter metadata with the canonical graph and preserves root-page indexability.

## Issues Encountered

TypeScript refreshed the tracked incremental build info during verification; the generated artifact was restored before each commit.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Plan 06-03 can consume the option-based Guide hub metadata helper, and Plan 06-04 can extend the article source verifier into the final sitemap and release gate.

## Self-Check: PASSED
