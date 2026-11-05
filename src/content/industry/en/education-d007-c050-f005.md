---
title: Multi-Turn Conversation and Prompts for Foreign Teacher Recruitment and Course Scheduling: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c050-f005
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Conversation | Review
meta_description: Foreign Teachers: review conversation for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Foreign Teacher Recruitment and Course Scheduling: Trace Exceptions and Review Results

## What this category's data looks like

Foreign teacher appointment and course scheduling materials include appointment contracts, work permit materials, and course schedules. The sources are the original records submitted by the school's human resources and academic affairs departments, and the update cadence rolls forward with appointment batches and semester scheduling. The three types of materials play different roles when they enter this feature: appointment contracts provide position, appointment period, and signing information; work permit materials provide document number, permit period, and receipt; course schedules provide course name, week number, class hours, and instructor. Field characteristics are concentrated in name spelling, date format, and signature position. If the name, quantity, or date of the same record does not match across two materials, the version is not synchronized, or a signature or receipt is missing, all of these need to be traced through multi-turn dialogue and prompts, forming an anomaly list and review conclusion to be handed to the person in charge for handling.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the referenced historical message range and answer constraints. The anomaly list and review conclusion are then completed by the model. The external entry point and authorization are handled by the publishing service and file permissions. The memory turns and prompts do not generate an access entry, nor do they perform identity or file authentication.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | The position name, appointment start and end dates, and signing date must correspond item by item with the work permit materials and course schedule, and the signature field must not be blank | Retrieve the original contract in the dialogue, check the fields and signature, use `messages` to review references from previous turns, and use `chatId` to locate the same conversation |
| Work permit materials | The document number, permit period, and receipt must be consistent with the appointment contract dates, and the version must be synchronized with the current batch | Compare the permit materials with the contract dates, check whether the receipt is complete, use `variables` to record the batch number, and confirm that no old version is mixed in |
| Course schedule | The course name, week number, class hours, and instructor must correspond to the appointment contract position, and the quantity must not conflict | Retrieve the course schedule and compare it line by line with the contract, generate anomaly records for inconsistent items, and annotate the source material |
| Anomaly list and review conclusion | Each anomaly must be supported by original records, and only after the reviewer signs may it be handed to the person in charge for handling | Create an anomaly record, use `chatId` to trace it back to the source material, check the signature and receipt, and confirm that the conclusion is traceable |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the appointment contract and the course schedule. Cause: The two materials are maintained separately, without field-level comparison and synchronization.
- Phenomenon: The version of the work permit materials is not synchronized, and an old receipt is still being referenced. Cause: After the batch update, the attachment was not replaced, and the historical message range brought in old content.
- Phenomenon: The contract is missing a signature or receipt, but the anomaly list is still generated. Cause: The review step did not check the signature field, and the prompt did not constrain missing items to be marked.

## How to verify the setup

Feature acceptance: Ask two consecutive follow-up questions and see whether the second question inherits the reference from the first question; use `chatId` and `messages` to review the reference range, and use `variables` to record the batch.

Business test: Create an anomaly record, see whether it can be traced back to the source material, and check whether the reviewer's signature and receipt are complete.

- In the application settings, check the current value of the memory turns, match it with the prior context range required by the question, and compare the usage records of two runs.
- Run a trial with two consecutive questions, check whether the reference in the second round is answered correctly, and confirm that the opening message is not treated as prior context.
