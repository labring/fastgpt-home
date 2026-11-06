---
title: Permissions and Data Isolation for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c027-f013
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Permissions | Checks
meta_description: Graduate Destinations: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences

## What this category's data looks like

This category's data covers three types of materials: employment agreements, graduation destination registration forms, and employer certificates. Their sources are student signing, department registration, and employer receipts, respectively, and their update cadence advances with graduation batches and supplementary entry nodes. Employment agreements carry the signing entity and position information, graduation destination registration forms carry the destination category and reporting information, and employer certificates carry the acceptance intent and stamped receipt. When these three types of materials enter this feature, each participates as a verifiable object in material verification and discrepancy localization. Fields cover name, quantity, date, and signature, and must be compared item by item on the same object to locate inconsistent fields and form a discrepancy list, which is written back after confirmation by the reviewer.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This part is enforced by member permissions and file-level permissions (server-side authentication), and outputs the set of visible files filtered by member. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member, and team administrators do not bypass file-level permissions either. Unauthorized files do not occupy a place and are not recalled.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Name, quantity, date, and signature on the same record must match the ledger item by item | Use a restricted member account to view the list and details, and check whether the file's read permission and fields are consistent |
| Graduation destination registration form | Destination category and reporting date must match the corresponding fields in the employment agreement | Locate the member-visible set by `teamId` and `tmbId`, and compare the dates and names of the two materials |
| Employer certificate | Receipt date and signature/seal must form a closed loop with the registration form and agreement | Check file-level permissions and the retrieval recall scope, and confirm that unauthorized files are not recalled |
| Discrepancy list | Name, quantity, and date of the same object are consistent across the two materials | Try deleting with a collaborator account; it should be filtered and prompted, and only the creator can delete |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across the two materials. Cause: The employment agreement and the graduation destination registration form are entered at different nodes, and the field definitions are not aligned.
- Symptom: The version is not synchronized, and the old registration form is still recalled by retrieval. Cause: File-level permissions are not filtered by member, and retrieval is not authenticated by the current member identity.
- Symptom: Signature or receipt is missing, and the employer certificate does not form a closed loop. Cause: Material verification did not locate the missing fields, and the discrepancy list was not written back for reviewer confirmation.

## How to verify the setup

Feature acceptance: Use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files not occupying a place and not being recalled.

Business test: Use one real record to find fields inconsistent with the ledger, record the differences in name, quantity, and date, and submit them to the reviewer for confirmation and write-back.

- Check the member-visible file set by `teamId` and `tmbId`, and confirm that the list and retrieval return consistently.
- Use a collaborator account to try deleting a file not created by that account, confirm that it is filtered and prompted, and that deletion is limited to the creator.
