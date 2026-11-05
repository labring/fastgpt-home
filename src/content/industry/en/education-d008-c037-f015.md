---
title: Knowledge Base Retrieval for Vocational Training Subsidy Applications: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c037-f015
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Retrieval | Access
meta_description: Training Subsidies: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational Training Subsidy Applications: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the vocational training subsidy application category; materials include training class filing records, attendance records, and completion assessment forms. Class filing records contain the institution name, training program, class start date, student roster, and signature of the person in charge; attendance records contain the daily attendance date, student name, attendance status, and signature of the class supervisor; completion assessment forms contain the assessment date, assessment item, score, assessor signature, and institution receipt. Sources are submissions from training institutions, acceptance receipts from human resources and social security departments, and archives from assessment institutions. The update cadence advances by class batch: filing precedes attendance, attendance precedes assessment, and completion materials are compiled after assessment. The field characteristic is that the same student name, training program, date, headcount, and signature appear repeatedly across the three types of materials. When materials enter knowledge base retrieval and recall, the class filing record serves as the basis for program scope and authorization, the attendance record serves as process evidence, and the completion assessment form serves as outcome evidence; each forms candidate chunks for subsequent nodes or manual determination of visitor identity and visibility scope.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The externally available entry points and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing record | Institution name, training program, class start date, student roster, and signature of the person in charge are consistent between the filing record and the attendance records | In the search test, switch `searchMode` to semantic, full-text, or hybrid, compare candidate chunks and similarity scores, and verify field by field the fields, dates, and signatures of the filing record and attendance records |
| Attendance record | Daily attendance date, student name, attendance status, and signature of the class supervisor correspond to the roster in the completion assessment form | Compare the order of the top few candidates before and after enabling `usingReRank`, and check whether the attendance records and assessment form match in names, counts, and dates |
| Completion assessment form | Assessment date, assessment item, score, assessor signature, and institution receipt are complete and synchronized with the filing batch | Check the number of returned candidates and scores, verify whether key chunks of the assessment form are retained after `similarity` filtering, and record the tokens and array length of the cited text |
| External entry point and authorization scope | Visitor identity matches the visibility scope, and unauthorized content is not visible | Access once with a restricted identity, check whether the visibility scope matches the configuration, and verify whether the candidates after `limit` trimming still contain key original text chunks within the authorized scope |

## Three common errors

- Symptom: The same student name is written differently in the class filing record and the attendance records, causing recalled candidates to fail to match. Cause: The name format was not unified at entry, and versions were not synchronized.
- Symptom: The headcount in the completion assessment form does not match the headcount in the attendance records, and the answer lacks key paragraphs. Cause: Attendance was not backfilled after assessment, and the material dates and signatures lack receipts.
- Symptom: There are many candidates but the ones ranked at the top are all irrelevant, and unauthorized content is mixed into the visible scope. Cause: The retrieval mode does not match the material form, and filter and limit trimming were not set according to the authorization scope.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidate chunks and `similarity` scores, then toggle `usingReRank` on and off to see whether the ranking of the top few changes.

Business test: access once with a restricted identity, check whether the visibility scope matches the configuration, and record the number of candidates and the tokens of the cited text; do not compare the two for equality.

- In the knowledge base search test, switch `searchMode` and separately verify the candidate chunks and scores for the class filing record, attendance records, and completion assessment form.
- Check the tokens and array length of the cited text after `limit` trimming, and confirm that unauthorized content is not visible and that key signatures and receipts are not lost.
