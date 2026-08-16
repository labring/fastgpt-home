# Phase 2: Approved Metadata - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-16
**Phase:** 2-Approved Metadata
**Areas discussed:** workbook join key, exact batch coverage, title suffix policy, description/keywords fidelity, authored-content protection, metadata precedence, regeneration and failure strategy

All choices below were selected automatically under `--auto` using the recommended first option. No interactive prompt was used.

## Workbook join key

| Option | Description | Selected |
|--------|-------------|----------|
| Online URL slug → Phase 1 registry → `contentId` | Use the approved reachable `/faq/<slug>` path as the stable workbook join, then resolve the durable content identity. | ✓ |
| Question text → authored record | Match editorial question strings against source questions. | |
| Spreadsheet row number → authored record | Treat the workbook's numbering as the source identity. | |

**User's choice:** `[auto]` Online URL slug → Phase 1 registry → `contentId` (recommended default)
**Notes:** The Week04 README identifies the online URL column as authoritative. Phase 1 made `contentId` the durable identity.

## Exact batch coverage and duplicate handling

| Option | Description | Selected |
|--------|-------------|----------|
| Fail closed at exactly 1,195 unique mapped rows | Require one row and one content identity per approved record; report duplicate, unknown, missing, and malformed entries with row context. | ✓ |
| Write valid rows and report partial failures | Keep a partial artifact when some rows fail. | |
| Trust the workbook count and defer validation | Accept the sheet shape and discover mapping gaps during rendering. | |

**User's choice:** `[auto]` Fail closed at exactly 1,195 unique mapped rows (recommended default)
**Notes:** META-01 requires exact coverage and failures for duplicate or unmapped rows.

## Title suffix policy

| Option | Description | Selected |
|--------|-------------|----------|
| Import the suffix-free base and use the existing normalizer once | Preserve the approved title base, append one exact ` - FastGPT`, and enforce the shared 60-character budget. | ✓ |
| Import a pre-suffixed rendered title | Treat workbook text as final HTML title and bypass the shared normalizer. | |
| Apply a custom per-row suffix rule | Let each row decide whether and how the brand suffix is appended. | |

**User's choice:** `[auto]` Import the suffix-free base and use the existing normalizer once (recommended default)
**Notes:** Week04 explicitly sizes title input for the template suffix; current source records contain legacy suffix variants.

## Description and keyword fidelity

| Option | Description | Selected |
|--------|-------------|----------|
| Preserve approved source strings and apply established rendering policy | Commit wording, punctuation, ordering, and keyword text exactly; use the existing renderer only for its shared whitespace/length boundary. | ✓ |
| Rewrite and normalize all text during import | Edit wording, punctuation, keyword order, or separators to fit a new style. | |
| Keep metadata only in the workbook | Leave the static catalog dependent on the external file at build time. | |

**User's choice:** `[auto]` Preserve approved source strings and apply established rendering policy (recommended default)
**Notes:** META-02 calls for approved description and keyword output; committed data keeps builds independent of the external workbook path.

## Authored-content protection

| Option | Description | Selected |
|--------|-------------|----------|
| Metadata-only overlay with record-level snapshots or hashes | Change `Title`, `Description`, and `Keywords` through a `contentId` layer and prove `Question`, `Answers`, and `Category` stability. | ✓ |
| Rewrite source FAQ objects with workbook rows | Replace authored FAQ records as part of metadata import. | |
| Trust a manual diff after generation | Leave content protection to a reviewer outside the runnable checks. | |

**User's choice:** `[auto]` Metadata-only overlay with record-level snapshots or hashes (recommended default)
**Notes:** META-03 requires verbatim authored content preservation; source ownership remains in `src/faq/en.ts`.

## Metadata precedence for the full catalog

| Option | Description | Selected |
|--------|-------------|----------|
| Workbook wins for 1,195 mapped records and legacy fallback remains for 205 records | Apply the approved batch selectively while keeping every current FAQ renderable. | ✓ |
| Replace every record with workbook-derived metadata | Treat the workbook as a complete catalog snapshot. | |
| Legacy metadata wins whenever a value already exists | Preserve old overlays over approved Week04 values. | |

**User's choice:** `[auto]` Workbook wins for 1,195 mapped records and legacy fallback remains for 205 records (recommended default)
**Notes:** The workbook covers the reachable batch while Phase 1 retains 1,400 authored identities.

## Regeneration and failure strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Dependency-free `--write` / `--check`, deterministic output, fail closed | Rebuild from the workbook, verify the committed snapshot without it, and stop on any mapping or fidelity error. | ✓ |
| Best-effort partial writes | Emit whatever rows parse and leave repair work for a later pass. | |
| Runtime workbook loading | Resolve metadata from the external spreadsheet during requests or builds. | |

**User's choice:** `[auto]` Dependency-free `--write` / `--check`, deterministic output, fail closed (recommended default)
**Notes:** Existing route generation and verification scripts use standard-library readers, committed JSON, and nonzero assertion failures.

## the agent's Discretion

- Generated artifact schema, filenames, and evidence-ledger shape.
- Exact standard-library parser details, snapshot-versus-hash implementation, CLI flag spelling, and focused test command.
- Output ordering and diagnostic formatting, provided reruns are idempotent and failures identify the affected row/content ID.

## Deferred Ideas

- SEO graph, sitemap, hreflang, and internal-link integration remain Phase 3 work.
- Redirect projection and final release gate aggregation remain Phase 4 work.
- Historical body recovery, editorial title/question rewrites, and future workbook drift-reporting belong to later scope.
