---
title: Tool Calls and Plugins for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c024-f009
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Tool Calls | Intake
meta_description: Graduate Admissions: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on Q&A intake and missing-item follow-up in the graduate admissions re-examination and enrollment category. The core materials include three types: re-examination plans, candidate score sheets, and adjustment lists. Re-examination plans come from documents published by the admissions unit in the current year and are updated as batches change, containing process nodes, score weights, and signature fields; candidate score sheets are compiled from preliminary and re-examination scores, with fields including candidate number, subject scores, total score, and date; adjustment lists record adjustment applications, proposed admissions, and receipt status, with fields including name, original applying unit, adjustment major, and signature. When these three types of materials enter this feature, their roles differ: re-examination plans provide the rule basis and field scope, candidate score sheets provide person-by-person verification data, and adjustment lists provide clues for cross-table comparison. Materials are updated on a rolling basis by admissions batch, and version and signature status are the main field characteristics. The name, quantity, and date of the same record in different materials need to be aligned item by item.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). "Intake records and items to be completed" are then handled by subsequent AI nodes or manual verification. Based on the tool description, parameter description, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether the process nodes, score weights, and signature fields in the plan are aligned item by item with the candidate score sheet and adjustment list; whether the name, quantity, and date of the same record are consistent | Open the tool node description fields and check whether the description can be understood on its own; run a trial with a question missing a required field to see whether it asks a follow-up first; verify the diamond-shaped interface and target tool connections on the canvas |
| Candidate score sheet | Whether the candidate number, subject scores, total score, and date match the re-examination plan and adjustment list; whether the version is synchronized; whether missing signatures or receipts are identified | Open each parameter configuration one by one and check the parameter description and whether it is required; check whether the returned result contains values that do not exist in the materials; verify the call records of `toolChoice` and `functionCall` |
| Adjustment list | Whether the adjustment application, proposed admission, and receipt status are consistent with the re-examination plan and candidate score sheet; whether the name, original applying unit, adjustment major, and signature are complete | Run a trial with a question missing key information to see whether it asks a follow-up before answering; verify whether the results from multiple tools connected in series interfere with each other; check the diamond-shaped connections and node status |

## Three common errors

- Phenomenon: The name, quantity, and date of the same candidate do not match between the score sheet and the adjustment list. Cause: The versions of the two materials are not synchronized, the field definitions are not aligned, and there is no item-by-item comparison step.
- Phenomenon: The re-examination plan has been updated, but the score sheet still uses the old weights. Cause: The materials update at different paces, the versions are not synchronized, and the effective date and signature are not checked at intake.
- Phenomenon: The model does not call the tool and directly gives an answer. Cause: The tool description does not state when it should be used, or the required parameters have no suitable values in the context, and the model does not ask a follow-up.

## How to verify the setup

Feature acceptance: Run a trial with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up or calls according to the description; check `toolChoice`, `functionCall`, and the diamond-shaped connection status.

Business test: Ask a question missing key information, see whether it asks a follow-up before answering, and verify whether the answer has a material basis in the re-examination plan, candidate score sheet, and adjustment list.

- Open the tool node description fields, check whether the description can be understood when taken out on its own, and verify the parameter description and whether it is required.
- Verify the diamond-shaped interface and target tool connections on the canvas, run a trial with a question missing a field, and confirm that the returned result does not contain values that do not exist in the materials.
