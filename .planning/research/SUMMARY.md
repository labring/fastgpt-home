# Project Research Summary

**Project:** FastGPT English FAQ SEO Repair
**Domain:** Static-export FAQ metadata import and incremental URL repair
**Researched:** 2026-08-15
**Confidence:** HIGH

## Executive Summary

This milestone repairs the release-ready English FAQ SEO surface for the approximately 1,400 records already in the repository. The Week04 workbook is the authoritative source for 1,195 approved title, description, and keyword records. Existing authored bodies remain authoritative. Healthy URLs retain their existing path; only missing or identity-unsafe paths receive a stable repaired slug.

Build one committed, generated registry keyed by stable content ID. It carries the final canonical slug, approved metadata, unique redirect aliases, and an audit-only collision ledger. The existing Next.js static export, FAQ catalog, sitemap, and Worker/Nginx redirect generation then consume this registry. This keeps the canonical page, internal links, hreflang, JSON-LD, sitemap, static parameters, and edge redirects coherent.

The principal risks are plausible wrong-page 200 responses from short-slug collisions, metadata mutation by the generic normalizer, ambiguous legacy redirects, and release artifacts that diverge from source data. Guard them with source-level registry invariants plus post-build checks of exported HTML, sitemap, Cloudflare Worker, and Nginx map. The endpoint is a successful production build and runnable regression gate; deployment and historical body restoration remain separate work.

## Key Findings

### Recommended Stack

Use existing tooling only. Next.js 16.2.6 App Router static export must enumerate all final routes at build time because FAQ segments use `dynamicParams = false`. A Python 3.11+ standard-library importer can follow `scripts/sync-w3-faq.py`; select a preflighted interpreter because the local default Python has a broken XML extension. Node built-ins and the existing TypeScript AST utility support deterministic validation and build-artifact inspection.

**Core technologies:**
- Existing Next.js static export: renders final static routes and every SEO surface from build-time data.
- Generated JSON SEO registry: single source for `contentId`, canonical slug, metadata, aliases, and collision dispositions.
- Existing FAQ catalog in `src/faq/index.ts`: joins authored bodies to registry data and exposes canonical route APIs.
- Existing Worker/Nginx redirect generators: project validated one-to-one aliases into both delivery targets.
- Python stdlib plus Node `assert/strict`: deterministic import and focused migration verification without dependencies.

### Expected Features

**Must have (release gate):**
- Exact metadata for all 1,195 approved rows, including one ` - FastGPT` suffix according to the explicit approved-field policy.
- Classification of each current record as preserved, missing, or unsafe; preserved paths retain page identity.
- One unique, safe final slug per in-scope record; canonical static route, links, sitemap, and metadata consume it.
- Direct 301s only for legacy paths with one approved destination; ambiguous collision aliases remain explicit no-redirect records.
- A runnable verifier plus successful production build covering route identity, metadata, SEO graph, static files, and both redirect artifacts.

**Should have:**
- Generated decision report with counts and per-record preservation/repair/redirect disposition.
- Idempotent workbook drift check for future approved revisions.

**Defer:**
- Missing historical FAQ body recovery, editorial question/answer/category rewrites, full-catalog normalization, deployment and live SEO monitoring.

### Architecture Approach

Keep `src/faq/en.ts` as stable authored content keyed by content ID. Add one generated `en-seo-registry.json` and a small catalog boundary that validates coverage, safe unique canonical slugs, metadata authority, alias uniqueness, and canonical/alias separation. Route pages, cards, related links, metadata, canonical/hreflang/JSON-LD, sitemap, and redirect generation obtain route data through that boundary. Generic domain and locale URL assembly remains in existing routing helpers.

**Major components:**
1. Week04 importer: validates workbook headers, identity mapping, row coverage, and stable generation.
2. Registry-backed catalog: resolves content ID and canonical slug, applies approved metadata, and exports canonical routes plus redirect specs.
3. Existing App Router and SEO consumers: render and enumerate canonical routes only.
4. Existing redirect builder: emits Worker and Nginx maps from unique registry aliases.
5. Focused verifier: compares registry, exported HTML, sitemap, and host artifacts.

### Critical Pitfalls

1. **Title normalization alters approved metadata** — give imported records explicit priority and compare rendered fields exactly after build.
2. **Short-slug collision yields a wrong-page 200** — validate a one-to-one content-ID/canonical-slug/encoded-path inventory and verify H1 plus JSON-LD identity.
3. **Ambiguous aliases become arbitrary 301s** — group sources before map creation; require one destination or retain an audit-only no-redirect disposition.
4. **Independent encoding and consumer mappings drift** — use catalog-derived canonical routes everywhere; test encoded, raw, case, and trailing-slash legacy forms.
5. **Static or edge artifacts omit valid data** — treat production build output as the acceptance environment and compare Worker/Nginx maps to the registry.

## Implications for Roadmap

### Phase 1: Identity Inventory and Canonical Registry
**Rationale:** Every later consumer requires a stable identity-to-final-slug decision; it also contains the highest SEO-risk collision work.
**Delivers:** Generated registry for every current English record with preserved/repair classification, canonical slug, unique alias set, collision ledger, and source-level invariants.
**Addresses:** Route identity classification, deterministic final slugs, healthy URL preservation.
**Avoids:** Wrong-page 200s, duplicate encoded paths, accidental full-catalog rewrite.

### Phase 2: Approved Metadata Import and Catalog Integration
**Rationale:** Metadata must join through stable identity before routes consume repaired slugs.
**Delivers:** Standard-library Week04 importer, exact 1,195-row approved metadata registry data, registry-backed catalog APIs, and importer drift check.
**Uses:** Existing `sync-w3-faq.py` pattern, `src/faq/index.ts`, `legacyMeta.ts` compatibility seam.
**Avoids:** Title truncation, suffix duplication, unmatched or duplicate workbook rows.

### Phase 3: Canonical Route and SEO Graph Wiring
**Rationale:** Build-time routes, links, canonical/hreflang, JSON-LD, and sitemap must move as one graph before aliases can redirect safely.
**Delivers:** Root and localized static params, detail lookup, cards, related links, metadata, alternates, JSON-LD, and sitemap sourced from catalog route records; explicit verified translation mappings where English slugs diverge.
**Implements:** Canonical catalog routes across existing App Router and SEO consumers.
**Avoids:** Static 404s, sitemap aliases, false locale alternates, source-of-truth drift.

### Phase 4: Redirect Projection and Release Verification
**Rationale:** Edge redirects require canonical static destinations and are only reliable when generated from final validated registry data.
**Delivers:** Worker and Nginx maps from unique aliases; one focused `verify:faq-seo-repair` command; production build plus existing SEO verification evidence.
**Addresses:** Direct redirect integrity, export readiness, SEO-surface alignment.
**Avoids:** Last-write-wins redirect choices, host drift, query loss, missing output files.

### Phase Ordering Rationale

- Registry decisions precede metadata joins and every public URL consumer.
- Canonical static files precede redirects so every redirect target is a verified export.
- One catalog supplies static params, SEO data, sitemap, and maps; separate overlay logic would multiply drift paths.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** Review the supplied audit/workbook identity mapping and collision dispositions before generating data.
- **Phase 3:** Trace existing translation pairing and `hreflang` behavior; repaired English slugs can expose hidden key-based joins.
- **Phase 4:** Validate both deployment variants' generated artifact formats and encoded path handling.

Phases with standard patterns:
- **Phase 2:** Reuse the repository's existing stdlib XLSX importer and metadata overlay conventions.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Direct repository evidence supports all recommended tooling; no new package is required. |
| Features | HIGH | Project scope and acceptance conditions specify the 1,195-record import and current-corpus boundary. |
| Architecture | HIGH | Current FAQ route, sitemap, and redirect call paths directly establish the required shared registry boundary. |
| Pitfalls | HIGH | Audit observations and static-export constraints identify concrete failure modes and checks. |

**Overall confidence:** HIGH

### Gaps to Address

- Final workbook-to-content-ID mapping and every collision alias disposition require validation during Phase 1; title or current slug alone provides insufficient identity authority.
- The title suffix and whitespace policy for imported fields needs one documented implementation rule, then exact rendered-output assertions.
- English-to-Chinese alternate pairs require explicit verification for repaired entries; unpaired entries need an explicit published-state policy.
- Run production builds for every release site variant and use the preflighted Python 3.11/3.12 interpreter in CI.

## Sources

### Primary (HIGH confidence)
- `.planning/PROJECT.md` — scope, 1,195-row authority, static-export constraint, release-ready endpoint.
- `.planning/research/STACK.md`, `FEATURES.md`, `ARCHITECTURE.md`, and `PITFALLS.md` — repository and audit-backed detailed findings.
- Repository call paths: `src/faq/index.ts`, FAQ App Router pages, `src/app/sitemap.ts`, `src/lib/faqMetadata.ts`, `scripts/sync-w3-faq.py`, `scripts/lib/redirects.js`, and `scripts/verify-i18n-seo.js`.

### Secondary (MEDIUM confidence)
- [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports) — build-time route and redirect constraints.
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — static dynamic-route enumeration.
- [Google Search Central URL migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) — direct permanent migrations and final sitemap practice.

---
*Research completed: 2026-08-15*
*Ready for roadmap: yes*
