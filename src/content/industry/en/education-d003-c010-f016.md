---
title: Forms and User Interaction for School Timetables and After-School Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c010-f016
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Forms | Intake
meta_description: School Timetables: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Timetables and After-School Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

The data for this category looks like this
Primary and secondary school timetables and after-school service scheduling involve three types of materials: the master timetable, the teacher assignment table, and the after-school service project table. The master timetable is published by semester and includes class, period, week, course name, and assigned teacher, usually with the signature of the academic affairs office; the teacher assignment table lists class, subject, weekly class hours, and teaching dates for each teacher individually, and requires the signature of the teacher and the teaching and research group leader; the after-school service project table is updated weekly or monthly and includes project name, participating classes, number of participants, venue, tutoring teacher, and receipt signature. When these three types of materials enter Q&A intake, the master timetable is used to confirm class time-slot attribution, the teacher assignment table is used to verify teaching relationships and the number of class hours, and the after-school service project table is used to compare project names, number of participants, and dates. In terms of update rhythm, the master timetable is finalized at the beginning of the semester, the teacher assignment table changes with class adjustments, and the after-school service project table rolls over weekly. The field characteristics are four categories: name, quantity, date, and signature, and common missing items are concentrated in signatures and receipts.

## Configuration and implementation checks

How the configuration is set
This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" is then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Check class, period, week, course name, and assigned teacher, and confirm whether the academic affairs office signature and publication date are complete | Check the field names one by one in the node configuration, confirm they correspond one-to-one with the material fields of the master timetable, and after submitting with `formInput`, run a trial to retrieve the field values |
| Teacher assignment table | Check teacher name, class, subject, weekly class hours quantity, and teaching dates, and confirm the signatures of the teacher and the teaching and research group leader | Check the required settings one by one, confirm that key material fields are marked as required, and after selecting the teaching relationship with `userSelect`, run a trial |
| After-school service project table | Check project name, participating classes, number of participants, venue, tutoring teacher, and receipt signature, and confirm the version date | Reference the corresponding fields in subsequent nodes and run a trial to confirm that the subsequent nodes can retrieve the field values after submission |
| Intake record and items to be completed | Check whether missing items are identified and followed up on, and whether the answers are based on materials | Ask a question missing key information and observe whether it first follows up before answering |

## Three common errors

- Phenomenon: The course name or weekly class hours quantity for the same class does not match between the master timetable and the teacher assignment table. Cause: The two materials are maintained separately, and names and quantities have not been cross-checked.
- Phenomenon: The after-school service project table has been updated, but intake still follows up based on the old version. Cause: The version is not synchronized, and the form fields do not record the material version date.
- Phenomenon: The teacher assignment table lacks a teacher signature or the after-school service project table lacks a receipt, yet it still enters the handling stage. Cause: The required markings do not cover signature and receipt fields.

## How to verify the setup

How to confirm the setup is correct
Acceptance for this feature: fill out the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the fields passed by `formInputResult` and `selectResult` are consistent with the material fields.

Business test: ask a question missing key information and see whether it first follows up before answering.

- Check the field names one by one in the node configuration, and confirm they correspond one-to-one with the material fields of the master timetable, teacher assignment table, and after-school service project table.
- Check the required settings one by one, confirm that key material fields such as signature, receipt, and date are marked as required, and after submission run a trial to confirm that subsequent nodes can retrieve the values.
