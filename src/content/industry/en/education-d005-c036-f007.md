---
title: Conversation Records and Traceability for Professional Qualification Exam Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c036-f007
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Chat Records | Versions
meta_description: Professional Exams: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Professional Qualification Exam Applications: Maintain Document Versions and Changes

## What this category's data looks like

Professional and technical personnel vocational qualification examination registration review materials include the registration form, education certificate, and work experience certificate. Their sources are submissions by candidates and issuance by employers, and their update cadence follows registration batches and policy adjustments. After the materials enter the conversation record interface, each has a different role: the registration form carries fields and signatures, the education certificate carries dates and seals, and the work experience certificate carries start and end times and receipts. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts. The same record often has mismatched names, quantities, and dates across two materials, with versions not synchronized and signatures or receipts missing. The conversation record interface retrieves the message list and total record count by application and session dimensions as session evidence, and does not write to business ledgers. The version ledger and change records are registered, exported, and reviewed by humans or external systems based on this, ensuring the current version is unique, old versions are traceable, and references are synchronized.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting the session message list and total record count, including roles and reference information. The "version ledger and change records" are then completed by humans or external systems. The interface only retrieves session evidence and does not write to business ledgers; the number of messages and the number of sessions are not the same quantity, and the total record count is the number of message records.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Whether fields, dates, and signatures are consistent with the education certificate and work experience certificate | Check the name, quantity, date, and signature fields in the registration form, and compare them item by item with the other two materials |
| Education certificate | Whether dates and seals match the registration form and work experience certificate | Check the dates and seals of the education certificate, and verify whether the dates are consistent with the registration form and work experience certificate |
| Work experience certificate | Whether start and end times and receipts are consistent with the registration form and education certificate | Check the start and end times and receipts of the work experience certificate, and verify whether they match the registration form and education certificate |
| Conversation record interface | Whether the total record count and status code match | Paginate through all records by `chatId`, sample one record to check the role, reference information, and time, and confirm the `dataId` and `value` fields |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match across two materials. Cause: the registration form, education certificate, and work experience certificate are each updated separately, without cross-checking.
- Symptom: versions are not synchronized, and the old version is still referenced. Cause: the version number and references are not synchronized when updating the knowledge base or external documents.
- Symptom: missing signature or receipt. Cause: after materials are submitted, the signature field and receipt are not checked, resulting in incomplete registration review materials.

## How to verify the setup

This feature's acceptance: paginate through all records by the total record count, sample one record to check the role, reference information, and time, and confirm that response `code` of 200 matches the total record count total.

Business test: change one piece of content and see whether the version number and references are updated in sync.

- Paginate through all records by `chatId`, and compare the total record count with response `code` of 200.
- Sample one record to check the role, reference information, and time, and confirm the `dataId` and `value` fields.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
