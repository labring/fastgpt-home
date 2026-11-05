---
title: Tool Calls and Plugins for Kindergarten and Family Communication: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c004-f009
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Tool Calls | Intake
meta_description: Family Communication: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Kindergarten and Family Communication: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for the kindergarten home-school co-education communication category mainly come from class notices, morning and afternoon health checks and activity observation records, requests submitted by parents in group chats or forms, and the kindergarten's registration of committed items and response times. Sources are scattered across teachers' handwritten records, group chat text, form receipts, and existing ledgers, and the update rhythm follows daily arrival and departure and activity milestones. Common fields include child name, class, observation time, performance description, parent request category, commitment content, response time, and notice delivery status. When materials enter the tool calling and plugin feature, notices and observation records serve as the factual basis, parent requests serve as the input to be classified and followed up on, and commitments and response times serve as fields that must be aligned in the intake record; missing-item follow-up revolves around these fields, and whether an answer has a material basis is also determined by these materials.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). "Intake records and completed follow-up questions" are then handled by subsequent AI nodes or manual review. Based on the tool description, parameter descriptions, and whether parameters are required, the model judges whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Tool description | States the purpose, when it should be used, and what result it returns; it can be understood when read on its own | Open the description field in the tool node and check sentence by sentence whether it covers the purpose, trigger timing, and return structure |
| Parameter description | Each parameter states its meaning and values, and corresponds to fields such as committed items, response time, child performance description, parent request category, and notice delivery | Open each parameter configuration one by one, check the description and whether it is required, and confirm that required items correspond to fields that actually exist in the business materials |
| Whether required | Corresponds to fields that actually exist in the business materials; when the field is missing, ask a follow-up question first | Run a test with a question that lacks this field and see whether it asks a follow-up question first rather than fabricating directly; also observe how `toolChoice` and `functionCall` appear in the call record |
| Tool calling node connections | The diamond interface is already connected to the target tool, and the node status can be checked | Check the diamond connections and node status on the canvas, and confirm that results do not cross wires when multiple tools are chained |

## Three common errors

- Symptom: a parent asks when a certain commitment will be responded to, but the answer gives a time that is not in the materials. Cause: the parameter is marked as required, which does not guarantee the model will ask a follow-up question; it depends on prompt guidance, and the model may fabricate parameter values on its own.
- Symptom: the child performance description is inconsistent with the observation record, and two versions appear in the intake record. Cause: the tool return result contains values that do not exist in the business materials, and subsequent nodes do not check back against the original records.
- Symptom: parent requests are not categorized, and commitments that have not been responded to are not identified as missing items. Cause: after multiple tools are chained, results cross wires with each other, and missing-item follow-up does not check field by field.

## How to verify the setup

Feature acceptance: run a test with a question that lacks a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; also check whether `toolChoice` and `functionCall` appear in the call record, and whether the return contains values that do not exist in the business materials.

Business test: ask a question that lacks key information, see whether it asks a follow-up question before answering, and check whether the follow-up question falls on the dimensions of committed items and response time, child performance description, parent request category, and notice delivery.

- Open the description field in the tool node, check whether this description can be understood when read on its own, and confirm that the diamond interface is already connected to the target tool.
- Open each parameter configuration one by one, check the description and whether it is required, then run a test with a question that lacks this field and see whether it asks a follow-up question first rather than fabricating directly.
