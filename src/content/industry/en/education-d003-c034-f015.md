---
title: Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c034-f015
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Retrieval | Intake
meta_description: Skills Certification: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses Q&A acceptance and missing-item follow-up for social evaluation of vocational skill level certification. The materials come from the evaluation implementation plan, candidate registration forms, and assessor dispatch forms. The evaluation implementation plan is updated and adjusted with each batch, and contains the occupation name, level, assessment method, date, and signature/seal; the candidate registration forms are summarized by batch, and contain name, ID number, declared occupation, years of work experience, and signature; the assessor dispatch forms are arranged by session, and contain assessor name, qualification certificate number, dispatch date, and receipt. When these three types of materials enter knowledge base retrieval, the implementation plan provides the rule basis, the registration forms provide candidate facts, and the dispatch forms provide personnel arrangements; based on this, the retrieval node recalls candidate chunks for subsequent nodes or humans to generate acceptance records and the follow-up items to be completed.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit truncation). The acceptance records and the follow-up items to be completed are then finished by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Fields, dates, and signatures must be aligned item by item with the registration forms and dispatch forms; the occupation name, level, and assessment date must not be mutually exclusive | In the search test, switch `searchMode` to hybrid, and check whether the candidate chunks cover both the plan clauses and the candidate facts |
| Candidate registration form | For the same candidate, the name, declared occupation, years of work experience, and date in the two materials must be consistent; if a signature or receipt is missing, a follow-up question is required | Test once each with synonymous question sentences, record the number of candidate items and the `similarity` score, and confirm that missing items are identified and followed up on |
| Assessor dispatch form | The assessor name, qualification certificate number, dispatch date, and receipt must match the session in the implementation plan; when versions are not synchronized, the latest signature/seal prevails | Test once each with `usingReRank` enabled and disabled, compare the ranking of the top few items, and check the tokens of the cited text after `limit` truncation |
| Acceptance records and follow-up items to be completed | Missing items are identified and followed up on, the answer has a material basis, and the destination is handling by the assigned person | Check whether the candidate chunks can support the follow-up items; record the number of cited items separately by array length, and do not compare it for equality with the citation content budget |

## Three common errors

- Symptom: For the same candidate, the occupation name and date in the registration form and the implementation plan do not match. Cause: The versions of the two materials are not synchronized, or the entry was not backfilled according to the signed/sealed version.
- Symptom: The assessor dispatch form lacks a signature or receipt, but it is still handled as dispatched during acceptance. Cause: The material archive is incomplete, the retrieval candidates do not cover the receipt field, and the follow-up item is not triggered.
- Symptom: The same question cannot be recalled when rephrased, and although there are many candidates, the ones ranked at the front are all irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or the similarity filter is too broad.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten question sentences, compare the candidates and `similarity` scores, then toggle `usingReRank` on and off to inspect the ranking of the top few items, and record the number of candidates under `searchMode` and `limit`.

Business test: ask a question sentence that lacks key information, and see whether it first asks a follow-up question before answering.

- In the search test, switch `searchMode`, compare the candidate chunks and scores under the three modes of semantic, full-text, and hybrid, and confirm that they match the material form.
- Enable and disable `usingReRank`, compare the ranking of the top few items; check the tokens of the cited text after `limit` truncation, and record the array length separately.
