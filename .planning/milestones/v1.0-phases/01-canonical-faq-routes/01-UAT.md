---
status: complete
phase: 01-canonical-faq-routes
source: [.planning/phases/01-canonical-faq-routes/01-01-SUMMARY.md]
started: 2026-08-16T01:18:00+08:00
updated: 2026-08-16T01:28:00+08:00
---

## Current Test

[testing complete]

## Tests

### 1. English FAQ identity and registry invariants
expected: The committed evidence and route registry cover every current English FAQ identity with unique safe canonical slugs.
result: pass
source: automated
coverage_id: D1

### 2. Canonical route wiring
expected: FAQ lookup, canonical path generation, localized static params, and the root alias consume the same registry.
result: pass
source: automated
coverage_id: D2

### 3. Deterministic repaired routes and malformed-ID handling
expected: Unsafe or collided source routes receive deterministic question-derived slugs, and malformed or unknown IDs resolve to no record.
result: pass
source: automated
coverage_id: D3

### 4. Cold Start Smoke Test
expected: A fresh production build starts from the repository state, generates all static FAQ routes, and completes without errors.
result: pass
source: automated
evidence: `NEXT_PUBLIC_SITE_VARIANT=io NEXT_PUBLIC_HOME_URL=https://fastgpt.io npm run build` completed successfully; `out/faq/` contains 1,400 canonical `.html` routes.

### 5. Healthy mixed-case URL preservation
expected: A Week04 online URL with a safe mixed-case slug remains the exact canonical route, while unsafe and collided sources use lowercase deterministic repairs.
result: pass
source: automated
evidence: Registry contains 786 preserved mixed-case records and 614 repaired records; the `io` export contains all 786 preserved paths, all 614 repaired paths, and omits the sampled repaired legacy path.

## Summary

total: 5
passed: 5
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

None yet.
