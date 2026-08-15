# Phase 3: Coherent SEO Graph - Context

**Gathered:** 2026-08-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Make every published FAQ detail page and discovery surface consume one canonical FAQ identity. This phase covers record identity in H1 and FAQ JSON-LD, self-referencing canonical URLs, published English/Simplified Chinese alternates, canonical slug use in lists/related links/static parameters/sitemaps, legacy-alias exclusion, URL de-duplication, and build-time route coverage. Phase 4 owns redirect projection, the release-wide verification command, and final release operations.

</domain>

<decisions>
## Implementation Decisions

### FAQ identity and rendered schema
- **D-01:** Treat the Phase 1 English route registry's durable `contentId` as the cross-locale FAQ identity. Resolve an incoming English canonical slug to its `contentId` before selecting translated content; keep authored `Question`, `Answers`, and `Category` in the locale catalog as the content source.
- **D-02:** Drive the detail-page H1, the FAQ JSON-LD `Question.name`, the breadcrumb leaf label, and related-card question text from the same resolved `FaqItem.Question`. Use the resolved item's `Answers` for the FAQ JSON-LD accepted answer. Metadata titles and descriptions remain presentation metadata and never become the page identity.
- **D-03:** Keep locale route keys explicit: English public FAQ paths use the registry `canonicalSlug`, while Simplified Chinese paths use the translated record's durable `contentId` key. A cross-locale alternate must translate the identity to the target locale's route key before building its URL. This closes the repaired-English-slug to Chinese-content-key mismatch observed in the current `getFaqAlternates` path.

### Canonical and alternate URL policy
- **D-04:** Compute canonical and alternate URLs through the owned URL helpers and one FAQ-specific identity adapter. The current page's canonical is the exact public path for its locale route key, including preserved mixed-case canonical slugs. English resolves to `https://fastgpt.io/faq/<canonicalSlug>` and Simplified Chinese resolves to `https://fastgpt.cn/faq/<contentId>`; default locale paths remain unprefixed.
- **D-05:** Emit only published FAQ counterparts from `faqPublishedLocaleCodes` (`en` and `zh`) when the same durable `contentId` exists in that locale. The language map uses `en`, `zh-CN`, and `x-default`; `x-default` points to the published English URL. Keep the current locale entry present, omit an unavailable counterpart, and omit `x-default` when no English counterpart is published. This prevents synthetic hreflang URLs that resolve to 404 pages while keeping the valid three-way pairing for bilingual records.
- **D-06:** Make root and default-locale aliases resolve to the same owner-domain canonical URL. `/en/faq` and `/zh/faq` remain migration/alias surfaces for the later redirect phase; they never become canonical or alternate targets in this phase.

### Discovery surfaces and sitemap semantics
- **D-07:** Use the committed route registry and locale catalogs as the sole final-slug source for FAQ lists, related links, static parameters, breadcrumb links, and sitemap detail entries. English list/related IDs may be content IDs or canonical slugs at internal boundaries, but `getFaqPath` must normalize them through the registry before emitting a public path. Chinese list/related IDs remain translated content keys.
- **D-08:** Build the FAQ sitemap from published locale catalogs on the owning site variant, adding one root FAQ URL and one detail URL per final route. De-duplicate by exact absolute URL, preserve distinct case-sensitive canonical paths, and exclude every `sourceSlug`, `legacySources`, collision-ledger alias, prefixed default-locale alias, and redirect-only path. `x-default` is an alternate link value, not a separate sitemap entry.

### Build-time coverage and failure policy
- **D-09:** Keep `dynamicParams = false` and generate static parameters from the final locale route IDs. The `io` build must cover all English registry canonical slugs; the `cn` build must cover all published Simplified Chinese content IDs. Cross-domain alternates may point to the counterpart build, while each build's sitemap contains only its owner-domain FAQ routes.
- **D-10:** Fail closed for an unknown canonical slug, a missing locale route key, an unresolved content identity, or a duplicate canonical URL. A missing translated counterpart removes that alternate and leaves the current page renderable; it never falls back to a guessed slug or emits a broken URL. Record-level diagnostics belong in the Phase 3 SEO graph verifier, with the aggregate release gate deferred to Phase 4.

### the agent's Discretion
- Choose the smallest typed helper/API shape for contentId-to-locale route-key resolution while preserving the existing `siteRouting`, `localizedRoutes`, and `seo` ownership boundaries.
- Reuse the existing `FAQJsonLd`, `BreadcrumbJsonLd`, `getFaqData`, `getFaqItem`, `getFaqIds`, `getFaqPath`, `getOwnedFaqUrl`, and `sitemap()` patterns; add no package or runtime network dependency.
- Choose verifier fixture records that exercise one preserved mixed-case slug, one repaired lowercase slug, one bilingual contentId, and one unavailable-counterpart case when such a record exists.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project scope and Phase 3 acceptance
- `.planning/PROJECT.md` — static-export, URL-stability, SEO-integrity, content-fidelity, and verification constraints.
- `.planning/REQUIREMENTS.md` §SEO Surface — SEO-01, SEO-02, and SEO-03 acceptance requirements; URL-04 and VERIFY-01/02/03 remain in Phase 4.
- `.planning/ROADMAP.md` §Phase 3: Coherent SEO Graph — phase boundary, success criteria, dependencies, and deferred release work.
- `.planning/STATE.md` — Phase 3 planning position and the known English-to-Chinese alternate concern.

### Prior route identity and metadata decisions
- `.planning/phases/01-canonical-faq-routes/01-CONTEXT.md` — durable `contentId`, safe mixed-case preservation, repaired-slug policy, and collision no-redirect boundary.
- `.planning/phases/01-canonical-faq-routes/01-01-SUMMARY.md` — registry counts, route wiring, static parameters, and generated artifact contract.
- `.planning/phases/01-canonical-faq-routes/01-VERIFICATION.md` — verified URL-01/02/03 evidence and canonical route coverage.
- `.planning/phases/02-approved-metadata/02-CONTEXT.md` — contentId-keyed metadata overlay, authored-field protection, and Phase 3 handoff.
- `.planning/phases/02-approved-metadata/02-01-SUMMARY.md` — metadata artifact and route-aware verification patterns.
- `.planning/phases/02-approved-metadata/02-VERIFICATION.md` — approved metadata, H1/FAQ JSON-LD source checks, and case-sensitive export evidence.
- `src/faq/generated-en-route-registry.json` — final English `contentId`/`canonicalSlug` records, route status, legacy sources, and collision dispositions.
- `src/faq/english-route-evidence.json` — online URL evidence used to preserve or repair English paths.
- `src/faq/generated-en-metadata.json` — approved metadata keyed independently of public slugs.

### FAQ content, locale ownership, and SEO code
- `src/faq/index.ts` — English canonical-slug lookup, Chinese content-key lookup, translation-locale detection, and catalog exports.
- `src/faq/en.ts` — authored English questions, answers, categories, and legacy keys.
- `src/faq/zh.ts` — published Simplified Chinese records keyed by durable content IDs.
- `src/lib/siteRouting.ts` — owner domains, locale hreflang values, unprefixed default-locale paths, and absolute URL helpers.
- `src/lib/localizedRoutes.ts` — FAQ path normalization and default-locale route behavior.
- `src/lib/seo.ts` — current canonical/alternate helper contracts and the FAQ alternate integration point.
- `src/lib/locales.ts` — locale normalization and manifest-derived `en`/`zh-CN` values.
- `src/lib/publishedLocales.ts` — published FAQ locale boundary (`en`, `zh`).
- `src/app/[lang]/faq/[id]/page.tsx` — detail H1, FAQ JSON-LD, breadcrumbs, related links, metadata, and static params.
- `src/app/[lang]/faq/page.tsx` — FAQ list data, list schema, links, metadata, and static params.
- `src/app/faq/[id]/page.tsx` — root default-locale detail alias and static params.
- `src/app/faq/page.tsx` — root FAQ list alias.
- `src/app/sitemap.ts` — sitemap enumeration, URL de-duplication, locale ownership, and FAQ route input.
- `src/components/faq/FAQList.tsx` — client list identity/key propagation.
- `src/components/faq/FAQCard.tsx` — list and related-link path generation.
- `src/components/JsonLd.tsx` — FAQ and breadcrumb JSON-LD serialization.

### Verification and external source evidence
- `scripts/verify-faq-routes.js` — registry/cardinality/route invariant assertions.
- `scripts/verify-faq-metadata.js` — record-level source and exported HTML identity checks.
- `scripts/verify-p2.js` — static-export canonical/metadata verification and registry-backed sample resolution.
- `scripts/verify-i18n-seo.js` — existing cross-domain canonical, hreflang, redirect, and sitemap assertions to align with the final graph.
- `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md` — observed unprefixed FAQ paths, owner-site split, and 1,195 online URL authority.
- `/Users/longnv/bin/repo/fastgpt-data/Week04/存量修复-补Meta第2批/FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx` — `FAQ Data` online URL evidence and published metadata rows.
- `/Users/longnv/bin/repo/fastgpt-data/W3-深度内容与FAQ61-90-20260803/存量核查/FastGPT-存量FAQ修复验收清单-V1.1-星触达-20260814.md` — historical route-identity, collision, canonical, and hreflang acceptance evidence.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `generated-en-route-registry.json` covers all 1,400 English records (786 preserved mixed-case routes and 614 repaired lowercase routes) and is already consumed by `src/faq/index.ts`.
- `src/faq/index.ts` exposes canonical English lookup, locale catalogs, translation-locale detection, and static-ID enumeration; it is the natural identity adapter boundary.
- `siteRouting.ts`, `localizedRoutes.ts`, and `seo.ts` centralize owner-domain URLs, default-locale path rules, hreflang labels, and metadata alternates.
- `FAQJsonLd` and `BreadcrumbJsonLd` already serialize route-level structured data from supplied question/answer/URL values.
- `sitemap.ts`, `verify-faq-routes.js`, `verify-faq-metadata.js`, and `verify-i18n-seo.js` establish deterministic set assertions and record-level failure logs.

### Established Patterns
- Static App Router routes use `generateStaticParams` and `dynamicParams = false`; route data must be committed and build-time available.
- Root aliases delegate to localized implementations, so the default-locale canonical target must be computed once and remain stable across both entry points.
- Locale ownership is manifest-driven: English belongs to `fastgpt.io`, Simplified Chinese belongs to `fastgpt.cn`, and both default paths are unprefixed.
- Generated JSON artifacts are deterministic, sorted, and consumed without workbook/network access during rendering.
- FAQ cards and related links are server-generated path strings passed into a client list, so route normalization belongs before rendering.

### Integration Points
- The detail route currently resolves `faqItem` by locale but passes one `faqId` to every alternate URL; repaired English slugs therefore require a contentId-to-target-locale route-key adapter.
- The detail H1 and `FAQJsonLd` both receive `faqItem` fields and should remain coupled through one resolved item, while metadata and breadcrumb URLs use the same canonical identity.
- The sitemap currently enumerates `getFaqIds(locale)` and de-duplicates exact URLs; Phase 3 must make the registry/catalog source and legacy-alias exclusion explicit.
- The build matrix derives locale params from `getBuildLocaleCodes()`; an `io` export covers English FAQ routes and a `cn` export covers Simplified Chinese FAQ routes, with alternates crossing domains.

</code_context>

<specifics>
## Specific Ideas

- Preserve every healthy mixed-case English canonical slug exactly; repaired routes remain lowercase ASCII and are already committed in the Phase 1 registry.
- Treat the Chinese counterpart URL as a route-key conversion problem: a repaired English canonical slug points to the same contentId in `zh.ts`, not to the English slug string.
- Keep canonical and alternate paths unprefixed on their owner domains, matching the Week04 observation that `/en/faq/*` and `/zh/faq/*` are migration addresses.
- Verify one canonical sitemap URL per final route with exact absolute URL de-duplication and zero legacy aliases.

</specifics>

<deferred>
## Deferred Ideas

- URL-04 redirect projection for changed legacy paths and collision-ledger entries belongs to Phase 4.
- The aggregate `VERIFY-01` command, full static release gate (`VERIFY-02`), and exported-HTML release audit (`VERIFY-03`) belong to Phase 4; Phase 3 supplies focused SEO-graph evidence for them to consume.
- Adding missing translations, rewriting FAQ questions/answers, changing metadata policy, historical FAQ-body recovery, live deployment, and crawl monitoring remain outside this phase.

</deferred>

---

*Phase: 03-Coherent SEO Graph*
*Context gathered: 2026-08-16*
