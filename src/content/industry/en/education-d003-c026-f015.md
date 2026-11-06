---
title: Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c026-f015
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Retrieval | Intake
meta_description: Degree Certificates: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on degree conferral and certificate information reporting. Source materials include degree application forms, thesis review forms, defense resolutions, and certificate reporting receipts. The degree application form carries the applicant's basic information, course credits, and supervisor's comments; the thesis review form carries the review conclusion, review date, and expert signature; the defense resolution carries the defense conclusion, voting results, and defense committee signatures; the receipt is used to confirm the reporting destination. Field characteristics center on name, student ID, thesis title, date, and signature fields, and the update cadence rolls with defense batches and reporting windows. When materials enter the Q&A intake and missing-item follow-up stage, the knowledge base retrieval service first recalls candidate snippets, and subsequent nodes or humans use them to determine missing items and generate follow-up questions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, re-rank, filter, and limit truncation). "Intake records and items to be completed" are then handled by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether name, student ID, thesis title, course credits, and supervisor signature are complete, and whether the date falls within the reporting window | In the retrieval node, check whether candidate snippets cover the application form fields, record the number of candidates and similarity scores, and verify whether the signature field is recalled |
| Thesis review form | Whether the review conclusion, review date, and expert signature are complete, and whether the thesis title matches the same record in the application form | Switch `searchMode` to hybrid retrieval, see whether candidates contain both the review conclusion and signature snippets, and compare the ranking before and after enabling `usingReRank` |
| Defense resolution | Whether the defense conclusion, voting results, defense date, and defense committee signatures are complete, and whether the date connects with the review form date | Test once each with synonymous questions, observe whether candidates hit the key resolution passages, and separately record the number of items in the citation array |
| Retrieval parameters | Whether key original text snippets are still retained after `similarity` threshold and `limit` truncation | After adjusting `similarity` and `limit`, compare the number of candidates and verify whether cited text tokens are within budget |

## Three common errors

- Symptom: The thesis title or date for the same record does not match between the application form and the review form. Cause: The two materials are entered separately, without field-level comparison and version synchronization.
- Symptom: The defense resolution lacks a signature or the receipt is missing, yet no follow-up question is raised. Cause: Candidate snippets do not cover the signature field, and missing-item identification depends on manual checking by subsequent nodes.
- Symptom: Changing the wording of a question causes key passages not to be recalled, and the answer lacks supporting evidence. Cause: The retrieval mode does not match the material form, re-ranking is not enabled, or similarity filtering is too strict.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle re-ranking on and off to inspect the ranking of the top few results.

Business test: ask a question that lacks key information and see whether it asks a follow-up question before answering.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and similarity scores under semantic, full-text, and hybrid modes.
- Compare the ranking of the top few results before and after enabling `usingReRank`, and record cited text tokens and the number of items in the citation array separately.
