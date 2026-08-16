# Phase 3: Coherent SEO Graph - Research

**Researched:** 2026-08-16
**Domain:** Next.js App Router static FAQ SEO graph
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Use the Phase 1 route registry `contentId` as the cross-locale FAQ identity.
- Drive the detail H1, FAQ JSON-LD question, breadcrumb leaf, and related-card question from one resolved `FaqItem.Question`; use the same item's `Answers` in FAQ JSON-LD.
- English route keys use `canonicalSlug`; Simplified Chinese route keys use translated durable `contentId` values.
- Build canonical and alternate URLs through owned URL helpers, preserving mixed-case English paths and unprefixed owner-domain defaults.
- Emit only published `en`/`zh` counterparts; `x-default` points to English when published, and unavailable counterparts are omitted.
- Lists, related links, static params, breadcrumbs, and sitemaps consume committed final route IDs; legacy aliases stay out of discovery surfaces.
- Sitemap URLs are de-duplicated by exact absolute URL while preserving distinct case-sensitive canonical paths.
- `io` static exports cover English canonical slugs; `cn` static exports cover Chinese content IDs; unknown identities fail closed.

### the agent's Discretion
- Choose the smallest typed contentId-to-locale route-key helper and verifier fixtures.
- Reuse existing FAQ catalogs, route helpers, JSON-LD, sitemap, and verifier patterns without dependencies or network reads.

### Deferred Ideas (OUT OF SCOPE)
- Phase 4 redirect projection and collision-ledger redirects.
- Phase 4 aggregate verification, release build gate, and exported-HTML release audit.
- New translations, authored FAQ rewrites, metadata policy changes, historical body recovery, deployment, and crawl monitoring.

</user_constraints>

<architectural_responsibility_map>
## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|--------------|----------------|-----------|
| FAQ identity resolution | Frontend Server | CDN/Static | App Router server components resolve committed catalogs at build time. |
| Canonical/hreflang metadata | Frontend Server | CDN/Static | `generateMetadata` serializes absolute owner-domain URLs into static HTML. |
| H1 and FAQ JSON-LD identity | Frontend Server | CDN/Static | Detail route and `FAQJsonLd` consume the same resolved `FaqItem`. |
| Lists, related links, static params | Frontend Server | Browser/Client | Server passes final paths into the client FAQ list/cards. |
| Sitemap enumeration | CDN/Static | Frontend Server | `src/app/sitemap.ts` emits the owner-site URL set during static export. |
| Route/SEO graph verification | CDN/Static | Frontend Server | Node verifiers inspect committed registries and optional `out/` HTML. |

</architectural_responsibility_map>

<research_summary>
## Summary

The repository already has the required source-of-truth layers: a 1,400-record English route registry, 1,400 Chinese records keyed by durable content IDs, owner-domain URL helpers, App Router static parameters, FAQ JSON-LD, and a sitemap de-duplication set. Phase 3 should add one explicit identity adapter that accepts either a canonical English slug or a durable content ID, resolves the content ID, and emits the route key required by the target locale.

The principal correctness risk is cross-locale URL reuse. `getFaqTranslationLocales` already resolves an English slug to a content ID, while `getFaqAlternates` currently passes the original `faqId` to every locale URL. Repaired English slugs therefore can generate Chinese alternate paths that do not exist in `zh.ts`. The route metadata, breadcrumb, related-link, static-param, and sitemap consumers should all reuse the same adapter and fail closed when a target catalog lacks the durable ID.

**Primary recommendation:** extend the existing FAQ index/SEO boundary with a typed contentId-to-locale route-key resolver, then verify SEO-01/02/03 from source and owner-site exports across both `io` and `cn` build variants.
</research_summary>

<standard_stack>
## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.2.6 | `generateMetadata`, static params, `MetadataRoute.Sitemap`, static export | Existing application runtime and build contract. |
| TypeScript | 5.9.3 | Typed route/catalog adapters and strict compile checks | Existing strict project configuration. |
| Node.js built-ins | >=18 | Registry/sitemap/HTML verification scripts | Existing dependency-free verifier pattern. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React JSON-LD serializers | repository `JsonLd.tsx` | FAQPage and BreadcrumbList output | Reuse existing server component serializer. |
| `siteRouting` helpers | repository module | owner domains, locale hreflang, unprefixed paths | Every canonical/alternate URL. |
| `MetadataRoute.Sitemap` | Next.js | static sitemap output | Keep sitemap entries typed and build-time. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Registry-backed adapter | Rebuild slugs from Question | Creates drift from Phase 1 and breaks preserved mixed-case URLs. |
| Existing `Metadata` alternates | Hand-written `<link>` tags | Duplicates Next metadata behavior and host/locale policy. |
| Node verifier | New test framework | Adds a dependency for checks already covered by repository scripts. |

**Installation:** None. Reuse the current repository and Node tooling.
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### System Architecture Diagram

```text
route param (English canonicalSlug or Chinese contentId)
          |
          v
FAQ identity adapter -> durable contentId -> target locale route key
          |                                  |
          +--> FaqItem.Question/Answers       +--> owned absolute URL
          |        |                           |
          |        +--> H1 + FAQ JSON-LD       +--> canonical + alternates
          |        +--> breadcrumb/related     +--> list/static params/sitemap
          |
          +--> source verifier + io/cn export verifier
```

### Pattern 1: Resolve identity before rendering
**What:** Convert an incoming English canonical slug through the Phase 1 registry before reading the locale catalog. For Chinese, require the content ID key in `faq.ts`.
**When to use:** Detail routes, metadata generation, alternates, breadcrumbs, and any cross-locale link.
**Example:** `resolveEnglishFaqContentId(canonicalSlug)` → `contentId`; `getFaqItem(contentId, 'zh')` → translated item.

### Pattern 2: Build URLs through ownership helpers
**What:** Pass a locale-specific route key to `getOwnedFaqUrl`/`getFaqPath`; let `siteRouting` select `fastgpt.io` or `fastgpt.cn` and suppress default-locale prefixes.
**When to use:** Metadata, breadcrumbs, list cards, related cards, sitemap entries, and tests.
**Example:** English `canonicalSlug` and Chinese `contentId` each become `/faq/<key>` on their owner domain.

### Pattern 3: Verify source and export sets
**What:** Use committed registry/catalog cardinality checks plus optional `out/` HTML inspection. Compare exact absolute URL sets and parse canonical/hreflang/JSON-LD values.
**When to use:** Every Phase 3 regression command and both owner-site build variants.
**Example:** 1,400 English routes in `io/out/faq`, 1,400 Chinese routes in `cn/out/faq`, and no source/legacy alias appears in sitemap URLs.

### Anti-Patterns to Avoid
- **Passing one `faqId` to all locales:** repaired English slugs are not guaranteed Chinese route keys.
- **Hand-building canonical URLs:** bypasses owner domains, hreflang labels, and default-prefix rules.
- **Using legacySources in discovery:** makes redirects and aliases indexable and creates duplicate sitemap semantics.
- **Relying on runtime fallback for static routes:** `dynamicParams=false` requires every final key in `generateStaticParams`.

</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale/domain URL construction | String concatenation for hosts and prefixes | `getOwnedFaqUrl`, `getOwnedLocaleUrl`, `getLocaleHreflang` | Manifest ownership and unprefixed defaults are already centralized. |
| English slug allocation | New slugifier or title-derived route map | `generated-en-route-registry.json` and `getEnglishFaqCanonicalSlug` | Preserved mixed-case and repaired routes are committed contract data. |
| FAQ schema escaping | Inline JSON string concatenation | `FAQJsonLd`/`JsonLdScript` | Existing escaping protects `<` and normalizes answer whitespace. |
| Sitemap XML serialization | Manual XML output | `MetadataRoute.Sitemap` return values | Next static export owns XML serialization and escaping. |

**Key insight:** Phase 1 and the locale manifest already encode the irreversible URL decisions; Phase 3 should compose those registries rather than recreate them.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Repaired English slug used for Chinese alternate
**What goes wrong:** The Chinese page key is a durable content ID, so an alternate built from the English canonical slug resolves to 404.
**Why it happens:** `getFaqAlternates` currently receives only a string ID and passes it unchanged to each locale URL.
**How to avoid:** Resolve canonical slug → content ID once, check target locale presence, and build the locale route key per catalog.
**Warning signs:** `zh-CN` URL differs from `getFaqIds('zh')`; exported `cn/out/faq/<english-repaired-slug>.html` is missing.

### Pitfall 2: Default-locale aliases become canonical or sitemap entries
**What goes wrong:** `/en/faq/*` or `/zh/faq/*` duplicates the unprefixed owner route and competes with a later redirect.
**Why it happens:** A generic locale loop includes the default locale prefix or legacy registry `sourceSlug` values.
**How to avoid:** Build canonical/sitemap sets from final locale IDs and `getOwnedFaqUrl`; keep alias projection in Phase 4.
**Warning signs:** Sitemap contains both `https://fastgpt.io/faq/x` and `https://fastgpt.io/en/faq/x`.

### Pitfall 3: Partial alternate map silently drops valid current language
**What goes wrong:** A helper returns only `canonical` when fewer than two locales are found, losing a valid `en`/`zh-CN` self entry or `x-default`.
**Why it happens:** Current `getFaqAlternates` uses a translated-locale count gate before constructing languages.
**How to avoid:** Always include the current published locale; add `x-default` whenever English exists; omit only missing counterpart keys.
**Warning signs:** A bilingual page's HTML has no `hreflang="en"`, `hreflang="zh-CN"`, or `x-default` despite both records existing.

### Pitfall 4: Case-insensitive de-duplication changes preserved paths
**What goes wrong:** Healthy mixed-case paths are collapsed or silently omitted from a case-insensitive set.
**Why it happens:** URL uniqueness is normalized with `.toLowerCase()` even though Phase 1 preserves case-sensitive public paths.
**How to avoid:** De-duplicate exact absolute URLs and validate export on a case-sensitive host; keep local filesystem diagnostics explicit.
**Warning signs:** 786 preserved routes shrink in sitemap/static coverage or two distinct registry records share one output file.
</common_pitfalls>

<code_examples>
## Code Examples

### Resolve a cross-locale route key
```ts
const contentId = resolveEnglishFaqContentId(inputId) ?? inputId;
const routeKey = locale === 'en' ? getEnglishFaqCanonicalSlug(contentId) : contentId;
const item = routeKey ? getFaqItem(routeKey, locale) : undefined;
```

### Build an owned FAQ URL
```ts
const url = getOwnedFaqUrl(locale, routeKey);
```

### Assert exact sitemap URL uniqueness
```js
const seen = new Set();
for (const entry of sitemapEntries) {
  assert(!seen.has(entry.url), `Duplicate canonical sitemap URL: ${entry.url}`);
  seen.add(entry.url);
}
```
</code_examples>

<sota_updates>
## State of the Art (2024-2025)

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Runtime-generated route sets | Committed build-time registries with static params | Existing Phase 1/Next static-export contract | Deterministic output and fail-closed missing routes. |
| One host-local canonical | Owner-domain canonical plus reciprocal hreflang | Existing site-routing manifest and Week04 path policy | Cross-domain locale pairing stays explicit. |
| Sitemap entries assembled independently | Sitemap sourced from the same final route registry as links | Phase 3 requirement | Eliminates duplicate/legacy URL drift. |

**New tools/patterns to consider:** none; repository-native helpers satisfy the scope.

**Deprecated/outdated:** source-slug reconstruction and prefixed default-locale FAQ targets are outside the final graph.
</sota_updates>

<open_questions>
## Open Questions

1. **How should a future untranslated locale be added?**
   - What we know: Phase 3 publishes only `en` and `zh`; the manifest contains other site locales without FAQ catalogs.
   - What's unclear: Whether a future FAQ batch will use content IDs, translated slugs, or a new registry.
   - Recommendation: Keep the adapter keyed by locale and catalog presence; add a locale-specific route key only with an explicit content registry in a later phase.

2. **How should case-sensitive exports run on developer macOS volumes?**
   - What we know: Phase 2 proved the full HTML set on a case-sensitive APFS image and diagnosed collisions on the default volume.
   - What's unclear: CI host availability for each owner-site build.
   - Recommendation: Keep source checks host-independent and run export coverage on a case-sensitive CI/release host; preserve diagnostics for local runs.

</open_questions>

<sources>

### Primary (HIGH confidence)
- `.planning/phases/03-coherent-seo-graph/03-CONTEXT.md` — locked D-01 through D-10 decisions.
- `src/faq/index.ts`, `src/lib/seo.ts`, `src/lib/siteRouting.ts`, `src/lib/localizedRoutes.ts` — current identity and URL behavior.
- `src/app/[lang]/faq/[id]/page.tsx`, `src/app/[lang]/faq/page.tsx`, `src/app/sitemap.ts`, `src/components/JsonLd.tsx` — current rendering and discovery graph.
- `src/faq/generated-en-route-registry.json`, `src/faq/en.ts`, `src/faq/zh.ts` — committed route/catalog source data.
- `.planning/phases/01-canonical-faq-routes/01-VERIFICATION.md` and `.planning/phases/02-approved-metadata/02-VERIFICATION.md` — prior static/export evidence.
- `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md` — unprefixed FAQ path and owner-site policy.

### Secondary (MEDIUM confidence)
- `scripts/verify-i18n-seo.js`, `scripts/verify-p2.js`, `scripts/verify-faq-routes.js` — existing verifier conventions and stale sample risks.
- `/Users/longnv/bin/repo/fastgpt-data/W3-深度内容与FAQ61-90-20260803/存量核查/FastGPT-存量FAQ修复验收清单-V1.1-星触达-20260814.md` — route-identity and hreflang acceptance evidence.

### Tertiary (LOW confidence - needs validation during implementation)
- None. All decisions are grounded in repository artifacts and committed evidence.

</sources>

<metadata>
## Metadata

**Research scope:**
- Core technology: Next.js App Router metadata/static export
- Ecosystem: existing siteRouting, FAQ catalogs, JSON-LD, sitemap, Node verifiers
- Patterns: contentId identity, locale route-key conversion, owner-domain canonical/hreflang
- Pitfalls: repaired-slug alternates, aliases, case-sensitive routes, static coverage

**Confidence breakdown:**
- Standard stack: HIGH - existing package and route architecture.
- Architecture: HIGH - source and prior verification directly expose the data flow.
- Pitfalls: HIGH - repaired slug and filesystem behaviors are recorded in Phase 1/2 evidence.
- Code examples: HIGH - examples use existing repository exports and test conventions.

**Research date:** 2026-08-16
**Valid until:** 2026-09-15
</metadata>

---

*Phase: 03-coherent-seo-graph*
*Research completed: 2026-08-16*
*Ready for planning: yes*
