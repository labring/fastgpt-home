---
title: Forms and User Interaction for Undergraduate Program Establishment and Adjustment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c017-f016
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Forms | Review
meta_description: Undergraduate Programs: review forms for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Undergraduate Program Establishment and Adjustment: Trace Exceptions and Review Results

## What this category's data looks like

This category's data includes three types of materials: program setup application forms, talent training plans, and expert review opinions. The program setup application form contains the program name, code, length of study, degree-granting category, person in charge and date, and signature field; the talent training plan contains the curriculum system, credits and class hours, practical components, revision version, and approval signature; the expert review opinions contain the review conclusion, list of experts, professional titles and affiliations, signatures, and receipt. Materials enter by annual application cycle and dynamic adjustment batch, and versions roll forward with the review and approval stages; for the same record, the field definitions of name, quantity, and date across different materials need to be aligned. When entering this feature, each of the three types of materials provides fields to be checked: the application form provides the applicant entity and basic program information, the training plan provides the basis for courses and credits, and the review opinions provide the conclusion and signature evidence.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether the program name, code, length of study, degree category, person in charge, date, and signature field are aligned item by item with the talent training plan and expert review opinions | In the node configuration, check the field names one by one, map the application form fields one-to-one with the training plan and review opinion fields, mark inconsistencies in name, quantity, and date, and run a trial after referencing `formInputResult` submission |
| Talent training plan | Whether the curriculum system, credits and class hours, practical components, revision version, and approval signature are consistent with the corresponding fields in the application form and review opinions | Check the required settings one by one, confirm that the version number, total credits, and signature date are traceable, use `userSelect` to select the material type and submit, and check whether subsequent nodes can retrieve the version field |
| Expert review opinions | Whether the review conclusion, list of experts, professional titles and affiliations, signatures, and receipt are complete, and whether the dates connect with the application form and training plan | Reference this field in subsequent nodes and run a trial, check for missing signatures and receipts, and confirm that when the name, quantity, and date of the same record do not match across the two materials, the original record can be located |
| Form input node | Field names correspond one-to-one with material fields, required markers cover key material fields, and field values can be referenced by subsequent nodes after submission | In the node configuration, check the field names and required settings one by one, and after submission check whether subsequent nodes can retrieve the corresponding field values, avoiding the conversation remaining stuck in the interactive state |

## Three common errors

- Symptom: For the same record, the program name, course quantity, and date do not match between the program setup application form and the talent training plan. Cause: The two materials are filled in separately, field definitions are not unified, and no cross-comparison is performed after submission.
- Symptom: The revised version of the talent training plan is not synchronized to the expert review opinions, and the review conclusion cites the old version's credits and class hours. Cause: After the version update, the review and signature process was not rerun, and the version number is missing between materials.
- Symptom: The expert review opinions lack a signature or receipt but still enter the review stage. Cause: Required markers do not cover the signature and receipt fields, and empty values are not blocked on submission.

## How to verify the setup

Feature acceptance: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that field passing after `formInputResult` and `selectResult` submission works normally, that submission is not allowed when required items are empty, and that the conversation does not remain stuck in the interactive state.

Business test: create an exception record, see whether the source material can be traced, and check the name, quantity, date, and signature receipt of the program setup application form, talent training plan, and expert review opinions.

- In the node configuration, check the field names and required settings one by one to ensure they correspond one-to-one with the material fields of the program setup application form, talent training plan, and expert review opinions.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission, then hand them over to the person in charge for handling.
