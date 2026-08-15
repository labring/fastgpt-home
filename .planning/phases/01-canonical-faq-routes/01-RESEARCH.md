# Phase 01 Research: Canonical FAQ Routes

**Phase:** 01 — Canonical FAQ Routes  
**Researched:** 2026-08-16  
**Requirements:** URL-01, URL-02, URL-03  
**Confidence:** High for repository behavior; medium for workbook evidence because the approved workbook is outside this checkout.

## Goal and Boundary

The phase establishes one durable identity and one safe canonical slug for each English FAQ object currently exported from `src/faq/en.ts`. Existing healthy URLs remain stable. Missing, unsafe, or collided routes receive committed deterministic slugs. Approved metadata import (Phase 2), canonical/hreflang/link/sitemap alignment (Phase 3), redirects and release verification (Phase 4), and FAQ body edits remain outside this phase.

Locked context decisions:

- **D-01:** Existing `src/faq/en.ts` keys remain durable `contentId` values. A generated registry maps `contentId` to `canonicalSlug` and is shared by catalog and route consumers.
- **D-02:** Preserve a current slug only when it is safe, unique, and maps to its intended record. Week04 online-URL evidence identifies the approved reachable rows; repair only missing, unsafe, or collided records.
- **D-03:** Repaired slugs use readable lowercase ASCII `a-z0-9-hyphen` syntax. Preserved and allocated slugs are reserved; a deterministic short digest from stable identity resolves remaining collisions. The committed mapping is authoritative after generation.
- **D-04:** A one-hop permanent redirect is emitted only for a legacy source with exactly one final `contentId` and a verified canonical destination. Ambiguous collision sources remain in an audit ledger without guessed redirects; query strings remain deployment concerns.

## Existing Route and Content Flow

1. `src/faq/en.ts` exports the authored English `faq` object. Its object keys are the current route IDs and must stay byte-for-byte stable as content identities.
2. `src/faq/index.ts` overlays existing legacy metadata/categories and exposes `getFaqData`, `getFaqItem`, and `getFaqIds`. Both `src/app/[lang]/faq/[id]/page.tsx` and the root alias `src/app/faq/[id]/page.tsx` use these helpers; `dynamicParams = false` makes static ID coverage a build contract.
3. `src/lib/localizedRoutes.ts` currently builds `/faq/${encodeURIComponent(id)}` through `getFaqPath`; route consumers must receive final registry slugs while retaining the helper's encoding and default-locale behavior.
4. `src/app/sitemap.ts` enumerates `getFaqIds(locale)` and `getOwnedFaqUrl(locale, faqId)`. Phase 1 must expose the registry through the same ID surface so later SEO work has one mapping source.
5. `scripts/lib/redirects.js` parses source FAQ object keys with TypeScript AST and currently builds cross-domain redirect maps for every published FAQ ID. Phase 1 should provide a reusable mapping/identity input without guessing ambiguous historical sources; Phase 4 owns final deployment projection.

## Recommended Implementation Shape

Use a small committed generated registry plus a standard-library generator/checker. Keep the registry in a repository-native JSON or typed source artifact that can be imported by TypeScript and read by Node scripts. Every record should contain at least:

| Field | Purpose |
|---|---|
| `contentId` | Existing `src/faq/en.ts` object key; durable identity and join key |
| `sourceSlug` | Current public path segment when known; enables preserve/repair classification |
| `canonicalSlug` | Final safe path segment used by route params and links |
| `routeStatus` | `preserved` or `repaired`; makes incremental scope auditable |
| `legacySources` | Exact old path candidates for later redirect projection |
| `collisionDisposition` | `none` or explicit ambiguous-collision ledger state |

Generator behavior:

1. Parse `src/faq/en.ts` object keys with the existing TypeScript AST pattern in `scripts/lib/redirects.js` or a shared helper. Fail on unsupported syntax, duplicate keys, or an empty catalog.
2. Read the approved Week04 URL evidence through the existing standard-library XLSX pattern in `scripts/sync-w3-faq.py` only when the phase source is available. Join by stable source identity/approved URL evidence, never by mutable title or regenerated slug. Report unmatched, duplicate, or ambiguous rows at record level.
3. Validate a current route as safe only when it matches lowercase ASCII slug syntax, is unique, and resolves to the intended `contentId`. Reserve every preserved slug before allocation.
4. For each repair, slugify the complete English question with lowercase ASCII `a-z0-9-hyphen`, collapse repeated separators, and trim boundary hyphens. If the candidate is reserved, append a fixed short SHA-256 digest of the stable `contentId` (and retain a deterministic fallback counter only if the digest itself collides). Persist the chosen result in the committed registry.
5. Validate a one-to-one mapping from every canonical slug to exactly one `contentId`; fail closed on unsafe syntax, missing IDs, duplicate IDs, or unresolved allocations. Keep ambiguous old sources in a collision ledger and leave redirect destination empty for Phase 4.
6. Make the generator idempotent: `--check` compares generated output with the committed artifact; `--write` writes sorted stable records. No new npm package is required.

## Integration Points and File Candidates

Likely Phase 1 files to modify or add:

- `src/faq/index.ts`: resolve canonical IDs/slugs from the generated English registry while preserving existing locale lookup and content fields.
- `src/lib/localizedRoutes.ts`: route path construction should consume final canonical slugs through one helper; retain URL encoding and default-locale rules.
- `src/app/[lang]/faq/[id]/page.tsx`: decode and resolve canonical slug to `contentId`, call `notFound()` for unknown/unsafe values, and emit the existing page with the intended FAQ object.
- `src/app/faq/[id]/page.tsx`: preserve the root alias while sourcing static params from the registry-backed ID list.
- `scripts/lib/redirects.js`: expose registry-aware FAQ IDs only if needed for shared redirect generation; final changed-path projection belongs to Phase 4.
- `scripts/import-*faq*.py` (new sibling of `scripts/sync-w3-faq.py`) or a minimal Node generator: deterministic registry generation/checking using existing tooling.
- `src/faq/generated-en-registry.json` (new generated artifact, exact name at planner discretion): committed route mapping consumed at build time.
- `scripts/verify-faq-routes.js` (new focused regression check): assert identity/slug invariants and route resolution without importing Phase 2 metadata or Phase 4 deployment maps.
- `package.json`: one runnable command for the focused route verifier/generator check.

Do not modify FAQ question/answer/category values, add a new route family, or create a runtime data fetch. Static export requires all mapping data at build time.

## Verification Strategy

The focused check should fail with record-level diagnostics and cover:

- English source key count equals generated registry `contentId` count; every source key appears exactly once.
- Every `canonicalSlug` matches lowercase `a-z0-9-` syntax, is non-empty, and is unique.
- Preserved records retain their current safe slug and resolve to the same `contentId`.
- Repaired records have deterministic slug output across two generator/check runs and resolve to their intended object.
- Every registry canonical route appears in the static ID/slug parameter source used by the App Router.
- Unknown, malformed, and percent-encoding-invalid route IDs reach `notFound()` rather than a wrong FAQ page.
- The focused check leaves metadata values, SEO alternates, sitemap deduplication, and deployment redirect maps to their owning phases.

Run the repository-native command after generation; a full `npm run build` belongs to the release gate in Phase 4. Keep one small assert-based Node check as the required regression surface.

## Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Healthy route accidentally reallocated | Require Week04 URL evidence and intended-record identity before preserve classification; reserve preserved slugs first. |
| Collision last-write-wins behavior | Group source/canonical candidates with `Map`/`Set`; fail on cardinality violations before serialization. |
| Regeneration changes published paths | Treat committed registry as authority; only allocate a new slug for a new/unmapped record or an explicit reviewed repair. |
| Encoded and raw paths diverge | Reuse `getFaqPath`/`encodeURIComponent` conventions and test both encoded and safe ASCII forms at route resolution. |
| Static export omits repaired IDs | Drive `generateStaticParams` from the registry-backed canonical set and assert every registry record is represented. |
| Workbook/parser portability | Reuse `scripts/sync-w3-faq.py` standard-library parser; preflight a Python 3.11/3.12 interpreter when workbook generation runs. |

## Requirement Coverage

| Requirement | Phase 1 research implication |
|---|---|
| URL-01 | Registry contains every current English key exactly once and each canonical slug is safe/unique. |
| URL-02 | Preserve only verified healthy source slugs and assert intended-record identity before retaining them. |
| URL-03 | Allocate a deterministic ASCII slug for every missing/unsafe/collided in-scope route and resolve it through static params. |

## Deferred to Later Phases

- URL-04 redirect generation, ambiguity projection, query-string preservation, and deployment maps: Phase 4.
- META-01/02/03 workbook metadata fidelity and authored-content equivalence: Phase 2.
- SEO-01/02/03 canonical/hreflang/internal links/sitemap graph alignment: Phase 3.
- VERIFY-01/02/03 complete build/export and HTML release checks: Phase 4.

## Sources Consulted

- `.planning/phases/01-canonical-faq-routes/01-CONTEXT.md`
- `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`
- `.planning/research/SUMMARY.md`, `ARCHITECTURE.md`, `STACK.md`, `PITFALLS.md`
- `.planning/codebase/ARCHITECTURE.md`, `CONVENTIONS.md`, `STACK.md`, `STRUCTURE.md`, `TESTING.md`
- `src/faq/en.ts`, `src/faq/index.ts`, `src/lib/localizedRoutes.ts`
- `src/app/[lang]/faq/page.tsx`, `src/app/[lang]/faq/[id]/page.tsx`, `src/app/faq/[id]/page.tsx`, `src/app/sitemap.ts`
- `scripts/lib/redirects.js`, `scripts/sync-w3-faq.py`, and existing `scripts/verify-*.js` conventions

## Research Completion

## RESEARCH COMPLETE
