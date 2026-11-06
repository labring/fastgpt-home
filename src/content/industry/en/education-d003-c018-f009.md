---
title: Tool Calls and Plugins for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c018-f009
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Tool Calls | Intake
meta_description: Program Revision: review tool calls for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the undergraduate program revision scenario. The material sources are the program plan, course syllabi, and the credit structure table. The update cadence rolls with revision batches, and the field characteristics center on course names, credit counts, course start dates, and signature receipts. When the program plan enters the function, it serves as the main record; the course syllabi provide course-level support; the credit structure table provides a quantitative and structural cross-reference. The three types of material play different roles in Q&A intake and missing-item follow-up: the program plan is used to determine question-item ownership and version, the course syllabi are used to verify course content and signatures, and the credit structure table is used to verify total credits and distribution. After the material enters the tool calling node, the model decides whether to call based on the tool description, parameter descriptions, and whether parameters are required. The call record retains the input parameters and return values, and the intake record and the completed question items are handed off to subsequent nodes or manual verification.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, the node executes), outputting the tool call result (the input parameters and return values in the call record). The "intake record and completed question items" are then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Check whether course names, credit counts, course start dates, and signature receipts are consistent with the course syllabi | Open the tool node description field and confirm the description states the purpose, when it should be used, and the return result; run a test with a question missing the signature receipt to see whether it asks a follow-up question first |
| Course syllabi | Check whether course names, credit counts, dates, and signatures match the program plan and the credit structure table | Open each parameter configuration one by one, check the parameter description and whether it is required, and confirm they correspond to the material fields |
| Credit structure table | Check whether total credits, distribution, and dates are consistent with the program plan and the course syllabi | On the canvas, check the diamond interface connections and node status, and confirm the tool calling node is connected to the target tool |
| Tool calling node | Determine whether the model decides to call based on the description and required parameters, and does not fabricate values that do not exist in the material | Run a test with a question missing a required parameter, check the input parameters and return values in the call record, and confirm whether it asks a follow-up question or calls according to the description |

## Three common errors

- Symptom: the name, credit count, or date of the same course does not match between the program plan and the course syllabi. Cause: the versions of the two materials are not synchronized, and the field values come from different sources.
- Symptom: dates or signature receipts that do not exist in the material appear in the call return. Cause: when there are no required parameters, the model may fabricate parameter values on its own.
- Symptom: after multiple tools are chained, results cross-contaminate each other, and the intake record and completed question items are mixed with irrelevant fields. Cause: the tool description does not state the return result and applicable boundaries.

## How to verify the setup

This function's acceptance: run a test with a question missing a required parameter, check the input parameters and return values in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, check `toolChoice`, `functionCall`, and the connection status of the tool calling node.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering.

- Open the tool node description field and check whether this description can be understood when taken out on its own, and whether it states the purpose, when it should be used, and what return result it gives.
- Open each parameter configuration one by one, check the parameter description and whether it is required, and run a test with a question missing that field to see whether it asks a follow-up question first.
