---
title: Multi-Turn Conversation and Prompts for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c058-f005
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Conversation | Intake
meta_description: Research Agreements: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on three types of materials in the signing stage of research project task books: the project task book, the topic task breakdown table, and the budget book. The project task book comes from the finalized version in the application system, the topic task breakdown table is submitted by the topic leader, and the budget book is uploaded together with the task book. The update rhythm is concentrated revisions before signing, and adjustments according to change orders after signing. Field characteristics include project name, topic name, responsible person, start and end dates, funding amount, signature, and receipt. When the materials enter the Q&A acceptance and missing-item follow-up function, the project task book serves as the main record anchor, the topic task breakdown table is used to verify topic-level names, quantities, and dates, and the budget book is used to verify funding fields and versions. The three have different roles: the task book defines the overall framework, the breakdown table splits detailed items, and the budget book manages amounts; none can be missing.

## Configuration and implementation checks

This step is executed by the memory turns and prompt configuration in the application settings, and the output references the historical message range and answer constraints. "Acceptance records and items to be completed" are then completed by the model. Memory turns control how many previous dialogue turns can be referenced at most when answering. If the value is too small, the preceding text cannot be used; if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Whether fields, dates, and signatures are complete, and whether names, quantities, and dates are consistent with the breakdown table and budget book | Check the memory turns value in the application settings, run a trial with two consecutive questions, and check whether the second turn can carry forward the reference from the first turn; check whether the historical range in `messages` covers the required preceding text |
| Topic task breakdown table | Whether topic names, quantities, and start and end dates match the project task book, and whether versions are synchronized | Compare the fields of the same record in the two materials, and confirm that the version number and date are consistent; when items are missing, trigger a follow-up question and write the completion question into the acceptance record |
| Budget book | Whether funding amounts, subjects, and signature receipts are consistent with the task book, and whether versions are synchronized | Check the amount and subject fields, and check whether signatures or receipts are missing; compare the usage records of two runs to confirm the consumption change after adjusting the turns |
| Acceptance records and items to be completed | Whether missing items are identified and followed up, and whether answers are based on materials | Run a trial with two consecutive follow-up questions, use a reference in the second question, and observe whether it first asks a follow-up question and then answers; check whether the material fields passed in `variables` support the answer |

## Three common errors

- Phenomenon: the same topic name is written differently in the task book and the breakdown table, and the quantity or date does not match. Cause: the two materials were revised separately, and no field-level comparison was made.
- Phenomenon: the budget book version is not synchronized, and it still references the funding amount from the old version of the task book. Cause: after the change, only one material was updated, and the version number was not unified.
- Phenomenon: the task book is missing a signature or receipt, but the Q&A still answers based on the existing content. Cause: missing-item identification did not cover the signature and receipt fields, and the follow-up question was not triggered.

## How to verify the setup

This function's acceptance: use two consecutive follow-up questions, and see whether the second question carries forward the reference from the first question; check the range of `chatId` and `messages`, and confirm that the memory turns match the preceding text required by the question.

Business test: ask a question that lacks key information, and see whether it first asks a follow-up question and then answers.

- Check the current value of memory turns in the application settings, run a trial with two consecutive questions, and check whether the reference in the second turn is correctly carried forward.
- Compare the usage records of two runs, confirm that consumption changes accordingly after adjusting the turns, and check whether the opening message is treated as preceding text.
