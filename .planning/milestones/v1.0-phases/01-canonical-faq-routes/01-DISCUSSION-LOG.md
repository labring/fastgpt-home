# Phase 1: Canonical FAQ Routes - Discussion Log

> **Audit trail only.** Decisions are captured in `01-CONTEXT.md`.

**Date:** 2026-08-16
**Phase:** 1-Canonical FAQ Routes
**Areas discussed:** Stable identity and registry boundary, Preserve-versus-repair policy, Deterministic repaired slugs, Legacy alias and collision handling

## Stable identity and registry boundary

| Option | Description | Selected |
|--------|-------------|----------|
| Existing keys + shared registry | Keep existing FAQ object keys as `contentId`; store canonical slugs separately | ✓ |
| Rename source keys | Make repaired slugs the source keys | |
| Opaque IDs | Rebuild references around generated IDs | |

**Decision:** Existing object keys remain durable identity and one generated registry owns public slugs.

## Preserve-versus-repair policy

| Option | Description | Selected |
|--------|-------------|----------|
| Incremental preservation | Preserve safe unique routes and repair only unsafe/missing/collided routes | ✓ |
| Normalize all routes | Replace every route with a new format | |
| Keep every current key | Preserve unsafe or collided paths | |

**Decision:** Preserve healthy indexed URLs and use Week04 reachability evidence for mapped rows.

## Deterministic repaired slugs

| Option | Description | Selected |
|--------|-------------|----------|
| Full-question slug + digest on collision | Lowercase ASCII question slug, deterministic identity digest for collisions | ✓ |
| Five words + increment | Truncate and append an allocation counter | |
| Opaque random IDs | Generate non-readable random route IDs | |

**Decision:** Readable full-question slugs with deterministic collision suffixes; commit the mapping.

## Legacy alias and collision handling

| Option | Description | Selected |
|--------|-------------|----------|
| Unique aliases only | Redirect one-to-one aliases; leave ambiguous collisions without a guessed target | ✓ |
| Last-entry redirect | Redirect every collision to the last registry entry | |
| No redirects | Drop all legacy alias behavior | |

**Decision:** Only verified one-hop unique redirects are eligible; collisions remain audit-only.

## the agent's Discretion

- Select the smallest repository-native registry format and generation/validation command.
- Reuse existing route, redirect, and verification conventions.

## Deferred Ideas

- Historical body recovery, full-catalog normalization, and live deployment monitoring remain deferred to later work.
