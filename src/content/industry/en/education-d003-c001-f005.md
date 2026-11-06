---
title: Multi-Turn Conversation and Prompts for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c001-f005
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Conversation | Intake
meta_description: Kindergarten Care: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data involves three core types of materials: daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule is updated per semester or month, with fields including activity name, start and end time, and responsible person; morning and afternoon check records are filled in daily, with fields including date, child's name, body temperature, abnormal description, and signature; child health observation records are filled in as needed or daily, with fields including observation date, performance description, handling opinion, and signature. When the three types of materials enter question acceptance, their roles differ: the schedule serves as the basis for time and activities, morning and afternoon check records serve as the basis for the day's status, and observation records serve as the basis for individual tracking. Material versions are synchronized with kindergarten adjustments, but it often occurs that the names, quantities, or dates of the same record do not match across two materials, or versions are not synchronized, or signatures or receipts are missing.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the reference historical message range and answer constraints. The acceptance records and supplementary questions are completed by the model, and the external entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Memory turns | Matches the range of preceding context required by the question | Check the current value in the application settings, and run a trial with two consecutive questions to observe how `messages` and `chatId` are carried over |
| Daily life schedule | Activity name, start and end time, responsible person, date, and signature are complete, and the date is consistent with the morning and afternoon check records | Extract the schedule fields and compare them day by day with the morning and afternoon check records; mark as missing items when signatures or receipts are absent |
| Morning and afternoon check records | Child's name, body temperature, abnormal description, date, and signature are complete, and the quantity matches the observation records | Check the two materials by date and name; when names or quantities do not match, add them to the follow-up question list |
| Child health observation records | Observation date, performance description, handling opinion, and signature are complete, and the version is synchronized with the schedule | Check the version number and signature field; when the version is not synchronized or the signature is missing, request completion |

## Three common errors

- Phenomenon: The same child's name is written differently in the morning and afternoon check records and the observation records, and the quantities do not match. Cause: The two materials are filled in separately without field-level verification.
- Phenomenon: The daily life schedule has been updated, but the morning and afternoon check records still reference the old activity names. Cause: Versions are not synchronized, and there is no unified version identifier.
- Phenomenon: Observation records have handling opinions but lack signatures or receipts, yet are treated as complete materials during acceptance. Cause: Missing-item identification does not cover the signature field and receipt field.

## How to verify the setup

Acceptance of this feature: Ask two consecutive follow-up questions and see whether the second question carries over the reference from the first question; check whether `messages` and `chatId` are correctly brought in with the number of turns, and whether `variables` retains the necessary fields.

Business test: Submit a question missing key information and see whether it asks a follow-up question before answering.

- Check the memory turns value in the application settings, run a trial with two consecutive questions, and compare the usage records of the two runs.
- Extract the fields, dates, and signatures of the daily life schedule, morning and afternoon check records, and child health observation records, and compare item by item whether names, quantities, and dates are consistent.
