# Coding Conventions

**Analysis Date:** 2026-08-10

## Naming Patterns

**Files:**
- `page.tsx`, `layout.tsx`, and `not-found.tsx` for App Router entries
- `PascalCase.tsx` for React components such as `HomeLanding.tsx` and `TechCenterPage.tsx`
- `camelCase.ts` for helpers such as `siteRouting.ts`, `leadAttribution.ts`, and `githubStars.ts`
- `kebab-case.md` for content files under `src/content/tech-center/`
- `*.json` for locale dictionaries and registries such as `src/locales/en.json` and `entries.json`

**Functions:**
- camelCase for helpers and component functions
- `get*`, `resolve*`, `normalize*`, `format*`, and `track*` prefixes for intent
- Route metadata functions use the Next.js names `generateMetadata()` and `generateStaticParams()`

**Variables:**
- camelCase for local values and config maps
- UPPER_SNAKE_CASE for environment-like constants and asset roots
- Const arrays often drive union types, for example locale definitions in `src/lib/locales.ts`

**Types:**
- PascalCase for interfaces, type aliases, and React props
- Union types often derive from `as const` arrays
- `type` aliases appear more often than enums

## Code Style

**Formatting:**
- Prettier with `.prettierrc.js`
- 100 character print width
- Single quotes for strings
- Semicolons enabled
- 2 space indentation
- Trailing commas disabled

**Styling:**
- Tailwind utilities carry most layout and visual styling
- CSS Modules appear when a section needs denser local layout control, for example `src/components/tech-center/*.module.css`
- Global CSS in `src/styles/globals.css` defines shared tokens and theme variables

**Linting:**
- ESLint through `npm run lint`
- React and Next.js conventions follow repository defaults from `eslint-config-next`

## Import Organization

**Order:**
1. External packages such as `react`, `next`, `framer-motion`, and `lucide-react`
2. Internal modules from `@/lib`, `@/components`, `@/config`, and `@/types`
3. Relative imports for nearby modules and styles
4. Type-only imports near the value import they support

**Grouping:**
- Imports cluster by source type
- Blank lines separate external, internal, and relative groups
- Type imports appear alongside the related symbol set

**Path Aliases:**
- `@/*` maps to `src/*`

## Error Handling

**Patterns:**
- Route-level content lookups raise `notFound()` for missing pages
- File parsers throw explicit errors when front matter or slugs drift
- External network calls use try/catch at the boundary and return fallback values
- Browser-side analytics and attribution helpers return early when configuration is missing

**Error Types:**
- Build-time errors surface for malformed content or registry drift
- Runtime helper failures stay local to the feature boundary
- Fetch and cache failures fall back to cached or default values

## Logging

**Framework:**
- Console output in verification and build scripts
- Runtime app code relies on boundary fallbacks rather than a logger abstraction

**Patterns:**
- Verification scripts print a single success message or an assert-driven failure
- Runtime helpers prefer silent fallback paths for analytics and attribution
- External calls stay minimal and avoid noisy logs in the user-facing site

## Comments

**When to Comment:**
- Explain why a block exists, especially around SEO, motion, and export quirks
- Document performance tradeoffs around delayed WebGL, viewport observers, and locale routing
- Keep comments short and practical

**JSDoc/TSDoc:**
- Public helper functions in `src/lib/` often include a concise doc comment
- Route metadata helpers use focused comments when metadata behavior needs a reminder

**TODO Comments:**
- Rare in the current tree
- Prefer code cleanup or a follow-up task over long-lived comment debt

## Function Design

**Size:**
- Small helpers dominate the codebase
- Complex flows split into dedicated utility functions and React sections

**Parameters:**
- Object parameters appear once a function needs several inputs
- Route helpers often accept `locale`, `path`, and `faqId` style inputs

**Return Values:**
- Early returns keep helpers easy to scan
- Derived values such as metadata and page props return structured objects

## Module Design

**Exports:**
- Default exports for React components and route files
- Named exports for utilities, helpers, and registries
- `server-only` guards appear in server-side helper modules

**Barrel Files:**
- `index.ts` files gather feature exports where a folder has a public surface
- Shared registries live in dedicated modules such as `src/components/tech-center/data.ts`

---

*Convention analysis: 2026-08-10*
*Update when patterns change*
