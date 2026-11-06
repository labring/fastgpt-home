---
title: Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c034-f015
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Retrieval | Checks
meta_description: Skills Certification: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Compare Documents and Locate Differences

## What this category's data looks like

In the social evaluation scenario of vocational skill level certification, the materials entering the knowledge base retrieval service typically include three types: evaluation implementation plans, candidate registration forms, and assessor dispatch forms. Evaluation implementation plans are generally updated by batch or occupational direction, with fields covering evaluation occupation, level, assessment subjects, time and location, signature and receipt; candidate registration forms are generated entry by entry per candidate, with fields including name, ID document number, declared occupation and level, years of work experience, employer opinion, and signature; assessor dispatch forms are organized by assessment session, with fields including assessor name, certificate card number, dispatch date, session, conflict-of-interest declaration, and signature. The three types of materials play different roles when entering the retrieval service: the implementation plan serves as the rule source document, the registration form serves as the source of individual records, and the dispatch form serves as the source of personnel arrangements. The materials are mostly in the form of tables and scanned documents, and field names and date formats vary across versions, so naming must be unified before retrieval to facilitate alignment of candidate fragments by object.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Check whether the evaluation occupation, level, assessment subjects, date, and signature are consistent with the ledger | In the search test, search by plan name, switch `searchMode` to hybrid, record the number of candidates and the `similarity` score, and check the date and signature fragments |
| Candidate registration form | Check whether the same candidate's name, declared occupation and level, quantity, and date are consistent with the ledger | Search by candidate name plus occupation, compare semantic and full-text candidates, see whether the returned fragments contain both the name and the declared level, and record `similarity` |
| Assessor dispatch form | Check whether the assessor's name, certificate card number, dispatch date, session, and signature receipt are consistent with the ledger | Search by assessor name, compare the order of the top few results before and after enabling `usingReRank`, record the number of candidates and scores, and check the signature and receipt fragments |
| Citation upper limit | After trimming, key fragments of the original text are still retained, and the array length is recorded separately | Adjust `limit` to observe changes in the number of candidates, check the tokens of the cited text against the `quoteMaxToken` budget, and do not compare the array length with the budget for equality |

## Three common errors

- Symptom: The same candidate's name or declared level does not match between the registration form and the ledger. Cause: The two material versions are not synchronized, the old registration form is still in the knowledge base, and both are recalled during retrieval.
- Symptom: The assessor dispatch form lacks a signature or receipt, but retrieval still returns that fragment. Cause: The scanned document has not been supplemented with a signature, no completeness mark was made at ingestion, and the candidate fragment is returned directly by similarity.
- Symptom: The same record's date or quantity does not match between the implementation plan and the registration form. Cause: The materials are updated at different paces, the plan was changed first while the registration form was not written back, and retrieval hits both versions.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking on and off to observe the order of the top few results.

Business test: use one real record to find fields that are inconsistent with the ledger.

- In the search test, switch `searchMode`, compare semantic, full-text, and hybrid candidates, and record the number of candidates and the `similarity` score.
- Enable and disable `usingReRank`, compare the order of the top few results; adjust `limit` to record the number of candidates, and check the cited text tokens against the `quoteMaxToken` budget.
