---
title: Forms and User Interaction for Pre-Departure Training and Overseas Safety: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c047-f016
page_type: 行业问题页
application_area: education
meta_title: Study Abroad Safety | Forms | Intake
meta_description: Study Abroad Safety: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Pre-Departure Training and Overseas Safety: Handle Questions and Collect Missing Information

## What this category's data looks like

For the intake of pre-departure training and overseas safety reminders, common materials include pre-departure training courseware, safety reminder checklists, and accommodation contact forms. The courseware source is the project team's training version, updated by semester or batch, and contains the course name, training date, instructor signature, and receipt column; the safety reminder checklist source is the safety management department, updated by destination country and city, and contains reminder items, version number, effective date, and confirmation signature; the accommodation contact form source is the overseas accommodation coordinator, updated by check-in batch, and contains accommodation name, address, contact person, number of rooms, and date. When the materials enter this feature, the courseware and checklist serve as the source of and basis for the question items, and the accommodation contact form serves as the role for verifying accommodation information; together, the three types of materials form the basic fields for the intake record and the items to be completed.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Pre-departure training courseware | The courseware fields correspond item by item to the intake record, and the course name, training date, instructor signature, and receipt are complete | Check the field names one by one in the node configuration, check the required markers, and after a trial run confirm that subsequent nodes can retrieve the corresponding field values |
| Safety reminder checklist | The checklist items, version number, and effective date are consistent with the intake record, with no missing signature or receipt | Check whether the version number and effective date are synchronized, check the confirmation signature column, and after submission reference the `formInputResult` field in a trial run |
| Accommodation contact form | The accommodation name, address, contact person, number of rooms, and date are consistent with the intake record | Compare the names and quantities in the two materials, check the date and signature, and after submission verify the `selectResult` output transfer |
| formInputResult and selectResult | Key material fields are marked as required, and the interaction state can be entered and exited normally | Check the required settings one by one, reference the `formInputResult` and `selectResult` fields in a trial run, and confirm that submission is not possible when required items are empty |

## Three common errors

- Symptom: The name and number of rooms for the same accommodation record do not match between the accommodation contact form and the intake record. Cause: The two materials are updated separately, without field comparison and unification.
- Symptom: The version of the safety reminder checklist is not synchronized, and the intake record references old-version items. Cause: The version number and effective date were not checked together with the checklist update.
- Symptom: The training courseware lacks the instructor signature or receipt, but the intake record still shows it as complete. Cause: The signature and receipt columns were not included in the required markers, and submission was not blocked.

## How to verify the setup

This feature acceptance: fill out the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` fields can be referenced.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- Check the field names and required markers one by one in the node configuration, and confirm that key material fields are marked as required.
- After submission, reference the `formInputResult` and `selectResult` fields in a trial run, and confirm that subsequent nodes can retrieve the corresponding field values.
