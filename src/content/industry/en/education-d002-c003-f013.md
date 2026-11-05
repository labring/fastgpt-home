---
title: Permissions and Data Isolation for Kindergarten Healthcare and Meal Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c003-f013
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Permissions | Checks
meta_description: Child Health and Meals: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Kindergarten Healthcare and Meal Management: Compare Documents and Locate Differences

## What this category's data looks like

This page is for kindergarten health care and meal management. Materials include food procurement orders, menus, retention sample records, disinfection records, and absence cause registration forms. Procurement orders are summarized weekly and include food name, specification, quantity, and supplier; menus are published daily and include meal times and categories; retention sample records are registered by batch and include retention time, meal time, and retention person; disinfection records are registered by time period and include disinfection target and start/end times; absence registration includes date and cause classification. When these materials enter the permissions and data isolation function, procurement orders and menus serve as the verification baseline, retention sample records and disinfection records serve as the objects being verified, and absence registration participates in consistency checks by cause classification. The update rhythm is parallel daily and weekly updates. Field characteristics are mainly names, quantities, dates, batches, and time periods, and must be compared item by item.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), and outputs the visible file set filtered by member. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member.

| Object | Check | Verification action |
| --- | --- | --- |
| Food name and specification | The name and specification of the same food in the procurement order and menu are consistent | Use a restricted member account to view the procurement order and menu file lists, check the name and specification fields of the same food, and confirm the readable range of members corresponding to `teamId` and `tmbId` |
| Retention time and batch | The retention time and batch number of the same batch in the retention sample records and procurement order are consistent | Use a restricted member account to search retention sample records, check the batch number and retention time fields, and confirm that unauthorized files are not recalled |
| Disinfection time period | Each disinfection target in the disinfection records has start and end times and is consistent with the schedule | Use a restricted member account to view disinfection records, check whether the disinfection time period field has missing items, and confirm that the list is filtered item by item by `tmbId` |
| Absence cause classification | The cause classification for the same date in the absence registration and health care ledger is consistent | Use a restricted member account to view the absence registration and health care ledger, check the cause classification field, and confirm that deletion is limited to the creator |

## Three common errors

- Phenomenon: Documents and retention sample batches do not match, and the discrepancy list has missing items. Cause: Retention sample records are not associated with procurement orders by batch number, and retrieval is not filtered by member-readable files.
- Phenomenon: Menus and procurement categories are inconsistent, and the reviewer cannot locate the discrepancy. Cause: Menu files and procurement order files have different permissions, restricted members cannot see procurement orders, and the comparison baseline is missing.
- Phenomenon: Disinfection records are missing time periods, and the discrepancy list cannot be generated. Cause: After disinfection records are filtered item by item by member, some time period files are unreadable, and retrieval does not recall unauthorized files.

## How to verify the setup

This function acceptance: Use a restricted account to view the file list and perform one retrieval, check whether the visible range contains only files readable by that member, unauthorized files do not occupy a place and are not recalled, and check the member authentication configuration corresponding to `teamId` and `tmbId`.

Business test: Use one real record to find fields inconsistent with the ledger, record the discrepancy list, and hand it to the reviewer for confirmation and write-back.

- Use a restricted member account to view the file list and details, check the knowledge base read permission plus file read permission, and confirm that the list is filtered item by item by that member.
- Use a collaborator account to try deleting a file, confirm that only the creator can delete, and that non-creator items are filtered and prompted.
