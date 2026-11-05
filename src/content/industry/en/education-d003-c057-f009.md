---
title: Tool Calls and Plugins for National Key Research and Development Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c057-f009
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Tool Calls | Intake
meta_description: National R&D Grants: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for National Key Research and Development Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

National Key R&D Program project application materials include three types: the project application form, the budget application form, and the cooperation agreement. Their sources are the application system and offline submitted electronic files, and their update cadence rolls with the application window. Fields are concentrated in names, quantities, dates, and signature receipts. The project application form carries the research objectives, task breakdown, and assessment indicators, and is the primary reference for missing-item identification; the budget application form carries funding categories, calculation bases, and matching commitments, and is used to check quantities and amount calibers; the cooperation agreement carries the division of labor among participating units, intellectual property, and signature pages, and is used to check whether dates and signature receipts are complete. When the three types of materials enter the Q&A acceptance and missing-item follow-up function, they serve respectively as the primary record, the numerical cross-reference, and the signing credential. The names, quantities, and dates of the same record across the three materials must be consistent, and versions must be synchronized. A missing signature or receipt triggers a follow-up question, and the acceptance record and the items to be completed thereby take shape.

## Configuration and implementation checks

This link is executed by the tool-calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). "The acceptance record and the items to be completed" are then completed by a subsequent AI node or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether names, quantities, dates, and signature receipts are consistent with the budget application form and the cooperation agreement | Compare the corresponding fields of the three materials item by item, mark entries whose names, quantities, and dates do not match, check whether signature pages and receipts are complete, and verify whether version numbers are synchronized |
| Budget application form | Whether funding categories, calculation bases, and matching commitments are consistent with the caliber of the project application form | Open the budget table and check category names and quantities line by line, cross-reference with the task breakdown in the project application form, and confirm there are no duplicate charges or omissions |
| Cooperation agreement | Whether the division of labor among participating units, intellectual property clauses, and signature pages are complete | Check the signing date, seal, and receipt, confirm that partner names are consistent with those listed in the project application form, and return for correction those whose versions are not synchronized |
| Tool-calling node | Whether the tool description, parameter descriptions, and whether required correspond to the business material fields | On the canvas, check the diamond connectors and node status, run a trial with a question missing a required field, and observe the inputs and returns of `toolChoice` and `functionCall` |

## Three common errors

- Symptom: the names, quantities, and dates of the same record do not match between the project application form and the budget application form. Cause: the two materials are filled in by different roles, no cross-check is performed, and they enter Q&A acceptance before versions are synchronized.
- Symptom: the cooperation agreement lacks a signature or receipt, yet acceptance continues. Cause: the signing credential is not listed as a required parameter, the model does not ask a follow-up, and it directly gives an answer based on the existing context.
- Symptom: values that do not exist in the business materials appear in the returned results. Cause: when there are no required parameters, the model fabricates parameter values on its own, and after multiple tools are chained, the results cross-contaminate each other.

## How to verify the setup

Acceptance of this function: run a trial with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up or calls according to the description; check whether `toolChoice` and `functionCall` are consistent with the actual call.

Business test: submit a question missing key information, see whether it asks a follow-up before answering, and whether the follow-up content points to fields that actually exist in the project application form, budget application form, or cooperation agreement.

- Open the description field in the tool node and check whether this description can be understood when taken out on its own, and whether it clearly states the purpose, when it should be used, and what result it returns.
- Open the parameter configurations one by one, check the two items of parameter description and whether required, and run a trial with a question missing that field to see whether it asks a follow-up first rather than directly fabricating.
