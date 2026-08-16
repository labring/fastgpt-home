---
phase: 01-canonical-faq-routes
verified: 2026-08-15T17:30:47Z
status: passed
score: 3/3 must-haves verified
behavior_unverified: 0
---

# Phase 1: Canonical FAQ Routes Verification Report

**Phase Goal:** Every English FAQ currently in the repository is reachable at one safe canonical URL, with healthy public URLs preserved.
**Verified:** 2026-08-15T17:30:47Z
**Status:** passed

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | A visitor can reach every current English FAQ record through one safe, unique canonical URL. | ✓ VERIFIED | Registry verifier covers all 1,400 source keys; preserved mixed-case and repaired lowercase syntax/uniqueness pass; the `io` static export contains 1,400 canonical FAQ HTML routes. |
| 2 | A visitor using a healthy existing English FAQ URL reaches the same intended FAQ page at that public URL. | ✓ VERIFIED | 786 evidence-bound mixed-case routes remain exact canonical slugs and all 786 are present in the `io` export; unsafe/collided sources are explicitly repaired for later redirect projection. |
| 3 | A visitor can reach every in-scope FAQ with a missing or unsafe route through its deterministic repaired canonical URL and see the intended content. | ✓ VERIFIED | Question-derived slug allocation is deterministic; encoded route round-trips and malformed/unknown IDs are asserted; sampled exported canonical HTML contains the intended question. |

**Score:** 3/3 truths verified

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/generate-faq-route-registry.js` | Deterministic `--write`/`--check` registry generator | ✓ EXISTS + SUBSTANTIVE | 523-line Node standard-library generator parses FAQ AST, workbook XML, evidence, and collision ledger. |
| `src/faq/english-route-evidence.json` | Committed normalized evidence snapshot | ✓ EXISTS + SUBSTANTIVE | 1,400 records: 1,195 Week04 online URL rows and 205 repository-current-key rows. |
| `src/faq/generated-en-route-registry.json` | Build-time canonical mapping | ✓ EXISTS + SUBSTANTIVE | 1,400 sorted records (786 preserved, 614 repaired), 149 explicit `no-redirect` collision entries, safe unique slugs. |
| `src/faq/index.ts` | Registry-backed English FAQ lookup/catalog | ✓ EXISTS + SUBSTANTIVE + WIRED | Canonical slug maps are imported by route consumers and preserve authored fields. |
| `src/lib/localizedRoutes.ts` | Canonical path adapter | ✓ EXISTS + SUBSTANTIVE + WIRED | English IDs normalize to committed canonical slugs before encoding. |
| `src/app/[lang]/faq/[id]/page.tsx` | Canonical detail route and static params | ✓ EXISTS + SUBSTANTIVE + WIRED | Static params use `getFaqIds`; decode failures and unknown IDs call `notFound()`. |
| `src/app/faq/[id]/page.tsx` | Root alias static params | ✓ EXISTS + SUBSTANTIVE + WIRED | Existing `getFaqIds(defaultLocale)` delegation consumes canonical IDs on the English site variant. |
| `scripts/verify-faq-routes.js` | Focused registry/route regression verifier | ✓ EXISTS + SUBSTANTIVE + WIRED | Assert-based route round-trip, malformed-ID, cardinality, collision, and source-key checks. |

**Artifacts:** 8/8 verified

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| `src/faq/index.ts` | `generated-en-route-registry.json` | JSON import and slug maps | ✓ WIRED | Canonical IDs drive `getFaqData`, `getFaqItem`, `getFaqIds`, and translation lookup. |
| `src/lib/localizedRoutes.ts` | `src/faq/index.ts` | `getEnglishFaqCanonicalSlug` | ✓ WIRED | FAQ links encode final English slugs while leaving non-English behavior unchanged. |
| Localized FAQ detail route | `src/faq/index.ts` | `getFaqIds`/`getFaqItem` | ✓ WIRED | Static params and detail lookup consume one registry mapping. |
| Root FAQ detail route | Localized FAQ detail route | re-export and `getFaqIds(defaultLocale)` | ✓ WIRED | Root English alias emits the same canonical slug set. |

**Wiring:** 4/4 connections verified

## Requirements Coverage

| Requirement | Status | Blocking Issue |
|-------------|--------|----------------|
| URL-01: Every current English FAQ has one stable identity and safe unique canonical slug. | ✓ SATISFIED | - |
| URL-02: Every healthy current FAQ route keeps its intended public identity through evidence-bound preserve/repair decisions. | ✓ SATISFIED | - |
| URL-03: Missing or unsafe in-scope routes receive deterministic repaired slugs resolving to intended FAQ content. | ✓ SATISFIED | - |

**Coverage:** 3/3 requirements satisfied

## Anti-Patterns Found

No phase-specific blockers or stubs found. The production build emitted a non-blocking Next.js workspace-root warning caused by multiple lockfiles outside this phase.

## Human Verification Required

None — automated route checks and the `io` static export smoke test cover the phase's URL truths. Playwright MCP was unavailable, so visual checks remain owned by the UI review workflow.

## Gaps Summary

**No gaps found.** Phase goal achieved for URL-01, URL-02, and URL-03. Metadata, full SEO graph, redirect projection, and release-wide verification remain in their roadmap phases.

## Verification Metadata

**Verification approach:** Goal-backward against Phase 1 roadmap success criteria
**Must-haves source:** ROADMAP.md success criteria and 01-01-PLAN.md URL requirements
**Automated checks:** 5 passed, 0 failed

- `node scripts/generate-faq-route-registry.js --check`
- `node scripts/verify-faq-routes.js --route-wiring`
- `npm run verify:faq-routes`
- `npx tsc --noEmit`
- `NEXT_PUBLIC_SITE_VARIANT=io NEXT_PUBLIC_HOME_URL=https://fastgpt.io npm run build`

**Static export evidence:** `out/faq/` contains 1,400 canonical `.html` routes; all 786 preserved mixed-case paths and 614 repaired lowercase paths are present, sampled preserved HTML includes the intended question, and a sampled repaired legacy path is absent from the export.
**Decision coverage:** 4/4 CONTEXT decisions honored (`gsd-tools check.decision-coverage-verify`).
**Human checks required:** 0

---
*Verified: 2026-08-15T17:30:47Z*
*Verifier: the agent (subagent)*
