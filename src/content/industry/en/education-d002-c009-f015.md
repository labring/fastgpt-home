---
title: Knowledge Base Retrieval for Compulsory Education Dropout Prevention: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c009-f015
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Retrieval | Checks
meta_description: Dropout Prevention: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Compulsory Education Dropout Prevention: Compare Documents and Locate Differences

## What this category's data looks like

In the compulsory education dropout prevention and control scenario, materials mainly consist of dropout risk ledgers, persuasion-to-return records, and home visit records, submitted by schools and townships, updated by semester or monthly. The ledger provides students and risk levels, the persuasion-to-return records provide persuasion times, counts, and receipts, and the home visit records provide visit dates, signatures, and image descriptions. When these three types of materials enter the knowledge base retrieval service, each is recalled as an independent fragment; the ledger is used to locate the object, while persuasion-to-return and home visit records are used to verify field consistency of the same record. Field characteristics are concentrated in names, counts, dates, signatures, and receipts. Differences often occur in name writing, date formats, and count definitions. Version desynchronization and missing signatures are also common, so candidates must first be recalled before discrepancies can be located.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | The name, count, and date of the same object are consistent across two materials | In the search test, use `searchMode` to switch between semantic, full-text, or hybrid, and verify the name, count, and date fields of the same student in the ledger and persuasion-to-return records |
| Persuasion-to-return record | The name, count, and date of the same record do not match across two materials | For the same student, compare the receipt date, persuasion count, and signature in the persuasion-to-return record and home visit record, and record the number of candidate entries and the `similarity` score |
| Home visit record | Version not synchronized, missing signature or receipt | Verify the version date and signature field of the home visit record, compare the top few rankings before and after enabling `usingReRank`, and confirm whether key fragments are recalled |
| Knowledge base retrieval service | Candidate fragments and similarity scores undergo mode, merge, rerank, filter, and limit trimming | Check whether the returned candidates include both semantic and full-text results, record the number of array entries corresponding to `limit`, and separately verify the tokens of the referenced text |

## Three common errors

- Phenomenon: The same student's name is written differently in the ledger and persuasion-to-return record, causing recalled fragments to mismatch. Cause: Inconsistent naming conventions in materials, with no name normalization.
- Phenomenon: The dates or counts in persuasion-to-return records and home visit records do not match, and the discrepancy list omits items. Cause: The two materials' versions are not synchronized, and their update rhythms differ.
- Phenomenon: Home visit records lack signatures or receipts, making verification impossible. Cause: The receipt step is not closed-loop, and material archiving is incomplete.

## How to verify the setup

Acceptance of this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the top few rankings.

Business test: Use one real record to find fields inconsistent with the ledger.

- In the search test, switch `searchMode`, compare semantic and full-text recall results, and record the number of candidate entries and the `similarity` score.
- Compare the order of the top few entries before and after enabling `usingReRank`, verify the number of array entries corresponding to `limit`, and separately record the tokens of the referenced text.
