# FastGPT SEO Content Publishing

## What This Is

This project improves FastGPT's organic-search surfaces across `fastgpt.cn` and `fastgpt.io`. It preserves the verified English FAQ foundation and adds paired Chinese and English content with stable routes, coherent cross-domain SEO, static-export verification, and production release evidence.

The work keeps approved content faithful while making every published page discoverable, correctly localized, and safe to release.

## Core Value

Every in-scope SEO page has one stable canonical URL, renders its approved localized content and metadata, and is proven release-safe.

## Current Milestone: v1.1 Guide Content Center

**Goal:** Publish a discoverable `/guide` content center with eight paired Chinese and English articles on the two production domains.

**Target features:**
- `/guide` hub pages and eight same-slug article pairs
- Cross-domain canonical, hreflang, sitemap, internal-link, and structured-data integrity
- Static-export release verification and production deployment for all 16 article URLs

## Business Context

- **Customer**: Chinese- and English-speaking FastGPT prospects arriving through organic search
- **Revenue model**: SEO traffic supports FastGPT product discovery and commercial conversion
- **Success metric**: All 16 approved Guide articles render at their owned-domain URLs with coherent SEO output and pass production verification
- **Strategy notes**: `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md` and `/Users/longnv/bin/repo/fastgpt-data/W3-深度内容与FAQ61-90-20260803/存量核查/FastGPT-存量FAQ修复验收清单-V1.1-星触达-20260814.md`

## Requirements

### Validated

- ✓ English and Chinese FAQ records already render through shared App Router list and detail routes — existing
- ✓ FAQ detail pages already emit canonical, cross-domain hreflang, JSON-LD, and static parameters — existing
- ✓ Existing site-routing helpers already own domain and locale URL generation — existing
- ✓ Existing build scripts already produce a static export and run repository verification checks — existing
- ✓ Approved Week04 metadata is imported for 1,195 mapped English FAQ records with authored fields preserved — Phase 2
- ✓ Healthy English FAQ URLs remain stable and missing or unsafe records receive deterministic canonical slugs — Phase 1
- ✓ Changed legacy paths with unique destinations receive registry-backed one-hop redirects, with collisions denied — Phase 4
- ✓ Canonical, hreflang, list, related, static-param, and sitemap surfaces share the final route registry — Phase 3
- ✓ A single release command verifies redirect safety, route identity, metadata, SEO graph, and static export evidence — Phase 4
- ✓ Case-sensitive io and cn production exports prove complete final FAQ route coverage — Phase 4
- ✓ Eight unique bilingual Guide slugs map to one approved Chinese and one approved English source — Phase 5
- ✓ Guide bodies remove one leading delivery comment while preserving approved normalized content — Phase 5
- ✓ Guide source contracts reject duplicate pairs, metadata/schema drift, invalid assets, and unresolved links with slug-specific failures — Phase 5

### Active

- [ ] Visitors can browse the Chinese and English `/guide` hubs and open all eight paired articles on their owned domains.
- [ ] Search crawlers receive coherent canonical, hreflang, sitemap, structured-data, and internal-link signals for every Guide page.
- [ ] Maintainers can build, verify, deploy, and live-check the complete 16-page Guide release.

### Out of Scope

- Recovering the roughly 590 FAQ bodies absent from the current repository — the user limited this milestone to the current roughly 1,400 records
- Restoring all 1,990 independent questions from the historical 2,000-row source — requires the missing authoritative answer source
- Rewriting FAQ questions or answers — this milestone preserves authored content
- Bulk category remapping — independent content-governance work
- Deploying the completed v1.0 FAQ migration — managed separately from the v1.1 Guide release
- Programmatic technical-page publishing — tracked as a later milestone
- First-party lead form delivery — tracked as a later milestone
- Additional Guide authoring beyond the approved Week04 article pairs — this milestone publishes the supplied 16 documents

## Context

The website is a Next.js App Router application that exports static HTML. English FAQ content is stored in `src/faq/en.ts`; route generation uses `dynamicParams = false`, so every valid FAQ path must exist in the build-time static parameter set.

The Week04 workbook contains approved metadata for 1,195 reachable English FAQ pages and identifies collision or 404 groups separately. The newer W3 audit recalculates the historical dataset as 2,000 source rows, 1,990 independent questions, and 1,398 historical short slugs. This milestone follows the user's narrower decision to repair only the FAQ records currently present in the website repository.

The current code already has metadata normalization and legacy overrides in `src/lib/faqMetadata.ts` and `src/faq/legacyMeta.ts`. The implementation should extend the existing content and routing patterns with generated data or a small registry rather than introduce a parallel FAQ system.

The v1.1 source package provides eight Chinese Markdown articles and eight English counterparts with matching slugs, authored metadata, canonical targets, hreflang pairs, internal-link suggestions, and image requirements. The approved public topology is `/guide/<slug>` on both domains, with `fastgpt.cn` owning Chinese and `fastgpt.io` owning English.

## Constraints

- **URL stability**: Preserve healthy current URLs — they may already hold search equity and external links
- **Migration scope**: Change only missing or unsafe in-scope routes — the approved strategy is incremental repair
- **Source of truth**: Use `FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx` for the 1,195 metadata records
- **Rendering**: Keep all route data available at build time — production uses Next.js static export
- **SEO integrity**: Canonical, hreflang, sitemap, internal links, and redirects must resolve to the same final slug mapping
- **Content fidelity**: Preserve the existing FAQ questions and answers verbatim
- **Dependencies**: Reuse the current Node.js and repository tooling; add no package for spreadsheet conversion or slug mapping
- **Verification**: Leave one runnable regression check plus a successful production build
- **Guide source of truth**: Use the 16 Week04 Markdown documents and preserve their authored body content
- **Guide routing**: Publish both locales at `/guide/<slug>` with matching slugs and owned-domain canonical URLs
- **Guide presentation**: Reuse existing content-center and article components before adding Guide-specific UI
- **Guide release**: Complete production deployment and live verification on both domains

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Limit restoration to the roughly 1,400 FAQ records currently in the repository | The missing historical FAQ bodies lack an authoritative local source, and the user explicitly excluded them | Validated — Phase 1 |
| Use incremental slug repair | Preserves healthy indexed URLs and reduces redirect and ranking risk | Validated — Phase 1 |
| Treat the Week04 workbook as metadata authority for its 1,195 rows | It contains reviewed online URLs and approved title, description, and keyword values | Validated — Phase 2 |
| End at release-ready code | The user selected implementation, verification, and production build as the delivery endpoint | Validated — Phase 4 |
| Extend existing FAQ routing and metadata patterns | A single content path keeps static params, metadata, and redirects consistent | Validated — Phase 3 |
| Publish Guide pages as paired same-slug routes on the two owned domains | The approved Week04 content and hreflang specification use this topology | — Pending |
| Use one typed eight-pair Guide registry and server-only source boundary | Keeps source identity, body fidelity, and later route consumers reproducible | Validated — Phase 5 |
| Preserve approved Guide bytes and exclude the English GSC appendix | Keeps the Week04 delivery package source-faithful and scoped to 8×2 articles | Validated — Phase 5 |
| Keep asset requests and internal-link labels explicit until approved mappings exist | Prevents inferred assets or URLs from entering published content | Validated — Phase 5 |
| Reuse existing content components for Guide | This keeps the milestone focused on publishing and SEO integrity | — Pending |
| Include production deployment in v1.1 | The user selected production-live completion | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-17 after Phase 6*
