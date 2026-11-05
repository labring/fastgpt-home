---
title: Knowledge Base Retrieval for College Admissions Health Examination Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c053-f015
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Retrieval | Checks
meta_description: Admissions Health Exams: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for College Admissions Health Examination Organization: Compare Documents and Locate Differences

## What this category's data looks like

This category's data mainly involves three types of materials in material verification and discrepancy localization for university admissions physical examination organization: physical examination forms, re-examination applications, and restricted-major notifications. Physical examination forms come from physical examination institutions, re-examination applications are submitted by candidates or secondary schools, and restricted-major notifications are issued by admissions departments. The update rhythm advances with admissions batches, and re-examinations and notifications circulate intensively before admission. Field characteristics include candidate name, physical examination conclusion, restricted major name, quantity, date, and signature. When the three types of materials enter the knowledge base retrieval and recall function, the physical examination form serves as the main record providing baseline fields, the re-examination application serves as the basis for change supplementing new conclusions, and the restricted-major notification serves as the notification voucher for verifying the major and receipt. Material forms include tables, scanned copies, and text paragraphs, and need to be split by field to build an index for subsequent retrieval and comparison.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Whether the name, quantity, date, and signature are consistent with the ledger | In the search test, retrieve the candidate name, check the fields and dates of the returned candidates, and record the number of candidates and scores |
| Re-examination application | Whether the re-examination conclusion, date, and signature correspond to the physical examination form | Switch `searchMode` to hybrid retrieval, compare semantic and full-text candidates, and check the re-examination conclusion and signature receipt |
| Restricted-major notification | Whether the restricted major name, quantity, date, and receipt are complete | Use synonymous questions to retrieve the restricted major, compare the order of the first few items before and after enabling rerank, and confirm the notification fields |
| Ledger record | Whether the name, quantity, and date of the same record match across the two materials | Using the ledger as the baseline, compare candidate snippets field by field, mark inconsistent fields, and record `similarity` and `limit` |

## Three common errors

- Phenomenon: The same candidate's name is written differently in the physical examination form and the re-examination application, causing recall candidates to be scattered. Cause: The two materials were not entered with a unified name, and coreference resolution was not performed during retrieval.
- Phenomenon: The version of the restricted-major notification was not synchronized, and the old major name is still recalled. Cause: After the material was updated, the index was not rebuilt, and retrieval still hit the old snippet.
- Phenomenon: The re-examination application lacks a signature or receipt, and the candidate snippet cannot confirm that it is effective. Cause: The signature was not completed during the material circulation step, and retrieval only returns the text content.

## How to verify the setup

Acceptance of this function: test once each with synonymously rewritten questions, compare candidates and similarity scores, then toggle rerank on and off to observe the ordering of the first few items, and record the number of candidates and scores.

Business test: use one real record to find fields inconsistent with the ledger, check the name, quantity, date, and signature, submit to the reviewer for confirmation, and write back.

- In the knowledge base search test, switch `searchMode`, and use semantic, full-text, and hybrid retrieval for the same candidate respectively, comparing candidate snippets and scores.
- After enabling rerank, compare the order of the first few items, check the impact of `usingReRank` on relevance, and separately record the number of items in the reference array and the tokens of the reference text.
