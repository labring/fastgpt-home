---
title: Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c059-f015
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Retrieval | Handover
meta_description: Research Finance: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on drafting materials and handover of responsibilities in research funding budget adjustments and reimbursements, covering three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record accounts, amounts, reasons, and approval signatures; reimbursement forms record purposes, details, dates, and handlers; contract invoices record names, quantities, amounts, invoice dates, and signatures/seals of both parties. The materials come from project leaders, financial handlers, and project management departments, and the update rhythm changes with budget cycles and reimbursement nodes. When entering the knowledge base retrieval service, the three types of materials each serve as candidate fragment sources, used to recall original text related to budget adjustments, reimbursement fields, dates, and signatures, for subsequent nodes or manual drafting of issuable materials and handover records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The issuable material drafts and handover records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Accounts, amounts, reasons, approval signatures, and dates are complete, and consistent with the names, quantities, and dates in reimbursement forms and contract invoices | In the search test, switch `searchMode` to semantic, full-text, or hybrid, check whether candidate fragments cover account and signature fields, and record the number of candidates and `similarity` scores |
| Reimbursement form | Purpose, details, date, handler, and receipt are complete, and match the same record's name, quantity, and date in the budget adjustment application and contract invoice | Test once each with synonymous questions, compare the number of candidates and scores; turn `usingReRank` on and off to see whether the ranking of the top few changes |
| Contract invoice | Name, quantity, amount, invoice date, and signatures/seals of both parties are complete, version and date are consistent, with no missing signatures or receipts | Check whether candidates include both semantic and full-text results, inspect the tokens of the quoted text after `limit` trimming, and record the array count separately |
| Handover record | Responsible person is clear, version and date are consistent, signatures and receipts are complete, and correspond to the fields in the budget adjustment application, reimbursement form, and contract invoice | Draft one according to the template and complete one handover, see whether missing items are blocked; check whether candidate fragments can recall handover fields |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the budget adjustment application and the reimbursement form. Cause: Candidate fragments come from different materials and were not verified by field alignment.
- Phenomenon: The contract invoice version is not synchronized, and old and new versions appear in the candidates at the same time. Cause: Retrieval did not filter by date and version, and material versions were not distinguished before reranking.
- Phenomenon: The budget adjustment application or handover record lacks signatures and receipts. Cause: Candidate fragments only cover the main text and did not recall signature/seal and receipt fields.

## How to verify the setup

Acceptance of this feature: Test once each with synonymously rewritten questions, compare candidates and `similarity` scores, then turn `usingReRank` on and off to see the ranking of the top few; switch `searchMode` to compare semantic and full-text results, and record the number of candidates and the tokens of the quoted text after `limit` trimming.

Business test: Draft one according to the template and complete one handover, see whether missing items are blocked.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and `similarity` scores across semantic, full-text, and hybrid modes, and check whether the fields and dates of the budget adjustment application, reimbursement form, and contract invoice are consistent.
- Turn `usingReRank` on and off, compare the order of the top few candidates; check the tokens of the quoted text after `limit` trimming, record the array count separately, and confirm that the handover record's responsible person, version, and date are complete.
