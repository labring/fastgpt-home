---
title: Tool Calls and Plugins for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c058-f009
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Tool Calls | Intake
meta_description: Research Agreements: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of signing research project task books. The materials include three types: the project task book, the subject task breakdown table, and the budget book. The task book is submitted by the project lead unit before signing, and contains the project name, undertaking unit, start and end dates, signature, and receipt; the task breakdown table is used by the subject leader to split the research content, assessment indicators, and responsible persons by subject; the budget book is provided by finance or the budget preparer and gives the account amounts, calculation basis, and date. The three types of materials enter the acceptance and follow-up-question process at the same time during the signing stage: the task book defines the overall objectives and period, the breakdown table defines subject-level tasks and milestones, and the budget book defines the funding scope and accounts. The update rhythm is version submission for review, return for modification, and resubmission, and the field characteristics are concentrated in names, quantities, dates, signatures, and version numbers. When the materials enter this function, the tool calling node decides whether to retrieve data based on the introduction and parameters, and the acceptance record and follow-up questions to be completed are finished by subsequent AI nodes or manual verification.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). Based on the tool introduction, parameter introductions, and whether parameters are required, the model decides whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call. "The acceptance record and the follow-up questions to be completed" are then finished by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Whether the project name, start and end dates, signature, and receipt are consistent with the subject task breakdown table | Open the tool node introduction field and confirm that it clearly states the purpose, when it should be used, and what result it returns; check the two items of parameter introduction and whether required, and run a test with a question missing the signature field to see whether it asks a follow-up question first instead of fabricating directly |
| Subject task breakdown table | Whether the subject name, quantity, and date correspond to the task book, and whether the versions are in sync | Open the parameter configurations one by one and check the introduction and whether required; run a test with a question missing the subject name, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction |
| Budget book | Whether the account amounts, calculation basis, date, and signature are complete, and whether they are consistent with the task book's scope | Check the diamond-shaped connections and node status on the canvas, and confirm that the tool calling node connection is connected to the target tool; run a test with a question missing the account field to see whether it asks a follow-up question first |

## Three common errors

- Symptom: values that do not exist in the business materials appear in the call return. Cause: when there are no required parameters, the model may fabricate parameter values on its own, and the tool introduction does not specify the boundaries of the return fields.
- Symptom: the name, quantity, and date of the same record do not match between the task book and the breakdown table. Cause: the versions of the two materials are not in sync, and the parameter introductions do not correspond one-to-one with the material fields.
- Symptom: the model does not call the tool and directly gives an answer. Cause: when there are required parameters but no suitable value in the context, it may not call, and the prompt does not guide completion of the parameters.

## How to verify the setup

This function's acceptance: run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; check `toolChoice`, `functionCall`, and the connection status of the tool calling node.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering; check whether the acceptance record and the follow-up questions to be completed are finished by subsequent AI nodes or manual verification.

- Open the tool node introduction field and check whether this description can be understood when taken out on its own; open the parameter configurations one by one and check the two items of introduction and whether required.
- Check the diamond-shaped connections and node status on the canvas; run a test with a question missing a field, check the input parameters and return in the call record, and confirm `toolChoice`, `functionCall`, and the follow-up-question behavior.
