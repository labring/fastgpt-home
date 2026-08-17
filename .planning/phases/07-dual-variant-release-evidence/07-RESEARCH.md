# Phase 7: Dual-Variant Release Evidence - Research

**Researched:** 2026-08-17  
**Domain:** Dependency-free static-export release verification for the bilingual Guide corpus  
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Unified release gate
- **D-01:** Extend the existing `npm run verify:release` coordinator as the
  single complete Guide release gate. Run the current source checks first,
  then `verify:guide-content` and `verify:guide-seo-graph`, then build and
  inspect `io` and `cn` in deterministic order. Preserve the existing
  `--source-only`, `--variant`, and `--keep-artifacts` ergonomics and aggregate
  failures with command and variant context. — **Reversibility:** costly —
  `verify:release` is the repository's established release command consumed by
  CI and maintainer workflows.
- **D-02:** Keep existing FAQ release checks intact and compose the Guide gates
  around them. Guide checks must run before each variant build and the matching
  exported-HTML checks must run immediately after that variant's build so
  stale output cannot satisfy the next variant.

#### Guide export HTML evidence
- **D-03:** Add a dependency-free Guide export verifier driven by
  `src/content/guides/registry.json`. For each variant, assert exactly one
  owned `/guide` hub and eight owned `/guide/<slug>` HTML pages, localized H1,
  title/description, self canonical, matching Open Graph URL, exact
  `zh-CN`/`en`/`x-default` alternates, required schema markers, breadcrumb
  URLs, visible hub/article links, and sitemap membership. Every failure names
  `variant`, `slug` (or `hub`), output path, and the failed surface.
- **D-04:** Reuse the existing static output route resolution and HTML parsing
  conventions from `verify-p0.js`, `verify-p2.js`, and
  `verify-faq-seo-graph.js`. Keep source-only checks runnable without an export
  and keep HTML checks explicit about `--out-dir` and `--variant`.

#### Case-sensitive dual variants and budget
- **D-05:** Require a case-sensitive filesystem before full export work. A
  small probe must fail closed on case-insensitive volumes with a diagnostic
  that names a colliding published route and recommends Linux CI, a dedicated
  Docker/Linux container, or case-sensitive APFS. Source-only mode remains
  available on development volumes.
- **D-06:** Build `io` and `cn` with explicit owner environment variables and
  clear `.next`/`out` between variants. The `io` artifact owns English Guide
  routes and `cn` owns Chinese Guide routes; each artifact must contain one hub
  plus eight article paths, with no localized-adapter copies counted as owned
  public paths.
- **D-07:** Continue enforcing the existing `verify:p1` 260 KiB gzip
  initial-JavaScript budget for each export and record the measured value in
  release output. Historical baseline comparisons remain advisory context;
  the unchanged budget remains the blocking acceptance contract.

#### Scope and failure policy
- **D-08:** Keep Phase 7 build-time and artifact-only. Do not add deployment,
  live HTTP, cache-purge, revision, or rollback steps assigned to Phase 8.
- **D-09:** Preserve approved Guide bytes, metadata, asset policy, internal-link
  mappings, canonical ownership, and registry order. New validation logic must
  report slug-specific diagnostics and avoid inferring assets or URLs from
  source labels.

### the agent's Discretion
- Choose the concrete verifier filename/API, HTML extraction helpers, route
  inventory representation, and focused mutation-fixture strategy while
  reusing Node built-ins and `node:test`.
- Choose whether Guide HTML verification is a standalone script composed by
  `verify-release.js` or an exported helper consumed by the coordinator;
  retain one directly runnable command for focused debugging.
- Choose the smallest Linux/Docker evidence command compatible with the current
  Dockerfile and CI patterns, and document a clear fallback when Docker is
  unavailable.

### Deferred Ideas (OUT OF SCOPE)
- Immutable artifact packaging, deployment revisions, cache purge, rollback targets, live HTTP checks, and production URL verification remain Phase 8.
- Same-slug language switching, hub search/filtering, CMS workflow, and additional Guide articles remain future requirements.
- Historical FAQ restoration and programmatic technical/reference publishing remain outside this milestone.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|---|---|---|
| VERIFY-04 | One repository command validates the Guide registry, source fidelity, metadata, assets, links, route inventory, SEO graph, sitemap, and exported HTML with slug-specific failures. | Compose the two established Guide source gates with a focused artifact verifier in the existing release coordinator. [VERIFIED: package.json:24-28] [VERIFIED: scripts/verify-release.js:235-278] |
| VERIFY-05 | Case-sensitive cn/io production exports each contain one owned hub and eight owned article paths while retaining the initial-JavaScript budget. | Retain the existing case probe, isolated variant build environment, cleanup sequence, and blocking gzip check; add Guide cardinality and HTML evidence immediately after each build. [VERIFIED: scripts/verify-release.js:142-171] [VERIFIED: scripts/verify-release.js:367-399] [VERIFIED: scripts/verify-p1.js:293-344] |
</phase_requirements>

## Summary

Phase 7 can stay small: add one dependency-free `scripts/verify-guide-export.js` artifact verifier, its `node:test` fixture suite, a focused npm script, and release-coordinator composition. The repository already has a source-faithful eight-pair verifier, a source SEO-graph verifier, a two-variant build coordinator, static-HTML resolver patterns, failure aggregation, retention, cleanup, and the blocking initial-JavaScript measurement. [VERIFIED: scripts/verify-guide-content.js:141-238] [VERIFIED: scripts/verify-guide-seo-graph.js:386-454] [VERIFIED: scripts/verify-release.js:35-102] [VERIFIED: scripts/verify-p1.js:293-344]

The full gate must run on a case-sensitive host. This workspace probe reported `case-insensitive`; the existing release regression consequently skips its io HTML fixture. Linux CI is already available through the Ubuntu preview workflow; Docker is absent from this workstation, and the checked-in Dockerfile rejects `io`, so it supplies Linux evidence for cn only until a separate io-compatible container command exists. [VERIFIED: local case probe, 2026-08-17] [VERIFIED: scripts/verify-release.test.js:124-133] [VERIFIED: .github/workflows/preview.yml:18-52] [VERIFIED: Dockerfile:42-52] [VERIFIED: local environment audit, 2026-08-17]

**Primary recommendation:** Extend `npm run verify:release` with Guide source gates immediately before each selected variant build and run a standalone registry-driven Guide HTML verifier immediately after that build; retain `verify:p1` as the blocking per-variant budget check and surface its successful measured value in coordinator output. [VERIFIED: .planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md:16-55] [VERIFIED: scripts/verify-release.js:248-278]

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|---|---|---|---|
| Guide source, metadata, asset, and link contract | API / Backend | Database / Storage | Node source gates read the committed registry and contained Markdown documents at build time. [VERIFIED: scripts/verify-guide-content.js:5-9] [VERIFIED: scripts/verify-guide-content.js:209-224] |
| Variant build, generated output isolation, and budget | CDN / Static | API / Backend | The release coordinator builds the static export with explicit public variant values, clears `.next`/`out`, and verifies generated assets. [VERIFIED: scripts/verify-release.js:99-102] [VERIFIED: scripts/verify-release.js:160-171] [VERIFIED: scripts/verify-release.js:367-388] |
| Guide HTML, metadata, schema, links, and sitemap evidence | CDN / Static | Frontend Server (SSR) | The new verifier reads `out/` only after the server-rendered App Router build has emitted static HTML and `sitemap.xml`. [VERIFIED: next.config.js:2-9] [VERIFIED: scripts/verify-faq-seo-graph.js:340-413] |
| Case-sensitive route collision protection | CDN / Static | OS / CI | Published FAQ paths include a case-fold collision, so host filesystem semantics decide whether the static artifact preserves identity. [VERIFIED: scripts/verify-release.js:125-158] |

## Project Constraints (from AGENTS.md)

- Keep route data available at build time because production uses a static Next.js export. [VERIFIED: AGENTS.md:15-22]
- Keep canonical, hreflang, sitemap, internal links, and redirects on the same final route identity. [VERIFIED: AGENTS.md:15-22]
- Reuse repository Node tooling and add no spreadsheet or slug-mapping dependency. [VERIFIED: AGENTS.md:21-22]
- Leave a runnable regression check and a successful production build path. [VERIFIED: AGENTS.md:21-22]
- Follow action-oriented kebab-case script names, direct assertion failures, concise English success logs, and nonzero exits for validation failure. [VERIFIED: AGENTS.md:108-121] [VERIFIED: AGENTS.md:151-161]
- Keep locale ownership behind existing routing helpers and use typed registry data as production data. [VERIFIED: AGENTS.md:191-195]

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---|---|---|---|
| Node built-ins: `node:assert/strict`, `node:fs`, `node:path`, `node:zlib`, `node:test` | Node `v24.13.0` available | Parse static HTML and JSON-LD, enumerate output, validate sitemap/link inventories, measure gzip, and run isolated mutation fixtures. | Existing release and Guide checks use this dependency-free style. [VERIFIED: scripts/verify-release.js:10-12] [VERIFIED: scripts/verify-guide-content.test.js:1-7] [VERIFIED: scripts/verify-p1.js:1-4] [VERIFIED: local environment audit, 2026-08-17] |
| Existing `verify:release` coordinator | `node scripts/verify-release.js` | Run source checks, build each selected owner variant, aggregate diagnostics, and retain/clean artifacts. | It already exposes `--source-only`, `--keep-artifacts`, and `--variant`. [VERIFIED: package.json:24-25] [VERIFIED: scripts/verify-release.js:35-49] |
| Existing Guide registry | `src/content/guides/registry.json` | Single identity source for exact slug, localized metadata, canonical, schema, asset, link, and date expectations. | Guide source and SEO checks already drive their validation from this JSON data. [VERIFIED: scripts/verify-guide-content.js:5-21] [VERIFIED: scripts/verify-guide-seo-graph.js:4-8] |

### Supporting

| Library | Version | Purpose | When to Use |
|---|---|---|---|
| Existing `verify:p1` | `node scripts/verify-p1.js` | Measure root-document initial JavaScript by gzip level 9 and enforce the retained budget. | Run after each io/cn export through the coordinator; preserve the printed measurement in its success report. [VERIFIED: package.json:15-18] [VERIFIED: scripts/verify-p1.js:293-344] |
| Existing HTML helper conventions | In-repo scripts | Resolve `route.html` or `route/index.html`, extract attributes, decode entities, parse JSON-LD, and inspect `sitemap.xml`. | Copy the smallest local helpers into the focused Guide artifact verifier; shared refactoring adds no Phase 7 value. [VERIFIED: scripts/verify-p1.js:32-85] [VERIFIED: scripts/verify-faq-seo-graph.js:242-345] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|---|---|---|
| One focused Guide export verifier | Extending P0/P1/P2 with Guide-specific checks | A dedicated script keeps the fixed registry contract and slug-specific diagnostics isolated while the established P0/P1/P2 suites retain their existing surfaces. [VERIFIED: scripts/verify-p0.js:41-55] [VERIFIED: scripts/verify-p1.js:104-198] [VERIFIED: scripts/verify-p2.js:135-169] |
| Local Node parsing | Add an HTML parser dependency | Existing checks already parse generated tags and JSON-LD with built-ins, matching the dependency constraint. [VERIFIED: scripts/verify-faq-seo-graph.js:242-297] [VERIFIED: AGENTS.md:21-22] |
| Linux CI evidence | The current Dockerfile | Linux CI can build both variants after a workflow step is added; the Dockerfile validates only `cn` at line 42. [VERIFIED: .github/workflows/preview.yml:18-52] [VERIFIED: Dockerfile:42-52] |

**Installation:** No installation. [VERIFIED: package.json:31-65]

## Package Legitimacy Audit

No external package is proposed or installed. [VERIFIED: AGENTS.md:21-22]

## Architecture Patterns

### System Architecture Diagram

```text
src/content/guides/registry.json
          │
          ├── verify:guide-content ──> source fidelity / assets / links
          ├── verify:guide-seo-graph ──> source route / schema / sitemap wiring
          │
          ▼
npm run verify:release -- [--source-only | --variant io|cn]
          │
          ├── existing FAQ source checks
          ├── Guide source checks immediately before selected build
          ├── NODE_ENV=production + owner env ──> npm run build ──> out/
          ├── existing P0/P1/P2/i18n/FAQ artifact checks
          └── verify:guide-export --out-dir out --variant <owner>
                        │
                        ├── 9 owned Guide HTML paths
                        ├── metadata / alternates / JSON-LD / links
                        └── sitemap exact membership
```

The `io` and `cn` values shown above are the locked owner variants; the current coordinator already accepts only `io` or `cn` and creates their corresponding public build environments. [VERIFIED: scripts/verify-release.js:35-49] [VERIFIED: scripts/verify-release.js:160-171]

### Recommended Project Structure

```text
scripts/
├── verify-guide-export.js        # focused generated-HTML and sitemap verifier [ASSUMED]
├── verify-guide-export.test.js   # isolated output fixtures and mutation cases [ASSUMED]
├── verify-release.js             # composed source/build/artifact coordinator
└── verify-release.test.js        # coordinator regression coverage
```

The two new filenames are an implementation recommendation under Phase 7 discretion; `scripts/verify-guide-content.js` and `scripts/verify-guide-seo-graph.js` establish the local naming pattern. [VERIFIED: package.json:26-28]

### Pattern 1: Registry-projected owned inventory

**What:** Read the registry once, select `en` for `io` and `zh` for `cn`, then build an expected set containing the hub plus every registry slug. Validate the resolved HTML-file set and the Guide subset of `sitemap.xml` against that set exactly.

**When to use:** Every `--variant` artifact run.

The verified source-of-truth slug values are: `"saas-platform-enterprise-gaps"`, `"self-build-three-year-tco"`, `"server-sizing-guide"`, `"complex-doc-golden-set"`, `"support-bot-four-steps"`, `"manufacturing-itops-invoice-audit"`, `"pharma-compliance-docs"`, and `"education-retail-support-insight"`. [VERIFIED: src/content/guides/registry.json:4-41]

| Variant | Locale snapshot | Exact owned Guide inventory |
|---|---|---|
| `io` | `en` | `/guide`, `/guide/saas-platform-enterprise-gaps`, `/guide/self-build-three-year-tco`, `/guide/server-sizing-guide`, `/guide/complex-doc-golden-set`, `/guide/support-bot-four-steps`, `/guide/manufacturing-itops-invoice-audit`, `/guide/pharma-compliance-docs`, `/guide/education-retail-support-insight` [VERIFIED: scripts/verify-release.js:160-171] [VERIFIED: src/content/guides/registry.json:4-41] |
| `cn` | `zh` | `/guide`, `/guide/saas-platform-enterprise-gaps`, `/guide/self-build-three-year-tco`, `/guide/server-sizing-guide`, `/guide/complex-doc-golden-set`, `/guide/support-bot-four-steps`, `/guide/manufacturing-itops-invoice-audit`, `/guide/pharma-compliance-docs`, `/guide/education-retail-support-insight` [VERIFIED: scripts/verify-release.js:160-171] [VERIFIED: src/content/guides/registry.json:4-41] |

The verified registry canonical values use `https://fastgpt.io/guide/<slug>` for English and `https://fastgpt.cn/guide/<slug>` for Chinese, while `getOwnedLocalePath()` returns the root path for `en` and `zh`. [VERIFIED: src/content/guides/registry.json:5-41] [VERIFIED: src/lib/siteRouting.ts:53-69]

### Pattern 2: Explicit generated-HTML contract

**What:** Make a standalone verifier accept only `--out-dir <dir>` and `--variant io|cn`; resolve each route through the existing `route.html` / `route/index.html` convention and emit errors in the form `variant=<variant> slug=<slug|hub> path=<path> surface=<surface>: <reason>`.

**When to use:** Direct focused debugging and coordinator composition immediately after the corresponding build.

For every article, verify exact registry-localized H1/title/description, self canonical, `og:url`, the three alternate entries, Article and BreadcrumbList JSON-LD, conditional HowTo JSON-LD, breadcrumb URL sequence, visible hub-return link, configured links, and required asset `src`/`alt` values. The current rendered sources generate those surfaces through `GuideArticleRoute` and `GuideArticlePage`. [VERIFIED: src/components/guide/GuideArticleRoute.tsx:23-70] [VERIFIED: src/components/guide/GuideArticlePage.tsx:36-89] [VERIFIED: src/lib/guideSeo.ts:72-106]

For the hub, verify exact local title/description, self canonical, `og:url`, alternates, CollectionPage/ItemList/BreadcrumbList JSON-LD, hub H1, and one visible card link per registry slug. The current hub maps its cards and ItemList from `guideEntries`. [VERIFIED: src/components/guide/GuideHubRoute.tsx:13-62] [VERIFIED: src/components/guide/GuideHubPage.tsx:67-118] [VERIFIED: src/lib/guideSeo.ts:109-125]

### Pattern 3: Per-variant freshness and budget evidence

**What:** Leave existing FAQ source checks unchanged. Run `verify:guide-content` and `verify:guide-seo-graph` directly before each selected `npm run build`; immediately follow it with the existing artifact checks plus the Guide export verifier. Keep `clearBuildArtifacts()` before and after every variant.

**When to use:** `io`, `cn`, and one-variant release invocations.

The coordinator already clears `.next` and `out`, constructs explicit `NEXT_PUBLIC_SITE_VARIANT`, `NEXT_PUBLIC_HOME_URL`, `NEXT_PUBLIC_CN_HOME_URL`, `NEXT_PUBLIC_IO_HOME_URL`, and `NEXT_PUBLIC_LANGUAGE_REGION`, then invokes artifact checks after a successful build. [VERIFIED: scripts/verify-release.js:99-102] [VERIFIED: scripts/verify-release.js:160-171] [VERIFIED: scripts/verify-release.js:248-278] [VERIFIED: scripts/verify-release.js:367-388]

The verified budget expression is `gzipBytes <= maxInitialJavaScriptGzipBytes`, where the source declares `const maxInitialJavaScriptGzipBytes = 260 * 1024;`; a failure prints `Initial JavaScript is … KiB gzip, budget is 260 KiB`. [VERIFIED: scripts/verify-p1.js:19-21] [VERIFIED: scripts/verify-p1.js:293-344]

### Anti-Patterns to Avoid

- **One source-only Guide pass before both builds:** it allows a later registry/source change or stale artifact to be detached from the matched build; place Guide source gates in each variant branch as D-02 requires. [VERIFIED: .planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md:22-25]
- **Counting localized adapters as owned Guide pages:** adapter paths are implementation routes; the root owned inventory is one hub plus eight same-slug articles. [VERIFIED: src/app/[lang]/guide/page.tsx:19-36] [VERIFIED: src/app/[lang]/guide/[slug]/page.tsx:20-37] [VERIFIED: .planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md:44-47]
- **Reusing stale `out/` across variants:** the existing coordinator owns cleanup precisely to prevent cross-variant evidence. [VERIFIED: scripts/verify-release.js:367-388]
- **Making the 260 KiB check advisory:** the existing P1 assertion remains in `failures`, and Phase 7 locks it as a blocking acceptance contract. [VERIFIED: scripts/verify-release.js:281-297] [VERIFIED: .planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md:48-52]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Release command | A second build pipeline | Existing `verify-release.js` | It already owns args, env, subprocess failures, output retention, case policy, and cleanup. [VERIFIED: scripts/verify-release.js:35-102] [VERIFIED: scripts/verify-release.js:325-400] |
| Guide source validation | A second registry/content parser | Existing `verify-guide-content.js` and `verify-guide-seo-graph.js` | They already verify all sixteen documents and the source-level route/SEO graph with slug-aware diagnostics. [VERIFIED: scripts/verify-guide-content.js:141-238] [VERIFIED: scripts/verify-guide-seo-graph.js:386-454] |
| HTML parser library | A new dependency | Existing tag/attribute/entity/JSON-LD helpers | The FAQ verifier demonstrates built-in-only extraction suitable for static compiler output. [VERIFIED: scripts/verify-faq-seo-graph.js:242-297] |
| Gzip measurement | A Guide-specific budget meter | Existing `verify:p1` | It measures root initial script assets and is already included per variant. [VERIFIED: scripts/verify-p1.js:293-344] [VERIFIED: scripts/verify-release.js:252-264] |

**Key insight:** the only new contract is Guide artifact evidence; every build lifecycle, source contract, parser convention, and performance gate already exists. [VERIFIED: scripts/verify-release.js:235-278] [VERIFIED: scripts/verify-guide-content.js:209-238]

## Common Pitfalls

### Pitfall 1: Correct checks run against the wrong export

**What goes wrong:** io output can satisfy cn assertions when a build leaves `out/` in place. [VERIFIED: scripts/verify-release.js:367-388]

**Why it happens:** both variants write repository-local `.next` and `out`. [VERIFIED: scripts/verify-release.js:14-17] [VERIFIED: next.config.js:2-9]

**How to avoid:** clear before building, pass owner env explicitly, execute all matching HTML checks immediately, and clear before moving to the next variant. [VERIFIED: scripts/verify-release.js:99-102] [VERIFIED: scripts/verify-release.js:160-171] [VERIFIED: scripts/verify-release.js:367-388]

**Warning signs:** a canonical host, sitemap host, H1 locale, or Guide inventory differs from the selected `variant`. [VERIFIED: src/lib/guideSeo.ts:50-69] [VERIFIED: src/app/sitemap.ts:75-82]

### Pitfall 2: macOS lets a route collision masquerade as a valid artifact

**What goes wrong:** a case-insensitive filesystem folds published mixed-case FAQ paths and loses route identity. [VERIFIED: scripts/verify-release.js:125-158]

**Why it happens:** the current host reports `case-insensitive`, while the release coordinator's collision finder searches the FAQ registry for case-fold pairs. [VERIFIED: local case probe, 2026-08-17] [VERIFIED: scripts/verify-release.js:125-152]

**How to avoid:** fail before build on this host; use Ubuntu CI or a case-sensitive APFS workspace. Docker serves as a Linux fallback only after the io-only Docker publication guard is addressed. [VERIFIED: scripts/verify-release.js:142-158] [VERIFIED: .github/workflows/preview.yml:18-52] [VERIFIED: Dockerfile:42-52]

**Warning signs:** the release regression skips the io fixture with its case-sensitive-host reason. [VERIFIED: scripts/verify-release.test.js:124-133] [VERIFIED: local regression run, 2026-08-17]

### Pitfall 3: a successful P1 measurement disappears from release evidence

**What goes wrong:** `verify:p1` prints the gzip value, but `runStep()` emits only a generic passed line for successful child commands. [VERIFIED: scripts/verify-p1.js:333-344] [VERIFIED: scripts/verify-release.js:65-87]

**Why it happens:** child stdout is collected only for failure aggregation. [VERIFIED: scripts/verify-release.js:65-81]

**How to avoid:** retain the current `verify:p1` assertion and make the coordinator report its success output or extract and print the measured KiB alongside the `variant`. [VERIFIED: .planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md:48-52]

**Warning signs:** a full release log contains `[verify-release] P1 HTML verification (<variant>) passed` without a KiB value. [VERIFIED: scripts/verify-release.js:83-87] [VERIFIED: scripts/verify-release.js:252-264]

### Pitfall 4: a generic error leaves 16 pages impractical to debug

**What goes wrong:** a cardinality-only result loses the affected route and surface. [VERIFIED: .planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md:29-42]

**Why it happens:** one export discrepancy can be a path, H1, title, canonical, alternate, schema, link, asset, or sitemap defect. [VERIFIED: .planning/REQUIREMENTS.md:32-33]

**How to avoid:** construct each assertion label from `variant`, `slug` or `hub`, output file path, and the contract surface before throwing. [VERIFIED: .planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md:29-42]

**Warning signs:** an error only names `Guide export failed` or reports an aggregate count without a route key. [ASSUMED]

## Code Examples

### Focused artifact debugging command

```bash
# Proposed Phase 7 command; the new script name is an implementation choice.
node scripts/verify-guide-export.js --out-dir out --variant io
```

The existing release CLI permits only the exact values `"io"` and `"cn"` for `--variant`, and existing HTML checks accept an explicit output directory and variant. [VERIFIED: scripts/verify-release.js:35-49] [VERIFIED: scripts/verify-faq-seo-graph.js:416-428]

### Required coordinator order

```text
FAQ source checks
→ Guide source checks
→ build selected variant
→ existing artifact checks including verify:p1
→ Guide export HTML check for the same variant
→ clear artifacts
```

This order follows the locked freshness policy and the existing build/check loop. [VERIFIED: .planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md:16-25] [VERIFIED: scripts/verify-release.js:248-278] [VERIFIED: scripts/verify-release.js:367-388]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|---|---|---|---|
| Source-only Guide graph proof | Registry-driven static Guide routes, metadata, schema, and sitemap wiring plus source regression | Phase 6 | Phase 7 can inspect generated HTML instead of creating another content model. [VERIFIED: .planning/phases/06-guide-hubs-articles-seo-graph/06-04-SUMMARY.md:77-98] |
| FAQ-only aggregate release checks | Existing dual-variant source/build/artifact coordinator | Phase 4 | Add Guide checks by composition in the established coordinator. [VERIFIED: .planning/milestones/v1.0-phases/04-redirects-and-release-gate/04-01-SUMMARY.md:81-105] |

**Deprecated/outdated:** A single macOS full-export run is insufficient evidence because the current workspace is case-insensitive and the release contract fails closed there. [VERIFIED: local case probe, 2026-08-17] [VERIFIED: scripts/verify-release.js:142-158]

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|---|---|---|
| A1 | `scripts/verify-guide-export.js` and `scripts/verify-guide-export.test.js` are the selected filenames. | Recommended Project Structure / Code Examples | The planner can rename both files while retaining the standalone-command and regression requirements. |
| A2 | The focused verifier emits one exact diagnostic prefix containing variant, slug/hub, path, and surface. | Architecture Patterns | The planner must lock the exact error formatting while preserving the required diagnostic fields. |

## Open Questions

1. **Linux evidence command for both variants**
   - What we know: Ubuntu CI is an existing Linux runner, local Docker is unavailable, and the Dockerfile has a cn-only guard. [VERIFIED: .github/workflows/preview.yml:18-52] [VERIFIED: Dockerfile:42-52] [VERIFIED: local environment audit, 2026-08-17]
   - What's unclear: the final CI workflow location and whether Phase 7 should add an io-compatible verification container command. [ASSUMED]
   - Recommendation: add a repository verification workflow/job that runs `npm run verify:release` on Ubuntu with explicit io/cn owner variables; keep Docker as a documented cn-only local/Linux path until its publication guard is deliberately changed. [ASSUMED]

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|---|---|---|---|---|
| Node.js | Source checks and release coordinator | ✓ | `v24.13.0` | — [VERIFIED: local environment audit, 2026-08-17] |
| npm | Existing package commands | ✓ | `11.6.2` | — [VERIFIED: local environment audit, 2026-08-17] |
| Case-sensitive filesystem | Full io/cn exports | ✗ | current workspace is case-insensitive | Ubuntu CI or case-sensitive APFS [VERIFIED: local case probe, 2026-08-17] [VERIFIED: scripts/verify-release.js:142-158] |
| Docker | Optional local Linux fallback | ✗ | — | Ubuntu CI; current Dockerfile is cn-only [VERIFIED: local environment audit, 2026-08-17] [VERIFIED: Dockerfile:42-52] |
| Ubuntu GitHub Actions runner | Case-sensitive CI evidence | ✓ in checked workflow | `ubuntu-24.04` | — [VERIFIED: .github/workflows/preview.yml:18-34] |

**Missing dependencies with no fallback:** None for planning; a full local export requires a case-sensitive host. [VERIFIED: scripts/verify-release.js:142-158]

**Missing dependencies with fallback:** Docker and a case-sensitive local volume; Ubuntu CI is the release-evidence fallback. [VERIFIED: .github/workflows/preview.yml:18-52] [VERIFIED: local environment audit, 2026-08-17]

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---|---|---|
| V2 Authentication | no | This build-artifact verifier exposes no authentication surface. [VERIFIED: scripts/verify-release.js:35-49] |
| V3 Session Management | no | This build-artifact verifier owns no session state. [VERIFIED: scripts/verify-release.js:325-400] |
| V4 Access Control | no | Phase scope ends at repository-local build evidence; deployment remains Phase 8. [VERIFIED: .planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md:53-56] |
| V5 Input Validation | yes | Whitelist `--variant`, resolve output paths explicitly, validate registry slug/path values, and keep Guide source containment checks. [VERIFIED: scripts/verify-release.js:35-49] [VERIFIED: scripts/verify-guide-content.js:153-221] |
| V6 Cryptography | no | Existing SHA-256 source fidelity remains in the source verifier; Phase 7 adds no cryptographic protocol. [VERIFIED: scripts/verify-guide-content.js:38-40] [VERIFIED: scripts/verify-guide-content.js:60-111] |

### Known Threat Patterns for Node static-artifact verification

| Pattern | STRIDE | Standard Mitigation |
|---|---|---|
| Path traversal through a registry source name | Tampering | Keep basename and containment checks before any read. [VERIFIED: scripts/verify-guide-content.js:153-157] [VERIFIED: scripts/verify-guide-content.js:217-221] |
| Variant/environment drift | Tampering | Validate the variant enum and build with explicit owner variables. [VERIFIED: scripts/verify-release.js:35-49] [VERIFIED: scripts/verify-release.js:160-171] |
| Stale cross-variant output | Tampering | Clear output around each build and check it immediately. [VERIFIED: scripts/verify-release.js:99-102] [VERIFIED: scripts/verify-release.js:367-388] |
| Malformed HTML/JSON-LD in generated output | Tampering | Parse each JSON-LD script defensively and report the scoped failed surface. [VERIFIED: scripts/verify-faq-seo-graph.js:280-297] [ASSUMED: scoped Guide error prefix] |

## Sources

### Primary (HIGH confidence)

- [Repository release coordinator](scripts/verify-release.js) - CLI, case probe, owner env, FAQ check ordering, aggregation, retention, and cleanup. [VERIFIED: scripts/verify-release.js:35-400]
- [Guide source verifier](scripts/verify-guide-content.js) - registry, source-fidelity, asset, and internal-link validation. [VERIFIED: scripts/verify-guide-content.js:141-238]
- [Guide SEO graph verifier](scripts/verify-guide-seo-graph.js) - closed route, metadata, schema, hub, and sitemap source graph. [VERIFIED: scripts/verify-guide-seo-graph.js:186-454]
- [Guide registry](src/content/guides/registry.json) - exact eight-slug identity and localized snapshots. [VERIFIED: src/content/guides/registry.json:2-43]
- [Phase 7 context](.planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md) - locked release verification decisions. [VERIFIED: .planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md:7-79]

### Secondary (MEDIUM confidence)

- None.

### Tertiary (LOW confidence)

- Proposed focused verifier filenames, scoped error-string spelling, and final CI job location are marked `[ASSUMED]`.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all required tools and scripts are already present and directly inspected. [VERIFIED: package.json:5-65]
- Architecture: HIGH - coordinator, registry, source gates, route output, metadata, schema, and sitemap surfaces were read in this session. [VERIFIED: scripts/verify-release.js:235-400] [VERIFIED: src/components/guide/GuideHubRoute.tsx:13-62] [VERIFIED: src/components/guide/GuideArticleRoute.tsx:16-72]
- Pitfalls: HIGH - local filesystem probe and the existing regression skip reproduce the primary environment constraint. [VERIFIED: local case probe, 2026-08-17] [VERIFIED: scripts/verify-release.test.js:124-133]

**Research date:** 2026-08-17  
**Valid until:** 2026-09-16 for repository-local implementation findings.
