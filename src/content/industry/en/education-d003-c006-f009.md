---
title: Tool Calls and Plugins for Kindergarten Operations and Quality Self-Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c006-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Tool Calls | Intake
meta_description: Kindergarten Quality: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten Operations and Quality Self-Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the kindergarten operation behavior and quality self-assessment scenario, and the materials include three categories: self-assessment reports, issue lists, and rectification plans. Self-assessment reports are updated by semester or academic year, and their fields include kindergarten name, assessment date, indicator scores, signature, and seal; issue lists are generated per instance, and their fields include issue description, responsible department, rectification deadline, and receipt; rectification plans are revised per batch, and their fields include measures, completion date, and handler's signature. When the three material categories enter this feature, the self-assessment report serves as the primary basis, the issue list is used for cross-checking, and the rectification plan is used to confirm progress. During question-answering intake, the tool calling node first determines whether key fields are missing from the materials, such as date, signature, or quantity, and then decides whether to follow up. When material versions are not synchronized or the same record name is inconsistent, this must be marked in the intake record and forwarded to the handler.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). "Intake records and completed follow-up questions" are then completed by subsequent AI nodes or manual verification. Based on the tool description, parameter description, and whether it is required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Fields and signature: whether kindergarten name, assessment date, indicator scores, and signature/seal are complete, and whether the date is consistent with the issue list | Open the tool node description field and check whether the description can independently explain the purpose and return result; run a test with a question missing the date to see whether it follows up first |
| Issue list | Fields and receipt: whether issue description, responsible department, rectification deadline, and receipt signature are complete, and whether the same record name and quantity match across the self-assessment report and rectification plan | Open each parameter configuration and check the parameter description and whether it is required; check the values of `toolChoice` and `functionCall` in the call record |
| Rectification plan | Fields and date: whether measures, completion date, and handler's signature are complete, and whether the version is synchronized with the issue list | Check the diamond interface connections and tool calling node status on the canvas; confirm that the tool calling node is connected to the target tool |
| Tool calling node connections | The diamond interface is connected to the target tool, and the node status is normal | Check the diamond connections and node status on the canvas; run a test with a question missing required parameters and check the input parameters and return in the call record |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the self-assessment report and the issue list. Cause: The two materials were filled in by different personnel at different times without cross-checking.
- Symptom: The rectification plan version is not synchronized; the issue list has been updated but the plan is still the old version. Cause: After the version update, re-intake was not triggered, and the tool calling node did not identify the difference.
- Symptom: The self-assessment report or issue list is still accepted as complete material even though signatures or receipts are missing. Cause: Whether it is required does not correspond to fields that actually exist in the business materials, and the model did not follow up.

## How to verify the setup

This feature's acceptance: run a test with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it follows up or calls according to the description; check the values of `toolChoice` and `functionCall` in the call record.

Business test: submit a question missing key information and see whether it follows up before answering.

- Open the tool node description field and check whether this description can be understood on its own; open each parameter configuration and check the description and whether it is required.
- Run a test with a question missing that field to see whether it follows up first rather than fabricating directly; check the diamond connections and node status on the canvas.
