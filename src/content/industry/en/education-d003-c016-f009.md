---
title: Tool Calls and Plugins for School Safety Inspections and Incident Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c016-f009
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Tool Calls | Intake
meta_description: Campus Safety: review tool calls for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Safety Inspections and Incident Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the category of school safety hazard inspections and campus incident reporting. The materials come from three types: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are updated weekly or monthly and contain inspection items, locations, dates, inspectors, and signature fields; hazard rectification ledgers are updated on a rolling basis as rectification progresses and contain hazard names, quantities, rectification deadlines, responsible persons, and receipts; emergency incident reports are submitted on a per-incident basis after an incident occurs and contain incident names, occurrence dates, numbers of people involved, reporters, and signatures. When these three types of materials enter the question-answering intake and missing-item follow-up function, each plays a different role: safety inspection checklists are used to identify whether inspection items have been left blank, hazard rectification ledgers are used to verify rectification status and deadlines, and emergency incident reports are used to confirm whether incident elements and signature receipts are complete. The names, quantities, and dates of the same record often fail to match across the three materials, versions are not synchronized, or signatures and receipts are missing, so missing items must first be identified during intake and then followed up on.

## Configuration and implementation checks

This step is executed by the tool-calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). "Intake records and items to be completed" are then handled by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable values in the context, it may not call the tool.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether inspection items, locations, dates, and signature fields are complete, and whether the name and quantity of the same record are consistent with those in the ledger | Open the tool node description field and verify the two items: parameter descriptions and whether required; run a test with a question missing the signature field to see whether it follows up first before answering, and check the inputs of `functionCall` in the call record |
| Hazard rectification ledger | Whether the hazard name, quantity, rectification deadline, and responsible person match those in the safety inspection checklist, and whether versions are synchronized | Verify the diamond-shaped interface connections and node status on the canvas; run a test with a question missing the rectification deadline to confirm whether the model calls according to the description, and check the return of `toolChoice` |
| Emergency incident report | Whether the incident name, occurrence date, number of people involved, reporter's signature, and receipt are complete, and whether the dates in the three materials are consistent | Open the parameter configuration one by one and verify the two items: description and whether required; run a test with a question missing the number of people involved to see whether values that do not exist in the materials appear in the returned result, and record the inputs and returns of `functionCall` |

## Three common errors

- Symptom: The name and quantity of the same hazard do not match between the safety inspection checklist and the rectification ledger. Cause: The two materials are entered separately, no field-level comparison is performed, and missing items are not identified.
- Symptom: The date of the emergency incident report is inconsistent with the rectification deadline in the ledger, and versions are not synchronized. Cause: The materials are updated at different paces, and date fields are not verified during intake.
- Symptom: A report missing a signature or receipt is still accepted as a complete record. Cause: The signature field and receipt are not verified during the follow-up step, and the model directly gives an answer.

## How to verify the setup

Acceptance of this function: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it follows up or calls according to the description; check whether `toolChoice` and `functionCall` appear and whether the parameters correspond to the material fields.

Business test: ask a question missing key information and see whether it follows up first before answering.

- Open the tool node description field, check whether this description can be understood when read on its own, and verify the two items: parameter descriptions and whether required.
- Verify the diamond-shaped connections and node status on the canvas, run a test with a question missing a field, and confirm that the model follows up first rather than directly fabricating.
