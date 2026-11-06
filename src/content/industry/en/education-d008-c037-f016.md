---
title: Forms and User Interaction for Vocational Training Subsidy Applications: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c037-f016
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Forms | Access
meta_description: Training Subsidies: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational Training Subsidy Applications: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on the vocational training subsidy application category. The source materials are three original records: training class filing, attendance records, and completion assessment forms. The update cadence rolls with class batches and completion milestones. Field characteristics center on four types: name, quantity, date, and signature. The class filing states the institution and course name, planned number of participants, and class start date. The attendance records list by day the trainee names, attendance dates, and personal signatures. The completion assessment form states the assessment name, number of qualified participants, completion date, and assessor signature. When the materials enter the authorized access and external service stage, each has a different role: the filing determines the visible scope of the entry point, the attendance records support process verification, and the completion assessment form determines the conclusion fields disclosed externally. The fields of the three must be aligned item by item. The name, quantity, and date of the same record should be consistent across materials. Versions sync with the batch. Signatures and receipts must not be missing.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually. After the form is triggered, the conversation enters an interactive state and records the workflow state. Only after the user fills in the required items and submits are the field values passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing | The institution and course name, planned number of participants, and class start date must be consistent item by item with the attendance records and completion assessment form | Check the field names one by one in the node configuration, and confirm that the filing's name, quantity, and date match the other two materials |
| Attendance records | Trainee names, attendance dates, and personal signatures must correspond to the planned number of participants in the filing and the number of qualified participants in the completion assessment form | Check the required settings one by one, and confirm that the three items—name, date, and signature—are all marked as required |
| Completion assessment form | The assessment name, number of qualified participants, completion date, and assessor signature must be version-synced with the filing and attendance records | Reference this field in subsequent nodes and run a test, and confirm that the number of qualified participants and completion date can retrieve the corresponding field values |
| Form fields and authorization scope | The visitor identity matches the visible scope; unauthorized access is not visible | Access once with a restricted identity, and check whether the visible scope of the three types of fields—filing, attendance, and completion—matches the settings |

## Three common errors

- Symptom: The number of qualified participants for the same training session does not match between the filing and the completion assessment form. Cause: The two materials are entered separately, without backfilling from the same record and cross-checking.
- Symptom: The dates in the attendance records and the completion assessment form differ by several days, so they cannot correspond to the same batch. Cause: Versions are not synced, and old materials are not updated and replaced with the batch.
- Symptom: The completion assessment form lacks the assessor signature or receipt, so the conclusion cannot be confirmed during external service. Cause: The signature step is not included in required validation, and empty values are not blocked on submission.

## How to verify the setup

Acceptance for this feature: Fill out the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that after `formInput` submission the fields can be passed and that the `userSelect` option value matches the selection.

Business test: Access once with a restricted identity, see whether the visible scope matches the settings, and confirm unauthorized fields are not visible.

- Check the field names one by one in the node configuration, confirm that the name, quantity, and date fields of the three types of materials—filing, attendance, and completion—correspond one by one, and check the required markers one by one.
- Reference this field in subsequent nodes and run a test, confirm that the corresponding field values can be retrieved after submission, and that the conversation does not remain in the interactive state.
