---
title: Citations and Source Traceability for School Timetables and After-School Scheduling: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c010-f010
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Citations | Review
meta_description: School Timetables: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Timetables and After-School Scheduling: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on primary and secondary school timetable and after-school service scheduling scenarios. The source materials are the master timetable exported from the academic affairs system, the teacher assignment table, the after-school service project table, as well as the paper signature pages and receipts submitted by grade groups. The master timetable records class, period, week, and course name; the teacher assignment table records teacher, subject, assigned classes, and weekly class hours; the after-school service project table records project name, number of participants, venue, and start and end dates. The three types of materials are updated weekly. When there are schedule adjustments, substitute teaching, or project changes, new versions are generated; old versions are retained but are not used as the current basis. When the materials enter the knowledge base retrieval node, each serves as an independent citation source for subsequent comparison of fields, dates, and signature status, forming an exception list and review conclusions.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents. Each entry contains the original text fragment and source identifier, and the length can be 0. The exception list and review conclusions are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Whether class, period, week, course name, and signature column are complete, and whether the date corresponds to the current week | Check the selected knowledge base collection and vector model; use `responseData` (non-streaming module results returned with detailed output enabled) to view the number of entries in the citation array, and trace each one back to the original paragraph |
| Teacher assignment table | Whether teacher, subject, assigned classes, weekly class hours, and signature or receipt are consistent with the master timetable | Compare with the search parameter panel, confirm that `quoteMaxToken` is the citation content budget, and record the number of array entries separately |
| After-school service project table | Whether project name, number of participants, venue, start and end dates, and receipt match the master timetable and assignment table | Open the citation marker and check whether the source identifier in `quoteList` can be traced back to the original material |
| Exception list and review conclusions | Whether each exception is supported by original records, and whether the reviewer has signed | Run a test with a question that has no matching material, and confirm that the citation array is empty while the output chain continues |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the master timetable and the after-school service project table. Cause: The two tables are maintained separately, without field-level comparison and version synchronization.
- Symptom: The teacher assignment table has been updated, but the master timetable is still the old version, and the cited fragment is inconsistent with the current material. Cause: The versions are not synchronized, and retrieval hits the old material without verifying the object hit in this round.
- Symptom: The exception list lacks a signature or receipt and cannot be handed to the responsible person for handling. Cause: The paper signature page has not been returned, and the review conclusion is not supported by original records.

## How to verify the setup

Acceptance of this feature: Ask a course or after-school service question that has original text support, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain runs through.

Business test: Create an exception record, see whether it can be traced to the source material, and check the fields, dates, and signatures of the master timetable, teacher assignment table, and after-school service project table.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirm that `quoteMaxToken` is consistent with the value in the knowledge base retrieval section; record the number of citations by array length, and do not compare it for equality with the budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
