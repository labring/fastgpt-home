---
title: Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c059-f015
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Retrieval | Review
meta_description: Research Finance: review retrieval for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the research funding budget adjustment and reimbursement scenario. The materials include three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications state the adjusted account, amount, and approval date; reimbursement forms record expense details, quantities, and handler signatures; contract invoices provide the counterparty, invoice date, and receipt voucher. The three material categories are updated according to the project cycle and financial monthly closing, and their fields cross-cover name, quantity, date, signature, and version number. When entering the knowledge base retrieval and recall function, budget adjustment applications serve as candidate sources for adjustment basis, reimbursement forms serve as candidate sources for expense details, and contract invoices serve as candidate sources for transaction vouchers. Each participates in recall in fragment form for subsequent nodes or manual comparison and tracing.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The "anomaly list and review conclusion" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Check whether the adjusted account, amount, approval date, and signature are consistent with the reimbursement form | In the search test, search using the adjusted account and date as conditions, view the candidate fragments and similarity scores, and confirm that `searchMode` matches the material form |
| Reimbursement form | Check whether the expense name, quantity, handling date, and signature correspond to the contract invoice | Switch `searchMode` to hybrid or full-text, compare whether the candidates include both semantic and full-text results, and record the number of candidates and scores |
| Contract invoice | Check whether the counterparty, invoice date, quantity, and receipt signature match the reimbursement form | Compare the top few rankings before and after enabling `usingReRank`, and confirm changes in the positions of relevant fragments after reranking |
| Retrieval result set | Check whether the candidate fragments cover the key fields and version numbers of the three material categories | Adjust `similarity` and `limit` to observe the filtering and trimming effects, and record the tokens and array count of the cited text |

## Three common errors

- Symptom: The name or quantity of the same expense does not match between the reimbursement form and the contract invoice. Cause: The two materials are entered in different steps, and no field-level cross-comparison was performed.
- Symptom: The approval date or version number of the budget adjustment application and the reimbursement form are inconsistent. Cause: After the adjustment application was updated, it was not synchronized to the reimbursement form, and the version was not synchronized.
- Symptom: The contract invoice lacks a receipt signature or the reimbursement form lacks a handler signature. Cause: The signature step was omitted during material circulation and was not completed before retrieval.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidate fragments and similarity scores, then toggle reranking on and off to inspect the top few rankings; record the number of candidates and scores, and check the effects of `similarity`, `limit`, and `usingReRank`.

Business test: create an anomaly record, see whether the source material can be traced, and confirm that the anomaly is supported by original records and a reviewer signature.

- In the knowledge base search test, search separately by the name and date fields of budget adjustment applications, reimbursement forms, and contract invoices, and record candidate fragments and similarity scores.
- Compare the top few rankings before and after enabling reranking, check the tokens and array count of the cited text, and confirm that key fragments of the original text are still retained after trimming.
