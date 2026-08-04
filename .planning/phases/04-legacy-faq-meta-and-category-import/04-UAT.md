# Phase 4 UAT: 存量 FAQ Meta 与分类导入

**Date:** 2026-08-04  
**Environment:** macOS worktree, Node static build output, source package V1.0/V1.1

## Automated scenarios

| Scenario | Result | Evidence |
|---|---|---|
| Read Meta workbook and check source fingerprint | PASS | `artifacts/phase4/meta-overlay-report.json` |
| Preserve all 100 Meta source rows | PASS | 100 rows, 76 matched, 24 unresolved |
| Render matched Title/Description and preserve existing Keywords in HTML | PASS | `artifacts/phase4/phase4-build-report.json` |
| Full 2,000-row category dry-run | PASS | `blocked`, 606 conflicts, 0 writes |
| Explicit matched-row allowlist | PASS | `scripts/phase4/test_legacy_batch.mjs` |
| Same batch replay | PASS | `idempotent-no-op` |
| Matching-batch rollback | PASS | immutable fields verified |
| TypeScript and lint | PASS | command output |
| Static production build | PASS | 2,889 generated pages |

## Open gates

- The 24 Meta rows without a current repository object remain unresolved.
- The 2,000-row category full batch remains blocked by 606 identity conflicts: 585 missing source objects, 20 duplicate-url rows, and 1 URL/question conflict.
- Browser viewport evidence is reserved for Phase 5 because this environment has no browser executable.
