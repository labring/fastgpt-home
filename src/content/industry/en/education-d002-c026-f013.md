---
title: Permissions and Data Isolation for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c026-f013
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Permissions | Checks
meta_description: Degree Certificates: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of degree conferral and certificate information reporting. Materials come from three types of paper or electronic documents: degree application forms, thesis review forms, and defense resolutions. They are archived by batch and updated along with the review and defense milestones. The three types of materials play different roles in the feature: the degree application form carries the applicant's identity and degree category fields, the thesis review form carries the review conclusion and review date, and the defense resolution carries the defense conclusion, voting result, and signature field. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record must be aligned field by field across the three materials. After materials enter this feature, a file set is first formed according to the members' visible scope, and then field-level comparison is performed within the set. A discrepancy list is output for the reviewer to confirm and write back to the ledger.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), and outputs the visible file set filtered by member. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. The visible set changes with member identity, and unauthorized files neither enter the list nor are recalled.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Name, quantity, date, and signature must be aligned field by field with the thesis review form and defense resolution | Use a restricted member account to view the list and details, and check the field values of this form within the visible file set |
| Thesis review form | The review conclusion and review date must be consistent with the defense resolution and degree application form | Initiate retrieval with the member identified by `tmbId`, and confirm that unauthorized files are not recalled |
| Defense resolution | The defense conclusion, voting result, and signature field must be complete and correspond to the other two materials | Use a collaborator account to attempt to delete this file, and confirm that non-creators are filtered out and prompted |
| File-level permission configuration | Viewing the list and details requires knowledge base read permission plus file read permission; deletion is limited to the creator | Check the member groups and file collaborator configuration under `teamId`, and confirm that authentication takes effect according to member identity |

## Three common errors

- Symptom: a restricted member sees files in the list that should not be visible. Cause: file-level permissions are not filtered item by item by member, or the list is not returned according to the current member's readable scope.
- Symptom: the name, quantity, or date of the same record does not match between the degree application form and the defense resolution. Cause: the versions of the two materials are not synchronized, and fields are submitted for reporting without item-by-item comparison.
- Symptom: retrieval recalls unauthorized files, or a defense resolution lacking a signature and receipt is still accepted. Cause: retrieval is not authenticated by member identity, and material completeness validation does not cover the signature field.

## How to verify the setup

Feature acceptance: use a restricted account to view the file list and perform one retrieval, and check whether the visible file set contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: use one real record to find fields inconsistent with the ledger, locate the specific material and field, then hand it to the reviewer for confirmation and write-back.

- Check the file list and retrieval results by member identity, and confirm that the visible set is consistent with the collaborator configuration
- Review the date and signature fields of the degree application form, thesis review form, and defense resolution field by field against the discrepancy list
