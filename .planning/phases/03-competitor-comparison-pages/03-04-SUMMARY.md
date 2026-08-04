---
phase: 03-competitor-comparison-pages
plan: 04
status: complete
---

# Plan 03-04 Summary

Added the static Chinese comparison route under `/zh/compare/[slug]`, shared source-driven page and table components, `.cn` canonical helpers, preview robots, Article/Breadcrumb JSON-LD, published-only sitemap filtering, and responsive labeled table rows. The generic locale JSON-LD is routed around comparison pages so their page-specific schemas are limited to Article and BreadcrumbList.

Verification:

- `npx tsc --noEmit`
- `npm run lint`
- Production static route list contains the four expected Chinese comparison paths.
