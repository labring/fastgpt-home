---
title: Vector Models and Indexes for School Teacher Training Credits: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c013-f004
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Vector Indexes | Versions
meta_description: Teacher Credits: review vector indexes for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for School Teacher Training Credits: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of credit management for primary and secondary school teacher training. Materials include training notices, credit recognition forms, and participant rosters, along with the corresponding receipts and signature pages. The training notice provides the training name, start and end dates, and credit hours; the credit recognition form records the teacher's name, ID document number, recognized credits, and recognition date; the participant roster lists participants, their units, and sign-in status. The three types of materials often enter the knowledge base as scanned copies, tables, and body text in mixed layouts, and field names, date formats, and signature positions are not fully consistent across sources. The update cadence follows training batches, supplementary entries, and correction notices; a single training session may produce multiple versions of the notice, roster, recognition form, and receipt. When materials enter this feature, the body text and tables are used to generate the vector index, the signature and receipt pages are retained as attachments with the original data, and the index fields record the multiple vector identifiers corresponding to the same data row, so that during retrieval the original data can be merged by identifier.

## Configuration and implementation checks

This step is executed by the indexing service and the vector database, and outputs vectors and index status (whether recall is possible and whether data in the same group is merged). The "version ledger and change records" are then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials).

| Object | Check | Verification action |
| --- | --- | --- |
| Index model | Consistent with the vector model actually used by the knowledge base | Check the index model in the knowledge base settings |
| Training notice | Training name, start and end dates, credit hours, and document number are consistent between the notice body and the attachment | Compare the notice body with the attachment, and check the training name, start and end dates, credit hours, and document number |
| Credit recognition form | Teacher name, recognized credits, recognition date, and signature field are consistent between the form and the receipt | Compare the recognition form with the receipt, and check the name, recognized credits, recognition date, and signature field |
| Participant roster | Participant names, units, sign-in status, and roster version are consistent | Compare the roster with the sign-in sheet, and check names, units, sign-in status, and roster version |

## Three common errors

- Symptom: The same teacher's name and unit are written differently in the credit recognition form and the participant roster. Inspect the following: The two materials were filled in at different stages and were not proofread against the same field conventions.
- Symptom: The training notice date and the credit recognition date do not match. Inspect the following: After the notice version was updated, the recognition form still referenced the old date, and the versions were not synchronized.
- Symptom: A participant roster has records but cannot be retrieved. Inspect the following: The data row index fields do not cover all vector identifiers, or after a model change the rebuild task did not cover that data scope.

## How to verify the setup

This feature's acceptance check: sample one data row and inspect the index fields to confirm that all multiple vector identifiers for that row are present and the status is indexed; then run a retrieval to see whether data in the same group is merged, and check `defaultToken`, `maxToken`, and the rebuild task records.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- Open a data row and check whether the multiple vector identifiers for that data in the index fields are complete and whether the status is indexed.
- Review the rebuild task records to confirm the data scope covered by the rebuild after the model change, and check the values of `defaultToken` and `maxToken`.
