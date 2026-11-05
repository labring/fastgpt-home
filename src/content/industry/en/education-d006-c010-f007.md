---
title: Conversation Records and Traceability for School Timetables and After-School Scheduling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c010-f007
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Chat Records | Progress
meta_description: School Timetables: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Timetables and After-School Scheduling: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of progress records and statistics verification for primary and secondary school timetables and after-school service scheduling. Materials include the master timetable, teacher assignment table, after-school service project table, as well as weekly records, monthly report drafts, and signed receipts. The master timetable determines the skeleton of classes and class hours; the teacher assignment table assigns to individuals, subjects, and weekly periods; the after-school service project table records projects, participating classes, time slots, and responsible teachers. Materials are registered weekly and summarized monthly, with fields including date, class, course or project name, period, teacher, signature, and receipt status. When entering the conversation log and audit function, the three types of tables serve as the basis for verifying progress and statistical calibers; conversation records only play the role of session evidence and do not replace business ledgers; the progress table and statistical caliber description are registered, exported, and reviewed by humans or external systems based on these.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The progress table and statistical caliber description are then completed by humans or external systems. The interface only retrieves session evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Whether class, date, period, and signature are consistent with weekly records | Export the master timetable weekly, compare date, period, and signature status daily against the after-school service project table, and verify the total record count total and response `code` of 200 |
| Teacher assignment table | Whether teacher name, subject, and weekly periods are consistent with the statistical caliber header | Use one week of records to verify the total, sample one record to verify role, reference information, and time, and verify the session identifier corresponding to `chatId` |
| After-school service project table | Whether project name, participating classes, time slot, and receipt match | Pull two pages consecutively to compare offset and total, check whether `dataId` and `value` are returned with the record, and list entries missing receipts separately |
| Progress table and statistical caliber description | Whether record count matches statistical count and the caliber is written in the header | Write the weekly record total into the header, annotate exceptions and caliber source, and review whether signatures and receipts are complete |

## Three common errors

- Symptom: The same record's name, quantity, and date do not match between the master timetable and the after-school service project table. Cause: The two materials are registered separately, without item-by-item comparison and unified caliber.
- Symptom: The teacher assignment table has been updated, but weekly records still use the old version. Cause: Versions are not synchronized, lacking a step to re-sign after changes.
- Symptom: The after-school service project table has projects without receipts or signatures. Cause: Registration and review are separated, receipts are not archived with records, and verification cannot be confirmed.

## How to verify the setup

This function's acceptance: paginate through all records by total record count, sample one record to verify role, reference information, and time, and confirm that `_id`, `dataId` and `value`, total record count total, and response `code` of 200 are consistent.

Business test: Use one week of records to verify the total and check whether the caliber and exceptions are clearly written.

- Paginate by application and session dimension, pull two pages consecutively to compare offset and total record count, and confirm that only the first page was not retrieved.
- Open one record to verify role, reference, and duration fields, record the number of references separately by array length, and verify the tokens of the reference text separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
