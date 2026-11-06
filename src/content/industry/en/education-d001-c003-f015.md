---
title: Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Find Supporting Evidence
slug: /en/industry/education-d001-c003-f015
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Retrieval | Evidence
meta_description: Child Health and Meals: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Find Supporting Evidence

## What this category's data looks like

Materials for kindergarten health care and meal management include: food ingredient procurement documents and acceptance records, quantified recipes, food sample retention registration, disinfection records, absence and cause registration, and health room morning checks and all-day observation records. These materials enter the knowledge base in the form of text, tables, and scanned documents, and are recalled by the knowledge base retrieval service. The materials are updated daily, weekly, and monthly, and the fields involve ingredient names and specifications, sample retention time and batch, disinfection time period, and absence cause classification. Procurement documents and sample retention registration corroborate each other, recipes and procurement categories must be consistent, and disinfection records are registered item by item by class and time period. After the materials enter the retrieval function, each participates in recall as a source of candidate snippets and does not assume the responsibility of statistical summarization.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). "Basis items that can be traced back to the original text" are completed subsequently by later nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Food sample retention registration | The sample retention time and batch can match the procurement documents and the day's recipe | Search the sample retention batch with synonymous questions, see whether the time and batch fields of the candidate snippets are consistent with the documents, and record the number of candidate items and the `similarity` score |
| Quantified recipe | The ingredient names and specifications in the recipe are consistent with the procurement categories | Switch `searchMode` to full-text or hybrid, search for an ingredient name, and check whether the candidate snippets hit both the recipe and the procurement records |
| Disinfection records | The disinfection time periods are complete item by item by class, with no missing time periods | Search for a class's disinfection time period on a certain day, enable `usingReRank` to compare the ranking of the top few items, and confirm that the time period fields are complete |
| Absence and cause registration | The absence cause classification and the health room observation records can refer back to each other | Search for a cause keyword, check the source of the candidate snippets, and check by `limit` whether the number of cited items covers the corresponding materials |

## Three common errors

- Phenomenon: The sample retention batch does not match the procurement documents. Cause: The candidate snippets come from different materials but the batch field was not checked, and the original text must be traced back for confirmation.
- Phenomenon: The recipe and procurement categories are inconsistent. Cause: During recall, only recipe snippets were hit, and procurement records were not recalled at the same time, so full-text retrieval must be added.
- Phenomenon: Disinfection records are missing time periods. Cause: Candidate snippets were filtered by similarity or trimmed by the citation limit, so the cited text tokens and array item count must be checked.

## How to verify the setup

Acceptance of this function: test once each with synonymously rewritten questions, compare the number of candidate items and the `similarity` score, then toggle `usingReRank` on and off to observe changes in the ranking of the top few items.

Business test: ask a basis question that spans materials and see whether the answer gives a traceable source.

- In the knowledge base search test, switch `searchMode` and record the number of candidate items and scores for the semantic, full-text, and hybrid modes respectively.
- Adjust the citation limit by `limit`, check the cited text tokens and array item count, and confirm that key snippets have not been trimmed out.
