---
title: Tool Calls and Plugins for Vocational College Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c029-f009
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Tool Calls | Checks
meta_description: Vocational Curricula: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Vocational College Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

The formulation of talent cultivation plans in vocational colleges involves three types of materials: talent cultivation plans, curriculum standards, and job competency analysis tables. Talent cultivation plans are drafted under the leadership of the academic affairs department, curriculum standards are written by professional teaching and research offices, and job competency analysis tables come from surveys of cooperating enterprises. Talent cultivation plans are revised once per academic year, curriculum standards are updated as courses are adjusted, and job competency analysis tables are supplemented on a rolling basis as job clusters change. When the three materials enter the material verification and discrepancy localization function, the talent cultivation plan serves as the baseline document, while the curriculum standards and job competency analysis tables serve as comparison documents, each carrying name, quantity, date, and signature fields, used to locate field discrepancies for the same object across the two materials.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The discrepancy list is then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation plan | Name, quantity, date, and signature are consistent between the plan and the ledger | Verify the date on the plan cover and the approval signature, and compare the number of courses with the ledger record |
| Curriculum standard | The same course name, credit hour quantity, and formulation date are consistent across the two materials | Verify the curriculum standard name and the plan course table course by course, and check the formulator and review signature |
| Job competency analysis table | Job title, number of competency items, survey date, and receipt signature are consistent | Verify the job list in the analysis table against the cultivation objectives in the plan, and check the enterprise receipt signature |
| Tool calling node | The input parameters and return can locate specific material fields | Verify the diamond connectors and node status on the canvas, and view the `toolChoice` and `functionCall` in the call record |

## Three common errors

- Symptom: The same course has mismatched names or credit hour quantities in the two materials. Cause: After the curriculum standard was revised, it was not synchronized back to the talent cultivation plan, so the versions were not synchronized.
- Symptom: The job competency analysis table lacks an enterprise receipt signature, but it is already cited in the plan. Cause: The signature step was not completed before entering comparison, so the material flow order was misaligned.
- Symptom: The call record returns a date or quantity that does not exist in the materials. Cause: The model fabricated values based on the tool description and parameter description, and the context had no suitable parameters.

## How to verify the setup

Acceptance for this function: run a trial with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; check whether `toolChoice` and `functionCall` are triggered according to the parameter description and whether they must be triggered.

Business test: use a real record to find a field inconsistent with the ledger, for example, the credit hours of a certain curriculum standard do not match the quantity in the talent cultivation plan course table, and record the discrepancy field and the sources in the two materials.

- Open the description field in the tool node, verify whether the purpose, when to use it, and the returned result can be understood independently, and check the two items: parameter description and whether it is required.
- Run a trial with a question missing that field, and see whether the node asks a follow-up question first instead of directly fabricating; verify the diamond connectors and node status on the canvas.
