---
title: Permissions and Data Isolation for Training Provider Admissions and Inquiry Follow-Up: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c043-f013
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Permissions | Checks
meta_description: Training Admissions: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Training Provider Admissions and Inquiry Follow-Up: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the enrollment consultation conversion scenario at training institutions. Materials come from three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures are published by the marketing or academic affairs role by batch, and contain course name, class type, number of class hours, start date, and stamped signature fields; consultation records are registered entry by entry by the consultation role, and contain the student's form of address, intended course, communication date, and follow-up person's signature; trial class schedules are scheduled by the academic affairs role, and contain trial class date, classroom, instructor, and receipt. The three material categories are updated by batch or by day, and the fields are mainly names, quantities, dates, and signatures. When entering this feature, the brochure serves as the baseline material, and consultation records and trial class schedules serve as comparison materials, aggregated by the same student or the same class session, for field-by-field verification via the discrepancy list, and written back after confirmation by the reviewer.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), and outputs the set of visible files filtered by member. The discrepancy list is then completed by subsequent AI nodes, code nodes, or manually; the file list and retrieval only return the readable set filtered by member. Viewing the list and details requires knowledge base read permission plus file read permission, deletion is limited to the creator, and retrieval is filtered by the files readable by the current member and only takes effect when authenticated by member identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | The course name, number of class hours, start date, and signature for the same class session are consistent between the brochure and the ledger | Use a restricted member account to view the list and details, locate the file by `teamId` and `tmbId`, and compare the name, quantity, date, and signature fields field by field |
| Consultation record | The intended course, communication date, and follow-up person's signature for the same student are consistent between the consultation record and the trial class schedule | Use a collaborator account to attempt to delete a file not created by that account; it should be filtered out and a prompt shown; then verify the date and signature receipt in the record |
| Trial class schedule | The trial class date, classroom, instructor, and receipt are consistent between the schedule and the consultation record, and the version is the latest synchronized version | Use a restricted member account to search the same question and verify that unauthorized files are not recalled; verify the authentication configuration of the workflow and nodes |

## Three common errors

- Symptom: The course name, number of class hours, and communication date for the same student do not match between the consultation record and the trial class schedule. Cause: The two materials are registered separately, are not aggregated and compared by the same object, and the field definitions are not unified.
- Symptom: The brochure has already been revised, but the consultation record still references the old class type and start date. Cause: The version was not synchronized, the update did not trigger comparison, and the old version file remains in the visible set.
- Symptom: The trial class schedule lacks the instructor's signature or the student's receipt, and it cannot be confirmed during review. Cause: The signature and receipt fields were not included in the verification checklist, and missing items were not flagged.

## How to verify the setup

Feature acceptance: Use a restricted account to view the file list and perform one retrieval, and verify that the visible scope contains only files readable by that member, unauthorized files do not occupy a place and are not recalled, and deletion is limited to the creator.

Business test: Use one real record to find fields inconsistent with the ledger, record the discrepancies in name, quantity, date, and signature, and submit them to the reviewer for confirmation and write-back.

- Verify the set of files visible to the member by `teamId` and `tmbId`, and compare the name, quantity, date, and signature of the enrollment brochure, consultation record, and trial class schedule one by one.
- Verify the authentication configuration of the workflow and nodes, confirm that retrieval is authenticated by member identity, unauthorized files are not recalled, and the discrepancy list is written back after confirmation by the reviewer.
