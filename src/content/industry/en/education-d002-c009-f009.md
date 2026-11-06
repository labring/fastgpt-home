---
title: Tool Calls and Plugins for Compulsory Education Dropout Prevention: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c009-f009
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Tool Calls | Checks
meta_description: Dropout Prevention: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Compulsory Education Dropout Prevention: Compare Documents and Locate Differences

## What this category's data looks like

In the compulsory education dropout prevention and control scenario, materials mainly come from three types: dropout risk ledgers, persuasion-to-return records, and home visit records. The ledger is updated on a rolling basis by semester, and its fields include student name, risk level, person responsible for persuasion to return, date, and signature column; persuasion-to-return records are added with each persuasion-to-return action, and their fields include student name, persuasion-to-return method, persuasion-to-return result, and receipt signature; home visit records are generated per visit, and their fields include student name, home visit date, home visit teacher, parent signature, and receipt. When these three types of materials enter this function, the ledger serves as the baseline object, while persuasion-to-return records and home visit records serve as the objects to be verified. The function is responsible for comparing the same student's name, quantity, date, and signature item by item across the two materials, forming a discrepancy list for the reviewer to confirm and write back.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Whether the same student's name, risk level, and date are consistent between the ledger and the persuasion-to-return records | Open the tool node introduction field and confirm that the purpose states comparison between the ledger and persuasion-to-return records; on the canvas, verify that the diamond interface is connected to the target tool, and check the values of `toolChoice` and `functionCall` in the call record |
| Persuasion-to-return records | Whether the same record's persuasion-to-return method, quantity, and date match between the persuasion-to-return records and the home visit records | Open each parameter configuration one by one, check the parameter introduction and whether it is required, and confirm that the persuasion-to-return result and receipt signature fields correspond to fields that actually exist in the business materials |
| Home visit records | Whether the home visit date, home visit teacher, parent signature, and receipt are complete and synchronized with the ledger version | Run a test with a question missing the parent signature field to see whether it asks a follow-up question first rather than fabricating directly; check whether the input parameters in the call record contain values that do not exist in the materials |
| Tool call node connections | Whether the connections between the diamond interface and the target tool are complete and whether the node status is normal | On the canvas, verify the diamond connections and node status, and confirm that after multiple tools are connected in series, the results do not get mixed up with each other |

## Three common errors

- Phenomenon: The same student's name is written differently in the ledger and the persuasion-to-return records, and the dates differ by several days. Cause: The two materials were entered by different personnel at different times, and there is no unified comparison rule.
- Phenomenon: The home visit records have been updated, but the ledger is still the old version, and the quantities do not match. Cause: The versions are not synchronized, the update cadence is inconsistent, and the write-back step is missing.
- Phenomenon: The persuasion-to-return records lack a receipt signature, and the home visit records lack a parent signature. Cause: When the materials were archived, the signature columns were not checked item by item, and there is no required-field validation for signatures and receipts.

## How to verify the setup

Acceptance for this function: run a test with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check the values of `toolChoice` and `functionCall` in the call record, and confirm that the model decides whether to call based on the tool introduction, parameter introduction, and whether the parameter is required.

Business test: use a real record to find fields inconsistent with the ledger, and submit the discrepancy list to the reviewer for confirmation and write-back.

- Open the tool node introduction field and check whether the description can be understood when taken out on its own, and whether it states the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, check the parameter introduction and whether it is required, and run a test with a question missing that field to see whether it asks a follow-up question first.
