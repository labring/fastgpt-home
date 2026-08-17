# Phase 8: Production Delivery & Live Verification - Context

**Gathered:** 2026-08-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 8 delivers the verified bilingual Guide release through the repository's
existing production channels and records auditable delivery and live-health
evidence. It owns immutable `cn` and `io` artifact packaging, release
manifests, provider-specific deployment/rollback hooks, cache-freshness
evidence, and HTTP verification for the two hubs plus sixteen owned article
URLs. Production success requires real credentials and reachable deployment
state; local tooling must report a blocked external operation with its exact
prerequisite when that state is unavailable.

</domain>

<decisions>
## Implementation Decisions

### Immutable artifact identity
- **D-01:** Keep `npm run verify:release` as the required source/export gate, then package each verified `out/` tree as a variant-scoped content-addressed archive with a manifest under `__release/manifest.json`. The manifest records variant, source commit, build timestamp, route inventory, tree digest, archive digest, deployed revision, and explicit rollback target. Artifact filenames include the archive SHA-256 prefix and are accompanied by a sidecar checksum and JSON evidence record.
- **D-02:** Use Node built-ins plus the platform `tar` command already available in Linux CI; add no package. The packager must fail when the selected variant, output directory, manifest fields, or rollback target is missing, and it must verify the archive checksum after writing it.
- **D-03:** Preserve the approved Guide registry and generated HTML bytes. The release manifest is injected into the already-verified output after the Guide export gate and before deployment/package publication, with the manifest itself excluded from route cardinality checks.

### Provider delivery and rollback
- **D-04:** Preserve ADR-0007 ownership: `cn` uses the existing Docker/Nginx/Kubernetes channel, while `io` uses Cloudflare Pages direct upload. Add a manual, credential-guarded production workflow that consumes verified outputs, publishes immutable references, and writes a release evidence record for each channel.
- **D-05:** CN image publication uses a commit-addressed tag plus the pushed image digest; Kubernetes receives the digest-pinned image reference. The workflow records the previous deployment image as the CN rollback target before `kubectl set image` and waits for rollout status.
- **D-06:** IO publication uses `wrangler pages deploy` with `--commit-hash` and captures the Pages deployment ID/URL through `wrangler pages deployment list --json`. The workflow records the previous production deployment ID as the IO rollback target before promotion. Cloudflare API cache purge is a guarded step using the zone ID and release URL list; the release record states whether purge completed or the provider's deployment invalidation was the active path.
- **D-07:** Rollback targets are explicit release inputs or provider-discovered previous immutable revisions. A missing target blocks promotion and leaves the verified artifacts available for inspection; automatic best-effort guesses are excluded from the release record.

### Live verification contract
- **D-08:** Add one dependency-free live verifier that reads a release manifest and checks both owned hubs plus all sixteen article URLs, both sitemaps, and both public release manifests. Each page check asserts final HTTP `200`, localized H1, self canonical, exact `zh-CN`/`en`/`x-default` alternates, indexable robots metadata, and sitemap membership. Header evidence records `cache-control`, `etag` or `last-modified`, `age`/provider cache status when available, and the release-manifest revision/artifact identity.
- **D-09:** Live verification writes timestamped JSON and human-readable output with per-variant, route, status, and failed-surface diagnostics. It fails closed for 404/redirect responses, stale or absent cache evidence, missing release-manifest evidence, revision mismatch, and any SEO-surface drift.

### Operational boundary and external state
- **D-10:** Production deployment commands require explicit credentials and target configuration (`KUBE_CONFIG`/registry access for CN, Cloudflare API token/account/project for IO, and purge configuration when enabled). The local run may package and verify artifacts plus run real public HTTP checks, yet it must preserve a blocked status when promotion credentials or current production state are unavailable. No production success, revision, or rollback target is inferred from source code or an unexecuted workflow.

### the agent's Discretion
- Choose the exact script filenames, manifest schema version, archive layout, provider command wrappers, and regression fixture strategy while keeping APIs import-safe and logs concise in English.
- Choose a stable release manifest path under `__release/` and the smallest live-check parser that reuses the existing Guide registry and `verify-guide-export` expectations.
- Choose whether cache purge is a separate Node command or a small workflow step, provided the release record exposes the attempted URLs, provider response, and completion status.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase and project contract
- `.planning/ROADMAP.md` §Phase 8 — DEPLOY-01/DEPLOY-02 goal, prerequisite, and success criteria.
- `.planning/REQUIREMENTS.md` §Production Delivery and §Definition of Done — normative deployment, live matrix, artifact, and evidence requirements.
- `.planning/PROJECT.md` — static export, source fidelity, owned-domain, dependency, and production-live constraints.
- `.planning/STATE.md` — Phase 7 handoff and the unresolved fastgpt.io delivery concern.
- `AGENTS.md` — editing, validation, logging, language, and GSD workflow conventions.

### Locked route and content contracts
- `.planning/phases/05-guide-content-contract/05-CONTEXT.md` — source bytes, registry identity, asset/link policy, and release-fidelity boundary.
- `.planning/phases/05-guide-content-contract/05-VERIFICATION.md` — source contract evidence and failure diagnostics.
- `.planning/phases/05-guide-content-contract/05-UAT.md` — completed source-contract matrix.
- `.planning/phases/06-guide-hubs-articles-seo-graph/06-CONTEXT.md` — route topology, metadata, schema, sitemap, and owned-domain policy.
- `.planning/phases/06-guide-hubs-articles-seo-graph/06-VERIFICATION.md` — rendered Guide graph evidence.
- `.planning/phases/06-guide-hubs-articles-seo-graph/06-UAT.md` — completed visitor/SEO graph matrix.
- `.planning/phases/07-dual-variant-release-evidence/07-CONTEXT.md` — exact dual-export and budget contract.
- `.planning/phases/07-dual-variant-release-evidence/07-VERIFICATION.md` — case-sensitive APFS io/cn release evidence and Phase 8 handoff.
- `.planning/phases/07-dual-variant-release-evidence/07-UAT.md` — completed export evidence matrix.

### Provider and repository delivery paths
- `docs/adr/0005-publish-locales-per-page.md` — page-level canonical, hreflang, sitemap, and indexability policy.
- `docs/adr/0006-build-three-site-variants.md` — `cn`, `io`, and `preview` build variants.
- `docs/adr/0007-restrict-docker-publication-to-china-site.md` — CN Docker/Nginx and IO Cloudflare Pages ownership.
- `.github/workflows/fastgpt-home-image.yml` — existing GHCR/Kubernetes CN publication path.
- `.github/workflows/preview.yml` and `.github/workflows/preview-deploy.yml` — existing Linux build artifact and Wrangler Pages patterns.
- `.github/workflows/guide-release-verification.yml` — case-sensitive release gate and retained artifact evidence.
- `Dockerfile` — CN-only immutable image build and Nginx publication boundary.
- `nginx.conf` and `nginx-security-headers.conf` — cache, security, and static route response policy.
- `public/_headers` — Cloudflare Pages cache and security response policy.
- `scripts/verify-release.js` — unified source/export gate and variant lifecycle.
- `scripts/verify-guide-export.js` — registry-derived generated HTML/sitemap expectations.
- `scripts/clean-locale-output.js` and `scripts/lib/redirects.js` — final output and provider redirect generation.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/verify-release.js` owns source checks, case-sensitive host policy, variant isolation, cleanup, and retained failure artifacts.
- `scripts/verify-guide-export.js` owns exact nine-page Guide inventory and registry-derived HTML/sitemap expectations.
- `src/content/guides/registry.json`, `src/lib/guideSeo.ts`, and `src/lib/siteRouting.ts` provide the canonical route/locale projection used by manifests and live checks.
- `public/_headers`, `nginx.conf`, and `nginx-security-headers.conf` already expose cache and security policy for the two hosting channels.
- `scripts/lib/redirects.js` writes the Cloudflare Worker and Nginx redirect artifacts during the existing build finalization.

### Established Patterns
- Build and verification scripts use Node built-ins, strict assertions, import-safe functions, and concise `[script]` English logs.
- CI uses Ubuntu 24.04, Node 24, npm lockfile installs, failure-only artifact upload, and explicit read-only permissions for verification jobs.
- CN deployment currently builds multi-architecture GHCR images and updates `deployment/fastgpt-home`; IO has a preview-only Cloudflare Pages deploy path.
- Generated static output is disposable; all release identity must be recorded in committed or uploaded evidence rather than inferred from `.next`/`out` after cleanup.

### Integration Points
- Add packager/manifest and live-verifier commands under `scripts/` with stable `package.json` entries and Node regression tests.
- Add a production workflow that composes the existing verify gate, provider publication commands, release manifest injection, rollback capture, and evidence upload.
- Add only the minimal Nginx/Cloudflare header or route handling needed to expose the release manifest and preserve cache-freshness evidence.
- Keep provider credentials in CI secrets/variables and fail before mutation when required values are absent.

</code_context>

<specifics>
## Specific Ideas

- The public live matrix contains `/guide` plus the eight lower-case slugs on each of `https://fastgpt.cn` and `https://fastgpt.io`.
- Current public probes return `404` for both `/guide` hubs and the tracer article on both domains, while both domains currently serve a `200` sitemap. This is baseline evidence for the release blocker and must not be recorded as deployment success.
- The approved live page cache contract is the existing one-hour HTML `Cache-Control` policy plus provider cache evidence (`ETag`/`Last-Modified` and `Age`/`CF-Cache-Status` where available).
- Cloudflare's current Wrangler Pages command supports `pages deployment list --json`, `pages deploy --commit-hash`, and direct production upload; these provider capabilities are the IO implementation path.

</specifics>

<deferred>
## Deferred Ideas

- Same-slug language switching, catalog filtering, CMS authoring, additional Guide records, and programmatic technical/reference publishing remain future requirements.
- Provider-specific dashboards, long-term uptime monitoring, alerting, and automated rollback drills remain operational follow-up after the release gate.

</deferred>

---

*Phase: 8-Production Delivery & Live Verification*
*Context gathered: 2026-08-17*
