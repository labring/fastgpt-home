---
title: Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Find Supporting Evidence
slug: /en/industry/education-d001-c054-f015
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Retrieval | Evidence
meta_description: Self-Study Exams: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Find Supporting Evidence

## What this category's data looks like

This page focuses on the business basis query for self-taught examination records and graduation review, involving three types of materials: examination records, course qualification certificates, and graduation application forms. Examination records contain the candidate's basic information, admission ticket number, major name, course scores, and status fields; course qualification certificates contain the course code, course name, qualification date, and the seal of the examining institution; graduation application forms contain name, ID number, major, number of courses, signature, and receipt date. The materials are sourced from provincial examination offices and examining institution archives, and the update cadence is synchronized with examination sessions and graduation review batches. When entering the knowledge base retrieval and recall function, examination records serve as the identity and score ledger, course qualification certificates serve as single-subject qualification evidence, and graduation application forms serve as the graduation conclusion and signature receipt, together supporting cross-material basis comparison.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). "Basis entries that can be traced back to the original text" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Examination records | Fields include admission ticket number, major name, course scores, and status; dates and signatures must correspond item by item with course qualification certificates; names and quantities must not conflict with the graduation application form | In the search test, switch `searchMode` to hybrid mode, check whether candidate snippets contain both semantic and full-text results, and record the number of candidates and scores |
| Course qualification certificates | Course code, course name, qualification date, and the seal of the examining institution must be consistent with the same record in the examination records; missing signature or receipt is considered inconsistent | Search once each with synonym-rewritten questions, compare candidates and scores, and observe changes in the ranking of the top few results before and after enabling `usingReRank` |
| Graduation application form | Name, ID number, major, number of courses, and signature receipt date must match the examination records and course qualification certificates, and the version should be current | Adjust the `similarity` threshold and `limit` upper bound, record the tokens of the cited text and the number of array entries separately, and confirm that key snippets have not been trimmed |

## Three common errors

- Phenomenon: The same candidate's name is written differently in the examination records and the graduation application form. Cause: The name was not unified according to the ID document at entry, so the names do not match during cross-material comparison.
- Phenomenon: The date on the course qualification certificate differs by several days from the score date in the examination records. Cause: The two materials were archived in different batches, and the versions were not synchronized.
- Phenomenon: The graduation application form lacks the signature or receipt of the examining institution. Cause: The scanned copy is incomplete, but it is still returned as a candidate snippet during retrieval and recall.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few results.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, and hybrid, and record the number of candidates and scores respectively.
- Adjust the `similarity` threshold and `limit` upper bound, check the tokens of the cited text, and record the number of array entries separately.
