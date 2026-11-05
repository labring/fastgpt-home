---
title: Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c003-f015
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Retrieval | Access
meta_description: Child Health and Meals: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Manage Authorized Access and External Services

## What this category's data looks like

Kindergarten health care and meal management materials include food procurement orders and specifications, retention sample records and batches, recipes, disinfection period records, and absence cause classification tables. These materials are updated daily or per meal, with fields including food name, specification, batch number, retention sample time, disinfection start and end periods, and absence cause classification. When entering the knowledge base retrieval function, procurement orders and recipes are used to verify category consistency, retention sample records and batches are used to trace the correspondence between documents, disinfection records are used to check period completeness, and absence classification is used to calculate cause distribution. Each material participates in recall as candidate fragments and does not directly generate external authorization results.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The externally available entry points and authorization scope are completed by subsequent nodes or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Retention sample records and batches | When documents and retention sample batches do not match, the batch number and document number in candidate fragments cannot correspond | Search the batch number in the search test, check the `similarity` score and number of candidates, and confirm whether the batch and document are hit at the same time |
| Recipes and procurement categories | When the categories listed in recipes are inconsistent with the categories in procurement orders, differences appear in the category names of recalled fragments | Switch `searchMode` to hybrid, compare semantic and full-text candidates, and check whether recipes and procurement categories are consistent |
| Disinfection period records | When disinfection records are missing periods, the disinfection start and end times in recalled fragments are incomplete | Compare the ranking of the first few items before and after enabling `usingReRank`, and check whether the disinfection periods are complete |
| Absence cause classification | When absence cause classification is inconsistent with records, the cause classification labels in recalled fragments do not match | Access once with a restricted identity, check whether the visible scope contains only authorized materials, and record the number of candidates and scores |

## Three common errors

- Phenomenon: documents and retention sample batches do not match. Cause: the retrieved hit fragments do not contain both the batch number and the document number; first verify hits and associations, and do not directly attribute this to reference limit trimming.
- Phenomenon: recipes and procurement categories are inconsistent. Cause: incomplete recall channel coverage or a mode selection that does not match the material form, resulting in missing category names in candidate fragments.
- Phenomenon: disinfection records are missing periods. Cause: after similarity filtering and reference limit trimming, the retained fragments do not cover the complete disinfection start and end times; check `limit` and reference text tokens.

## How to verify the setup

Acceptance for this function: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the first few items; record the number of candidates and scores, and check the status of `similarity`, `searchMode`, and `usingReRank`.

Business test: access once with a restricted identity, check whether the visible scope matches the setting, ensure unauthorized content is not visible, and record the number of returned candidates and scores.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, and compare candidate fragments and similarity scores.
- Enable or disable `usingReRank`, compare the order of the first few candidates, and check `limit` and reference text tokens; record the array length separately.
