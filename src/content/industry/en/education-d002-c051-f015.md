---
title: Knowledge Base Retrieval for College Entrance Exam Application Eligibility: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c051-f015
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Retrieval | Checks
meta_description: Entrance Exam Eligibility: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for College Entrance Exam Application Eligibility: Compare Documents and Locate Differences

## What this category's data looks like

In the general college entrance examination registration qualification review scenario, materials are divided into three categories: the college entrance examination registration form, household registration and student status certificates, and materials for children accompanying migrating parents. The college entrance examination registration form is filled in by the candidate, initially reviewed by the school, and then exported; it contains name, candidate number, household registration address, student status number, and a signature field. Household registration and student status certificates are issued by the public security and student status systems, and contain name, ID number, household registration change date, and school seal. Materials for children accompanying migrating parents are provided by parents and the social insurance and residence permit departments, and contain residence permit number, number of months of social insurance contributions, validity period, and receipt. The three types of materials are updated in batches according to registration batches and review nodes, and field forms are mainly tables, scanned certificates, and receipts. When entering the knowledge base retrieval service, the three are respectively used as recallable fragment sources for subsequent nodes or manual comparison of whether the name, quantity, date, and signature of the same object in two materials are consistent.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper limit trimming). The discrepancy list is completed by subsequent nodes or manually; the retrieval step does not produce statistical tables or authorization results.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Name, candidate number, household registration address, student status number, and signature field must correspond item by item with the household registration and student status certificates | In the search test, construct a query using the candidate number and name, switch `searchMode` to semantic, full-text, and hybrid for one retrieval each, and record the number of candidates and scores |
| Household registration and student status certificates | The household registration change date, school seal date, and registration form filling date must fall within the same review batch | Compare the order of the top few candidates before and after enabling `usingReRank`, and check whether the date fields are still ranked at the front |
| Materials for children accompanying migrating parents | The residence permit number, number of months of social insurance contributions, and validity period must be consistent with the accompanying migration column in the registration form, and the receipt must not be missing | Search using the residence permit number, observe whether candidates simultaneously contain semantic and full-text results, separately record the number of array items, and check whether the cited text tokens retain key fragments |
| Retrieval parameters | After similarity filtering and citation upper limit trimming, key fragments of the original text are still retained | Adjust `similarity` and `limit`, check the candidate score distribution and changes in the number of citations, and confirm that trimming has not lost signature and receipt fields |

## Three common errors

- Phenomenon: The same candidate appears near the front of the results despite conflicting names or candidate numbers in the two materials. Cause: Question optimization did not eliminate references, semantic recall mixed in fragments with similar names, and hit and association need to be checked.
- Phenomenon: The dates of the registration form and the household registration and student status certificates belong to different batches, but the discrepancy list still shows consistency. Cause: Versions were not synchronized, old batch fragments were hit by full-text recall, and after merging they were not filtered by date.
- Phenomenon: The materials for children accompanying migrating parents lack a signature or receipt, but the retrieval results still give a complete citation. Cause: Citation upper limit trimming retains fragments by tokens, whether the receipt field exists was not checked, and the number of array items was mistakenly taken as completeness.

## How to verify the setup

Feature acceptance: Test once each with synonym-rewritten queries, compare candidate fragments and similarity scores, then toggle rerank on and off to observe the ranking of the top few; at the same time switch `searchMode` and check whether candidates simultaneously contain semantic and full-text results.

Business test: Use one real record to find fields inconsistent with the ledger, record the number of candidates and scores, submit to the reviewer for confirmation, and write back.

- In the search test, retrieve the same candidate record using name, candidate number, and residence permit number respectively, record the number of candidates and scores, and mark fields inconsistent with the ledger.
- Compare the order of the top few candidates before and after enabling rerank, and check whether the cited text tokens still contain key fragments such as signature, receipt, and date after similarity filtering and citation upper limit trimming.
