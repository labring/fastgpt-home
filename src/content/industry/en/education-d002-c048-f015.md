---
title: Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c048-f015
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Retrieval | Checks
meta_description: Joint Education: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Compare Documents and Locate Differences

## What this category's data looks like

This category covers three types of materials: establishment applications, cooperation agreements, and articles of association. The sources are the filing system and institutional archives, and updates advance with approval milestones and the annual reporting cadence. The establishment application carries the institution name, education level, enrollment scale, and signature fields; the cooperation agreement stipulates the names of the parties, contribution amounts, effective date, and signature pages; the articles of association specify the governance structure, decision dates, and receipt records. When the materials enter knowledge base retrieval, each is recalled as an independent chunk, and fields are presented as text fragments. It is necessary to compare whether the names, quantities, and dates of the same object are consistent across the three materials, and to check whether signatures and receipts are complete. When versions are not synchronized, old-version fragments may still be recalled, and candidate scores must be used to locate discrepancies.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate fragments and similarity scores (after pattern matching, merging, reranking, filtering, and upper-limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Whether the name, quantity, and date are consistent with the cooperation agreement and articles of association, and whether the signature fields are complete | In the search test, switch `searchMode` to semantic, full-text, and hybrid and run retrieval once for each, record the number of candidates and scores, and compare how the same field is expressed in the three materials |
| Cooperation agreement | Whether the names of the parties, contribution amounts, and effective date match the articles of association and application, and whether signature pages and receipts are missing | Compare the ranking of the top few results before and after enabling `usingReRank`, check whether names, quantities, and dates are reranked to the front, and mark inconsistent fields |
| Articles of association | Whether the governance structure, decision dates, and receipt records are version-synchronized with the application and cooperation agreement | Adjust the `similarity` threshold to observe increases and decreases in candidates, check whether the trimmed cited text still retains key fields, and record the number of array entries |
| Annual report | Whether the institution name, enrollment quantity, and submission date in the annual report are consistent with the establishment materials | Retrieve once each using different expressions of the same record, compare candidates and scores, and locate fields that are inconsistent with the ledger |

## Three common errors

- Symptom: the same institution has different name spellings in two materials, but after recall it is still treated as the same object. Cause: no normalized comparison was performed on the name field, and no manual distinction was made when candidate scores were close.
- Symptom: the contribution amount in the cooperation agreement does not match the record in the articles of association, and the discrepancy list misses it. Cause: quantity fields are scattered across different fragments, and no item-by-item check was performed after similarity filtering.
- Symptom: the articles of association version is not synchronized, and old-version fragments are still recalled and enter citations. Cause: the knowledge base was not updated according to reporting milestones, and old fragments still rank at the front after reranking.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare the number of candidates and similarity scores, then toggle reranking on and off to see whether the ranking of the top few results changes, and record the return differences under the three identifiers `searchMode`, `similarity`, and `usingReRank`.

Business testing: use one real record to find fields inconsistent with the ledger, mark the locations where the name, quantity, or date do not match, hand them to the reviewer for confirmation, and write them back.

- For the same record, retrieve once each using the names in the establishment application, cooperation agreement, and articles of association, record the number of candidates and scores, and list the fields where the name, quantity, and date are inconsistent.
- Check whether signature pages and receipts are complete, check whether version dates are synchronized, and hand the discrepancy list to the reviewer for confirmation before writing it back to the ledger.
