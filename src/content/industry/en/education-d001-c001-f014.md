---
title: Model Integration and Configuration for Daily Kindergarten Care Management: Find Supporting Evidence
slug: /en/industry/education-d001-c001-f014
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Model Setup | Evidence
meta_description: Kindergarten Care: review model setup for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Model Integration and Configuration for Daily Kindergarten Care Management: Find Supporting Evidence

## What this category's data looks like

This page addresses business basis queries in the daily life management of kindergarten childcare. Materials include the daily life schedule, morning and afternoon health check records, and child health observation records. The daily life schedule is updated per semester or month, with fields including time slot, activity name, lead and assistant teachers, and venue; morning and afternoon health check records are filled in daily, with fields including child's name, check time, body temperature and abnormality description, and examiner's signature; child health observation records are filled in per occurrence, with fields including observation date, behavior description, handling method, observer, and parent receipt. When these three types of materials enter this function, they play different roles: the schedule provides the basis for activities and personnel, the morning and afternoon health check records provide the health facts of the day, and the observation records provide the case process and receipts. In terms of update rhythm, the schedule is adjusted with the seasons or the school calendar, morning and afternoon health check records are generated daily, and observation records are generated as events occur. During queries, it is necessary to refer back to the original text, verify fields, dates, and signatures, and identify whether the names, quantities, and dates of the same record match across the two materials, whether versions are synchronized, and whether signatures or receipts are complete.

## Configuration and implementation checks

This step is executed by the server-side model channel configuration, outputting model binding relationships and channel responses. Basis entries that can refer back to the original text are completed subsequently by AI nodes, code nodes, or manual work. Models are divided into five categories: language, indexing, reranking, speech synthesis, and speech recognition. Different steps bind different model types; channel keys only affect whether calls succeed and do not determine whether personnel can read knowledge base materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | When compared with morning and afternoon health check records and observation records, the time slot, activity name, teacher names, and date must be consistent, and the version must be current | Verify fields and dates, check the signatures of lead and assistant teachers; compare against the current version number |
| Morning and afternoon health check records | When compared with the daily life schedule, the child's name, check time, body temperature, and abnormality description must match, and the examiner's signature must be complete | Verify name, time, body temperature, and abnormality description; check the examiner's signature and parent receipt |
| Child health observation records | When compared with morning and afternoon health check records, the observation date, behavior description, handling method, and observer must be consistent, and the parent receipt must not be missing | Verify observation date, behavior description, and handling method; check the observer and parent receipt |
| Model type and channel | Corresponds to the step to be used, the channel is consistent with the integrated service, and the model identifier is consistent with the name listed in the documentation | Check the type label in the model configuration; verify the channel configuration and key source; compare against the model name returned by the channel |

## Three common errors

- Symptom: The same child's name is written differently in the morning and afternoon health check records and the observation records, and the dates differ by one day. Cause: The two materials were filled in separately, without aligning names and dates.
- Symptom: The daily life schedule has been adjusted for the season, but the morning and afternoon health check records still reference the old activity name. Cause: Versions were not synchronized, and the old material was not marked as invalid.
- Symptom: The observation record has a handling method but lacks a parent receipt, and the morning and afternoon health check record lacks the examiner's signature. Cause: Signatures and receipts were not archived with the records.

## How to verify the setup

This function's acceptance: run one conversation and one retrieval, check the model identifier in the response, confirm that the language model and indexing model are bound to their corresponding steps, and verify the values of `maxContext`, `maxTokens`, and `quoteMaxToken` in the response.

Business test: ask a cross-material basis question, see whether the answer provides a traceable source, and verify that the number of citations and the tokens of the cited text are recorded separately.

- Verify the fields, dates, and signatures of the daily life schedule, morning and afternoon health check records, and child health observation records, and confirm that the version is current.
- In the model configuration, verify that model types correspond to steps, verify the channel and key source, and compare against the model name returned by the channel.
