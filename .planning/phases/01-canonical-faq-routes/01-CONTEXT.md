# Phase 1: Canonical FAQ Routes - Context

**Gathered:** 2026-08-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Give every current English FAQ record a stable durable identity and one safe canonical URL. Preserve healthy public URLs and repair only missing, unsafe, or collided routes. This phase covers route identity and canonical slug generation; approved metadata, the complete SEO graph, redirect projection, and release verification remain in their roadmap phases.

</domain>

<decisions>
## Implementation Decisions

### Stable identity and registry boundary
- **D-01:** Keep each existing `src/faq/en.ts` object key as the durable `contentId`; store `contentId` to `canonicalSlug` records in one generated English registry consumed by the catalog and every route consumer. This keeps authored content stable while public paths evolve.

### Preserve-versus-repair policy
- **D-02:** Preserve an exact current slug only when it is safe, unique, and maps to the intended record. Use the Week04 online-URL evidence for the 1,195 approved reachable rows and repair only missing, unsafe, or collided records. Keep the migration incremental to protect indexed URLs.

### Deterministic repaired slugs
- **D-03:** Derive readable ASCII slugs from the full question using lowercase `a-z0-9-hyphen` syntax. Reserve preserved and previously allocated slugs; append a deterministic short digest from the stable content identity when a collision remains. Commit the mapping so later builds never regenerate a different public path.

### Legacy alias and collision handling
- **D-04:** Emit a permanent one-hop redirect only when one legacy source maps to exactly one final `contentId` and the destination is a verified canonical route. Keep collided sources in an audit-only collision ledger without a guessed redirect; preserve existing query-string behavior through deployment projection.

### the agent's Discretion
- Choose the smallest repository-native data format and generation script that can validate uniqueness, preserve existing routes, and expose record-level failures.
- Reuse existing FAQ loaders, route helpers, redirect helpers, and verification-script conventions.
- Keep route data build-time available for static export and add one focused runnable regression check for slug/registry invariants.

</decisions>

<canonical_refs>
## Canonical References

### Project scope and requirements
- `.planning/PROJECT.md` — project value, URL stability, source-of-truth, rendering, and verification constraints.
- `.planning/REQUIREMENTS.md` — URL-01, URL-02, and URL-03 acceptance requirements plus out-of-scope migration boundaries.
- `.planning/ROADMAP.md` — Phase 1 goal, dependencies, success criteria, and phase boundary.
- `.planning/STATE.md` — current phase position and known mapping/collision concerns.

### Existing route and content implementation
- `src/faq/en.ts` — current English FAQ records and durable object keys.
- `src/faq/index.ts` — FAQ catalog/index exports and locale selection patterns.
- `src/app/[lang]/faq/[id]/page.tsx` — localized FAQ detail route and static-param/metadata behavior.
- `src/app/faq/[id]/page.tsx` — default-locale FAQ alias route.
- `src/app/sitemap.ts` — current sitemap route enumeration and URL ownership.
- `scripts/lib/redirects.js` — repository redirect projection conventions.

### Research and source evidence
- `.planning/research/ARCHITECTURE.md` — phase research findings and integration constraints.
- `.planning/research/SUMMARY.md` — consolidated project research.
- `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md` — approved Week04 data and URL evidence conventions.
- `/Users/longnv/bin/repo/fastgpt-data/Week04/存量修复-补Meta第2批/FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx` — approved metadata workbook containing online URL evidence for mapped records.
- `/Users/longnv/bin/repo/fastgpt-data/W3-深度内容与FAQ61-90-20260803/存量核查/FastGPT-存量FAQ修复验收清单-V1.1-星触达-20260814.md` — prior acceptance/collision evidence.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Existing FAQ locale/index modules provide record lookup and locale fallback behavior.
- Existing App Router FAQ pages already provide static route and metadata entry points.
- Existing redirect helpers and verification scripts provide repository-native projection and assertion patterns.

### Established Patterns
- App Router detail routes use `generateStaticParams`, `dynamicParams = false`, and `notFound()` for unknown records.
- Build-time content registries are preferred for static export; route consumers should share one normalized mapping.
- Verification scripts throw record-level failures and exit nonzero with concise English logs.

### Integration Points
- The generated English registry must feed FAQ list/detail lookup, static params, canonical URL construction, sitemap input, and later metadata/SEO phases.
- Phase 2 will consume the same `contentId` mapping for workbook rows; Phase 3 will consume final slugs for canonical/hreflang/links; Phase 4 will project unique legacy aliases and verify the export.

</code_context>

<specifics>
## Specific Ideas

- Healthy indexed URLs carry search equity and external links, so path preservation is the default policy.
- The mapping must be deterministic and committed to prevent later builds from changing public paths.
- Ambiguous historical collisions require an explicit audit disposition and no guessed destination.

</specifics>

<deferred>
## Deferred Ideas

- Full historical FAQ-body recovery remains outside this milestone.
- Full-catalog slug normalization remains outside this incremental repair phase.
- Live production deployment and crawl monitoring remain release-operations work.

</deferred>

---

*Phase: 1-Canonical FAQ Routes*
*Context gathered: 2026-08-16*
