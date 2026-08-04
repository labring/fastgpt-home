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

The handoff keeps every source row and uses the strictest gate result. Local static verification proves the implemented surface; pending signoffs, identity gaps, browser evidence, and live reachability remain visible release conditions.

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

The handoff records the 2,830/2,860 macOS FAQ output gap and the existing P0 image check as explicit findings. The build itself passed; publication requires the documented case-sensitive gate.

## Rollback

| Option | Selected |
|---|---|
| Reconstruct a rollback from current source files | |
| Use Phase 4 batch IDs and pre-write snapshots | ✓ |
| Restore the whole repository indiscriminately | |

The current category full batch has zero writes. Future allowlist changes use `legacy_batch.mjs --mode rollback` with the original manifest and state file.
