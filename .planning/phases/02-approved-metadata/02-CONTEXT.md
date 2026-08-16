# Phase 2: Approved Metadata - Context

**Gathered:** 2026-08-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Import the approved Week04 English FAQ metadata into the build-time catalog and render it for exactly 1,195 mapped pages. Join every approved row to the Phase 1 durable `contentId`, preserve the authored `Question`, `Answers`, and `Category` fields byte-for-byte, and keep the 205 repository records outside the workbook on their existing fallback metadata. This phase covers metadata data flow and fidelity checks; canonical SEO alternates, sitemap alignment, redirect projection, and release verification remain in their roadmap phases.

</domain>

<decisions>
## Implementation Decisions

### Workbook authority and row mapping
- **D-01:** Use the workbook `FAQ Data` sheet's `线上URL（08-11 实测可达）` value as the approved join key. Extract its `/faq/<slug>` segment, resolve that slug through the committed Phase 1 evidence/registry, and attach metadata to the resulting durable `contentId`. Question, title, category, row number, and spreadsheet ordering remain metadata attributes; they do not identify a record.
- **D-02:** Treat the workbook as an exact 1,195-row import contract. Require one unique URL slug, one unique `contentId`, and complete title/description/keywords values for every data row. Unknown slugs, duplicate rows, missing rows, malformed URLs, or a final count other than 1,195 produce a record-level failure and stop the write.

### Approved field fidelity
- **D-03:** Store the workbook `title`, `description`, and `keywords` values as approved source strings in the generated metadata artifact. Preserve description and keyword wording, punctuation, ordering, and comma-separated keyword text. Existing runtime whitespace and length policy remains the single rendering boundary; the verifier compares the rendered value with the approved value after that established policy is applied.
- **D-04:** Treat the workbook title as a suffix-free base title. Apply the existing `normalizeFaqMetadata` path so each mapped page renders the approved base plus exactly one literal ` - FastGPT` suffix, with the existing 60-character title budget. Validate the workbook's declared title range and the resulting rendered length during generation and verification.

### Authored-content protection and precedence
- **D-05:** Apply imported metadata through a metadata-only overlay keyed by `contentId`. Snapshot or hash each mapped source record's `Question`, `Answers`, and `Category` before and after import, and fail on any drift. The overlay leaves authored content ownership in `src/faq/en.ts` and keeps category overlays under their existing rules.
- **D-06:** Give workbook metadata precedence for its 1,195 mapped records. Retain the existing legacy metadata fallback for the 205 records outside this batch, so the phase changes the approved scope while keeping the full 1,400-record catalog renderable.

### Regeneration and drift behavior
- **D-07:** Provide dependency-free Node generation with explicit `--write` and `--check` modes. `--write` reads the reviewed workbook and emits deterministic, `contentId`-sorted JSON; `--check` validates the committed artifact and source invariants without requiring the external workbook. Both modes share the same parser, schema checks, count checks, duplicate checks, and content-protection checks, and both fail closed with row-level diagnostics.
- **D-08:** Keep the metadata artifact keyed by durable identity and independent of the public slug string. Consume the Phase 1 canonical registry at route/render time so a future slug change remains a mapping update rather than a metadata rejoin.

### the agent's Discretion
- Choose the smallest repository-native JSON schema and filenames for the generated metadata snapshot and any evidence ledger.
- Reuse the existing standard-library XLSX/XML reader pattern, TypeScript AST FAQ source reader, `normalizeFaqMetadata`, and verification-script assertion style. Add no package or runtime fetch.
- Choose whether content-preservation checks use normalized snapshots or stable hashes, provided diagnostics identify the `contentId` and changed field.
- Decide the exact CLI flag spelling, output ordering, and focused regression command while retaining deterministic reruns and a clear nonzero failure status.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project scope and acceptance criteria
- `.planning/PROJECT.md` — project value, workbook source-of-truth, static-export, content-fidelity, dependency, and verification constraints.
- `.planning/REQUIREMENTS.md` §Metadata Import — META-01, META-02, and META-03 acceptance requirements.
- `.planning/ROADMAP.md` §Phase 2: Approved Metadata — phase goal, dependencies, and three success criteria.
- `.planning/STATE.md` — current phase position and the Phase 1-to-Phase 2 handoff.

### Prior route identity and migration evidence
- `.planning/phases/01-canonical-faq-routes/01-CONTEXT.md` — durable `contentId`, online-URL evidence, mixed-case preservation, and Phase 2 handoff boundary.
- `.planning/phases/01-canonical-faq-routes/01-01-SUMMARY.md` — committed registry counts, route integration, generated artifacts, and verification evidence.
- `src/faq/generated-en-route-registry.json` — canonical `contentId`/slug records consumed by the metadata join.
- `src/faq/english-route-evidence.json` — approved online URL evidence and source-slug identity records.

### FAQ metadata and route implementation
- `src/faq/en.ts` — authored English `Question`, `Answers`, `Category`, and legacy metadata fields that must remain protected.
- `src/faq/index.ts` — English canonical-slug lookup, legacy overlays, and catalog exports.
- `src/faq/legacyMeta.ts` — existing metadata fallback for records outside the Week04 batch.
- `src/faq/legacyCategories.ts` — existing category overlay behavior.
- `src/app/[lang]/faq/[id]/page.tsx` — detail-route metadata normalization, render path, and static export entry point.
- `src/lib/faqMetadata.ts` — exact title suffix, title budget, and description normalization rules.
- `src/lib/faqMetadata.constants.json` — shared title and description limits.
- `scripts/verify-p2.js` — existing build/output verification conventions and metadata assertions.
- `scripts/generate-faq-route-registry.js` — standard-library workbook reader, TypeScript AST source reader, and deterministic JSON generation pattern.

### Approved Week04 source
- `/Users/longnv/bin/repo/fastgpt-data/Week04/README.md` — W4 delivery scope, 1,195-row batch, online URL authority, title/description length policy, and 731-route visibility findings.
- `/Users/longnv/bin/repo/fastgpt-data/Week04/存量修复-补Meta第2批/FastGPT-存量FAQ补Meta-第2批1195条-V1.0-星触达-20260811.xlsx` — `FAQ Data` sheet with the 1,195 approved metadata rows and the online URL evidence column.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/faq/generated-en-route-registry.json` maps every current English record's durable `contentId` to its canonical slug and preserves the Phase 1 evidence boundary.
- `src/faq/index.ts` already composes authored records with legacy metadata/category overlays and exposes canonical-slug lookup for routes.
- `src/lib/faqMetadata.ts` centralizes the literal ` - FastGPT` suffix, title budget, and description rendering behavior.
- `scripts/generate-faq-route-registry.js` provides a dependency-free XLSX/XML reader and TypeScript AST extraction pattern for deterministic build-time data.
- `scripts/verify-p2.js` and the existing `scripts/verify-*.js` files provide assertion, record-level error, and concise success-log conventions.

### Established Patterns
- Static export consumes committed JSON and TypeScript data at build time; route data cannot depend on a runtime workbook path or network call.
- Generated artifacts are sorted and committed, with a `--check` path suitable for CI drift detection.
- FAQ detail pages resolve the canonical route first, then render the authored record and normalized metadata from one catalog.
- Legacy overlays are explicit source modules, so batch precedence can be represented as a named metadata layer rather than mutating authored records.

### Integration Points
- The metadata artifact joins in `src/faq/index.ts` by `contentId`, before the localized detail route reads `FaqItem` fields.
- `src/app/[lang]/faq/[id]/page.tsx` is the render and static-export boundary for title and description; `Keywords` continues through the FAQ item into the page's keyword display and later SEO consumers.
- A Phase 2 verifier should consume the same registry and metadata artifact as the route layer, then leave canonical URL, hreflang, sitemap, redirects, and final release aggregation to Phases 3–4.

</code_context>

<specifics>
## Specific Ideas

- The Week04 `FAQ Data` sheet has one header plus 1,195 data rows. Its columns include `category`, `question`, `title`, `description`, `keywords`, and the authoritative online URL at column G.
- The approved URL sample is `https://fastgpt.io/faq/What-practical-problems-can-AI`; the online URL column reflects the 08-11 reachable path and therefore joins through Phase 1 evidence.
- The delivery README records title input at 32–50 characters so the template's suffix yields a rendered title at or below 60 characters. It documents English descriptions at 140–155 characters; observed workbook data is nonempty and stays within the shared 160-character rendering ceiling.
- Existing source records include `Title` values with legacy `-Fastgpt` forms, while the approved workbook title is the controlled source for the mapped 1,195 records. The renderer owns the single canonical suffix.
- Phase 1 currently covers 1,400 records: 786 preserved canonical paths, 614 repaired paths, and 149 explicit no-redirect collision-ledger entries. The metadata join must retain those route identities.

</specifics>

<deferred>
## Deferred Ideas

- Canonical and alternate URL emission, FAQ list/related-link alignment, and sitemap projection belong to Phase 3.
- Permanent redirect projection and the single full release verification command belong to Phase 4.
- Metadata editorial rewrites, historical FAQ-body recovery, and a future workbook comparison/reporting product remain outside this phase.
- The 205 repository records outside the Week04 workbook retain their existing fallback metadata until a later approved batch arrives.

</deferred>

---

*Phase: 2-Approved Metadata*
*Context gathered: 2026-08-16*
