---
title: Knowledge Base Retrieval for Grade Entry and Credit Recognition: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c020-f015
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Retrieval | Checks
meta_description: Grades and Credits: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Grade Entry and Credit Recognition: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy localization in grade entry and credit recognition scenarios, involving three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts are usually exported from the academic affairs system or submitted by the course instructor, with fields including course name, credits, grade, assessment date, and signature; deferred examination applications are submitted by students and approved, with fields including applied course, reason for deferral, original examination date, and approval signature; make-up examination arrangements are published by the academic affairs office or the college, with fields including make-up examination course, make-up examination time, examination room, and receipt. The three types of materials update at different rhythms: transcripts update as grades are entered, deferred examination applications update as approvals flow through, and make-up examination arrangements update as examination affairs are adjusted. When entering the knowledge base retrieval service, transcripts serve as the primary record source, while deferred examination applications and make-up examination arrangements serve as supporting evidence and discrepancy comparison sources, each being recalled as independent chunks for subsequent verification of whether names, quantities, dates, and signatures are consistent.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Course name, credits, grade, assessment date, and signature must match the deferred exam application and makeup exam arrangement item by item | In search tests, use the course name or student ID to retrieve, switch `searchMode` to semantic, full-text, or hybrid, compare candidate snippets with `similarity` scores, and check whether fields are complete |
| Deferred Exam Application | Applied course, reason for deferral, original exam date, and approval signature must correspond to the transcript and makeup exam arrangement | Retrieve by deferred exam course name, check the number of returned candidates and scores, confirm whether the approval signature and receipt appear in the cited content, and record the array length |
| Makeup Exam Arrangement | Makeup exam course, makeup exam time, exam room, and receipt must be consistent with the transcript and deferred exam application | Retrieve by makeup exam course name, enable `usingReRank` to compare the ranking of the top few results, check whether the time and exam room fields match the ledger, and after trimming the citation limit according to `limit`, verify the citation text tokens |

## Three common errors

- Symptom: The name or credit count of the same course does not match between the transcript and the make-up examination arrangement. Cause: The two material versions are not synchronized, and their independent chunks are not aligned at the field level during retrieval recall.
- Symptom: The deferred examination application lacks an approval signature or receipt, yet the transcript already has a grade. Cause: The signature or receipt is missing in the material flow process, and although retrieval candidates are recalled, the cited content is incomplete.
- Symptom: The original examination date or make-up examination date of the same record is inconsistent between the transcript and the deferred examination application. Cause: The update rhythms differ, old-version chunks are still recalled, and similarity scores are close, causing ordering confusion.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking on and off to observe the ordering of the top few results; switch `searchMode` to observe recall differences, enable `usingReRank` to compare ordering changes, record the number of candidates and `similarity` scores, and after the citation limit is trimmed by `limit`, separately verify the cited text tokens.

Business test: use one real record to find fields inconsistent with the ledger, verify course name, quantity, date, and signature item by item, form a discrepancy list, submit it to the reviewer for confirmation, and write it back.

- In the search test, search by course name, student ID, and date respectively, compare candidate chunks and scores, and mark fields with inconsistent names, quantities, dates, and signatures.
- For the same record, switch among semantic, full-text, and hybrid modes and search once in each, compare the ordering of the top few results before and after enabling re-ranking, and record the number of candidates and cited text tokens.
