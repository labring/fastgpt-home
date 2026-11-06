---
title: Conversation Records and Traceability for Research Budget Adjustments and Reimbursement: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c059-f007
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Chat Records | Versions
meta_description: Research Finance: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Budget Adjustments and Reimbursement: Maintain Document Versions and Changes

## What this category's data looks like

In the research funding budget adjustment and reimbursement scenario, materials include three types: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record changes in amounts between accounts and approval opinions; reimbursement forms record expense details and handler signatures; contract invoices record the transacting parties, amounts, dates, and receipt numbers. The three types of materials play different roles when entering this feature: budget adjustment applications serve as the basis for changes, reimbursement forms serve as execution vouchers, and contract invoices serve as original attachments. The update cadence fluctuates with the project cycle and financial milestones, commonly collected monthly and reviewed quarterly. Field characteristics center on names, quantities, dates, signatures, and receipts. If the name, quantity, or date of the same record does not match across two materials, a version and reference inconsistency is formed. The goal of data version and change maintenance is a unique current version, traceable old versions, and synchronized references.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and the total number of records, including role and reference information. The "version ledger and change records" are then completed manually or by an external system. The message list is not the version ledger of business materials; it serves only as conversation evidence for registration, export, and review.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | The account, amount, date, and approval signature are consistent across the three types of materials | Pull records by application and session dimension, and verify the source of the session identifier in `chatId` and the request parameters |
| Reimbursement form | The expense name, quantity, date, and handler signature can be traced to the corresponding version | Page through to retrieve all records, compare the total record count total with response `code` of 200, and sample one record to inspect role and reference information |
| Contract invoice | The transacting parties, amount, receipt number, and receipt are complete | Open a single record to verify the reference and elapsed-time fields, and check the message ownership corresponding to `dataId` |
| Version ledger | The current version is unique, old versions are traceable, and references are synchronized | After changing one piece of content, pull again and observe whether the version number and references are updated in sync |

## Three common errors

- Symptom: The name, quantity, and date of the same expenditure do not match between the reimbursement form and the contract invoice. Cause: The two materials are maintained separately and are not collected under the same version ledger.
- Symptom: The budget adjustment application has been updated, but the reimbursement form still references the old account and amount. Cause: The version is not synchronized, and references are not refreshed with the change.
- Symptom: The contract invoice lacks a signature or receipt, and the reimbursement form cannot be closed. Cause: The signature and receipt fields were not verified when the materials entered the feature.

## How to verify the setup

Feature acceptance: page through by total record count to retrieve all records, sample one record to verify role, reference information, and time, and confirm that `_id`, `dataId` and `value` can be located.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- Pull two pages in a row and compare the offset and total, confirming that the total record count total matches response `code` of 200.
- Open a single record to verify the reference and elapsed-time fields, and check whether the role field matches the original conversation between question and answer.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
