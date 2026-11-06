---
title: Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c054-f015
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Retrieval | Review
meta_description: Self-Study Exams: review retrieval for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Trace Exceptions and Review Results

## What this category's data looks like

Self-taught examination registration records and graduation review materials mainly consist of registration archives, course qualification certificates, and graduation application forms. Registration archives come from the provincial registration system and are updated by exam session; their fields include admission ticket number, name, ID number, major code, course code, score, status, and signature field. Course qualification certificates are issued by the main examining institution or the provincial examination office and are updated by course batch; their fields include course name, credits, qualification date, certificate number, and handler signature. Graduation application forms are filled in by the candidate and the preliminary review unit and are updated by graduation batch; their fields include major name, number of courses, total credits, application date, preliminary review opinion, person-in-charge signature, and receipt. When these three types of materials enter knowledge base retrieval and recall, registration archives play the role of verifying identity and enrollment status, course qualification certificates play the role of verifying course completion and qualification date, and graduation application forms play the role of verifying graduation eligibility and signature receipt. The retrieval service slices the materials into candidate chunks and similarity scores, which are used to locate the original records during exception tracing.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The exception list and review conclusions are completed by subsequent nodes or manually. The retrieval mode, multi-route merge, rerank, and similarity filtering jointly determine the candidates and scores.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration archives | Compare name, ID number, major code, course code, score, status, and signature field field by field against the two other materials | In the search test, retrieve with synonymous questions, record the number of candidates and scores, and check whether the hit chunks contain the original fields |
| Course qualification certificates | Compare course name, credits, qualification date, certificate number, and handler signature field by field against the registration archives | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether the candidates cover both semantic and full-text results |
| Graduation application forms | Compare major name, number of courses, total credits, application date, preliminary review opinion, person-in-charge signature, and receipt field by field | Compare the ranking of the top few results before and after enabling `usingReRank`, and record the number of candidates and scores after `similarity` filtering |
| Exception list and review conclusions | Each exception is supported by an original record and signed by the reviewer | After trimming by `limit`, check the referenced text tokens, record the array length separately, and hand it over to the person in charge for handling |

## Three common errors

- Symptom: the name, quantity, or date of the same course does not match between the registration archives and the course qualification certificate. Cause: the two materials are updated in different batches, versions are not synchronized, and no field-level comparison is performed after retrieval hits.
- Symptom: the graduation application form lacks the preliminary review signature or receipt. Cause: form filling and preliminary review are separate steps, the signature field chunk is not retained when the material enters the knowledge base, and the recalled candidates lack this field.
- Symptom: the same question phrased differently cannot be recalled, or there are many candidates but the top-ranked ones are all irrelevant. Cause: the retrieval mode does not match the material form, rerank is not enabled, or the similarity filtering threshold and reference limit trimming are inappropriate.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ranking of the top few results; record the number of candidates and scores under `searchMode`, `similarity`, `usingReRank`, and `limit`.

Business test: create one exception record and see whether the source material can be traced.

- In the knowledge base search test, switch the retrieval mode and compare whether the candidates include both semantic and full-text results, recording the number of candidates and scores.
- Compare the order of the top few results before and after enabling rerank, check the referenced text tokens and array length after similarity filtering, and confirm that key chunks are not lost.
