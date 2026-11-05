---
title: Conversation Records and Traceability for Research Budget Adjustments and Reimbursement: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c059-f007
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Chat Records | Operations
meta_description: Research Finance: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Budget Adjustments and Reimbursement: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the research funding budget adjustment and reimbursement scenario, and the materials include three types: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record the account, amount, and approval signature; reimbursement forms record expense details, quantity, and date; contract invoices record the supplier, amount, and receipt. The materials come from the research management system and the finance system, are updated by batch, and the field characteristics are name, quantity, date, signature, and receipt. When entering the conversation logs and auditing feature, the three types of materials are each referenced as independent records, and the conversation records retain only the session messages and reference information, without changing the materials themselves.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. "Handover-ready deployment status and operation records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | The name, quantity, date, and signature are consistent between the application and the reimbursement form | Check the account name, amount, date, and signature fields of the application form and the reimbursement form, and compare them item by item |
| Reimbursement form | The name, quantity, date, and receipt of the contract invoice match | Open the reimbursement form and the contract invoice, and check the supplier name, quantity, date, and receipt number |
| Conversation record interface | The total record count matches the pagination offset, and the role and reference fields are visible | Page through by `chatId` and `dataId` to retrieve all, and check the role, reference, and elapsed time in `value` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials were entered separately, and no field-level check was performed.
- Symptom: The contract invoice version was not synchronized, and the reimbursement form references an old version. Cause: After the material was updated, it was not re-associated, and the version number was not updated with the record.
- Symptom: The reimbursement form is missing a signature or the contract invoice is missing a receipt. Cause: During handover, the signature field and receipt number were not checked item by item.

## How to verify the setup

Feature acceptance: Page through to retrieve all by the total record count, sample one record to check the role, reference information, and time, and confirm that response `code` of 200 matches the total record count total.

Business test: Check item by item once according to the handover form, and see which record is missing.

- Page through and pull by `chatId` and `dataId`, compare the total record count and the offset, and confirm there are no omissions.
- Open one record, check the role, reference, and elapsed time in `value`, and confirm that the number of references and the reference text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
