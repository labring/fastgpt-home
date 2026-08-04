---
phase: 02-new-faq-bilingual-seo
plan: 03
completed: 2026-08-04
status: complete
---

# Plan 03 Summary

Extended the existing P2 verifier with a source-driven W2 sample and added a
full static-artifact checker for the complete runtime route sets. The checks
retain the legacy FAQ metadata, social-preview, heading, canonical, and
structured-data assertions while comparing W2 output to the locked Phase 1
source baseline. The checker also fails closed when a case-insensitive build
silently collapses legacy slugs.

## Verification

- `NEXT_TELEMETRY_DISABLED=1 npm run build`: passed on the working tree; Next generated 2,885 static routes. The default macOS output exposes 15 pre-existing case-only legacy slug collisions, which the strict checker reports instead of silently accepting.
- Case-sensitive APFS production build: passed; `FAQ_BUILD_OUT=/Volumes/FastGPTCase/fastgpt-home/out node scripts/phase2/test_faq_build.mjs` verified 1,400 English routes, 1,460 Chinese routes, 60 W2 pages, sitemap coverage, per-page Meta, social tags, canonical URLs, and JSON-LD. The same output passed `verify-p2.js` with 2,860 FAQ detail pages checked.
- `node scripts/phase2/test_faq_build.mjs`: strict exact-set gate now fails closed for missing or case-collided legacy output and checks every W2 page's source-derived title, description, Keywords, OG/Twitter parity, `.cn` canonical, FAQPage JSON-LD, and BreadcrumbList JSON-LD.
