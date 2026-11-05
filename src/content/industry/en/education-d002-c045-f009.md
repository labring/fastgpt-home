---
title: Tool Calls and Plugins for Off-Campus Training Registration and Compliance: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c045-f009
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Tool Calls | Checks
meta_description: Training Compliance: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Off-Campus Training Registration and Compliance: Compare Documents and Locate Differences

## What this category's data looks like

In the off-campus training compliance filing and penalty response scenario, materials usually come from three categories: school operation licenses, course filing materials, and fee publicity. A school operation license contains the institution name, school operation address, license number, validity period, and issuance date; course filing materials contain the course name, number of class hours, instructor, filing date, and signature; fee publicity contains fee items, fee standards, publicity date, and receipt. The three categories of materials have different update rhythms: licenses are reissued after changes, course filings are submitted by semester or batch, and fee publicity is posted per instance or per month. When materials enter the tool calling node, each serves as a parameter value source or comparison object, and the model decides whether to call a tool to read or compare fields. The node returns the inputs and returns in the call record, and the discrepancy list is completed by a subsequent AI node or manual verification.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. Based on the tool description, parameter description, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| School operation license | Whether the institution name, license number, validity period, and issuance date are consistent with the ledger | Open the tool node description and parameter description, and verify the value sources of the name, number, and date fields; run a test with a question missing a required parameter to see whether it asks a follow-up question first |
| Course filing materials | Whether the course name, number of class hours, filing date, and signature are consistent with the ledger | Open each parameter configuration one by one, and verify the description and whether it is required; check whether the returned result contains values that do not exist in the materials, and verify the call records related to `toolChoice` |
| Fee publicity | Whether the fee items, fee standards, publicity date, and receipt are consistent with the ledger | Verify the diamond connectors and node status on the canvas, and confirm that the tool calling node connector is connected to the target tool; check the inputs and returns in the `functionCall` call record |
| Material version | Whether the name, quantity, and date of the same record match across the two materials | Verify fields with unsynchronized versions, missing signatures, or missing receipts, record discrepancies, and hand them to the reviewer for confirmation and write-back |

## Three common errors

- Symptom: The name and date of the same record do not match between the school operation license and the course filing materials. Cause: The two materials were entered separately, no field-level comparison was performed, and the model directly gave an answer without calling a tool.
- Symptom: The number of fee items in the fee publicity is inconsistent with the number in the ledger, and the returned result contains values that do not exist in the materials. Cause: The model fabricated parameter values when there were no required parameters, without asking a follow-up question first.
- Symptom: The course filing materials lack a signature or receipt, and after multiple tools are chained, the results interfere with each other. Cause: The versions were not synchronized, and the parameter description and whether it is required did not correspond to fields that actually exist in the business materials.

## How to verify the setup

Acceptance of this feature: run a test with a question missing a required parameter, verify the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, verify the call records of `toolChoice` and `functionCall`.

Business test: use a real record to find a field that is inconsistent with the ledger, and verify whether the name, quantity, and date of that field are consistent across the school operation license, course filing materials, and fee publicity.

- Open the tool node description field and check whether the description can be understood when taken out on its own; open each parameter configuration one by one, and verify the description and whether it is required.
- Verify the diamond connectors and node status on the canvas, and confirm that the tool calling node connector is connected to the target tool; run a test with a question missing that field to see whether it asks a follow-up question first.
