---
title: Knowledge Base Retrieval for Journal Review, Proofreading and Editorial Quality: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c068-f015
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Retrieval | Checks
meta_description: Journal Editing: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Journal Review, Proofreading and Editorial Quality: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy localization in journal three-stage review, three-proofreading, and editorial quality. The sources are three types of materials: three-stage review forms, proofs, and proofreading records. The update cadence advances with review rounds and proofreading rounds, and a new version is formed after each round of modification. Field characteristics center on the name, quantity, date, and signature of the same object: the three-stage review form carries the initial review, re-review, and final review opinions and signatures; the proof carries body-text modification traces and page numbers; the proofreading record carries the proofreading round, change description, and receipt. When the materials enter knowledge base retrieval and recall, the three-stage review form, proof, and proofreading record are each split into the candidate pool as independent sources, and each participates in recall in the form of fragments. This does not change the field structure of the original materials; it only provides candidate fragments and similarity scores that can be used for comparison and localization, for subsequent nodes or humans to generate a discrepancy list accordingly.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The discrepancy list is then completed by subsequent nodes or humans. The retrieval mode, multi-route merge, rerank and similarity filtering, and citation upper-limit trimming jointly determine the selection and ordering of candidates.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-stage review form | Whether the name, quantity, date, and signature of the initial review, re-review, and final review are consistent with the ledger | Use the same record to compare between the three-stage review form and the ledger, switch `searchMode` to observe whether the candidates cover the signature and date fields |
| Proof | Whether the name, quantity, date, and signature of the body-text modifications correspond to the three-stage review form | Use the proof fragment as the query, check whether the modification entries in the candidates are from the same source as the three-stage review form, and record the number of candidates and scores |
| Proofreading record | Whether the proofreading round, change description, and receipt are synchronized with the proof version | Use the proofreading round description in the proofreading record to retrieve, compare the top few rankings before and after enabling `usingReRank`, and check whether the receipt field is recalled |
| Retrieval results | Whether the candidate fragments and similarity scores cover the fields to be verified | After adjusting `similarity` filtering and citation upper-limit trimming, check the tokens of the cited text and the number of array entries, and record them separately |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the three-stage review form and the proof. Cause: The two materials are not aligned by the same record key, and the recalled fragments each take one side.
- Phenomenon: The proofreading record and the proof version are not synchronized, and the change description points to an old version. Cause: The new version has not re-entered the candidate pool, and retrieval still hits the old fragment.
- Phenomenon: A signature or receipt is missing, and the corresponding field cannot be found in the candidates. Cause: The material itself has not been completed, and retrieval can only return existing fragments and scores.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the top few rankings.

Business test: use one real record to find the field that is inconsistent with the ledger, and record the number of candidates and scores for that field in the candidates.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores under the three modes: semantic, full-text, and hybrid.
- Compare the top few rankings before and after enabling `usingReRank`, and adjust `similarity` and citation upper-limit trimming, then check the cited text tokens and the number of array entries.
