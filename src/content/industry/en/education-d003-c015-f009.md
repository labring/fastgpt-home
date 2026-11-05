---
title: Tool Calls and Plugins for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c015-f009
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Tool Calls | Intake
meta_description: Student Mental Health: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information

## What this category's data looks like

This page is for the primary and secondary school mental health screening and referral category. The materials include three types: psychological screening plans, interview records, and referral forms. Psychological screening plans are updated each semester by psychological teachers or the moral education office, and include screening dimensions, time arrangements, and responsible persons; interview records are filled in one by one by homeroom teachers or psychological teachers, and include student name, interview date, main manifestations, and preliminary judgment; referral forms are initiated by the teacher who discovers the problem, and include the referral target, reason for referral, receiver, and receipt signature. When the three types of materials enter the Q&A intake and missing-item follow-up function, their roles differ: the screening plan serves as the basis for judgment and the source of fields, the interview record serves as process evidence and a clue for follow-up questions, and the referral form serves as the destination voucher and the object of signature verification. In terms of update rhythm, screening plans are adjusted by semester or academic year, interview records are updated on a rolling basis with the number of interviews, and referral forms are generated in real time as cases move through the process. In terms of field characteristics, the four types of fields—name, quantity, date, and signature—are most prone to inconsistency. When the name, quantity, or date of the same record does not match across two materials, the version is not synchronized, or a signature or receipt is missing, the intake step must first identify the missing item and then ask follow-up questions.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), and outputs the tool call result (the input parameters and return in the call record). "Intake records and the questions to be completed" are then completed by subsequent AI nodes or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether the screening dimensions, time arrangements, and responsible person fields are complete, and whether the names and dates can match those in the interview records and referral forms | Open the tool node description fields and check whether the screening dimensions and dates in the plan are used as required parameters; run a test with a question missing the date to see whether it asks a follow-up question first |
| Interview record | Whether the student name, interview date, main manifestations, and preliminary judgment fields are complete, and whether the quantities and dates are consistent with the screening plan and referral form | Open each parameter configuration and check the two items: description and whether required; check whether the name and date in the record correspond to the referral form |
| Referral form | Whether the referral target, reason for referral, receiver, and receipt signature fields are complete, and whether the names and dates match those in the interview record and screening plan | Check the diamond connectors and node status on the canvas, and confirm that the `toolChoice` and `functionCall` related configurations point to the target tool; check whether the receipt signature is missing |
| Tool calling node connection | The diamond interface is connected to the target tool, and the node status is consistent with the target tool | Check the diamond connectors and node status on the canvas, and confirm that the connection is not broken and does not point to the wrong tool |

## Three common errors

- Symptom: the name or date of the same student does not match between the screening plan and the interview record. Cause: the two materials are entered separately, the versions are not synchronized, and there is no unified field verification.
- Symptom: the quantity in the referral form is inconsistent with the quantity in the interview record. Cause: referral forms are generated in real time as cases move through the process, interview records are updated on a rolling basis, and no quantity comparison is performed.
- Symptom: the model does not call the tool and directly gives an answer. Cause: the tool description does not state when it should be used, the required parameters have no suitable value in the context, and the model does not ask a follow-up question.

## How to verify the setup

Acceptance of this function: run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; check whether the returned result contains values that do not exist in the business materials, and check whether the `toolChoice` and `functionCall` related configurations take effect.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering; if it answers directly without asking a follow-up question, check whether the parameters are required and whether the prompt guidance is in place.

- Open the tool node description field and check whether this description can be understood when taken out on its own, and whether it clearly states the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, check the two items: description and whether required, and run a test with a question missing that field to see whether it asks a follow-up question first instead of directly fabricating.
