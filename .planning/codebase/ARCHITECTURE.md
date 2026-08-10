<!-- refreshed: 2026-08-10 -->
# Architecture

**Analysis Date:** 2026-08-10

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│             Next.js App Router Presentation Layer           │
├──────────────────┬──────────────────┬───────────────────────┤
│  Route modules   │  Shell views     │  Feature islands      │
│  `src/app/*`     │  `src/components`│  `src/components/*`   │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│        Locale, routing, SEO, content, and config layer      │
│  `src/lib/*`  `src/config/*`  `src/faq/*`  `src/content/*`  │
└────────┬────────────────────────────────────────────────────┘
         ▼
┌─────────────────────────────────────────────────────────────┐
│   Static assets, markdown sources, JSON data, and scripts    │
│  `public/`  `content/competitors/`  `src/content/tech-center/`│
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root document | Sets shared providers, theme, analytics, and attribution | `src/app/layout.tsx` |
| Locale entry layer | Resolves locale metadata, static params, and localized shells | `src/app/[lang]/layout.tsx` |
| Home page assembly | Loads locale copy and stars, then renders the landing experience | `src/app/page.tsx`, `src/app/[lang]/page.tsx` |
| Shared landing shell | Composes navigation, hero, proof, FAQ, CTA, and footer sections | `src/components/home/HomeLanding.tsx` |
| FAQ domain | Builds list and detail views from merged FAQ content | `src/faq/index.ts`, `src/components/faq/*` |
| Tech center domain | Builds hub and article pages from markdown plus generated entries data | `src/components/tech-center/*`, `src/lib/tech-center-content.ts` |
| Comparison domain | Loads comparison pages from markdown and typed page modules | `src/content/competitor/*`, `src/components/compare/*` |

## Pattern Overview

**Overall:** server-first localized App Router site with static-export-friendly content routes and client-side interaction islands.

**Key Characteristics:**
- Route modules own metadata, canonical URLs, JSON-LD, and `generateStaticParams`.
- Locale-specific pages reuse the same component tree through routing helpers and config maps.
- Content-heavy sections use markdown, JSON, and typed loader modules instead of direct CMS calls.
- Client islands handle search, filtering, locale switching, tracking, and CTA navigation.

## Layers

**Routing layer:**
- Purpose: declare pages, layouts, metadata, static params, robots, and sitemap outputs.
- Location: `src/app/*`
- Contains: route modules, localized route trees, analytics injection, and utility route handlers.
- Depends on: `src/lib/*`, `src/config/*`, `src/components/*`.
- Used by: the entire site runtime.

**Presentation shell layer:**
- Purpose: compose visible page sections and page-scoped interaction surfaces.
- Location: `src/components/home/*`, `src/components/faq/*`, `src/components/price/*`, `src/components/compare/*`, `src/components/tech-center/*`
- Contains: hero sections, navigation, FAQ lists, tables, article layouts, and client search panels.
- Depends on: route helpers, localized data, icons, motion helpers, and styling files.
- Used by: route modules under `src/app/*`.

**Content and domain layer:**
- Purpose: store and transform page content in reusable typed modules.
- Location: `src/faq/*`, `src/content/tech-center/*`, `src/content/competitor/*`, `content/competitors/*`
- Contains: FAQ dictionaries, tech article markdown, comparison markdown, loaders, and typed page metadata.
- Depends on: shared types, file-system loading, markdown parsing, and locale helpers.
- Used by: FAQ, tech-center, and compare routes.

**Routing, locale, and SEO layer:**
- Purpose: keep URLs, locales, alternates, canonical tags, and site variants aligned.
- Location: `src/lib/siteRouting.ts`, `src/lib/localizedRoutes.ts`, `src/lib/seo.ts`, `src/lib/i18n.ts`, `src/lib/locales.ts`, `src/config/site.ts`
- Contains: locale normalization, site variant selection, URL builders, alternates, and dictionary loading.
- Depends on: environment variables, site config, and locale maps.
- Used by: every localized route and most CTA/navigation components.

**Observability and attribution layer:**
- Purpose: emit analytics, track visits, and forward campaign context.
- Location: `src/app/GoogleAnalytics.tsx`, `src/app/BaiDuAnalytics.tsx`, `src/app/ClarityAnalytics.tsx`, `src/app/RybbitAnalytics.tsx`, `src/app/LeadAttribution.tsx`, `src/lib/leadAttribution.ts`, `src/lib/visitorId.ts`, `src/lib/cloudEntryUrl.ts`
- Contains: script injectors, visitor IDs, first-touch/last-touch attribution, and outbound link enrichment.
- Depends on: browser storage, environment variables, and idle callbacks.
- Used by: root layout and CTA-related client surfaces.

**Styling layer:**
- Purpose: provide global tokens and page-specific layout rules.
- Location: `src/styles/globals.css`, `src/components/tech-center/*.module.css`
- Contains: theme variables, page shells, content typography, and layout-specific CSS modules.
- Depends on: Tailwind utility classes and CSS custom properties.
- Used by: all rendered pages.

## Data Flow

### Primary Request Path: Home page

1. `src/app/layout.tsx` sets the shared document shell, theme provider, motion provider, analytics scripts, and attribution bootstrap.
2. `src/app/page.tsx` and `src/app/[lang]/page.tsx` resolve the locale dictionary through `src/lib/i18n.ts` and site metadata through `src/config/site.ts`.
3. `src/components/home/HomeLanding.tsx` composes the visible home experience from `Navbar`, `HomeHeroSection`, `ProductHighlights`, `Solutions`, `CaseStudies`, `BrandWall`, `Services`, `FAQ`, `CTA`, and `Footer`.
4. `src/components/home/HomeHeroSection.tsx` refreshes GitHub star data through `src/lib/githubStarsClient.ts` and feeds it into the hero and trust sections.
5. CTAs pass through `src/components/home/CloudEntryLink.tsx`, `src/components/home/hooks/useStartUrl.ts`, `src/lib/clientNavigation.ts`, `src/lib/cloudEntryUrl.ts`, `src/lib/visitorId.ts`, and `src/lib/leadAttribution.ts`.

### FAQ Path

1. `src/app/[lang]/faq/page.tsx` resolves the FAQ locale with `resolveFaqLocale()` from `src/faq/index.ts`.
2. `getFaqData()` merges localized FAQ entries, legacy metadata overlays, and category labels from `src/faq/en.ts`, `src/faq/zh.ts`, `src/faq/w2.ts`, `src/faq/legacyMeta.ts`, and `src/faq/legacyCategories.ts`.
3. `src/components/faq/FAQList.tsx` handles client search, category filtering, and infinite scroll.
4. `src/app/[lang]/faq/[id]/page.tsx` builds the detail page with `getFaqItem()`, related FAQ links, alternates from `src/lib/seo.ts`, and FAQ JSON-LD from `src/components/JsonLd.tsx`.

### Tech Center and Comparison Path

1. `src/app/[lang]/tech-center/page.tsx` reads locale-aware page data, then passes hub props into `src/components/tech-center/TechCenterPage.tsx`.
2. `src/components/tech-center/data.ts` provides the index dataset from `src/components/tech-center/entries.json`.
3. `src/app/[lang]/[section]/[slug]/page.tsx` resolves a tech article from `src/lib/tech-center-content.ts`, which reads markdown files under `src/content/tech-center/**`.
4. `src/app/[lang]/compare/[slug]/page.tsx` loads comparison data from `src/content/competitor/index.ts` and `src/content/competitor/loader.ts`, then renders `src/components/compare/ComparisonPage.tsx` and `src/components/compare/ComparisonTables.tsx`.
5. `src/app/sitemap.ts` enumerates the published routes from the same content sources, which keeps indexable pages aligned with the content graph.

### State Management

- Browser state lives in `localStorage`, cookies, and query parameters for language choice, attribution, FAQ filters, and tech-center search.
- Route state stays inside the App Router tree and static params, which keeps canonical URLs and metadata deterministic.
- Content state stays in markdown, JSON, and typed data modules, which keeps page assembly predictable.

## Key Abstractions

**Locale and site routing:**
- Purpose: map locales to published routes, owned domains, and hreflang targets.
- Examples: `src/lib/siteRouting.ts`, `src/lib/localizedRoutes.ts`, `src/lib/locales.ts`
- Pattern: a small set of shared helpers builds every locale-aware URL and alternate link.

**Site configuration:**
- Purpose: centralize brand, image, and environment-driven config.
- Examples: `src/config/site.ts`, `src/config/price.ts`, `src/config/enterprise.ts`
- Pattern: localized config objects derive from a base site config and locale maps.

**JSON-LD emitter:**
- Purpose: keep schema output consistent across home, FAQ, tech center, compare, and article pages.
- Examples: `src/components/JsonLd.tsx`, `src/components/tech-center/TechCenterJsonLd.tsx`
- Pattern: page modules pass explicit schema payloads into one reusable emitter layer.

**Content loaders:**
- Purpose: turn markdown and JSON content into typed page data.
- Examples: `src/lib/tech-center-content.ts`, `src/content/competitor/loader.ts`, `src/faq/index.ts`
- Pattern: loader modules own parsing, normalization, and derived metadata.

**Navigation and CTA plumbing:**
- Purpose: keep outbound journeys, locale switching, and campaign propagation aligned.
- Examples: `src/components/home/Navbar.tsx`, `src/components/header/LangSwitcher.tsx`, `src/components/home/CloudEntryLink.tsx`, `src/lib/clientNavigation.ts`
- Pattern: navigation components call shared URL helpers and record preference state before redirecting.

**Self-contained page shell detection:**
- Purpose: switch between the full home shell and route-specific content shells.
- Examples: `src/components/home/HomeLayoutSwitcher.tsx`
- Pattern: page family detection keeps FAQ, price, tech-center, compare, and article pages on the correct frame.

## Entry Points

**Root shell:**
- Location: `src/app/layout.tsx`
- Triggers: every request.
- Responsibilities: document structure, theme, motion, analytics, attribution, language script, and exported metadata.

**Home entry:**
- Location: `src/app/page.tsx`, `src/app/[lang]/page.tsx`
- Triggers: root `/` and localized home routes.
- Responsibilities: fetch locale copy, load stars, and render `HomeLanding`.

**Localized content entry:**
- Location: `src/app/[lang]/price/page.tsx`, `src/app/[lang]/faq/page.tsx`, `src/app/[lang]/faq/[id]/page.tsx`, `src/app/[lang]/tech-center/page.tsx`, `src/app/[lang]/[section]/[slug]/page.tsx`, `src/app/[lang]/compare/[slug]/page.tsx`
- Triggers: route families with locale and slug segments.
- Responsibilities: resolve locale, build metadata, render domain pages, and export static params.

**SEO output entry:**
- Location: `src/app/robots.ts`, `src/app/sitemap.ts`, `src/components/JsonLd.tsx`
- Triggers: framework route generation and page render.
- Responsibilities: search engine directives, sitemap URLs, and schema output.

## Architectural Constraints

- Production output uses static export mode from `next.config.js`.
- Locale ownership comes from `src/lib/siteRouting.ts` and site variant detection through environment variables plus hostname checks.
- `src/app/layout.tsx` forces the dark theme globally, and `src/components/home/HomeThemeFix.tsx` restores the home shell appearance.
- FAQ routes publish only `en` and `zh`, which comes from `src/faq/index.ts` and `faqContentLocaleCodes`.
- Tech article routes publish only `zh`, which comes from `src/app/[lang]/[section]/[slug]/page.tsx` and `src/lib/tech-center-content.ts`.
- Comparison routes publish only `zh`, which comes from `src/app/[lang]/compare/[slug]/page.tsx`.
- Canonical and hreflang output stays centralized in `src/lib/seo.ts` and `src/lib/siteRouting.ts`.
- `src/lib/htmlLang.ts` updates the `<html lang>` value before hydration.
- `src/components/home/HomeLayoutSwitcher.tsx` treats FAQ, price, tech-center, compare, and article routes as self-contained shells.

## Anti-Patterns

### Hardcoded locale URLs

**What happens:** page code points directly at locale paths or home domains.
**Why it's wrong:** locale ownership, hreflang, and canonical URLs drift apart.
**Do this instead:** build links through `src/lib/siteRouting.ts`, `src/lib/localizedRoutes.ts`, and `src/lib/seo.ts`, then consume them in `src/components/home/Navbar.tsx` and `src/components/header/LangSwitcher.tsx`.

### Content pages without SEO plumbing

**What happens:** a new route renders content but leaves out metadata, JSON-LD, sitemap entries, or static params.
**Why it's wrong:** indexability and locale coverage become uneven.
**Do this instead:** add the page module under `src/app/[lang]/...`, wire the content source in `src/faq/*`, `src/content/tech-center/*`, or `src/content/competitor/*`, and update `src/app/sitemap.ts` plus the relevant JSON-LD component.

## Error Handling

**Strategy:** routes fail fast on unsupported locale or slug values, while data loaders merge from safe base content and locale overlays.

**Patterns:**
- `notFound()` appears in localized route modules for unsupported branches.
- `normalizeLocale()` in `src/lib/locales.ts` and `resolveFaqLocale()` in `src/faq/index.ts` reduce user input to supported locale codes.
- `getFaqItem()` and the tech-center loaders merge base content with locale-specific overlays.
- `src/lib/faqMetadata.ts` keeps FAQ metadata within controlled length limits before render time.

## Cross-Cutting Concerns

**Logging:** lightweight client telemetry flows through analytics scripts, Rybbit event attributes, and attribution payloads.
**Validation:** route params, locale codes, and content IDs flow through dedicated helper modules before render-time use.
**Authentication:** none is embedded in the app shell; outbound consult and cloud links carry campaign context through helper modules.
**SEO:** metadata, alternates, canonical URLs, JSON-LD, robots, sitemap, and locale-aware URL generation stay centralized.
**Styling:** Tailwind utilities, `src/styles/globals.css`, and route-scoped CSS modules form the visual system.

---

*Architecture analysis: 2026-08-10*
