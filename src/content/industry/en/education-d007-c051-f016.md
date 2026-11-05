---
title: Forms and User Interaction for College Entrance Exam Application Eligibility: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c051-f016
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Forms | Review
meta_description: Entrance Exam Eligibility: review forms for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for College Entrance Exam Application Eligibility: Trace Exceptions and Review Results

## What this category's data looks like

The data for this category looks like this. General college entrance examination registration qualification verification involves three core types of materials: the college entrance examination registration form, household registration and student status certificates, and materials for children accompanying migrant workers. The registration form is filled out by the candidate, then printed and signed; its fields include name, ID number, student status number, examination category, household registration address, and signature field. The household registration and student status certificates are issued by the public security authorities and the school; their fields include household registration address, move-in date, student status registration date, and school seal. The materials for children accompanying migrant workers include the parents' residence permit, social insurance payment records, and employment contract; their fields include residence permit number, validity period, number of social insurance months, and employer name. The three types of materials have different update rhythms: the registration form changes as the candidate modifies it, the household registration and student status certificates are updated by semester or when a move-in change occurs, and the accompanying migrant worker materials are renewed monthly or annually. When entering the exception tracing and manual review function, the registration form provides the baseline record, the household registration and student status certificates are used to compare household registration and student status dates, and the materials for children accompanying migrant workers are used to verify the continuity of residence and social insurance. Together, the three support the original record chain of the exception list.

## Configuration and implementation checks

Configuration and implementation checks. This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Compare item by item with the household registration and student status certificates and the materials for children accompanying migrant workers for names, quantities, and dates, and check whether signatures and receipts are complete | Check the field names one by one in the node configuration, confirm that the registration form fields correspond one-to-one with the material fields; after a trial run, check whether subsequent nodes can obtain the field values |
| Household registration and student status certificates | The household registration address, move-in date, and student status registration date must be consistent with the registration form, and the school seal and issuance date must not be missing | Check the required settings one by one, mark key material fields as required; reference the field in subsequent nodes and run a trial |
| Materials for children accompanying migrant workers | The residence permit number, validity period, number of social insurance months, and employer name must match the registration form and certificates, and the version must be synchronized | After submitting with `formInput`, reference the material type field selected by `userSelect` in subsequent nodes and run a trial to confirm that the field values can be passed |
| Form input node | Required items must not be empty when submitting, and after submission the conversation should not remain in the interactive state | Check the field names and required markers one by one in the node configuration; after submission, check the field values obtained by subsequent nodes |

## Three common errors

- Phenomenon: The same candidate's name is written inconsistently in the registration form and the household registration and student status certificates, and the number of social insurance months does not match in the two accompanying migrant worker materials. Cause: The materials are filled in by different issuers, there is no field-by-field comparison step, and the original records are not updated in sync with the material versions.
- Phenomenon: The household registration move-in date and the student status registration date differ by several months between the registration form and the certificates, and the version of the materials for children accompanying migrant workers is not synchronized. Cause: The materials have different update rhythms, the old version of the certificate was not replaced, and the cross-check of date fields was not triggered after form submission.
- Phenomenon: The registration form lacks the candidate's signature, the household registration and student status certificates lack the school seal or receipt, and required items can still be submitted when empty. Cause: The required markers do not cover the signature and receipt fields, and after submission subsequent nodes cannot obtain the corresponding field values.

## How to verify the setup

Acceptance of this function: fill out the form once and submit it, check whether the field values obtained by subsequent nodes are consistent with what was filled in, confirm that field passing works normally after `formInput` submission, and that the material type selected by `userSelect` can be referenced.

Business test: create an exception record, see whether the source material can be traced, and check the names, quantities, dates, and signature receipts in the registration form, household registration and student status certificates, and materials for children accompanying migrant workers.

- Check the field names one by one in the node configuration, mark key material fields as required, and after submission check whether subsequent nodes can obtain the field values.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that after submission the conversation does not remain in the interactive state and that required items cannot be submitted when empty.
