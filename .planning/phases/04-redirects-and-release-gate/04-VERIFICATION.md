---
phase: 04-redirects-and-release-gate
verified: 2026-08-16T05:38:00+08:00
status: blocked
score: 2/3 release truths verified; P1 blocks release
behavior_unverified: 0
---

# Phase 4: Redirects and Release Gate Verification Report

**Phase Goal:** Project safe one-hop legacy redirects and prove the complete static FAQ SEO release artifact for both owner sites.
**Verified:** 2026-08-16T05:38:00+08:00
**Status:** blocked by the unchanged P1 260 KiB initial-JavaScript budget

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Eligible changed English FAQ sources receive deterministic one-hop permanent redirects to final canonical pages, while preserved routes and collision-denied sources remain absent; Worker and Nginx writers preserve query strings. | ✓ VERIFIED | `npm run verify:faq-redirects -- --source` and APFS artifact checks passed exact 42 eligible sources, 572 denied repairs, 149 collision-ledger sources, canonical owner targets, encoded/trailing-slash forms, duplicate/many-to-one rejection, Worker `url.search`, and Nginx `$is_args$args` contracts. |
| 2 | The aggregate release gate validates source contracts and independently proves clean case-sensitive io and cn static exports with exact route/sitemap cardinality and stale-output isolation. | ⚠ BLOCKED | Quick plan `260816-j3z` restored immutable failure handling. The temporary case-sensitive APFS aggregate exits 1 while `verify:p1` reports 267.0 KiB gzip against the unchanged 260 KiB budget. c77cf48 at 266.9 KiB is advisory context only. |
| 3 | Final exported FAQ pages retain H1, authored FAQ identity, approved metadata, self canonical, published hreflang, owner-domain URLs, and exact sitemap membership while existing FAQ UI behavior remains intact. | ✓ VERIFIED | Case-sensitive io metadata HTML passed 1,195 approved mappings. The cn retained export passed authored metadata HTML for 1,490 pages, including Chinese-only identities, and the matching SEO graph passed 1,490 pages. |

**Score:** 2/3 release truths verified; bundle optimization is required for release approval.

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/lib/redirects.js` | Registry-backed unique legacy alias projection and query-preserving writers | ✓ EXISTS + SUBSTANTIVE + WIRED | Reads final English route registry dispositions, emits only eligible aliases, denies preserved/collision sources, and retains Worker/Nginx owner and query behavior. |
| `scripts/verify-faq-redirects.js` | Source and generated-map redirect verifier | ✓ EXISTS + SUBSTANTIVE + WIRED | Checks cardinalities, deny sets, canonical targets, encoding, slash forms, duplicate safety, and query contracts. |
| `scripts/verify-release.js` | Aggregate source/build/HTML release gate | ✓ EXISTS + SUBSTANTIVE + WIRED | Keeps every child failure in the aggregate result, emits a separate c77cf48 baseline comparison, and runs owner-scoped metadata HTML immediately after each build. |
| `package.json` | Runnable redirect and release commands | ✓ EXISTS + WIRED | Exposes `verify:faq-redirects`, `verify:release`, and dependency-free `verify:release-regression`. |
| `scripts/verify-p0.js` | Registry-backed deployment fixture | ✓ EXISTS + SUBSTANTIVE + WIRED | Resolves final representative FAQ route through committed registry data. |
| `scripts/verify-p1.js` | Registry-backed metadata/canonical fixture | ✓ EXISTS + SUBSTANTIVE + WIRED | Resolves final representative route and preserves the existing budget assertion/advisory evidence. |
| `scripts/verify-i18n-seo.js` | Registry-backed canonical route fixture | ✓ EXISTS + SUBSTANTIVE + WIRED | Uses final route keys and validates owner-site SEO alignment. |
| `.planning/phases/04-redirects-and-release-gate/04-01-SUMMARY.md` | Execution evidence and deviations | ✓ EXISTS + SUBSTANTIVE | Records all implementation commits, APFS counts, advisory baseline, environment diagnostics, and requirement coverage. |

**Artifacts:** 8/8 verified

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/faq/generated-en-route-registry.json` | `scripts/lib/redirects.js` | `legacySources`, `routeStatus`, `collisionDisposition`, and ledger deny projection | ✓ WIRED | Redirect eligibility and deny behavior derive from committed registry data with deterministic source/target assertions. |
| `scripts/lib/redirects.js` | `out/_worker.js` and `.next/nginx-redirects.conf` | Variant-owned redirect writers | ✓ WIRED | Artifact checks prove absolute `fastgpt.io` canonical targets, 301 semantics, encoded/slash forms, and query preservation. |
| `scripts/verify-faq-redirects.js` | Registry and edge artifacts | Exact source/target/deny-set/cardinality assertions | ✓ WIRED | Source and APFS artifact checks fail closed for unknown, duplicate, many-to-one, denied, or foreign targets. |
| `scripts/verify-release.js` | `package.json` build and existing verifiers | Explicit variant environment, immediate post-build checks, and stale-output isolation | ✓ WIRED | Source-only and APFS full release commands aggregate route, metadata, SEO, redirect, TypeScript, HTML, sitemap, and cleanup results. |
| `scripts/verify-release.js` | Generated route and metadata snapshots | Registry and overlay identity checks | ✓ WIRED | Route/metadata source checks plus APFS HTML coverage preserve canonical route identity and approved metadata ownership. |

**Wiring:** 5/5 connections verified

## Requirements Coverage

| Requirement | Status | Blocking Issue |
|-------------|--------|----------------|
| URL-04: Unique changed legacy paths redirect permanently in one hop while ambiguous collision paths remain without guessed redirects. | ✓ SATISFIED | - |
| VERIFY-01: One command validates route, metadata, URL, redirect, identity, and SEO-surface alignment with record-level failures. | ✓ SATISFIED | The current command truthfully exits 1 for P1. |
| VERIFY-02: Production builds include every final in-scope FAQ route for the owner exports. | ✓ SATISFIED | - |
| VERIFY-03: Exported FAQ HTML verifies H1, approved metadata, canonical, hreflang, JSON-LD, and sitemap membership. | ✓ SATISFIED | - |

**Coverage:** 4/4 requirements satisfied

## Anti-Patterns Found

The default macOS volume remains case-insensitive and fails the full gate before build when preserved mixed-case route names collide. A temporary case-sensitive APFS workspace provided io and cn HTML evidence. P1 reports 267.0 KiB gzip against a 260 KiB budget, so the aggregate release gate exits 1. c77cf48 APFS at 266.9 KiB is explicit historical advisory context.

## Human Verification Required

No product-behavior review is required. Release approval awaits initial-JavaScript optimization below 260 KiB. Phase4 introduces no new visual surface.

## Gaps Summary

**Open release blocker:** P1 initial JavaScript remains 267.0 KiB gzip against 260 KiB. URL-04, source verification, io metadata HTML (1,195), and cn metadata HTML (1,490) remain independently evidenced.

## Verification Metadata

**Verification approach:** Goal-backward against Phase4 roadmap success criteria, `04-01-PLAN.md` must-haves, `04-01-SUMMARY.md` coverage, and `04-UAT.md`.
**Must-haves source:** ROADMAP.md Phase4 success criteria and `04-01-PLAN.md` truths/artifacts/key links.
**Automated checks:** Source checks passed. Case-sensitive APFS owner metadata and SEO evidence passed (io metadata: 1,195; cn metadata and SEO: 1,490). The aggregate release gate exits 1 because P1 measures 267.0 KiB gzip against the unchanged 260 KiB budget; c77cf48 at 266.9 KiB remains advisory-only. Corrected by quick plan `260816-j3z`.

- `node scripts/generate-faq-route-registry.js --check`
- `node scripts/generate-faq-metadata.js --check`
- `npm run verify:faq-routes`
- `npm run verify:faq-metadata`
- `npm run verify:faq-seo-graph`
- `npm run verify:faq-redirects -- --source`
- `npm run verify:release -- --source-only`
- `npx tsc --noEmit`
- `npm run verify:release -- --keep-artifacts` on temporary case-sensitive APFS (exit 1: hard P1 budget failure)
- io export: 1,400 FAQ routes and exact sitemap/HTML/SEO/redirect checks
- cn export: 1,490 FAQ routes and exact sitemap/HTML/SEO/redirect checks

**Static export evidence:** Case-sensitive io metadata HTML passed 1,195 approved English mappings. Case-sensitive cn metadata HTML passed 1,490 authored Chinese pages and its SEO graph passed 1,490 pages. The aggregate remains fail-closed because P1 exits 1 at 267.0 KiB gzip against 260 KiB.
**Decision coverage:** D-01 through D-12 and the Phase4 UI contract are covered by source and APFS release assertions.
**Human checks required:** 0 additional checks; delegated autonomous acceptance recorded above.

---
*Corrected: 2026-08-16T14:25:00+08:00 by quick plan 260816-j3z*
*Verifier: Codex goal-backward verification subagent*
