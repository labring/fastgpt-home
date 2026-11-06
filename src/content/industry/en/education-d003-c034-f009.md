---
title: Tool Calls and Plugins for Public Vocational Skills Level Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c034-f009
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Tool Calls | Intake
meta_description: Skills Certification: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Public Vocational Skills Level Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of social evaluation of vocational skill level certification. The material sources are the evaluation implementation plan, candidate registration forms, and assessor dispatch forms, accepted and updated by batch. When the three materials enter this feature, their roles differ: the evaluation implementation plan provides the occupation name, level, evaluation method, and date range; the candidate registration form provides the candidate name, ID number, declared occupation, and signature field; the assessor dispatch form provides the assessor name, certificate number, dispatch date, and receipt. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. For the same record, the occupation name, candidate count, and evaluation date in the plan and the registration form must be aligned item by item; the assessor count and dispatch date in the dispatch form and the plan must be consistent; missing signatures and receipts are treated as pending supplementation.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (whether to call is decided by the model, and the node executes), outputting the tool call result (the input parameters and return in the call record). "Intake records and items to be completed" are then handled by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Whether the occupation name, level, evaluation date, and signature field are complete, and whether they are consistent with the corresponding fields in the registration form | Open the plan fields, verify the occupation name, level, date range, and signature, and mark missing items |
| Candidate registration form | Whether the candidate name, ID number, declared occupation, quantity, and signature are aligned with the plan | Compare the same-named fields in the registration form and the plan one by one, and record inconsistencies in names, quantities, and dates |
| Assessor dispatch form | Whether the assessor name, certificate number, dispatch date, and receipt are consistent with the plan | Verify the assessor count, dates, and receipts in the dispatch form and the plan, and mark items missing signatures |
| Tool calling node connections | Whether the diamond interface is connected to the target tool, and whether the node status is available | Check the diamond connections and node status on the canvas, and confirm that the tool introduction and parameter introduction are readable |

## Three common errors

- Symptom: The same occupation name is written differently in the plan and the registration form, and the quantity and evaluation date also do not match. Cause: The two materials are entered separately, without field-level comparison and version synchronization.
- Symptom: The dispatch form lacks an assessor signature or receipt, but the plan has already listed it as dispatched. Cause: Signatures and receipts were not included in intake verification, and versions were not synchronized, causing status misalignment.
- Symptom: Dates or quantities that do not exist in the materials appear in the returned result. Cause: When required parameters are absent, the model may fabricate parameter values on its own and answer without asking follow-up questions first.

## How to verify the setup

Acceptance of this feature: run a trial with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check the values of `toolChoice` and `functionCall` in the call record and whether `toolChoice` triggers a follow-up question.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering; then ask a question with complete fields and see whether the return is consistent with the materials.

- Open the tool node introduction field, check whether the purpose, when it should be used, and what result it returns can be understood on their own, and verify the parameter introduction and the two items of whether it is required.
- Run a trial with a question missing that field, record the input parameters and return in the call record, confirm that the model asks a follow-up question first and does not fabricate; then check the diamond connections and node status.
