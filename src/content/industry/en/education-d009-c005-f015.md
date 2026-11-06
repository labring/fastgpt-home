---
title: Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c005-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Retrieval | Multilingual
meta_description: Kindergarten Safety: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Handle Multilingual Materials and Terminology

## What this category's data looks like

The materials on this page come from kindergarten safety protection and emergency drill scenarios, covering hazard rectification ledgers, drill plans and sign-in records, access control and school bus checklists, responsible person signature pages, and multilingual terminology lists. These materials enter the knowledge base in three forms: Chinese source drafts, foreign-language translations, and bilingual parallel drafts, respectively serving as the original records of hazard items and rectification deadlines, the process evidence of drill participant counts and sign-ins, the item-by-item confirmation of access control and school bus check items, and the closed-loop evidence of responsible person signatures. The update cadence follows the kindergarten's monthly safety inspections and quarterly drills, with re-ingestion after each addition or revision. Field characteristics include hazard number, rectification deadline, drill session, participant count, check item name, signature column, and translation name comparison column. Multilingual versions must keep the same terminology written consistently throughout the entire text, and the translated name must be able to refer back to the original text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). "Unified terminology list and parallel draft" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard rectification ledger | Whether hazard items and rectification deadlines correspond one by one and form a closed loop | Use synonymous questions to retrieve the hazard number, and check whether the candidate chunks simultaneously contain the hazard item, rectification deadline, and closed-loop status; compare the number of candidate chunks and scores after switching `searchMode` among semantic, full-text, and hybrid |
| Drill plans and sign-in records | Whether the drill participant count and sign-ins are consistent with the plan | Retrieve the drill session, and check whether the plan participant count and sign-in count in the candidate chunks come from the same source; observe changes in the number of candidate chunks and scores before and after `similarity` filtering |
| Access control and school bus checklists | Whether access control and school bus check items have omissions | Retrieve the checklist name, and check whether the candidate chunks cover all access control and school bus check items; enable `usingReRank` and compare changes in the ranking of the top few results |
| Multilingual terminology parallel draft | Whether the same terminology is written consistently throughout the entire text, and whether the translated name can refer back to the original text | Extract three terms and retrieve their writing and translated names throughout the entire text; check the correspondence between terms and the original text in the candidate chunks, record the number of array entries, and separately check the referenced text tokens; `limit` only controls the reference upper limit |

## Three common errors

- Phenomenon: The hazard rectification deadline has passed, but the ledger still shows it as not closed. Cause: The retrieval candidates only hit the hazard item description and did not recall the rectification deadline and closed-loop status fields.
- Phenomenon: The participant count in the drill record is inconsistent with the plan participant count. Cause: The candidate chunks come from different sessions or different versions, and were not filtered by session after merging.
- Phenomenon: Access control or school bus check items are missing from the candidates. Cause: Similarity filtering and reference upper limit trimming cut out some check item chunks, failing to retain key passages from the original text.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few results; record the number of candidate chunks and scores, and check the impact of `similarity`, `limit`, `usingReRank`, and `searchMode` on the results.

Business test: sample three terms to check whether their writing is consistent throughout the entire text and whether the translated names can refer back to the original text.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, and hybrid, record the number of candidate chunks and scores respectively, and confirm that the multi-path merge includes both semantic and full-text results.
- Enable and disable `usingReRank`, and compare the order of the top few candidates; adjust `similarity` and `limit`, check the referenced text tokens and the number of array entries, and confirm that key chunks have not been trimmed out.
