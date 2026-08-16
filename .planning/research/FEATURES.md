# Feature Research

**Domain:** Static-export FAQ metadata import and incremental SEO URL migration
**Researched:** 2026-08-15
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Approved metadata fidelity | Every approved FAQ needs the reviewed search snippet that the workbook supplies. | MEDIUM | Acceptance: each of the 1,195 approved rows matches by the approved online URL or its resolved final record; rendered `<title>` equals the approved title plus exactly one ` - FastGPT` suffix, description equals the approved description, and keywords equal the approved keyword list. The verifier compares every field with the workbook-derived fixture and reports missing, duplicate, and mismatched rows. |
| Authored-content preservation | The migration must retain the existing answers that make the current FAQ corpus publishable. | LOW | Acceptance: every in-scope record retains its existing `Question`, `Answers`, and category value; the route HTML `<h1>` equals that record's `Question`. The metadata import changes only metadata fields and slug ownership. |
| Route identity classification | A reachable URL is healthy only when it renders its intended FAQ. | HIGH | Acceptance: classify every current English FAQ record as `preserved`, `missing`, or `unsafe`; a `preserved` route retains its existing path and passes `final static page + H1 identity`. HTTP status is recorded separately from identity, so a `200` page with another record's H1 fails. |
| Deterministic final-slug registry | Static routes, SEO tags, links, sitemap entries, and redirect targets need one shared definition of each final address. | HIGH | Acceptance: every current in-scope English record has one safe, deterministic, unique final slug; set cardinality of final slugs equals record cardinality; the registry identifies the original slug, final slug, classification, and a redirect target when one exists. It only repairs missing or unsafe routes. |
| Exact legacy redirect mapping | Changed URLs need a permanent, direct path to the intended page so existing links retain a useful destination. | MEDIUM | Acceptance: every changed legacy path with one intended destination issues `301` directly to that record's final canonical URL; the target has exported static HTML and matching H1. The verifier rejects loops, chains, cross-record targets, and duplicate source mappings. Ambiguous historical collision aliases remain explicitly reported for later governance. |
| Final-URL SEO coherence | Search engines and users need every SEO surface to name the same final URL. | MEDIUM | Acceptance: each final FAQ page has a self canonical URL; `en`, `zh-CN`, and `x-default` hreflang entries use corresponding published final routes; internal FAQ list, related-card, and language links use final routes; sitemap contains each final canonical URL once and contains no migrated legacy URL. |
| Complete static export | With `dynamicParams = false`, every FAQ path has to exist during the build. | MEDIUM | Acceptance: the final English slug registry, default FAQ `generateStaticParams`, localized FAQ `generateStaticParams`, and sitemap enumerate the same final published set for their respective locales; the exported `out/` tree contains every final in-scope English route; `npm run build` succeeds. |
| Runnable regression gate | The repair must remain safe when future data edits occur. | MEDIUM | Acceptance: one repository command validates metadata fidelity, preserved-route stability, final-slug uniqueness, redirect integrity, static-route coverage, canonical/hreflang/internal-link/sitemap alignment, and exits nonzero with record-level failures. |

### Differentiators (Competitive Advantage)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Generated migration decision report | Gives reviewers a concise, reproducible explanation of every preserved route, repaired route, redirect, and unresolved ambiguous alias. | LOW | Generate from the final registry during verification; include counts and stable record identifiers. This supports code review and release handoff while preserving the single-registry model. |
| Idempotent import drift check | Makes a future workbook re-run reveal exactly which approved metadata values changed. | MEDIUM | A generator or fixture check reads the approved 1,195-row source into deterministic project data and produces a clean diff on re-run. Keep the implementation in current Node/Python tooling. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Recovery of historical missing FAQ bodies or the full 1,990-question catalog | The audit exposes the larger historical FAQ gap. | The current repository lacks authoritative answer bodies for those records, and the milestone boundary covers the roughly 1,400 records already present. | Keep the registry and acceptance set bounded to current repository records; schedule content restoration after an authoritative answer source arrives. |
| Question, answer, category, or editorial SEO rewrites | Rewriting can appear to improve click-through rate and content quality. | It changes authored content and removes the ability to isolate metadata and routing outcomes. | Import approved metadata verbatim and preserve current content; manage editorial revisions as a separately governed content milestone. |
| Full-catalog slug normalization | A uniform slug scheme appears tidy. | It changes healthy indexed URLs at scale and expands redirect and ranking risk. | Retain healthy paths; assign deterministic safe unique slugs only to missing or unsafe records. |
| Guessed redirects for collision aliases | Redirect coverage can appear numerically complete. | A shared legacy slug lacks one record identity, so a guessed target sends visitors and crawlers to unrelated content. | Emit redirects only where the old path has one intended destination; report ambiguous aliases for explicit content-governance decisions. |
| Production deployment, live crawl verification, and traffic monitoring | SEO work naturally invites production follow-through. | The approved endpoint is release-ready code, and deployment requires a separate operational authority. | Deliver a successful production build plus the runnable verification gate; release operations own deployment and post-release monitoring. |
| Runtime FAQ lookup or server-only redirect handling | On-demand recovery can seem to cover routes automatically. | The site exports static HTML and has `dynamicParams = false`; runtime behavior creates a second route source and weakens build-time coverage. | Generate final paths and redirect maps from the registry using current static-export tooling. |

## Acceptance Gate

| Gate | Observable check | Pass condition |
|------|------------------|----------------|
| Workbook coverage | Parse the approved metadata source into a keyed fixture. | Exactly 1,195 approved rows are consumed; every row maps once to an in-scope final record; duplicate keys and unmapped rows fail. |
| Metadata output | Read exported FAQ HTML or the same server-rendered metadata result. | Title, description, and keywords equal their approved values; title suffix occurs once; truncation markers and field drift fail. |
| Record identity | Compare each final route's exported HTML H1 with the registry record question. | Every final URL renders the intended record, independently of its HTTP status. |
| Healthy URL stability | Compare the pre-repair route inventory with the final registry. | Every `preserved` entry keeps its original canonical path and direct page identity. |
| Slug safety and uniqueness | Validate the final registry before route generation. | Each in-scope record has one deterministic safe slug and every slug has one owner. |
| Redirect integrity | Inspect generated Nginx/worker redirect maps and follow each mapped path in a local static-serving harness or equivalent target check. | Each changed unique legacy path uses `301`, has one final target, reaches that record's `200` static page in one hop, and preserves query strings where current redirect infrastructure promises it. |
| SEO surface alignment | Parse final HTML, sitemap XML, and internal FAQ links. | Canonical, hreflang, internal links, sitemap location, static parameters, and redirect destination agree with the registry final slug; sitemap URLs are unique canonical URLs. |
| Export readiness | Run the repository build and verification command under production site variants that publish FAQ pages. | Build succeeds and every final English registry route has corresponding static output. |

## Feature Dependencies

```text
Approved 1,195-row metadata fixture
    └──requires──> Final-slug registry
                           ├──drives──> FAQ content lookup and metadata rendering
                           ├──drives──> generateStaticParams and static export
                           ├──drives──> canonical, hreflang, internal links, sitemap
                           └──drives──> unique legacy redirect map

Final static export
    └──requires──> Identity-aware regression gate

Migration decision report ──enhances──> Identity-aware regression gate

Historical-content restoration ──conflicts──> Current-milestone boundary
```

### Dependency Notes

- **Metadata fidelity requires the final-slug registry:** workbook rows identify approved online URLs while unsafe records receive final slugs; one mapping resolves this safely.
- **Static generation requires the final-slug registry:** `dynamicParams = false` means each final slug must enter static parameters before the build.
- **Canonical, hreflang, internal links, sitemap, and redirects require the final-slug registry:** independent slug derivations would create divergent SEO surfaces.
- **The regression gate requires final export artifacts:** it verifies actual static HTML, sitemap, and generated redirect maps in addition to source data.
- **Historical restoration conflicts with this milestone:** its body-source authority and content approval form a distinct dependency chain.

## MVP Definition

### Launch With (v1)

- [ ] Approved metadata import for all 1,195 rows with exact rendered-field verification.
- [ ] In-scope record classification plus a deterministic safe unique final-slug registry.
- [ ] Healthy path preservation and direct `301` mappings for changed legacy paths with unique destinations.
- [ ] Static generation, canonical/hreflang/internal-link/sitemap consistency, and identity-aware route verification.
- [ ] Successful production build and one runnable regression command.

### Add After Validation (v1.x)

- [ ] Generated migration decision report — add when release reviewers need a durable record-by-record handoff artifact.
- [ ] Idempotent workbook drift report — add when a later approved metadata revision enters scope.

### Future Consideration (v2+)

- [ ] Historical body recovery — start when an authoritative answer corpus and editorial approval workflow exist.
- [ ] Content rewrite and category governance — start as a dedicated editorial program with its own identity and SEO acceptance criteria.
- [ ] Post-release crawl, index, and CTR monitoring — perform within the production operations milestone.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Exact 1,195-row metadata fidelity | HIGH | MEDIUM | P1 |
| Identity-aware preserved-route and slug-repair registry | HIGH | HIGH | P1 |
| Direct redirect integrity | HIGH | MEDIUM | P1 |
| Static export and SEO-surface alignment | HIGH | MEDIUM | P1 |
| Runnable end-to-end regression gate | HIGH | MEDIUM | P1 |
| Migration decision report | MEDIUM | LOW | P2 |
| Idempotent future-workbook drift report | MEDIUM | MEDIUM | P2 |
| Historical FAQ restoration | HIGH | HIGH | P3 |

**Priority key:**
- P1: Must have for release-ready code
- P2: Valuable after the release gate is complete
- P3: Requires a future scope decision and supporting authority

## Competitor Feature Analysis

| Feature | Established migration practice | Existing FastGPT baseline | Milestone approach |
|---------|--------------------------------|---------------------------|--------------------|
| URL migration | Google recommends an old-to-new URL map, server-side permanent redirects, direct final destinations, updated canonical/hreflang/internal links, and a sitemap of final URLs. | The repository already generates redirect maps, canonical alternates, FAQ static parameters, and sitemap entries from FAQ data. | Extend the current patterns with one final-slug registry and verify page identity at every final route. |
| Static FAQ publishing | Next.js App Router uses `generateStaticParams` for build-time dynamic routes; `dynamicParams = false` makes the enumerated set the publishable route set. | FAQ detail routes already use static params and `dynamicParams = false`. | Make registry coverage a build gate and verify the exported file for each final in-scope slug. |

## Sources

- `.planning/PROJECT.md` — approved scope, 1,195-row authority, static-export constraints, and release-ready boundary. Confidence: HIGH.
- `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md` — approved online URL column, title-suffix behavior, and collision/404 evidence. Confidence: HIGH.
- `/Users/longnv/bin/repo/fastgpt-data/W3-深度内容与FAQ61-90-20260803/存量核查/FastGPT-存量FAQ修复验收清单-V1.1-星触达-20260814.md` — strict identity, metadata, canonical/hreflang, redirect, and audit evidence. Confidence: HIGH.
- `src/app/[lang]/faq/[id]/page.tsx`, `src/app/faq/[id]/page.tsx`, `src/app/sitemap.ts`, `src/lib/faqMetadata.ts`, `src/lib/redirects.js`, and `scripts/verify-i18n-seo.js` — current implementation seams. Confidence: HIGH.
- [Next.js `generateStaticParams` documentation](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) and [Next.js sitemap documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Confidence: MEDIUM.
- [Google Search Central: Site Moves and Migrations](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes). Confidence: HIGH.

---
*Feature research for: FastGPT English FAQ SEO repair*
*Researched: 2026-08-15*
