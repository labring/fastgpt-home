---
title: Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Track Progress and Check Statistics
slug: /en/industry/education-d006-c003-f015
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Retrieval | Progress
meta_description: Child Health and Meals: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Track Progress and Check Statistics

## What this category's data looks like

Materials for kindergarten health care and meal management roll forward weekly and monthly: ingredient names and specifications, retention sample times and batches, disinfection periods, categorized causes of absence, as well as menus, procurement documents, disinfection records, and attendance registers. When these materials enter knowledge base retrieval and recall, each plays a different role—menus and procurement documents provide category and scope clues, retention sample and disinfection records provide time and batch clues, and categorized causes of absence provide statistical scope clues. The update cadence follows weekly and monthly reports, and the field characteristics are multi-table intersections, with batch and period items prone to being missing. The retrieval service is only responsible for splitting these materials into candidate chunks and giving similarity scores, for subsequent nodes or humans to use as a basis for generating progress tables and statistical scope explanations.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The "progress table and statistical scope explanation" is then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient names and specifications | Whether the menu and procurement categories are consistent, and whether the specifications are written into the header | In the knowledge base search test, switch `searchMode`, retrieve once each with the menu category and the procurement category, compare candidate chunks and scores, and confirm whether the specification field falls within the candidates |
| Retention sample times and batches | Whether the documents and retention sample batches match, and whether the periods are complete | Retrieve once each with the retention sample batch number and the document batch number, check whether the candidates hit both at the same time, and record the number of candidate items and scores |
| Disinfection periods | Whether the disinfection records are missing periods, and whether the periods can be classified into the statistical scope | Retrieve with disinfection period keywords, compare the ranking of the top few items before and after enabling `usingReRank`, and confirm whether the period chunks are retained |
| Categorized causes of absence | Whether the classification scope is written into the header, and whether exceptions are clearly stated | Retrieve with categorized cause-of-absence terms, adjust `similarity` and `limit`, observe changes in the number of candidate items and scores, and verify and record the cited text tokens and the number of array items separately |

## Three common errors

- Phenomenon: The documents and retention sample batches do not match. Cause: The retrieved hit chunks only cover the document side, and the retention sample side batches are not recalled at the same time; first verify hits and associations, then supplement retrieval terms.
- Phenomenon: The menu and procurement categories are inconsistent. Cause: Candidates come from different recall channels and are not merged and aligned, and the category scope is not written into the header; compare semantic and full-text results in the search test.
- Phenomenon: Disinfection records are missing periods. Cause: Period chunks are truncated after similarity filtering and citation limit trimming; verify the cited text tokens, and record the number of array items separately.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few items; switch `searchMode` and `usingReRank`, and record the number of candidate items and scores.

Business test: use one week of records to verify the totals, check whether the scope and exceptions are clearly stated, and confirm that the number of records matches the statistical count and that the scope is written into the header.

- In the knowledge base search test, fix the question, switch `searchMode` among semantic, full-text, and hybrid respectively, and record the number of candidate items and scores.
- Compare the order of the top few items before and after enabling `usingReRank`, adjust `similarity` and `limit`, and verify the cited text tokens and the number of array items.
