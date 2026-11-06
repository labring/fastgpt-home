---
title: Workflow Orchestration for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c011-f008
page_type: 行业问题页
application_area: education
meta_title: School Exams | Workflows | Intake
meta_description: School Exams: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on question intake and missing-item follow-up in primary and secondary school exam question setting and grading scenarios. The materials entering the workflow include the question-setting two-way specification table, the exam paper, and the scoring rubric; the three respectively carry the distribution of test points and score structure, the question content and paper information, and the scoring standards and explanation of scoring points. Materials are usually updated by exam batch and enter in batches along with the stages of question-setting finalization, review, and grading. Fields are mainly tables and entries, including names, quantities, dates, signatures, and receipts. Intake records and the completed follow-up items are continued by subsequent nodes according to branches. When materials enter this function, they are respectively used to identify missing items, compare fields, and confirm signature status, as the basis for follow-up questions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch direction and interaction status records. "Intake records and the completed follow-up items" are continued and completed by subsequent nodes according to branches. When the node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Whether the name, quantity, date, and signature are consistent with the exam paper and scoring rubric | Check the specification table fields item by item, verify the options and branch connections one by one in the node, and confirm the branch direction for missing-item follow-up |
| Exam paper | Whether the paper name, number of questions, and date match the specification table and scoring rubric | Reference `variables` and `nodeId` in subsequent nodes, and run a trial once to see whether the selection result variable is passed to subsequent nodes |
| Scoring rubric | Whether the scoring points, signature, and receipt are complete, and whether the version is synchronized | Trigger a user selection node once, and check the node status and branch direction in the run record |
| Intake record | Whether missing items are identified and followed up, and whether the answer is based on materials | Ask a question missing key information, see whether it first follows up before answering, then transfer it to the handler |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the specification table and the exam paper. Cause: The two materials are maintained separately, and the fields have not been cross-checked.
- Phenomenon: The version of the scoring rubric is not synchronized, and the scoring points referenced in the follow-up do not match the current exam paper. Cause: Materials enter in batches, and the version identifier is not updated with the batch.
- Phenomenon: When a signature or receipt is missing, an answer is still given directly without first following up. Cause: The missing-item identification branch is not triggered, and the interaction status is not recorded.

## How to verify the setup

Acceptance of this function: run trials option by option, check the branch direction and interaction status in the run record, and confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes.

Business test: ask a question missing key information, see whether it first follows up before answering, and check whether the answer is based on materials.

- In the node, verify the options and branch connections one by one, and after triggering once, check the node status in the run record.
- Reference `variables` and `nodeId` in subsequent nodes and run a trial once, and check the missing-item follow-up and material basis.
