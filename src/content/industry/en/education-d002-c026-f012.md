---
title: Document Parsing and Chunking for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c026-f012
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Parsing | Checks
meta_description: Degree Certificates: review parsing for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences

## What this category's data looks like

Degree conferral and certificate information reporting involves three types of materials: degree application forms, thesis review forms, and defense resolutions. They are submitted by training units and departments, and are updated along with batch application, review, and defense milestones. The three types of materials play different roles in document parsing and chunking: degree application forms carry basic fields such as name, quantity, and date; thesis review forms carry review opinions and signatures; defense resolutions carry voting conclusions and receipts. The field characteristic is that the same record is scattered across multiple materials, and name, quantity, and date need to be aligned across materials, while signatures and receipts need to be confirmed one by one. After materials enter this function, they are first parsed and chunked, then flow through the three index states, for retrieval and subsequent processing to locate discrepancies.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), which outputs data rows and index states (parsed, indexing, indexed). The discrepancy list is completed next by retrieval and subsequent processing; the parsing and training task does not produce a discrepancy list or business documents.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Name, quantity, date, and signature fields must be aligned item by item with the ledger | Check whether the data row status is indexed, and check by `chunkSize` whether chunking covers the name, quantity, and date fields |
| Thesis review form | Review opinions and signature and receipt fields must be consistent with the defense resolution | Check that file records and data row identifiers are distinguishable, and check by `chunkSplitter` whether review opinions are split apart |
| Defense resolution | Voting conclusions, date, and signature receipt must be consistent with the degree application form | Check that the rebuild task covers only data rows with completed indexing, and distinguish processing modes by `trainingType` |
| Data row status | Is in one of the three states and is consistent with the interface display | Open the data row and check whether the status is parsed, indexing, or indexed |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the defense resolution. Cause: The two materials are parsed and chunked separately, fields are not aligned across materials, and discrepancies are not located.
- Symptom: The version of the thesis review form is not synchronized, and the review opinions are inconsistent with the version cited by the defense resolution. Cause: Materials are uploaded in separate batches, and old-version data rows are still in the completed indexing state and are recalled.
- Symptom: The defense resolution lacks a signature or receipt but still enters the reporting process. Cause: Successful parsing does not equal retrieval hits; the index state is not checked, and missing fields are not captured by the discrepancy list.

## How to verify the setup

Acceptance for this function: upload one material, observe the data row status transitions and the coverage scope of the rebuild task, confirm that the states are parsed, indexing, and indexed in sequence, and that rebuild covers only data with completed indexing.

Business test: use one real record to find fields inconsistent with the ledger, and check whether name, quantity, and date are consistent among the degree application form, thesis review form, and defense resolution.

- Check file records and data rows separately, confirm that the identifiers of files and data rows are distinguishable, and then compare the name, quantity, and date fields
- View the data rows covered by the rebuild task, confirm that it targets only data with completed indexing, and that data pending indexing does not participate in rebuild
