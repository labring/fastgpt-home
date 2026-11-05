---
title: Knowledge Base Retrieval for Modern Apprenticeships and Employer-Sponsored Classes: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c031-f015
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Retrieval | Intake
meta_description: Apprenticeships: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Modern Apprenticeships and Employer-Sponsored Classes: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses modern apprenticeship and order class management scenarios; the materials include three categories: school-enterprise cooperation agreements, order class training plans, and master-apprentice mentoring records. School-enterprise cooperation agreements provide the cooperating entities, term, and signature/seal information; order class training plans provide job directions, course arrangements, and headcount plans; master-apprentice mentoring records provide mentoring cycles, assessment milestones, and receipts. The three material categories are updated by semester or batch, and their fields include name, quantity, date, signature, and version number. When entering knowledge base retrieval, school-enterprise cooperation agreements and training plans serve as the main source for semantic recall, while master-apprentice mentoring records serve as a supplementary source for full-text recall and field verification, each contributing candidates through different recall channels.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and limit truncation). Acceptance records and the completed follow-up questions are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | The name, quantity, date, and signature must be consistent across different materials | In the search test, test the same question once with each of several paraphrases, check whether the agreement name, term, and signature/seal fields in the candidate chunks correspond to the training plan, and record the number of candidates and scores |
| Order class training plan | The version number and date must be synchronized; missing signatures or receipts should be identified | Switch `searchMode` to semantic, full-text, and hybrid, compare whether the candidates cover the job directions and headcount plans in the training plan, and check the version and receipt fields |
| Master-apprentice mentoring record | The mentoring cycle, assessment milestones, and receipts must align with the training plan | Compare the top few rankings before and after enabling `usingReRank`, check whether the dates and signatures in the records are consistent with the training plan, and observe the chunks retained after `similarity` filtering |
| Acceptance records and completed follow-up questions | Missing items are identified and followed up on, and answers are grounded in the materials | Use a question missing key information to trigger retrieval, confirm that the missing fields are asked about first before answering, and check the number of citations and the text tokens after `limit` truncation |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the agreement and the training plan. Cause: the two materials are maintained separately, without field-level alignment and version comparison.
- Symptom: the training plan has been updated, but the mentoring record still references the old version. Cause: versions are not synchronized, expired chunks are mixed into the retrieval candidates, and they are not distinguished in ranking.
- Symptom: the agreement or mentoring record is missing a signature or receipt, but the answer is still given as if the materials were complete. Cause: missing-item identification does not trigger follow-up questions, and the retrieval candidates are not marked with missing fields.

## How to verify the setup

Acceptance for this feature: test once with each synonymously rewritten question, compare the candidates and scores, then toggle re-ranking on and off to observe the top few rankings.

Business test: ask a question missing key information and see whether it follows up first before answering.

- In the search test, switch `searchMode`, record the number of candidates and scores for semantic, full-text, and hybrid respectively, and check whether both types of recall results are included.
- Test once with `usingReRank` enabled and once disabled, compare the order of the top few; check the tokens of the cited text after `similarity` filtering and the array length after `limit` truncation, and record each separately.
