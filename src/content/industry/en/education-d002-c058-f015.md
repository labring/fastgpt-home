---
title: Knowledge Base Retrieval for Research Project Task Agreement Signing: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c058-f015
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Retrieval | Checks
meta_description: Research Agreements: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Task Agreement Signing: Compare Documents and Locate Differences

## What this category's data looks like

This category's data involves three types of materials in the scenario of signing research project task books: the project task book, the subject task breakdown table, and the budget book. The project task book is prepared by the lead unit during the project initiation stage, the subject task breakdown table is submitted by each subject leader during the decomposition stage, and the budget book is submitted together with the task book. The three types of materials are usually updated according to project milestones, and multiple rounds of verification are required before signing. Field characteristics center on names, quantities, dates, and signatures: the project task book contains the project name, subject name, start and end dates, and the signature of the undertaking unit; the subject task breakdown table contains the subject name, task volume, participating personnel, and the signature of the person in charge; the budget book contains the account name, amount quantity, preparation date, and financial signature. When the materials enter the knowledge base retrieval service, each is recalled as an independent document, and candidate snippets are sorted by similarity score for subsequent verification.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, re-rank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Project name, subject name, start and end dates, and undertaking unit signature are compared item by item with the subject task breakdown table and budget book | In the search test, switch `searchMode`, use the project name to recall candidate snippets, and record the number of candidates and scores |
| Subject task breakdown table | Subject name, task volume, participating personnel, and person-in-charge signature are compared item by item with the project task book and budget book | Compare the ranking of the top few items before and after enabling `usingReRank`, and check whether the name and quantity fields are consistent |
| Budget book | Account name, amount quantity, preparation date, and financial signature are compared item by item with the project task book and subject task breakdown table | Adjust `similarity` to observe changes in candidates, record the number of citations and cited text tokens, and separately record the array length |
| Retrieval return | Candidate snippets and similarity scores are output after mode, merge, re-rank, filter, and limit trimming | Check whether the cited text after `limit` trimming retains key snippets of names, quantities, and dates |

## Three common errors

- Symptom: The same subject has different name spellings in the task book and the breakdown table, and recalled candidates do not match. Cause: Material versions are not synchronized, and old-version fields are still indexed.
- Symptom: The budget book amount quantity is inconsistent with the task book, and candidate snippets contradict each other. Cause: The two materials have different preparation dates, and their update rhythms are not aligned.
- Symptom: The signature field is missing or the receipt is not attached, yet retrieval still returns candidate snippets. Cause: The scanned materials are not complete, and the index does not reflect signature status.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking on and off to inspect the ranking of the top few items.

Business test: use one real record to find fields inconsistent with the ledger.

- In the search test, switch `searchMode` and compare the number of candidates and scores across semantic, full-text, and hybrid modes.
- Compare the ranking of the top few items before and after enabling `usingReRank`, and adjust `similarity` to observe changes in candidates.
