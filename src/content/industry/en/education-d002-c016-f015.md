---
title: Knowledge Base Retrieval for School Safety Inspections and Incident Reporting: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c016-f015
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Retrieval | Checks
meta_description: Campus Safety: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Safety Inspections and Incident Reporting: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on school safety hazard inspections and campus incident reporting. Materials include safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are created by inspection batch, recording inspection items, locations, dates, and inspector signatures; hazard rectification ledgers are updated on a rolling basis by hazard ID, recording names, quantities, rectification deadlines, responsible persons, and receipts; emergency incident reports are separately documented by incident occurrence time, recording incident names, involved quantities, reporting dates, and approval signatures. After these three types of materials enter knowledge base retrieval and recall, each serves as a source of candidate snippets: safety inspection checklists provide the original textual basis for inspection items and dates, hazard rectification ledgers provide the original textual basis for names, quantities, and rectification status, and emergency incident reports provide the original textual basis for incident names, quantities, and reporting dates. Retrieval is initiated item by item by batch or incident, and the returned snippets are used by subsequent nodes or humans for material verification and discrepancy localization.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit truncation). The discrepancy list is then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether fields, dates, and signatures are consistent with the corresponding records in the hazard rectification ledger | In the search test, switch `searchMode` to semantic, full-text, or hybrid, check the number of returned candidates and scores, then compare inspection items, inspection dates, and inspector signatures |
| Hazard rectification ledger | Whether the name, quantity, and date of the same record match the safety inspection checklist and emergency incident report | Retrieve once each with synonym-rewritten questions, see whether candidates include both semantic and full-text results, then enable `usingReRank` to compare the ranking of the top few results |
| Emergency incident report | Whether the incident name, involved quantity, reporting date, and approval signature are consistent with the ledger | Search by incident name, record the number of candidates and scores, check the tokens and array length of the cited text, and confirm whether fields missing signatures or receipts are recalled |
| Retrieval parameters and citations | Whether key original snippets are still retained after similarity filtering and citation limit truncation | Adjust `similarity` and `limit` to observe candidate changes, record the citation array length separately, and do not compare the number of items with the citation content budget as equal |

## Three common errors

- Symptom: The name and quantity of the same hazard do not match between the safety inspection checklist and the rectification ledger. Cause: The two entries were not written back under the same ID during data entry, and retrieval only returns their respective candidate snippets.
- Symptom: The emergency incident report has been updated, but the ledger still shows the old version. Cause: The versions were not synchronized, retrieval hit the old snippet, and it was not merged with the latest receipt.
- Symptom: The rectification ledger lacks signature or receipt fields. Cause: The materials were not archived completely, the field is empty in the candidate snippets returned by retrieval, and the discrepancy list requires manual supplementary verification.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to check the ranking of the top few results.

Business test: use one real record to find fields inconsistent with the ledger.

- In the search test, switch `searchMode` for the same record, record the number of candidates and scores, and check the name, quantity, date, and signature fields.
- Check the order of the top few results once before and once after enabling `usingReRank`, and separately record the citation array length and cited text tokens.
