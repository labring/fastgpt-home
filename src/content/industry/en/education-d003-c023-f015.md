---
title: Knowledge Base Retrieval for Student Discipline and Appeals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c023-f015
page_type: 行业问题页
application_area: education
meta_title: Student Appeals | Retrieval | Intake
meta_description: Student Appeals: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Student Discipline and Appeals: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the student disciplinary action and appeal handling category; the source materials are disciplinary fact materials, disciplinary decision documents, and appeal statements. When these three types of materials enter this feature, their roles differ: disciplinary fact materials provide the course of conduct and evidence leads, disciplinary decision documents provide the type of disciplinary action, the provisions relied upon, and the effective date, and appeal statements provide the claims, reasons, and submission time. The update cadence follows the nodes of the disciplinary process: new versions may be produced at each stage of acceptance, notification, decision, appeal, and review. Field characteristics center on names, quantities, dates, and signatures: the names, quantities, and dates of the same record often fail to match across the two materials, versions are not synchronized, and signatures or receipts are missing. After materials enter retrieval, the system performs question optimization, semantic or full-text or hybrid recall, multi-route merging, reranking for secondary sorting, similarity filtering, and citation limit trimming to obtain candidate chunks and similarity scores, for use by subsequent nodes or humans in generating intake records and follow-up questions to be completed.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merging, reranking, filtering, and limit trimming). Intake records and follow-up questions to be completed are then handled by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Disciplinary fact materials | The disciplinary fact materials and the disciplinary decision document must be consistent item by item on the name of the conduct, quantity, and date; any inconsistency should be pursued as a missing item | In the search test, test once each with synonymous questions, record the number of candidates and the scores, and check whether the matched fields cover name, quantity, date, and signature |
| Disciplinary decision document | The disciplinary decision document must state the type of disciplinary action, the provisions relied upon, the effective date, and the signature or receipt; if the signature or receipt is missing, no direct answer may be given | Switch `searchMode` to semantic, full-text, and hybrid once each, compare whether the candidates include both semantic and full-text results, and check whether the cited text retains the effective date and signature fields |
| Appeal statement | The appeal statement must correspond to the disciplinary decision document on the name of the disciplinary action and the date; if versions are not synchronized, no direct answer may be given | Test once each with `usingReRank` enabled and disabled, compare the ranking of the top few items; then check the number of candidates after `similarity` filtering and the tokens of the cited text, and record the number of citations separately |
| Intake records and follow-up questions to be completed | Only after missing items are identified and followed up on, and the answer has a material basis, may it be transferred to the case handler | Ask a question that lacks key information and see whether it follows up first before answering; check whether the follow-up items fall on name, quantity, date, signature, or receipt |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record fail to match between the disciplinary fact materials and the disciplinary decision document. Cause: the two materials have different update cadences, and they enter retrieval without field-level comparison.
- Phenomenon: the appeal statement and the disciplinary decision document are not synchronized in version, and the candidates still return the old provisions. Cause: when the materials were ingested, versions were not marked by process node, and retrieval did not filter by the latest version.
- Phenomenon: the disciplinary decision document lacks a signature or receipt, but the answer still directly gives the disciplinary conclusion. Cause: at the intake stage, signatures and receipts were not listed as conditions for missing-item follow-up.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking to see the ranking of the top few items; after switching `searchMode` and adjusting `similarity` and `limit`, record the number of candidates and the scores, record the number of citations separately by array length, and check the tokens of the cited text separately.

Business test: ask a question that lacks key information and see whether it follows up first before answering.

- In the knowledge base search test, retrieve for disciplinary fact materials, disciplinary decision documents, and appeal statements separately using synonymous questions, record the number of candidates and the scores, and check whether the name, quantity, date, and signature fields are consistent.
- For materials missing a signature or receipt or with unsynchronized versions, first mark them as missing items and trigger follow-up, then transfer them to the case handler.
