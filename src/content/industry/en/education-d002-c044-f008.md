---
title: Workflow Orchestration for Training Provider Scheduling and Lesson Records: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c044-f008
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Workflows | Checks
meta_description: Training Schedules: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Training Provider Scheduling and Lesson Records: Compare Documents and Locate Differences

## What this category's data looks like

In the scenario of scheduling and class cancellation in training institutions, there are mainly three types of materials entering the verification step: class schedules, class cancellation records, and class adjustment applications. Class schedules are updated weekly or monthly, with fields including course name, class, teacher, class date, and time slot; class cancellation records are submitted by teachers or academic affairs staff after each class, with fields including student name, course name, cancellation quantity, class date, and signature; class adjustment applications are submitted when a class adjustment occurs, with fields including original class date, new class date, involved course, and approval signature. The three types of materials have different update rhythms: class schedules are published first, class cancellation records are backfilled later, and class adjustment applications fall in between. Field naming and date formats often differ. After the materials enter the workflow, the class schedule serves as the baseline object, while class cancellation records and class adjustment applications serve as objects to be verified. Each is read by node and then enters the discrepancy localization step.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Course name, class date, time slot, and class are consistent in both materials | Read the class schedule fields and compare course name, date, and time slot one by one with the class cancellation records |
| Class cancellation record | Student name, course name, cancellation quantity, class date, and signature are complete and consistent with the ledger | Group by student and course, verify cancellation quantity and date, and check whether signature or receipt is missing |
| Class adjustment application | Original class date, new class date, and approval signature match in both materials | Compare date differences between the class adjustment application and the class schedule and class cancellation records, and mark unsynchronized versions |
| User selection node | Each option corresponds to one branch, and the interaction state is recorded | Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and reference `variables` in a subsequent node for a trial run |

## Three common errors

- Phenomenon: The same student and same course have different name spellings in the class schedule and class cancellation record, and the dates differ by one day. Cause: The two materials were entered by different personnel at different times, and no unified field mapping was performed.
- Phenomenon: The class adjustment application has been submitted, the class schedule still shows the original class date, and the class cancellation record is backfilled according to the new date. Cause: The versions are not synchronized, and the class adjustment application was not written back to the class schedule, causing the dates in the two materials to mismatch.
- Phenomenon: The class cancellation record lacks a teacher signature or receipt, and the cancellation quantity cannot be confirmed during verification. Cause: The material submission step did not enforce signature, or the receipt was not archived together with the record.

## How to verify the setup

Acceptance of this feature: run trials option by option, and check the branch direction and interaction state in the run record; confirm that each option corresponds to one branch, the interaction state is recorded, the selection result variable has been passed to subsequent nodes, and reference `variables` and `nodeId` in a subsequent node for a trial run.

Business test: use one real record to find fields inconsistent with the ledger, and record the name, quantity, date, and signature items in the discrepancy list.

- Group by course and student, compare the name, quantity, date, and signature of the class schedule, class cancellation records, and class adjustment applications one by one, and mark discrepant fields.
- Trigger the user selection node once, view the branch direction and interaction state in the run record, and confirm that the selection result variable has been passed to subsequent nodes.
