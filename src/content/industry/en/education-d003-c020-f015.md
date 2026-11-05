---
title: Knowledge Base Retrieval for Grade Entry and Credit Recognition: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c020-f015
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Retrieval | Intake
meta_description: Grades and Credits: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Grade Entry and Credit Recognition: Handle Questions and Collect Missing Information

## What this category's data looks like

Grade entry and credit recognition involve three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. A transcript carries the course name, credits, grade, and the instructor's signature; a deferred examination application contains the application date, approval opinion, and signature; a make-up examination arrangement contains the make-up examination time, location, and receipt. Materials are updated by semester batch, and the fields are mainly course code, student ID, date, and signature column. When entering this function, the transcript serves as the core source of facts, the deferred examination application and make-up examination arrangement serve as the basis for conditions and status, and the three together support Q&A intake and missing-item follow-up.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The intake record and the completed follow-up questions are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Whether the course name, credits, grade, and signature column are complete, and whether the name, quantity, and date of the same record are consistent across the two materials | In the search test, switch `searchMode`, compare candidate chunks and similarity scores, and check the signature column and date fields |
| Deferred examination application | Whether the application date, approval opinion, and signature are complete, and whether the version is synchronized with the latest semester | Turn `usingReRank` on and off, observe changes in the ranking of the top few results, and confirm that the application date and approval opinion are recalled |
| Make-up examination arrangement | Whether the make-up examination time, location, and receipt match, and whether the date of the same record is consistent across different materials | Adjust `limit` and `similarity`, record the number of candidate items and scores, and check the receipt and date fields |
| Intake record and completed follow-up questions | Whether missing items are identified and followed up on, and whether the answer has a material basis | Test once each with synonym-rewritten questions, compare candidates and scores, and confirm that follow-up occurs before answering |

## Three common errors

- Phenomenon: The name or credits of the same course do not match across the two materials. Cause: The source material versions are not synchronized, and retrieval hits chunks from different versions.
- Phenomenon: The make-up examination arrangement date is inconsistent with the deferred examination application date. Cause: The two materials have different update rhythms, and no correlation check was performed.
- Phenomenon: The answer lacks key paragraphs or signature information. Cause: After similarity filtering and citation limit trimming, key chunks did not enter the candidates.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and similarity scores, then turn `usingReRank` on and off to observe the ranking of the top few results, and record the number of candidate items and scores.

Business test: submit a question missing key information and see whether it follows up before answering.

- In the knowledge base search test, switch `searchMode` and compare the candidate chunks and scores of the semantic, full-text, and hybrid modes.
- Adjust `limit` and `similarity`, record the tokens and array length of the cited text, and check whether key chunks are retained.
