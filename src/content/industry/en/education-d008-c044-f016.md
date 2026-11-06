---
title: Forms and User Interaction for Training Provider Scheduling and Lesson Records: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c044-f016
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Forms | Access
meta_description: Training Schedules: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Training Provider Scheduling and Lesson Records: Manage Authorized Access and External Services

## What this category's data looks like

Scheduling and class-hour deduction for training institutions draws on three types of materials: class schedules, class-hour deduction records, and schedule-change requests. A class schedule contains the course name, class, teacher, date, and time slot; a class-hour deduction record contains the student, course, deducted class hours, date, and signature; a schedule-change request contains the original session, target session, reason, date, and receipt. The update cadence is weekly scheduling, per-session class-hour deduction, and schedule changes as needed; date and signature are the key fields for aligning across materials. When the materials enter the form input node, their respective roles are: the class schedule provides the basis for the scheduling entry point and visible scope, the class-hour deduction record provides the basis for class-hour deduction, and the schedule-change request provides the basis for changes and approval. Together, the three determine the entry point and authorization scope opened to parents or superiors.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). "The entry point and authorization scope that can be exposed externally" is then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | Correspond one-to-one with the material fields to be collected; the field names, dates, and signatures of the class schedule, class-hour deduction record, and schedule-change request can be aligned item by item | Check the field names one by one in the node configuration, reference them with `formInput`, and run a trial |
| Required markers | Key material fields are marked as required; submission is not possible when a signature or receipt is missing | Check the required settings one by one, and use `userSelect` to check whether the options cover the schedule-change reason |
| Field passing after submission | Subsequent nodes can retrieve the corresponding field values, and the name, quantity, and date of the same record match across the three materials | Reference the field in a subsequent node and run a trial, checking the value retrieved by `formInput` |
| Authorization scope | The visitor's identity matches the visible scope; unauthorized access is not visible | Access once with a restricted identity and see whether the visible scope matches the setting |

## Three common errors

- Symptom: The course name, deducted class hours, or date of the same class-hour deduction record do not match between the class schedule and the class-hour deduction record. Cause: Field names were not aligned item by item, and after submission the values were not backfilled according to the material fields.
- Symptom: The schedule-change request version is not synchronized, and the old session still appears in the externally exposed entry point. Cause: After form submission, subsequent nodes were not triggered to update the authorization scope.
- Symptom: A class-hour deduction record still enters the visible scope when its signature or receipt is missing. Cause: Key material fields were not marked as required, so subsequent nodes cannot retrieve the values after submission.

## How to verify the setup

Acceptance for this feature: fill in the form once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult`, and the required items are consistent.

Business test: access once with a restricted identity and see whether the visible scope matches the setting

- Check the field names and required settings one by one in the node configuration, and confirm that the fields of the class schedule, class-hour deduction record, and schedule-change request correspond one-to-one
- Reference the field in a subsequent node and run a trial, and confirm that the corresponding field values can be retrieved after submission
