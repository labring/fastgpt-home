---
title: Tool Calls and Plugins for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c001-f009
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Tool Calls | Intake
meta_description: Kindergarten Care: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on kindergarten childcare daily life management. The source materials are three types of records formed in the daily operation of the kindergarten: the daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule is updated weekly or monthly, and its fields include activity name, start and end time, responsible person, date, and signature; morning and afternoon check records are filled in daily, and their fields include child name, body temperature, throat, hand, foot, and mouth observation, abnormal marking, date, and teacher signature; child health observation records are updated per instance or per day, and their fields include observation time, symptom description, handling method, parent receipt, and signature. When these three types of materials enter this feature, their roles differ: the schedule provides the time and activity baseline, morning and afternoon check records provide the day's screening results, and health observation records provide the basis for individual abnormalities and follow-up. Field characteristics are concentrated in four items: name, quantity, date, and signature. The same record often has mismatched name, quantity, and date across two materials, versions are not synchronized, and signatures or receipts are missing.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), and outputs the tool call result (the input parameters and return in the call record). "Accepting records and completing missing items" is then completed by subsequent AI nodes or manual verification. Based on the tool description, parameter description, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether the activity name, start and end time, responsible person, date, and signature are consistent with the morning and afternoon check records | Open the tool node description fields and check whether the schedule fields can be covered by the tool parameters; run a test with a question missing the date to see whether it asks a follow-up first |
| Morning and afternoon check records | Whether the child name, body temperature, abnormal marking, date, and teacher signature match the health observation records | Open each parameter configuration one by one and check the description and whether it is required; check whether values that do not exist in the materials appear in the `functionCall` return |
| Child health observation records | Whether the observation time, symptom description, handling method, parent receipt, and signature are complete | Check the diamond connectors and node status on the canvas, and confirm that the call records of `toolChoice` and `functionCall` are traceable |
| Tool calling node connections | The diamond interface is connected to the target tool, and the node status is normal | Check whether the tool description can be understood on its own, and check whether results from multiple tools connected in series interfere with each other |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match across two materials. Cause: The schedule and morning and afternoon check records are not synchronized in version, and the field value sources differ.
- Phenomenon: Values that do not exist in the business materials appear in the returned result. Cause: When there are no required parameters, the model fabricates parameter values on its own without asking a follow-up first.
- Phenomenon: Materials missing signatures or receipts are accepted directly. Cause: Parameters are not marked as required, the model does not call the tool, and it directly gives an answer.

## How to verify the setup

Feature acceptance: run a test with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up or calls according to the description; check whether `toolChoice` and `functionCall` appear in the call record.

Business test: ask a question missing key information and see whether it asks a follow-up before answering.

- Open the description field in the tool node, check whether this description can be understood when taken out on its own, and check the parameter description and whether it is required.
- Run a test with a question missing that field to see whether it asks a follow-up first instead of fabricating directly; check the diamond connectors and node status on the canvas.
