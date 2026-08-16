# Stack Research

**Domain:** Static bilingual Guide content center for an existing Next.js SEO site
**Researched:** 2026-08-16
**Confidence:** MEDIUM — the repository integrations are directly verified; version-sensitive Next.js behavior is confirmed against current official documentation.

## Recommended Stack

Publish Guide with the stack already in the repository. The milestone needs a small, typed local content registry and a build-time Markdown loader; it needs no new runtime, package, service, or deployment platform. This is the shortest safe path because production is a Next.js static export and all 16 approved documents already exist locally.

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js App Router | `16.2.6` | `/guide` hub and `/guide/[slug]` static routes, route metadata, sitemap export | Existing production routing uses this exact model. `generateStaticParams` can enumerate the eight approved slugs at build time, while `dynamicParams = false` makes every unregistered path a static 404. |
| React | `19.2.6` | Server-rendered hub/article composition | The current site shell, article layout, navigation, footer, JSON-LD, and Markdown renderer are React components. Keep Guide rendering server-side and limit interactivity to existing shared leaves. |
| TypeScript | `5.9.3` | Single paired Guide registry and route/SEO helpers | A typed registry makes each slug, localized title/description, dates, category, image metadata, and internal links available to route generation, hub cards, sitemap, metadata, JSON-LD, and verification from one source. |
| Node.js built-ins + `server-only` | Node `>=18`, `server-only@0.0.1` | Build-time Guide Markdown loader and validation | `src/lib/tech-center-content.ts` already proves the project pattern: `node:fs` and `node:path` read repository-owned Markdown during static generation. A Guide loader can parse the supplied leading HTML delivery-metadata block without adding `gray-matter` or a Markdown package. |

### Supporting Libraries and Existing Components

| Library / component | Version | Purpose | When to Use |
|---------------------|---------|---------|-------------|
| `src/lib/siteRouting.ts` | existing | Owned Chinese/English absolute URLs | Use `getOwnedLocaleUrl('zh', path)` and `getOwnedLocaleUrl('en', path)` for every Guide canonical, alternate, sitemap item, breadcrumb, and internal link. It already maps Chinese to `fastgpt.cn` and English to `fastgpt.io`. |
| `src/lib/seo.ts` | existing | `Metadata['alternates']` helpers | Add `getGuideCanonicalUrl`, `getGuideAlternates`, and hub equivalents beside the comparison helpers. Each paired article emits self canonical plus `zh-CN`, `en`, and English `x-default` from the same slug. |
| `src/components/tech-center/MarkdownContent.tsx` | existing | Render approved Markdown body | Reuse its headings, paragraphs, lists, tables, blockquotes, code, and safe internal/external link behavior. Pass only the approved body after stripping the explicitly non-published delivery-metadata comment. |
| `ArticleJsonLd`, `BreadcrumbJsonLd`, `JsonLdScript` | existing | Article and hub structured data | Use `ArticleJsonLd` and `BreadcrumbJsonLd` for every detail page; use `JsonLdScript` for hub `CollectionPage` plus `ItemList`, following `ComparisonHubRoute`. Keep Article images as explicit public assets when a source document requires one. |
| `next/image` | bundled with Next.js | Guide visual assets | Use for the four articles whose source package requests an illustration. Put approved assets under `public/images/guide/`, record `path`, `alt`, `width`, and `height` in the registry, and keep the current `images.unoptimized: true` static-export configuration. |
| Existing Node verification scripts | existing | Source and export regression gates | Add a focused Guide verification script and extend `verify:i18n-seo` / `verify:release` assertions. These scripts already inspect emitted static HTML and the active variant's sitemap with Node built-ins. |

### Development and Release Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| npm + `npm run build` | Static export | Build once per site variant with the existing `NEXT_PUBLIC_SITE_VARIANT`, home URL, and language-region environment values. The Guide source must be present in the repository at build time. |
| `npx --no-install tsc --noEmit` | Registry and route type check | The release gate already executes it. Retain literal locale/slug types to catch a missing peer document before export. |
| `npm run verify:i18n-seo` | Static HTML SEO check | Extend with the Guide hub and all eight details for the active domain: generated HTML exists, canonical is owned and self-referential, alternate set is exactly `zh-CN`/`en`/`x-default`, and sitemap contains only the variant's owned Guide URLs. |
| `npm run verify:release` | Two-variant release gate | Extend export-cardinality checks with Guide expectations: 9 Guide URLs on `cn` and 9 on `io`; retain the existing build and SEO gates. |
| `curl` | Production live verification | After deployment, query all 18 owned URLs and their HTML heads for status, canonical, alternate links, indexability, and sitemap membership. `curl` is sufficient for the fixed 16-page release. |

## Required Integration Shape

1. **Repository-owned content:** copy the approved files into a dedicated local Guide content tree such as `src/content/guide/{zh,en}/<slug>.md`. Preserve the approved body byte-for-byte after removing only the leading `<!-- … -->` block that the source labels as non-published delivery metadata. Keep the source quotation/footer content as authored body content.
2. **One paired registry:** add a compact module such as `src/content/guide/index.ts` containing the fixed eight-slug order, both locale records, category (`decision`, `implementation`, or `industry`), approved metadata, publication/modified dates, asset metadata, and source-file path. Validate that the Chinese and English key sets match exactly. This is the Guide equivalent of `src/content/competitor/index.ts`, with one immutable route identity per pair.
3. **Build-time loader:** add `src/lib/guide-content.ts`, modeled on `tech-center-content.ts`, to read a registry-selected Markdown file through `node:fs`, remove only the delivery comment, and fail the build on missing file, slug mismatch, unpaired locale, malformed required metadata, or unexpected asset reference.
4. **Routes:** use the existing comparison route topology: root `src/app/guide/page.tsx` and `src/app/guide/[slug]/page.tsx` resolve the default locale; localized `src/app/[lang]/guide/**` exists only for the Chinese preview/legacy build surface and carries the existing noindex treatment where applicable. Production owned pages remain exactly `/guide` and `/guide/<slug>` on both domains.
5. **SEO and discovery:** derive route metadata, Article/Breadcrumb JSON-LD, hub CollectionPage/ItemList JSON-LD, hub card URLs, in-article links, and sitemap URLs from the same registry. Add the hub and article entries to the existing root `src/app/sitemap.ts`; 18 URLs are well within one sitemap and remain covered by the current release verifier.
6. **Assets:** add only the approved illustrations required by the Week04 source package. Store local, dimensioned assets in `public/images/guide/`; retain text-only presentation where a source specifies no image.

## Installation

```bash
# No package installation is required for the Guide milestone.

# Existing release checks
npx --no-install tsc --noEmit
npm run build
npm run verify:i18n-seo
npm run verify:release
```

`package.json` and `package-lock.json` should remain unchanged.

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Local typed paired registry + filesystem loader | Headless CMS or remote API | Use when non-developers need frequent independent publishing, scheduling, approval workflows, or a content volume that makes repository review impractical. It would require a build-time synchronization and failure strategy that this fixed 16-page release does not need. |
| Existing `MarkdownContent` | `react-markdown`, MDX, or a custom parser package | Use when the approved corpus requires unsupported Markdown constructs, embedded interactive components, or author-supplied JSX. The 16 documents use the blocks the existing renderer already supports. |
| Existing root `sitemap.ts` | Dedicated `/guide/sitemap.xml` | Add a section sitemap when Guide volume approaches sitemap-scale operational monitoring needs or separate submission/analytics is adopted. The fixed hub plus eight articles per production domain fits the existing static sitemap and verifier cleanly. |
| Existing comparison route pattern | A generalized cross-domain content framework | Extract a shared framework only after Guide and comparison exhibit stable duplicated behavior across several independently evolving verticals. A small Guide module is simpler and keeps scope bounded. |

## What Not to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| New Markdown, front-matter, slug, sitemap, or hreflang dependencies | The repository already has a Markdown renderer, Node filesystem loader, URL ownership helpers, Metadata alternates, sitemap route, and a fixed approved slug list. Extra packages create supply-chain and compatibility work without removing milestone logic. | `node:fs`, TypeScript registry validation, `MarkdownContent`, `siteRouting`, and `seo` helpers. |
| Runtime CMS/API fetch | Static export requires content availability at build time and a remote fetch creates release-time availability and content-drift risk. | Commit the approved Week04 copies and read them locally at build time. |
| A locale-prefixed production Guide URL family | The approved topology and existing compare/FAQ pattern use domains as the Chinese/English language boundary. | `/guide` and `/guide/<slug>` on each owned production domain. |
| Cross-language canonical URLs | Each language version needs its own canonical URL and reciprocal language alternates. | Self canonical plus `zh-CN`, `en`, and English `x-default` alternates. |
| FAQPage schema for Guide tables | The source specification calls for Article and BreadcrumbList; the tables are article content rather than FAQ entities. | `ArticleJsonLd`, `BreadcrumbJsonLd`, and hub `CollectionPage`/`ItemList`. |

## Stack Patterns by Variant

**CN production (`NEXT_PUBLIC_SITE_VARIANT=cn`):**

- Resolve `zh` as the Guide locale.
- Emit `/guide` plus the eight Chinese article pages, all canonical to `https://fastgpt.cn`.
- Add the nine Chinese URLs to the CN sitemap and assert them in the CN export check.

**IO production (`NEXT_PUBLIC_SITE_VARIANT=io`):**

- Resolve `en` as the Guide locale.
- Emit `/guide` plus the eight English article pages, all canonical to `https://fastgpt.io`.
- Add the nine English URLs to the IO sitemap and assert them in the IO export check.

**Preview:**

- Generate the existing preview route variants needed for QA, retain current preview `noindex, nofollow` output handling, and verify canonical/alternate targets point at production owners.

## Version Compatibility

| Package / tool | Compatible With | Notes |
|----------------|-----------------|-------|
| `next@16.2.6` | `react@19.2.6`, `react-dom@19.2.6` | Current lockstep application stack. `generateStaticParams`, `dynamicParams`, `generateMetadata`, and `sitemap.ts` all support the proposed static Guide implementation. |
| `typescript@5.9.3` | Next App Router route modules | Existing strict configuration supports typed registry, async route params, and `Metadata['alternates']` return types. |
| Node `>=18` | `node:fs`, `node:path`, `server-only@0.0.1` | Matches the declared engine and the existing build-time technical-content loader. Production Docker already uses Node 22. |

## Sources

- [Next.js `generateStaticParams` documentation](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — build-time dynamic route enumeration and `dynamicParams = false`; updated 2026-02-27. Confidence: MEDIUM.
- [Next.js `generateMetadata` documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — `alternates.canonical` and `alternates.languages` head output; updated 2026-03-25. Confidence: MEDIUM.
- [Next.js sitemap metadata-route documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) — static `MetadataRoute.Sitemap` generation and section-sitemap options; updated 2026-03-25. Confidence: MEDIUM.
- `src/lib/siteRouting.ts`, `src/lib/seo.ts`, `src/app/sitemap.ts`, comparison routes/components, `src/lib/tech-center-content.ts`, and release/SEO verifier scripts — directly inspected repository integration points. Confidence: HIGH.
- `Week04/附-深度内容栏目路由与hreflang规格.md` and 16 approved Week04 Markdown documents — approved same-slug path, self-canonical, reciprocal alternate, content, metadata, and image requirements. Confidence: HIGH.

---
*Stack research for: FastGPT v1.1 Guide Content Center*
*Researched: 2026-08-16*
