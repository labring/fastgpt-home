---
title: Permissions and Data Isolation for Kindergarten Operations and Quality Self-Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c006-f013
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Permissions | Checks
meta_description: Kindergarten Quality: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Kindergarten Operations and Quality Self-Assessment: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on kindergarten operation behavior and quality self-assessment. The materials come from three types of texts: self-assessment reports, issue lists, and rectification plans. They are updated by semester or assessment cycle, and the fields include object name, quantity, date, signature, and receipt. The self-assessment report carries the overall conclusion and indicator scores, the issue list records pending items one by one, and the rectification plan corresponds to measures, responsible persons, and deadlines. After these three types of materials enter the file-level permission system, each acts as an independent file constrained by member read permissions: self-assessment reports and rectification plans often require multiple people to collaborate on verification, while issue lists are split by item to different members. During version iterations, materials are prone to mismatches in the same record name, quantity, or date, or unsynchronized versions, missing signatures and receipts, requiring field-by-field comparison within the visible file set to locate discrepancies.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the visible file set filtered by member. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions; system root and team owners are regarded as having all file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Whether fields, dates, and signatures are consistent with the issue list | Use a restricted member account to view the list and details, verify the indicator names, quantities, dates, and signature fields in the report, and mark fields that do not match the issue list |
| Issue list | Whether the same record name, quantity, and date are consistent across the two materials | Confirm the member's visible scope by `teamId` and `tmbId`, compare the object names, quantities, and dates in the issue list and rectification plan one by one, and record discrepancy items |
| Rectification plan | Whether versions are synchronized and whether signatures or receipts are missing | Search for the same issue keyword, verify the rectification plan version number and receipt attachments, confirm whether the signature field and receipt are complete, and include missing items in the discrepancy list |
| File-level permissions | Deletion is limited to the creator; collaborator deletion should be filtered and prompted | Use a collaborator account to attempt deleting a file not created by them, observe whether it is filtered and prompted, and confirm the deletion permission boundary |

## Three common errors

- Phenomenon: restricted members saw files they should not see. Cause: file-level permissions were not filtered member by member, and the list did not return readable files for the current member.
- Phenomenon: the same record's name, quantity, and date do not match between the self-assessment report and the issue list. Cause: the two materials' versions were not synchronized, and field updates were not synchronized.
- Phenomenon: the rectification plan lacks signatures or receipts. Cause: the material circulation step did not verify the signature field and receipt attachments, and discrepancies were not located.

## How to verify the setup

This feature acceptance: use a restricted account to view the list and perform one retrieval, verify the visible scope, and confirm that unauthorized files do not occupy a place and are not recalled.

Business test: use one real record to find fields inconsistent with the ledger, record name, quantity, or date discrepancies, and submit them to the reviewer for confirmation.

- Verify the member's visible file set by `teamId` and `tmbId`, and compare the names, quantities, dates, and signatures of the self-assessment report, issue list, and rectification plan one by one.
- Use a collaborator account to attempt deleting a file not created by them, confirm it is filtered and prompted; use a restricted account to search for the same issue, and confirm that unauthorized files are not recalled.
