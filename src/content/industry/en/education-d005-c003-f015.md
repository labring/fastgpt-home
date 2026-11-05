---
title: Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c003-f015
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Retrieval | Versions
meta_description: Child Health and Meals: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Maintain Document Versions and Changes

## What this category's data looks like

Kindergarten health care and meal management involves materials such as ingredient names and specifications, retention sample times and batches, disinfection periods, and absence cause categorization. Sources include recipes, purchase orders, retention sample records, disinfection records, and absence registrations. The update cadence varies daily, weekly, and monthly, and the field characteristics are batch numbers, specifications, time periods, and categorization labels. When the materials enter knowledge base retrieval and recall, recipes and purchase orders serve as semantic recall materials, retention sample and disinfection records serve as full-text recall materials, and absence cause categorization serves as hybrid recall materials. Each participates as candidate chunks in merging, reranking, filtering, and upper-limit trimming, and does not directly generate ledgers.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merging, reranking, filtering, and upper-limit trimming). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient names and specifications | Whether recipes and purchase categories are consistent | In the search test, switch `searchMode` to hybrid, check whether the candidate chunks cover both recipes and purchase orders, and record the number of candidates and scores |
| Retention sample times and batches | Whether documents and retention sample batches match | Retrieve retention sample records with synonymous questions, view the batch number and time fields of the returned candidates, and compare score changes after adjusting `similarity` |
| Disinfection periods | Whether disinfection records are missing periods | Retrieve by disinfection period, compare the ranking of the top few results before and after enabling `usingReRank`, and confirm that the period field is complete |
| Absence cause categorization | Whether categorization labels and registrations are consistent | Retrieve absence registrations with categorization labels, check whether the candidate chunks contain the categorization field, and record the number of candidates and scores |

## Three common errors

- Symptom: documents and retention sample batches do not match. Cause: retrieval candidates did not hit both purchase orders and retention sample records at the same time, and after merging the chunks came from different batches.
- Symptom: recipes and purchase categories are inconsistent. Cause: semantic recall and full-text recall results were not aligned, and after reranking the top chunks leaned toward a single source.
- Symptom: disinfection records are missing periods. Cause: full-text recall did not cover the period field, and key chunks were trimmed after similarity filtering.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking on and off to see the ranking of the top few results.

Business test: change one piece of content and see whether the version number and references update in sync.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores across semantic, full-text, and hybrid modes.
- Adjust `similarity` and `limit`, observe changes in the number of candidates and reference text tokens, and record the array count separately.
