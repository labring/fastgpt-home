# Project Research Summary

**Project:** FastGPT SEO Content Publishing — v1.1 Guide Content Center
**Domain:** Static bilingual SEO content center for an existing Next.js site
**Researched:** 2026-08-16
**Confidence:** HIGH

## Executive Summary

v1.1 publishes a fixed, approved bilingual Guide corpus: two owned-domain `/guide` hubs and eight same-slug Chinese/English article pairs. The production topology is deliberately small and stable: Chinese pages live at `https://fastgpt.cn/guide[/<slug>]`, English pages live at `https://fastgpt.io/guide[/<slug>]`, and every article is a self-canonical member of the same three-link `zh-CN`/`en`/`x-default` cluster. The implementation should extend the existing Next.js static-export, routing, SEO, Markdown, schema, and verification seams.

Build the release around one typed paired registry and a server-only Markdown boundary. The registry owns the eight slugs, locale metadata, source paths, categories, images, and approved links; it drives hubs, static params, metadata, JSON-LD, sitemap, and checks. The loader removes exactly one leading delivery-metadata HTML comment and returns the approved Markdown body unchanged after newline normalization. Existing `MarkdownContent`, site shell, `getOwnedLocaleUrl`, `getAlternates`, JSON-LD components, Node scripts, and local public assets cover the implementation with zero dependencies.

The delivery risks are route ownership, partial pairs, comment leakage, drift between discovery surfaces, incomplete case-sensitive exports, and production artifacts that differ from local evidence. Address them through source-pair validation, all-article export inspection, separate cn/io artifacts, a case-sensitive dual-export gate, and live verification of all 16 canonical article URLs. The discovered io production deployment path remains a release prerequisite: the checked-in image workflow builds cn only, so the project needs a confirmed or implemented io artifact-and-deploy route before production completion.

## Key Findings

### Recommended Stack

Keep the repository stack: Next.js `16.2.6`, React `19.2.6`, TypeScript `5.9.3`, Node.js `>=18`, and the existing static-export deployment model. The fixed corpus benefits from server-rendered pages and build-time local content; browser state, a CMS, remote fetches, and additional packages add no launch value.

**Core technologies:**

- **Next.js App Router:** Build `/guide` and `/guide/[slug]` with `generateStaticParams`, `generateMetadata`, and `dynamicParams = false` for an explicit static route inventory.
- **TypeScript paired registry:** Keep one immutable eight-slug contract with `zh` and `en` records, SEO fields, category, dates, image disposition, body path, and resolved links.
- **Node `fs`/`path` plus `server-only`:** Load local Markdown at build time and validate its bounded leading delivery-comment block without `gray-matter` or a new parser.
- **Existing routing and SEO helpers:** Use `getOwnedLocaleUrl` and `getAlternates` for canonical URLs, language alternates, schema URLs, sitemap URLs, and internal destinations.
- **Existing presentation and schema components:** Reuse `MarkdownContent`, article shell primitives, `ArticleJsonLd`, `BreadcrumbJsonLd`, and `JsonLdScript`; use `next/image` only for approved local assets.
- **Existing Node verification scripts:** Add Guide-specific source and artifact assertions to the existing release flow; retain `tsc`, build, SEO, and release checks.

`package.json` and `package-lock.json` should remain unchanged. The validated release approach uses separate cn and io builds; each export contains its owned Guide hub plus eight owned details.

### Expected Features

**Must have (launch contract):**

- Two localized `/guide` hubs, each showing exactly eight cards in the approved decision, implementation, and industry groups.
- Sixteen same-slug article URLs at the two owned domains, rendering approved localized body, H1, tables/lists, breadcrumb, required images, and approved reachable internal links.
- A single 8-pair registry and import boundary that enforce pair completeness, content fidelity, image disposition, and route identity.
- Self canonicals, reciprocal `zh-CN`/`en`/`x-default` alternates, localized metadata, Article plus BreadcrumbList schema, hub CollectionPage/ItemList schema, and sitemap inclusion.
- One release gate that validates registry-to-export parity, plus deployment and live verification for all 16 owned article URLs.

**Should have after the launch contract:**

- A discreet same-slug language-pair link near the article header when bilingual-reader behavior warrants it.
- A registry-derived publishing report when release reviews require a durable matrix beyond CI output.

**Defer:**

- Client-side Guide search, filters, sorting, pagination, and client catalog state.
- CMS/editorial administration, runtime content retrieval, automated translation, additional Guide batches, and adjacent SEO workstreams.

### Architecture Approach

The architecture is a build-time content pipeline. Approved Markdown files live in a dedicated Chinese/English content tree; a Guide registry selects each body and exposes the complete paired public model. Root App Router routes select the current production variant's locale, render the hub or detail, and use the central model for SEO and schema. The active variant's sitemap receives its hub plus eight owned article URLs; clean cn and io outputs are inspected independently before deployment.

**Major components:**

1. **Guide registry (`src/content/guide/`):** Sole authority for all eight paired route identities, source metadata, assets, categories, related links, and public accessors.
2. **Guide loader (`src/lib/guide-content.ts`):** Server-only file reader that strips and validates one leading delivery metadata comment, checks source integrity, then returns publishable Markdown.
3. **Root routes (`src/app/guide/**`):** Generate the unprefixed owned-domain hub and static detail pages, select `zh` in cn builds and `en` in io builds, and return static 404s for unknown slugs.
4. **Guide composition (`src/components/guide/`):** Thin hub/article rendering that reuses existing Markdown, navigation, footer, CTA, image, and schema building blocks.
5. **Discovery and evidence:** `sitemap.ts` and release scripts consume the registry, check all exported Guide pages, and preserve one-host-per-export routing.

### Critical Pitfalls

1. **Wrong domain or locale-prefix ownership** — publish root `/guide` paths only; derive every absolute URL through `getOwnedLocaleUrl`; confirm cn emits Chinese and io emits English.
2. **Partial or mismatched same-slug pairs** — validate exactly eight lower-case slugs and set equality between Chinese and English source records before routes are generated.
3. **Delivery metadata visible in articles** — require one bounded leading HTML comment, strip it at the loader boundary, reject malformed/duplicate/trailing blocks, and scan exports for delivery labels.
4. **SEO and discovery drift across separate lists** — derive static params, hubs, breadcrumbs, schema, sitemap, related links, and verifiers from the single registry.
5. **Subset or case-colliding static output** — run clean cn/io exports with exact nine-Guide-path inventories per variant on Linux, Docker, or case-sensitive APFS; retain the existing case-sensitive release gate.
6. **Correct local artifact with incomplete production delivery** — establish the io production artifact and deployment path, promote only verified variant artifacts, then fetch all 16 canonical article URLs from both domains and compare status, H1, canonical, alternates, robots, and sitemap policy.

## Implications for Roadmap

### Phase 1: Content Contract and Source Intake

**Rationale:** Every subsequent surface depends on stable paired identity and publishable source bodies.

**Delivers:** Sixteen committed approved Markdown files; a single typed eight-pair registry; server-only loader; strict delivery-comment stripping; source body/hash or equivalent fidelity checks; exact metadata, image-disposition, and internal-link inventory.

**Addresses:** Source-faithful publishing, pair completeness, approved images, and maintainable content ownership.

**Avoids:** Missing translation fallbacks, guessed metadata, slug drift, comment leakage, and editorial-content mutation.

### Phase 2: Hubs, Article Routes, and SEO Graph

**Rationale:** The registry becomes a visitor and crawler surface only once routes, presentation, discovery, and metadata consume the same model.

**Delivers:** Two variant-selected root Guide hubs; eight static detail routes per owner; grouped cards; reused Markdown/article shell; breadcrumbs; required assets; canonical and exact alternate clusters; Article/Breadcrumb and CollectionPage/ItemList JSON-LD; registry-derived sitemap and approved internal links.

**Uses:** Existing App Router, `siteRouting`, `seo`, `MarkdownContent`, JSON-LD, navigation/footer, and `next/image` patterns.

**Avoids:** Prefixed production Guide URLs, cross-language canonicals, hub omissions, orphaned details, tech-center branding leakage, and disconnected schema/sitemap URLs.

### Phase 3: Static Export and Release Evidence

**Rationale:** Static export is the release boundary, so source-level success needs output-level proof for both owners.

**Delivers:** A focused Guide verifier and release integration that inspect exact source pairs; hub cards; 16 article exports; all canonical/hreflang/schema/internal-link assertions; expected sitemap entries; exported assets; one H1; and the existing P1 budget. The gate performs clean cn and io builds with an exact nine-Guide-URL inventory per build and a case-sensitive dual-export check.

**Addresses:** Release safety, static-param coverage, source-to-artifact fidelity, domain ownership, and build reproducibility.

**Avoids:** Development-only success, overwriting `out/` before inspection, missing owner routes, path case collisions, and partial SEO coverage.

### Phase 4: IO Delivery Prerequisite and Production Verification

**Rationale:** cn has an existing production image workflow; io needs an explicit validated artifact-and-deployment path before the milestone can complete.

**Delivers:** Confirmed or implemented io production delivery configuration; deployed immutable cn/io artifacts; rollback evidence; cache-purge record; live checks for all 16 canonical article URLs, with both Guide hubs included in deployment smoke checks.

**Addresses:** Production delivery, cache/crawl behavior, owned-domain availability, and release evidence.

**Avoids:** Treating preview as production proof, stale CDN 404s, wrong variant deployment, stale sitemap/robots output, and missing international delivery.

### Phase Ordering Rationale

- The paired registry and loader precede every route, link, schema, and verifier because they define the complete release identity.
- Rendering, SEO, and sitemap belong together because the same URL model controls discoverability across all three surfaces.
- Artifact inspection follows complete rendering and verifies the static-export contract on each domain variant.
- Production work follows verified artifacts; io delivery is a known operational dependency that must be closed before live release.

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 1:** Inspect the supplied Week04 comment syntax and image requirements directly; determine the explicit release decision for every ambiguous or absent asset.
- **Phase 2:** Confirm the existing comparison-route default-locale behavior and `getAlternates` output satisfy the exact Guide two-language cluster without leaking prefix routes.
- **Phase 3:** Trace the existing release scripts and output cleanup behavior so both build artifacts are independently retained and checked.
- **Phase 4:** Research the current fastgpt.io production deployment ownership, credentials, artifact destination, cache purge, rollback mechanism, and public health-check procedure. This is the only material operational unknown.

Phases with standard patterns:

- **Presentation composition:** Existing server-rendered content, Markdown, breadcrumb, JSON-LD, image, and marketing-shell patterns are established in the repository.
- **Static route generation:** Existing FAQ and comparison pages already demonstrate `generateStaticParams`, metadata, `dynamicParams = false`, and static `notFound()` behavior.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Existing package versions, static-export configuration, route helpers, loader, Markdown renderer, and release scripts were directly inspected. |
| Features | HIGH | PROJECT scope and approved Week04 8×2 topology specify the launch contract and its source authority. |
| Architecture | HIGH | Repository comparison, FAQ, technical-content, sitemap, and build patterns directly support the proposed integration. |
| Pitfalls | HIGH | The main risks map to explicit static-export, source-boundary, SEO, release-gate, and deployment surfaces in this repository. |

**Overall confidence:** HIGH

### Gaps to Address

- **io production deployment:** The repository documents cn image deployment; verify or add the equivalent io artifact/deployment workflow before Phase 4 can claim completion.
- **Approved images:** Record a release decision for each document whose delivery metadata describes an image but lacks a supplied approved asset; retain image disposition in the registry.
- **Source parser fixture detail:** Implement the bounded comment parser from the actual 16 document shapes and make malformed delivery blocks fail with a slug-specific error.
- **Live verification access:** Confirm the release environment can query both public domains and record the precise 16-URL probe matrix, artifact revisions, cache-purge scope, and rollback target.

## Sources

### Primary (HIGH confidence)

- `.planning/PROJECT.md` — milestone scope, approved topology, static export, release endpoint, and constraints.
- `.planning/research/STACK.md` — repository-integrated stack, implementation shape, build variants, and zero-dependency recommendation.
- `.planning/research/FEATURES.md` — 8×2 launch contract, hub behavior, schema/discovery surfaces, anti-features, and acceptance checks.
- `.planning/research/ARCHITECTURE.md` — registry/loader/routes/components model, selected-variant exports, deployment boundary, and io prerequisite.
- `.planning/research/PITFALLS.md` — source boundary, SEO graph, case-sensitive export, artifact, and production-release risk controls.
- Existing repository seams: `src/lib/siteRouting.ts`, `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/lib/tech-center-content.ts`, `src/components/tech-center/MarkdownContent.tsx`, comparison routes, and release/SEO verifier scripts.
- Approved Week04 Guide package: routing/hreflang specification and sixteen paired Markdown documents.

### Secondary (MEDIUM confidence)

- [Next.js static export guidance](https://nextjs.org/docs/app/guides/static-exports) — build-time route/data constraints.
- [Next.js generateStaticParams reference](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — static dynamic-route enumeration.
- [Google Search Central localized versions guidance](https://developers.google.com/search/docs/advanced/crawling/localized-versions) — reciprocal language alternate clusters and `x-default`.

---
*Research completed: 2026-08-16*
*Ready for roadmap: yes*
