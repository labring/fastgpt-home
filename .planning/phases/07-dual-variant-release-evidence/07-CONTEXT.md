# Phase 7: Dual-Variant Release Evidence - Context

**Gathered:** 2026-08-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 7 proves the fixed Guide corpus in the repository's release artifact. It
owns one maintainer-facing verification command that composes the existing
source gates with Guide registry/source fidelity, metadata, assets, internal
links, route inventory, SEO graph, sitemap, and exported Guide HTML checks. It
also owns clean case-sensitive production exports for the `io` and `cn`
variants, each with one owned Guide hub and eight owned Guide article paths,
including the existing 260 KiB gzip initial-JavaScript budget. Deployment,
cache, rollback, and live HTTP evidence remain Phase 8.

</domain>

<decisions>
## Implementation Decisions

### Unified release gate
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

### Guide export HTML evidence
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

### Case-sensitive dual variants and budget
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

### Scope and failure policy
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

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase contract and requirements
- `.planning/ROADMAP.md` §Phase 7 — VERIFY-04/VERIFY-05 goal and success criteria.
- `.planning/REQUIREMENTS.md` §Release Verification — normative VERIFY-04 and VERIFY-05 text.
- `.planning/PROJECT.md` — static export, owned-domain, dependency, fidelity, and verification constraints.
- `.planning/STATE.md` — Phase 5/6 handoff decisions and case-sensitive export concern.
- `AGENTS.md` — editing, validation, logging, and GSD workflow rules.

### Prior Guide source and SEO contracts
- `.planning/phases/05-guide-content-contract/05-CONTEXT.md` — source bytes, registry identity, asset/link policy, and negative diagnostics.
- `.planning/phases/05-guide-content-contract/05-RESEARCH.md` — approved 8×2 corpus and delivery-comment facts.
- `.planning/phases/05-guide-content-contract/05-VERIFICATION.md` — source-fidelity evidence and verifier contract.
- `.planning/phases/05-guide-content-contract/05-UAT.md` — completed source-contract test matrix.
- `.planning/phases/05-guide-hubs-articles-seo-graph/06-CONTEXT.md` — route topology, metadata, schema, sitemap, and deferred export scope.
- `.planning/phases/06-guide-hubs-articles-seo-graph/06-RESEARCH.md` — static route and SEO graph implementation evidence.
- `.planning/phases/06-guide-hubs-articles-seo-graph/06-VERIFICATION.md` — 8×2 route/SEO graph evidence and Phase 7 handoff.
- `.planning/phases/06-guide-hubs-articles-seo-graph/06-UAT.md` — completed hub/article graph test matrix.
- `src/content/guides/registry.json` — eight slugs, localized snapshots, dates, schema, assets, links.
- `src/content/guides/registry.ts` — typed registry and identity API.
- `src/lib/guideContent.ts` — server-only source reader and body fidelity boundary.
- `src/lib/guideSeo.ts` — canonical, alternates, metadata, and Open Graph projection.
- `src/app/sitemap.ts` — registry-derived current-variant sitemap projection.
- `src/app/guide/` and `src/app/[lang]/guide/` — root/adapter route inventories.
- `src/components/guide/GuideHubRoute.tsx` and `src/components/guide/GuideArticleRoute.tsx` — rendered SEO/schema surfaces.

### Existing release/build patterns
- `.planning/milestones/v1.0-phases/04-redirects-and-release-gate/04-CONTEXT.md` — single release gate, case-sensitive policy, variant isolation, and HTML evidence decisions.
- `.planning/milestones/v1.0-phases/04-redirects-and-release-gate/04-RESEARCH.md` — release coordinator implementation and Linux/APFS evidence strategy.
- `.planning/milestones/v1.0-phases/04-redirects-and-release-gate/04-01-SUMMARY.md` — existing `verify-release` behavior and known 260 KiB blocking budget.
- `scripts/verify-release.js` — aggregate source/build coordinator and artifact cleanup.
- `scripts/verify-release.test.js` — release regression style and source-only fixture patterns.
- `scripts/verify-guide-content.js` and `scripts/verify-guide-content.test.js` — slug-specific source verifier and mutation coverage.
- `scripts/verify-guide-seo-graph.js` and `scripts/verify-guide-seo-graph.test.js` — registry-to-route/SEO/sitemap source graph gate.
- `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, `scripts/verify-i18n-seo.js` — exported HTML, redirect, and initial-JS checks.
- `scripts/verify-faq-metadata.js` and `scripts/verify-faq-seo-graph.js` — explicit `--html`/`--variant` output verification patterns.
- `scripts/clean-locale-output.js` — variant output cleanup and redirect artifact generation.
- `next.config.js` — production `output: 'export'` and unoptimized image behavior.
- `Dockerfile` — Linux build runtime and current CN-only publication guard.
- `.github/workflows/preview.yml` — Ubuntu case-sensitive build/verification pattern.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `verify-release.js` already owns source-check ordering, case-sensitivity probing, variant envs, build cleanup, failure aggregation, and optional artifact retention.
- `verify-guide-content.js` already validates all 16 source documents with slug-specific failures.
- `verify-guide-seo-graph.js` already validates registry groups, canonical/hreflang/schema/link/sitemap wiring from isolated projections.
- `verify-p0.js`/`verify-p1.js`/`verify-p2.js` and `verify-faq-seo-graph.js` provide HTML tag extraction, route resolution, sitemap checks, and 260 KiB gzip measurement.

### Established Patterns
- Verification scripts use Node built-ins, strict assertions, synchronous reads, and concise English logs.
- Production builds use `NODE_ENV=production`, `output: 'export'`, `clean-locale-output.js`, and disposable `.next`/`out` directories.
- Variant ownership is explicit through `NEXT_PUBLIC_SITE_VARIANT`, `getLocaleOwner()`, and `getOwnedLocaleUrl()`.
- Existing release output preserves command, variant, and trailing diagnostic evidence; source-only remains host-independent.

### Integration Points
- Add Guide source and HTML checks to `runSourceChecks`/`runVariantChecks` in `scripts/verify-release.js`.
- Add one Guide export verifier and its regression test; wire a stable npm command.
- Keep `package-lock.json`, deployment configs, source documents, and Phase 8 delivery surfaces unchanged.

</code_context>

<specifics>
## Specific Ideas

- Guide export inventory is exactly 9 owned pages per variant: `/guide` plus the eight lower-case slug pages.
- The English and Chinese localized adapter paths are implementation routes and must not inflate the owned root inventory.
- The export report must identify `io`/`cn`, `hub` or slug, route/output path, and failing surface for every mismatch.
- Linux CI is the preferred evidence host; a dedicated Linux/Docker build is an acceptable fallback when local macOS is case-insensitive.
- The existing 260 KiB initial-JavaScript budget remains a blocking gate for both variants.

</specifics>

<deferred>
## Deferred Ideas

- Immutable artifact packaging, deployment revisions, cache purge, rollback targets, live HTTP checks, and production URL verification remain Phase 8.
- Same-slug language switching, hub search/filtering, CMS workflow, and additional Guide articles remain future requirements.
- Historical FAQ restoration and programmatic technical/reference publishing remain outside this milestone.

</deferred>

---

*Phase: 7-Dual-Variant Release Evidence*
*Context gathered: 2026-08-17*
