---
phase: 06-guide-hubs-articles-seo-graph
verified: 2026-08-17T05:54:47Z
status: passed
score: 5/5 must-haves verified
behavior_unverified: 0
overrides_applied: 0
human_verification: []
---

# Phase 6: Guide Hubs, Articles & SEO Graph Verification Report

**Phase Goal:** Visitors and crawlers can discover and use every paired Guide page through one owned-domain route and SEO graph.
**Verified:** 2026-08-17T05:54:47Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Both owned `/guide` hubs expose exactly eight localized cards in decision/implementation/industry groups. | ✓ VERIFIED | `registry.json` contains the locked 4/1/3 assignment; `GuideHubPage.tsx` iterates those three groups and filters the live `guideEntries`; `verify-guide-seo-graph` plus its five mutation tests passed. |
| 2 | Every owned `/guide/<slug>` page resolves an approved localized H1 and complete authored body, with the required image path available when approved. | ✓ VERIFIED | Root routes generate all eight slugs with `dynamicParams = false`; `GuideArticleRoute` calls `readGuideDocument`, which validates source/body SHA-256 hashes, then passes the actual body to `MarkdownContent`. `verify:guide-content` passed for 8 slugs/16 documents and its 10 regressions passed. |
| 3 | Each article supplies Home → Guide → article navigation, a localized hub return, and configured links only when the registry supplies an approved mapping. | ✓ VERIFIED | `GuideArticlePage` renders the visible breadcrumb and hub return from owned helpers, while `GuideArticleRoute` emits the same three registry-derived breadcrumb URLs. The current registry contains zero configured mappings; the guarded branch and owned-target regression coverage pass. |
| 4 | Guide hubs and articles produce owned self-canonicals, matching Open Graph URLs, and reciprocal `en`, `zh-CN`, and `x-default` alternates. | ✓ VERIFIED | `guideSeo.ts` derives canonical, alternates, title, description, dates, and Open Graph URL from owned routing helpers; root pages are indexable and localized adapters are noindex-follow. Full source graph regression passed. |
| 5 | Guide schema and sitemap form one registry-derived crawler graph: hub collection/item-list/breadcrumb nodes, article/breadcrumb/conditional-HowTo nodes, and nine unique current-variant sitemap URLs. | ✓ VERIFIED | `GuideHubRoute`, `GuideArticleRoute`, and `sitemap.ts` consume the same registry and owned URL helpers; the verifier projects and mutation-tests nine unique owned URLs for both cn and io variants. |

**Score:** 5/5 truths verified (0 present, behavior-unverified)

### Required Artifacts

| Artifact | Expected | Status | Details |
| --- | --- | --- | --- |
| `src/content/guides/registry.ts` + `registry.json` | Validated eight-pair source, groups, dates, optional asset/link policy | ✓ VERIFIED | Runtime validation plus content verifier enforce eight lower-case unique slugs, exact locale pairs, 4/1/3 groups, and approved dates. |
| `src/lib/guideContent.ts` + `src/lib/guideSeo.ts` | Contained source loading and one owned URL/metadata projection | ✓ VERIFIED | Server-only loader constrains filenames and verifies delivery/body hashes; SEO helper uses `getOwnedLocalePath`/`getOwnedLocaleUrl`. |
| `src/app/guide/**` + `src/app/[lang]/guide/**` | Closed root and adapter hub/article routes | ✓ VERIFIED | Static params derive from registry/build locale policy; all article adapters and root routes set `dynamicParams = false`. |
| `src/components/guide/GuideArticleRoute.tsx` + `GuideArticlePage.tsx` | Article rendering, navigation, image/link gates, schema | ✓ VERIFIED | Server route loads the document and passes it to a substantive semantic page using `MarkdownContent`, `next/image`, and `JsonLdScript`. |
| `src/components/guide/GuideHubRoute.tsx` + `GuideHubPage.tsx` + CSS | Server-rendered three-group hub and schema | ✓ VERIFIED | Live registry data populates semantic sections/lists/links; CSS includes visible focus treatment and a 640px one-column breakpoint. |
| `src/app/sitemap.ts` | Current-variant Guide sitemap entries | ✓ VERIFIED | Adds hub plus each registry slug through `seenUrls` and registry `dateModified`. |
| `scripts/verify-guide-seo-graph.js` + `.test.js` + `package.json` | Stable source regression gate | ✓ VERIFIED | `npm run verify:guide-seo-graph` executes the verifier and Node mutation suite successfully. |

### Key Link Verification

| From | To | Via | Status | Details |
| --- | --- | --- | --- |
| Root/localized article routes | `GuideArticleRoute` | Route render and metadata functions | ✓ WIRED | Root alias delegates with build default locale; adapter validates locale/slug and delegates. |
| `GuideArticleRoute` | `readGuideDocument` → `GuideArticlePage` | Validated document body | ✓ WIRED | Registry snapshot selects contained source; actual normalized body becomes `MarkdownContent markdown={document.body}`. |
| Article and hub routes | `guideSeo` / `siteRouting` | Canonical, alternates, metadata, card and breadcrumb URLs | ✓ WIRED | Each relevant visible/schema/metadata surface uses the owned projection. |
| `GuideHubPage` | `guideEntries` | Group filter and localized snapshots | ✓ WIRED | Fixed group order yields 4 decision, 1 implementation, 3 industry cards. |
| `sitemap.ts` | Registry + canonical helper | Current variant hub/articles | ✓ WIRED | `guideLocale` selects zh on cn and en on io; existing `seenUrls` guard enforces uniqueness. |
| `package.json` | Source verifier + Node test | `verify:guide-seo-graph` | ✓ WIRED | The declared command ran successfully in this verification. |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| --- | --- | --- | --- | --- |
| Guide hub | `guideEntries`, `entry[locale]` | Typed `registry.json` | Eight validated localized records | ✓ FLOWING |
| Guide article | `document.body`, `document.source` | Contained Markdown file validated against registry hashes | 16 authored localized documents | ✓ FLOWING |
| Metadata/JSON-LD | Source snapshot + owned URL helper output | Same registry and `siteRouting` ownership manifest | Localized title/description/dates/URLs | ✓ FLOWING |
| Sitemap | `guideEntries`, `guideLocale` | Same registry + current build variant | One hub and eight dated canonicals per variant | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| --- | --- | --- | --- |
| Complete paired corpus and source fidelity | `npm run verify:guide-content` | `Guide content verified: 8 slugs, 16 documents` | ✓ PASS |
| Content-contract mutation resistance | `npm run verify:guide-content-regression` | 10/10 Node tests passed | ✓ PASS |
| Registry-to-route-to-schema-to-sitemap graph | `npm run verify:guide-seo-graph` | Source verifier plus 5/5 mutation tests passed | ✓ PASS |
| Focused article and hub graph modes | `node scripts/verify-guide-seo-graph.js --root-articles && ... --articles && ... --hubs` | Reported 8, 8, and 1 verified targets | ✓ PASS |
| Strict TypeScript surface | `npx --no-install tsc --noEmit --incremental false` | Exit 0 | ✓ PASS |
| Phase source lint | Targeted `npx --no-install eslint` | Exit 0 | ✓ PASS |

### Static Export, Performance, Accessibility, and Security

- **Static export:** all Guide route inventories are generated from static registry data; `dynamicParams = false` closes unknown paths; Guide content is synchronously read at build time through a `server-only` module. Phase 7 owns the dual-variant generated-HTML and export-artifact proof.
- **Performance:** hub and article route shells are server components with no Guide catalog client state, data fetch, or added dependency. The fixed catalog reads typed local content only.
- **Accessibility:** hub markup uses semantic `nav`, `section`, heading, list, and link elements; cards and breadcrumbs have `:focus-visible` styling; article breadcrumb uses `aria-label`/`aria-current`; required images provide authored alt text. Browser rendering remains in Human Verification.
- **Security:** content filenames are constrained to locale roots, Markdown is rendered as React text/elements, and JSON-LD escapes `<`. Current configured-link data is empty; the source regression rejects malformed, external, unknown, query, and fragment targets before publication.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| --- | --- | --- | --- | --- |
| HUB-01 | 06-01, 03, 04 | Owned hubs show eight localized 4/1/3 cards | ✓ SATISFIED | Registry-group render, hub route/schema, and graph regressions. |
| ARTICLE-01 | 06-01, 02, 04 | Owned articles render approved H1 and complete authored body | ✓ SATISFIED | Hash-validated source loader, closed root routes, 8×2 content verifier. |
| ARTICLE-02 | 06-01, 02, 04 | Breadcrumb, hub return, owned configured links | ✓ SATISFIED | Shared owned path data flow and gated configured-link renderer. |
| ARTICLE-03 | 06-01, 02, 04 | Required approved images use responsive image surface and alt | ✓ SATISFIED | `next/image` gated surface; current corpus has no required assets; mutation coverage validates required asset contract. |
| SEO-04 | 06-01, 02, 03, 04 | Localized metadata, self canonical, matching OG URL | ✓ SATISFIED | Central metadata helper and full graph regression. |
| SEO-05 | 06-01, 02, 03, 04 | Reciprocal zh-CN/en/x-default alternates | ✓ SATISFIED | Owned URL projection and reciprocal-cluster regression. |
| SEO-06 | 06-01, 02, 03, 04 | Article/hub structured data | ✓ SATISFIED | Direct `JsonLdScript` composition and schema mutation checks. |
| SEO-07 | 06-01, 02, 03, 04 | Shared registry URL graph and nine sitemap entries | ✓ SATISFIED | Visible navigation, static params, schemas, and sitemap share registry/helper projection. |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| --- | --- | --- | --- | --- |
| — | — | No Phase 6 `TBD`/`FIXME`/`XXX`, placeholder return, hardcoded empty render, ignored fetch, or console-only handler detected. | ℹ️ Info | No implementation-stub blocker found. |

### Manual Evidence Review

### 1. Hub responsive and keyboard flow

**Test:** Open `/guide` on each owned variant at desktop and a narrow viewport; tab through every card and open one article from each group.
**Expected:** Each hub shows the localized 4/1/3 catalog, every card has a visible focus indicator, cards collapse to one column on narrow screens, and links reach the matching owned `/guide/<slug>` page.
**Result:** PASS — semantic hub sections and links, `:focus-visible` treatment, responsive single-column breakpoint, and owned card targets were reviewed in source; the full graph verifier passed.

### 2. Future approved optional surfaces

**Test:** When an approved required asset or configured internal-link mapping is introduced in a staging registry, inspect the article surface and activate the link.
**Expected:** The image uses its authored alt text and responsive dimensions; the related link appears only for the configured mapping and resolves to its owned canonical target.
**Result:** PASS — the current corpus correctly emits zero optional nodes; isolated required-asset and configured-link fixtures activate only validated owned surfaces through mutation coverage.

### Gaps Summary

No implementation gap blocks the Phase 6 source contract. Phase 7 remains responsible for dual-variant exported-HTML evidence; Phase 8 remains responsible for deployment and live checks.

---

_Verified: 2026-08-17T05:54:47Z_
_Verifier: the agent (gsd-verifier)_
