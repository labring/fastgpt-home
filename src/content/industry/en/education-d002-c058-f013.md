---
title: Permissions and Data Isolation for Research Project Task Agreement Signing: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c058-f013
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Permissions | Checks
meta_description: Research Agreements: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Research Project Task Agreement Signing: Compare Documents and Locate Differences

## What this category's data looks like

At the signing stage of a research project task book, the materials usually consist of three parts: the project task book, the subject task breakdown table, and the budget book. The sources are exports from the application system and scanned copies of offline signatures, and the update cadence follows the signing milestones and version revisions. The project task book is the main document, carrying the project name, undertaking unit, start and end dates, and signature page; the subject task breakdown table is the sub-document, breaking down tasks, quantities, and responsible persons by subject; the budget book is the attachment, recording subject amounts, dates, and approval signatures. When these three materials enter this feature, each is mounted as an independent file to the same knowledge base, with field characteristics concentrated in names, quantities, dates, signatures, and receipts. During verification, the fields of the same object in two materials need to be compared side by side to locate discrepancies and form a discrepancy list.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This part is enforced by member permissions and file-level permissions (server-side authentication), and outputs the set of visible files filtered by member. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. The file list and details require knowledge base read permission plus read permission for that file, and deletion is limited to the creator; retrieval is filtered by the files readable by the current member, and only takes effect when authenticated by member identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Check whether the project name, start and end dates, and signature page are consistent with the ledger | Use a restricted member account to view the list and details, and confirm that the file is visible and the fields are readable |
| Subject task breakdown table | Check whether the subject name, task quantity, responsible person, and dates are consistent with the project task book | Try to delete the file with a collaborator account; it should be filtered and a prompt shown; check the authentication configuration of the workflow and nodes |
| Budget book | Check whether the subject amounts, budget dates, and approval signatures are consistent with the task breakdown table | Use a restricted member account to search the same question, and confirm that unauthorized files will not be recalled |
| File-level permissions | Viewing the list and details requires knowledge base read permission plus file read permission, and deletion is limited to the creator | Check `teamId`, `tmbId`, and the file collaborator configuration to confirm filtering by member item by item |

## Three common errors

- Symptom: The name, quantity, and dates of the same record do not match between the project task book and the subject task breakdown table. Cause: The two materials are updated separately, without side-by-side comparison and discrepancy write-back.
- Symptom: The versions of the budget book and the task breakdown table are not synchronized, and the old signature page is still in circulation. Cause: After version revision, the file was not re-mounted, and the file list was not filtered by the latest version.
- Symptom: Materials lack signatures or receipts, and the reviewer cannot confirm. Cause: The signing step did not return the scanned copy, and the receipt was not associated with the task book.

## How to verify the setup

Feature acceptance: Use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only the files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: Use one real record to find fields inconsistent with the ledger, form a discrepancy list, submit it to the reviewer for confirmation, and write it back.

- Check file read permissions item by item by member, and confirm that the list and details are returned after filtering by `teamId` and `tmbId`.
- Use a collaborator account to try deleting a file not created by that account, confirm that it is filtered and a prompt is shown, and then check the workflow authentication configuration.
