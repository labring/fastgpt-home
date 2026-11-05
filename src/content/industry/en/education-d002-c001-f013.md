---
title: Permissions and Data Isolation for Daily Kindergarten Care Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c001-f013
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Permissions | Checks
meta_description: Kindergarten Care: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Daily Kindergarten Care Management: Compare Documents and Locate Differences

## What this category's data looks like

Kindergarten childcare daily life management involves three types of materials: the daily life schedule, morning and afternoon check records, and child health observation records. The schedule is compiled weekly by the head of childcare and education, the morning and afternoon check records are filled in by the lead teacher every half day, and the health observation records are supplemented by the health worker as needed. All three types of materials contain fields such as child name, class, date, observation or activity item, quantity or count, and signature or receipt, and the update cadence is daily updates and weekly updates in parallel. When entering this function, the schedule serves as the baseline ledger, and the morning and afternoon check records and health observation records serve as the materials to be verified, compared field by field by the same child and the same date, locating discrepancies in name, quantity, date, and signature, forming a discrepancy list and handing it to the reviewer for confirmation and write-back.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. The set is filtered by the files readable item by item by member, and both the list and retrieval are based on this set.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Compare with the morning and afternoon check records and health observation records for the activity item, date, and signature of the same child on the same date | Use a restricted member account to view the list and details, and check whether file-level read permission returns only readable files |
| Morning and afternoon check records | Compare with the schedule for child name, class, date, number of check items, and teacher signature | Use a collaborator account to try deleting this record, and confirm that only the creator can delete it and that items from non-creators are filtered out with a prompt |
| Child health observation records | Compare with the schedule and morning and afternoon check records for observation item, count, date, and health worker signature or receipt | Use a restricted member account to search the same question, and confirm that unauthorized files are not recalled |
| File-level permission configuration | When authenticating by member identity, retrieval is filtered by readable files; if a workflow preselects a knowledge base without authenticating by member identity, file-level filtering is not performed | Check the authentication configuration of the workflow and nodes, and record `teamId`, `tmbId`, and member identity |

## Three common errors

- Symptom: a restricted member sees files in the list that they should not see. Cause: file-level permissions are not filtered item by item by member, or the list is not returned according to the current member's readable set.
- Symptom: retrieval recalls unauthorized files. Cause: the workflow preselects a knowledge base and does not authenticate by member identity, so retrieval is not filtered by readable files.
- Symptom: the name, quantity, and date of the same record do not match between the schedule and the morning and afternoon check records. Cause: versions are not synchronized, signatures or receipts are missing, and discrepancies are not written back.

## How to verify the setup

This function's acceptance: use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: use one real record to find fields inconsistent with the ledger, record the discrepancy list, and hand it to the reviewer for confirmation and write-back.

- Use a restricted member account to view the list and details, and check whether file read permission returns only files readable by that member.
- Use a collaborator account to try deleting a file, and confirm that only the creator can delete it, and that items from non-creators are filtered out with a prompt.
