---
phase: 03-coherent-seo-graph
plan: 01
subsystem: seo
tags: [faq, canonical, hreflang, sitemap, static-export, node]

requires:
  - phase: 02-approved-metadata
    provides: "ContentId-keyed approved metadata overlay, authored-field protection, and case-sensitive export procedure"
provides:
  - "One durable contentId-to-locale FAQ route-key adapter for English canonical slugs and published Chinese keys"
  - "Registry-backed FAQ detail identity, canonical URL, published alternates, list links, static params, and owner-site sitemap wiring"
  - "Dependency-free source and optional static-export SEO graph verifier"
affects: [04-redirects-and-release-gate]

actuals:
  tokens: 134000
  tasks: 3
  commits: 4

tech-stack:
  added: []
  patterns:
    - "Resolve FAQ contentId before selecting locale content or constructing cross-domain route keys"
    - "Verify source identity and exact owner-site HTML/sitemap sets with Node built-ins"
    - "Require case-sensitive filesystem evidence for preserved mixed-case static routes"

key-files:
  created:
    - scripts/verify-faq-seo-graph.js
  modified:
    - src/faq/index.ts
    - src/lib/seo.ts
    - src/lib/localizedRoutes.ts
    - src/app/[lang]/faq/[id]/page.tsx
    - src/app/faq/[id]/page.tsx
    - src/app/sitemap.ts
    - package.json

key-decisions:
  - "English public routes remain registry canonicalSlugs, while Chinese routes use durable contentId keys, including published Chinese-only records without an English counterpart."
  - "H1, FAQ JSON-LD, breadcrumb, and related links consume one resolved locale FaqItem; metadata titles remain presentation fields."
  - "Alternates include only published counterpart route keys and x-default English when available; missing counterparts are omitted."
  - "Exact sitemap URL identity and case-sensitive filesystem evidence remain release invariants; redirects and aggregate release verification stay in Phase 4."

patterns-established:
  - "getFaqPath rejects unknown route identities instead of silently emitting guessed paths."
  - "verify-faq-seo-graph source mode checks registry/catalog invariants; --html checks every owner-site FAQ page and sitemap URL set."

requirements-completed: [SEO-01, SEO-02, SEO-03]

coverage:
  - id: D1
    description: "Every English and published Chinese FAQ route resolves through one durable locale-aware identity adapter."
    requirement: SEO-01
    verification:
      - kind: integration
        ref: "npm run verify:faq-seo-graph"
        status: pass
      - kind: e2e
        ref: "node scripts/verify-faq-seo-graph.js --html --out-dir out --variant io (case-sensitive APFS)"
        status: pass
      - kind: e2e
        ref: "node scripts/verify-faq-seo-graph.js --html --out-dir out --variant cn (case-sensitive APFS)"
        status: pass
    human_judgment: false
  - id: D2
    description: "FAQ detail H1, FAQ JSON-LD Question/answer, breadcrumb identity, canonical URL, and published alternates remain coherent for every owner-site route."
    requirement: SEO-02
    verification:
      - kind: integration
        ref: "npm run verify:faq-routes && npm run verify:faq-metadata"
        status: pass
      - kind: e2e
        ref: "verify-faq-seo-graph HTML io/cn canonical, hreflang, H1, and JSON-LD checks"
        status: pass
    human_judgment: false
  - id: D3
    description: "FAQ discovery links, static parameters, and owner-site sitemaps use final route keys with exact URL de-duplication and alias exclusion."
    requirement: SEO-03
    verification:
      - kind: integration
        ref: "npm run verify:faq-routes && npx tsc --noEmit"
        status: pass
      - kind: e2e
        ref: "verify-faq-seo-graph HTML io/cn route cardinality and sitemap URL-set checks"
        status: pass
    human_judgment: false

duration: 35m
completed: 2026-08-16
status: complete
---

# Phase 3: Coherent SEO Graph Summary

**FAQ pages, cross-locale metadata, discovery links, static parameters, and owner-site sitemaps now share one registry-backed durable identity.**

## Performance

- **Duration:** 35 min
- **Started:** 2026-08-16T02:56:00+08:00
- **Completed:** 2026-08-16T03:32:00+08:00
- **Tasks:** 3
- **Files modified:** 8 production files plus this summary

## Accomplishments

- Added typed `contentId` resolution and locale route-key conversion. English canonical slugs remain exact, Chinese routes use durable content IDs, and Chinese-only published records remain reachable without synthetic English alternates.
- Unified detail-page H1, FAQ JSON-LD, breadcrumb, related links, canonical metadata, and published `en`/`zh-CN`/`x-default` alternates around one resolved FAQ identity.
- Made FAQ paths fail closed for unknown IDs, kept static params and sitemap enumeration on final route keys, and preserved exact absolute URL de-duplication with legacy alias exclusion.
- Added `npm run verify:faq-seo-graph` with source diagnostics and full HTML/sitemap verification for both owner-site variants.

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire durable identity through FAQ detail SEO surfaces** - `c53be55` (feat(03-01))
2. **Task 2: Align links, static parameters, and the owner-site sitemap** - `5e790f4` (feat(03-01))
3. **Task 3: Add source and static-export SEO graph verification** - `1df99bf` (feat(03-01))

Follow-up correctness fix:

4. **Case-sensitive export realpath handling** - `4b12736` (fix(03-01))

**Plan metadata:** `f09d2ab` (docs(03): create coherent SEO graph plan)

## Files Created/Modified

- `src/faq/index.ts` - Durable contentId resolution, locale route keys, translated-locale detection, and final static IDs.
- `src/lib/seo.ts` - Published FAQ canonical/alternate metadata with owner-domain route conversion and x-default policy.
- `src/lib/localizedRoutes.ts` - Registry-only FAQ path normalization and unknown-identity failure.
- `src/app/[lang]/faq/[id]/page.tsx` - Shared detail identity for H1, FAQ JSON-LD, breadcrumbs, related links, and metadata.
- `src/app/faq/[id]/page.tsx` - Root default-locale static params named and sourced as final route keys.
- `src/app/sitemap.ts` - Explicit final route-key FAQ sitemap enumeration and exact URL de-duplication.
- `scripts/verify-faq-seo-graph.js` - Source and optional owner-site HTML/sitemap graph verifier.
- `package.json` - `verify:faq-seo-graph` command.

## Decisions Made

- Treated Chinese-only catalog records as valid published Chinese identities. They render on `fastgpt.cn` and omit English/x-default alternates when no English registry counterpart exists.
- Kept the existing owner-domain URL helpers and static export topology. No redirect projection, metadata policy change, or release aggregation was introduced.
- Allowed distinct case-folded paths when their `realpath` values differ on a case-sensitive filesystem; same-file collisions fail with a case-sensitive host diagnostic.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Correctness] Chinese-only published route keys were initially rejected by the identity adapter**
- **Found during:** Task 3 source verifier
- **Issue:** `faqZh` contains 1,490 published Chinese records, including 90 durable IDs without an English counterpart. Requiring every Chinese key to exist in the English registry made those static routes unresolved.
- **Fix:** Treat a key present in the published Chinese catalog as a valid Chinese identity; alternate generation omits unavailable English/x-default targets.
- **Files modified:** `src/faq/index.ts`, `scripts/verify-faq-seo-graph.js`
- **Verification:** Source verifier reports 1,490 Chinese routes; cn case-sensitive HTML verifier passes all 1,490 pages and sitemap URLs.
- **Committed in:** `1df99bf`

**2. [Rule 1 - Correctness] Case-sensitive HTML verifier rejected distinct real paths with the same lowercase projection**
- **Found during:** io case-sensitive APFS HTML verification
- **Issue:** Preserved mixed-case routes intentionally share lowercase projections while residing in distinct files on a case-sensitive filesystem.
- **Fix:** Compare native realpaths and reject only when two route entries resolve to the same file; retain the explicit case-sensitive host diagnostic.
- **Files modified:** `scripts/verify-faq-seo-graph.js`
- **Verification:** io and cn APFS HTML verifiers pass; default macOS output remains diagnosed by route cardinality/canonical mismatch.
- **Committed in:** `4b12736`

**Total deviations:** 2 auto-fixed (identity coverage, filesystem diagnostics)
**Impact on plan:** Both fixes close required Phase 3 coverage without adding dependencies or entering Phase 4 scope.

## Issues Encountered

- The default macOS volume is case-insensitive. The io export there contains 1,398 distinct FAQ files for 1,400 canonical routes and reports the expected mixed-case collision; the source checks and existing P2 check pass. Full io and cn HTML evidence passed on a temporary case-sensitive APFS volume.
- The first APFS build attempt used a node_modules symlink outside the mounted filesystem, which Turbopack rejects. Copying the existing dependency directory inside the temporary volume enabled clean builds without repository changes.
- `npm run verify:p2` passes for the io owner configuration on the repository output (`1,398` files due the local filesystem collision); the focused Phase 3 verifier is the authoritative full 1,400/1,490 route evidence on APFS.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 4 can consume the durable contentId-to-route adapter, final owner sitemap set, and focused SEO graph verifier. Redirect projection, aggregate release verification, and release-wide build ownership remain deferred to Phase 4. CI/release HTML checks should run on a case-sensitive filesystem.

---
*Phase: 03-coherent-seo-graph*
*Completed: 2026-08-16*
