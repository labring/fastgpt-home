---
title: Workflow Orchestration for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c019-f008
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Workflows | Intake
meta_description: Course Scheduling: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the course selection, scheduling, and classroom resource dispatching scenario, and the materials come from three categories: course offering plans, scheduling tables, and course selection rules. Course offering plans provide course names, course codes, credits, and offering semesters; scheduling tables provide classes, teachers, weeks, periods, and classroom numbers; course selection rules provide selection batches, capacity limits, prerequisite requirements, and effective dates. After these three categories of materials enter the workflow, they respectively take on the roles of course identity, spatiotemporal occupancy, and rule constraints, and together support intake records and the items to be completed. The update cadence is centralized publication before the semester and incremental synchronization during the semester based on scheduling change receipts and version numbers. The field characteristics are that the names, quantities, and dates of the same record in the course offering plan and the scheduling table must be aligned item by item, and signatures and receipts are used to confirm that the version has taken effect.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction status records. "Intake records and the items to be completed" are continued and completed by subsequent nodes according to the branches. When the user selection node is triggered, the conversation enters the interaction state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | The course name, course code, credits, offering semester, and signature date must match the scheduling table item by item | Check the options and branch connections one by one in the node, and confirm that the missing-item follow-up branch points to the responsible person for handling |
| Scheduling table | The class, teacher, weeks, periods, classroom number, and effective date must align with the course offering plan and course selection rules | Trigger one interaction and check the node status and `nodeId` in the run record |
| Course selection rules | The selection batch, capacity limit, prerequisite requirements, version number, and receipt must be synchronized with the course offering plan and scheduling table | Reference `variables` in a subsequent node and run a trial once to confirm that the selection result variable has been passed in |
| Intake records and the items to be completed | Missing items are identified and followed up on, and the answers have a material basis | Check whether the follow-up items correspond to missing fields in the course offering plan, scheduling table, and course selection rules |

## Three common errors

- Symptom: The names, quantities, and dates of the same course in the course offering plan and the scheduling table do not match. Cause: The two tables are maintained separately, and field-level comparison by course code has not been performed.
- Symptom: The version of the course selection rules has not been synchronized, and the old batch capacity and prerequisite requirements are still being referenced. Cause: The version number and effective date have not been updated with the scheduling change receipt.
- Symptom: The scheduling table lacks a signature or receipt, and the intake record cannot confirm that it has taken effect. Cause: The scheduling change process did not return the signed document, and the follow-up items did not cover this missing item.

## How to verify the setup

This feature acceptance: run trials option by option, check the branch direction and interaction status in the run record, and confirm that `nodeId`, `variables`, and the option branches are consistent.

Business test: submit a question that lacks key information and see whether it asks a follow-up question before answering.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch and that the missing-item follow-up branch is reachable.
- Trigger one interaction, check the node status and `nodeId` in the run record, and confirm that the selection result variable `variables` has been passed to subsequent nodes.
