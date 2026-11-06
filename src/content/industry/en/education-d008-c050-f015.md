---
title: Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c050-f015
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Retrieval | Access
meta_description: Foreign Teachers: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Manage Authorized Access and External Services

## What this category's data looks like

This category's data looks like this: For the foreign teacher appointment and course scheduling category, materials include appointment contracts, work permit materials, and course schedules. Appointment contracts provide the appointment term, job responsibilities, and signature page; work permit materials provide the permit number, validity period, and receipt; course schedules provide the classes taught, class hours, and dates. When these three types of materials enter knowledge base retrieval, each participates in recall as an independent chunk, and contract clauses, permit fields, and schedule dates respectively serve as candidate sources for semantic and full-text matching. The update rhythm rolls forward according to semesters and visa cycles: the new semester's schedule comes out first, contract renewal follows, and permit materials are supplemented before expiration. Field characteristics are concentrated in four items: name, quantity, date, and signature. When comparing across materials, it is necessary to keep the name consistent for the same record, the class-hour quantity consistent, and the start and end dates consistent, and to retain the signature or receipt.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The externally available entry point and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Check whether the foreign teacher's name, appointment start and end dates, class-hour quantity, and signature page are complete | In the search test, retrieve using a combination of contract fields, switch `searchMode` to compare candidates, and record the number of candidates and scores |
| Work permit materials | Check whether the permit number, validity period, receipt signature, and contract dates match | Retrieve using the permit number and expiration date, compare the order of the top few results before and after enabling `usingReRank`, and see whether the permit chunk is hit |
| Course schedule | Check whether the classes taught, weekly class-hour quantity, course start date, and contract position are consistent | Retrieve using class and date, observe whether the key schedule rows are retained among candidates after `similarity` filtering, and separately record the number of array items |
| External authorization scope | The visitor's identity matches the visible scope, and unauthorized materials are not visible | Access once with a restricted identity, check whether the returned candidates only cover materials visible to that identity, and separately record the cited text tokens and the `limit` budget |

## Three common errors

- Symptom: The same foreign teacher's name is written differently in the contract and permit materials, and retrieval recalls only one of them. Cause: The name field is not unified, and the candidate chunks are stored independently.
- Symptom: The course schedule has been updated, but the contract still has the old class-hour quantity, resulting in two sets of numbers in external display. Cause: Versions are not synchronized, and the old chunk still participates in recall in the candidate pool.
- Symptom: The permit materials lack a receipt signature, but retrieval still returns that chunk and it enters the cited content. Cause: The signature field is not used as a filter condition, and similarity filtering only trims by text relevance.

## How to verify the setup

How to verify the setup: Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ordering of the top few results; switch `searchMode` to observe differences between semantic and full-text candidates, and record the number of candidates and scores.

Business test: access once with a restricted identity and see whether the visible scope matches the setting; unauthorized materials should not appear in candidates or cited content, and the cited text tokens and number of array items should be recorded separately.

- In the search test, fix the question, switch `searchMode` and `usingReRank`, record the number of candidates, scores, and the order of the top few results, and confirm that key chunks are still present after `similarity` filtering.
- Compare name, quantity, date, and signature receipt item by item according to appointment contracts, work permit materials, and course schedules. If inconsistencies are found, first check the hit chunks and associations, then decide whether to update the material version.
