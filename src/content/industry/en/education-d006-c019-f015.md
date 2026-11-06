---
title: Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Track Progress and Check Statistics
slug: /en/industry/education-d006-c019-f015
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Retrieval | Progress
meta_description: Course Scheduling: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the course selection, scheduling, and classroom resource allocation category. The materials come from three types of ledgers: course offering plans, scheduling tables, and course selection rules. They are updated weekly and archived by semester, and their fields include course name, teacher, class, classroom, date, period, capacity, signature, and receipt. When entering the knowledge base retrieval and recall function, the course offering plan serves as the source for course and credit definitions, the scheduling table serves as the source for time and space placement, and the course selection rules serve as the source for admission and exceptions. Together, the three form the underlying corpus for candidate chunks and similarity scores, for subsequent nodes or humans to use as a basis for generating progress tables and statistical definition notes.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), and outputs candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The progress table and statistical definition notes are then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | The course name, credits, offering semester, and signature fields must be aligned item by item with the scheduling table | In the search test, switch `searchMode` to semantic, full-text, and hybrid, check whether the candidate chunks cover the plan fields, and record the number of candidates and the scores |
| Scheduling table | The classroom, date, period, and capacity fields must be consistent with the admission conditions in the course selection rules | Compare the order of the top few results before and after enabling and disabling `usingReRank`, check whether the scheduling fields are recalled, and separately record the length of the reference array |
| Course selection rules | The admission conditions, exception clauses, and receipt fields must be synchronized with the version of the course offering plan | Test once each with synonym-rewritten questions, observe whether the candidates still contain the original rule text after `similarity` filtering, and check the tokens of the reference text after `limit` trimming |
| Progress table and statistical definition notes | The record count and the statistical count must match, the definitions must be written in the header, and exceptions must be noted | Use one week of records to check the totals, and check whether the names, quantities, dates, and signature receipts are aligned across the two materials |

## Three common errors

- Symptom: the same course's name, quantity, or date does not match between the course offering plan and the scheduling table. Cause: the two materials are maintained separately, and field alignment and version synchronization were not done at entry time.
- Symptom: the course selection rules have been updated, but the scheduling table still references the old version of the admission conditions. Cause: the versions were not synchronized, so retrieval and recall hit the old chunks, and the candidates are inconsistent with the current definitions.
- Symptom: the progress table totals do not match the statistical definition notes, and exceptions are not clearly written. Cause: signatures or receipts are missing, and the record count and statistical count do not use a unified definition in the header.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare the candidates and scores, then toggle rerank to see the ordering of the top few results; switch `searchMode` to check the recall channels, adjust `similarity` and `limit` to see filtering and trimming, and separately record the length of the reference array.

Business test: use one week of records to check the totals, see whether the definitions and exceptions are clearly written, and check whether the names, quantities, dates, and signature receipts of the course offering plan, scheduling table, and course selection rules are consistent.

- In the knowledge base search test, switch `searchMode`, compare the candidate chunks and similarity scores under the semantic, full-text, and hybrid modes, and record the number of candidates.
- Run once each with `usingReRank` enabled and disabled, compare the ordering of the top few results; adjust `similarity` and `limit`, check the tokens of the reference text, and record the array length separately.
