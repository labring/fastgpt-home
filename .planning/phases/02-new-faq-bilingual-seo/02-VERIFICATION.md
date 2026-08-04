---
phase: 02-new-faq-bilingual-seo
verified: 2026-08-04
status: passed
---

# Phase 2 Verification

## Goal-Backward Evidence

| Requirement | Evidence | Result |
| --- | --- | --- |
| FAQ-03 | `src/faq/index.ts` returns the merged Chinese dataset; `FAQList` receives all locale records and retains search, category filtering, incremental loading, and related-card links. `test_w2_faq.mjs` confirms 60 source records and `test_faq_build.mjs` confirms all 60 static detail pages. | PASS |
| FAQ-04 | `getFaqIds` drives locale-specific static params and sitemap generation. `test_faq_routes.mjs` checks 1,400 English IDs, 1,460 Chinese IDs, and zero W2 English collisions; the case-sensitive build artifact checker confirms one physical HTML file for every runtime ID and sitemap URL. | PASS |
| FAQ-05 | Production `npm run build` generated 2,885 routes. On the deployment-equivalent case-sensitive build, `test_faq_build.mjs` checked every W2 page for independent title, description, Keywords, OG/Twitter parity, `.cn` canonical, FAQPage JSON-LD, and BreadcrumbList JSON-LD. | PASS |
| FAQ-06 | `test_faq_routes.mjs` and `verify-p2.js` check `.io`/`.cn` canonical domains, translated hreflang behavior, W2 Chinese-only fallback, legacy metadata limits, social parity, and structured data. | PASS |

## Automated Checks

- `node scripts/phase2/validate_w2_faq.mjs`
- `node scripts/phase2/test_w2_faq.mjs`
- `node scripts/phase2/test_faq_routes.mjs`
- `npm run lint`
- `npx tsc --noEmit`
- `NEXT_TELEMETRY_DISABLED=1 npm run build`
- `FAQ_BUILD_OUT=/Volumes/FastGPTCase/fastgpt-home/out node scripts/phase2/test_faq_build.mjs`
- `FAQ_BUILD_OUT=/Volumes/FastGPTCase/fastgpt-home/out node scripts/verify-p2.js`

All checks passed on 2026-08-04. The generated `out/` directory is local
verification state and remains outside the commit.

## Residual Risk

The default macOS case-insensitive volume cannot materialize 15 pre-existing
case-only legacy URL pairs. The strict gate reports those collisions, while
the Ubuntu deployment workflow and the local case-sensitive build both produce
the complete route set. Live desktop and mobile visual review remains a
release handoff check in Phase 5.
