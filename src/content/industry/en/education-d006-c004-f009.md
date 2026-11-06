---
title: Tool Calls and Plugins for Kindergarten and Family Communication: Track Progress and Check Statistics
slug: /en/industry/education-d006-c004-f009
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Tool Calls | Progress
meta_description: Family Communication: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten and Family Communication: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the kindergarten home-school co-education communication category. Materials come from daily class records, parent notice receipts, teacher observation notes, and commitment item lists. The update cadence is summarized weekly, and fields include commitment items and response times, child performance descriptions, parent request categories, and notice delivery status. When these materials enter the tool calling and plugin feature, each has a different role: the commitment item list is used to check whether response times are missing, observation notes are used to compare whether child performance descriptions are consistent, parent request records are used to check whether feedback is categorized, and notice receipts are used to confirm delivery status. The tool calling node decides whether to call based on the tool introduction and parameter introduction, and returns the inputs and returns in the call record for subsequent verification.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). The "progress table and statistical criteria description" is then completed by a subsequent AI node or manual verification. The model judges whether to call based on the tool introduction, parameter introduction, and whether parameters are required. When there are no required parameters, it may fabricate parameter values on its own.

| Object | Check | Verification action |
| --- | --- | --- |
| Commitment item list | Whether commitment items and response times appear in pairs; a missing response time means no response | Open the tool node introduction field and check whether the purpose and return result are stated; run a test with a question missing the response time and see whether the call record asks a follow-up question first |
| Child observation notes | Whether the child performance description is consistent with the observation record; if the wording does not match the observation record, it is inconsistent | Check the parameter introduction and whether it is required one by one, and confirm they correspond to the note fields; check the diamond connectors and node status on the canvas |
| Parent request records | Whether the parent request category falls into one of the three categories: notice delivery, response time, or performance description | Run a test with a question missing the category field and see whether the return result contains values that do not exist in the business materials; check the call records of `toolChoice` and `functionCall` |
| Notice receipts | Whether the notice delivery status matches the receipt record; uncategorized feedback is marked separately | Check whether the tool calling node connector is connected to the target tool, and check whether the inputs and returns in the call record are mixed up |

## Three common errors

- Phenomenon: A commitment item has no response time in the record, but the weekly report total still counts it as responded. Cause: The statistical criteria do not list missing response time as a separate exception, and the tool return result does not mark this field.
- Phenomenon: The progress table uses the performance description despite conflicting evidence in the observation record. Cause: The observation note fields were not checked during tool calling, and the return result directly entered the total.
- Phenomenon: Parent requests are not categorized, and notice delivery items are mixed into the statistics. Cause: The parameter introduction does not state the category values, and the model fabricates parameter values on its own when calling.

## How to verify the setup

Acceptance for this feature: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check the behavior of `toolChoice` and `functionCall` in the call record.

Business test: use one week of records to verify the total, and see whether the criteria and exceptions are clearly stated; check whether the four items—commitment items and response times, child performance descriptions, parent request categories, and notice delivery—match up.

- Open the tool node introduction field, check whether this description can be understood when taken out on its own, and check the parameter introduction and whether it is required.
- Check the diamond connectors and node status on the canvas, and run a test with a question missing that field to see whether it asks a follow-up question first instead of fabricating directly.
