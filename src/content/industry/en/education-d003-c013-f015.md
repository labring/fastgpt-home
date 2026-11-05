---
title: Knowledge Base Retrieval for School Teacher Training Credits: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c013-f015
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Retrieval | Intake
meta_description: Teacher Credits: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Teacher Training Credits: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of primary and secondary school teacher training credit management. Materials include training notices, credit recognition forms, and participant lists. Training notices provide the training program name, start and end dates, and required hours, and are the source of basis for credit recognition; credit recognition forms carry teacher names, training programs, recognized credits, and signature fields, and are the core materials for intake and completing question items; participant lists record participants, units, and attendance, and are used to cross-check the names, quantities, and dates of the same record. The three types of materials often enter the knowledge base in batches at the beginning, middle, and end of the semester in different versions, with inconsistent field definitions and completeness of signature receipts, and when entering the knowledge base retrieval and recall stage, they respectively assume the roles of basis, recognition, and corroboration.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). "Intake records and completed question items" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the program name, start and end dates, and required hours are consistent with the credit recognition form, and whether the versions are synchronized | In the search test, test once each with synonymous rewritten questions, compare the number of candidates and scores, and check whether semantic and full-text results under `searchMode` appear simultaneously |
| Credit recognition form | Whether the teacher name, recognized credits, date, and signature field are complete, and whether the same record matches across the two materials | Switch the `similarity` threshold to observe candidate changes, compare the ranking of the top few items before and after enabling `usingReRank`, and separately record the number of items in the citation array and the tokens of the cited text |
| Participant list | Whether the participants, units, and attendance records are consistent with the names, quantities, and dates in the recognition form, and whether receipts are missing | Test once each with different phrasings of the same question, see whether candidates cover key snippets of the list, and after trimming by `limit`, check the number of citations and content completeness |
| Intake records and completed question items | Whether missing items are identified and followed up, and whether answers are based on materials | Ask a question missing key information, see whether it first follows up before answering, and then check whether candidate snippets can support the follow-up items |

## Three common errors

- Phenomenon: The same teacher name is written differently in the training notice and the credit recognition form, and recalled candidates do not match. Cause: The versions of the two materials are not synchronized, and field definitions are inconsistent.
- Phenomenon: The number of recognized credits does not match across the two materials, and the answer lacks key paragraphs. Cause: The dates and quantities in the participant list and the recognition form were not cross-checked, and candidates did not cover key snippets.
- Phenomenon: The credit recognition form lacks a signature or receipt, and it is not identified as a missing item during intake. Cause: When the material entered the knowledge base, the completeness of the signature field was not marked, and the follow-up rules did not cover this field.

## How to verify the setup

Acceptance of this feature: test once each with synonymous rewritten questions, compare candidates and scores, then toggle rerank to see the ranking of the top few items; at the same time switch `searchMode` and `similarity`, record the number of candidates and scores, record the number of citations separately by array length, and check the tokens of the cited text separately.

Business test: ask a question missing key information, and see whether it first follows up before answering.

- In the knowledge base search test, test once each with synonymous rewritten questions, compare the number of candidates and scores, and confirm whether candidates under `searchMode` and `similarity` cover key snippets of the training notice, credit recognition form, and participant list.
- Compare the ranking of the top few items before and after enabling `usingReRank`, and after trimming by `limit`, check the number of citations and content completeness, and check whether missing items are identified and followed up.
