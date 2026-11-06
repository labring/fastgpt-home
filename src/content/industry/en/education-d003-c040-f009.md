---
title: Tool Calls and Plugins for New Employee Onboarding and Training: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c040-f009
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Tool Calls | Intake
meta_description: Employee Onboarding: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for New Employee Onboarding and Training: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the enterprise new employee onboarding training scenario, with materials drawn from three categories: onboarding training plans, course sign-in sheets, and job descriptions. The onboarding training plan provides course names, dates, instructors, and training objectives, and is the primary basis for accepting question items; the course sign-in sheet records participants, sign-in times, and signatures, and is used to verify attendance and receipts; the job description states job responsibilities, qualification requirements, and the affiliated department, and is used to fill in job-related question items. Materials are updated by training batch, and versions are synchronized with course adjustments and personnel changes. When entering this feature, the three material categories serve respectively as the basis for question-item acceptance, missing-item identification, and follow-up questioning, with fields including name, quantity, date, signature, and receipt.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the input parameters and return in the call record). Acceptance records and filled-in question items are then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Check whether the course name, training date, instructor, and training objective fields are complete, and whether the name and date of the same course are consistent across the two materials | Open the tool node to review the field descriptions, and confirm that the purpose, when to use it, and the returned result can be understood independently; run a test with a question missing the date to see whether it asks a follow-up question first |
| Course sign-in sheet | Check the participant, sign-in time, signature, and receipt fields, and whether the name and quantity of the same record match up | Open each parameter configuration one by one, and check the parameter description and whether it is required; run a test with a question missing the signature to see whether it asks a follow-up question first rather than fabricating |
| Job description | Check the job title, responsibilities, qualification requirements, and affiliated department fields, and whether the version is synchronized with the training plan | On the canvas, check the diamond-shaped connection and node status of the tool calling node, and confirm that it is connected to the target tool |

## Three common errors

- Symptom: the name and date of the same course do not match between the training plan and the sign-in sheet. Cause: the two materials are updated separately, versions are not synchronized, and field definitions are inconsistent.
- Symptom: values that do not exist in the materials appear in the returned result. Cause: when there are no required parameters, the model may fabricate parameter values on its own without asking a follow-up question first.
- Symptom: the sign-in sheet is missing a signature or receipt, yet it still answers directly after a follow-up question. Cause: marking a parameter as required does not guarantee that the model will ask a follow-up question; this must be guided by the prompt.

## How to verify the setup

Feature acceptance: run a test with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; check `toolChoice`, `functionCall`, and the tool calling node connection, and see whether the diamond-shaped interface is connected to the target tool.

Business test: ask a question missing key information, and see whether it asks a follow-up question first before answering

- Open each parameter configuration one by one, check the parameter description and whether it is required, and confirm that it corresponds to fields that actually exist in the business materials.
- On the canvas, check the diamond-shaped connection and node status of the tool calling node, and confirm that it is connected to the target tool.
