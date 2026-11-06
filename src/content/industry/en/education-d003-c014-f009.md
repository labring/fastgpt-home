---
title: Tool Calls and Plugins for School Moral Education and Class Teacher Work: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c014-f009
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Tool Calls | Intake
meta_description: Pastoral Education: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Moral Education and Class Teacher Work: Handle Questions and Collect Missing Information

## What this category's data looks like

This page is for school moral education and homeroom teacher work. The materials come from three categories: themed class meeting plans, student comprehensive quality records, and home visit records, updated weekly and at semester milestones. Themed class meeting plans include theme, time, location, host, activity flow, and student signature; student comprehensive quality records include fields such as ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice, along with the homeroom teacher's signature; home visit records include the home visit subject, time, location, purpose, process, parent signature, and receipt. When these three types of materials enter this function, the themed class meeting plan serves as the source of activity facts, the student comprehensive quality record serves as the source of process evaluation fields, and the home visit record serves as the source of home-school communication evidence, together forming the basis for comparison for missing-item identification and follow-up questioning.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). The intake record and the completed follow-up items are then completed by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Whether the theme, time, location, host, activity flow, and student signature are complete, and whether the date and signature correspond | Open the tool node description field and check whether it states the purpose, when it should be used, and what it returns; check each parameter's description and whether it is required; run a test with a question missing the host field to see whether it asks a follow-up question first |
| Student comprehensive quality record | Whether the fields of ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice, as well as the homeroom teacher's signature, are complete, and whether the name, quantity, and date of the same record are consistent across the two materials | Check the two items of parameter description and whether it is required; check the inputs and returns of `toolChoice` and `functionCall` in the call record; run a test with a question missing the signature field |
| Home visit record | Whether the home visit subject, time, location, purpose, process, parent signature, and receipt are complete, and whether the versions are synchronized | Check the diamond connectors and node status on the canvas; check whether the returned result contains values that do not exist in the business materials; run a test with a question missing the receipt field |
| Tool calling node connections | The diamond interface is connected to the target tool, and the node status is normal | Check the diamond connectors and node status on the canvas; confirm that the `toolChoice` and `functionCall` related configurations are consistent with the tool description field |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the themed class meeting plan and the home visit record. Cause: The two materials are updated separately, and field comparison and version synchronization have not been done.
- Symptom: The student comprehensive quality record lacks the homeroom teacher's signature, or the home visit record lacks the parent receipt. Cause: The material collection step does not verify the signature and receipt fields, and missing items are not identified.
- Symptom: The model does not call the tool and directly gives an answer, or the returned result contains values that do not exist in the business materials. Cause: The tool description and parameter descriptions do not state the purpose and values, and required parameters lack guidance.

## How to verify the setup

Acceptance for this function: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; check the inputs and returns of `toolChoice` and `functionCall` in the call record.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering.

- Open the tool node description field, check whether this description can be understood when taken out on its own, and confirm the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, check the two items of description and whether it is required, and run a test with a question missing that field to see whether it asks a follow-up question first instead of directly making things up.
