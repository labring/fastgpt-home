---
title: Reranking and Hybrid Retrieval for Course Selection, Timetables and Classroom Allocation: Find Supporting Evidence
slug: /en/industry/education-d001-c019-f018
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Reranking | Evidence
meta_description: Course Scheduling: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Course Selection, Timetables and Classroom Allocation: Find Supporting Evidence

## What this category's data looks like

This page addresses the category of course selection, scheduling, and classroom resource dispatch. The materials come from three types of current texts and their signed receipts: the course offering plan, the scheduling table, and the course selection rules. The course offering plan is updated by semester and includes course name, class, week number, and signature; the scheduling table is published weekly and includes classroom, time slot, teacher, and date; the course selection rules are revised by academic year and include selection conditions, capacity, and receipt. When these three enter the business basis query, their roles differ: the course offering plan and course selection rules serve as basis sources and participate in hybrid retrieval, while the scheduling table serves as an item carrier that can point back to the original text, for checking fields, dates, and signatures item by item when replying to parents or writing into a plan, and for identifying whether the name, quantity, and date of the same record match across the two materials, whether versions are synchronized, and whether signatures or receipts are missing.

## Configuration and implementation checks

This step is performed by the reranking model in the retrieval service, which outputs the sorted candidates and rerank scores. "Basis items that can point back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously goes through the vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be applied directly; usually the reranking model is then used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Fields include course name, class, week number, and signature; the date must fall within the current version | Check whether the course name and week number are consistent with the scheduling table, check whether the signature column is complete, and record the number of candidates and scores |
| Scheduling table | Fields include classroom, time slot, teacher, and date, and must match the course offering plan | Compare the classroom and date of the same record, confirm that when versions are not synchronized the current version prevails, and view the order before and after reranking |
| Course selection rules | Fields include selection conditions, capacity, and receipt, and there must be a receipt or signature | Check whether the capacity and selection conditions are consistent with the course offering plan, check whether the receipt is missing, and use `usingReRank` to confirm that reranking has participated |
| Hybrid retrieval candidates | The two result paths have been merged, and candidates come from vector and full-text | In the search parameters, check `searchMode`, `similarity`, and `limit`, and confirm that the number of candidates and scores can be used for filtering |

## Three common errors

- Symptom: The name or quantity of the same course does not match across the two materials. Cause: The course offering plan and scheduling table are not synchronized to the same version, and fields are not checked item by item.
- Symptom: The date in the scheduling table is inconsistent with the week number in the course offering plan. Cause: Versions are not synchronized, and old-version materials are still hit by retrieval and enter the candidates.
- Symptom: Course selection rules lacking a signature or receipt are still treated as basis. Cause: When materials enter retrieval, receipts are not checked, and citation trimming does not remove items missing signatures.

## How to verify the setup

For this feature's acceptance: turn reranking on and compare the order and scores of the first three items before and after, confirm that the reranking model filters by score, and that the number of candidates and scores can be recorded.

Business test: ask a cross-material basis question and see whether the answer gives a citation that can point back.

- In the search parameters, check `searchMode`, `similarity`, `limit`, and `usingReRank`, and confirm that both paths are enabled and reranking is bound.
- Compare the name, quantity, date, and signature of the course offering plan, scheduling table, and course selection rules item by item, and record the number of candidates and rerank scores.
