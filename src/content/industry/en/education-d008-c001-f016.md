---
title: Forms and User Interaction for Daily Kindergarten Care Management: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c001-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Forms | Access
meta_description: Kindergarten Care: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Daily Kindergarten Care Management: Manage Authorized Access and External Services

## What this category's data looks like

The core materials for kindergarten childcare daily life management include the daily life schedule, morning and afternoon check records, and child health observation records. These materials come from daily entries by class teachers, childcare workers, and health personnel, updated daily, summarized weekly, and archived monthly. The daily life schedule uses time as its axis, recording activity segments, time periods, and responsible persons; morning and afternoon check records are collected twice, in the morning and at noon, including body temperature, oral cavity, skin, mental state, and parent signature; child health observation records provide continuous tracking of individual children's water intake, eating, sleep, bowel movements, and emotions, including observation date, description, handling, and health personnel signature. When the materials enter the authorized access and external services scenario, the schedule serves as the visible-scope skeleton of the external entry point, while morning and afternoon check records and health observation records serve as restricted fields, with display determined by visitor identity. The forms and interaction step is responsible for collecting fields such as receipts, leave requests, and abnormality explanations that parents or superiors need to submit, and passing them to subsequent nodes or manual handling, so that external services have a basis to rely on.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether the fields, dates, and signatures match the morning and afternoon check records and health observation records | Check the field names one by one in the node configuration, confirming that the date, segment, and responsible person fields of the schedule are consistent with the other two materials; run a test to check whether subsequent nodes can retrieve the corresponding field values |
| Morning and afternoon check records | Whether the name, quantity, and date of the same record are consistent across the schedule and health observation records, and whether signatures or receipts are missing | Check the required markers, setting body temperature, mental state, and parent signature as required; submit once with a restricted identity and check whether unauthorized fields are invisible |
| Child health observation records | Whether the version is synchronized, and whether the observation date and handling opinion conflict with the morning and afternoon check records | Reference this field in a subsequent node and run a test, confirming that after submission the subsequent node retrieves the latest version; check whether signatures and receipts are complete |
| Form input node | Whether submission is possible when required items are empty, and whether the conversation stays in the interaction state | Check the required settings one by one; after submission, check whether subsequent nodes can retrieve the field values, and confirm that the conversation continues to execute downward |

## Three common errors

- Phenomenon: The morning check body temperature of the same child does not match in date between the morning and afternoon check records and the health observation records. Cause: The two materials are filled in separately, without synchronized verification of the date field.
- Phenomenon: The daily life schedule has been updated to a new version, but the external entry point still displays the old version's segments and time periods. Cause: The version is not synchronized, and the authorization scope is not adjusted as the materials are updated.
- Phenomenon: A parent receipt or health personnel signature is missing, but a restricted identity can still see the complete record. Cause: The required markers do not cover the signature field, and the visible scope is not narrowed by identity.

## How to verify the setup

Feature acceptance: Fill out the form once and submit it, then check whether the field values retrieved by subsequent nodes are consistent with what was filled in; reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, confirming that the values can be retrieved after submission.

Business test: Access once with a restricted identity, see whether the visible scope matches the settings, and whether unauthorized fields are invisible.

- In the node configuration, check the form field names one by one against the fields of the daily life schedule, morning and afternoon check records, and child health observation records for one-to-one correspondence, and check the required markers.
- After submission, check whether subsequent nodes can retrieve the field values of `formInputResult` and `selectResult`, and confirm that the conversation has not stopped in the interaction state.
