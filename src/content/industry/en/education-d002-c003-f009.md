---
title: Tool Calls and Plugins for Kindergarten Healthcare and Meal Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c003-f009
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Tool Calls | Checks
meta_description: Child Health and Meals: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten Healthcare and Meal Management: Compare Documents and Locate Differences

## What this category's data looks like

This category's data covers multiple types of daily materials: food procurement orders, menu plans, sample retention registrations, disinfection records, and absence cause tracking forms. These materials are filled in daily or weekly by health care staff, the kitchen, and class teachers, and their update cadence is synchronized with meal times, disinfection periods, and absence reporting. Field characteristics center on food ingredient names and specifications, sample retention times and batches, disinfection periods, and absence cause classification. When materials enter this feature, procurement orders and menus serve as the category verification source, sample retention registrations and disinfection records serve as the period and batch verification source, and absence forms serve as the classification verification source. The tool calling node reads these fields and returns the inputs and returns in the call record, and the discrepancy list is completed afterward by a subsequent AI node or manual verification.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The tool description, parameter descriptions, and whether each is required jointly determine whether the tool should be called this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call the tool. The "discrepancy list" is completed afterward by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Food procurement orders and menu plans | Whether food ingredient names and specifications are consistent, and whether the menu matches the procurement categories | Open the tool node description fields and verify the purpose, when it should be used, and the returned results; verify the parameter descriptions and whether each is required one by one, and confirm that the food ingredient name and specification fields have corresponding values |
| Sample retention registrations and disinfection records | Whether sample retention times and batches match the documents, and whether disinfection periods have missing segments | Verify the diamond-shaped connections and node status on the canvas, and check whether the tool calling node connections are already connected to the target tool; test-run with a question missing that field and see whether it asks a follow-up question first |
| Absence cause tracking forms | Whether the absence cause classification is consistent with the health care records | Verify the meaning and values of the absence cause classification field in the parameter descriptions, and confirm whether it must correspond to fields that actually exist in the business materials; check whether the returned results contain values that do not exist in the materials |
| Tool calling node | Whether the inputs and returns in the call record correspond to the material fields | Verify the configurations related to `toolChoice` and `functionCall`, and confirm that after multiple tools are chained, the results do not cross over into each other |

## Three common errors

- Symptom: the documents and sample retention batches do not match. Cause: the batch fields of sample retention registrations and procurement orders are not specified with values in the tool parameter descriptions, and after the model calls the tool, the returned results contain batches that do not exist in the materials.
- Symptom: the menu and procurement categories are inconsistent. Cause: the food ingredient name and specification fields are vaguely described in the tool description, the model does not call the tool, and directly gives an answer without locating the discrepancy.
- Symptom: the disinfection records are missing periods. Cause: the disinfection period parameter is marked as required, but there is no suitable value in the context, the model does not ask a follow-up question, and directly fabricates a period and writes it into the call record.

## How to verify the setup

Feature acceptance: test-run with a question missing a required parameter, verify the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, verify whether `toolChoice` and `functionCall` determine the call according to the tool description and whether the parameters are required.

Business testing: use one real record to find fields that are inconsistent with the ledger, focusing on food ingredient names and specifications, sample retention times and batches, disinfection periods, and absence cause classification.

- Open the parameter configurations one by one, verify the description and whether each is required, and confirm that they correspond to fields that actually exist in the business materials.
- Verify the diamond-shaped connections and node status on the canvas, and confirm that the tool calling node connections are already connected to the target tool.
