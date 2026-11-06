---
title: Permissions and Data Isolation for School Enrollment Records and Status Changes: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c007-f013
page_type: 行业问题页
application_area: education
meta_title: School Enrollment | Permissions | Checks
meta_description: School Enrollment: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for School Enrollment Records and Status Changes: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of student enrollment establishment and changes in primary and secondary schools. Materials come from three categories: student enrollment records, transfer applications, and suspension/resumption materials. The update rhythm rolls forward with enrollment establishment at the start of the semester, mid-semester transfers, and suspension/resumption approvals. Field characteristics center on student name, ID document number, class, change date, approval signature, and receipt number. When materials enter this feature, student enrollment records serve as the baseline ledger, while transfer applications and suspension/resumption materials serve as copies to be verified. The three are stored within the same knowledge base at file granularity, and each material retains its own creator and collaborator relationships for subsequent discrepancy localization and permission isolation.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions, and restricted members can only see files they can read.

| Object | Check | Verification action |
| --- | --- | --- |
| Student enrollment records | The same student's name, class, and enrollment establishment date are consistent between the records and the ledger, and signatures and receipts are complete | Use a member account to view the list and details, and check the record fields against the ledger item by item |
| Transfer applications | The transfer-out and transfer-in dates, name, and number of people are consistent with the student enrollment records, the version is the latest, and no signatures are missing | Use a restricted member account to search for the same student and confirm that unauthorized files are not recalled |
| Suspension/resumption materials | The suspension start and end dates and resumption date are consistent with the record, and the receipt number can be matched | Use a collaborator account to attempt to delete a file not created by oneself; it should be filtered and a prompt should appear |
| File-level permissions | Filter item by item by member; viewing requires knowledge base read permission plus file read permission, and deletion is limited to the creator | Check the authentication configuration of the workflow and nodes to confirm that authentication by member identity takes effect |

## Three common errors

- Symptom: a restricted member saw a transfer application they should not see. Cause: file-level permissions were not filtered item by item by member, or the workflow was not authenticated by member identity.
- Symptom: retrieval recalled unauthorized suspension/resumption materials. Cause: retrieval was not filtered by the current member's readable files, so unauthorized files were still recalled.
- Symptom: a collaborator could not delete a file and no prompt appeared. Cause: deletion is limited to the creator, collaborator write permission cannot delete, and during batch deletion non-creator items are filtered.

## How to verify the setup

Feature acceptance: use a restricted account to view the file list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: use one real record to find fields inconsistent with the ledger, record the name, quantity, or date discrepancy, and submit it to the reviewer for confirmation and write-back.

- Check member identity by `teamId` and `tmbId`, and confirm that the list and retrieval return the set of files readable by that member.
- Check the authentication configuration of the workflow and knowledge base search nodes, and confirm that file-level filtering is performed only after authentication by member identity.
