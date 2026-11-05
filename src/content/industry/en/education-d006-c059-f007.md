---
title: Conversation Records and Traceability for Research Budget Adjustments and Reimbursement: Track Progress and Check Statistics
slug: /en/industry/education-d006-c059-f007
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Chat Records | Progress
meta_description: Research Finance: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Budget Adjustments and Reimbursement: Track Progress and Check Statistics

## What this category's data looks like

This page addresses progress records and statistical verification for research funding budget adjustments and reimbursements. The materials include three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications come from project leaders and the finance department, and include the reason for adjustment, amount, date, and signature; reimbursement forms come from the handler, and include expense details, quantities, and approval signature; contract invoices come from suppliers and finance, and include contract number, invoice number, amount, and date. The three categories of materials enter the same verification process weekly or monthly, with field characteristics being name, quantity, date, signature, and receipt. When materials enter this function, the conversation record interface only serves the role of session evidence and does not replace the business ledger. The progress table and statistical scope description are registered, exported, and reviewed accordingly by manual staff or external systems.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "progress table and statistical scope description" is then completed by manual staff or external systems.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | The adjustment reason, amount, date, and signature are consistent between the application and the approval | Check name, quantity, date, and signature item by item according to the application number; separately mark missing signatures or receipts |
| Reimbursement form | The expense details, quantities, date, and approval signature are consistent between the reimbursement form and the contract invoice | Compare the name, quantity, and date of the contract invoice according to the reimbursement form number; for versions not synchronized, the latest signed document prevails |
| Contract invoice | The contract number, invoice number, amount, and date are consistent between the contract and the invoice | Check the invoice number and amount according to the contract number; for records with mismatched dates, note the scope and exceptions in the table header |
| Conversation record interface | The number of records matches the total, and each message has an identified role | Pull pages by application and session dimension, use `chatId` and `dataId` to locate a single record, and check the references and elapsed time in `value` |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials are registered separately and are not aligned by the same number.
- Phenomenon: The contract invoice version is not synchronized, and the old signed document is still in circulation. Cause: The attachment was not replaced after updating, and the receipt was not retrieved.
- Phenomenon: Signatures or receipts are missing, but the progress table still includes them in the total. Cause: The statistical scope does not clearly state exceptions, and they are not excluded during verification.

## How to verify the setup

This function's acceptance: page through using the total record count total to retrieve all records, sample one record to check the role, reference information, and time, and confirm that response `code` of 200 matches the returned list.

Business test: use one week of records to verify the total, check whether the scope and exceptions are clearly stated, and confirm that the total record count matches the statistical count and that the scope is written in the table header.

- Pull two pages consecutively and compare the total and offset to confirm that the number of records matches the total; if only the first page is retrieved, check the pagination parameters.
- Open one record to check the reference and elapsed time fields; record the number of references by array length, and `quoteMaxToken` only checks the tokens of the reference text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
