---
title: Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c050-f015
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Retrieval | Checks
meta_description: Foreign Teachers: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Compare Documents and Locate Differences

## What this category's data looks like

In the foreign teacher appointment and course scheduling scenario, materials typically include three types: appointment contracts, work permit materials, and course schedules, originating from different handling stages and versions. The appointment contract contains name, position, appointment period, compensation, and signatures of both parties; the work permit materials contain name, ID number, permit period, and employer receipt; the course schedule contains course name, class, week number, credit hours, and instructor. The update rhythm is centralized submission before the semester, sporadic adjustments during the semester, and archiving at the end of the semester. The three types of materials play different roles when entering knowledge base retrieval: appointment contracts and work permit materials provide identity and period fields, while course schedules provide course and quantity fields. The name, quantity, and date of the same record in two materials need to be consistent; unsynchronized versions or missing signatures/receipts will cause discrepancies, and retrieval is used to locate candidate fragments for manual comparison.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "discrepancy list" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Name, position, appointment period, signature, and date are consistent across the three types of materials | In the search test, retrieve item by item using contract fields, record the number of candidates and scores, and verify name, quantity, and date |
| Work permit materials | ID number, permit period, and employer receipt are consistent with the corresponding fields in the contract | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether candidates simultaneously cover the ID and period fields |
| Course schedule | Course name, class, week number, credit hours, and instructor are consistent with the contract appointment period | Compare the ranking of the top few items before and after enabling `usingReRank`, and filter low-score candidates by `similarity` |
| Ledger record | When the name, quantity, and date of the same record in two materials do not match, locate the discrepancy field | Retrieve using one real record, record the number of candidates after `limit` trimming, and separately verify the referenced text tokens |

## Three common errors

- Phenomenon: The course name or credit hours of the same record do not match between the contract and the course schedule. Cause: The two materials are filled in at different stages, and versions are not synchronized.
- Phenomenon: Work permit materials lack signatures or receipts, but retrieval still returns candidate fragments. Cause: Material status is not marked, and candidates are not filtered by completeness.
- Phenomenon: The same question cannot be recalled when rephrased, or there are many candidates but the top-ranked ones are all irrelevant. Cause: The retrieval mode does not match the material form, and rerank is not enabled.

## How to verify the setup

Acceptance of this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few items.

Business test: Use one real record to find fields inconsistent with the ledger.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores across semantic, full-text, and hybrid modes.
- After enabling `usingReRank`, compare the ranking of the top few items, filter low-score candidates by `similarity`, and record the number of candidates after `limit` trimming.
