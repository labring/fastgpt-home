---
title: Forms and User Interaction for Student Awards, Financial Aid and Hardship Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c022-f016
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Forms | Intake
meta_description: Student Financial Aid: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Student Awards, Financial Aid and Hardship Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

Student awards, grants, loans, and hardship determination materials include three types: the family financial hardship determination form, the scholarship/grant application form, and the loan receipt. The determination form is filled out by the student with household size, income, and hardship circumstances, updated by academic year, and its fields include member name, relationship, annual income, signature, and date. The application form is submitted by the student by program, and its fields include application category, amount, award or assistance record, signature, and date. The loan receipt is issued by a financial institution, and its fields include loan contract number, amount, disbursement date, receipt number, and seal. When these three types of materials enter the Q&A intake and missing-item follow-up feature, the determination form and application form serve as information sources, while the loan receipt serves as evidence; field names, quantities, dates, and signatures are the common verification points.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The intake record and the completed follow-up questions are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Family financial hardship determination form | Fields include member name, relationship, annual income, signature, and date; key material fields are marked as required | Check field names one by one in the node configuration, and check the required settings one by one |
| Scholarship/grant application form | Fields include application category, amount, assistance record, signature, and date; the name, quantity, and date of the same record as in the determination form must be consistent | Reference this field in subsequent nodes and run a trial, and compare the same record in the two materials |
| Loan receipt | Fields include loan contract number, amount, disbursement date, receipt number, and seal; the receipt must not be missing | Reference this field in subsequent nodes and run a trial, and check the receipt number and seal |
| Form input node | Fields correspond one-to-one with the material fields to be collected, and field values can be passed after submission | Check field names one by one in the node configuration, and reference this field in subsequent nodes and run a trial |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the determination form and the application form. Cause: The two materials are filled out separately, the fields are not cross-checked, and the versions are not synchronized.
- Symptom: The loan receipt is missing a signature or receipt number. Cause: The receipt is issued by a financial institution, and the seal and number were not checked item by item at submission.
- Symptom: After submission, subsequent nodes cannot retrieve the values. Cause: Required items can be submitted even if empty, or the conversation stays in the interaction state and the fields are not passed.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, and check the field values retrieved by subsequent nodes; check field names and required settings one by one in the node configuration, reference this field in subsequent nodes and run a trial, and confirm the values of `formInputResult` and `selectResult`.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- Check field names one by one in the node configuration, check the required settings one by one, and confirm one-to-one correspondence with the fields of the family financial hardship determination form, scholarship/grant application form, and loan receipt.
- Reference this field in subsequent nodes and run a trial, check the name, quantity, and date of the same record, and check whether the signature and receipt are complete.
