---
title: Tool Calls and Plugins for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c026-f009
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Tool Calls | Intake
meta_description: Degree Certificates: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the degree conferral and certificate information reporting scenario. Materials come from three categories: degree application forms, thesis review forms, and defense resolutions. They are updated by batch or semester, and fields include personnel name, thesis title, review conclusion, defense date, signature, and receipt. When the three material categories enter the Q&A intake and missing-item follow-up feature, they play different roles: the degree application form provides basic fields such as applicant identity and degree category, the thesis review form provides review opinions and review date, and the defense resolution provides the voting result and defense date. The name, quantity, and date of the same record across the three materials must be consistent, versions must be synchronized, and signatures or receipts must be complete. During tool calling, the model decides whether to call based on the tool description, parameter descriptions, and whether each parameter is required. If a required parameter is missing, it asks a follow-up question first and does not fabricate directly.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). "Intake records and items to be completed" are then handled by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Check whether the applicant name, degree category, application date, and signature field are complete, and whether the field values are consistent with the thesis review form | Open the tool node description field and confirm that the purpose and returned results can be understood independently; check the parameter descriptions and whether each is required one by one, and run a test with a question missing a signature to see whether it asks a follow-up question first |
| Thesis review form | Check the review conclusion, review date, reviewer signature, and receipt, and whether the name, quantity, and date of the same record match those in the degree application form | Check the diamond-shaped connections and node status on the canvas; check whether the `toolChoice` and `functionCall` related configurations are read correctly, and whether a follow-up question is asked first when a required parameter is missing |
| Defense resolution | Check the defense date, voting result, defense committee signatures, and version synchronization, and whether the date of the same record is consistent with that in the thesis review form | Run a test with a question missing a key field, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; check whether `toolChoice` and `functionCall` are triggered |
| Tool calling node | Check whether the three items—tool description, parameter descriptions, and whether required—correspond to the business material fields, and whether results become mixed up after multiple tools are chained | Check on the canvas whether the diamond-shaped interface is connected to the target tool and whether the node status is normal; run a test with a question missing a required parameter, and check the call records of `toolChoice` and `functionCall` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the thesis review form. Cause: The versions of the two materials are not synchronized, and an old value is retrieved during tool calling.
- Symptom: Values that do not exist in the business materials appear in the returned results. Cause: A parameter is marked as required but the prompt does not guide it, so the model fabricates the parameter value on its own.
- Symptom: A missing signature or receipt is not identified, and an answer is given directly. Cause: The model did not call that tool, or the tool description does not state when it should be used.

## How to verify the setup

Acceptance for this feature: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; check whether `toolChoice` and `functionCall` are triggered as expected, and record the tokens of the quoted text and the number of array items separately.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering.

- Open the tool node description field and check whether this description can be understood when read on its own; open the parameter configurations one by one and check the description and whether required.
- Check the diamond-shaped connections and node status on the canvas; run a test with a question missing that field to see whether it asks a follow-up question first and does not fabricate directly.
