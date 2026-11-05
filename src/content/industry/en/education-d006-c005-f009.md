---
title: Tool Calls and Plugins for Kindergarten Safety and Emergency Drills: Track Progress and Check Statistics
slug: /en/industry/education-d006-c005-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Tool Calls | Progress
meta_description: Kindergarten Safety: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten Safety and Emergency Drills: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of progress records and statistical verification for kindergarten safety protection and emergency drills. Materials come from daily inspection sheets, drill plans and sign-in sheets, access control and school bus inspection records, hazard rectification orders, and responsible person signature pages. The category is explicitly kindergarten safety protection and emergency drills. The update cadence is weekly aggregation and monthly review. Field characteristics include hazard items and rectification deadlines, drill participant counts and sign-ins, access control and school bus inspection items, and responsible person signatures. When these materials enter the Tool Calling and Plugins feature, each plays a different role: inspection and check records serve as input sources, drill plans and sign-in sheets are used to verify participant counts and procedures, hazard rectification orders are used to determine closed-loop status, and signature pages are used to confirm responsibility attribution. The tool calling node decides whether to initiate a call based on the tool description and parameter description. The returned results are used by subsequent nodes or by humans to compile the progress table and statistical scope explanation, and ultimately enter the weekly or monthly report.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). The "progress table and statistical scope explanation" is then completed by subsequent AI nodes or manual verification. The model judges whether to call based on the tool description, parameter description, and whether parameters are required. When there are no required parameters, it may fabricate parameter values on its own. When there are required parameters but no suitable values in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard rectification order | Whether the hazard item and rectification deadline form a closed loop, and whether the responsible person's signature is complete | Open the tool node description field and check whether the purpose and returned results are stated; run a test with a question missing the rectification deadline to see whether it asks a follow-up question first; check the inputs of `toolChoice` and `functionCall` in the call record |
| Drill plan and sign-in sheet | Whether the drill participant count and sign-ins are consistent, and whether the drill record matches the plan | Open each parameter configuration and check the descriptions of the participant count and sign-in fields and whether they are required; check the diamond-shaped interface connections and node status on the canvas; confirm that the returned results do not contain values that do not exist in the business materials |
| Access control and school bus inspection records | Whether inspection items are missing, and whether access control and school bus inspection items correspond one by one | Run a test with a question missing an inspection item field to see whether it asks a follow-up question first; check the call records of `toolChoice` and `functionCall`; check whether results from multiple tools chained together cross-contaminate each other |
| Progress table and statistical scope explanation | Whether the record count and statistical count match, and whether the scope is written in the header | Check the inputs and returns in the call record to confirm that the statistical scope and exceptions are clearly stated; check the tokens of the quoted text, and record the array length separately; confirm that `quoteMaxToken` is only used as the quoted content budget |

## Three common errors

- Symptom: The hazard rectification order shows as registered, but it is still counted as not closed-loop during statistics. Cause: The rectification deadline field returned by the tool call is missing, and the model did not ask a follow-up question but directly called according to the description, making the closed-loop status impossible to verify.
- Symptom: The participant count in the drill record is inconsistent with the participant count in the sign-in sheet, and the statistical total does not match. Cause: The parameter description did not state the source of the participant count value, the model fabricated parameter values on its own, and the returned results did not match the plan.
- Symptom: Access control and school bus inspection items are missing from the progress table, and the weekly report total is missing items. Cause: The inspection item field was not marked as required, and when there was no suitable value in the context, the model did not call the tool and directly gave an answer.

## How to verify the setup

Acceptance of this feature: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; check the behavior of `toolChoice` and `functionCall` in the call record, and confirm that no values that do not exist in the business materials are fabricated.

Business test: use one week of records to verify the total and see whether the scope and exceptions are clearly stated; verify whether the four categories of fields—hazard items and rectification deadlines, drill participant counts and sign-ins, access control and school bus inspection items, and responsible person signatures—correspond one by one, and whether the record count and statistical count match.

- Open the tool node description field and check whether this description can be understood when taken out on its own, stating the purpose, when it should be used, and what results it returns.
- Open each parameter configuration one by one, check the description and whether it is required, and run a test with a question missing that field to see whether it asks a follow-up question first instead of directly fabricating.
