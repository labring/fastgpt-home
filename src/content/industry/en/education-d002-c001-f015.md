---
title: Knowledge Base Retrieval for Daily Kindergarten Care Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c001-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Retrieval | Checks
meta_description: Kindergarten Care: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Daily Kindergarten Care Management: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on three types of materials in kindergarten childcare daily life management: daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule is updated weekly or daily, containing activity names, time intervals, and responsible person signatures; morning and afternoon check records are filled in daily, containing child names, body temperature, symptoms, date, and caregiver signature; child health observation records are supplemented as needed or daily, containing observation subjects, behavior descriptions, handling opinions, and review signatures. The three types of materials have different roles when entering this function: the schedule provides time and activity benchmarks, morning and afternoon check records provide the individual status of the day, and health observation records provide continuous tracking fragments. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts, with an update rhythm mainly based on daily clearing and weekly summarizing; version desynchronization or missing signatures and receipts are common sources of discrepancies.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Names, dates, and signatures are consistent between the schedule and morning and afternoon check records | In the search test, switch `searchMode` to semantic, full-text, and hybrid, compare the number of candidates and scores, and verify activity names and date fields |
| Morning and afternoon check records | Quantities, dates, and signatures are consistent between morning and afternoon check records and health observation records | Test once each with synonymous questions, observe the number of candidates before and after `similarity` filtering, and verify body temperature, symptoms, and signature fields |
| Child health observation records | Observation subjects, handling opinions, and receipts are consistent between observation records and the schedule | Enable and disable `usingReRank` to compare the ranking of the top few items, and verify observation subject names and handling opinion dates |
| Discrepancy list | When the name, quantity, or date of the same object does not match between two materials, list them item by item | After trimming by `limit`, record the tokens of the referenced text, record the number of array items separately, submit to the reviewer for confirmation, and write back |

## Three common errors

- Phenomenon: The same child's name is written differently in morning and afternoon check records and health observation records, and the dates do not match. Cause: Material versions are not synchronized, and retrieval candidates do not cover the latest fragments.
- Phenomenon: The number of activities in the schedule and morning and afternoon check records is inconsistent, and the signature column is blank. Cause: Missing signatures or receipts, and key fragments are not retained after reference limit trimming.
- Phenomenon: There are many candidates but the ones ranked first are all irrelevant, and the answer lacks key paragraphs. Cause: Rerank is not enabled or the similarity filtering threshold does not match the material form.

## How to verify the setup

This function acceptance: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank to observe the ranking of the top few items; record the number of candidates and scores under `similarity`, `limit`, `searchMode`, and `usingReRank`.

Business test: Use one real record to find fields inconsistent with the ledger, verify names, quantities, dates, and signatures, submit to the reviewer for confirmation, and write back.

- In the knowledge base search test, switch `searchMode` to compare the candidate fragments and similarity scores returned by semantic, full-text, and hybrid modes.
- Enable and disable `usingReRank`, compare changes in the ranking of the top few items, and record the tokens of the referenced text and the number of array items after `limit` trimming.
