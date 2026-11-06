---
title: Vector Models and Indexes for Research Project Annual Progress and Acceptance: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c060-f004
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Vector Indexes | Versions
meta_description: Research Progress: review vector indexes for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for Research Project Annual Progress and Acceptance: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of annual progress and acceptance of research projects; the materials include annual progress reports, mid-term review materials, and acceptance reports. These materials come from the project team and the management department, and their update cadence is batch submission by year, by mid-term milestone, and by acceptance milestone; the fields include project name, number of indicators, start and end dates, signatures, and receipts. When the materials enter the vector model and indexing feature, the annual progress report and mid-term review materials serve as process support, while the acceptance report serves as the conclusive basis; together the three determine the range of raw data that can be recalled in the knowledge base and the candidate set for citation trimming. If the name, quantity, or date of the same record differs across materials, it will directly affect the recall results after indexing and citation synchronization.

## Configuration and implementation checks

This step is executed by the indexing service and the vector database, and outputs vectors and index status (whether recall is possible, whether data in the same group is merged). The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials). The indexing service and vector database are only responsible for vectors and index status, and do not generate glossaries, comparison drafts, or version ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Check whether the project name, number of indicators, start and end dates, and signature receipts are consistent with the mid-term review materials | Open the knowledge base settings to check the index model; view the index fields of the data row; confirm the status is indexed |
| Mid-term review materials | Check whether the name, quantity, and date of the same record match the annual progress report and the acceptance report | Run a retrieval to see whether data in the same group is merged; check the fields corresponding to `defaultToken` and `maxToken` |
| Acceptance report | Check whether signatures and receipts are complete, and whether the version number uniquely corresponds to the current version | View the data range covered by the rebuild task records; confirm the old version is traceable and citations are synchronized |
| Data row index fields | Check whether multiple vector identifiers of one piece of data are all present, and whether data in the same group can be merged | Open a data row to check the index fields; after retrieval, see whether duplicate entries are merged |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Inspect the following: the materials are updated separately, versions are not synchronized.
- Symptom: duplicate entries appear in retrieval results, and data in the same group is not merged. Inspect the following: the data row index fields are missing some vector identifiers, or the rebuild task did not cover all data that has completed indexing.
- Symptom: the acceptance report lacks signatures or receipts, and citation trimming cannot obtain supporting materials. Inspect the following: the materials entered indexing before being completed, the version ledger did not record the changes, and the old version cannot be traced.

## How to verify the setup

Feature acceptance: sample a data row to check the index fields and confirm that multiple vector identifiers are all present; then run a retrieval to see whether the same group is merged, whether the status is indexed, and view the rebuild task records.

Business test: change one piece of content and see whether the version number and citations are updated synchronously; check the tokens of the reference text for `limit`, and record the array length separately.

- In the knowledge base settings, check that the index model is consistent with the vector model actually used by the knowledge base, and open a data row to check the index fields.
- View the data range covered by the rebuild task records, and confirm that after changing the model, rebuild is triggered only for data that has completed indexing.
