---
title: Knowledge Base Retrieval for School Safety Inspections and Incident Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c016-f015
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Retrieval | Intake
meta_description: Campus Safety: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Safety Inspections and Incident Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of school safety hazard inspections and campus incident reporting. The materials come from three categories: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are updated weekly or monthly, with fields including inspection item, location, result, inspector, and date; hazard rectification ledgers are updated on a rolling basis as rectification progresses, with fields including hazard name, quantity, responsible person, deadline, and signature; emergency incident reports are submitted immediately when an incident occurs, with fields including incident name, time, involved quantity, handling process, and receipt. When these three types of materials enter the knowledge base retrieval and recall function, they play different roles: safety inspection checklists provide inspection basis and historical records, hazard rectification ledgers provide rectification status and responsibility clues, and emergency incident reports provide the incident process and handling conclusions. The retrieval service splits them into candidate chunks for subsequent nodes or manual generation of intake records and follow-up questions to be completed.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit truncation). Intake records and follow-up questions to be completed are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Fields include inspection item, location, result, inspector, and date; the name, quantity, and date must be consistent with the ledger and incident report | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, and compare whether the candidate chunks cover both the checklist and ledger fields |
| Hazard rectification ledger | Fields include hazard name, quantity, responsible person, deadline, and signature; if the signature or receipt is missing, it is treated as a missing item | Test once each with synonym-rewritten questions, see whether the candidates recall the name and quantity in the ledger, and record the number of candidates and scores |
| Emergency incident report | Fields include incident name, time, involved quantity, handling process, and receipt; the version must be synchronized with the ledger | Turn rerank on and off, compare the order of the top few candidates, and confirm whether the dates and quantities in the report and ledger match |
| Intake records and follow-up questions to be completed | Missing items are identified and followed up on, answers are based on materials, and the case is transferred to the handler | Check whether the candidates after `similarity` filtering retain key chunks, check the number of citations after `limit` truncation, and record the array length separately |

## Three common errors

- Symptom: the name and quantity of the same hazard do not match between the checklist and the ledger. Cause: the two materials were entered separately without field alignment, and the association was not checked after retrieval hits.
- Symptom: the date of the incident report is inconsistent with the rectification deadline in the ledger. Cause: the version was not synchronized, and the old report still remains in the knowledge base and participates in recall.
- Symptom: the ledger lacks a signature or receipt, but candidate chunks are still recalled. Cause: similarity filtering only looks at text matching and does not check the signature and receipt fields.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidate chunks and `similarity` scores, then turn rerank on and off to observe changes in the ranking of the top few results, and record the number of citations after `limit` truncation.

Business test: ask a question that lacks key information, see whether it first follows up before answering, and after the follow-up check whether the candidates cover the fields of the checklist, ledger, and incident report.

- In the knowledge base search test, switch `searchMode`, compare candidate chunks and scores under semantic, full-text, and hybrid modes, and confirm that the material form matches the mode.
- After enabling rerank, compare the order of the top few candidates, check whether `similarity` filtering and `limit` truncation retain key chunks from the original text, and record the cited text tokens and array length separately.
