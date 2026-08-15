---
status: partial
phase: 02-approved-metadata
source: [.planning/phases/02-approved-metadata/02-01-SUMMARY.md]
started: 2026-08-16T02:20:00+08:00
updated: 2026-08-16T02:27:00+08:00
---

## Current Test

[testing paused — 1 blocked item outstanding]

## Tests

### 1. Cold Start Smoke Test
expected: A fresh production build starts from the repository state, generates the static FAQ export, and completes post-build cleanup without application errors.
result: pass
source: automated
evidence: `NEXT_PUBLIC_SITE_VARIANT=io NEXT_PUBLIC_HOME_URL=https://fastgpt.io npm run build` completed successfully; Next generated 1,445 pages and post-build cleanup completed.

### 2. Approved metadata snapshot and source coverage
expected: The committed artifact contains exactly 1,195 mapped records, preserves raw approved fields, reports 205 fallback records, and fails deterministically for duplicate/content-drift mutations.
result: pass
source: automated
coverage_id: D1
evidence: `node scripts/generate-faq-metadata.js --check` and `npm run verify:faq-metadata` passed with `1195 mapped, 205 fallback, 1400 total`.

### 3. Authored content and canonical route protection
expected: Authored Question, Answers, and Category digests remain stable, and the Phase 1 route registry continues to resolve every English route identity.
result: pass
source: automated
coverage_id: D3
evidence: `npm run verify:faq-routes`, `npx tsc --noEmit`, and metadata authored-digest mutation checks passed.

### 4. Exported HTML metadata and FAQ identity
expected: Every mapped canonical FAQ export contains the approved title/description/keywords plus the authored H1 and FAQ JSON-LD question identity.
result: blocked
blocked_by: release-build
reason: `npm run verify:faq-metadata -- --html` reached the verifier but macOS case-insensitive filesystem output collapses preserved mixed-case route pairs (for example `How-AI-Helps-in-Planning` and `How-AI-helps-in-planning`). Run the same export and verifier on a case-sensitive host.
coverage_id: D2
evidence: Source mode and `NEXT_PUBLIC_SITE_VARIANT=io NEXT_PUBLIC_HOME_URL=https://fastgpt.io npm run verify:p2` pass; the HTML verifier correctly refuses to compare overwritten files.

## Summary

total: 4
passed: 3
issues: 0
pending: 0
skipped: 0
blocked: 1

## Gaps

None yet. The blocked HTML check is an environment prerequisite for complete UAT evidence.
