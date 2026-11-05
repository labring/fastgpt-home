---
title: Tool Calls and Plugins for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c044-f009
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Tool Calls | Intake
meta_description: Training Schedules: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the scheduling and class-hour deduction scenario of training institutions, with materials drawn from three types: class schedules, class-hour deduction records, and class-change requests. Class schedules provide course, class, teacher, and time fields; class-hour deduction records provide fields for actual attendance, deducted class hours, student roster, and signature; class-change requests provide fields for the original session, target session, reason for the change, and approval receipt. Materials are updated weekly or per session, and versions change with the export time of the academic affairs system. When the three types of materials enter the Q&A intake and missing-item follow-up function, class schedules are used to locate sessions, class-hour deduction records are used to verify deductions and signatures, and class-change requests are used to verify dates and receipts. Field characteristics center on four types: dates, quantities, names, and signatures. The same record may show mismatches in name, quantity, or date across different materials, or versions may be out of sync, or signatures or receipts may be missing.

## Configuration and implementation checks

This step is executed by the tool-calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool-call result (the inputs and returns in the call record). "Intake records and items to be completed" are then handled by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model decides whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | The check column is written to the category verification dimensions: whether the course name, class, teacher, date, and signature fields are complete, and whether the name and date of the same session are consistent across two materials | Open the tool node description fields and verify their purpose, when to use them, and the returned results; run a test query missing the date field to see whether it asks a follow-up question first; check the values of `toolChoice` and `functionCall` in the call record |
| Class-hour deduction record | The check column is written to the category verification dimensions: whether the number of deducted class hours, student roster, signature, or receipt match the class schedule and class-change request, and whether the versions are in sync | Open each parameter configuration one by one and verify the parameter description and whether it is required; run a test query missing the number of deducted class hours to see whether the returned result contains values that do not exist in the materials; check the inputs of the `functionCall` call record |
| Class-change request | The check column is written to the category verification dimensions: whether the dates of the original session and target session, approval signature, or receipt are complete, and whether the name and quantity of the same record are consistent with the class schedule | On the canvas, verify the diamond connectors and node status, and confirm that the tool-calling node is connected to the target tool; run a test query missing the approval receipt field to see whether it asks a follow-up question first instead of directly fabricating; check whether `toolChoice` is triggered |
| Tool-calling node connectors | The check column is written to the category verification dimensions: whether the diamond interface is connected to the target tool, whether the node status is executable, and whether the results of multiple tools connected in series cross over into each other | On the canvas, verify the diamond connectors and node status one by one; run a test query involving both the class schedule and the class-hour deduction record, and check whether the returns of multiple tools in the call record cross over into each other |

## Three common errors

- Symptom: the model did not call the tool and directly gave an answer. Cause: the tool description does not state when to use it or what result it returns, so the model judges from the context that no call is needed.
- Symptom: the returned result contains values that do not exist in the business materials. Cause: when a parameter has no required item, the model may fabricate parameter values on its own, and it also does not ask a follow-up question first when the material is missing that field.
- Symptom: the name, quantity, or date of the same record do not match between the class schedule and the class-hour deduction record. Cause: versions are out of sync, or the class-change request is missing a signature and receipt; marking a parameter as required does not guarantee that the model will ask a follow-up question.

## How to verify the setup

Acceptance of this function: run a test query missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; check `toolChoice`, `functionCall`, and the connector status of the tool-calling node.

Business test: submit a query missing key information and see whether it asks a follow-up question before answering.

- Open the tool node description fields and check whether this description can be understood when taken out on its own, and verify whether the parameter description and whether-it-is-required items correspond to fields that actually exist in the business materials.
- On the canvas, verify the diamond connectors and node status, run a test query missing that field to see whether it asks a follow-up question first instead of directly fabricating, and record the inputs and returns in the call record.
