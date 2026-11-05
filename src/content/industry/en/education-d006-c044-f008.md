---
title: Workflow Orchestration for Training Provider Scheduling and Lesson Records: Track Progress and Check Statistics
slug: /en/industry/education-d006-c044-f008
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Workflows | Progress
meta_description: Training Schedules: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Training Provider Scheduling and Lesson Records: Track Progress and Check Statistics

## What this category's data looks like

For class scheduling and attendance deduction in training institutions, materials come from class schedules, attendance deduction records, and schedule adjustment requests, updated weekly and archived monthly. Class schedules provide course names, classes, teachers, classrooms, and time slots; attendance deduction records provide actual attendance, leave requests, make-up classes, and class hours; schedule adjustment requests provide dates before and after adjustment, reasons, and approval signatures. The three materials play different roles when entering the workflow: class schedules are the baseline, attendance deduction records are what actually happened, and schedule adjustment requests are the source of exceptions. Field characteristics center on names, quantities, dates, signatures, and receipts, with versions identified by week or month. Progress records and statistical reconciliation require that recorded counts match statistical counts, that the definitions are written in the header, and that exceptions are explained separately.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "progress table and statistical definition notes" are continued and completed by subsequent nodes according to the branches.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Whether course names, classes, teachers, dates, and time slots correspond one by one with the attendance deduction records | Check options and branch connections one by one in the node, use `nodeId` to locate branches, and compare class schedule fields side by side with attendance deduction records |
| Attendance deduction records | Whether attendance, leave requests, make-up classes, and class hours match the class schedule and schedule adjustment requests | Trigger a user selection node once, check the node status in the run records, and verify attendance deduction quantities and dates |
| Schedule adjustment requests | Whether dates before and after adjustment, reasons, and signature receipts are complete, and whether they are synchronized with the class schedule version | Reference `variables` in subsequent nodes and run a test once, then verify the schedule adjustment requests and class schedule version |
| Progress table and statistical definition notes | Whether recorded counts match statistical counts, whether definitions are written in the header, and whether exceptions are clearly stated | Use one week of records to verify totals, and check the header definitions and exception notes |

## Three common errors

- Symptom: The same record's course name, quantity, and date do not match between the class schedule and the attendance deduction records. Cause: The two materials are maintained separately and fields are not aligned by the same week.
- Symptom: The schedule adjustment request has been updated, but the class schedule and attendance deduction records still use the old version. Cause: Versions are not synchronized, lacking a unified week or month identifier.
- Symptom: Attendance deduction records lack signatures or receipts, and schedule adjustment requests have no approval traces. Cause: The material circulation step does not require signatures and receipts to be archived.

## How to verify the setup

Acceptance for this feature: run each option one by one, check the branch directions and interaction states in the run records, and confirm that `variables` have been passed to subsequent nodes and that `nodeId` corresponds to the correct branch.

Business test: use one week of records to verify totals, and see whether definitions and exceptions are clearly stated.

- Check options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Trigger a user selection node once, check the node status in the run records, and confirm that the process continues after the interaction is completed.
