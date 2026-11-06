---
title: Document Parsing and Chunking for National Key Research and Development Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c057-f012
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Parsing | Checks
meta_description: National R&D Grants: review parsing for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for National Key Research and Development Applications: Compare Documents and Locate Differences

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. They are provided by the lead unit, participating units, and the finance department respectively, uploaded in batches according to application milestones, and versions change frequently. The project application form contains the project name, task setup, participating personnel, start and end dates, and the signature and seal page; the budget application form contains subject amounts, funding sources, disbursement plans, and signature fields; the cooperation agreement contains partner names, task division, funding allocation, signing date, and receipt. After the three types of materials enter the parsing and training tasks, each becomes an independent data row, jointly supporting subsequent retrieval and comparison. Field characteristics manifest as the same record appearing repeatedly across multiple materials, with names, quantities, dates, and signature statuses needing to be aligned item by item. Material sources are scattered and update rhythms differ; unsynchronized versions and missing signatures or receipts are the main sources of discrepancies.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), outputting data rows and index status (parsed, indexing, indexed). The "discrepancy list" is then completed by retrieval and subsequent processing. After parsing is completed, parsing and chunking are immediately persisted as visible data rows and bound to a unique data identifier; the index transitions through three states, and data pending indexing does not participate in recall.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Name, quantity, date, and signature fields align item by item across the three materials | Verify the project name, number of tasks, start and end dates, and signature and seal page by field, confirm the data row status is parsed / indexing / indexed, and check the chunking results of `chunkSize` and `chunkSplitter` |
| Budget application form | Subject amounts, funding sources, disbursement plans, and signature fields are consistent with the project application form and cooperation agreement | Compare budget subjects with the cooperation agreement's funding allocation, verify dates and signature fields, confirm the data row status matches the interface display, and check the processing mode corresponding to `trainingType` |
| Cooperation agreement | Partner names, task division, funding allocation, signing date, and receipt are complete | Verify the identity identifiers of the file record and the data row separately, confirm the partner names and quantities are consistent across the two materials, and check whether the receipt is missing |
| Data row status | Is in one of the three states and matches the interface display | Open the data row to verify the status, confirm that data pending indexing does not participate in recall, and that changing the model only rebuilds data that has completed indexing |

## Three common errors

- Symptom: The same project name is written differently in the project application form and the cooperation agreement, and quantities and dates do not match. Cause: The materials are provided by different units, versions are not synchronized, and fields are not compared item by item after parsing.
- Symptom: The subject amounts in the budget application form are inconsistent with the funding allocation in the cooperation agreement, and the disbursement plan dates are misaligned. Cause: The two materials have different update rhythms, and the old version is still in the indexing state and is mistakenly used.
- Symptom: The cooperation agreement lacks a signature or receipt, but the data row still shows completed indexing. Cause: The signature field was not included in field verification; successful parsing does not equal a retrieval hit, and the index status was not rechecked.

## How to verify the setup

This feature's acceptance: Upload one material, observe the data row status transitions and the coverage scope of the rebuild task, confirm that the three states parsed / indexing / indexed match the interface display, and that the rebuild only covers data that has completed indexing.

Business test: Use one real record to find fields inconsistent with the ledger, verify the identity identifiers of the file record and the data row separately, record the inconsistent fields, and hand them to the reviewer for confirmation and write-back.

- Open the data row to verify the status, confirm it is in one of parsed / indexing / indexed, and that data pending indexing does not participate in recall.
- Verify the identity identifiers of the file record and the data row separately, and check whether the data rows covered by the rebuild task only include data that has completed indexing.
