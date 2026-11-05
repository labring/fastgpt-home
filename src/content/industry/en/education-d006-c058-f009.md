---
title: Tool Calls and Plugins for Research Project Task Agreement Signing: Track Progress and Check Statistics
slug: /en/industry/education-d006-c058-f009
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Tool Calls | Progress
meta_description: Research Agreements: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Research Project Task Agreement Signing: Track Progress and Check Statistics

## What this category's data looks like

In the signing stage of scientific research project task books, materials usually include three types: the project task book, the subject task breakdown table, and the budget book. The task book is drafted by the project lead party and confirmed by the collaborating parties; the breakdown table is filled in by the subject leader according to task milestones; the budget book is approved by the finance or scientific research management department. When the three types of materials enter the tool call node, their roles differ: the task book and breakdown table are used to extract the subject name, undertaking unit, start and end dates, and signature fields; the budget book is used to extract budget subjects, amounts, and approval opinions. In terms of update rhythm, the task book iterates with the signed version, the breakdown table is filled in weekly or monthly, and the budget book is synchronized when the budget is adjusted. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts; the same record often has wording differences across the three materials.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). The "progress table and statistical scope description" is then completed by subsequent AI nodes or manual verification. The model judges whether to call based on the tool introduction, parameter introduction, and whether parameters are required. When there are no required parameters, it may fabricate parameter values on its own; when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Check the project name, subject name, undertaking unit, start and end dates, and signature fields, and determine whether they are consistent with the breakdown table and budget book | Open the tool node introduction field and check whether the description can be understood independently; run a trial with a question missing required parameters, and check the input parameters and return in the `functionCall` record |
| Subject task breakdown table | Check the subject number, task milestones, quantities, dates, and responsible person's signature, and determine whether they match the task book and budget book | Open the parameter configuration one by one, and check the parameter introduction and whether it is required; check the diamond connectors and node status on the canvas, and confirm that `toolChoice` takes effect |
| Budget book | Check the budget subjects, amounts, approval opinions, and dates, and determine whether they are consistent with the task book and breakdown table in names and quantities | Run a trial with a question missing that field, and see whether it asks a follow-up question first rather than directly fabricating; check whether the returned result contains values that do not exist in the business materials |
| Tool call node connectors | The diamond interface is already connected to the target tool; determine whether the node status and connectors are complete | Check the diamond connectors and node status on the canvas, and confirm the call path of `toolChoice` and `functionCall` |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the task book and the breakdown table. Cause: The two materials are filled in by different roles, the versions are not synchronized, and only one of them is retrieved during the tool call.
- Phenomenon: The date in the budget book is inconsistent with the start and end dates in the task book. Cause: After budget adjustment, the task book was not written back, and values that do not exist in the business materials appear in the tool call return result.
- Phenomenon: Signatures or receipts are missing, and the progress table totals do not match the statistical figures. Cause: Parameters are marked as required, but this does not guarantee that the model will ask a follow-up question; prompt guidance is needed, and a tool call is not equal to scheduled execution.

## How to verify the setup

Acceptance of this feature: run a trial with a question missing required parameters, check the input parameters and return in the call record, confirm whether it asks a follow-up question or calls according to the introduction, and check whether `toolChoice`, `functionCall`, and the three items of tool introduction, parameter introduction, and whether required correspond.

Business test: use one week of records to check the totals, and see whether the scope and exceptions are clearly written; the number of quotes is the array length, and `quoteMaxToken` is the quote content budget. Do not compare the two as equal. If the quote upper limit is involved, check the tokens of the quoted text, and record the array count separately.

- Open the tool node introduction field, check whether the description can be understood when taken out alone, and confirm that the diamond interface is already connected to the target tool.
- Open the parameter configuration one by one, check the introduction and whether it is required, and run a trial with a question missing that field to see whether it asks a follow-up question first.
