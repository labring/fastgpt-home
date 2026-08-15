---
status: complete
phase: 04-redirects-and-release-gate
source: 04-01-SUMMARY.md
started: 2026-08-16T05:20:00+08:00
updated: 2026-08-16T05:36:00+08:00
---

## Current Test

[testing complete]

## Tests

### 1. Registry-backed redirect projection
expected: Every eligible changed English FAQ source receives one deterministic one-hop permanent redirect to its final canonical route, while preserved routes and collision-ledger sources remain absent from generated Worker and Nginx maps.
result: pass
source: automated
coverage_id: D1
evidence: `npm run verify:faq-redirects -- --source` and APFS Worker/Nginx artifact checks passed with 42 eligible sources, 572 denied repairs, and 149 collision-ledger entries.

### 2. Aggregate source release contracts
expected: One repository command validates route, metadata, SEO graph, redirect, and TypeScript contracts with actionable record-level diagnostics.
result: pass
source: automated
coverage_id: D2
evidence: `npm run verify:release -- --source-only` passed route registry, metadata snapshot, FAQ routes, metadata, SEO graph, redirects, and TypeScript checks.

### 3. Case-sensitive owner-site exports
expected: Clean case-sensitive io and cn production exports contain the exact FAQ and sitemap cardinalities, canonical SEO graph, redirect artifacts, and cleanup behavior required for release.
result: pass
source: delegated-release-review
coverage_id: D3
evidence: `npm run verify:release` on case-sensitive APFS exited 0; io emitted 1,400 FAQ routes and cn emitted 1,490, with HTML, sitemap, SEO graph, redirect, and cleanup checks passing. The inherited P1 267.0 KiB gzip advisory was accepted against the c77cf48 266.9 KiB baseline.

### 4. Exported FAQ identity and metadata evidence
expected: Exported FAQ HTML preserves H1, approved metadata, canonical, hreflang, FAQ JSON-LD, authored identity, and lightweight client route helpers across both owner exports.
result: pass
source: delegated-release-review
coverage_id: D4
evidence: The APFS release gate passed P0, P2, i18n SEO, FAQ metadata (io owner), FAQ SEO graph, sitemap, and redirect checks for io and cn. CN metadata HTML is owner-scoped to io; source metadata verification passed. P1's inherited 267.0 KiB advisory remains explicit.

## UI Verification

UI checkpoints: 0 auto-verified, 0 queued for manual review. Phase4 changes redirect and release verification surfaces while preserving the existing FAQ visual shell and interaction contract.

## Summary

total: 4
passed: 4
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

None.
