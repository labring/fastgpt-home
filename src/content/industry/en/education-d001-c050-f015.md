---
title: Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Find Supporting Evidence
slug: /en/industry/education-d001-c050-f015
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Retrieval | Evidence
meta_description: Foreign Teachers: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Find Supporting Evidence

## What this category's data looks like

This page focuses on the foreign teacher appointment and course scheduling scenario, and the materials include three types: appointment contracts, work permit materials, and course scheduling tables. Appointment contracts carry position, appointment period, compensation, and signature fields; work permit materials carry permit number, validity period, issuance date, and receipt fields; course scheduling tables carry course name, weekly class hours, instructor, and scheduling date fields. The three types of materials are updated by semester and permit batch; appointment contracts are re-signed upon renewal or change, work permits are versioned according to approval progress, and course scheduling tables are revised on a rolling basis as scheduling adjustments occur. When entering the knowledge base retrieval function, appointment contracts and work permit materials participate in recall as basis sources, and course scheduling tables participate in recall as the factual source for scheduling; together, the three form a candidate snippet pool that can be traced back to the original text, for subsequent nodes or manual generation of basis entries.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). The "basis entries that can be traced back to the original text" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether the contract fields, appointment period dates, and signature are consistent with the work permit materials | In the search test, switch `searchMode` to hybrid, check whether the candidate snippets hit both the contract and the permit materials; record the number of candidates and the `similarity` score |
| Work permit materials | Whether the permit number, validity period, issuance date, and receipt match the appointment contract | Compare the name, quantity, and date of the same record in the two materials; observe changes in the ranking of the top few results before and after enabling `usingReRank` |
| Course scheduling table | Whether the course name, weekly class hours, instructor, and scheduling date are consistent with the appointment contract position | Check whether the candidate snippets cover the scheduling fields; adjust `limit` to observe changes in the number of candidates, and confirm that key passages have not been trimmed |
| Retrieval return | Whether the candidate snippets and similarity scores can be traced back to the original text location | Record the number of candidates and the score, and check whether the tokens of the cited text retain the key snippets of the original text |

## Three common errors

- Phenomenon: the same teacher's name is written differently in the appointment contract and the work permit materials. Cause: the name field was not unified at entry, and the two versions of the materials are maintained separately.
- Phenomenon: the weekly class hours in the course scheduling table do not match the class hours for the position in the appointment contract. Cause: after scheduling adjustments, the contract was not re-versioned, and the versions were not synchronized.
- Phenomenon: the work permit materials lack a receipt signature, but retrieval still returns candidate snippets. Cause: the signature field was not validated when the materials were entered into the knowledge base, and the candidate status is disconnected from the original text status.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare the number of candidates and the `similarity` score, then toggle `usingReRank` on and off to see changes in the ranking of the top few results.

Business test: ask a cross-material basis question and see whether the answer gives a traceable source.

- In the search test, switch `searchMode`, run semantic, full-text, and hybrid respectively, and record the number of candidates and the score.
- When checking the citation limit, check the tokens of the cited text; record the number of array items separately, and do not perform an equality comparison.
