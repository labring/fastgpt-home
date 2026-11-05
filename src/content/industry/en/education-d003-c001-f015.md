---
title: Knowledge Base Retrieval for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c001-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Retrieval | Intake
meta_description: Kindergarten Care: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Daily Kindergarten Care Management: Handle Questions and Collect Missing Information

## What this category's data looks like

For kindergarten childcare daily life management, the core materials are the daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule comes from the kindergarten's childcare and education plan and is updated by semester or month; its fields include activity name, start and end times, responsible person, date, and signature. Morning and afternoon check records come from class teachers and health care personnel and are filled in daily; their fields include child's name, body temperature, throat and skin condition, handling of abnormalities, date, and signature. Child health observation records come from childcare workers or the health room and are updated as needed or weekly; their fields include observation time, diet, sleep, and bowel movement status, mood and activity performance, follow-up measures, date, and signature. When these three types of materials enter this function, the schedule serves as the basis for activity segments and time, the morning and afternoon check records serve as the basis for the day's health screening, and the observation records serve as the basis for an individual's continuous status.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). Acceptance records and completed follow-up questions are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether the activity name, start and end times, responsible person, date, and signature are complete, and whether the date matches that in the morning and afternoon check records | In the search test, switch `searchMode`, test once each with synonymous questions, and record the number of candidate items and the `similarity` score |
| Morning and afternoon check records | Whether the child's name, body temperature, handling of abnormalities, date, and signature are complete, and whether the name and date are consistent with those in the observation records | Check whether candidate chunks come from both the semantic and full-text channels, then enable rerank to compare the order of the top few items |
| Child health observation records | Whether the observation time, diet, sleep, and bowel movement, follow-up measures, and signature are complete, and whether they match the activity name in the schedule | Check the number and content completeness of returned citations, verify the tokens of the cited text, and record the number of array items separately |
| Acceptance records and completed follow-up questions | Whether missing items are identified and followed up on, whether answers carry material evidence, and then are forwarded to the handler | Ask a question missing key information and see whether it follows up before answering; use `usingReRank` and `limit` to observe the trimmed candidates |

## Three common errors

- Phenomenon: The activity name and date of the same record do not match between the schedule and the morning and afternoon check records. Cause: The two materials are maintained separately and are not checked against the same date and name standard.
- Phenomenon: The observation records have been updated, but the schedule is still the old version. Cause: The versions are not synchronized, and the retrieved hit is an old chunk.
- Phenomenon: Morning and afternoon check records lack a signature or receipt but are still treated as complete evidence. Cause: Missing items are not followed up on, and the answer is given directly.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ordering of the top few items.

Business test: ask a question missing key information and see whether it follows up before answering.

- In the knowledge base search test, switch `searchMode`, record the number of candidate items and the `similarity` score, then adjust `limit` and `usingReRank` to compare the order of the top few items.
- Check the fields, dates, and signatures of the daily life schedule, morning and afternoon check records, and child health observation records one by one, and confirm that missing items are followed up on before being forwarded to the handler.
