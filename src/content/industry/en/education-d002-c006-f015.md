---
title: Knowledge Base Retrieval for Kindergarten Operations and Quality Self-Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c006-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Retrieval | Checks
meta_description: Kindergarten Quality: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Kindergarten Operations and Quality Self-Assessment: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of kindergarten operation behavior and quality self-assessment. Materials come from self-assessment reports, issue lists, rectification plans, and supporting ledgers, updated by semester or rectification cycle, with fields covering object name, quantity, date, signature, and receipt. The self-assessment report carries the overall conclusions and indicator descriptions, the issue list carries item-by-item issues and responsibility attribution, the rectification plan carries measures and deadlines, and the ledger carries original records and receipt vouchers. After materials enter the knowledge base retrieval and recall function, each is indexed as an independent fragment. During retrieval, candidates are recalled through both semantic and full-text paths, then merged and reranked, for subsequent nodes or manual comparison of whether the fields of the same object are consistent across two materials, locating discrepancies in name, quantity, date, signature, and receipt.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or manually; the retrieval results themselves do not generate statistical tables or business documents.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Name, quantity, date, and signature must be consistent with the issue list and rectification plan | In the search test, use the same object name to separately retrieve the self-assessment report and the ledger, compare the name, quantity, and date fields in the candidate fragments, and record the score and number of candidates |
| Issue list | The name, quantity, and date of the same record must match the self-assessment report and rectification plan | Switch `searchMode` to semantic, full-text, and hybrid and test each once, checking whether the date and quantity of the same issue item are consistent across different materials |
| Rectification plan | Measure deadlines, responsible persons, and receipts must be consistent with the issue list and ledger | Turn `usingReRank` on and off to compare the ranking of the top few items, check whether rectification deadlines and receipt fragments are ranked to the front, and record the `similarity` score |
| Signature and receipt | The signatory and receipt status in the two materials must be consistent | Retrieve the signature and receipt fields, check whether the candidate fragments cover both materials at the same time, record the number of references according to `limit`, and separately verify the tokens of the reference text |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the self-assessment report and the issue list. Cause: The two are entered separately without same-source verification, and retrieval only returns candidate fragments, so fields must be compared manually.
- Phenomenon: The rectification plan has been updated, but the issue list is still the old version, and the date and responsible person are not synchronized. Cause: The versions are not synchronized, old fragments are still recalled, and it is necessary to check the material and update time to which the hit fragments belong.
- Phenomenon: Signature or receipt is missing, and the corresponding record cannot be found in either material. Cause: The receipt was not returned or not entered into the database, retrieval can only return existing candidates, and missing items must be confirmed by a reviewer.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then turn reranking on and off to observe the ranking of the top few items.

Business test: use one real record to find fields that are inconsistent with the ledger.

- In the knowledge base search test, switch retrieval modes, compare the candidate fragments and scores of the same object in two materials, and record the discrepancy fields.
- Turn reranking on and off, compare the ranking of the top few items, verify the tokens of the reference text according to the reference limit, and record the number of array items separately.
