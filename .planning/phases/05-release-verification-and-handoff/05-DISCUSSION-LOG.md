# Phase 5: 整批发布验收与交接 - Discussion Log

> Audit trail for the autonomous release discussion. Decisions are captured in `05-CONTEXT.md`.

**Date:** 2026-08-04
**Mode:** `--auto`
**Scope:** counts, source evidence, gate status, manual/online verification, rollback

## Release status

| Option | Selected |
|---|---|
| Mark all 2,100 repairs published after local build | |
| Publish verified static items and retain open gates as blocked | ✓ |
| Omit unresolved rows from the handoff | |

The handoff keeps every source row and uses the strictest gate result. Local static and browser verification prove the implemented surface; pending signoffs, identity gaps, and live reachability remain visible release conditions.

## Counting boundary

| Option | Selected |
|---|---|
| Count only runtime records | |
| Count 60 FAQ + 4 comparison pages + 100 Meta + 2,000 category rows | ✓ |
| Merge category and Meta rows by URL | |

The new-content and legacy-repair arrays preserve separate source versions and batches. Duplicate source URLs remain distinct category rows when the source supplied them.

## Environment evidence

| Option | Selected |
|---|---|
| Treat macOS local output as the deployment exact-set authority | |
| Record macOS limitations and require case-sensitive CI evidence | ✓ |
| Ignore the route-count discrepancy | |

The handoff records the 2,830/2,860 macOS FAQ output gap as an explicit finding. The build itself passed, the locale-aware P0 image check passed, and publication requires the documented case-sensitive gate.

## Browser evidence

| Surface | Viewport | Result | Evidence |
|---|---:|---|---|
| Dify comparison page | 1,440 x 900 | PASS | `artifacts/phase5/uat/compare-desktop.png` |
| Dify comparison page | 390 x 844 | PASS | `artifacts/phase5/uat/compare-mobile-harness.png` |
| FAQ detail page | 1,440 x 900 | PASS | `artifacts/phase5/uat/faq-desktop.png` |

The CDP layout report confirms each surface fits its viewport and preserves the expected content and structured-data markers.

## Rollback

| Option | Selected |
|---|---|
| Reconstruct a rollback from current source files | |
| Use Phase 4 batch IDs and pre-write snapshots | ✓ |
| Restore the whole repository indiscriminately | |

The current category full batch has zero writes. Future allowlist changes use `legacy_batch.mjs --mode rollback` with the original manifest and state file.
