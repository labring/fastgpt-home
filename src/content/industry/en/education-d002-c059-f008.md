---
title: Workflow Orchestration for Research Budget Adjustments and Reimbursement: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c059-f008
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Workflows | Checks
meta_description: Research Finance: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Budget Adjustments and Reimbursement: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses research funding budget adjustment and reimbursement scenarios, with materials coming from three categories: budget adjustment applications, reimbursement forms, and contract invoices. A budget adjustment application is usually initiated by the project leader, and its fields include the adjusted subject, original budget amount, post-adjustment amount, adjustment reason, and approval signature; a reimbursement form is filled in by the handler, and its fields include the reimbursement item, amount, date of occurrence, number of receipts, and approval chain; a contract invoice is archived by the supplier or finance, and its fields include the contract name, invoice number, invoice date, amount, and receipt. The three material categories update at different rhythms: applications are updated version by version as approvals circulate, reimbursement forms are revised repeatedly as receipts are completed, and contract invoices arrive in batches according to invoicing and receipts. When entering this feature, applications and reimbursement forms serve as the objects to be checked, and contract invoices serve as the comparison baseline, each taking on the role of being checked and providing the basis for checking, with material versions and signature receipts included in the scope of checking.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is then completed by subsequent nodes continuing execution along the branches. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the chosen option.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the name, quantity, date, and signature are consistent with the contract invoice | Take one application record, compare field by field the contract name, adjustment amount, effective date, and approval signature, and mark the fields that do not match |
| Reimbursement form | Whether the name, quantity, date, and signature are consistent with the ledger and the contract invoice | Extract the reimbursement form and the contract invoice, check the item name, number of receipts, date of occurrence, and receipt signature, and record the discrepancy locations |
| Contract invoice | Whether the version and receipt are in sync with the latest application and reimbursement form | Compare the contract invoice version number and receipt, and check whether that version is jointly referenced by the application and the reimbursement form |
| User selection node | Whether the options and branch connections, interaction state, and selection result variable are passed as expected | Within the node, check the options and branch connections one by one, trigger it once and view the node state in the run record, reference `variables` in subsequent nodes and do a trial run, and check the branch corresponding to `nodeId` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the contract invoice, and the discrepancy list misses items. Cause: The two materials are entered separately and are not aligned field by field against the same object.
- Symptom: The reimbursement form references an old version of the contract invoice, and the amount and receipt signature are missing. Cause: The version is not synchronized, and the reference relationship is not written back after the material is updated.
- Symptom: After selecting an option, the default branch is still taken, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the interaction state and selection result variable were not verified in subsequent nodes.

## How to verify the setup

Feature acceptance: trial-run each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, that the process continues after the interaction is completed, and that the selection result variable has been passed to subsequent nodes.

Business test: use one real record to find the fields inconsistent with the ledger, hand them to the reviewer for confirmation, and write them back.

- Within the user selection node, check the options and branch connections one by one, trigger it once, and then view the node state and branch direction in the run record.
- Reference `variables` in subsequent nodes and do a trial run, check whether the branch corresponding to `nodeId` executes correctly, and confirm that the discrepancy list is completed by subsequent nodes.
