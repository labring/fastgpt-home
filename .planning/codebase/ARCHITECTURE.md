<!-- refreshed: 2026-08-12 -->
# Architecture

**Analysis Date:** 2026-08-12

## System Overview

```text
┌─────────────────────────────────────────────────────────────────────┐
│ Next.js App Router entry points (`src/app`)                         │
│ `/`, `/[lang]`, `/faq`, `/price`, `/tech-center`, `/compare`       │
└───────────────┬───────────────────────┬─────────────────────────────┘
                │ server route params    │ static params + metadata
                ▼                        ▼
┌───────────────────────────┐  ┌────────────────────────────────────┐
│ Route/domain orchestration │  │ Global shell and cross-cutting      │
│ `src/app/[lang]/**`        │  │ `src/app/layout.tsx`               │
│ `src/app/*` aliases        │  │ theme, fonts, analytics, attribution│
└───────────────┬───────────┘  └──────────────────┬─────────────────┘
                ▼                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Presentation modules (`src/components`)                              │
│ home, faq, compare, tech-center, price, enterprise, shared UI/JSON-LD│
└───────────────┬─────────────────────────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Shared services and content adapters (`src/lib`, `src/config`,       │
│ `src/faq`, `src/content`, `src/locales`, `content/`, `public/`)       │
└───────────────┬─────────────────────────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Static export/runtime targets: `out/` -> Nginx/Cloudflare Pages;     │
│ external GitHub, cloud, docs, analytics, and attribution endpoints   │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root route | Resolves the default locale, dictionary, GitHub stars, page JSON-LD, and home body | `src/app/page.tsx` |
| Localized route/layout | Resolves `[lang]`, emits localized metadata and static paths, and chooses the home/layout shell | `src/app/[lang]/page.tsx`, `src/app/[lang]/layout.tsx` |
| Global layout | Loads global CSS/fonts, forced dark theme provider, motion provider, analytics, and attribution bootstrap | `src/app/layout.tsx` |
| Home composition | Renders navbar, hero, product highlights, solutions, case studies, brand wall, services, FAQ, CTA, and footer from one dictionary | `src/components/home/HomeLanding.tsx` |
| FAQ route/content layer | Selects locale/fallback data, creates list/detail JSON-LD and metadata, and renders FAQ UI | `src/app/[lang]/faq/page.tsx`, `src/app/[lang]/faq/[id]/page.tsx`, `src/faq/index.ts` |
| Comparison route/content layer | Maps published slugs to locale-specific pages, parses Markdown into typed sections/tables, and renders comparison pages | `src/components/compare/ComparisonRoute.tsx`, `src/content/competitor/index.ts`, `src/content/competitor/loader.ts` |
| Technical center | Indexes entries from JSON, filters client-side, loads article Markdown server-side, and emits article/hub schema | `src/components/tech-center/TechCenterPage.tsx`, `src/lib/tech-center-content.ts` |
| Pricing | Resolves localized copy and renders title, plans, and pricing FAQ | `src/app/[lang]/price/page.tsx`, `src/components/price/PPlan.tsx` |
| SEO/routing services | Calculates domain ownership, locale prefixes, canonical/hreflang URLs, and sitemap entries | `src/lib/siteRouting.ts`, `src/lib/seo.ts`, `src/app/sitemap.ts` |
| Shared schema layer | Serializes Organization, WebSite, WebPage, SoftwareApplication, FAQ, breadcrumb, and article JSON-LD | `src/components/JsonLd.tsx` |
| Conversion/measurement layer | Builds cloud-entry URLs with campaign and visitor IDs, records click attributes, and lazy-loads analytics | `src/components/home/CloudEntryLink.tsx`, `src/lib/cloudEntryUrl.ts`, `src/app/LeadAttribution.tsx` |

## Pattern Overview

**Overall:** Server-rendered route orchestration with statically exported, content-driven presentation modules and client islands for interaction.

**Key Characteristics:**
- App Router pages are thin adapters: they await route params, call `generateStaticParams`/`generateMetadata`, resolve dictionaries/content, then pass typed-ish props into components.
- Root and localized aliases intentionally share implementations. For example, `src/app/price/page.tsx` re-exports `src/app/[lang]/price/page.tsx`, while both home entry points render `HomeLanding`.
- Locale and site variant are first-class routing inputs. `src/lib/siteRouting.ts` assigns `zh` to `cn`, all other supported locales to `io`, and derives canonical URLs across domains.
- Content is compiled from JSON, TypeScript records, and Markdown. Server-only loaders read files during build/request generation; client components own filtering, animation, and browser URL state.
- Production uses `output: 'export'` when `NODE_ENV` is production. `Dockerfile` builds `out/` and serves it from Nginx; `public/_redirects` and `public/_headers` support Cloudflare Pages.

## Layers

**Route and document layer:**
- Purpose: Define URL topology, route parameters, static generation, metadata, not-found behavior, and schema entry points.
- Location: `src/app/`
- Contains: Root/layout files, localized dynamic segments, alias pages, `robots.ts`, and `sitemap.ts`.
- Depends on: `src/lib/i18n.ts`, `src/lib/siteRouting.ts`, content APIs, and presentation modules.
- Used by: Next.js App Router and static export build.

**Application shell layer:**
- Purpose: Provide shared navigation, theme, motion, footer, page-level visual wrappers, and home sections.
- Location: `src/components/home/`, `src/components/header/`, `src/components/ui/`
- Contains: `HomeLanding`, `Navbar`, `Footer`, CTA links, motion primitives, and button primitives.
- Depends on: locale dictionary props, `src/config/site.ts`, routing helpers, and browser APIs in client components.
- Used by: Home, FAQ, pricing, comparison, and technical center routes.

**Domain presentation layer:**
- Purpose: Render domain-specific workflows and interactions.
- Location: `src/components/faq/`, `src/components/compare/`, `src/components/tech-center/`, `src/components/price/`, `src/components/enterprise/`
- Contains: FAQ filters/cards, comparison tables, technical search/article views, pricing plans, and enterprise sections.
- Depends on: Domain content adapters and shared shell/schema components.
- Used by: Matching route files under `src/app/`.

**Content/configuration layer:**
- Purpose: Store localized copy, typed configuration, and authored content, then expose normalized data to routes/components.
- Location: `src/locales/`, `src/config/`, `src/faq/`, `src/content/`, `content/competitors/`, `src/components/tech-center/entries.json`
- Contains: Nine locale dictionaries, pricing/enterprise/site config, FAQ records, competitor Markdown, and technical-center index plus article Markdown.
- Depends on: Node filesystem only for server-side Markdown loaders.
- Used by: Route metadata, page components, JSON-LD, sitemap, and client UI props.

**Cross-cutting service layer:**
- Purpose: Normalize locale/path behavior, SEO alternates, cloud conversion links, GitHub stars, visitor IDs, and attribution persistence.
- Location: `src/lib/`
- Contains: `i18n.ts`, `locales.ts`, `siteRouting.ts`, `seo.ts`, `cloudEntryUrl.ts`, `leadAttribution.ts`, and attribution storage/primitives.
- Depends on: Environment configuration and browser storage where explicitly called from client code.
- Used by: Almost every route family and shared shell component.

## Data Flow

### Primary Request Path

1. Next.js matches `/` or a localized path and invokes `src/app/page.tsx` or `src/app/[lang]/page.tsx`.
2. The route resolves `defaultLocale`/`lang` with `src/lib/i18n.ts`, dynamically imports the matching `src/locales/*.json`, and fetches GitHub stars through `src/lib/githubStars.ts`.
3. The route emits `JsonLd`/`FAQJsonLd` from `src/components/JsonLd.tsx`, then passes dictionary data and stars to `src/components/home/HomeLanding.tsx`.
4. `HomeLanding` composes client and server-compatible sections. `HomeHeroSection` hydrates with server stars and refreshes them through `src/lib/githubStarsClient.ts`; `CloudEntryLink` derives campaign-aware cloud URLs in the browser.
5. `src/app/layout.tsx` wraps the tree with `ThemeProvider` and `MotionProvider`, then mounts lazy analytics and attribution components.

### FAQ Flow

1. `src/app/[lang]/faq/page.tsx` resolves the content locale with `resolveFaqLocale` from `src/faq/index.ts`.
2. `getFaqData` merges English records, Chinese translations, and legacy category metadata; the route trims list payloads and creates FAQ/breadcrumb schemas.
3. `FAQList` and `FAQCard` provide client filtering and links generated by `getOwnedFaqPath`/`getOwnedFaqUrl`.
4. `src/app/[lang]/faq/[id]/page.tsx` decodes the ID, loads one item plus related items, and calls `notFound()` for missing IDs.

### Technical Article Flow

1. `src/components/tech-center/data.ts` indexes `src/components/tech-center/entries.json` and defines category metadata/page size.
2. `src/app/[lang]/tech-center/page.tsx` resolves locale and passes dictionary/navigation copy to the client `TechCenterPage`.
3. Search, category/source filters, sorting, pagination, and query-string synchronization happen in `src/components/tech-center/TechCenterPage.tsx`.
4. The catch-all article route `src/app/[lang]/[section]/[slug]/page.tsx` restricts articles to `zh`, maps the entry slug to `src/content/tech-center/<section>/<slug>.md`, parses front matter in `src/lib/tech-center-content.ts`, and renders `TechArticlePage` with related articles.

### Comparison Flow

1. `src/app/compare/**` and `src/app/[lang]/compare/**` resolve `en` or `zh` and delegate to `ComparisonHubRoute` or `ComparisonRoute`.
2. `src/content/competitor/index.ts` maps four slugs to locale records defined in `dify.ts`, `ragflow.ts`, `maxkb.ts`, and `selfBuild.ts`.
3. `createComparisonPage` in `src/content/competitor/loader.ts` reads `content/competitors/*.md`, parses headings/lists/quotes/tables, and annotates table evidence status.
4. The route renders typed data through `ComparisonHubPage`/`ComparisonPage` and emits canonical metadata plus JSON-LD.

**State Management:**
- Server state is resolved during route rendering/build from dictionaries and authored content.
- Interactive state is local React state in client islands (`Navbar`, `FAQList`, `TechCenterPage`, home sections) and browser storage for stars/attribution.
- URL state is canonicalized by routing helpers on the server and updated with `history.replaceState` for technical-center filters.

## Key Abstractions

**Locale dictionary loader:**
- Purpose: Provide one normalized copy object to routes and shared components.
- Examples: `src/lib/i18n.ts`, `src/locales/en.json`, `src/locales/zh.json`.
- Pattern: Normalize locale, dynamically import JSON, fall back to English for unsupported values.

**Owned URL builder:**
- Purpose: Keep domain ownership and locale prefix rules consistent across links, metadata, schema, and sitemap.
- Examples: `src/lib/siteRouting.ts`, `src/lib/seo.ts`.
- Pattern: Normalize locale, choose `cn`/`io` owner, then generate path and absolute URL.

**Content index plus server loader:**
- Purpose: Keep list/search metadata cheap while loading full Markdown only for detail pages.
- Examples: `src/components/tech-center/entries.json`, `src/lib/tech-center-content.ts`, `src/content/competitor/loader.ts`.
- Pattern: Index records identify route slugs; server-only loaders validate and parse source files.

**Shared conversion link:**
- Purpose: Preserve campaign parameters, visitor ID, and Rybbit event metadata on cloud CTAs.
- Examples: `src/components/home/CloudEntryLink.tsx`, `src/components/home/hooks/useStartUrl.ts`, `src/lib/cloudEntryUrl.ts`.
- Pattern: Render a client anchor with an initial target URL, then replace it after mount with a derived URL.

## Entry Points

**Global document entry:**
- Location: `src/app/layout.tsx`
- Triggers: Every App Router route.
- Responsibilities: HTML language bootstrap, fonts, CSS, theme, motion, analytics, and attribution.

**Default home entry:**
- Location: `src/app/page.tsx`
- Triggers: `/`.
- Responsibilities: Default-locale metadata, homepage schema, dictionary/stars loading, and `HomeLanding`.

**Localized entry:**
- Location: `src/app/[lang]/page.tsx`
- Triggers: Locale-prefixed homepage paths.
- Responsibilities: Locale params, static locale generation, localized schema, dictionary/stars loading, and `HomeLanding`.

**Content detail entries:**
- Locations: `src/app/[lang]/faq/[id]/page.tsx`, `src/app/[lang]/[section]/[slug]/page.tsx`, `src/app/[lang]/compare/[slug]/page.tsx`
- Triggers: FAQ IDs, technical slugs, or competitor slugs.
- Responsibilities: Validate/resolve content, emit metadata/schema, call `notFound()` for unsupported routes, and render domain detail components.

**Build/deployment entry:**
- Location: `package.json`, `next.config.js`, `Dockerfile`
- Triggers: `npm run build` or container build.
- Responsibilities: Generate robots/LLM files, statically export pages, clean post-build artifacts, and serve `out/` through Nginx.

## Architectural Constraints

- **Rendering:** Production is a static export (`output: 'export'` in `next.config.js` when `NODE_ENV=production`); route data must be available to `generateStaticParams` or build-time execution.
- **Runtime boundary:** `src/lib/tech-center-content.ts` and `src/lib/githubStars.ts` are server-only; browser-only behavior belongs in files marked `'use client'`.
- **Locale ownership:** `zh` is owned by `fastgpt.cn`; `en`, `zh-hant`, `ja`, `ar`, `vi`, `th`, `id`, and `ms` are owned by `fastgpt.io` according to `src/lib/siteRouting.ts`.
- **Route aliases:** Root default-locale routes re-export localized implementations, so changes to `src/app/[lang]/**` can affect both prefixed and unprefixed URLs.
- **Static route set:** Detail routes use `dynamicParams = false`; adding authored FAQ, technical, or comparison content requires updating the corresponding index/registry and static-param source.
- **Global mutable state:** Attribution configuration is module-level in `src/lib/leadAttribution.ts`; browser caches use `localStorage` in `src/lib/githubStarsClient.ts` and attribution storage modules.
- **External links:** Cloud CTAs and consult links are external anchors; preserve `CloudEntryLink`/Rybbit instrumentation when adding conversion surfaces.

## Anti-Patterns

### Bypassing Owned URL Helpers

**What happens:** A route or component hand-builds locale/domain URLs with string literals instead of `src/lib/siteRouting.ts` or `src/lib/seo.ts`.
**Why it's wrong:** Canonical ownership, hreflang, redirects, and sitemap URLs can diverge between `fastgpt.cn` and `fastgpt.io`.
**Do this instead:** Use `getOwnedLocalePath`, `getOwnedLocaleUrl`, `getOwnedFaqPath`, or `getAlternates` from `src/lib/siteRouting.ts`/`src/lib/seo.ts`.

### Loading Full Authored Documents in Index Views

**What happens:** A listing page reads every Markdown article or competitor document during client rendering.
**Why it's wrong:** The technical center is designed to filter the compact `entries.json` index, while filesystem reads require server-only execution.
**Do this instead:** Add list metadata to `src/components/tech-center/entries.json` or a typed content registry, and load full bodies through `src/lib/tech-center-content.ts` or `src/content/competitor/loader.ts` only on detail routes.

### Duplicating Page Shells

**What happens:** A new home-like route recreates navbar, theme, footer, and analytics wiring inside a page file.
**Why it's wrong:** Shared shell behavior already lives in `src/components/home/HomeLanding.tsx`, `src/components/home/Navbar.tsx`, `src/components/home/Footer.tsx`, and `src/app/layout.tsx`.
**Do this instead:** Compose the existing shell and pass locale dictionary props; add a domain component under the matching `src/components/<domain>/` directory.

## Error Handling

**Strategy:** Fail closed for invalid static content routes and degrade gracefully for optional external data.

**Patterns:**
- Detail routes call `notFound()` when a slug/ID cannot be resolved (`src/app/[lang]/faq/[id]/page.tsx`, `src/app/[lang]/[section]/[slug]/page.tsx`, `src/app/[lang]/compare/[slug]/page.tsx`).
- Content loaders throw on malformed front matter or slug mismatches so build-time data errors are visible (`src/lib/tech-center-content.ts`).
- GitHub star fetch/cache and browser storage catch failures and return a validated fallback (`src/lib/githubStars.ts`, `src/lib/githubStarsClient.ts`).
- Optional analytics components return `null` when their public environment key is absent (`src/app/BaiDuAnalytics.tsx`, `src/app/ClarityAnalytics.tsx`, `src/app/RybbitAnalytics.tsx`).

## Cross-Cutting Concerns

**Logging:** Build scripts and external fetch failures use standard Node/console output; no centralized logger is present.
**Validation:** Route content is validated by typed registries, `dynamicParams = false`, slug checks, locale normalization, and metadata/schema helpers.
**Authentication:** The site has no user authentication flow; conversion links pass campaign/visitor attribution to the external cloud service.
**Observability:** Google Analytics, Baidu Tongji, Microsoft Clarity, Rybbit, and anonymous lead attribution are mounted from `src/app/layout.tsx`.
**SEO:** Metadata, canonical/hreflang, JSON-LD, sitemap, robots, and generated `llms.txt` are distributed across `src/app`, `src/lib/seo.ts`, `src/components/JsonLd.tsx`, and `scripts/`.

---

*Architecture analysis: 2026-08-12*
