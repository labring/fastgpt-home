---
title: Knowledge Base Retrieval for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c027-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Retrieval | Intake
meta_description: Graduate Destinations: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information

## What this category's data looks like

University employment contract signing and graduation destination statistics: the materials are mainly employment agreements, graduation destination registration forms, and employer certificates, along with receipts and signature pages. The sources are departmental submissions and employment center archiving, and the update cadence rolls with graduation-season batches and supplementary reporting nodes. The field characteristics center on employer name, position, signing date, reporting date, and signature and seal positions; the employment agreement carries the tripartite agreement, the graduation destination registration form carries the destination category and archive transfer, and the employer certificate carries the hiring fact and contact information. When the materials enter knowledge base retrieval and recall, each serves as a candidate fragment source for the intake and follow-up steps to locate missing items, and does not directly produce statistical tables or authorization results.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). "Intake records and items to be completed" are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether the employer name, position, signing date, and tripartite signatures are complete and consistent | In the search test, switch `searchMode` and see whether the candidate fragments cover the signature page and date field, and record the number of candidates and the score |
| Graduation destination registration form | Whether the destination category, archive transfer, and reporting date match the agreement | Compare the order of the first few items before and after enabling `usingReRank`, and check whether the name and date of the same record are consistent |
| Employer certificate | Whether the hiring fact, contact, receipt, and seal are missing | Retrieve once each with synonymous rewritten questions, and see whether the key passages are still retained after `similarity` filtering |
| Intake records and items to be completed | Whether missing items are identified and turned into follow-up questions, and whether the answers have material basis | Check whether the candidate fragments correspond to the cited content and the question item, record the array length separately after `limit` trimming, and check the cited text tokens separately |

## Three common errors

- Symptom: the employer name and signing date of the same record do not match between the agreement and the registration form. Cause: the two materials were submitted in batches and were stored without field-level comparison.
- Symptom: an employer certificate missing a signature or receipt is still accepted as complete material. Cause: missing-item identification only checks whether fields exist, without verifying the signature position and receipt page.
- Symptom: the same question cannot be recalled when phrased differently, and the answer lacks key passages. Cause: the retrieval mode does not match the material form, and key fragments are truncated after similarity filtering and citation upper-limit trimming.

## How to verify the setup

This feature's acceptance: test once each with synonymous rewritten questions, compare candidates and scores, then toggle rerank and look at the order of the first few items.

Business test: ask a question missing key information and see whether it first asks a follow-up question before answering.

- In the search test, switch `searchMode`, record the number of candidates and the score, and check whether semantic and full-text results are merged.
- Enable `usingReRank` to compare the order of the first few items, adjust `similarity` and `limit`, then check the cited text tokens, and record the array length separately.
