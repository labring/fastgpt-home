---
title: Forms and User Interaction for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c059-f016
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Forms | Intake
meta_description: Research Finance: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information

## What this category's data looks like

In the research funding budget adjustment and reimbursement scenario, materials are mainly of three types: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications are initiated by the project team as needed, with an update cadence that follows changes in budget subjects or annual milestones, and fields include subject name, adjustment amount, adjustment date, and signature field. Reimbursement forms are submitted by the handler on a per-instance basis, with an update cadence synchronized with when expenses occur, and fields include reimbursement item, quantity, amount, date, and approval signature. Contract invoices are provided by procurement or partners, with an update cadence that follows contract signing and invoicing progress, and fields include contract name, invoice number, quantity, date, and receipt. When the three types of materials enter the Q&A intake and missing-item follow-up feature, each plays a different role: budget adjustment applications provide the basis for adjustment, reimbursement forms provide expense details, and contract invoices provide supporting evidence, jointly supporting the intake record and the items to be completed.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" is then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the subject name, adjustment amount, adjustment date, and signature field are consistent with other materials | Check the field names one by one in the node configuration, and confirm that the subject name matches the reimbursement form and contract invoice |
| Reimbursement form | Whether the reimbursement item, quantity, amount, date, and approval signature are consistent with the contract invoice | Check the required settings one by one, and confirm that the quantity and date fields are marked as required |
| Contract invoice | Whether the contract name, invoice number, quantity, date, and receipt are consistent with the reimbursement form | Reference this field in a subsequent node and run a test to confirm that the subsequent node can retrieve the corresponding field value |
| Form fields | Whether the field names correspond one-to-one with the material fields to be collected | Check the field names one by one in the node configuration, and run a test referencing the fields with `formInputResult` and `selectResult` |

## Three common errors

- Symptom: The subject name for the same record does not match between the budget adjustment application and the reimbursement form. Cause: The two materials are filled in separately, without cross-checking the fields.
- Symptom: The quantity and date on the contract invoice are inconsistent with the reimbursement form. Cause: The versions are not synchronized, and the old version of the material is still being submitted.
- Symptom: The reimbursement form is missing the approval signature or the contract invoice is missing the receipt. Cause: Key material fields are not marked as required, so submission is not blocked.

## How to verify the setup

Acceptance of this feature: Fill in the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the fields referenced by `formInputResult` and `selectResult` can retrieve the corresponding values.

Business test: Submit a question that is missing key information, and see whether it asks a follow-up question first before answering.

- Check the required settings one by one, confirm that key material fields are marked as required, and that submission is not possible when required items are empty.
- Reference this field in a subsequent node and run a test to confirm that after submission the subsequent node can retrieve the corresponding field value, and that the conversation does not remain in the interaction state.
