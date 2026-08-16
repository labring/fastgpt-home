# Phase 02 Research: Approved Metadata

**Phase:** 02 — Approved Metadata  
**Researched:** 2026-08-16  
**Requirements:** META-01, META-02, META-03  
**Confidence:** High for repository behavior and workbook structure; high for the approved-row statistics after direct workbook inspection.

## Goal and Boundary

Phase 2 imports the approved Week04 English FAQ metadata into the static catalog for exactly 1,195 mapped records. The workbook's reachable online URL joins each row to the Phase 1 durable `contentId`; the authored `Question`, `Answers`, and `Category` fields remain source-owned. Records outside the approved batch retain their existing metadata fallback. Canonical/hreflang/sitemap alignment, redirect projection, and the complete release command remain later-phase work.

The planning context locks these decisions:

- Join by the workbook `线上URL（08-11 实测可达）` path segment through the Phase 1 evidence/registry, then use `contentId` as the metadata key.
- Require exactly 1,195 unique mapped rows and fail closed on duplicate, unknown, missing, malformed, or incomplete data.
- Preserve approved title, description, and keyword source strings; append one exact ` - FastGPT` suffix through the existing metadata normalizer.
- Apply metadata as an overlay and prove `Question`, `Answers`, and `Category` stability.
- Give workbook metadata precedence for 1,195 rows and retain legacy fallback metadata for the remaining 205 records.
- Generate deterministic committed JSON with explicit `--write` and `--check` modes.

## Approved Workbook Findings

The source is `/Users/longnv/bin/repo/fastgpt-data/Week04/存量修复-补Meta第2批/FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx`. Its `FAQ Data` sheet has one header row and 1,195 data rows with columns:

| Column | Meaning | Phase 2 use |
|---|---|---|
| A | `no` | Audit display only; not an identity key |
| B | `category` | Approved context; authored `Category` remains protected |
| C | `question` | Editorial metadata; authored `Question` remains protected |
| D | `title` | Approved suffix-free title base |
| E | `description` | Approved description source |
| F | `keywords` | Approved comma-separated keyword source |
| G | `线上URL（08-11 实测可达）` | Authoritative join path |
| H–K | Lengths, collision count, and generation notes | Validation/audit evidence |

Direct XML inspection confirms:

- 1,195 rows and 1,195 unique online URL values.
- All titles, descriptions, and keyword strings are nonempty.
- Title base lengths: minimum 32, median 47, p95 50, maximum 50.
- Description lengths: minimum 125, median 146, p95 155, maximum 155.
- Keyword lengths: minimum 58, median 76, p95 88, maximum 94.
- Zero workbook title values contain `FastGPT`; the renderer therefore owns the suffix.
- Every online URL uses the `fastgpt.io/faq/<slug>` shape documented in the Week04 README.

The README states that this batch covers reachable pages and sizes title input at 32–50 characters so the template suffix renders at or below 60 characters. The repository policy permits descriptions through 160 characters; the observed workbook maximum is 155.

## Existing Data and Route Flow

1. `src/faq/en.ts` exports about 1,400 authored English objects keyed by stable content IDs. Each object includes `Category`, `Question`, `Answers`, `Title`, `Description`, and `Keywords`.
2. `src/faq/index.ts` overlays `legacyMeta` and legacy category data, then maps registry records to canonical-slug keys. `getFaqItem`, `getFaqIds`, and `getFaqData` form the route/catalog boundary.
3. `src/app/[lang]/faq/[id]/page.tsx` resolves a canonical slug, renders the authored FAQ item, and calls `normalizeFaqMetadata` from `generateMetadata`. The root alias delegates to the same localized route implementation.
4. `normalizeFaqMetadata` removes legacy suffix forms, appends one literal ` - FastGPT`, limits the base title to `TITLE_MAX_LENGTH - suffix`, normalizes description whitespace, and truncates at sentence/word boundaries to `DESCRIPTION_MAX_LENGTH`.
5. `scripts/verify-p2.js` already walks exported FAQ HTML, checks title/description limits, matches Open Graph/Twitter values, and validates canonical/heading/migration surfaces. It does not yet compare every exported page with workbook-approved fields, so Phase 2 needs a source-level verifier or an explicit extension.

Phase 1 committed:

- `src/faq/generated-en-route-registry.json`: 1,400 records, 786 preserved canonical slugs, 614 repaired lowercase slugs, and 149 explicit no-redirect collision-ledger entries.
- `src/faq/english-route-evidence.json`: source URL/content identity evidence for every current record.
- `scripts/generate-faq-route-registry.js`: dependency-free XLSX/XML reader and TypeScript AST source reader with deterministic JSON comparison.
- `scripts/verify-faq-routes.js`: source/registry/route-wiring invariant checks.

The metadata importer should consume these artifacts by `contentId` and leave canonical slug allocation untouched.

## Recommended Implementation Shape

Use one generated metadata snapshot and one catalog overlay:

1. Parse the workbook with the existing standard-library unzip/XML reader pattern. Validate sheet name, header names, online URL host/path, required fields, and exact data-row count.
2. Resolve each online URL slug through the Phase 1 evidence map. Require the source slug to identify one current `contentId`; reject unknown or duplicate source slugs before writing.
3. Emit a deterministic JSON artifact sorted by `contentId`. Each row should carry `contentId`, `sourceSlug`, approved raw `title`, `description`, `keywords`, source workbook row number, and a content-preservation snapshot/hash for `Question`, `Answers`, and `Category`. A top-level version/count/source descriptor makes drift diagnostics explicit.
4. Build a metadata overlay keyed by `contentId`, then merge it ahead of `legacyMeta` only for mapped records. Keep `en.ts` object values immutable and let the route catalog continue exposing canonical slugs from the Phase 1 registry.
5. Reuse `normalizeFaqMetadata` for title and description rendering. Verify the normalized title equals approved base + one suffix, contains one suffix occurrence, and stays within 60 code points. Compare descriptions against the approved source after the existing normalization policy; compare keywords as the exact approved source string and preserve its comma-separated ordering.
6. Add `--write` and `--check` behavior. `--write` requires the external workbook and atomically writes the artifact after all validation. `--check` reads only committed JSON plus repository source, making CI/build verification independent of the external workbook location. Both paths share the same validation function and produce row/content-ID diagnostics.

A metadata-only overlay keeps the existing `FaqItem` shape stable for all route consumers and limits the changed fields to approved metadata. A separate typed API can be introduced only when it reduces duplicate joins; the smallest viable plan can keep the compatibility facade in `src/faq/index.ts`.

## Failure Modes and Guardrails

| Failure mode | Guardrail |
|---|---|
| Workbook URL points to an unknown or unsafe source slug | Parse and validate URL host/path, resolve through committed evidence, fail with workbook row and slug. |
| Duplicate URL or two rows map to one content ID | Track both source slug and `contentId` sets; fail before artifact write. |
| Workbook row count drifts from 1,195 | Assert exact count and report observed count. |
| Title suffix duplicates or consumes title budget | Store suffix-free base, call one normalizer, assert one suffix and 60-code-point maximum. |
| Description policy changes approved copy | Preserve raw source in artifact, expose normalized expectation explicitly, and compare rendered output with the same helper used by the route. |
| Keywords reorder or lose separators | Keep raw source string; assert output string and metadata keyword array derive from the same ordered value. |
| Authored body/category mutates during overlay | Snapshot/hash `Question`, `Answers`, and `Category` from `en.ts`; compare after catalog construction for all 1,195 IDs. |
| 205 non-workbook records disappear | Assert full 1,400-record catalog cardinality and legacy fallback coverage after overlay. |
| Build depends on external workbook path | Commit generated JSON and make `--check`/runtime import use repository files only. |
| Generated output changes order or formatting across runs | Sort by `contentId`, normalize JSON serialization, and compare byte-for-byte in `--check`. |

## Verification Strategy

The plan should provide a focused source-level command plus existing output checks:

### Source/import checks

- `node scripts/generate-faq-metadata.js --write <workbook>` (or equivalent repository-native CLI) succeeds with 1,195 rows and writes the committed snapshot.
- `node scripts/generate-faq-metadata.js --check` succeeds without the workbook and detects any snapshot/source drift.
- A verifier asserts exact 1,195 workbook IDs, one-to-one URL/content-ID mapping, all required fields, one suffix, approved raw descriptions/keywords, 1,400 full-catalog coverage, and unchanged authored fields.
- Negative fixtures or an in-memory mutation check prove duplicate, unknown, missing, and content-drift errors fail with row-level diagnostics and no partial artifact.

### Route/catalog checks

- `npm run verify:faq-routes` remains green, proving metadata overlay consumes existing canonical registry identity.
- A focused metadata verifier resolves representative preserved mixed-case and repaired lowercase slugs through `getFaqItem`, checks their `contentId`, and checks the 205 fallback records remain available.

### Export checks

- `npm run build` runs with committed JSON only and emits every canonical English route.
- `npm run verify:p2` continues to pass the existing page-level title/description/canonical/heading checks.
- A mapped-row sample/full walk of exported HTML compares `<title>`, `description`, and keyword metadata to approved values, including exactly one suffix. Phase 4 owns combining this into the single release command.

## Security and Operational Notes

- The workbook is an offline reviewed input. Treat cell values as untrusted strings and validate XML decode, URL host/path, field types, and size before serializing.
- Keep generated metadata in build-time JSON; no runtime filesystem or network access belongs in the route component.
- Escape JSON/HTML through existing Next metadata APIs. Avoid interpolating workbook values into raw HTML or shell commands.
- Preserve source row numbers in diagnostics and optional evidence fields for auditability; do not include secrets or external credentials.
- Atomic write plus fail-closed validation prevents a malformed workbook from replacing the committed artifact.

## Requirement Coverage

| Requirement | Research implication |
|---|---|
| META-01 | Importer consumes exactly 1,195 unique `FAQ Data` rows by authoritative online URL and fails on duplicates/unmapped rows; committed JSON supports offline `--check`. |
| META-02 | Overlay exposes approved title/description/keywords to `generateMetadata`; existing normalizer yields one suffix and shared limits; exported HTML verifier compares mapped pages. |
| META-03 | Source snapshots/hashes and 1,400-record cardinality checks prove `Question`, `Answers`, and `Category` stay verbatim. |

## Deferred to Later Phases

- Canonical URL, hreflang, sitemap, and internal-link graph changes: Phase 3.
- Redirect projection and consolidated release verification: Phase 4.
- Historical body recovery, question/title editorial rewrites, and future workbook comparison reports: deferred scope.

## Sources Consulted

- `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`
- `.planning/phases/02-approved-metadata/02-CONTEXT.md`, `.planning/phases/02-approved-metadata/02-UI-SPEC.md`
- `.planning/phases/01-canonical-faq-routes/01-CONTEXT.md`, `.planning/phases/01-canonical-faq-routes/01-01-SUMMARY.md`
- `.planning/research/SUMMARY.md`, `.planning/research/ARCHITECTURE.md`, `.planning/codebase/CONVENTIONS.md`, `.planning/codebase/STRUCTURE.md`, `.planning/codebase/STACK.md`
- `src/faq/en.ts`, `src/faq/index.ts`, `src/faq/legacyMeta.ts`, `src/faq/legacyCategories.ts`
- `src/faq/generated-en-route-registry.json`, `src/faq/english-route-evidence.json`
- `src/lib/faqMetadata.ts`, `src/lib/faqMetadata.constants.json`, `src/app/[lang]/faq/[id]/page.tsx`, `scripts/generate-faq-route-registry.js`, `scripts/verify-p2.js`
- `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md`
- `/Users/longnv/bin/repo/fastgpt-data/Week04/存量修复-补Meta第2批/FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx`

## Research Completion

## RESEARCH COMPLETE
