# Codebase Structure

**Analysis Date:** 2026-08-10

## Directory Layout

```text
fastgpt-home/
├── content/                # comparison markdown sources
├── public/                 # static images, llms.txt files, redirects, headers
├── scripts/                # build, verification, and maintenance scripts
├── src/                    # app routes, components, config, content, libs, styles
├── .planning/codebase/     # generated architecture and structure docs
├── .claude/                # local agent and skill metadata
└── .codegraph/             # repository index used for code navigation
```

## Directory Purposes

**`src/app`:**
- Purpose: App Router entry points, route layouts, metadata, and route handlers.
- Contains: `page.tsx`, `layout.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, and localized route trees.
- Key files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/[lang]/layout.tsx`, `src/app/[lang]/price/page.tsx`, `src/app/[lang]/faq/page.tsx`, `src/app/[lang]/tech-center/page.tsx`, `src/app/[lang]/compare/[slug]/page.tsx`.

**`src/components`:**
- Purpose: reusable UI and page sections.
- Contains: home shell sections, FAQ components, compare components, price components, tech-center views, icon wrappers, and UI primitives.
- Key files: `src/components/home/HomeLanding.tsx`, `src/components/home/Navbar.tsx`, `src/components/home/Hero.tsx`, `src/components/faq/FAQList.tsx`, `src/components/compare/ComparisonPage.tsx`, `src/components/tech-center/TechCenterPage.tsx`, `src/components/ui/button.tsx`, `src/components/icons/index.tsx`.

**`src/config`:**
- Purpose: site-wide configuration objects and pricing data.
- Contains: locale-specific config, pricing plans, and enterprise content data.
- Key files: `src/config/site.ts`, `src/config/price.ts`, `src/config/enterprise.ts`.

**`src/content`:**
- Purpose: typed content loaders and markdown-backed article data.
- Contains: tech-center loaders and comparison page modules.
- Key files: `src/content/tech-center/**`, `src/content/competitor/index.ts`, `src/content/competitor/loader.ts`, `src/content/competitor/types.ts`.

**`src/faq`:**
- Purpose: FAQ dictionaries, legacy overlays, and locale resolution helpers.
- Contains: English FAQ data, Chinese FAQ data, alternate FAQ entries, category overlays, and metadata overlays.
- Key files: `src/faq/index.ts`, `src/faq/en.ts`, `src/faq/zh.ts`, `src/faq/w2.ts`, `src/faq/legacyCategories.ts`, `src/faq/legacyMeta.ts`.

**`src/lib`:**
- Purpose: shared logic for locale routing, SEO, analytics, attribution, content loading, and utility helpers.
- Contains: URL builders, locale maps, metadata helpers, visitor IDs, idle callbacks, and GitHub star helpers.
- Key files: `src/lib/siteRouting.ts`, `src/lib/localizedRoutes.ts`, `src/lib/seo.ts`, `src/lib/i18n.ts`, `src/lib/locales.ts`, `src/lib/leadAttribution.ts`, `src/lib/tech-center-content.ts`, `src/lib/utils.ts`.

**`src/locales`:**
- Purpose: localized dictionary files consumed by `src/lib/i18n.ts`.
- Contains: per-language JSON dictionaries.
- Key files: `src/locales/en.json`, `src/locales/zh.json`, `src/locales/zh-hant.json`, `src/locales/ja.json`, `src/locales/ar.json`, `src/locales/vi.json`, `src/locales/th.json`, `src/locales/id.json`, `src/locales/ms.json`.

**`src/styles`:**
- Purpose: global CSS and theme variables.
- Contains: app-wide CSS tokens and page shell rules.
- Key files: `src/styles/globals.css`.

**`public`:**
- Purpose: static assets served directly by the framework.
- Contains: logos, social previews, favicon files, locale `llms.txt` files, home page imagery, comparison diagrams, and enterprise imagery.
- Key files: `public/llms.txt`, `public/en/llms.txt`, `public/zh/llms.txt`, `public/zh-hant/llms.txt`, `public/ja/llms.txt`, `public/ar/llms.txt`, `public/vi/llms.txt`, `public/th/llms.txt`, `public/id/llms.txt`, `public/ms/llms.txt`, `public/images/**`, `public/opengraph-image.png`, `public/twitter-image.png`.

**`content`:**
- Purpose: source markdown for comparison pages.
- Contains: four comparison articles used by the compare route family.
- Key files: `content/competitors/dify-vs-fastgpt.md`, `content/competitors/maxkb-vs-fastgpt.md`, `content/competitors/ragflow-vs-fastgpt.md`, `content/competitors/self-build-vs-platform.md`.

**`scripts`:**
- Purpose: repo automation for verification and content maintenance.
- Contains: build checks, locale cleanup, image conversion, and verification scripts.
- Key files: `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, `scripts/verify-i18n-seo.js`.

**`.planning/codebase`:**
- Purpose: generated repository maps for downstream planning phases.
- Contains: architecture and structure documents.
- Key files: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`.

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: root document shell and providers.
- `src/app/page.tsx`: default home page.
- `src/app/[lang]/layout.tsx`: localized home shell and locale metadata.
- `src/app/[lang]/price/page.tsx`: localized pricing page.
- `src/app/[lang]/faq/page.tsx`: FAQ index page.
- `src/app/[lang]/faq/[id]/page.tsx`: FAQ detail page.
- `src/app/[lang]/tech-center/page.tsx`: tech center hub.
- `src/app/[lang]/[section]/[slug]/page.tsx`: tech article detail page.
- `src/app/[lang]/compare/[slug]/page.tsx`: comparison article page.
- `src/app/robots.ts`: robots route handler.
- `src/app/sitemap.ts`: sitemap route handler.

**Configuration:**
- `package.json`: scripts, dependencies, engine version, and package metadata.
- `next.config.js`: static export, image handling, and production headers.
- `tsconfig.json`: TypeScript strictness and `@/*` path alias.
- `eslint.config.mjs`: lint rules.
- `.prettierrc.js`: formatting rules.
- `tailwind.config.ts`: Tailwind theme setup.
- `postcss.config.js`: PostCSS pipeline.

**Core Logic:**
- `src/components/home/HomeLanding.tsx`: home page composition.
- `src/components/home/Navbar.tsx`: navigation, locale switcher, and CTA wiring.
- `src/components/home/HomeLayoutSwitcher.tsx`: shell selection across page families.
- `src/components/faq/FAQList.tsx`: searchable FAQ grid.
- `src/components/compare/ComparisonPage.tsx`: comparison article layout.
- `src/components/tech-center/TechCenterPage.tsx`: hub search, filtering, sorting, and pagination.
- `src/components/tech-center/TechArticlePage.tsx`: article layout and sidebar.
- `src/components/JsonLd.tsx`: structured data output.

**Shared Data and Helpers:**
- `src/lib/siteRouting.ts`: site variant, locale publication, and owned URLs.
- `src/lib/localizedRoutes.ts`: default-locale route helpers.
- `src/lib/seo.ts`: canonical and alternate link helpers.
- `src/lib/i18n.ts`: locale config and dictionary loading.
- `src/lib/locales.ts`: locale maps, display names, and normalization.
- `src/lib/tech-center-content.ts`: markdown-backed tech article loader.
- `src/lib/leadAttribution.ts`: visit classification and CRM payloads.
- `src/lib/visitorId.ts`: visitor identity storage.

**Content Sources:**
- `src/faq/en.ts`, `src/faq/zh.ts`, `src/faq/w2.ts`: FAQ content sources.
- `src/content/tech-center/**`: tech article markdown grouped by category.
- `src/content/competitor/*`: comparison page descriptors and loader types.
- `content/competitors/*.md`: comparison article markdown source.

**Styling:**
- `src/styles/globals.css`: global CSS tokens and page shells.
- `src/components/tech-center/TechCenterPage.module.css`: hub layout styles.
- `src/components/tech-center/TechArticlePage.module.css`: article layout styles.

## Naming Conventions

**Files:**
- Route modules use framework names: `page.tsx`, `layout.tsx`, `not-found.tsx`, `robots.ts`, and `sitemap.ts`.
- Locale dictionaries use lowercase locale codes: `en.json`, `zh.json`, `zh-hant.json`, `ja.json`, `ar.json`, `vi.json`, `th.json`, `id.json`, `ms.json`.
- FAQ content files use locale-centric names: `src/faq/en.ts`, `src/faq/zh.ts`, `src/faq/w2.ts`.
- Comparison source files use kebab-case descriptors: `dify-vs-fastgpt.md`, `self-build-vs-platform.md`.
- Tech article files use kebab-case slugs inside category folders under `src/content/tech-center/`.
- CSS Modules use `.module.css` for route-scoped page styles.

**Directories:**
- App route segments follow the App Router structure: `src/app/[lang]/...`, `src/app/[section]/[slug]/...`.
- Content categories use plain nouns: `src/content/tech-center/api`, `src/content/tech-center/node`, `src/content/tech-center/dataset`, `src/content/tech-center/integration`.
- Static asset folders use descriptive groups: `public/images/home`, `public/images/compare`, `public/images/enterprise`.

## Where to Add New Code

**New Feature:**
- Primary code: place route entry points under `src/app/[lang]/...` and shared UI in `src/components/<feature>/`.
- Tests and checks: place or update verification scripts under `scripts/` and content coverage in the relevant data modules.

**New Component/Module:**
- Implementation: keep page sections in `src/components/home/`, FAQ widgets in `src/components/faq/`, comparison views in `src/components/compare/`, tech-center views in `src/components/tech-center/`, and shared primitives in `src/components/ui/` or `src/components/icons/`.

**Utilities:**
- Shared helpers: place locale, SEO, routing, and analytics helpers in `src/lib/`.
- Locale copy: add dictionaries in `src/locales/` and wire them through `src/lib/i18n.ts` and `src/config/site.ts`.

**Content Pages:**
- FAQ content: update `src/faq/en.ts`, `src/faq/zh.ts`, `src/faq/w2.ts`, and overlay maps in `src/faq/legacyCategories.ts` or `src/faq/legacyMeta.ts`.
- Tech-center content: add markdown to `src/content/tech-center/<category>/`, then refresh `src/components/tech-center/entries.json` and `src/lib/tech-center-content.ts`.
- Comparison content: add markdown to `content/competitors/*.md`, then update `src/content/competitor/*.ts` and `src/content/competitor/loader.ts` if the shape changes.

**Media and Static Files:**
- Images and previews: place assets in `public/images/...`.
- Search-engine files: place locale `llms.txt` files in `public/`.

## Special Directories

**`public/`:**
- Purpose: direct static serving for images, previews, `llms.txt`, redirects, and headers.
- Generated: no.
- Committed: yes.

**`content/competitors/`:**
- Purpose: source markdown for comparison pages.
- Generated: no.
- Committed: yes.

**`src/content/tech-center/`:**
- Purpose: markdown corpus for the tech center knowledge base.
- Generated: no.
- Committed: yes.

**`scripts/`:**
- Purpose: repo automation and verification helpers.
- Generated: no.
- Committed: yes.

**`.planning/codebase/`:**
- Purpose: generated repository maps for GSD planning phases.
- Generated: yes.
- Committed: yes.

---

*Structure analysis: 2026-08-10*
