---
title: Forms and User Interaction for Degree Awards and Certificate Information Reporting: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c026-f016
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Forms | Review
meta_description: Degree Certificates: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Degree Awards and Certificate Information Reporting: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the category of degree conferral and certificate information reporting. The core materials include degree application forms, thesis review forms, defense resolutions, as well as accompanying signed receipts and version records. The materials are produced separately by the training unit, review experts, and the defense committee, and are updated by batch and degree conferral cycle. The fields mainly consist of name, degree type, thesis title, review conclusion, defense date, and signature fields. When entering this function, the degree application form assumes the role of the primary record, the thesis review form and defense resolution assume the role of supporting evidence, and the receipts and version records assume the role of synchronization verification; the fields, dates, and signatures of the three must be aligned item by item. Any mismatch in name, quantity, or date may create an exception during the reporting stage, requiring manual tracing back to the source materials and a review conclusion.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the name, quantity, date, and signature are consistent item by item with the thesis review form and defense resolution | Check the form field names one by one in the node configuration, confirm they correspond one-to-one with the material fields, and set required markers for key fields |
| Thesis review form | Whether the review conclusion, review date, and expert signature match the degree application form and defense resolution | Reference this field in subsequent nodes and run a test to check whether the corresponding value can be retrieved when the field is passed after submission |
| Defense resolution | Whether the defense date, resolution conclusion, committee member signature, and receipt are missing items or the version is not synchronized | Check the required settings one by one, and confirm that the form cannot be submitted with empty items when a signature or receipt is missing |
| formInput | Whether the three items—field name, required marker, and field passing after submission—are aligned with the material fields | Check the field names in the node configuration, and run a test by referencing the field with `formInput` in subsequent nodes for verification |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the degree application form and the thesis review form. Cause: The two materials are filled in separately and are not aligned field by field before reporting.
- Symptom: The defense resolution and receipt versions are not synchronized, and an old conclusion is referenced during reporting. Cause: After the materials are updated, the form is not backfilled, and subsequent nodes still retrieve the old field values.
- Symptom: Key materials are missing signatures or receipts, but they still enter the subsequent process after submission. Cause: The required markers do not cover the signature and receipt fields, so empty items can still be submitted.

## How to verify the setup

Acceptance of this function: Fill in and submit once, check the field values retrieved by subsequent nodes, confirm that the fields referenced by `formInputResult` and `selectResult` are consistent with the material fields, and that submission is not possible when required items are empty.

Business test: Create an exception record, see whether the source material can be traced, and check whether the exception list and review conclusion are supported by original records and the reviewer's signature.

- Check the field names one by one in the node configuration, confirm they correspond one-to-one with the fields of the degree application form, thesis review form, and defense resolution, and set required markers for key material fields.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to confirm that the corresponding values can be retrieved when the fields are passed after submission, and that the exception record can be traced back to the source material.
