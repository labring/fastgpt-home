---
title: Workflow Orchestration for Research Project Task Agreement Signing: Find Supporting Evidence
slug: /en/industry/education-d001-c058-f008
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Workflows | Evidence
meta_description: Research Agreements: review workflows for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Task Agreement Signing: Find Supporting Evidence

## What this category's data looks like

This category's data involves three types of materials: project task books, subject task breakdown tables, and budget books. The project task book provides the project name, undertaking unit, start and end dates, and signature page; the subject task breakdown table lists research content, responsible persons, milestone dates, and signatures by subject; the budget book lists amounts, calculation bases, and approval signatures by budget category. The material source is research management archived documents, and the update cadence keeps pace with signing, changes, and budget adjustments. When entering workflow orchestration, the project task book serves as the primary basis, the subject task breakdown table is used to check the subject and responsible person fields, and the budget book is used to check amounts, dates, and signature receipts. These three types of materials often have mismatches in the same record name, quantity, and date, unsynchronized versions, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. The basis entries that can be traced back to the original text are continued and completed by subsequent nodes according to the branches. When a node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, the corresponding option is followed to continue execution along the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Check whether the project name, undertaking unit, start and end dates, and signature page are consistent with the budget book and subject task breakdown table | Compare the fields and dates of the three materials item by item, and view the node status corresponding to `nodeId` in the run record |
| Subject task breakdown table | Check whether the subject name, responsible person, milestone dates, and signature match the project task book and budget book | Reference the selection result variable in `variables` in a subsequent node, and run a trial to see the branch direction |
| Budget book | Check whether the budget category amounts, calculation bases, approval signatures, and receipts are synchronized with the project task book dates and version | Trigger a user selection node once, and view the interaction state and branch connections in the run record |
| User selection node | Each option corresponds to one branch; after the interaction is completed, the process continues and does not re-enter the interaction | Check the options and branch connections one by one in the node, and check whether `variables` has been passed to subsequent nodes |

## Three common errors

- Symptom: the same subject name is written differently in the project task book and the subject task breakdown table. Cause: the two materials are maintained separately, and field alignment has not been done.
- Symptom: the budget book amount does not match the project task book date. Cause: the versions are not synchronized, and after a change only one material was updated.
- Symptom: the signature page or receipt is missing, but the process still continues. Cause: the material archive is incomplete, and signatures and receipts were not checked during verification.

## How to verify the setup

Feature acceptance: run trials option by option, check the branch direction and interaction state in the run record, and confirm that the node status corresponding to `nodeId` is consistent with the option.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check whether `variables` is referenced by subsequent nodes.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch
- Trigger a user selection node once, and view the node status and interaction state in the run record
