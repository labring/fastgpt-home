---
title: Permissions and Data Isolation for Grade Entry and Credit Recognition: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c020-f013
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Permissions | Checks
meta_description: Grades and Credits: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Grade Entry and Credit Recognition: Compare Documents and Locate Differences

## What this category's data looks like

In the grade entry and credit recognition scenario, materials come from grade sheets, deferred exam application forms, and makeup exam schedules exported from the academic affairs system, usually updated by semester batch, with fields including course name, credits, grade, exam date, signature, and receipt. Grade sheets record students' final grades and credits, deferred exam applications record the reason for deferral and approval signature, and makeup exam schedules record makeup exam time and exam room. After these three types of materials enter the file-level permission system, each is subject to member permissions as an independent file, and members can only see files within their authorized scope; during material verification, the course name, credit count, and exam date of the same record in the grade sheet and makeup exam schedule must be compared item by item, and the completeness of signatures and receipts must also be checked, with discrepancy localization relying on accurate filtering of the visible file set.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the visible file set filtered by member. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions, and retrieval only takes effect when authenticated by member identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Grade sheet | Course name, credit count, and exam date are consistent item by item with the deferred exam application and makeup exam schedule, and signatures and receipts are complete | Use a restricted member account to view the file list and details, check whether the grade sheet fields are consistent with the ledger, and record discrepant fields |
| Deferred exam application | Application date and approval signature are consistent with the grade sheet record, and the receipt is not missing | Try to delete this file with a collaborator account; it should be filtered and a prompt shown; check the date and signature of the application form against the grade sheet |
| Makeup exam schedule | Makeup exam time and exam room match the course name, count, and date in the grade sheet and deferred exam application | Use a restricted member account to search for the same course, and check whether unauthorized files are recalled; check discrepancies between the makeup exam schedule and the ledger |
| File-level permission | Viewing the list and details requires knowledge base read permission plus file read permission; deletion is limited to the creator | Check `teamId`, `tmbId`, and collaborator configuration, and confirm that the workflow and nodes authenticate by member identity |

## Three common errors

- Symptom: The course name, credit count, and exam date of the same record do not match between the grade sheet and the makeup exam schedule. Cause: Material versions are not synchronized, or field mapping is misaligned during entry, and discrepancies are not localized before review.
- Symptom: The deferred exam application lacks an approval signature or receipt, yet the grade sheet has already recognized credits. Cause: The signature step is not closed-loop, completeness is not validated when materials enter the system, and the discrepancy list omits this field.
- Symptom: Restricted members see files they should not see, and retrieval recalls unauthorized files. Cause: File-level permissions are not filtered item by item by member, or the workflow does not authenticate by member identity.

## How to verify the setup

Acceptance of this feature: Use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: Use one real record to find fields inconsistent with the ledger, record name, count, and date discrepancies, and hand them to the reviewer for confirmation and write-back.

- Use a restricted member account to view the file list and details, check `teamId`, `tmbId`, and collaborator configuration, and confirm the visible set is correct.
- Use a collaborator account to try deleting a file; it should be filtered and a prompt shown; check the authentication configuration of the workflow and nodes to ensure retrieval is filtered by member identity.
