---
title: Forms and User Interaction for Off-Campus Training Registration and Compliance: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c045-f016
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Forms | Review
meta_description: Training Compliance: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Off-Campus Training Registration and Compliance: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on exception tracing and manual review in off-campus training compliance filing and penalty response. The materials include three types: school operating license, course filing materials, and fee disclosure. The school operating license is issued by the approving authority and records the institution name, address, validity period, and permitted scope; course filing materials are submitted by the institution by class and include course name, class hours, instructor, and start date; fee disclosure is published by the institution simultaneously at the school premises and online channels and includes fee items, standards, and refund rules. The three types of materials are updated by semester or by batch, and must be revised in sync when the license is reissued, courses are adjusted, or fees change. When entering the form input function, the school operating license serves as the underlying document for subject qualification, course filing materials serve as the basis for business details, and fee disclosure serves as the external commitment evidence. The fields of the three must be cross-checked, and names, quantities, dates, and signature receipts must correspond item by item.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually afterward. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Whether the institution name, address, validity period, and permitted scope are consistent with the corresponding fields in the course filing materials and fee disclosure, and whether signatures and receipts are complete | In the node configuration, check the field names one by one, and compare the names, dates, and signatures in the license, filing materials, and fee disclosure; after submitting with `formInput`, reference the field in subsequent nodes and run a trial |
| Course filing materials | Whether the course name, class hours, instructor, and start date are synchronized in the license and fee disclosure, whether the versions are consistent, and whether signatures or receipts are missing | Check the required settings one by one, and inspect the course names, quantities, and dates in the filing materials, license, and fee disclosure; after submission, check whether subsequent nodes can retrieve the corresponding field values |
| Fee disclosure | Whether the fee items, standards, and refund rules match the dates and quantities in the course filing materials and school operating license, and whether the versions are not synchronized | In the node configuration, check the field names and required markers, and compare the fee items and dates in the fee disclosure, filing materials, and license; after selecting the review conclusion with `userSelect`, run a trial of field passing |
| Exception record | Whether the name, quantity, and date of the same record in the school operating license, course filing materials, and fee disclosure do not match, and whether signatures or receipts are missing | Create an exception record, fill in the exception fields in the form input node, and after submission check whether the field values retrieved by subsequent nodes can be traced back to the source materials |

## Three common errors

- Phenomenon: The name and class hours of the same course do not match between the filing materials and the fee disclosure. Cause: The two materials are maintained separately by different positions, the versions are not synchronized, and cross-checking was not performed during updates.
- Phenomenon: After the school operating license is reissued, the course filing materials still reference the old license number and old validity period. Cause: The reissuance information was not backfilled in time, the material update rhythm is inconsistent, and signature confirmation is missing.
- Phenomenon: The fee disclosure lacks a signature or receipt for the refund rules, and the responsible person cannot be identified during exception tracing. Cause: The disclosure publishing step did not set required markers, and after submission subsequent nodes cannot retrieve the signature field value.

## How to verify the setup

This function's acceptance: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that fields can be passed after submission via `formInputResult` and `selectResult`, that submission is not allowed when required items are empty, and that the conversation does not remain in the interactive state.

Business test: create an exception record, see whether it can be traced back to the source materials, and check whether the names, quantities, dates, and signature receipts in the school operating license, course filing materials, and fee disclosure are consistent.

- In the node configuration, check the field names one by one, confirm that they correspond one-to-one with the fields in the school operating license, course filing materials, and fee disclosure, and that key material fields have been marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, confirm that the corresponding field values can be retrieved after submission, and that the exception list and review conclusion can be handed to the responsible person for handling.
