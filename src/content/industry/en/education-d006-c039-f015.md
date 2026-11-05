---
title: Knowledge Base Retrieval for Exam Organization and Misconduct Handling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c039-f015
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Retrieval | Progress
meta_description: Exam Administration: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Exam Organization and Misconduct Handling: Track Progress and Check Statistics

## What this category's data looks like

Materials in the exam organization and violation handling category include exam administration manuals, examination room record sheets, and violation fact records. The exam administration manual defines procedures and statistical criteria, the examination room record sheet carries per-session progress and absence/exception records, and the violation fact record carries violation entries and signed receipts. Materials are collected by exam batch from the exam administration system, invigilation inspection receipts, and invigilator submissions, and are updated on a weekly or monthly reporting cadence. Fields cover session, subject, date, number of candidates expected and actually present, violation type, handling status, signature, and receipt. When entering knowledge base retrieval, the exam administration manual is used to recall criteria and procedure fragments, the examination room record sheet is used to recall progress and quantity fragments, and the violation fact record is used to recall fact and signature fragments; together the three support verification of the progress table and the statistical criteria statement.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "progress table and statistical criteria statement" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam administration manual | Fields include session, subject, date, and statistical criteria; version and signature fields are complete | In the search test, ask questions by exam administration manual fields, check whether candidate fragments cover the criteria and exceptions, and record the number of candidates and scores |
| Examination room record sheet | Fields include expected, actual, absent, and exception counts; dates and invigilator signatures match | Retrieve with the same session question, check whether the quantities and dates in the candidates match the record sheet, and switch `searchMode` to compare candidates |
| Violation fact record | Fields include violation type, handling status, receipt, and signature; entries can be checked one by one | Retrieve by violation type and date, check candidate entries against receipt signatures, and if necessary adjust `similarity` to observe changes in candidates |
| Retrieval node | After multi-path merging it has been reranked; after filtering and limit trimming, key fragments are retained | Enable and disable rerank to compare the order of the first few items, record the number of candidates and scores, and separately check the tokens of the cited text and the `limit` upper bound |

## Three common errors

- Symptom: the name, quantity, and date of the same session do not match between the examination room record sheet and the violation fact record. Cause: the two materials are each submitted separately and fields are not aligned by the same session and subject.
- Symptom: the exam administration manual criteria have been updated, but the examination room record sheet still uses the old version, and the statistical totals are inconsistent with the manual statement. Cause: versions are not synchronized, and the material update cadence is out of step with batch release.
- Symptom: the violation fact record lacks a signature or receipt, and the progress table cannot confirm the handling status. Cause: receipts were not archived together with the record, and retrieval candidates only cover body-text fragments.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank to see the ordering of the first few items; check the number of candidates and scores, and confirm candidate changes after switching `usingReRank` and `searchMode`.

Business test: verify totals against one week of records and see whether criteria and exceptions are clearly stated; record the number of citations by array length, check the citation upper bound against the tokens of the cited text, and do not compare it for equality with `limit`.

- Compare the exam administration manual, examination room record sheet, and violation fact record item by item by session, subject, and date; mark inconsistent names, quantities, and dates and backfill the criteria statement.
- In the search test, retrieve with synonym questions, record the number of candidates and scores, switch `searchMode` and `usingReRank` to observe ordering, and separately check the cited text tokens and the `limit` upper bound.
