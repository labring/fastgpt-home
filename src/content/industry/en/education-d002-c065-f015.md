---
title: Knowledge Base Retrieval for Laboratory Hazardous Chemical Purchasing and Records: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c065-f015
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Retrieval | Checks
meta_description: Lab Chemicals: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Laboratory Hazardous Chemical Purchasing and Records: Compare Documents and Locate Differences

## What this category's data looks like

This page covers three types of materials: laboratory hazardous chemical procurement applications, requisition registrations, and inventory ledgers. Procurement applications record the product name, specification, quantity, application date, and approval signature; requisition registrations record the requisitioner, requisition quantity, requisition date, and receipt signature; inventory ledgers record the balance quantity, inbound date, outbound date, and custodian signature. Materials are updated by batch and by month, field naming differs across forms, and the same record may show inconsistencies in name, quantity, or date, or may not be directly comparable because versions are not synchronized or signature receipts are missing. After entering the knowledge base retrieval function, the three types of materials serve as segments to be recalled: procurement applications and requisition registrations are used to locate discrepancy fields, inventory ledgers are used to provide baseline values, and retrieval results are returned as candidate segments with similarity scores, for subsequent nodes or humans to generate a discrepancy list.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after mode, merge, re-rank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemical procurement application | Name, quantity, date, and approval signature must be consistent with the requisition registration and inventory ledger | In the search test, switch `searchMode`, initiate retrieval using the product name and quantity from the procurement application, record the number of candidates and scores, and check the name, quantity, and date fields in the returned segments |
| Requisition registration | Requisitioner, requisition quantity, requisition date, and receipt signature must be consistent with the inventory ledger | Retrieve once before and once after enabling `usingReRank`, compare the order of the top few candidates, and check whether the requisition quantity and date match the ledger balance records |
| Inventory ledger | Balance quantity, inbound date, outbound date, and custodian signature must be consistent with the procurement application and requisition registration | Adjust `similarity` and `limit`, observe changes in the number of candidates, confirm whether ledger segments are recalled, and record the tokens and array count of the referenced text |
| Discrepancy list | Compare the name, quantity, and date fields of the same object item by item across the two materials | Group the candidate segments returned by retrieval by product name, check the name, quantity, and date field by field, mark inconsistent items, and submit them to the reviewer for confirmation and write-back |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the procurement application and the requisition registration. Cause: The two materials are filled in by different stages, field naming and entry conventions are not unified, and after retrieval hits, no field-by-field comparison is performed.
- Symptom: The inventory ledger version is not synchronized, and the balance quantity is inconsistent with the requisition registration. Cause: Ledger updates lag behind requisition registrations, the candidate segments returned by retrieval come from an old version, and hits and associations are not verified.
- Symptom: The requisition registration lacks a signature or receipt, making the requisition action impossible to confirm. Cause: Signatures and receipts do not enter the knowledge base together with the materials, and retrieval can only return text segments, which cannot replace signature verification.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and similarity scores, then toggle `usingReRank` to see the ordering of the top few, and switch `searchMode` to observe differences between semantic and full-text results.

Business test: use one real record to find fields inconsistent with the ledger, record the number of candidates and scores, check the name, quantity, and date, and submit to the reviewer for confirmation and write-back.

- In the search test, fix `searchMode`, retrieve using the procurement application product name and quantity, and check the name, quantity, and date fields and signature receipts in the candidate segments one by one.
- After enabling `usingReRank`, retrieve again, compare the order of the top few candidates, adjust `similarity` and `limit`, record the referenced text tokens and array count, and mark inconsistent items.
