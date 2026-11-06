---
title: Knowledge Base Retrieval for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c058-f015
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Retrieval | Intake
meta_description: Research Agreements: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information

## What this category's data looks like

In the scenario of signing research project task books, the materials include the project task book, the subject task breakdown table, and the budget book. The sources are formal texts and scanned copies archived by research management units, and the update cadence rolls forward with application batches and signing progress. The field characteristics are concentrated in project name, subject number, undertaking unit, start and end dates, funding categories, signatures and seals, and receipts. When entering this function, the project task book serves as the main record to determine the overall objectives and responsible entities, the subject task breakdown table handles the refinement of subject levels, task division, and assessment indicators, and the budget book provides funding details and category definitions. The three types of materials serve as cross-references for one another; the names, quantities, and dates of the same record in different materials need to be cross-checked, and version synchronization and the completeness of signatures and receipts determine whether acceptance can proceed.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The acceptance record and the completed follow-up questions are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Check whether the project name, subject number, start and end dates, signatures, and receipts are consistent with the archive | In the knowledge base search test, search the project name and subject number, switch `searchMode` to compare the number of candidates and scores, and confirm that the key field passages are recalled |
| Subject task breakdown table | Check whether the subject levels, task division, and assessment indicators correspond to the project task book | Search the subject name and breakdown indicators, compare the ranking of the top few items before and after enabling `usingReRank`, and check whether the names and quantities of the same record match |
| Budget book | Check whether the funding categories, amount definitions, dates, and signatures are consistent with the task book | Search the funding categories and budget items, observe the original text snippets retained after `similarity` filtering, record the number of candidates and scores, and separately record the length of the citation array |
| Acceptance record and completed follow-up questions | Missing items are identified and followed up on, and answers are based on materials | Ask a question that is missing key information, see whether it first asks a follow-up question before answering, and check whether the follow-up items point to specific fields in the task book, breakdown table, or budget book |

## Three common errors

- Phenomenon: the same project name is written differently in the task book and the breakdown table. Cause: versions are not synchronized, and the old breakdown table is still in the knowledge base participating in recall.
- Phenomenon: the number of subjects or budget categories does not match between the two materials. Cause: after the budget book is updated, it is not written back to the task book, and the field definitions are inconsistent.
- Phenomenon: missing signatures or receipts are still accepted as complete materials. Cause: retrieval only recalls body-text snippets and does not cover signature pages and receipt attachments.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ranking of the top few items; at the same time adjust `searchMode` and `similarity`, record the number of candidates and scores, separately record the length of the citation array, and do not compare `limit` and the citation budget for equality.

Business test: ask a question that is missing key information, and see whether it first asks a follow-up question before answering.

- In the knowledge base search test, switch `searchMode`, retrieve once each for synonym rewrites of the same question, and compare the number of candidates and scores.
- Enable and disable `usingReRank`, compare the order of the top few candidates, and check whether the returned citations retain the key field passages of the task book, breakdown table, and budget book.
