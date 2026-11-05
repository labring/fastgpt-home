---
title: Workflow Orchestration for Vocational School Student Internships: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c030-f008
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Workflows | Review
meta_description: Student Internships: review workflows for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Vocational School Student Internships: Trace Exceptions and Review Results

## What this category's data looks like

This category's data includes three types of materials: internship agreements, internship plans, and internship logs. Internship agreements contain the unit name, position, start and end dates, and signatures of the student and the unit; internship plans contain the batch, position arrangements, supervising staff, and date range; internship logs contain daily tasks, work hours, supervising confirmation, and student signature. The three types of materials come from different sources: agreements are signed by the school and the unit, plans are arranged by the professional group, and logs are filled in daily by students with periodic receipts from supervisors. In terms of update rhythm, agreements are fixed after signing per batch, plans may be slightly adjusted due to position changes, and logs are added daily. When entering the exception tracing and manual review workflow, agreements serve as the basis for ownership and duration, plans serve as the basis for arrangements and supervision, and logs serve as the basis for process and signatures. The fields, dates, and signatures of the three need to be cross-compared to locate differences in names, quantities, and dates of the same record, as well as issues of unsynchronized versions, missing signatures, or missing receipts.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. When the user selection node is triggered, the conversation enters an interaction state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option. The "exception list and review conclusion" is completed by subsequent nodes continuing execution according to the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Whether the unit name, position, start and end dates, and signatures of the student and the unit are consistent with the plan | Take the original agreement, check whether the unit name is consistent with the unit name in the plan, whether the date range covers the plan, whether the signatures and receipts are complete, and reference `variables` in subsequent nodes to record the comparison result |
| Internship plan | Whether the batch, position arrangements, supervising staff, and date range are consistent with the logs | Take the original plan, check whether the position arrangements correspond to the daily tasks in the logs, whether the supervising staff are consistent with the supervising confirmation in the logs, whether the date range covers the log dates, and check the branch direction corresponding to `nodeId` in the run record |
| Internship log | Whether the daily tasks, work hours, supervising confirmation, and student signature are consistent with the plan | Take the original log, check whether the daily tasks correspond to the positions in the plan, whether the work hours match the plan dates, whether the supervising confirmation and student signature are complete, and separately mark entries missing signatures or receipts |
| Exception record | Whether the exception is supported by original records and whether the reviewer has signed | Extract one item from the exception list, trace it back to the original fields and dates in the agreement, plan, and log, confirm that the name, quantity, and date match, and after the reviewer signs, hand it over to the responsible person for handling |

## Three common errors

- Phenomenon: The unit name or date of the same internship record does not match between the agreement and the log. Cause: The two materials are filled in by different roles, no cross-check was performed, and versions are not synchronized.
- Phenomenon: The number of position arrangements in the internship plan is inconsistent with the number of daily tasks in the log. Cause: After the plan was adjusted, it was not synchronized to the log template, and students filled it in according to the old version, resulting in a quantity mismatch.
- Phenomenon: The log lacks supervising confirmation or student signature, and the source material cannot be traced during review. Cause: The receipt step is not closed-loop, and signatures and receipts are not archived together with the log.

## How to verify the setup

This feature acceptance: run through each option one by one, check the branch direction and interaction status in the run record, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and reference `variables` and `nodeId` in subsequent nodes to check the branch direction and interaction status record.

Business test: create an exception record, see whether it can be traced back to the source material, check that the exception is supported by original records and the reviewer has signed, and hand it over to the responsible person for handling.

- In the user selection node, check the options and branch connections one by one, confirm that each option corresponds to one branch, and trigger once to view the node status in the run record.
- Reference the selection result variable in a subsequent node and run it once to confirm that after the interaction is completed the process continues downward and does not stop, and that the same session does not repeatedly enter the interaction.
