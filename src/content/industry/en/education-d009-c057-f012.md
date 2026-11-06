---
title: Document Parsing and Chunking for National Key Research and Development Applications: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c057-f012
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Parsing | Multilingual
meta_description: National R&D Grants: review parsing for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for National Key Research and Development Applications: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the National Key R&D Program project application scenario. Category materials include three types: project applications, budget applications, and cooperation agreements. Project applications carry research objectives, task decomposition, and assessment indicators; budget applications carry funding categories, calculation bases, and annual disbursements; cooperation agreements carry the division of labor among participating units, intellectual property ownership, and signed receipts. The three types of materials are often submitted in parallel in multilingual versions, sourced from aggregation by participating units and internal circulation within the consortium, with update rhythms concentrated during application windows and budget adjustment nodes. When materials enter the document parsing and chunking function, the multilingual body text of project applications and cooperation agreements is split into retrievable data rows, and the tables and numeric fields in budget applications likewise become data rows. After chunking, terminology and translated names are handled by retrieval and subsequent processing, forming a unified terminology table and comparison draft. In terms of field characteristics, the three types of materials share project name, participating units, responsible person, start and end dates, funding amounts, and signature fields. The name, quantity, and date of the same record in different materials must be traceable back to the original text.

## Configuration and implementation checks

This step is executed by parsing and training tasks (server-side tasks), outputting data rows and index status (parsed, indexing, indexed). The "unified terminology table and comparison draft" is then completed by retrieval and subsequent processing. After parsing is completed, parsed chunks are immediately persisted as visible data rows and bound to a unique data identifier. The index transitions through three states; data pending indexing does not participate in recall. When changing models, only data with completed indexing is rebuilt.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application | The project name, participating units, responsible person, start and end dates, and signature fields are written consistently in the application and the budget application, and quantities and dates can be traced back to the original text | Open the data row and check whether the status is parsed / indexing / indexed. Separately verify the file record and the data row, and check whether the chunks corresponding to `chunkSize` and `chunkSplitter` cover the signature page and date fields |
| Budget application | The funding categories, calculation bases, and annual disbursement amounts are consistent with the corresponding records in the project application. When versions are not synchronized, the latest persisted data row prevails | Check whether the data rows covered by the rebuild task contain only data with completed indexing, confirm that `trainingType` matches the processing mode, and check whether table fields are completely split |
| Cooperation agreement | The names of participating units, intellectual property ownership, signatures, and receipts match between the cooperation agreement and the project application. If signatures or receipts are missing, the record cannot be considered consistent | Separately verify the file record and the data row, confirm that the name, quantity, and date of the same record in the two materials can be traced back to the original text, and check whether the index status is indexed |
| Multilingual materials and terminology | The same term is written consistently throughout, translated names can be traced back to the original text, and the terminology table and comparison draft cover the three types of materials | Sample three terms and check whether their writing is consistent throughout. Verify that the data row status matches the interface display, and confirm that data pending indexing does not participate in recall |

## Three common errors

- Symptom: Newly uploaded materials cannot be found. Cause: The data row is in parsed or indexing status. Data pending indexing is naturally isolated at the retrieval layer and is not recalled; you must wait for indexing to complete.
- Symptom: The name, quantity, and date of the same record do not match between two materials. Cause: Versions are not synchronized, old data rows have not been cleaned up, retrieval hits old records, and the terminology table does not cover the latest version.
- Symptom: Empty data rows remain after a training failure. Cause: Orphan data left by an interrupted training has not been cleaned up. You need to directly edit or delete the failed data; rebuilds target only data with completed indexing.

## How to verify the setup

Acceptance for this function: upload one material and observe the data row status transitions and the coverage scope of the rebuild task. Verify this function's own output: whether the data row is in one of the three states parsed / indexing / indexed and matches the interface display, whether the identities of the file record and the data row are distinguishable, and whether the rebuild task covers only data with completed indexing. Separately verify the file record and the data row, check the chunking and training modes corresponding to `chunkSize`, `chunkSplitter`, and `trainingType`, and confirm that the initial training covers data pending indexing while rebuilds target only data with completed indexing.

Business test: sample three terms and check whether their writing is consistent throughout, confirm that translated names can be traced back to the original text, and verify the unified terminology table and comparison draft before external release.

- Open the data row and check the status, confirming it is one of parsed / indexing / indexed and matches the interface display; data pending indexing does not participate in recall.
- Separately verify the file record and the data row, and check whether the data rows covered by the rebuild task contain only data with completed indexing. After changing models, the rebuild scope does not include data pending indexing.
