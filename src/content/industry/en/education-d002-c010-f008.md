---
title: Workflow Orchestration for School Timetables and After-School Scheduling: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c010-f008
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Workflows | Checks
meta_description: School Timetables: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Timetables and After-School Scheduling: Compare Documents and Locate Differences

## What this category's data looks like

In the scenario of primary and secondary school timetables and after-school service scheduling, materials come from the master timetable exported from the academic scheduling system, teacher assignment tables, after-school service project tables, and paper-signed receipts submitted by grade groups. The master timetable is updated weekly, assignment tables change with teacher schedule adjustments, after-school service project tables are released in batches per semester, and receipts are collected before project launch. Field characteristics center on class, course name, assigned teacher, weekly class hours, class date, service project name and number of participants, and signature field. The three types of materials play different roles when entering the workflow: the master timetable serves as the baseline object, the assignment table serves as the comparison source, and the after-school service project table and receipts serve as supplementary verification sources. Material versions and dates must be fixed item by item to avoid overwriting by older versions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction status records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branches. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Class, course name, weekly class hours, class date, and signature field are consistent between the two materials | Compare class, course name, and weekly class hours between the master timetable and the teacher assignment table item by item; in the node, check options and branch connections one by one, and verify the record corresponding to `nodeId` |
| Teacher assignment table | The dates and quantities for the same teacher and same course match the master timetable | Extract teacher name, course, and date fields from the assignment table and compare them with the same records in the master timetable; reference `variables` in subsequent nodes and run a trial once |
| After-school service project table | Project name, number of participants, and service date are consistent with receipt records, and signatures are complete | Verify the project name, number of participants, and date between the project table and receipts; trigger a user selection node once and check the node status in the run record |
| Signed receipt | The receipt signature field is synchronized with the project table version date | Check whether the receipt signature field and the project table release date are from the same batch; trigger once and check the node status in the run record |

## Three common errors

- Symptom: The course names for the same class do not match between the two materials. Cause: The versions of the master timetable and assignment table are not synchronized, and old-version fields are still in use.
- Symptom: The number of participants in the after-school service project is inconsistent with the receipt quantity. Cause: After the project table was updated, receipts were not collected in sync, and signatures or receipts are missing.
- Symptom: After selecting an option, the default branch is still followed. Cause: Options and branch connections were not checked one by one, and the selection result variable was not referenced correctly.

## How to verify the setup

Feature acceptance: run trials for each option one by one, check the branch direction and interaction status in the run record, confirm that each option corresponds to one branch, and check whether the `variables` and `nodeId` records are complete.

Business test: use one real record to find fields inconsistent with the ledger, submit them to the reviewer for confirmation, and write them back.

- In the node, check options and branch connections one by one, trigger once, and view the node status in the run record.
- Reference the selection result variable in subsequent nodes and run a trial once to confirm that the process continues downward after the interaction is completed.
