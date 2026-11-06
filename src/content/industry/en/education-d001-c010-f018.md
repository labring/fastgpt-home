---
title: Reranking and Hybrid Retrieval for School Timetables and After-School Scheduling: Find Supporting Evidence
slug: /en/industry/education-d001-c010-f018
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Reranking | Evidence
meta_description: School Timetables: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for School Timetables and After-School Scheduling: Find Supporting Evidence

## What this category's data looks like

This page is for primary and secondary school timetable and after-school service scheduling scenarios. Materials include the master timetable, teacher assignment table, and after-school service project table. The master timetable records class, period, week, and teacher name; the teacher assignment table records teacher, subject, class, and weekly lesson hours; the after-school service project table records project name, participating classes, week, and venue. The three types of materials are usually updated by semester or by school month, and fields include date, signature, and receipt columns. When entering this function, the master timetable serves as the main table providing the class-period skeleton, the teacher assignment table serves as the basis for teachers and subjects, and the after-school service project table serves as the basis for after-school time slots and projects; together they form the source of evidence items that can be traced back to the original text, for item-by-item verification when replying to parents or writing into proposals.

## Configuration and implementation checks

This step is performed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. The evidence items that can be traced back to the original text are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs both vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be directly applied, so the reranking model is usually used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Whether class, period, week, teacher name, and date signature are consistent with the current version | Check the master timetable fields and signature column, and compare the teacher name and week for the same class and same period in the teacher assignment table |
| Teacher assignment table | Whether teacher, subject, class, weekly lesson hours, and signature receipt match the master timetable | Check the assignment table fields and receipt, and compare whether the name, quantity, and date of the same record in the master timetable are consistent |
| After-school service project table | Whether project name, participating classes, week, venue, and signature receipt are consistent with the after-school time slots in the master timetable | Check the project table fields and receipt, and compare the classes and weeks of the same record in the after-school time slots of the master timetable |
| Reranking and hybrid retrieval | Both vector and full-text paths are enabled and merged, and the reranking model is bound and used for sorting and filtering | Check the switches for both paths and `searchMode` in the search parameters, compare the number of candidates and scores before and after reranking, and check `usingReRank` and `limit` |

## Three common errors

- Symptom: The teacher name for the same class and same period does not match between the master timetable and the teacher assignment table. Cause: The two materials are updated on different schedules, and the assignment table was not revised in sync with the master timetable.
- Symptom: The week in the after-school service project table is inconsistent with the week of the after-school time slot in the master timetable. Cause: The project table is updated by school month while the master timetable is updated by semester, and the versions are not synchronized.
- Symptom: Materials lack signatures or receipts, and evidence items cannot be traced back to the original text. Cause: The signature and receipt columns were not completed along with the material updates.

## How to verify the setup

Acceptance for this function: compare the order and scores of the top three items before and after enabling reranking, check the number of candidates and rerank scores, and check the values of `searchMode`, `usingReRank`, `limit`, and `similarity`.

Business test: ask a cross-material evidence question, see whether the answer provides traceable sources, and check that the tokens of the cited text and the number of array items are recorded separately.

- Check the fields, dates, and signatures of the master timetable, teacher assignment table, and after-school service project table, and mark records where names, quantities, or dates do not match.
- Check the switches for both vector and full-text paths and `searchMode` in the search parameters, compare the number of candidates and scores before and after reranking, and check `usingReRank` and `limit`.
