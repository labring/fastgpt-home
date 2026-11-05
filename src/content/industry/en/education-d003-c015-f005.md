---
title: Multi-Turn Conversation and Prompts for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c015-f005
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Conversation | Intake
meta_description: Student Mental Health: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data looks like
Primary and secondary school mental health screening and referral involves three types of materials: psychological screening plans, interview records, and referral forms. The sources are school psychological centers and homeroom teacher reports, and the update rhythm rolls with the screening cycle and referral milestones. Screening plans list scales, batches, and dates; interview records note names, quantities, and signatures; referral forms carry receipts and handlers. When the materials enter the Q&A acceptance and missing-item follow-up function, the plan serves as a background constraint, the interview records serve as the factual basis, and the referral form serves as the destination evidence. The fields, dates, and signatures of the three must be cross-consistent.

## Configuration and implementation checks

This step is executed by the memory turns and prompt configuration in the application settings, and the output references the historical message range and answer constraints. "Acceptance records and completed question items" are then completed by the model. Memory turns control how many previous dialogue turns can be referenced at most when answering. If the number of turns is too small, the preceding text cannot be used; if too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The scale names, batches, and dates in the plan must be aligned item by item with the interview records and referral forms, and it must not merely state that they have been configured. | Retrieve the plan and interview records, compare the scale names, quantities, and dates; check the batch field in `variables`. |
| Interview record | The names, quantities, dates, and signatures in the record must be consistent with the referral form receipt; a missing signature is regarded as a missing item. | Spot-check two materials, compare the names and quantities of the same record; check the signature and receipt fields. |
| Referral form | The receipt and handler fields must be complete, and the version must be synchronized with the screening plan; an old version must not be used. | Check the receipt date and handler; compare the referral form version number with the plan batch. |
| Continuous follow-up | The second turn can correctly carry forward the reference from the first turn, and missing items are identified and followed up on. | Run a trial with two consecutive question turns, and inspect how `messages` and `chatId` carry forward. |

## Three common errors

- Phenomenon: The names and quantities of the same record do not match between the interview record and the referral form. Cause: The two were entered at different times, and no cross-check was performed.
- Phenomenon: The referral form uses an old version and is not synchronized with the screening plan batch. Cause: After the version update, it was not replaced in sync, and receipt confirmation is missing.
- Phenomenon: An interview record missing a signature or a referral form missing a receipt is still accepted as complete material. Cause: The missing item was not identified and followed up on, and the answer was given directly.

## How to verify the setup

Acceptance for this function: with two consecutive follow-up turns, see whether the second question carries forward the reference from the first question, and check the reference range of `messages`, `chatId`, and `variables`.

Business test: ask a question that lacks key information, and see whether it follows up first before answering.

- In the application settings, check the current value of memory turns and match it with the preceding text range required by the question.
- Run a trial with two consecutive question turns, compare the usage records of the two runs, and confirm that consumption changes accordingly after adjusting the number of turns.
