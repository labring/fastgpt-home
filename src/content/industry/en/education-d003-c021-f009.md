---
title: Tool Calls and Plugins for Enrollment Changes and Graduation Eligibility: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c021-f009
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Tool Calls | Intake
meta_description: Graduation Eligibility: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Enrollment Changes and Graduation Eligibility: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenarios of student status changes and graduation eligibility review. The materials include three categories: leave-of-absence/resumption applications, major transfer applications, and graduation review checklists. Leave-of-absence/resumption applications carry start and end dates, change type, and a signature field; major transfer applications carry the original major, target major, assessment conclusion, signature, and receipt; graduation review checklists carry course names, credit counts, review dates, and handler signatures. The materials come from academic affairs system exports and scanned offline forms, and are updated with each semester batch. For the same record, the names, quantities, and dates across the two materials do not match, versions are not synchronized, and signatures or receipts are missing. When entering this feature, leave-of-absence/resumption applications and major transfer applications serve as question context and parameter sources, while graduation review checklists serve as the comparison base ledger; together the three support intake and missing-item follow-up.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). "Intake records and items to be completed" are then handled by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence/resumption application | Whether the start and end dates, change type, and signature field are complete | Open the tool node to review the field descriptions, check the parameter descriptions and whether each is required, and run a test with a question about a missing signature to see whether it asks a follow-up question first |
| Major transfer application | Whether the original major and target major names, assessment conclusion, and receipt are consistent | On the canvas, check the diamond connectors and node status, and inspect the input parameters in the call records of `toolChoice` and `functionCall` |
| Graduation review checklist | Whether the course names, credit counts, review dates, and handler signatures match the other two materials | Run a test with a question about a missing date, and check whether the returned result contains values that do not exist in the materials |
| Tool call node connections | The diamond interface is already connected to the target tool | Open each parameter configuration one by one, check the descriptions and whether each is required, and confirm that the `toolChoice` and `functionCall` call chain has no cross-wiring |

## Three common errors

- Symptom: For the same record, the names, quantities, and dates in the leave-of-absence/resumption application and the graduation review checklist do not match. Cause: The versions of the two materials are not synchronized, and the parameter value sources are not synchronized.
- Symptom: A major transfer application missing a signature or receipt is still accepted as a complete material. Cause: Whether a field is required does not correspond to the business material fields, and the model does not ask a follow-up question.
- Symptom: The returned result contains values that do not exist in the business materials. Cause: When there are no required parameters, the model fabricates parameter values on its own instead of calling the tool according to the descriptions.

## How to verify the setup

Acceptance for this feature: run a test with a question that is missing required parameters, inspect the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls the tool according to the descriptions; check the call records of `toolChoice` and `functionCall`, and inspect the parameter descriptions and whether each is required.

Business test: ask a question that is missing key information, and see whether it asks a follow-up question before answering.

- Open the description field in the tool node, check whether this description can be understood on its own, and verify the parameter descriptions and whether each is required.
- On the canvas, check the diamond connectors and node status, and run a test with a question missing that field to see whether it asks a follow-up question first instead of fabricating directly.
