---
title: Permissions and Data Isolation for Vocational Training Subsidy Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c037-f013
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Permissions | Checks
meta_description: Training Subsidies: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Vocational Training Subsidy Applications: Compare Documents and Locate Differences

## What this category's data looks like

Materials for vocational training subsidy applications mainly consist of training class filing records, attendance records, and completion assessment forms. They come from submissions by training institutions and exports from business systems, and are updated by class and by batch. Class filing records carry the course, personnel, class hours, and planned dates; attendance records leave a per-person trace day by day; completion assessment forms record assessment conclusions and signatures. When these three types of materials enter the material verification and discrepancy localization function, the class filing record serves as the baseline object, while attendance records and completion assessment forms serve as comparison objects, each taking on the comparison responsibilities for personnel, quantity, date, and signature fields, for use in generating discrepancy lists and writing back review results.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This part is enforced by member permissions and file-level permissions (server-side authentication), and outputs the set of visible files filtered by member. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. The file list and retrieval filter by readable files only when authenticating by member identity; unauthorized files do not occupy a place and are not recalled.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing record | Name, quantity, date, and signature are consistent between the filing record and attendance records | Check the course name, number of participants, class start and completion dates by class, and verify the person-in-charge's signature and receipt |
| Attendance record | The name, quantity, and date of the same record match between the attendance record and the completion assessment form | Compare name, attendance count, and assessment date person by person, and flag entries missing a signature or receipt |
| Completion assessment form | The version is in sync with the filing record, and the assessment conclusion matches the attendance days | Check the assessment form version number, conclusion field, and attendance days, and confirm fields inconsistent with the ledger |
| File-level permission | Viewing the list and details requires knowledge base read permission plus file read permission; deletion is limited to the creator | Use a restricted member account to check the visible set, and use a collaborator account to try deleting an unauthorized file |

## Three common errors

- Symptom: the name or date of the same trainee does not match between the attendance record and the completion assessment form. Cause: the two materials are entered in different stages, and field-level comparison against the same record was not performed.
- Symptom: the class filing record has been updated, but the attendance record and completion assessment form are still the old version. Cause: versions are not synchronized, the material update cadence is inconsistent, and a version verification step is missing.
- Symptom: the completion assessment form is missing a signature or receipt but still enters the discrepancy list. Cause: the signature and receipt fields were not included in the verification dimensions, and the material completeness check is missing.

## How to verify the setup

Feature acceptance: use a restricted account to view the file list and perform one retrieval, and check that the visible scope contains only files readable by that member, with unauthorized files not occupying a place and not being recalled; then use a collaborator account to try deleting, and confirm it is filtered and a prompt is shown.

Business test: use one real record to find fields inconsistent with the ledger, record discrepancies in name, quantity, date, and signature, and hand them to the reviewer for confirmation and write-back.

- Pull the class filing record, attendance record, and completion assessment form by class, verify name, quantity, date, and signature field by field, generate a discrepancy list, and mark inconsistent fields.
- Check the authentication configuration of the workflow and nodes, confirm that authentication by member identity takes effect, and record the correspondence between `teamId`, `tmbId`, and file-level permissions, then hand it to the reviewer for confirmation and write-back.
