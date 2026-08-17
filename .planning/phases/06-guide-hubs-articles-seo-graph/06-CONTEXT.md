# Phase 6: Guide Hubs, Articles & SEO Graph - Context

**Gathered:** 2026-08-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 6 publishes the fixed eight-pair Guide corpus through the existing Next.js
static-export application. It owns the two owned-domain `/guide` hubs, the 16
same-slug article routes, localized visitor rendering, responsive rendering of
any approved required asset, breadcrumbs and configured internal links, and the
registry-derived metadata, hreflang, JSON-LD, static parameters, and sitemap
graph required by HUB-01, ARTICLE-01/02/03, and SEO-04/05/06/07. Source import,
delivery-comment fidelity, and negative source-contract fixtures remain the
Phase 5 contract; dual-variant export evidence remains Phase 7; deployment and
live checks remain Phase 8.

</domain>

<decisions>
## Implementation Decisions

### Route topology and locale ownership
- **D-01:** Publish the Guide hub and article at root `/guide` and
  `/guide/<slug>` on each owned domain, with localized `[lang]/guide` route
  adapters and root aliases delegating to the build's default locale. `zh`
  owns `fastgpt.cn`; `en` owns `fastgpt.io`; both use the same lower-case slug.
  Static parameters are filtered from `getBuildLocaleCodes()` and the eight
  entries in the Phase 5 registry, with `dynamicParams = false`. Route and URL
  construction uses `getOwnedLocalePath()`/`getOwnedLocaleUrl()` so root aliases,
  metadata, breadcrumbs, cards, links, and sitemaps share one path policy.
  — **Reversibility:** one-way — these URLs are the public Guide contract and
  changing them would require redirects and SEO migration.
- **D-02:** Keep the Guide route shell server-rendered and self-contained like
  the existing comparison and technical-center surfaces: localized dictionary,
  `Navbar`, `Footer`, `HomeThemeFix`, and `MarkdownContent` remain the reusable
  building blocks. Add Guide-specific route/presentation modules only for the
  hub grouping and article/link semantics; keep client state out of the fixed
  eight-card launch catalog.

### Hub taxonomy and authored rendering
- **D-03:** Add a registry-backed publication group for every slug and render
  exactly three server-rendered hub groups: decision, implementation, and
  industry. The launch grouping is decision for `saas-platform-enterprise-gaps`,
  `self-build-three-year-tco`, `server-sizing-guide`, and
  `complex-doc-golden-set`; implementation for `support-bot-four-steps`; and
  industry for `manufacturing-itops-invoice-audit`, `pharma-compliance-docs`,
  and `education-retail-support-insight`. The registry remains the identity
  source; the source-contract verifier is extended only enough to validate the
  new group field and preserve all existing GUIDE-03 mutations.
- **D-04:** Read each locale through `readGuideDocument()` and render the
  normalized body with the existing `MarkdownContent` parser. Keep the authored
  H1 in the route header while preserving the body’s headings, lists, tables,
  blockquotes, code fences, inline emphasis, and links. Preserve the source
  body bytes after the Phase 5 delivery-comment boundary; do not rewrite or
  translate article content.
- **D-05:** Render a `next/image` surface whenever a snapshot changes to
  `assetPolicy.status: required`, using its contained public path and authored
  alt text with responsive dimensions. Current approved records have no
  required asset (`none`, `requested-unapproved`, or the documented
  `source-exception`), so the initial release remains text-first while the
  required-asset path is real and verifier-backed for future approved records.
- **D-06:** Render a visible Home → Guide → article breadcrumb on every article,
  a localized hub return link, and a configured-internal-links section only for
  explicit `configuredInternalLinks` records. Resolve configured targets through
  the owned URL policy and keep source labels with no approved target out of the
  published link list. Never infer a URL from a delivery comment label; any
  future mapping must continue to pass the Phase 5 owned-target verifier.

### SEO and structured data graph
- **D-07:** Add Guide-specific canonical and alternate helpers that always emit
  exactly `zh-CN`, `en`, and `x-default` for the hub and each article. The
  Chinese target is `fastgpt.cn`, English and `x-default` target `fastgpt.io`,
  article alternates reuse the same slug, and the current page’s canonical is
  self-referencing. `openGraph.url` equals that canonical URL on both hubs and
  articles; localized title, description, keywords, locale, and article timing
  come from the same registry snapshot.
- **D-08:** Emit registry-derived JSON-LD with owned canonical URLs: each hub
  emits `CollectionPage`, `ItemList`, and `BreadcrumbList`; each article emits
  `Article`, `BreadcrumbList`, and `HowTo` when its approved schema tokens
  include `HowTo`. Schema graph nodes, card URLs, related/configured link URLs,
  and breadcrumb URLs are built from the same route helpers and registry entry.
- **D-09:** Extend the existing sitemap with the current variant’s one Guide
  hub plus exactly eight owned Guide article URLs, deduplicated through the
  existing `seenUrls` guard. Chinese builds enumerate the `zh` pair and English
  builds enumerate the `en` pair; no unowned locale or future phase route is
  added. Last-modified values may use the existing build-time source/stat policy
  without changing URL identity.

### the agent's Discretion
- Choose the concrete Guide component filenames and CSS module boundaries,
  preserving existing naming and light-theme patterns.
- Choose whether the Guide SEO helper lives in `src/lib/seo.ts` or a focused
  Guide SEO module, provided all callers use one implementation.
- Choose the smallest approved internal-link mappings available in the current
  route inventory; leave unavailable labels as source-only data and record the
  reason in plan/verification artifacts.
- Choose focused regression fixtures for route/static-param, metadata/alternate,
  schema, sitemap, and group coverage; keep them dependency-free and runnable
  with the repository's Node scripts.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project contract and phase scope
- `.planning/ROADMAP.md` §Phase 6 — goal, HUB-01/ARTICLE-01/02/03 and SEO-04/05/06/07 success criteria.
- `.planning/REQUIREMENTS.md` §Guide Visitor Experience and §Guide SEO Surface — normative requirements and out-of-scope boundaries.
- `.planning/PROJECT.md` — static-export, owned-domain, content-fidelity, reuse, and verification constraints.
- `.planning/STATE.md` — Phase 5 handoff decisions and Phase 6 current position.
- `AGENTS.md` — repository editing, validation, logging, language, and GSD workflow rules.

### Approved Guide source and route policy
- `/Users/longnv/Downloads/Week04/README.md` §5 — approved `/guide` topology and grouping direction.
- `/Users/longnv/Downloads/Week04/附-深度内容栏目路由与hreflang规格.md` — exact root routes, same-slug pairs, three hreflang targets, and sitemap/hub policy.
- `.planning/phases/05-guide-content-contract/05-CONTEXT.md` — locked source boundary, registry identity, asset policy, internal-link policy, and deferred rendering scope.
- `.planning/phases/05-guide-content-contract/05-RESEARCH.md` — verified eight-pair corpus facts and route/loader recommendations.
- `.planning/phases/05-guide-content-contract/05-01-SUMMARY.md` — typed registry and server-only reader handoff.
- `.planning/phases/05-guide-content-contract/05-04-SUMMARY.md` — verifier mutation contract and stable source checks.
- `src/content/guides/registry.json` — approved localized metadata, schema tokens, source directives, and slugs.
- `src/content/guides/registry.ts` — current typed registry/lookup boundary.
- `src/lib/guideContent.ts` — source-fidelity reader and normalized body boundary.

### Existing route, SEO, rendering, and verification patterns
- `src/lib/siteRouting.ts` — owned-domain URL and build-locale policy.
- `src/lib/seo.ts` — canonical/hreflang helper patterns.
- `src/app/sitemap.ts` — deduplicated sitemap assembly and current-variant ownership.
- `src/app/[lang]/compare/page.tsx` and `src/app/[lang]/compare/[slug]/page.tsx` — paired localized route/static-param adapters.
- `src/app/compare/page.tsx` and `src/app/compare/[slug]/page.tsx` — root default-locale aliases.
- `src/components/compare/ComparisonHubRoute.tsx` and `src/components/compare/ComparisonRoute.tsx` — server shell, metadata, breadcrumb, JSON-LD, and internal-link patterns.
- `src/components/tech-center/MarkdownContent.tsx` — authored Markdown block renderer for headings, lists, tables, code, blockquotes, and inline links.
- `src/components/tech-center/TechArticlePage.tsx` and `src/components/tech-center/TechArticlePage.module.css` — responsive long-form article layout and image surface.
- `src/components/JsonLd.tsx` — escaped JSON-LD script primitives and article/breadcrumb helpers.
- `scripts/verify-guide-content.js` and `scripts/verify-guide-content.test.js` — slug-specific source/asset/link verifier and isolated mutation style.
- `next.config.js` — static-export constraint and unoptimized image behavior.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `guideEntries`, `getGuideEntry()`, and `getGuideSource()` provide one typed identity surface for all eight pairs.
- `readGuideDocument()` returns the normalized authored body plus validated localized delivery metadata and source snapshot.
- `MarkdownContent` already renders every authored block type required by ARTICLE-01.
- `Navbar`, `Footer`, `HomeThemeFix`, `JsonLdScript`, and the comparison route shell provide existing page and accessibility patterns.
- `getOwnedLocalePath()`, `getOwnedLocaleUrl()`, `getBuildLocaleCodes()`, and `getPublishedLocaleCodes()` centralize domain ownership and static route policy.

### Established Patterns
- App Router route files stay thin; route components own rendering and metadata helpers own `Metadata` objects.
- Server components load filesystem-backed content at build time; client modules are limited to interactive leaves.
- Existing pages use `next/image` with authored alt text, `Metadata.alternates`, escaped JSON-LD, `dynamicParams = false`, and `seenUrls` sitemap deduplication.
- Verification uses Node built-ins, `node:test`, strict assertions, and concise English success/error logs.

### Integration Points
- Add Guide route adapters under `src/app/guide/` and `src/app/[lang]/guide/` without altering existing FAQ/compare/tech route ownership.
- Add Guide presentation/JSON-LD modules under `src/components/guide/` and reuse the existing Markdown/article styles where practical.
- Extend `src/lib/seo.ts` or add one Guide SEO helper consumed by route metadata and sitemap.
- Extend `src/content/guides/registry.*` only for publication group identity required by HUB-01; preserve source bytes and all Phase 5 validation behavior.
- Add one focused Phase 6 regression command to `package.json`; keep Phase 7 export verifier and Phase 8 deployment out of scope.

</code_context>

<specifics>
## Specific Ideas

- The hub uses three fixed groups named decision, implementation, and industry and displays exactly eight cards.
- `/guide` is intentionally unprefixed on both production domains; locale prefixes are route adapters for Next static generation and do not change the public canonical topology.
- The English GSC appendix remains outside the Guide registry and every authored body is preserved after the leading delivery comment is removed.
- Current image directives are source data only; no invented or placeholder image should enter the launch release.
- Existing source labels remain explicit metadata until an approved owned target exists; visible navigation must expose only configured mappings.

</specifics>

<deferred>
## Deferred Ideas

- Same-slug language switcher (ARTICLE-04), client-side hub search/filtering (HUB-02), CMS workflow, additional Guide articles, and programmatic reference-page publishing remain future work.
- Dual-variant case-sensitive export matrix and initial-JavaScript budget belong to Phase 7.
- Immutable artifacts, deployment, cache purge, rollback, and live HTTP verification belong to Phase 8.
- The unrelated existing `/compare` hreflang gap stays outside Phase 6 scope.

</deferred>

---

*Phase: 6-Guide Hubs, Articles & SEO Graph*
*Context gathered: 2026-08-17*
