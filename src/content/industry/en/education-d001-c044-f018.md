---
title: Reranking and Hybrid Retrieval for Training Provider Scheduling and Lesson Records: Find Supporting Evidence
slug: /en/industry/education-d001-c044-f018
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Reranking | Evidence
meta_description: Training Schedules: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Training Provider Scheduling and Lesson Records: Find Supporting Evidence

## What this category's data looks like

This page addresses the scheduling and lesson-consumption scenarios of training institutions; the materials include three types: class schedules, lesson-consumption records, and schedule-change requests. Class schedules are updated weekly or monthly and contain the course name, class, teacher, classroom, start and end times, date, and a signature field; lesson-consumption records are registered one by one and contain the student, course, consumed lesson hours, date, and parent receipt; schedule-change requests are submitted one by one and contain the original lesson occurrence, target lesson occurrence, reason, approval, and signature. When the three types of materials enter hybrid retrieval, their roles differ: class schedules provide the scheduling baseline, lesson-consumption records provide the actual-consumption evidence, and schedule-change requests provide the change chain. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures; the same record often appears across two materials with inconsistent name spellings, differences in lesson-hour quantities, dates spanning days or versions not synchronized, and missing signatures or receipts. The current version of the materials prevails; historical versions must be distinguishable, and basis entries must be able to point back to the original text.

## Configuration and implementation checks

This step is performed by the rerank model in the retrieval service, which outputs the sorted candidates and rerank scores. "Basis entries that can point back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the rerank model is usually used again to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Fields contain the course name, class, teacher, classroom, start and end times, date, and signature field; the version must be the current one | In the search parameters, check `searchMode` and `usingReRank`, see whether candidates come from both the vector and full-text paths, and compare the order and scores of the top three before and after reranking |
| Lesson-consumption record | Fields contain the student, course, consumed lesson hours, date, and parent receipt; the quantity and date must match the class schedule | Check `limit` and `similarity`, observe the number of candidates and the rerank scores, and confirm that lesson-consumption record entries can point back to the original text and that signatures or receipts are complete |
| Schedule-change request | Fields contain the original lesson occurrence, target lesson occurrence, reason, approval, and signature; the date and lesson occurrence must be consistent with the class schedule and lesson-consumption records | Compare the order and scores before and after reranking, check whether the schedule-change request is consistent with the class schedule and lesson-consumption records in name, quantity, and date, and mark entries missing signatures or receipts |

## Three common errors

- Symptom: the same lesson occurrence has mismatched names or lesson-hour quantities between the class schedule and the lesson-consumption record. Cause: the two materials are maintained separately, name spellings and quantity definitions are not unified, and cross-material checking is lacking.
- Symptom: a schedule-change request has been approved, but the class schedule still shows the original lesson occurrence and date. Cause: versions are not synchronized, the current version and historical versions are mixed, and rerank scores cannot distinguish version timeliness.
- Symptom: a lesson-consumption record has consumed lesson hours, but no parent receipt or signature can be found. Cause: receipts and signature fields were not archived together with the record, so evidence is missing when basis entries point back to the original text.

## How to verify the setup

Acceptance of this feature: compare the order and scores of the top three before and after enabling reranking, check the number of candidates and the rerank scores, confirm the status of `usingReRank` and `searchMode`, and record the number of array entries and the tokens of the cited text.

Business test: ask a cross-material basis question and see whether the answer gives a citable source, whether the basis comes from this institution's materials, whether the version is the current one, and whether the entries match the original text.

- In the search parameters, check `searchMode`, `usingReRank`, `limit`, and `similarity`, compare the order and scores before and after reranking, and confirm that candidates come from both the vector and full-text paths.
- Check the names, quantities, dates, and signatures of the class schedules, lesson-consumption records, and schedule-change requests one by one, mark entries with unsynchronized versions or missing signatures or receipts, and separately record the number of citation array entries and the tokens of the cited text.
