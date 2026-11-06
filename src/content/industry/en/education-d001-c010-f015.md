---
title: Knowledge Base Retrieval for School Timetables and After-School Scheduling: Find Supporting Evidence
slug: /en/industry/education-d001-c010-f015
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Retrieval | Evidence
meta_description: School Timetables: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Timetables and After-School Scheduling: Find Supporting Evidence

## What this category's data looks like

This page addresses primary and secondary school timetable and after-school service scheduling scenarios. The materials include the master timetable, teacher assignment table, after-school service project table, and parent receipts and signature pages. The master timetable provides the class weekly period counts and course names, the teacher assignment table provides the assigned teacher, class, and weekly teaching hours, and the after-school service project table provides the project name, number of participants, start and end dates, and responsible teacher. The materials are updated on the rhythm of finalization at the start of the semester, adjustment at midterm, and archiving at the end of the semester; the version number and signature field are the key fields for determining whether a version is current. When the three types of materials enter knowledge base retrieval, each plays a different role: the master timetable and teacher assignment table are used to check the consistency of courses and assignments, the after-school service project table is used to check project names, participant counts, and dates, and the receipts and signature pages are used to confirm that a version is in effect. The retrieval service splits these materials into candidate chunks for subsequent nodes or manual reference back to the original text.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The basis entries that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Fields include class, weekly period count, course name, version number, and signature field; for the same record, the course name, weekly teaching hours, and date in the master timetable and teacher assignment table must be consistent | In the search test, switch `searchMode` to semantic, full-text, or hybrid, check whether the candidate chunks cover the original text of the master timetable, and record the number of candidate chunks and the score |
| Teacher assignment table | Fields include teacher, class, weekly teaching hours, version number, and signature; compare with the master timetable to see whether the teacher and teaching hours for the same class and same course match | Compare the top few rankings before and after enabling `usingReRank`, confirm whether the key passages of the assignment table are ranked at the top, and record the number of candidate chunks and the score |
| After-school service project table | Fields include project name, number of participants, start and end dates, responsible teacher, and receipt signature; compare with the master timetable to see whether the project name and dates are consistent | Test once each with synonymous rewritten questions, check whether the candidate chunks of the project table retain the key passages of the original text, and separately record the number of entries in the citation array |
| Receipts and signature pages | Fields include signature, date, and receipt status; when the version is not synchronized or the signature is missing, that basis entry cannot serve as the current basis | Adjust `limit` to observe changes in the number of candidate chunks, check whether the original text of the signature page is recalled, and record the number of candidate chunks and the score |

## Three common errors

- Symptom: the name or weekly teaching hours of the same course do not match between the master timetable and the teacher assignment table. Cause: the two materials are maintained separately, the versions are not synchronized, and retrieval hits chunks from different versions.
- Symptom: the number of participants in the after-school service project table is inconsistent with the number of records in the master timetable. Cause: after the project table was updated, it was not written back to the master timetable, and the candidate chunks come from an old version.
- Symptom: the receipt or signature page is missing, and the basis entry cannot be traced back to the current original text. Cause: material archiving is incomplete, and chunks that are not yet in effect are still retained after similarity filtering.

## How to verify the setup

This feature's acceptance: test once each with synonymous rewritten questions, compare the candidates and scores, then toggle rerank on and off to observe the ranking of the top few entries; switch `searchMode` and `usingReRank`, record the number of candidate chunks and the score, and separately record the number of entries in the citation array.

Business test: ask a basis question that spans materials and see whether the answer provides a traceable source.

- In the knowledge base search test, retrieve once for the same basis question using different phrasings, record the number of candidate chunks and the score, and confirm whether the key passages are stably recalled.
- Retrieve once each with `usingReRank` enabled and disabled, compare the ranking of the top few entries, and check whether the tokens of the cited text and the number of entries in the citation array are recorded separately.
