---
title: Tool Calls and Plugins for Kindergarten Operations and Quality Self-Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c006-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Tool Calls | Checks
meta_description: Kindergarten Quality: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten Operations and Quality Self-Assessment: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on kindergarten operation behavior and quality self-assessment materials. The sources are three types of documents: self-assessment reports, problem lists, and rectification plans, updated by semester or rectification cycle. The self-assessment report contains items such as operating conditions, safety and hygiene, and care and education, as well as a signature field; the problem list lists specific problems, responsible persons, and rectification deadlines; the rectification plan contains measures, completion dates, and receipts. When these three types of materials enter the tool call node, the self-assessment report serves as the primary record source, the problem list serves as the discrepancy comparison source, and the rectification plan serves as the deadline and signature verification source. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts, and the same record must be aligned item by item across the three materials. Materials are input as structured text or tables. The tool call node determines whether to initiate verification based on the tool introduction and parameter introduction, and returns the input parameters and return results for subsequent nodes or manual discrepancy localization.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. The model decides whether to call based on the tool introduction, parameter introduction, and whether parameters are required. When there are no required parameters, it may fabricate values on its own; when there are required parameters but no suitable values in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Names, quantities, dates, and signatures must be consistent with the problem list and rectification plan | Open the tool node introduction field and verify the purpose and return result description; check the parameter introduction and whether required; run a test query missing the signature field to see whether it asks a follow-up question |
| Problem list | The names, quantities, and dates of the same record must align with the self-assessment report | Open each parameter configuration and verify the introduction and whether required; verify the diamond connector and node status on the canvas; check whether the `toolChoice` and `functionCall` related configurations take effect as described in the introduction |
| Rectification plan | Rectification deadlines, completion dates, and receipts must be consistent with the problem list | Use one real record to compare ledger fields; verify whether versions are synchronized; check whether it asks a follow-up question first when a receipt is missing, rather than directly fabricating; record the `toolChoice` value |
| Tool call node connection | The diamond interface is connected to the target tool and the node status is normal | Verify the diamond connector and node status on the canvas; confirm that the input parameters and return in the `functionCall` call record are not mixed up |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the self-assessment report and the problem list. Cause: The two materials were entered separately, and field alignment and version comparison were not done before the tool call.
- Symptom: The rectification plan version is not synchronized, and the old deadline overrides the new requirement. Cause: The material update rhythms are inconsistent, the tool call node read an unsynchronized version, and the return result contains values that do not exist in the materials.
- Symptom: Items missing signatures or receipts are directly judged as consistent. Cause: Whether parameters are required does not correspond to business fields, the model calls without asking a follow-up question, and the return result contains values that do not exist in the business materials.

## How to verify the setup

Acceptance of this feature: run a test query missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls as described in the introduction; check whether `toolChoice` and `functionCall` take effect according to the tool introduction, parameter introduction, and whether required.

Business test: use one real record to find fields inconsistent with the ledger, compare names, quantities, dates, signatures, and receipts item by item, record the discrepancy list for the reviewer to confirm and write back.

- Open the tool node introduction field, check whether this description can be understood when taken out on its own, and verify the meaning of each parameter and whether it is required.
- Verify the diamond connector and node status on the canvas, and run a test query missing that field to see whether it asks a follow-up question first, rather than directly fabricating.
