---
title: Conversation Records and Traceability for School Teacher Training Credits: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c013-f007
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Chat Records | Review
meta_description: Teacher Credits: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Teacher Training Credits: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on exception tracing and manual review materials in credit management for primary and secondary school teacher training. When entering the conversation logs and auditing function, the training notice, credit recognition form, and attendance roster each play a role: the training notice provides the project name, start and end dates, and organizing institution, and is the upstream basis for exception comparison; the credit recognition form carries teacher names, course names, credit hours, and recognition conclusions, and is the direct source of the exception list; the attendance roster records sign-in, receipts, and signature status, and is used to verify whether the same record is consistent between the two materials. These materials are updated by training batch, and their field characteristics are concentrated in four categories: name, quantity, date, and signature. If the name, quantity, or date of the same record does not match between the notice and the recognition form, the versions are not synchronized, or signatures or receipts are missing, exception tracing is triggered. The conversation logs and auditing function pulls records by application and session dimensions, providing session evidence for manual review, but does not replace the business ledger.

## Configuration and implementation checks

This step is performed by the conversation records interface (by application and session dimensions), which outputs the session message list and total record count, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Project name, start and end dates, and organizing institution are compared item by item with the recognition form and attendance roster | Open the training notice, check the project name, start and end dates, and organizing institution, and compare them item by item with the credit recognition form and attendance roster |
| Credit recognition form | Teacher names, course names, credit hours, and recognition conclusions are consistent with the attendance roster and notice | In the credit recognition form, check teacher names, course names, credit hours, and recognition conclusions, and compare them item by item with the attendance roster and training notice |
| Attendance roster | Sign-in, receipts, and signature status are complete, and the dates and quantities match those in the recognition form and notice | In the attendance roster, check sign-in, receipts, and signature status, and compare the dates and quantities item by item with the credit recognition form and training notice |
| Conversation records | The session message list and total record count can be fully retrieved by pagination, and role and reference information can be checked | Use `chatId` to paginate by application and session dimensions, check the total record count total and response `code` of 200, and sample one record to inspect `dataId` and `value` |

## Three common errors

- Symptom: The teacher name and course name of the same record do not match between the training notice and the credit recognition form. Cause: The two materials are registered at different stages, and the name fields are not unified.
- Symptom: The credit hours and training dates in the credit recognition form and attendance roster are inconsistent. Cause: The versions are not synchronized, and one of the materials still uses data from an old batch.
- Symptom: The attendance roster lacks signatures or receipts, and the exception record cannot be traced back to the original materials. Cause: Signatures or receipts were not fully collected at registration, and the reviewer cannot sign for confirmation.

## How to verify the setup

This function's acceptance: paginate to retrieve all records by total record count, sample one record to check role, reference information, and time; check the total record count total and response `code` of 200, and use `_id`, `dataId` and `value` to locate a single record.

Business test: create an exception record, see whether it can be traced to the source materials, confirm that the exception is supported by original records and signed by the reviewer, and then hand it over to the responsible person for handling.

- Pull two pages by application and session identifier, compare the total record count and offset, and confirm that the number of records matches the total.
- Open one record, check whether the role field matches the original conversation between question and answer, and check the reference and elapsed time fields.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
