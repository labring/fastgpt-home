---
title: Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Find Supporting Evidence
slug: /en/industry/education-d001-c024-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Retrieval | Evidence
meta_description: Graduate Admissions: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Find Supporting Evidence

## What this category's data looks like

In the graduate admissions re-examination and admission business, three types of materials—re-examination plans, candidate score sheets, and adjustment lists—jointly support basis queries. Re-examination plans are usually published annually, with fields including specialty direction, re-examination ratio, score conversion method, date, and signature/seal; candidate score sheets are formed by batch, with fields including candidate number, preliminary and re-examination subject scores, total score, and ranking; adjustment lists are updated along with the adjustment process, with fields including adjustment specialty, candidate number, score, and confirmation status. When these three types of materials enter the knowledge base retrieval service, their roles differ: re-examination plans provide the rule basis, candidate score sheets provide the individual data basis, and adjustment lists provide the list and status basis. The update cadence of materials is affected by the admissions year and batch; the same record may appear in multiple materials, and names, quantities, dates, and signature receipts need to be aligned item by item.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and upper-limit truncation). The basis entries that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Fields include specialty direction, re-examination ratio, score conversion method, date, and signature/seal, and it is the current version | In the knowledge base search test, retrieve with synonymous questions, check whether the returned candidates hit the corresponding paragraphs in the original plan text, and record the number of candidates and similarity scores |
| Candidate score sheet | Fields include candidate number, preliminary and re-examination subject scores, total score, and ranking, and are consistent with the plan's conversion method | Switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidates include both semantic and full-text results, and check whether the score fields match the plan clauses |
| Adjustment list | Fields include adjustment specialty, candidate number, score, and confirmation status, and are consistent with the same record's name, quantity, and date in the score sheet | Turn `usingReRank` on and off to compare the ordering of the top few results, verify whether list entries can be traced back to the original text, and check whether signatures or receipts are complete |
| Retrieval output | Candidate chunks and similarity scores are returned after merge, re-rank, filter, and upper-limit truncation | Check the candidate changes before and after `similarity` filtering, record the number of citations, i.e. the array length, and check the cited text tokens against `limit` and the citation content budget |

## Three common errors

- Symptom: the same candidate's name, quantity, or date does not match across two materials. Cause: the re-examination plan, score sheet, and adjustment list are each updated separately, without cross-material alignment.
- Symptom: the retrieved re-examination ratio or conversion method is not the current version. Cause: old-year plans were not taken down, and versions were not synchronized, causing expired clauses to be mixed into the candidates.
- Symptom: adjustment list entries lack signatures or receipts. Cause: the confirmation step was not completed when the list circulated between batches, so tracing back to the original text cannot be closed-loop.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then turn re-ranking on and off to observe the ordering of the top few results; record the number of candidates and similarity scores, switch `searchMode` to observe differences between semantic and full-text results, and use `similarity` and `limit` to check filtering and the citation upper limit.

Business test: ask a cross-material basis question and see whether the answer provides traceable sources.

- In the knowledge base search test, retrieve once each with synonymous questions, record the number of candidates and similarity scores, and compare the order of the top few results before and after enabling re-ranking.
- Check the fields, dates, and signatures of the re-examination plan, candidate score sheet, and adjustment list item by item, and confirm that the same record's name, quantity, and date are consistent and that the version is current.
