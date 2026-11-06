---
title: Knowledge Base Retrieval for Vocational Training Subsidy Applications: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c037-f015
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Retrieval | Multilingual
meta_description: Training Subsidies: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational Training Subsidy Applications: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses vocational training subsidy application materials, covering three types of sources: training class filing records, sign-in records, and completion assessment forms. The update cadence rolls with class sessions, and fields include institution name, class session number, personnel name, date, quantity, and signature receipt. In the multilingual materials and terminology handling scenario, class filing records carry the first occurrence of terms and translation-name anchoring, sign-in records carry item-by-item cross-referencing of personnel and dates, and completion assessment forms carry the closure of assessment conclusions and signatures. When the three types of materials enter knowledge base retrieval and recall, each participates as a candidate chunk source in semantic, full-text, or hybrid recall, and then undergoes merging, reranking, filtering, and limit truncation to form cited content, for use in the subsequent generation of the unified terminology table and the comparison draft.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merging, reranking, filtering, and limit truncation). The unified terminology table and comparison draft are completed next by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing records | Institution name, class session number, class start date, signature field, and receipt are consistent throughout the filing, and the first occurrence of a term is accompanied by a back-reference to the source text | In the search test, switch `searchMode` to semantic, full-text, or hybrid, and check whether the candidate chunks cover the filing fields |
| Sign-in records | Personnel name, sign-in date, quantity, and signature correspond item by item, and the name, quantity, and date of the same record do not conflict between the filing and the sign-in | Compare the order of the first few candidates before and after enabling `usingReRank`, and record the number of candidates and the `similarity` score |
| Completion assessment forms | Assessment conclusion, completion date, signature, and receipt are complete, and the translation name can back-reference the source text and is written consistently throughout | Check the number of returned cited items (array length) and the cited text tokens, and confirm that key chunks have not been truncated |
| Unified terminology table and comparison draft | The same term is consistent throughout, the translation name can back-reference the source text, and three terms are sampled to check whether the writing is consistent throughout | Test once each with synonym-rewritten questions, compare candidates and scores, and confirm that all terminology lines are recalled |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the training class filing record and the sign-in record. Cause: The versions of the two materials were not synchronized, and the first occurrence of the term was not back-referenced to the source text.
- Symptom: The completion assessment form lacks a signature or receipt, and the terminology table and comparison draft cannot be closed. Cause: The signature field was not checked when the materials were archived, and the retrieval candidates did not cover the receipt chunk.
- Symptom: The same term cannot be recalled when phrased differently, and although there are many candidates, the ones ranked at the front are all irrelevant. Cause: The retrieval mode does not match the material form, reranking is not enabled, or similarity filtering is too strict.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare the number of candidates and the `similarity` score, then toggle `usingReRank` on and off to observe changes in the ranking of the first few items.

Business testing: sample three terms to check whether the writing is consistent throughout, confirm that the translation name can back-reference the source text, and check and record the number of cited items (array length) and the cited text tokens separately.

- In the knowledge base search test, switch `searchMode` and compare the differences in candidate chunks and scores among the semantic, full-text, and hybrid modes.
- Check the number of returned cited items and the cited text tokens, record the order of the first few items once before and once after enabling `usingReRank`, and check whether key chunks are retained after `limit` truncation.
