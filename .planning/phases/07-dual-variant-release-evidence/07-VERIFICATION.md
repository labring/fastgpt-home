---
phase: 07-dual-variant-release-evidence
verified: 2026-08-17T11:42:19Z
status: passed
score: 8/8 must-haves verified
behavior_unverified: 0
overrides_applied: 0
behavior_unverified_items: []
human_verification: []
---

# Phase 7: Dual-Variant Release Evidence Verification Report

**Phase Goal:** Maintainers can reproduce and inspect complete, release-safe Guide exports for both owned site variants.
**Verified:** 2026-08-17T11:42:19Z
**Status:** passed
**Re-verification:** Yes — completed on `/Volumes/fastgpt-guide-release`, a case-sensitive APFS workspace.

## Goal Achievement

| # | Observable truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | One repository command validates the complete Guide release contract against generated io/cn exports. | ✓ VERIFIED | `npm run verify:release -- --keep-artifacts` exited 0 after fresh io and cn builds on the case-sensitive APFS workspace. |
| 2 | Clean case-sensitive cn/io exports each prove one hub, eight articles, exact sitemap coverage, and a ≤260 KiB P1 result. | ✓ VERIFIED | The registry-driven Guide artifact verifier passed for both variants; each P1 check measured 259.9 KiB initial JavaScript gzip. The verifier enforces 9 Guide HTML routes and 9 sitemap URLs per variant. |
| 3 | The standalone artifact command reports variant, slug-or-hub, path, and surface failures. | ✓ VERIFIED | `npm run verify:guide-export-regression` passed all 6 tests, including scoped invalid-input failures. |
| 4 | io maps to English `fastgpt.io` and cn maps to Chinese `fastgpt.cn`, each with `/guide` plus the same eight ordered slugs. | ✓ VERIFIED | `buildGuideExpectation()` and both real artifact runs used the owned locale/host projections and registry order. |
| 5 | Artifact regression mutations fail closed for metadata, SEO, JSON-LD, links, assets, route inventory, sitemap, owner, locale, adapter, and case-fold drift. | ✓ VERIFIED | Focused export mutation suites passed; the production artifact verifier passed after both static exports. |
| 6 | Source-only verification remains export-independent and validates registry/source fidelity plus SEO graph. | ✓ VERIFIED | `npm run verify:release -- --source-only`, `npm run verify:guide-content`, and `npm run verify:guide-seo-graph` passed. |
| 7 | Full mode fails closed on case-insensitive hosts and provides a runnable case-sensitive evidence path. | ✓ VERIFIED | The original host probe failed closed with the FAQ collision remediation; the APFS rerun passed the probe and completed both builds. Ubuntu workflow and `Dockerfile.verify` remain checked in. |
| 8 | Phase 7 stays within repository/build/CI verification scope. | ✓ VERIFIED | Changes cover verifiers, release coordination, workflow, and verification Dockerfile; deployment, live HTTP, cache, revision, rollback, and push operations remain Phase 8 scope. |

**Score:** 8/8 truths verified.

## Release Gate Evidence

Command:

```text
npm run verify:release -- --keep-artifacts
```

Environment:

- Case-sensitive APFS mounted at `/Volumes/fastgpt-guide-release`.
- Physical `npm ci` dependencies installed inside the mounted worktree.
- `NEXT_PUBLIC_SITE_VARIANT` set by the coordinator for each variant.

Passed source gates:

- FAQ route registry, metadata snapshot, route source, metadata source, SEO graph, and redirect source checks.
- TypeScript source verification.
- Guide content source and Guide SEO graph source verification.
- Case-sensitive filesystem probe.

Passed io export gates:

- Fresh production build.
- P0, P1, P2, i18n SEO, FAQ metadata, FAQ SEO graph, and FAQ redirect artifact checks.
- FAQ export cardinality.
- Guide export artifact verification.
- P1 measurement: **259.9 KiB initial JavaScript gzip**.

Passed cn export gates:

- Fresh production build.
- P0, P1, P2, i18n SEO, FAQ metadata, FAQ SEO graph, and FAQ redirect artifact checks.
- FAQ export cardinality.
- Guide export artifact verification.
- P1 measurement: **259.9 KiB initial JavaScript gzip**.

Final output:

```text
[verify-release] release gate passed for source, redirects, io, cn, HTML, and sitemap evidence
```

## Requirement Coverage

| Requirement | Status | Evidence |
| --- | --- | --- |
| VERIFY-04 | ✓ VERIFIED | The single `verify:release` command ran source, registry, metadata, asset/link, route, SEO graph, sitemap, and real exported HTML checks with scoped verifier failures. |
| VERIFY-05 | ✓ VERIFIED | Real case-sensitive APFS io and cn production exports completed, each passed the exact Guide inventory verifier and stayed below the 260 KiB P1 budget. |

## Remaining Human Checks

None. Phase 7 verification is complete. Phase 8 owns immutable artifact delivery, deployment revisions, cache purge, rollback targets, and production HTTP evidence.

---

_Verified: 2026-08-17T11:42:19Z_
_Verifier: release-gate rerun on case-sensitive APFS_
