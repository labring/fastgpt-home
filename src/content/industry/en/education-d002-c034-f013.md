---
title: Permissions and Data Isolation for Public Vocational Skills Level Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c034-f013
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Permissions | Checks
meta_description: Skills Certification: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Public Vocational Skills Level Assessment: Compare Documents and Locate Differences

## What this category's data looks like

This page covers three types of materials for social assessment of occupational skill level certification: the assessment implementation plan, the candidate registration form, and the assessor dispatch form. The assessment implementation plan is finalized by the assessment agency before the certification batch starts, and includes the occupation name, level, assessment date, assessor configuration, and signature fields; the candidate registration form is submitted by the candidate or registration point, and includes name, ID number, declared occupation and level, registration date, and receipt; the assessor dispatch form is issued by the assessment agency before the assessment, and includes assessor name, dispatched position, assessment date, and signature. The three types of materials are linked within the certification batch by batch number, and the update rhythm is: the plan is finalized first, registration forms are submitted on a rolling basis with registration, and the dispatch form is locked one week before the assessment. When the materials enter this function, the plan and dispatch form serve as the baseline ledger, and the registration form serves as the object to be verified, gathered by batch number into the same file collection for discrepancy localization.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is enforced by member permissions and file-level permissions (server-side authentication), and outputs the visible file collection filtered by member. The "discrepancy list" is completed next by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable collection filtered by member. Team administrators do not bypass file-level permissions, and the system root and team owner are regarded as having all permissions on all files.

| Object | Check | Verification action |
| --- | --- | --- |
| Assessment implementation plan | Check whether the occupation name, level, assessment date, and assessor signature are consistent with the ledger | Compare the plan file with the batch ledger field by field, and record discrepancies in name, quantity, and date |
| Candidate registration form | Check whether the name, declared occupation and level, registration date, and receipt signature are consistent with the plan | Pull the registration form by batch number, compare it item by item with the plan, and mark missing signatures or receipt items |
| Assessor dispatch form | Check whether the assessor name, dispatched position, assessment date, and signature are consistent with the plan | Compare the dispatch form with the plan, and check whether the version is synchronized and whether signatures are complete |
| File read permission | This member has read permission only for this one file | Use this member account to view the list and details, and verify the visible scope and `tmbId` ownership |

## Three common errors

- Phenomenon: the same candidate's name and declared level do not match between the registration form and the plan. Cause: registration forms are submitted on a rolling basis by batch, and after the plan is finalized, changes are not written back, so the version is not synchronized.
- Phenomenon: the assessment date in the dispatch form is inconsistent with the plan, and the number of assessors does not match. Cause: the dispatch form is locked one week before the assessment, and after the plan is adjusted, the dispatch form is not updated in sync.
- Phenomenon: the registration form lacks a receipt signature, and the dispatch form lacks an assessor signature. Cause: the signature fields are not validated during material collection, and the receipt is not archived together with the registration form.

## How to verify the setup

This function's acceptance: use a restricted member account to view the file list and perform one retrieval, check whether the visible scope contains only files readable by that member, ensure unauthorized files do not occupy a place and are not recalled, and record the ownership of `teamId` and `tmbId`.

Business test: use one real record to find fields inconsistent with the ledger, mark discrepancies in name, quantity, or date, and submit them to the reviewer for confirmation and write-back.

- Pull the assessment implementation plan, candidate registration form, and assessor dispatch form by batch number, and compare name, quantity, date, and signature fields field by field.
- Use a restricted member account to check the file list and retrieval results, and confirm that the visible collection is consistent with the permission configuration of `teamId` and `tmbId`.
