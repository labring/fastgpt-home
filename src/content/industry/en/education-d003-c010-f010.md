---
title: Citations and Source Traceability for School Timetables and After-School Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c010-f010
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Citations | Intake
meta_description: School Timetables: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Timetables and After-School Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

In the primary and secondary school timetable and after-school service scheduling scenario, common materials include the master timetable, the teacher assignment table, and the after-school service program table. The master timetable records class, day of the week, period, course name, and assigned teacher; the teacher assignment table records teacher, subject, class, weekly teaching hours, and a signature column; the after-school service program table records program name, service date, participating classes, number of participants, and receipt. These materials are updated by the academic affairs office or grade group according to the rhythm of the start of the semester, monthly adjustments, temporary schedule changes, and so on. When entering the Q&A intake and missing-item follow-up function, the master timetable serves as the primary basis for scheduling, the teacher assignment table is used to verify teaching relationships and teaching hours, and the after-school service program table is used to verify after-school service arrangements and signed receipts. The three types of materials jointly support missing-item identification: if a question mentions only the course name but lacks the class, date, or teacher, the intake step first asks follow-up questions to fill in the gaps, then answers based on the materials, and retains the citation source and traceability identifier.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing an original text snippet and a source identifier, and the length can be 0. The "intake record and completed question items" are subsequently handled by an AI node, code node, or human. Even if no content is retrieved, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Whether the fields include class, day of the week, period, course name, and assigned teacher, and whether the date and signature are consistent with the teacher assignment table | Open the master timetable and check column by column; compare the course name and assigned teacher for the same class and same period with the teacher assignment table, and record discrepancies |
| Teacher assignment table | Whether the fields include teacher, subject, class, weekly teaching hours, and a signature column, and whether the quantities and dates match the master timetable | Extract the assignment records of the same teacher, check the number of classes and teaching hours; check whether the signature column and receipts are complete |
| After-school service program table | Whether the fields include program name, service date, participating classes, number of participants, and receipt, and whether the version is synchronized with the master timetable | Compare the program dates with the after-school service time slots in the master timetable; check the receipts and signatures, and confirm which version prevails when the versions are not synchronized |
| Citation content output | The number of returned items is consistent with the matched materials, and being empty is also normal; each citation can point back to the original paragraph | Run a test with a question that has original-text support, open the citation superscript and compare it with the source document; then run a test with a question that has no matching materials, and see that the array is empty while the chain continues |

## Three common errors

- Symptom: the same course does not match in name, quantity, or date between the master timetable and the teacher assignment table. Cause: the two materials are updated separately without cross-checking, resulting in inconsistency between the citation snippet and the original text it points to.
- Symptom: the version of the after-school service program table is not synchronized, and old-version dates coexist with new-version receipts. Cause: the update rhythms differ, retrieval hits old-version materials, and the answer is based on outdated information.
- Symptom: the teacher assignment table lacks a signature or the after-school service program table lacks a receipt, yet it is still treated as valid evidence. Cause: missing items are not identified during intake, follow-up questions are not asked first to fill the gaps, and an answer is given directly.

## How to verify the setup

This function's acceptance: ask a question that has original-text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. Record the number of array items, and separately inspect the `quoteMaxToken` budget and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled); do not compare the number of citations with the budget for equality.

Business test: ask a question that lacks key information, and see whether it asks follow-up questions first before answering.

- In the knowledge base retrieval node, check the selected collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a test with a question that has no matching materials, see that the citation array is empty while the chain continues, and check whether the citation superscripts correspond to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
