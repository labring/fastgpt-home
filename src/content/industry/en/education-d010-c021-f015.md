---
title: Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c021-f015
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Retrieval | Operations
meta_description: Graduation Eligibility: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Coordinate Operations and Application Handover

## What this category's data looks like

Student status change and graduation eligibility review materials include three categories: leave-of-absence and return-to-study applications, major transfer applications, and graduation review checklists. Leave-of-absence and return-to-study applications come from the academic affairs system and paper-based signed approvals, updated by semester batch, with fields including student ID, change type, effective date, department opinion, signature, and receipt; major transfer applications come from the student side and the department review side, updated by application round, with fields including original major, target major, assessment conclusion, date, and seal; graduation review checklists come from the curriculum plan and grade database, updated by graduation batch, with fields including course name, credits, quantity, review conclusion, and signature. When these three categories of materials enter knowledge base retrieval and recall, each serves its own role as a candidate source: application-type materials provide the basis for process and signatures, while checklist-type materials provide the basis for courses and credits. If the name, quantity, or date of the same record does not match across two materials, if versions are not synchronized, or if signatures or receipts are missing, the candidate chunks and scores will be unable to support handover.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit truncation). The handover-ready deployment status and operation records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence and return-to-study applications | Whether student ID, change type, effective date, department opinion, and signature receipt are complete, and whether the name and date of the same record are consistent across the two materials | In the knowledge base search test, switch `searchMode` to compare candidates, and verify the signature and receipt fields in the returned chunks |
| Major transfer applications | Whether original major, target major, assessment conclusion, date, and seal are complete, and whether the version is synchronized with the review side | Test once each with synonym-rewritten questions, compare the number of candidates and the `similarity` score, and check whether the date and seal fall within the same record |
| Graduation review checklists | Whether course name, credits, quantity, review conclusion, and signature are complete, and whether the name and quantity of the same course match across the two materials | Compare the ranking of the top few results before and after enabling `usingReRank`, and verify the course and credit fields in the checklist chunks |
| Deployment status and operation records | Whether version, connection, and task records are consistent, and whether every item in the handover form has a corresponding record | Verify each item in the handover form once, record the number of candidates and scores, separately record the length of the citation array, and verify the tokens of the cited text and the `limit` budget |

## Three common errors

- Symptom: The change date for the same student does not match between the leave-of-absence and return-to-study application and the graduation review checklist. Cause: The two materials are updated separately, versions are not synchronized, and retrieval candidates hit only one of them.
- Symptom: The target major name in the major transfer application is inconsistent with the review-side record, and the candidate score is low. Cause: The name is written differently, and after semantic recall and full-text recall are merged, key chunks are still missing.
- Symptom: The graduation review checklist lacks a signature or receipt, and the number of candidates returned by retrieval is sufficient but the content is incomplete. Cause: The materials entered the knowledge base before being completed, and the chunks retained after similarity filtering cannot support handover.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare candidate chunks and `similarity` scores, then toggle `usingReRank` on and off to observe changes in the ranking of the top few results, and separately record the length of the citation array and the `limit` budget.

Business test: verify each item in the handover form once, see which record is missing, and confirm that version, connection, and task records are consistent.

- In the knowledge base search test, switch `searchMode` to compare the number of candidates and scores across the three modes—semantic, full-text, and hybrid—and record the differences.
- Verify the fields, dates, and signatures of leave-of-absence and return-to-study applications, major transfer applications, and graduation review checklists item by item according to the handover form, mark missing items, and hand off to the next shift.
