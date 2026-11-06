---
title: Permissions and Data Isolation for School Mental Health Screening and Referrals: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c015-f013
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Permissions | Checks
meta_description: Student Mental Health: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for School Mental Health Screening and Referrals: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy localization for the primary and secondary school mental health screening and referral category. Material sources include three types: psychological screening plans, interview records, and referral forms, which are updated periodically by psychological teachers, homeroom teachers, and referral recipients before screening, during interviews, and after referral, respectively. Field characteristics cover name, quantity, date, signature, and receipt. After entering this feature, the screening plan serves as the baseline ledger, while interview records and referral forms serve as materials to be verified, each mounted as files to the corresponding knowledge base, filtered item by item by member permissions for visible scope, providing verifiable objects for the discrepancy list.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions; only the system root and team owner are considered to have all permissions on all files.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Name, quantity, date, and signature are consistent between the plan and the ledger | Use a restricted member account to view the list and details, and verify the plan fields against the ledger item by item |
| Interview record | The name, quantity, and date of the same record match between the interview record and the screening plan | Use a restricted member account to view details, record inconsistent fields, and annotate the version |
| Referral form | The name, quantity, and date of the referral form and interview record are consistent, and the signature and receipt are complete | Use a collaborator account to attempt deleting an unauthorized file, and confirm it is filtered and a prompt is shown |
| File-level permission | Filtered item by item by member; unauthorized files do not occupy a slot and pagination is correct | Use a restricted member account to search the same question, and verify that unauthorized files are not recalled |

## Three common errors

- Symptom: A restricted member saw files they should not see. Cause: File-level permissions were not filtered item by item by member, or authentication was not executed by member identity, resulting in unauthorized access in the list and details.
- Symptom: Retrieval recalled unauthorized files. Cause: The workflow or nodes did not authenticate by member identity, and retrieval was not filtered by the current member's readable files.
- Symptom: A collaborator cannot delete a file. Cause: Deletion is limited to the creator; administrators or collaborators with write permission cannot delete, and non-creator items are filtered during batch deletion.

## How to verify the setup

Feature acceptance: Use a restricted account to view the list and perform one retrieval, verify the visible scope, confirm that unauthorized files do not occupy a slot and are not recalled, and that `teamId` and `tmbId` correspond to correct member filtering.

Business test: Use one real record to find fields inconsistent with the ledger, verify name, quantity, date, signature, and receipt, form a discrepancy list, submit it to the reviewer for confirmation, and write it back.

- Use a restricted member account to view the file list and details, and verify whether the visible file set under `teamId` and `tmbId` is consistent with the ledger.
- Use a collaborator account to attempt deleting an unauthorized file, confirm it is filtered and a prompt is shown, then submit the discrepancy list to the reviewer for confirmation and write it back.
