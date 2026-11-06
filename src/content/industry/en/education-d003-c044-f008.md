---
title: Workflow Orchestration for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c044-f008
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Workflows | Intake
meta_description: Training Schedules: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scheduling and class cancellation scenarios of training institutions. The materials come from three types of academic administration ledgers: class schedules, class cancellation records, and schedule change requests. The update rhythm follows scheduling and class cancellation actions and occurs on a per-action basis. The class schedule serves as the baseline for course time, classroom, teacher, and class name; the class cancellation record serves as the evidence for student attendance, class hour deduction, and signed receipt; the schedule change request serves as the change record for date, reason, and approval signature. When these three types of materials enter the Q&A intake and missing-item follow-up function, they serve respectively as the scheduling fact source, the class cancellation fact source, and the schedule change fact source, to be referenced by subsequent nodes when continuing execution along branches. Field characteristics are concentrated in the name, quantity, date, and signature of the class schedule, class cancellation record, and schedule change request. The same record having mismatched name, quantity, or date across two materials, unsynchronized versions, or missing signatures or receipts are common sources of inconsistency.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. The "intake record and completed question items" are then completed by subsequent nodes continuing execution along branches. When the user selection node is triggered, the conversation enters an interactive state and the workflow state is recorded. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Whether the class schedule matches the class cancellation record and schedule change request in course name, class name, and date | Check the class schedule fields item by item against the names, quantities, and dates in the other two materials; check the options and branch connections one by one in the node, confirming that each option corresponds to one branch |
| Class cancellation record | Whether the class cancellation record is consistent with the class schedule and schedule change request in attendance quantity, class hour deduction, and signed receipt | Check the date and signature of the class cancellation record fields; trigger the user selection node once, view the node status in the run record, and confirm that the interaction state is recorded |
| Schedule change request | Whether the schedule change request is synchronized with the class schedule and class cancellation record in schedule change date, approval signature, and version | Check the date and signature of the schedule change request fields; reference the selection result variable in a subsequent node and run a test once, confirming that it has been passed to the subsequent node |
| User selection node | Whether options correspond one-to-one with branches, and whether execution continues after the interaction is completed | Run a test for each option, check the branch direction and interaction state in the run record; check the references to `nodeId` and `variables` in subsequent nodes |

## Three common errors

- Symptom: The name, quantity, or date of the same course does not match across two materials, and after follow-up the answer is still given based on the old value. Cause: The versions of the class schedule and class cancellation record are not synchronized, and the missing-item follow-up did not first check the fields.
- Symptom: The schedule change request lacks a signature or receipt, but the intake record is still treated as complete material and continues to flow. Cause: Signatures and receipts were not included in the missing-item determination, and the follow-up step was skipped.
- Symptom: After selecting an option, the default branch is still taken, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the selection result variable was not passed to the subsequent node.

## How to verify the setup

Acceptance of this function: run a test for each option, check the branch direction and interaction state in the run record, and confirm that each option corresponds to one branch, the interaction state is recorded, and the selection result variable has been passed to the subsequent node.

Business test: submit a question that lacks key information and see whether it first follows up before answering; check whether the intake record and completed question items have material basis, then forward to the handler for processing.

- Check the options and branch connections one by one in the node, trigger the user selection node once, and view the node status in the run record.
- Reference `variables` in a subsequent node and run a test once, check the branch direction corresponding to `nodeId`, and confirm that execution continues after the interaction is completed.
