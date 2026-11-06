---
title: Tool Calls and Plugins for Sino-Foreign Education Establishment and Annual Reports: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c048-f009
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Tool Calls | Checks
meta_description: Joint Education: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Sino-Foreign Education Establishment and Annual Reports: Compare Documents and Locate Differences

## What this category's data looks like

The establishment and annual reports of Chinese-foreign cooperative education institutions center on the establishment application, the cooperation agreement, the articles of association, and the receipt. The establishment application contains the institution name, education level, enrollment number, and signature page; the cooperation agreement contains the signing date, both parties' names, and the validity period; the articles of association contain the deliberation rules, seal, and signature. When these materials enter this function, the establishment application and the cooperation agreement serve as the objects to be checked, the articles of association serve as the baseline reference, and the receipt and signature page serve as the completeness evidence. The update cadence follows the establishment application and annual report cycle, and the field characteristics are three types: name, quantity, and date. Among the materials, the same record often appears with inconsistent name spellings, different quantity calibers, contradictory dates, or unsynchronized versions and missing signatures and receipts. During verification, fields must be compared one by one, discrepancies located and compiled into a list, and written back after the reviewer confirms it.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. The model judges whether to call based on the tool description, parameter descriptions, and whether parameters are required; when there are no required parameters, it may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | The institution name, enrollment number, and signature page date must be consistent with the cooperation agreement and the articles of association | Open the tool node description field, check the name and quantity parameter descriptions and whether they are required, and run a trial with a question missing the signature date to see whether it asks a follow-up question |
| Cooperation agreement | The signing date, both parties' names, and validity period must correspond to the establishment application and the articles of association | Open the parameter configuration one by one, check the date and name parameter descriptions and whether they are required, and inspect the diamond interface connections and node status |
| Articles of association | The deliberation rules, seal, and signature must serve as the baseline reference and be compared item by item with the two materials | Check whether the articles of association fields correspond to the actual fields of the business materials, and run a trial with a question missing the seal field to confirm whether it asks a follow-up question first |
| Receipt and signature page | A missing signature or receipt is a completeness discrepancy and must be located in the specific material | On the canvas, check the tool calling node connections and node status, and confirm that the returned result does not contain values that do not exist in the materials |

## Three common errors

- Phenomenon: the same institution name is written differently in the establishment application and the cooperation agreement. Cause: the two materials were filled in by different handlers, and the name was not standardized uniformly.
- Phenomenon: the enrollment number does not match between the two materials. Cause: different statistical calibers and cutoff dates, and the versions were not synchronized.
- Phenomenon: the cooperation agreement is missing a signature or receipt. Cause: the signing process was not completed, and completeness was not checked when the materials were archived.

## How to verify the setup

Acceptance of this function: run a trial with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; check the correspondence between `toolChoice`, `functionCall`, and the tool description, parameter descriptions, and whether parameters are required.

Business test: use one real record to find a field inconsistent with the ledger, record the discrepancy, and write it back after the reviewer confirms it.

- Open the tool node description field, confirm that the description can be understood when taken out on its own, and check the two items: parameter descriptions and whether parameters are required.
- On the canvas, check the diamond connections and node status, run a trial with a question missing a field, and confirm that the model asks a follow-up question first and does not fabricate parameter values.
