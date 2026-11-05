---
title: Workflow Orchestration for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c060-f008
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Workflows | Intake
meta_description: Research Progress: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information

## What this category's data looks like

Annual progress and acceptance of research projects involve three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are updated on an annual cycle, and their fields include task name, number of indicators, start and end dates, and signature of the person in charge; mid-term review materials are consolidated before the milestone, and their fields include stage results, use of funds, expert opinions, and receipts; acceptance reports are formed at the project completion stage, and their fields include results list, completion date, acceptance conclusion, and multi-party signatures. When the three types of materials enter this function, the annual progress report serves as the primary record source, the mid-term review materials are used for stage comparison, and the acceptance report is used for final field confirmation. Materials often show inconsistencies in the name, quantity, and date of the same record between two materials, versions not synchronized, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "intake record and items to be completed" is continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether the task name, number of indicators, start and end dates, and signature of the person in charge are complete, and whether the same items are consistent with the mid-term review materials | Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, reference the selection result variable in subsequent nodes and run a trial |
| Mid-term review materials | Whether the fields for stage results, use of funds, expert opinions, and receipts are complete, and whether the dates match the annual progress report | Compare the name, quantity, and date of the two materials, check whether the versions are synchronized, and check whether signatures or receipts are missing |
| Acceptance report | Whether the results list, completion date, acceptance conclusion, and multi-party signatures are complete, and whether the same items are consistent with earlier materials | Check the fields and dates, confirm version synchronization, check signatures or receipts, record inconsistent items, and forward them to the person handling the case |
| User selection node | Each option corresponds to one branch, and the selection result variable has been passed to subsequent nodes | Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, reference this variable in subsequent nodes and run a trial |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the annual progress report and the mid-term review materials. Cause: the two materials are maintained separately, without field-level comparison and synchronization.
- Symptom: the version of the acceptance report is not synchronized, and it still references old stage results or funding data. Cause: after the materials are updated, they are not written back to the primary record, and the node reads an expired version.
- Symptom: missing signatures or receipts still enter subsequent branches. Cause: after the interaction state is recorded, the signature and receipt fields are not validated, and the options and branch connections do not cover this missing item.

## How to verify the setup

Acceptance of this function: run a trial for each option one by one, check the branch direction and interaction state in the run record, confirm that the selection result variable has been passed to subsequent nodes, and check whether `variables` and `nodeId` references in subsequent nodes take effect.

Business test: submit a question that lacks key information and see whether it asks follow-up questions before answering; confirm that the follow-up items correspond to missing fields, dates, and signatures in the annual progress report, mid-term review materials, and acceptance report.

- Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and confirm that the interaction state is recorded and the selection result variable has been passed to subsequent nodes.
- Compare the name, quantity, date, and signature receipts of the annual progress report, mid-term review materials, and acceptance report, record inconsistent items and missing items, and forward them to the person handling the case.
