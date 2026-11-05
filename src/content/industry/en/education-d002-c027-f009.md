---
title: Tool Calls and Plugins for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c027-f009
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Tool Calls | Checks
meta_description: Graduate Destinations: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on university employment signing and graduation destination statistics; the materials include employment agreements, graduation destination registration forms, and employer certificates. The employment agreement is signed by the student and the employer and then returned; the graduation destination registration form is summarized and reported by the department; the employer certificate is issued by the hiring employer. The three are updated at different rhythms: the agreement is generated immediately upon signing, the registration form is updated centrally in batches, and the certificate is often submitted later during the receipt stage. When the materials enter tool calling and plugins, each has a different role: the agreement serves as the baseline material for the fact of signing, the registration form serves as the summary material for destination aggregation, and the employer certificate serves as supporting material for the employment relationship. Field characteristics center on name, quantity, date, and signature receipt; the same record may appear inconsistent across different materials due to entry batches, unsynchronized versions, or delayed supplementary submission.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether the name, quantity, date, and signature correspond to the registration form | Open the tool node introduction fields and check whether the return includes the agreement number, signing date, and both parties' signature status |
| Graduation destination registration form | Whether the name, quantity, and date of the same record are consistent with the agreement | Open each parameter configuration one by one, check the introduction and whether it is required, and confirm that the registration form fields correspond to the material fields |
| Employer certificate | Whether the date and receipt align with the registration form and agreement | Check the diamond-shaped connections and node status on the canvas, and inspect whether the certificate receipt fields enter the call record |
| Tool calling node | Whether it asks a follow-up question first when a required parameter is missing | Run a test with a question missing that field and see whether it asks a follow-up question first instead of directly fabricating the parameter value |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the agreement and the registration form. Cause: The two materials were entered in different batches, and the fields were not compared item by item.
- Symptom: The registration form version is not synchronized, and old-version fields are still being called. Cause: After the material was updated, it was not written back, and tool calling still uses historical inputs.
- Symptom: The employer certificate lacks a signature or receipt, but the returned result still shows as complete. Cause: Required parameters do not correspond to the material fields, and the model did not ask a follow-up question.

## How to verify the setup

This feature's acceptance: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check the values of `toolChoice` and `functionCall` in the call record, and inspect whether the return contains values that do not exist in the materials.

Business test: use one real record to find fields inconsistent with the ledger, and compare name, quantity, date, and signature receipt item by item.

- Open each parameter configuration one by one, check the introduction and whether it is required, and confirm that the required items correspond to the material fields.
- Check the diamond-shaped connections and node status on the canvas, and confirm that the tool calling node is connected to the target tool.
