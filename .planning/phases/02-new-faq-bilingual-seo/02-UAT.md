---
status: complete
phase: 02-new-faq-bilingual-seo
source: 02-01-SUMMARY.md, 02-02-SUMMARY.md, 02-03-SUMMARY.md
started: 2026-08-04T08:20:00Z
updated: 2026-08-04T08:20:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Browse and filter W2 FAQ records
expected: Chinese FAQ list includes the merged W2 records, supports search and category filtering, and links each visible card to a detail page.
result: pass
source: automated
evidence: `test_w2_faq.mjs`, `test_faq_build.mjs`, source inspection of `FAQList`

### 2. Open a W2 Chinese detail page
expected: Each W2 slug has a static Chinese HTML page with source-derived title and description, `.cn` canonical, FAQPage JSON-LD, BreadcrumbList JSON-LD, and no English-only page.
result: pass
source: automated
evidence: `test_faq_build.mjs` checked all 60 slugs

### 3. Preserve legacy FAQ routes and SEO
expected: Existing translated and fallback FAQ pages retain route availability, metadata limits, social parity, canonical rules, and structured data.
result: pass
source: automated
evidence: `verify-p2.js`, `test_faq_routes.mjs`

### 4. Validate the production build
expected: Production build completes and exports the complete FAQ route set without TypeScript or lint errors.
result: pass
source: automated
evidence: `npm run lint`, `npx tsc --noEmit`, `NEXT_TELEMETRY_DISABLED=1 npm run build`, and strict case-sensitive artifact verification

### 5. Detect filesystem-dependent route loss
expected: A case-insensitive build reports legacy case-only slug collisions as a failed exact-set check, while the deployment-equivalent case-sensitive build passes all 1,400 English and 1,460 Chinese route checks.
result: pass
source: automated
evidence: `test_faq_build.mjs` fail-closed collision gate and case-sensitive APFS build

## Summary

total: 5
passed: 5
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

None.
