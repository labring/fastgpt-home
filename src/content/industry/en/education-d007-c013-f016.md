---
title: Forms and User Interaction for School Teacher Training Credits: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c013-f016
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Forms | Review
meta_description: Teacher Credits: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Teacher Training Credits: Trace Exceptions and Review Results

## What this category's data looks like

Credit management for primary and secondary school teacher training involves three types of materials: training notices, credit recognition forms, and attendance lists. Training notices are issued by the training organizer and include the training name, start and end dates, class hours, and signature/seal; credit recognition forms are filled out by the teacher's school or the training unit and include the teacher's name, ID number, training program, recognized credits, and signature; attendance lists are provided by the training organizer and include the names of participants, their units, sign-in dates, and acknowledgments. When these three types of materials enter the exception tracing and manual review function, they respectively play the roles of basis, conclusion, and supporting evidence: training notices are used to verify the program and dates, credit recognition forms are used to verify the recognition results and signatures, and attendance lists are used to verify actual participation and acknowledgments. Materials are updated by training batch, and the fields are mainly names, dates, quantities, and signatures, with common version differences and missing items.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Check whether the training name, start and end dates, class hours, and signature/seal are consistent with the credit recognition form | Check the field names one by one in the node configuration, and confirm that the notice fields correspond one-to-one with the recognition form fields |
| Credit recognition form | Check whether the teacher's name, training program, recognized credits, signature, and date are complete | Check the required settings one by one, and confirm that the key material fields have been marked as required |
| Attendance list | Check whether the names of participants, units, sign-in dates, and acknowledgments match those in the recognition form | Reference this field in subsequent nodes and run a test to confirm that the subsequent nodes can retrieve the corresponding field values after submission |
| formInput | Check whether the field transfer after submission of the form input node is complete | Use `formInputResult` and `selectResult` to reference the fields and run a test to confirm that subsequent nodes retrieve the values |

## Three common errors

- Symptom: The training name and dates for the same record do not match between the training notice and the credit recognition form. Cause: The two material versions were not synchronized, and their update rhythms were inconsistent.
- Symptom: The sign-in count in the attendance list is inconsistent with the number of recognized persons in the credit recognition form. Cause: The recognition form was not written back after the list was updated, and the counting bases differ.
- Symptom: The credit recognition form lacks a signature or the attendance list lacks an acknowledgment, yet it still enters review. Cause: The required markers do not cover the signature and acknowledgment fields.

## How to verify the setup

Acceptance for this function: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` references are valid.

Business test: create an exception record, see whether the source material can be traced, and confirm that the exception is supported by the original record and signed by the reviewer.

- Check the field names one by one in the node configuration, and confirm that they correspond one-to-one with the fields in the training notice, credit recognition form, and attendance list.
- Check the required settings one by one, confirm that the signature and acknowledgment fields have been marked as required, and run a test to confirm that subsequent nodes can retrieve the values after submission.
