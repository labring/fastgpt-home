---
title: Reranking and Hybrid Retrieval for Research Budget Adjustments and Reimbursement: Find Supporting Evidence
slug: /en/industry/education-d001-c059-f018
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Reranking | Evidence
meta_description: Research Finance: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Research Budget Adjustments and Reimbursement: Find Supporting Evidence

## What this category's data looks like

This page addresses research funding budget adjustment and reimbursement scenarios, and the materials include three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record the adjusted account, amount, date, and signature; reimbursement forms record expense details, quantity, date, and receipt; contract invoices carry the name, quantity, date, and seal. When the three categories of materials enter the retrieval service, each serves as an independent candidate source; hybrid retrieval simultaneously runs vector and full-text paths and merges the results, so that basis entries can be recalled across materials. The material update cadence uses version numbers and signature status as clues, and the field characteristics are concentrated in name, quantity, date, signature, and receipt. The reranking model sorts the merged candidates and filters by rerank score; citation trimming and answer generation then produce basis entries that can be traced back to the original text, for replying to parents or writing into a proposal.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. The basis entries that can be traced back to the original text are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs vector and full-text paths and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the reranking model is usually used again to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the adjusted account, amount, date, and signature can correspond to the reimbursement form | Check the account, amount, date, and signature in the application, confirm they are consistent with the reimbursement form records, and record the number of candidate entries and the rerank score |
| Reimbursement form | Whether the name, quantity, date, and receipt of the expense details can correspond to the contract invoice | Compare the reimbursement form and contract invoice item by item for name, quantity, date, and receipt, check whether the signature is missing, and verify the values of `similarity` and `limit` |
| Contract invoice | Whether the name, quantity, date, and seal are the current version | Check the name, quantity, date, and seal of the contract invoice, confirm the version has been synchronized, and check whether `searchMode` and `usingReRank` are enabled |
| Reranking model | Whether sorting and filtering are executed by rerank score | Compare the order and scores of the top three before and after reranking, and confirm that candidates come from both the vector and full-text paths |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match across two materials. Cause: during entry, the unified field definitions were not checked, so candidate entries cannot be traced back to the same original text.
- Symptom: the version is not synchronized, and old-version basis is recalled. Cause: after the material was updated, the version marker was not synchronized, retrieval still hits the historical version, and the rerank score cannot distinguish it.
- Symptom: the signature or receipt is missing, and the basis entry cannot be closed. Cause: the signature and receipt fields were not updated together with the material, and after citation trimming, key evidence is still missing.

## How to verify the setup

Acceptance of this feature: compare the order and scores of the top three before and after enabling reranking, record the number of candidate entries and the rerank score, and confirm that the top few after filtering are relevant to the basis question.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and verify the tokens of the cited text and the number of array entries and record them separately.

- In the search parameters, verify the vector and full-text path switches, confirm that candidates come from both paths, and then check the rerank score.
- Compare the sorting and scores before and after reranking, and verify item by item whether the name, quantity, date, and signature receipt in the materials are consistent.
