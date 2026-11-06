---
title: Multi-Turn Conversation and Prompts for School Mental Health Screening and Referrals: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c015-f005
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Conversation | Multilingual
meta_description: Student Mental Health: review conversation for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Mental Health Screening and Referrals: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses multilingual materials and terminology handling in the context of mental health screening and referral in primary and secondary schools. Material sources include psychological screening plans, interview records, referral forms, and draft bilingual or trilingual terminology glossaries. The update cadence advances by semester and by case referral batch, and field characteristics center on subject identifiers, screening tool names, risk levels, interview times, referral destinations, signatures, and receipts. When materials enter multi-turn dialogue and prompt features, their roles differ: screening plans provide terminology definitions and scale items, interview records provide referents and context, and referral forms provide field names and date conventions. The unified glossary and comparison draft are produced by the model answering accordingly, while external access and authorization are handled by the publishing service and file permissions.

## Configuration and implementation checks

This step is executed by the memory turn count and prompt configuration in the application settings, which output the historical message range and answer constraints to reference. The unified glossary and comparison draft are then completed by the model. The memory turn count controls how many previous dialogue turns can be referenced at most when answering; too small a value fails to use prior text, while too large a value brings in irrelevant content and increases consumption.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Terminology definitions and scale items keep the same wording in the multilingual comparison draft, and translated names can refer back to the source text | In the application settings, check the memory turn count value, run a trial with two consecutive question turns, and check whether the second turn carries forward the referents from the first turn; compare against the prior text range in `messages` |
| Interview record | The name, quantity, and date of the same record match between the interview record and the referral form, and versions are synchronized | Sample three terms and check whether their wording is consistent throughout the document, and check whether the historical message range corresponding to `chatId` covers the required prior text |
| Referral form | Fields, dates, and signatures are complete; when a signature or receipt is missing, it must not enter external publishing | Compare the usage records of two runs, and check whether the material version passed in `variables` is synchronized with the current comparison draft |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the interview record and the referral form. Cause: The two materials are maintained separately, the glossary is not unified, and the field conventions of the referral form are inconsistent with the interview record.
- Symptom: Versions are not synchronized, and an old screening plan is still referenced. Cause: After the comparison draft is updated, the prior text of the conversation is not replaced, and the memory turn count brings in earlier irrelevant content.
- Symptom: A signature or receipt is missing, yet the referral form still enters external publishing. Cause: The publishing service and file permissions do not intercept it, and the model only outputs the historical message range and answer constraints to reference.

## How to verify the setup

Acceptance for this feature: ask two consecutive follow-up questions and see whether the second question carries forward the referents from the first question; use `messages` to construct two question turns, and check whether the historical message range under `chatId` matches the prior text range required by the question.

Business test: sample three terms and check whether their wording is consistent throughout the document, check that translated names can refer back to the source text, and check that the material version in `variables` is synchronized with the current comparison draft.

- In the application settings, check the current value of the memory turn count, confirm it matches the prior text range required by the question, and compare the usage records of two runs.
- Sample three terms and check whether their wording is consistent throughout the document, check the referral form fields, dates, and signatures, and confirm that when a signature or receipt is missing it does not enter external publishing.
