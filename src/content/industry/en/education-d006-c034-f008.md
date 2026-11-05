---
title: Workflow Orchestration for Public Vocational Skills Level Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c034-f008
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Workflows | Progress
meta_description: Skills Certification: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Public Vocational Skills Level Assessment: Track Progress and Check Statistics

## What this category's data looks like

For progress records and statistical verification of social assessment of occupational skill level certification, the main materials are the assessment implementation plan, candidate registration forms, and assessor dispatch forms. The implementation plan comes from the assessment institution and is updated by batch; its fields include occupational direction, level, assessment modules, dates, and signature fields; the registration form is filled in by candidates and consolidated by the institution; its fields include name, ID number, declared level, payment, and receipt; the dispatch form is issued by the assessor management department; its fields include assessor name, certificate number, dispatch date, and signature. When the three types of materials enter the workflow, their roles differ: the implementation plan defines the criteria and modules, the registration form provides the number of records, and the dispatch form provides the basis for assessor attendance. The update rhythm follows batches. A common field characteristic is that the same record is scattered across multiple materials in terms of name, quantity, and date, the positions of signatures and receipts are not uniform, and versions change as batches are adjusted.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "progress table and statistical criteria description" is then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Assessment implementation plan | Whether the occupational direction, level, assessment modules, dates, and signature fields match the registration form and dispatch form | Compare the level and module names in the plan and registration form item by item, verify the dates and signature fields, check the options and branch connections one by one in the node, and reference `nodeId` to locate the branch |
| Candidate registration form | Whether the name, ID number, declared level, payment, and receipt are consistent with the plan's criteria | Extract records by batch, check whether the name and level are consistent with the plan, check whether the receipts are complete, reference `variables` in subsequent nodes, and run a test once |
| Assessor dispatch form | Whether the assessor name, certificate number, dispatch date, and signature match the plan and registration form | Compare the module dates in the dispatch form and the plan, verify the certificate number and signature, trigger a user selection node once, and check the node status in the run record |
| Progress table and statistical criteria description | Whether the number of records and the statistical counts match, and whether the criteria are written in the header | Use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated, and check the branch direction and interaction state in the run record |

## Three common errors

- Symptom: The level name for the same candidate does not match between the registration form and the implementation plan. Cause: The two materials each maintain their own fields, versions are not synchronized, names and quantities are not cross-checked, and dates are also written separately.
- Symptom: The assessor dispatch form lacks a signature or receipt, and the payment column in the registration form is blank. Cause: Signatures and receipts were not collected during the material circulation stage, and each item was not verified one by one during consolidation, causing the number of records and the statistical counts to fail to match.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, the selection result variable was not passed to subsequent nodes, and the same session repeatedly entered the interaction.

## How to verify the setup

Acceptance for this feature: run a test for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and use `variables` and `nodeId` references to locate them.

Business test: use one week of records to verify the totals, see whether the criteria and exceptions are clearly stated, and check that the number of records and the statistical counts match and that the criteria are written in the header.

- In the node, check the options and branch connections one by one, trigger a user selection node once, check the node status in the run record, and confirm that the interaction state is recorded.
- Reference the selection result variable in subsequent nodes and run a test once, use one week of records to verify the totals, and check whether the criteria and exceptions are clearly stated.
