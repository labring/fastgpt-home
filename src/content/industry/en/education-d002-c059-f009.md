---
title: Tool Calls and Plugins for Research Budget Adjustments and Reimbursement: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c059-f009
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Tool Calls | Checks
meta_description: Research Finance: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Research Budget Adjustments and Reimbursement: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy localization in the context of research funding budget adjustments and reimbursements, involving three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications usually come from the research group or research management department, and are updated as budget categories change, amounts are reallocated, or the project cycle is adjusted; the fields include the application reason, adjusted category, adjustment amount, application date, and approval signature. Reimbursement forms come from the reimbursement process submitted by the handler, and are generated with each expenditure; the fields include the reimbursement reason, expense details, quantity, amount, occurrence date, and handler signature. Contract invoices come from suppliers or partners, and are updated at procurement and settlement milestones; the fields include the contract name, invoice number, invoice date, quantity, amount, and seals of both parties. When these three types of materials enter this feature, the budget adjustment application serves as the baseline ledger, the reimbursement form serves as the record to be verified, and the contract invoice serves as supporting evidence; the tool call node reads them on demand and returns field-level comparison results, for subsequent nodes or humans to localize discrepancies.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The three items—tool description, parameter description, and whether it is required—jointly determine whether the model initiates a call. When there are no required parameters, the model may fabricate parameter values on its own; when there are required parameters but no suitable value in the context, it may not call. The "discrepancy list" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the name, quantity, and date of the same record are consistent between the budget adjustment application and the ledger, and whether the signatures are complete | Open the tool node description field and check whether the description can be understood on its own; test-run with a question that lacks a required parameter and observe whether it asks a follow-up question first rather than fabricating directly; check the diamond-shaped connections and node status on the canvas |
| Reimbursement form | Whether the name, quantity, and date of the same record match between the reimbursement form and the contract invoice, whether the versions are in sync, and whether the receipt is missing | Open each parameter configuration one by one and check the parameter description and whether it is required; confirm that the `toolChoice` and `functionCall` related configurations correspond to the business material fields, then compare whether values appear in the returned results that do not exist in the materials |
| Contract invoice | Whether the name, quantity, and date of the same record are consistent between the contract invoice and the budget adjustment application, and whether the seals are complete | Test-run with one real record and check the inputs and returns in the call record; check whether results from multiple tools chained together cross-contaminate each other, and check that the tokens of the referenced text and the number of array entries are recorded separately |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the reimbursement form and the contract invoice. Cause: the two materials are entered at different stages, the field definitions are not unified, and no field-level comparison is performed after the tool call returns.
- Symptom: the budget adjustment application version is not in sync, and the old category is mixed with the new reimbursement form. Cause: the materials are updated at different paces, the tool call node still reads the previous version's content, and there is no version marker verification.
- Symptom: the contract invoice lacks a signature or receipt, yet the model still gives an answer directly. Cause: marking a parameter as required does not guarantee that the model will ask a follow-up question; it depends on prompt guidance, and a tool call does not equal scheduled execution.

## How to verify the setup

Feature acceptance: test-run with a question that lacks a required parameter, check the inputs and returns in the call record, confirm whether it asks a follow-up question or calls according to the description, and check whether the `toolChoice` and `functionCall` related configurations correspond to the material fields.

Business test: use one real record to find fields inconsistent with the ledger, hand them to the reviewer for confirmation, and write them back.

- Open the tool node description field, check whether this description can be understood when taken out on its own, and check the parameter description and whether it is required.
- Check the diamond-shaped connections and node status on the canvas, confirm that the target tool is connected, then compare whether values appear in the returned results that do not exist in the business materials.
