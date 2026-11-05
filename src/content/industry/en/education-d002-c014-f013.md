---
title: Permissions and Data Isolation for School Moral Education and Class Teacher Work: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c014-f013
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Permissions | Checks
meta_description: Pastoral Education: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for School Moral Education and Class Teacher Work: Compare Documents and Locate Differences

## What this category's data looks like

This page is intended for school moral education and homeroom teacher work. Materials come from three categories: thematic class meeting plans, student comprehensive quality records, and home visit records. Thematic class meeting plans are submitted by week or activity node, with fields including activity name, date, host, and signature; student comprehensive quality records are updated by semester, with fields including student name, evaluation dimension, quantity, date, and signature; home visit records are generated per visit, with fields including student name, home visit date, home visit teacher, and receipt. After the three categories of materials enter this function, each participates in lists and retrieval as an independent file, and file-level permissions determine which member can see which file. Verification is based on whether the name, quantity, and date of the same object are consistent across two materials; missing signatures or receipts and unsynchronized versions must all be localized to specific fields.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the visible file set filtered by member. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | Activity name, date, host, and signature are consistent item by item with the ledger | Use a restricted member account to view the list and details, verify the visible scope; search for the same activity name in retrieval and confirm that unauthorized files are not recalled |
| Student comprehensive quality record | Student name, evaluation dimension, quantity, and date are consistent item by item with the ledger | After authentication by member identity, search for the same student and verify whether the returned files fall within the readable set; compare the two materials and mark discrepancies in name and quantity |
| Home visit record | Student name, home visit date, home visit teacher, and receipt are consistent item by item with the ledger | Verify the receipt and signature fields; use a collaborator account to attempt deletion and confirm that only the creator can delete, while non-creator items are filtered and prompted |
| File-level permission | Viewing the list and details requires knowledge base read permission plus file read permission | Verify `teamId`, `tmbId`, and collaborator configuration, and confirm that deletion is limited to the creator |

## Three common errors

- Phenomenon: The name and date of the same activity do not match across two materials. Cause: During entry, the ledger fields were not checked item by item, and the version was not synchronized.
- Phenomenon: The quantity in the comprehensive quality record is inconsistent with the ledger quantity. Cause: After the evaluation dimension was updated, it was not written back, and the old version was still recalled by retrieval.
- Phenomenon: The home visit record is missing a signature or receipt. Cause: During material archiving, the signature column was not checked, and the receipt was not uploaded together with the record.

## How to verify the setup

This function's acceptance: Use a restricted account to view the list and perform one retrieval, verify whether the visible scope contains only files readable by that member, and confirm that unauthorized files do not occupy a place and are not recalled.

Business test: Use one real record to find fields inconsistent with the ledger, mark discrepancies in name, quantity, or date, and hand them to the reviewer for confirmation and write-back.

- Use a restricted member account to view the list and details, confirm that only files readable by that member are returned, and verify the correspondence of `teamId` and `tmbId`.
- Use a collaborator account to attempt file deletion, confirm that only the creator can delete, that non-creator items are filtered and prompted, and then verify whether retrieval is authenticated by member identity.
