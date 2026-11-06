---
title: Tool Calls and Plugins for School Timetables and After-School Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c010-f009
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Tool Calls | Intake
meta_description: School Timetables: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Timetables and After-School Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the scenario of primary and secondary school timetables and after-school service scheduling. The materials come from the school academic affairs and after-school service management process, and include three types: the master timetable, the teacher assignment table, and the after-school service program table. The master timetable records class, day of the week, period, course name, and assigned teacher; the teacher assignment table records teacher name, classes taught, subject, and weekly class hours; the after-school service program table records program name, participating classes, responsible teacher, start and end dates, and signed receipt. The three types of materials are updated according to the rhythm of being set at the beginning of the semester, adjusted during the semester, and archived at the end of the semester. In terms of fields, situations often occur such as different name spellings, mismatched weekly class hour quantities, inconsistent dates, unsynchronized versions, and missing signatures or receipts. When the materials enter this function, the master timetable is used to check classes and periods, the teacher assignment table is used to check teaching relationships and class hours, and the after-school service program table is used to check programs and date signatures, each serving as the basis for comparison.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), and outputs the tool call result (the input parameters and return in the call record). "Intake records and items to be completed" are then handled by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Check the class, day of the week, period, course name, and assigned teacher fields, and check whether the names, quantities, and dates are consistent with the teacher assignment table | Open the tool node description field and confirm that the purpose and return result can be understood independently; run a test query missing the class field to see whether it asks a follow-up question first; check the values of `toolChoice` and `functionCall` in the call record |
| Teacher assignment table | Check the teacher name, classes taught, subject, and weekly class hours fields, and check whether the teaching relationships and class hour quantities match the master timetable | Open the parameter configuration one by one and check the parameter description and whether it is required; run a test query missing the teacher name field to see whether it asks a follow-up question first rather than directly fabricating |
| After-school service program table | Check the program name, participating classes, responsible teacher, start and end dates, and signed receipt fields, and check whether the version is synchronized and whether signatures are complete | Check the diamond connectors and node status on the canvas; run a test query missing the program name field, observe the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description |
| Tool calling node connections | The diamond interface is connected to the target tool, and the node status and call record are traceable | Check the diamond connectors and node status on the canvas, and check whether the results of multiple tools connected in series interfere with each other |

## Three common errors

- Phenomenon: The course name and weekly class hour quantity for the same record do not match between the master timetable and the teacher assignment table. Cause: The two materials are maintained separately, the field definitions are not unified, and they are not checked against each other when updated.
- Phenomenon: The version of the after-school service program table is not synchronized, and the old dates coexist with the newly adjusted dates. Cause: After adjustment, only one material was changed, the other was not updated in sync, and there is no version marker.
- Phenomenon: The after-school service program table lacks signatures or receipts, so it cannot be confirmed during intake that the program has been confirmed. Cause: The signature step was not included in the material flow, and the receipt was not archived with the table.

## How to verify the setup

This function's acceptance: run a test query missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, check the values of `toolChoice` and `functionCall` in the record, and confirm that no values appear that do not exist in the business materials.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering.

- Open the tool node description field, confirm whether this description can be understood when taken out on its own, and check the parameter description and whether it is required.
- Check the diamond connectors and node status on the canvas, run a test query missing required parameters, and check whether the input parameters and return in the call record are consistent.
