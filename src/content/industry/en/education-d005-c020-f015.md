---
title: Knowledge Base Retrieval for Grade Entry and Credit Recognition: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c020-f015
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Retrieval | Versions
meta_description: Grades and Credits: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Grade Entry and Credit Recognition: Maintain Document Versions and Changes

## What this category's data looks like

Grade entry and credit recognition involves three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. Fields include course name, credits, grade, examination date, deferred examination reason, make-up examination time, and signature field. Transcripts are exported from the academic affairs system, while deferred examination applications and make-up examination arrangements are submitted by departments, and the update cadence changes with semester milestones. When materials enter knowledge base retrieval, transcripts serve as the main record providing the course and credit baseline, deferred examination applications provide the basis for approval and signatures, and make-up examination arrangements provide time and examination room information. The name, quantity, and date of the same record in different materials must remain consistent. After a version change, the old version should be traceable, and references need to be updated synchronously. Field characteristics require that the version ledger and change records reflect that the current version is unique, the old version is traceable, and references are synchronized.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Whether the course name, credits, grade, examination date, and signature are consistent with the deferred examination application and make-up examination arrangement | In the search test, switch `searchMode` and check whether the transcript fields in the candidate chunks correspond to the name, quantity, and date in the deferred examination application and make-up examination arrangement |
| Deferred examination application | Whether the deferred examination reason, approval date, and signature or receipt are complete and correspond to the transcript course | Retrieve the deferred examination application with synonymous questions, view the number of candidates and scores, and confirm whether the signature and receipt fields appear in the cited text |
| Make-up examination arrangement | Whether the make-up examination time, examination room, transcript course, and deferred examination application record match | Compare the ranking of the top few results before and after enabling `usingReRank`, and check whether the dates and courses of the make-up examination arrangement are synchronized with the transcript and deferred examination application |
| Version ledger and change records | The current version is unique, the old version is traceable, and references are synchronized | After changing one piece of content, check whether the version number and references are updated synchronously, record the number of candidates and scores, and use `limit` to control the number of returned results |

## Three common errors

- Symptom: The name and credits of the same course do not match between the transcript and the deferred examination application. Cause: The two materials were imported by different nodes, versions were not synchronized, and each was recalled separately during retrieval.
- Symptom: The make-up examination arrangement date is inconsistent with the transcript examination date, and the reference still points to the old version. Cause: After the change, the knowledge base was not updated, and old-version chunks were still recalled.
- Symptom: The deferred examination application lacks a signature or receipt, but candidate chunks are still cited. Cause: The material fields are incomplete, and similarity filtering did not exclude chunks with key missing fields.

## How to verify the setup

This feature acceptance: test once each with synonymously rewritten questions, compare candidates and `similarity` scores, then toggle rerank on and off to inspect the ranking of the top few results.

Business test: change one piece of content, check whether the version number and references are updated synchronously, record the number of candidates and scores, and use `limit` to control the number of returned results.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores across the three modes: semantic, full-text, and hybrid.
- Compare the ranking of the top few results before and after enabling `usingReRank`, and check whether the dates and courses of the make-up examination arrangement are synchronized with the transcript and deferred examination application.
