---
title: Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c059-f015
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Retrieval | Operations
meta_description: Research Finance: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Budget Adjustments and Reimbursement: Coordinate Operations and Application Handover

## What this category's data looks like

In the research funding budget adjustment and reimbursement scenario, materials include three types: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record inter-account amount changes, adjustment reasons, and approval signatures; reimbursement forms carry expense details, quantities, dates, and handler signatures; contract invoices provide transaction evidence, invoicing information, and receipts. When the three types of materials enter the knowledge base retrieval and recall function, each is indexed as an independent fragment and assumes a different retrieval role: budget adjustment applications are used to verify the adjustment basis and approval chain, reimbursement forms are used to compare expense items and dates, and contract invoices are used to verify amounts, quantities, and seals. The material update cadence is batch import, with a new version added after each adjustment or reimbursement is completed. In terms of field characteristics, the name, quantity, and date of the same record in the three materials may differ due to different entry conventions, and must be checked item by item after retrieval and recall.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit truncation). The handover-ready deployment status and operation records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | The account name, adjustment amount, adjustment date, and approval signature are consistent across the three materials | In the search test, search for the same account, compare the name, quantity, date, and signature fields in the candidate fragments, and record the number of candidates and the score |
| Reimbursement form | The expense items, quantities, occurrence dates, and handler signature match the contract invoice | Switch `searchMode` to hybrid mode, enable `usingReRank`, check whether the returned candidates include both semantic and full-text results, and check whether the signature and receipt are missing |
| Contract invoice | The invoicing name, quantity, date, and seal match the budget adjustment application and reimbursement form | Adjust the `similarity` threshold and `limit`, observe whether the original key fragments are still retained after candidate truncation, and confirm that the version number and connection status are consistent |
| Deployment status and operation records | Version, connection, and task records are consistent and ready for handover | Check the retrieval node configuration, search test records, and task logs item by item according to the handover sheet, and see which record is missing |

## Three common errors

- Symptom: The name and quantity of the same expenditure do not match between the reimbursement form and the contract invoice. Cause: Different entry conventions and failure to check fields item by item after retrieval and recall.
- Symptom: The budget adjustment application has been updated to a new version, but the retrieval candidates still return fragments from the old version. Cause: The version was not synchronized, and the index was not refreshed as the materials were updated.
- Symptom: The reimbursement form lacks a handler signature or the contract invoice lacks a receipt. Cause: Incomplete material archiving, and failure to check the signature and receipt fields after retrieval and recall.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare the candidate fragments and similarity scores, then toggle rerank on and off to see changes in the ranking of the top few results; record the number of candidates and the score, and check the effects of `searchMode`, `usingReRank`, `similarity`, and `limit`.

Business test: check once item by item according to the handover sheet, and see which record is missing; check whether the version, connection, and task records are consistent, and confirm whether the fields, dates, and signatures of the budget adjustment application, reimbursement form, and contract invoice match.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare the candidate fragments and similarity scores, and record the number of candidates.
- Enable or disable `usingReRank`, compare the ranking of the top few candidates; adjust `similarity` and `limit`, check the tokens of the referenced text, and record the array count separately.
