---
title: Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c034-f015
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Retrieval | Progress
meta_description: Skills Certification: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Track Progress and Check Statistics

## What this category's data looks like

Progress records and statistical verification for social evaluation of vocational skill level certification revolve around three types of materials: the evaluation implementation plan, the candidate registration form, and the assessor dispatch form. The evaluation implementation plan provides the batch, occupation, level, time nodes, and statistical criteria; the candidate registration form provides the candidate's name, ID number, declared occupation and level, registration date, and signature; the assessor dispatch form records the assessor's name, ID number, dispatch batch, arrival date, and signature. The three types of materials are updated on a rolling basis by batch and date, with fields mainly consisting of names, quantities, dates, and signatures, and the same record often appears across tables. When the materials enter knowledge base retrieval and recall, each is recalled as an independent fragment, used to verify whether names, quantities, dates, and signatures are consistent, and does not directly generate statistical tables.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The "progress table and statistical criteria description" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Whether the fields, dates, and signatures for batch, occupation, level, time nodes, and statistical criteria are complete | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, check whether the candidate fragments cover the plan's key fields, and record the number of candidates and scores |
| Candidate registration form | Whether the candidate's name, ID number, declared occupation and level, registration date, and signature correspond to the evaluation implementation plan | Use synonymous questions to retrieve registration form fragments, compare candidates and scores, verify whether names, quantities, and dates are consistent with the plan, and separately mark fragments missing signatures or receipts |
| Assessor dispatch form | Whether the assessor's name, ID number, dispatch batch, arrival date, and signature correspond to the evaluation implementation plan | Enable and disable rerank, compare the order of the top few candidates, confirm whether the dispatch batch and arrival date fragments are ranked first, and record the number of candidates and scores |
| Retrieval parameters | Whether `similarity`, `limit`, `usingReRank`, and the retrieval mode match the material form | In the search test, adjust `similarity` to filter low-scoring candidates, use `limit` to control the number of returned results, compare the ranking before and after toggling `usingReRank`, and record the number of candidates and scores |

## Three common errors

- Symptom: the same candidate's name, quantity, or date does not match between the registration form and the evaluation implementation plan. Cause: the two tables' versions are not synchronized, or they were not checked against the same criteria during entry.
- Symptom: the assessor dispatch form lacks a signature or receipt but is still counted in statistics. Cause: the dispatch form was not fully returned, and items missing signatures were not separately marked during verification.
- Symptom: the same question phrased differently fails to recall key fragments. Cause: the retrieval mode does not match the material form, or the similarity filter is too strict, so candidates do not cover the key passages of the original text.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the order of the top few results; at the same time, record the number of candidates and scores, and verify the values of `similarity`, `limit`, `usingReRank`, and `searchMode`.

Business test: use one week of records to verify the totals, and check whether the criteria and exceptions are clearly stated; record the number of citations separately by array length, and verify the citation upper limit against the tokens of the cited text; do not compare the two for equality.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare the candidate fragments and similarity scores for the same question, and confirm that the material form matches the mode.
- Enable and disable rerank, compare the order of the top few candidates; adjust `similarity` and `limit`, record the number of candidates and scores, and check whether the cited text retains the key fragments of the original text.
