---
title: Permissions and Data Isolation for Enrollment Changes and Graduation Eligibility: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c021-f013
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Permissions | Checks
meta_description: Graduation Eligibility: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Enrollment Changes and Graduation Eligibility: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy localization in student status changes and graduation eligibility review. Category materials include leave/resumption applications, major transfer applications, and graduation review checklists. Sources are academic affairs system exports, scanned copies submitted by departments, and ledger registration forms. The update cadence follows semester batches and change acceptance milestones. Leave/resumption applications mainly consist of approval forms and receipts; major transfer applications include preference forms and transcripts; graduation review checklists are linked to training programs and credit records. After these three types of materials enter this feature, they serve respectively as objects to be verified, reference baselines, and summary ledgers, used to compare the name, quantity, date, and signature of the same record, locate discrepancy fields, and form a discrepancy list, which is written back after confirmation by the reviewer.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is enforced by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. The file list and retrieval return results only within this set, and team administrators do not bypass file-level permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave/resumption application | Whether the name, student ID, leave/resumption start and end dates, and signature on the approval form and receipt are consistent | Use a restricted member account to view the list and details, compare field by field, and mark missing signatures or receipt items |
| Major transfer application | Whether the name, course quantity, grade date, and review signature on the preference form and transcript are consistent | Filter visible files by `teamId` and `tmbId`, then search for the same student record and check the version and date |
| Graduation review checklist | Whether the course names, credit quantities, and graduation conclusion dates on the checklist and ledger match | Use a collaborator account to attempt to delete a file not created by the user, confirm it is filtered and prompted, then write back the discrepancy fields |
| File-level permissions | Viewing the list and details requires knowledge base read permission plus file read permission; deletion is limited to the creator | Use a restricted member account to search the same question and confirm that unauthorized files are not recalled |

## Three common errors

- Symptom: A restricted member sees change materials in the list that they should not see. Cause: File-level permissions are not filtered item by item by member, and the list is not returned as a readable set.
- Symptom: Retrieval recalls unauthorized files, and the discrepancy list is mixed with irrelevant records. Cause: Retrieval is not filtered by the current member's readable files, or authentication is not performed by member identity.
- Symptom: The name, quantity, and date of the same record do not match between the application and the ledger. Cause: Versions are not synchronized, signatures or receipts are missing, and discrepancy fields are not located during verification.

## How to verify the setup

This feature's acceptance: Use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: Use a real record to find a field inconsistent with the ledger, write it into the discrepancy list, and write it back after confirmation by the reviewer.

- Check the member's visible file set by `teamId` and `tmbId`, and confirm that the list and retrieval return consistently
- Compare the name, quantity, date, and signature item by item for leave/resumption applications, major transfer applications, and graduation review checklists, and record discrepancy fields
