---
title: Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c021-f015
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Retrieval | Intake
meta_description: Graduation Eligibility: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the Q&A intake scenario for student status changes and graduation eligibility review. Materials fall into three categories: leave-of-absence/resumption applications, major transfer applications, and graduation review checklists. Leave-of-absence/resumption applications include the change type, effective date, original major and intended resumption grade, and signature fields; major transfer applications include the intended transfer-in major, assessment conclusion, receiving signature, and receipt; graduation review checklists include course names, credits, grade dates, review conclusions, and seals. The three material types have similar field names but different definitions; the name, quantity, and date of the same record may not match across two materials, and versions may be out of sync or missing signatures/receipts. After materials enter knowledge base retrieval and recall, they serve as candidate chunk sources for the intake step to identify missing items and generate follow-up questions to be completed, which are then forwarded to the handler. The update cadence changes with batches and semester milestones, and field characteristics use dates and signatures as key anchors.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). "Intake records and completed follow-up questions" are handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence/resumption application | Check whether the change type, effective date, original major and intended resumption grade, and signature are complete | In the knowledge base search test, test once each with synonymous questions, record the number of candidates and scores, and switch `searchMode` to compare the difference between semantic and full-text recall |
| Major transfer application | Check whether the intended transfer-in major, assessment conclusion, receiving signature, and receipt are consistent with the application | Compare the ranking of the top few results before and after enabling `usingReRank`, and check whether the candidates include both semantic and full-text results |
| Graduation review checklist | Check whether the course names, credits, grade dates, review conclusions, and seals match across the two materials | After filtering with `similarity`, check whether the retained chunks contain key fields, record the number of items in the citation array separately, and do not compare it as equal to `limit` |
| Intake records and completed follow-up questions | Check whether missing items are identified and followed up, and whether answers are grounded in materials | Review the candidate chunks and cited content to confirm that follow-up items correspond to specific material fields |

## Three common errors

- Symptom: The name and date of the same record do not match between the leave-of-absence/resumption application and the major transfer application. Cause: The two filing definitions differ and field alignment has not been done; retrieval only returns candidate chunks and does not automatically determine which one prevails.
- Symptom: The graduation review checklist version is out of sync, and courses and credits are still the old version. Cause: After the materials were updated, they were not re-ingested or the old chunks were not overwritten, so recall hits both new and old content.
- Symptom: The major transfer application lacks a receiving signature or receipt, but intake continues. Cause: The missing item was not identified as a follow-up item, the answer lacks key passages, and no follow-up was asked before answering.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ranking of the top few results.

Business test: ask a question missing key information and see whether it follows up before answering.

- In the knowledge base search test, switch `searchMode`, record the number of candidates and scores, and confirm that after multi-path merging both semantic and full-text results are included.
- Enable `usingReRank` to compare the order of the top few results, filter with `similarity`, then check the cited text tokens, and record the array item count separately.
