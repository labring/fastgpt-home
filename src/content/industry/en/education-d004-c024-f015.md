---
title: Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c024-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Retrieval | Handover
meta_description: Graduate Admissions: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on material drafting and responsibility handover in the graduate admissions re-examination and admission scenario, involving three types of materials: re-examination plans, candidate score sheets, and adjustment lists. The re-examination plan contains fields such as re-examination time, location, weights, and supervision phone number; the candidate score sheet contains the candidate number, preliminary exam total score, re-examination score, total score, ranking, and signature field; the adjustment list contains the adjustment batch, original application unit, proposed admission major, and receipt status. The material sources are forms and texts submitted by the admissions management department and each college, and the update rhythm is multiple revisions within a batch and version switching between batches. When entering the knowledge base retrieval service, the three types of materials each participate in recall as independent document fragments: the re-examination plan provides the process basis, the score sheet provides the data verification benchmark, and the adjustment list provides clues for personnel flow, jointly supporting subsequent nodes or manual drafting of signable material drafts and handover records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit truncation). The signable material drafts and handover records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Fields are complete: re-examination time, location, weights, supervision phone number, signature field; dates and versions are consistent | In the search test, switch `searchMode` to semantic, full-text, and hybrid once each, and check whether the candidates cover the key fields of the plan; check whether the `similarity` score ranking puts fragments containing the signature field first |
| Candidate score sheet | Candidate number, preliminary exam total score, re-examination score, total score, and ranking have consistent names and quantities in the two materials; missing signatures or receipts are blocked | Use the same candidate number to construct a query, and compare whether the candidate number, total score, and ranking in the score sheet and adjustment list are consistent in the candidate fragments; observe the ranking changes of the top few items before and after enabling `usingReRank` |
| Adjustment list | The adjustment batch, original application unit, proposed admission major, and receipt status fields are complete; when versions are not synchronized, the dates do not match | Retrieve the adjustment batch and proposed admission major, and check whether the candidate fragments include the receipt status; record the number of items in the returned array, and separately check whether the tokens of the cited text still retain key fragments after truncation by `limit` |
| Handover record | The responsible person is clear, the version and date are consistent, and the next step's receipt field is complete | Draft a handover record according to the template, complete one handover, and see whether missing items are blocked; retrieve the handover record fragments and check whether the responsible person, version, and date fields appear at the same time |

## Three common errors

- Symptom: the total score or ranking of the same candidate number does not match between the score sheet and the adjustment list. Cause: the versions of the two materials are not synchronized, the retrieval candidates come from fragments of different batches, and they are not filtered by the latest version.
- Symptom: the re-examination time and location dates in the re-examination plan and the handover record are inconsistent. Cause: the latest plan fields were not backfilled during material drafting, and the handover step lacks signature or receipt verification.
- Symptom: there are many candidates but the ones ranked first are all irrelevant, and the answer lacks the key signature field paragraph. Cause: rerank is not enabled or the similarity filter threshold is inappropriate, and key fragments are truncated after citation limit truncation.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, compare the number of candidates and `similarity` scores, then toggle `usingReRank` on and off to see the ranking of the top few items; switch `searchMode` to semantic, full-text, and hybrid, record the number of items in the returned array, and separately check whether the tokens of the cited text still retain key fragments after truncation by `limit`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked; check the fields, dates, and signatures of the re-examination plan, candidate score sheet, and adjustment list, and confirm that the same record's name, quantity, and date are consistent, versions are synchronized, and signatures and receipts are complete.

- In the knowledge base search test, retrieve the same question once each with different phrasings, record the number of candidates and `similarity` scores, and compare whether the same batch of key fragments is recalled.
- Enable and disable `usingReRank`, compare the order of the top few candidates, and check whether the secondary ranking after hybrid retrieval puts fragments containing the signature field and receipt status first.
