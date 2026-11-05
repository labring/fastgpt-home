---
title: Permissions and Data Isolation for Research Budget Adjustments and Reimbursement: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c059-f013
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Permissions | Checks
meta_description: Research Finance: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Research Budget Adjustments and Reimbursement: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses material verification and discrepancy localization in research funding budget adjustments and reimbursements, involving three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications are submitted quarterly by project leaders, reimbursement forms are entered in batches by handlers, and contract invoices are archived by procurement or finance according to contract milestones. After the materials enter this feature, each assumes a field source role: budget adjustment applications provide budget subjects and adjustment amounts, reimbursement forms provide expense details and handling dates, and contract invoices provide contract numbers, invoice numbers, and invoice dates. Field characteristics include name, quantity, date, signature, and receipt; the update cadence is batch-based synchronization, and the version is based on the latest archive. During verification, these fields must be compared under the same object to locate entries inconsistent with the ledger.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is enforced by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions, and unauthorized files will not appear in the list or retrieval results.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Name, quantity, date, and signature must be consistent with the reimbursement form | Use a restricted member account to view the file list and details, and verify the fields and signature |
| Reimbursement form | The name, quantity, and date of the same record do not match across the two materials | Use a collaborator account to try deleting a file not created by the creator; it should be filtered and a prompt should appear |
| Contract invoice | Version not synchronized or missing signature or receipt | Use a restricted member account to search for the same issue and verify that unauthorized files are not recalled |
| File-level permissions | Visible files are filtered member by member | Verify the authentication configuration of the workflow and nodes, and confirm authentication is based on member identity |

## Three common errors

- Symptom: a restricted member saw files they should not see. Cause: file-level permissions were not filtered member by member, and the list and details were not returned according to read permissions.
- Symptom: retrieval recalled unauthorized files. Cause: the workflow was not authenticated by member identity, and retrieval was not filtered by the current member's readable files.
- Symptom: the name, quantity, and date of the same record do not match across the two materials. Cause: the version was not synchronized, the signature or receipt was missing, and no field comparison was performed.

## How to verify the setup

This feature's acceptance: use a restricted account to view the list and perform one retrieval, and verify the visible scope; confirm that the list and retrieval only return files readable by that member, that unauthorized files do not occupy a place and are not recalled, and record the authentication results of `teamId` and `tmbId`.

Business test: use one real record to find fields inconsistent with the ledger, and compare the name, quantity, date, and signature of that record in the budget adjustment application, reimbursement form, and contract invoice.

- Use a restricted member account to view the file list and details, and verify whether the visible file set is consistent with knowledge base read permission plus file read permission.
- Use a collaborator account to try deleting a file not created by the creator, confirm it is filtered and a prompt appears; then verify whether the workflow and nodes are authenticated by member identity.
