---
title: Workflow Orchestration for School Exam Question Setting and Grading: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c011-f008
page_type: 行业问题页
application_area: education
meta_title: School Exams | Workflows | Review
meta_description: School Exams: review workflows for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Exam Question Setting and Grading: Trace Exceptions and Review Results

## What this category's data looks like

Materials for exam question setting and grading in primary and secondary schools mainly consist of three types: the question-setting two-way specification table, the exam paper, and the grading rubric. They come from school question-setting teams and teaching research departments, and their update cadence changes with exam batches and revision versions. Their field characteristics include name, quantity, date, signature, and receipt. After the question-setting two-way specification table enters the workflow, it serves as the basis for question setting and the record of knowledge-point coverage; the exam paper serves as the carrier of actual answers and marking; the grading rubric serves as the grading standard and review reference. During anomaly tracing, these three types of materials serve as sources for one another. The name, quantity, and date of the same record need to match across two materials. If versions are not synchronized or signatures or receipts are missing, a pending-review anomaly will be formed.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction status records. The "anomaly list and review conclusions" are then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Whether the name, quantity, date, and signature match those of the exam paper and grading rubric | Check the specification table fields against the exam paper and grading rubric item by item, inspect signatures and receipts, and reference `variables` to record the comparison results |
| Exam paper | Whether the name, quantity, and date of the same record are consistent across the two materials | Extract the question numbers, scores, and dates from the exam paper, cross-check them against the specification table and grading rubric, and inspect the node status corresponding to `nodeId` |
| Grading rubric | Whether the version is synchronized, and whether missing signatures or receipts form an anomaly | Check whether the grading rubric version number is synchronized with the exam paper and specification table, inspect signatures and receipts, and reference `variables` in subsequent nodes for a trial run |
| Anomaly record | Whether the anomaly is supported by original records and the reviewer's signature | Create an anomaly record, trace it back to the source materials, check the original records and signatures, and inspect the branch direction and interaction status |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the specification table and the exam paper. Cause: The two entries came from different sources and no cross-check was performed.
- Phenomenon: The grading rubric version is not synchronized, and the exam paper is still graded according to the old version. Cause: After revision, the related materials and receipts were not updated.
- Phenomenon: The anomaly record lacks a signature or receipt and cannot be handed to the responsible person for handling. Cause: The review step did not record the signature status and receipt number.

## How to verify the setup

Acceptance of this function: run trial executions option by option, check the branch direction and interaction status in the run records, and confirm the node status corresponding to `nodeId` and the results passed by `variables`.

Business test: create an anomaly record, see whether it can be traced back to the source materials, and check the support from original records and the reviewer's signature.

- In the node, check the options and branch connections one by one, confirm that each option corresponds to one branch, and after a trial run check the node status in the run records.
- In subsequent nodes, reference the selection result variable and run a trial execution once, confirm that the branch direction is consistent with the interaction status record, and the anomaly list and review conclusions are completed by subsequent nodes.
