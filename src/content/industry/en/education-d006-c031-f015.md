---
title: Knowledge Base Retrieval for Modern Apprenticeships and Employer-Sponsored Classes: Track Progress and Check Statistics
slug: /en/industry/education-d006-c031-f015
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Retrieval | Progress
meta_description: Apprenticeships: review retrieval for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Modern Apprenticeships and Employer-Sponsored Classes: Track Progress and Check Statistics

## What this category's data looks like

Modern apprenticeship and order class management revolves around three types of materials: school-enterprise cooperation agreements, order class training plans, and master-apprentice records. School-enterprise cooperation agreements contain the cooperation period, positions, headcount, and signatures/seals; order class training plans contain courses, job rotations, and assessment milestones; master-apprentice records contain apprenticeship dates, work hours, processes, and signed receipts. Materials are updated weekly or monthly, and version numbers and signature fields are common fields. When these three types of materials enter the knowledge base retrieval service, each serves as a source of candidate chunks: agreement chunks provide the basis for headcount and duration, training plan chunks provide the basis for progress milestones, and apprenticeship record chunks provide the basis for what actually occurred. Retrieval returns candidate chunks and similarity scores for subsequent nodes or manual verification of names, quantities, dates, and signatures, forming a progress table and statistical scope statement, which then feed into weekly or monthly reports.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The progress table and statistical scope statement are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Whether the name, quantity, date, and signature/seal are consistent with the order class training plan | In the search test, switch `searchMode`, test once each with the agreement name and the headcount question, record the number of candidate items and scores, and check whether the quantity and date in the agreement chunks match those in the training plan chunks |
| Order class training plan | Whether the course, job rotation, and assessment milestone dates match the master-apprentice records | Compare the top few rankings before and after enabling `usingReRank`, check whether the milestone dates in the training plan chunks are consistent with the actual dates in the apprenticeship record chunks, and check whether the version numbers are in sync |
| Master-apprentice record | Whether the apprenticeship date, work hours, process, and signature or receipt are complete | Use one week of records to verify the totals, check whether the signature and receipt fields in the candidate chunks are complete, and record the changes in the number of candidate items and scores before and after `similarity` filtering |
| Cited content | Record the tokens of the cited text and the number of array items separately; do not compare them for equality | Check the number of returned citations (array length) and the tokens of the cited text, and verify whether the key original text chunks are still retained after `limit` trimming |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the agreement and the training plan. Cause: The two materials are maintained separately and are not checked against the same scope, resulting in inconsistency between the statistical totals and the number of records.
- Symptom: The training plan has been updated, but the apprenticeship records still reference the old version, and the dates and processes do not match. Cause: The versions are not in sync, retrieval candidates hit both old and new chunks at the same time, and filtering by version number is not applied.
- Symptom: Apprenticeship records lack a signature or receipt but are still counted in the totals. Cause: The materials have not completed the signature/seal process, and retrieval only returns candidate chunks without judging signature validity.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare the number of candidate items and scores, then toggle re-ranking on and off to observe the top few rankings; switch `searchMode` and `usingReRank`, and record the number of candidate items and scores before and after `similarity` filtering.

Business testing: use one week of records to verify the totals, and check whether the scope and exceptions are clearly stated; verify whether the names, quantities, dates, and signatures in the three materials—agreement, training plan, and apprenticeship records—are consistent.

- In the search test, retrieve the same week of records using semantic, full-text, and hybrid modes respectively, compare the candidate chunks and similarity scores, and record the changes in the number of items.
- Compare the top few rankings before and after enabling re-ranking, check the tokens of the cited text and the number of array items, and confirm that key signature and date chunks are still retained after trimming.
