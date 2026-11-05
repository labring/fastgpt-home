---
title: Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c019-f015
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Retrieval | Intake
meta_description: Course Scheduling: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information

## What this category's data looks like

In the course selection, scheduling, and classroom resource scheduling scenario, materials mainly come from three categories: course offering plans, scheduling tables, and course selection rules. Course offering plans provide the course name, credits, week range, and instructor; scheduling tables record the class, classroom, period, and date; course selection rules describe the selection batch, capacity, and adjustment conditions. These materials enter the knowledge base in the form of tables, notices, and attachments, and their update cadence follows the semester cycle and academic affairs adjustments, with fields commonly including course name, course code, classroom number, date, and signature column. After entering the knowledge base retrieval and recall function, course offering plans carry the course scope and rule basis, scheduling tables carry spatiotemporal occupancy and conflict determination, and course selection rules carry the boundary conditions for intake and follow-up questions; together the three support intake records and the items to be completed, and during missing-item follow-up it is necessary to return to the corresponding materials to verify fields and versions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). Intake records and the items to be completed are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Check whether the course name, course code, credits, and week range are consistent with the scheduling table, and whether the signature column is complete | In the knowledge base search test, retrieve with synonymous questions, record the number of candidates and the scores, and check the fields in the hit chunks |
| Scheduling table | Check whether the classroom number, period, date, and class correspond to the course offering plan, and whether the version is in sync | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether the candidates include both types of results |
| Course selection rules | Check whether the selection batch, capacity, and adjustment conditions match the intake question items, and whether the receipt or signature is missing | Compare the ranking of the top few results before and after enabling `usingReRank`, and record `similarity` and the number of candidates |
| Intake records and the items to be completed | Check whether missing items are identified and followed up, and whether the answer cites chunks from the course offering plan, scheduling table, or course selection rules | View the tokens of the cited text and the array length, record them separately, and do not compare `limit` with the number of citations for equality |

## Three common errors

- Symptom: the name or code of the same course does not match between the course offering plan and the scheduling table. Cause: the two materials' versions are not in sync, or the same field convention was not used for verification during entry.
- Symptom: the capacity and dates in the scheduling table and the course selection rules are inconsistent. Cause: after adjustment only one place was updated, while the other still retains the old version, lacking signature or receipt confirmation.
- Symptom: there are many candidates but the ones ranked at the front are irrelevant, and the answer lacks key paragraphs. Cause: the retrieval mode does not match the material form, or rerank and similarity filtering were not enabled.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few results; record the number of candidates and `similarity`, and check the impact of `searchMode` and `usingReRank`.

Business test: ask a question missing key information, see whether it first follows up before answering, and check whether the answer cites chunks from the course offering plan, scheduling table, or course selection rules.

- In the knowledge base search test, switch the retrieval mode, compare candidate chunks and similarity scores, and confirm that the material form matches the mode.
- Check the names, quantities, dates, and signatures of the course offering plan, scheduling table, and course selection rules; if inconsistencies are found, first verify the hits and associations, then transfer to the responsible person for handling.
