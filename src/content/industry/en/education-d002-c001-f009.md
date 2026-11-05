---
title: Tool Calls and Plugins for Daily Kindergarten Care Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c001-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Tool Calls | Checks
meta_description: Kindergarten Care: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Daily Kindergarten Care Management: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses kindergarten childcare daily life management. Materials come from three types: daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule is updated weekly and includes activity time slots, segment names, and responsible person signatures; morning and afternoon check records are filled in daily and include child names, temperature measurements, dates, and teacher signatures; child health observation records are registered as needed and include observation subjects, symptom descriptions, dates, and health worker signatures. When these materials enter the tool calling and plugin feature, the schedule serves as the time slot baseline, while morning and afternoon check records and observation records serve as item-by-item comparison objects, each taking on the role of field source. The update rhythm is weekly schedule plus daily records, and field characteristics center on four categories: name, quantity, date, and signature. Discrepancy localization relies on field alignment of the same object across two materials.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). The "discrepancy list" is then completed by subsequent AI nodes or manual verification. Based on the tool introduction, parameter introduction, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Check whether time slot names, segment quantities, dates, and responsible person signatures correspond to the morning and afternoon check records | Open the tool node introduction field and verify whether the schedule fields are written in as parameter introductions |
| Morning and afternoon check records | Check whether child names, temperature measurement quantities, dates, and teacher signatures are consistent with the observation records | Open each parameter configuration one by one and verify whether the introduction and required fields correspond to the material fields |
| Child health observation records | Check whether observation subjects, symptom quantities, dates, and health worker signatures are consistent with the ledger | Run a test with a question missing that field to see whether it asks follow-up questions first rather than fabricating directly |
| Tool calling node connections | Check whether the diamond interface is connected to the target tool and whether the node status is executable | On the canvas, verify the diamond connections and node status, and confirm the node where `toolChoice` and `functionCall` are located |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across two materials. Cause: The model did not call the tool and directly gave an answer without performing field comparison.
- Symptom: The returned result contains values that do not exist in the business materials. Cause: When there are no required parameters, the model may fabricate parameter values on its own without asking follow-up questions first.
- Symptom: Missing signatures or receipts, and versions are not synchronized. Cause: Tool calling is not the same as scheduled execution; after materials are updated, verification is not re-triggered.

## How to verify the setup

Feature acceptance: Run a test with a question missing required parameters, check the inputs and returns in the call record, and confirm whether it asks follow-up questions or calls according to the introduction; at the same time, check `toolChoice`, `functionCall`, and the tool introduction fields.

Business test: Use a real record to find fields inconsistent with the ledger, and verify the four items: name, quantity, date, and signature.

- Open the introduction field in the tool node, check whether this description can be understood when taken out on its own, and verify the parameter introduction and required fields.
- On the canvas, verify the diamond connections and node status, and confirm that after multiple tools are connected in series, the results do not cross over into each other.
