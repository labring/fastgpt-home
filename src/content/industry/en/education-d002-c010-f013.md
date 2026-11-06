---
title: Permissions and Data Isolation for School Timetables and After-School Scheduling: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c010-f013
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Permissions | Checks
meta_description: School Timetables: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for School Timetables and After-School Scheduling: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses primary and secondary school timetable and after-school service scheduling scenarios. Materials come from three types of ledgers from the academic affairs office: the master timetable, the teacher assignment table, and the after-school service project table, typically updated on three rhythms: the start of the semester, the end of the month, and midterm. The master timetable records class, period, venue, and assigned teacher; the teacher assignment table records teacher, subject, class, and weekly class hours; the after-school service project table records project name, number of participants, start date, and end date. After these three types of materials enter this function, the master timetable serves as the baseline ledger, while the teacher assignment table and the after-school service project table serve as materials to be verified, comparing item by item whether the name, quantity, and date of the same object are consistent, and checking whether signatures and receipts are complete. Materials are isolated by file-level permissions; different members can only see the set of files they are authorized to see, and verification results are output in the form of a discrepancy list.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the visible file set filtered by member. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Member permissions and file-level permissions (server-side authentication) only output the visible file set filtered by member, and the discrepancy list must be continued by the file list and retrieval returning based on that set.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Check whether class, period, venue, assigned teacher, date, and signature are complete | Use the creator account to view the list and details, confirm that both knowledge base read permission and file read permission are present, and check the signature field and receipt |
| Teacher assignment table | Check whether the teacher, subject, class, and weekly class hours are consistent with the name, quantity, and date of the same record in the master timetable | Use a restricted member account to view the list, confirm that the visible scope contains only authorized files, and compare the weekly class hours item by item with the master timetable |
| After-school service project table | Check whether the project name, number of participants, start date, end date, and signature receipt are consistent with the ledger | Use a collaborator account to try deleting a file, confirm that only the creator can delete and that non-creator items are filtered and prompted, then check the project dates |
| File-level permission configuration | Check that viewing the list and details requires knowledge base read permission plus file read permission, deletion is limited to the creator, and retrieval is filtered by the current member's readable files | Check the authentication configuration of the workflow and nodes, confirm that unauthorized files are not recalled when authenticating by member identity, and check the ownership of `teamId` and `tmbId` |

## Three common errors

- Phenomenon: the same teacher is written as having sixteen weekly class hours in the assignment table, but fourteen in the master timetable. Cause: the two materials are maintained separately by different members, versions are not synchronized, and the quantity fields do not match.
- Phenomenon: the after-school service project table has project names and participant numbers, but lacks the responsible person's signature or receipt. Cause: signatures were not fully collected during the material circulation step, and no completeness check was done at archiving time.
- Phenomenon: restricted members saw files they should not see, and retrieval recalled unauthorized files. Cause: authentication was not performed by member identity, or file-level permissions were not enabled, and the list and retrieval were not filtered by the readable set.

## How to verify the setup

Acceptance of this function: use a restricted account to view the list and perform one retrieval, check whether the visible scope contains only authorized files, that unauthorized files do not occupy a place and are not recalled, and check the ownership of `teamId` and `tmbId`.

Business test: use one real record to find fields inconsistent with the ledger, compare the name, quantity, and date in the master timetable with the teacher assignment table or the after-school service project table, record the discrepancies, and submit them to the reviewer for confirmation and write-back.

- Use the creator account and the collaborator account to view the same file list and details respectively, confirm the difference between read permission and delete permission, and record the result that the collaborator's deletion is filtered and prompted.
- Check the authentication configuration of the workflow and nodes, confirm that when authenticating by member identity, retrieval is filtered by the current member's readable files, and check whether signatures and receipts are complete.
