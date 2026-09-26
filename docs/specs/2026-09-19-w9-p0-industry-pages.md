# W9 P0 Industry pages

## Problem Statement

W9 delivers 19,080 Industry Markdown pages covering service-object industries, financial business categories, and operation steps. The website needs a single build-time content contract that can project these pages into owner-correct URLs, page metadata, and the existing root sitemap while preserving the current Guide, Reference, and Technical Center route identities.

The approved delivery source is normalized into the repository and the complete Industry set is ready for indexable publication. The loader, owner routes, sitemap projection, and static export remain the single release path.

## Solution

Use a server-only build-time Industry content loader that reads locale-scoped Markdown, validates the publishable source contract, and exposes one typed collection to routes, metadata, JSON-LD, and the existing root sitemap. Preview review routes and owner-relative production routes consume the same collection, with Chinese pages owned by `fastgpt.cn` and English pages owned by `fastgpt.io`.

Reuse the existing Markdown rendering, routing, SEO, and sitemap primitives. Industry pages use a lightweight page adapter with their own domain identity, while Guide and Reference continue using their established indexes. The full W9 Industry inventory is verified at source and export gates.

## User Stories

1. As a content editor, I want an Industry Markdown document to declare its title, slug, page type, body, and publishable SEO fields, so that every page has a predictable source contract.
2. As a content editor, I want an invalid slug to fail the build with its source name and field, so that unsafe public paths are fixed before release.
3. As a content editor, I want duplicate slugs within one locale to fail the build, so that two sources never claim the same page identity.
4. As a Chinese reader, I want an approved Industry page to resolve on the China site, so that the public URL matches locale ownership.
5. As an English reader, I want an approved Industry page to resolve on the International site, so that the public URL matches locale ownership.
6. As a search engine, I want each indexable Industry page to expose one canonical URL, so that ranking signals consolidate on the owner route.
7. As a search engine, I want locale alternates and an `x-default` projection when English exists, so that language discovery follows the published locale set.
8. As a search engine, I want `dateModified`, Open Graph URL, and JSON-LD URL to use the same normalized page identity, so that page freshness and structured data remain consistent.
9. As a preview reviewer, I want a locale-prefixed review route with preview robots behavior, so that content can be inspected before owner-site publication.
10. As a reader, I want the rendered body to contain the approved article content without delivery notes, schedules, or internal provenance, so that the public page stays focused on the answer.
11. As a release engineer, I want all Industry route parameters available during the static build, so that production export produces deterministic HTML.
12. As a release engineer, I want the root sitemap to contain owner-correct Industry URLs with existing de-duplication, so that discovery and canonical routing agree.
13. As a release engineer, I want sitemap output filtered by the current Site Variant, so that each deployment advertises URLs for its owned site.
14. As a site maintainer, I want Industry page identity to come from the loader, so that route, metadata, and sitemap data stay aligned.
15. As a site maintainer, I want the existing Guide, Reference, and Technical Center indexes to retain ownership of their route families, so that established page identity and navigation remain stable.
16. As a content operations lead, I want the approved W9 Industry source set to use the same loader, so that publication does not require a second model.
17. As a content reviewer, I want missing SEO fields to block indexable publication, so that incomplete metadata reaches review before release.
18. As a content reviewer, I want public references, version claims, financial caveats, and dates handled in the P1 review gate, so that source quality receives a dedicated approval pass.
19. As a developer, I want one focused external-behavior check plus the existing type, lint, SEO, and build checks, so that the route seam remains easy to verify.
20. As a future product owner, I want Industry hubs or search projections to derive from the same collection, so that later discovery features can reuse published page identity.

## Implementation Decisions

- Use a server-only build-time Industry content module as the single source for Industry page records.
- Read fixed locale directories and derive locale from source location; derive site ownership through the existing locale-routing policy.
- Require title, slug, page type, non-empty body, and indexable SEO metadata consisting of meta title, meta description, publication date, and modification date.
- Validate path safety, duplicate identity, required fields, and public body boundaries before route generation.
- Expose static parameters, article data, metadata, JSON-LD inputs, and sitemap entries from the same normalized collection.
- Provide a localized preview review route and an owner-relative production route, both with static parameter generation and a disabled dynamic fallback. Production keeps one review parameter to satisfy Next static export and publishes the full inventory through the owner-relative route.
- Use a lightweight Industry page adapter that reuses existing Markdown, CTA, navigation, SEO, and JSON-LD primitives while preserving Technical Center category and source-type unions.
- Project canonical, alternates, robots, Open Graph, and JSON-LD URLs through existing site-routing and SEO helpers.
- Extend the existing root sitemap with Industry entries and its current URL de-duplication and Site Variant filtering.
- Keep delivery tracking, batch status, and review workflow data in the content-data workspace; runtime page identity remains source-derived.
- Keep Guide, Reference, and deep-content normalization, metadata approval, public-reference review, and financial-fact review in P1.

## Testing Decisions

- Test external behavior at the highest shared seam: a normalized fixture source passes through loading, route projection, metadata projection, and sitemap projection.
- Cover required-field validation, slug safety, duplicate detection, locale ownership, canonical projection, preview robots behavior, body boundary handling, and sitemap de-duplication.
- Reuse the repository's verification style from `verify-technical-content`, `verify-technical-export`, `verify-i18n-seo`, and `verify-content-hygiene`.
- Run strict TypeScript checking, linting, the focused Industry verification, the existing i18n SEO verification, and the production static build.
- Run the checks against the complete normalized W9 inventory for both `cn` and `io` production variants.

## Out of Scope

- Guide, Reference, and deep-content route migration.
- Approval of missing SEO values, public references, version claims, financial facts, or dates.
- A separate publication registry, per-page status store, or manually maintained sitemap list.
- A separate sitemap file, Industry hub, Industry search UI, analytics event, or new package dependency.
- Changes to existing Guide, Reference, Technical Center, locale ownership, or site identity rules.

## Further Notes

The Industry release contains 10,080 Chinese pages and 9,000 English pages. Chinese pages carry approved keywords; English source keyword fields remain empty. Both release dates are `2026-09-15`, and all 19,080 delivery bodies match the repository copy. The existing root `robots.txt` sitemap declaration remains the discovery entry point.
