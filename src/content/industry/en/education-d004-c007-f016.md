---
title: Forms and User Interaction for School Enrollment Records and Status Changes: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c007-f016
page_type: 行业问题页
application_area: education
meta_title: School Enrollment | Forms | Handover
meta_description: School Enrollment: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Enrollment Records and Status Changes: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Student status establishment and changes in primary and secondary schools cover three categories: student status records, transfer applications, and leave/resumption materials. The materials are sourced from school student status administrators who fill in each item and submit for approval level by level when handling new student registration, transfer in/out, and leave/resumption. The update rhythm follows the beginning and end of semesters and daily changes. Fields mainly include name, ID number, student status number, class, change type, effective date, handler, approver, signature, and receipt. When entering the form input node, student status records carry basic identity and enrollment status fields, transfer applications carry fields for both transferring-out and transferring-in schools and dates, and leave/resumption materials carry reason, start/end time, and resumption verification fields. The three categories share the same set of responsibility handover fields for receipt in the next step.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The material drafts and handover records that can be issued are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow status. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Student status record | Corresponds one-to-one with the material fields to be collected; name, student status number, class, effective date, and handler must not be missing | Check field names one by one in the node configuration, and check the required settings |
| Transfer application | Fields are complete and responsible persons are clear; transferring-out and transferring-in schools, dates, and signatures are consistent across materials | Reference this field in subsequent nodes and run a trial; check the version and date |
| Leave/resumption materials | Reason, start/end time, and resumption verification fields are marked as required; receipt is not missing | Check the required settings one by one, and check the signature and receipt fields |
| formInput node output | After submission, subsequent nodes can retrieve the corresponding field values | Reference this field in subsequent nodes and run a trial; check the values of `formInputResult` and `selectResult` |

## Three common errors

- Symptom: The name and date for the same record do not match between the student status record and the transfer application. Cause: They are filled in separately in two places, and the field source is not unified within the same form.
- Symptom: The version of the leave/resumption materials is not synchronized, and the old version is still received. Cause: The version and date are not recorded after form submission, and subsequent nodes retrieve the old field values.
- Symptom: The transfer application lacks a signature or receipt, and the handover cannot be closed. Cause: Key material fields are not marked as required, and empty values can also be submitted.

## How to verify the setup

This feature acceptance: Fill in once and submit, check the field values retrieved by subsequent nodes, and check whether the values of `formInputResult` and `selectResult` correspond.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check field names and required settings one by one, and confirm that key material fields are marked as required.
- Reference this field in subsequent nodes and run a trial, and confirm that the corresponding field values can be retrieved after submission.
