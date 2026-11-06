---
title: Knowledge Base Retrieval for Compulsory Education Dropout Prevention: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c009-f015
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Retrieval | Intake
meta_description: Dropout Prevention: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Compulsory Education Dropout Prevention: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the compulsory education dropout prevention and control category. The source materials are three types: dropout risk ledgers, return-to-school persuasion records, and home visit records, with an update cadence that rolls with the school term and the persuasion cycle. Field characteristics include student name, student status number, risk level, persuasion date, home visit date, signature, and receipt. When the materials enter the knowledge base retrieval and recall function, the dropout risk ledger plays the role of the base register for risk identification and responsibility attribution; the persuasion records play the role of process traceability and result confirmation; the home visit records play the role of supporting evidence for household verification and parent signatures. Together, the three types of materials support question intake and missing-item follow-up: the retrieval service recalls candidate snippets from the materials, and the intake step uses them to determine whether the question lacks key information, then decides whether to ask a follow-up question or transfer to the case handler.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). Intake records and the completed follow-up items are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Fields include student name, student status number, risk level, persuasion date, and signature; dates and signatures must be consistent with the persuasion records | In the search test, switch `searchMode` to semantic, full-text, or hybrid, and compare the number of candidates and scores; check whether the names, quantities, and dates in the ledger and the persuasion records match |
| Persuasion records | Fields include persuasion date, persuasion result, case handler signature, and receipt; the version must be synchronized with the home visit records | Test once each with synonym-rewritten questions and see whether the candidates contain the key passages of the persuasion records; turn `usingReRank` on or off and compare the ranking of the top few results |
| Home visit records | Fields include home visit date, parent signature, receipt, and missing-item description; when the signature or receipt is missing, a follow-up question must be asked at the intake step | Check whether the dates, signatures, and receipts in the home visit records and the ledger are consistent; check whether the quoted text after `similarity` filtering retains the key snippets, and separately record the array length |

## Three common errors

- Phenomenon: the names, quantities, and dates of the same record do not match between the ledger and the persuasion records. Cause: the two materials are entered separately without field-level verification, and inconsistent snippets are returned together during retrieval recall.
- Phenomenon: the version of the home visit records is not synchronized, and old-version signatures and receipts are recalled. Cause: after the materials are updated, they do not re-enter the retrieval process, and the candidates still point to old-version snippets.
- Phenomenon: the answer lacks key passages, and missing items are not identified. Cause: after similarity filtering and quoted upper-limit trimming, only some candidates are retained, and the intake step answers without first asking a follow-up question.

## How to verify the setup

Acceptance for this function: test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to see the ranking of the top few results; switch `searchMode` to observe the source of candidates, check the impact of `similarity` and `usingReRank` on the results, and record the number of quotes separately by array length, without writing the three states of the index.

Business test: ask a question that lacks key information and see whether a follow-up question is asked before answering; if no follow-up question is asked, check whether the intake records and the completed follow-up items are missing, then transfer to the case handler.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores across the semantic, full-text, and hybrid modes, and confirm that the material form matches the mode.
- Check the fields, dates, and signatures of the dropout risk ledger, persuasion records, and home visit records. When names, quantities, or dates do not match or versions are not synchronized, ask a follow-up question first, then transfer to the case handler.
