---
title: Tool Calls and Plugins for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c045-f009
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Tool Calls | Intake
meta_description: Training Compliance: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for off-campus training compliance filing and penalty response come from three categories: school operating licenses, course filing materials, and fee disclosure. The school operating license provides the entity name, address, validity period, and issuance date; the course filing materials provide the course name, number of class hours, course start and end dates, and the signature of the person in charge; the fee disclosure provides fee items, amounts, disclosure date, and receipt. Materials are updated by batch, and license reissuance, course adjustments, and fee changes each trigger a new version. Field characteristics: the name, quantity, and date of the same record may be inconsistent across the two types of materials; when versions are not synchronized, the old version is still referenced; when a signature or receipt is missing, the material loop cannot be confirmed. When entering the Q&A intake and missing-item follow-up feature, the three types of materials each play a different role: the license is used to verify entity qualification, the course filing materials are used to verify course fields, and the fee disclosure is used to verify fee fields; together they determine whether the question items are complete and whether the case can be transferred to the handler.

## Configuration and implementation checks

This step is executed by the tool-calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). "Intake records and completed question items" are then completed by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model decides whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Whether the name, address, validity period, and issuance date match the course filing materials and fee disclosure | Open the tool node description field and check the license fields against the parameter descriptions and the two items of whether they are required; run a test with a question missing the issuance date to see whether it asks a follow-up first |
| Course filing materials | Whether the course name, number of class hours, course start and end dates, and signature of the person in charge are complete | Open each parameter configuration one by one and check the course field descriptions and whether they are required; check the diamond-shaped connections and node status on the canvas to confirm that the tool-calling node is connected to the target tool |
| Fee disclosure | Whether the fee items, amounts, disclosure date, and receipt are consistent with the license and course filing materials | Run a test with a question missing the receipt field, check the input parameters and return in the call record, and confirm whether it asks a follow-up or calls according to the description; check whether the return result contains values that do not exist in the materials |
| Tool-calling node connections | The diamond-shaped interface is connected to the target tool, and the node status is normal | Check the diamond-shaped connections and node status on the canvas; check whether results from multiple tools connected in series interfere with each other |

## Three common errors

- Symptom: the same course name is written differently in the course filing materials and the fee disclosure, and the quantity and dates do not match. Cause: the two materials are updated separately, no field-level comparison is done, and only one of them is taken during tool calling.
- Symptom: after the license is reissued, the old version is still referenced, and the version of the course filing materials is not synchronized. Cause: the version update does not trigger re-intake, the tool description does not state when it should be used, and the model calls based on the old context.
- Symptom: the fee disclosure is missing a signature or receipt, but the intake record still shows it as complete. Cause: whether it is required is not mapped to the business material fields, the model does not ask a follow-up, and it directly calls and returns according to the description.

## How to verify the setup

Acceptance of this feature: run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up or calls according to the description; check the values of `toolChoice` and `functionCall` in the call record to confirm whether the model decides to call based on the tool description and whether parameters are required.

Business test: submit a question missing key information and see whether it asks a follow-up before answering.

- Open the tool node description field and check whether this description can be understood when taken out on its own, stating the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, check the two items of description and whether it is required, and run a test with a question missing that field to see whether it asks a follow-up first instead of directly fabricating.
