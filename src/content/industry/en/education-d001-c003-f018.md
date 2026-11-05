---
title: Reranking and Hybrid Retrieval for Kindergarten Healthcare and Meal Management: Find Supporting Evidence
slug: /en/industry/education-d001-c003-f018
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Reranking | Evidence
meta_description: Child Health and Meals: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Kindergarten Healthcare and Meal Management: Find Supporting Evidence

## What this category's data looks like

This page addresses kindergarten health care and meal management scenarios. Materials include procurement documents with ingredient names and specifications, retention samples records and batches, recipes, disinfection records, absence cause classification tables, and the kindergarten's health care policies. These materials are updated weekly and monthly, and the version is based on the current archive of the kindergarten's health care office. When entering hybrid retrieval, recipe and policy texts go through the full-text path, while document and batch fields go through the vector path. After the two paths are merged, they are uniformly sorted by the rearrangement model, which is used for subsequent citation trimming to locate entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the rearrangement model in the retrieval service, which outputs sorted candidates and rearrangement scores. The basis entries that can be traced back to the original text are completed next by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be directly applied. Usually, the rearrangement model is then used to sort and filter by rearrangement score.

| Object | Check | Verification action |
| --- | --- | --- |
| Hybrid retrieval | Both vector and full-text paths are enabled; candidates should come from both paths | Check the switches for both paths in the search parameters, and see whether candidates come from both paths; compare `searchMode` and `usingReRank` |
| Rearrangement model | Bound and used for sorting and filtering; order and scores before and after rearrangement can be compared | Compare the order and scores before and after rearrangement, use rearrangement scores for filtering, and record the number of candidates and scores |
| Retention samples records and batches | Retention time and batch can match the ingredient names and specifications in the procurement documents | Align retention batches with documents one by one, and check that retention time falls outside the disinfection period |
| Disinfection records and absence cause classification | Disinfection periods have no gaps; absence cause classification is consistent with recipes and procurement categories | Fill in disinfection periods by date, and check whether absence cause classification matches recipes and procurement categories |

## Three common errors

- Symptom: Documents and retention batches do not match. Cause: Retention time and batch fields are not updated in sync with the ingredient names and specifications in procurement documents, causing mixed ordering of candidates after merging.
- Symptom: Recipes and procurement categories are inconsistent. Cause: Recipe texts go through the full-text path, procurement fields go through the vector path, and after merging the two paths, filtering by rearrangement score is not applied.
- Symptom: Disinfection records are missing periods. Cause: Disinfection period fields are incomplete, rearrangement scores are close, and the top candidates are ranked to irrelevant materials.

## How to verify the setup

Acceptance of this feature: compare the order and scores of the top three before and after enabling rearrangement, record the number of candidates and scores, and check whether `usingReRank` and `similarity` participate in filtering.

Business test: ask a basis question that spans materials, see whether the answer provides traceable sources, and check that the sources match the kindergarten's materials and current version.

- Check the switches for both paths in the search parameters, confirm that candidates come from both paths, and record the number of candidates and rearrangement scores.
- Compare the order and scores of the top three before and after rearrangement, check the values of `limit` and `searchMode`, and confirm that filtering is performed by rearrangement score.
