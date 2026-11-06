---
title: Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c019-f015
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Retrieval | Checks
meta_description: Course Scheduling: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Course Selection, Timetables and Classroom Allocation: Compare Documents and Locate Differences

## What this category's data looks like

In course selection, scheduling, and classroom resource allocation scenarios, materials are mainly of three types: course offering plans, scheduling tables, and course selection rules. Sources are academic affairs system exports and department receipts. The update cadence advances by semester rounds. Fields cover course name, course code, class size, course start date, classroom number, instructor, signature field, and version number. Course offering plans carry the course and capacity baseline, scheduling tables carry time and space placement, and course selection rules carry course selection conditions and priorities. When the three types of materials enter knowledge base retrieval and recall, each serves as an independent fragment source, for subsequent nodes or humans to complete material verification and discrepancy localization based on candidate fragments and similarity scores, forming a discrepancy list and handing it to the reviewer for confirmation and write-back.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, re-rank, filter, and upper-limit trimming). The discrepancy list is then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Course name, course code, class size, course start date, and signature field are consistent across the two materials | In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, search once each with the same record name and code, record the number of candidates and scores, and compare the course name, class size, date, and signature between the course offering plan and the scheduling table |
| Scheduling table | Classroom number, class time period, week number, and version number are consistent across the two materials | Compare the classroom number, time period, and version number in the scheduling table and the course selection rules, view the order of the top few entries before and after enabling `usingReRank`, and confirm whether the candidate fragments include both semantic and full-text results |
| Course selection rules | Course selection conditions, priorities, effective date, and receipt are consistent across the two materials | Check the conditions, priorities, and effective date in the course selection rules and the course offering plan, record the number of returned references and the tokens of the reference text, record the array length separately, and do not compare the number of entries with the reference content budget as equal |
| Retrieval return | Candidate fragments and similarity scores cover the fields to be verified, and key fragments of the original text are retained after trimming | Test once each with synonym-rewritten questions, compare candidates and scores, and check whether key fragments such as course name, class size, date, and signature are still retained after similarity filtering and reference upper-limit trimming |

## Three common errors

- Symptom: The name, class size, or date of the same course does not match between the course offering plan and the scheduling table. Cause: The two materials are exported separately, field definitions are not aligned, and retrieval candidates do not cover the discrepancy fields.
- Symptom: The version numbers of the scheduling table and the course selection rules are inconsistent, and old-version fragments are still recalled. Cause: Material updates are not synchronized, old fragments in the knowledge base are not replaced, and retrieval returns old candidates by similarity.
- Symptom: The course offering plan or course selection rules lack a signature or receipt, and the discrepancy list cannot be closed. Cause: The signature is omitted in the material circulation step, retrieval candidates only present text fragments, and signature status requires manual verification.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking on and off to view the order of the top few entries.

Business test: use one real record to find fields inconsistent with the ledger.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, record the number of candidates and scores, and check the name, quantity, date, and signature in the course offering plan, scheduling table, and course selection rules
- Compare the order of the top few entries before and after enabling `usingReRank`, check the tokens of the reference text after similarity filtering and reference upper-limit trimming, record the array entry count separately, and hand the discrepancy fields to the reviewer for confirmation and write-back
