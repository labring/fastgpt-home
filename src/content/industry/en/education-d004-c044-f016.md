---
title: Forms and User Interaction for Training Provider Scheduling and Lesson Records: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c044-f016
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Forms | Handover
meta_description: Training Schedules: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Training Provider Scheduling and Lesson Records: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the course scheduling and course consumption scenario in training institutions. Materials come from three types of ledgers: class schedules, course consumption records, and course change applications. Class schedules are updated weekly or monthly, with fields including course name, class, teacher, classroom, class date, and time slot; course consumption records are generated per session, with fields including student name, course name, number of class hours, consumption date, and signature; course change applications are initiated as needed, with fields including original class date, new class date, reason for change, and approval signature. The three types of materials play different roles when entering the form input node: class schedules and course change applications provide the basis for scheduling changes, while course consumption records provide evidence of class hour consumption and responsibility handover. Material drafting and responsibility handover require complete fields, clear responsible parties, consistent versions and dates, and handover to the next stage for sign-off.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The material drafts and handover records that can be issued are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Fields include course name, class, teacher, classroom, class date, and time slot; the date is consistent with the course consumption record | Check field names one by one in the node configuration, and compare the course name and date between the class schedule and the course consumption record |
| Course consumption record | Fields include student name, course name, number of class hours, consumption date, and signature; the quantity is consistent with the course change application | Check the required settings one by one, and verify the number of class hours, signature, and receipt between the course consumption record and the course change application |
| Course change application | Fields include original class date, new class date, reason for change, and approval signature; the version and date are synchronized | Reference this field in subsequent nodes and run a test, and check whether the version number and date are synchronized |
| formInput | After the form input node is triggered, it enters the interactive state; after the required items are submitted, the field values are passed to subsequent nodes | Reference the `formInputResult` field in subsequent nodes and run a test, and check the `userSelect` value |

## Three common errors

- Symptom: The course name, number of class hours, and date of the same record do not match between the class schedule and the course consumption record. Cause: The two materials were drafted separately without field-level comparison.
- Symptom: The version of the course change application is not synchronized, and the original class date and new class date are inconsistent between the two materials. Cause: The version number and date were not updated in sync with the course change.
- Symptom: The course consumption record lacks a signature or receipt, so responsibility handover cannot be confirmed. Cause: The required marker did not cover the signature and receipt fields, so submission was not blocked.

## How to verify the setup

This feature acceptance: Fill out the form once and submit it, check the field values obtained by subsequent nodes, and confirm that the `formInputResult` field and `userSelect` value are passed correctly.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check field names one by one in the node configuration, and confirm they correspond one-to-one with the material fields to be collected.
- Check the required settings one by one, and confirm that key material fields are marked as required, and that subsequent nodes can obtain the corresponding field values after submission.
