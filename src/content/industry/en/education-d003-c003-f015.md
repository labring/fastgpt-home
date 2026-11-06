---
title: Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c003-f015
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Retrieval | Intake
meta_description: Child Health and Meals: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the kindergarten health care and meal management scenario. The materials come from health room morning checks and absence registries, cafeteria procurement and menu scheduling, retention cabinet batch labels, disinfection time-period records, ingredient specification cards, and so on. These materials enter the knowledge base in document or table form, and each plays a different role during retrieval: ingredient specifications and procurement categories are used to check menu consistency, retention batches and times are used to trace document matching, disinfection time periods are used to fill in missing record items, and absence cause classification is used to determine whether a question lacks key classification information. The material update cadence follows daily morning checks, weekly menus, and per-meal retention, and the field characteristics include ingredient name, specification, batch, retention time, disinfection time period, and cause classification. When accepting a question, retrieval first recalls relevant fragments, then determines whether the question item lacks the above key fields. Once missing items are identified, a follow-up question is asked first to fill them in, and then an answer is given based on the candidate fragments, ultimately forming an intake record and the completed question items, which are forwarded to the handler.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The intake record and the completed question items are then finished by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient name and specification | When the menu and procurement category are inconsistent, can the candidate fragments hit both the menu entry and the procurement specification at the same time | In the search test, switch `searchMode`, test once each with synonymous questions, and record the number of candidates and the score |
| Retention time and batch | When the document and retention batch do not match, do the candidates retain the original fragments of the batch and time | Adjust `similarity` to observe changes in the number of candidates, and check the tokens of the returned reference text |
| Disinfection time period | When the disinfection record is missing a time period, do the candidates recall adjacent time-period fragments for completion | Compare the ranking of the top few items before and after enabling `usingReRank`, and record the number of candidates and the score |
| Absence cause classification | When the question lacks cause classification, is a follow-up question asked before answering | Test with a question missing key information, and see whether a follow-up question is triggered after retrieval returns candidates |

## Three common errors

- Symptom: the document and retention batch do not match. Cause: the retrieved hit fragments do not cover both the batch label and the document fields, so hits and associations must be checked first.
- Symptom: the menu and procurement category are inconsistent. Cause: the recalled candidates come from different channels and are not aligned by category after merging, so `searchMode` and the rerank order must be checked.
- Symptom: the disinfection record is missing a time period. Cause: after similarity filtering and upper-limit trimming of references, the key time-period fragments are trimmed out, so `similarity` and `limit` must be checked.

## How to verify the setup

This feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few items; record the number of candidates and the score, and check the tokens of the reference text.

Business test: ask a question missing key information, and see whether a follow-up question is asked before answering.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and the score across the semantic, full-text, and hybrid modes.
- Adjust `similarity` and `limit`, observe the tokens of the reference text after similarity filtering and upper-limit trimming of references, and record the array length separately.
