---
title: Forms and User Interaction for Graduate Employment Contracts and Destination Statistics: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c027-f016
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Forms | Review
meta_description: Graduate Destinations: review forms for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Graduate Employment Contracts and Destination Statistics: Trace Exceptions and Review Results

## What this category's data looks like

This category's data typically consists of three types of materials: employment agreements, graduation destination registration forms, and employer certificates. Employment agreements are signed by students and employers and then collected back; their fields include employer name, position, signing date, and signatures of both parties. Graduation destination registration forms are compiled by departments; their fields include destination category, employer name, reporting date, and department seal. Employer certificates are issued by employers; their fields include hired position, onboarding date, and employer receipt confirmation. The three types of materials have different update rhythms: agreements are collected one by one as signing occurs, registration forms are updated centrally in batches, and certificates are submitted gradually along with receipt confirmations. When entering the anomaly tracing and manual review stage, agreements are the original basis for the fact of signing, registration forms are the summary basis for destination classification, and certificates are supporting evidence for the completeness of receipts and signatures. Only after the three are aligned field by field can a traceable anomaly list and review conclusion be formed.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "anomaly list and review conclusion" is completed by subsequent nodes or manually. The form does not automatically recognize material content, nor does it determine whether materials are authentic.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Employer name, position, signing date, and signatures of both parties must be aligned item by item with the registration form | Retrieve the original agreement, compare field names and dates, and check whether signatures are complete |
| Graduation destination registration form | Destination category, employer name, reporting date, and department seal must be consistent with the agreement | Retrieve registration forms by batch and check whether names, quantities, and dates match |
| Employer certificate | Hired position, onboarding date, and employer receipt confirmation must correspond with the agreement and registration form | Check the receipt confirmation and signatures, confirm version synchronization, and mark missing items as pending supplementation |
| formInput fields | Field names must correspond one-to-one with the material fields to be collected | Check field names one by one in the node configuration and confirm that required markers cover key fields |

## Three common errors

- Phenomenon: The employer name and signing date for the same record do not match between the agreement and the registration form. Cause: The two materials are entered separately, lacking a field-by-field comparison step.
- Phenomenon: The registration form has been updated to a new version, while the agreement is still the old version, and quantities and dates are inconsistent. Cause: The materials have different update rhythms, and versions are not synchronized.
- Phenomenon: The employer certificate lacks an employer receipt confirmation or signature, making it impossible to confirm the hiring fact. Cause: Receipt confirmation submission lags, and signature completeness is not checked item by item during review.

## How to verify the setup

This feature acceptance: fill out and submit once, check the field values obtained by subsequent nodes, and confirm that after `formInput` submission the fields can be referenced and that `userSelect` option values are passed in correctly.

Business test: create an anomaly record, see whether it can be traced back to the source materials, and check the names, quantities, dates, and signatures of the agreement, registration form, and certificate.

- Check field names and required markers one by one in the form input node configuration, and run a test to confirm that subsequent nodes can obtain the corresponding field values after submission.
- Retrieve the original materials one by one according to the anomaly list, compare names, quantities, dates, and signatures, and after the reviewer signs, hand them over to the person in charge for handling.
