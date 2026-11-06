---
title: Knowledge Base Retrieval for Grade Entry and Credit Recognition: Track Progress and Check Statistics
slug: /en/industry/education-d006-c020-f015
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Retrieval | Progress
meta_description: Grades and Credits: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Grade Entry and Credit Recognition: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the grade entry and credit recognition scenario. Materials include transcripts, deferred examination applications, and supplementary examination arrangements, sourced from academic affairs system exports and departmental submissions, with a weekly aggregation and monthly verification update cadence. Transcripts carry course names, credits, grades, and signature fields; deferred examination applications record the reason for deferral, the original examination date, and the approval receipt; supplementary examination arrangements mark the supplementary examination time, location, and invigilator signature. When these three types of materials enter the knowledge base retrieval and recall function, each serves as a candidate chunk source: transcripts provide the basis for credit recognition, deferred examination applications provide progress exception explanations, and supplementary examination arrangements provide time nodes and signature status. The retrieval service matches recall channels according to material form, returns candidate chunks with similarity scores, and provides them for subsequent nodes or manual generation of progress tables and statistical scope explanations. Field characteristics center on course codes, credit values, examination dates, approval status, and signature receipts; the names, quantities, and dates of the same record across different materials must be aligned item by item.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit truncation). The "progress table and statistical scope explanation" is then completed by subsequent nodes or manually. The retrieval mode switches among semantic, full-text, or hybrid, matching the material form.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Fields include course name, credits, grades, and signature; dates and signatures must be aligned item by item with deferred examination applications and supplementary examination arrangements | In the search test, switch `searchMode`, check whether course names and credits are consistent with deferred examination applications and supplementary examination arrangements, and record the number of candidate items and scores |
| Deferred examination application | Fields include reason for deferral, original examination date, and approval receipt; if the signature or receipt is missing, it is not counted in the progress total | Retrieve deferred examination records with synonymous questions, compare `similarity` scores, and check whether the returned candidates include approval receipt chunks |
| Supplementary examination arrangement | Fields include supplementary examination time, location, and invigilator signature; when the date does not match the examination date in the transcript, mark it as an exception | Compare the ranking of the top few items before and after enabling `usingReRank`, check whether the supplementary examination date is consistent with the transcript date, and record the number of cited items separately |
| Statistical scope explanation | The header states the scope of record counts and statistical counts, with exception items listed separately | Use one week of records to verify the total, check whether the tokens of the cited text after `limit` truncation retain key fields, and record the number of array items separately |

## Three common errors

- Symptom: the name and quantity of the same course do not match between the transcript and the supplementary examination arrangement. Cause: the versions of the two materials are not synchronized, or a unified course code was not used for verification during entry.
- Symptom: a deferred examination application is missing a signature or receipt, but it is still counted in the progress total. Cause: the approval status was not written back, and the statistical scope did not list items missing signatures as exceptions.
- Symptom: there are many candidates, but the ones ranked at the top are all irrelevant, and the answer lacks key paragraphs. Cause: the retrieval mode does not match the material form, or rerank was not enabled, resulting in the absence of secondary sorting.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few items; switch `searchMode` to observe the difference between semantic and full-text results, and check `similarity` scores and the number of candidate items.

Business test: use one week of records to verify the total, and see whether the scope and exceptions are clearly stated; check whether the dates and signatures of transcripts, deferred examination applications, and supplementary examination arrangements are aligned, record the number of cited items by array length, and record the tokens of the cited text separately.

- In the knowledge base search test, switch `searchMode`, compare the candidate chunks and similarity scores returned by the semantic, full-text, and hybrid modes, and confirm that the material form matches the mode.
- Retrieve once before and after enabling `usingReRank`, compare the ranking changes of the top few items; check whether the cited text after `limit` truncation retains key fields such as course name, credits, date, and signature.
