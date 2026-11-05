---
title: Tool Calls and Plugins for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c063-f009
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Tool Calls | Intake
meta_description: Research Misconduct: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses Q&A acceptance and missing-item follow-up questions in the investigation and handling of academic misconduct reports. The materials come from three types of sources: report materials, investigation reports, and expert appraisal opinions. They enter item by item according to acceptance nodes, and the update cadence advances with the rounds of supplementation and appraisal. Field characteristics center on record names, quantities, dates and signatures, and receipts. The same record often has mismatched names, quantities, and dates across different materials, versions are not synchronized, and signatures or receipts are missing. The three types of materials play different roles when entering this function: report materials provide the acceptance entry point and the original question items, investigation reports provide the handling process and conclusion fields, and expert appraisal opinions provide professional judgments and signing information. Based on this, the tool calling node determines whether to call retrieval or comparison tools, returns the input parameters and return results, and provides them for subsequent nodes or manual verification to complete the missing question items.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool calling result (the input parameters and return in the call record). "Acceptance records and completed question items" are then completed by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the name, quantity, date and signature, and receipt are consistent with the investigation report | Open the tool node description field, check whether the description can be understood on its own, then run a test with a question missing a required field to see whether it asks a follow-up question first |
| Investigation report | Whether the name, quantity, and date of the same record match across the two materials, and whether the versions are synchronized | Open each parameter configuration one by one, check the two items of parameter description and whether it is required, and verify the diamond-shaped connections and node status on the canvas |
| Expert appraisal opinions | Whether the signature or receipt is complete, and whether the date connects with the acceptance record | Run a test with a question missing that field, check the input parameters and return in the call record, and confirm whether the model calls according to the description; when multiple tools are involved, check whether the results are cross-wired |
| Tool calling node | Whether the model decides to call based on the tool description, parameter descriptions, and whether it is required | On the canvas, verify that the diamond-shaped interface is connected to the target tool, and check the `toolChoice`, `functionCall` related configurations and the call record |

## Three common errors

- Symptom: The model does not call the tool and directly gives an answer. Cause: The tool description does not state when it should be used, or a required parameter cannot find a suitable value in the context, so the model chooses not to call.
- Symptom: Values that do not exist in the business materials appear in the return result. Cause: The parameter is not marked as required, the model fabricates the parameter value on its own, and the parameter description does not limit the source of the value.
- Symptom: The name, quantity, and date of the same record do not match across the two materials. Cause: Versions are not synchronized, signatures or receipts are missing, and after multiple tools are chained, the results are cross-wired with each other.

## How to verify the setup

This function's acceptance: run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; check whether `toolChoice` and `functionCall` participate in the judgment.

Business test: ask a question missing key information and see whether it asks a follow-up question first before answering.

- Open the tool node description field, check whether this description can be understood when taken out on its own, and confirm when it should be used and what result it returns.
- Open each parameter configuration one by one, check the two items of parameter description and whether it is required, and run a test with a question missing that field to see whether it asks a follow-up question first rather than directly fabricating.
