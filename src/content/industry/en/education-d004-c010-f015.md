---
title: Knowledge Base Retrieval for School Timetables and After-School Scheduling: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c010-f015
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Retrieval | Handover
meta_description: School Timetables: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Timetables and After-School Scheduling: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses primary and secondary school timetable and after-school service scheduling scenarios. Material sources include the master timetable, teacher assignment table, after-school service project table, and their handover records. The master timetable records class, week, period, and course name; the teacher assignment table records teacher, class, subject, and number of class hours; the after-school service project table records project name, number of participants, venue, and time slot. The three types of materials are scheduled by semester, adjusted monthly, and published weekly, with fields including name, quantity, date, version number, and signature field. When entering knowledge base retrieval, the master timetable serves as the recall source for course and class fields, the teacher assignment table serves as the recall source for assignment and class hour fields, the after-school service project table serves as the recall source for project and participant count fields, and handover records provide candidate fragments for version and signature status. Retrieval returns candidate fragments and similarity scores, not statistical tables or authorization results that can be directly issued.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, re-rank, filter, and limit trimming). Issuable material drafts and handover records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Whether class, week, period, course name, date, and signature are complete, and whether names and quantities are consistent with the teacher assignment table | In the search test, search once each using two expressions of the same record, check the names, quantities, and dates in the candidate fragments, and record the number of candidates and scores |
| Teacher assignment table | Whether teacher, class, subject, class hours, and version number correspond to the master timetable, and whether missing signatures or receipts are blocked | Switch `searchMode` to semantic, full-text, and hybrid, compare whether candidates simultaneously contain both types of recall results, and check version and date |
| After-school service project table | Whether project name, number of participants, venue, time slot, and master timetable date are synchronized, and whether the quantity of the same record in the two materials does not match | Turn `usingReRank` on and off to compare the ranking of the first few items, check whether key fragments are retained after `similarity` filtering, and separately record the reference array length |
| Handover record | Whether responsible person, receipt time, version, and receipt fields are complete, and whether missing signatures or unsynchronized versions occur | Test once each with synonym-rewritten questions, check the responsible person and date in the candidate fragments, and confirm whether the reference text tokens are complete after `limit` trimming |

## Three common errors

- Phenomenon: The same course name is written differently in the master timetable and the teacher assignment table. Cause: The two tables are drafted separately, names and quantities are not cross-checked, and retrieval recalls by a single expression.
- Phenomenon: The number of participants in the after-school service project table does not match the quantity recorded in the master timetable. Cause: Versions are not synchronized, old-version candidate fragments and new-version materials are recalled simultaneously, and date fields are not aligned.
- Phenomenon: The handover record lacks a signature or receipt, and the next step cannot sign off. Cause: Retrieval only returns candidate fragments and scores, signature and receipt status are not reflected in the candidates, and manual supplementary verification was not performed.

## How to verify the setup

Feature acceptance: Test once each with synonym-rewritten questions, compare the number of candidates and `similarity` scores, then turn `usingReRank` on and off to observe changes in the ranking of the first few items, and switch `searchMode` to check whether candidates simultaneously contain semantic and full-text results.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the search test, search the master timetable, teacher assignment table, and after-school service project table respectively using two expressions, record the number of candidates and scores, and check the name, quantity, date, and signature fields.
- Turn `usingReRank` on and off and search once each, compare the ranking of the first few items, separately record the reference array length and reference text tokens, and confirm that key fragments are still retained after `limit` trimming.
