---
title: Knowledge Base Retrieval for School Timetables and After-School Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c010-f015
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Retrieval | Intake
meta_description: School Timetables: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Timetables and After-School Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on primary and secondary school timetables and after-school service scheduling. The materials include the master timetable, the teacher assignment table, and the after-school service program table. The sources are the academic affairs and after-school service management roles, and the update cadence is centralized publication at the start of the semester, followed by rolling revisions during the semester based on class adjustments or program changes. The master timetable records class, period, venue, and week number; the teacher assignment table records teacher, subject, assigned classes, and signature confirmation; the after-school service program table records program name, number of participants, time slot, and receipt. When these three types of materials enter knowledge base retrieval, each is recalled as an independent chunk to support intake records and the items to be completed, and they do not directly generate statistical tables or authorization results.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, re-rank, filter, and limit trimming). Intake records and the items to be completed are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Need to check the class, period, venue, and week number fields, and compare names and dates item by item against the teacher assignment table | In the search test, retrieve once each with synonymous questions, record the number of candidates and scores, and check whether the corresponding week numbers are covered |
| Teacher assignment table | Need to check teacher, subject, assigned classes, and the signature column, and confirm the version is synchronized with the master timetable | Switch `searchMode` to hybrid, observe whether candidates contain both semantic and full-text results, then check the signature receipt |
| After-school service program table | Need to check program name, number of participants, time slot, and receipt, and confirm consistency with the master timetable dates | Compare the top few rankings before and after enabling `usingReRank`, record the array length, and separately check the tokens of the referenced text |

## Three common errors

- Symptom: the same class's name or number of people does not match across the two materials. Cause: the master timetable and the after-school service program table are maintained separately, with no field-level comparison.
- Symptom: the date after a class adjustment is inconsistent across the two materials. Cause: versions are not synchronized, and old chunks are still recalled and ranked at the front.
- Symptom: the teacher assignment table lacks a signature or receipt. Cause: the material circulation step is not closed-loop, and retrieval still returns unconfirmed chunks.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle re-ranking to see the order of the top few; record the values of `similarity` and `limit`, check the number of candidates and scores, and do not compare the number of cited items with the citation budget as equal.

Business test: ask a question that lacks key information and see whether it asks a follow-up before answering; confirm that the missing item is identified and followed up on, and that the answer has material basis before being forwarded to the handler.

- In the knowledge base search test, switch retrieval modes and compare the candidate results of the three options—semantic, full-text, and hybrid—recording the number of candidates and scores.
- Compare the order of the top few before and after enabling re-ranking, and separately record the length of the citation array and the tokens of the referenced text, checking whether key chunks are retained.
