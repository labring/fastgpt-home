# Phase 4: Redirects and Release Gate - Patterns

**Mapped:** 2026-08-16
**Mode:** Inline fallback — the typed pattern-mapper slot was unavailable because the shared agent thread limit was reached.

## Planned file mapping

| Planned responsibility | Closest existing analog | Pattern to reuse |
|------------------------|-------------------------|-------------------|
| Registry-backed redirect projection | `scripts/lib/redirects.js` | Standard-library source readers, `Map` entries, absolute targets, variant-owned writers. |
| Redirect invariants | `scripts/verify-faq-routes.js`, `scripts/verify-faq-seo-graph.js` | `node:assert/strict`, committed JSON parsing, exact cardinality/deny-set checks, guarded `main()` failure path. |
| Release aggregate orchestration | `scripts/verify-p2.js`, `scripts/verify-i18n-seo.js` | Synchronous artifact checks, descriptive route failures, nonzero exit, reuse of existing verifiers. |
| Build lifecycle integration | `scripts/clean-locale-output.js` | Variant resolution, generated `.next`/`out` artifacts, Worker/Nginx output, locale cleanup. |
| Command ergonomics | `package.json` existing `verify:*` scripts | Dependency-free Node entry point with source mode by default and explicit post-build flags. |
| Filesystem policy | `scripts/verify-faq-seo-graph.js` case-sensitive realpath logic | Fail closed on same-file case-fold collisions while allowing distinct paths on case-sensitive hosts. |

## Data flow

```text
generated-en-route-registry.json
  ├─ records.legacySources + routeStatus/collisionDisposition
  └─ collisionLedger.disposition=no-redirect
          │
          ▼
scripts/lib/redirects.js
  ├─ ioRedirects → out/_worker.js (query-preserving 301)
  └─ cnRedirects → .next/nginx-redirects.conf (query-preserving 301)
          │
          ▼
scripts/verify-faq-redirects.js
  └─ exact source/target/deny-set checks

package.json → scripts/verify-release.js
  ├─ source generators + focused verifiers
  ├─ explicit IO build → matching artifact checks
  └─ explicit CN build → matching artifact checks
```

## Established implementation constraints

- Keep route and metadata registries as committed build-time inputs; no workbook or network read belongs in release verification.
- Preserve path case in redirect keys and URL encoding in target paths. `addRedirect` already emits a trailing-slash companion key.
- Keep Worker and Nginx writers separate because deployment targets have different artifact locations and query APIs.
- Use subprocess environment overrides per variant. Never infer a variant from stale `out/` or `.next` content.
- Keep the aggregate script as a coordinator. Existing verifiers remain the owners of their checks and should be invoked with the exact artifact environment.
- Keep cleanup explicit and observable: successful default runs remove transient artifacts; `--keep-artifacts` keeps a named failure workspace.

## Anti-patterns to avoid

- Deriving redirect destinations from Question text, metadata, or a regenerated slug.
- Redirecting a collision source to the first candidate or to a generic FAQ page.
- Treating `/en/faq` and `/zh/faq` migration aliases as final canonical sitemap routes.
- Running a verifier after the next variant has overwritten `out/` or `.next`.
- Silently continuing after a case-insensitive filesystem collision.
- Reimplementing every P0/P1/P2/i18n/SEO assertion in the aggregate script.
