# Phase 7: Dual-Variant Release Evidence - Discussion Log

> **Audit trail only.** Decisions are captured in `07-CONTEXT.md`.

**Date:** 2026-08-17
**Phase:** 7-Dual-Variant Release Evidence
**Areas discussed:** Unified release gate, Guide export HTML evidence, case-sensitive dual variants and budget, scope and failure policy

## Unified release gate

| Option | Description | Selected |
|--------|-------------|----------|
| Extend existing `verify:release` | Compose Guide source and export checks into the established release coordinator. | ✓ |
| Add a separate Guide-only release command | Creates a second complete release surface. | |

**Decision:** Extend `npm run verify:release`; preserve source-only, variant, and artifact-retention ergonomics.

## Guide export HTML evidence

| Option | Description | Selected |
|--------|-------------|----------|
| Registry-driven slug checks | Inspect one hub and eight articles per variant with variant/slug/path diagnostics. | ✓ |
| Aggregate page count only | Detect missing pages without identifying the affected slug or HTML surface. | |

**Decision:** Validate localized H1, metadata, canonical, alternates, schema, links, and sitemap from the shared registry.

## Case-sensitive dual variants and budget

| Option | Description | Selected |
|--------|-------------|----------|
| Linux CI or dedicated Docker evidence | Require case-sensitive output and verify `io` then `cn` with the 260 KiB P1 budget. | ✓ |
| Development-volume export | Permit case-insensitive hosts to produce full release evidence. | |

**Decision:** Fail closed on case-insensitive volumes; source-only remains available for local iteration.

## Scope and failure policy

| Option | Description | Selected |
|--------|-------------|----------|
| Artifact-only Phase 7 | Keep deployment, live HTTP, cache, and rollback evidence in Phase 8. | ✓ |
| Include deployment/live checks now | Expand Phase 7 beyond its roadmap boundary. | |

**Decision:** Preserve the Phase 8 boundary and retain slug-specific, command-specific failure diagnostics.

## the agent's Discretion

- Exact Guide HTML verifier API and mutation fixtures.
- Minimal Linux/Docker evidence invocation compatible with existing build/CI scripts.

## Deferred Ideas

- Immutable deployment and live production verification remain Phase 8.
