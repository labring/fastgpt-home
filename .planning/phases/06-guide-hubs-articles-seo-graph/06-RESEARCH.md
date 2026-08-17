# Phase 6: Guide Hubs, Articles & SEO Graph - Research

**Researched:** 2026-08-17  
**Domain:** Static Next.js App Router Guide publishing, canonical SEO graph, and structured data  
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Route topology and locale ownership
- **D-01:** Publish the Guide hub and article at root `/guide` and `/guide/<slug>` on each owned domain, with localized `[lang]/guide` route adapters and root aliases delegating to the build's default locale. `zh` owns `fastgpt.cn`; `en` owns `fastgpt.io`; both use the same lower-case slug. Static parameters are filtered from `getBuildLocaleCodes()` and the eight entries in the Phase 5 registry, with `dynamicParams = false`. Route and URL construction uses `getOwnedLocalePath()`/`getOwnedLocaleUrl()` so root aliases, metadata, breadcrumbs, cards, links, and sitemaps share one path policy.
- **D-02:** Keep the Guide route shell server-rendered and self-contained like the existing comparison and technical-center surfaces: localized dictionary, `Navbar`, `Footer`, `HomeThemeFix`, and `MarkdownContent` remain the reusable building blocks. Add Guide-specific route/presentation modules only for the hub grouping and article/link semantics; keep client state out of the fixed eight-card launch catalog.

#### Hub taxonomy and authored rendering
- **D-03:** Add a registry-backed publication group for every slug and render exactly three server-rendered hub groups: decision, implementation, and industry. The launch grouping is decision for `saas-platform-enterprise-gaps`, `self-build-three-year-tco`, `server-sizing-guide`, and `complex-doc-golden-set`; implementation for `support-bot-four-steps`; and industry for `manufacturing-itops-invoice-audit`, `pharma-compliance-docs`, and `education-retail-support-insight`. The registry remains the identity source; the source-contract verifier is extended only enough to validate the new group field and preserve all existing GUIDE-03 mutations.
- **D-04:** Read each locale through `readGuideDocument()` and render the normalized body with the existing `MarkdownContent` parser. Keep the authored H1 in the route header while preserving the body’s headings, lists, tables, blockquotes, code fences, inline emphasis, and links. Preserve the source body bytes after the Phase 5 delivery-comment boundary; do not rewrite or translate article content.
- **D-05:** Render a `next/image` surface whenever a snapshot changes to `assetPolicy.status: required`, using its contained public path and authored alt text with responsive dimensions. Current approved records have no required asset (`none`, `requested-unapproved`, or the documented `source-exception`), so the initial release remains text-first while the required-asset path is real and verifier-backed for future approved records.
- **D-06:** Render a visible Home → Guide → article breadcrumb on every article, a localized hub return link, and a configured-internal-links section only for explicit `configuredInternalLinks` records. Resolve configured targets through the owned URL policy and keep source labels with no approved target out of the published link list. Never infer a URL from a delivery comment label; any future mapping must continue to pass the Phase 5 owned-target verifier.

#### SEO and structured data graph
- **D-07:** Add Guide-specific canonical and alternate helpers that always emit exactly `zh-CN`, `en`, and `x-default` for the hub and each article. The Chinese target is `fastgpt.cn`, English and `x-default` target `fastgpt.io`, article alternates reuse the same slug, and the current page’s canonical is self-referencing. `openGraph.url` equals that canonical URL on both hubs and articles; localized title, description, keywords, locale, and article timing come from the same registry snapshot.
- **D-08:** Emit registry-derived JSON-LD with owned canonical URLs: each hub emits `CollectionPage`, `ItemList`, and `BreadcrumbList`; each article emits `Article`, `BreadcrumbList`, and `HowTo` when its approved schema tokens include `HowTo`. Schema graph nodes, card URLs, related/configured link URLs, and breadcrumb URLs are built from the same route helpers and registry entry.
- **D-09:** Extend the existing sitemap with the current variant’s one Guide hub plus exactly eight owned Guide article URLs, deduplicated through the existing `seenUrls` guard. Chinese builds enumerate the `zh` pair and English builds enumerate the `en` pair; no unowned locale or future phase route is added. Last-modified values may use the existing build-time source/stat policy without changing URL identity.

### the agent's Discretion
- Choose the concrete Guide component filenames and CSS module boundaries, preserving existing naming and light-theme patterns.
- Choose whether the Guide SEO helper lives in `src/lib/seo.ts` or a focused Guide SEO module, provided all callers use one implementation.
- Choose the smallest approved internal-link mappings available in the current route inventory; leave unavailable labels as source-only data and record the reason in plan/verification artifacts.
- Choose focused regression fixtures for route/static-param, metadata/alternate, schema, sitemap, and group coverage; keep them dependency-free and runnable with the repository's Node scripts.

### Deferred Ideas (OUT OF SCOPE)
- Same-slug language switcher (ARTICLE-04), client-side hub search/filtering (HUB-02), CMS workflow, additional Guide articles, and programmatic reference-page publishing remain future work.
- Dual-variant case-sensitive export matrix and initial-JavaScript budget belong to Phase 7.
- Immutable artifacts, deployment, cache purge, rollback, and live HTTP verification belong to Phase 8.
- The unrelated existing `/compare` hreflang gap stays outside Phase 6 scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|---|---|---|
| HUB-01 | `/guide` on both owned domains lists exactly eight localized cards in decision, implementation, and industry groups. | Make one registry group field the card order/group source; use root aliases for canonical hub URLs and server components for all rendering. |
| ARTICLE-01 | Every owned `/guide/<slug>` renders approved localized H1 and full body. | `readGuideDocument()` is a strict server-only body reader; `MarkdownContent` supports the authored feature set found in all 16 documents. |
| ARTICLE-02 | Breadcrumb, hub return, and configured internal links resolve to canonical owned destinations. | Build visible links and JSON-LD URLs through `getOwnedLocalePath()` / `getOwnedLocaleUrl()`; render only explicit mappings. |
| ARTICLE-03 | Every required approved image uses the responsive image surface and authored alt text. | Model the conditional `assetPolicy.status === 'required'` branch with `next/image`; the current corpus has zero required assets. |
| SEO-04 | Hub/articles emit localized metadata, self canonical, and matching Open Graph URL. | One Guide metadata helper should read each localized snapshot and set `openGraph.url` to its canonical output. |
| SEO-05 | Hub/articles emit reciprocal `zh-CN`, `en`, and `x-default` alternates. | A focused Guide helper can produce the fixed pair independently of the broader site locale set. |
| SEO-06 | Articles emit article/breadcrumb schemas; hubs emit collection/item-list/breadcrumb schemas. | Reuse `JsonLdScript` and `BreadcrumbJsonLd`; compose Guide-specific `@graph` nodes from the registry. |
| SEO-07 | Sitemap, cards, static params, schemas, breadcrumbs, and links derive from the same registry. | Reuse current sitemap `seenUrls`, `guideEntries`, `guideSlugs`, and owned URL helpers; cover this graph in one focused Node regression command. |
</phase_requirements>

## Summary

Phase 6 is a small publication layer over the completed Phase 5 contract: add a group identity to each registry entry, thin App Router adapters for the root and localized routes, server-rendered Guide hub/article modules, and a single Guide URL/metadata/schema surface. The registry already guarantees eight lower-case slugs and paired source snapshots; `readGuideDocument()` reads approved bytes only from the committed source boundary. [VERIFIED: src/content/guides/registry.ts:111-142] [VERIFIED: src/lib/guideContent.ts:99-125]

The public canonical route must remain root `/guide` and `/guide/<slug>` on its owning domain. `getOwnedLocalePath()` deliberately emits root paths for `en` and `zh`, while `getBuildLocaleCodes()` returns only non-default published locales or the default locale. On an io build this list contains non-English site locales, so the Guide adapter needs an intersection with the exact registry locale union and a default-locale fallback; otherwise it creates route parameters with no Guide source. `dynamicParams = false` then makes the static inventory authoritative. [VERIFIED: src/lib/siteRouting.ts:32-69] [VERIFIED: src/content/guides/registry.ts:3-5] [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-static-params]

The most durable SEO design uses a Guide-specific helper rather than the generic `getAlternates()`: the generic helper derives every globally supported locale, while D-07 requires exactly the bilingual triad. The helper should return absolute, self-referencing canonical URLs and the exact bilingual language map once; route metadata, schema nodes, hub cards, breadcrumbs, configured links, and sitemap assembly consume it. Google recommends a self-referential canonical, same-language canonical with hreflang, absolute canonical URLs, and consistent canonical internal links and sitemap signals. [VERIFIED: src/lib/seo.ts:46-68] [CITED: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls] [CITED: https://developers.google.com/search/docs/advanced/crawling/localized-versions]

**Primary recommendation:** Build one dependency-free `guideRoutes`/SEO projection from `guideEntries`, then use it in four thin route adapters, Guide presentation modules, sitemap assembly, and one focused Node regression verifier.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|---|---|---|---|
| Static Guide route inventory and `notFound()` behavior | Frontend Server (SSR) | CDN / Static | App Router parameters and production static export determine every generated page. [VERIFIED: src/app/[lang]/compare/[slug]/page.tsx:17-33] [VERIFIED: next.config.js:2-9] |
| Registry identity, source body, group and link policy | API / Backend | Database / Storage | TypeScript registry plus server-only filesystem reader own approved, build-time data. [VERIFIED: src/content/guides/registry.ts:111-142] [VERIFIED: src/lib/guideContent.ts:114-125] |
| Hub cards, article header/body, breadcrumbs, required image | Frontend Server (SSR) | Browser / Client | The fixed launch catalog needs no client state; server components can render the existing reusable shell and Markdown blocks. [VERIFIED: src/components/compare/ComparisonHubRoute.tsx:22-83] [VERIFIED: src/components/tech-center/MarkdownContent.tsx:208-279] |
| Canonical, alternates, Open Graph, JSON-LD, sitemap URLs | Frontend Server (SSR) | CDN / Static | Metadata and sitemap execute at build time and must share owned-domain path policy. [VERIFIED: src/lib/siteRouting.ts:53-69] [VERIFIED: src/app/sitemap.ts:17-75] |
| Asset bytes | CDN / Static | Frontend Server (SSR) | An approved image belongs in `public/` and is rendered by the existing static-compatible `next/image` surface. [VERIFIED: src/content/guides/registry.ts:8-10] [VERIFIED: src/components/tech-center/TechArticlePage.tsx:84-98] [VERIFIED: next.config.js:7-10] |

## Project Constraints (from AGENTS.md)

- Production is a Next.js static export; route data must be available during build generation.
- Keep canonical, hreflang, sitemap, internal-link, and redirect identities aligned through central routing helpers.
- Reuse the current Node.js/repository tooling and add no package for Guide publication.
- Preserve Guide body fidelity; Phase 6 reads the Phase 5 normalized source body instead of rewriting or translating it.
- Use App Router thin routes, default server components, explicit client leaves only when needed, `@/*` imports, strict TypeScript, English code comments, and direct Node verification scripts.
- Apply `dynamicParams = false` for closed static detail inventories and use `notFound()` for unresolved content.
- Use `next/image` for approved images, authored alternative text, and responsive dimensions.
- Keep edits surgical, remove newly unused code, and run a relevant verification plus production build before phase closure.
- Begin user-facing replies with `爸爸` and use Simplified Chinese; code and commit text remain English.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---|---:|---|---|
| Next.js App Router | 16.2.6 | Static route generation, metadata, `next/image`, and static sitemap route. | Already provides all required route and SEO primitives; dynamic params supplied at build time create static pages and `dynamicParams = false` closes the route set. [VERIFIED: package.json:40-46] [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-static-params] |
| React | 19.2.6 | Server-rendered Guide hub/article composition. | Existing comparison and technical-center surfaces use the same components and shell. [VERIFIED: package.json:43-44] [VERIFIED: src/components/compare/ComparisonRoute.tsx:21-62] |
| TypeScript | 5.9.3 | Registry extension, routing types, metadata, and component contracts. | `strict` project type checking is an existing release gate. [VERIFIED: package.json:52-60] |
| Node built-ins + `node:test` | Node 24.13.0 available | Focused Guide graph verification. | Existing Guide verification uses `assert`, `fs`, temporary fixture roots, and `node:test` without another test dependency. [VERIFIED: scripts/verify-guide-content.test.js:1-18] [VERIFIED: package.json:26-27] |

### Supporting

| Library / module | Version | Purpose | When to Use |
|---|---:|---|---|
| `server-only` | Existing dependency | Protect filesystem-backed Guide reader from client import. | Keep the current Guide loader as the only raw-document reader. [VERIFIED: src/lib/guideContent.ts:1-13] |
| `next/image` | Next.js 16.2.6 | Responsive approved asset rendering. | Branch only when a snapshot has `assetPolicy.status: 'required'`; use its registry path and alt. [VERIFIED: src/content/guides/registry.ts:8-10] [VERIFIED: src/components/tech-center/TechArticlePage.tsx:84-98] |
| `MarkdownContent` | In-repo module | Render approved Markdown blocks. | Pass the normalized `readGuideDocument().body` and route-header title. [VERIFIED: src/components/tech-center/MarkdownContent.tsx:38-134] [VERIFIED: src/components/tech-center/MarkdownContent.tsx:208-279] |
| `JsonLdScript` / `BreadcrumbJsonLd` | In-repo module | Escaped JSON-LD scripts and breadcrumb list. | Reuse for Guide-specific Article, HowTo, CollectionPage, and ItemList nodes. [VERIFIED: src/components/JsonLd.tsx:35-43] [VERIFIED: src/components/JsonLd.tsx:163-182] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|---|---|---|
| Focused Guide SEO helper | Generic `getAlternates()` | Generic alternates enumerate all supported locales, while the locked Guide cluster is exactly `zh-CN`, `en`, and `x-default`. [VERIFIED: src/lib/seo.ts:51-68] |
| Guide-specific thin modules | Copy/paste comparison route modules | Existing comparison components are a good structural reference, while their content API, page assets, and locale hard-coding belong to the comparison surface. [VERIFIED: src/components/compare/ComparisonRoute.tsx:8-14] |
| Existing `MarkdownContent` | New Markdown dependency/parser | The repository parser already covers every block form detected in the complete Guide corpus and avoids an install. [VERIFIED: src/components/tech-center/MarkdownContent.tsx:4-11] [VERIFIED: Guide corpus feature scan, 2026-08-17] |

**Installation:** None. [VERIFIED: package.json:30-64]

## Package Legitimacy Audit

No external package is proposed or installed. Phase 6 reuses repository dependencies and Node built-ins, so a package legitimacy gate is inapplicable. [VERIFIED: package.json:30-64]

## Architecture Patterns

### System Architecture Diagram

```text
approved 8×2 registry + committed Markdown
          |                         |
          |                         +--> readGuideDocument(slug, locale)
          v                                      |
Guide route/SEO projection <---------------------+
          |
          +--> root /guide and /guide/[slug] aliases ---> indexable canonical HTML
          |
          +--> [lang]/guide adapters -------------> non-indexable static adapter HTML
          |            |                                      |
          |            +--> generateStaticParams + dynamicParams=false
          |
          +--> GuideHub / GuideArticle ---> Navbar / Footer / MarkdownContent / Image
          |                                      |
          |                                      +--> cards, breadcrumbs, explicit internal links
          |
          +--> metadata ---> canonical + zh-CN/en/x-default + Open Graph URL
          +--> JSON-LD ---> CollectionPage/ItemList/BreadcrumbList or Article/HowTo
          +--> sitemap ---> one hub + eight owned article URLs, seenUrls deduplication
```

### Recommended Project Structure

```text
src/app/
├── guide/page.tsx                 # root/default locale hub alias
├── guide/[slug]/page.tsx          # root/default locale article alias
└── [lang]/guide/
    ├── page.tsx                   # closed localized adapter
    └── [slug]/page.tsx            # closed localized adapter
src/components/guide/
├── GuideHubRoute.tsx              # shell, hub schema, hub metadata
├── GuideArticleRoute.tsx          # shell, body, article schema, article metadata
├── GuideHubPage.tsx               # three server-rendered card groups
├── GuideArticlePage.tsx           # header, breadcrumb, body, image/link sections
└── GuidePage.module.css           # light-theme responsive Guide layout
src/lib/
└── guideSeo.ts                    # canonical/alternate/metadata and route helpers
scripts/
└── verify-guide-seo-graph.js      # focused dependency-free Phase 6 regression check
```

### Pattern 1: Closed, default-locale root aliases

**What:** Put all rendering and metadata in Guide route modules. Root aliases call them with `defaultLocale`; localized adapters accept only Guide-supported build locales, return `notFound()` otherwise, and mark the alias route `noindex, follow` while sharing the root canonical URL.

**When to use:** Every Guide hub/article entry point.

**Why:** Root aliases establish public canonical topology, while adapters satisfy the repository's localized App Router layout and static route generation. The comparison implementation is an established split between root aliases and localized routes. [VERIFIED: src/app/compare/[slug]/page.tsx:1-27] [VERIFIED: src/app/[lang]/compare/[slug]/page.tsx:1-33]

```ts
const guideBuildLocales = getBuildLocaleCodes().filter((locale): locale is GuideLocale =>
  GUIDE_LOCALES.includes(locale as GuideLocale)
);
const staticLocales = guideBuildLocales.length ? guideBuildLocales : [defaultLocale as GuideLocale];
```

The existing source-of-truth unions are verbatim: `export const GUIDE_LOCALES = ['zh', 'en'] as const;` and `getBuildLocaleCodes()` returns default locale only when there are no prefixed published locales. [VERIFIED: src/content/guides/registry.ts:3-5] [VERIFIED: src/lib/siteRouting.ts:45-50]

### Pattern 2: One registry-derived Guide URL and metadata surface

**What:** Accept a `GuideLocale` and optional slug, then derive `getOwnedLocaleUrl(locale, '/guide')` or `getOwnedLocaleUrl(locale, '/guide/<slug>')`, exact bilingual alternates, canonical, title/description/keywords, and Open Graph URL from one entry/snapshot.

**When to use:** Route `generateMetadata`, cards, breadcrumb items, JSON-LD nodes, configured links, and sitemap rows.

**Why:** `getOwnedLocaleUrl()` already selects the owned host and root unprefixed path for the two Guide locales. [VERIFIED: src/lib/siteRouting.ts:24-25] [VERIFIED: src/lib/siteRouting.ts:53-69]

```ts
export function getGuideAlternates(locale: GuideLocale, slug?: string): Metadata['alternates'] {
  const path = slug ? `/guide/${slug}` : '/guide';
  const englishUrl = getOwnedLocaleUrl('en', path);
  const chineseUrl = getOwnedLocaleUrl('zh', path);

  return {
    canonical: getOwnedLocaleUrl(locale, path),
    languages: { en: englishUrl, 'zh-CN': chineseUrl, 'x-default': englishUrl }
  };
}
```

The quoted locale values are declared by the source-of-truth registry as `export const GUIDE_LOCALES = ['zh', 'en'] as const;`, and the routing manifest defines the exact hreflang values `"hreflang": "en"` and `"hreflang": "zh-CN"`. [VERIFIED: src/content/guides/registry.ts:3-5] [VERIFIED: src/config/site-routing.json:8-24]

### Pattern 3: Visible schema graph mirrors visible navigation

**What:** Emit `CollectionPage`, `ItemList`, and a 2-item hub breadcrumb from hub cards; emit `Article`, a 3-item article breadcrumb, and `HowTo` only when `schemaTokens` includes it. Keep names, canonical URLs, card/list items, and link targets identical to what the visitor can follow.

**When to use:** Guide hub/article server route components.

**Why:** Existing components already serialize escaped JSON-LD and comparison hubs compose collection/list nodes in one `@graph`. [VERIFIED: src/components/JsonLd.tsx:35-43] [VERIFIED: src/components/compare/ComparisonHubRoute.tsx:34-65]

Schema.org defines `Article` as a creative work article, `CollectionPage` as a collection page, and exposes the companion `HowTo`, `ItemList`, and `BreadcrumbList` types. [CITED: https://schema.org/Article] [CITED: https://schema.org/HowTo] [CITED: https://schema.org/CollectionPage] [CITED: https://schema.org/ItemList] [CITED: https://schema.org/BreadcrumbList]

### Pattern 4: Render approved body with a route-owned H1

**What:** Render the registry H1 in the article header and pass the full loader body plus that exact title to `MarkdownContent`; its parser skips that first matching H1 while retaining the authored subsequent headings and blocks.

**When to use:** Every Guide article.

**Why:** The parser intentionally skips only the first H1 that equals the supplied title, normalizes following headings to start at h2, and has explicit handling for code fences, blockquotes, lists, tables, and inline links/emphasis. [VERIFIED: src/components/tech-center/MarkdownContent.tsx:52-133] [VERIFIED: src/components/tech-center/MarkdownContent.tsx:136-279]

### Anti-Patterns to Avoid

- **Using `getAlternates()` for Guide URLs:** its generic locale reduction emits more than the locked bilingual cluster. [VERIFIED: src/lib/seo.ts:51-68]
- **Using every `getBuildLocaleCodes()` value directly:** the io variant includes supported locales without a Guide source snapshot; intersect with Guide locales and fall back to the default source locale. [VERIFIED: src/lib/siteRouting.ts:32-50] [VERIFIED: src/content/guides/registry.ts:3-5]
- **Publishing a title twice:** the source body retains the H1 after its removed comment; route header plus `MarkdownContent` title-aware skip keeps a single visible H1. [VERIFIED: src/lib/guideContent.ts:51-97] [VERIFIED: src/components/tech-center/MarkdownContent.tsx:65-76]
- **Turning delivery-comment labels into guessed links:** current `configuredInternalLinks` arrays are empty, and the contract only accepts explicit owned targets. [VERIFIED: src/content/guides/registry.ts:98-108] [VERIFIED: scripts/verify-guide-content.js:165-171]
- **Adding placeholders for requested assets:** no current snapshot has `status: 'required'`; the existing required-asset validation demands a contained path and non-empty authored alt text. [VERIFIED: src/content/guides/registry.ts:8-10] [VERIFIED: scripts/verify-guide-content.js:153-163]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Markdown parser | New markdown library/parser | `MarkdownContent` | It covers all blocks found across 16 approved documents and safely renders text/approved link protocols. [VERIFIED: src/components/tech-center/MarkdownContent.tsx:13-36] [VERIFIED: src/components/tech-center/MarkdownContent.tsx:136-173] |
| Responsive image renderer | Custom `<img>` layout wrapper | `next/image` conditional branch | Existing long-form article surface already supplies source, alt, width, height, and responsive styling. [VERIFIED: src/components/tech-center/TechArticlePage.tsx:84-98] |
| JSON-LD escaping | Raw script string interpolation | `JsonLdScript` | It serializes object data and escapes `<` before script insertion. [VERIFIED: src/components/JsonLd.tsx:35-43] |
| URL/host policy | Per-component URL concatenation | `getOwnedLocalePath()` / `getOwnedLocaleUrl()` | Those helpers centralize locale ownership and root path rules. [VERIFIED: src/lib/siteRouting.ts:24-25] [VERIFIED: src/lib/siteRouting.ts:53-69] |
| Test harness | New package/framework | `node:test` plus direct Node verifier | Existing Guide mutation tests provide the exact isolation pattern. [VERIFIED: scripts/verify-guide-content.test.js:28-54] |

**Key insight:** Registry identity has to drive every published URL-bearing surface; duplicated path and metadata logic creates a canonical graph that passes individual rendering checks yet diverges in sitemap, schema, or internal navigation.

## Common Pitfalls

### Pitfall 1: io static parameters select non-Guide locales

**What goes wrong:** io's published locale set includes several international locales while Guide content is defined only for `zh` and `en`; blindly mapping `getBuildLocaleCodes()` reaches locale values with no `GuideSourceSnapshot`. [VERIFIED: src/config/site-routing.json:7-88] [VERIFIED: src/content/guides/registry.ts:3-5]

**How to avoid:** Filter static locales by `GUIDE_LOCALES`; when this intersection is empty, use the current site default locale only after proving it is a Guide locale. The io default is `en` and cn default is `zh`. [VERIFIED: src/config/site-routing.json:2-5]

**Warning signs:** `readGuideDocument(slug, locale)` receives any locale besides `zh` or `en`, or static output contains localized Guide copies with no source snapshot. [VERIFIED: src/lib/guideContent.ts:114-117]

### Pitfall 2: localized adapters compete with root canonical pages

**What goes wrong:** A static adapter such as `/zh/guide/<slug>` can exist to satisfy App Router generation while the locked public URL is root `/guide/<slug>`.

**How to avoid:** Root aliases are indexable and adapter metadata returns the same root canonical with `robots: { index: false, follow: true }`, matching the existing localized comparison route policy. [VERIFIED: src/app/[lang]/compare/[slug]/page.tsx:23-33] [VERIFIED: src/app/compare/[slug]/page.tsx:21-27]

**Warning signs:** Any canonical, Open Graph URL, card, schema item, breadcrumb, or sitemap entry contains `/zh/guide` or `/en/guide`.

### Pitfall 3: generic alternates leak unrelated locales

**What goes wrong:** Generic alternates reduce over all supported locale codes, conflicting with the required exact bilingual hreflang cluster. [VERIFIED: src/lib/seo.ts:51-68] [VERIFIED: src/config/site-routing.json:7-88]

**How to avoid:** Keep a Guide-only alternate function with three fields. `x-default` must use the same English URL in both locale outputs. [CITED: https://developers.google.com/search/docs/advanced/crawling/localized-versions]

### Pitfall 4: image or link requests become invented public content

**What goes wrong:** Delivery comments include source asset/link directives while no required assets or configured targets have been approved in the registry.

**How to avoid:** Keep link and image sections conditional on registry policy only. A source label stays absent from visual navigation until it receives an explicit target that passes the existing owned-target validation. [VERIFIED: src/content/guides/registry.ts:80-108] [VERIFIED: scripts/verify-guide-content.js:153-171]

### Pitfall 5: article date fields lack a current typed source

**What goes wrong:** D-07 locks registry-derived article timing; `GuideSourceSnapshot` currently declares titles, descriptions, canonical/hreflang, schema, assets, and links, yet declares no published/modified date fields. [VERIFIED: src/content/guides/registry.ts:17-33]

**How to avoid:** Add explicit ISO date fields to each localized registry snapshot in the same Phase 6 group/metadata extension, validate them in the Guide contract, and source them from the approved delivery record. Keep Article JSON-LD and Open Graph timing sourced from those fields only.

**Warning signs:** `Article`/Open Graph dates are hand-assembled in page components or omitted after the D-07 timing decision.

## Code Examples

### Guide article route metadata and source load

```tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return getGuideArticleMetadata(defaultLocale as GuideLocale, slug);
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GuideArticleRoute locale={defaultLocale as GuideLocale} slug={slug} />;
}

export const dynamicParams = false;
```

Source pattern: root comparison aliases own default-locale rendering, static slug inventory, and closed dynamic params. [VERIFIED: src/app/compare/[slug]/page.tsx:1-27]

### Registry-backed sitemap extension

```ts
const guideLocale = currentSiteVariant === 'cn' ? 'zh' : 'en';
addEntry(getGuideHubCanonicalUrl(guideLocale), now);
for (const entry of guideEntries) {
  addEntry(getGuideCanonicalUrl(guideLocale, entry.slug), getGuideLastModified(entry, guideLocale));
}
```

The locale values are verbatim from `export const GUIDE_LOCALES = ['zh', 'en'] as const;`, and current sitemap code already has `seenUrls` deduplication plus a current-variant comparison locale branch. [VERIFIED: src/content/guides/registry.ts:3-5] [VERIFIED: src/app/sitemap.ts:17-27] [VERIFIED: src/app/sitemap.ts:68-73]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|---|---|---|---|
| Comparison pages use their own content API and route-specific SEO helpers. | Phase 5 provides a typed eight-pair Guide registry plus a strict server-only raw-body reader. | Phase 5, 2026-08-17 | Phase 6 should consume the Guide boundary directly while reusing route/shell patterns. [VERIFIED: src/content/guides/registry.ts:111-142] [VERIFIED: src/lib/guideContent.ts:114-125] |
| Existing generic SEO alternates cover broader localized pages. | Guide needs exactly the two owned content locales plus one fallback. | Locked D-07 | A dedicated narrow helper prevents alternate leakage. [VERIFIED: src/lib/seo.ts:51-68] |
| Source contract preserves raw asset and link directives. | Publication policy uses approved `required` assets and explicit configured targets only. | Phase 5, 2026-08-17 | The launch remains text-first and link-safe. [VERIFIED: src/content/guides/registry.ts:8-32] |

**Deprecated/outdated:** Broad locale iteration for Guide static routes is unsuitable for this corpus because the only declared Guide locale values are `zh` and `en`. [VERIFIED: src/content/guides/registry.ts:3-5]

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|---|---|---|
| A1 | The approved Week04 delivery date `2026-08-11` is the authoritative published/modified date for every localized Guide snapshot. | Common Pitfalls | Resolved: registry and verifier carry the same typed ISO value for both fields. |
| A2 | A new Guide CSS module can reuse technical-article light-theme layout rules without a user-design checkpoint. | Recommended Project Structure | Visual details could require a focused design review. |

## Open Questions

1. **RESOLVED — Approved article timing value and update policy**
   - Authority: the approved Week04 delivery date `2026-08-11` is authoritative for both `datePublished` and `dateModified` on every localized Guide snapshot.
   - Implementation consequence: add typed ISO date fields to the registry, validate real calendar dates in both TypeScript and the dependency-free Node verifier, and source Open Graph, Article JSON-LD, and sitemap timing from those fields.

2. **RESOLVED — Configured internal-link inventory**
   - Authority: launch `configuredInternalLinks` arrays remain empty because the delivery package contains no approved owned targets. Source labels remain registry data only.
   - Implementation consequence: render the configured-links section conditionally from explicit mappings, retain the Phase 5 owned-target validator, and publish zero inferred destinations at launch. [VERIFIED: src/content/guides/registry.ts:30-32] [VERIFIED: scripts/verify-guide-content.js:165-171]

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|---|---|---:|---|---|
| Node.js | Build, verifier, static export | ✓ | v24.13.0 | — |
| npm | Existing scripts and production build | ✓ | 11.6.2 | — |
| TypeScript CLI | Strict type gate | ✓ | 5.9.3 | `npx --no-install tsc --noEmit` |
| Next.js / current dependencies | Route, metadata, image surfaces | ✓ | 16.2.6 in package manifest | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None.

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---|---|---|
| V2 Authentication | no | Static public content has no authentication workflow in phase scope. |
| V3 Session Management | no | Static Guide routes use no session state. |
| V4 Access Control | no | Publication is repository/build controlled; visitor routes are public. |
| V5 Input Validation | yes | Registry validation rejects invalid snapshots, source filenames, link mappings, asset policies, and loader source escapes. [VERIFIED: src/content/guides/registry.ts:55-130] [VERIFIED: src/lib/guideContent.ts:99-125] |
| V6 Cryptography | no | Existing SHA-256 source-fidelity checks use Node crypto; Phase 6 adds no cryptographic feature. [VERIFIED: src/lib/guideContent.ts:3-5] [VERIFIED: src/lib/guideContent.ts:37-39] |

### Known Threat Patterns for Guide publishing

| Pattern | STRIDE | Standard Mitigation |
|---|---|---|
| Path traversal through source filename | Tampering | Keep `readGuideDocument()` path containment and basename checks. [VERIFIED: src/lib/guideContent.ts:99-111] |
| Unsafe configured link | Tampering | Render only registry mappings that have passed owned-target verification. [VERIFIED: scripts/verify-guide-content.js:94-119] |
| JSON-LD script breakout from authored text | Tampering | Pass data through `JsonLdScript`, which serializes JSON and escapes `<`. [VERIFIED: src/components/JsonLd.tsx:35-43] |
| Invalid/remote image source | Tampering | Require a contained public path plus non-empty authored alternative text before `required` image rendering. [VERIFIED: src/content/guides/registry.ts:87-96] |

## Sources

### Primary (HIGH confidence)
- `src/content/guides/registry.ts` - source snapshot union, eight-entry invariant, source lookup. [VERIFIED: src/content/guides/registry.ts:3-142]
- `src/lib/guideContent.ts` - server-only, strict delivery boundary, path containment, document loading. [VERIFIED: src/lib/guideContent.ts:1-125]
- `src/lib/siteRouting.ts` - owned domain, root path, published/build locale policy. [VERIFIED: src/lib/siteRouting.ts:8-69]
- `src/lib/seo.ts` and `src/app/sitemap.ts` - existing canonical/alternate and deduplicated sitemap patterns. [VERIFIED: src/lib/seo.ts:9-68] [VERIFIED: src/app/sitemap.ts:17-75]
- `src/components/tech-center/MarkdownContent.tsx`, `src/components/JsonLd.tsx`, and comparison route modules - reusable rendering and schema patterns. [VERIFIED: src/components/tech-center/MarkdownContent.tsx:38-279] [VERIFIED: src/components/JsonLd.tsx:35-219] [VERIFIED: src/components/compare/ComparisonHubRoute.tsx:22-131]
- `scripts/verify-guide-content.js` and `scripts/verify-guide-content.test.js` - established dependency-free source and mutation verification. [VERIFIED: scripts/verify-guide-content.js:121-208] [VERIFIED: scripts/verify-guide-content.test.js:28-171]

### Secondary (MEDIUM confidence)
- [Next.js `generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - build-time params and closed dynamic-route behavior. [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-static-params]
- [Next.js route segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) - `dynamicParams` behavior. [CITED: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config]
- [Next.js static export guide](https://nextjs.org/docs/pages/guides/static-exports) - static HTML generation and deployment model. [CITED: https://nextjs.org/docs/pages/guides/static-exports]

### Tertiary (LOW confidence)
- [Google Search Central canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) - self canonical, same-language hreflang canonical, absolute URLs, consistent internal/sitemap links. [CITED: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls]
- [Google localized versions guidance](https://developers.google.com/search/docs/advanced/crawling/localized-versions) - language tags and `x-default`. [CITED: https://developers.google.com/search/docs/advanced/crawling/localized-versions]
- [Schema.org Article](https://schema.org/Article), [HowTo](https://schema.org/HowTo), [CollectionPage](https://schema.org/CollectionPage), [ItemList](https://schema.org/ItemList), [BreadcrumbList](https://schema.org/BreadcrumbList) - schema type definitions. [CITED: https://schema.org/Article]

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all required primitives and versions are already installed and present in repository source. [VERIFIED: package.json:30-64]
- Architecture: HIGH - locked Phase 6 route policy aligns with existing App Router, owned URL, source loader, comparison, and sitemap implementations.
- Pitfalls: HIGH - locale/build mismatch, duplicate route surfaces, no approved assets/links, and missing timing fields are directly observable in current source.

**Research date:** 2026-08-17  
**Valid until:** 2026-09-16 for stable internal patterns; recheck Next.js docs before dependency upgrades.
