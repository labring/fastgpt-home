---
title: Knowledge Base Retrieval for Daily Kindergarten Care Management: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c001-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Retrieval | Handover
meta_description: Kindergarten Care: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Daily Kindergarten Care Management: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses materials for daily life management in kindergarten childcare, including three core types of records: daily life schedule, morning and afternoon health check records, and child health observation records, as well as draft issuable materials and handover records derived from these records. The source is the original records filled in daily during the kindergarten's routine childcare process, with an update rhythm of once each in the morning, at noon, and before departure, and synchronized review during handover. Field characteristics focus on time points, activity segments, child names, observation points, responsible person signatures, dates, and version numbers. After entering the knowledge base retrieval function, the daily life schedule assumes the role of segment and time baseline, the morning and afternoon health check records assume the role of health status and abnormality markers, and the child health observation records assume the role of individual tracking and handover basis. Together, the three constitute the source of candidate snippets, used for subsequent nodes or manual drafting of issuable materials and handover records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper limit trimming). "Issuable material drafts and handover records" are completed by subsequent nodes or manually. The retrieval mode is selected among semantic, full-text, and hybrid. Multiple candidate paths are merged and reranked, then filtered by similarity and trimmed by citation upper limit, ultimately yielding the cited content handed to the model.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Fields include time points, activity segments, responsible person signature, date and version, and must be consistent with the names, quantities, and dates of morning and afternoon health check records and health observation records | In the knowledge base search test, search separately using the same record name, check whether the time points, segments, and signature fields in the candidate snippets are complete, and record the number of candidates and scores |
| Morning and afternoon health check records | Fields include morning and afternoon check times, child names, health status, responsible person signature, date, and must match the segment times of the daily life schedule | Switch `searchMode` to semantic, full-text, and hybrid, test each once, compare the health status and date fields in the candidate snippets, and confirm there are no missing signatures or receipts |
| Child health observation records | Fields include observation points, child names, handling opinions, responsible person signature, date and version, and must be consistent with the names, quantities, and dates of morning and afternoon health check records | Turn `usingReRank` on and off, search once each, compare the ranking of the top few candidates, and check whether the cited text after `similarity` filtering retains key paragraphs |
| Handover records | Fields include both parties of the handover, handover time, material list, version and date, signed receipt, and must be consistent with the names, quantities, and dates of the three types of records | Draft a handover record according to the template and complete one handover, check whether missing items are blocked, record the number of candidates and cited text tokens separately, and do not equate array length with the citation content budget |

## Three common errors

- Phenomenon: The quantity of the same child name does not match between morning and afternoon health check records and health observation records. Cause: The two materials were drafted separately, without checking fields against the same date and version.
- Phenomenon: The daily life schedule has been updated, but the handover record still cites the old version date. Cause: The version was not synchronized, and retrieval candidates were not filtered by the latest date.
- Phenomenon: The handover record lacks a responsible person signature or receipt. Cause: The drafting step only took candidate snippets and did not check whether the receipt fields were complete.

## How to verify the setup

This function acceptance: Test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to see the ranking of the top few; also switch `searchMode` and adjust `similarity` and `limit`, observing changes in the number of candidates and scores.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, search for the same record name using different question formulations, record the number of candidates and scores, and check whether the returned citations retain key original text snippets.
- Turn rerank on and off, search once each, compare the order of the top few candidates, and check the cited text tokens and array count separately.
