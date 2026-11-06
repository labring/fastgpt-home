---
title: Knowledge Base Retrieval for School Teacher Training Credits: Track Progress and Check Statistics
slug: /en/industry/education-d006-c013-f015
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Retrieval | Progress
meta_description: Teacher Credits: review retrieval for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Teacher Training Credits: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of credit management for primary and secondary school teacher training. The materials include three types: training notices, credit recognition forms, and attendance rosters. Training notices provide the project name, start and end dates, hours, and signature/seal requirements; credit recognition forms carry teacher names, ID document numbers, course modules, recognized credits, and review signatures; attendance rosters record attendance dates, sign-ins, and receipts. The three types of materials are updated by project batch or academic year, with fields structured around names, dates, quantities, and signatures. When entering knowledge base retrieval and recall, training notices and recognition forms are recalled as the basis for definitions, and attendance rosters are recalled as the source of item-by-item records. Together, the three support candidate snippets for progress records and statistical verification, for subsequent nodes or manual work to organize progress tables and statistical definition notes.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "progress table and statistical definition notes" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Fields include project name, start and end dates, hours, and signature/seal; the name and dates must be consistent with the recognition form and roster | In the search test, switch `searchMode`, search once each by project name and date, and compare whether the names and dates in the candidate snippets match those in the recognition form and roster |
| Credit recognition form | Fields include name, course module, recognized credits, and review signature; the name and quantity must be consistent with the roster | Search by the same teacher name and check whether the candidate snippets provide records from both the recognition form and the roster; verify whether signatures and receipts are complete, and record the number of candidate items and scores |
| Attendance roster | Fields include attendance date, sign-in, and receipt; they must be consistent with the start and end dates of the notice and the credit quantity in the recognition form | Search attendance records by week, verify item-by-item records against the total; compare the order of the first few items before and after enabling rerank, and adjust `similarity` to observe changes in candidates after filtering |
| Cited content | The number of cited items is the array length, and `limit` controls the maximum number of items; the tokens of the cited text are verified separately | Check the number of returned cited items and text completeness; compare the ranking of the first few items before and after toggling `usingReRank`; for the citation limit, verify only the text tokens, and do not compare it for equality with the array item count |

## Three common errors

- Symptom: The same teacher's name spelling or credit quantity does not match between the recognition form and the attendance roster. Cause: When the two materials were entered, they were not checked against the same field definitions, and versions were not synchronized.
- Symptom: The start and end dates of the training notice are inconsistent with the attendance dates in the roster, and the totals do not match. Cause: After the notice was revised, the old roster was not updated, and signatures or receipts are missing.
- Symptom: The same question phrased differently cannot be recalled, and there are many candidates but the top-ranked ones are irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too strict.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, and compare candidates and scores; then toggle rerank to inspect the ranking of the first few items, and switch `searchMode` to observe differences between semantic and full-text candidates.

Business test: use one week of records to verify the total, and check whether definitions and exceptions are clearly written; verify whether the record count and statistical count match, and whether the definitions are written in the header.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores across semantic, full-text, and hybrid modes, and record the number of returned cited items.
- Search once each with `usingReRank` enabled and disabled, and compare the order of the first few items; adjust `similarity` and `limit`, and verify the cited text tokens and array item count separately.
