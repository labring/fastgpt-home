---
title: Tool Calls and Plugins for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c012-f009
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Tool Calls | Intake
meta_description: Teaching Reviews: review tool calls for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information

## What this category's data looks like

In the district and county teaching research activity and lesson observation/evaluation scenario, materials include three types: teaching research activity notices, lesson observation records, and lesson evaluation minutes. Notices are issued by teaching research institutions and contain the activity name, time, location, participation scope, and receipt requirements; lesson observation records are filled in by observers and contain the instructor, class, topic, observation points, and signature field; lesson evaluation minutes are compiled by the subject group and contain review opinions, improvement suggestions, and the host's signature. These materials are updated by activity cycle and are usually submitted in a concentrated manner before and after activities. When entering the Q&A intake and missing-item follow-up function, notices serve as activity background and field source, lesson observation records serve as process evidence, and lesson evaluation minutes serve as the basis for conclusions; together the three support question-item identification and follow-up questioning. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts, and it is common for the same record to have inconsistent names, quantities, and dates across different materials, unsynchronized versions, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). "Accepted records and completed question items" are then completed by subsequent AI nodes or manual verification. Based on the tool description, parameter description, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Check whether the activity name, date, participation scope, and receipt requirements are consistent with the lesson observation records and lesson evaluation minutes | Open the original notice, compare names, quantities, and dates item by item, and check the receipt and signature fields; on the canvas, check the diamond-shaped connection lines and node status of the tool calling node |
| Lesson observation record | Check whether the instructor, class, topic, observation points, and signature correspond to the notice and lesson evaluation minutes | Open each lesson observation record one by one, check the fields and signature; run a trial with a question sentence missing required fields to see whether it asks follow-up questions first rather than directly fabricating |
| Lesson evaluation minutes | Check whether the review opinions, improvement suggestions, and host's signature are synchronized with the version of the lesson observation records | Open the lesson evaluation minutes, check the signature and version date; check the two items of parameter description and whether required, and confirm they correspond to the business material fields |
| Tool calling node | Check whether the tool description, parameter description, and whether required correspond to the business material fields | Check whether the tool description can be understood on its own; confirm that when there are no required parameters the model may fabricate values, and when there are required parameters but no suitable value in the context it may not call; observe the behavior of `toolChoice` and `functionCall` in the call record |

## Three common errors

- Phenomenon: the name and date of the same activity do not match between the notice and the lesson observation record. Cause: the two materials are filled in separately, and fields are not synchronized based on the notice, resulting in conflicting values being taken during question-item identification.
- Phenomenon: the version of the lesson evaluation minutes is not synchronized, resulting in two versions of review opinions. Cause: related materials were not updated after modification, the tool call returns old-version content, and the basis for follow-up questioning is inconsistent.
- Phenomenon: a lesson observation record is missing a signature or receipt but is still accepted as complete material. Cause: whether required does not correspond to the signature field, and the model may answer directly without follow-up questioning.

## How to verify the setup

Acceptance of this function: run a trial with a question sentence missing required parameters, check the inputs and returns in the call record, and confirm whether it asks follow-up questions or calls according to the description; check the correspondence between `toolChoice`, `functionCall` and the tool description, parameter description, and whether required.

Business test: ask a question sentence missing key information to see whether it asks follow-up questions first before answering; check whether the follow-up content points to specific fields in the notice, lesson observation record, or lesson evaluation minutes.

- Open the tool node description field, check whether the description can be understood when taken out on its own, and check the two items of parameter description and whether required.
- On the canvas, check that the diamond-shaped interface is connected to the target tool, run a trial with a question sentence missing fields, and observe the inputs and returns in the call record.
