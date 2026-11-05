---
title: Knowledge Base Retrieval for School Timetables and After-School Scheduling: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c010-f015
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Retrieval | Checks
meta_description: School Timetables: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Timetables and After-School Scheduling: Compare Documents and Locate Differences

## What this category's data looks like

This category's data looks like this: material verification and discrepancy localization for primary and secondary school timetables and after-school service scheduling centers on three types of materials: the master timetable, the teacher assignment table, and the after-school service program table. The master timetable comes from the academic scheduling system export, finalized at the start of the semester and updated when classes are adjusted during the semester; the teacher assignment table comes from grade-level group summaries and changes with teacher leave and substitute teaching; the after-school service program table comes from after-school service registration and class-opening records and rolls over weekly or monthly. Common fields across the three types of materials include course or program name, assigned teacher, class, weekly class hours, start and end dates, and signature or receipt. When the materials enter the knowledge base retrieval and recall function, each is split and indexed as an independent document fragment, used to locate the corresponding passages of the same record in two materials by name, quantity, and date, providing candidate fragments and similarity scores for the discrepancy list, without directly giving a verification conclusion.

## Configuration and implementation checks

Configuration and implementation checks: this step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Check whether course names, weekly class hours, and start and end dates are consistent with the teacher assignment table | In the search test, switch `searchMode` to semantic, full-text, or hybrid, search with the same record name, record the number of candidates and scores, then enable `usingReRank` to compare the ranking of the top few results |
| Teacher assignment table | Check whether assigned teachers, classes, and signature or receipt are consistent with the master timetable and the after-school service program table | Search using a combination of teacher name and class, check whether candidate fragments cover both materials, and verify the candidates and quoted text after `similarity` filtering |
| After-school service program table | Check whether program names, number of participants, and dates are consistent with the master timetable and the teacher assignment table | Search by program name, observe whether candidates after multi-path merging include both semantic and full-text results, and record the number of quoted items and quoted text tokens after `limit` trimming |

## Three common errors

- Symptom: the name or weekly class hours of the same course do not match between the master timetable and the teacher assignment table. Cause: the two materials are exported separately, naming conventions and statistical calibers are not unified, and retrieval only returns their respective candidate fragments.
- Symptom: the date ranges in the after-school service program table and the master timetable are inconsistent, and versions are not synchronized. Cause: after class adjustments and class-opening changes, only one place is updated while the other still retains the old version, and retrieval hits the old fragment.
- Symptom: the teacher assignment table lacks a signature or receipt, making the version impossible to confirm during verification. Cause: the material circulation step did not return a confirmation copy, only an unsigned draft is stored in the knowledge base, and candidate fragments lack the confirmation field.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few results; at the same time record the changes in the number of candidates and scores under `searchMode`, `similarity`, `limit`, and `usingReRank`.

Business test: use one real record to find a field inconsistent with the ledger, search separately by the record's name, quantity, and date, and locate the material and field where the discrepancy lies.

- In the knowledge base search test, search the same record using semantic, full-text, and hybrid modes, record the number of candidates and similarity scores, and mark fields that appear in only one material.
- Before and after enabling rerank, look at the top few candidates once each, check whether the quoted text retains name, quantity, date, and signature fields, record the number of quoted items by array length, and separately view the quoted content tokens.
