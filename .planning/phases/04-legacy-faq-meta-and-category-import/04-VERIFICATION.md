# Phase 4 Verification: 存量 FAQ Meta 与分类导入

**Verified:** 2026-08-04

## Goal-backward result

Phase 4 implementation is operational and fail-closed. The verified Meta subset is live in the English FAQ runtime. The full category import remains a deliberate release blocker because the Phase 1 identity contract does not permit partial implicit writes.

## Requirement evidence

| Requirement | Result | Evidence |
|---|---|---|
| LEG-03 Meta source mapping and HTML fields | PARTIAL/PASS for verified subset | 76 mapped rows; 24 unresolved source rows; static HTML sample passes |
| LEG-04 nine-category import | BLOCKED safely | 2,000 rows retained; 606 conflicts; zero full-batch writes |
| LEG-05 body/slug/URL protection | PASS | immutable hashes in Meta and batch manifests; rollback regression passes |
| LEG-06 dry-run/replay/failure/rollback | PASS | `verify:p4` and batch regression |

## Commands

- `npx tsc --noEmit`
- `npm run lint`
- `NEXT_TELEMETRY_DISABLED=1 npm run build`
- `npm run verify:p4`
- `COMPARE_BUILD_OUT=out npm run verify:p3`
- `node scripts/phase1/test_identity_baseline.mjs`
- `node scripts/phase2/test_w2_faq.mjs`
- `node scripts/phase2/test_faq_routes.mjs`

## Known environment result

`npm run verify:p2` reports 2,830 physical FAQ detail files against 2,860 sitemap routes on the default macOS case-insensitive volume. Phase 2 records the same 15 historical case-only slug collision limitation and requires the case-sensitive Ubuntu CI build as the authoritative exact-set gate.

## Phase 5 handoff

- Consume `artifacts/phase4/meta-overlay-report.json` and `artifacts/phase4/category-batch-dry-run.json`.
- Keep the release status preview/blocked until the 24 Meta identities and 606 category conflicts receive authoritative source resolution.
- Preserve the batch ID `category-751a479680bf-26eaf2c43432` and source fingerprints in the release package.

