---
title: Multi-Turn Conversation and Prompts for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c044-f005
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Conversation | Intake
meta_description: Training Schedules: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information

## What this category's data looks like

In the course scheduling and class cancellation scenario at training institutions, materials are mainly of three types: class schedules, class cancellation records, and schedule change requests. Class schedules come from academic affairs system exports or scheduling tables, and are updated weekly or per class session; class cancellation records come from sign-in sheets or system cancellation transaction logs, and are generated per session; schedule change requests come from application forms submitted by teachers or academic affairs staff, and are triggered per event. Field characteristics center on course name, class, teacher, classroom, class date and time slot, number of class hours, student roster, and signature or receipt column. When materials enter the Q&A intake and missing-item follow-up function, the class schedule serves as the baseline for time and venue, the class cancellation record serves as the basis for what actually occurred and was consumed, and the schedule change request serves as the basis for changes and approval traces. The three types of materials need to be aligned by the same course, same date, and same student basis; if any name, quantity, date, or signature is missing, a question item is formed.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the reference range of historical messages and answer constraints. "Intake records and completed question items" are then completed by the model. Memory turns control how many previous dialogue turns can be referenced at most when answering; if the value is too small, the preceding text cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases. External entry points and authorization are handled by the publishing service and file permissions; this configuration does not generate access entry points or perform identity and file authentication.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Consistent with class cancellation records and schedule change requests on course name, class, teacher, classroom, class date and time slot, and number of class hours, with a complete signature or receipt column | Retrieve the class schedule and class cancellation record for the same course and same date, and compare names, quantities, and dates field by field; check whether the schedule change request covers the changed time slot; verify the signature or receipt; check the memory turns value in the application settings to confirm that the preceding text range can cover the current question item; use `chatId`, `messages`, and `variables` to record the session and variables |
| Class cancellation record | Consistent with the class schedule on student roster, number of class hours, and class date, with the version synchronized with the schedule change request, and no missing signature or receipt | Extract the class cancellation record by student and date, and compare it with the class schedule roster and number of class hours; check whether the schedule change request has been synchronized to the class cancellation record; verify the signature or receipt; run a trial with two consecutive question sentences to see whether the second turn can carry forward the reference from the first turn; check the memory turns in the application settings to avoid an insufficient preceding text range |
| Schedule change request | Consistent with the class schedule and class cancellation record on course name, original class date, adjusted date, and number of class hours, with a complete approval signature or receipt | Extract the schedule change request form, and compare it with the original time slot in the class schedule and the actual cancellation date in the class cancellation record; check whether the version is synchronized; verify the approval signature or receipt; check the memory turns in the application settings to confirm whether earlier dialogue is brought in; use `messages` to observe whether the historical message range matches the question item |
| Intake records and completed question items | Missing items are identified and followed up on, answers are based on class schedule, class cancellation record, and schedule change request materials, and question items can be transferred to the responsible person for handling | Ask a question sentence that lacks key information, and see whether it first follows up before answering; check whether the follow-up items correspond to missing name, quantity, date, signature, or receipt items; confirm that the answer cites material fields; use `variables` to record completed question items; check the memory turns in the application settings, and compare the usage records of two runs |

## Three common errors

- Phenomenon: The name, quantity, or date of the same course does not match across two materials. Cause: The class schedule and class cancellation record are not aligned on the same basis, and the schedule change request is not synchronized and updated.
- Phenomenon: The schedule change request has already been changed, but the class schedule or class cancellation record is still the old version. Cause: The version is not synchronized, the material update cadence is inconsistent, and the preceding text range does not cover the change.
- Phenomenon: The class cancellation record or schedule change request lacks a signature or lacks a receipt. Cause: The approval trace was not backfilled, missing items were not identified at intake, and the follow-up did not cover the signature column.

## How to verify the setup

Acceptance of this function: ask two consecutive follow-up questions and see whether the second question carries forward the reference from the first question; check the memory turns value in the application settings to confirm that the referenced historical message range matches the question item, and use `messages` to observe the historical message range.

Business test: ask a question sentence that lacks key information and see whether it first follows up before answering; check whether the follow-up items correspond to missing name, quantity, date, and signature items in the class schedule, class cancellation record, and schedule change request.

- Check the current memory turns value in the application settings, run a trial with two consecutive question sentences, confirm that the second turn can correctly carry forward the reference from the first turn, and compare the usage records of the two runs.
- Extract the class schedule, class cancellation record, and schedule change request for the same course and same date, compare names, quantities, dates, and signatures or receipts field by field, and route missing items into follow-up and transfer them to the responsible person for handling.
