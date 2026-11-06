---
title: Tool Calls and Plugins for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c060-f009
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Tool Calls | Intake
meta_description: Research Progress: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information

## What this category's data looks like

Research project annual progress and acceptance materials include annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are updated at annual milestones, mid-term review materials are submitted according to the review cycle, and acceptance reports are finalized at project closure. Field characteristics center on project name, undertaking unit, start and end dates, funding amount, task indicators, signatures, and receipts. When an annual progress report enters Q&A intake, it provides the task completion status for the current year and the plan for the next stage; mid-term review materials provide phased results and adjustment explanations; acceptance reports provide final indicator achievement and conclusions. The three types of materials each play different roles in the intake process: annual progress reports are used to identify whether annual tasks are advancing on schedule, mid-term review materials are used to identify whether phased goals have deviated, and acceptance reports are used to identify whether closure indicators are closed. When materials enter the tool calling and plugin stage, the intake side first extracts question items, then compares them by field, asks follow-up questions for missing items, and answers only when there is material evidence.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). "Intake records and completed question items" are then completed by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Check whether the annual task name, start and end dates, and signature receipt are consistent with the mid-term review materials | Open the tool node description fields and confirm that the purpose, when it should be used, and what result it returns can be understood on their own; open each parameter configuration one by one and check the description and whether it is required |
| Mid-term review materials | Check whether the number of phased results, the adjustment explanation date, and the corresponding fields in the acceptance report match | Run a test with a question that is missing this field and see whether it asks a follow-up first instead of directly fabricating; check the diamond connectors and node status on the canvas |
| Acceptance report | Check whether the closure indicators, funding amount, and signature receipt are closed, and whether the version is synchronized | Check the input parameters and return of `toolChoice` and `functionCall` in the call record, and confirm there are no values that do not exist in the business materials |
| Tool calling node connections | Check whether the diamond interface is connected to the target tool and whether the node status is available | Check the diamond connectors and node status on the canvas, and confirm that after multiple tools are connected in series, the results do not cross over into each other |

## Three common errors

- Symptom: the same project name is written differently in the annual progress report and the mid-term review materials, and the quantities and dates do not match. Cause: the two material versions were not synchronized, and the intake did not compare them item by item by field.
- Symptom: the acceptance report lacks a signature or receipt but still enters Q&A intake and gives an answer. Cause: required parameters were not mapped to business material fields, and the model answered directly without asking a follow-up.
- Symptom: values that do not exist in the business materials appear in the returned results, and after multiple tools are connected in series, the results cross over into each other. Cause: when there are no required parameters, the model fabricates parameter values on its own, and the tool description and parameter descriptions are unclear.

## How to verify the setup

Acceptance of this feature: run a test with a question that is missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up or calls according to the description; check whether `toolChoice` and `functionCall` are used correctly, and whether the return contains values that do not exist in the materials.

Business test: ask a question that is missing key information and see whether it asks a follow-up before answering; the follow-up content should point to fields that actually exist in the annual progress report, mid-term review materials, or acceptance report.

- Open the tool node description fields and confirm that the purpose, when it should be used, and what result it returns can be understood on their own; open each parameter configuration one by one and check the description and whether it is required.
- Run a test with a question that is missing required parameters and check the input parameters and return in the call record; check the diamond connectors and node status on the canvas, and confirm there are no fabricated parameters or cross-over results.
