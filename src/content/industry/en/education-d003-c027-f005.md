---
title: Multi-Turn Conversation and Prompts for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c027-f005
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Conversation | Intake
meta_description: Graduate Destinations: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses Q&A intake for university employment signing and graduation destination statistics. Materials include the employment agreement, the graduation destination registration form, and the employer certificate. The employment agreement is signed by the student and the employer, and its fields include employer name, position, signing date, and signatures and seals of both parties; the graduation destination registration form is filled in by the student and reviewed by the department, and its fields include destination type, employer name, reporting date, and review comments; the employer certificate is issued by the employer, and its fields include acceptance comments, contact person, issue date, and receipt. The update cadence advances with signing batches and review milestones, and common versions are not synchronized, names, quantities, and dates do not match, or signatures or receipts are missing. When the three types of materials enter Q&A intake, the employment agreement is used to verify the signing entity and date, the graduation destination registration form is used to verify the destination type and review status, and the employer certificate is used to verify the acceptance facts and receipt; missing-item follow-up is located accordingly.

## Configuration and implementation checks

This step is executed by the memory turns and prompt configuration in the application settings, and the output references the historical message range and answer constraints. "Intake records and completed follow-up items" are then completed by the model. Memory turns control how many previous dialogue turns can be referenced at most when answering; if the value is too small, prior context cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether the employer name, position, signing date, and signatures and seals of both parties are complete | Check the memory turns value in the application settings, run a trial with two consecutive questions, and see whether the second turn can carry forward the reference from the first turn; check the reference scope of `chatId` and `messages` |
| Graduation destination registration form | Whether the destination type, employer name, reporting date, and review comments are consistent with the employment agreement | Compare the name, quantity, and date of the same record in the two materials; check whether the registration form fields in `variables` are updated with the batch |
| Employer certificate | Whether the acceptance comments, contact person, issue date, and receipt are complete | Check whether the employer name and date on the certificate and the registration form match; confirm whether the receipt is attached, and missing items enter follow-up |
| Intake records and completed follow-up items | Whether missing items are identified and followed up, and whether answers are based on materials | Ask a question missing key information and see whether it follows up before answering; check whether the follow-up items land on specific material fields |

## Three common errors

- Phenomenon: The employer name, quantity, and date of the same record do not match between the employment agreement and the graduation destination registration form. Cause: The two materials are filled in at different stages, versions are not synchronized, and cross-checking is not performed during intake.
- Phenomenon: The employer certificate is missing a signature or receipt but is still accepted as complete material. Cause: Missing-item identification does not cover the signature and receipt fields, and the follow-up step is not triggered.
- Phenomenon: When the second question uses a reference, the answer does not address the question, responses become slower, and consumption rises. Cause: The memory turns value is too large and brings in irrelevant content, or too small and cannot use prior context, and the opening message is treated as prior context.

## How to verify the setup

Acceptance for this feature: run a trial with two consecutive follow-up questions, use a reference in the second question, and see whether it carries forward the reference from the first question; check whether the reference scope of `chatId`, `messages`, and `variables` and the answer constraints take effect.

Business test: ask a question missing key information and see whether it follows up before answering; the follow-up items should land on specific fields of the employment agreement, the graduation destination registration form, and the employer certificate.

- Check the current memory turns value in the application settings and match it with the prior context range required by the question; compare the usage records of two runs to confirm that consumption changes accordingly after adjusting the turns.
- Spot-check intake records and completed follow-up items to confirm that missing items are identified and followed up and that answers are based on materials, then forward them to the handler.
