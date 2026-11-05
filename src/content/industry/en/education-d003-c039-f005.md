---
title: Multi-Turn Conversation and Prompts for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c039-f005
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Conversation | Intake
meta_description: Exam Administration: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Exam Organization and Misconduct Handling: Handle Questions and Collect Missing Information

## What this category's data looks like

This page centers on the exam organization and violation handling category; materials include exam administration manuals, examination room record sheets, and violation fact records. Exam administration manuals are updated by semester or exam batch, with fields including exam name, time, examination room number, invigilation arrangements, violation handling clauses, and signature fields; examination room record sheets are filled out one per session, including expected and actual attendance numbers, absentee list, description of abnormal situations, invigilator signature, and test site receipt; violation fact records are registered one by one per incident, including candidate information, violation behavior, evidence list, date, and handler signature. When these three types of materials enter the Q&A intake and missing-item follow-up function, their roles differ: exam administration manuals provide the basis for rules and procedures, examination room record sheets provide session facts and headcount data, and violation fact records provide case details and handling disposition. If material versions are not synchronized, the name, quantity, or date of the same record do not match, or signatures or receipts are missing, missing-item identification and follow-up questions will lose their basis.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and the output references the historical message range and answer constraints. The "intake records and items to be completed" are then completed by the model. Memory turns control how many previous turns of dialogue can be referenced at most when answering; if the value is too small, the preceding text cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Whether it is consistent with the examination room record sheet in exam name, date, and examination room number, and whether the versions are synchronized | Compare the fields of the two materials item by item, check whether the signature fields and receipts are complete, and check the current value of memory turns in the application settings |
| Examination room record sheet | Whether it matches the violation fact record in candidate name, quantity, and date, and whether missing signatures or receipts are identified as missing items | Retrieve the two materials for cross-checking, run a trial with two consecutive question turns, see whether the second question inherits the reference from the first question, and record `messages` and `chatId` |
| Violation fact record | Whether the violation behavior, evidence list, date, and handler signature are complete, and whether it can support answering after follow-up questions | Check the record sheet fields and signatures, compare the usage records of two runs, and confirm whether `variables` are correctly brought in during follow-up questions |
| Intake records and items to be completed | Whether missing items are identified and followed up, and whether answers have a material basis | Ask a question missing key information, see whether it first follows up and then answers, and then transfer it to the handler |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the exam administration manual and the examination room record sheet. Cause: The two materials are filled out separately without cross-checking, and the field definitions are not unified.
- Phenomenon: The version of the violation fact record is not synchronized, and old clauses are still cited. Cause: The update cadence is inconsistent, and there is a lack of version identifiers and synchronization confirmation actions.
- Phenomenon: The examination room record sheet lacks a signature or receipt, and it still cannot be completed after follow-up questions. Cause: The intake stage does not list signatures and receipts as missing items, and the handler cannot process them based on the facts.

## How to verify the setup

This function's acceptance: run a trial with two consecutive follow-up question turns, and see whether the second question inherits the reference from the first question; check whether the historical message range in `messages` corresponds to `chatId`, and confirm that the memory turns value matches the preceding text range required by the question.

Business test: ask a question missing key information, and see whether it first follows up and then answers; the answer must have a material basis in the exam administration manual, examination room record sheet, or violation fact record.

- Check the current value of memory turns in the application settings, and run a trial with two consecutive question turns to confirm that the second question can correctly inherit the reference from the first question.
- Compare the usage records of two runs, check the change in run consumption after adjusting the turns, and verify whether `variables` are correctly brought in during follow-up questions.
