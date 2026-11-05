---
title: Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c017-f015
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Retrieval | Checks
meta_description: Undergraduate Programs: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Compare Documents and Locate Differences

## What this category's data looks like

This category's data covers three types of materials: program setup application forms, talent cultivation plans, and expert argumentation opinions. The application form provides the proposed program name, code, length of study, degree-granting category, and application date; the cultivation plan gives the course structure, credit counts, practical components, and length of study; the expert argumentation opinions record the argumentation date, expert list, vote count, and signed receipt. The three types of materials are updated according to the annual application and dynamic adjustment cycle, and fields share name, quantity, date, and signature as common verification points. When entering knowledge base retrieval, the application form and cultivation plan serve as the main sources for semantic and full-text recall, while the argumentation opinions serve as a supplementary source for signatures and receipts; each participates in recall as candidate chunks and does not directly produce a discrepancy list.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether the name, code, length of study, and application date are consistent with the cultivation plan | In the search test, search separately by program name and code, switch `searchMode` to compare candidates, and record `similarity` and the number of candidate items |
| Talent cultivation plan | Whether the course count, credit count, and length of study match the application form | Search using a combination of course name and credit count, compare the top few rankings before and after enabling `usingReRank`, and verify the quantity fields in the returned chunks |
| Expert argumentation opinions | Whether the argumentation date, expert count, signatures, and receipts are complete | Search by argumentation date and expert name, check whether the candidate chunks contain signature and receipt paragraphs, and separately record the number of candidate items and scores |
| Discrepancy list | Whether the name, quantity, and date of the same record are consistent across the two materials | Compare the candidate chunks field by field, mark inconsistent fields, and submit them to the reviewer for confirmation |

## Three common errors

- Phenomenon: The same program name is written differently in the application form and the cultivation plan, and retrieval candidates are split evenly. Cause: The name is not unified, and semantic recall and full-text recall hit different chunks respectively.
- Phenomenon: The course count or credit count does not match between the two materials, and the candidate chunks return only one of them. Cause: The versions are not synchronized, and the old material still participates in recall in the knowledge base.
- Phenomenon: The expert argumentation opinions lack signatures or receipts, but the candidate chunks are still recalled. Cause: Similarity filtering only compares textual relevance and does not verify the signature and receipt fields.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the top few rankings; switch `searchMode` and verify the impact of `similarity`, `limit`, and `usingReRank` on the number of candidate items.

Business test: use one real record to find fields inconsistent with the ledger, compare the name, quantity, and date in the candidate chunks item by item against the ledger, and record the discrepant fields.

- In the search test, search separately by program name, code, and date, record the number of candidate items and `similarity`, and compare the recall differences between the semantic and full-text `searchMode` options.
- Compare the top few rankings before and after enabling `usingReRank`, verify the tokens and array length of the returned reference text, write inconsistent fields into the discrepancy list, and submit them to the reviewer for write-back.
