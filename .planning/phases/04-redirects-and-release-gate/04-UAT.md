---
status: blocked
phase: 04-redirects-and-release-gate
source: 04-01-SUMMARY.md
started: 2026-08-16T05:20:00+08:00
updated: 2026-08-16T14:25:00+08:00
---

## Current Test

Release remains blocked by P1 initial JavaScript at 267.0 KiB gzip against the unchanged 260 KiB budget.

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
result: blocked
source: delegated-release-review
coverage_id: D3
evidence: Quick plan `260816-j3z` ran the aggregate gate on a temporary case-sensitive APFS workspace. Its actual release result is exit 1 because `verify:p1` reports `Initial JavaScript is 267.0 KiB gzip, budget is 260 KiB`. c77cf48 at 266.9 KiB is a labeled historical comparison with zero authority over the aggregate result. Owner exports retained their 1,400 io and 1,490 cn route evidence.

### 4. Exported FAQ identity and metadata evidence
expected: Exported FAQ HTML preserves H1, approved metadata, canonical, hreflang, FAQ JSON-LD, authored identity, and lightweight client route helpers across both owner exports.
result: pass
source: delegated-release-review
coverage_id: D4
evidence: `npm run verify:faq-metadata -- --html --variant io` passed 1,195 approved English mappings after the io export. The matching cn retained artifact passed `npm run verify:faq-metadata -- --html --variant cn` for 1,490 authored Chinese pages, including Chinese-only identities; its matching SEO graph check also passed 1,490 pages. P1 remains a separate hard release failure.

## UI Verification

UI checkpoints: 0 auto-verified, 0 queued for manual review. Phase4 changes redirect and release verification surfaces while preserving the existing FAQ visual shell and interaction contract.

## Summary

total: 4
passed: 3
issues: 1
pending: 0
skipped: 0
blocked: 1

## Gaps

P1 initial JavaScript is 267.0 KiB gzip against the unchanged 260 KiB budget. Optimize the product bundle, then rerun the case-sensitive aggregate release gate.
