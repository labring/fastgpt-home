---
title: Forms and User Interaction for Vocational Training Subsidy Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c037-f016
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Forms | Intake
meta_description: Training Subsidies: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational Training Subsidy Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

Vocational training subsidy application materials usually include three types: training class filing records, attendance records, and completion assessment forms. They are submitted by training institutions or handling personnel by class session and updated with the application batch. The class filing record contains the course name, class start date, student roster, and institutional seal; the attendance record contains the daily attendance date, student name, and personal signature; the completion assessment form contains the assessment subject, score, assessment date, and assessor signature. When these three types of materials enter the form input node, each plays a different role: the class filing record provides the class session and personnel baseline, the attendance record provides evidence of the attendance process, and the completion assessment form provides proof of results. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same student name, training hours, and class start or completion date must remain consistent across the three materials, and signatures and receipts must be complete.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). "Intake records and items to be completed" are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing record | Check the course name, class start date, number of students, and institutional seal, and compare them item by item with the attendance record and completion assessment form | Check the field names one by one in the node configuration, and confirm that the class start date and number of students fields have been collected |
| Attendance record | Check the daily attendance date, student name, and personal signature, and compare them with the class filing roster and the names on the completion assessment form | Check the required settings one by one, and confirm that the attendance date and signature fields are marked as required |
| Completion assessment form | Check the assessment subject, score, assessment date, and assessor signature, and compare them with the class filing course and attendance record attendance | Reference this field in a subsequent node and run a test to confirm that the score and assessment date values are correct |
| formInput field passing | Subsequent nodes can retrieve the corresponding field values, and no empty values appear after submission | Reference the `formInputResult` and `selectResult` fields in a subsequent node and run a test |

## Three common errors

- Symptom: The same student name is written differently in the class filing record and the attendance record. Cause: The name standard was not unified during entry, and the two materials were filled in independently.
- Symptom: The number of training hours does not match between the class filing record and the completion assessment form. Cause: The versions were not synchronized, and the completion assessment form still uses the old number of hours.
- Symptom: The attendance record lacks a personal signature or the receipt is missing. Cause: The signature and receipt completeness were not checked page by page during material collection.

## How to verify the setup

Acceptance for this feature: Fill out the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` fields are passed correctly.

Business test: Submit a question that lacks key information, see whether it asks a follow-up question before answering, and confirm that the missing item is identified and followed up on and that the answer is based on materials.

- Check the field names one by one in the node configuration, and confirm that they correspond one-to-one with the fields in the class filing record, attendance record, and completion assessment form
- Check the required settings one by one, confirm that key material fields are marked as required, and run a test to confirm that the field values can be referenced by subsequent nodes after submission
