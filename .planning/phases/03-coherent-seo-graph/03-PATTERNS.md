# Phase 03: Coherent SEO Graph - Pattern Map

**Generated:** 2026-08-16
**Mode:** Inline fallback because the shared GSD agent thread limit prevented `gsd-pattern-mapper` dispatch.

## File and Responsibility Map

| Phase role | Closest existing analog | Pattern to preserve |
|------------|-------------------------|---------------------|
| Content identity adapter | `src/faq/index.ts` | JSON registry maps durable English content IDs to canonical slugs; locale catalogs own item fields. |
| Locale/path helper | `src/lib/localizedRoutes.ts` | Normalize English IDs through `getEnglishFaqCanonicalSlug`; use `getDefaultLocalePath` for unprefixed defaults. |
| Canonical/hreflang metadata | `src/lib/seo.ts` | Return `Metadata['alternates']` with `canonical` and manifest-derived language keys. |
| Owner-domain URL construction | `src/lib/siteRouting.ts` | `getOwnedFaqUrl` and `getLocaleHreflang` own hosts, prefixes, and encoding. |
| Detail identity/schema | `src/app/[lang]/faq/[id]/page.tsx` | Resolve item once, pass `Question`/`Answers` to H1, FAQ JSON-LD, breadcrumb, and related links. |
| List/related links | `src/components/faq/FAQCard.tsx` | Call `getFaqPath(langName, id)` at the route boundary; preserve client list behavior. |
| Sitemap | `src/app/sitemap.ts` | `seenUrls` exact absolute URL set and `MetadataRoute.Sitemap` entries. |
| Source/export verification | `scripts/verify-faq-routes.js`, `scripts/verify-faq-metadata.js`, `scripts/verify-i18n-seo.js` | Node assertions, record-level messages, static `out/` inspection, concise success output. |

## Data Flow Constraints

1. Input route parameter enters `getFaqItem`/the identity adapter.
2. English canonical slug resolves to the durable `contentId`; Chinese route keys remain content IDs.
3. The resolved `FaqItem` supplies authored identity fields.
4. URL helpers construct owner-domain canonical/alternate paths.
5. Static params and sitemap enumerate catalog final IDs only.
6. Verifiers compare source registry and both owner-site export sets.

## Existing Risks to Carry Into the Plan

- `getFaqAlternates` currently passes one `faqId` through every locale, which can produce a broken Chinese URL for repaired English slugs.
- `getFaqTranslationLocales` already resolves slug to content ID and can be extended rather than duplicated.
- Default locale route aliases are unprefixed in `siteRouting`; sitemap loops must retain that behavior and avoid `/en`/`/zh` aliases.
- 786 preserved routes intentionally contain mixed-case segments; exact URL identity and case-sensitive export evidence must remain intact.

