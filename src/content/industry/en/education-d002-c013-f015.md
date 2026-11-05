---
title: Knowledge Base Retrieval for School Teacher Training Credits: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c013-f015
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Retrieval | Checks
meta_description: Teacher Credits: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Teacher Training Credits: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on the scenario of credit management for primary and secondary school teacher training. The materials include training notices, credit recognition forms, and participant lists. These three often come from different departments and different time points: notices are issued first, lists are updated as registration proceeds, and recognition forms are summarized after completion. When the materials enter the knowledge base retrieval service, notices and lists take on the roles of semantic recall and full-text recall, while recognition forms, because they contain signature and receipt fields, are more often used to verify dates and quantities. In terms of update rhythm, the list may be revised once before and once after training, and the recognition form is written back after review, so unsynchronized versions, missing signatures, and missing receipts are common states. Field characteristics center on teacher name, training project name, number of class hours, start and end dates, and signature and receipt columns. When the name, quantity, or date of the same record does not match across two materials, it is necessary to first locate the discrepant field, then hand it to the reviewer for confirmation and write-back.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming); the discrepancy list must be produced by subsequent nodes or manually. One retrieval consists of question optimization, semantic/full-text/hybrid recall, multi-path merging, rerank secondary sorting, similarity filtering, and citation upper-limit trimming, and only then is the cited content handed to the model obtained.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Consistent with the participant list on training project name, start and end dates, and number of class hours, and the notice version is the latest | In the search test, switch `searchMode`, use the project name in the notice for recall, check the name, date, and quantity fields in the candidate snippets, and record the number of candidates and scores |
| Credit recognition form | Consistent with the participant list on teacher name, number of class hours, and completion date, and the signature and receipt columns have no missing items | Use the combination of teacher name and project name in the recognition form for recall, compare the ranking of the top few items before and after enabling `usingReRank`, and check whether the signature and receipt fields appear in the cited content |
| Participant list | Consistent with the training notice and credit recognition form on the number of people and names, and the list version is synchronized with the current batch | Use the batch and names in the list for recall, observe whether the snippets retained after `similarity` filtering cover the key rows of the list, and separately record the array count and cited text tokens |

## Three common errors

- Phenomenon: the number of class hours for the same teacher does not match across the two materials. Cause: the list was updated after registration, while the recognition form still references the old quantity, and the versions are not synchronized.
- Phenomenon: the training project name is written differently in the two materials, and recall candidates are scattered. Cause: the notice uses an abbreviation and the recognition form uses the full name, and no reference resolution or question expansion was done.
- Phenomenon: the recognition form lacks a signature or receipt, and review cannot write back. Cause: completion materials were not fully collected, scanned copies and electronic forms are mixed together, and retrieval only returns candidate snippets.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ranking of the top few items; at the same time switch `searchMode`, observe changes in the number of candidates and scores after `similarity` filtering, and record the array count and cited text tokens.

Business test: use one real record to find the field inconsistent with the ledger, put the record's name, quantity, and date separately into the retrieval question, check whether the candidate snippets cover both materials, locate the discrepant field, then hand it to the reviewer for confirmation and write-back.

- In the search test, use a combination of training project name and teacher name for recall, check the name, quantity, and date in the candidate snippets one by one, and mark the fields inconsistent with the ledger.
- Inspect the ranking of the top few items once before and once after enabling rerank, confirm that key snippets have not been filtered out by similarity filtering and citation upper-limit trimming, and separately record the array count and cited text tokens.
