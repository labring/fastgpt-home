---
title: Workflow Orchestration for School Exam Question Setting and Grading: Find Supporting Evidence
slug: /en/industry/education-d001-c011-f008
page_type: 行业问题页
application_area: education
meta_title: School Exams | Workflows | Evidence
meta_description: School Exams: review workflows for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Exam Question Setting and Grading: Find Supporting Evidence

## What this category's data looks like

The primary and secondary school exam question setting and grading category includes materials such as the two-way specification table for question setting, exam papers, and scoring rubrics. The source is submissions from school-level teaching and research groups and grade-level groups, and the update cadence rolls with exam batches and revision versions. Field characteristics: the specification table has assessment point numbers, question types, score values, and cognitive levels; the exam paper has question numbers, question stems, answers, and score values; the scoring rubric has question numbers, scoring points, scoring instructions, signatures, and dates. When the materials enter this function, the specification table serves as the reference baseline for assessment points and score values, the exam paper serves as the placement of questions and score values, and the scoring rubric serves as the evidence for scoring points and signatures. Together, the three support basis entries that can be traced back to the original text.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Item specification table | Whether the test point number, question type, score, cognitive level match the test paper question number and score item by item, and whether the version is current | Compare the test paper question numbers and scores item by item according to the test point numbers, check the date and signature, and record discrepant items |
| Test paper | Whether the question number, question stem, answer, score, and the scoring points and scoring instructions in the scoring rubric match, and whether the version is synchronized | Extract the same question number, check the question stem and answer, compare the scoring points in the rubric, and mark missing signatures or receipt items |
| Scoring rubric | Whether the scoring points, scoring instructions, signature, and date are complete, and whether they are consistent with the name, quantity, and date of the specification table and test paper | Check the scoring points and scoring instructions question by question, inspect signatures and receipts, and record inconsistencies in names and dates |
| User selection node | Whether each option corresponds to a branch, whether the interaction state is recorded, and whether the selection result variable is passed to subsequent nodes | Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, reference `variables` in subsequent nodes, and run a trial |

## Three common errors
- Symptom: the names, quantities, and dates of the same assessment point do not match across two materials. Cause: the specification table and exam paper were revised separately, without item-by-item comparison.
- Symptom: the scoring rubric version was not synchronized, and scoring is still based on old scoring points. Cause: the current version was not replaced after revision, and there is no version identifier.
- Symptom: the rubric lacks signatures or receipts, and basis entries cannot be traced back to the original text. Cause: signatures and receipts were not fully collected during the submission step.

## How to verify the setup

Acceptance for this function: run trials option by option, check the branch directions and interaction states in the run record, confirm that each option corresponds to one branch, that the process continues after the interaction is completed, and that the selection result variable has been passed to subsequent nodes; you can use `nodeId` to locate the node.

Business test: ask a basis question that spans materials, and see whether the answer provides a traceable source.

- In the user selection node, check options and branch connections one by one, trigger once, and view the node status in the run record.
- Reference `variables` in a subsequent node and run a trial once, confirm that the selection result variable has been passed in, and record the branch direction.
