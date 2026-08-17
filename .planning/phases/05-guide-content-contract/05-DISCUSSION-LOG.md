# Phase 5: Guide Content Contract - Discussion Log

> **Audit trail only.** Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-17
**Phase:** 5-Guide Content Contract
**Areas discussed:** source boundary and fidelity, registry identity, assets and links, validation scope

## Source boundary and fidelity

| Option | Description | Selected |
|--------|-------------|----------|
| Repository-owned raw source | Commit all 16 approved Markdown files and read them at build time | ✓ |
| External delivery path | Read `/Users/longnv/Downloads/Week04` during builds | |

**Decision:** Use a repository-owned raw source boundary, normalize line endings, remove exactly one leading delivery comment, and prove the remaining body with a digest.

## Registry identity

| Option | Description | Selected |
|--------|-------------|----------|
| One typed eight-pair registry | Registry drives pair identity and downstream metadata/link/asset consumers | ✓ |
| Separate locale catalogs | Chinese and English catalogs are reconciled by later route code | |

**Decision:** Enforce exactly eight unique same-slug pairs with localized metadata compared to each source snapshot.

## Assets and links

| Option | Description | Selected |
|--------|-------------|----------|
| Explicit registry directives | Preserve source image requests and require approved path/alt records; map link labels to owned targets | ✓ |
| Infer from prose or labels | Derive images and URLs heuristically | |

**Decision:** Required assets and internal links stay explicit. Missing required assets and unresolved/foreign targets fail with slug-specific errors. The current image-free package keeps blank/garbled directives as an explicit no-required-asset exception.

## Validation scope

| Option | Description | Selected |
|--------|-------------|----------|
| Standalone Node verifier | Cover every GUIDE-03 defect class and leave one runnable regression command | ✓ |
| Build-only checks | Rely on Next build failures without direct contract fixtures | |

**Decision:** Reuse Node assertions, path checks, and SHA-256 with concise English logs and deterministic slug-specific failures.

## the agent's Discretion

- Exact registry interfaces, parser names, and fixture mechanics.
- Minimal route inventory used to validate explicit internal-link targets.

## Deferred Ideas

- Guide visitor UI, SEO graph, sitemap integration, dual exports, deployment, and live evidence are assigned to Phases 6–8.
