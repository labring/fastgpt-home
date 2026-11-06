---
title: Conversation Records and Traceability for Research Budget Adjustments and Reimbursement: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c059-f007
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Chat Records | Review
meta_description: Research Finance: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Budget Adjustments and Reimbursement: Trace Exceptions and Review Results

## What this category's data looks like

This page's material comes from the research funding budget adjustment and reimbursement scenario, including three types: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record the account, amount, and approval signature; reimbursement forms record expense details, dates, and handler signatures; contract invoices record the name, quantity, amount, and invoice date. The three types of material enter the conversation record interface in batches, each playing a different role: budget adjustment applications provide the approval chain, reimbursement forms provide expense details, and contract invoices provide external evidence. The update cadence is batch submission, and the field characteristics are concentrated in four types: name, quantity, date, and signature. After the material enters the conversation record interface, it is pulled in pages by application and session dimension, returning a session message list and the total record count, including role and reference information. Manual staff or external systems register, export, and review based on this, forming an anomaly list and review conclusions.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and the total record count, including role and reference information. The "anomaly list and review conclusions" are then completed by manual staff or external systems. The conversation record interface only retrieves session evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface | The total record count matches the pagination parameters, and the status code is 200 | Pull in pages by application and session dimension, pull two consecutive pages and compare total with offset, and verify the source of `chatId` |
| Budget adjustment application | The name, quantity, date, and signature are consistent between the application and the reimbursement form | Verify the account, amount, approval date, and signature between the application form and the reimbursement form, and register inconsistencies as anomalies |
| Reimbursement form | The expense details match the name, quantity, amount, and date of the contract invoice | Compare the fields of the reimbursement form and the contract invoice one by one, and check whether the versions are in sync and whether the receipts are complete |
| Contract invoice | The invoice date does not conflict with the contract date or reimbursement date, and the signature and receipt are complete | Verify that the invoice name, quantity, and amount are consistent with the contract, and register missing signatures or receipts as anomalies |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials are entered separately, no field-level comparison is done, and the versions are not in sync.
- Symptom: The contract invoice is missing a signature or receipt. Cause: The signature and receipt are not verified during the material circulation step, and the responsible person cannot be located during anomaly tracing.
- Symptom: The interface returns empty but there is a session in the interface. Cause: The sources of the application and session identifiers are inconsistent, or only the first page was retrieved and the total record count was not fully paged through.

## How to verify the setup

This feature's acceptance: page through all records by total record count, sample one record to verify the role, reference information, and time, confirm that `dataId`, `value`, and `chatId` are traceable, and that the status code is 200.

Business test: create an anomalous record, see whether the source material can be traced, and verify the name, quantity, date, and signature of the budget adjustment application, reimbursement form, and contract invoice.

- Pull in pages by application and session dimension, pull two consecutive pages and compare the total record count with the offset, and confirm the status code is 200.
- Open the reference and elapsed-time fields of one sampled record, verify the alternating order of roles, register the anomaly list and review conclusions, and hand them to the responsible person for handling.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
