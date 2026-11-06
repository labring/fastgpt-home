---
title: Multi-Turn Conversation and Prompts for Course Selection, Timetables and Classroom Allocation: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c019-f005
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Conversation | Review
meta_description: Course Scheduling: review conversation for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Course Selection, Timetables and Classroom Allocation: Trace Exceptions and Review Results

## What this category's data looks like

In the course selection, scheduling, and classroom resource allocation scenario, materials fall into three categories: course offering plans, scheduling tables, and course selection rules, which come respectively from academic affairs system exports, submissions by secondary colleges, and rule base maintenance records, and are refreshed in batches according to the rhythm of semester startup, before course selection, and during the add/drop week. Course offering plans carry course names, credits, instructors, and planned number of classes; scheduling tables carry time, classroom, week, and capacity fields; course selection rules carry priority, selection restriction conditions, and effective dates. When the three enter the exception tracing and manual review function, course offering plans and scheduling tables serve as the comparison baseline, course selection rules serve as the basis for judgment, and the exception list and review conclusions are answered by the model accordingly, then traced back to the source materials and handed to the person in charge for handling.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the referenced historical message range and answer constraints. The exception list and review conclusions are then completed by the model. The external entry point and authorization are handled by the publishing service and file permissions; memory turns and prompts do not generate access entry points and do not perform identity or file authentication.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Compare course names, credits, and planned number of classes item by item with the scheduling table; the date basis is the plan effective date | Retrieve the original export of the plan, check whether the fields, dates, and signatures are complete, then align it with the same record in the scheduling table |
| Scheduling table | Compare time, classroom capacity, and selection restriction conditions with the course selection rules; check whether the version number and receipt date are synchronized | Locate the session by `chatId`, use `messages` to trace back the references in the two rounds of follow-up questions, and confirm that the comparison objects are not misaligned |
| Course selection rules | Compare effective dates and priority fields with the course offering plan; list items missing signatures or receipts separately | Use `variables` to record the rule version and receipt number, and check the signature column and date column item by item |
| Exception list and review conclusions | Exceptions are supported by original records, the reviewer has signed, and the conclusions are consistent with the fields in the source materials | Create an exception record, trace it back to the source materials along `messages`, and check whether the name, quantity, and date columns match |

## Three common errors

- Symptom: the same course has mismatched names and quantities in the course offering plan and the scheduling table. Cause: the two materials are maintained separately, their export times differ, and version synchronization was not performed.
- Symptom: the course selection rules have been updated, but the scheduling table still follows the old version. Cause: the version was not synchronized, the update receipt was not returned, and signature confirmation was missing during comparison.
- Symptom: the review conclusion has been issued, but the corresponding original record cannot be found. Cause: the memory turns value is too small, the earlier references were not carried forward, and the follow-up chain is broken.

## How to verify the setup

Acceptance for this function: ask two consecutive follow-up questions, see whether the second question inherits the reference from the first question, and check whether the referenced historical message range and answer constraints match the prior context range required by the question.

Business test: create an exception record, see whether it can be traced back to the source materials, and confirm that the exception is supported by original records and, after the reviewer signs, is handed to the person in charge for handling.

- In the application settings, check the current value of memory turns, run a trial with two consecutive questions, and compare the usage records of the two runs.
- Retrieve the original course offering plans, scheduling tables, and course selection rules, check the fields, dates, and signatures item by item, and list items missing signatures or receipts in the exception list.
