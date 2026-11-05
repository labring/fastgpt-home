---
title: Tool Calls and Plugins for School Safety Inspections and Incident Reporting: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c016-f009
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Tool Calls | Checks
meta_description: Campus Safety: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Safety Inspections and Incident Reporting: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenarios of school safety hazard inspections and campus incident reporting. Materials include three categories: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are filled in weekly or monthly by duty-week teachers and security personnel, with fields including inspection point, hazard description, inspection date, and inspector signature; hazard rectification ledgers are updated on a rolling basis by entry, with fields including hazard name, rectification quantity, rectification deadline, responsible person, and receipt; emergency incident reports are submitted immediately upon the occurrence of an incident, with fields including incident name, number of people involved, date of occurrence, reporter, and receiving signature. After these three categories of materials enter tool calling and plugins, each assumes a different role: safety inspection checklists provide the original discovery records, hazard rectification ledgers provide the basis for handling and closure, and emergency incident reports provide immediate reporting and receipt evidence. During verification, the name, quantity, and date of the same object in two materials must be aligned item by item, and it is necessary to check whether the versions are synchronized and whether signatures or receipts are missing.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. The model judges whether to call the tool this time based on the tool description, parameter descriptions, and whether parameters are required. When there are no required parameters, the model may fabricate parameter values on its own; when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether the inspection point, hazard description, inspection date, and inspector signature are consistent with the corresponding records in the ledger | Open the tool node description field and check whether the description can be understood on its own; run a test with a question missing the inspection date field to see whether it asks a follow-up question first |
| Hazard rectification ledger | Whether the hazard name, rectification quantity, rectification deadline, responsible person, and receipt are aligned with the checklist and incident report | Open each parameter configuration one by one and check the two items of parameter description and whether it is required; check the diamond connectors and node status on the canvas to confirm the calling path of `toolChoice` and `functionCall` |
| Emergency incident report | Whether the incident name, number of people involved, date of occurrence, reporter, and receiving signature are synchronized with the ledger version | Run a test with one real record, check the input parameters and return in the call record, and confirm that the returned result does not contain values that do not exist in the materials |
| Tool calling node | Whether the model decides to call based on the tool description and required parameters, rather than directly giving an answer | Check the diamond interface connectors and node status on the canvas, and check whether the results of multiple tools connected in series interfere with each other |

## Three common errors

- Symptom: The name, quantity, or date of the same hazard does not match between the checklist and the ledger. Cause: The two materials are filled in by different personnel at different times, the field definitions are not unified, and item-by-item comparison is not performed during tool calling.
- Symptom: The rectification ledger has been updated, but the emergency incident report still references the old version, and the signature or receipt is missing. Cause: The versions are not synchronized, there is no receipt confirmation in the material circulation step, and values that do not exist in the materials appear in the tool return result.
- Symptom: The model does not call the tool and directly gives an answer. Cause: The tool description or parameter descriptions are written vaguely, there is no suitable value for the required parameters in the context, and the model chooses not to call and answers on its own.

## How to verify the setup

Acceptance of this feature: run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, check the actual values of `toolChoice` and `functionCall` in the call record, and confirm that the node executes and the model does not directly answer.

Business test: use one real record to find fields inconsistent with the ledger, compare the three materials—safety inspection checklist, hazard rectification ledger, and emergency incident report—side by side, locate discrepancies in name, quantity, date, or signature/receipt, form a discrepancy list, submit it to the reviewer for confirmation, and write it back.

- Open the tool node description field, check whether this description can be understood when taken out on its own, and confirm that it clearly states the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one and check the two items of parameter description and whether it is required; run a test with a question missing that field to see whether it asks a follow-up question first instead of directly fabricating.
