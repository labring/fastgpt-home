---
title: Tool Calls and Plugins for Research Budget Adjustments and Reimbursement: Track Progress and Check Statistics
slug: /en/industry/education-d006-c059-f009
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Tool Calls | Progress
meta_description: Research Finance: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Research Budget Adjustments and Reimbursement: Track Progress and Check Statistics

## What this category's data looks like

In the research funding budget adjustment and reimbursement scenario, materials enter the tool call workflow in three categories: budget adjustment application forms, reimbursement forms, and contract invoices. Budget adjustment application forms record the adjusted subject, original budget amount, adjusted amount, application date, and signature; reimbursement forms record the expense name, quantity, amount, occurrence date, and handler signature; contract invoices record the contract name, invoice number, invoice date, amount, and receipt. The three categories of materials are summarized weekly or monthly, and the field definitions must state the statistical scope, exceptions, and date basis in the header. When materials enter this feature, budget adjustment application forms are used to verify whether the subjects and signatures before and after the adjustment are consistent, reimbursement forms are used to verify whether the expense name, quantity, and date match, and contract invoices are used to verify whether the invoice number, amount, and receipt are complete. The tool call node reads these material fields as parameters and returns results for subsequent verification.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "progress table and statistical definition description" is then completed by a subsequent AI node or manual verification. Based on the tool description, parameter description, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable values in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application form | Verify the adjusted subject, original budget amount, adjusted amount, application date, and signature; the name, quantity, and date of the same record in the application form and reimbursement form must match | Open the tool node description field and verify the two items: parameter description and whether required; run a test with a question missing a required parameter to see whether it asks a follow-up question first; verify the diamond connector and node status on the canvas, and confirm the call records of `toolChoice` and `functionCall` |
| Reimbursement form | Verify the expense name, quantity, amount, occurrence date, and handler signature; when versions are not synchronized, the latest signed version prevails | Open each parameter configuration one by one and verify the description and whether required; check whether the return result contains values that do not exist in the business materials; verify whether the input parameters and return of the `functionCall` return are consistent with the reimbursement form fields |
| Contract invoice | Verify the contract name, invoice number, invoice date, amount, and receipt; when the signature or receipt is missing, mark it as an exception | Verify whether the tool description states the purpose, when it should be used, and what result it returns; run a test with a question missing an invoice number to see whether it asks a follow-up question first; verify whether the parameters in the `toolChoice` call record correspond to the contract invoice fields |
| Tool call node connection | The diamond interface is connected to the target tool, and the node status is consistent with the canvas | Verify the diamond connector and node status on the canvas; check whether results cross over after multiple tools are chained; confirm that the input parameters and return in the call record can be verified one by one |

## Three common errors
- Symptom: The name, quantity, and date of the same record in the budget adjustment application form and reimbursement form do not match. Cause: The two materials are entered separately, are not verified against the same field definition, and the sources of the tool call parameter values are inconsistent.
- Symptom: The contract invoice version is not synchronized, and the old invoice number and the new receipt coexist. Cause: After the material is updated, the tool call is not triggered again, and the input parameters in the call record still point to the old version fields.
- Symptom: The reimbursement form lacks a handler signature or the contract invoice lacks a receipt, but it is still included in the total during statistics. Cause: The required field does not correspond to the business material, and the model does not ask a follow-up question but directly calls according to the description.

## How to verify the setup

Acceptance for this feature: run a test with a question missing a required parameter, verify the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; check `toolChoice`, `functionCall`, and the connection status of the tool call node, and confirm that the return result contains no values that do not exist in the business materials.

Business test: use one week of records to verify the total and see whether the definitions and exceptions are clearly stated; verify the fields, dates, and signatures of the budget adjustment application form, reimbursement form, and contract invoice, and confirm that the number of records matches the statistical count.

- Open the tool node description field and check whether this description can be understood when taken out on its own; open each parameter configuration one by one and verify the two items: description and whether required.
- Verify the diamond connector and node status on the canvas; run a test with a question missing that field to see whether it asks a follow-up question first rather than fabricating directly; verify the input parameters and return in the call record.
