---
title: Permissions and Data Isolation for Sino-Foreign Education Establishment and Annual Reports: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c048-f013
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Permissions | Checks
meta_description: Joint Education: review permissions for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Sino-Foreign Education Establishment and Annual Reports: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of the establishment and annual reports of Chinese-Foreign cooperative education institutions. Materials include the establishment application, cooperation agreement, articles of association, and subsequent annual report receipts. The establishment application is drafted by the applying institution, the cooperation agreement is signed by both the Chinese and foreign parties, the articles of association are deliberated by the decision-making body, and the annual report receipt is fed back by the competent authority. Materials enter the system in two forms: scanned copies and electronic documents, updated by batch, with field characteristics concentrated on institution name, enrollment number, signing date, signature page, and cross-page seal. When entering this function, the establishment application serves as the main record anchor, the cooperation agreement and articles of association serve as parallel comparison documents, and the annual report receipt serves as a subsequent verification document; together, the three constitute the object set of the same institution.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the visible file set filtered by member. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions; team owners and system root are regarded as fully visible.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Institution name, enrollment number, and signing date must be item-by-item consistent with the cooperation agreement, and the signature page must not be missing | Open the list and details with a restricted member account, and check whether the read permission for this file under `teamId` is in effect |
| Cooperation agreement | The names of the Chinese and foreign parties, cooperation term, and signing and receipt dates must be consistent with the corresponding clauses of the articles of association | Try to delete with a collaborator account, confirm that non-creators are filtered out and prompted, and record the `tmbId` ownership |
| Articles of association | The name of the decision-making body, deliberation date, and signature/seal page must be synchronized with the version of the establishment application | Check the authentication configuration of the workflow and nodes, and confirm that retrieval filtering is performed only after authentication by member identity |
| Annual report receipt | The receipt date and institution name must be consistent with the ledger registration items, and a missing receipt must be marked | Search for the same institution name with a restricted member account, and verify that unauthorized files are not recalled |

## Three common errors

- Symptom: A restricted member sees unauthorized files in the list. Cause: File-level permissions are not filtered item by item by member, and the list is not returned as a readable set.
- Symptom: The name, number, and date of the same institution do not match across two materials. Cause: The version is not synchronized, and the establishment application is not written back after the cooperation agreement is revised.
- Symptom: Retrieval recalls unauthorized files. Cause: The workflow is not authenticated by member identity and recalls only by knowledge base permissions, so file-level filtering does not take effect.

## How to verify the setup

This function's acceptance: Use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: Use one real record to find fields inconsistent with the ledger, focusing on comparing name, number, date, and signature receipt.

- Check file read permissions and creator ownership item by item according to `teamId` and `tmbId`, and confirm that deletion is limited to the creator.
- Perform a field-level comparison of the three materials for the same institution, mark differences in name, number, and date, and write them back after confirmation by the reviewer.
