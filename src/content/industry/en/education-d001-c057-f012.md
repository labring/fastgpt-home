---
title: Document Parsing and Chunking for National Key Research and Development Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c057-f012
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Parsing | Evidence
meta_description: National R&D Grants: review parsing for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for National Key Research and Development Applications: Find Supporting Evidence

## What this category's data looks like

This category's materials for National Key R&D Program project applications include the project application form, the budget application form, and the cooperation agreement. The sources are the current versions submitted by each participating unit, and the update cadence changes with application milestones and internal revisions within the consortium. The project application form contains research objectives, task breakdown, assessment indicators, participating personnel, and signatures/seals; the budget application form contains subject amounts, sources and self-funding ratios, and calculation basis; the cooperation agreement contains task division, funding allocation, intellectual property ownership, and the signature page. When the three types of materials enter this feature, the project application form and the budget application form serve as the primary basis, and the cooperation agreement serves as cross-corroborating material; each is parsed into data rows and bound to a unique data identifier for subsequent retrieval and comparison. Field characteristics center on names, quantities, dates, signatures, and receipts. The same record often shows inconsistent names, quantities, and dates between the project application form and the budget application form; the cooperation agreement signature page may lack signatures or receipts; and when versions are not synchronized, old-version entries may still be recalled.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), which outputs data rows and index status (parsed, indexing, indexed). Basis entries that can be traced back to the original text are then handled by retrieval and subsequent processing. After parsing is complete, parsed chunks are immediately persisted as visible data rows and bound to a unique data identifier; the index transitions through the three states parsed, indexing, and indexed, and data pending indexing does not participate in recall.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Fields, dates, and signatures must match the budget application form and the cooperation agreement, and names and quantities must not conflict | Check the names, quantities, and dates in the project application form and the budget application form, and check whether signatures and receipts are complete; check whether the data row status is parsed, indexing, or indexed, and record the values of `chunkSize` and `chunkSplitter` |
| Budget application form | Subject amounts, sources, and self-funding ratios must be consistent with the project application form, and dates must not be earlier than the cooperation agreement signing date | Compare subject amounts, sources, self-funding ratios, and dates item by item between the budget application form and the project application form; confirm the version is the current version, and check whether the data row has completed indexing |
| Cooperation agreement | Task division, funding allocation, and intellectual property ownership must correspond to the project application form and the budget application form, and the signature page must not lack signatures or receipts | Check the signatures and receipts on the cooperation agreement signature page, and compare the task division and funding allocation entries; check whether the data rows covered by the rebuild task contain only indexed data, and record `trainingType` |
| Data rows and index status | Is in one of the three states and is consistent with the interface display; data pending indexing does not participate in recall | Open the data rows to check the status, separately check the identifiers of the file record and the data row, and confirm that the rebuild scope covers only indexed data |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the project application form and the budget application form, and this is questioned when replying to parents or writing it into a proposal. Cause: The versions of the two materials are not synchronized, and old-version entries are still recalled.
- Symptom: The cooperation agreement signature page lacks signatures or receipts, and the application materials are returned for correction. Cause: The material update cadence is out of step with the internal signing process, and receipts are not submitted together with the version.
- Symptom: Newly uploaded materials cannot be found, or empty data rows remain after training fails. Cause: Successful parsing does not mean retrieval will definitely hit; the index status must also be checked; data pending indexing is naturally isolated at the retrieval layer.

## How to verify the setup

Feature acceptance: Upload one material, observe the data row status transitions and the coverage scope of the rebuild task, confirm that the status passes through parsed, indexing, and indexed in sequence, that the rebuild covers only indexed data, and check the values of `chunkSize`, `chunkSplitter`, and `trainingType`.

Business test: Ask a cross-material basis question and see whether the answer provides traceable sources, and whether the sources can be traced back to the original text entries of the project application form, the budget application form, or the cooperation agreement.

- Open the data rows to check the status, confirm it is consistent with the interface display, and separately check the identifiers of the file record and the data row.
- Check the data rows covered by the rebuild task, confirm that only indexed data is covered, and that data pending indexing does not participate in the rebuild chain.
