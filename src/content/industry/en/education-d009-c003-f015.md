---
title: Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c003-f015
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Retrieval | Multilingual
meta_description: Child Health and Meals: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the kindergarten health care and meal management scenario. The materials come from recipes, purchase orders, retention sample records, disinfection logs, absence cause registrations, and parent notices, including Chinese and multilingual parallel drafts. The update cadence is mixed across daily, weekly, and monthly: recipes and purchases are updated weekly, retention samples and disinfection are recorded by shift, and absence causes are categorized daily. When materials enter knowledge base retrieval and recall, ingredient names and specifications, retention sample times and batches, disinfection time periods, and absence cause categories are each recalled as independent chunks, while multilingual terms participate in matching as cross-language parallel clues. The retrieval service is only responsible for providing candidate chunks and similarity scores; the unified terminology glossary and parallel drafts are organized by subsequent nodes or manually based on these, so the consistency of the same term's wording throughout the entire document depends on manual cross-referencing back to the original text for verification.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and limit trimming). The unified terminology glossary and parallel drafts are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient names and specifications | Whether the recipe and purchase categories are consistent | In the knowledge base search test, switch `searchMode`, search once each with the recipe dish name and the purchase item name, compare the candidate chunks and scores, and see whether the same ingredient is hit by both |
| Retention sample times and batches | Whether the documents and retention sample batches match up | Search separately with the retention sample number and batch number, check whether the times and batches in the candidate chunks refer back to the same record, and record the number of candidates and scores |
| Disinfection time periods | Whether the disinfection records are missing time periods | Search the disinfection logs by shift time period, observe whether the returned candidates cover each time period, and compare the ordering of the top few entries before and after enabling `usingReRank` |
| Multilingual terminology parallel drafts | Whether the translated names can refer back to the original text | Search once each with the Chinese term and the foreign-language translated name, see whether the candidates contain both the original text and the translated name, and record the `similarity` score |

## Three common errors

- Symptom: the documents and retention sample batches do not match up. Cause: retention sample times and batches are recalled as independent chunks, and the candidates do not hit the same batch simultaneously; you need to first verify the hits and associations, then organize the parallel drafts.
- Symptom: the recipe and purchase categories are inconsistent. Cause: ingredient names and specifications are written differently in recipes and purchase orders, the recalled candidates lean to one side each, and after similarity filtering the key chunks are trimmed out.
- Symptom: the disinfection records are missing time periods. Cause: disinfection time periods are recorded separately by shift, and after hybrid retrieval merging, the top-ranked candidates are concentrated in a few time periods, and the citation limit trimming cuts off the remaining time periods.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare the candidates and scores, then toggle re-ranking on and off to see the ordering of the top few entries; at the same time switch `searchMode` to observe the candidate sources, and record the number of candidates and the `similarity` score.

Business test: sample three terms and check whether their wording is consistent throughout the entire document.

- In the knowledge base search test, switch the retrieval mode, compare the candidate chunks and scores for the same question, and confirm whether the multi-path merge includes both semantic and full-text results.
- Search once each with re-ranking enabled and disabled, compare the ordering of the top few entries; then check the tokens and array length of the cited text, and record `limit` and `similarity` according to the actual candidates.
