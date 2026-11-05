---
title: Permissions and Data Isolation for Graduate Admissions Interviews and Selection: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c024-f013
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Permissions | Checks
meta_description: Graduate Admissions: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Graduate Admissions Interviews and Selection: Compare Documents and Locate Differences

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, materials enter this feature in three categories: the re-examination plan (including process, scoring, and signature fields), the candidate score sheet (including preliminary and re-examination scores, and dates), and the transfer/adjustment list (including adjustment batch, quota, and receipt). The source is submission by each admissions school by batch, and the update cadence is synchronized with re-examination batches and adjustment rounds; supplementary admissions, corrections, and version replacements often occur. Field characteristics are concentrated in three places for the same object: name, quantity, and date: name and candidate number, score and quota quantity, re-examination and adjustment dates. After the three material categories enter, each plays a different role: the re-examination plan provides the judgment criteria and signature basis, the candidate score sheet provides per-person details, and the adjustment list provides the list and receipt status. The three must be cross-checked to locate fields for the same record that do not match across two materials.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This part is enforced by member permissions and file-level permissions (server-side authentication), and the output is the set of visible files filtered by member. The "discrepancy list" is completed afterward by subsequent AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions; the team owner and system root are treated as having all permissions on all files.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Check whether the process nodes, scoring items, and signature fields in the plan are consistent with the judgment criteria of the score sheet and adjustment list | Retrieve the plan and the two lists by batch, compare process nodes, scoring items, and signature fields item by item, and record entries missing signatures or receipts |
| Candidate score sheet | Check whether the name, candidate number, score quantity, and date of the same candidate are consistent between the score sheet and the adjustment list | Use one real record to locate the same candidate in the score sheet and adjustment list, and list the fields whose name, quantity, or date do not match |
| Adjustment list | Check whether the adjustment batch, quota quantity, and receipt date are synchronized with the plan and score sheet | Compare batch number, quota quantity, and receipt date by adjustment round, and mark records whose version is not synchronized or whose receipt is missing |
| File list and retrieval | Check whether the visible file set is filtered item by item by member, and whether retrieval only recalls readable files | Use a restricted member account to view the list and details, then search the same question, and check the visible scope and recall results |

## Three common errors

- Symptom: the name or score quantity of the same candidate does not match between the score sheet and the adjustment list. Cause: the two materials were submitted in different batches, and cross-checking by the same candidate number was not performed.
- Symptom: the batch or quota quantity of the adjustment list is inconsistent with the plan. Cause: after the plan was updated, the list was not synchronously replaced, and the version was not synchronized, causing the criteria to diverge.
- Symptom: the plan or receipt is missing a signature, and the discrepancy list cannot be closed. Cause: the submission step did not return the signed document or receipt, so there is no judgment basis during verification.

## How to verify the setup

Feature acceptance: use a restricted member account to view the file list and details and perform one retrieval, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying a place nor being recalled; at the same time, check `teamId`, `tmbId`, and creator identity to confirm that deletion is limited to the creator.

Business test: use one real record to find fields inconsistent with the ledger, write out the name, quantity, and date discrepancies item by item, and submit them to the reviewer for confirmation and write-back.

- Pull the re-examination plan, candidate score sheet, and adjustment list by batch, use the candidate number as the primary key for three-table cross-comparison, output a discrepancy list, and annotate field-level differences.
- Use a restricted member account and a collaborator account to respectively view the list, search the same question, and attempt to delete a file, and check whether the visible scope, recall results, and deletion permissions meet expectations.
