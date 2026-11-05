---
title: Permissions and Data Isolation for Research Ethics Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c062-f013
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Permissions | Checks
meta_description: Research Ethics: review permissions for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Research Ethics Review: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on the research ethics review category. The material sources are three types of ledgers and archived documents: ethics review applications, informed consent form templates, and risk assessment forms. The update cadence follows project initiation and annual re-review, and the field characteristics center on names, quantities, dates, and signature receipts. The ethics review application serves as the primary record, the informed consent form template serves as the subject-version comparison record, and the risk assessment form serves as the risk-item and handling-deadline record. After the three types of materials enter the same space, they are compared field by field against the same object, and the discrepancy list is generated from this, handed to the reviewer for confirmation and written back to the ledger.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is enforced by member permissions and file-level permissions (server-side authentication), and outputs the set of visible files filtered by member. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the name, quantity, date, and signature receipt are consistent with the ledger | Use a restricted member account to view the list and details, check file read permissions, and confirm the ownership of `teamId` and `tmbId` |
| Informed consent form template | Whether the version number, signing date, and receipt are synchronized with the application record | Use a collaborator account to attempt deletion, confirm that only the creator can delete, and that non-creator items are filtered out with a prompt |
| Risk assessment form | Whether the risk item names, quantities, and handling dates are consistent with the application | Use a restricted member account to search for the same issue, and confirm that unauthorized files are not recalled |
| File list and retrieval | Whether the visible scope is filtered item by item by member | Check the authentication method of the workflow and nodes, and confirm that it takes effect when authenticating by member identity |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the application and the informed consent form. Cause: The two materials were revised separately, without field-level comparison against the same object.
- Symptom: The template version is not synchronized, and old signed copies are still recalled by retrieval. Cause: After the version update, the ledger was not written back, and retrieval returns old copies as readable files.
- Symptom: The risk assessment form lacks a signature or receipt but still enters the discrepancy list. Cause: The signature and receipt fields were not included in the verification dimensions, and were not intercepted before review.

## How to verify the setup

This feature acceptance: Use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: Use one real record to find fields inconsistent with the ledger, write them into the discrepancy list, and hand them to the reviewer for confirmation and write-back.

- Check file read permissions item by item by member, confirm that the list and details return only readable files, and record `teamId` and `tmbId`.
- Use a collaborator account to attempt to delete a non-creator file, confirm that it is filtered out with a prompt; then check whether the workflow authentication method is authentication by member identity.
