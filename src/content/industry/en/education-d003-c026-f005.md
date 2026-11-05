---
title: Multi-Turn Conversation and Prompts for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c026-f005
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Conversation | Intake
meta_description: Degree Certificates: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on Q&A intake and missing-item follow-up in degree conferral and certificate information reporting. The source materials are three types of process documents: degree application forms, thesis review forms, and defense resolutions. They are updated according to the batch reporting rhythm, and their fields cover names, quantities, dates, signatures, and receipts. The degree application form carries the applicant's basic information and degree category, and is the primary index for missing-item identification; the thesis review form carries the review conclusion and review date, and is used to verify whether the names and dates of the same record match; the defense resolution carries the defense conclusion and signature field, and is used to check whether signatures and receipts are complete. When these three types of materials enter this function, each serves as a field source and a basis for cross-comparison. Intake records and the follow-up questions to be completed are formed accordingly, and then passed to the handler.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the historical message range and answer constraints to be referenced. The intake records and the follow-up questions to be completed are then completed by the model. The memory turns control how many previous dialogue turns can be referenced at most when answering. If the value is too small, the preceding context cannot be used; if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the name, quantity, date, and signature fields are consistent with the thesis review form | Check the current value of memory turns in the application settings, and run a trial with two consecutive questions to observe whether the second turn can carry forward the reference from the first turn |
| Thesis review form | Whether the review date and review conclusion match the defense resolution, and whether the versions are synchronized | Compare the usage records of two runs to confirm that after adjusting the turns, the run consumption changes accordingly |
| Defense resolution | Whether the signature field and receipt are complete, and whether missing items are followed up | Check whether the historical message range in `messages` covers the required preceding context, and whether `variables` bring in the key fields |
| Intake record | Whether missing items are identified and followed up, and whether the answer is based on materials | Check the conversation history corresponding to `chatId`, and confirm that the opening message is not treated as preceding context |

## Three common errors

- Symptom: when the second question uses a reference, the answer does not address the question. Cause: the memory turns value is too small, and the preceding context range does not cover the reference object of the first question.
- Symptom: the name, quantity, and date of the same record do not match between the degree application form and the thesis review form. Cause: the versions are not synchronized, and the two materials are not cross-compared.
- Symptom: a defense resolution is still accepted even though the signature or receipt is missing. Cause: missing-item identification does not reach the signature and receipt fields, and follow-up is not triggered.

## How to verify the setup

This function's acceptance: ask two consecutive follow-up questions, see whether the second question carries forward the reference from the first question, and check whether `messages` and `variables` cover the required preceding context.

Business test: ask a question that lacks key information, and see whether it first follows up and then answers.

- Check the current value of memory turns in the application settings, and match it with the preceding context range required by the question.
- Run a trial with two consecutive questions, compare the usage records of the two runs, and confirm that after adjusting the turns, the run consumption changes accordingly.
