---
title: Conversation Records and Traceability for Course Selection, Timetables and Classroom Allocation: Track Progress and Check Statistics
slug: /en/industry/education-d006-c019-f007
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Chat Records | Progress
meta_description: Course Scheduling: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Course Selection, Timetables and Classroom Allocation: Track Progress and Check Statistics

## What this category's data looks like

Progress records and statistical verification for course selection, scheduling, and classroom resource allocation draw on three types of materials: course offering plans, scheduling tables, and course selection rules. Course offering plans provide the course name, course code, start date, and signature field; scheduling tables provide the classroom, period, week number, and instructor; course selection rules provide the eligible students, capacity, and effective date. When these three types of materials enter the conversation log and auditing feature, each plays a different role: course offering plans are the source of course identity, scheduling tables are the source of time and space, and course selection rules are the source of headcount and exceptions. The update cadence rolls weekly, with make-up entries for schedule changes during the week and consolidation on weekends. Field characteristics center on five categories—name, quantity, date, version, and signature—which are used for subsequent reconciliation with the total record count.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The "progress table and statistical scope description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Course name, course code, start date, and signature field are consistent within the same material | Take one course record, verify the name and code, then check whether the date and signature field are complete |
| Scheduling table | Classroom, period, week number, and instructor match; when the version is not synchronized, the latest receipt prevails | Page through by week number to retrieve all records, sample one to verify the classroom and period, and confirm the receipt date |
| Course selection rules | Eligible students, capacity, and effective date are stated in the header, with exceptions listed separately | Open the rules page, verify the capacity and effective date, and record the exception entries |
| Conversation records | The total record count total matches response `code` of 200, and each message has an identified role | Page through by `chatId` to retrieve all records, sample one to verify the role, `dataId`, and `value` reference information |

## Three common errors

- Symptom: The name, quantity, and date of the same course do not match between the course offering plan and the scheduling table. Cause: The two materials are updated separately, and versions are not synchronized by week number.
- Symptom: The capacity in the course selection rules is inconsistent with the number of classroom seats in the scheduling table. Cause: The rule version is not synchronized, the old receipt has not been replaced, and signature confirmation is missing.
- Symptom: Exported records lack reference information, and the total record count does not match the statistical count. Cause: Only the first page was retrieved, and paging by offset was not used to retrieve all records.

## How to verify the setup

Acceptance for this feature: page through by the total record count to retrieve all records, sample one to verify the role, reference information, and time, and confirm that response `code` of 200 matches the total record count total.

Business test: use one week of records to verify the totals, and check whether the scope and exceptions are clearly stated.

- Page through by application and session identifier to retrieve all records, pull two consecutive pages to compare the total record count and offset, and confirm that each message has an identified role.
- Open one record to verify the reference and elapsed-time fields, record the number of references and the reference text tokens, and do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
