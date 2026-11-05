---
title: Tool Calls and Plugins for Training Provider Scheduling and Lesson Records: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c044-f009
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Tool Calls | Checks
meta_description: Training Schedules: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Training Provider Scheduling and Lesson Records: Compare Documents and Locate Differences

## What this category's data looks like

In the scheduling and class-hour deduction scenario of training institutions, materials are mainly of three types: class schedules, class-hour deduction records, and schedule change requests. Class schedules are updated weekly or monthly and contain course name, class, teacher, classroom, date, and time slot; class-hour deduction records are filled in after each class and contain student name, course name, number of class hours, date, and signature; schedule change requests are submitted before the change and contain the original course, new date, new time slot, approval signature, and receipt. When the three types of materials enter the tool calling node, the class schedule serves as the baseline comparison source, the class-hour deduction records serve as the objects to be verified, and the schedule change requests serve as the basis for explaining discrepancies. Field characteristics are concentrated in four categories: name, quantity, date, and signature, and versions are distinguished by file update time and approval status. After the materials enter this feature, the tool calling node is only responsible for initiating calls according to the introduction and parameters and returning results, and does not directly rewrite the materials.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). The discrepancy list is then completed by subsequent AI nodes or manual verification. Based on the tool introduction, parameter introduction, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Compare with class-hour deduction records to see whether course name, date, and time slot are consistent | Open the tool node introduction field and confirm that it clearly states the purpose, when it should be used, and the return result; check the values of `toolChoice` and `functionCall` in the call record |
| Class-hour deduction records | Compare with the class schedule to see whether student name, number of class hours, date, and signature are complete | Open each parameter configuration one by one and check the two items: parameter introduction and whether it is required; run a trial with a question missing the number of class hours to see whether it asks a follow-up question first |
| Schedule change requests | Compare with the class schedule and class-hour deduction records to check the original course, new date, new time slot, and approval signature | On the canvas, check the diamond-shaped interface connections and node status to confirm that it is connected to the target tool; check whether the return result contains values that do not exist in the materials |
| Tool calling node connections | Confirm that the diamond-shaped interface is connected to the target tool and that the node status is normal | Initiate a call with one real record, check the input parameters and return in the call record, and locate fields inconsistent with the ledger |

## Three common errors

- Symptom: the number of class hours for the same student does not match between two materials. Cause: when the class-hour deduction record was filled in, it was not checked against the class schedule, and the parameter introduction did not specify the source of the value.
- Symptom: the new date in the schedule change request is not synchronized with the class schedule version. Cause: the materials are updated at different paces, and the tool calling node did not initiate the call according to the latest version.
- Symptom: the class-hour deduction record lacks a signature or receipt, but the call still returns a result. Cause: although the parameter is marked as required, this does not guarantee that the model will ask a follow-up question; it needs to be guided by the prompt.

## How to verify the setup

Acceptance of this feature: run a trial with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check the three items: `toolChoice`, `functionCall`, and whether the parameter is required.

Business test: use one real record to find fields inconsistent with the ledger, hand them to the reviewer for confirmation, and write them back.

- Open the tool node introduction field, check whether this description can be understood when taken out on its own, and check the two items: parameter introduction and whether it is required.
- Run a trial with a question missing that field to see whether it asks a follow-up question first rather than fabricating directly; then check the diamond-shaped connections and node status.
