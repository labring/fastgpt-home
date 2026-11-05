---
title: Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c019-f015
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Retrieval | Versions
meta_description: Course Scheduling: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the course selection, scheduling, and classroom resource allocation scenario. Material sources include course offering plans, scheduling tables, course selection rules, classroom resource ledgers, and change notices. Course offering plans use course name, course code, credits, week numbers, and instructor signature as fields, and are used to determine the semester's course supply; scheduling tables use course code, class, classroom number, day and period, and start and end weeks as fields, and are used to implement time and space occupancy; course selection rules use selection batch, capacity, priority, add/drop deadline, and approval receipt as fields, and are used to constrain student course selection behavior. When the materials enter the knowledge base retrieval and recall function, course offering plans carry the course identity and credit basis, scheduling tables carry the time-space occupancy basis, course selection rules carry the capacity and process basis, classroom resource ledgers carry the classroom attribute and capacity basis, and change notices carry version difference clues. The update rhythm is triggered by semester, batch, and temporary schedule changes, and the field characteristics are multi-table intersection, date sensitivity, and the coexistence of signatures and receipts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, re-rank, filter, and upper-limit trimming). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Course name, course code, credits, week numbers, and instructor signature are consistent within the course offering plan, and the course code matches the scheduling table | In the search test, switch `searchMode` to semantic, full-text, or hybrid, and check whether the candidate chunks cover the course code and signature fields |
| Scheduling table | Course code, class, classroom number, day and period, and start and end weeks are consistent within the scheduling table, and match the capacity basis of the classroom resource ledger | Compare the order of the top few results before and after enabling re-rank, and see whether `usingReRank` places scheduling chunks with the same course code first |
| Course selection rules | Selection batch, capacity, priority, add/drop deadline, and approval receipt are consistent within the course selection rules, and match the dates in the change notices | Check the number of candidates and the scores, and use `similarity` to filter low-scoring chunks, confirming that the capacity and receipt fields are not truncated |
| Change notice | For the same course code, the name, quantity, and dates in the change notice are consistent with those in the course offering plan, scheduling table, and course selection rules, and the signature or receipt is complete | Use `limit` to observe the number of references, record the array length separately, and check whether the reference text tokens retain the change date and signature sentence |

## Three common errors

- Symptom: the course name or credits for the same course code do not match between the course offering plan and the scheduling table. Cause: the two materials are maintained separately, versions are not synchronized, and retrieval candidates each take one segment.
- Symptom: the capacity and add/drop deadline dates do not match between the scheduling table and the course selection rules. Cause: the change notice was not written back, the old version is still recalled, and reference synchronization is missing.
- Symptom: the course selection rules lack the approval signature or receipt field. Cause: the material has not completed the process, and retrieval only returns candidate chunks and cannot supply the authorization result.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-rank on and off to see the ordering of the top few results; record the number of candidates and scores, and check the returns under `searchMode`, `usingReRank`, `similarity`, and `limit`.

Business test: change one piece of content and see whether the version number and references are updated synchronously; if the sources do not match, first check hits and associations, then check the reference text tokens and array length.

- In the knowledge base search test, issue synonym questions separately for the course offering plan, scheduling table, and course selection rules, record the number of candidates and scores, and confirm that the current version is unique.
- Check the course code, capacity, dates, and signature receipt one by one against the change notice, confirm that the old version is traceable and references are synchronized, then decide whether to update the knowledge base or the external documents.
