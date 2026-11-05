---
title: Multi-Turn Conversation and Prompts for Research Ethics Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c062-f005
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Conversation | Intake
meta_description: Research Ethics: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Ethics Review: Handle Questions and Collect Missing Information

## What this category's data looks like

The category materials for the research ethics review scenario include three types: ethics review applications, informed consent form templates, and risk assessment forms. The ethics review application carries the basic research information, review category, and signature field; the informed consent form template carries the participant notification elements, version date, and signature field; the risk assessment form carries the risk level, prevention and control measures, and signature receipt. The material sources are the institutional ethics committee intake window and paper or electronic documents submitted by researchers, and the update cadence is rolling replacement by version number and submission batch. When the three enter the Q&A intake and missing-item follow-up function, each has a different role: the application is the main record, and the template and assessment form are the basis for cross-checking. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record often appears in two materials with inconsistent name wording, inconsistent quantities, and mismatched dates. When versions are not synchronized, old-version fields are still referenced, and when signatures or receipts are missing, the intake chain is incomplete.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the historical message range and answer constraints to reference. The memory turns control how many previous dialogue turns can be referenced at most when answering. If the value is too small, the preceding text cannot be used; if the value is too large, irrelevant content is brought in and consumption increases. The intake records and the items to be completed are continued by the model, and the external entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Field verification dimensions: whether the application name, research quantity, submission date, and signature field are complete | Check the memory turns value in the application settings, run a trial with two consecutive questions, confirm that the second turn can carry forward the reference from the first turn, and locate the historical range in `messages` |
| Informed consent form template | Field verification dimensions: whether the template name, version date, signature field, and receipt are consistent with the application | Compare the name, quantity, and date in the application and template, check whether the versions are synchronized, and when signatures or receipts are missing, ask a follow-up question before answering |
| Risk assessment form | Field verification dimensions: whether the risk level, prevention and control measures, assessment date, and signature receipt correspond to the application | Check the dates and signatures in the assessment form and application, and confirm whether the conversation history corresponding to `chatId` retains the required preceding text |
| Multi-turn dialogue and prompts | Judgment dimension: whether the second turn can correctly carry forward the reference from the first turn during consecutive follow-up questions | Run a trial with two consecutive questions, check whether `variables` affect the prompt constraints, and compare the usage records of the two runs |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the application and the template. Cause: The two materials are filled in separately without cross-checking, and a single document is directly trusted during intake.
- Phenomenon: Versions are not synchronized, and old-version fields are still referenced. Cause: After the template or assessment form is updated, the intake record is not replaced, and the historical message range brings in expired content.
- Phenomenon: Answering continues even when signatures or receipts are missing. Cause: The prompt constraints do not require asking a follow-up question first, and the model directly gives a conclusion based on incomplete materials.

## How to verify the setup

Acceptance for this feature: ask two consecutive follow-up questions, see whether the second question carries forward the reference from the first question, and check whether the historical range referenced in `messages` is consistent with the conversation corresponding to `chatId`.

Business test: submit a question that lacks key information, and see whether it asks a follow-up question before answering.

- Check the current memory turns value in the application settings, and match it with the preceding text range required by the question.
- Run a trial with two consecutive questions, compare the usage records of the two runs, and confirm that usage changes accordingly after adjusting the turns.
