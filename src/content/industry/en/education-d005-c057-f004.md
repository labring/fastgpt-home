---
title: Vector Models and Indexes for National Key Research and Development Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c057-f004
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Vector Indexes | Versions
meta_description: National R&D Grants: review vector indexes for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for National Key Research and Development Applications: Maintain Document Versions and Changes

## What this category's data looks like

Application materials for National Key R&D Program projects include the project application form, budget application form, and cooperation agreement. Fields cover name, quantity, date, signature, and receipt. When the materials enter the vector model and indexing function, the project application form serves as the primary retrieval source, while the budget application form and cooperation agreement serve as cross-verification sources. Each generates vectors that are stored in the vector database, and the original data is stored in the business database data table with index fields recording multiple vector identifiers. The update cadence advances with the application stages: guideline release, preliminary application, formal application, budget review, and agreement signing. The field characteristic is that the same record may have inconsistent names, quantities, and dates across the three materials, with versions not synchronized or missing signatures and receipts. The index status is based on indexed and rebuild task records. During retrieval, vectors are first recalled and then merged back to the original data by identifier, with the highest score taken for the same group of data.

## Configuration and implementation checks

This step is executed by the indexing service and the vector database, outputting vectors and index status (whether recall is possible and whether the same group of data is merged). The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials).

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the name, quantity, date, and signature are consistent with the budget application form and cooperation agreement, and whether the versions are synchronized | Open the data row and check the index fields, retrieve the same record to see whether the same group is merged, and check whether `limit` cover the cited text |
| Budget application form | Whether the name, quantity, and date of the same record do not match the project application form, and whether signatures or receipts are missing | Check the data range covered by the rebuild task records, and after retrieval verify whether the number of citations and the tokens of the cited text are recorded separately |
| Cooperation agreement | Whether the date and signature receipt are complete, whether the old version is traceable, and whether citations are synchronized | In the knowledge base settings, verify that the index model is consistent with the model actually used by the knowledge base, and sample a data row to see whether multiple vector identifiers are all present |
| Data row index field | Whether multiple vector identifiers for one piece of data are all present, and whether the status is indexed | Open a data row and check the index fields, and after changing the model, trigger a rebuild only for data that has already been indexed |

## Three common errors

- Symptom: duplicate entries appear in retrieval results. Inspect the following: the same record has inconsistent names, quantities, and dates between the project application form and the budget application form, and the vector identifiers are not merged into the same group of data.
- Symptom: recall quality drops after changing the model. Inspect the following: the rebuild task records only cover data that has already been indexed, the old index is not synchronized, and the version number and citations are not updated in linkage.
- Symptom: a data row has content but cannot be retrieved. Inspect the following: the cooperation agreement is missing a signature or receipt, the index field is empty, and the vector is not generated or not written to the vector database.

## How to verify the setup

Acceptance of this function: sample a data row and check the index fields to confirm that multiple vector identifiers are all present and the status is indexed; then retrieve once more to see whether the same group of data is merged and whether the highest score is taken.

Business test: change one piece of content and see whether the version number and citations are updated in synchronization; verify that the number of citations and the tokens of the cited text are recorded separately, and that `limit` only constrain the citation content budget.

- In the knowledge base settings, verify that the index model is consistent with the vector model actually used by the knowledge base, and check the data range covered by the rebuild task records.
- Open a data row and check the index fields to confirm that multiple vector identifiers are all present, and after retrieval check whether the same group of data is merged and whether the old version is traceable.
