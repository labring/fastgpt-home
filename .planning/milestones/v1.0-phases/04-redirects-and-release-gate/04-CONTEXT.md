# Phase 4: Redirects and Release Gate - Context

**Gathered:** 2026-08-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Project safe legacy redirects for changed English FAQ routes and prove the complete static release artifact. This phase covers one-hop permanent redirect projection, collision-ledger no-redirect enforcement, query-string preservation, a single record-level aggregate verification command, case-sensitive release-host policy, complete io/cn static-export coverage, and exported HTML metadata/canonical/hreflang/H1/FAQ JSON-LD evidence. Phase 4 consumes the Phase 1 route registry, Phase 2 metadata snapshot, and Phase 3 SEO graph verifier. Production deployment, live HTTP/CDN checks, historical FAQ recovery, and content or metadata rewriting remain outside this phase.

</domain>

<decisions>
## Implementation Decisions

### Legacy alias eligibility and redirect projection

- **D-01:** Treat `src/faq/generated-en-route-registry.json` as the sole source for changed English FAQ aliases. Project a legacy source only when its `legacySources` entry maps to exactly one current `contentId`, the final `canonicalSlug` exists in the registry, `routeStatus` is `repaired`, and `collisionDisposition` is `none`. Preserve healthy routes without a self-redirect. The current registry contains 1,400 records: 786 preserved routes, 614 repaired routes, 42 repaired routes eligible for a redirect, and 572 repaired routes blocked by the collision policy.
- **D-02:** Emit direct one-hop 301 aliases for eligible English legacy paths on the international owner domain. Cover the former unprefixed `/faq/<legacySlug>` path and the prefixed `/en/faq/<legacySlug>` migration path, with trailing-slash variants resolving directly to the final `/faq/<canonicalSlug>` URL. Encode path segments exactly as deployment helpers require and keep preserved mixed-case source spelling in the lookup key.
- **D-03:** Keep the existing locale migration redirects for published `/en/faq/<id>` and `/zh/faq/<id>` route keys, then layer registry-backed changed-slug aliases beside them. Chinese-only catalog keys remain governed by the existing published Chinese route set; Phase 4 does not invent English or Chinese targets for absent identities.

### Collision and redirect safety

- **D-04:** Treat every `collisionLedger` row with `disposition: "no-redirect"` as an explicit deny rule. A route record with `collisionDisposition: "no-redirect"` receives no guessed redirect even when one current record happens to retain the same source slug. The generated worker and Nginx map must omit every denied source, and the verifier must assert the omission by source slug.
- **D-05:** Fail closed on duplicate legacy sources, many-to-one source mappings, missing canonical registry records, redirect targets that point to legacy aliases, and redirects that resolve to a different owner domain. Record-level diagnostics include the source slug, candidate content IDs, final canonical slug, and disposition. Redirect generation stays deterministic and idempotent across repeated runs.

### HTTP semantics and query behavior

- **D-06:** Every projected alias is a permanent 301 with one direct hop to the absolute owner-domain canonical URL. The edge lookup keys on pathname only; Cloudflare Worker redirects copy `url.search`, and Nginx returns `$locale_redirect_target$is_args$args`. Query strings survive unchanged, while the canonical target path contains no guessed query values. Trailing-slash aliases map directly to the same final URL so the generic slash rule never adds a second hop.

### Aggregate release verification

- **D-07:** Add one repository command, recommended as `npm run verify:release`, that runs the complete release gate in a deterministic order: generator `--check` for route and metadata artifacts, source route/metadata/SEO graph checks, redirect-map validation, explicit io and cn production builds, existing P0/P1/P2/i18n-SEO checks, FAQ metadata HTML checks, and the Phase 3 FAQ SEO graph HTML/sitemap checks. The aggregate report preserves the originating command and record/route identifier for every failure, then exits nonzero on any failure.
- **D-08:** Keep focused checks available for fast iteration. `--source-only` skips build/export work while retaining record-level registry, metadata, route, SEO graph, and redirect checks; `--keep-artifacts` retains the failing variant's `.next`/`out` evidence path for diagnosis. The default release command performs the full gate and cleans transient build artifacts after completion.

### Release host, variant, and HTML evidence policy

- **D-09:** Require a case-sensitive filesystem for the full static release gate. Preserved mixed-case English slugs are a published URL contract, so a case-insensitive host must fail closed with a diagnostic that names the affected route pair and recommends Linux CI/Docker or a case-sensitive APFS workspace. Source-only checks remain runnable on development volumes.
- **D-10:** Build and verify both owner variants with explicit environment ownership and no stale-output reuse. The io export must contain all 1,400 English canonical FAQ routes and its owner sitemap/redirect artifacts; the cn export must contain all 1,490 published Chinese FAQ routes, including Chinese-only records, with its owner sitemap/redirect artifacts. Each variant is verified immediately after its build before the next variant overwrites generated output.
- **D-11:** Treat exported HTML as the release contract. For every final FAQ route, assert the intended H1 and FAQ JSON-LD question/answer identity, approved title/description/keywords where mapped, self-referencing canonical URL, published hreflang set, owner domain, exact sitemap membership, duplicate-free URL sets, and legacy-alias exclusion. Reuse `verify-faq-metadata -- --html`, `verify-faq-seo-graph --html`, `verify:p0`, `verify:p1`, `verify:p2`, and `verify:i18n-seo` through the aggregate command instead of creating a second content model.

### Scope boundary

- **D-12:** Keep Phase 4 focused on redirect projection and release proof. Preserve Phase 1 route decisions, Phase 2 raw metadata/content fidelity, and Phase 3 identity/SEO graph behavior. Live deployment, CDN propagation, search-console monitoring, historical FAQ reconstruction, and authored content changes remain deferred.

### the agent's Discretion

- Choose the smallest dependency-free redirect projection and aggregate verifier structure that reuses `scripts/lib/redirects.js`, the committed registries, and existing assertion-based verification conventions.
- Choose the case-sensitive filesystem probe and temporary artifact workspace strategy, provided the release command fails closed on case-insensitive hosts and leaves a clean repository after successful execution.
- Choose stable fixture records for preserved, repaired-and-redirectable, collision-denied, bilingual, Chinese-only, and query-string redirect assertions; diagnostics must identify the source slug and contentId.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project scope and Phase 4 acceptance

- `.planning/PROJECT.md` — release-ready endpoint, URL stability, static-export, content-fidelity, dependency, and verification constraints.
- `.planning/REQUIREMENTS.md` §FAQ Identity and URLs / §Release Verification — URL-04 and VERIFY-01/02/03 acceptance requirements.
- `.planning/ROADMAP.md` §Phase 4: Redirects and Release Gate — goal, success criteria, and dependency on Phase 3.
- `.planning/STATE.md` — Phase 4 ready-to-plan position, case-sensitive filesystem concern, and deferred release operations.

### Prior phase contracts and evidence

- `.planning/phases/01-canonical-faq-routes/01-CONTEXT.md` — durable contentId, preserve/repair policy, deterministic repaired slugs, and collision no-redirect boundary.
- `.planning/phases/01-canonical-faq-routes/01-01-SUMMARY.md` — 1,400-record registry, 786 preserved routes, 614 repairs, and 149 collision-ledger entries.
- `.planning/phases/01-canonical-faq-routes/01-VERIFICATION.md` — URL-01/02/03 evidence and static route contract.
- `.planning/phases/02-approved-metadata/02-CONTEXT.md` — 1,195-row contentId metadata join, authored-field protection, and `--check` behavior.
- `.planning/phases/02-approved-metadata/02-01-SUMMARY.md` — generated metadata artifact and HTML verification patterns.
- `.planning/phases/02-approved-metadata/02-VERIFICATION.md` — metadata fidelity, P2, and case-sensitive export evidence.
- `.planning/phases/03-coherent-seo-graph/03-CONTEXT.md` — canonical identity, alternates, sitemap, and fail-closed SEO graph decisions.
- `.planning/phases/03-coherent-seo-graph/03-01-SUMMARY.md` — route/SEO graph implementation and verifier coverage.
- `.planning/phases/03-coherent-seo-graph/03-VERIFICATION.md` — SEO-01/02/03 goal-backward evidence, 1,400/1,490 APFS exports, and known macOS diagnostic.

### Registries and routing/build implementation

- `src/faq/generated-en-route-registry.json` — 1,400 final English records, `legacySources`, `routeStatus`, `collisionDisposition`, and `collisionLedger`.
- `src/faq/english-route-evidence.json` — source URL evidence and preserve/repair decisions.
- `src/faq/generated-en-metadata.json` — 1,195 approved metadata records keyed by contentId.
- `src/faq/index.ts` — locale-aware route identity and published FAQ catalogs.
- `src/lib/siteRouting.ts` — owner domains, locale ownership, and URL helpers.
- `scripts/lib/redirects.js` — existing cross-locale redirect map, query-preserving Worker, and Nginx map writers.
- `scripts/clean-locale-output.js` — variant filtering, redirect artifact generation, `_redirects` cleanup, and preview policy.
- `next.config.js` — production static-export mode and build configuration.
- `package.json` — build lifecycle and existing verification command ergonomics.
- `Dockerfile` — case-sensitive Linux publication target and Nginx config validation.
- `nginx.conf` — generated redirect map include, one-hop 301, query preservation, and trailing-slash behavior.
- `public/_redirects` — absent in the current repository; generated Cloudflare `_redirects` output is removed by `clean-locale-output.js` in favor of `_worker.js`.

### Verification conventions and release workflows

- `scripts/generate-faq-route-registry.js` — deterministic route artifact `--write`/`--check` contract.
- `scripts/generate-faq-metadata.js` — deterministic metadata artifact `--write`/`--check` contract.
- `scripts/verify-faq-routes.js` — registry cardinality, uniqueness, collision, and route-wiring assertions.
- `scripts/verify-faq-metadata.js` — source and optional HTML metadata/content-fidelity assertions.
- `scripts/verify-faq-seo-graph.js` — source and optional owner-site H1/JSON-LD/canonical/hreflang/sitemap assertions.
- `scripts/verify-p0.js` — deployment redirect/header, Worker, Nginx, and representative FAQ checks.
- `scripts/verify-p1.js` — canonical, metadata, route, and static asset checks.
- `scripts/verify-p2.js` — heading, metadata, FAQ migration, canonical, and sitemap checks.
- `scripts/verify-i18n-seo.js` — owner-domain, hreflang, redirect, published-route, and sitemap checks.
- `.github/workflows/preview.yml` — case-sensitive Ubuntu preview build and current verification entry point.
- `.github/workflows/fastgpt-home-image.yml` — CN Docker publication with explicit site variant.

### Approved external evidence

- `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md` — 1,195 reachable metadata rows, old `/en/faq` and `/zh/faq` migration behavior, and 731 route collision/404 findings.
- `/Users/longnv/bin/repo/fastgpt-data/Week04/存量修复-补Meta第2批/FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx` — approved online URL evidence and metadata source.
- `/Users/longnv/bin/repo/fastgpt-data/W3-深度内容与FAQ61-90-20260803/存量核查/FastGPT-存量FAQ修复验收清单-V1.1-星触达-20260814.md` — historical collision, 301, page-identity, canonical, and hreflang acceptance evidence.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `buildRedirects()` in `scripts/lib/redirects.js` — current variant-owned redirect collection and natural insertion point for registry-backed changed-slug aliases.
- `writeCloudflareWorker()` — path-only map lookup, 301 response, and existing query-string copy behavior.
- `writeNginxRedirectMap()` plus `nginx.conf` — generated map, absolute target, and `$is_args$args` query preservation.
- `generated-en-route-registry.json` — committed final route and collision facts; no workbook read is required at release time.
- `generated-en-metadata.json` and `verify-faq-metadata.js` — approved field fidelity and authored-content digest checks.
- `verify-faq-seo-graph.js` — exact route, owner-domain, HTML identity, and sitemap checks for both variants.

### Established Patterns

- Build scripts use Node built-ins, `node:assert/strict`, synchronous filesystem reads, descriptive record-level failures, and a guarded nonzero exit path.
- Production uses `next build` with `output: 'export'`, then `clean-locale-output.js`, RSC cleanup, and HTML language patching.
- Variant ownership is explicit: `io` publishes English and other international locale surfaces; `cn` publishes Simplified Chinese and Chinese-only FAQ routes.
- Generated artifacts are deterministic and committed where they are source-of-truth; build output and `.next` remain disposable.
- Case-sensitive mixed-case path identity is a release invariant established in Phase 1–3.

### Integration Points

- `package.json` build and verification scripts are the public maintainer command surface.
- `scripts/clean-locale-output.js` must generate matching redirect artifacts immediately after each variant build.
- `Dockerfile` consumes `.next/nginx-redirects.conf` and `out/`; `public` contains the Cloudflare Worker and crawler artifacts.
- Existing P0/P1/P2/i18n and FAQ-specific verifiers consume the same `out/` and `.next` artifacts, so aggregate orchestration must keep variant environment and artifact paths synchronized.

</code_context>

<specifics>
## Specific Ideas

- Redirect eligibility is deliberately narrow: the current registry has 42 repaired, non-collided English sources that can redirect; 572 repaired records remain collision-denied and the 149-entry ledger stays audit-only.
- The aggregate command should expose one default full release gate plus a source-only diagnostic path and an artifact-retention switch. Output should identify variant, source slug, contentId, target canonical slug, and failing check.
- The release host policy is a correctness condition. Linux CI/Docker or case-sensitive APFS is the expected environment for the 1,400 mixed-case English export and the 1,490-route Chinese export.
- Existing query preservation must remain observable in both edge projections: Worker `url.search` and Nginx `$is_args$args`.

</specifics>

<deferred>
## Deferred Ideas

- Live HTTP/CDN status checks, redirect-chain measurements against production, and Search Console monitoring remain release operations outside the repository gate.
- Historical FAQ records absent from the repository, future workbook-drift reporting, and redirect analytics remain outside the current milestone.
- New locale translations, FAQ content rewrites, metadata policy changes, and visual UI work remain outside Phase 4.

</deferred>

---

*Phase: 04-redirects-and-release-gate*
*Context gathered: 2026-08-16*
