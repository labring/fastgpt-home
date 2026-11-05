---
title: Workflow Orchestration for Course Selection, Timetables and Classroom Allocation: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c019-f008
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Workflows | Checks
meta_description: Course Scheduling: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Course Selection, Timetables and Classroom Allocation: Compare Documents and Locate Differences

## What this category's data looks like

In the course selection, scheduling, and classroom resource allocation scenario, materials fall into three categories: course offering plans, scheduling tables, and course selection rules. Course offering plans are exported from the academic affairs system and include course names, class sizes, start and end dates, and signature fields; scheduling tables come from scheduling tools and include classroom numbers, time slots, instructors, and receipts; course selection rules come from the rule base and include selection conditions, capacity, and version numbers. The update rhythm is centralized refresh at the beginning of the semester, with incremental synchronization based on change orders during the semester. When materials enter this function, course offering plans serve as the baseline ledger, while scheduling tables and course selection rules serve as materials to be verified, each taking on the input role for field comparison and discrepancy localization.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether course names, class sizes, start and end dates, and signatures are consistent with the ledger | Compare name, quantity, and date fields one by one, and flag records missing signatures |
| Scheduling table | Whether classroom numbers, time slots, instructors, and receipts correspond to the course offering plan | Check whether receipts are present, and check whether the dates of the same record in the two materials do not match |
| Course selection rules | Whether selection conditions, capacity, and version numbers are synchronized with the currently effective version | Compare version numbers, locate unsynchronized fields, and record discrepancies |
| User selection node | Whether each option corresponds to a branch, and whether the interaction state is recorded | Check options and branch connections one by one in the node, and reference `variables` and `nodeId` for a trial run |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the course offering plan and the scheduling table. Cause: The two materials are maintained by different stages, and the field definitions are not unified.
- Symptom: The course selection rule version is not synchronized, and capacity and conditions still use old values. Cause: Incremental synchronization was not triggered after the rule base was updated, and the scheduling table continues to use a historical version.
- Symptom: The scheduling table lacks signatures or receipts, making it impossible to confirm that changes have taken effect. Cause: When the change order was processed, the signature field was not written back, and receipts were not archived with the materials.

## How to verify the setup

This function's acceptance: run trials option by option, check the branch directions and interaction states in the run records, and confirm that `variables` and `nodeId` can be referenced in subsequent nodes.

Business test: use one real record to find fields inconsistent with the ledger, and mark the locations where names, quantities, or dates do not match.

- Check options and branch connections one by one in the node, and trigger once to view the node status in the run records
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the branch direction is consistent with the interaction state record
