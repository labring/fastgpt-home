---
title: Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c059-f015
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Retrieval | Checks
meta_description: Research Finance: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on the research funding budget adjustment and reimbursement scenario; the materials include three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications are initiated by the project team, reimbursement forms are filled in by the handler, and contract invoices are provided by the supplier or finance. When the three material categories enter the knowledge base retrieval and recall function, they are first split into searchable fragments by field, date, and signature, and participate in recall as candidate sources. The update cadence changes with approval flow and invoice receipt; field characteristics include name, quantity, date, signature, and version number. The retrieval service is responsible for recalling material fragments as candidates for subsequent nodes or manual comparison.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit truncation). The "discrepancy list" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Name, quantity, date, and signature are consistent between the application and the ledger | In the search test, switch `searchMode` to semantic, full-text, or hybrid, and check whether the candidate fragments and scores cover the application fields |
| Reimbursement form | Name, quantity, date, and signature are consistent between the reimbursement form and the contract invoice | Compare the order of the top few candidates before and after enabling `usingReRank`, and confirm whether reimbursement field fragments rank first |
| Contract invoice | Version and receipt are synchronized; missing signatures or receipts can be located | Check the number of returned candidates and scores, and use `similarity` and `limit` together to determine whether key fragments are retained after truncation |
| Ledger record | When the name, quantity, and date of the same record do not match across two materials, the field can be located | Rewrite the question for one record and test once each, record the number of candidates and scores, and mark the inconsistent fields |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: Candidate fragments come from different material versions and are not compared after field alignment.
- Symptom: The contract invoice version is not synchronized, and old-version fragments are still recalled. Cause: After the material is updated, it does not re-enter retrieval, and candidates still point to old fragments.
- Symptom: Fields missing signatures or receipts are omitted from candidates. Cause: After similarity filtering and citation limit truncation, key fragments are not retained.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the top few.

Business test: use one real record to find fields inconsistent with the ledger.

- In the search test, switch `searchMode` and compare the number of candidates and scores under the semantic, full-text, and hybrid modes.
- Compare the order of the top few before and after enabling `usingReRank`, and separately record the number of items in the citation array and the candidate content after `limit` truncation.
