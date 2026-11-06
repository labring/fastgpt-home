---
title: Knowledge Base Retrieval for School Timetables and After-School Scheduling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c010-f015
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Retrieval | Progress
meta_description: School Timetables: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Timetables and After-School Scheduling: Track Progress and Check Statistics

## What this category's data looks like

This page addresses progress records and statistics verification materials for primary and secondary school timetables and after-school service scheduling. Sources include the master timetable, teacher assignment table, after-school service project table, and weekly/monthly report drafts, with an update cadence of weekly aggregation and monthly verification. The master timetable serves as the baseline for classes and periods, the teacher assignment table serves as the basis for assigned teachers and teaching hour attribution, and the after-school service project table serves as the basis for project names, participant counts, and dates. When these three types of materials enter knowledge base retrieval and recall, each serves as a source of candidate segments: the master timetable provides period and class fields, the teacher assignment table provides teacher and subject fields, and the after-school service project table provides project and receipt fields. Field characteristics center on names, quantities, dates, signatures, and version numbers. During retrieval, patterns must be matched according to the material form to avoid the same record having mismatched names or quantities across two materials.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after pattern, merge, rerank, filter, and limit truncation). The progress table and statistical scope description are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Classes, periods, dates, and signatures are complete, and correspond item by item with the teacher assignment table | In the search test, use synonymous questions to retrieve the master timetable, record the number of candidates and scores, and check whether the date and signature fields are complete |
| Teacher assignment table | Teachers, subjects, and teaching hour quantities are consistent with the master timetable, and version numbers are synchronized | Switch `searchMode` to compare semantic and full-text candidates, and check whether teachers and teaching hour quantities match the master timetable |
| After-school service project table | Project names, participant counts, dates, and receipts are complete, and consistent with the weekly/monthly report totals | Use one week of records to verify the totals, and check whether project names and participant counts are consistent with the master timetable and teacher assignment table |
| Weekly/monthly report drafts | Record counts and statistical counts match, the scope is written in the header, and exceptions are clearly stated | Check the tokens of the cited text and the number of candidates, record `limit` separately, and do not compare the two for equality |

## Three common errors

- Symptom: The same record has mismatched names or quantities in the master timetable and the teacher assignment table. Cause: The two tables have different update cadences, versions are not synchronized, and retrieval candidates are not filtered by date and signature.
- Symptom: The after-school service project table lacks signatures or receipts, yet the weekly/monthly report totals are still adopted. Cause: The scope is not written in the header, exceptions are not marked, and key segments are truncated after similarity filtering.
- Symptom: There are many candidates but the top-ranked ones are all irrelevant, and the answer lacks key paragraphs. Cause: Rerank is not enabled or `searchMode` is not switched, and multi-path merge results are not re-sorted.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare the number of candidates and scores, then toggle rerank on and off to observe the ranking of the top few; check the status values of `usingReRank` and `similarity`, record the number of candidates and scores, and do not write the three-state index.

Business test: use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated; check the dates and signatures of the master timetable, teacher assignment table, and after-school service project table, and confirm that record counts and statistical counts match.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores across the three modes of semantic, full-text, and hybrid, and record changes in the ranking of the top few.
- Check the tokens of the cited text and the number of items in the candidate array, record `limit` separately; check whether the signatures and receipts of the master timetable, teacher assignment table, and after-school service project table are complete.
