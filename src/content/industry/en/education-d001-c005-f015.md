---
title: Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Find Supporting Evidence
slug: /en/industry/education-d001-c005-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Retrieval | Evidence
meta_description: Kindergarten Safety: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Safety and Emergency Drills: Find Supporting Evidence

## What this category's data looks like

This page addresses kindergarten safety protection and emergency drills. Materials include hazard ledgers, rectification notices, drill plans, sign-in sheets, access control and school bus inspection records, and responsible person signature pages. These materials are updated by semester and by month, and their fields include hazard items, rectification deadlines, drill headcount, inspection items, and signature columns. When entering the knowledge base retrieval service, hazard ledgers and rectification notices serve as the basis source, drill plans and sign-in sheets serve as the headcount and process verification source, access control and school bus inspection records serve as the inspection item completeness source, and responsible person signature pages serve as the closed-loop confirmation source. The currently effective version of the materials prevails, historical versions serve as reference, and retrieval must distinguish current from voided versions.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). Basis entries that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard ledgers and rectification notices | Hazard items and rectification deadlines match the original text, and the rectification status is closed-loop | In the search test, use synonymous questions to retrieve hazard items, check whether the candidate chunks contain the deadline and closed-loop records, record the number of candidates and scores, and view `similarity` and `limit` |
| Drill plans and sign-in sheets | Drill headcount is consistent with sign-in records, and drill records match the plan process | Switch `searchMode` to hybrid, retrieve drill headcount and sign-ins, check whether the candidates provide both plan and sign-in chunks, and check whether the headcount is consistent |
| Access control and school bus inspection records | No inspection items are missing, and responsible person signatures are complete | Retrieve access control and school bus inspection items, check whether the candidate chunks cover all inspection items and signature columns, and enable `usingReRank` to compare the ranking of the top few results |
| Knowledge base search test | The number of candidates and scores can be recorded, and cited text tokens are verified separately | Test once each with synonym-rewritten questions, record the number of candidates and scores, and toggle rerank to observe changes in the ranking of the top few results |

## Three common errors

- Symptom: the hazard ledger shows not rectified, while the rectification notice is closed-loop. Cause: the hazard is not closed-loop, the two material versions are not aligned, and retrieval candidates mix different versions.
- Symptom: the drill sign-in headcount is inconsistent with the planned headcount in the plan. Cause: the drill records do not match the plan, the sign-in sheet is not updated, and the candidate chunks come from an old plan.
- Symptom: the access control inspection record lacks a certain inspection item and signature. Cause: an inspection item is missing, the responsible person signature is missing, and the candidate chunks do not cover the complete inspection items.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank to observe the ranking of the top few results; record the number of candidates and scores, verify cited text tokens separately, and confirm `similarity`, `limit`, and `usingReRank` item by item.

Business test: ask a basis question that spans materials and see whether the answer provides a traceable source, for example whether the hazard rectification deadline and drill headcount come from the kindergarten's current materials.

- In the search test, use synonymous questions to retrieve hazard items, check whether the candidate chunks contain the rectification deadline and closed-loop records, and record the number of candidates and scores.
- Switch `searchMode` to hybrid, retrieve drill headcount and sign-ins, check whether the candidates provide both plan and sign-in chunks, and enable `usingReRank` to compare the ranking of the top few results.
