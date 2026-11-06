---
title: Workflow Orchestration for School Exam Question Setting and Grading: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c011-f008
page_type: 行业问题页
application_area: education
meta_title: School Exams | Workflows | Multilingual
meta_description: School Exams: review workflows for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Exam Question Setting and Grading: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data for exam question setting and marking in primary and secondary schools includes three types: the question-setting two-way specification table, the exam paper, and the marking rubric. They are submitted by the teaching and research group and the question-setting group by semester or exam session, and updates roll forward with exam administration milestones. Their field characteristics are multilingual terminology names, quantities, dates, and signature fields. When entering workflow orchestration, the two-way specification table takes on the role of exam points and question type distribution, the exam paper takes on the role of question stems and options, and the marking rubric takes on the role of answers and scoring points. The three must be aligned under the same terminology glossary for translated names and anaphoric references, and then handed over for external release.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. "Unified terminology glossary and comparison draft" is continued and completed by subsequent nodes according to the branches.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Exam point names, quantities, dates, and signature fields must be aligned item by item with the exam paper and marking rubric | In the node, check the options and branch connections one by one, and confirm that the branch corresponding to the specification table is selected |
| Exam paper | The translated terminology names in question stems and options must be able to refer back to the source text, and the wording must be consistent throughout | Trigger a node once, and check the node status and selection result variables in the run record |
| Marking rubric | Scoring point names, quantities, dates, and signature receipts must be consistent with the specification table and exam paper | Reference this variable in a subsequent node and run a trial once, checking whether the branch direction falls to the rubric branch |
| Unified terminology glossary and comparison draft | The same terminology is consistent throughout, translated names can refer back to the source text, and there are no missing signatures before external release | Sample three terms to check whether the wording is consistent throughout, and check the references and branch records of `variables` and `nodeId` |

## Three common errors

- Phenomenon: The names and quantities of the same record do not match between the specification table and the exam paper. Cause: The versions of the two materials are not synchronized, and the terminology glossary has not been updated with the exam session.
- Phenomenon: The marking rubric is missing a signature or receipt, and this is only discovered before release. Cause: After the interaction is completed, the process stops and does not continue along the signature branch.
- Phenomenon: After selecting an option, the default branch is still taken, and the terminology glossary branch is not executed. Cause: The options and branch connections were not checked one by one, and the selection result variable was not passed to subsequent nodes.

## How to verify the setup

Acceptance of this feature: run trials for each option one by one, check the branch direction and interaction status in the run record, and confirm that the branch corresponding to `nodeId` is selected and that `variables` has been passed to subsequent nodes.

Business test: sample three terms to check whether the wording is consistent throughout, and check whether the translated names can refer back to the source text.

- In the node, check the options and branch connections one by one, and confirm that each option corresponds to one branch.
- Trigger a user selection node once, and check whether the node status and selection result variables in the run record have been passed to subsequent nodes.
