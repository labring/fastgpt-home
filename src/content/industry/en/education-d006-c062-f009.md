---
title: Tool Calls and Plugins for Research Ethics Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c062-f009
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Tool Calls | Progress
meta_description: Research Ethics: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Research Ethics Review: Track Progress and Check Statistics

## What this category's data looks like

Research ethics review involves three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. An ethics review application records the project name, review category, acceptance date, lead reviewer, and conclusion; an informed consent form template records the version number, applicable project, revision date, and researcher signature; a risk assessment form records the risk level, assessment date, assessor, and review signature. The three materials often come from different departments and are aggregated and updated weekly or monthly. When entering this feature, the ethics review application serves as the primary record providing the project identifier and dates, while the informed consent form template and risk assessment form serve as related materials providing version, signature, and receipt fields; together the three support progress records and statistical verification.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The progress table and statistical scope description are then completed by subsequent AI nodes or manual verification. The model decides whether to call based on the tool description, parameter descriptions, and whether parameters are required; when there are no required parameters, it may fabricate parameter values on its own, and when there are required parameters but no suitable values in the context, it may not call at all.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the fields, dates, and signatures are complete, and whether the application number and project name can correspond to the other two materials | Open the tool node description and check the purpose, when it should be used, and what results it returns; run a test with a question that is missing a required parameter to see whether it asks a follow-up question first |
| Informed consent form template | Whether the version number, revision date, and researcher signature are consistent with the application record, and whether the version is in sync | Open each parameter configuration one by one, check the parameter description and whether it is required, and confirm that the version field is required |
| Risk assessment form | Whether the risk level, assessment date, assessor, and review signature match the application record, and whether the receipt is missing | Check the diamond connectors and node status on the canvas, and confirm that the nodes containing `toolChoice` and `functionCall` are connected to the target tool |
| Progress table and statistical scope description | Whether the record count and statistical count match, whether the scope is written in the header, and whether exceptions are clearly stated | Use one week of records to verify the totals, and check whether the inputs and returns in the call record contain values that do not exist in the business materials |

## Three common errors

- Symptom: The project name, quantity, and dates of the same record do not match between the ethics review application and the informed consent form template. Cause: The two materials are maintained separately, and no field-level comparison was performed.
- Symptom: The informed consent form template version is not in sync, and the risk assessment form is missing a review signature or receipt. Cause: The revision was not backfilled, and the signature step was not included in the verification.
- Symptom: The model does not call the tool and directly gives an answer, and the returned result contains values that do not exist in the business materials. Cause: The tool description or parameter descriptions are not clearly written, and after multiple tools are chained, the results interfere with one another.

## How to verify the setup

Acceptance of this feature: run a test with a question that is missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, check the connections and status of the nodes containing `toolChoice` and `functionCall`.

Business test: use one week of records to verify the totals and see whether the scope and exceptions are clearly stated; check whether the record count and statistical count match, and whether the scope is written in the header.

- Open the tool node description field and check whether this description can be understood on its own, and whether it clearly states the purpose, when it should be used, and what results it returns.
- Open each parameter configuration one by one, check the parameter description and whether it is required, and confirm that the required parameters correspond to fields that actually exist in the business materials.
