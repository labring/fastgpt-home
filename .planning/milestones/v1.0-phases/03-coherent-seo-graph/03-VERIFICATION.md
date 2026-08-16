---
phase: 03-coherent-seo-graph
verified: 2026-08-15T19:41:28Z
status: passed
score: 3/3 must-haves verified
behavior_unverified: 0
---

# Phase 3: Coherent SEO Graph Verification Report

**Phase Goal:** Every final FAQ page and discovery surface consistently represents the same canonical FAQ identity.
**Verified:** 2026-08-15T19:41:28Z
**Status:** passed

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | A visitor and search crawler see an H1 and FAQ JSON-LD question that identify the intended FAQ record on every final page. | ✓ VERIFIED | `npm run verify:faq-seo-graph` checks one durable contentId identity across 1,400 English and 1,490 Chinese routes. Case-sensitive APFS io and cn HTML checks compare visible H1, FAQ JSON-LD Question.name, and acceptedAnswer to authored records for every exported route. |
| 2 | Every final FAQ page provides its self-referencing canonical URL and valid published `en`, `zh-CN`, and `x-default` alternates. | ✓ VERIFIED | `src/lib/seo.ts` and the detail route resolve one locale route key before constructing owner-domain URLs. APFS HTML verification checks exact self-canonical and published alternate sets, including repaired English slugs, bilingual records, and missing-counterpart omission. |
| 3 | FAQ lists, related links, static routes, and the sitemap use final canonical slugs; the sitemap contains each canonical FAQ URL once and contains no legacy alias. | ✓ VERIFIED | `npm run verify:faq-routes` and `npx tsc --noEmit` pass source wiring. APFS sitemap checks pass exact URL-set cardinality, owner host, duplicate detection, case-sensitive paths, and legacy/prefixed alias exclusion for io and cn. |

**Score:** 3/3 truths verified

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/faq/index.ts` | Durable contentId-to-locale route-key adapter | ✓ EXISTS + SUBSTANTIVE + WIRED | Resolves English canonical slugs and published Chinese keys to one contentId, including Chinese-only published records; drives item lookup, IDs, and translation locales. |
| `src/lib/seo.ts` | Owner-domain canonical and published FAQ alternates | ✓ EXISTS + SUBSTANTIVE + WIRED | `getFaqAlternates` uses the resolved contentId and locale route keys, current-language self URL, published counterparts, and x-default English ownership. |
| `src/lib/localizedRoutes.ts` | Registry-only FAQ path adapter | ✓ EXISTS + SUBSTANTIVE + WIRED | `getFaqPath` normalizes canonical slugs/contentIds through the route registry and fails closed for unknown identity. |
| `src/app/[lang]/faq/[id]/page.tsx` | Detail route identity and static parameters | ✓ EXISTS + SUBSTANTIVE + WIRED | One resolved `faqItem` supplies H1, FAQ JSON-LD, breadcrumb, related links, metadata, and not-found behavior; static params use final IDs. |
| `src/app/[lang]/faq/page.tsx` | Localized FAQ list route | ✓ EXISTS + SUBSTANTIVE + WIRED | List metadata and links consume the published-locale registry helpers while preserving the existing FAQ shell. |
| `src/app/faq/[id]/page.tsx` | Root English FAQ alias | ✓ EXISTS + SUBSTANTIVE + WIRED | Root static parameters delegate to the canonical default-locale route-key set. |
| `src/app/sitemap.ts` | Exact owner-site FAQ sitemap enumeration | ✓ EXISTS + SUBSTANTIVE + WIRED | Enumerates published final route keys, de-duplicates exact absolute URLs, and retains owner-site behavior with alias exclusion. |
| `scripts/verify-faq-seo-graph.js` | Dependency-free source and HTML/sitemap verifier | ✓ EXISTS + SUBSTANTIVE + WIRED | Source mode covers SEO-01/02/03 and identity invariants; `--html --out-dir --variant` covers every owner-site page and sitemap. |
| `package.json` | Runnable graph verification command | ✓ EXISTS + WIRED | `verify:faq-seo-graph` runs the source verifier without adding dependencies. |

**Artifacts:** 9/9 verified

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/faq/index.ts` | `generated-en-route-registry.json` and locale catalogs | ContentId and route-key maps | ✓ WIRED | English canonical slugs and Chinese published keys resolve through one durable identity boundary. |
| `src/faq/index.ts` | `src/lib/seo.ts` | `getFaqAlternates` contentId input | ✓ WIRED | Metadata alternates use the same identity as detail content and owner-domain URL construction. |
| `src/faq/index.ts` | `src/app/[lang]/faq/[id]/page.tsx` | `resolveFaqContentId`, `getFaqRouteKey`, `getFaqItem` | ✓ WIRED | Detail H1, JSON-LD, breadcrumb, related links, and metadata consume one resolved locale item. |
| `src/lib/localizedRoutes.ts` | FAQ list and related cards | `getFaqPath` | ✓ WIRED | Discovery links encode registry final route keys and reject unknown identities. |
| `src/faq/index.ts` | `src/app/sitemap.ts` | `getFaqIds` and `getFaqPath` | ✓ WIRED | Sitemap output enumerates the same final published route set used by static params and links. |
| `scripts/verify-faq-seo-graph.js` | source graph and static exports | Registry/catalog parsing plus HTML/sitemap parser | ✓ WIRED | The verifier fails closed for identity drift, duplicate canonical URLs, route collisions, and metadata/HTML mismatch. |

**Wiring:** 6/6 connections verified

## Requirements Coverage

| Requirement | Status | Blocking Issue |
|-------------|--------|----------------|
| SEO-01: Every final FAQ page renders an H1 and FAQ JSON-LD question that match the intended record identity. | ✓ SATISFIED | - |
| SEO-02: Every final FAQ page emits a self-referencing canonical URL and valid `en`, `zh-CN`, and `x-default` alternates for published counterpart routes. | ✓ SATISFIED | - |
| SEO-03: FAQ list links, related links, static parameters, sitemap entries, and redirect targets use the same final slug mapping; the sitemap contains each canonical FAQ URL once and excludes legacy aliases. | ✓ SATISFIED | Redirect target projection remains Phase 4 ownership; all Phase 3 route, discovery, and sitemap surfaces use the final mapping. |

**Coverage:** 3/3 requirements satisfied

## Anti-Patterns Found

No phase-specific blockers or stubs found. The default macOS volume is case-insensitive and reports 1,398 io FAQ files for 1,400 canonical routes when preserved mixed-case names collapse. The verifier emits this diagnostic, while a temporary case-sensitive APFS volume proves the complete owner-site exports. Redirect projection and release-wide aggregation remain Phase 4 scope.

## Human Verification Required

None — source checks, route checks, TypeScript validation, production exports, and full case-sensitive HTML/sitemap checks cover the Phase 3 truths. Playwright MCP is unavailable; the metadata/SEO UI contract preserves the existing visual FAQ shell and records zero unresolved UI checkpoints.

## Gaps Summary

**No gaps found.** Phase goal achieved for SEO-01, SEO-02, and SEO-03 with `behavior_unverified: 0`.

## Verification Metadata

**Verification approach:** Goal-backward against Phase 3 roadmap success criteria, 03-01-PLAN.md must-haves, 03-01-SUMMARY.md coverage, and 03-UAT.md.
**Must-haves source:** ROADMAP.md Phase 3 success criteria and 03-01-PLAN.md decisions D-01 through D-10.
**Automated checks:** 10 passed, 0 failed.

- `npm run verify:faq-seo-graph`
- `npm run verify:faq-routes`
- `npm run verify:faq-metadata`
- `npx tsc --noEmit`
- `NEXT_PUBLIC_SITE_VARIANT=io NEXT_PUBLIC_HOME_URL=https://fastgpt.io npm run build` on case-sensitive APFS
- `node scripts/verify-faq-seo-graph.js --html --out-dir out --variant io` on case-sensitive APFS
- `NEXT_PUBLIC_SITE_VARIANT=cn NEXT_PUBLIC_HOME_URL=https://fastgpt.cn npm run build` on case-sensitive APFS
- `node scripts/verify-faq-seo-graph.js --html --out-dir out --variant cn` on case-sensitive APFS
- `NEXT_PUBLIC_SITE_VARIANT=io NEXT_PUBLIC_HOME_URL=https://fastgpt.io npm run verify:p2`
- `node scripts/verify-faq-seo-graph.js` syntax validation

**Static export evidence:** The case-sensitive APFS io export emitted 1,400 FAQ pages and 1,400 sitemap FAQ URLs. The cn export emitted 1,490 FAQ pages and 1,490 sitemap FAQ URLs. Both HTML verifiers passed canonical, hreflang, H1, FAQ JSON-LD, owner-host, exact URL-set, duplicate, and alias checks.
**Decision coverage:** D-01 through D-10 are covered by source and export assertions; U-01 through U-04 remain satisfied by preserving the existing FAQ visual surface.
**Human checks required:** 0

---
*Verified: 2026-08-15T19:41:28Z*
*Verifier: Codex goal-backward verification subagent*
