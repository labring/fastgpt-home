---
title: Forms and User Interaction for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c027-f016
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Forms | Intake
meta_description: Graduate Destinations: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information

## What this category's data looks like

For university employment contract signing and graduation destination statistics, materials come from employment agreements, graduation destination registration forms, and employer certificates. The employment agreement is signed by the student and the employer, and includes the employer name, unified social credit code, position, reporting date, and signatures and seals of both parties; the graduation destination registration form is filled out by the student and reviewed by the department, and includes the destination type, employer name, archive transfer address, date, and review signature; the employer certificate is issued by the employer, and includes the hired position, onboarding date, contact person, and employer seal. The three types of materials have different update rhythms: agreements are submitted with contract signing batches, registration forms are updated according to the graduation destination registration cycle, and certificates are supplemented according to the time the employer issues them. When the materials enter Q&A intake and missing-item follow-up, each plays its own role in field verification: the agreement verifies name and date, the registration form verifies destination type and archive information, and the certificate verifies position and seal. The name, quantity, and date of the same record in the three materials are often inconsistent, versions are not synchronized, or signature receipts are missing, so missing items need to be identified and followed up during intake.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). "Intake records and follow-up questions for completion" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Fields include employer name, unified social credit code, position, reporting date, and signatures and seals of both parties; the date and signature must be consistent with the registration form | Check the field names one by one in the node configuration, and confirm that the required markers cover the three items: employer name, date, and signature |
| Graduation destination registration form | Fields include destination type, employer name, archive transfer address, date, and review signature; the name and quantity must match the agreement | Reference this field in subsequent nodes and run a test to confirm that `formInput` retrieves the registration form field values |
| Employer certificate | Fields include hired position, onboarding date, contact person, and employer seal; missing signature or receipt means a missing item | Check the required settings one by one, and confirm that the seal and receipt fields have been marked as required |
| Form input node | After triggering, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the field values are passed to subsequent nodes | Use `formInputResult` and `selectResult` in subsequent nodes to reference fields and run a test, and verify whether the values can be retrieved after submission |

## Three common errors

- Phenomenon: The employer name, position quantity, and reporting date of the same record do not match between the agreement and the registration form. Cause: The two materials are filled in at different stages, versions are not synchronized, and field-by-field comparison was not performed during intake.
- Phenomenon: The employer certificate lacks a signature or receipt, and the registration form lacks a review signature. Cause: Materials are supplemented in batches, seals and receipts are not returned together with the certificate, and missing items are not identified.
- Phenomenon: After submission, the conversation remains in the interactive state, and subsequent nodes cannot retrieve the field values. Cause: Required items can be submitted even when empty, or the field names are inconsistent with subsequent references, so the state does not continue to execute downward.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit it, check whether the field values retrieved by subsequent nodes are consistent with the filled-in content, and confirm that `formInputResult` and `selectResult` can reference the corresponding fields.

Business test: Submit a question missing key information and see whether it asks a follow-up question before answering.

- Check the field names and required markers one by one in the node configuration, and confirm that key material fields have been marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to confirm that the values can be retrieved after submission and that the conversation continues to execute downward.
