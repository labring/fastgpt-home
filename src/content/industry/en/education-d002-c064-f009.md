---
title: Tool Calls and Plugins for University Laboratory Safety Classification: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c064-f009
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Tool Calls | Checks
meta_description: Lab Safety Categories: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for University Laboratory Safety Classification: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses material verification and discrepancy localization in the scenario of safety grading and classification of university laboratories, involving three category materials: the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table is usually updated by semester or year, with fields including laboratory name, room number, hazard level, and responsible person; the hazard source list changes with experimental projects, with fields including hazard source name, quantity, storage location, and control measures; the safety responsibility statement is signed by academic year, with fields including responsible entity, signature, date, and receipt. When the materials enter this function, the grading and classification table serves as the baseline ledger, while the hazard source list and the safety responsibility statement serve as comparison objects; the fields, dates, and signatures of the three must be cross-checked item by item, to locate discrepancies in the name, quantity, and date of the same record across two materials.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Compare name, quantity, date, and signature item by item with the hazard source list and the safety responsibility statement, and locate inconsistent fields of the same record | Open the tool node introduction field, confirm that the purpose states when it should be used and what it returns; check the parameter introduction and whether it is required; run a test with a query missing the responsible person, and see whether it asks a follow-up question first |
| Hazard source list | Compare hazard source name, quantity, and storage location with the grading and classification table, and check whether the version is synchronized and whether the dates match | Open each parameter configuration one by one, and check the introduction and whether it is required; check the diamond connectors and node status on the canvas; check whether the returned result contains values that do not exist in the materials |
| Safety responsibility statement | Check the responsible entity, signature, date, and receipt, and confirm that records missing a signature or receipt are flagged | Run a test with a query missing the signature field, and see whether the model asks a follow-up question first; check the input parameters and return of `toolChoice` and `functionCall` in the call record |
| Tool calling node connections | The diamond interface is connected to the target tool, and the node status is consistent with the canvas | Check the diamond connectors and node status on the canvas, and confirm that after multiple tools are connected in series, the results do not cross over into each other |

## Three common errors

- Symptom: the name, quantity, and date of the same laboratory do not match across two materials. Cause: the grading and classification table and the hazard source list are each updated separately, without item-by-item cross-comparison, and the discrepancy is not localized to a field.
- Symptom: the version is not synchronized, and an old version of the responsibility statement is still referenced. Cause: after the materials are updated, the ledger is not written back, the tool call result is inconsistent with the latest materials, and the reviewer has not confirmed it.
- Symptom: records missing a signature or receipt are not flagged. Cause: the parameter introduction and whether it is required do not cover the signature field, and the model calls directly according to the introduction without first asking about the missing item.

## How to verify the setup

This function's acceptance: run a test with a query missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; check the behavior of `toolChoice` and `functionCall` in the call record.

Business test: use a real record to find a field inconsistent with the ledger, and hand it to the reviewer for confirmation and write-back.

- Open the tool node introduction field, and check whether this description can be understood when taken out on its own, stating the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, check the introduction and whether it is required, and run a test with a query missing that field, to see whether it asks a follow-up question first rather than directly fabricating.
