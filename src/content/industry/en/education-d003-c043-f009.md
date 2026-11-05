---
title: Tool Calls and Plugins for Training Provider Admissions and Inquiry Follow-Up: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c043-f009
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Tool Calls | Intake
meta_description: Training Admissions: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Training Provider Admissions and Inquiry Follow-Up: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the enrollment consultation conversion scenario for training institutions, with materials drawn from enrollment brochures, consultation records, and trial class schedules. Enrollment brochures provide course names, class types, start dates, and fee definitions, and serve as a searchable basis when entering the feature; consultation records provide question times, channels, intended directions, and answered content, and serve as the starting point for handling; trial class schedules provide sessions, quotas, and confirmation methods, and are used to fill in missing items. The update cadence rolls forward according to enrollment batches and trial class scheduling, and after a brochure revision the old version may still be referenced. The field characteristics are same names with different values across multiple sources, and dates, quantities, and signed receipts are often missing, so missing items must first be identified before follow-up questions are asked.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). "Handling records and the filled-in question items" are then completed by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course name, class type, start date, fee definition, and brochure version are consistent, and whether the old version is still referenced | Open the tool node description field and check whether the description can be understood on its own; run a test with a question missing the start date to see whether it asks a follow-up question first |
| Consultation record | Whether the question time, channel, intended direction, and answered content match the brochure and trial class schedule, and whether signatures or receipts are complete | Open each parameter configuration one by one and check the two items: parameter description and whether it is required; check the diamond-shaped connections and node status on the canvas |
| Trial class schedule | Whether the session, quota, date, and confirmation method have consistent names, quantities, and dates across the two materials, and whether the versions are synchronized | Run a test with a question missing the quota field, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description |
| Tool calling node | Whether the model decides to call based on the tool description, parameter descriptions, and whether parameters are required, and whether it fabricates values when there are no required parameters | Check the call records of `toolChoice` and `functionCall`, and verify whether the inputs and returns contain values that do not exist in the materials |

## Three common errors

- Symptom: The course name, quantity, and date of the same record do not match between the brochure and the consultation record. Cause: The two materials are updated separately, without field-level comparison and version synchronization.
- Symptom: Values that do not exist in the business materials appear in the returned results. Cause: When there are no required parameters, the model may fabricate parameter values on its own, and the prompt does not guide follow-up questions.
- Symptom: A trial class schedule missing a signature or receipt is still treated as confirmable. Cause: Whether it is required does not correspond to fields that actually exist in the materials, and missing items are not identified.

## How to verify the setup

Acceptance for this feature: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, check the call records of `toolChoice` and `functionCall`, and write only status values that actually exist in this feature.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering.

- Open the tool node description field and check whether this description can be understood when taken on its own; open each parameter configuration one by one and check the two items: description and whether it is required.
- Run a test with a question missing that field to see whether it asks a follow-up question first rather than fabricating directly; check the diamond-shaped connections and node status on the canvas.
