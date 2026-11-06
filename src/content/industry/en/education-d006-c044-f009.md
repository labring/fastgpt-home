---
title: Tool Calls and Plugins for Training Provider Scheduling and Lesson Records: Track Progress and Check Statistics
slug: /en/industry/education-d006-c044-f009
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Tool Calls | Progress
meta_description: Training Schedules: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Training Provider Scheduling and Lesson Records: Track Progress and Check Statistics

## What this category's data looks like

Materials for scheduling and class-hour deduction in training institutions mainly come from three types: class schedules, class-hour deduction records, and class-change requests. Class schedules are updated weekly or monthly and include course name, class, teacher, classroom, and time slot; class-hour deduction records are registered one by one and include student, course, number of class hours, date, and signature or receipt; class-change requests include the original time slot, new time slot, approval opinion, and signature. When these three types of materials enter the tool call and plugin function, their roles differ: the class schedule provides the scheduling baseline, the class-hour deduction records provide the actual consumption details, and the class-change requests provide the basis for changes. The update rhythm is that the class schedule comes out first, class-hour deduction is registered during class, and class changes are initiated at any time; before the weekly or monthly report, the three must be aligned. Field characteristics are concentrated in four items: name, quantity, date, and signature. In different materials, the same record often shows inconsistent name spelling, inconsistent class-hour counts, misaligned dates, and missing signatures or receipts. The tool call node needs to determine whether to call and which fields to take based on the tool introduction, parameter introduction, and whether it is required.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). The "progress table and statistical scope description" is then completed by subsequent AI nodes or manual verification. The model determines whether to call based on the tool introduction, parameter introduction, and whether the parameter is required. When there are no required parameters, it may fabricate parameter values on its own; when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Whether the class schedule fields, dates, and signatures match the class-hour deduction records and class-change requests; whether names, quantities, and dates are consistent | Open the tool node introduction fields and verify the class schedule name, class, and time slot; run a test with a question missing a required parameter to see whether it asks a follow-up question first; verify the call records of `toolChoice` and `functionCall` |
| Class-hour deduction records | Whether the class-hour deduction record fields, dates, and signatures match the class schedule and class-change requests; whether the name, quantity, and date of the same record are consistent | Open the parameter configurations one by one and verify the two items: introduction and whether required; check whether the return result contains values that do not exist in the materials; verify the `functionCall` input parameters and return |
| Class-change requests | Whether the class-change request fields, dates, and signatures match the class schedule and class-hour deduction records; whether versions are synchronized and whether signatures or receipts are missing | Verify the diamond connectors and node status on the canvas; run a test with a question missing that field to see whether it asks a follow-up question first; verify whether `toolChoice` is called according to the introduction |
| Tool call node connections | Whether the diamond interface is connected to the target tool; whether results from multiple tools connected in series interfere with each other | Verify the diamond connectors and node status on the canvas; check whether the return result contains values that do not exist in the business materials |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the class schedule and the class-hour deduction records. Cause: The field scope was not written into the header, and the tool call node did not verify according to the introduction when taking fields.
- Symptom: The class-change request and class schedule versions are not synchronized, and the old time slot is still referenced. Cause: The tool introduction did not specify when it should be used, and the model took the old version when determining whether to call based on the context.
- Symptom: The class-hour deduction record lacks a signature or receipt, but the statistical total still includes it. Cause: Whether the parameter is required was not mapped to the business material fields, and when a required parameter was missing, the model did not ask a follow-up question and directly fabricated a value.

## How to verify the setup

Acceptance of this function: run a test with a question missing a required parameter, verify the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; verify `toolChoice`, `functionCall`, and the connection status of the tool call node.

Business test: use one week of records to verify the total, and see whether the scope and exceptions are clearly written; check whether the fields, dates, and signatures of the class schedule, class-hour deduction records, and class-change requests match.

- Open the tool node introduction fields and check whether this description can be understood when taken out on its own; open the parameter configurations one by one and verify the two items: introduction and whether required.
- Run a test with a question missing that field to see whether it asks a follow-up question first instead of directly fabricating; verify the diamond connectors and node status on the canvas.
