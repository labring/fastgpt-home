---
title: Multi-Turn Conversation and Prompts for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c056-f005
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Conversation | Intake
meta_description: Teacher Qualifications: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information

## What this category's data looks like

Teacher qualification exam and certification materials mainly consist of written and interview registration forms, Mandarin proficiency certificates, and medical examination forms. They come from candidate submissions and handler archiving, and their update cadence advances with registration batches and certification periods. The registration form contains name, ID number, exam subjects, exam district, and signature field; the Mandarin proficiency certificate contains grade, certificate number, issue date, and seal; the medical examination form contains examination items, conclusion, hospital seal, and date. When materials enter the Q&A acceptance and missing-item follow-up function, the registration form serves as the anchor for identity and subjects, the Mandarin proficiency certificate serves as the basis for language ability, and the medical examination form serves as the basis for physical condition. The name, quantity, and date of the same record across the three materials must be aligned item by item. When versions are not synchronized or signatures or receipts are missing, the acceptance record should be marked as a pending supplement, and the model should follow up on the missing fields based on the historical message range.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the referenced historical message range and answer constraints. The "acceptance record and items to be supplemented" are then completed by the model. Memory turns control how many previous turns of dialogue can be referenced at most when answering. If the value is too small, the preceding text cannot be used; if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Whether fields, dates, and signature are complete, and whether the name and quantity of the same record are aligned with the other two materials | Check name, ID number, exam subjects, exam district, date, and signature field; check the memory turns value in the application settings, run a trial with two consecutive questions, observe whether the second round can carry forward the reference from the first round, and check the `messages` range |
| Mandarin proficiency certificate | Whether the grade, certificate number, issue date, and seal are consistent with the registration form, and whether the version is synchronized | Compare the certificate number and issue date, and confirm the seal and signature; run a trial with two consecutive questions, check whether the historical messages corresponding to `chatId` are correctly referenced, and record the missing fields in `variables` |
| Medical examination form | Whether the examination items, conclusion, hospital seal, and date are complete, and whether signature or receipt is missing | Check the medical examination conclusion and date, and confirm the hospital seal and receipt; compare the usage records of two runs to confirm the consumption change after adjusting the turns, and check the pending supplement items in `variables` |

## Three common errors

- Phenomenon: The second question answers off-topic when using a reference. Cause: The memory turns are too small, the preceding text is not included in the reference range, the referenced object is lost, and the model cannot carry forward the information from the first round.
- Phenomenon: The name and date of the same record do not match between the registration form and the medical examination form. Cause: The versions are not synchronized, the old version of the material is still referenced, and the acceptance record and supplementary questions are generated based on outdated fields.
- Phenomenon: A Mandarin proficiency certificate missing a signature or receipt is still treated as supplemented. Cause: The prompt does not constrain follow-up on missing items, the model answers directly, and does not first ask about the missing fields.

## How to verify the setup

Acceptance for this function: ask two consecutive follow-up questions and see whether the second question carries forward the reference from the first question; check the `messages` range and the history corresponding to `chatId`, and confirm that the missing fields in `variables` are followed up on.

Business test: submit a question missing key information and see whether it first follows up before answering; check whether the acceptance record and supplementary questions list the pending supplement fields, then forward to the handler.

- Check the current memory turns value in the application settings, confirm it matches the preceding text range required by the question, and run a trial with two consecutive questions.
- Compare the usage records of two runs to confirm the consumption change after adjusting the turns; check whether the pending supplement items in `variables` are complete, and whether a follow-up is made first when a signature or receipt is missing.
