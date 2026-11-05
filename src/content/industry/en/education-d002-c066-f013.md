---
title: Permissions and Data Isolation for Initial Review of Academic Journal Submissions: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c066-f013
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Permissions | Checks
meta_description: Journal Submissions: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Initial Review of Academic Journal Submissions: Compare Documents and Locate Differences

## What this category's data looks like

The material verification and discrepancy location in the initial review of academic journal submissions revolves around three types of materials: submitted manuscripts, author information forms, and plagiarism check reports. Submitted manuscripts carry the main text and version date, author information forms carry signatures, affiliations, and order, and plagiarism check reports carry detection time and repetition rate text. The materials come from editorial system exports and email submissions, and the update rhythm changes with initial review rounds and revised manuscript returns. After entering file-level permissions, the three types of materials each become independent file objects. Field characteristics focus on name, quantity, date, and signed receipt. When the same record does not match across two materials, it is necessary to locate field by field, forming a discrepancy list for the reviewer to confirm and write back to the ledger.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting a visible file set filtered by member. The discrepancy list is subsequently completed by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions; the visible scope depends only on the member's collaborator configuration on the knowledge base and files.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Name, version date, and signed receipt must be consistent with the author information form and plagiarism check report | Use a restricted member account to view the list and details, and check whether the file's read permission only covers manuscripts that should be read; deletion is limited to the creator, and a collaborator's attempted deletion should be filtered and prompted |
| Author information form | Signature order, quantity, and affiliation names must be consistent with the submitted manuscript | Verify the authentication configuration of the workflow and nodes according to member identity, confirm that retrieval filters by the current member's readable files, and that unauthorized files are not recalled |
| Plagiarism check report | Detection date, repetition rate text, and receipt must be consistent with the ledger | Use one real record to compare two materials, find fields where name, quantity, or date do not match, and record them in the discrepancy list |
| Discrepancy list | Field-level discrepancies must be annotated one by one with source file and version | Before writing back to the ledger, submit to the reviewer for confirmation, and check the readable set corresponding to members via `teamId` and `tmbId` |

## Three common errors

- Phenomenon: A restricted member saw an author information form they should not see. Cause: File-level permissions were not filtered member by member, and the list and details did not simultaneously verify knowledge base read permission and file read permission.
- Phenomenon: Retrieval recalled an unauthorized plagiarism check report. Cause: The workflow was not authenticated by the current member identity, and the preselected knowledge base scenario did not perform file-level filtering, still recalling by knowledge base permissions.
- Phenomenon: The same manuscript's name, quantity, and date did not match across two materials. Cause: The version was not synchronized or the receipt lacked a signature, and the discrepancy was not located and written back to the ledger during the initial review stage.

## How to verify the setup

Acceptance of this feature: Use a restricted account to view the file list and perform one retrieval, and check whether the visible scope only contains files readable by that member, with unauthorized files not occupying a place and not being recalled.

Business test: Use one real record to find fields inconsistent with the ledger, record name, quantity, or date discrepancies, and submit to the reviewer for confirmation.

- Check member collaborator configuration via `teamId` and `tmbId`, and confirm that file read permission and knowledge base read permission take effect simultaneously
- Use a collaborator account to attempt file deletion, and confirm that only the creator can delete and non-creator items are filtered and prompted
