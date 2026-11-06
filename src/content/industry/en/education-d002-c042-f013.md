---
title: Permissions and Data Isolation for Corporate Sales and Product Training: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c042-f013
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Permissions | Checks
meta_description: Sales Training: review permissions for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Corporate Sales and Product Training: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the enterprise sales product training scenario, where materials come from three types of documents: product manuals, channel script sheets, and channel training schedules. Product manuals are released by version, with fields including product name, specification quantity, effective date, and preparer signature; channel script sheets are updated with channel activities, with fields including script number, applicable product, revision date, and review receipt; channel training schedules are arranged quarterly, with fields including course name, number of participants, course start date, and responsible person signature. After these three types of materials enter this feature, product manuals serve as the baseline ledger, while channel script sheets and channel training schedules serve as materials to be verified. The name, quantity, date, and signature receipt of the same record are compared item by item to locate discrepancies and generate a discrepancy list.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions, and restricted members can only see authorized material files.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Whether fields, dates, and signatures are consistent with the ledger | Use the creator account to view the list and details, check the product name, specification quantity, effective date, and preparer signature, and use `teamId` to locate the team scope |
| Channel script sheet | Whether the name, quantity, and date of the same record match the product manual | Use a restricted member account to search for the same product, check whether unauthorized files are recalled, and record the visible set corresponding to `tmbId` |
| Channel training schedule | Whether the version is synchronized, and whether signatures or receipts are missing | Use a collaborator account to attempt to delete a file not created by the creator, confirm that it is filtered and a prompt is shown, and check the schedule revision date and responsible person signature |
| Discrepancy list | Whether discrepancy fields can be written back to the reviewer | Generate the list based on the file set filtered by member, mark name, quantity, and date discrepancies item by item, and submit to the reviewer for confirmation |

## Three common errors

- Symptom: A restricted member saw files they should not see. Cause: File-level permissions were not filtered item by item by member, and the list and details did not simultaneously verify knowledge base read permission and file read permission.
- Symptom: Retrieval recalled unauthorized files. Cause: The workflow knowledge base search node did not authenticate by the current member identity, recalled only by knowledge base permission, and did not perform file-level filtering.
- Symptom: A collaborator cannot delete a file. Cause: Deletion is limited to the creator; administrators or collaborators with write permission cannot delete, and during batch deletion, non-creator items are filtered and a prompt is shown.

## How to verify the setup

Acceptance of this feature: Use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only authorized files, with unauthorized files neither occupying a place nor being recalled.

Business test: Use one real record to find fields inconsistent with the ledger, and check the name, quantity, date, and signature receipt in the product manual, channel script sheet, and channel training schedule.

- Use the creator account to check the fields, dates, and signatures of the product manual, and confirm that the baseline ledger is complete.
- Use a restricted member account to search for the same product, and check whether the returned file set is consistent with the authorization scope of `teamId` and `tmbId`.
