---
title: Conversation Records and Traceability for College Admissions Health Examination Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c053-f007
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Chat Records | Progress
meta_description: Admissions Health Exams: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for College Admissions Health Examination Organization: Track Progress and Check Statistics

## What this category's data looks like

During the admissions season, college admissions physical examination organizations intensively produce three types of materials: physical examination forms, re-examination applications, and restricted-major notifications. Physical examination forms contain name, candidate number, physical examination date, and chief examiner signature; re-examination applications contain the reason for application, original examination date, re-examination conclusion, and physician signature; restricted-major notifications contain the major name, basis for restriction, notification date, and candidate or parent receipt. The sources of the materials are the school hospital, admissions office, and departments; they are summarized weekly, and at the end of the month a progress table and statistical scope statement are formed. When the three types of materials enter the conversation record function, each is pulled as question-and-answer evidence in the session for registration, export, and review, and does not replace paper signed documents and original receipts. Field characteristics are concentrated in four items: name, quantity, date, and signature. If any one item does not match between two materials, verification is triggered.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and reference information. The "progress table and statistical scope statement" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | The three items of name, physical examination date, and chief examiner signature are consistent between the physical examination form and the progress table registration | Pull records by application and session identifier, verify the session corresponding to `chatId`, and compare the total record count with the number of registered entries |
| Re-examination application | The reason for application, original examination date, re-examination conclusion, and physician signature are complete, and do not conflict with the physical examination form date | Open a single record to verify the role field and reference information, and confirm that message roles correspond to the original conversation |
| Restricted-major notification | The major name, basis for restriction, notification date, and receipt signature are consistent between the notification and the statistical scope statement | Pull two pages consecutively to compare the offset and total record count, and check the `dataId` and `value` fields |
| Progress table and statistical scope statement | The header states the statistical scope and exceptions, and the record count matches the statistical count | Use one week of records to verify the total, and spot-check the reference text and elapsed time of one record |

## Three common errors

- Symptom: the same candidate's name or date does not match between the physical examination form and the re-examination application. Cause: the two materials are registered separately and are not merged and verified under the same identifier.
- Symptom: the restricted-major notification lacks the candidate's or parent's receipt signature. Cause: the notification is marked as sent while acknowledgment remains uncollected.
- Symptom: the interface returns empty but there are sessions in the interface, and only the first page is retrieved. Cause: the pagination parameters do not page through according to the total record count, and the exported records lack references.

## How to verify the setup

This function's acceptance: page through according to the total record count total to retrieve all, spot-check one record for role, reference information, and time, and confirm response `code` of 200.

Business test: use one week of records to verify the total, and see whether the scope and exceptions are clearly stated.

- Verify the source of the application and session identifier, confirm that `chatId` is consistent with the actual session, and then pull records.
- Compare the offset and total record count of two pages, and check whether the `dataId` and `value` fields are complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
