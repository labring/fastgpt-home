---
title: Forms and User Interaction for Graduate Employment Contracts and Destination Statistics: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c027-f016
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Forms | Handover
meta_description: Graduate Destinations: review forms for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Graduate Employment Contracts and Destination Statistics: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

For university employment contract signing and graduation destination statistics, materials mainly come from three types: employment agreements, graduation destination registration forms, and employer certificates. The employment agreement is signed by the student and the employer and then enters departmental preliminary review; the graduation destination registration form is filled out by the student and submitted together with the signing materials; the employer certificate is issued by the employer and circulates together with the agreement. The update rhythm is concentrated during graduation season and before dispatch, and supplementary signing, contract modification, and receipt resubmission often occur. Field characteristics are concentrated on student name and student ID, employer name and unified social credit code, position name, signing date and reporting date, signature and seal, and receipt number. When the three types of materials enter the form input node, their roles differ: the employment agreement serves as the field source for the signing entity and breach clauses, the graduation destination registration form serves as the field source for destination category and archive transfer, and the employer certificate serves as the field source for employer qualifications and acceptance intention. The three need to align names, quantities, and dates on the same record.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The material drafts that can be issued and the handover records are completed by subsequent nodes or manually afterward. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether student name, student ID, employer name, unified social credit code, position name, signing date, reporting date, and signatures and seals of both parties are complete, and whether the names and dates on the same record as the graduation destination registration form are consistent | Check field names and required markers one by one in the node configuration; after submission, have subsequent nodes reference the field and run a trial |
| Graduation destination registration form | Whether destination category, archive transfer unit, reporting date, and receipt number are filled in, and whether the quantities and dates on the same record as the employment agreement match | Check the required settings one by one; after submission, check whether the field values obtained by subsequent nodes are complete |
| Employer certificate | Whether employer name, acceptance intention, issuance date, seal, and receipt are present, and whether the employer name and date on the same record as the employment agreement are consistent | Check field names in the node configuration; after submission, have subsequent nodes reference the field and run a trial |
| Handover record | Whether version and date are consistent, whether the responsible person is clear, and whether sign-off and receipt are retained | Draft one according to the template and complete one handover, and check whether missing items are blocked |

## Three common errors

- Phenomenon: The employer name, position quantity, and signing date on the same record do not match between the employment agreement and the graduation destination registration form. Cause: The two materials are drafted separately, and the fields are not aligned within the same form input node.
- Phenomenon: Material versions are not synchronized, and an old draft is used as the basis for issuance. Cause: The version and date are not passed along with the handover record, and subsequent nodes cannot obtain the latest field values.
- Phenomenon: Signatures or receipts are missing, and the handover record is incomplete. Cause: Required markers do not cover the signature and receipt fields, and after submission subsequent nodes cannot obtain the corresponding field values.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, check the field values obtained by subsequent nodes, and confirm that field passing works after `formInput` submission and that `userSelect` options correspond one-to-one with field names.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check field names and required markers one by one in the node configuration, and confirm that key material fields are marked as required.
- After submission, have subsequent nodes reference the field and run a trial, and confirm that the field values can be obtained and that the conversation no longer remains in the interactive state.
