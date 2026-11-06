---
title: Knowledge Base Retrieval for Daily Kindergarten Care Management: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c001-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Retrieval | Access
meta_description: Kindergarten Care: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Daily Kindergarten Care Management: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses kindergarten childcare daily life management materials, including three categories: daily life schedules, morning and afternoon check records, and child health observation records. Daily life schedules are updated weekly or monthly and contain activity time slots, segment names, staff on duty, and signature fields; morning and afternoon check records are updated daily and contain child names, temperature measurements and observation items, abnormality annotations, handling opinions, and parent receipts; child health observation records are updated per session or weekly and contain observation dates, performance descriptions, follow-up measures, and confirmation signatures. After these three categories of materials enter the knowledge base retrieval and recall stage, each assumes a different role: schedules provide time slot and segment definitions, morning and afternoon check records provide the day's facts and handling traces, and health observation records provide the basis for continuous observation and follow-up. External entry points and authorization scopes are divided accordingly: parents can see segments related to their own children, superiors can see summary-level segments, and unauthorized content does not enter the candidates.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The external entry points and authorization scopes are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Time slots, segment names, staff on duty, dates, and signatures are consistent across all materials, and versions are synchronized | In the search test, search once each using different expressions of the same segment name, compare candidates and scores, and check the candidate differences after switching `searchMode` |
| Morning and afternoon check records | Child names, temperature measurements and observation items, abnormality annotations, handling opinions, dates, and parent receipts are complete | Use a restricted identity to search the day's records, check the number of candidates and scores, and confirm whether receipt and signature segments enter the citations |
| Child health observation records | Observation dates, performance descriptions, follow-up measures, and confirmation signatures match the schedules and morning and afternoon check records | Compare the order of the top few items before and after enabling rerank, check the sorting changes under the `usingReRank` state, and record the candidates after `similarity` filtering |
| External entry points and authorization scope | Visitor identity matches the visible scope, and unauthorized segments do not enter candidates or citations | Access once with a restricted identity, check the number and content completeness of returned candidates, and confirm that the citation upper limit only trims tokens without changing the number of array items |

## Three common errors

- Symptom: The name, quantity, and date of the same morning and afternoon check record do not match between the schedule and the observation record. Cause: Multiple materials are entered separately, and versions are not checked and synchronized according to the same definition.
- Symptom: After the external entry point is opened, parents see segments unrelated to their own children. Cause: The authorization scope is not narrowed by identity, and candidates and citations are not filtered for visibility.
- Symptom: The schedule lacks signatures or receipts, and the observation record's follow-up measures lack confirmation. Cause: The material circulation step does not collect signed documents, and versions are not synchronized to the latest.

## How to verify the setup

This feature acceptance: Test once each with synonym-rewritten questions, compare candidates and similarity scores, then toggle rerank to observe the order of the top few items; switch `searchMode` to observe differences between semantic and full-text candidates, record the number of items after `similarity` filtering, check only the citation text tokens for the citation upper limit, record the number of array items separately, and check `limit` and `usingReRank` separately.

Business test: Access once with a restricted identity and see whether the visible scope matches the settings.

- In the knowledge base search test, search once each using different expressions of the same question, record the number of candidates and scores, and switch `searchMode` to compare candidate differences among semantic, full-text, and hybrid.
- Compare the order of the top few items before and after toggling rerank, check whether `usingReRank` takes effect, and check whether key segments of the original text are still retained after `similarity` filtering and citation upper-limit trimming.
