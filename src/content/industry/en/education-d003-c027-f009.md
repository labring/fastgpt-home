---
title: Tool Calls and Plugins for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c027-f009
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Tool Calls | Intake
meta_description: Graduate Destinations: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses question intake and missing-item follow-up for university employment contract signing and graduation destination statistics. The materials come from three categories: employment agreements, graduation destination registration forms, and employer certificates. The employment agreement is signed by the student and the employer and then enters the intake process, and is used to verify the signing parties, position, and date; the graduation destination registration form is compiled by the department and carries the destination category, employer name, and registration information; the employer certificate is issued by the employer and supplements the acceptance letter, receipt, and signature. The three material categories are updated by batch, and the update pace accelerates during graduation season and peak signing periods. The fields are characterized by name, employer name, unified social credit code, signing date, signature, and receipt. When materials enter this function, the tool calling node is responsible for retrieving data as needed, and the intake records and completed follow-up questions are handled by subsequent nodes or manual verification.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), and outputs the tool call result (the input parameters and return in the call record). "Intake records and completed follow-up questions" are then completed by subsequent AI nodes or manual verification. The model decides whether to call based on the tool description, parameter description, and whether the parameter is required. When required parameters are missing, it should first ask a follow-up question.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Check whether the signing parties, position, signing date, and signature are complete | Open the tool node description field and confirm that the purpose, call timing, and return result can be understood independently; run a trial with a question missing the signing date, and check whether the input parameters of `toolChoice` and `functionCall` first ask a follow-up question |
| Graduation destination registration form | Check whether the destination category, employer name, quantity, and date are consistent with the employment agreement | Open each parameter configuration one by one and check the two items: description and whether required; compare the name, quantity, and date of the same record in the two materials, and see whether the return contains values that do not exist in the materials |
| Employer certificate | Check whether the acceptance letter, receipt, and signature are missing items | Check the diamond connector and node status on the canvas, and confirm that the tool calling node is connected to the target tool; run a trial with a question missing the receipt, and see whether it first asks a follow-up question before answering |
| Tool calling node connection | The diamond interface is connected to the target tool and the node status is normal | Check whether results cross over between multiple tools after they are connected in series, and check whether the input parameters and return in the call record correspond to the material fields |

## Three common errors

- Symptom: The employer name, quantity, and date of the same record do not match between the employment agreement and the graduation destination registration form. Cause: The two materials are entered separately, and field-level comparison and version synchronization are not performed.
- Symptom: The employer certificate is missing a signature or receipt, but the intake record still shows received. Cause: The missing item is not identified as a required parameter, and the model answers directly without asking a follow-up question.
- Symptom: The return result contains values that do not exist in the business materials. Cause: When there are no required parameters, the model may fabricate parameter values on its own, and the tool description does not state the source of the values.

## How to verify the setup

This function's acceptance: run a trial with a question missing required parameters, check the input parameters and return in the call record, confirm whether it asks a follow-up question or calls according to the description, and check whether the values of `toolChoice` and `functionCall` come from the material fields.

Business test: ask a question missing key information, see whether it first asks a follow-up question before answering, whether the missing item is identified and followed up on, whether the answer has a material basis, and then forward it to the handler.

- Open the tool node description field, check whether this description can be understood when taken out on its own, and confirm that the parameter description and whether required items correspond to the business material fields.
- Run a trial with a question missing that field, check the diamond connector and node status, and confirm that when the model does not call the tool and directly gives an answer, the description or parameter configuration can be located.
