---
title: Tool Calls and Plugins for Daily Kindergarten Care Management: Track Progress and Check Statistics
slug: /en/industry/education-d006-c001-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Tool Calls | Progress
meta_description: Kindergarten Care: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Daily Kindergarten Care Management: Track Progress and Check Statistics

## What this category's data looks like

This page addresses daily life management in kindergarten childcare; the core materials are the daily life schedule, morning and afternoon check records, and child health observation records. The schedule is updated weekly or monthly, with fields including time slot, activity name, person in charge, date, and signature; morning and afternoon check records are filled in daily, with fields including child's name, check time, body temperature, symptoms, handling method, and teacher's signature; health observation records are supplemented as needed, with fields including observation date, description of behavior, follow-up measures, and parent receipt. When these three types of materials enter the tool call node, the schedule provides the baseline for time slots and responsibility assignments, the morning and afternoon check records provide daily attendance and health status, and the health observation records provide the basis for exceptions and follow-up. The update rhythm is weekly or monthly for the schedule, daily for morning and afternoon checks, and event-driven for observation records. Field characteristics are multi-table crossover, clear date and signature requirements, and the same child's name, quantity, and date must remain consistent across two or more materials.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). The "progress table and statistical scope description" is then completed by a subsequent AI node or manual verification. The three items—tool description, parameter description, and whether required—determine whether the model initiates a call; the return after the call serves only as the basis for verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether fields, dates, and signatures match the morning and afternoon check records | Open the tool node description fields and verify time slot, activity name, person in charge, and date; run a trial with a question missing a required parameter to see whether it asks first; check the values of `toolChoice` and `functionCall` in the call record |
| Morning and afternoon check records | Whether the same child's name, quantity, and date are consistent across the two materials | Open each parameter configuration and verify the description and whether-required items; run a trial with a question missing that field to see whether it asks first rather than fabricating directly; verify the diamond connectors and node status |
| Child health observation records | Whether the version is synchronized and whether signatures or receipts are missing | Verify observation date, description of behavior, follow-up measures, and parent receipt; check whether the return result contains values that do not exist in the business materials; confirm the call records of `toolChoice` and `functionCall` |
| Statistical scope description | Whether the record count and statistical count match and whether the scope is written in the header | Use one week of records to verify the total and see whether the scope and exceptions are clearly stated; verify the tokens of the referenced text and record the number of array items separately |

## Three common errors

- Symptom: The same record's name, quantity, and date do not match between the schedule and the morning and afternoon check records. Cause: The two tables have different update rhythms—the schedule is updated weekly while morning and afternoon checks are updated daily—and no cross-check was performed.
- Symptom: The health observation record version is not synchronized, and the old version is still referenced. Cause: After the material was updated, it was not written back to the tool node, and old dates and old descriptions appeared in the call record.
- Symptom: Morning and afternoon check records are missing signatures or receipts. Cause: The parameters do not correspond to the business material fields, and the model did not ask first but directly called according to the description and returned.

## How to verify the setup

Acceptance of this feature: run a trial with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks first or calls according to the description; at the same time, verify the values of `toolChoice` and `functionCall`.

Business test: use one week of records to verify the total and see whether the scope and exceptions are clearly stated.

- Open the tool node description fields and check whether this description can be understood when taken out on its own, and verify the parameter description and whether-required items.
- On the canvas, verify the diamond connectors and node status, and confirm that the tool call node is connected to the target tool.
