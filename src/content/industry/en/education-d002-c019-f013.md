---
title: Permissions and Data Isolation for Course Selection, Timetables and Classroom Allocation: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c019-f013
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Permissions | Checks
meta_description: Course Scheduling: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Course Selection, Timetables and Classroom Allocation: Compare Documents and Locate Differences

## What this category's data looks like

In the course selection, scheduling, and classroom resource allocation scenario, materials fall into three categories: course offering plans, scheduling tables, and course selection rules. Course offering plans carry course names, offering units, semesters, and signatures; scheduling tables carry classes, classrooms, week numbers, and period numbers; course selection rules carry selection capacity, priorities, and receipts. The three enter in batches by semester and round; course offering plans are finalized first, scheduling tables are updated on a rolling basis as classroom resources are adjusted, and course selection rules are finalized before course selection opens. Field characteristics center on object names, quantities, dates, and signature fields; the same course should keep its course code, number of classes, and start and end dates consistent across the three materials. After the materials enter this feature, course offering plans and course selection rules serve as the baseline ledger, and scheduling tables serve as the materials to be verified; after field-by-field comparison, a discrepancy list is formed, handed to the reviewer for confirmation, and written back.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is enforced by member permissions and file-level permissions (server-side authentication), and outputs the set of visible files filtered by member. The discrepancy list is then completed by subsequent AI nodes, code nodes, or manual work; file lists and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions, and deletion is limited to the creator.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether fields, dates, and signatures are consistent with the scheduling table | Use a restricted member account to view the file list and details, and check the course code, number of classes, start and end dates, and signature field |
| Scheduling table | Whether the name, quantity, and date of the same record match across the two materials | Use `teamId` to locate files within the team, and compare classrooms, week numbers, and period numbers with the course offering plan one by one |
| Course selection rules | Whether versions are synchronized, and whether signatures or receipts are missing | Use `tmbId` to check the collaborator scope, and confirm that the rule version and receipts are complete |
| Retrieval entry | Whether unauthorized files are recalled | Use a restricted member account to search the same question, and check that the returned set is consistent with the visible file set |

## Three common errors

- Symptom: a restricted member saw files they should not see. Cause: file-level permissions were not filtered member by member, and lists and details were not validated by both knowledge base read permission and file read permission.
- Symptom: retrieval recalled unauthorized files. Cause: the workflow did not authenticate by member identity, and the preselected knowledge base scenario did not perform file-level filtering, still recalling by knowledge base permission.
- Symptom: the name, quantity, and date of the same course do not match between the course offering plan and the scheduling table. Cause: versions were not synchronized, or the baseline ledger was not written back after the scheduling table was updated, and signatures and receipts are missing.

## How to verify the setup

Feature acceptance: use a restricted account to view the list and perform one retrieval, and check that the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: use one real record to find fields inconsistent with the ledger, and record discrepancies in course code, number of classes, dates, and signatures.

- Check the file collaborator configuration by `teamId` and `tmbId`, and confirm that the restricted member holds only read permission for the target files.
- Compare the name, quantity, date, and signature of course offering plans, scheduling tables, and course selection rules field by field, form a discrepancy list, hand it to the reviewer for confirmation, and write it back.
