---
title: Tool Calls and Plugins for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c039-f009
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Tool Calls | Intake
meta_description: Exam Administration: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information

## What this category's data looks like

Q&A intake for exam organization and violation handling draws on three types of materials: exam administration manuals, examination room record sheets, and violation fact records. The exam administration manual specifies the process and field definitions; the examination room record sheet records the on-site time, examination room, and invigilator signature; the violation fact record carries the party's statement and receipt. When these three types of materials enter the tool calling stage, their roles differ: the manual provides field definitions and version basis, the record sheet provides facts and dates, and the fact record provides signatures and receipt status. The update cadence follows exam batches and manual revisions, and old-version manuals and new-version record sheets often coexist. Field characteristics cluster into four categories: name, quantity, date, and signature. The same record in different materials is prone to inconsistent name wording, quantity definitions, or date formats, or to unsynchronized versions, missing signatures, and missing receipts. These fields are precisely the source for comparing the tool calling parameter introduction and whether each parameter is required.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). "Intake records and completed follow-up questions" are then handled by subsequent AI nodes or manual verification. The model decides whether to call based on the tool introduction, parameter introduction, and whether parameters are required. When there are no required parameters, it may fabricate values on its own; when there are required parameters but the context lacks suitable values, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Whether the field definitions and version basis are consistent with the record sheet | Open the tool node introduction fields, check the manual version number against the version referenced by the record sheet; run a test with a question missing a manual field to see whether it asks a follow-up question first |
| Examination room record sheet | Whether the examination room, date, and invigilator signature are complete and match the fact record | Open each parameter configuration one by one, check the introduction and whether it is required; compare how the name, quantity, and date of the same record are written in the two types of materials |
| Violation fact record | Whether the party's statement, receipt, and signature are complete | On the canvas, check the diamond connectors and node status, and confirm that the tool calling node connection is linked to the target tool; check whether the receipt field is marked as required |
| Tool calling node | Whether the inputs and returns in the call record correspond to the material fields | Run a test with a question missing a required parameter, check the value sources of `toolChoice` and `functionCall`, and confirm that the return contains no values that do not exist in the materials |

## Three common errors

- Symptom: The name and quantity of the same violation record do not match between the examination room record sheet and the fact record. Cause: The two materials are filled in separately and are not compared uniformly against the field definitions in the exam administration manual.
- Symptom: The manual has been revised, but the record sheet still references old-version fields, and the date formats are inconsistent. Cause: The versions are not synchronized, and the tool parameter introduction has not been updated with the manual.
- Symptom: The return result contains values that do not exist in the materials, or lacks signatures and receipts. Cause: When there are no required parameters, the model fabricates parameter values on its own without asking a follow-up question first.

## How to verify the setup

Acceptance for this feature: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check `toolChoice`, `functionCall`, and the connection status of the tool calling node.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- Open the tool node introduction fields, check whether this description can be understood when read on its own, and check the parameter introduction and whether it is required.
- Run a test with a question missing that field to see whether it asks a follow-up question first rather than fabricating directly; then check the diamond connectors and node status on the canvas.
