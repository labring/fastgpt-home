# W9 P0 Industry pages implementation plan

**Status:** Industry full release implemented and verified  
**Date:** 2026-09-20  
**Source:** [`README-W9内容交付说明.md`](/Users/longnv/bin/repo/fastgpt-data/W9-内容交付-完整版-20260916/README-W9内容交付说明.md)

## Goal

Provide the smallest production-ready route contract for W9 Industry pages and publish the complete approved Industry inventory in one release.

## Confirmed boundaries

- W9 contains 19,080 Industry Markdown pages: 9,000 Chinese and 9,000 English pages by service-object industry, 900 Chinese financial-business pages, and 180 Chinese operation-step pages.
- The approved W9 Industry inventory is copied into repository-owned Markdown under `src/content/industry/{zh,en}`.
- The loader requires `date_published` and `date_modified`; both release dates are `2026-09-15`.
- The release contains 10,080 Chinese pages for `fastgpt.cn` and 9,000 English pages for `fastgpt.io`.
- Existing Guide and Reference pipelines remain in place for their own route families.
- The existing root sitemap receives Industry URLs. A separate sitemap file remains a later operational option.
- No standalone publication registry, per-page status JSON, or hand-maintained sitemap list is added.

## Current constraints

- Production uses static export, so every published Industry identity must be available during the build.
- `TechArticlePage` currently restricts category and source types to Technical Center values. Industry pages keep their own domain adapter and preserve the existing Technical Center taxonomy.
- W9 Guide and Reference files require metadata normalization before they can enter their existing pipelines.
- English Industry pages keep their source keyword omission; Chinese Industry pages keep their approved keywords.

## P0 design

### 1. Source contract

The Industry loader accepts a locale-scoped Markdown document with:

- `title`: required, reader-facing H1 source
- `slug`: required, `/industry/{slug}` owner-relative path
- `page_type`: required
- non-empty Markdown body
- publishable SEO metadata (`meta_title`, `meta_description`, `date_published`, and `date_modified`) for an indexable document

The loader derives locale from the source directory and derives the production owner from locale ownership. A source with an invalid slug, missing body, unsafe path, or incomplete publishable metadata fails the build with the file path and field name.

### 2. Build-time content API

Add a server-only `industry-content` module that:

1. Enumerates fixed locale directories at build time.
2. Parses frontmatter and normalizes line endings.
3. Validates the source contract and slug uniqueness within each locale.
4. Returns typed Industry articles for route, metadata, and sitemap consumers.
5. Reads the body without exposing delivery metadata in the rendered article.

The module is the single runtime source for Industry page identity. Delivery schedules and batch status stay in the content-data workspace.

### 3. Routes

- Add a localized review route at `src/app/[lang]/industry/[slug]/page.tsx`; production builds keep one owner-locale parameter for the static-export requirement and use the owner-relative route for the full inventory.
- Add a production owner-relative alias at `src/app/industry/[slug]/page.tsx`, following the existing Reference alias pattern.
- Set `dynamicParams = false` and derive both route parameter sets from the loader.
- Render a lightweight Industry article adapter that reuses existing Markdown, CTA, navigation, and JSON-LD primitives while keeping Industry metadata outside Technical Center unions.

### 4. Metadata and ownership

For each indexable article:

- canonical: `getOwnedLocaleUrl(locale, /industry/{slug})`
- language alternates: the article's Published Locale Set plus `x-default` when English is present
- robots: indexable on production owner routes, `noindex,nofollow` on preview review routes
- Open Graph URL and JSON-LD URL: the same canonical
- `dateModified`: the normalized source date

Chinese pages publish on `fastgpt.cn`; English pages publish on `fastgpt.io`. Preview keeps locale-prefixed review paths and production-owner canonical metadata.

### 5. Sitemap

Extend `src/app/sitemap.ts` to derive Industry entries from the loader and pass them through the existing `seenUrls` de-duplication. Include only URLs owned by the current Site Variant. Keep the existing root `robots.txt` sitemap declaration.

### 6. Verification

Add a focused Industry source/export check covering:

- frontmatter parsing and required fields
- slug safety and duplicate detection
- locale ownership and canonical projection
- preview robots behavior
- root sitemap membership and de-duplication
- body rendering without delivery metadata

P0 validation commands:

```text
npx tsc --noEmit
npm run lint
npm run verify:i18n-seo
npm run build
```

The Industry loader validates the complete W9 inventory while the build resolves its static routes.

Release verification completed on 2026-09-20:

- `npm run build` passed for `NEXT_PUBLIC_SITE_VARIANT=cn`: 22,613 generated pages, 17,900 final HTML files.
- `npm run build` passed for `NEXT_PUBLIC_SITE_VARIANT=io`: 12,220 generated pages, 11,379 final HTML files.
- Industry output contains 10,080 China-site pages or 9,000 International-site pages per build, with matching sitemap ownership.
- Source and exported-body hashes match all 19,080 delivery bodies.

## P1 handoff

Remaining P1 work covers non-Industry W9 families and content review:

1. Normalize Guide, Reference, and deep-content frontmatter.
2. Fill or approve missing SEO metadata.
3. Validate public references, version claims, financial source caveats, and dates.
4. Copy approved Guide, Reference, and deep-content sources into their existing pipelines.
5. Run their static export and inspect page, sitemap, and indexability cardinality.

## P0 done criteria

Industry release is complete when the full source inventory, owner-correct sitemap, dual-site static exports, and source/HTML hygiene gates pass without adding a publication registry or changing existing Guide, Reference, or Technical Center identity rules.
