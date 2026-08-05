# Phase 5 UAT: 整批发布验收与交接

**Date:** 2026-08-05
**Environment:** macOS worktree, Node static build output, Chrome CDP browser harness

## Automated scenarios

| Scenario | Result | Evidence |
|---|---|---|
| Enumerate 60 W2 FAQ items | PASS | `artifacts/phase5/release-handoff.json` |
| Enumerate 4 comparison pages | PASS | comparison manifest and handoff |
| Enumerate 100 Meta rows | PASS | Phase 4 Meta report and handoff |
| Enumerate 2,000 category rows | PASS | Phase 4 category dry-run and handoff |
| Build and verify direct release | PASS | `npm run verify:direct-release` |
| TypeScript and lint | PASS | command output |
| Production static build | PASS | 2,889 static pages |
| Phase 3 direct-publish gate | PASS with waiver | 12 signoff findings recorded as waived under explicit direct-release authorization |
| Phase 4 replay/rollback contract | PASS | `npm run verify:p4` |
| Browser evidence report | PASS | `node scripts/phase5/test_browser_evidence.mjs` |

## Operational scenarios

| Scenario | Result | Reason |
|---|---|---|
| Desktop browser inspection | PASS | `artifacts/phase5/uat/compare-desktop.png`, `artifacts/phase5/uat/faq-desktop.png` |
| Mobile browser inspection | PASS | `artifacts/phase5/uat/compare-mobile-harness.png`; 390px layout bounds verified |
| Live URL reachability | PASS | Workflow `30969755418`; 60 W2 FAQ URLs and 4 comparison URLs returned HTTP 200 |
| Sitemap, canonical and robots evidence | PASS | Sitemap lists 1,460 Chinese FAQ routes and 4 comparison routes; checked pages use `fastgpt.cn` canonical and `index, follow` |

## Deferred and waived items

- 24 Meta source rows lack a unique repository FAQ object and remain outside the static runtime overlay.
- 606 category source rows lack a unique runtime object and remain deferred; 1,394 unique category mappings are live.
- Product, sales, and legal signoff findings for four comparison pages are waived by the explicit direct-publish authorization and remain recorded for later review.
- The macOS case-sensitive exact-set limitation remains an environment note; the remote deployment workflow completed the production build successfully.
