---
title: Knowledge Base Retrieval for Research Project Task Agreement Signing: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c058-f015
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Retrieval | Multilingual
meta_description: Research Agreements: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Task Agreement Signing: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of signing research project task books. The materials come from project task books, topic task breakdown tables, and budget books. The three enter the knowledge base in batches according to signing milestones and are updated with versions. The task book carries research objectives, assessment indicators, and signature pages; the breakdown table carries topic names, responsible persons, start and end dates, and deliverables; the budget book carries subject amounts, quantities, and approval records. In multilingual materials and terminology processing, the three materials play different roles: the task book is the anchor where a term first appears, the breakdown table is the cross-reference surface for the same record's name and date, and the budget book is the back-reference surface for quantities and amounts. Field characteristics are concentrated in project number, topic number, term source text and translated name, date, quantity, signature, and receipt. After the materials enter knowledge base retrieval and recall, candidate snippets and similarity scores are first formed, and then used by subsequent nodes or manual work to unify the terminology table and the comparison draft.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, re-rank, filter, and upper-limit trimming). Unifying the terminology table and the comparison draft is then completed by subsequent nodes or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Check whether the project number, topic name, start and end dates, signature page, and receipt are consistent with the breakdown table | In the search test, query once each with the term source text and the translated name, record the number of candidates and the scores, and check whether the hit snippets back-reference the original text of the task book |
| Topic task breakdown table | Check whether the name, quantity, and date of the same record match across the two materials, and whether the versions are synchronized | Switch `searchMode` to hybrid mode, compare whether semantic and full-text candidates appear at the same time, and then check the breakdown table fields against the task book fields |
| Budget book | Check whether the subject amount, quantity, approval date, and signature are consistent with the task book and the breakdown table | Compare the order of the first few items before and after enabling re-rank, use `usingReRank` to observe changes in secondary sorting, and record the number of candidates and the scores |
| Unified terminology table and comparison draft | Check whether the same term is written consistently throughout and whether the translated name can back-reference the original text | Sample three terms and check their spelling throughout, record the tokens and array length of the quoted text; `limit` and `similarity` are only checked as retrieval parameters |

## Three common errors

- Symptom: the same topic name is written differently in the task book and the breakdown table. Cause: versions are not synchronized, old-version materials are still in the knowledge base and participate in recall, and candidate snippets are mixed with wording from different versions.
- Symptom: the quantity in the budget book does not match the quantity in the task book. Cause: the two materials have different update rhythms, post-signing revisions are not written back, and retrieval hits lack date and signature receipt checks.
- Symptom: there are many candidates, but the ones ranked at the front are all irrelevant. Cause: the retrieval mode does not match the material form, re-rank or similarity filtering is not enabled, and key passages are truncated after upper-limit trimming of references.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-rank on and off to observe the ranking of the first few items.

Business test: sample three terms and check whether their spelling is consistent throughout.

- In the knowledge base search test, switch `searchMode` and record the number of candidates and the scores for semantic, full-text, and hybrid modes respectively.
- Compare the order of the first few items before and after enabling re-rank, and check the impact of `usingReRank`, `similarity`, and `limit` on candidate trimming.
