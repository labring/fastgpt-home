---
title: Knowledge Base Retrieval for Compulsory Education Dropout Prevention: Find Supporting Evidence
slug: /en/industry/education-d001-c009-f015
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Retrieval | Evidence
meta_description: Dropout Prevention: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Compulsory Education Dropout Prevention: Find Supporting Evidence

## What this category's data looks like

Compulsory education dropout prevention and control involves three types of core materials: dropout risk ledgers, return-to-school persuasion records, and home visit records. Ledger fields include student name, risk level, determination date, and responsible person's signature; return-to-school persuasion records include persuasion time, method, result, and parent receipt; home visit records include home visit date, teacher signature, parent signature, and photo description. Materials are updated by semester and revised synchronously after transfer in or transfer out. The three types of materials play different roles when entering knowledge base retrieval: the ledger provides the risk list and assignment of responsibility, return-to-school persuasion records provide process evidence and result receipts, and home visit records provide household-entry corroboration and the signature chain. The retrieval service recalls by chunks and does not directly generate statistical tables or business documents.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). Evidence items that can be traced back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Fields include student name, risk level, determination date, and responsible person's signature; the name, quantity, and date of the same record in two materials must be consistent | Switch `searchMode` in the search test and compare semantic and full-text candidates; check the `similarity` score and number of returned items to see whether the ledger chunk contains signatures and dates |
| Return-to-school persuasion record | Fields include persuasion time, method, result, and parent receipt; the version must be current and the receipt complete | Check the ranking of the first few items before and after the `usingReRank` switch; check whether the quoted text after `limit` trimming retains the key sentences of the persuasion result and receipt |
| Home visit record | Fields include home visit date, teacher signature, parent signature, and photo description; if a signature or receipt is missing, the evidence condition is not met | Test once each with synonymous questions to see whether candidates contain both semantic and full-text results; record the number of quoted items separately, and do not check whether `quoteMaxToken` equals the number of items |

## Three common errors

- Phenomenon: the dates of the same return-to-school persuasion record do not match between the ledger and the home visit record. Cause: after materials were revised, they were not updated synchronously, and retrieval hit old chunks.
- Phenomenon: the home visit record lacks a parent signature or receipt. Cause: scanned pages were missing or the signature field was not checked during entry, and the candidate was still recalled.
- Phenomenon: there are many candidates, but the ones ranked first are all irrelevant. Cause: the retrieval mode does not match the material form, rerank was not enabled, or the filter threshold is too loose.

## How to verify the setup

Acceptance of this function: test once each with synonymously rewritten questions, compare candidates and `similarity` scores, then switch `usingReRank` on and off to see the ranking of the first few items.

Business test: ask a cross-material evidence question and see whether the answer gives a traceable source.

- In the search test, switch `searchMode` to semantic, full-text, and hybrid, compare the number of candidates and scores, and record the quoted text after `limit` trimming.
- Check whether the dates, quantities, signatures, and receipts of the ledger, return-to-school persuasion records, and home visit records are consistent, and whether the version is current.
