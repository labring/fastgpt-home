---
title: Forms and User Interaction for Student Awards, Financial Aid and Hardship Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c022-f016
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Forms | Review
meta_description: Student Financial Aid: review forms for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Student Awards, Financial Aid and Hardship Assessment: Trace Exceptions and Review Results

## What this category's data looks like

Student award, grant, loan, and financial hardship determination materials mainly consist of the family financial hardship determination form, the scholarship/grant application form, and the loan receipt. They come from on-campus application submissions and bank receipt returns, and their update cadence advances with the academic-year batches. The family financial hardship determination form carries fields for household population, income, and hardship level; the scholarship/grant application form carries the award name, amount, and application reason; the loan receipt carries the loan contract number, disbursement date, and signature. When these three types of materials enter exception tracing and manual review, the determination form is used to verify identity and hardship level, the application form is used to verify the award and amount, and the receipt is used to verify disbursement and signature, forming a traceable chain of original records.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed afterward by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Family financial hardship determination form | The name, date, and signature must correspond item by item with the application form and receipt | Check the field names one by one in the node configuration, and confirm that the determination form fields correspond one-to-one with the material fields to be collected |
| Scholarship/grant application form | The award name, amount, and application date must be consistent with the determination form and receipt | Check the required settings one by one, and confirm that the award name and amount fields are marked as required |
| Loan receipt | The contract number, disbursement date, and signature must be consistent with the application form, and no receipt may be missing | Reference this field in subsequent nodes and run a test, and confirm that the receipt field value can be retrieved |
| Form input node | Field values correspond one-to-one with material fields, and required items are not empty | Check the field names and required markers in the node configuration, and run a test to confirm that fields are passed correctly after submission |

## Three common errors

- Symptom: The name or amount for the same student does not match between the determination form and the application form. Cause: The two materials are filled in separately, without field-level comparison and version synchronization.
- Symptom: The loan receipt is missing or the signature field is empty, and the exception record cannot be closed. Cause: The receipt return cadence is not synchronized with the application batch, and a missing signature is not blocked.
- Symptom: After submission, subsequent nodes cannot retrieve the values, and the conversation remains in the interactive state. Cause: Submission is allowed even when required items are empty, or the fields are not correctly referenced in subsequent nodes.

## How to verify the setup

Acceptance of this feature: fill in the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` fields and `userSelect` options are passed correctly.

Business test: create an exception record, see whether the source material can be traced, and check the fields, dates, and signatures of the determination form, application form, and receipt.

- Check the field names and required markers one by one in the node configuration, and confirm that they correspond one-to-one with the material fields.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, and confirm that the field values can be retrieved after submission.
