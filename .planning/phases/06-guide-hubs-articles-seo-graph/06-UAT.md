---
status: complete
phase: 06-guide-hubs-articles-seo-graph
source:
  - 06-01-SUMMARY.md
  - 06-02-SUMMARY.md
  - 06-03-SUMMARY.md
  - 06-04-SUMMARY.md
started: 2026-08-17T05:58:00Z
updated: 2026-08-17T05:58:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Closed root article graph
expected: Eight root Guide article paths expose owned canonicals, exact alternates, Open Graph timing, and Article/BreadcrumbList schema.
result: pass
source: automated
coverage_id: D1-0601

### 2. Publication policy contract
expected: Guide groups, approved timing fields, and required-asset dimensions remain validated by the bilingual registry and source verifier.
result: pass
source: automated
coverage_id: D2-0601

### 3. Localized article experience
expected: Every localized article preserves the complete body, navigation, optional-surface gates, and Article/BreadcrumbList/HowTo schema behavior.
result: pass
source: automated
coverage_id: D1-0602

### 4. Closed localized article adapters
expected: Root and localized article inventories use owned canonical identity, exact alternate projection, and noindex-follow adapter metadata.
result: pass
source: automated
coverage_id: D2-0602

### 5. Registry-backed Guide hub
expected: The Guide hub exposes the approved decision, implementation, and industry card groups with matching CollectionPage, ItemList, and BreadcrumbList JSON-LD.
result: pass
source: automated
coverage_id: D1-0603

### 6. Closed localized hub adapters
expected: Root and localized hub adapters share owned canonical identity, alternate projection, and closed static locale parameters.
result: pass
source: automated
coverage_id: D2-0603

### 7. Variant sitemap discovery
expected: Current cn and io projections contain one owned Guide hub and eight unique dated article canonicals.
result: pass
source: automated
coverage_id: D1-0604

### 8. Complete source graph regression
expected: Registry, routes, metadata, alternates, schemas, cards, optional surfaces, and sitemap wiring reject contextual drift through focused mutation tests.
result: pass
source: automated
coverage_id: D2-0604

### 9. Phase 5 compatibility gate
expected: The bilingual source contract, regression suite, and strict TypeScript surface remain compatible with the Phase 6 Guide graph.
result: pass
source: automated
coverage_id: D3-0604

### 10. Hub responsive and keyboard surface
expected: Both owned Guide hubs expose localized 4/1/3 card groups with visible focus treatment, narrow-screen one-column layout, and article links that preserve the owned `/guide/<slug>` graph.
result: pass
source: evidence-review
evidence: GuideHubPage semantic sections/links, GuideHubPage.module.css focus-visible and responsive rules, and `npm run verify:guide-seo-graph`.

### 11. Conditional optional article surfaces
expected: The article image and related-link branches remain absent for the current corpus and activate only for validated required-asset or configured-link records with owned targets.
result: pass
source: evidence-review
evidence: Registry policy gate plus isolated required-asset/configured-link mutation coverage in `scripts/verify-guide-seo-graph.test.js`.

## Summary

total: 11
passed: 11
issues: 0
pending: 0
blocked: 0
skipped: 0

## Gaps

None.
