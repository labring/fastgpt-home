---
title: Permissions and Data Isolation for Peer Review Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c067-f013
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Permissions | Checks
meta_description: Peer Review: review permissions for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Peer Review Organization: Compare Documents and Locate Differences

## What this category's data looks like

This category covers material verification and discrepancy location for peer review organizations, routinely handling three types of materials: review invitations, expert review comments, and author revision notes. Review invitations record the manuscript number, submission date, expert name, and invitation receipt; expert review comments record the review conclusion, comment body, signature, and submission date; author revision notes record revision items, reply content, version number, and submission date. Material sources are the editorial office's submission ledger, review system export records, and email receipts; the update cadence advances by submission batch and revision round, and field characteristics center on four types: name, quantity, date, and signature. Once the three types of materials enter file-level permissions and retrieval, each acts as an independent object within the readable file set, with the visible scope determined by member identity, and discrepancy location lands on comparing the same record across materials.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the visible file set filtered by member. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work; the file list and retrieval return only the readable set filtered by member, team administrators do not bypass file-level permissions, and retrieval filters only when authenticated by member identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Name, quantity, date, and signature are consistent between the invitation and the ledger | Use a restricted member account to view the list and details, check whether the manuscript number, submission date, expert name, and receipt are complete, and compare `teamId` ownership |
| Expert review comments | Review conclusion, signature, and submission date are consistent between the two materials | Retrieve the review system export records and the comment file, check the conclusion, signature, and date, confirm items whose versions are not synchronized, and record the discrepancy fields |
| Author revision notes | Revision item count, version number, and submission date are consistent | Filter visible files by `tmbId`, check the revision item count and version number, and flag items missing a signature or receipt |
| Discrepancy list | Name, quantity, and date discrepancies for the same record across materials are located item by item | Use the creator account to attempt deleting a file not owned by the user, confirm that only the creator can delete and that unauthorized items are filtered with a prompt |

## Three common errors

- Symptom: the name, quantity, and date of the same manuscript do not match between the two materials. Cause: the submission ledger and the review system export are not aligned by the same record key, and versions are not synchronized.
- Symptom: a restricted member sees review comments or revision notes they should not see. Cause: file-level permissions are not filtered item by item by member, and the list is not returned as the readable set.
- Symptom: retrieval recalls unauthorized files, or a collaborator cannot delete a file. Cause: retrieval is not filtered by member identity authentication, and the rule that deletion is limited to the creator is misjudged.

## How to verify the setup

Acceptance for this feature: use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: use one real record to find fields inconsistent with the ledger, check the name, quantity, date, and signature, output a discrepancy list for the reviewer to confirm and write back.

- Use a restricted member account to view the file list and details, confirm that only files readable by that member are returned, and record whether unreadable items occupy a place.
- Use a collaborator account to attempt deleting a file not created by the user, confirm that it is filtered with a prompt, and check the creator deletion and ownership transfer paths.
