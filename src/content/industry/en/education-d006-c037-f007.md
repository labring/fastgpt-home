---
title: Conversation Records and Traceability for Vocational Training Subsidy Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c037-f007
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Chat Records | Progress
meta_description: Training Subsidies: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational Training Subsidy Applications: Track Progress and Check Statistics

## What this category's data looks like

The materials for progress records and statistical verification of vocational training subsidy applications come from three types: training class filing, attendance records, and completion assessment forms. Class filing includes the institution name, class number, start and end dates, and the signature of the person in charge; attendance records include the trainee name, identity number, attendance date, and personal signature; completion assessment forms include the assessment date, score, and assessor signature. The three types of materials are archived by class session, with an update rhythm of filing before the class starts, daily attendance, and summary after completion. When entering this function, the filing and assessment forms serve as the basis for session registration, and the attendance records serve as the source of item-by-item records, each taking on a different role.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), outputting the session message list and the total record count, including role and reference information. The "progress table and statistical scope description" is then completed manually or by an external system. The message list is not a version ledger of business materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing | Whether the institution name, class number, start and end dates, and signature of the person in charge are complete | Check the filing form fields and signature, and check whether the dates match the first day of the attendance records |
| Attendance records | Whether the trainee name, identity number, attendance date, and personal signature correspond item by item | Check the attendance records item by item by class session, and check for missing attendance and date misalignment |
| Completion assessment form | Whether the assessment date, score, and assessor signature are complete | Check the assessment form against the attendance record roster, and check whether the number of people and dates match |
| Conversation record interface | Whether the total record count matches the pagination parameters, and whether the role and reference information are visible | Use `chatId` and `dataId` to check the session and individual records, and after paging through all records, check `value` and total |

## Three common errors

- Symptom: the same trainee's name or identity number does not match between the attendance records and the completion assessment form. Cause: the two materials are registered separately and are not backfilled under the same number.
- Symptom: the start and end dates of the class filing are inconsistent with the first day of the attendance records. Cause: the versions are not synchronized, and the attendance sheet header was not updated after the filing was modified.
- Symptom: the completion assessment form lacks the assessor signature or the attendance records lack the personal signature. Cause: only electronic forms were collected during summary, and signatures or receipts were not supplemented.

## How to verify the setup

This function's acceptance: page through all records by the total record count total, sample one record to check the role, reference information, and time, and confirm a normal return with response `code` of 200.

Business test: use one week of records to check the totals, and see whether the scope and exceptions are clearly written.

- Pull records by application and session dimension, check that `chatId` is consistent with the actual session, and check that the pagination parameters match the total record count total.
- Open a single record to check the role field and reference information, confirm that `dataId` and `value` are queryable, and record the number of references separately by array length.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
