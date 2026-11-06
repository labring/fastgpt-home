---
title: Permissions and Data Isolation for School Exam Question Setting and Grading: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c011-f013
page_type: 行业问题页
application_area: education
meta_title: School Exams | Permissions | Checks
meta_description: School Exams: review permissions for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for School Exam Question Setting and Grading: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy location in the primary and secondary school exam question setting and grading scenario, involving three core material types: the question-setting two-way specification table, the exam paper, and the grading rubric. These materials are usually provided separately by the subject question-setting group, the reviewer, and the academic affairs department, and their update cadence advances with exam batches and review receipts. After entering the permissions and data isolation feature, each material is filtered item by item according to file-level permissions; members of the question-setting group can only see files related to their own responsibilities, while reviewers and re-checkers obtain the corresponding read permissions based on the collaborator configuration. In the verification step, the role of the materials is to serve as the comparison objects for discrepancy location; the name, quantity, date, signature, and version status of the same object must remain consistent between the two materials, and the discrepancy results are compiled into a discrepancy list for the re-checker to confirm and write back.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Whether the name, quantity, date, and signature are consistent with the exam paper | Use a member of the question-setting group account to view the list and details, and check the corresponding fields of the specification table and the exam paper |
| Exam paper | Whether the version is synchronized and whether the number of grading rubrics matches | Use a reviewer account to search for the same test question, and check the version and quantity of the exam paper and the grading rubric |
| Grading rubric | Whether the signature and receipt are complete and whether the date is consistent with the exam paper | Use a re-checker account to view the file details, and check the signature and receipt fields of the grading rubric |

## Three common errors

- Symptom: a restricted member saw an exam paper they should not see. Cause: file-level permissions were not filtered item by item by member, and the list was not returned by knowledge base read permission plus file read permission.
- Symptom: retrieval recalled an unauthorized grading rubric. Cause: the workflow was not authenticated by member identity, and retrieval was not filtered by the current member's readable files.
- Symptom: a collaborator cannot delete the specification table. Cause: deletion is limited to the creator; neither collaborators nor administrators can delete files not created by themselves.

## How to verify the setup

This feature's acceptance: use a restricted account to view the list and perform one retrieval, and check the visible scope. The list is filtered item by item by knowledge base read permission plus file read permission, and unreadable files do not occupy a place; retrieval is filtered by the current member's readable files, and unauthorized files are not recalled. Check the authentication configuration of the verification workflow and nodes to confirm that authentication by member identity takes effect.

Business test: use one real record to find fields inconsistent with the ledger, focusing on comparing the name, quantity, date, signature, and version status, and write the discrepancies into the discrepancy list for the re-checker to confirm and write back.

- Use a restricted member account to view the file list and details, confirm that only files for which the member has read permission are returned, and record the visible set along with `teamId` and `tmbId`.
- Use a collaborator account to attempt to delete a file not created by themselves, confirm that it is filtered and a prompt is shown, and check that deletion is limited to the creator.
