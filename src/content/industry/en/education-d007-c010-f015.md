---
title: Knowledge Base Retrieval for School Timetables and After-School Scheduling: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c010-f015
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Retrieval | Review
meta_description: School Timetables: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Timetables and After-School Scheduling: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses primary and secondary school timetable and after-school service scheduling scenarios; the materials include the master timetable, the teacher assignment table, and the after-school service project table. The master timetable is updated by semester and week, with fields including class, period, course name, assigned teacher, and date; the teacher assignment table registers, by teacher dimension, assigned classes, subject, number of class hours, and a signature column; the after-school service project table records project name, participating classes, number of participants, time slot, receipt, and signature. When these three materials enter the knowledge base retrieval and recall function, they serve respectively as sources of candidate chunks: the master timetable provides the class and period structure, the teacher assignment table provides the teacher-to-class-hours correspondence, and the after-school service project table provides project and participation information. The candidate chunks and similarity scores returned by retrieval are used for subsequent nodes or manual comparison, forming an exception list and review conclusions, which are then handed to the person in charge for handling.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, re-rank, filter, and limit trimming). The "exception list and review conclusions" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Fields include class, period, course name, assigned teacher, date, and signature; cross-check names, quantities, and dates against the teacher assignment table and the after-school service project table for consistency | In the knowledge base search test, retrieve with synonymous questions, record the number of candidates and scores, switch `searchMode` to compare semantic, full-text, and hybrid results; view the original text chunks retained after `similarity` filtering |
| Teacher assignment table | Fields include teacher, assigned classes, subject, number of class hours, and signature; cross-check names, quantities, and dates of the same record against the master timetable and the after-school service project table | Retrieve once each with `usingReRank` enabled and disabled, compare the ranking of the top few candidates; check whether the returned references cover the teacher and class-hours fields, record the tokens of the reference text, and record the array length separately |
| After-school service project table | Fields include project name, participating classes, number of participants, time slot, receipt, and signature; cross-check against the master timetable and the teacher assignment table whether versions are synchronized and whether signatures or receipts are missing | Retrieve project names and time slots with synonymously rewritten questions, record the number of candidates and scores; view the number of references and content completeness after `limit` trimming, and confirm that key chunks are not lost |
| Exception record | Backed by original records, able to trace to specific entries in the master timetable, teacher assignment table, or after-school service project table | From the exception record, trace back the source of candidate chunks, check hits and associations, and confirm that when names, quantities, or dates do not match, the source material can be located |

## Three common errors

- Symptom: the course name and number of class hours of the same record do not match between the master timetable and the teacher assignment table. Cause: the two materials are updated at different paces, versions are not synchronized, and retrieval candidates do not cover the latest signed version.
- Symptom: the dates and number of participants in the after-school service project table and the master timetable are inconsistent. Cause: receipts or signatures are missing, candidate chunks recall only one of the materials, and manual review comparison is not triggered.
- Symptom: the same question, when phrased differently, fails to recall the key passage. Cause: the retrieval mode does not match the material form, and after similarity filtering and reference limit trimming, the key chunk is excluded.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare the number of candidates and scores, then toggle re-ranking on and off to see the ranking of the top few candidates; switch `searchMode` to check differences among semantic, full-text, and hybrid, and view the impact of `similarity`, `usingReRank`, and `limit` on candidates.

Business test: create an exception record and see whether it can be traced to the source material; check the fields, dates, and signatures of the master timetable, teacher assignment table, and after-school service project table, and confirm that when names, quantities, or dates do not match, the specific entry can be located.

- In the knowledge base search test, retrieve the same exception record with synonymous questions, record the number of candidates and scores, and switch `searchMode` to compare recall differences.
- Retrieve once each with `usingReRank` enabled and disabled, compare the ranking of the top few candidates; view the tokens of the reference text after `similarity` filtering and `limit` trimming, and record the array length separately.
