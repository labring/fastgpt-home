---
title: Tool Calls and Plugins for Kindergarten Healthcare and Meal Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c003-f009
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Tool Calls | Intake
meta_description: Child Health and Meals: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten Healthcare and Meal Management: Handle Questions and Collect Missing Information

## What this category's data looks like

This page's material comes from the daily operations of kindergarten health care and meal management: morning checks and absence registration, quantified recipes, procurement and acceptance documents, sample retention records, disinfection records, and cause-tracking forms. These materials are updated daily or weekly, and their fields include ingredient names and specifications, sample retention time and batch, disinfection time period, and absence cause classification. When entering the question acceptance and missing-item follow-up function, recipes and procurement documents are used to check whether the categories are consistent, sample retention records are used to check the batch and time, disinfection records are used to check whether the time periods are complete, and absence cause classification is used to determine whether follow-up questions are needed. Each material plays a different role in the acceptance process: some serve as the basis for follow-up questions, some serve as the source of answer material, and some are used only to verify whether fields exist, without directly generating ledgers or documents.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). The acceptance record and the completed follow-up questions are then handled by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model decides whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Tool description | States the purpose, when it should be used, and what result it returns | Open the description field in the tool node, check whether this description can be understood on its own, and verify whether it covers the four types of fields: ingredient names and specifications, sample retention time and batch, disinfection time period, and absence cause classification |
| Parameter description | Each parameter has its meaning and values written | Open the parameter configuration one by one, check the description and whether it is required, and confirm that the required items correspond to fields that actually exist in the business materials |
| Whether required | Corresponds to fields that actually exist in the business materials | Run a test with a question that lacks this field, and see whether it asks a follow-up question first rather than fabricating directly; combine `toolChoice` and `functionCall` to observe whether the model calls according to the description |
| Tool calling node connection | The diamond interface is already connected to the target tool | On the canvas, check the diamond connection and node status, and confirm that the configurations related to `toolChoice` and `functionCall` are traceable in the call record |

## Three common errors

- Symptom: the document and the sample retention batch do not match. Cause: during acceptance, the sample retention time and batch were not set as required parameters, and the model answered directly.
- Symptom: the recipe and procurement categories are inconsistent. Cause: the ingredient names and specifications were not written into the parameter descriptions, and the model fabricated values based on the context.
- Symptom: the disinfection record is missing a time period. Cause: the disinfection time period was not set as required, the model returned a result without asking a follow-up question, and the missing item was only discovered during later verification.

## How to verify the setup

Acceptance of this function: run a test with a question that lacks a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, observe whether `toolChoice` and `functionCall` are triggered, and whether values that do not exist in the business materials appear in the returned result.

Business test: ask a question that lacks key information, and see whether it asks a follow-up question before answering.

- Open the tool node description field, confirm that the purpose, when it should be used, and what result it returns are all present, then check the parameter description and whether required.
- Run a test once with a question that lacks the sample retention batch or disinfection time period, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or fabricates directly.
