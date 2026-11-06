---
title: Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Track Progress and Check Statistics
slug: /en/industry/education-d006-c059-f015
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Retrieval | Progress
meta_description: Research Finance: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Track Progress and Check Statistics

## What this category's data looks like

Materials for progress records and statistical verification of research funding budget adjustments and reimbursements come from three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record the adjusted account, amount, application date, and approval signature; reimbursement forms record the expense name, quantity, date, and handler signature; contract invoices record the contract name, invoice quantity, invoice date, and receipt. The three categories of materials are updated weekly or monthly, and fields differ by version in name, quantity, date, and signature. When entering knowledge base retrieval and recall, the three categories of materials are each recalled as candidate sources, used to check whether the name, quantity, and date of the same record are consistent across two materials, and whether the versions are synchronized and the signature or receipt is complete.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The progress table and statistical scope description are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the name, quantity, date, and signature match those in the reimbursement form and contract invoice | In the search test, search by adjusted account and date, switch `searchMode` to compare candidates, and see whether the name and date of the same record are consistent and whether the signature is complete |
| Reimbursement form | Whether the contract name, invoice quantity, invoice date, and receipt match those in the contract invoice | Search by expense name and quantity, see whether candidates include both semantic and full-text results, check the quantity and date, and record the number of candidates and scores |
| Contract invoice | Whether the adjusted account, amount, application date, and approval signature match those in the budget adjustment application | Search by contract name and invoice date, enable `usingReRank` to compare the order of the top few, check the receipt and signature, and see whether key snippets are retained after `similarity` filtering |
| Retrieval node and search test | Whether the number of candidates and scores can be reviewed, and whether the citation upper limit only trims the content budget | Record the number of candidates and scores, separately record the number of items in the citation array, check whether the cited text tokens exceed the budget, and do not compare the number of items with the budget for equality |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The versions of the two materials are not synchronized, or the field scope is inconsistent at entry.
- Symptom: The contract invoice lacks a signature or receipt, but the reimbursement form has already entered statistics. Cause: The signing receipt was not returned during the material circulation step, and the versions are not synchronized.
- Symptom: There are many candidates, but the ones ranked at the front are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, or rerank and similarity filtering are not enabled.

## How to verify the setup

Acceptance of this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ordering of the top few; switch `searchMode` and `usingReRank`, record the number of candidates and scores, and see whether citations are complete after `similarity` filtering.

Business test: Use one week of records to check the totals and see whether the scope and exceptions are clearly written; check that the number of records matches the statistical count, write the scope into the table header, and include it in the weekly or monthly report.

- In the search test, run one retrieval each for the budget adjustment application, reimbursement form, and contract invoice, record the number of candidates and scores, and check the name, quantity, date, and signature.
- Compare the ordering of the top few before and after enabling rerank, check whether key snippets of the original text are still retained after similarity filtering and citation upper-limit trimming, and separately record the number of items in the citation array.
