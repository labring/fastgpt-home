---
title: Multi-Turn Conversation and Prompts for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c050-f005
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Conversation | Intake
meta_description: Foreign Teachers: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

The material on this page comes from the foreign teacher appointment and course scheduling business: appointment contracts, work permit materials, and course schedules. Appointment contracts provide position, appointment period, signature, and receipt fields; work permit materials provide document name, number, validity period, and issue date; course schedules provide course name, class, week number, class hours, and instructor. The three types of materials respectively play the roles of basis, constraint, and scheduling in the intake records. When entering Q&A intake and missing-item follow-up, first check by field, then check by date and signature. The update rhythm is synchronization after contract changes, permit extensions, and schedule adjustments. Field characteristics are concentrated in names, quantities, dates, signatures, and version numbers. The same record is prone to mismatches in name, quantity, and date across two materials, unsynchronized versions, and missing signatures or receipts.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the referenced historical message range and answer constraints. The intake records and the follow-up questions to be completed are then handled by the model. The memory turns control how many previous dialogue turns can be referenced at most when answering. If the value is too small, the preceding context cannot be used; if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether the fields, dates, and signatures are consistent with the work permit materials and course schedule | Check the memory turns in the application settings, run a trial with two consecutive questions, check whether the references in the preceding context in `messages` are correctly carried forward, and verify the contract name, appointment period, signature, and receipt |
| Work permit materials | Whether the document name, number, validity period, and issue date match the contract and schedule | Check whether the conversation history corresponding to `chatId` retains the necessary turns, and compare item by item the names, quantities, and dates of the permit materials with the contract and schedule |
| Course schedule | Whether the course name, class, week number, class hours, and instructor are consistent with the contract and permit materials | Check whether the schedule fields passed in `variables` are complete, check the version number and update date, and confirm there are no missing signatures or receipts |
| Intake records and follow-up questions to be completed | Whether missing items are identified and followed up, and whether answers are based on materials | Run a trial with two consecutive questions, see whether the second question carries forward the reference from the first question, and then confirm that the follow-up items correspond to specific material fields |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across two materials. Cause: During intake, fields were not compared item by item, and the contract and schedule versions were not synchronized.
- Symptom: Answers become slower and consumption increases. Cause: The memory turns are too large, bringing in irrelevant historical messages, and the reference range exceeds the preceding context needed for the question.
- Symptom: When the second question uses a reference, the answer does not address the question. Cause: The memory turns are too small, `messages` does not retain the key information from the first question, and the follow-up on missing items does not land on material fields.

## How to verify the setup

Acceptance for this feature: with two consecutive follow-up questions, see whether the second question carries forward the reference from the first question; check whether the historical message range in `messages` matches the answer constraints.

Business test: ask a question that lacks key information, and see whether it first follows up and then answers.

- Check the current memory turns value in the application settings, and match it with the preceding context range required by the question.
- Compare the usage records of two runs to confirm that the run consumption changes accordingly after adjusting the turns.
