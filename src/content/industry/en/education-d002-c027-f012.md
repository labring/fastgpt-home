---
title: Document Parsing and Chunking for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c027-f012
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Parsing | Checks
meta_description: Graduate Destinations: review parsing for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences

## What this category's data looks like

Materials for university employment signing and graduation destination statistics mainly come from employment agreements, graduation destination registration forms, and employer certificates. The update rhythm is concentrated in graduation season and around the time of leaving school, and the field characteristics are concentrated in names, quantities, dates, signatures, and receipts. The employment agreement serves as the original voucher for the signing entity and breach clauses, the graduation destination registration form serves as the summary of destination categories and employer information, and the employer certificate serves as the receipt for acceptance intent and signatures/seals. After the three materials enter document parsing and chunking, they each form verifiable data rows and index states, providing a basis for subsequent field comparison on the same object.

## Configuration and implementation checks

This step is executed by parsing and training tasks (server-side tasks), outputting data rows and index states (parsed, indexing, indexed). The discrepancy list is then completed by retrieval and subsequent processing, and is used to locate fields whose names, quantities, and dates do not match for the same record across two materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Check whether the signing employer name, signing date, and signatures/seals are complete | Check whether the data row state is parsed / indexing / indexed, and separately check the file record and the data row |
| Graduation destination registration form | Check whether the destination category, employer name, and quantity are consistent with the employment agreement | Check the chunking results of `chunkSize` and `chunkSplitter`, and confirm that fields have not been split apart |
| Employer certificate | Check whether the acceptance intent date, receipt, and signature/seal are consistent with the registration form | Check the processing mode corresponding to `trainingType`, and confirm that this material has entered the three-state index flow |
| Parsing and training tasks | Determine whether the rebuild scope covers only data that has already completed indexing | Inspect the data rows covered by the rebuild task, and confirm that data pending indexing does not participate in the rebuild |

## Three common errors

- Symptom: newly uploaded materials cannot be found. Cause: the data row is still in parsed or indexing, and data pending indexing is naturally isolated at the retrieval layer and is not recalled.
- Symptom: the names, quantities, and dates of the same record do not match across two materials. Cause: versions are not synchronized, and after the materials are updated they are not re-parsed, re-chunked, and persisted to the database.
- Symptom: empty data rows are left after training fails. Cause: materials missing signatures or receipts are mistakenly judged as trainable, and the failed data is not edited or deleted in time.

## How to verify the setup

Acceptance of this feature: upload one material, observe the data row state transitions and the coverage scope of the rebuild task, and confirm that state values only transition among the three states parsed / indexing / indexed, and that rebuild is triggered only for data that has already completed indexing.

Business test: use one real record to find fields that are inconsistent with the ledger, focusing on checking names, quantities, dates, and signature receipts.

- Open the data row to check the state, confirm that the interface display is consistent with the three states, and separately check the file record and the data row
- Inspect the data rows covered by the rebuild task, and confirm that changing the model triggers rebuild only for data that has already completed indexing
