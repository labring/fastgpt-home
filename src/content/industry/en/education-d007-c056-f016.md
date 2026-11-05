---
title: Forms and User Interaction for Teacher Qualification Exams and Certification: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c056-f016
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Forms | Review
meta_description: Teacher Qualifications: review forms for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Teacher Qualification Exams and Certification: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three types of materials: written and interview registration forms, Mandarin proficiency certificates, and medical examination forms. The registration form is filled out online by the candidate and includes name, ID number, exam subjects, exam district, date, and signature; the Mandarin proficiency certificate is issued by a testing institution and includes certificate number, grade, issue date, and seal; the medical examination form is issued by a designated hospital and includes the examination conclusion, physician signature, hospital stamp, and date. When materials enter the exception tracing and manual review scenario, the registration form serves as the source of identity and exam registration information, while the Mandarin proficiency certificate and medical examination form serve as qualification evidence. In terms of update cadence, the registration form changes with registration batches, while certificates and medical examination forms are supplemented or reissued according to certification batches. The field characteristics are that the four types of elements—name, number, date, and signature—must be compared item by item; if any element does not match between two materials, it becomes an exception pending review.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Fields include name, ID number, exam subjects, exam district, date, and signature, and are compared item by item with the Mandarin proficiency certificate and medical examination form | Check the field names and required markers, and after submission check whether subsequent nodes can reference `formInputResult` to retrieve the field values |
| Mandarin proficiency certificate | The certificate number, grade, issue date, and seal must be consistent with the name and ID number on the registration form | Check the certificate number and issue date fields, and confirm that submission is not possible when required items are empty |
| Medical examination form | The examination conclusion, physician signature, hospital stamp, and date must be logically consistent with the date on the registration form | Check the signature and date fields, and after submission reference `selectResult` in a trial run to verify field passing |
| Exception list and review conclusion | Exception entries must be supported by original records, and can only be handed over to the person in charge for handling after the reviewer signs | Check whether the list can be traced back to the source materials, and check whether the reviewer signature column is complete |

## Three common errors

- Symptom: The name or date for the same record does not match between the registration form and the Mandarin proficiency certificate. Cause: The two materials are entered separately, lacking item-by-item comparison and source traceback.
- Symptom: The version of the medical examination form is not synchronized, and the old conclusion is still submitted with a new batch. Cause: The attachment was not replaced after the material was updated, and the version date was not checked during review.
- Symptom: The exception list lacks the reviewer signature or receipt, so it cannot be handed over to the person in charge for handling. Cause: The review process has no signature column, and confirmation information is not returned after submission.

## How to verify the setup

Acceptance of this feature: fill out the form once and submit it, then check whether the field values retrieved by subsequent nodes are consistent with the entered content, focusing on whether the `formInputResult` and `selectResult` references retrieve values.

Business test: create an exception record, see whether it can be traced back to the source materials, and confirm that the reviewer signature and the handover destination for the person in charge are complete.

- In the node configuration, check the field names and required markers one by one, and confirm that key material fields are marked as required.
- Reference the form fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission and that the conversation does not get stuck in the interactive state.
