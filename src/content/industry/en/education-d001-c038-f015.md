---
title: Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Find Supporting Evidence
slug: /en/industry/education-d001-c038-f015
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Retrieval | Evidence
meta_description: Continuing Education: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Find Supporting Evidence

## What this category's data looks like

Continuing education hour recognition business basis query revolves around three types of materials: course filing forms, study certificates, and hour recognition forms. Course filing forms record course name, number of class hours, filing date, and institutional seal; study certificates record learner name, study start and end dates, certificate number, and issuing unit signature; hour recognition forms record recognized hour period, recognition basis, recognition date, and handler signature. The three types of materials are updated by semester or training batch, and the current sealed version prevails. When entering the knowledge base retrieval and recall function, course filing forms provide the course and class hour basis, study certificates provide the study fact and date basis, and hour recognition forms provide the recognition conclusion and signature basis; together, the three support cross-material reference back to basis entries.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). Basis entries that can be traced back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Fields include course name, number of class hours, filing date, and institutional seal; the course name, number of class hours, and date for the same course in two materials must be consistent | In the search test, switch `searchMode`, search separately by course name and number of class hours, check whether candidate chunks trace back to the original course filing form text, and record the number of candidates and scores |
| Study certificate | Fields include learner name, study start and end dates, certificate number, and issuing unit signature; a certificate missing a signature or receipt does not constitute a valid basis | Search using a combination of learner name and study date, check whether candidate chunks hit the certificate number and signature position, and record the number of candidates and scores |
| Hour recognition form | Fields include recognized hour period, recognition basis, recognition date, and handler signature; the version must be the current sealed version, and an old version that has not been synchronized must not be used as a basis | Search using recognition date and recognition basis, check whether candidate chunks point to the current sealed version, and record the number of candidates and scores |
| Retrieval parameters | `searchMode`, `similarity`, `usingReRank`, and `limit` control the recall channel, similarity threshold, secondary ranking, and citation limit | In the search test, adjust `similarity` and `limit`, compare the order of the first few candidates before and after enabling `usingReRank`, and record the number of candidates and scores |

## Three common errors

- Symptom: the course name and number of class hours for the same record do not match between the course filing form and the study certificate. Cause: the two materials are entered separately without field alignment, so hits and associations must be checked first before judging the basis.
- Symptom: the hour recognition form version is not synchronized, and an old sealed version is still recalled. Cause: the current version does not overwrite the old version or the version is not marked, so the seal date and consistency with the current version must be checked.
- Symptom: a study certificate missing a signature or receipt still appears in candidate chunks. Cause: retrieval recalls by text similarity and does not verify signature or receipt status, so the original document must be manually verified.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the first few results; record the number of candidates and scores, switch `searchMode`, and adjust `similarity`, `limit`, and `usingReRank` to observe candidate changes.

Business test: ask a cross-material basis question and see whether the answer gives a traceable source.

- In the search test, fix the question, switch `searchMode` to semantic, full-text, and hybrid modes, record the number of candidates and scores respectively, and check whether both semantic and full-text results are included.
- Compare the order of the first few candidates before and after enabling `usingReRank`, adjust `similarity` and `limit`, check the tokens and array length of the cited text, and confirm that key chunks have not been trimmed out.
