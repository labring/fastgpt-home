---
title: Knowledge Base Retrieval for Daily Kindergarten Care Management: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c001-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Retrieval | Versions
meta_description: Kindergarten Care: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Daily Kindergarten Care Management: Maintain Document Versions and Changes

## What this category's data looks like

This page focuses on three types of materials in kindergarten childcare daily life management: the daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule comes from the institution's childcare and education plan and is updated by semester or month; its fields include activity name, start and end time, and responsible person. Morning and afternoon check records come from daily class execution and are updated daily; their fields include child's name, body temperature, abnormal manifestations, handling method, and teacher's signature. Child health observation records come from health room or class observations and are updated as needed or weekly; their fields include observation date, symptom description, water and food intake, nap, bowel movement, and parent receipt. When the three types of materials enter knowledge base retrieval and recall, they serve respectively as sources of candidate chunks: the schedule is used to check activities and times, morning and afternoon check records are used to check dates and signatures, and observation records are used to check symptoms and receipts. Data versions and change maintenance require that the current version be unique, old versions be traceable, and citations be synchronized. Therefore, before materials are ingested, the version number and effective date must be clarified, and retrieval must filter by version to avoid old-version chunks mixing into current citations.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The "version ledger and change records" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Fields include activity name, start and end time, and responsible person; the date and version number must match the current version | In the search test, switch `searchMode` to semantic, full-text, or hybrid, check whether candidate chunks come from the current version, and record the number of candidates and scores |
| Morning and afternoon check records | Fields include child's name, body temperature, abnormal manifestations, handling method, and teacher's signature; the date and signature must be complete | Test once each with synonymous questions, compare candidates and scores, and check whether key chunks of the signature and date are retained in the returned citations |
| Child health observation records | Fields include observation date, symptom description, water and food intake, nap, bowel movement, and parent receipt; the receipt must not be missing | Compare the ranking of the top few items before and after enabling `usingReRank`, and adjust `similarity` to observe the number of citations and content completeness after filtering |
| Knowledge base retrieval service | Candidates come from different recall channels and have been merged, are secondarily ranked after reranking, and still retain key chunks of the original text after trimming | Check whether the returned candidates include both semantic and full-text results, record the number of citation array items separately, and verify the tokens of the citation text and the `limit` budget |

## Three common errors

- Phenomenon: For the same morning and afternoon check record, the child's name, body temperature, and date do not match between the class ledger and the health room summary. Cause: The two materials are maintained separately, the current version is not used as the sole source, and old-version chunks are mixed in during retrieval and recall.
- Phenomenon: The daily life schedule has already adjusted activity times, but external documents still cite the old version, and the version number has not been synchronized. Cause: After the change, the knowledge base or external documents were not updated, and retrieval still hits old-version candidates.
- Phenomenon: Child health observation records lack a parent receipt or teacher's signature, and the cited chunks are incomplete. Cause: When the materials were ingested, the signature and receipt fields were not validated, and key passages were trimmed after similarity filtering.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then turn reranking on and off to inspect the ranking of the top few items; switch `searchMode` and adjust `similarity`, record the number of candidates and scores, and confirm that the number of citation array items is recorded separately.

Business test: change one piece of content and see whether the version number and citations are updated synchronously; check whether the fields, dates, and signatures of the daily life schedule, morning and afternoon check records, and child health observation records are synchronized with the version.

- In the knowledge base search test, retrieve once each for the same question using synonymous questions, record the number of candidates and scores, and check whether the returned citations retain key chunks of the original text.
- Retrieve once each with reranking enabled and disabled, compare the ranking of the top few items; adjust similarity and the citation upper limit, verify the tokens of the citation text, and record the number of array items separately.
