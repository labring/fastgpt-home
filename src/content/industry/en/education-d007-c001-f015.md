---
title: Knowledge Base Retrieval for Daily Kindergarten Care Management: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c001-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Retrieval | Review
meta_description: Kindergarten Care: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Daily Kindergarten Care Management: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses kindergarten childcare daily life management. Materials include daily life schedules, morning and afternoon check records, and child health observation records. Daily life schedules are updated by class and week, with fields including activity time period, segment name, and teacher signature; morning and afternoon check records are updated daily, with fields including morning check time, body temperature, abnormal description, and health worker signature; child health observation records are updated by event, with fields including observation time, symptoms, handling measures, and reviewer signature. When materials enter knowledge base retrieval and recall, each serves as a candidate segment source: daily life schedules provide the basis for time periods and segments, morning and afternoon check records provide abnormal clues for the day, and child health observation records provide symptoms and handling processes. The retrieval service selects recall channels based on material form, outputs candidate segments and similarity scores, for subsequent nodes or manual comparison of fields, dates, and signatures, forming an abnormal list and review conclusion.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after pattern, merge, rerank, filter, and upper limit trimming). The "abnormal list and review conclusion" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether activity time period, segment name, teacher signature, and date are consistent with the original record | Switch `searchMode` in the search test, and check the time period and signature fields in the candidate segments |
| Morning and afternoon check records | Whether morning check time, body temperature, abnormal description, and health worker signature match the health observation records | Search with synonymous questions, view the `similarity` score and number of candidates, and compare the dates and counts of the two materials |
| Child health observation records | Whether observation time, symptoms, handling measures, and reviewer signature are complete and version-synchronized | Compare the ranking of the top few items before and after enabling `usingReRank`, and verify the cited text tokens and array count |
| Knowledge base retrieval service | Whether candidate segments and similarity scores are output after pattern, merge, rerank, filter, and upper limit trimming | Record the number of candidates and scores in the retrieval node and search test, and confirm that candidates and cited content are returned |

## Three common errors

- Phenomenon: The name, count, and date of the same abnormality do not match between the morning and afternoon check records and the health observation records. Cause: The two materials are entered separately, without field comparison by the same child and the same date.
- Phenomenon: The daily life schedule has been updated, but retrieval still returns old version segments. Cause: The version is not synchronized, and the knowledge base has not been re-imported or index update has not been triggered.
- Phenomenon: The review conclusion lacks the health worker or reviewer signature and receipt. Cause: After the abnormal list is generated, it does not return to the original records to verify signatures and directly enters the handling step.

## How to verify the setup

Acceptance of this feature: Test once each with synonymously rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` to see the ranking of the top few items; also record the number of candidates and cited text tokens.

Business test: Create an abnormal record, see whether the source material can be traced, and check the dates and signatures in the daily life schedule, morning and afternoon check records, and child health observation records.

- In the knowledge base search test, switch `searchMode`, and use semantic, full-text, and hybrid modes to retrieve the same abnormal description, recording the number of candidates and scores.
- Compare the returned candidates one by one with the original material fields, confirm dates, names, counts, and signatures, then generate an abnormal list and review conclusion and hand it to the responsible person for handling.
