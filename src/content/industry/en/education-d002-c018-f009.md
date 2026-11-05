---
title: Tool Calls and Plugins for Undergraduate Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c018-f009
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Tool Calls | Checks
meta_description: Program Revision: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Undergraduate Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

Undergraduate program revision involves three types of materials: program plans, course syllabi, and credit structure tables. Program plans come from the academic affairs system and include program name, course code, credits, semester offered, revision date, and signature field; course syllabi are submitted by departments and include course name, class hours, assessment method, author, and review signature; credit structure tables are compiled by academic affairs and include the number of each type of course, total credits, version number, and receipt. Materials enter the tool calling node by revision batch, with the program plan as the comparison baseline and the course syllabi and credit structure tables as the objects to be verified; field characteristics are concentrated in four categories: name, quantity, date, and signature. The update rhythm is centralized submission for each revision round, and versions are distinguished by batch number.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. The three items—tool description, parameter description, and whether required—determine whether the model initiates a call.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the name, quantity, date, and signature are consistent with the ledger | Open the tool node description field and check whether the description can be understood on its own; check the parameter description and whether required items, and confirm that course code, credits, revision date, and signature status all have corresponding parameters |
| Course syllabus | Whether the course name, class hours, assessment method, signature, and receipt are consistent with the program plan | Open the parameter configuration one by one and check the description and whether required; run a test query missing the course code to see whether it asks a follow-up question first rather than fabricating directly |
| Credit structure table | Whether the number of each type of course, total credits, version number, and receipt are consistent with the program plan | Check the diamond connectors and node status on the canvas, and confirm that the tool calling node is connected to the target tool; check whether the `toolChoice` and `functionCall` related configurations match the model capabilities |
| Discrepancy list | Whether the name, quantity, and date of the same record do not match across the two materials | Run a test with one real record, check the input parameters and return in the call record, and confirm that the returned result does not contain values that do not exist in the business materials |

## Three common errors

- Symptom: The same course has mismatched names in the program plan and course syllabus. Cause: The two materials were entered by different personnel, were not uniformly compared by course code, and the model gave an answer directly without calling the tool.
- Symptom: The version of the credit structure table was not synchronized, and the quantity and date were still from the previous batch. Cause: The tool calling node did not retrieve data by batch number, the parameter description did not state the value source, and the model fabricated parameter values on its own.
- Symptom: The course syllabus lacked a signature or receipt, and the discrepancy list did not mark it. Cause: Whether required did not correspond to the signature field, and after multiple tools were chained, the results interfered with each other, making it impossible for the reviewer to locate the issue.

## How to verify the setup

Acceptance of this feature: run a test query missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; check the `toolChoice` and `functionCall` related configurations, and confirm whether the model fabricates parameter values on its own when there are no required parameters.

Business test: use one real record to find fields inconsistent with the ledger, check the name, quantity, date, and signature across the program plan, course syllabus, and credit structure table, and record the discrepancy list entries.

- Open the parameter configuration one by one, check the description and whether required items, and confirm that they correspond to fields that actually exist in the business materials
- Check the diamond connectors and node status on the canvas, and confirm that the tool calling node is connected to the target tool
