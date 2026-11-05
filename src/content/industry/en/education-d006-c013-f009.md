---
title: Tool Calls and Plugins for School Teacher Training Credits: Track Progress and Check Statistics
slug: /en/industry/education-d006-c013-f009
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Tool Calls | Progress
meta_description: Teacher Credits: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Teacher Training Credits: Track Progress and Check Statistics

## What this category's data looks like

This category's data looks like this: Progress records and statistical verification for credit management of primary and secondary school teacher training cover three types of materials: training notices, credit recognition forms, and participant lists. Training notices provide the training name, start and end dates, and credit-hour requirements; credit recognition forms carry the recognition results, signatures, and receipts; participant lists record personnel, units, and attendance. The three types of materials are updated weekly or monthly, and field names, quantities, and dates often show the same record not matching across two materials; versions not being synchronized, missing signatures, or missing receipts also occur from time to time. When entering this function, training notices and participant lists serve as the sources for progress records, and credit recognition forms serve as the reference draft for statistical criteria; together, the three support the output of the progress table and the explanation of statistical criteria, for use in weekly or monthly reports.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The "progress table and explanation of statistical criteria" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the fields, dates, and signatures match the credit recognition form and participant list | Open the original notice, verify the training name, start and end dates, and credit-hour requirements item by item, and check whether the signature column and receipt are complete |
| Credit recognition form | Whether the recognition results, signatures, and receipts are consistent with the participant list and training notice | Verify the recognized credits, recognition dates, and signature column row by row, run a trial query missing a required parameter, and check the inputs and returns of `toolChoice` and `functionCall` in the call record |
| Participant list | Whether the personnel, units, and attendance counts match the other two materials | Summarize the number of participants and attendance records weekly, compare them item by item with the training notice and credit recognition form, and mark inconsistencies in names, quantities, and dates |
| Tool call node connections | Whether the diamond interface is connected to the target tool and whether the node status is normal | Check the diamond connections and node status on the canvas, and confirm that the tool description states the purpose, when it should be used, and the returned result |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the training notice and the participant list. Cause: The two materials are updated separately, the field criteria are not unified, and the versions are not synchronized.
- Symptom: The credit recognition form lacks a signature or receipt but is still included in the total during statistics. Cause: The signature column is not verified during material collection, and the recognition form and list are not cross-checked.
- Symptom: The model does not call the tool and directly gives an answer, and the returned result contains values that do not exist in the business materials. Cause: The tool description and parameter description are not clearly written, and required parameters lack prompt guidance.

## How to verify the setup

Acceptance for this function: run a trial query missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, check whether the values of `toolChoice` and `functionCall` are consistent with the three items: tool description, parameter description, and whether it is required.

Business test: use one week of records to verify the total, see whether the criteria and exceptions are clearly written, and confirm that the number of records matches the statistical count and that the criteria are written in the header.

- Open the parameter configurations one by one, check the parameter description and whether it is required, and confirm that they correspond to fields that actually exist in the business materials.
- Check the diamond connections and node status on the canvas, confirm that the tool call node is connected to the target tool, and avoid results interfering with each other after multiple tools are connected in series.
