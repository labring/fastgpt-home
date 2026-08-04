# Phase 5 UAT: 整批发布验收与交接

**Date:** 2026-08-04
**Environment:** macOS worktree, Node static build output

## Automated scenarios

| Scenario | Result | Evidence |
|---|---|---|
| Enumerate 60 W2 FAQ items | PASS | `artifacts/phase5/release-handoff.json` |
| Enumerate 4 comparison pages | PASS | comparison manifest and handoff |
| Enumerate 100 Meta rows | PASS | Phase 4 Meta report and handoff |
| Enumerate 2,000 category rows | PASS | Phase 4 category dry-run and handoff |
| Build and verify release handoff | PASS | `npm run verify:p5` |
| TypeScript and lint | PASS | command output |
| Production static build | PASS | 2,889 static pages |
| Phase 3 preview/signoff gate | PASS as preview gate | 12 signoff blockers retained |
| Phase 4 replay/rollback contract | PASS | `npm run verify:p4` |

## Operational scenarios

| Scenario | Result | Reason |
|---|---|---|
| Desktop browser inspection | PENDING | No browser executable is available in this environment |
| Mobile browser inspection | PENDING | No browser executable is available in this environment |
| Live URL reachability | PENDING | Requires deployment/remote access |
| Search crawl and dual-domain SEO evidence | PENDING | Requires deployed URLs and search tooling |

## Release blockers

- 24 Meta source rows lack a unique repository FAQ object.
- 606 category identity conflicts block the 2,000-row full batch and keep writes at zero.
- Four comparison pages require product, sales, and legal signoffs.
- Case-sensitive CI exact-set evidence remains required for the known macOS route collision.
- Existing `verify:p0` reports a missing `og:image` on `/zh/faq/Why-are-enterprises-paying-more`.
