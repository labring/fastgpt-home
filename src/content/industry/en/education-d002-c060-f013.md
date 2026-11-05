---
title: Permissions and Data Isolation for Research Project Annual Progress and Acceptance: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c060-f013
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Permissions | Checks
meta_description: Research Progress: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Research Project Annual Progress and Acceptance: Compare Documents and Locate Differences

## What this category's data looks like

In the scenario of annual progress and acceptance of research projects, materials usually include three types: annual progress reports, mid-term review materials, and acceptance reports. The sources are periodic submission by the project team and aggregation and archiving by the management department. The update rhythm is annual filing, mid-term supplementation, and centralized revision before acceptance. Field characteristics center on project name, responsible person, funding amount, start and end dates, signatures, and receipts. When entering this function, the annual progress report serves as the stage baseline, the mid-term review materials serve as the discrepancy comparison object, and the acceptance report serves as the final draft verification object. The three are associated by the same project number and are used for material verification and discrepancy localization.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), and outputs the set of visible files filtered by member. The discrepancy list is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member, and team administrators do not bypass file-level permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Project name, funding amount, and start and end dates must be consistent with the ledger, and signatures and receipts must be complete | Use a restricted member account to view the list and details, and verify the fields and signatures |
| Mid-term review materials | The name, quantity, and date of the same record are consistent with the annual progress report, and the version has been synchronized | After filtering by `teamId` and `tmbId`, retrieve the same issue and compare the fields |
| Acceptance report | The final draft fields are consistent with the mid-term review materials, and items missing signatures or receipts are marked | Use a collaborator account to attempt to delete a file not created by the user, and confirm that it is filtered and a prompt is shown |
| File-level permissions | Viewing the list and details requires knowledge base read permission plus file read permission; deletion is limited to the creator | Verify the authentication configuration of the workflow and nodes, and confirm authentication is performed by member identity |

## Three common errors

- Symptom: a restricted member saw files they should not see. Cause: file-level permissions were not filtered item by item by member, and the list was not returned as the readable set.
- Symptom: retrieval recalled unauthorized files. Cause: the workflow was not authenticated by member identity, and knowledge base retrieval was not filtered by readable files.
- Symptom: the name, quantity, and date of the same record do not match across the two materials. Cause: the version was not synchronized, and missing signatures or receipts were not marked.

## How to verify the setup

This function acceptance: use a restricted account to view the list and retrieve once, and verify that the visible scope contains only files readable by that member, and that unauthorized files do not occupy a place or are not recalled.

Business test: use one real record to find fields inconsistent with the ledger, form a discrepancy list, submit it to the reviewer for confirmation, and write it back.

- Verify the set of files visible to the member by `teamId` and `tmbId`, and confirm that the list and details are filtered by read permission.
- Verify the authentication configuration of the workflow and nodes, and confirm that retrieval is recalled only after authentication by the current member identity.
