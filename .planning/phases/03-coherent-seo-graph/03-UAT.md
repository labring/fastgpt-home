---
status: complete
phase: 03-coherent-seo-graph
source: 03-01-SUMMARY.md
started: 2026-08-16T03:40:00+08:00
updated: 2026-08-16T03:46:00+08:00
---

## Current Test

[testing complete]

## Tests

### 1. Durable FAQ identity and source graph
expected: Every English and published Chinese FAQ route resolves through one locale-aware content identity adapter, with source diagnostics covering the 1,400 English identities and 1,490 Chinese routes.
result: pass
source: automated
coverage_id: D1
evidence: `npm run verify:faq-seo-graph` passed SEO-01/02/03 source checks.

### 2. Detail identity, canonical URL, and alternates
expected: FAQ detail H1, FAQ JSON-LD, breadcrumb, canonical URL, and published owner-site alternates describe the same FAQ record on every final route.
result: pass
source: automated
coverage_id: D2
evidence: `npm run verify:faq-routes`, `npm run verify:faq-metadata`, and case-sensitive APFS HTML checks passed for io and cn exports.

### 3. Discovery links, static params, and sitemap graph
expected: FAQ lists, related links, static parameters, and sitemaps use final route keys exactly once and exclude legacy aliases.
result: pass
source: automated
coverage_id: D3
evidence: `npm run verify:faq-routes`, `npx tsc --noEmit`, and case-sensitive APFS HTML/sitemap checks passed for both owner sites.

### 4. Cold-start static export smoke test
expected: A clean production build emits every final owner-site FAQ page with matching canonical, hreflang, H1, JSON-LD, and sitemap evidence.
result: pass
source: automated
evidence: Case-sensitive APFS io build emitted 1,400 FAQ pages and 1,400 sitemap URLs; cn build emitted 1,490 FAQ pages and 1,490 sitemap URLs. HTML verifiers passed for both exports.
diagnostic: The default macOS volume reports 1,398 io FAQ files because preserved mixed-case route names collapse on a case-insensitive filesystem. This remains an environment diagnostic; the case-sensitive APFS release evidence passes.

## UI Verification

UI checkpoints: 0 auto-verified, 0 queued for manual review. The phase changes serialized SEO and route surfaces while preserving the existing FAQ visual shell and interaction contract.

## Summary

total: 4
passed: 4
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

None.
