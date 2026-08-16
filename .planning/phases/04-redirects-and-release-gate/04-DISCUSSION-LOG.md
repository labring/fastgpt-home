# Phase 4: Redirects and Release Gate - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-16
**Phase:** 4-redirects-and-release-gate
**Areas discussed:** Legacy alias eligibility, Collision deny rules, HTTP/query semantics, Aggregate release verifier, Release host and variant coverage, HTML evidence contract, Artifact cleanup and command ergonomics
**Mode:** `--auto` — recommended options selected automatically; no interactive questions were presented.

---

## Legacy alias eligibility

| Option | Description | Selected |
|--------|-------------|----------|
| Registry-backed unique aliases | Project only repaired, non-collided `legacySources` entries whose final canonical slug exists; cover unprefixed and `/en/faq/` migration forms with direct owner-domain targets. | ✓ |
| Redirect every changed-looking source | Derive aliases from route text or metadata and risk synthetic destinations. | |
| Keep all redirects in a manual list | Avoid generator changes but allow registry drift and incomplete coverage. | |

**User's choice:** Auto-selected the registry-backed unique-alias policy (recommended default).
**Notes:** Phase 1 registry evidence is authoritative. Current counts are 1,400 records, 614 repaired, 42 repaired/non-collided redirect candidates, and 572 collision-denied repairs.

## Collision deny rules

| Option | Description | Selected |
|--------|-------------|----------|
| Fail closed from the collision ledger | Keep `disposition: no-redirect` entries audit-only and assert that denied source slugs are absent from every generated map. | ✓ |
| Choose a best candidate | Redirect to a likely FAQ when one current record appears related. | |
| Emit a generic FAQ fallback | Preserve traffic through a section-level destination. | |

**User's choice:** Auto-selected explicit no-redirect ledger enforcement (recommended default).
**Notes:** The 149-entry collision ledger and each `collisionDisposition: no-redirect` record prevent guessed destinations. Duplicate and many-to-one sources fail the verifier.

## HTTP/query semantics

| Option | Description | Selected |
|--------|-------------|----------|
| One-hop absolute 301 with query preservation | Path-only lookup maps directly to the final owner URL; Worker copies `url.search`; Nginx uses `$is_args$args`; trailing-slash aliases resolve directly. | ✓ |
| Relative 301 and let the host normalize | Keep targets shorter and delegate canonicalization to the next request. | |
| 302 or browser-side migration | Reduce edge configuration changes while retaining a temporary redirect. | |

**User's choice:** Auto-selected one-hop absolute 301 semantics with unchanged query strings (recommended default).
**Notes:** Existing Worker and Nginx helpers already provide query preservation; Phase 4 adds direct verification for status/target/query behavior.

## Aggregate release verifier

| Option | Description | Selected |
|--------|-------------|----------|
| One `npm run verify:release` gate | Orchestrate generators, source checks, redirect checks, both builds, existing verifiers, and HTML/sitemap checks with record-level failures. | ✓ |
| Keep separate commands only | Require maintainers to remember and sequence every individual check. | |
| Add a package runner dependency | Use a new task runner to coordinate builds and reports. | |

**User's choice:** Auto-selected one dependency-free aggregate command with existing checks composed in a deterministic order (recommended default).
**Notes:** `--source-only` is a fast diagnostic path; `--keep-artifacts` retains failing outputs for investigation. The default command fails nonzero on any record, route, build, or artifact mismatch.

## Release host and variant coverage

| Option | Description | Selected |
|--------|-------------|----------|
| Require case-sensitive host and run io/cn explicitly | Fail closed on case-insensitive filesystems; verify 1,400 io English routes and 1,490 cn Chinese routes with explicit environment ownership. | ✓ |
| Normalize preserved mixed-case paths on the host | Avoid filesystem requirements by changing published path casing. | |
| Verify only the default site variant | Reduce build time while leaving the second owner-site artifact implicit. | |

**User's choice:** Auto-selected a case-sensitive release host with explicit io and cn builds (recommended default).
**Notes:** Default macOS volumes collapse mixed-case names; Linux CI/Docker and case-sensitive APFS are accepted evidence hosts. Each variant is checked before output is overwritten by the next build.

## HTML evidence contract

| Option | Description | Selected |
|--------|-------------|----------|
| Reuse focused verifiers in the aggregate gate | Check H1, FAQ JSON-LD, approved metadata, self canonical, hreflang, owner host, sitemap sets, and alias exclusion through existing scripts. | ✓ |
| Sample a small set of pages | Lower verification cost while allowing record-level drift elsewhere. | |
| Add a second HTML/content model | Duplicate identity and metadata parsing in a new verifier. | |

**User's choice:** Auto-selected full-route reuse of `verify-faq-metadata`, `verify-faq-seo-graph`, P0/P1/P2, and i18n-SEO checks (recommended default).
**Notes:** Existing content registries remain the identity source; diagnostics carry variant, route, contentId, and check names.

## Artifact cleanup and command ergonomics

| Option | Description | Selected |
|--------|-------------|----------|
| Clean successful runs, retain failures on request | Default release command removes transient `.next`/`out` and generated build residue after success; `--keep-artifacts` preserves a failure workspace. | ✓ |
| Always retain all build output | Simplifies post-run inspection at the cost of stale-artifact risk. | |
| Delete output immediately after each check | Minimizes disk usage but weakens failure diagnostics and cross-check sequencing. | |

**User's choice:** Auto-selected clean success behavior with an explicit artifact-retention switch (recommended default).
**Notes:** The aggregate command must bind each verifier to the variant that produced its artifacts and clear stale output before the next variant.

## the agent's Discretion

- Choose the minimal standard-library implementation for registry alias projection, filesystem case-sensitivity probing, aggregate process orchestration, and temporary artifact handling.
- Choose stable representative records for redirectable, collision-denied, preserved mixed-case, bilingual, and Chinese-only checks while retaining full-catalog traversal.
- Choose exact failure text and report formatting, provided source slug, contentId, canonical target, variant, and command context are present.

## Deferred Ideas

- Live production HTTP/CDN redirect-chain checks, Search Console monitoring, and deployment orchestration remain outside this repository phase.
- Historical FAQ-body restoration, future workbook-drift reporting, redirect analytics, new locale translations, and authored content changes remain deferred.
