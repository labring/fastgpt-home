---
title: Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c024-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Retrieval | Intake
meta_description: Graduate Admissions: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the graduate admissions re-examination and admission scenario. Materials come from re-examination plans, candidate score sheets, transfer lists, and intake records. The re-examination plan provides process, scoring, and date requirements; the candidate score sheet provides preliminary and re-examination scores and rankings; the transfer list provides transfer preferences and proposed admission destinations; and intake records carry question items and supplementary information. Materials are updated in batch cadence, and fields include name, candidate number, major, score, date, signature, and receipt. When entering knowledge base retrieval and recall, the re-examination plan serves as the rule-basis fragment, the score sheet and transfer list serve as fact-verification fragments, and intake records serve as question-item context fragments, jointly supporting missing-item identification and follow-up questioning.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). Intake records and supplemented question items are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Check whether the process, scoring items, dates, and signature fields are complete, and whether the version is synchronized with the current batch | In the knowledge base search test, switch `searchMode`, compare semantic, full-text, and hybrid recall candidates, and check whether plan fragments hit the date and signature requirements |
| Candidate score sheet | Check whether name, candidate number, major, score, ranking, and date are consistent with the transfer list | Search using the same candidate number, record the number of candidates and `similarity`, and check whether the fields in the score sheet and transfer list match |
| Transfer list | Check whether transfer preferences, proposed admission destinations, quantities, and receipt signatures are consistent with the score sheet and re-examination plan | Compare the order of the first few items before and after enabling rerank, and check the impact of `usingReRank` on the relevance of list fragments |
| Intake records | Check whether question items contain key information, whether missing items are identified and followed up, and whether answers are based on materials | Test once each with synonym-rewritten questions, record the number of candidates and scores, and confirm that supplemented question items after follow-up can be transferred to the handler |

## Three common errors

- Phenomenon: The same candidate's name or quantity does not match between the score sheet and the transfer list. Cause: The two materials' versions are not synchronized, and retrieval candidates hit fragments from different versions.
- Phenomenon: The date in the re-examination plan is inconsistent with the date in the intake records. Cause: After the plan was updated, it was not synchronized to the knowledge base, and candidate fragments still reference content from the old version.
- Phenomenon: The transfer list lacks a signature or receipt, but the answer still gives a conclusion. Cause: The missing item was not identified as a follow-up point, and retrieval candidates did not cover the signature field and receipt field.

## How to verify the setup

This feature's acceptance: Test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle rerank to observe the ordering of the first few items; record the number of candidates and scores, check the citation upper limit against cited text tokens, and record array item counts separately.

Business test: Ask a question missing key information and see whether it asks a follow-up question before answering.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores for semantic, full-text, and hybrid recall.
- Enable and disable rerank, compare the ordering of the first few items, and check the impact of `usingReRank` on candidate ranking.
