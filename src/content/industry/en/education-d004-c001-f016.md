---
title: Forms and User Interaction for Daily Kindergarten Care Management: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c001-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Forms | Handover
meta_description: Kindergarten Care: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Daily Kindergarten Care Management: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category involves daily life schedules, morning and afternoon check records, and child health observation records. These materials are generated daily and updated by stage, with fields including child name, activity period, water intake count, meal amount, nap duration, health status, observation description, responsible person's signature, and date. The daily life schedule defines process nodes and responsibility division, while morning and afternoon check records and child health observation records carry the day's individual status and abnormality tracking. When these materials enter the forms and interaction function, each plays a different role: the schedule provides the handover framework and timeline, the morning and afternoon check records provide the results of two screenings at entry and noon, and the health observation records supplement the full-day dynamics and follow-up concerns. The fields of the three must maintain consistent names, quantities, and dates during drafting and handover, with synchronized versions and complete signatures and receipts, before they can proceed to the next stage of acceptance.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The material drafts and handover records that can be issued are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether the fields cover activity period, responsible person, and date, and are consistent with the names and quantities in the morning and afternoon check records and child health observation records | Check the field names one by one in the node configuration, confirm the required markers, and after submission check whether subsequent nodes can retrieve the corresponding field values |
| Morning and afternoon check records | Whether the child name, date, health status, and signature for the morning and afternoon checks are complete, and whether they correspond to the timeline of the daily life schedule | Check the required settings one by one, run a trial submission, and verify whether the field values referenced by subsequent nodes are complete |
| Child health observation records | Whether the observation description, water and meal counts, nap duration, responsible person's signature, and version date are synchronized with the schedule and morning and afternoon check records | Reference this field in subsequent nodes and run a trial to confirm that the field value can be retrieved after submission and whether missing items are blocked by required validation |
| formInputResult and selectResult | Whether the interaction node outputs field values according to the configuration, and whether form fields are read from formInputResult and user choices are read from selectResult | Check the field names and required items in the node configuration, and after submission check the field values retrieved by subsequent nodes |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the daily life schedule and the morning and afternoon check records. Cause: During drafting, the unified field names were not checked, and versions were not synchronized.
- Symptom: The handover record lacks a signature or receipt, and the next stage cannot accept it. Cause: Key material fields were not marked as required, and missing items were not blocked at submission.
- Symptom: After submission, subsequent nodes cannot retrieve values, and the conversation stays in the interaction state. Cause: Field passing was not referenced and trialed in subsequent nodes, and submission was possible even with empty required items.

## How to verify the setup

This function's acceptance: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the field values output by `formInputResult` and `selectResult` can be referenced.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required markers one by one in the node configuration, and confirm they correspond one-to-one with the fields of the daily life schedule, morning and afternoon check records, and child health observation records.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, and check whether the field values can be retrieved after submission and whether missing items are blocked by required validation.
