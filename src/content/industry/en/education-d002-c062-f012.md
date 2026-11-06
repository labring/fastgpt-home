---
title: Document Parsing and Chunking for Research Ethics Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c062-f012
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Parsing | Checks
meta_description: Research Ethics: review parsing for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for Research Ethics Review: Compare Documents and Locate Differences

## What this category's data looks like

In the research ethics review scenario, ethics review applications, informed consent form templates, and risk assessment forms constitute the three core types of materials for the same record, respectively carrying the research protocol, subject authorization, and risk control information. The materials enter the parsing and chunking stage in document form. After parsing is complete, they are immediately persisted as visible data rows and bound to a unique data identifier, then enter the three-state index flow. Field characteristics are concentrated in four categories: name, quantity, date, and signature. Version updates and receipt supplements are frequent, and field values of the same record across different materials need to be compared item by item. When materials enter this function, the review application serves as the main record anchor, while the informed consent form template and risk assessment form serve as comparison materials. Together, the three support discrepancy localization.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), outputting data rows and index status (parsed, indexing, indexed). The "discrepancy list" is then completed by retrieval and subsequent processing.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The name, quantity, date, and signature fields must be consistent item by item with the informed consent form template | Open the data row to check the status, confirm it is in one of the three states parsed / indexing / indexed, and compare field values |
| Informed consent form template | The version date and signature field must be synchronized with the review application and risk assessment form | Check the file record and data row separately, and inspect for unsynchronized versions or missing signature receipts |
| Risk assessment form | The risk quantity and assessment date must be consistent with the review application | View the data rows covered by the rebuild task, and confirm that only data with completed indexing is covered |
| Data row status | It is in one of the three states and consistent with the interface display | Open the data row to check the status, and confirm that parsed / indexing / indexed is consistent with the interface |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the review application and the informed consent form template. Cause: The two materials are parsed and persisted separately, and the fields are not cross-compared.
- Symptom: The version of the informed consent form template is not synchronized, and the old version's signature field is missing. Cause: After the version update, parsing and chunking were not redone, and the data row still points to the old content.
- Symptom: The risk assessment form lacks a signature or receipt and cannot be recalled during retrieval. Cause: Data pending indexing is naturally isolated at the retrieval layer, and it cannot be recalled until indexing is complete.

## How to verify the setup

Acceptance for this function: Upload one material, observe the data row status flow and the coverage scope of the rebuild task, verify that the three states parsed / indexing / indexed are consistent with the interface, and check that the rebuild only covers data with completed indexing.

Business test: Use one real record to find fields inconsistent with the ledger, and hand them to the reviewer for confirmation and write-back.

- Check the file record and data row separately, confirm that the identifiers of the file and the data row are distinguishable, and record the values of `chunkSize` and `chunkSplitter`.
- View the data rows covered by the rebuild task, confirm that only data with completed indexing is covered, and verify the processing mode corresponding to `trainingType`.
