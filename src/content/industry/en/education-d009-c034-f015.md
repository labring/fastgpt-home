---
title: Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c034-f015
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Retrieval | Multilingual
meta_description: Skills Certification: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Handle Multilingual Materials and Terminology

## What this category's data looks like

The materials for social evaluation of vocational skill level certification mainly consist of evaluation implementation plans, candidate registration forms, and assessor dispatch forms. They come from filing institutions and evaluation organizations, and are updated on a rolling batch basis. When these three types of materials enter knowledge base retrieval and recall, they play different roles: the implementation plan provides terminology definitions such as evaluation occupation, level, subjects, and assessment methods; the registration form carries fields such as candidate identity, application conditions, and contact information; the dispatch form records assessor names, qualifications, sessions, and signed receipts. Field characteristics include occupation name, level, date, number of assessors, and signature fields. The same term may be written differently in different materials, so the terminology table and comparison draft must be unified first before external release.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). Unifying the terminology table and comparison draft is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Terms such as occupation name, level, subjects, and assessment methods are written consistently throughout the document, and translated names can refer back to the original text | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, retrieve once each with synonymous questions, record the number of candidates and scores, and check the terminology wording in the implementation plan |
| Candidate registration form | Candidate name, declared occupation and level, date, and signature match between the registration form and the implementation plan | Compare the ranking of the top few results before and after enabling `usingReRank`, check whether the registration form fields are consistent with the implementation plan records, and check whether signatures or receipts are complete |
| Assessor dispatch form | Assessor names, qualifications, sessions, and quantities are consistent between the dispatch form and the implementation plan, and versions are synchronized | Adjust the `similarity` threshold to observe changes in the number of candidates, check whether the names, quantities, and dates in the dispatch form and implementation plan match, and confirm the version and signed receipts |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the registration form and the implementation plan. Cause: Terminology is not unified, material versions are not synchronized, and retrieval candidates come from different batches.
- Phenomenon: The dispatch form lacks signatures or receipts, and the external release draft still cites the old version. Cause: Update cadence is not aligned, signature fields are not checked, and versions are not synchronized.
- Phenomenon: The same question cannot be recalled when phrased differently, and although there are many candidates, the ones ranked at the top are all irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, and similarity filtering is too strict.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ranking of the top few results; record the number of candidates and scores, record the number of citations separately by array length, and check cited text tokens separately.

Business test: sample three terms and check whether their wording is consistent throughout the document.

- In the knowledge base search test, switch `searchMode`, use semantic, full-text, and hybrid retrieval respectively for the same term, and record the number of candidates and scores.
- Compare the ranking of the top few results before and after enabling `usingReRank`, adjust `similarity` to observe candidate changes, and check cited text tokens and array length.
