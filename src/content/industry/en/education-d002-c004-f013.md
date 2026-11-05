---
title: Permissions and Data Isolation for Kindergarten and Family Communication: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c004-f013
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Permissions | Checks
meta_description: Family Communication: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Kindergarten and Family Communication: Compare Documents and Locate Differences

## What this category's data looks like

Kindergarten home-school co-education communication materials are a collection of records formed between the kindergarten and families regarding children's performance in the kindergarten, notification delivery, parental requests, and responses to commitments. Common sources include teacher observation records, class notification ledgers, parent feedback registrations, and commitment item tracking tables. The update cadence is mainly daily or weekly, and fields mostly include child name, item name, quantity, date, commitment content, and response time. When materials enter this feature, observation records and notification ledgers serve as the verification baseline, while parent feedback registrations and commitment tracking tables serve as the materials to be compared. Discrepancy localization is performed based on whether the name, quantity, and date of the same object are consistent across the two materials, providing the basis for subsequent confirmation by a reviewer and write-back.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), and outputs the set of visible files filtered by member. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions; team owners and system root are regarded as having all permissions on all files.

| Object | Check | Verification action |
| --- | --- | --- |
| Commitment items and response time | Whether the commitment content and response time are consistent across the two materials, and whether there are commitments without a response | Use a restricted member account to view the commitment tracking table and notification ledger, and compare the response time field item by item |
| Child performance description | Whether the performance descriptions in teacher observation records and parent feedback match | Using the same child and same date as conditions, locate the two materials in the file list and retrieval and compare the description fields |
| Parent request classification | Whether parent feedback has been classified and the classification is consistent with the ledger | After filtering visible files by `teamId` and `tmbId`, check the classification field of the feedback registration against the ledger classification |
| Notification delivery | Whether the delivery date and quantity in the notification ledger are consistent with the feedback registration | Use a collaborator account to attempt to delete a file not created by the creator, confirm it is filtered and a prompt is shown, then check the delivery field |

## Three common errors

- Symptom: A commitment item has no response time in the tracking table. Cause: Parent requests are not classified, commitment and response records are scattered across different materials, and the response field is missed during comparison.
- Symptom: The child performance description does not match the observation record. Cause: Parent feedback registrations are not aligned with teacher observation records by the same child and same date, and the field definitions are inconsistent.
- Symptom: A restricted member sees files they should not see. Cause: File-level permissions are not filtered item by item by member, and the list and retrieval do not return results based on the current member's readable set.

## How to verify the setup

Feature acceptance: Use a restricted account to view the list and perform one retrieval, and check whether the visible scope contains only files for which that member has read permission; unauthorized files do not occupy a place and are not recalled.

Business test: Use one real record to find a field inconsistent with the ledger, record the discrepancy list, and submit it to a reviewer for confirmation before write-back.

- Use a restricted member account to view the file list and details, and confirm that only files within the scope of knowledge base read permission plus file read permission are returned.
- Use a collaborator account to attempt to delete a file not created by the creator, confirm that the deletion is filtered and a prompt is shown, then check the visible set by `teamId` and `tmbId`.
