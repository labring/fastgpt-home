---
title: Tool Calls and Plugins for Kindergarten Safety and Emergency Drills: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c005-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Tool Calls | Checks
meta_description: Kindergarten Safety: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten Safety and Emergency Drills: Compare Documents and Locate Differences

## What this category's data looks like

Kindergarten safety protection and emergency drill materials mainly consist of hazard ledgers, rectification notices, drill plans, sign-in sheets, access control and school bus inspection records, and responsible-person signature pages. Sources are daily campus inspections, special investigations, and drill archiving; hazards are updated weekly, drills per occurrence, and inspection items summarized monthly. Field characteristics center on hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, and responsible-person signatures. When entering this function, the ledger and plan serve as the comparison baseline, while sign-in sheets and inspection records serve as the objects to be verified. The tool call node determines whether to initiate a comparison based on the introduction and parameters, and returns the input parameters and return values for subsequent nodes or manual discrepancy localization.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return values in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. The model decides whether to call the tool this time based on the tool introduction, parameter introduction, and whether the parameters are required. When there are no required parameters, it may fabricate parameter values on its own; when there are required parameters but no suitable values in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard ledger and rectification notice | Whether the hazard item and rectification deadline are consistent, and whether it is closed-loop | Check the hazard description, deadline, and closed-loop status item by item; run a trial with a question missing the rectification deadline to see whether it asks a follow-up question first; check the input parameters and return values in the `functionCall` record |
| Drill plan and sign-in sheet | Whether the drill headcount and sign-in are consistent, and whether the record matches the plan | Compare the plan's headcount, time, and process with the sign-in list; when the sign-in field is missing, observe whether it asks a follow-up question; check the input parameters and return values in the `toolChoice` record |
| Access control and school bus inspection records | Whether inspection items are missing and whether responsible-person signatures are complete | Check the access control and school bus inspection items and signature fields item by item; when an inspection item is missing, observe whether it asks a follow-up question; check the input parameters and return values in the `functionCall` record |
| Responsible-person signature page | Whether the signatures correspond to the responsible persons in the ledger | Check the signature names, dates, and the responsible-person field in the ledger; when the signature date is missing, observe whether it asks a follow-up question; check the input parameters and return values in the `toolChoice` record |

## Three common errors

- Symptom: the hazard ledger has a record but the rectification deadline is empty, and the discrepancy list does not flag it. Cause: there are required parameters but no suitable values in the context, so the model answers directly without calling the tool.
- Symptom: the list marks the drill sign-in headcount as consistent with the plan despite a difference in the underlying counts. Cause: the tool return result contains values that do not exist in the materials, and it was not compared item by item with the plan.
- Symptom: missing access control and school bus inspection items are not discovered, and missing responsible-person signatures are not prompted. Cause: after multiple tools are chained, results cross over each other, and the inspection item and signature page fields are not verified separately.

## How to verify the setup

Acceptance of this function: run a trial with a question missing a required parameter, check the input parameters and return values in the call record, confirm whether it asks a follow-up question or calls according to the introduction, and check whether `toolChoice` and `functionCall` appear in the record.

Business test: use a real record to find a field inconsistent with the ledger, and confirm that the discrepancy list can locate the hazard item, drill headcount, or missing inspection item.

- Open the tool node introduction field and check whether the purpose, when to use it, and what result it returns can be understood on their own; then check the parameter introduction and whether each is required, one by one.
- On the canvas, check the diamond interface connections and node status, confirm that the tool call node is connected to the target tool, and run a trial with a question missing a field to observe whether it asks a follow-up question first.
