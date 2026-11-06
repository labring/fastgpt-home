---
title: Workflow Orchestration for Research Budget Adjustments and Reimbursement: Track Progress and Check Statistics
slug: /en/industry/education-d006-c059-f008
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Workflows | Progress
meta_description: Research Finance: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Budget Adjustments and Reimbursement: Track Progress and Check Statistics

## What this category's data looks like

Progress records and statistical verification for research funding budget adjustments and reimbursements draw on three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications are typically submitted quarterly by the project leader, with fields including the adjusted subject, original budget amount, adjusted amount, approval signature, and date; reimbursement forms are collected monthly by the handler, with fields including expense name, quantity, amount, occurrence date, and approval signature; contract invoices are entered by procurement or finance at payment milestones, with fields including contract number, invoice number, invoice date, amount, and receipt. The three types of materials play different roles when entering the workflow: budget adjustment applications serve as the branch starting point, reimbursement forms serve as the main verification subject, and contract invoices serve as supporting evidence. The update cadence is rolling within the week and summarized at month-end, and the field characteristic is that for the same expenditure, the name, quantity, and date must be consistent across the application, reimbursement, and invoice, and the signature and receipt must be complete.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting the branch direction and interaction state records. The progress table and statistical scope description are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the adjusted subject, original budget amount, adjusted amount, approval signature, and date correspond to the reimbursement form | Check the options and branch connections one by one in the node, and check the application date and signature; reference `variables` to verify the subject and amount |
| Reimbursement form | Whether the expense name, quantity, amount, occurrence date, and approval signature are consistent with the contract invoice | Trigger a user selection node once and view the node status in the run record; reference `nodeId` in a subsequent node and do a trial run to verify the quantity and date |
| Contract invoice | Whether the contract number, invoice number, invoice date, amount, and receipt match the reimbursement form | Reference the selection result variable in a subsequent node and do a trial run once to verify the invoice number and receipt; count the number of array entries separately |
| User selection node | Each option corresponds to one branch, the interaction state is recorded, and the selection result variable has been passed to subsequent nodes | Do a trial run for each option and verify the branch direction and interaction state in the run record; check whether the default branch is taken or the process stops |

## Three common errors

- Symptom: For the same expenditure, the expense name and quantity in the budget adjustment application and the reimbursement form do not match. Cause: The two materials are entered separately, without field mapping and version synchronization.
- Symptom: The invoice date of the contract invoice is inconsistent with the occurrence date of the reimbursement form, causing a deviation in the statistical total. Cause: The entry node does not enforce verification of the date field and lacks receipt association.
- Symptom: The budget adjustment application lacks an approval signature or the contract invoice lacks a receipt, yet the process continues. Cause: The user selection node does not use the signature and receipt as branch conditions, and the interaction state is not fully recorded.

## How to verify the setup

Acceptance for this feature: do a trial run for each option, verify the branch direction and interaction state in the run record, and confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes.

Business test: use one week of records to verify the totals, see whether the scope and exceptions are clearly stated, and check that the number of records matches the statistical number and that the scope is written in the header.

- Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and confirm that the interaction state is recorded.
- Reference `variables` and `nodeId` in a subsequent node and do a trial run once, verify whether the selection result variable is passed, and check whether the default branch is taken or the process stops.
