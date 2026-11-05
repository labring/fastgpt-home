---
title: Tool Calls and Plugins for Laboratory Hazardous Chemical Purchasing and Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c065-f009
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Tool Calls | Intake
meta_description: Lab Chemicals: review tool calls for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Laboratory Hazardous Chemical Purchasing and Records: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data includes three types of materials: procurement applications, requisition registrations, and inventory ledgers. Procurement applications record the item name, specification, quantity, application date, and approval signature; requisition registrations record the requisitioner, requisition quantity, requisition date, and requisitioner signature; inventory ledgers record the balance quantity, inbound date, and custodian signature. The materials come from procurement system exports, scans of paper registrations, and ledger spreadsheets, and the update cadence is batch submission and weekly aggregation. When entering this feature, procurement applications serve as the source of pending questions to be handled, while requisition registrations and inventory ledgers serve as the basis for field comparison, used to identify whether the name, quantity, and date of the same record are consistent, and whether signatures or receipts are missing.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). "Handling records and completing the question items" is then completed by a subsequent AI node or manual review. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable values in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Procurement application | Whether the item name, specification, quantity, application date, and approval signature are complete | Open the tool node description field and check whether it states the purpose, when it should be used, and the return result; run a test with a question that lacks the approval signature to see whether it asks a follow-up first |
| Requisition registration | Whether the requisitioner, requisition quantity, requisition date, and requisitioner signature correspond to the procurement application | Open each parameter configuration one by one and check the parameter description and whether it is required; check the diamond connector and node status on the canvas |
| Inventory ledger | Whether the balance quantity, inbound date, and custodian signature are consistent with the requisition registration | Run a test with a question that lacks the custodian signature to see whether it asks a follow-up first instead of directly fabricating; check the call records of `toolChoice` and `functionCall` |
| Tool calling node connection | The diamond interface is already connected to the target tool | Check the diamond connector and node status on the canvas, and confirm that the call result contains no values that do not exist in the business materials |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the procurement application and the requisition registration. Cause: The two materials are entered separately, and the field values are not cross-checked.
- Symptom: The inventory ledger version is not synchronized, and the balance quantity is inconsistent with the requisition registration. Cause: The ledger is aggregated weekly, while requisition registrations are submitted in batches, so the update cadences differ.
- Symptom: When a signature or receipt is missing, the model does not call the tool and directly gives an answer. Cause: There are required parameters but no suitable values in the context, so the model may not call.

## How to verify the setup

Acceptance for this feature: run a test with a question that lacks a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up or calls according to the description; at the same time, check the values of `toolChoice`, `functionCall`, and `toolChoice` to confirm that no parameters are directly fabricated.

Business test: ask a question that lacks key information and see whether it asks a follow-up before answering.

- Open the description field in the tool node, check whether this description can be understood when read on its own, and check the parameter description and whether it is required.
- Run a test with a question that lacks that field to see whether it asks a follow-up first instead of directly fabricating; check the diamond connector and node status on the canvas.
