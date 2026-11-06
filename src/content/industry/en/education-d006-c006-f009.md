---
title: Tool Calls and Plugins for Kindergarten Operations and Quality Self-Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c006-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Tool Calls | Progress
meta_description: Kindergarten Quality: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten Operations and Quality Self-Assessment: Track Progress and Check Statistics

## What this category's data looks like

This category's data covers self-assessment reports, issue lists, and rectification plans. Fields include the names, quantities, dates, and signatures of each item under kindergarten conditions, safety and hygiene, care and education, staff team, and internal management. Materials are updated weekly or monthly, and version numbers and receipts change with inspection checkpoints. When entering the tool call node, the self-assessment report serves as the source of item names and quantities, the issue list serves as the source of issue numbers and rectification deadlines, and the rectification plan serves as the source of responsible persons, completion dates, and signatures. The tool call node reads these fields as input parameters and returns call records for subsequent verification.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). The "progress table and statistical scope description" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Item names, quantities, dates, and signatures are complete, and correspond one by one with the issue list | Open the tool node introduction fields and check whether the purpose and return results are clearly stated; test-run with a question missing required parameters to see whether it asks a follow-up question |
| Issue list | Issue numbers and rectification deadlines are consistent with the item names in the self-assessment report | Check the parameter introduction and whether the two items are required, and confirm they correspond to the material fields; check whether the `functionCall` return contains values outside the materials |
| Rectification plan | Responsible persons, completion dates, and signature receipts are synchronized, and the version number is consistent with the weekly report | Check the diamond connectors and node status on the canvas, and confirm that the `toolChoice` and `functionCall` call records are traceable |
| Progress table and statistical scope description | The number of records matches the statistical count, the scope is written in the header, and exceptions are noted separately | Use one week of records to verify the total, and record the referenced text tokens and the number of array items separately |

## Three common errors

- Symptom: the names and quantities of the same record do not match between the self-assessment report and the issue list. Cause: the field sources in the two places are not unified, and the tool call return results are not written back for verification.
- Symptom: the rectification plan version is not synchronized, and the dates in the weekly and monthly reports are inconsistent. Cause: the tool call node does not re-read the materials according to the update rhythm.
- Symptom: the rectification plan lacks a signature or receipt, but the statistical total still includes it. Cause: the parameters are not marked as required, and the model fabricates values directly without asking a follow-up question.

## How to verify the setup

Feature acceptance: test-run with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; check whether `toolChoice` and `functionCall` show call records.

Business testing: use one week of records to verify the total, see whether the scope and exceptions are clearly stated, and check whether the number of records matches the statistical count.

- Open the parameter configurations one by one, check the introduction and whether the two items are required, and confirm they correspond to the business material fields.
- Check the diamond connectors and node status on the canvas, and confirm that the tool call node is connected to the target tool.
