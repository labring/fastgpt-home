---
title: Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c038-f015
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Retrieval | Checks
meta_description: Continuing Education: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Compare Documents and Locate Differences

## What this category's data looks like

In the continuing education credit recognition scenario, materials usually consist of three types: course filing forms, study certificates, and credit recognition forms. Their sources are scattered across training institutions, employers, and recognition windows, and their update cadence follows batch applications and supplementary entries. Course filing forms focus on course name, number of class hours, and filing date; study certificates focus on student name, study start and end dates, and institutional seal; credit recognition forms focus on recognized credits, recognition date, and review signature. When these three types of materials enter the knowledge base retrieval and recall function, each serves as a source of candidate snippets, used for cross-checking among the name, quantity, date, and signature fields, providing traceable original-text snippets for subsequent discrepancy localization.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, number of class hours, and filing date are consistent across the three materials | In the search test, switch `searchMode`, search separately by course name and filing date, and check the name, quantity, and date fields in the candidate snippets |
| Study certificate | Whether the student name, study start and end dates, and institutional seal correspond to the filing form and recognition form | Search by student name and start/end dates, check whether the candidate snippets hit both the filing form and the recognition form, and record the `similarity` score |
| Credit recognition form | Whether the recognized credits, recognition date, and review signature match the study certificate and filing form | Search by recognized credits and recognition date, turn rerank on and off to compare the order of the first few results, and record the number of candidates and scores |
| Retrieval output | Whether the candidate snippets cover the four field types: name, quantity, date, and signature | Adjust `limit` to observe changes in the number of citations, check the tokens of the cited text, and record the array length separately |

## Three common errors

- Symptom: the name or date of the same student does not match between two materials. Cause: material versions are not synchronized, and an old filing form is mixed with a new study certificate.
- Symptom: the number of class hours is inconsistent between two materials. Cause: the course filing form and recognition form have different update cadences, and supplementary entries were not written back.
- Symptom: the recognition form lacks a review signature or receipt. Cause: the signature step was not completed, and the material entered the retrieval library first to form candidates.

## How to verify the setup

Acceptance for this feature: test once each with synonymous rewritten questions, compare candidates and scores, then turn rerank on and off to inspect the ordering of the first few results.

Business test: use one real record to find fields that are inconsistent with the ledger.

- In the search test, switch `searchMode`, search separately by course name, student name, and recognition date, and record the number of candidates and the `similarity` score.
- Turn rerank on and off to compare the order of the first few results, adjust `limit` to observe the number of citations, check the tokens of the cited text, and record the array length separately.
