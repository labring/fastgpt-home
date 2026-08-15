<!-- GSD:project-start source:PROJECT.md -->

## Project

**FastGPT English FAQ SEO Repair**

This project repairs the English FAQ SEO surface in the existing FastGPT website. It imports the approved metadata for 1,195 currently reachable FAQ pages and incrementally repairs unsafe or missing routes within the roughly 1,400 English FAQ records already present in the repository.

The work preserves healthy indexed URLs, produces stable canonical paths for repaired entries, and leaves the static export ready for release.

**Core Value:** Every in-scope English FAQ has a stable, reachable canonical URL and renders its approved metadata without disrupting healthy indexed URLs.

### Constraints

- **URL stability**: Preserve healthy current URLs — they may already hold search equity and external links
- **Migration scope**: Change only missing or unsafe in-scope routes — the approved strategy is incremental repair
- **Source of truth**: Use `FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx` for the 1,195 metadata records
- **Rendering**: Keep all route data available at build time — production uses Next.js static export
- **SEO integrity**: Canonical, hreflang, sitemap, internal links, and redirects must resolve to the same final slug mapping
- **Content fidelity**: Preserve the existing FAQ questions and answers verbatim
- **Dependencies**: Reuse the current Node.js and repository tooling; add no package for spreadsheet conversion or slug mapping
- **Verification**: Leave one runnable regression check plus a successful production build

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Languages

- TypeScript 5.9.3 - React components, Next.js App Router pages, route metadata, localization, SEO, attribution, and browser utilities in `src/`.
- JavaScript (Node.js) - build hooks, static-content generation, verification scripts, and Next.js configuration in `scripts/`, `next.config.js`, and `gtag.js`.
- CSS/SCSS - global styling and component styles in `src/styles/globals.css` and `src/components/tech-center/*.module.css`.
- Markdown and JSON - technical-center source content and locale/content data in `src/content/`, `src/components/tech-center/entries.json`, `src/locales/`, and `src/faq/`.
- Nginx configuration - static hosting, redirects, caching, and security headers in `nginx.conf` and `nginx-security-headers.conf`.

## Runtime

- Node.js >=18.0.0 is the declared application/build minimum in `package.json`.
- Node.js 22 Alpine is the production image build runtime in `Dockerfile`; the preview workflow uses Node.js 24 in `.github/workflows/preview.yml`.
- Browser runtime for client analytics, navigation, visitor attribution, cookies, and localStorage in `src/app/*Analytics.tsx`, `src/app/LeadAttribution.tsx`, and `src/lib/attribution/`.
- npm is represented by `package-lock.json` (lockfile version 3) and used by the production `Dockerfile` (`npm install`, `npm run build`).
- pnpm 9 is installed and used by the preview build workflow in `.github/workflows/preview.yml`; no `pnpm-lock.yaml` is tracked.
- Lockfile: `package-lock.json` present; `pnpm-lock.yaml` not detected.

## Frameworks

- Next.js 16.2.6 - App Router, static export, route metadata, `next/script`, `next/font/google`, and localized pages under `src/app/`.
- React 19.2.6 and React DOM 19.2.6 - UI and client components.
- TypeScript 5.9.3 - strict, no-emit type checking with the `@/*` alias configured in `tsconfig.json`.
- HeroUI React 2.8.9 and HeroUI theme 2.4.26 - component/theme primitives; both are transpiled by `next.config.js`.
- Tailwind CSS 3.4.19, `tailwindcss-animate` 1.0.7, `tailwind-merge` 3.5.0, `class-variance-authority` 0.7.0, and `clsx` 2.1.0 - utility styling and class composition in `tailwind.config.ts` and `src/`.
- Framer Motion 12.34.3 - motion wrappers and transitions in `src/components/home/motion/`.
- Cobe 2.0.1 - globe canvas visualization in `src/components/home/GlobeCanvas.tsx`.
- Lucide React 0.575.0 and React Icons 5.0.1 - iconography across components.
- `next-themes` 0.4.6 - theme provider in `src/components/ThemeProvider.tsx`.
- Radix UI React Slot 1.0.2 - reusable button composition in `src/components/ui/button.tsx`.
- Dedicated unit-test runner not detected in `package.json` or the repository file inventory.
- Repository verification is implemented as Node scripts: `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, and `scripts/verify-i18n-seo.js`.
- Next.js Turbopack dev server via `npm run dev` (`next dev --turbopack`).
- Production build runs static generation plus post-build cleanup in `package.json`: `next build`, `scripts/clean-faq-rsc.js`, and `scripts/fix-html-lang.js`.
- `next.config.js` sets `output: 'export'` when `NODE_ENV=production`, disables optimized image serving (`images.unoptimized: true`), enables compression, and removes the X-Powered-By header.
- PostCSS 8.5.6 with Tailwind and Autoprefixer 10.4.24 is configured in `postcss.config.js`.
- ESLint 9.39.4 with `eslint-config-next` 16.2.6 is configured in `eslint.config.mjs`; Prettier 2.8.8 is configured in `.prettierrc.js`.
- Husky 9.1.7 runs the package `prepare` hook.
- Sharp 0.33.5 supports image verification/conversion scripts such as `scripts/verify-p1.js` and `scripts/convert-images.js`.

## Key Dependencies

- `next` 16.2.6 - application framework and static exporter.
- `react` / `react-dom` 19.2.6 - rendering runtime.
- `typescript` 5.9.3 - compile-time safety under strict mode.
- `@heroui/react` 2.8.9 and `@heroui/theme` 2.4.26 - shared UI system.
- `server-only` 0.0.1 marks server-only GitHub Stars code in `src/lib/githubStars.ts`.
- Node built-ins (`fs/promises`, `path`) provide the optional server-side GitHub Stars cache at `.cache/github-stars.json`.
- `sharp` 0.33.5 is used for image dimensions/size checks during verification.
- Nginx Brotli image `fholzer/nginx-brotli:latest` serves exported assets in the second stage of `Dockerfile`.

## Configuration

- Public build-time configuration is supplied through `NEXT_PUBLIC_*` variables. Names consumed by source include `NEXT_PUBLIC_HOME_URL`, `NEXT_PUBLIC_LANGUAGE_REGION`, `NEXT_PUBLIC_CN_HOME_URL`, `NEXT_PUBLIC_IO_HOME_URL`, `NEXT_PUBLIC_USER_URL`, `NEXT_PUBLIC_CUSTOM_PLAN_URL`, `NEXT_PUBLIC_FILING_ADDRESS`, `NEXT_PUBLIC_POLICE_FILING`, `NEXT_PUBLIC_CRM_API_URL`, `NEXT_PUBLIC_ATTRIBUTION_COOKIE_DOMAIN`, `NEXT_PUBLIC_ATTRIBUTION_STORAGE_MODE`, `NEXT_PUBLIC_BAIDU_TONGJI`, `NEXT_PUBLIC_BAIDU_KEY`, `NEXT_PUBLIC_CLARITY_TONGJI`, `NEXT_PUBLIC_RYBBIT_TONGJI`, `NEXT_PUBLIC_RYBBIT_TONGJI_SITEID`, `NEXT_PUBLIC_GOOGLE_ID`, and `NEXT_PUBLIC_GOOGLE_VERIFICATION_ID`.
- `.env.template` exists as an environment configuration template; secret values are intentionally excluded from this map.
- `src/lib/siteRouting.ts` defaults to `https://fastgpt.io` for the international variant and `https://fastgpt.cn` for the China variant.
- `next.config.js` controls static-export mode, allowed development origins, package transpilation, compression, and cache headers.
- `tsconfig.json` enables strict TypeScript, bundler module resolution, JSON imports, JSX transform, incremental checking, and `@/*` mapped to `src/*`.
- `tailwind.config.ts` loads `src/**/*.{ts,tsx}` and HeroUI theme files and defines CSS-variable-backed home theme tokens.
- `postcss.config.js` loads Tailwind CSS and Autoprefixer.
- `Dockerfile` passes public configuration as build arguments, runs `npm install` and `npm run build`, then copies `out/` into Nginx.
- `public/_headers`, `public/_redirects`, `nginx.conf`, and `nginx-security-headers.conf` provide deployment-specific headers, redirects, cache policy, and CSP.

## Platform Requirements

- Node.js 18 or newer and npm are sufficient for local scripts; `npm run dev` starts the Turbopack development server.
- A browser is required for client-side analytics, attribution, and localStorage/cookie behavior.
- A static hosting target capable of serving the Next.js `out/` export is required.
- The primary container target is Nginx Brotli on Kubernetes, built from `Dockerfile` and updated by `.github/workflows/fastgpt-home-image.yml`.
- Cloudflare Pages serves preview exports through `.github/workflows/preview-deploy.yml`; production static headers/redirects are also compatible with Cloudflare Pages files under `public/`.

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

## Naming Patterns

- Name React component modules in PascalCase, matching their primary component: `src/components/compare/ComparisonPage.tsx`, `src/components/home/HomeLanding.tsx`, and `src/app/LeadAttribution.tsx`.
- Name shared library modules in descriptive camelCase or lowercase: `src/lib/siteRouting.ts`, `src/lib/faqMetadata.ts`, `src/lib/tech-center-content.ts`, and `src/lib/attribution/primitives/domain.ts`.
- Name Node build and verification scripts with action-oriented kebab-case: `scripts/generate-robots.js`, `scripts/fix-html-lang.js`, and `scripts/verify-i18n-seo.js`.
- Follow Next App Router reserved filenames under `src/app/`: `page.tsx`, `layout.tsx`, `not-found.tsx`, `robots.ts`, and `sitemap.ts`.
- Use `index.ts` or `index.tsx` only for a deliberate directory API. Existing barrels are `src/components/enterprise/index.ts`, `src/components/icons/index.tsx`, `src/content/competitor/index.ts`, and `src/faq/index.ts`.
- Keep scoped styling beside its component with `*.module.css`, following `src/components/tech-center/TechArticlePage.module.css` and `src/components/tech-center/TechCenterPage.module.css`.
- Use camelCase verbs for functions and helpers: `getOwnedLocaleUrl()` in `src/lib/siteRouting.ts`, `normalizeFaqMetadata()` in `src/lib/faqMetadata.ts`, and `verifyHeadingSequence()` in `scripts/verify-p2.js`.
- Use PascalCase for React components: `ComparisonPage` in `src/components/compare/ComparisonPage.tsx` and `TechCenterPage` in `src/components/tech-center/TechCenterPage.tsx`.
- Prefix React hooks with `use`, following `useStartUrl()` in `src/components/home/hooks/useStartUrl.ts`.
- Prefix assertion groups in artifact checks with `verify`, following `verifySitemap()` in `scripts/verify-i18n-seo.js` and `verifyInitialJavaScript()` in `scripts/verify-p1.js`.
- Use `get`, `build`, `resolve`, `normalize`, `parse`, `validate`, `read`, `write`, and `clear` to expose intent in domain helpers, as demonstrated throughout `src/lib/attribution/`.
- Use camelCase for local values and parameters: `currentHostname`, `normalizedDomain`, and `configuredDomain` in `src/lib/attribution/primitives/domain.ts`.
- Use uppercase snake case for fixed module-level constants with policy meaning: `DEFAULT_DOMAIN` in `src/lib/attribution/primitives/domain.ts`, `FIELD_CAPS` in `src/lib/attribution/primitives/envelope.ts`, and `DESCRIPTION_LIMIT` in `src/lib/tech-center-content.ts`.
- Lowercase module constants are also established for local configuration values, such as `baseUrl` and `defaultLocale` in `scripts/verify-p1.js`; preserve the surrounding module's style when editing an existing file.
- Use descriptive collection names and pluralization: `supportedLocaleCodes` in `src/lib/locales.ts`, `compareSlugs` in `scripts/verify-i18n-seo.js`, and `scriptSources` in `scripts/verify-p1.js`.
- Use PascalCase for type aliases and interfaces: `DomainDecision` in `src/lib/attribution/primitives/domain.ts`, `ValidationResult` in `src/lib/attribution/primitives/envelope.ts`, and `ComparisonPage` in `src/content/competitor/types.ts`.
- Derive literal unions from `as const` collections where values also drive runtime behavior, following `siteVariants` and `SiteVariant` in `src/lib/siteRouting.ts` and `RYBBIT_EVENTS` in `src/lib/rybbitEvents.ts`.
- Use discriminated unions for operations that can fail with structured reasons, following `ValidationResult<T>` in `src/lib/attribution/primitives/envelope.ts` and `DomainDecision` in `src/lib/attribution/primitives/domain.ts`.
- Import colliding domain types under a descriptive alias, following `ComparisonPage as ComparisonPageData` in `src/components/compare/ComparisonPage.tsx`.

## Code Style

- Format TypeScript, TSX, and SCSS with Prettier 2.8.8 through `npm run format-code` in `package.json`; the command targets `**/src/**/*.{ts,tsx,scss}`.
- Use 2-space indentation, semicolons, single quotes in JavaScript/TypeScript, double quotes in JSX attributes, 100-character lines, spaces inside object braces, parenthesized arrow parameters, and LF endings from `.prettierrc.js`.
- Let Prettier own TypeScript and TSX formatting in editors; `.vscode/settings.json` enables format-on-save with `esbenp.prettier-vscode` and the repository-local Prettier package.
- Review formatting for root configuration and `scripts/*.js` manually because the `format-code` glob in `package.json` covers `src/` only.
- Treat `.prettierrc.js` as the formatter authority for source files. `.editorconfig` declares CRLF and omits final newline, while `.prettierrc.js` declares LF; the checked TypeScript and TSX style follows Prettier.
- Run `npm run lint` from `package.json` for `src/**/*.{js,jsx,ts,tsx}`.
- Follow Next Core Web Vitals through `eslint.config.mjs`; `react-hooks/immutability`, `react-hooks/set-state-in-effect`, and `react-hooks/static-components` are warning-level rules.
- Keep generated or dependency surfaces out of lint: `node_modules/**`, `.next/**`, `out/**`, `build/**`, `next-env.d.ts`, and `tsconfig.tsbuildinfo` are ignored in `eslint.config.mjs`.
- Run `npx tsc --noEmit` for strict typing. `tsconfig.json` enables `strict`, `isolatedModules`, JSON imports, bundler module resolution, and `noEmit`.
- Apply direct review or the relevant verification command to `scripts/*.js`, root configuration, Markdown content, and workflow YAML because the lint command in `package.json` scopes itself to `src/`.

## Import Organization

- Use `@/*` for imports rooted at `src/*`; the mapping is defined in `tsconfig.json` and mirrored for components and utilities in `components.json`.
- Use relative imports inside a cohesive submodule when the dependency is a sibling implementation detail, following `src/lib/attribution/primitives/codec.ts` and `src/lib/attribution/storage/migration.ts`.
- Preserve explicit runtime boundaries with side-effect imports: `src/lib/githubStars.ts` and `src/lib/tech-center-content.ts` import `server-only`.

## Error Handling

- Validate untrusted values at boundaries before casting. `validateStoredAttribution()` in `src/lib/attribution/primitives/envelope.ts` accepts `unknown`, rejects unknown fields, checks caps and timestamps, then returns a discriminated result.
- Return structured reason codes for expected policy and storage outcomes, following `DomainDecision` in `src/lib/attribution/primitives/domain.ts` and `StorageResult<T>` in `src/lib/attribution/storage/status.ts`.
- Throw descriptive errors for invalid repository-owned content and impossible configuration, following front-matter, slug, and path checks in `src/lib/tech-center-content.ts` and competitor data checks in `src/content/competitor/loader.ts`.
- Use Next control flow for missing route data. `src/components/compare/ComparisonRoute.tsx`, `src/app/[lang]/[section]/[slug]/page.tsx`, and `src/app/[lang]/faq/[id]/page.tsx` call `notFound()`.
- Catch recoverable cache, storage, analytics, and attribution failures at their I/O boundary and return a stable result, following `src/lib/githubStars.ts`, `src/lib/githubStarsClient.ts`, `src/lib/visitorId.ts`, and `src/lib/attribution/storage/local-storage.ts`.
- Keep optional integrations from blocking rendering. Analytics components such as `src/app/BaiDuAnalytics.tsx` return `null` when configuration is absent, and `src/lib/githubStars.ts` returns a cache or display fallback after fetch failure.
- Make CLI validation failures observable through a thrown assertion, `console.error`, and exit status 1, following `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, and `scripts/verify-i18n-seo.js`.

## Logging

- Log one concise success message after a complete verification pass, following the `P0 verification passed`, `P1 verification passed`, `P2 verification passed`, and `i18n SEO verification passed` messages in `scripts/verify-*.js`.
- Send actionable validation failures to `console.error` and exit nonzero, following every `scripts/verify-*.js` entry point and `scripts/clean-locales.js`.
- Prefix generator output with the script identity where multiple build steps run together, following `[generate-robots]` in `scripts/generate-robots.js` and `[generate-llms]` in `scripts/generate-llms.js`.
- Keep expected browser fallback paths quiet and expose state through return values, following `src/lib/attribution/storage/adapter.ts`, `src/lib/githubStarsClient.ts`, and `src/lib/visitorId.ts`.

## Comments

- Explain constraints, lifecycle timing, business policy, and side effects that types cannot express. Strong examples are the static-export rationale in `next.config.js`, file-limit rationale in `scripts/clean-faq-rsc.js`, and hydration timing in `src/lib/htmlLang.ts`.
- Place a short file header on build scripts with broad filesystem effects, following `scripts/generate-robots.js`, `scripts/generate-llms.js`, `scripts/fix-html-lang.js`, and `scripts/clean-faq-rsc.js`.
- Explain intentionally swallowed errors with a compact reason, following the best-effort cache comments in `src/lib/githubStars.ts` and `src/lib/githubStarsClient.ts`.
- Write new code comments in English as required by `AGENTS.md`; existing Chinese domain commentary remains concentrated in `src/lib/leadAttribution.ts`, `src/components/home/assets.ts`, and `scripts/convert-images.js`.
- Keep comments focused on why. The performance explanations in `src/components/home/CTA.tsx` and `src/components/home/GlobeCanvas.tsx` document deferred mounting, animation loops, and GPU lifecycle constraints.
- Use JSDoc for exported behavior whose inputs carry URL or lifecycle conventions, following `getAlternates()` in `src/lib/seo.ts` and `htmlLangScript` in `src/lib/htmlLang.ts`.
- Use short exported-function documentation for domain behavior, following `getDescription()` in `src/lib/tech-center-content.ts` and attribution APIs in `src/lib/leadAttribution.ts`.
- Keep simple component props and pure helpers self-documenting through names and TypeScript types, following `PageImage` in `src/components/compare/ComparisonPage.tsx` and `normalizeDomain()` in `src/lib/attribution/primitives/domain.ts`.

## Function Design

## Module Design

## React and Next.js Patterns

- Keep server components as the default under `src/app/` and render interactive leaves through explicit `'use client';` modules. Examples include server route `src/app/page.tsx` and client leaves `src/components/home/HomeLayoutSwitcher.tsx`, `src/components/faq/FAQList.tsx`, and `src/app/LeadAttribution.tsx`.
- Place `'use client';` as the first statement in browser-only modules, following all client components under `src/components/home/` and analytics wrappers under `src/app/`.
- Mark filesystem and server-cache modules with `import 'server-only';`, following `src/lib/tech-center-content.ts` and `src/lib/githubStars.ts`.
- Keep route entries thin by delegating shared rendering and content resolution to components and loaders. `src/app/compare/[slug]/page.tsx` delegates to `src/components/compare/ComparisonRoute.tsx`, while localized article routes use `src/lib/tech-center-content.ts`.
- Generate static route params and metadata beside the route entry, following `src/app/[lang]/compare/[slug]/page.tsx`, `src/app/[lang]/faq/[id]/page.tsx`, and `src/app/[lang]/[section]/[slug]/page.tsx`.
- Use `next/image` for inspection-relevant content assets and icon libraries for controls, following `src/components/compare/ComparisonPage.tsx` and `src/components/tech-center/TechCenterPage.tsx`.
- Provide stable React keys from domain identifiers when available; `section.id` and link target/label pairs are used in `src/components/compare/ComparisonPage.tsx`.

## Domain and Data Patterns

- Keep locale ownership and URL construction centralized in `src/lib/siteRouting.ts`, `src/lib/localizedRoutes.ts`, and `src/lib/seo.ts`; new routes should consume these helpers for canonical, hreflang, sitemap, and navigation consistency.
- Treat content registries as typed production data. Competitor schemas live in `src/content/competitor/types.ts`, their loader lives in `src/content/competitor/loader.ts`, and public exports live in `src/content/competitor/index.ts`.
- Validate Markdown-derived content before publishing. `src/lib/tech-center-content.ts` checks front matter, allowed slug patterns, file mapping, and metadata derivation.
- Share cross-runtime policy values through JSON when both TypeScript and CommonJS scripts consume them, following `src/lib/faqMetadata.constants.json`, `src/lib/faqMetadata.ts`, and `scripts/verify-p2.js`.
- Keep environment-derived site variation behind typed helpers such as `currentSiteVariant`, `getLocaleOwner()`, and `getBuildLocaleCodes()` in `src/lib/siteRouting.ts`.

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## System Overview

```text

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

- App Router pages are thin adapters: they await route params, call `generateStaticParams`/`generateMetadata`, resolve dictionaries/content, then pass typed-ish props into components.
- Root and localized aliases intentionally share implementations. For example, `src/app/price/page.tsx` re-exports `src/app/[lang]/price/page.tsx`, while both home entry points render `HomeLanding`.
- Locale and site variant are first-class routing inputs. `src/lib/siteRouting.ts` assigns `zh` to `cn`, all other supported locales to `io`, and derives canonical URLs across domains.
- Content is compiled from JSON, TypeScript records, and Markdown. Server-only loaders read files during build/request generation; client components own filtering, animation, and browser URL state.
- Production uses `output: 'export'` when `NODE_ENV` is production. `Dockerfile` builds `out/` and serves it from Nginx; `public/_redirects` and `public/_headers` support Cloudflare Pages.

## Layers

- Purpose: Define URL topology, route parameters, static generation, metadata, not-found behavior, and schema entry points.
- Location: `src/app/`
- Contains: Root/layout files, localized dynamic segments, alias pages, `robots.ts`, and `sitemap.ts`.
- Depends on: `src/lib/i18n.ts`, `src/lib/siteRouting.ts`, content APIs, and presentation modules.
- Used by: Next.js App Router and static export build.
- Purpose: Provide shared navigation, theme, motion, footer, page-level visual wrappers, and home sections.
- Location: `src/components/home/`, `src/components/header/`, `src/components/ui/`
- Contains: `HomeLanding`, `Navbar`, `Footer`, CTA links, motion primitives, and button primitives.
- Depends on: locale dictionary props, `src/config/site.ts`, routing helpers, and browser APIs in client components.
- Used by: Home, FAQ, pricing, comparison, and technical center routes.
- Purpose: Render domain-specific workflows and interactions.
- Location: `src/components/faq/`, `src/components/compare/`, `src/components/tech-center/`, `src/components/price/`, `src/components/enterprise/`
- Contains: FAQ filters/cards, comparison tables, technical search/article views, pricing plans, and enterprise sections.
- Depends on: Domain content adapters and shared shell/schema components.
- Used by: Matching route files under `src/app/`.
- Purpose: Store localized copy, typed configuration, and authored content, then expose normalized data to routes/components.
- Location: `src/locales/`, `src/config/`, `src/faq/`, `src/content/`, `content/competitors/`, `src/components/tech-center/entries.json`
- Contains: Nine locale dictionaries, pricing/enterprise/site config, FAQ records, competitor Markdown, and technical-center index plus article Markdown.
- Depends on: Node filesystem only for server-side Markdown loaders.
- Used by: Route metadata, page components, JSON-LD, sitemap, and client UI props.
- Purpose: Normalize locale/path behavior, SEO alternates, cloud conversion links, GitHub stars, visitor IDs, and attribution persistence.
- Location: `src/lib/`
- Contains: `i18n.ts`, `locales.ts`, `siteRouting.ts`, `seo.ts`, `cloudEntryUrl.ts`, `leadAttribution.ts`, and attribution storage/primitives.
- Depends on: Environment configuration and browser storage where explicitly called from client code.
- Used by: Almost every route family and shared shell component.

## Data Flow

### Primary Request Path

### FAQ Flow

### Technical Article Flow

### Comparison Flow

- Server state is resolved during route rendering/build from dictionaries and authored content.
- Interactive state is local React state in client islands (`Navbar`, `FAQList`, `TechCenterPage`, home sections) and browser storage for stars/attribution.
- URL state is canonicalized by routing helpers on the server and updated with `history.replaceState` for technical-center filters.

## Key Abstractions

- Purpose: Provide one normalized copy object to routes and shared components.
- Examples: `src/lib/i18n.ts`, `src/locales/en.json`, `src/locales/zh.json`.
- Pattern: Normalize locale, dynamically import JSON, fall back to English for unsupported values.
- Purpose: Keep domain ownership and locale prefix rules consistent across links, metadata, schema, and sitemap.
- Examples: `src/lib/siteRouting.ts`, `src/lib/seo.ts`.
- Pattern: Normalize locale, choose `cn`/`io` owner, then generate path and absolute URL.
- Purpose: Keep list/search metadata cheap while loading full Markdown only for detail pages.
- Examples: `src/components/tech-center/entries.json`, `src/lib/tech-center-content.ts`, `src/content/competitor/loader.ts`.
- Pattern: Index records identify route slugs; server-only loaders validate and parse source files.
- Purpose: Preserve campaign parameters, visitor ID, and Rybbit event metadata on cloud CTAs.
- Examples: `src/components/home/CloudEntryLink.tsx`, `src/components/home/hooks/useStartUrl.ts`, `src/lib/cloudEntryUrl.ts`.
- Pattern: Render a client anchor with an initial target URL, then replace it after mount with a derived URL.

## Entry Points

- Location: `src/app/layout.tsx`
- Triggers: Every App Router route.
- Responsibilities: HTML language bootstrap, fonts, CSS, theme, motion, analytics, and attribution.
- Location: `src/app/page.tsx`
- Triggers: `/`.
- Responsibilities: Default-locale metadata, homepage schema, dictionary/stars loading, and `HomeLanding`.
- Location: `src/app/[lang]/page.tsx`
- Triggers: Locale-prefixed homepage paths.
- Responsibilities: Locale params, static locale generation, localized schema, dictionary/stars loading, and `HomeLanding`.
- Locations: `src/app/[lang]/faq/[id]/page.tsx`, `src/app/[lang]/[section]/[slug]/page.tsx`, `src/app/[lang]/compare/[slug]/page.tsx`
- Triggers: FAQ IDs, technical slugs, or competitor slugs.
- Responsibilities: Validate/resolve content, emit metadata/schema, call `notFound()` for unsupported routes, and render domain detail components.
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

### Loading Full Authored Documents in Index Views

### Duplicating Page Shells

## Error Handling

- Detail routes call `notFound()` when a slug/ID cannot be resolved (`src/app/[lang]/faq/[id]/page.tsx`, `src/app/[lang]/[section]/[slug]/page.tsx`, `src/app/[lang]/compare/[slug]/page.tsx`).
- Content loaders throw on malformed front matter or slug mismatches so build-time data errors are visible (`src/lib/tech-center-content.ts`).
- GitHub star fetch/cache and browser storage catch failures and return a validated fallback (`src/lib/githubStars.ts`, `src/lib/githubStarsClient.ts`).
- Optional analytics components return `null` when their public environment key is absent (`src/app/BaiDuAnalytics.tsx`, `src/app/ClarityAnalytics.tsx`, `src/app/RybbitAnalytics.tsx`).

## Cross-Cutting Concerns

<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| faq-translate | This skill should be used when the user asks to "翻译faq", "translate faq", "中文翻译", "translate to Chinese", "翻译成中文", mentions translating entries in faq.ts, or asks to add Chinese content to the FAQ data file. Provides structured guidance for translating English FAQ entries to Chinese for the fastgpt-home project. | `.claude/skills/faq-translate/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
