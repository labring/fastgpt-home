---
title: Tool Calls and Plugins for Laboratory Hazardous Chemical Purchasing and Records: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c065-f009
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Tool Calls | Checks
meta_description: Lab Chemicals: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Laboratory Hazardous Chemical Purchasing and Records: Compare Documents and Locate Differences

## What this category's data looks like

This category's data looks like this: Laboratory hazardous chemical procurement and ledgers involve three types of materials: hazardous chemical procurement applications, issuance registrations, and inventory ledgers. Procurement applications come from requisition forms submitted by research groups, containing the item name, specification, quantity, expected arrival date, and applicant signature; issuance registrations come from the warehouse keeper's record of each issuance, containing the issuance date, recipient, actual issued quantity, and receipt; the inventory ledger is maintained by the administrator by batch, containing the balance quantity, inbound date, storage location, and review signature. The three types of materials update at different rhythms: procurement applications are submitted with the requisition, issuance registrations are generated per issuance, and the inventory ledger is written back daily or per batch. When entering the material verification and discrepancy localization function, procurement applications and issuance registrations serve as comparison sources, the inventory ledger serves as the baseline material, the tool call node retrieves data field by field, and outputs the inputs and returns in the call record, for subsequent nodes or manual discrepancy localization.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the tool call node in the workflow (the model decides whether to call, the node executes), outputting the tool call result (the inputs and returns in the call record). Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call. The discrepancy list is then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemical procurement application | The name, quantity, expected arrival date, and applicant signature need to be aligned field by field with the issuance registration and inventory ledger | Open the original procurement application, extract the item name, specification, quantity, date, and signature, and compare with the same batch record in the inventory ledger to see whether the name, quantity, and date are consistent; on the canvas, check the diamond interface connection and node status of the tool call node |
| Issuance registration | The issuance date, recipient, actual issued quantity, and receipt need to be aligned with the dates and quantities in the procurement application and inventory ledger | Open each issuance registration one by one, check the issuance date and actual issued quantity, and check whether the receipts are complete; run a test with a question missing a required parameter, and see whether the call record shows a follow-up question or a call based on the description |
| Inventory ledger | The balance quantity, inbound date, storage location, and review signature serve as the baseline material for discrepancy localization | Open the inventory ledger, check the balance quantity and inbound date by batch, and check the review signature; check whether the tool description fields can be understood when taken out individually, and open the parameter configuration one by one to check the description and whether it is required |
| Tool call node | The tool description, parameter descriptions, whether required, and the diamond connection determine whether the model calls and whether the returned values fall within the business materials | Check whether the tool description states the purpose, when it should be used, and what result it returns; check the `toolChoice` and `functionCall` related configurations and whether the diamond interface is connected to the target tool; run a test with a question missing a field, and confirm that the returned result does not contain values that do not exist in the business materials |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the procurement application and the inventory ledger. Cause: The two materials update at different rhythms, the issuance registration is not written back in time, and the field value sources are inconsistent.
- Symptom: The returned result in the call record contains values that do not exist in the business materials. Cause: The parameters are not marked as required, the model fabricates parameter values on its own when there is no suitable value in the context, and the return is directly accepted.
- Symptom: Records missing a signature or receipt are passed as consistent records. Cause: The verification only compares the name, quantity, and date, does not include the signature and receipt as required parameters, and the tool call result lacks a return for that item.

## How to verify the setup

How to verify the setup: Acceptance for this function: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls based on the description; at the same time, check `toolChoice`, `functionCall`, and the diamond interface connection, and confirm that the model does not skip the tool and answer directly.

Business test: Use a real record to find fields inconsistent with the ledger, compare the name, quantity, date, and signature of the procurement application, issuance registration, and inventory ledger item by item, and record the discrepant fields and the materials they are in.

- Open the tool node description field, check whether this description can be understood when taken out individually, and open the parameter configuration one by one to check the description and whether it is required.
- On the canvas, check the diamond connection and node status, and run a test with a question missing that field to see whether it asks a follow-up question first rather than fabricating directly.
