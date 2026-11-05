---
title: Workflow Orchestration for School Exam Question Setting and Grading: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c011-f008
page_type: 行业问题页
application_area: education
meta_title: School Exams | Workflows | Access
meta_description: School Exams: review workflows for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Exam Question Setting and Grading: Manage Authorized Access and External Services

## What this category's data looks like

Materials for exam question setting and grading in primary and secondary schools fall into three categories: the question-setting two-way specification table, the exam paper, and the grading rubric. Their sources are the teaching and research group and the person responsible for question setting, and their update cadence is synchronized with exam batches and review rounds. The specification table records assessment points, question types, score values, ability levels, and the question setter's signature; the exam paper carries the questions, answers, and score distribution; the grading rubric gives scoring points, score ranges, and review signatures. When these three categories of materials enter workflow orchestration, the specification table serves as the basis for question setting and the verification benchmark, the exam paper serves as the content object, and the grading rubric serves as the scoring standard; together, the three determine the externally visible scope and authorization level. Field characteristics include name, quantity, date, version number, and signature field. When dates or signatures are missing, or versions are not synchronized, the visible scope of the external entry point will be inconsistent with the settings.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Externally available entry points and authorization scope" is then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Assessment point names, quantities, dates, and signatures must be aligned item by item with the exam paper and grading rubric; version numbers must be consistent | Check the options and branch connections one by one in the node, reference `variables` and `nodeId`, and trigger one run to view the node status in the run record |
| Exam paper | Question names, quantities, score values, and dates must be consistent with the specification table; missing signatures or receipts are considered incomplete | Reference the selection result variable in a subsequent node and run a trial once, then check whether that variable has been passed to the subsequent node |
| Grading rubric | Scoring point names, quantities, dates, and versions must be consistent with the exam paper; review signatures must be complete | Trigger one user selection and check whether the node status and branch direction in the run record match the selected option |
| External entry point and authorization scope | Visitor identity matches the visible scope, and unauthorized access is not visible; restricted identities see only the configured scope | Access once with a restricted identity, check whether the visible scope matches the settings, and record the branch direction |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the specification table and the exam paper. Cause: The two materials are maintained separately, and fields are not synchronized after node selection.
- Symptom: The grading rubric version is not synchronized; the exam paper has been updated while the rubric remains the old version. Cause: After the branch direction is recorded, subsequent nodes are not triggered to re-check the version.
- Symptom: After the external entry point is opened, signatures or receipts are missing, and the authorization scope does not match the settings. Cause: After the interaction is completed, the process stops, and subsequent nodes do not continue execution according to the branch.

## How to verify the setup

Acceptance for this feature: run trials option by option and check the branch direction and interaction state in the run record; reference `variables` and `nodeId` to confirm that the selection result variable has been passed to subsequent nodes.

Business test: access once with a restricted identity and see whether the visible scope matches the settings.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Trigger one user selection and check whether the node status and branch direction in the run record match the selected option.
