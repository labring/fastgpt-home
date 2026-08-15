# FastGPT English FAQ SEO Repair

## What This Is

This project repairs the English FAQ SEO surface in the existing FastGPT website. It imports the approved metadata for 1,195 currently reachable FAQ pages and incrementally repairs unsafe or missing routes within the roughly 1,400 English FAQ records already present in the repository.

The work preserves healthy indexed URLs, produces stable canonical paths for repaired entries, and leaves the static export ready for release.

## Core Value

Every in-scope English FAQ has a stable, reachable canonical URL and renders its approved metadata without disrupting healthy indexed URLs.

## Business Context

- **Customer**: English-speaking FastGPT prospects arriving through organic search
- **Revenue model**: SEO traffic supports FastGPT product discovery and commercial conversion
- **Success metric**: 1,195 approved metadata records render exactly, all in-scope FAQ routes build successfully, and repaired routes have deterministic redirects
- **Strategy notes**: `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md` and `/Users/longnv/bin/repo/fastgpt-data/W3-深度内容与FAQ61-90-20260803/存量核查/FastGPT-存量FAQ修复验收清单-V1.1-星触达-20260814.md`

## Requirements

### Validated

- ✓ English and Chinese FAQ records already render through shared App Router list and detail routes — existing
- ✓ FAQ detail pages already emit canonical, cross-domain hreflang, JSON-LD, and static parameters — existing
- ✓ Existing site-routing helpers already own domain and locale URL generation — existing
- ✓ Existing build scripts already produce a static export and run repository verification checks — existing

### Active

- [ ] Import all 1,195 approved English FAQ title, description, and keyword records from the Week04 workbook
- [ ] Preserve every current HTTP 200 FAQ URL whose rendered page identity is correct
- [ ] Assign deterministic, safe, unique slugs only to in-scope entries whose current routes are missing or unsafe
- [ ] Generate redirects for each changed legacy path that has a unique destination
- [ ] Keep canonical, hreflang, internal links, sitemap entries, and static parameters aligned with the final slug registry
- [ ] Add a runnable verification check covering metadata fidelity, slug uniqueness, redirect integrity, and zero missing in-scope static routes
- [ ] Complete the production build successfully with the repaired FAQ dataset

### Out of Scope

- Recovering the roughly 590 FAQ bodies absent from the current repository — the user limited this milestone to the current roughly 1,400 records
- Restoring all 1,990 independent questions from the historical 2,000-row source — requires the missing authoritative answer source
- Rewriting FAQ questions or answers — this milestone preserves authored content
- Bulk category remapping — independent content-governance work
- Production deployment, pushing, and live-site verification — the approved endpoint is release-ready code

## Context

The website is a Next.js App Router application that exports static HTML. English FAQ content is stored in `src/faq/en.ts`; route generation uses `dynamicParams = false`, so every valid FAQ path must exist in the build-time static parameter set.

The Week04 workbook contains approved metadata for 1,195 reachable English FAQ pages and identifies collision or 404 groups separately. The newer W3 audit recalculates the historical dataset as 2,000 source rows, 1,990 independent questions, and 1,398 historical short slugs. This milestone follows the user's narrower decision to repair only the FAQ records currently present in the website repository.

The current code already has metadata normalization and legacy overrides in `src/lib/faqMetadata.ts` and `src/faq/legacyMeta.ts`. The implementation should extend the existing content and routing patterns with generated data or a small registry rather than introduce a parallel FAQ system.

## Constraints

- **URL stability**: Preserve healthy current URLs — they may already hold search equity and external links
- **Migration scope**: Change only missing or unsafe in-scope routes — the approved strategy is incremental repair
- **Source of truth**: Use `FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx` for the 1,195 metadata records
- **Rendering**: Keep all route data available at build time — production uses Next.js static export
- **SEO integrity**: Canonical, hreflang, sitemap, internal links, and redirects must resolve to the same final slug mapping
- **Content fidelity**: Preserve the existing FAQ questions and answers verbatim
- **Dependencies**: Reuse the current Node.js and repository tooling; add no package for spreadsheet conversion or slug mapping
- **Verification**: Leave one runnable regression check plus a successful production build

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Limit restoration to the roughly 1,400 FAQ records currently in the repository | The missing historical FAQ bodies lack an authoritative local source, and the user explicitly excluded them | — Pending |
| Use incremental slug repair | Preserves healthy indexed URLs and reduces redirect and ranking risk | — Pending |
| Treat the Week04 workbook as metadata authority for its 1,195 rows | It contains reviewed online URLs and approved title, description, and keyword values | — Pending |
| End at release-ready code | The user selected implementation, verification, and production build as the delivery endpoint | — Pending |
| Extend existing FAQ routing and metadata patterns | A single content path keeps static params, metadata, and redirects consistent | — Pending |

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
*Last updated: 2026-08-15 after initialization*
