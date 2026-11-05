---
title: Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c045-f015
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Retrieval | Checks
meta_description: Training Compliance: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Compare Documents and Locate Differences

## What this category's data looks like

In the off-campus training compliance filing and penalty response scenario, materials mainly come from three categories: school operation licenses, course filing materials, and fee disclosure. A school operation license contains the institution name, address, validity period, signature, and issuance date; course filing materials contain the course name, number of class hours, filing date, and responsible person's signature; fee disclosure contains fee items, amount ranges, disclosure date, and receipt. These materials are updated by semester or regulatory milestone, and versions change frequently. The names, quantities, and dates of the same record in different materials often fail to match due to different entry conventions, and signatures and receipts are also prone to being missing. When materials enter the knowledge base retrieval and recall function, each is recalled as an independent fragment, used to compare field differences for the same object across different materials, and to provide candidate evidence for the discrepancy list.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| School operation license | Institution name, address, validity period, and issuance date must be consistent with the course filing materials | In the search test, search by institution name, switch `searchMode` to hybrid, check the number of candidates and scores, and compare date fields |
| Course filing materials | Course name, number of class hours, and filing date must be consistent with the fee disclosure | Search by course name, compare the ranking of the top few results before and after enabling `usingReRank`, and check quantity and date fields |
| Fee disclosure | Fee items, disclosure date, and receipt signature must correspond to the school operation license | Search by fee item, observe candidates after `similarity` filtering, and check whether signatures and receipts are missing |

## Three common errors

- Phenomenon: The name or date of the same institution does not match between the license and the course filing materials. Cause: different entry conventions, versions not synchronized, and retrieval candidates not covering the latest version.
- Phenomenon: The number of class hours in the fee disclosure is inconsistent with the course filing materials. Cause: materials are updated in batches, and old-version fragments are still recalled and ranked at the top.
- Phenomenon: The fee disclosure lacks a signature or receipt, and the corresponding field cannot be found in the candidate fragments. Cause: the scanned copy is incomplete or was omitted during upload, and the recall results contain only part of the content.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few results; switch `searchMode` and `usingReRank`, record the number of candidates and scores, and observe changes in the number of results after `similarity` filtering.

Business test: use one real record to find fields inconsistent with the ledger, verify the name, quantity, and date of that record in the school operation license, course filing materials, and fee disclosure, and after confirming the discrepancy, hand it over to the reviewer.

- In the search test, search for the same record using different question formulations, compare the number of candidates and scores, and mark fragments with inconsistent names or dates.
- Run once with rerank enabled and once disabled, check whether the ranking of the top few results changes, and confirm whether fragments with key fields are trimmed by `limit`.
