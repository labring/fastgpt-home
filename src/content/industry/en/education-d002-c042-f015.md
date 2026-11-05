---
title: Knowledge Base Retrieval for Corporate Sales and Product Training: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c042-f015
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Retrieval | Checks
meta_description: Sales Training: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Corporate Sales and Product Training: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on three types of materials in the enterprise sales product training scenario: product manuals, sales talking points, and channel training schedules. Product manuals provide product names, specifications, version dates, and numbers; sales talking points carry the selling-point statements, quantity specifications, and effective dates for the same product; channel training schedules record course names, participant targets, dates, and signed acknowledgments. The three types of materials enter the knowledge base on a quarterly or version-update basis, and the field characteristics are that the four items—name, quantity, date, and signature—need to be aligned. When entering the knowledge base retrieval and recall function, product manuals and sales talking points serve as candidate fragment sources, and the schedule serves as a comparison source; together, the three support discrepancy localization for the same record between two materials.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Check whether the product name, quantity, version date, and signature field in the manual are consistent with the ledger | Fix the question in the search test, record the number of candidates and scores, and switch `searchMode` to compare the recall differences among semantic, full-text, and hybrid modes |
| Sales talking points | Check whether the name, quantity specification, and effective date of the same product in the sales talking points are consistent with the manual | Compare the order of the top few candidates before and after enabling `usingReRank`, and see whether the key passages are still retained |
| Channel training schedule | Check whether the course name, participant targets, date, and signed acknowledgment in the schedule are aligned with the ledger fields | Check whether the returned candidates include both semantic and full-text results, and record the number of candidates after `similarity` filtering |
| Discrepancy list | Compare the fields of the same record in the two materials, and mark inconsistent items in name, quantity, and date | Observe changes in the number of cited items according to `limit`, record the array length separately, and do not compare the number of items with the tokens of the cited text for equality |

## Three common errors

- Symptom: the name or quantity of the same record does not match between the product manual and the sales talking points. Cause: the versions of the two materials are not synchronized, and old-version fields are still recalled.
- Symptom: the channel training schedule lacks a signature or acknowledgment, and the discrepancy list cannot be closed. Cause: the signature field was not backfilled when the schedule was updated, and retrieval still returns old fragments.
- Symptom: there are many candidates, but the ones ranked first are all irrelevant, and key passages are missing. Cause: the retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too loose.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare the number of candidates and scores, then toggle rerank on and off to check the ordering of the top few.

Business test: use one real record to find fields inconsistent with the ledger, and hand it to the reviewer for confirmation and write-back.

- In the knowledge base search test, switch retrieval modes, record the number of candidates and scores, and check whether the returned candidates include both semantic and full-text results.
- Compare the order of the top few before and after enabling rerank, and check whether the key passages of the original text are still retained after similarity filtering and citation limit trimming.
