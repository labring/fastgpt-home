---
title: Tool Calls and Plugins for School Moral Education and Class Teacher Work: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c014-f009
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Tool Calls | Checks
meta_description: Pastoral Education: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Moral Education and Class Teacher Work: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses school moral education and homeroom teacher work scenarios. Material sources include three categories: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans are submitted by homeroom teachers weekly or by theme, with fields including class meeting theme, time, location, host, process records, and signature field; student comprehensive quality records are filled in by homeroom teachers and subject teachers per semester or stage, with fields including student name, student ID, evaluation dimension, grade, date, and teacher signature; home visit records are filled in by homeroom teachers per visit, with fields including student name, home visit time, home visit teacher, home visit content, parent receipt, and signature. When the three categories of materials enter this feature, they serve respectively as objects to be verified and ledger sources, taking on the role of comparison baseline or data to be compared, and their update rhythm changes with the class meeting cycle, evaluation cycle, and home visit frequency.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Check the class meeting theme, time, location, host, process records, and signature field, and compare them item by item against the ledger | Open the tool node introduction fields and confirm the purpose description can be understood on its own; run a test with a question missing a required parameter, and check the `toolChoice` and `functionCall` records |
| Student comprehensive quality record | Check name, student ID, evaluation dimension, grade, date, and teacher signature, and locate fields inconsistent with the ledger | Open each parameter configuration one by one and check the two items: parameter introduction and whether it is required; check that the diamond interface is connected to the target tool |
| Home visit record | Check home visit time, home visit teacher, home visit content, parent receipt, and signature, and confirm the two materials match in name, quantity, and date | Run a test with a question missing the parent receipt field to see whether it asks a follow-up question first rather than fabricating directly; check whether the returned result contains values that do not exist in the materials |
| Tool calling node connections | Check that the diamond interface is connected to the target tool, and that the node status is consistent with the connection | On the canvas, check the diamond connections and node status, and confirm that after multiple tools are connected in series, the results do not cross over into each other |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the two materials. Cause: the ledger and the original materials have different update rhythms, and during tool calling the fields were not compared item by item, so a summary result was returned directly.
- Symptom: versions are not synchronized, and an old version of the class meeting plan exists at the same time as the new ledger. Cause: the tool calling node did not retrieve data by material version number or submission time, and the model returned outdated fields after calling according to the introduction.
- Symptom: signatures or receipts are missing, yet home visit records and comprehensive quality records still have returns. Cause: parameters were not marked as required, or were marked as required but the prompt did not guide follow-up questions, so the model fabricated parameter values on its own.

## How to verify the setup

This feature's acceptance: run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check the `toolChoice` and `functionCall` records, and confirm that the two items, parameter introduction and whether it is required, correspond to the material fields.

Business test: use one real record to find fields inconsistent with the ledger, check name, quantity, date, signature, and receipt item by item, and record the discrepancy location and field name.

- Open the tool node introduction fields, check whether this description can be understood when taken out on its own, and confirm that the returned result format corresponds to the discrepancy list fields.
- Open each parameter configuration one by one and check the two items: introduction and whether it is required; run a test with a question missing that field to see whether it asks a follow-up question first rather than fabricating directly.
