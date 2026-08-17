---
status: complete
phase: 07-dual-variant-release-evidence
source: 07-VERIFICATION.md, 07-01-SUMMARY.md, 07-02-SUMMARY.md, 07-03-SUMMARY.md
started: 2026-08-17T07:09:20Z
updated: 2026-08-17T11:42:19Z
---

## Current Test

[testing complete]

## Tests

### 1. Source and registry release checks
expected: The unified release command validates FAQ and Guide source contracts before export.
result: pass

### 2. Case-sensitive filesystem gate
expected: The gate accepts the case-sensitive APFS workspace and proceeds to both production builds.
result: pass

### 3. io production export
expected: The io variant builds and passes all HTML, SEO, redirect, sitemap, and Guide artifact checks.
result: pass

### 4. cn production export
expected: The cn variant builds and passes all HTML, SEO, redirect, sitemap, and Guide artifact checks.
result: pass

### 5. Guide route and sitemap inventory
expected: Each variant contains one Guide hub, eight Guide articles, and nine owned sitemap URLs.
result: pass

### 6. Initial JavaScript budget
expected: Each variant reports an initial JavaScript gzip measurement at or below 260 KiB.
result: pass

### 7. Slug-scoped export diagnostics
expected: Guide export mutation and invalid-input tests identify variant, slug-or-hub, path, and surface failures.
result: pass

### 8. Phase boundary
expected: The release evidence phase leaves deployment, live HTTP, cache, revision, rollback, and push operations for Phase 8.
result: pass

## Summary

total: 8
passed: 8
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

None.
