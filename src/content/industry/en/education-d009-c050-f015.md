---
title: Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c050-f015
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Retrieval | Multilingual
meta_description: Foreign Teachers: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of foreign teacher appointment and course scheduling. The materials include three categories: appointment contracts, work permit materials, and course schedules. Appointment contracts contain fields for appointment period, position, compensation, and signatures of both parties; work permit materials contain passport name, document number, permit period, and issuance receipt; course schedules contain course name, week number, classroom, and instructor. The three categories of materials exist in parallel in Chinese-English or multilingual versions, and their update cadence follows contract renewals, permit extensions, and semester scheduling changes. When the materials enter knowledge base retrieval, each participates in recall as an independent fragment source: contracts and permit materials support questions about appointment terms and identity verification, while course schedules support questions about scheduling and classrooms. Multilingual materials and terminology handling require first unifying the terminology glossary and the parallel text so that the same term is consistent throughout and the translated name can refer back to the original text, before external release.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). "Unifying the terminology glossary and parallel text" is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Appointment period, position, and compensation fields are complete with signatures of both parties, and terminology is consistent between Chinese and English versions | In the search test, switch `searchMode` to see whether candidates include both semantic and full-text results, and check the contract name, date, and signature fields |
| Work permit materials | Passport name, document number, permit period, and issuance receipt are consistent across versions | Check whether the name, quantity, and date of the same record in the permit materials and the contract match, and look at the number of returned candidates and scores |
| Course schedule | Course name, week number, classroom, and instructor fields are complete, and versions are synchronized | Test once each with synonymous questions, compare candidates and scores, and enable `usingReRank` to see changes in the ranking of the top few results |
| Unified terminology glossary and parallel text | The same term is consistent throughout, the translated name can refer back to the original text, and the number of citations and content completeness can be checked | Sample three terms and check their usage throughout, record the number of items in the citation array, and separately check the tokens of the cited text and the `limit` and `similarity` settings |

## Three common errors

- Symptom: The name or date of the same record does not match between the contract and the permit materials. Cause: The two versions of materials were entered separately, without checking against the original text according to the unified terminology glossary.
- Symptom: The course schedule changed the week number, but the contract attachment is still the old version. Cause: The versions were not synchronized, and the old fragment is still recalled and enters citations.
- Symptom: The permit materials lack the issuance receipt or the contract lacks the signature page. Cause: The receipt status was not checked before the materials entered the knowledge base, so the recalled fragments are incomplete.

## How to verify the setup

Acceptance of this feature: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few results; check the number of candidates and scores under `searchMode`, `usingReRank`, `similarity`, and `limit`.

Business test: Sample three terms and check whether their usage is consistent throughout, whether the translated names can refer back to the original text, and record the number of items in the citation array separately.

- In the knowledge base search test, switch the retrieval mode, compare whether candidates include both semantic and full-text results, and record the number of candidates and scores.
- Compare the order of the top few results before and after enabling rerank, and check the tokens and array item count of the cited text after similarity filtering and citation limit trimming.
