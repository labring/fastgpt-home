---
title: Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c061-f015
page_type: 行业问题页
application_area: education
meta_title: Research IP | Retrieval | Checks
meta_description: Research IP: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Compare Documents and Locate Differences

## What this category's data looks like

Common materials for research achievement registration and intellectual property management include achievement registration forms, patent disclosure documents, and software copyright materials. Their sources are research system exports, agency returns, and inventor submissions, and their update cadence changes on a rolling basis with applications, corrections, registration, and archiving. Field characteristics are concentrated in names, quantities, dates, and signature fields. Achievement registration forms serve as the ledger baseline, while patent disclosure documents and software copyright materials serve as supporting evidence. When they enter knowledge base retrieval, they are split into candidate chunks for subsequent verification of whether names, quantities, and dates are consistent, and for locating discrepancies such as unsynchronized versions, missing signatures, or missing receipts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate chunks and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The "discrepancy list" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Names, quantities, dates, and signature fields must be consistent with the ledger baseline | In the search test, switch `searchMode`, use synonymous questions to retrieve name and date fields, and record the number of candidates and scores |
| Patent disclosure document | Names, quantities, dates, and signature fields must be aligned item by item with the achievement registration form | Compare the ranking of the top few results before and after enabling `usingReRank`, and check whether the candidate chunks cover quantities and dates |
| Software copyright materials | Names, version dates, and signature receipts must correspond to the registration form | Adjust `similarity` to observe candidate changes, separately record the number of items in the citation array, and check whether the tokens of the cited text are complete |
| Discrepancy list | The names, quantities, and dates of the same object do not match across the two materials | Locate the discrepant fields by candidate chunk, hand them to the reviewer for confirmation, and write them back |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the achievement registration form and the patent disclosure document. Cause: The two materials are maintained separately, versions are not synchronized, and retrieval hits chunks from only one side.
- Symptom: The software copyright materials lack a signature or receipt, but retrieval candidates still show as relevant. Cause: The signature field is not split into checkable chunks, and candidates cover only the body text.
- Symptom: There are many candidates, but none of the top-ranked ones are relevant. Cause: The retrieval mode does not match the material form, and after multi-route merging, no rerank secondary sorting is performed.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ranking of the top few results.

Business test: use one real record to find fields that are inconsistent with the ledger.

- In the search test, switch the retrieval mode, record the number of candidates and scores, and separately record the number of items in the citation array.
- Compare the order of the top few results before and after enabling rerank, and check whether the tokens of the cited text retain key chunks.
