---
title: Tool Calls and Plugins for School Mental Health Screening and Referrals: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c015-f009
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Tool Calls | Checks
meta_description: Student Mental Health: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Mental Health Screening and Referrals: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on the primary and secondary school mental health screening and referral category. The material sources are school psychological screening plans, interview records, and referral forms. The update cadence advances with screening batches and the referral process, and the field characteristics center on names, quantities, dates, signatures, and receipts. When the screening plan enters the tool calling node, it serves as the field baseline; the interview records provide a comparison of names and quantities for the same object; the referral form carries dates and signature status. Across the same object, the three types of materials must keep names, quantities, and dates consistent, with synchronized versions and complete signatures and receipts. The tool calling node reads the fields in these materials and outputs the inputs and returns in the call records, for subsequent AI nodes or manual verification to generate a discrepancy list.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it; the node executes it), and outputs the tool call result (the inputs and returns in the call records). The discrepancy list is then completed by subsequent AI nodes or manual verification. The model decides whether to call based on the tool description, parameter descriptions, and whether parameters are required. When there are no required parameters, it may fabricate parameter values; when there are required parameters but the context lacks values, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether the name, quantity, and date fields in the plan are consistent with the interview records and referral form | Open the plan fields, verify the name and quantity for the same object, and check whether the date and signature fields correspond to the referral form; on the canvas, verify the tool calling node connections and node status |
| Interview records | Whether the name, quantity, and date of the same record match across the two materials | Compare the name, quantity, and date of the interview records and the screening plan one by one, and mark discrepancies when versions are not synchronized; check whether receipts and signatures are missing |
| Referral form | Whether the date, signature, and receipt of the referral form are consistent with the screening plan and interview records | Verify the referral form date and signature, and check whether the receipt is complete; run a trial with a question missing a required parameter, and inspect the inputs and returns of `toolChoice` and `functionCall` in the call records |
| Tool calling node | Whether the tool description, parameter descriptions, and whether parameters are required correspond to the business material fields | Open the tool node description fields and check whether the description can be understood on its own; verify the parameter descriptions and whether each is required one by one, and confirm that the diamond interface is connected to the target tool |

## Three common errors

- Symptom: the name and quantity of the same record do not match between the screening plan and the interview records. Cause: no mapping for the same object was done when entering fields, and versions were not synchronized.
- Symptom: the referral form date is inconsistent with the screening plan date, and the signature or receipt is missing. Cause: the referral process was not written back, and the material update cadence was not synchronized.
- Symptom: values that do not exist in the business materials appear in the returned results. Cause: when there are no required parameters, the model fabricates parameter values on its own without asking first.

## How to verify the setup

Feature acceptance: run a trial with a question missing a required parameter, inspect the inputs and returns in the call records, and confirm whether it asks a follow-up question or calls according to the description; check `toolChoice`, `functionCall`, and the connection status of the tool calling node.

Business test: use one real record to find fields inconsistent with the ledger, and mark discrepancies in name, quantity, date, or signature/receipt.

- Open the parameter configurations one by one, verify the two items of parameter description and whether required, and confirm they correspond to the business material fields.
- On the canvas, verify the connection between the diamond interface and the target tool, and check whether the tool calling node status and description fields can be understood on their own.
