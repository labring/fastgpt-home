---
title: Tool Calls and Plugins for Student Discipline and Appeals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c023-f009
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Tool Calls | Intake
meta_description: Student Appeals: review tool calls for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Student Discipline and Appeals: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the student disciplinary and appeal handling category. Materials come from three types: disciplinary fact materials, disciplinary decision documents, and appeal statements, with updates advancing along the intake, correction, and appeal nodes. Field characteristics center on names, quantities, dates, and signatures: disciplinary fact materials record conduct and evidence, disciplinary decision documents state the basis and conclusion, and appeal statements present requests and reasons. When the three types of materials enter the Q&A intake and missing-item follow-up feature, each plays a different role: disciplinary fact materials are used to verify conduct descriptions and evidence sources, disciplinary decision documents are used to verify the type of disciplinary action, dates, and delivery signatures, and appeal statements are used to verify appeal requests, deadlines, and receipts. If the name, quantity, or date of the same record does not match across two materials, if versions are not synchronized, or if a signature or receipt is missing, the intake record and the items to be completed will deviate. Therefore, a tool-calling node is needed to compare each material field item by item and turn missing items into follow-up questions.

## Configuration and implementation checks

This step is executed by the tool-calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The "intake record and items to be completed" are then completed by a subsequent AI node or manual verification. Based on the tool description, parameter description, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call the tool.

| Object | Check | Verification action |
| --- | --- | --- |
| Disciplinary fact materials | Check whether the conduct name, quantity, date, and signature are consistent with the disciplinary decision document | Open the tool node description field and check whether this description can be understood on its own; test with a question missing that field to see whether it asks a follow-up first instead of fabricating directly |
| Disciplinary decision document | Check whether the type of disciplinary action, effective date, delivery signature, or receipt are complete | Open each parameter configuration and check the parameter description and whether it is required; check the diamond connectors and node status on the canvas |
| Appeal statement | Check whether the appeal request, deadline, signature, and receipt correspond to the intake record | Test with a question missing that field to see whether it asks a follow-up first; check whether the returned result contains values that do not exist in the business materials |
| Tool-calling node connections | The diamond interface is connected to the target tool, and the node status matches the canvas | Check the diamond connectors and node status on the canvas; check whether results from multiple tools in series interfere with each other |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the disciplinary fact materials and the disciplinary decision document. Cause: The two materials are entered separately and are not compared field by field.
- Symptom: The appeal statement version is not synchronized, and the intake record still references the old request and deadline. Cause: Re-verification is not triggered after the material is updated.
- Symptom: The disciplinary decision document lacks a signature or receipt, but the follow-up directly gives an intake conclusion. Cause: Marking a parameter as required does not guarantee that the model will ask a follow-up; prompt guidance is needed.

## How to verify the setup

Acceptance for this feature: test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up or calls according to the description; check `toolChoice`, `functionCall`, and the tool description field to confirm whether the model directly gives an answer when it does not call the tool.

Business test: ask a question missing key information and see whether it asks a follow-up before answering; check whether the returned result contains values that do not exist in the business materials, and whether results from multiple tools in series interfere with each other.

- Open the description field in the tool node and check whether this description can be understood on its own; open each parameter configuration and check the description and whether it is required.
- Check the diamond connectors and node status on the canvas; test with a question missing that field to see whether it asks a follow-up first instead of fabricating directly.
