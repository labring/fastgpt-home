---
title: Multi-Turn Conversation and Prompts for Grade Entry and Credit Recognition: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c020-f005
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Conversation | Intake
meta_description: Grades and Credits: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Grade Entry and Credit Recognition: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the intake materials for grade entry and credit recognition, covering three categories: transcripts, deferred exam applications, and makeup exam arrangements. Transcripts are exported by the academic affairs system or submitted by teachers, with fields including course name, credits, grade, instructor signature, and date; deferred exam applications are submitted by students, with fields including the applied course, reason for deferral, approval signature, and intake date; makeup exam arrangements are published by the course-offering unit, with fields including the makeup exam course, time, location, and receipt. The update cadence of materials changes with semester milestones: grade entry is concentrated at the end of the term, deferred exam applications occur before and after exams, and makeup exam arrangements are at the beginning of the next semester. The three types of materials play different roles when entering Q&A intake: transcripts are used to verify credits and grades, deferred exam applications are used to confirm the reason for absence and eligibility, and makeup exam arrangements are used to confirm the time and location of subsequent exams. The name, quantity, and date of the same record may not match across two materials; when versions are not synchronized or signatures/receipts are missing, the intake record will first identify the missing item and ask a follow-up question.

## Configuration and implementation checks

This step is executed by the memory turn count and prompt configuration in the application settings, and outputs the referenced historical message range and answer constraints. "Intake records and the questions to be completed" are then completed by the model. The memory turn count controls how many previous turns of dialogue can be referenced at most when answering; if the value is too small, the preceding context cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases; the prompt constrains the answer to be based on the materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Whether the course name, credits, grade, instructor signature, and date are consistent with the intake record | Check the memory turn count value in the application settings, run a trial with two consecutive questions, and observe whether the second turn carries forward the reference from the first turn; check whether the historical message range in `messages` covers the transcript fields |
| Deferred exam application | Whether the applied course, reason for deferral, approval signature, and intake date are consistent with the corresponding record in the transcript | Compare the same course name and date in the two materials; if the signature or receipt is missing, ask a follow-up question first; use `chatId` to distinguish sessions and confirm that the follow-up is based on the preceding materials |
| Makeup exam arrangement | Whether the makeup exam course, time, location, and receipt connect with the deferred exam application and transcript | Check whether the course count and dates in the makeup exam arrangement and deferred exam application do not match; if the versions are not synchronized, ask first about the missing items; check whether `variables` are used to carry material fields |
| Intake records and the questions to be completed | Missing items are identified and followed up on, and answers are based on the materials | Ask a question missing key information and see whether it asks a follow-up question before answering; compare the usage records of two runs to confirm that after adjusting the turn count, the run consumption changes accordingly |

## Three common errors

- Symptom: The name or credits of the same course do not match across two materials. Cause: The transcript and deferred exam application versions are not synchronized, and the fields were not checked during entry.
- Symptom: The makeup exam arrangement date is inconsistent with the deferred exam application intake date. Cause: The two materials have different update cadences, and missing items were not followed up on during intake.
- Symptom: The transcript is missing the instructor signature or the deferred exam application is missing the receipt. Cause: Omissions occurred during material submission, and the intake record did not identify the missing item and ask a follow-up question.

## How to verify the setup

This feature's acceptance check: ask two consecutive follow-up questions and see whether the second question carries forward the reference from the first question; check whether the referenced historical message range in `messages` is consistent with the session corresponding to `chatId`.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering.

- Check the current memory turn count value in the application settings and match it with the preceding context range required by the question.
- Run a trial with two consecutive questions, compare the usage records of the two runs, and confirm that after adjusting the turn count, the run consumption changes accordingly.
