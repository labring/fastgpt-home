---
title: Forms and User Interaction for School Enrollment Records and Status Changes: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c007-f016
page_type: 行业问题页
application_area: education
meta_title: School Enrollment | Forms | Intake
meta_description: School Enrollment: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Enrollment Records and Status Changes: Handle Questions and Collect Missing Information

## What this category's data looks like

Student status establishment and changes in primary and secondary schools cover three categories: student status records, transfer applications, and suspension/resumption materials. Student status records include the student's basic information, guardian information, enrollment date, and school seal; transfer applications include the transferring-out school, transferring-in school, reason for transfer, signatures of both parties, and receipt; suspension/resumption materials include the suspension start and end dates, diagnostic certificate, resumption application, and homeroom teacher's signature. The sources of materials are parent submissions, issuance by the original school, and review by the receiving school, and the update cadence changes with student status establishment at the start of the semester, transfers during the semester, and temporary suspension/resumption. Field characteristics are concentrated in name, ID number, student status number, dates, signatures, and receipts. When the three categories of materials enter Q&A intake and missing-item follow-up, each plays a different role: student status records are used to verify identity and the basis for status establishment, transfer applications are used to verify transfer intent and confirmation by both parties, and suspension/resumption materials are used to verify the time interval and the basis for approval.

## Configuration and implementation checks

This part is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Student status record | Whether name, ID number, student status number, enrollment date, and school seal are consistent with the requirements for status establishment | Check the field names one by one in the node configuration, confirm that the required markers cover the key fields, reference the fields after submission, and run a test |
| Transfer application | Whether the transferring-out school, transferring-in school, reason for transfer, signatures of both parties, and receipt are complete and the dates can correspond | Check the field names and required settings, and after submission check whether subsequent nodes can obtain the field values for the transferring-out school and transferring-in school |
| Suspension/resumption materials | Whether the suspension start and end dates, diagnostic certificate, resumption application, and homeroom teacher's signature are complete | Check the field names and required settings, and after submission check whether subsequent nodes can obtain the field values for the suspension start and end dates |
| Form input node | After being triggered, it enters the interaction state and records the workflow state; after required items are submitted, the field values are passed to subsequent nodes | Check the field names and required markers in the node configuration, reference the fields in subsequent nodes and run a test, and confirm that the corresponding field values are obtained |

## Three common errors

- Symptom: The name or date for the same record does not match between the student status record and the transfer application. Cause: The two materials are filled in separately, no field-level verification is performed, and they flow directly after submission.
- Symptom: The version of the suspension/resumption materials is not synchronized, and the dates on the diagnostic certificate and the resumption application are inconsistent. Cause: The materials are submitted in batches, and the form does not require them to be completed in the same batch.
- Symptom: The transfer application lacks the transferring-out school's signature or receipt. Cause: The required markers do not cover the signature and receipt fields, and after submission subsequent nodes cannot obtain the corresponding values.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values obtained by subsequent nodes, confirm that the corresponding field names in `formInputResult` and `selectResult` are consistent, and that submission is not possible when required items are empty.

Business test: submit a question that lacks key information and see whether it asks a follow-up question before answering.

- Check the field names and required markers one by one in the node configuration, and confirm that they correspond one-to-one with the fields of student status records, transfer applications, and suspension/resumption materials.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to confirm that the corresponding field values can be obtained after submission.
