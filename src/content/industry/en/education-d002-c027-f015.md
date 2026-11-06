---
title: Knowledge Base Retrieval for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c027-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Retrieval | Checks
meta_description: Graduate Destinations: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of university employment signing and graduation destination statistics. Materials include three categories: employment agreements, graduation destination registration forms, and employer certificates. Employment agreements carry the signing entity, position, and seal information; graduation destination registration forms carry the destination category, employer name, and date fields; employer certificates carry the acceptance intention and receipt signature. The three categories of materials are often maintained separately by departments, career centers, and employers, with update cadence advancing along with signing batches and receipt collection, resulting in situations such as unsynchronized versions, inconsistent field definitions, and missing signatures or receipts. When materials enter the knowledge base retrieval service, each serves as a candidate chunk source participating in recall, contributing signing terms, destination fields, and employer confirmation information respectively, for subsequent nodes or manual comparison of whether names, quantities, and dates are consistent, and based on this a discrepancy list is formed.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The "discrepancy list" is then completed by subsequent nodes or manually. Retrieval is only responsible for handing over the candidate chunks and scores of the three categories of materials; it does not directly produce statistical tables or authorization results.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether the name, quantity, date, and signature are consistent with the ledger | In the search test, switch `searchMode`, use semantic and full-text recall separately for the same record, and check the employer name, signing date, and seal description in the candidate chunks |
| Graduation destination registration form | Whether the destination category, employer name, and date correspond to the employment agreement | Compare the order of the top few candidates before and after enabling `usingReRank`, and check whether the registration form chunk is ranked in a position related to the same record as the employment agreement |
| Employer certificate | Whether the employer name, acceptance date, and receipt signature are complete | Adjust `similarity` to observe whether low-scoring candidates are filtered out, and confirm whether the receipt and signature descriptions in the certificate chunk are retained |
| Retrieval return results | Whether the number of candidates and scores cover the three categories of materials | Record the number of candidates and their respective scores, and in combination with `limit`, observe whether key chunks are still retained after limit trimming |

## Three common errors

- Phenomenon: The employer name, quantity, or date of the same record does not match across two materials. Cause: The materials are filled in separately at different stages, field definitions are not unified, and retrieval candidates do not cover all materials.
- Phenomenon: The versions of the employment agreement and the graduation destination registration form are not synchronized, and old-version fields are still recalled. Cause: The update cadence is inconsistent, old chunks are not cleaned up, and both old and new candidates enter the results during recall.
- Phenomenon: The employer certificate lacks a signature or receipt, yet the candidate chunk is still cited. Cause: The certificate material itself is incomplete, similarity filtering does not differentiate the signature field, and manual review is required for confirmation.

## How to verify the setup

Feature acceptance: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the top few results; at the same time switch `searchMode` and adjust `similarity` and `usingReRank`, recording changes in the number of candidates and scores.

Business testing: Use one real record to find fields inconsistent with the ledger, and check the names, quantities, dates, and signature receipts in the employment agreement, graduation destination registration form, and employer certificate.

- In the knowledge base search test, use semantic, full-text, and hybrid modes to recall the same record separately, record the number of candidates and scores, and mark the hit status of chunks from the three categories of materials.
- Run once each with rerank enabled and disabled, compare the order of the top few candidates; adjust the similarity threshold and citation limit, confirm that key chunks are not trimmed out, then hand over to the reviewer for confirmation and write back the discrepancy list.
