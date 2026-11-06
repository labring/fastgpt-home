---
title: Forms and User Interaction for New Employee Onboarding and Training: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c040-f016
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Forms | Intake
meta_description: Employee Onboarding: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for New Employee Onboarding and Training: Handle Questions and Collect Missing Information

## What this category's data looks like

Intake records and follow-up questions for enterprise new-hire onboarding training mainly come from three types of materials: onboarding training plans, course sign-in sheets, and job descriptions. The onboarding training plan provides the fields of course name, training date, training location, and person in charge; the course sign-in sheet provides the fields of trainee name, department, sign-in time, and signature column; the job description provides the fields of position name, affiliated department, job responsibilities, and job requirements. When these three types of materials enter the Q&A intake and missing-item follow-up function, each plays a different role: the training plan is used to check sessions and times, the sign-in sheet is used to check personnel attendance and acknowledgments, and the job description is used to check the match between positions and courses. Materials are updated in batches; new-hire onboarding batches, course adjustments, and position changes all trigger version changes. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. The same record is prone to situations such as different name spellings, dates differing by one day, different statistical bases for headcount, and blank signature columns across different materials. During intake, first compare item by item according to the material fields, identify missing items, generate follow-up questions, and then transfer them to the handler.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake records and completed follow-up items" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Whether the fields of course name, training date, training location, and person in charge are consistent in name and date with the corresponding records in the sign-in sheet and job description | Check the field names one by one in the node configuration, compare the course names and dates in the training plan and sign-in sheet, and mark the differences |
| Course sign-in sheet | Whether trainee name, department, sign-in time, and signature column are complete, and whether the quantity matches the headcount in the training plan | Check the required settings one by one, check whether the signature column is empty and whether the headcount is consistent with the plan, and record missing signatures or acknowledgments as follow-up items to be completed |
| Job description | Whether position name, affiliated department, job responsibilities, and job requirements match the position courses in the training plan, and whether the versions are synchronized | Reference this field in subsequent nodes and run a test, and check whether the version number of the job description is consistent with the version of the training plan |
| Form input node | Whether the required markers cover key material fields, and whether the field values can be retrieved by subsequent nodes after submission | Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to confirm that the subsequent nodes can retrieve the corresponding field values after submission |

## Three common errors

- Symptom: The name and date of the same course do not match between the training plan and the sign-in sheet. Cause: The two materials are maintained separately, have different update rhythms, and no field-level comparison is performed.
- Symptom: The version of the job description is not synchronized, and the match between courses and positions is misaligned. Cause: After the version update, it is not written back to the training plan, and the old version fields are retrieved when referenced.
- Symptom: The sign-in sheet lacks a signature or acknowledgment, and the intake record is incomplete. Cause: The required markers do not cover the signature field, and subsequent nodes cannot retrieve that value after submission.

## How to verify the setup

Acceptance of this function: fill out the form once and submit it, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` fields are passed correctly, and that submission is not possible when required items are empty.

Business test: submit a question missing key information and see whether it asks a follow-up question first before answering, and whether the follow-up content points to the missing items in the onboarding training plan, course sign-in sheet, or job description.

- Check the field names one by one in the node configuration to ensure that the form fields correspond one-to-one with the material fields of the onboarding training plan, course sign-in sheet, and job description.
- Check the required settings one by one, reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, and confirm that the subsequent nodes can retrieve the corresponding field values after submission.
