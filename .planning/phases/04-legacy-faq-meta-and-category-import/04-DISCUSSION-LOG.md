# Phase 4: 存量 FAQ Meta 与分类导入 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `04-CONTEXT.md` — this log preserves the alternatives considered.

**Date:** 2026-08-04
**Phase:** 4-存量 FAQ Meta 与分类导入
**Areas discussed:** Meta overlay identity and fields, category batch conflict policy, immutable write boundary, batch replay and rollback

---

## Meta overlay identity and fields

| Option | Description | Selected |
|--------|-------------|----------|
| URL-only matching | Require an exact source URL hit and leave every other row unresolved. | |
| Phase 1 evidence priority | Resolve URL, then normalized question, then repo key; retain every source row and block ambiguous identities. | ✓ |
| Question-only matching | Use question text as the sole identity and disregard URL evidence. | |

**User's choice:** 自动锁定 Phase 1 的 URL → 问句 → repo key 优先级；保留精确 100 行 source set。

**Notes:** The Meta workbook is `FAQ Data`, 100 data rows, 100 unique questions/URLs, SHA-256 `d9aeb3ede23d29a2c2a65eee61df381366db68c0301df9cedeee2e7ae9489811`. Current evidence resolves 76 rows by question and leaves 24 rows for source confirmation or failure reporting. The overlay writes source `title`, `description`, and `keywords`; source category stays evidence for the separate category operation. English records receive the overlay while existing Chinese locale data and route relationships remain intact.

## Category batch conflict policy

| Option | Description | Selected |
|--------|-------------|----------|
| Partial full-batch write | Apply rows with a successful match and skip conflict rows. | |
| Fail-closed full batch | Dry-run all 2,000 rows; any identity conflict blocks all writes and emits a complete failure list. | ✓ |
| Manual conflict suppression | Let an operator remove conflict rows from the source before import. | |

**User's choice:** 自动锁定 full 2,000-row category batch fail-closed。

**Notes:** Phase 1 currently reports 606 conflict rows: 1,394 matched, 585 `unmatched-source`, 20 `duplicate-url`, and 1 `url-question-conflict`. The full batch therefore records `blocked` and zero writes. Results retain all 2,000 rows, the nine stable category IDs, original category, confidence, review flag, source identity, and import result.

## Explicit subset allowlist

| Option | Description | Selected |
|--------|-------------|----------|
| Implicit matched filter | Process every row whose computed status is `matched`. | |
| Explicit source-row allowlist | Submit source SHA/sheet/row identities and an allowlist digest; process exactly those rows in an independent batch. | ✓ |
| Operator-selected URL list | Select URLs without preserving source row identity. | |

**User's choice:** 自动锁定 allowlist-only subset processing。

**Notes:** An allowlist cannot hide rows from the full-batch report. Every allowlisted row is revalidated against identity, category ID/locale, and body/Question/slug/URL snapshots. Allowlist changes create a new batch and a new dry-run.

## Immutable write boundary

| Option | Description | Selected |
|--------|-------------|----------|
| Metadata plus identity edits | Permit the importer to normalize slug/URL while applying metadata and categories. | |
| Metadata/category overlay only | Write Title/Description/Keywords and the stable category ID; keep body, Question, repo key/slug, and URL read-only with before/after hashes. | ✓ |
| Snapshot-only report | Produce reports without any apply capability. | |

**User's choice:** 自动锁定 body/Question/slug/URL immutability。

**Notes:** URL normalization is evidence-only. Existing historical case-sensitive slug forms remain stable and their known warning remains visible in audit output. Pre-write snapshots include all writable and immutable fields so every apply can prove the identity boundary.

## Batch replay and rollback

| Option | Description | Selected |
|--------|-------------|----------|
| Ad hoc script reruns | Rerun the importer and infer whether a prior write happened from current file contents. | |
| Immutable batch manifest | Require batch ID, source fingerprint, allowlist digest, pre-write row snapshots, result manifest, idempotent replay, and matching-batch rollback. | ✓ |
| Manual backup replacement | Restore a copied data file without validating the originating batch. | |

**User's choice:** 自动锁定 dry-run → apply → manifest/snapshot → rollback lifecycle。

**Notes:** Dry-run always performs zero writes. The same batch ID plus identical source fingerprint, allowlist, and snapshot is an `idempotent-no-op`; any changed fingerprint or allowlist requires a new batch and dry-run. Rollback accepts only the matching batch and verified snapshot digest, restores overwritten Meta/category fields, and proves immutable fields remain unchanged.

## the agent's Discretion

- XLSX parser, generated-data layout, manifest serialization, hash canonicalization, lock/transaction primitive, and test file split.
- Evidence source and resolution procedure for the 24 currently unmatched Meta rows, subject to the locked identity priority and fail-closed gate.

## Deferred Ideas

- Remaining 1,900 legacy Meta rows and any later Meta batches.
- Body rewriting, slug normalization, redirects, deletion/merge, and keyword strategy redesign.
- New FAQ objects or placeholder records for inventory rows absent from the repository.
