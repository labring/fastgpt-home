---
title: Reranking and Hybrid Retrieval for Daily Kindergarten Care Management: Find Supporting Evidence
slug: /en/industry/education-d001-c001-f018
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Reranking | Evidence
meta_description: Kindergarten Care: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Daily Kindergarten Care Management: Find Supporting Evidence

## What this category's data looks like

This page addresses business basis queries in daily life management for kindergarten childcare. The materials include daily life schedules, morning and afternoon check records, and child health observation records. Daily life schedules are updated per semester or month and include time slots, activity names, responsible teachers, and venues; morning and afternoon check records are filled in daily and include child names, body temperature, oral and hand checks, handling of abnormalities, and teacher signatures; child health observation records are recorded as needed or weekly and include observation dates, description of performance, handling measures, and health personnel signatures. When these three types of materials enter this function, daily life schedules provide the basis for time slots and activities, morning and afternoon check records provide the basis for the day's health and attendance, and child health observation records provide the basis for continuous observation and handling. Field characteristics are concentrated in dates, names, quantities, signatures, and receipts, and different update rhythms make version misalignment likely. The retrieval service must include all three types of materials as candidates at the same time for the reranking model to sort, and the final basis entries are completed by citation trimming and answer generation.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs sorted candidates and reranking scores. "Basis entries that can be traced back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be applied directly, so the reranking model is usually used again to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Time slots, activity names, responsible teachers, venues, and version date match the original text, and it is the current version | Check whether `searchMode` enables both vector and full-text paths at the same time, and confirm that candidates come from the merge of both paths |
| Morning and afternoon check records | Child names, body temperature, check items, handling of abnormalities, teacher signatures, and dates match the original text | Compare the order and reranking scores of the first three items before and after enabling `usingReRank`, and record the number of candidates and scores |
| Child health observation records | Observation dates, description of performance, handling measures, health personnel signatures, and receipts match the original text | Use `similarity` and `limit` to observe the candidate scope, and confirm that reranking scores are used for filtering without changing the original text |
| Hybrid retrieval candidates | The results of both paths have been merged, and candidates come from both vector and full-text paths at the same time | Compare the ranking and scores before and after reranking, and check whether the first few items are relevant to cross-material basis questions |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same morning and afternoon check record do not match across the daily life schedule and the health observation record. Cause: The three types of materials have different update rhythms, and fields are not aligned by the same child and the same day.
- Phenomenon: The basis entry cites an old version of the daily life schedule and is inconsistent with the current arrangement. Cause: The version was not synchronized, the current version did not enter the candidates, or the reranking score did not rank the current version first.
- Phenomenon: The morning and afternoon check record or health observation record lacks a teacher signature or receipt, but the basis entry is still generated. Cause: Citation trimming did not check the signature and receipt fields, and answer generation did not require tracing back to the original text.

## How to verify the setup

Acceptance for this function: compare the order and scores of the first three items before and after enabling reranking, confirm that the reranking model only outputs sorted candidates and reranking scores, and that citation trimming and answer generation then complete basis entries that can be traced back to the original text.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check that the source comes from this kindergarten's materials, that the version is the current one, and that the entries match the original text.

- In the search parameters, check the two-path switches of `searchMode`, and confirm that hybrid retrieval simultaneously runs vector and full-text and merges the results.
- Compare the ranking and scores before and after reranking, record the number of candidates and scores, and confirm that `usingReRank` is used for sorting and filtering.
