---
title: Permissions and Data Isolation for Vocational College Program Registration: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c028-f013
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Permissions | Checks
meta_description: Vocational Programs: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Vocational College Program Registration: Compare Documents and Locate Differences

## What this category's data looks like

The data for this category consists mainly of the program setup filing form as the primary document, with the talent demand justification report and the faculty and equipment list as attachments. Sources include academic affairs, secondary schools/departments, partner enterprises, and human resources and asset departments. The update cadence is collected in batches according to the academic-year application cycle and filing receipts. The filing form contains the program name, code, program length, planned enrollment number, and signature date; the justification report contains survey samples, job demand, quantity, and conclusion date; the faculty and equipment list contains teacher names, titles, equipment names, quantities, purchase dates, and acceptance signatures. After these three types of materials enter this feature, the filing form serves as the primary record, and the justification and list serve as comparison attachments. Fields are aligned by the same program name and level, forming a material set that can be checked item by item, supporting the generation and write-back of a discrepancy list.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is enforced by member permissions and file-level permissions (server-side authentication), outputting the visible file set filtered by member. The discrepancy list is completed subsequently by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions, and deletion is limited to the creator.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | The program name, program code, program length, planned enrollment number, and signature date must match the attachments field by field | Use a restricted member account to view the list and details, and check the name, quantity, and date fields of the filing form and justification report |
| Talent demand justification report | The surveyed job names, demand quantities, and conclusion date must match the corresponding fields in the filing form, with no missing signatures or receipts | Restrict member identity by `teamId` and `tmbId`, search for the same program issue, and check the justification report fields |
| Faculty and equipment list | Teacher names, titles, equipment names, quantities, purchase dates, and acceptance signatures must match the filing form and ledger | Use a collaborator account to attempt to delete a file not created by that user, confirm it is filtered and prompted, then check the list fields |
| File list and retrieval | The visible file set is filtered item by item by member; unauthorized files do not occupy a place and are not recalled | Check the authentication configuration of the workflow and nodes, and confirm that retrieval is filtered by the current member's readable files |

## Three common errors

- Symptom: The name, quantity, or date of the same program does not match across two materials. Cause: The filing form and justification report are collected in batches, fields are not aligned by the same program, and discrepancies are not located before write-back.
- Symptom: Versions are not synchronized, and an old list is still recalled by retrieval. Cause: File-level permissions filter by member, but the visible set for a restricted member includes unreplaced old attachments.
- Symptom: Materials missing signatures or receipts still enter comparison. Cause: Signature fields are not checked during material collection, and collaborators cannot delete files not created by them, so missing items remain for a long time.

## How to verify the setup

Acceptance for this feature: Use a restricted account to view the list and perform one retrieval, and check that the visible scope contains only files that the member has read permission for; unauthorized files do not occupy a place and are not recalled.

Business test: Use one real record to find a field inconsistent with the ledger, have the reviewer confirm it, and write back the discrepancy list.

- Check member identity and file-level permissions by `teamId` and `tmbId`, and confirm that the list and retrieval are returned according to that set.
- Use a collaborator account to attempt to delete a file not created by that user, confirm it is filtered and prompted, then check item by item the name, quantity, date, and signature of the filing form, justification report, and faculty and equipment list.
