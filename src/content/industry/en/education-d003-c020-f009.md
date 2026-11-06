---
title: Tool Calls and Plugins for Grade Entry and Credit Recognition: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c020-f009
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Tool Calls | Intake
meta_description: Grades and Credits: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Grade Entry and Credit Recognition: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the grade entry and credit recognition category. The materials come from grade sheets exported from the academic affairs system, deferred examination application forms, make-up examination schedules, and signed scanned copies returned by departments. The update cadence advances by semester batches, and make-up and deferred examination materials are often submitted in a concentrated way after grades are released. The field characteristics center on course name, credit count, exam date, and signature and receipt columns. The grade sheet is the primary basis for credit recognition, the deferred examination application form determines whether delayed entry is allowed, and the make-up examination schedule provides make-up exam time and venue information. When these three types of materials enter this feature, the grade sheet plays the role of the main record, while the deferred examination application form and the make-up examination schedule play supporting and constraining roles, jointly supporting the intake record and the generation of items to be completed.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "intake record and items to be completed" is then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Grade sheet | Whether the course name, credit count, exam date, and signature column are complete, and whether they align item by item with the deferred examination application form and the make-up examination schedule | Open the tool node introduction fields and confirm that the purpose and returned results can be understood independently; check the parameter introduction and whether it is required |
| Deferred examination application form | Whether the deferred examination course, application date, approval signature, and receipt are consistent with the grade sheet, and whether the version is synchronized | Run a trial with a question missing a required parameter, observe the values of `toolChoice` and `functionCall` in the call record, and confirm that it asks a follow-up question before answering |
| Make-up examination schedule | Whether the make-up examination course, make-up examination date, and venue match the grade sheet and deferred examination application form in quantity and date | Check the diamond-shaped interface connections and node status on the canvas, and confirm that the tool calling node is connected to the target tool |

## Three common errors

- Phenomenon: The name or quantity of the same course does not match across two materials. Cause: The grade sheet and deferred examination application form are entered separately, without field-level comparison.
- Phenomenon: The version of the make-up examination schedule is not synchronized, and the date conflicts with the grade sheet. Cause: Materials are returned in batches, and versions are not locked by batch.
- Phenomenon: Missing signatures or receipts still enter intake. Cause: Missing-item identification does not ask a follow-up question first, and the model directly gives an answer.

## How to verify the setup

Feature acceptance: Run a trial with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; check `toolChoice`, `functionCall`, and whether the parameter is required.

Business test: Submit a question missing key information and see whether it asks a follow-up question before answering.

- Open each parameter configuration one by one, check the introduction and whether it is required, and run a trial with a question missing that field to see whether it asks a follow-up question first instead of directly fabricating.
- Check the diamond-shaped connections and node status on the canvas, and confirm that the tool calling node is connected to the target tool, avoiding results interfering with each other after multiple tools are chained.
