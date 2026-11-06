---
title: Multi-Turn Conversation and Prompts for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c017-f005
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Conversation | Intake
meta_description: Undergraduate Programs: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information

## What this category's data looks like

Undergraduate program establishment and dynamic adjustment involves three types of materials: program establishment application forms, talent cultivation plans, and expert argumentation opinions. The application form contains the program name, code, degree-granting category, length of study, and the signature and date of the person in charge; the cultivation plan contains the curriculum system, credits and class hours, practical components, and approval signature; the argumentation opinions contain the list of experts, argumentation conclusions, signatures, and receipts. Materials are updated according to the academic-year application cycle and on-campus review milestones, and the program name, quantities, and dates for the same program must be consistent across different materials. When entering acceptance Q&A, the application form provides the basis fields for establishment, the cultivation plan provides the basis for courses and credits, and the argumentation opinions provide the basis for procedures and signatures; together, the three support missing-item identification and follow-up questions.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the reference historical message range and answer constraints. The acceptance record and the supplementary question items are completed by the model in turn, while the external entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Program establishment application form | Whether the program name, code, degree category, length of study, and signature date are complete | Check the fields and signature, list missing items as pending follow-up questions, and check the corresponding slots in `variables` |
| Talent cultivation plan | Whether the curriculum system, credits and class hours, practical components, and approval signature are consistent with the application form | Compare the name, quantities, and dates, and mark inconsistencies as missing-item follow-up questions |
| Expert argumentation opinions | Whether the expert list, argumentation conclusions, signatures, and receipts are complete and version-synchronized | Check the signatures and receipts, and ask follow-up questions if they are missing or the versions are not synchronized |
| Multi-turn dialogue record | Whether the reference in the second question can carry over from the first question, and whether the historical range matches | Run a trial with two consecutive question turns, and inspect the historical range associated with `messages` and `chatId` |

## Three common errors

- Phenomenon: The program name, credit quantities, and dates for the same program do not match between the application form and the cultivation plan. Cause: The two materials were revised separately and entered Q&A without cross-checking.
- Phenomenon: The expert argumentation opinions lack signatures or receipts, but the acceptance record still treats them as complete. Cause: Missing-item identification did not cover the signature and receipt fields, and follow-up questions were skipped.
- Phenomenon: When the second question uses a reference, the answer does not address the question, responses become slower, and consumption increases. Cause: The value of memory turns does not match the preceding context range required by the question, bringing in irrelevant content.

## How to verify the setup

Acceptance for this feature: ask two consecutive follow-up questions, see whether the second question carries over the reference from the first question, and check whether the reference historical message range and answer constraints are output by the memory turns and prompt configuration in the application settings.

Business test: submit a question missing key information, see whether it asks a follow-up question before answering, and check whether the acceptance record and the supplementary question items are completed by the model in turn.

- In the application settings, check the current value of memory turns, match it with the preceding context range required by the question, and compare the usage records of two runs.
- Run a trial with two consecutive question turns, and check whether the historical range and slots in `messages`, `chatId`, and `variables` are consistent.
