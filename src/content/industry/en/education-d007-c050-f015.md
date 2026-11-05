---
title: Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c050-f015
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Retrieval | Review
meta_description: Foreign Teachers: review retrieval for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Trace Exceptions and Review Results

## What this category's data looks like

Foreign teacher appointment and course scheduling materials include three categories: appointment contracts, work permit materials, and course scheduling tables. The sources are archives from the school's personnel and foreign affairs departments and exports from the academic scheduling system, updated by semester and synchronized with visa and scheduling changes. When the three categories of materials enter the knowledge base retrieval and recall function, their roles differ: appointment contracts provide the appointment relationship and signature fields, work permit materials provide the permit number, validity period, and receipt, and course scheduling tables provide the course name, number of class hours, and teaching dates. The field characteristic is that the same record's name, quantity, and date must be consistent across the three materials, versions must be synchronized, and signatures and receipts must be complete. During exception tracing, the three categories of materials are recalled as candidate fragments, used to compare source materials with review conclusions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The exception list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Check whether the teacher name, appointment start and end dates, number of class hours, and signature field in the contract are consistent with the work permit materials and course scheduling table | In the search test, switch `searchMode` to hybrid retrieval, test once each with synonymous questions, record the number of candidates and scores, and check the contract signature and receipt |
| Work permit materials | Check whether the permit number, validity period, teacher name, and contract dates match, whether versions are synchronized, and whether receipts are complete | Enable `usingReRank` to compare the ranking of the top few results, check whether candidate fragments include both semantic and full-text results, and check the permit receipt |
| Course scheduling table | Check whether the course name, number of class hours, and teaching dates are consistent with the contract and permit materials, and whether the scheduling version is synchronized | Adjust `similarity` to filter out low-scoring candidates, record the number of returned citations and scores, and check the scheduling table signature and version date |
| Retrieval candidates and citations | Check whether candidate fragments and similarity scores cover the key fields of the three categories of materials, and record the number of citations and the citation content budget separately | Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few results, and check the citation text tokens |

## Three common errors

- Symptom: the same teacher name is written differently in the contract and permit materials, causing recalled candidates to fail to match. Cause: the name field was not unified when the two materials were entered, and retrieval hits different fragments based on different expressions.
- Symptom: the number of class hours in the course scheduling table is inconsistent with the number agreed in the contract, and during review it is impossible to determine which one prevails. Cause: the scheduling version was not synchronized, and the old scheduling table remains in the knowledge base and participates in recall.
- Symptom: work permit materials lack a signature or receipt, and the exception list cannot form a review conclusion. Cause: signatures and receipts were not completed when the materials were archived, and retrieval can only return incomplete candidate fragments.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few results; after switching `searchMode` and adjusting `similarity`, record the number of candidates and scores.

Business test: create an exception record, see whether the source materials can be traced, and check whether the fields, dates, and signatures of the appointment contract, work permit materials, and course scheduling table are consistent.

- In the knowledge base search test, switch the retrieval mode, test once each with synonymous questions, record the number of candidates and similarity scores, then enable rerank to compare the ranking of the top few results.
- Check the number of returned citations and citation text tokens, record the array length and citation content budget separately, and check whether candidate fragments cover the key fields of the contract, permit, and scheduling table.
