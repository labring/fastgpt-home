---
title: Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c059-f015
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Retrieval | Intake
meta_description: Research Finance: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on intake materials for research funding budget adjustments and reimbursements, including three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications carry the adjustment reason, account, amount, and approval nodes; reimbursement forms carry expense details, quantities, dates, and handler signatures; contract invoices carry the counterparty, amount, invoice date, and receipt. The materials are submitted in batches by project leaders and financial handlers, and the update cadence follows the budget cycle and reimbursement batches; within the same batch, supplementary documents and revised documents often arrive one after the other. Field characteristics center on names, quantities, dates, signatures, and version numbers, and the three materials need to be aligned item by item. When entering Q&A intake and missing-item follow-up, each of the three material types plays its own evidentiary role: budget adjustment applications are used to determine the scope of adjustment, reimbursement forms are used to check the expense composition, and contract invoices are used to verify the transaction and receipt.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). Intake records and the follow-up questions to be completed are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the account, amount, adjustment date, and approval signature are consistent with the reimbursement form | In the search test, switch `searchMode`, test once each with synonymous questions, record the number of candidates and the scores, and check whether the hit chunks cover the account and signature fields |
| Reimbursement form | Whether the expense name, quantity, occurrence date, and handler signature align with the contract invoice | Turn `usingReRank` on and off to compare the ordering of the top few results, and check whether the original quantity and date text is still retained after the `similarity` filter |
| Contract invoice | Whether the counterparty, invoice date, amount, and receipt are in sync with the reimbursement form version | Check whether the contract number and invoice number in the candidate chunks come from the same source, record the number of entries in the reference array, and separately verify the tokens of the reference text and the `limit` trimming |
| Intake records and the follow-up questions to be completed | Whether missing items are identified and followed up on, and whether answers have material evidence | Review whether the follow-up checklist covers name, quantity, date, signature, and version, and confirm that every answer can be traced back to a candidate chunk |

## Three common errors

- Symptom: the name and quantity of the same expense do not match between the reimbursement form and the contract invoice. Cause: the two materials were filled in by different handlers one after the other, without field-level alignment.
- Symptom: the budget adjustment application has been revised, but the reimbursement form still references the old version. Cause: the version was not synchronized, and the arrival of the supplementary document did not trigger re-intake and follow-up.
- Symptom: the contract invoice lacks a signature or receipt, but the answer still gives a conclusion. Cause: the missing item was not identified as a follow-up item, and the candidate chunk was used directly as evidence.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare the number of candidates and the scores, then turn rerank on and off to inspect the ordering of the top few results, and check whether candidates are stable under `searchMode`, `similarity`, and `usingReRank`.

Business test: ask a question that is missing key information, and see whether it follows up before answering, and whether the follow-up items fall on name, quantity, date, signature, and version.

- In the search test, fix the question, switch `searchMode`, record the number of candidates and the scores, and check whether the hit chunks cover the key fields of the budget adjustment application, reimbursement form, and contract invoice.
- Turn `usingReRank` on and off to compare the ordering of the top few results, check whether the tokens of the reference text are complete after the `similarity` filter, and register the number of array entries separately.
