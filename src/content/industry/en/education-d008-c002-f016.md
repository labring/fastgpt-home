---
title: Forms and User Interaction for Kindergarten Play Activity Organization: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c002-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Forms | Access
meta_description: Kindergarten Play: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Play Activity Organization: Manage Authorized Access and External Services

## What this category's data looks like

Kindergarten play activity organization is the daily material built around observation records, area plans, material placement, activity objectives, and reflection-to-next-week plans. Sources include class observation records, area activity plan sheets, material placement lists, activity objective achievement records, and reflection-to-next-week plan sheets; the update rhythm advances weekly and is supplemented in real time as activities occur. When these materials enter the form input node, the correspondence between observation records and area plans, material placement quantities, activity objective achievement, and reflection-to-next-week plans constitute the field sources; authorized access and external services then determine which fields are visible to parents or superiors. The material itself does not automatically judge content; field values serve only as input for subsequent nodes or manual processing and the authorization scope.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Correspondence between observation records and area plans | The area in the observation record is consistent with the area in the plan sheet, and the record entries can correspond to specific plan items | Check the field names one by one in the node configuration, confirm that the observation area field corresponds one-to-one with the plan area field, then access once with a restricted identity to see whether the visible scope matches the setting |
| Material placement quantity | The quantity in the material placement list matches the quantity required by the area plan, with no material shortage | Check the required settings one by one, mark the material quantity field as required, and after submission check whether subsequent nodes can retrieve that field value |
| Activity objective achievement | The activity objective is consistent with the behavior reflected in the observation record, and when the objective does not match the observation, it can be distinguished through fields | Reference the objective field and the observation field in subsequent nodes and run a test, confirm that the two values correspond, then check the visible scope |
| Reflection-to-next-week plan | The reflection content has been transferred into the next-week plan field; when the plan has not been updated, this field is empty or retains its original value | Check the transfer relationship between the reflection field and the next-week plan field in the node configuration, and after submission check the field values retrieved by subsequent nodes |

## Three common errors

- Symptom: the material placement quantity field can be submitted even when left blank. Cause: key material fields are not marked as required, the interaction state directly allows passage, and subsequent nodes cannot retrieve the value.
- Symptom: the activity objective does not match the observation record. Cause: the objective field and the observation field are not mapped one by one in the node configuration, and values are misaligned after submission.
- Symptom: the reflection-to-next-week plan is not updated for a long time. Cause: the reflection field is not passed to the plan field, and subsequent nodes retrieve the old value when referencing it.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the fields output by `formInput` are consistent with the configured field names.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized content is not visible.

- Check the field names one by one in the node configuration, confirm that the material fields correspond one-to-one with the fields to be collected, and check the required markers of `formInput`.
- Reference the `selectResult` output in subsequent nodes and run a test, confirm that the corresponding field value can be retrieved after submission, then check the visible scope of the restricted identity.
