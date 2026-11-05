---
title: Workflow Orchestration for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c039-f008
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Workflows | Intake
meta_description: Exam Administration: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information

## What this category's data looks like

This category covers exam administration and disciplinary handling; materials include the exam administration manual, examination room record sheets, and disciplinary fact records. The exam administration manual is updated annually, with fields including exam name, subject, date, examination room number, disciplinary clauses, and handling authority; examination room record sheets are filled per session, with fields including examination room number, expected and actual attendance, absent-candidate list, abnormal situations, and invigilator signature; disciplinary fact records are created per incident, with fields including candidate information, disciplinary behavior, time and place, evidence list, handler signature, and receipt. When materials enter the workflow, the exam administration manual serves as the basis for determination, the examination room record sheet provides on-site facts, and the disciplinary fact record carries the handling conclusion. In terms of update cadence, the manual changes with institutional revisions, record sheets are archived per session, and fact records flow with incidents. The dates, names, quantities, and signatures of the three materials often need cross-comparison.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Intake records and items to be completed" are continued and completed by subsequent nodes according to the branch. When a node is triggered, the conversation enters an interactive state and the workflow state is recorded; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Check whether the dates of the manual version, disciplinary clauses, and handling authority match the current exam year, and whether the signature fields are complete | In the node, check the options and branch connections one by one, confirm that the manual clauses correspond to the branches; reference `variables` to record the version, and run a trial to view the node status in the run record |
| Examination room record sheet | Check whether the name, quantity, and date of the same record match across the two materials, whether the absent-candidate list is consistent with expected and actual attendance, and whether the invigilator signature and receipt are complete | Trigger a user selection node once, reference the selection result variable in a subsequent node and run a trial, and check the mapping between the record sheet fields and the manual clauses |
| Disciplinary fact record | Check whether the disciplinary behavior, time, and place are consistent with the examination room record sheet, and whether the evidence list, handler signature, and receipt have missing items | In the node, check the options and branch connections one by one, use `nodeId` to locate the node, and confirm the branch direction and interaction state record corresponding to the fact record |
| Intake records and items to be completed | Check whether missing items are identified and followed up on, whether the answers are based on materials, and whether the question items correspond to the fields of the three materials | Run a trial once, view the branch direction and interaction state in the run record, and confirm that the completion question items are continued by subsequent nodes according to the branch |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the examination room record sheet and the disciplinary fact record. Cause: the two materials are filled in separately, no cross-comparison is performed, and the field definitions are not unified.
- Symptom: the exam administration manual version is not synchronized, and old clauses are still referenced. Cause: the manual is updated annually, the node branches are not adjusted with the version, and the referenced content is not refreshed with the version.
- Symptom: the disciplinary fact record lacks the handler signature or receipt. Cause: no signature verification is set up in the material circulation step, the receipt is not archived with the record, and missing items are not identified and followed up on.

## How to verify the setup

Feature acceptance: run trials for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and use `variables` and `nodeId` to locate and verify.

Business test: submit a question that lacks key information, see whether it asks a follow-up question before answering, confirm that missing items are identified and followed up on, that the answer is based on materials, and then transfer it to the handler.

- In the node, check the options and branch connections one by one, trigger a user selection node once, and view the node status and branch direction in the run record.
- Reference the selection result variable in a subsequent node and run a trial once, and check whether the fields, dates, and signatures of the exam administration manual, examination room record sheet, and disciplinary fact record are consistent.
