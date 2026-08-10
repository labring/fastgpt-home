# Codebase Structure

**Analysis Date:** 2026-08-10

## Directory Layout

```
fastgpt-home/
|-- src/                   # Application source, content, and UI
|   |-- app/               # Next.js App Router routes and metadata
|   |-- components/        # Feature components by page area
|   |-- config/            # Site, pricing, and enterprise config
|   |-- content/           # Long-form markdown content and registries
|   |-- faq/               # FAQ datasets and legacy metadata
|   |-- lib/               # Shared helpers for locale, SEO, routing, and data
|   |-- locales/           # Locale JSON dictionaries
|   |-- styles/            # Global CSS
|   `-- types/             # Shared TypeScript types
|-- public/                # Static assets, redirects, robots, and exported images
|-- scripts/               # Generate, clean, and verify scripts
|-- .planning/             # Planning output and codebase maps
|-- package.json           # Scripts, dependencies, and engine settings
|-- package-lock.json      # npm lockfile
|-- next.config.js         # Next.js build and export configuration
|-- tailwind.config.ts     # Tailwind tokens and animations
|-- tsconfig.json          # TypeScript compiler settings
|-- postcss.config.js      # PostCSS pipeline
|-- .prettierrc.js         # Formatting rules
|-- gtag.js                # Google Analytics tracking id helper
|-- nginx.conf             # Static hosting config
`-- nginx-security-headers.conf  # Security header include set
```

## Directory Purposes

**src/app/**
- Purpose: route entry points, metadata, and locale-aware page composition
- Contains: `page.tsx`, `layout.tsx`, `not-found.tsx`, dynamic route folders
- Key files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/[lang]/page.tsx`, `src/app/[lang]/price/page.tsx`, `src/app/[lang]/tech-center/page.tsx`, `src/app/[lang]/faq/[id]/page.tsx`
- Subdirectories: `faq/`, `compare/`, `tech-center/`, `[lang]/`, and nested dynamic content routes

**src/components/**
- Purpose: reusable UI sections and feature components
- Contains: React components grouped by feature area
- Key files: `src/components/home/*`, `src/components/faq/*`, `src/components/tech-center/*`, `src/components/price/*`, `src/components/compare/*`, `src/components/ui/button.tsx`
- Subdirectories: `home/`, `tech-center/`, `faq/`, `enterprise/`, `price/`, `compare/`, `icons/`, `ui/`

**src/content/**
- Purpose: source documents and content registries
- Contains: Markdown articles and supporting registry files
- Key files: `src/content/tech-center/entries.json`, `src/content/competitor/*.ts`
- Subdirectories: `tech-center/api/`, `tech-center/dataset/`, `tech-center/deploy/`, `tech-center/integration/`, `tech-center/node/`, `tech-center/troubleshoot/`, `tech-center/tutorial/`

**src/faq/**
- Purpose: FAQ source data and legacy compatibility helpers
- Contains: locale datasets, category helpers, and metadata
- Key files: `src/faq/en.ts`, `src/faq/zh.ts`, `src/faq/w2.ts`, `src/faq/index.ts`, `src/faq/legacyMeta.ts`
- Subdirectories: flat module set

**src/lib/**
- Purpose: shared routing, SEO, content loading, analytics, and utility helpers
- Contains: pure helpers and server-side loaders
- Key files: `src/lib/i18n.ts`, `src/lib/siteRouting.ts`, `src/lib/seo.ts`, `src/lib/tech-center-content.ts`, `src/lib/githubStars.ts`, `src/lib/leadAttribution.ts`
- Subdirectories: flat module set

**src/locales/**
- Purpose: locale dictionaries loaded by `getDictionary()`
- Contains: JSON translation files
- Key files: `en.json`, `zh.json`, `zh-hant.json`, `ja.json`, `ar.json`, `vi.json`, `th.json`, `id.json`, `ms.json`
- Subdirectories: none

**public/**
- Purpose: static export assets and hosting support files
- Contains: images, social cards, robots, redirects, and favicon assets
- Key files: `public/robots.txt`, `public/_redirects`, `public/opengraph-image.png`, `public/twitter-image.png`
- Subdirectories: image trees for hero, home, FAQ, and social assets

**scripts/**
- Purpose: build-time generation, cleanup, and verification scripts
- Contains: Node.js scripts that act on the exported site
- Key files: `scripts/generate-robots.js`, `scripts/generate-llms.js`, `scripts/clean-locales.js`, `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, `scripts/verify-i18n-seo.js`
- Subdirectories: flat module set

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx` - root HTML shell and providers
- `src/app/page.tsx` - root home page
- `src/app/[lang]/page.tsx` - localized home page
- `src/app/[lang]/price/page.tsx` - localized pricing page
- `src/app/[lang]/tech-center/page.tsx` - localized tech-center hub
- `src/app/[lang]/faq/[id]/page.tsx` - localized FAQ detail page
- `src/app/[lang]/[section]/[slug]/page.tsx` - localized tech article route

**Configuration:**
- `package.json` - scripts, dependencies, engines
- `next.config.js` - static export, headers, and image settings
- `tsconfig.json` - path alias and compiler flags
- `tailwind.config.ts` - theme tokens and animations
- `postcss.config.js` - PostCSS pipeline
- `.prettierrc.js` - formatting rules
- `gtag.js` - Google Analytics id helper

**Core Logic:**
- `src/lib/i18n.ts` - locale selection and dictionary loading
- `src/lib/siteRouting.ts` - domain ownership and locale URL helpers
- `src/lib/seo.ts` - canonical and alternate metadata helpers
- `src/lib/tech-center-content.ts` - markdown loading and article description derivation
- `src/lib/githubStars.ts` - GitHub star fetch and local fallback cache
- `src/lib/leadAttribution.ts` - browser attribution capture and CRM reporting

**Testing:**
- `scripts/verify-p0.js` - static asset and redirect checks
- `scripts/verify-p1.js` - metadata and image checks
- `scripts/verify-p2.js` - heading and route checks
- `scripts/verify-i18n-seo.js` - canonical and hreflang checks

## Naming Conventions

**Files:**
- `page.tsx`, `layout.tsx`, `not-found.tsx` for route files
- `PascalCase.tsx` for React components
- `camelCase.ts` for helpers and services
- `kebab-case.md` for content articles
- `*.json` for locale dictionaries and registries

**Directories:**
- `kebab-case` for most folders
- `src/app/[lang]/...` for locale-aware routes
- `src/content/tech-center/<category>/` for article groups

**Special Patterns:**
- `index.ts` for barrel exports and data entry points
- `[lang]`, `[id]`, `[slug]`, and `[section]` for dynamic routes
- `entries.json` for the tech-center registry

## Where to Add New Code

**New Feature:**
- Primary code: `src/components/<feature>/` and `src/app/[lang]/...`
- Tests: `scripts/verify-*.js` style checks or a future test folder
- Config if needed: `src/config/` and `src/lib/`

**New Component/Module:**
- Implementation: `src/components/<area>/`
- Types: `src/types/` or colocated `type` declarations
- Tests: script-level verification or a future `tests/` tree

**New Route:**
- Definition: `src/app/[lang]/.../page.tsx` or `src/app/.../page.tsx`
- Shared helpers: `src/lib/`
- Metadata: route-local `generateMetadata()` plus `src/lib/seo.ts`

**Utilities:**
- Shared helpers: `src/lib/`
- Type definitions: `src/types/`
- Locale data: `src/locales/`

## Special Directories

**public/**
- Purpose: static assets and deployment support files
- Source: authored assets and generated redirects
- Committed: yes

**.cache/**
- Purpose: local runtime cache for GitHub stars
- Source: created by `src/lib/githubStars.ts`
- Committed: no

**out/**
- Purpose: static export artifact
- Source: generated by `next build`
- Committed: no

**src/content/tech-center/**
- Purpose: long-form technical content source
- Source: authored markdown and registry data
- Committed: yes

---

*Structure analysis: 2026-08-10*
*Update when directory structure changes*
