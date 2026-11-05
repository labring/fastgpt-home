---
title: Forms and User Interaction for Course Selection, Timetables and Classroom Allocation: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c019-f016
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Forms | Review
meta_description: Course Scheduling: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Course Selection, Timetables and Classroom Allocation: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses course selection, scheduling, and classroom resource allocation scenarios. Source materials include course offering plans, class schedules, course selection rules, and exception record sheets. Course offering plans are published at the beginning of the semester and fine-tuned mid-semester; fields include course name, course code, offering department, planned enrollment, instructor, and signature field. Class schedules are updated weekly; fields include classroom number, class time slot, class name, capacity, and date. Course selection rules change with the selection phase; fields include selection round, priority, capacity limit, and receipt. Exception record sheets are filled out by academic affairs staff or duty personnel; fields include exception type, occurrence date, involved course and classroom, and original material number. When entering the form input node, each material is collected as field values, serving as the original record support for exception tracing; review conclusions depend on subsequent nodes or manual comparison of materials before being filled in. The form itself does not identify material content, nor does it judge the authenticity of materials.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusions" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Course name, course code, planned enrollment, and signature field must correspond item by item with the class schedule; the date must not be earlier than the effective date of the course selection rules | In the node configuration, check the field names one by one, confirming that course name, course code, planned enrollment, date, and signature field have all been created as form fields and marked as required |
| Class schedule | Classroom number, class time slot, class name, and capacity must be consistent with the course selection rules; the name, quantity, and date of the same record in the two materials must not mismatch | Reference the `formInputResult` field values for a trial run, check whether the class schedule fields correspond one-to-one with the course offering plan fields, and check whether the versions are synchronized |
| Course selection rules | Selection round, priority, capacity limit, and receipt must be consistent with the class schedule capacity; entries missing a signature or receipt must be listed separately | In subsequent nodes, reference the `selectResult` output values and run a trial, confirming that the course selection rule field values can be retrieved after submission, and check whether the receipt and signature are complete |
| Exception record sheet | Exception type, occurrence date, involved course and classroom, and original material number must be traceable to the source material | In subsequent nodes, reference the `formInputResult` field values and run a trial, confirming that the exception record sheet field values can be passed to subsequent nodes for tracing the source material |

## Three common errors

- Symptom: The name and planned enrollment of the same course do not match between the course offering plan and the class schedule. Cause: The two materials are maintained separately, no field-level comparison is performed at form submission, and versions are not synchronized.
- Symptom: The capacity limit in the course selection rules is inconsistent with the classroom capacity in the class schedule, and the dates also do not match. Cause: After the course selection rules are updated, they are not synchronized to the class schedule, and the form does not record a version number.
- Symptom: The review conclusion lacks a signature or receipt, and the exception record sheet cannot be traced to the source material. Cause: Key material fields are not marked as required, and subsequent nodes cannot retrieve values after submission.

## How to verify the setup

Acceptance of this feature: Fill out and submit once, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` field values can be passed to subsequent nodes, that submission is not possible when required items are empty, and that the conversation does not get stuck in the interactive state.

Business test: Create an exception record, see whether it can be traced to the source material, and check whether the fields, dates, and signatures of the course offering plan, class schedule, and course selection rules match.

- In the node configuration, check the field names one by one, confirming that the fields of the course offering plan, class schedule, course selection rules, and exception record sheet correspond one-to-one with the material fields to be collected, and that key material fields are marked as required.
- In subsequent nodes, reference the `formInputResult` and `selectResult` field values and run a trial, confirming that the corresponding field values can be retrieved after submission, and check whether the exception record sheet can be traced to the source material.
