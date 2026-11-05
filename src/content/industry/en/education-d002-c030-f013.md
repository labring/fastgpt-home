---
title: Permissions and Data Isolation for Vocational School Student Internships: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c030-f013
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Permissions | Checks
meta_description: Student Internships: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Vocational School Student Internships: Compare Documents and Locate Differences

## What this category's data looks like

The material verification and discrepancy localization for vocational school student internship management revolves around three types of materials: internship agreements, internship plans, and internship logs. Agreements are signed between the school and the internship unit, containing job title, internship period, signatures and seals; plans are prepared by supervising teachers, containing weekly schedules, job rotations, and assessment methods; logs are filled in daily by students, containing date, task content, and mentor's signature. After these three types of materials enter the knowledge base, each plays a different role: agreements serve as the basis for rights and responsibilities, plans serve as progress benchmarks, and logs serve as process evidence. In terms of update rhythm, agreements are signed or changed by batch, plans are adjusted per semester, and logs accumulate daily. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record's name spelling, number of people, and start/end dates in two materials often deviate due to different entry times, and missing signatures or receipts are also common. During verification, the ledger is used as the benchmark, field-by-field comparison is performed, and after discrepancies are located, they are handed to the reviewer for confirmation and written back.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work; file lists and retrieval only return the readable set filtered by member. File-level permissions are filtered member by member: viewing lists and details requires knowledge base read permission plus file read permission, deletion is limited to the creator; retrieval is filtered by files readable by the current member, and only takes effect when authenticated by member identity. Team administrators do not bypass file-level permissions; system root and team owners are considered to have all permissions on all files.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Whether the name, quantity, date, and signature are consistent with the ledger; whether the agreement's job title and the plan's job title are written uniformly, and whether the internship start/end dates cover the plan's weekly schedule | Use a restricted member account to view the agreement list and details, verify the `teamId` and `tmbId` ownership, compare field by field with the ledger, and record discrepancies |
| Internship plan | Whether the weekly schedule, job rotation, and assessment methods correspond to the agreement's job positions; whether the plan version is synchronized with the current batch, and whether entries missing signatures or receipts are marked | Retrieve plans according to the file set readable by the current member, verify the version date and agreement signing date, and mark unsynchronized entries |
| Internship log | Whether the date, task content, and mentor's signature are continuous; whether the log dates fall within the plan's weekly schedule, and whether the number of people matches the planned number | Use a restricted member account to search the same question, confirm that unauthorized files are not recalled, and verify log dates and signatures one by one |

## Three common errors

- Phenomenon: The same record's job title and number of people do not match between the agreement and the plan. Cause: The two materials are entered by different roles at different times, and the name abbreviations and headcount standards are not unified.
- Phenomenon: Log dates fall outside the plan's weekly schedule, or the plan version is not synchronized. Cause: After the plan is adjusted, it is not written back to the ledger, logs are filled in according to the old weekly schedule, and the version is not synchronized.
- Phenomenon: The agreement lacks signatures or receipts, and the log lacks the mentor's signature. Cause: During the material collection stage, the signature fields are not verified one by one, and missing items are not marked during verification.

## How to verify the setup

This feature acceptance: Use a restricted member account to view the file list and perform one retrieval, verify whether the visible range only includes files that the member has read permission for, and that unauthorized files do not occupy a place and are not recalled.

Business test: Use one real record to find fields inconsistent with the ledger, record the discrepancies, and hand them to the reviewer for confirmation before writing back.

- Use a restricted member account to view the list and details, confirm that only files that the member has read permission for are returned, and verify the `teamId` and `tmbId` ownership.
- Use a collaborator account to attempt to delete a file, confirm that only the creator can delete, and that non-creator items are filtered out and a prompt is shown.
