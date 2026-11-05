---
title: Permissions and Data Isolation for Teacher Qualification Exams and Certification: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c056-f013
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Permissions | Checks
meta_description: Teacher Qualifications: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Teacher Qualification Exams and Certification: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the teacher qualification exam and certification business, with materials covering three categories: written and interview registration forms, Mandarin proficiency certificates, and medical examination forms. Registration forms are filled in by candidates and aggregated by exam administration staff, with fields including name, ID number, subjects registered, exam date, and signature; Mandarin proficiency certificates are issued by testing institutions, with fields including certificate number, grade, test date, and issuing signature; medical examination forms are filled in by designated hospitals, with fields including medical examination conclusion, date, and physician signature. The three material categories enter in batches within the certification cycle: registration forms are updated with registration batches, while certificates and medical examination forms are supplemented according to receipt time, with the latest receipt taken as the authoritative version. When materials enter this feature, registration forms serve as the baseline for identity and subjects, while Mandarin proficiency certificates and medical examination forms serve as supporting evidence for qualification conditions; together the three constitute the material set for the same certification subject, for discrepancy comparison and review write-back.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is enforced by member permissions and file-level permissions (server-side authentication), outputting the visible file set filtered by member. The "discrepancy list" is completed subsequently by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Viewing the list and details requires knowledge base read permission plus file read permission, deletion is limited to the creator, and retrieval is filtered by the files readable by the current member and only takes effect when authenticated by member identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | The name, registered subjects, and exam date of the same certification subject are consistent across the two materials, and the signature and receipt are complete | View the list and details with a restricted member account, compare the name, subject, and exam date fields of the registration form and the ledger item by item, and mark items missing signatures |
| Mandarin proficiency certificate | The certificate number, grade, and test date are consistent across the two materials, and the version is the latest receipt | Check the number, grade, and test date of the certificate and the ledger, check whether there is an old version not synchronized, and record the discrepancy fields |
| Medical examination form | The medical examination conclusion, medical examination date, and physician signature are consistent across the two materials, and the receipt has been archived | Compare the conclusion and date of the medical examination form and the ledger, confirm whether the signature and receipt are missing, and output the discrepancy list |
| File-level permissions | Restricted members can only see files to which they have been granted read permission, and unauthorized files do not appear in the list and retrieval results | Use a restricted member account to view the list and retrieve the same question, and check the visible scope; deletion is available only to the creator, and a collaborator's attempted deletion should be filtered and prompted |

## Three common errors

- Symptom: the name and exam date of the same record do not match between the registration form and the ledger. Cause: the two materials are entered in batches without field-level comparison, and discrepancies are not marked.
- Symptom: the Mandarin proficiency certificate grade and test date are inconsistent across the two materials. Cause: the old version is not synchronized, the latest receipt does not overwrite the original record, and the version is based on the expired document.
- Symptom: the medical examination form is missing the physician signature or receipt. Cause: the material supplementation step does not verify the completeness of the signature and receipt, and archiving does not intercept it.

## How to verify the setup

Verify the file list and retrieval results by member identity, confirming that restricted members cannot see unauthorized files and that unauthorized files are not recalled.

Compare the name, quantity, date, and signature receipt of the registration form, Mandarin proficiency certificate, medical examination form, and ledger item by item, output the discrepancy list, and write back the review conclusion.

- This feature's acceptance: use a restricted member account to view the file list and retrieve once, and check whether the visible scope contains only authorized files, with unauthorized files neither occupying a place nor being recalled; then check the member identity authentication configuration corresponding to `teamId` and `tmbId`.
- Business test: use one real record to find fields inconsistent with the ledger, mark name, quantity, or date discrepancies, and hand them to the reviewer for confirmation and write-back.
