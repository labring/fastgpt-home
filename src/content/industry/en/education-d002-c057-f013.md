---
title: Permissions and Data Isolation for National Key Research and Development Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c057-f013
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Permissions | Checks
meta_description: National R&D Grants: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for National Key Research and Development Applications: Compare Documents and Locate Differences

## What this category's data looks like

National Key R&D Program project applications involve three types of materials: the project application form, the budget application form, and the cooperation agreement. Their sources are exports from the application system and offline signed scans, and their update cadence rolls with the application milestones. Field characteristics center on project name, undertaking unit, principal investigator, budget subject amounts, start and end dates, signatures, and receipts. The project application form carries the technical route and assessment indicators, the budget application form carries the subjects and amounts, and the cooperation agreement carries the division of labor and signatures/seals. After the three types of materials enter the same knowledge base, visible files are filtered member by member, and material verification and discrepancy localization are carried out within each member's own readable scope, avoiding unauthorized viewing.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This part is enforced by member permissions and file-level permissions (server-side authentication), and outputs the set of visible files filtered by member. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Viewing the list and details requires knowledge base read permission plus file read permission, deletion is limited to the creator, and retrieval is filtered by the current member's readable files and only takes effect when authenticated by member identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Name, quantity, dates, and signatures must be consistent with the budget application form and the cooperation agreement | Use a restricted member account to view the list and details, and verify the file's read permission scope |
| Budget application form | Budget subject amounts and start and end dates must be consistent with the project application form and the cooperation agreement | Use a collaborator account to attempt deletion; it should be filtered and prompted, confirming that deletion is limited to the creator |
| Cooperation agreement | Undertaking unit, principal investigator, signatures, and receipts must be consistent with the project application form | Use a restricted member account to search the same question, confirming that unauthorized files will not be recalled |
| Member permissions and file-level permissions | Visible files are filtered member by member, and retrieval only takes effect when authenticated by member identity | Verify the authentication configuration of the workflow and nodes, and verify the member identity of `teamId` and `tmbId` |

## Three common errors

- Symptom: a restricted member saw files they should not see. Cause: file-level permissions were not filtered member by member, and the list was not returned according to the current member's readable scope.
- Symptom: the name, quantity, and dates of the same record do not match across two materials. Cause: versions were not synchronized, and the ledger was not written back after the materials were updated.
- Symptom: the cooperation agreement lacks a signature or receipt. Cause: the signing process was not closed-loop, and the receipt was not archived together with the materials.

## How to verify the setup

Acceptance of this feature: use a restricted account to view the list and perform one retrieval, and verify whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: use one real record to find a field inconsistent with the ledger, and verify the member identity and authentication configuration corresponding to `teamId` and `tmbId`.

- Use a restricted member account to view the file list and details, and verify the return scope of the list and retrieval when that member has read permission for only a single file.
- Use a collaborator account to attempt to delete a file, confirm that non-creator items are filtered and prompted, and then verify the authentication configuration of the workflow and nodes.
