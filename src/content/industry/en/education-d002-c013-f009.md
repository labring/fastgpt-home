---
title: Tool Calls and Plugins for School Teacher Training Credits: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c013-f009
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Tool Calls | Checks
meta_description: Teacher Credits: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Teacher Training Credits: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on three types of materials in credit management for primary and secondary school teacher training: training notices, credit recognition forms, and participant lists. Training notices are usually issued by teacher development centers by project batch, and include training name, start and end dates, credit hours, and seal; credit recognition forms are filled out by schools or training institutions by semester, and include teacher name, ID number, credit amount, recognition date, and responsible person's signature; participant lists are compiled by the organizing unit by class session, and include name, unit, participation date, and sign-in receipt. When the three types of materials enter the tool calling node, the notices and lists are used to compare the name, quantity, and date of the same record, and the recognition form is used to verify the completeness of signatures and receipts. The material update rhythm is centralized submission after project completion and summary review at the end of the semester; fields are mainly name, date, credit hours, and signature, and versions are prone to discrepancies due to supplementary submissions and corrections.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). The "discrepancy list" is then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the name, start and end dates, and credit hour quantity of the same training record are consistent across the two materials | Open the tool node introduction field and check whether the training name, dates, and credit hours in the notice can be accurately covered by the parameter introduction; run a trial with a question missing a required parameter to see whether it asks a follow-up question first |
| Credit recognition form | Whether the same teacher's name, credit amount, and recognition date match between the recognition form and the participant list, and whether signatures and receipts are complete | Open the parameter configuration one by one and check the `parameter introduction` and whether they are required for the three items: name, credit amount, and recognition date; check whether `toolChoice` and `functionCall` return real field values in the call record |
| Participant list | Whether the same class session list is consistent with the notice and recognition form in participation date, number of people, and unit name, and whether the versions are synchronized | On the canvas, check the diamond interface and the tool calling node connection, and confirm that the input parameters of `toolChoice` and `functionCall` are taken from the list fields; run a trial with a question missing the date field to see whether the return fabricates values |
| Tool calling node connection | The diamond interface is connected to the target tool, and the node status and introduction field can be understood independently | On the canvas, check the diamond connection and node status, check whether the tool introduction can be understood when taken out alone, and whether the required parameters correspond to the business material fields |

## Three common errors

- Phenomenon: The same teacher's name or credit amount does not match between the recognition form and the participant list. Cause: The two materials are entered separately, no field-level comparison is performed, and versions are not synchronized.
- Phenomenon: The start and end dates of the training notice are inconsistent with the participation dates in the participant list. Cause: After supplementary submission or correction, only one material is updated, while the other remains the old version.
- Phenomenon: The credit recognition form lacks the responsible person's signature or the participant list lacks the sign-in receipt. Cause: The material submission step does not verify the signature and receipt fields, and directly enters comparison.

## How to verify the setup

This function's acceptance: run a trial with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check whether `toolChoice` and `functionCall` appear in the call record, and whether the returned result contains only values that exist in the materials.

Business test: use a real record to find a field inconsistent with the ledger, for example, a difference in credit amount or recognition date for the same teacher between the recognition form and the participant list, and submit it to the reviewer for confirmation and write-back.

- Open the tool node introduction field, check whether this description can be understood when taken out alone, and confirm that the three items are complete: purpose, when it should be used, and what result it returns.
- Open the parameter configuration one by one, check the two items of parameter introduction and whether it is required, and run a trial with a question missing that field to see whether it asks a follow-up question first instead of directly fabricating.
