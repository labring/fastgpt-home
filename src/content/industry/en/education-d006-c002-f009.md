---
title: Tool Calls and Plugins for Kindergarten Play Activity Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c002-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Tool Calls | Progress
meta_description: Kindergarten Play: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten Play Activity Organization: Track Progress and Check Statistics

## What this category's data looks like

Materials for progress records and statistical verification in kindergarten game activity organization come from observation records, area plans, material placement lists, activity objective tables, reflection records, and weekly plans. Observation records are registered item by item by activity date and area, area plans are updated weekly, material placement lists record quantities by instance, activity objective tables are archived by theme, reflection records are supplemented on the same day or the next day after the activity, and weekly plans are summarized at the end of the week. When these materials enter the tool calls and plugins feature, observation records and area plans take on the role of progress verification and standard comparison, material placement lists take on the role of quantity verification, activity objective tables take on the role of objective achievement verification, and reflection records and weekly plans take on the role of linking to the next week's plan. Field characteristics include activity name, area, date, record count, material name, placement quantity, objective items, achievement status, reflection points, and next week's adjustments. The update rhythm is weekly, with midweek supplementary entries and weekend summaries, and the statistical standard must state in the header the correspondence between record counts and statistical counts.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The progress table and statistical standard description are then completed by subsequent AI nodes or manual verification. Based on the tool introduction, parameter introduction, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable values in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | Whether the number of observation record entries corresponds to the area plan entries, and whether the objectives and observations are consistent | Open the introduction field of the tool node and check whether the description can be understood on its own; run a test with a question missing a required field and see whether the call record shows follow-up questions or directly fabricated parameter values |
| Material placement list | Whether the placement quantity matches the quantity required by the activity, and whether insufficient materials are marked in the records | Open the parameter configuration one by one and check the two items: parameter introduction and whether it is required; check whether the returned result contains values that do not exist in the business materials |
| Activity objective table and reflection records | Whether the objective achievement status matches the observation records, and whether the reflection points point to objective deviations | Check the diamond-shaped interface connections and node status on the canvas; check whether the results of multiple tools connected in series cross over into each other |
| Weekly plan | Whether the reflection-to-next-week plan is updated, and whether the failure to update the plan is explained as an exception in the header standard | Use one week of records to verify the total and check whether the statistical standard and exceptions are clearly stated; confirm that the record counts and statistical counts match |

## Three common errors

- Phenomenon: The material placement quantity does not match what the activity requires, and the records state insufficient materials but the statistics do not mark it. Cause: The parameter introduction does not state the meaning of the quantity field, and after the model calls according to the introduction, it returns values that do not exist in the business materials.
- Phenomenon: The activity objective table says achieved, but the observation records show that the objectives and observations are inconsistent. Cause: The tool introduction does not clearly state when it should be used, the model does not call the tool and directly gives an answer, and the statistical standard is not stated in the header.
- Phenomenon: The reflection records write adjustment directions, but the weekly plan is not updated, and the plan is not updated. Cause: There are required parameters but no suitable values in the context, the model does not follow up, and subsequent nodes do not verify the inputs and returns in the call record.

## How to verify the setup

Acceptance of this feature: run a test with a question missing a required parameter, verify the inputs and returns in the call record, and confirm whether it follows up or calls according to the introduction; at the same time, verify the values of `toolChoice` and `functionCall` in the call record, and confirm that the tool call node connection has been connected to the target tool.

Business test: use one week of records to verify the total, see whether the standard and exceptions are clearly stated, confirm that the record counts and statistical counts match, and state the statistical standard in the header.

- Open the introduction field in the tool node, check whether this description can be understood when taken out on its own, and verify the two items: parameter introduction and whether it is required.
- Run a test with a question missing that field and see whether it follows up first rather than directly fabricating; verify the inputs and returns of `toolChoice` and `functionCall` in the call record.
