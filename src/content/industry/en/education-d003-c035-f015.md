---
title: Knowledge Base Retrieval for Enterprise Employee Skills Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c035-f015
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Retrieval | Intake
meta_description: Employee Skills: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Enterprise Employee Skills Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the enterprise self-directed skilled talent evaluation scenario. Materials include the enterprise evaluation filing form, evaluation specifications, and candidate roster. The filing form carries the evaluation subject, occupation name, level, and filing date; the evaluation specifications carry assessment methods, scoring, and signature requirements; the roster carries candidate names, identity information, and batch quantities. When these three types of materials enter Q&A intake and missing-item follow-up, their roles differ: the filing form is used to confirm the evaluation matter and subject qualification, the evaluation specifications are used to verify the process and approval requirements, and the roster is used to verify personnel counts and batch dates. Materials are submitted and updated by batch, and common fields include name, quantity, date, signature, and receipt. The update cadence advances with filing changes, specification revisions, and roster supplements. Q&A intake must first identify missing items before asking follow-up questions, and retrieval recall provides the material basis for the follow-up questions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). Intake records and completed question items are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | Whether the name, quantity, date, and signature are consistent with the evaluation specifications and roster | In the search test, use the same question to switch `searchMode`, check the candidate snippets and scores, and then compare against the filing form fields |
| Evaluation specifications | Whether the version is synchronized and whether signatures and receipts are complete | Turn `usingReRank` on and off to compare the ranking of the top few results, and verify the specification version and approval records |
| Candidate roster | Whether the name, quantity, and date of the same record do not match across the two materials | Adjust `similarity` to observe the number of candidate items and scores, and then verify the quantity and date against the roster and filing form |
| Intake records and completed question items | Whether missing items are identified and followed up, and whether answers have a material basis | Test with a question missing key information to see whether it asks a follow-up before answering, and record the number of candidate items and scores |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the filing form and the roster. Cause: The materials are updated separately, and cross-checking and field alignment have not been done.
- Phenomenon: The evaluation specification version is not synchronized, and the old version's signature requirements are still referenced. Cause: After the version update, the knowledge base source was not replaced, and retrieval still recalls old snippets.
- Phenomenon: The filing form or receipt lacks a signature, but the Q&A answers as if it has been accepted. Cause: Missing items were not identified, and retrieval did not recall the signature and receipt fields.

## How to verify the setup

Acceptance for this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to see the ranking of the top few results; record the number of candidate items and scores. `limit` is only used for upper-limit trimming, and the number of cited items is recorded separately by array length.

Business test: Ask a question missing key information to see whether it asks a follow-up before answering.

- In the knowledge base search test, switch `searchMode` to compare the candidate snippets and scores of the semantic, full-text, and hybrid modes.
- Turn `usingReRank` on and off to compare changes in the ranking of the top few results, and adjust `similarity` to observe the number of candidate items and scores after filtering.
