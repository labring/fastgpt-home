---
title: Knowledge Base Retrieval for District Teaching Research and Classroom Reviews: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c012-f015
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Retrieval | Access
meta_description: Teaching Reviews: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for District Teaching Research and Classroom Reviews: Manage Authorized Access and External Services

## What this category's data looks like

District and county teaching research activity and lesson observation and evaluation materials include three categories: teaching research activity notices, lesson observation records, and lesson evaluation minutes. Notices are issued by teaching research institutions according to activity batches, lesson observation records are filled in by observers by session, and lesson evaluation minutes are summarized by subject groups after the activity. Fields cover activity name, subject, grade, instructor, observer, date, location, signature, and receipt. When materials enter the knowledge base retrieval service, notices carry the activity scope and authorization criteria, lesson observation records carry the session and observation points, and lesson evaluation minutes carry conclusions and improvement suggestions. The update rhythm advances with activity batches: notices come first, then records are supplemented, and finally minutes are supplemented. The name, quantity, and date of the same record in the three types of materials must be consistent, signatures and receipts must be complete, and versions must be synchronized.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate snippets and similarity scores (after mode, merging, reranking, filtering, and upper-limit trimming). The externally facing entry point and authorization scope must be handled by subsequent nodes or manually. One retrieval consists of question optimization, semantic or full-text or hybrid recall, multi-path merging, reranking for secondary sorting, similarity filtering, and citation upper-limit trimming, and only then is the citation content handed to the model obtained.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | The activity name, subject, grade, date, and authorization scope must be consistent with the lesson observation records and lesson evaluation minutes, and signatures and receipts must be complete | In the search test, search by activity name and date, check the name, quantity, and date in the candidate snippets, and record the number of candidates and scores |
| Lesson observation record | The session, instructor, observer, and observation points must correspond to the notice and minutes; missing signatures or receipts must be marked | Test once each with synonym-rewritten questions, compare candidates and scores, and switch `searchMode` to see the difference between semantic and full-text results |
| Lesson evaluation minutes | Conclusions, improvement suggestions, and signatures must be synchronized with the notice and records; if versions are not synchronized, roll back and check | Turn `usingReRank` on and off to compare the ranking of the first few items, and check the impact of `similarity` and `limit` on the number of candidates |
| Knowledge base retrieval service | Candidate snippets and similarity scores are output after mode, merging, reranking, filtering, and upper-limit trimming, and no statistical table or authorization result is generated | Record the number of candidates and scores, check the tokens of the citation text, record the number of array items separately, and do not compare `quoteMaxToken` |

## Three common errors

- Symptom: The activity name and date in the notice and minutes do not match. Cause: The name and date of the same record are not unified across the two materials, and the versions are not synchronized.
- Symptom: The lesson observation record lacks a signature or receipt, but the lesson evaluation minutes state that it has been confirmed. Cause: The signature and receipt were not backfilled during the material circulation process.
- Symptom: The same question cannot be recalled when rephrased, and although there are many candidates, the ones ranked at the front are all irrelevant. Cause: The retrieval mode does not match the material form, and reranking and filtering were not adjusted according to the candidates.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then turn reranking on and off to see the ranking of the first few items, and check the impact of `searchMode`, `similarity`, and `limit` on the number of candidates and scores.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and ensure unauthorized access is not visible; the entry point and authorization scope open to parents or superiors are completed by subsequent nodes or manually.

- In the search test, switch retrieval modes, compare candidate snippets and similarity scores, and record the number of candidates.
- Check the name, quantity, date, signature, and receipt of the notice, lesson observation record, and lesson evaluation minutes; if versions are not synchronized, roll back and check first.
