---
title: Multi-Turn Conversation and Prompts for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c045-f005
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Conversation | Intake
meta_description: Training Compliance: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of off-campus training compliance filing and penalty response. The materials come from three types of documents: school operating licenses, course filing materials, and fee disclosure notices, updated quarterly and synchronized when penalty decisions are issued. The school operating license contains the institution name, school address, license number, validity period, and issuance date; the course filing materials contain the course name, number of class hours, course start date, textbook version, and filing receipt; the fee disclosure contains fee items, amounts, disclosure date, and signature. The three types of materials play different roles when entering Q&A intake: the school operating license is used to confirm the entity's qualifications and scope of operation, the course filing materials are used to check whether the courses and class hours fall within the filed scope, and the fee disclosure is used to verify whether the fee items and disclosure time are consistent. If the name, quantity, or date of the same record does not match across two materials, if versions are not synchronized, or if a signature or receipt is missing, it will cause missing items during intake, and follow-up questions must be asked before answering.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and the output references the historical message range and answer constraints. The "intake record and items to be completed" is then completed by the model. The memory turns control how many previous turns of dialogue can be referenced at most when answering. If the value is too small, the preceding context cannot be used; if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | The institution name, license number, validity period, and issuance date must be consistent with the course filing materials | Check the current memory turns value in the application settings, run a trial with two consecutive questions, check whether the second question can carry forward the institution name reference from the first question, and verify the historical range in `messages` |
| Course filing materials | The course name, number of class hours, course start date, textbook version, and filing receipt must be consistent with the fee disclosure | Compare the usage records of two runs to confirm the consumption change after adjusting the turns; check whether the historical messages corresponding to `chatId` cover the follow-up questions on the filing receipt |
| Fee disclosure | The fee items, amounts, disclosure date, and signature must correspond to the school operating license and course filing materials | Check whether follow-up questions are asked before answering when a signature or receipt is missing; use `variables` to record the fields to be completed, and confirm that the follow-up items correspond one-to-one with the material fields |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match across two materials. Cause: During intake, fields were not compared item by item, and answering directly caused missing items to be ignored.
- Phenomenon: Versions are not synchronized, and old course filing materials are mixed with new fee disclosures. Cause: The memory turns value is too large, bringing in irrelevant history, and the model references outdated version content.
- Phenomenon: A conclusion is still given when a signature or receipt is missing. Cause: The prompt does not constrain the model to ask follow-up questions before answering, and the model directly generates an intake record based on incomplete materials.

## How to verify the setup

Feature acceptance: Ask two consecutive follow-up questions and see whether the second question carries forward the reference from the first question; check whether the referenced historical message range in `messages` matches the answer constraints.

Business test: Ask a question that lacks key information, see whether follow-up questions are asked before answering, and check whether the follow-up items cover the fields, dates, and signatures of the school operating license, course filing materials, and fee disclosure.

- Check the current memory turns value in the application settings, run a trial with two consecutive questions, and confirm that the second question can correctly carry forward the reference from the first question.
- Compare the usage records of two runs, confirm that the run consumption changes accordingly after adjusting the turns, and check that the opening message is not treated as preceding context.
