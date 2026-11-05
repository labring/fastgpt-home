---
title: Knowledge Base Retrieval for Kindergarten Play Activity Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c002-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Retrieval | Checks
meta_description: Kindergarten Play: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Play Activity Organization: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the kindergarten play activity organization scenario; materials come from observation records, area activity plans, material placement ledgers, activity objectives and reflection records, and next week's plan drafts. Observation records are generated daily or after each activity, area plans are updated weekly, material ledgers are registered by placement batch, and reflections and next week's plans are linked up on weekends. When these materials enter the knowledge base retrieval and recall function, observation records and area plans serve as candidate sources for semantic and full-text recall, material ledgers provide the basis for comparing quantity and date fields, and activity objectives and reflection records are used to verify objective achievement and plan update clues. Field characteristics include activity name, area name, material name, placement quantity, activity date, objective description, observation points, and reflection conclusions. The name, quantity, and date of the same object in two materials should be consistent, and the discrepancy list is used to localize based on this.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, re-rank, filter, and limit truncation). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | The name, date, and area of the same activity correspond consistently in the observation records and area plans | In the search test, search by activity name and date, switch `searchMode` to semantic, full-text, or hybrid, record the number of candidates and the `similarity` score, and compare the name and date fields one by one |
| Material placement quantity | The material name and placement quantity are consistent in the material ledger and area plan, and discrepancies can be localized when the quantity is insufficient | Search candidate snippets by material name, check the ledger quantity against the plan quantity, view the ranking of the top few items before and after `usingReRank` is enabled, and confirm whether the quantity field falls within the candidates |
| Activity objective achievement | The activity objective description matches the behavioral performance in the observation records, and discrepancies between objectives and observations can be localized | Search by objective keywords, compare the behavioral descriptions in the observation records with the objective entries, record the number of candidates and the score, and mark the fields where the objective and observation do not match |
| Reflection to next week's plan | The adjustment items in the reflection conclusions have been written into next week's plan, and cases where the plan has not been updated can be localized | Search by reflection conclusion keywords, check whether next week's plan contains the corresponding adjustment items, and view whether the quoted text after `limit` truncation retains the key paragraphs |

## Three common errors

- Symptom: The quantity in the material ledger does not match the quantity in the area plan. Cause: The plan was not synchronized after the placement batch was updated, and the retrieval candidates only cover one side of the materials.
- Symptom: The activity objective does not match the behavioral performance in the observation records. Cause: The objective description is broad, the observation points were not collected according to the objective fields, and the recalled snippets lack the corresponding entries.
- Symptom: The adjustment items in the reflection conclusions do not appear in next week's plan. Cause: The plan was not updated, the retrieval candidates only return old plan snippets, and the discrepancy fields are ignored.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking to see the ranking of the top few items; record the number of candidates and the `similarity` score, switch `searchMode` and `usingReRank`, and check the tokens and array count of the quoted text after `limit` truncation and record them separately.

Business test: use one real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation, and write back the discrepancy list.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and `similarity` scores returned by the semantic, full-text, and hybrid modes.
- Enable and disable `usingReRank`, compare the order of the top few candidates, and confirm whether the relevant snippets are ranked higher after re-ranking.
