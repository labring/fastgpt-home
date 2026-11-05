---
title: Forms and User Interaction for Research Budget Adjustments and Reimbursement: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c059-f016
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Forms | Handover
meta_description: Research Finance: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Budget Adjustments and Reimbursement: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data covers three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications come from within the project team and list, by funding subject, the amounts before and after adjustment along with the reasons; reimbursement forms come from the handler and record expense details, the number of receipts, and amounts; contract invoices come from suppliers or partners and state the contract number, invoice date, and amount. The pace of material updates is synchronized with project milestones and financial cycles: budget adjustment applications are drafted before transfers between subjects, reimbursement forms are submitted after receipts are complete, and contract invoices are archived as receipt and payment progress. When entering the form input node, each of the three types of materials plays its own role as a field source: budget adjustment applications provide subjects and adjustment amounts, reimbursement forms provide expense details and receipt information, and contract invoices provide contract and invoicing information. Field characteristics center on names, quantities, dates, amounts, and signature fields, which must be checked item by item for consistency.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "issuable material drafts and handover records" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | The subject name, amounts before and after adjustment, adjustment date, and signature field must be consistent with the corresponding records in the contract invoice | Check the field names one by one in the node configuration, confirm that the subject and amount fields are marked as required, and after submission reference that field in subsequent nodes and run a test |
| Reimbursement form | The name, quantity, date, and amount of the expense details must match the contract invoice and the budget adjustment application | Check whether the required markers cover the number of receipts and amount fields, and after submitting with `formInput`, check whether subsequent nodes can retrieve the corresponding field values |
| Contract invoice | The contract number, invoice date, amount, and signature or receipt must be synchronized with the reimbursement form and the budget adjustment application | Check the field names and required settings in the node configuration, and after submission have subsequent nodes or a person compare whether the version and date are consistent |
| Form input node | Field names correspond one-to-one with the material fields, required items cannot be submitted when empty, and after submission the fields can be referenced by subsequent nodes | Run a test once with `formInputResult` and `selectResult`, and confirm that the conversation does not remain in the interactive state and that subsequent nodes can retrieve the field values |

## Three common errors

- Symptom: The name, quantity, and date of the same expense do not match between the reimbursement form and the contract invoice. Cause: The fields in the two places are filled in separately, and the same record is not compared item by item before submission.
- Symptom: The budget adjustment application has been updated to a new version, but the reimbursement form still references the old subject and amount. Cause: The version was not synchronized, and whether the version and date were consistent was not checked during handover.
- Symptom: The material draft lacks a signature or receipt, and the handover record is incomplete. Cause: The signature field was not marked as required, no one added the signature after submission, and the next stage could not sign for receipt.

## How to verify the setup

Acceptance of this feature: fill out the form once and submit it, check whether the field values retrieved by subsequent nodes are consistent with what was filled in, and confirm that `formInputResult` and `selectResult` pass correctly.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names one by one in the node configuration, confirm that the key material fields are marked as required, and run a test to see whether subsequent nodes can retrieve the corresponding field values after submission.
- Draft one budget adjustment application, reimbursement form, and contract invoice according to the template, compare names, quantities, dates, and signatures item by item, complete one handover, and record the missing-item blocking situation.
