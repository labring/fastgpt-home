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

## Summary

total: 9
passed: 9
issues: 0
pending: 0
blocked: 0
skipped: 0

## Gaps

None.

## Deferred Follow-Ups

- test: browser-1
  idea: "Run desktop and narrow-viewport browser checks for both owned Guide hubs, including keyboard focus and one article navigation per group."
  deferred_at: 2026-08-17
- test: optional-1
  idea: "Inspect a staging registry fixture after an approved required asset or configured internal-link mapping is introduced."
  deferred_at: 2026-08-17
