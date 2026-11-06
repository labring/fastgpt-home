---
title: Permissions and Data Isolation for School Admissions and Enrollment Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c008-f013
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Permissions | Checks
meta_description: School Admissions: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for School Admissions and Enrollment Organization: Compare Documents and Locate Differences

## What this category's data looks like

Primary and secondary school enrollment organizations centrally process three types of materials during the enrollment season: enrollment plans, application material checklists, and admission lists. The enrollment plan contains batches, time nodes, and signature fields; the application material checklist contains student names, ID numbers, material copy counts, and receipts; the admission list contains names, admission batches, dates, and handler signatures. Materials come from various registration points and review posts, and are updated on a rolling basis by batch and date. The same record often exists in two forms simultaneously: paper scans and ledgers. When these three types of materials enter material verification and discrepancy localization, the enrollment plan serves as the field and date baseline, the application material checklist serves as the item-by-item comparison source, and the admission list serves as the result-side verification object. Together, the three support the generation and write-back of the discrepancy list.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is enforced by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member.

| Object | Check | Verification action |
| --- | --- | --- |
| Application material checklist | The name, quantity, and date of the same record do not match across the two materials | Use a restricted member account to view the list and details, check whether the checklist fields are consistent with the enrollment plan baseline, and record the discrepancy fields |
| Admission list | Version not synchronized | Check the batch date and signature fields of the admission list and the ledger, confirm whether the version is synchronized, and mark missing signatures or receipt items |
| Enrollment plan | Missing signature or receipt | Check the signature fields and receipt fields in the plan, and confirm whether they correspond to the dates and quantities in the application material checklist |
| File-level permissions | Viewing the list and details requires knowledge base read permission plus file read permission | Use a restricted member account to view the list and details, check the visible file set, and use `teamId` and `tmbId` to verify member affiliation |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the application material checklist and the admission list. Cause: The two materials are entered separately by different registration points, and the field definitions and update rhythms are not aligned.
- Symptom: The admission list version is not synchronized, and old batches are still retrieved. Cause: File-level permissions are not filtered item by item by member, and retrieval recalls unauthorized files.
- Symptom: The enrollment plan is missing signatures or receipts. Cause: The review step did not write back, the discrepancy list was not submitted to the reviewer for confirmation, and the signature fields and receipt fields remained empty for a long time.

## How to verify the setup

This feature acceptance: Use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: Use one real record to find a field inconsistent with the ledger, submit it to the reviewer for confirmation, and write it back.

- Use a restricted member account to view the list and details, check the visible file set, and use `teamId` and `tmbId` to verify member affiliation.
- Use a collaborator account to try deleting a file, and confirm that only the creator can delete, while non-creator items are filtered out and a prompt is shown.
