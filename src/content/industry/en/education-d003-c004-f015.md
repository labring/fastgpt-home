---
title: Knowledge Base Retrieval for Kindergarten and Family Communication: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c004-f015
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Retrieval | Intake
meta_description: Family Communication: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten and Family Communication: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the kindergarten home-school co-education communication scenario; the materials come from class notices, parent request records, observations of children's performance in kindergarten, committed items, and response-time ledgers. When these materials enter the knowledge base retrieval service, they play different roles: notices and commitment ledgers provide verifiable response deadlines and delivery scope, observation records provide the basis for descriptions of children's performance, and parent request texts are used for classification and merging. The update cadence is per daily communication batch, and newly added records must remain traceable with existing observation and commitment entries. Field characteristics include descriptions of children's performance, parent request classification, committed items and response times, notice delivery status, and missing question items in intake records. During retrieval, these materials are recalled as candidate chunks, to be organized by subsequent nodes or manually into intake records and supplemented question items.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, re-rank, filter, and limit trimming). Intake records and supplemented question items are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Parent request text | Whether the request classification corresponds to committed items and response times, and whether missing items are marked | In the search test, switch `searchMode` and compare semantic and full-text candidates; record the number of candidates and the `similarity` score |
| Observation records of children's performance in kindergarten | Whether the wording is consistent with the observation records, and whether unresponded commitments are traceable | Test once each with synonymous questions and check whether the returned chunks retain key passages; compare the order of the first few items before and after enabling re-rank |
| Notice delivery and commitment ledger | Whether notice delivery status and commitment response times are verifiable, and whether feedback is classified | Check whether candidates contain both semantic and full-text results; record the number of entries in the reference array separately, and also check the reference text tokens and the `limit` budget |
| Intake records and supplemented question items | Whether missing items are identified and followed up on, and whether answers are grounded in materials | Ask a question that lacks key information and see whether it follows up before answering; confirm that candidates and scores come from this feature's output |

## Three common errors

- Symptom: no response record is seen for a committed item. Cause: the commitment ledger and response times did not enter the candidates, and retrieval did not cover that material.
- Symptom: the description of children's performance does not match the observation records. Cause: the observation records were not recalled, or key chunks were pushed out of the top ranks after re-ranking.
- Symptom: parent feedback is not classified. Cause: the request classification field is missing, candidate chunks do not carry classification evidence, and follow-up was not triggered.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle re-rank on and off to see the ordering of the first few items; switch `searchMode` to check `similarity`, and confirm the order changes before and after `usingReRank`.

Business test: ask a question that lacks key information and see whether it follows up before answering.

- In the knowledge base search test, switch `searchMode`, record the number of candidates and the `similarity` score, and compare semantic and full-text results.
- Enable and disable `usingReRank` and compare the ordering of the first few items; record the number of entries in the reference array separately, and also check the reference text tokens and the `limit` budget.
