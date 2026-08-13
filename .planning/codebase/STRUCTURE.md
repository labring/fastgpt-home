# Codebase Structure

**Analysis Date:** 2026-08-12

## Directory Layout

```text
fastgpt-home/
├── src/app/                         # Next.js App Router routes and global document shell
│   ├── [lang]/                      # Locale-prefixed home, FAQ, pricing, compare, and tech routes
│   │   ├── [section]/[slug]/        # Technical article catch-all (currently zh-owned)
│   │   ├── faq/[id]/                # FAQ detail route
│   │   └── compare/[slug]/          # Competitor comparison detail route
│   ├── page.tsx                     # Default-locale home entry
│   ├── layout.tsx                   # Global providers, fonts, analytics, attribution
│   ├── faq/, price/, compare/       # Unprefixed aliases/detail entries
│   ├── tech-center/                 # Unprefixed technical-center alias
│   ├── sitemap.ts, robots.ts        # Metadata routes
│   └── *Analytics.tsx, LeadAttribution.tsx
├── src/components/                  # Presentation and interactive domain modules
│   ├── home/                        # Landing sections, shell, motion, assets, hooks
│   ├── faq/                         # FAQ list/filter/card UI
│   ├── compare/                     # Comparison route wrappers and tables
│   ├── tech-center/                 # Technical index/article UI, CSS modules, JSON index
│   ├── price/                       # Pricing title and plan UI
│   ├── enterprise/                  # Enterprise page sections and grids
│   ├── header/                      # CTA and language switcher primitives
│   ├── icons/                       # Domain icon components
│   ├── ui/                          # Shared Radix/CVA button primitive
│   ├── JsonLd.tsx, ThemeProvider.tsx
├── src/lib/                         # Routing, i18n, SEO, external data, attribution, utilities
│   └── attribution/                  # Cookie/localStorage adapters and codecs
├── src/config/                      # Site, pricing, and enterprise configuration
├── src/locales/                     # JSON dictionaries for nine supported locale codes
├── src/faq/                         # FAQ records, translation fallback, legacy metadata overlays
├── src/content/                     # Typed content registries and technical Markdown
│   ├── competitor/                  # Comparison page definitions/loaders
│   └── tech-center/<category>/      # Technical article Markdown grouped by route section
├── content/competitors/              # Comparison Markdown source documents (zh/en)
├── public/                           # Static images, logos, redirects, headers, generated crawl files
├── scripts/                          # Build-time generation, cleanup, conversion, and verification
├── next.config.js, tsconfig.json    # Next/TypeScript configuration and `@/*` alias
├── Dockerfile, nginx*.conf           # Static-export container and Nginx delivery
└── package.json                      # Scripts and dependency contract
```

## Directory Purposes

**`src/app/`:**
- Purpose: Define URL topology and App Router lifecycle hooks.
- Contains: Server page/layout modules, dynamic segments, metadata functions, static params, not-found pages, and metadata routes.
- Key files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/[lang]/layout.tsx`, `src/app/[lang]/page.tsx`, `src/app/sitemap.ts`.

**`src/components/home/`:**
- Purpose: Own the shared FastGPT marketing shell and homepage sections.
- Contains: `HomeLanding`, `Navbar`, `Footer`, hero/feature/solution/case-study/service/FAQ/CTA sections, motion wrappers, and conversion hooks.
- Key files: `src/components/home/HomeLanding.tsx`, `src/components/home/Navbar.tsx`, `src/components/home/Footer.tsx`, `src/components/home/hooks/useStartUrl.ts`.

**`src/components/faq/`, `src/components/compare/`, `src/components/tech-center/`, `src/components/price/`:**
- Purpose: Keep domain UI isolated from route parameter and content-loading logic.
- Contains: Client filters and cards, comparison tables/renderers, technical search/article renderers, and pricing presentation.
- Key files: `src/components/faq/FAQList.tsx`, `src/components/compare/ComparisonPage.tsx`, `src/components/tech-center/TechCenterPage.tsx`, `src/components/price/PPlan.tsx`.

**`src/lib/`:**
- Purpose: Provide reusable application services and pure routing/content helpers.
- Contains: Locale normalization/dictionary loading, domain-owned URL generation, SEO alternates, GitHub star fetching, cloud URL construction, visitor/lead attribution, and class utilities.
- Key files: `src/lib/i18n.ts`, `src/lib/locales.ts`, `src/lib/siteRouting.ts`, `src/lib/seo.ts`, `src/lib/tech-center-content.ts`, `src/lib/leadAttribution.ts`.

**`src/config/`:**
- Purpose: Centralize static product/site configuration and large presentation data sets.
- Contains: Base and locale site configs, pricing plans, and enterprise content.
- Key files: `src/config/site.ts`, `src/config/price.ts`, `src/config/enterprise.ts`.

**`src/locales/`:**
- Purpose: Supply dictionary copy to route and component trees.
- Contains: `en.json`, `zh.json`, `zh-hant.json`, `ja.json`, `ar.json`, `vi.json`, `th.json`, `id.json`, and `ms.json`.
- Key files: `src/locales/en.json`, `src/locales/zh.json`; access through `getDictionary` in `src/lib/i18n.ts`.

**`src/faq/`:**
- Purpose: Store and normalize FAQ data independently from UI.
- Contains: English/Chinese records, W2 additions, legacy titles/descriptions/categories, locale fallback and ID helpers.
- Key files: `src/faq/index.ts`, `src/faq/en.ts`, `src/faq/zh.ts`, `src/faq/legacyMeta.ts`, `src/faq/legacyCategories.ts`.

**`src/content/tech-center/` and `content/competitors/`:**
- Purpose: Hold authored long-form content in Markdown.
- Contains: Technical article files grouped by route section and competitor comparison documents split by language.
- Key files: `src/content/tech-center/node/*.md`, `content/competitors/en/*.md`, `content/competitors/*.md`; loaders validate front matter and parse Markdown.

**`public/`:**
- Purpose: Serve immutable/static assets and host deployment-platform rules.
- Contains: Logos, social images, homepage imagery, locale asset folders, `_headers`, `_redirects`, and generated `robots.txt`/`llms.txt`.
- Key files: `public/logo.svg`, `public/opengraph-image.png`, `public/_redirects`, `public/_headers`.

**`scripts/`:**
- Purpose: Run build-time generation and repository verification.
- Contains: robots/LLM generation, image conversion, locale cleanup, HTML language correction, FAQ RSC cleanup, and `verify-*` checks.
- Key files: `scripts/generate-robots.js`, `scripts/generate-llms.js`, `scripts/fix-html-lang.js`, `scripts/verify-i18n-seo.js`.

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Global HTML/providers and instrumentation.
- `src/app/page.tsx`: Unprefixed default home.
- `src/app/[lang]/page.tsx`: Localized home.
- `src/app/[lang]/faq/page.tsx`: FAQ index.
- `src/app/[lang]/[section]/[slug]/page.tsx`: Technical article detail.
- `src/app/[lang]/compare/[slug]/page.tsx`: Competitor comparison detail.

**Configuration:**
- `next.config.js`: Production static export, image behavior, package transpilation, and headers.
- `tsconfig.json`: Strict TypeScript, bundler resolution, and `@/*` -> `src/*` alias.
- `tailwind.config.ts`, `postcss.config.js`, `src/styles/globals.css`: Styling pipeline and design tokens.
- `Dockerfile`, `nginx.conf`, `nginx-security-headers.conf`: Container build and static serving.

**Core Logic:**
- `src/lib/siteRouting.ts`: Site variant/domain ownership and locale path rules.
- `src/lib/i18n.ts`: Dictionary/config selection.
- `src/lib/seo.ts`: Canonical/hreflang metadata.
- `src/lib/tech-center-content.ts`: Technical Markdown front matter/body loading.
- `src/content/competitor/loader.ts`: Comparison Markdown parser.
- `src/components/home/HomeLanding.tsx`: Homepage component graph.

**Content:**
- `src/locales/*.json`: UI copy.
- `src/faq/*.ts`: FAQ source and overlays.
- `src/components/tech-center/entries.json`: Technical listing index.
- `src/content/tech-center/**/*.md`: Technical article bodies.
- `content/competitors/**/*.md`: Comparison article bodies.

**Testing/Verification:**
- `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, `scripts/verify-i18n-seo.js`: Repository-level checks.
- No dedicated `test/`, `__tests__/`, `*.test.*`, or `*.spec.*` tree is present in the current source layout.

## Naming Conventions

**Files:**
- Route files follow Next.js reserved names (`page.tsx`, `layout.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`).
- React components use PascalCase filenames (`HomeLanding.tsx`, `FAQList.tsx`, `TechArticlePage.tsx`).
- Shared libraries/configuration use lower camel or kebab-free names (`siteRouting.ts`, `cloudEntryUrl.ts`, `tech-center-content.ts`).
- CSS Modules sit beside their component (`TechCenterPage.module.css`, `TechArticlePage.module.css`).
- Authored Markdown uses kebab-case slugs matching route segments (`fastgpt-workflow-text-splice.md`).

**Directories:**
- Domain directories use lowercase names (`home`, `faq`, `compare`, `tech-center`, `price`, `enterprise`).
- Dynamic route segments use bracket notation (`[lang]`, `[id]`, `[section]`, `[slug]`).
- Content directories mirror public route categories (`src/content/tech-center/node/` -> `/zh/node/...`).

## Where to Add New Code

**New Feature:**
- Primary route orchestration: add a server page under `src/app/[lang]/<feature>/page.tsx`; add an unprefixed alias under `src/app/<feature>/page.tsx` when the feature has a default-locale URL.
- Presentation: create or extend `src/components/<feature>/`, reusing `Navbar`, `Footer`, `HomeThemeFix`, `JsonLd`, and `CloudEntryLink` where applicable.
- Shared behavior: add a focused helper under `src/lib/` and keep environment/domain decisions in `src/config/` or `src/lib/siteRouting.ts`.
- Metadata/sitemap: use `src/lib/seo.ts` and update `src/app/sitemap.ts` when the route is indexable.

**New Component/Module:**
- Implementation: place domain components in the matching `src/components/<domain>/` directory; place generic primitives in `src/components/ui/` only when they serve multiple domains.
- Client interaction: mark only the interactive leaf/module `'use client'`; keep filesystem/content resolution in server route or `src/lib` modules.
- JSON-LD: extend `src/components/JsonLd.tsx` or add a domain schema module beside the domain component (`src/components/tech-center/TechCenterJsonLd.tsx`).

**New FAQ Entry:**
- Add the record to `src/faq/en.ts` and translated record to `src/faq/zh.ts` when available; add legacy metadata/category overlays only through `src/faq/legacyMeta.ts` and `src/faq/legacyCategories.ts`.
- `getFaqIds` feeds static params and `src/app/sitemap.ts`, so preserve stable IDs and verify generated routes.

**New Technical Article:**
- Add an entry to `src/components/tech-center/entries.json` with a slug of `/zh/<section>/<slug>`.
- Add the matching front-matter Markdown file under `src/content/tech-center/<section>/<slug>.md`; `src/lib/tech-center-content.ts` validates the slug and derives SEO description.

**New Comparison Page:**
- Add locale-specific Markdown under `content/competitors/` and a typed definition in `src/content/competitor/<provider>.ts` using `createComparisonPage` from `src/content/competitor/loader.ts`.
- Register the slug in `src/content/competitor/index.ts`; `generateStaticParams` and sitemap consume that registry.

**Utilities:**
- Shared helpers: `src/lib/` with an explicit domain-oriented filename.
- Attribution/storage primitives: `src/lib/attribution/primitives/` and `src/lib/attribution/storage/`; preserve the existing adapter/status/codec layering.

## Special Directories

**`.next/`:**
- Purpose: Next.js development/build cache and generated types.
- Generated: Yes.
- Committed: No.

**`out/`:**
- Purpose: Static export output consumed by Nginx/container or Cloudflare Pages.
- Generated: Yes by production `next build`.
- Committed: No.

**`.cache/`:**
- Purpose: Best-effort server-side GitHub stars cache (`.cache/github-stars.json`).
- Generated: Yes at runtime/build access.
- Committed: No.

**`public/<locale>/`:**
- Purpose: Locale-specific static media and page assets.
- Generated: Mixed; assets are repository content, while crawl files are build-generated.
- Committed: Yes for authored/static assets.

**`.planning/codebase/`:**
- Purpose: GSD-generated codebase maps consumed by planning/execution agents.
- Generated: Yes by mapping workflows.
- Committed: Yes when the project tracks planning artifacts.

---

*Structure analysis: 2026-08-12*
