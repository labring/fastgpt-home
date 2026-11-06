---
title: Multi-Turn Conversation and Prompts for Foreign Teacher Recruitment and Course Scheduling: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c050-f005
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Conversation | Access
meta_description: Foreign Teachers: review conversation for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Foreign Teacher Recruitment and Course Scheduling: Manage Authorized Access and External Services

## What this category's data looks like

Foreign teacher appointment and course scheduling involves three core types of materials: appointment contracts, work permit materials, and course schedules. Appointment contracts contain the appointment period, position, compensation, and signatures of both parties; work permit materials contain the permit number, validity period, and issuance receipt; course schedules contain course names, week numbers, classrooms, and instructor signatures. The materials come from the school's personnel and foreign affairs departments. Appointment contracts are updated with the appointment period or renewal, work permit materials are updated with approval and annual inspection, and course schedules are updated by semester or schedule change. When these three types of materials enter the multi-turn dialogue and prompts feature, appointment contracts and work permit materials serve as the basis for identity and authorization, while course schedules serve as the content of external services, jointly determining visitor identity and visible scope. In terms of field characteristics, the names, dates, and quantities of the same record in contracts and permit materials must be consistent, and the course names and week numbers in course schedules must match the contract position.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in application settings, outputting the referenced historical message range and answer constraints. The externally available entry points and authorization scope are determined by the publishing service and file permissions, and the model only processes filtered materials. The model answers accordingly, while external entry points and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Memory turns | Matches the range of prior context required by the question | Check the current value in application settings, and confirm that prior context can be referenced during continuous follow-up questions |
| Appointment contract | The contract name, appointment period dates, and signature page are complete and consistent with the work permit materials | Check whether the names, dates, and quantities in the contract and permit materials match, and inspect the signatures and receipt |
| Work permit materials | The permit number, validity period, and issuance receipt are complete, and the version is synchronized with the contract | Check whether the numbers and dates in the permit materials and contract are consistent, and inspect whether the versions are synchronized |
| Course schedule | The course names, week numbers, and instructor signatures match the contract position | Check whether the course names and week numbers in the course schedule and contract are consistent, and inspect the signatures |

## Three common errors

- Symptom: When a reference is used in the second question, the answer does not address the question. Cause: The memory turns are too small, the prior context range is insufficient, and the model cannot carry over the reference from the first turn.
- Symptom: The names, quantities, and dates of the same record in the contract and permit materials do not match. Cause: The versions of the two materials are not synchronized, and the update cadence is inconsistent.
- Symptom: The course schedule lacks signatures or receipts. Cause: The signature confirmation step in the material circulation process has not been completed, making the external service scope unverifiable.

## How to verify the setup

Feature acceptance: Ask two consecutive follow-up questions and see whether the second question carries over the reference from the first question; check whether `messages` and `chatId` are correctly associated with the turns, and whether `variables` are passed in as needed.

Business test: Access once with a restricted identity, and see whether the visible scope matches the setting and unauthorized content is not visible.

- Check the current value of memory turns in application settings, and run a trial with two consecutive questions to confirm that the second question carries over the reference from the first question.
- Check the names, quantities, dates, and signatures in the appointment contract, work permit materials, and course schedule, and confirm that the versions are synchronized and no items are missing.
