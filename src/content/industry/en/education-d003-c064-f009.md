---
title: Tool Calls and Plugins for University Laboratory Safety Classification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c064-f009
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Tool Calls | Intake
meta_description: Lab Safety Categories: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for University Laboratory Safety Classification: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the university laboratory safety grading and classification scenario, with materials drawn from three types: the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table is registered room by room per laboratory, with fields including laboratory name, room number, hazard source category, risk level, filing date, and responsible person's signature; the hazard source list records entries by item, including name, quantity, storage location, control measures, and verification date; the safety responsibility statement is signed by level, including responsible person, scope of responsibility, signing date, and receipt. In terms of update cadence, the grading and classification table changes with laboratory renovations or newly added equipment, the hazard source list changes with reagent and equipment ledgers, and responsibility statements are re-signed per academic year or personnel adjustment. When the materials enter the Q&A intake and missing-item follow-up function, the grading and classification table is used to confirm laboratory identity and risk level, the hazard source list is used to check specific entries and quantities, and the safety responsibility statement is used to confirm the responsible person and receipt status; together the three support missing-item identification and follow-up questioning.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). "The accepted record and the items to be completed" are then handled by a subsequent AI node or manual verification. Based on the tool description, parameter description, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the name, room number, risk level, filing date, and responsible person's signature are complete | Check the fields in the table room by room, compare whether the laboratory name and room number in the hazard source list are consistent, and check whether the signature column and date column are empty |
| Hazard source list | Whether the name, quantity, storage location, verification date, and control measures correspond to the grading and classification table | Check the entry names and quantities one by one, compare whether the dates in the two materials are consistent, and check whether the version numbers are synchronized |
| Safety responsibility statement | Whether the responsible person, scope of responsibility, signing date, and receipt are complete | Check the signing level and scope of responsibility, check whether the receipt has been returned, and confirm whether the responsible person is consistent with the responsible person in the grading and classification table |
| Tool calling node connections | Whether the diamond interface is connected to the target tool, and whether the node status is ready | Check the diamond connections and node status on the canvas, and confirm that the tool description, parameter description, and whether-required fields are all filled in |

## Three common errors

- Symptom: The name and quantity for the same laboratory do not match between the grading and classification table and the hazard source list. Cause: The two materials were filed by different personnel at different times, lacking a unified numbering and cross-checking step.
- Symptom: The responsibility statement version is not synchronized, and the signing date and receipt are missing. Cause: After personnel adjustments, re-signing was not done in time, the old version was still in circulation, and the receipt was not archived.
- Symptom: The model did not call the tool and directly gave an answer. Cause: The tool description did not state when it should be used, or the required parameters had no suitable values in the context, so the model chose to skip it.

## How to verify the setup

Acceptance of this function: run a trial with a question missing required parameters, check the inputs and returns in the call record, and confirm whether it follows up with a question or calls according to the description; check the three items of tool description, parameter description, and whether required, verify the values of `toolChoice` and `functionCall`, and confirm that `toolChoice` has not been mistakenly set to forced calling.

Business test: ask a question missing key information and see whether it follows up with a question before answering.

- Open each parameter configuration one by one, check the description and whether-required items, and run a trial with a question missing that field to see whether it follows up with a question first rather than directly fabricating.
- Check the diamond connections and node status on the canvas, check whether the tool description can be understood when taken out on its own, and confirm that the returned result contains no values that do not exist in the business materials.
