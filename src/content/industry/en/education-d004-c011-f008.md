---
title: Workflow Orchestration for School Exam Question Setting and Grading: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c011-f008
page_type: 行业问题页
application_area: education
meta_title: School Exams | Workflows | Handover
meta_description: School Exams: review workflows for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Exam Question Setting and Grading: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the scenario of exam question setting and marking in primary and secondary schools, materials are mainly of three types: the two-way specification table for question setting, the exam paper, and the marking rubric. They are drafted by the teaching and research group and the question-setting group according to the semester or exam node, and the update rhythm advances with exam batches and review rounds. The specification table carries the distribution of test points and the ratio of question types, the exam paper carries the questions and layout, and the marking rubric carries the scoring points and marking instructions. When the three types of materials enter the workflow, their roles differ: the specification table serves as the upstream basis, the exam paper serves as the main output, and the marking rubric serves as the supporting explanation. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record needs to maintain consistent names, corresponding quantities, and synchronized dates across the specification table, exam paper, and marking rubric, while signatures and receipts constitute the evidence of responsibility handover. When materials enter this function, the user first selects a node to undertake branch judgment, and then subsequent nodes continue to complete drafting and handover according to the branch.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting the branch direction and interaction status record. "Signable material drafts and handover records" are then completed by subsequent nodes continuing execution according to the branch. When the node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Whether the distribution of test points, ratio of question types, names, and dates correspond to the exam paper, and whether signatures are complete | Check names, quantities, and dates item by item against the exam paper, and inspect signatures and receipts |
| Exam paper | Whether the question names, quantities, and dates are consistent with the specification table, and whether versions are synchronized | Check options and branch connections one by one in the node, and compare the fields of the two materials |
| Marking rubric | Whether the scoring points, marking instructions, dates, and signatures are synchronized with the exam paper version | Reference the selection result variable in a subsequent node and run a trial once, then view the run record |
| Handover record | Whether the responsible person, date, version, and receipt are complete and consistent with the materials | Trigger a user selection once, and view the node status and branch direction in the run record |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the specification table and the exam paper. Cause: The two materials were drafted separately, and the fields were not synchronized within the same branch.
- Phenomenon: The marking rubric version lags behind the exam paper, and it is still signed off according to the old version during handover. Cause: The version was not synchronized, and the branch direction was not adjusted as the materials were updated.
- Phenomenon: The handover record lacks signatures or receipts, and the responsible person is unclear. Cause: After the interaction is completed, the process stops and does not continue to the sign-off step.

## How to verify the setup

Acceptance of this function: Run trials option by option, check the branch direction and interaction status in the run record, confirm that options and branches correspond one to one, and that the selection result variable has been passed to subsequent nodes; `variables` and `nodeId` can be located in the record.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check options and branch connections one by one in the node, and confirm that each option corresponds to one branch
- Trigger a user selection once, view the node status and branch direction in the run record, and check whether the selection result variable has been passed to subsequent nodes
