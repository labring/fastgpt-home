---
title: Forms and User Interaction for Self-Study Exam Records and Graduation Review: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c054-f016
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Forms | Handover
meta_description: Self-Study Exams: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Self-Study Exam Records and Graduation Review: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category involves three types of materials: registration archives, course qualification certificates, and graduation application forms. Registration archives record the candidate's basic information and enrollment status, course qualification certificates carry single-subject scores and dates of attainment, and graduation application forms summarize the major plan, credits, and signature fields. The sources of materials are historical data from provincial examination offices, grade databases of host institutions, and paper forms submitted by candidates, with the update cadence following examination sessions and graduation review batches. Field characteristics center on name, examination registration number, course name, credits, qualification date, review comments, and handler signature. When entering the forms and interaction function, registration archives provide the underlying ledger fields, course qualification certificates provide the basis for quantities and dates, and graduation application forms assume the role of summary and receipt; the fields of the three must be aligned item by item.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "draftable materials and handover records" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration archives | The name, examination registration number, and enrollment status fields are consistent with the underlying ledger, and dates are traceable | Check the field names one by one in the node configuration, and compare them with the fields in the original registration archives |
| Course qualification certificates | The course name, quantity, and qualification date do not conflict between the two materials | Check the required settings and confirm that the qualification certificate fields are marked as required |
| Graduation application form | The signature fields and receipt fields are complete, and the version and date are synchronized | Reference this field in subsequent nodes and run a trial to confirm that the field value can be passed |
| Form input node | Submission is not allowed when required items are empty, and the interaction state can end normally | Configure fields with `formInputResult` and `selectResult`, and run a trial submission once |

## Three common errors

- Phenomenon: The same course name is written differently in the registration archives and the course qualification certificate. Cause: During drafting, the fields were not aligned item by item with the underlying ledger, and the naming and quantity conventions were mixed.
- Phenomenon: The version of the graduation application form does not match the date in the registration archives. Cause: The version was not synchronized after the materials were updated, and the old form continued to circulate to the next stage.
- Phenomenon: The handover record lacks a signature or receipt, and the next stage cannot sign for acceptance. Cause: The form did not mark the signature and receipt fields as required, so submission was not blocked.

## How to verify the setup

Fill it out once and submit, then check the field values obtained by subsequent nodes to confirm that the fields corresponding to `formInputResult` and `selectResult` can be passed normally.

Business test: Draft one according to the template and complete one handover to see whether missing items are blocked.

- Check the field names and required settings one by one, and confirm that the fields of the registration archives, course qualification certificates, and graduation application form correspond one to one
- Reference the form fields in subsequent nodes and run a trial to confirm that the field values can be obtained after submission and that the interaction state ends normally
