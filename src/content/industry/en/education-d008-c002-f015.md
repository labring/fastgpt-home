---
title: Knowledge Base Retrieval for Kindergarten Play Activity Organization: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c002-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Retrieval | Access
meta_description: Kindergarten Play: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Play Activity Organization: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the kindergarten game activity organization scenario. Material sources include observation records, area plans, material placement lists, activity objectives, and reflection records. When these materials enter the knowledge base retrieval and recall function, observation records and area plans serve as the primary candidate sources for semantic retrieval, material placement lists and activity objectives are used for full-text recall matching, and reflection records participate in question optimization and reranking. The update cadence advances weekly, refreshing synchronously when reflections are converted into next week's plans. Field characteristics are activity name, area, material quantity, objective description, observation points, and reflection conclusions. The retrieval mode must match the material form, choosing one of semantic, full-text, or hybrid. Through search testing, compare candidate snippets and similarity scores to confirm that material roles and visibility scopes are consistent.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search testing), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). The externally available entry points and authorization scope are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | Observation records correspond to area plans; when objectives and observations do not match, recalled snippets will deviate from the activity objectives | In search testing, test once each with synonymous questions, compare the number of candidates and similarity scores, and check whether the observation points are hit |
| Material placement list | The material placement quantity is consistent with the materials required to achieve the activity objectives; when materials are insufficient, candidate snippets will lack key paragraphs | Switch `searchMode` to full-text or hybrid, check whether candidates include material quantity and area information, and record the number of candidates |
| Reflection records converted to next week's plans | Reflections are converted to next week's plans and the plans have been updated; when plans are not updated, candidate snippets still point to old activities | Compare the ranking of the top few items before and after enabling `usingReRank`, check whether reflection conclusions enter the candidates, and inspect the snippets retained after `similarity` filtering |
| Authorized access scope | The visitor's identity matches the visibility scope; unauthorized access is not visible | Access once with a restricted identity, check the number of candidates and cited text, confirm that key original snippets are still retained after citation limit trimming, and that `limit` and `similarity` take effect as configured |

## Three common errors

- Symptom: The same activity cannot be recalled when phrased differently. Cause: Question optimization does not cover references and expansions, and semantic recall does not hit observation records and area plans.
- Symptom: There are many candidates but the ones ranked at the top are all irrelevant. Cause: After hybrid retrieval, no reranking secondary sort is performed, and the weights of material placement lists and activity objectives are misaligned.
- Symptom: The answer lacks key paragraphs. Cause: Similarity filtering and citation limit trimming are too tight, reflection records converted to next week's plans are not updated, and the plans still point to old activities.

## How to verify the setup

This feature acceptance: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking to observe the ranking of the top few items; record the number of candidates and similarity scores, and check the configured effects of `searchMode`, `usingReRank`, `similarity`, and `limit`.

Business testing: Access once with a restricted identity, check whether the visibility scope matches the configuration, and that unauthorized content is not visible.

- In the knowledge base search testing, switch retrieval modes, compare the number of candidates and similarity scores, and confirm that observation records correspond to area plans.
- Compare the ranking of the top few items before and after enabling reranking, check whether the material placement quantity is consistent with the achievement of activity objectives, and whether reflection records converted to next week's plans are updated.
