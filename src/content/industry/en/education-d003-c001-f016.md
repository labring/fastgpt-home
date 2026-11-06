---
title: Forms and User Interaction for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c001-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Forms | Intake
meta_description: Kindergarten Care: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the kindergarten childcare daily life management scenario. Materials include the daily life schedule, morning and afternoon health check records, and child health observation records. The daily life schedule is updated weekly or daily and contains fields such as activity name, start and end times, venue, and responsible person; the morning and afternoon health check records are submitted twice daily and contain the child's name, body temperature, mental state, abnormality description, handling method, and inspector's signature; the child health observation records are filled in as needed and contain observation time, symptoms, water and food intake, sleep, bowel movements, report and receipt. When these three types of materials enter this feature, the form input node is responsible for collecting the field values and passing them to subsequent nodes. The authenticity and content recognition of the materials themselves are determined by subsequent nodes or by humans; the form only performs field collection and required-field constraints.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). "Acceptance records and items to be completed" are then handled by subsequent nodes or by humans. After the form is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the field values are available for reference by subsequent nodes.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether the activity name, start and end times, venue, and responsible person match the morning and afternoon health check records and child health observation records | Check the field names one by one in the node configuration, confirm they correspond one-to-one with the schedule fields, and check whether the required markers fall on the key fields |
| Morning and afternoon health check records | Whether the child's name, body temperature, check date, and inspector's signature are complete, and whether the quantities and dates in the two materials are consistent | Use `formInput` for a trial submission, reference the `formInputResult` field values in subsequent nodes, and check whether the name, body temperature, and date are retrieved |
| Child health observation records | Whether the observation time, symptoms, handling method, report and receipt are complete, and whether the version is synchronized | Reference the `selectResult` output values in subsequent nodes, and check whether the names, quantities, and dates of the observation records match those of the schedule and morning and afternoon health check records |
| Form input node | Whether it can be submitted when required items are empty, and whether the conversation remains in the interactive state after submission | Check the required settings one by one, and after submission check whether subsequent nodes can retrieve the corresponding field values |

## Three common errors

- Symptom: The quantity for the same child's name does not match between the morning and afternoon health check records and the health observation records. Cause: The two materials are filled in separately, the field names are not unified, and the date criteria are inconsistent.
- Symptom: The daily life schedule has been updated, but the morning and afternoon health check records are still filled in according to the old version. Cause: The version is not synchronized, the material update rhythms differ, and receipt confirmation is lacking.
- Symptom: The morning and afternoon health check records lack the inspector's signature, and the health observation records lack the report receipt. Cause: The required markers do not fall on the signature and receipt fields, and submission is not blocked.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the fields corresponding to `formInputResult` and `selectResult` can be passed normally

Business test: submit a question missing key information and see whether it asks follow-up questions before answering

- Check the field names one by one in the node configuration, and confirm they correspond one-to-one with the fields of the daily life schedule, morning and afternoon health check records, and child health observation records
- Check the required settings one by one, and after submission check whether subsequent nodes can retrieve the corresponding field values, and confirm that the conversation does not remain in the interactive state
