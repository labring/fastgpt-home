# Phase 8: Production Delivery & Live Verification - Discussion Log

> **Audit trail only.** Decisions are captured in CONTEXT.md; this log preserves the alternatives considered.

**Date:** 2026-08-17
**Phase:** 8-production-delivery-live-verification
**Mode:** `--auto` (all gray areas selected; recommended defaults chosen)

## Immutable artifact identity

| Option | Description | Selected |
|--------|-------------|----------|
| Content-addressed output archive plus release manifest | Package each verified variant output with SHA-256 identity, route/tree evidence, revision, and rollback target | ✓ |
| Provider-only deployment identifiers | Depend on GHCR/Pages IDs as the sole artifact record | |

**Decision:** D-01 through D-03. The repository owns one auditable manifest schema and content-addressed archive per variant.

## Provider delivery and rollback

| Option | Description | Selected |
|--------|-------------|----------|
| Preserve CN Docker/Kubernetes and add IO Cloudflare Pages production path | Aligns with ADR-0007 and existing workflows; captures provider revisions and explicit rollback targets | ✓ |
| Move both variants to one new hosting channel | Simplifies workflow topology while changing an established production contract | |

**Decision:** D-04 through D-07. Promotion remains credential-guarded and fails closed when provider state or rollback targets are unavailable.

## Live verification contract

| Option | Description | Selected |
|--------|-------------|----------|
| Dependency-free Node HTTP matrix with public release manifest evidence | Checks 18 Guide pages, two sitemaps, cache headers, SEO surfaces, and deployed revision identity | ✓ |
| Browser-only smoke test | Covers rendering but leaves headers, sitemap, revision, and cache evidence implicit | |

**Decision:** D-08 and D-09. JSON plus text evidence records every route and failed surface.

## External state and operational boundary

| Option | Description | Selected |
|--------|-------------|----------|
| Build tooling and guarded workflow; report blocked production state honestly | Produces immutable artifacts and real public probes while requiring credentials for mutation | ✓ |
| Treat a source build or existing domain response as production success | Creates unverifiable revision and rollback claims | |

**Decision:** D-10. Current public probes are baseline `404` for Guide routes on both domains; no deployment success is claimed.

## Agent's discretion

- Script names, manifest schema details, archive implementation, and fixture strategy follow existing Node verifier conventions.
- Phase scope stays on DEPLOY-01/02; content and SEO graph changes remain closed.

## Deferred Ideas

- Monitoring dashboards, alerting, and automated rollback drills remain operational follow-up.
