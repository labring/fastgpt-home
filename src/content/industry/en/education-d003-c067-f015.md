---
title: Knowledge Base Retrieval for Peer Review Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c067-f015
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Retrieval | Intake
meta_description: Peer Review: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Peer Review Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the Q&A intake and missing-item follow-up scenarios of peer review organizations. The materials include three types: review invitations, expert review comments, and author revision notes. A review invitation carries the manuscript title, submission date, expert information, and receipt signature; expert review comments carry the review conclusion, comment items, submission date, and signature; author revision notes carry revision items, reply date, and signature. The three types of materials are linked by manuscript number, and the update cadence advances with review rounds. There are characteristics such as the same record's name, quantity, and date failing to match across two materials, versions not being synchronized, and missing signatures or receipts. After the materials enter the knowledge base retrieval service, review invitations are used to identify information to be supplemented, while expert review comments and author revision notes serve as candidate fragment sources; after recall and reranking, they are used by subsequent nodes to generate intake records and the questions to be completed.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit truncation). The intake records and the questions to be completed are then finished by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Fields include manuscript title, submission date, expert information, and receipt signature; the name, quantity, and date must be aligned item by item with the expert review comments | In the search test, switch `searchMode` and check whether the manuscript title, submission date, and receipt signature in the candidate fragments are consistent with the review comments |
| Expert review comments | Fields include review conclusion, comment items, submission date, and signature; the version must be synchronized with the author revision notes | Compare the order of the first few candidates before and after enabling `usingReRank`, and check whether the number of comment items and the submission date correspond to the revision notes |
| Author revision notes | Fields include revision items, reply date, and signature; the item names, quantity, and dates must be consistent with the review comments | Test once each with synonymous rephrased questions, record the number of candidate items and the `similarity` score, and check whether the revision items and reply date are missing signatures |
| Retrieval node | Candidate fragments and similarity scores are output after mode, merge, rerank, filter, and upper-limit truncation | Adjust `limit` to observe changes in the number of candidate items, record the reference array length separately, and check whether the tokens of the referenced text retain the key passages |

## Three common errors

- Symptom: the same manuscript title is written differently in the review invitation and the expert review comments, and the quantity and date do not match. Cause: the versions of the two materials are not synchronized, and the retrieval candidates have not undergone name normalization.
- Symptom: the author revision notes lack a signature or receipt, yet the intake record is still generated as if the materials were complete. Cause: missing-item identification was not intercepted before follow-up, and the candidate fragments were directly referenced.
- Symptom: the same question cannot be recalled when phrased differently, and although there are many candidates, the ones ranked at the front are all irrelevant. Cause: the retrieval mode does not match the material form, reranking is not enabled, or the similarity filter is too broad.

## How to verify the setup

Feature acceptance: test once each with synonymous rephrased questions, compare the candidates and `similarity` scores, then toggle `usingReRank` on and off to see the ranking of the first few items; adjust `limit` to record the number of candidate items, record the reference array length separately, and check the tokens of the referenced text.

Business test: ask a question that lacks key information and see whether it follows up before answering; check whether the questions completed after follow-up are consistent with the fields, dates, and signatures of the review invitation, expert review comments, and author revision notes.

- In the knowledge base search test, switch `searchMode` and compare the candidate fragments and `similarity` scores of the semantic, full-text, and hybrid modes, checking the names, quantities, dates, and signatures of the review invitation, expert review comments, and author revision notes.
- Compare the order of the first few candidates before and after enabling `usingReRank`, adjust `limit` to observe changes in the number of candidate items, record the reference array length separately, and check whether the tokens of the referenced text retain the key passages.
