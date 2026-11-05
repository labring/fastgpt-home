---
title: Tool Calls and Plugins for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c019-f009
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Tool Calls | Intake
meta_description: Course Scheduling: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information

## What this category's data looks like

The material on this page comes from the course selection, scheduling, and classroom resource scheduling business: three categories—course offering plans, scheduling tables, and course selection rules. Course offering plans include course name, credits, week numbers, and the instructor's signature; scheduling tables include class, classroom, time slot, capacity, and version number; course selection rules include selection batch, priority, withdrawal/change deadline, and receipt. The material is updated by the academic affairs office and departments according to the semester rhythm, and versions are synchronized by date and signature. When entering the Q&A intake and missing-item follow-up function, course offering plans serve as the basis for courses and credits, scheduling tables serve as the basis for classrooms and time slots, and course selection rules serve as the basis for eligibility and procedures; together the three support the intake record and the items to be completed, and the absence of any one triggers a follow-up question.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). "The intake record and the items to be completed" are then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether the course name, credits, week numbers, and instructor's signature are complete, and whether the name and quantity of the same record match across the two materials | Open the tool node introduction fields, check the course and credit parameter introductions and whether they are required, and run a test query missing the week number to see whether it asks a follow-up question first |
| Scheduling table | Whether the classroom, time slot, capacity, and version number are consistent, and whether the date and signature match when the version is not synchronized | Open each parameter configuration one by one, check the classroom and time slot introductions and whether they are required; check the diamond-shaped connections and node status on the canvas |
| Course selection rules | Whether the selection batch, priority, withdrawal/change deadline, and receipt are complete, and whether a follow-up question is asked when the signature or receipt is missing | Run a test query missing the batch field, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction |
| Tool call node connections | The diamond-shaped interface is already connected to the target tool, and the node status is consistent with the target tool | Check the diamond-shaped connections and node status on the canvas, and check the values of `toolChoice` and `functionCall` in the call record |

## Three common errors

- Symptom: The name and quantity of the same course do not match between the course offering plan and the scheduling table. Cause: The versions of the two materials are not synchronized, the date and signature are not aligned, and the tool returns a value that does not exist in the materials.
- Symptom: The scheduling table is missing classroom capacity or the course selection rules are missing a receipt, but the model still answers directly. Cause: Although the parameters are marked as required, the prompt does not guide a follow-up question, and the model does not call the tool.
- Symptom: After multiple tools are chained, the results interfere with each other. Cause: The tool introduction does not state what result is returned, and the input parameters and return in the call record are not checked item by item.

## How to verify the setup

Acceptance for this function: run a test query missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; check the values of `toolChoice` and `functionCall` in the call record.

Business test: ask a question missing key information and see whether it asks a follow-up question first before answering.

- Open the tool node introduction fields, check whether this description can be understood when taken out on its own, and check each parameter's introduction and whether it is required.
- Run a test query missing that field to see whether it asks a follow-up question first rather than making things up directly; check the diamond-shaped connections and node status on the canvas.
