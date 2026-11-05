---
title: Forms and User Interaction for Graduate Employment Contracts and Destination Statistics: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c027-f016
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Forms | Access
meta_description: Graduate Destinations: review forms for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Graduate Employment Contracts and Destination Statistics: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on three types of materials in university employment contract signing and graduation destination statistics: employment agreements, graduation destination registration forms, and employer certificates. Employment agreements are signed by students and employers, containing the employer name, position, signing date, and signatures of both parties; graduation destination registration forms are filled out by students, containing the destination type, employer name, reporting date, and department confirmation; employer certificates are issued by employers, containing acceptance opinions, contact person, date, and seal. When these three types of materials enter the form input function, their roles differ: employment agreements and employer certificates are referenced as supporting material fields, while graduation destination registration forms are referenced as main record fields. The update rhythm adjusts with signing, termination, and destination changes. Field characteristics are mainly names, quantities, dates, and signature receipts, requiring item-by-item consistency verification.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and authorization scope are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | The employer name, position, signing date, and signatures of both parties must be consistent with the corresponding fields in the graduation destination registration form. Missing signatures or receipts are considered incomplete. | Check field names one by one in the node configuration, confirm they correspond one-to-one with the employment agreement fields, and check the required markers. |
| Graduation destination registration form | The destination type, employer name, and reporting date must match the names, quantities, and dates in the employment agreement and employer certificate. If the version is not synchronized, resubmission is required. | Reference the `formInputResult` field in subsequent nodes and run a test to check whether the field values passed after submission retrieve the corresponding field values. |
| Employer certificate | The acceptance opinion, contact person, date, and seal must be consistent with the employment agreement and graduation destination registration form. Missing seals or receipts are considered incomplete. | Check field names one by one in the node configuration, confirm they correspond one-to-one with the employer certificate fields, and check the required markers. |
| `formInputResult` and `selectResult` | The form fields correspond one-to-one with the material fields to be collected, and the required markers cover key material fields. | Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to check the field passing after submission. |

## Three common errors

- Symptom: The employer name, quantity, and date of the same record do not match between the employment agreement and the graduation destination registration form. Cause: The two materials are filled out by different roles, no cross-check is performed, and the versions are not synchronized.
- Symptom: The employer certificate lacks a signature or receipt but is still submitted as complete material. Cause: The required markers do not cover the signature and receipt fields, and there is no manual review before submission.
- Symptom: After submission, subsequent nodes cannot retrieve values, and the conversation remains in the interactive state. Cause: The field names are inconsistent with the references in subsequent nodes, or required items can be submitted even when empty, and the workflow state is not correctly restored.

## How to verify the setup

Acceptance of this feature: Fill out and submit once, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` fields are passed correctly, and that submission is not possible when required items are empty.

Business test: Access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized content is not visible.

- Check field names and required markers one by one in the node configuration, and confirm they correspond one-to-one with the fields of the employment agreement, graduation destination registration form, and employer certificate.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to check the field passing after submission, and confirm that subsequent nodes can retrieve the corresponding field values.
