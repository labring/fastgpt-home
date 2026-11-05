---
title: Tool Calls and Plugins for Research Ethics Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c062-f009
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Tool Calls | Intake
meta_description: Research Ethics: review tool calls for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Research Ethics Review: Handle Questions and Collect Missing Information

## What this category's data looks like

In the research ethics review scenario, materials entering the Q&A intake and missing-item follow-up stage are usually of three types: ethics review applications, informed consent form templates, and risk assessment forms. These materials come from submissions by researchers or internal circulation within the institution, and are repeatedly submitted as protocols are revised and versions are updated. Fields include project name, research start and end dates, signature and receipt dates, number of subjects, risk level, etc. The ethics review application is used to confirm the scope of intake and the routing to the responsible party; the informed consent form template is used to check the signature block and version consistency; the risk assessment form is used to check the risk description and date signatures. In the same record, the three types of materials often show mismatches in names, quantities, and dates, with versions not synchronized or signatures and receipts missing. Therefore, at the intake stage it is necessary to first identify missing items and follow up to complete them, and then forward to the responsible person for handling.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), and outputs the tool call result (the inputs and returns in the call record). "The intake record and the questions to be completed" are then handled by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the project name, research start and end dates, signature and receipt are complete, and whether they match the informed consent form template and risk assessment form | Open the tool node description field and check the purpose and return result; run a test with a question missing the project name to see whether it first follows up, then check the inputs and returns in the call record |
| Informed consent form template | Whether the signature block, version date, and number of subjects are consistent with the ethics review application, and whether signatures or receipts are missing | Open each parameter configuration one by one and check the description and whether it is required; confirm that when there is a required parameter but no value in the context, the model does not directly fabricate one, and check the content returned by `functionCall` |
| Risk assessment form | Whether the risk level, assessment date, and signature correspond to the ethics review application and informed consent form template, and whether the version is synchronized | Check the diamond-shaped connections and node status on the canvas, and confirm that the tool calling node connection is linked to the target tool; check whether the `toolChoice` and `functionCall` records are crossed |
| Tool calling node | Whether it decides to call based on the tool description and whether parameters are required, and whether fabricated values appear when there are no required parameters | Run a test with a question missing key information, check the inputs and returns in the call record, and confirm whether it follows up or calls according to the description |

## Three common errors

- Symptom: In the same record, the project name, number of subjects, or dates in the ethics review application and the informed consent form template do not match. Cause: Missing items were not identified and followed up, and the model answered directly.
- Symptom: The version of the risk assessment form is not synchronized, and the intake record references old dates and signatures. Cause: Values that do not exist in the business materials appear in the tool return result, and no follow-up was made to complete them first.
- Symptom: The informed consent form template is missing a signature or receipt but is still treated as complete material and forwarded to the responsible person. Cause: Required parameters did not trigger a follow-up, and the prompt did not guide the user to provide the parameters.

## How to verify the setup

Acceptance of this feature: run a test with a question missing required parameters, check the inputs and returns in the call record, and confirm whether it follows up or calls according to the description; at the same time, check whether `toolChoice` and `functionCall` leave inputs and returns in the call record.

Business test: submit a question missing key information and see whether it follows up before answering, rather than directly giving an answer or fabricating parameter values.

- Open the description field in the tool node, check whether this description can be understood on its own, and confirm that the parameter description and whether it is required correspond to the business material fields.
- Run a test with a question missing that field to see whether it first follows up rather than directly fabricating; then check the diamond-shaped interface connections and node status to confirm that after multiple tools are chained, the results do not cross.
