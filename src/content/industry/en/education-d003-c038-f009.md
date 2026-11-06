---
title: Tool Calls and Plugins for Continuing Education Training Hour Recognition: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c038-f009
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Tool Calls | Intake
meta_description: Continuing Education: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Continuing Education Training Hour Recognition: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on three types of materials for continuing education credit recognition: course filing forms, study certificates, and credit recognition forms. Course filing forms come from institution filings and record the course name, number, credit hours, start date, and signature of the person in charge; study certificates are issued by the learner's employer or training institution and state the start and end dates of study, actual credit hours, signer's signature, and receipt; credit recognition forms are compiled by the intake window and include the recognition conclusion, recognition date, and handler's signature. The three types of materials are updated by batch, and within the same batch the course number, credit hours, and dates should be consistent. When entering this function, the course filing form is used to compare the course name and number, the study certificate is used to verify the actual credit hours and start and end dates, and the credit recognition form is used to validate the recognition conclusion and signature receipt. Field characteristics are concentrated in four categories: name, quantity, date, and signature. A common issue is that versions are not synchronized, causing the same record to have mismatched name, quantity, or date across two materials, or missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The intake record and the follow-up questions to be completed are then handled by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Check whether the course name, number, credit hours, start date, and signature of the person in charge are consistent with the study certificate | Open the tool node introduction field and confirm that the description states the purpose, when to call it, and the return result; run a test with a question missing the course number to see whether it asks a follow-up question first |
| Study certificate | Check whether the start and end dates of study, actual credit hours, signer's signature, and receipt correspond to the course filing form | Open each parameter configuration one by one and check the parameter introduction and whether it is required; on the canvas, check whether the diamond-shaped interface is connected to the target tool |
| Credit recognition form | Check whether the recognition conclusion, recognition date, handler's signature, and receipt are consistent with the study certificate | Run a test with a question missing the recognition date, check the input parameters and return in the call record, and confirm whether the model asks a follow-up question or directly fabricates parameter values |
| Tool calling node connection | The diamond-shaped interface is connected to the target tool, and the node status is readable | On the canvas, check the diamond-shaped connection and node status, and confirm that `toolChoice` and `functionCall` are traceable in the call record |

## Three common errors

- Symptom: The same record has mismatched course name, credit hours, or start date between the course filing form and the study certificate. Cause: The two materials' versions are not synchronized, or the fields were not aligned by the same batch during entry.
- Symptom: The credit recognition form is missing the handler's signature, or the study certificate is missing the receipt. Cause: The signature documents were not fully collected during material circulation, and the signature and receipt fields were not checked item by item at intake.
- Symptom: The model does not call the tool and directly gives an answer. Cause: The tool introduction or parameter introduction does not state the purpose and values, required parameters have no suitable values in the context, and the model answers on its own without asking a follow-up question.

## How to verify the setup

Acceptance for this function: run a test with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the introduction; at the same time, check whether `toolChoice` and `functionCall` appear in the call record.

Business test: ask a question missing key information, see whether it asks a follow-up question before answering, and check whether the follow-up items fall on the name, quantity, date, and signature fields of the course filing form, study certificate, and credit recognition form.

- Open the tool node introduction field, check whether this description can be understood on its own, and confirm that it states the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, check the introduction and whether it is required; run a test with a question missing that field to see whether it asks a follow-up question first instead of directly fabricating.
