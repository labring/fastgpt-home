---
title: Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c050-f015
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Retrieval | Versions
meta_description: Foreign Teachers: review retrieval for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Foreign Teacher Recruitment and Course Scheduling: Maintain Document Versions and Changes

## What this category's data looks like

This category's data looks like this: Foreign teacher appointment and course scheduling involves three types of core materials: appointment contracts, work permit materials, and course schedules. Appointment contracts include position, appointment period, compensation, and signatures of both parties; work permit materials include name, ID number, permit period, and receipt; course schedules include course name, class, week number, instructor, and academic affairs signature. The three types of materials come from different sources and have different update rhythms: contracts change with renewal or clause adjustments, permit materials update with approval progress, and course schedules are revised on a rolling basis by semester and temporary schedule changes. When materials enter knowledge base retrieval, each is recalled as an independent fragment for subsequent nodes to compare the consistency of fields, dates, and signatures.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether fields, dates, and signatures are consistent with the current version | In the search test, search by contract name and appointment period, verify the position, appointment period, and signature in the candidate fragments, record the number of candidates and scores, and switch `searchMode` to compare results |
| Work permit materials | Whether name, ID number, permit period, and receipt match | Search by ID number and permit period, verify the name and dates in the candidate fragments, enable `usingReRank` to compare the order of the top few results |
| Course schedule | Whether course name, class, week number, and instructor are consistent with the contract | Search by course name and week number, verify the class and instructor in the candidate fragments, adjust `similarity` to observe changes in the number of candidates and scores |
| Version ledger | Current version is unique, old versions are traceable, and references are synchronized | Search by version number and change date, verify whether the candidate fragments point to the same record, use `limit` to control the number of referenced items and check the tokens of the referenced text |

## Three common errors

- Symptom: The same teacher's name is written differently in the contract and course schedule. Cause: The two materials are entered separately, without field alignment and version synchronization.
- Symptom: The permit period has been updated, but the recalled fragment still points to the old date. Cause: The old version was not marked as invalid, and retrieval returned the old fragment based on similarity.
- Symptom: The course schedule lacks an academic affairs signature or receipt. Cause: The change record did not backfill the signature status, and this field was omitted during reference synchronization.

## How to verify the setup

In the knowledge base search test, switch `searchMode`, record the number of candidates and scores, and confirm the current version is unique.

Enable `usingReRank` to compare the order of the top few results, and record the tokens of the referenced text and the number of array items separately.

- Acceptance for this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank to check the ordering of the top few results.
- Business test: Change one piece of content and see whether the version number and references are updated synchronously.
