---
title: Forms and User Interaction for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c044-f016
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Forms | Intake
meta_description: Training Schedules: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the course scheduling and course consumption scenarios of training institutions. The materials come from three types: class schedules, course consumption records, and schedule change requests. Class schedules are updated weekly or monthly and carry fields such as class, course, teacher, classroom, and time slot; course consumption records are generated per session and include student, subject, number of class hours, teaching date, and signature field; schedule change requests are submitted with temporary changes and include the original session, the new session, the reason for the change, approval comments, and receipt. When these three types of materials enter the form input node, each plays a different role: the class schedule is the scheduling baseline, the course consumption record is the basis for course consumption, and the schedule change request is the explanation of differences. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The name wording, number of class hours, and teaching date of the same record may not match across different materials, and version desynchronization, missing signatures, or missing receipts may also occur.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The intake record and the completed follow-up questions are then handled by subsequent nodes or manually. The form fields correspond one-to-one with the material fields to be collected, key fields are marked as required, and after submission the subsequent nodes obtain the corresponding field values.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | The field names correspond one-to-one with the material fields to be collected from the class schedule, course consumption record, and schedule change request; the name, quantity, date, and signature columns can be compared item by item | Check the field names one by one in the node configuration, and reference the `formInputResult` field in subsequent nodes for a trial run |
| Required markers | Key material fields are marked as required; if the name, quantity, date, or signature is missing, submission cannot proceed directly | Check the required settings one by one, and submit once with blanks to see whether it is blocked |
| Field passing after submission | Subsequent nodes can obtain the corresponding field values, and the intake record and completed follow-up questions can be generated accordingly | Reference the field in subsequent nodes and run a trial, checking the values of `userSelect` and `formInput` |
| Class schedule and course consumption record | The name, number of class hours, and teaching date of the same session match in the two materials, and the signature or receipt is not missing | Compare the fields of the two materials one by one, mark the records that do not match, and follow up |

## Three common errors

- Symptom: The name and number of class hours of the same session do not match between the class schedule and the course consumption record. Cause: The two materials are maintained separately, are not merged by the same session number, and the field sources are inconsistent.
- Symptom: The date of the schedule change request is inconsistent with the latest class schedule. Cause: The versions are not synchronized, the old class schedule is still in circulation, and the new session has not been backfilled into the course consumption record.
- Symptom: A course consumption record missing a signature or receipt is still treated as consumed. Cause: The signature column is not listed as required, the receipt is not checked after submission, and the missing item is not followed up.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit it, check the field values obtained by subsequent nodes, and confirm that the values of `formInputResult` and `selectResult` are consistent with what was filled in.

Business test: Submit a question missing key information and see whether it asks a follow-up question first before answering.

- Check the field names and required settings one by one in the node configuration, and submit once with blanks to see whether it is blocked.
- Reference the form fields in subsequent nodes and run a trial to check whether the field values after submission can be obtained.
