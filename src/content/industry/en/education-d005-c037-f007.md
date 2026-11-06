---
title: Conversation Records and Traceability for Vocational Training Subsidy Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c037-f007
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Chat Records | Versions
meta_description: Training Subsidies: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational Training Subsidy Applications: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the vocational training subsidy application scenario. Materials include three types: training class filing records, attendance records, and completion assessment forms. Class filing records register the course name, start and end dates, and student roster; attendance records log daily attendance and signatures; completion assessment forms register assessment results, dates, and responsible person signatures. The materials come from the training implementation process and are updated on a rolling basis with each class session. Version changes are concentrated in course names, participant counts, dates, and signature receipts. When the three types of materials enter the conversation record function, they are retained as session messages respectively: filing corresponds to class opening descriptions and roster confirmation, attendance corresponds to daily verification, and assessment corresponds to results and signature confirmation. Records are pulled in pages by application and session dimensions, returning two roles, question and answer, with citation and duration fields.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting a session message list and total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system. The interface only retrieves session evidence and does not write to the business ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing | Course name, start and end dates, student roster, and signature receipt are consistent between the filing and the assessment form | Pull records by application and session identifiers, verify the name, dates, and roster in the filing messages, then check whether the citations point to the same material |
| Attendance records | Daily attendance dates, participant counts, and signatures match between the attendance records and the filing roster | Pull two consecutive pages and compare the total record count total and offset; sample one attendance message to verify role and citation information |
| Completion assessment form | Assessment results, dates, and responsible person signatures are consistent between the assessment form and the filing | Open one assessment message, verify role, citation information, and duration, and record the number of citations and citation text tokens |
| Session message records | message roles correspond to the original conversation, and each entry contains citations and duration | Use `chatId` to locate the session, use `dataId` to locate a single entry, and use `value` to view citations and duration |

## Three common errors

- Symptom: The course name, participant count, and dates for the same record do not match between the filing and the assessment form. Cause: The materials are updated separately, and names, quantities, and dates are not registered uniformly according to the current version.
- Symptom: Old-version materials are still cited, while the new version has been changed but the citations have not been synchronized. Cause: The version ledger was not updated with the changes, and citations still point to old-version content.
- Symptom: Attendance records or completion assessment forms lack signatures and receipts. Cause: The signature fields and receipts were not checked during registration, and the materials were not rechecked after entering the session.

## How to verify the setup

Pull records by application and session identifiers, pull two consecutive pages and compare the total record count total and offset, and confirm no pages are missing.

Sample one record to verify role, citation information, and duration, and verify whether the names, dates, and signatures of the three types of materials—filing, attendance, and assessment—are consistent.

- This feature acceptance: page through using the total record count total to retrieve all records; when the status code is 200, sample one entry to verify role, citation information, and time, and use `_id`, `dataId` and `value` to locate the session and the single record.
- Business test: change one piece of content and see whether the version number and citations are updated synchronously.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
