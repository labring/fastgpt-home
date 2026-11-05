---
title: Tool Calls and Plugins for Kindergarten Play Activity Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c002-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Tool Calls | Checks
meta_description: Kindergarten Play: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten Play Activity Organization: Compare Documents and Locate Differences

## What this category's data looks like

Kindergarten play activity organization involves observation records, area plans, material placement lists, activity reflections, and next week's plans. Observation records are generated per activity session, area plans are updated weekly, material placement lists change with area adjustments, and reflections and next week's plans connect at the weekend. When these materials enter this feature, observation records and area plans serve as the comparison baseline, material placement lists provide quantity fields, and reflections and next week's plans provide goal attainment and handover information. Material fields include activity name, area name, material name, placement quantity, activity date, goal description, observation points, and reflection conclusion. The name, quantity, and date of the same object should be consistent across the two materials, and the discrepancy list is used for the reviewer to confirm and write back.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | Whether the same activity name, date, and goal description correspond across the two materials | Compare activity names and dates one by one, and mark fields where the goal and observation do not match |
| Material placement quantity | Whether the material name and placement quantity are consistent between the list and the area plan | Check material names and quantities, and record entries with insufficient materials or quantity discrepancies |
| Activity reflection transferred to next week's plan | Whether the reflection conclusion is transcribed into next week's plan, and whether the plan is updated | Check the reflection conclusion and next week's plan entries, and mark fields where the plan has not been updated |
| Tool call node connection | Whether the diamond interface is connected to the target tool, and whether the node status is normal | Check the diamond connection and node status on the canvas, and confirm the tool can be called |

## Three common errors

- Symptom: a material quantity in the material list is less than required by the area plan. Cause: the material placement quantity was not updated in sync with area adjustments, resulting in insufficient materials.
- Symptom: the goal description in the observation record is inconsistent with the area plan goal. Cause: the goal and observation do not match, and activity goal attainment cannot be corresponded.
- Symptom: the reflection conclusion does not appear in next week's plan. Cause: the plan was not updated, and the step of transferring the reflection to next week's plan is missing.

## How to verify the setup

Feature acceptance: run a trial with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; open the tool node introduction field and parameter introductions, check whether both are required, and check the diamond connection and node status on the canvas, observing the behavior of `toolChoice` and `functionCall` in the call record.

Business test: use one real record to find fields inconsistent with the ledger, compare the observation record with the area plan and material placement list item by item, mark inconsistencies in name, quantity, and date, and submit them to the reviewer for confirmation and write-back.

- Open the tool node introduction field, check whether the description can be understood on its own, and confirm the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, check the parameter introduction and whether it is required, run a trial with a question missing that field, and see whether it asks a follow-up question first rather than directly fabricating.
