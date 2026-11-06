---
title: Workflow Orchestration for College Admissions Health Examination Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c053-f008
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Workflows | Intake
meta_description: Admissions Health Exams: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for College Admissions Health Examination Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the university admissions physical examination organization scenario, with materials drawn from three categories: physical examination forms, re-examination applications, and restricted-major notifications. The physical examination form is filled in by the candidate and verified by the school doctor, and contains name, ID number, past medical history, physical examination conclusion, date, and signature; the re-examination application is initiated by the candidate or the handler, and contains the reason for application, original physical examination conclusion, application date, and receipt; the restricted-major notification is issued by the admissions department, and contains the major name, basis for restriction, notification date, and candidate acknowledgment. The three material categories have different update rhythms: physical examination forms are entered in batches centrally, re-examination applications are submitted at any time on a case-by-case basis, and restricted-major notifications are generated in batches along with the admissions process. In terms of field characteristics, name, quantity, date, and signature are the keys to cross-material alignment; the same record often exhibits inconsistent name spellings, different quantity calibers, contradictory date ordering, unsynchronized versions, and missing signatures or receipts. When the materials enter the Q&A intake and missing-item follow-up function, they serve respectively as the source of facts, the basis for follow-up questions, and the notification voucher, and are read by workflow nodes to determine missing items and organize follow-up questions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. "Intake records and items to be completed" are then completed by subsequent nodes continuing execution along the branch. When a node is triggered, the conversation enters an interactive state and the workflow state is recorded; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Whether name, ID number, physical examination conclusion, date, and signature are complete, and whether the name and date of the same record match across the two materials | Check fields and signature item by item, mark missing items as pending follow-up; reference the selection result variable in a subsequent node and run a trial run once |
| Re-examination application | Whether the reason for application, original physical examination conclusion, application date, and receipt are complete, and whether the version is synchronized | Compare the date ordering of the application and the original physical examination conclusion; if the receipt or signature is missing, add it to the follow-up question list; check the node branch connections |
| Restricted-major notification | Whether the major name, basis for restriction, notification date, and candidate acknowledgment are consistent, and whether the quantity calibers are the same | Check the correspondence between the notification and the physical examination conclusion; if the acknowledgment is missing, ask a follow-up question; view the node status in the run record |
| Intake record | Whether missing items are identified and followed up on, and whether answers are grounded in materials | Ask a question missing key information and observe whether it asks a follow-up question before answering; check whether the interaction state is recorded |

## Three common errors

- Symptom: the same candidate's name is written differently in the physical examination form and the re-examination application, and the dates also do not match. Cause: the two materials are entered separately, without cross-material field alignment and version synchronization.
- Symptom: the restricted-major notification is missing the candidate's acknowledgment or receipt, yet it still proceeds to the next step. Cause: the material completeness check only verifies the physical examination form and does not include the notification and receipt in missing-item follow-up.
- Symptom: after selecting an option, it still follows the default branch, and the process stops after the interaction is completed. Cause: the options and branch connections were not checked one by one, and the selection result variable was not passed to subsequent nodes.

## How to verify the setup

Acceptance of this feature: run a trial run for each option, check the branch direction and interaction state in the run record, confirm that options correspond one-to-one with branches and that the selection result variable has been passed to subsequent nodes, and check the references to `variables` and `nodeId` in the run record.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering; if it answers directly, the missing-item identification and follow-up step has not taken effect.

- In the node, check the options and branch connections one by one, trigger once and view the node status in the run record, and confirm that the interaction state is recorded and is not entered repeatedly.
- Reference the selection result variable in a subsequent node and run a trial run once, and check whether `variables` and `nodeId` are correctly passed along the branch, so as to avoid still following the default branch after an option is selected.
