---
title: Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c026-f015
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Retrieval | Checks
meta_description: Degree Certificates: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on the degree conferral and certificate information reporting scenario, where the material sources are degree application forms, thesis review forms, defense resolutions, and the accompanying ledgers. These materials enter the knowledge base retrieval and recall function by batch: the degree application form carries the applicant identity and degree category fields, the thesis review form carries the review conclusion and review date fields, the defense resolution carries the defense conclusion, voting result, and signature fields, and the ledger serves as the comparison baseline. The update cadence follows the reporting batches; each batch of materials is centrally ingested before review, and the field characteristics are mainly names, quantities, dates, signatures, and receipts. When materials enter the retrieval function, each participates in recall as an independent fragment, for subsequent nodes or humans to compare item by item during discrepancy localization; they do not directly generate statistical tables or authorization results.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate fragments and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The discrepancy list is then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Name, quantity, date, and signature fields must match the ledger item by item | In the knowledge base search test, search the applicant name and degree category, check the field values in the candidate fragments, and record the `similarity` score and the number of candidates |
| Thesis review form | Review conclusion, review date, and reviewer signature must correspond to the ledger | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether the review conclusion and date in the candidate fragments match the ledger |
| Defense resolution | Defense conclusion, voting result, defense date, and signature receipt must be complete | Compare the order of the top few candidates before and after enabling `usingReRank`, and check whether the resolution fields and signature receipt are recalled |
| Ledger | Serves as the comparison baseline, recording name, quantity, date, and signature status | Compare the candidate fragments returned by retrieval against the ledger item by item, and mark fields with inconsistent name, quantity, date, or signature |

## Three common errors

- Symptom: the name or date of the same record does not match between the degree application form and the ledger. Cause: the two material versions are not synchronized, or the field definitions are inconsistent at entry time.
- Symptom: there are differences in the quantity or date fields between the thesis review form and the defense resolution. Cause: materials are ingested in batches, the update cadence is not synchronized, and old-version fragments are still recalled.
- Symptom: the defense resolution is missing the signature or receipt field. Cause: the scanned copy is incomplete or was omitted during upload, and that field is empty in the retrieval candidate fragments.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, and compare the number of candidates and the `similarity` score; then toggle `usingReRank` on and off to observe changes in the ordering of the top few results, and record the candidate differences under `limit` and `searchMode`.

Business test: use one real record to find fields inconsistent with the ledger, mark the name, quantity, date, or signature discrepancies, hand them to the reviewer for confirmation, and write them back.

- In the knowledge base search test, fix `searchMode`, retrieve the same record with the original question and a synonymous question respectively, compare the number of candidates and the `similarity` score, and record the recall differences.
- Retrieve once each with `usingReRank` enabled and disabled, compare the order of the top few candidates, check whether key field fragments are still ranked at the front, and separately record the number of cited items and the cited text tokens.
