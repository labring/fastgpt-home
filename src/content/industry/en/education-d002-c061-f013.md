---
title: Permissions and Data Isolation for Research Outcome Registration and Intellectual Property: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c061-f013
page_type: 行业问题页
application_area: education
meta_title: Research IP | Permissions | Checks
meta_description: Research IP: review permissions for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Research Outcome Registration and Intellectual Property: Compare Documents and Locate Differences

## What this category's data looks like

This category's data involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms are submitted by research groups and contain fields for achievement name, completers, completion date, and quantity; patent disclosure documents are written by inventors and contain the technical name, filing date, and inventor signature; software copyright materials are compiled by the development team and contain the software name, version number, development completion date, and stamped receipt. The three types of materials are updated monthly and by batch, with inconsistent field naming and granularity: registration forms use abbreviations, disclosure documents use full names, and copyright materials use version suffixes; date formats are mixed, and signatures and receipts are scattered across attachments. After the materials enter this feature, the registration form serves as the master ledger record, while disclosure documents and copyright materials serve as comparison sources, each retaining its original fields for field-by-field discrepancy checking and generation of a discrepancy list.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is enforced by member permissions and file-level permissions (server-side authentication), outputting the visible file set filtered by member. The discrepancy list is completed subsequently by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions; team owners and system root are treated as having all file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Check whether the name, quantity, completion date, and signature field are consistent with the master ledger record | Open the file details with a restricted member account, compare the fields, and record discrepancies |
| Patent disclosure document | Check whether the technical name, filing date, inventor signature, and receipt are complete | Search the same question with member-identity authentication to confirm that unauthorized files are not recalled |
| Software copyright materials | Check whether the software name, version number, development completion date, and stamped receipt match | Try to delete the file with a collaborator account to confirm that non-creator items are filtered and a prompt is shown |
| File visible set | Check whether the list and retrieval only return files readable by that member | Check the authentication configuration of the workflow and nodes, and inspect the passing of `teamId` and `tmbId` |

## Three common errors

- Symptom: the name, quantity, and date of the same achievement do not match between the registration form and the disclosure document. Cause: the two materials are entered separately and archived without field-level comparison.
- Symptom: the version number of the copyright material is inconsistent with the registration form record. Cause: after a version update, it is not synchronized back to the ledger, and the old version remains in the visible set.
- Symptom: the disclosure document lacks an inventor signature or the copyright material lacks a stamped receipt. Cause: signatures and receipts are scattered across attachments and are not checked item by item during verification.

## How to verify the setup

Feature acceptance: use a restricted account to view the file list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: use one real record to find fields inconsistent with the ledger, form a discrepancy list, submit it to the reviewer for confirmation, and write it back.

- Use a restricted member account to view the list and details, confirm that only files for which that member has read permission are returned, and check whether `teamId` and `tmbId` are passed correctly.
- Use a collaborator account to try deleting a file not created by that member, confirm that the deletion is filtered and a prompt is shown; then check whether the authentication configuration of the workflow and nodes authenticates by member identity.
