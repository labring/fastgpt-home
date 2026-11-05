---
title: Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c059-f015
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Retrieval | Access
meta_description: Research Finance: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on research funding budget adjustment and reimbursement, with materials including three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record the adjustment reason, original budget subject and adjusted amount, approval signature and date; reimbursement forms record expense details, reimbursement amount, handler and approval signature; contract invoices record the contract name, invoice number, invoice date, amount and signed receipt. The three categories of materials play different roles in authorized access and external services: budget adjustment applications and reimbursement forms determine the internal approval chain and visibility scope, while contract invoices are used for external verification and receipt confirmation. The material update rhythm is submission per instance and archiving per batch, and the field characteristics are concentrated in names, quantities, dates, signatures and receipts. When materials enter knowledge base retrieval, they are first split into candidate chunks, then undergo recall, merge, rerank and filtering to obtain candidate chunks and similarity scores, without directly generating authorization results or statistical tables.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filtering and limit truncation). "Externally available entry points and authorization scope" are completed by subsequent nodes or manually. The retrieval mode can be switched among semantic, full-text or hybrid in `searchMode`, the rerank switch corresponds to `usingReRank`, similarity filtering corresponds to `similarity`, and citation limit truncation corresponds to `limit`.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the adjustment reason, original budget subject and adjusted amount, approval signature and date are consistent with the reimbursement form | Compare the name, quantity, date and signature of the same record in the two materials; access once with a restricted identity to see whether the visibility scope matches the setting |
| Reimbursement form | Whether the expense details, reimbursement amount, handler and approval signature align with the contract invoice | Check the invoice number, invoice date, amount and receipt of the reimbursement form and contract invoice; switch `searchMode` in the knowledge base search test to compare candidates |
| Contract invoice | Whether the contract name, invoice number, invoice date, amount and signed receipt are complete | Check for missing signatures or receipts; compare the top few rankings before and after enabling `usingReRank`, and record the number of candidates and scores |
| Knowledge base retrieval service | Whether candidate chunks and similarity scores undergo mode, merge, rerank, filtering and limit truncation | Test once each with synonym-rewritten questions, and compare candidates and scores; after adjusting `similarity` and `limit`, observe the tokens of the cited text and the number of array entries |

## Three common errors

- Symptom: The name, quantity and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials are entered separately, versions are not synchronized, and unified verification is lacking.
- Symptom: The contract invoice lacks a signature or receipt, but the reimbursement form shows it has been approved. Cause: The receipt was not archived, the signature step was not closed-loop, and material flow was interrupted.
- Symptom: The same question cannot be recalled when phrased differently, and although there are many candidates, the ones ranked at the top are all irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too strict.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and similarity scores, then toggle rerank to see the top few rankings; record the number of candidates and scores, and check the effects of `searchMode`, `usingReRank`, `similarity` and `limit`.

Business test: access once with a restricted identity to see whether the visibility scope matches the setting; open it once to parents or superiors, and verify that unauthorized content is not visible.

- In the knowledge base search test, switch `searchMode` to compare the candidate chunks and similarity scores of the semantic, full-text and hybrid modes.
- Enable and disable `usingReRank` to compare the top few rankings; adjust `similarity` and `limit`, and separately record the number of entries in the citation array and the tokens of the cited text.
