# Phase 4: Redirects and Release Gate - Research

**Research date:** 2026-08-16
**Research mode:** Inline fallback — the typed `gsd-phase-researcher` slot was unavailable because the shared agent thread limit was reached. Findings are grounded in the repository, Phase 1–3 artifacts, and the approved Week04/W3 evidence.

## Goal and scope

Phase 4 closes URL-04 and VERIFY-01/02/03. It projects deterministic redirects for changed English FAQ paths and creates one release command that proves source artifacts, redirects, static export coverage, and final HTML SEO behavior. Phase 1–3 already own durable identity, approved metadata, and the canonical SEO graph.

## Current implementation findings

### Route registry and collision data

- `src/faq/generated-en-route-registry.json` contains 1,400 sorted records.
- 786 records are `routeStatus: preserved` with safe mixed-case canonical slugs.
- 614 records are `routeStatus: repaired`; 42 have `collisionDisposition: none` and are deterministic redirect candidates.
- 572 repaired records have `collisionDisposition: no-redirect` because their source path belongs to an ambiguous collision group.
- `collisionLedger` contains 149 explicit `disposition: no-redirect` rows. Ledger sources overlap current source slugs while candidate content IDs can be current records or `legacy-row-*` historical identities.
- Every current record has one `legacySources` value, while the ledger independently describes ambiguous historical candidates. Redirect generation must consult both the record disposition and the ledger deny set.

### Existing redirect pipeline

- `scripts/lib/redirects.js` currently reads raw published FAQ object keys and emits locale migration redirects for `/en/faq` and `/zh/faq`, comparison paths, and technical-center paths.
- `scripts/clean-locale-output.js` calls `buildRedirects`, writes `.next/nginx-redirects.conf` for the CN variant, writes an `_worker.js` map for the IO variant, and removes `out/_redirects`.
- The Worker looks up `url.pathname`, returns `Response.redirect(..., 301)`, and copies `url.search` to the target.
- `nginx.conf` includes the generated map before the generic trailing-slash rule and returns `301 $locale_redirect_target$is_args$args`; this preserves query strings and permits direct slash aliases.
- `public/_redirects` is absent. Cloudflare output is intentionally represented by `_worker.js` after cleanup.
- Existing verifiers inspect real `.next` and `out` output. A verifier run with mismatched environment and stale output can produce false failures; every build must set its site variant and immediately run matching checks.

### Build and verification surface

- Production `npm run build` runs `next build` with static export, then locale cleanup, FAQ RSC cleanup, and HTML language patching.
- `next.config.js` has no alternate output directory setting; `.next` and `out` are repository-local disposable artifacts.
- The source generators and focused checks are dependency-free Node scripts:
  - `generate-faq-route-registry.js --check`
  - `generate-faq-metadata.js --check`
  - `verify-faq-routes.js`
  - `verify-faq-metadata.js` and `--html`
  - `verify-faq-seo-graph.js` and `--html --variant io|cn`
- Existing P0/P1/P2/i18n-SEO verifiers cover redirect/header artifacts, metadata/canonical/heading contracts, route migration, owner domains, alternate maps, and sitemap uniqueness. The release gate should compose these checks rather than duplicate their parsers.

### Filesystem and variant constraints

- Preserved mixed-case English paths can collapse on the default macOS case-insensitive filesystem. Phase 3 demonstrated 1,398 local IO files versus 1,400 canonical routes on that volume.
- Case-sensitive APFS and Linux CI/Docker preserve distinct route files. Full release verification must fail closed on a case-insensitive host and retain the diagnostic.
- IO owns 1,400 English FAQ routes. CN owns 1,490 published Simplified Chinese keys, including 90 Chinese-only records. Each variant must build with explicit `NEXT_PUBLIC_SITE_VARIANT` and matching `NEXT_PUBLIC_HOME_URL` before verification.

## Recommended implementation shape

1. Extend `buildRedirects` with a registry-backed alias projection. Create exact, encoded, trailing-slash variants for eligible `/faq/<legacySlug>` and `/en/faq/<legacySlug>` paths, target the IO canonical URL, and skip preserved or denied sources. Add a focused redirect verifier that checks 42 eligible candidates, no-redirect records, the 149 ledger deny set, duplicate source rejection, owner targets, and query-preserving map writers.
2. Add `scripts/verify-release.js` and `npm run verify:release`. Run source checks first, then execute IO and CN builds in deterministic order, run existing verifiers immediately against each artifact, and aggregate record-level errors. Detect filesystem case sensitivity before full export work. Support `--source-only` and `--keep-artifacts`; clean generated output after successful runs and report retained paths on failure.
3. Keep the package dependency-free. Use `node:child_process`, `node:fs`, and `node:assert/strict` patterns already established in verification scripts. Avoid runtime workbook access, network checks, or production deployment calls.

## Risks and mitigations

| Risk | Evidence | Mitigation |
|------|----------|------------|
| Redirecting an ambiguous legacy path to the wrong FAQ | 572 current denied repairs plus 149 ledger rows | Build a deny set from both registry dispositions and ledger entries; assert denied sources are absent from Worker/Nginx maps. |
| Redirect loop or two-hop slash normalization | Nginx generic trailing-slash rule and existing locale aliases | Generate both slash forms to the same absolute canonical target; verify target is a final registry route and never another alias. |
| Query loss at one edge | Worker and Nginx have separate writers | Assert Worker `url.search` and Nginx `$is_args$args` contracts; keep map values path-only and absolute. |
| False pass from stale output or wrong variant | Existing `verify:i18n-seo` failure with root output/variant mismatch | Clear or tag artifacts per variant, set all owner env vars explicitly, and verify immediately after each build. |
| Mixed-case export collision | Default macOS volume produced 1,398 IO files | Probe filesystem sensitivity and require Linux/case-sensitive APFS for full release evidence. |
| Aggregate verifier hides a record failure | Existing scripts exit independently | Prefix subprocess failures with command/variant and preserve sourceSlug/contentId/route diagnostics before returning nonzero. |

## Verification strategy

- Source phase: route generator, metadata generator, route verifier, metadata verifier, SEO graph verifier, redirect verifier, TypeScript, and diff/registry integrity.
- IO phase: static build with `NEXT_PUBLIC_SITE_VARIANT=io`, then P0/P1/P2/i18n-SEO, metadata HTML, SEO graph HTML, and redirect artifact checks. Expect 1,400 FAQ routes and IO-owned sitemap URLs.
- CN phase: static build with `NEXT_PUBLIC_SITE_VARIANT=cn`, then the same applicable verifiers and SEO graph HTML. Expect 1,490 Chinese FAQ routes and CN-owned sitemap URLs.
- Failure phase: leave a clear artifact path only when `--keep-artifacts` is selected; successful runs remove transient `.next`, `out`, and generated build residue while preserving tracked source artifacts.

## Open implementation choices for planner

- Whether the aggregate command runs in a temporary copy or snapshots/restores repository-local build residue; either approach must prevent stale cross-variant reads and preserve failure diagnostics.
- Whether focused redirect verification lives in `scripts/verify-faq-redirects.js` or is embedded in `verify-release.js`; the preferred pattern is a separately runnable focused script plus aggregate composition.
- Exact case-sensitive filesystem probe implementation, provided it handles macOS and Linux deterministically and reports the conflicting route pair.
