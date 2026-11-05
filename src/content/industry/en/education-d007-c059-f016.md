---
title: Forms and User Interaction for Research Budget Adjustments and Reimbursement: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c059-f016
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Forms | Review
meta_description: Research Finance: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Budget Adjustments and Reimbursement: Trace Exceptions and Review Results

## What this category's data looks like

Research funding budget adjustments and reimbursements involve three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record changes in amounts between accounts, adjustment reasons, and the approval chain; reimbursement forms carry expense details, amounts, and the signatures of the handler and reviewer; contract invoices provide the transaction background, invoicing information, and receipts. The materials are mostly submitted in batches by the project team, finance, and research management departments, updated as approval nodes progress, and versions change frequently. When entering exception tracing and manual review, the three types of materials serve as references for one another: the budget adjustment application defines the allowable expenditure scope, the reimbursement form reflects what actually occurred, and the contract invoice verifies authenticity and compliance. Field characteristics are concentrated in names, quantities, dates, signatures, and version numbers; if any field does not match across materials, it forms an exception clue.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed afterward by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Compare item by item with the names, quantities, dates, and signatures in the reimbursement form and contract invoice, and confirm that the adjustment scope covers the actual expenditure | Check the accounts, amounts, adjustment reasons, and approval signatures in the application field by field, and compare the corresponding records in the reimbursement form and contract invoice |
| Reimbursement form | The amounts, quantities, dates, handler and reviewer signatures are consistent with the budget adjustment application and contract invoice, and the version number is synchronized | Check the names, quantities, and dates in the reimbursement details and contract invoice, and check whether the reviewer signature and receipt are complete |
| Contract invoice | The transaction background, invoicing information, dates, and receipts match the budget adjustment application and reimbursement form, with no missing signatures or lagging versions | Check the contract number, invoice number, amount, and date against the reimbursement form records, and confirm that the receipt and signatures are complete |
| Form input node | Field names correspond one-to-one with the material fields, required markers cover key material fields, and the field values can be referenced by subsequent nodes after submission | Check the field names and required settings one by one in the node configuration, reference `formInputResult` in subsequent nodes and do a trial run, and use `userSelect` to limit options when necessary |

## Three common errors

- Symptom: The names and quantities of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials were filled in by different people at different times without cross-checking.
- Symptom: The contract invoice version is not synchronized, and the reimbursement form references an old contract number. Cause: After the materials were updated, they were not returned to the reimbursement step, and the version number was not refreshed as approval progressed.
- Symptom: The reimbursement form lacks the reviewer signature or the contract invoice lacks a receipt. Cause: Key material fields were not marked as required at submission, and the interactive state was skipped.

## How to verify the setup

Acceptance of this feature: fill in and submit once, check the field values obtained by subsequent nodes, confirm that `formInputResult` and `selectResult` are referenced correctly, that submission is not possible when required items are empty, and that the conversation does not get stuck in the interactive state.

Business test: create an exception record, see whether the source material can be traced, and check the names, quantities, dates, and signatures of the budget adjustment application, reimbursement form, and contract invoice.

- Check the field names and required markers one by one in the node configuration to ensure they correspond one-to-one with the fields of the budget adjustment application, reimbursement form, and contract invoice.
- Reference `formInputResult` and `selectResult` in subsequent nodes and do a trial run to confirm that the field values can be obtained after submission, and hand the exception list and review conclusion to the responsible person for handling.
