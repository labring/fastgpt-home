---
title: Tool Calls and Plugins for Academic Misconduct Reports and Investigations: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c063-f009
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Tool Calls | Checks
meta_description: Research Misconduct: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Academic Misconduct Reports and Investigations: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on the category of investigation and handling of academic misconduct reports. The materials include three types: report materials, investigation reports, and expert appraisal opinions. The sources are acceptance registration, submissions by the investigation team, and expert review receipts. The update cadence advances with the investigation stages and is submitted version by version. The field characteristics center on names, quantities, dates, signatures, and receipts. When the materials enter this function, the report materials serve as the original comparison baseline, the investigation report serves as the object being checked, and the expert appraisal opinions serve as third-party corroboration. Together, the three form the input set for discrepancy localization. The workflow first reads the material fields, then retrieves ledgers or historical versions as needed through the tool call node, providing a structured basis for the subsequent generation of the discrepancy list.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the names, quantities, and dates are consistent with the investigation report | Compare the corresponding records of the report materials and the investigation report field by field, and mark the positions where the names, quantities, and dates do not match |
| Investigation report | Whether the version is synchronized and whether signatures and receipts are complete | Check the version number of the investigation report against the differences from the previous version, and check whether the signature column and receipt attachments are missing |
| Expert appraisal opinions | Whether the dates and signatures connect with the investigation report | Compare the issuance date of the expert appraisal opinions with the date of the investigation report, and verify whether the signatories are on file |
| Tool call node | Whether the diamond interface is connected to the target tool and whether the parameters are required | Check the diamond connections and node status on the canvas, run a trial with a question missing a required parameter, and observe the call records of `toolChoice` and `functionCall` |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the report materials and the investigation report. Cause: The two versions of materials were entered separately, and no field-level comparison was performed.
- Phenomenon: The investigation report version is not synchronized, and the expert appraisal opinions cite old-version data. Cause: After the version update, the re-verification process was not triggered.
- Phenomenon: Signatures or receipts are missing, but the materials still enter the next stage. Cause: Required items were not mapped to business fields, and the model called directly without asking follow-up questions.

## How to verify the setup

This function's acceptance: run a trial with a question missing a required parameter, check the inputs and returns in the call record, confirm whether it asks a follow-up question or calls according to the introduction, and check whether the values of `toolChoice` and `functionCall` fall within the allowed list.

Business test: use one real record to find fields inconsistent with the ledger, record the discrepancy positions and field names, submit them to the reviewer for confirmation, and write them back.

- Open the parameter configuration of the tool node one by one, check the two items of parameter introduction and whether it is required, and ensure they correspond to the business material fields.
- Check the connection status between the diamond interface and the target tool on the canvas, run a trial with a question missing a field, and confirm that it asks a follow-up question first and does not directly fabricate.
