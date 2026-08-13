# Coding Conventions

**Analysis Date:** 2026-08-12

## Naming Patterns

**Files:**
- Name React component modules in PascalCase, matching their primary component: `src/components/compare/ComparisonPage.tsx`, `src/components/home/HomeLanding.tsx`, and `src/app/LeadAttribution.tsx`.
- Name shared library modules in descriptive camelCase or lowercase: `src/lib/siteRouting.ts`, `src/lib/faqMetadata.ts`, `src/lib/tech-center-content.ts`, and `src/lib/attribution/primitives/domain.ts`.
- Name Node build and verification scripts with action-oriented kebab-case: `scripts/generate-robots.js`, `scripts/fix-html-lang.js`, and `scripts/verify-i18n-seo.js`.
- Follow Next App Router reserved filenames under `src/app/`: `page.tsx`, `layout.tsx`, `not-found.tsx`, `robots.ts`, and `sitemap.ts`.
- Use `index.ts` or `index.tsx` only for a deliberate directory API. Existing barrels are `src/components/enterprise/index.ts`, `src/components/icons/index.tsx`, `src/content/competitor/index.ts`, and `src/faq/index.ts`.
- Keep scoped styling beside its component with `*.module.css`, following `src/components/tech-center/TechArticlePage.module.css` and `src/components/tech-center/TechCenterPage.module.css`.

**Functions:**
- Use camelCase verbs for functions and helpers: `getOwnedLocaleUrl()` in `src/lib/siteRouting.ts`, `normalizeFaqMetadata()` in `src/lib/faqMetadata.ts`, and `verifyHeadingSequence()` in `scripts/verify-p2.js`.
- Use PascalCase for React components: `ComparisonPage` in `src/components/compare/ComparisonPage.tsx` and `TechCenterPage` in `src/components/tech-center/TechCenterPage.tsx`.
- Prefix React hooks with `use`, following `useStartUrl()` in `src/components/home/hooks/useStartUrl.ts`.
- Prefix assertion groups in artifact checks with `verify`, following `verifySitemap()` in `scripts/verify-i18n-seo.js` and `verifyInitialJavaScript()` in `scripts/verify-p1.js`.
- Use `get`, `build`, `resolve`, `normalize`, `parse`, `validate`, `read`, `write`, and `clear` to expose intent in domain helpers, as demonstrated throughout `src/lib/attribution/`.

**Variables:**
- Use camelCase for local values and parameters: `currentHostname`, `normalizedDomain`, and `configuredDomain` in `src/lib/attribution/primitives/domain.ts`.
- Use uppercase snake case for fixed module-level constants with policy meaning: `DEFAULT_DOMAIN` in `src/lib/attribution/primitives/domain.ts`, `FIELD_CAPS` in `src/lib/attribution/primitives/envelope.ts`, and `DESCRIPTION_LIMIT` in `src/lib/tech-center-content.ts`.
- Lowercase module constants are also established for local configuration values, such as `baseUrl` and `defaultLocale` in `scripts/verify-p1.js`; preserve the surrounding module's style when editing an existing file.
- Use descriptive collection names and pluralization: `supportedLocaleCodes` in `src/lib/locales.ts`, `compareSlugs` in `scripts/verify-i18n-seo.js`, and `scriptSources` in `scripts/verify-p1.js`.

**Types:**
- Use PascalCase for type aliases and interfaces: `DomainDecision` in `src/lib/attribution/primitives/domain.ts`, `ValidationResult` in `src/lib/attribution/primitives/envelope.ts`, and `ComparisonPage` in `src/content/competitor/types.ts`.
- Derive literal unions from `as const` collections where values also drive runtime behavior, following `siteVariants` and `SiteVariant` in `src/lib/siteRouting.ts` and `RYBBIT_EVENTS` in `src/lib/rybbitEvents.ts`.
- Use discriminated unions for operations that can fail with structured reasons, following `ValidationResult<T>` in `src/lib/attribution/primitives/envelope.ts` and `DomainDecision` in `src/lib/attribution/primitives/domain.ts`.
- Import colliding domain types under a descriptive alias, following `ComparisonPage as ComparisonPageData` in `src/components/compare/ComparisonPage.tsx`.

## Code Style

**Formatting:**
- Format TypeScript, TSX, and SCSS with Prettier 2.8.8 through `npm run format-code` in `package.json`; the command targets `**/src/**/*.{ts,tsx,scss}`.
- Use 2-space indentation, semicolons, single quotes in JavaScript/TypeScript, double quotes in JSX attributes, 100-character lines, spaces inside object braces, parenthesized arrow parameters, and LF endings from `.prettierrc.js`.
- Let Prettier own TypeScript and TSX formatting in editors; `.vscode/settings.json` enables format-on-save with `esbenp.prettier-vscode` and the repository-local Prettier package.
- Review formatting for root configuration and `scripts/*.js` manually because the `format-code` glob in `package.json` covers `src/` only.
- Treat `.prettierrc.js` as the formatter authority for source files. `.editorconfig` declares CRLF and omits final newline, while `.prettierrc.js` declares LF; the checked TypeScript and TSX style follows Prettier.

**Linting:**
- Run `npm run lint` from `package.json` for `src/**/*.{js,jsx,ts,tsx}`.
- Follow Next Core Web Vitals through `eslint.config.mjs`; `react-hooks/immutability`, `react-hooks/set-state-in-effect`, and `react-hooks/static-components` are warning-level rules.
- Keep generated or dependency surfaces out of lint: `node_modules/**`, `.next/**`, `out/**`, `build/**`, `next-env.d.ts`, and `tsconfig.tsbuildinfo` are ignored in `eslint.config.mjs`.
- Run `npx tsc --noEmit` for strict typing. `tsconfig.json` enables `strict`, `isolatedModules`, JSON imports, bundler module resolution, and `noEmit`.
- Apply direct review or the relevant verification command to `scripts/*.js`, root configuration, Markdown content, and workflow YAML because the lint command in `package.json` scopes itself to `src/`.

## Import Organization

**Order:**
1. Put framework, package, and platform imports first, as `next/image`, `next/link`, and `lucide-react` appear first in `src/components/compare/ComparisonPage.tsx`.
2. Put absolute project imports through `@/` next, as in `src/lib/seo.ts` and `src/components/compare/ComparisonPage.tsx`.
3. Put same-directory relative imports last, as `./ComparisonTables` and `./comparisonCopy` do in `src/components/compare/ComparisonPage.tsx`.
4. Use `import type` or inline `type` modifiers for type-only dependencies, following `src/lib/attribution/primitives/envelope.ts` and `src/lib/siteRouting.ts`.
5. Use the `node:` prefix for Node built-ins in new server and verification code, following `src/lib/tech-center-content.ts` and `scripts/verify-p0.js`.

**Path Aliases:**
- Use `@/*` for imports rooted at `src/*`; the mapping is defined in `tsconfig.json` and mirrored for components and utilities in `components.json`.
- Use relative imports inside a cohesive submodule when the dependency is a sibling implementation detail, following `src/lib/attribution/primitives/codec.ts` and `src/lib/attribution/storage/migration.ts`.
- Preserve explicit runtime boundaries with side-effect imports: `src/lib/githubStars.ts` and `src/lib/tech-center-content.ts` import `server-only`.

## Error Handling

**Patterns:**
- Validate untrusted values at boundaries before casting. `validateStoredAttribution()` in `src/lib/attribution/primitives/envelope.ts` accepts `unknown`, rejects unknown fields, checks caps and timestamps, then returns a discriminated result.
- Return structured reason codes for expected policy and storage outcomes, following `DomainDecision` in `src/lib/attribution/primitives/domain.ts` and `StorageResult<T>` in `src/lib/attribution/storage/status.ts`.
- Throw descriptive errors for invalid repository-owned content and impossible configuration, following front-matter, slug, and path checks in `src/lib/tech-center-content.ts` and competitor data checks in `src/content/competitor/loader.ts`.
- Use Next control flow for missing route data. `src/components/compare/ComparisonRoute.tsx`, `src/app/[lang]/[section]/[slug]/page.tsx`, and `src/app/[lang]/faq/[id]/page.tsx` call `notFound()`.
- Catch recoverable cache, storage, analytics, and attribution failures at their I/O boundary and return a stable result, following `src/lib/githubStars.ts`, `src/lib/githubStarsClient.ts`, `src/lib/visitorId.ts`, and `src/lib/attribution/storage/local-storage.ts`.
- Keep optional integrations from blocking rendering. Analytics components such as `src/app/BaiDuAnalytics.tsx` return `null` when configuration is absent, and `src/lib/githubStars.ts` returns a cache or display fallback after fetch failure.
- Make CLI validation failures observable through a thrown assertion, `console.error`, and exit status 1, following `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, and `scripts/verify-i18n-seo.js`.

## Logging

**Framework:** Native `console` calls in operational Node scripts; application modules generally communicate expected outcomes through typed return values. Examples are `scripts/generate-robots.js`, `scripts/clean-locales.js`, and `src/lib/attribution/storage/status.ts`.

**Patterns:**
- Log one concise success message after a complete verification pass, following the `P0 verification passed`, `P1 verification passed`, `P2 verification passed`, and `i18n SEO verification passed` messages in `scripts/verify-*.js`.
- Send actionable validation failures to `console.error` and exit nonzero, following every `scripts/verify-*.js` entry point and `scripts/clean-locales.js`.
- Prefix generator output with the script identity where multiple build steps run together, following `[generate-robots]` in `scripts/generate-robots.js` and `[generate-llms]` in `scripts/generate-llms.js`.
- Keep expected browser fallback paths quiet and expose state through return values, following `src/lib/attribution/storage/adapter.ts`, `src/lib/githubStarsClient.ts`, and `src/lib/visitorId.ts`.

## Comments

**When to Comment:**
- Explain constraints, lifecycle timing, business policy, and side effects that types cannot express. Strong examples are the static-export rationale in `next.config.js`, file-limit rationale in `scripts/clean-faq-rsc.js`, and hydration timing in `src/lib/htmlLang.ts`.
- Place a short file header on build scripts with broad filesystem effects, following `scripts/generate-robots.js`, `scripts/generate-llms.js`, `scripts/fix-html-lang.js`, and `scripts/clean-faq-rsc.js`.
- Explain intentionally swallowed errors with a compact reason, following the best-effort cache comments in `src/lib/githubStars.ts` and `src/lib/githubStarsClient.ts`.
- Write new code comments in English as required by `AGENTS.md`; existing Chinese domain commentary remains concentrated in `src/lib/leadAttribution.ts`, `src/components/home/assets.ts`, and `scripts/convert-images.js`.
- Keep comments focused on why. The performance explanations in `src/components/home/CTA.tsx` and `src/components/home/GlobeCanvas.tsx` document deferred mounting, animation loops, and GPU lifecycle constraints.

**JSDoc/TSDoc:**
- Use JSDoc for exported behavior whose inputs carry URL or lifecycle conventions, following `getAlternates()` in `src/lib/seo.ts` and `htmlLangScript` in `src/lib/htmlLang.ts`.
- Use short exported-function documentation for domain behavior, following `getDescription()` in `src/lib/tech-center-content.ts` and attribution APIs in `src/lib/leadAttribution.ts`.
- Keep simple component props and pure helpers self-documenting through names and TypeScript types, following `PageImage` in `src/components/compare/ComparisonPage.tsx` and `normalizeDomain()` in `src/lib/attribution/primitives/domain.ts`.

## Function Design

**Size:** Keep reusable transformations small and pure, following `canonicalizeUrl()` in `src/lib/attribution/primitives/url.ts`, `encodedByteLength()` in `src/lib/attribution/primitives/capacity.ts`, and routing helpers in `src/lib/siteRouting.ts`. Split large workflows into named policy and I/O helpers, following the `verify*` groups in `scripts/verify-p1.js` and the `primitives/` versus `storage/` split under `src/lib/attribution/`.

**Parameters:** Destructure React props at the component boundary, as `ComparisonPage()` does in `src/components/compare/ComparisonPage.tsx`. Use typed object parameters for related options, following `AttributionAdapterOptions` in `src/lib/attribution/storage/adapter.ts`. Put optional defaults in the signature, following `getPublishedLocaleCodes()` in `src/lib/siteRouting.ts` and `resolveHtml()` in `scripts/verify-p2.js`.

**Return Values:** Declare return types where exported contracts or runtime narrowing matter, following `resolveCookieDomain(): DomainDecision` in `src/lib/attribution/primitives/domain.ts` and `getGitHubStars(): Promise<number>` in `src/lib/githubStars.ts`. Return stable empty values for optional rendering and integrations, following JSON-LD helpers in `src/components/JsonLd.tsx`. Use structured success/failure unions for recoverable validation and storage operations throughout `src/lib/attribution/`.

## Module Design

**Exports:** Default-export Next route components and modules with one primary UI surface, following `src/app/page.tsx`, `src/components/compare/ComparisonPage.tsx`, and `src/components/home/HomeLanding.tsx`. Named-export reusable functions, constants, and types, following `src/lib/siteRouting.ts`, `src/lib/faqMetadata.ts`, and `src/lib/attribution/primitives/envelope.ts`. Keep private helpers beside their public entry point, as `normalizeDomain()` sits beside `resolveCookieDomain()` in `src/lib/attribution/primitives/domain.ts`.

**Barrel Files:** Maintain barrels only for intentional public boundaries: `src/components/enterprise/index.ts`, `src/components/icons/index.tsx`, `src/content/competitor/index.ts`, and `src/faq/index.ts`. Import concrete modules directly elsewhere, following `src/components/compare/ComparisonPage.tsx` and `src/app/layout.tsx`.

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

---

*Convention analysis: 2026-08-12*
