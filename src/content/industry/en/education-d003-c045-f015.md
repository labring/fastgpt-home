---
title: Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c045-f015
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Retrieval | Intake
meta_description: Training Compliance: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information

## What this category's data looks like

Off-campus training compliance filing and penalty response materials commonly include three categories: school operation licenses, course filing materials, and fee disclosure, as well as intake registration, correction notices, receipts, and signature pages. Sources are mostly scanned copies, spreadsheets, and historical archives submitted by institutions, with update cadence changing along with filing batches, course adjustments, and penalty rectification milestones. Field characteristics center on names, quantities, dates, and signatures: the same record's name, quantity, and date do not match across two materials, versions are not synchronized, and signatures or receipts are missing. When entering this feature, the school operation license provides subject and validity period clues, the course filing materials provide course names and class hour quantities, and the fee disclosure provides fee items and disclosure dates; together the three constitute the source of candidate snippets for subsequent nodes or humans to generate intake records and items to be completed.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, re-rank, filter, and limit trimming). Intake records and items to be completed are then handled by subsequent nodes or humans; retrieval itself does not generate statistical tables, business documents, or authorization results.

| Object | Check | Verification action |
| --- | --- | --- |
| School operation license | Whether the subject name, validity period, and signature page are consistent with the intake registration | In the search test, test once each with synonymous questions, record the number of candidates and scores, and check the name, date, and signature fields |
| Course filing materials | Whether the course name, class hour quantity, and version date match the fee disclosure | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether the candidates simultaneously contain snippets of both material types |
| Fee disclosure | Whether the fee items, disclosure date, and receipt are missing | Turn `usingReRank` on and off, compare the ranking of the top few results, and check whether key snippets are retained after `similarity` and `limit` trimming |
| Intake registration and correction notice | Whether missing items in the question are identified and followed up on | Test with a question missing key information, see whether it follows up before answering, and record the tokens and array length of the cited text |

## Three common errors

- Symptom: the same record's name, quantity, and date do not match across two materials. Cause: multiple materials are entered separately, lacking unified field verification and version synchronization.
- Symptom: the version of the course filing materials is not synchronized, and the old version's class hour quantity is still recalled. Cause: the update cadence is out of step with the filing batches, and retrieval is not filtered by date.
- Symptom: the fee disclosure lacks a signature or receipt, and the answer lacks key passages. Cause: materials enter the knowledge base before being completed, and candidate snippets are incomplete.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle re-ranking to see the ranking of the top few results; check the impact of `searchMode`, `usingReRank`, `similarity`, and `limit` on the number of candidates and scores, record the number of citations separately by array length, and check the tokens of the cited text separately.

Business test: ask a question missing key information, see whether it follows up before answering; confirm that missing items are identified and followed up on, that the answer has material basis, and then forward it to the handler.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores across semantic, full-text, and hybrid modes, and check the name, quantity, date, and signature fields.
- Turn `usingReRank` on and off, compare the ranking of the top few results; check the tokens and array length of the cited text after `similarity` and `limit` trimming, and confirm that key snippets have not been trimmed out.
