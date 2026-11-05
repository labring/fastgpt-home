---
title: Tool Calls and Plugins for Exam Organization and Misconduct Handling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c039-f009
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Tool Calls | Progress
meta_description: Exam Administration: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Exam Organization and Misconduct Handling: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on the exam organization and violation handling category, with materials drawn from three types: exam administration manuals, examination room record sheets, and violation fact records. The exam administration manual provides the baseline wording for process nodes and statistical criteria; the examination room record sheet registers statuses such as absence, lateness, and abnormal behavior item by item per session and requires invigilator signature; the violation fact record separately records the facts, date, and receipt. The three types of materials update at different rhythms: the manual is reissued with institutional revisions, the record sheet is filled in on the same day for each session, and violation records follow the process for supplementary signatures by event. When entering the tool call stage, the manual serves as the criteria reference, while the record sheet and violation records serve as the original entries to be verified, used to compare whether the name, quantity, and date of the same record are consistent, and whether signatures and receipts are complete.

## Configuration and implementation checks

This stage is executed by the tool call node in the workflow (the model decides whether to call, the node executes), outputting the tool call result (the input parameters and return in the call record). The "progress table and statistical criteria description" is then completed by subsequent AI nodes or manual verification. Based on the tool introduction, parameter introduction, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Check whether the fields, dates, and signature requirements correspond to the registration items in the record sheet and violation records, and whether the criteria are written in the header | Open the tool node introduction fields, confirm the purpose, when it should be used, and that the returned result can be understood independently; verify the diamond connectors and node status on the canvas |
| Examination room record sheet | Whether the name, quantity, and date of the same record match between the record sheet and the manual, and whether the versions are synchronized | Run a test with a question missing a required field to see whether it asks a follow-up question first; verify the input parameters of `toolChoice` and `functionCall` in the call record |
| Violation fact record | Whether the facts, date, signature, and receipt are complete, and whether they correspond one-to-one with the record sheet entries | Open each parameter configuration one by one, verify the introduction and whether it is required; check whether values that do not exist in the materials appear in the returned result |
| Progress table and statistical criteria description | Whether the recorded numbers and statistical numbers match, and whether exceptional situations are stated in the header criteria | Use one week of records to verify the totals, compare the input parameters and returns in the call record, and confirm whether the criteria and exceptions are clearly stated |

## Three common errors

- Phenomenon: The name and date of the same violation record do not match between the record sheet and the fact record. Cause: The two materials are registered separately, not backfilled according to the same criteria, and the versions are not synchronized.
- Phenomenon: Values that do not exist in the materials appear in the call return, and the statistical numbers are too high. Cause: When there are no required parameters, the model fabricates parameter values on its own without asking a follow-up question first.
- Phenomenon: The record sheet lacks a signature or the violation receipt is not attached, yet the progress table still shows it as registered. Cause: The tool call is treated as scheduled execution, and the completeness of the materials is not checked back.

## How to verify the setup

Acceptance of this feature: Run a test with a question missing required parameters, check the input parameters and returns in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, verify whether `toolChoice` and `functionCall` appear in the call record.

Business test: Use one week of records to verify the totals, and see whether the criteria and exceptions are clearly stated.

- Open each parameter configuration one by one, verify the introduction and whether it is required, and confirm that the required items correspond to fields that actually exist in the exam materials.
- Verify the diamond connectors and node status on the canvas, and confirm that the tool call node is connected to the target tool.
