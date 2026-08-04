---
phase: 02-new-faq-bilingual-seo
plan: 02
completed: 2026-08-04
status: complete
---

# Plan 02 Summary

Added locale-aware FAQ ID enumeration and fixed-domain SEO helpers. English
routes continue to enumerate 1,400 IDs; Chinese routes enumerate the merged
1,460-record dataset with all 60 W2 slugs. The FAQ detail and list metadata,
breadcrumbs, and sitemap now use `.io` English canonical URLs and `.cn`
Chinese canonical URLs, with configurable preview domains.

Hreflang output is translation-aware: existing shared keys expose English and
Chinese alternates, while W2-only Chinese keys omit the fabricated English
alternate and use the Chinese canonical as `x-default`.

## Verification

- `node scripts/phase2/test_faq_routes.mjs`: passed for counts, source links, canonical URLs, hreflang, x-default, and env overrides.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
