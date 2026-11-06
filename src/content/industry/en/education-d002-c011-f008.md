---
title: Workflow Orchestration for School Exam Question Setting and Grading: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c011-f008
page_type: 行业问题页
application_area: education
meta_title: School Exams | Workflows | Checks
meta_description: School Exams: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Exam Question Setting and Grading: Compare Documents and Locate Differences

## What this category's data looks like

In the primary and secondary school exam question setting and grading scenario, materials mainly come from three categories: the question-setting two-way specification table, the exam paper, and the grading rubric. The two-way specification table is organized by assessment point, question type, score, and difficulty distribution, and is revised over multiple rounds as question setting progresses; the exam paper is assembled by the question setter and then enters review, containing question numbers, stems, options, answers, and scores; the grading rubric provides, for each question, scoring points, deduction points, and a signature field. The three types of materials update at different rhythms: the specification table first establishes the framework, the exam paper then takes shape, and the grading rubric is completed after the question review meeting. Field characteristics are concentrated in name, quantity, date, signature, and version number. When entering the material verification and discrepancy localization workflow, the two-way specification table serves as the baseline object, the exam paper as the object to be verified, and the grading rubric as the supplementary object; the three are compared field by field under the same record, providing the basis for the subsequent discrepancy list.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction status records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Whether the name, quantity, date, signature, and version number are consistent with the exam paper | Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and reference `variables` for a trial run |
| Exam paper | Whether the name, quantity, and date of the same record match the specification table | Reference the selection result variable in subsequent nodes and run a trial once, and check the branch direction corresponding to `nodeId` |
| Grading rubric | Whether scoring points, deduction points, signature or receipt are complete and the version is synchronized | Compare field by field against the specification table and exam paper, and record items missing a signature or receipt |
| Review write-back record | Whether the discrepancy fields have been submitted to the reviewer for confirmation and written back | Check according to the branch direction whether the write-back fields are consistent with the interaction status record |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the specification table and the exam paper. Cause: The two were revised separately and were not compared under the same version number.
- Phenomenon: The grading rubric and exam paper versions are not synchronized, and scoring points are still arranged according to old question numbers. Cause: The version field was not uniformly written back after the question review meeting.
- Phenomenon: A signature or receipt is missing, and the reviewer cannot confirm the discrepancy list. Cause: The write-back step did not trigger the interaction status, and the process stalled.

## How to verify the setup

Acceptance of this function: run trials option by option, check the branch direction and interaction status in the run record, and confirm that `variables` and `nodeId` are correctly referenced by subsequent nodes.

Business test: use a real record to find fields inconsistent with the ledger, submit them to the reviewer for confirmation, and write them back.

- In the user selection node, check the options and branch connections one by one, trigger once, and then view the node status in the run record.
- In subsequent nodes, reference the selection result variable and run a trial once, and check whether the discrepancy list continues execution according to the branch.
