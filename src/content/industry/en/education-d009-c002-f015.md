---
title: Knowledge Base Retrieval for Kindergarten Play Activity Organization: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c002-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Retrieval | Multilingual
meta_description: Kindergarten Play: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Play Activity Organization: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the scenario of kindergarten play activity organization, materials mainly consist of observation records, area plans, material placement lists, activity objectives, and reflections converted into next week's plans. Observation records are generated daily, area plans are updated weekly, the quantity of material placement is adjusted with activities, and goal achievement and reflections converted into next week's plans are summarized at weekly nodes. When these materials enter the knowledge base retrieval and recall function, observation records and area plans serve as the primary source for semantic recall, material placement lists and activity objectives serve as supplements for full-text recall, and reflections converted into next week's plans serve as cross-validation material for reranking and filtering. Multilingual materials and terminology processing require the same term to be consistent throughout the entire text and translated names to be able to refer back to the original text. Therefore, during retrieval, candidate segments need to cover different written forms of the same term, and then through merging and reranking, the most relevant segments are ranked first, for subsequent nodes or manual generation of a unified terminology list and comparison draft.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after pattern, merging, reranking, filtering, and upper limit trimming). The unified terminology list and comparison draft are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans correspondence | The same term is consistent throughout the entire text, and translated names can refer back to the original text; the activity objectives in observation records and the objective expressions in area plans need to be able to refer to each other | In the search test, test once each with synonym-rewritten questions, switch `searchMode` to semantic, full-text, and hybrid, compare the number of candidates and scores, and check whether the objective expressions of observation records and area plans are consistent |
| Material placement quantity | Insufficient materials will cause activity objectives to be inconsistent with observations; the quantity in the material placement list and the quantity in the area plan need to be consistent | Test once each with synonym-rewritten questions, compare whether candidate segments simultaneously contain the quantity expressions from the material placement list and the area plan, then toggle `usingReRank` to see the ranking of the top few results |
| Reflections converted into next week's plans | When the plan is not updated, the terminology in reflections converted into next week's plans is inconsistent with observation records and area plans | Sample three terms to check whether their written forms are consistent throughout the entire text, check whether reflections converted into next week's plans have been updated, and use `similarity` and `limit` to observe changes in the number of candidates and scores |
| Unified terminology list and comparison draft | The same term is consistent throughout the entire text, and translated names can refer back to the original text; sample three terms to check whether their written forms are consistent throughout the entire text | In the search test, switch `searchMode` and toggle `usingReRank`, compare candidate segments and similarity scores, and check whether the terminology list and comparison draft can refer back to the original text |

## Three common errors

- Phenomenon: The same question cannot be recalled when phrased differently. Cause: Question optimization and multi-route recall do not cover that phrasing, and candidate segments do not hit different written forms of the same term.
- Phenomenon: There are many candidates but the ones ranked first are all irrelevant. Cause: Reranking is not enabled, or after similarity filtering and citation upper limit trimming, material placement quantity and activity objective segments are not ranked first.
- Phenomenon: The answer lacks key paragraphs. Cause: Reflections converted into next week's plans are not updated, and the objective expressions of observation records and area plans are inconsistent, resulting in incomplete coverage of candidate segments.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle reranking to see the ranking of the top few results; at the same time, check the impact of `searchMode`, `similarity`, `limit`, and `usingReRank` on the number of candidates and scores.

Business test: sample three terms to check whether their written forms are consistent throughout the entire text, check whether translated names can refer back to the original text, and confirm whether the four items—observation records and area plans correspondence, material placement quantity, activity objective achievement, and reflections converted into next week's plans—are consistent.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, and hybrid, compare candidate segments and similarity scores, and record the number of candidates and scores.
- Toggle `usingReRank` to compare the ranking of the top few results, and use `similarity` and `limit` to observe the tokens of the cited text after filtering and upper limit trimming; record the number of array items separately.
