---
title: Workflow Orchestration for School Exam Question Setting and Grading: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c011-f008
page_type: 行业问题页
application_area: education
meta_title: School Exams | Workflows | Versions
meta_description: School Exams: review workflows for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Exam Question Setting and Grading: Maintain Document Versions and Changes

## What this category's data looks like

This category's data involves three types of materials: the two-way specification table for question setting, the exam paper, and the grading rubric. The specification table comes from the teaching research group and is updated by semester or exam batch; its fields include assessment point, question type, score, cognitive level, question setter, date, and signature. The exam paper comes from the question-setting group and is updated by exam session; its fields include question number, question stem, options, answer, score, reviewer, date, and signature. The grading rubric comes from the grading group and is updated by grading standard revision; its fields include question number, scoring point, scoring description, verifier, date, and receipt. When these three types of materials enter workflow orchestration, the specification table serves as the basis for question setting, the exam paper serves as the content carrier, and the grading rubric serves as the basis for scoring; each plays its own role in the registration, comparison, and reference synchronization of the version ledger and change records.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option. The "version ledger and change records" are then completed by subsequent nodes continuing execution along the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Whether the assessment point, question type, score, cognitive level, question setter, and date signature are consistent with the exam paper and grading rubric | Check the options and branch connections one by one in the node, reference `variables` and `nodeId`, and compare the question numbers, scores, and dates of the specification table and the exam paper |
| Exam paper | Whether the question number, question stem, answer, score, reviewer, and date signature are consistent with the specification table and grading rubric | Trigger one user selection, check the node status in the run record, and verify the question numbers, scoring points, and dates of the exam paper and grading rubric |
| Grading rubric | Whether the question number, scoring point, scoring description, verifier, and date receipt are consistent with the exam paper and specification table | Reference the selection result variable in a subsequent node and run a trial once, and verify the scoring points and verifier signature of the grading rubric and exam paper |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the specification table and the exam paper. Cause: The two materials are maintained separately, no cross-check is performed in the node, and the branch direction is not recorded.
- Symptom: The exam paper has been changed, but the grading rubric still uses the old version, and the versions are not synchronized. Cause: After the change, the user selection node was not triggered to go through the branch again, and the old version is still referenced.
- Symptom: The grading rubric lacks a verifier signature or receipt, and the exam paper lacks a reviewer signature. Cause: The node only records the interaction state and does not include signature fields in the branch judgment conditions.

## How to verify the setup

Acceptance for this feature: run trials option by option, check the branch direction and interaction state in the run record, confirm that the selection result variable has been passed to subsequent nodes, and run a trial once in a subsequent node referencing `variables` and `nodeId`.

Business test: change one piece of content, see whether the version number and references are updated synchronously, and confirm that the current version is unique, the old version is traceable, and references are synchronized.

- Check the options and branch connections one by one in the node to ensure that each option corresponds to one branch, avoiding the situation where selecting an option still follows the default branch.
- Trigger one user selection, check the node status in the run record, confirm that the process continues downward after the interaction is completed, and that the same session does not enter the interaction repeatedly.
