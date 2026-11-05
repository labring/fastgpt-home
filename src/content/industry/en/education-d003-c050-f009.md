---
title: Tool Calls and Plugins for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c050-f009
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Tool Calls | Intake
meta_description: Foreign Teachers: review tool calls for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of foreign teacher appointment and course scheduling. Materials include appointment contracts, work permit materials, and course schedules. Appointment contracts provide fields for position, appointment period, signature, and receipt; work permit materials provide permit number, validity period, and issue date; course schedules provide course name, number of class hours, class dates, and department signature. Materials come from uploads by the person handling the case and system synchronization, updated by appointment batch or semester. The same record may have inconsistent names, quantities, or dates across two materials, with versions not synchronized or missing signature receipts. When materials enter the tool calling node, each serves as a source of parameter values and a basis for follow-up questions. The model decides whether to call based on the tool description, parameter description, and whether it is required, and the returned results are used for subsequent verification.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call results (the inputs and returns in the call record). "Intake records and items to be completed" are then handled by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Check whether the contract name, appointment period dates, and signature receipt fields are consistent with the work permit materials | Open the contract fields and signature page, compare the name, dates, and receipt of the same record, and check the value sources of `toolChoice` and `functionCall` in the call record |
| Work permit materials | Check whether the permit number, validity period, and issue date correspond to the contract appointment period | Verify the permit number, validity period, and issue date item by item, check the two items of parameter description and whether it is required, and confirm whether a follow-up question is asked first when fields are missing |
| Course schedule | Check whether the course name, number of class hours, class dates, and department signature match the contract position | On the canvas, check the diamond interface connections and node status, check the correspondence between course fields and contract position, and confirm the `toolChoice` call record |
| Tool calling node connections | Check that the diamond interface is connected to the target tool and the node status is executable | On the canvas, check the diamond connections and node status, and check whether results from multiple tools in series are mixed up with each other |

## Three common errors

- Symptom: values that do not exist in the business materials appear in the returned results. Cause: when there are no required parameters, the model may fabricate parameter values on its own, and the tool description and parameter description do not clearly state the value sources.
- Symptom: the name, quantity, or date of the same record do not match between the contract and the course schedule. Cause: the versions of the two materials are not synchronized, and the parameter description does not correspond one-to-one with the material fields.
- Symptom: the model does not call the tool and directly gives an answer. Cause: when there are required parameters but the context has no suitable value, it may not call, and the prompt does not guide the user to supply the parameters first.

## How to verify the setup

Acceptance of this feature: run a test with a question missing required parameters, check the inputs and returns in the call record, confirm whether it asks a follow-up question or calls according to the description, and check the three items of `toolChoice`, `functionCall`, and whether the parameter is required.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering.

- Open the tool node description field, check whether this description can be understood on its own, and verify the two items of parameter description and whether it is required.
- Run a test with a question missing that field, see whether it asks a follow-up question first rather than fabricating directly, and verify the diamond connections and node status.
