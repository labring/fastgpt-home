---
title: Forms and User Interaction for Research Budget Adjustments and Reimbursement: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c059-f016
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Forms | Access
meta_description: Research Finance: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Budget Adjustments and Reimbursement: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses research funding budget adjustment and reimbursement scenarios. Materials include three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications come from adjustment reasons and amount change records submitted by the project team; reimbursement forms come from itemized entries filled in by the handler based on actual expenditures; contract invoices come from vouchers provided by procurement or partners. The three material types have different update rhythms: budget adjustment applications change with project phases, reimbursement forms are submitted in batches, and contract invoices are supplemented according to settlement progress. Field characteristics center on name, quantity, date, and signature: budget adjustment applications require the pre- and post-adjustment accounts and amounts, reimbursement forms require expense category, amount, and occurrence date, and contract invoices require contract name, invoice number, and invoice date. When materials enter this feature, budget adjustment applications serve as the basis for the visible scope of the authorization entry, reimbursement forms serve as the main body of field collection, and contract invoices serve as attachments for explanation and receipt verification. Authorized access and external services require that visitor identity match the visible scope, and unauthorized access must not be visible.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry and authorization scope are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the field values are passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the name, quantity, date, and signature are consistent with the reimbursement form | Check the field names one by one in the node configuration, confirm that the pre- and post-adjustment account and amount fields correspond one-to-one with the materials, and check the required markers |
| Reimbursement form | Whether the expense category, amount, and occurrence date match the contract invoice | Check the required settings one by one, confirm that the key fields of the reimbursement form are marked as required, and after submission have subsequent nodes reference the field and run a trial |
| Contract invoice | Whether the contract name, invoice number, and invoice date are version-synchronized and whether signature or receipt is missing | Check that the field names correspond one-to-one with the material fields, check whether the receipt field is required, and after submission confirm that subsequent nodes can retrieve the corresponding field values |
| Form input node | Whether submission is allowed when required items are empty, and whether the conversation stays in the interactive state after submission | Check the `formInputResult` fields and `userSelect` options in the node configuration, and run a trial to confirm that subsequent nodes retrieve the field values |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials are filled in separately, and the fields are not checked for consistency.
- Symptom: The contract invoice version is not synchronized, and the old invoice number still appears in the reimbursement form. Cause: The materials have different update rhythms, and the latest version is not checked at submission.
- Symptom: The budget adjustment application lacks a signature or receipt, but the reimbursement form has already entered subsequent processing. Cause: The required markers do not cover the signature and receipt fields, and submission is not blocked.

## How to verify the setup

Fill in a budget adjustment application and a reimbursement form once and submit, then check whether the field values retrieved by subsequent nodes are consistent with what was filled in, focusing on the output of `formInputResult` and `selectResult`.

Access once with a restricted identity and see whether the visible scope matches the setting, and whether unauthorized access is not visible.

- Check the field names one by one in the node configuration, and confirm that the fields of the budget adjustment application, reimbursement form, and contract invoice correspond one-to-one with the materials.
- Check the required settings one by one, confirm that the key material fields are marked as required, and after submission have subsequent nodes reference the field and run a trial.
