---
title: Tool Calls and Plugins for Kindergarten Safety and Emergency Drills: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c005-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Tool Calls | Intake
meta_description: Kindergarten Safety: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten Safety and Emergency Drills: Handle Questions and Collect Missing Information

## What this category's data looks like

The material on this page comes from daily intake scenarios for kindergarten safety protection and emergency drills, and includes four types of fields: hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus check items, and responsible person signature. These materials enter through Q&A intake and missing-item follow-up, and after entering the workflow are retrieved as needed by the tool call node: hazard items and rectification deadlines are used to determine closed-loop status, drill headcount and sign-in are used to check whether the plan and records are consistent, access control and school bus check items are used to identify omissions, and responsible person signature is used to confirm responsibility attribution. The update cadence follows the kindergarten's inspection and drill arrangements, and each intake forms one record of items awaiting follow-up questions; the field characteristics are that some questions only carry the kindergarten name and problem description, lacking specific check items or a time range. When the material enters this feature, hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus check items, and responsible person signature each serve as a basis for verification, and do not directly generate a ledger.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). "Intake records and completed follow-up questions" are then completed by subsequent AI nodes or manual verification. Based on the tool description, parameter description, and whether parameters are required, the model decides whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard items and rectification deadlines | Whether the hazard is closed-loop and whether the rectification deadline falls within the range given in the material | Open the tool node description field and check whether hazard items and rectification deadlines are required parameters; test-run with a question missing the deadline to see whether it asks a follow-up question first; check whether the value of `toolChoice` in the call record is consistent with the description |
| Drill headcount and sign-in | Whether the drill record matches the plan and whether the sign-in headcount corresponds to the plan headcount | Open the parameter configuration one by one and check the descriptions and whether the headcount and sign-in items are required; test-run with a question missing the sign-in field to see whether the returned result contains values that do not exist in the material; check whether the input parameters of `functionCall` take only material fields |
| Access control and school bus check items | Whether check items are omitted and whether access control and school bus check items are covered one by one | On the canvas, check the diamond connectors and node status, and confirm that the tool call node is connected to the target tool; test-run with a question missing check items to see whether it asks a follow-up question before answering; check whether the returned result contains check items that do not exist in the material |
| Responsible person signature | Whether the responsible person signature corresponds to the responsibility attribution in the material | Check whether responsible person signature is marked as required in the parameter description; test-run with a question missing the signature field to see whether the model calls according to the description rather than fabricating directly; record the input parameters and return in the call record, and confirm both the follow-up question path and the call path |

## Three common errors

- Symptom: the hazard item is not closed-loop, yet an answer directly states that rectification is complete. Cause: the model did not call the tool and answered directly based on the context, without checking the rectification deadline and closed-loop status.
- Symptom: the drill record does not match the plan, and the headcount and sign-in do not correspond. Cause: the parameter description did not specify the value source, and the model fabricated the headcount or sign-in value on its own, so the returned result contained values that do not exist in the material.
- Symptom: access control and school bus check items are omitted, and the intake record lacks follow-up questions. Cause: after multiple tools were chained, the results crossed over into each other, the check item field was not recognized as required, and the model answered directly without asking a follow-up question.

## How to verify the setup

Acceptance for this feature: test-run with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; check whether `toolChoice` and `functionCall` appear in the call record, and whether the returned result contains only material fields.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering; if it answers directly, check whether the tool description and whether parameters are required are both clearly written.

- Open the description field in the tool node and check whether this description can be understood when read on its own, and whether it clearly states the purpose, when it should be used, and what result it returns.
- Open the parameter configuration one by one, check the description and whether it is required, and test-run with a question missing that field to see whether it asks a follow-up question first rather than fabricating directly.
