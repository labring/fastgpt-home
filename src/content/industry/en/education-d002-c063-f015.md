---
title: Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c063-f015
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Retrieval | Checks
meta_description: Research Misconduct: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Compare Documents and Locate Differences

## What this category's data looks like

The investigation and handling of academic misconduct reports centers on three types of documents: report materials, investigation reports, and expert appraisal opinions. Materials mostly come from stages such as acceptance registration, investigation and evidence collection, and appraisal receipts, and updates are archived in batches as the investigation stages progress. Field characteristics are concentrated in names, quantities, dates, and signature receipts: within the same record, differences in name spelling, inconsistent quantity definitions, and contradictory date sequences often appear between report materials and investigation reports; between expert appraisal opinions and investigation reports, versions are prone to being out of sync, or signatures or receipts are missing. When these three types of materials enter knowledge base retrieval, report materials provide original clues and factual descriptions, investigation reports provide process determinations and handling recommendations, and expert appraisal opinions provide professional judgments and bases. Together, the three constitute the candidate sources for material verification and discrepancy location.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether names, quantities, dates, and signature receipts are consistent within the report materials and between them and the investigation report | In the knowledge base search test, switch `searchMode`, test once each with synonymous questions, record the number of candidates and the `similarity` score, and verify the name, quantity, and date fields in the hit snippets |
| Investigation report | Whether names, quantities, dates, and signature receipts are consistent between the investigation report and the report materials and expert appraisal opinions | Compare the ranking of the top few results before and after enabling `usingReRank`, check whether the candidates include both semantic and full-text results, and verify the version number and signature field |
| Expert appraisal opinions | Whether names, quantities, dates, and signature receipts are consistent between the expert appraisal opinions and the investigation report | Adjust `limit` to observe changes in the number of candidates, verify the tokens and array length of the quoted text, and locate snippets where the version is out of sync or the signature receipt is missing |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the report materials and the investigation report. Cause: The two entry points use different definitions, and no field-level comparison was performed.
- Phenomenon: The versions of the expert appraisal opinions and the investigation report are out of sync, and the quoted content points to an old version. Cause: The version number and effective date were not verified during archiving.
- Phenomenon: Materials lack signatures or receipts, but candidate snippets are still recalled. Cause: Retrieval returns results only by semantic similarity and does not verify the completeness of the signature field.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare the candidates and `similarity` scores, then toggle `usingReRank` on and off to observe the ranking of the top few results.

Business test: use one real record to find fields inconsistent with the ledger, record the number of candidates and scores, and submit them to the reviewer for confirmation and write-back.

- In the knowledge base search test, switch `searchMode`, compare the candidate results of the three modes—semantic, full-text, and hybrid—and record the number of candidates and scores.
- Verify the tokens and array length of the quoted text, record the number of quotes separately, and do not compare `quoteMaxToken` for equality with the array length.
