---
title: Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Find Supporting Evidence
slug: /en/industry/education-d001-c059-f015
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Retrieval | Evidence
meta_description: Research Finance: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Find Supporting Evidence

## What this category's data looks like

This page addresses the category of research funding budget adjustments and reimbursements. The materials include three types: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record the reason for adjustment, account, amount, approval date, and signature; reimbursement forms record expense details, quantity, date, handler signature, and receipt; contract invoices record the contract name, invoice number, invoice date, and seals of both parties. The three types of materials are updated in batches, and the current effective version prevails. When entering the knowledge base retrieval and recall function, budget adjustment applications, reimbursement forms, and contract invoices are each split and indexed as independent sources, becoming the sources of candidate snippets; the retrieval service recalls by semantic, full-text, or hybrid mode, then undergoes merging, reranking, filtering, and limit truncation to obtain evidence entries that can be traced back to the original text, for use in answers or writing plans.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merging, reranking, filtering, and limit truncation). Evidence entries that can be traced back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | The reason for adjustment, account, amount, approval date, and signature must be consistent with the current version | In the search test, switch `searchMode`, compare semantic and full-text candidates, and check whether the hit snippets contain the approval date and signature field |
| Reimbursement form | The quantity, date, handler signature, and receipt of expense details must match the contract invoice | Compare the ranking of the top few results before and after enabling `usingReRank`, and check whether the candidates retain the original text of quantity and date |
| Contract invoice | The contract name, invoice number, invoice date, and seals must be consistent with the reimbursement form records | Record the number of candidate entries and the `similarity` score, and check whether the invoice number and invoice date appear in the quoted text |
| Citation limit | After truncation, key snippets of the original text are still retained; the number of entries and the citation budget are recorded separately | Record the array length separately, and check whether the tokens of the quoted text reach the `limit` budget |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The versions of the two materials are not synchronized, and retrieval hits snippets from different versions.
- Symptom: The invoice number or invoice date of the contract invoice is inconsistent with the reimbursement form records. Cause: The materials lack signatures or receipts, the associated fields are not aligned, and candidate sources are mismatched.
- Symptom: There are many candidates, but the ones ranked first are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and reranking or similarity filtering was not performed.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare the number of candidate entries and the `similarity` score, then toggle `usingReRank` to see changes in the ranking of the top few results, and check the candidate differences after switching `searchMode`.

Business test: ask a cross-material evidence question and see whether the answer provides traceable sources.

- In the knowledge base search test, fix the question, switch `searchMode` to semantic, full-text, and hybrid respectively, and record the number of candidate entries and scores.
- Enable and disable `usingReRank`, compare the ranking of the top few results, and separately record whether the number of entries in the citation array and the tokens of the quoted text reach the `limit`.
