---
title: Document Parsing and Chunking for Graduate Employment Contracts and Destination Statistics: Find Supporting Evidence
slug: /en/industry/education-d001-c027-f012
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Parsing | Evidence
meta_description: Graduate Destinations: review parsing for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for Graduate Employment Contracts and Destination Statistics: Find Supporting Evidence

## What this category's data looks like

This page focuses on the university employment signing and graduation destination statistics category. The material sources are school-level employment management departments, department archives, and employer receipts, and the update cadence rolls forward by graduation-season batches. When the three types of materials—employment agreements, graduation destination registration forms, and employer certificates—enter the document parsing and chunking function, each plays a different role: employment agreements provide the signing entity and seal fields, graduation destination registration forms provide the destination category and date fields, and employer certificates provide the acceptance opinion and receipt fields. After parsing and chunking, the materials are immediately persisted as visible data rows and bound to a unique data identifier. The field characteristics include name, quantity, date, and signature, for use in subsequent retrieval and basis item generation.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), which outputs data rows and index status (parsed, indexing, indexed). "Basis items that can be traced back to the original text" are then completed by retrieval and subsequent processing.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Fields must include the signing entity, date, and signature, and must be consistent with the current version | Open the data row and check whether the fields after `chunkSize` and `chunkSplitter` chunking fall completely within the original text interval |
| Graduation destination registration form | The destination category, quantity, and date must match the same batch of materials | Check the file record and the data row separately, and confirm the processing mode corresponding to `trainingType` and the index status |
| Employer certificate | The acceptance opinion, receipt, and signature must not be missing | Check whether the data row status is parsed / indexing / indexed, and trace back to the original text paragraph |
| Data row status | It is in one of the three states and is consistent with the interface display | Open the data row to check the status, and confirm that data pending indexing does not participate in recall |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the employment agreement and the graduation destination registration form. Cause: The field definitions of the two materials are not unified, and after parsing and chunking there is no trace-back to the original text for comparison.
- Symptom: The employer certificate lacks a signature or receipt but still enters the data pending indexing. Cause: Persistence as a visible data row occurs as soon as parsing is complete, and the missing signature is not intercepted by field verification.
- Symptom: Material that was just uploaded cannot be found. Cause: The data row is in indexing status, and data pending indexing is naturally isolated at the retrieval layer and is not recalled; successful parsing does not equal a retrieval hit.

## How to verify the setup

This feature's acceptance: Upload one material, observe the data row status transitions and the coverage scope of the rebuild task, confirm the status is parsed / indexing / indexed, and that the rebuild only covers data whose indexing has been completed.

Business test: Ask a basis question that spans materials, see whether the answer provides a traceable source, and check that the number of cited items and the cited text tokens are recorded separately.

- Open the data row to check whether the status is parsed / indexing / indexed, and confirm it is consistent with the interface display.
- Check the file record and the data row separately, and confirm that the rebuild task only covers data whose indexing has been completed.
