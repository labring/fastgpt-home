---
title: Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c059-f010
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Citations | Intake
meta_description: Research Finance: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information

## What this category's data looks like

This page centers on the research funding budget adjustment and reimbursement scenario; the materials include three types: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record inter-account quota changes, adjustment reasons, and approval signatures; reimbursement forms carry expense details, amounts, handler and approval signatures; contract invoices provide transaction names, quantities, dates, and invoicing information. When the materials enter the knowledge base retrieval node, each is associated as an independent document with the knowledge base of the same vector model, and after a retrieval hit they are returned as original text fragments with source identifiers. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts, and the update rhythm changes with approval flow, invoice supplementary entry, and version replacement; the field consistency of the same record across different materials is the focus of subsequent comparison.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. Even if no content is found, the output chain still runs through. The "intake records and items to be completed" are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the account name, adjustment amount, adjustment date, and approval signature correspond to the reimbursement form and contract invoice | Check the account, date, and signature fields in the application, confirm they are consistent with the names, quantities, and dates in the reimbursement form and contract invoice, and mark as pending supplementation when a signature or receipt is missing |
| Reimbursement form | Whether the expense detail names, quantities, amounts, handler and approval signatures are consistent with the contract invoice | Compare the names, quantities, and dates of the reimbursement form and contract invoice item by item, check whether the versions are synchronized, and record missing items when a receipt is missing |
| Contract invoice | Whether the transaction name, quantity, invoicing date, and contract number are consistent with the budget adjustment application and reimbursement form | Check the names, quantities, and dates of the invoice against the contract and reimbursement form, confirm that signatures and receipts are complete, and write inconsistencies into the intake record |
| Knowledge base retrieval node | The length of the cited content array matches the number of hit materials, and each citation can point back to the original paragraph | Run a trial with a question that has no matching materials, and see whether the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues; open the citation superscript to compare against the source document, and check the `quoteList` and `quoteMaxToken` budget |

## Three common errors

- Symptom: The name, quantity, and date of the same expenditure do not match between the reimbursement form and the contract invoice. Cause: Fields were not synchronized according to the same record during entry, or the reimbursement form was not updated after supplementary invoice entry.
- Symptom: The versions referenced by the budget adjustment application and the reimbursement form are inconsistent, and signatures or receipts are missing. Cause: Versions were not synchronized during the approval flow, and old-version materials are still hit by retrieval.
- Symptom: The answer has citation superscripts but the cited fragments do not match the original text. Cause: Failure to first check which material was hit in this round, and directly attributing it to length truncation.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the array length and the `quoteMaxToken` budget for separate verification.

Business test: raise a question missing key information, and see whether it first asks a follow-up before answering; after the completed items are written into the intake record, forward them to the handler.

- Open the search parameter panel, check that the associated knowledge base is the same vector model, and compare the values item by item to be consistent with the knowledge base retrieval section.
- Run a trial with a question that has no matching materials, confirm that the citation array in `responseData` is empty while the chain continues, and check that `quoteList` and the citation superscripts can point back to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
