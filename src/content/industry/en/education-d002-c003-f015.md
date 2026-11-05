---
title: Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c003-f015
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Retrieval | Checks
meta_description: Child Health and Meals: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Healthcare and Meal Management: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses kindergarten health care and meal management. Materials come from health room sample retention records, cafeteria purchase orders, menu scheduling tables, disinfection registration forms, and absence cause registration. The update cadence is daily sample retention and disinfection registration, weekly menu and purchase summaries, and monthly cause classification review. Field characteristics center on ingredient names and specifications, sample retention time and batch, disinfection time period, and absence cause classification. When materials enter knowledge base retrieval and recall, sample retention records and purchase orders serve as batch verification sources, menu scheduling tables serve as category comparison sources, disinfection registration forms serve as time period completeness sources, and absence cause registration serves as classification consistency sources. The retrieval service splits these materials into candidate chunks and gives similarity scores, for subsequent nodes or manual localization of discrepancy fields, forming a discrepancy list that is handed to the reviewer for confirmation and write-back.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Sample retention records and purchase orders | Ingredient names and specifications, sample retention time and batch are consistent | In the search test, search with the same ingredient name, switch `searchMode` to compare candidate count and scores, and verify the batch field |
| Menu scheduling table | Menu and purchase categories are consistent | Search with menu category terms, compare the top few rankings before and after enabling `usingReRank`, and locate inconsistent category fields |
| Disinfection registration form | Disinfection time periods are complete with no missing segments | Search with disinfection time period keywords, adjust `similarity` to see changes in candidate count, and record missing time periods |
| Absence cause registration | Absence cause classification is consistent | Search with cause classification terms, set `limit` to observe candidate count, and verify classification field differences |

## Three common errors

- Phenomenon: Documents and sample retention batches do not match. Cause: Retrieved hit chunks come from different batches and were not filtered by batch field; hits and associations must be verified first.
- Phenomenon: Menu and purchase categories are inconsistent. Cause: Category terms in the menu scheduling table and purchase orders are not aligned, and candidate chunks are mixed with similar categories.
- Phenomenon: Disinfection records are missing time periods. Cause: The time period field in the registration form is incomplete, retrieval candidates do not cover the missing time periods, and the original text chunks must be reviewed.

## How to verify the setup

This feature acceptance: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the top few rankings; record candidate count and scores, and observe `limit` and `similarity` separately.

Business test: Use one real record to find fields inconsistent with the ledger, form a discrepancy list, and hand it to the reviewer for confirmation and write-back.

- In the search test, use the same ingredient name to switch `searchMode`, and compare candidate counts and scores across semantic, full-text, and hybrid modes.
- For the same question, enable and disable `usingReRank`, record changes in the order of the top few candidates, then adjust `similarity` and `limit` to observe the candidate count after trimming.
