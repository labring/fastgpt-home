---
title: Forms and User Interaction for Enrollment Changes and Graduation Eligibility: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c021-f016
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Forms | Intake
meta_description: Graduation Eligibility: review forms for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Enrollment Changes and Graduation Eligibility: Handle Questions and Collect Missing Information

## What this category's data looks like

Student status changes and graduation eligibility review cover three types of materials: leave/resumption of studies applications, major transfer applications, and graduation review checklists. Leave/resumption of studies applications focus on the reason for the change, start and end dates, and signatures; major transfer applications focus on the transfer-in and transfer-out majors, assessment conclusions, and dates; graduation review checklists focus on course names, credit amounts, grade dates, and department signatures. The materials flow in from three sources: exports from the academic affairs system, student submissions, and department summaries. The update cadence advances by semester and by batch, and field version differences are most likely to appear in names, quantities, dates, and signatures. When entering this feature, the three types of materials each play a different role: leave/resumption of studies applications and major transfer applications provide the basis for the change, while graduation review checklists provide the underlying ledger for eligibility determination. Field values are uniformly collected through form interaction and then passed on.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). "Intake records and items to be completed" are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave/resumption of studies application | Whether the reason for the change, start and end dates, and signature are complete, and whether the dates align with records of the same name in the major transfer application | Check the field names one by one in the node configuration, and test-run referencing that field |
| Major transfer application | Whether the transfer-in and transfer-out majors, assessment conclusions, and dates are consistent with the graduation review checklist, and whether the signature and receipt are missing items | Check the required settings one by one, and confirm that key material fields have been marked as required |
| Graduation review checklist | Whether the course names, credit amounts, and grade dates match the other two materials, and whether the versions are in sync | Reference that field in a subsequent node and test-run it, and check the field passing after submission |
| `formInputResult` and `selectResult` | Whether the field values corresponding to the two identifiers can be retrieved by subsequent nodes, and whether the `userSelect` options cover the three types of materials | Reference these two fields in a subsequent node and test-run it, and confirm that the corresponding values are retrieved |

## Three common errors

- Symptom: The dates for the same record do not match between the leave/resumption of studies application and the major transfer application. Cause: The two materials are maintained separately, and the field values were not aligned at submission.
- Symptom: The course count in the graduation review checklist is inconsistent with the department summary version. Cause: The versions are not in sync, and the old checklist is still in circulation.
- Symptom: The major transfer application is missing a signature or receipt but still enters subsequent processing. Cause: The required marking does not cover the signature and receipt fields.

## How to verify the setup

Feature acceptance: Fill it out once and submit, then check whether the field values retrieved by subsequent nodes match what was filled in, focusing on the fields corresponding to `formInputResult` and `selectResult`.

Business test: Submit a question that is missing key information, see whether it asks follow-up questions before answering, and confirm that the follow-up items fall on the missing fields.

- Check the field names and required settings one by one in the node configuration, and confirm that key material fields have been marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and test-run them, and confirm that the corresponding field values can be retrieved after submission.
