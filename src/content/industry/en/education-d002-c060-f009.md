---
title: Tool Calls and Plugins for Research Project Annual Progress and Acceptance: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c060-f009
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Tool Calls | Checks
meta_description: Research Progress: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Research Project Annual Progress and Acceptance: Compare Documents and Locate Differences

## What this category's data looks like

This category's data covers three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted at annual milestones and record phased results and budget execution; mid-term review materials are consolidated when the project is halfway through and include indicator completion status and expert opinions; acceptance reports are submitted at project closure and cover all tasks and signature pages. Fields across the three types of materials include project name, undertaking unit, principal investigator, start and end dates, funding amount, number of results, signatures, and receipts. When the materials enter the tool call node, the annual progress report serves as the current-period baseline, the mid-term review materials serve as the process comparison, and the acceptance report serves as the final summary; the three are linked by the same project number and used for item-by-item comparison of names, quantities, dates, and signatures.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). Based on the tool description, parameter descriptions, and whether parameters are required, the model judges whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call. The "discrepancy list" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Compare item by item with the mid-term review materials and acceptance report for names, quantities, dates, signatures, and receipts | Open the tool node description field and confirm the purpose, when it should be used, and that the returned result can be understood on its own; check the two items of parameter descriptions and whether they are required |
| Mid-term review materials | Compare with the annual progress report and acceptance report to see whether the fields of the same record are consistent, and check version synchronization | Check the diamond connectors and tool node status on the canvas; run a trial with a question missing a required field and observe whether it asks a follow-up question first |
| Acceptance report | Check whether the final names, quantities, dates, and signature pages are consistent with the process materials | Open each parameter configuration one by one and check the description and whether it is required; check whether the returned result contains values that do not exist in the materials |
| Tool call node connectors | The diamond interface is connected to the target tool, and the node status is consistent with the canvas | Check the diamond connectors and node status on the canvas, and confirm that after multiple tools are chained, the results do not get mixed up with each other |

## Three common errors

- Symptom: the names, quantities, and dates of the same record do not match between the annual progress report and the acceptance report. Cause: the two materials were entered separately, and no field-level comparison was made by the same project number.
- Symptom: the mid-term review materials and the acceptance report are not synchronized in version, and old-version data is treated as the current value. Cause: after the materials were updated, the associated fields were not written back, and the tool call read a historical version.
- Symptom: the acceptance report lacks a signature or receipt but is still treated as complete material. Cause: signatures and receipts were not set as required parameters, and the model called according to the description without asking a follow-up question.

## How to verify the setup

Acceptance of this feature: run a trial with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; check the values of `toolChoice` and `functionCall` in the call record, and verify whether `toolChoice` and `functionCall` are consistent with the three items of tool description, parameter descriptions, and whether required.

Business test: use one real record to find fields inconsistent with the ledger, check the name, quantity, date, and signature of that record in the annual progress report, mid-term review materials, and acceptance report, record the discrepancy list, and hand it to the reviewer to confirm the write-back.

- Open the tool node description field, check whether this description can be understood when taken out on its own, and verify the two items of each parameter's description and whether it is required.
- Run a trial with a question missing that field to see whether it asks a follow-up question first rather than fabricating directly; check the diamond connectors and node status on the canvas.
