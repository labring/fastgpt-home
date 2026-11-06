---
title: Permissions and Data Isolation for Off-Campus Training Registration and Compliance: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c045-f013
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Permissions | Checks
meta_description: Training Compliance: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Off-Campus Training Registration and Compliance: Compare Documents and Locate Differences

## What this category's data looks like

In off-campus training compliance filing and penalty response, the core materials are of three types: school operating license, course filing materials, and fee disclosure. The school operating license is issued by the approving authority and contains the institution name, address, validity period, operating content, and signature and seal; the course filing materials are submitted by the institution and contain the course name, class hours, textbook version, teaching personnel, and filing date; the fee disclosure is published by the institution itself and contains fee items, standards, refund rules, and disclosure date. Materials are updated by semester or filing batch, and during penalty response the three types of materials must be checked item by item against the ledger. After entering this function, the school operating license, course filing materials, and fee disclosure each participate in the file list and retrieval as independent files, each filtered by member permissions, and the discrepancy list is generated based on the visible file set.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This part is executed by member permissions and file-level permissions (server-side authentication), outputting the visible file set filtered by member. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Viewing the list and details requires knowledge base read permission plus file read permission; retrieval is filtered by the files readable by the current member, and takes effect only when authenticated by member identity.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Check whether the institution name, address, validity period, and signature and seal are consistent with the ledger | Use a restricted member account to view the details, check the fields and signature receipt; deletion is limited to the creator, and a collaborator's attempted deletion should be filtered and prompted |
| Course filing materials | Check whether the course name, class hours, textbook version, filing date, and teaching personnel are consistent with the ledger | Locate the files visible to the member by `teamId` and `tmbId`, compare the names, quantities, and dates item by item, and mark items whose versions are not synchronized |
| Fee disclosure | Check whether the fee items, standards, refund rules, and disclosure date are consistent with the ledger | Search for the same course name, confirm that unauthorized files are not recalled, and list entries missing signatures or receipts in the discrepancy list |
| Discrepancy list | The name, quantity, and date of the same object are consistent in the two materials | Hand it to the reviewer for confirmation and write-back, and check whether the authentication configuration of the workflow and nodes is authenticated by member identity |

## Three common errors

- Symptom: The name and class hours of the same course do not match between the filing materials and the fee disclosure. Cause: The two materials are submitted separately, no field-level comparison is performed, and versions are not synchronized.
- Symptom: The validity period of the school operating license is inconsistent with the ledger date, and the signature or receipt is missing. Cause: The ledger was not written back after the materials were updated, and the dates and signatures/seals were not verified item by item during checking.
- Symptom: A restricted member saw files they should not see, and retrieval recalled unauthorized files. Cause: Retrieval was not authenticated by member identity, or the workflow's preselected knowledge base did not perform file-level filtering.

## How to verify the setup

Acceptance of this function: Use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only files readable by that member, whether unauthorized files do not occupy a place and are not recalled, and whether deleted items are filtered and prompted.

Business test: Use one real record to find fields inconsistent with the ledger, record the differences in name, quantity, and date, and hand them to the reviewer for confirmation and write-back.

- Check the member-visible file set by `teamId` and `tmbId`, and inspect the fields, dates, and signatures of the school operating license, course filing materials, and fee disclosure one by one.
- Use a collaborator account to attempt to delete a file and confirm that only the creator can delete; use a restricted member account to search for the same issue and confirm that unauthorized files are not recalled.
