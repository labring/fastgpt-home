---
title: Permissions and Data Isolation for Undergraduate Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c018-f013
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Permissions | Checks
meta_description: Program Revision: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Undergraduate Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

Undergraduate program revision involves three types of materials: program plans, course syllabi, and credit structure tables. Program plans come from exports of the academic affairs system, updated according to the academic-year revision cycle, with fields including course name, credits, total hours, semester offered, and signature column; course syllabi are submitted by the offering units, updated on a rolling basis as courses are adjusted, with fields including course name, credits, assessment method, and signatures of the author and reviewer; credit structure tables are compiled by academic affairs, iterated by version number, with fields including course name, credits, module affiliation, date, and receipt. When the three types of materials enter this feature, program plans and course syllabi serve as the objects to be checked, and the credit structure table serves as the ledger baseline, comparing name, quantity, date, and signature field by field.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is enforced by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The discrepancy list is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member, members can only see files they themselves can read, and retrieval recall is likewise filtered by that set.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Course name, credits, total hours, semester offered, and signature column must match the credit structure table item by item | Use a restricted member account to view the file list and details, and check whether the program plan fields are within the visible set |
| Course syllabus | Course name, credits, assessment method, and signatures of the author and reviewer must match the corresponding records in the program plan | Use a collaborator account to attempt to delete the file; it should be filtered and a prompt shown, confirming that deletion is limited to the creator |
| Credit structure table | Course name, credits, module affiliation, date, and receipt must be synchronized with the versions of the program plan and course syllabus | Use a restricted member account to search for the same course, and check that unauthorized files are not recalled |
| File-level permissions | Viewing the list and details requires knowledge base read permission plus file read permission, and retrieval is filtered by the current member's readable files | Check the authentication configuration of the workflow and nodes, and confirm that it takes effect when authenticating by member identity |

## Three common errors

- Symptom: the name, credits, or date of the same course do not match across two materials. Cause: the revised draft and the ledger version are not synchronized, and after being updated independently, no field-level comparison was performed.
- Symptom: the course syllabus lacks the signature and receipt of the author or reviewer. Cause: the submission step did not validate the signature column, and completeness was not checked when archiving the materials.
- Symptom: a restricted member saw files they should not see, or retrieval recalled unauthorized files. Cause: retrieval was not authenticated by member identity, or file-level permissions were not filtered item by item by member.

## How to verify the setup

Feature acceptance: use a restricted account to view the file list and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled.

Business test: use one real record to find fields inconsistent with the ledger, record the discrepancies in name, quantity, date, and signature, and submit them to the reviewer for confirmation and write-back.

- Use a restricted member account to view the list and details, check whether the visible file set is consistent with knowledge base read permission plus file read permission, and record the member scope corresponding to `teamId` and `tmbId`.
- Use a collaborator account to attempt to delete a file, confirm that only the creator can delete it and that non-creator items are filtered with a prompt, then check whether the authentication configuration of the workflow and nodes authenticates by member identity.
