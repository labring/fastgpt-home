---
title: Permissions and Data Isolation for Vocational College Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c029-f013
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Permissions | Checks
meta_description: Vocational Curricula: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Vocational College Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

The development of talent cultivation programs in vocational colleges involves three types of materials: talent cultivation programs, curriculum standards, and job competency analysis tables. The talent cultivation program is led by the academic affairs office, the curriculum standards are written by secondary colleges, and the job competency analysis tables are formed by professional teams in collaboration with enterprises through research. Materials are updated in batches by academic year or professional group, and fields include course name, credit hours and credits, semester offered, signature date, version number, and receipt number. When entering this function, the three types of materials are stored as files, each playing a different role: the talent cultivation program serves as the overall framework, the curriculum standards serve as the basis at the course level, and the job competency analysis tables serve as the source of competency mapping. Material verification requires comparing item by item within the visible range of members in the file list and search, and the discrepancy list is confirmed by the reviewer and then written back.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), outputting the set of visible files filtered by member. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work; the file list and search only return the readable set filtered by member. Team administrators do not bypass file-level permissions, and unauthorized files will not appear in the list and search results.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Name, quantity, date, and signature must be consistent with the curriculum standards and job competency analysis tables | Use a restricted member account to view the file list and details, and check whether the course names, credit hours, and signature dates in the talent cultivation program align item by item with the curriculum standards |
| Curriculum standards | Version number and receipt number must be synchronized with the talent cultivation program | Check whether the version number of the curriculum standards is consistent with the version referenced in the talent cultivation program, check whether the receipt number is missing, and confirm the scope of file read permissions |
| Job competency analysis table | Job names, number of competency entries, and signature date must correspond to the curriculum standards | Compare the number of competency entries in the job competency analysis table with the number of course objectives in the curriculum standards, and check whether the signature dates are complete |
| File-level permissions | Filter item by item by member; deletion is limited to the creator | Use a collaborator account to attempt to delete a file, confirm that it is filtered and a prompt is shown; check the member identity authentication configuration corresponding to `teamId` and `tmbId` |

## Three common errors

- Phenomenon: The credit hours for the same course do not match between the talent cultivation program and the curriculum standards. Cause: The two materials were updated by different members, versions were not synchronized, and field-by-field comparison was not performed during verification.
- Phenomenon: The job competency analysis table lacks a signature or receipt number. Cause: The signature date was not written back during the material circulation process, and the reviewer did not mark the missing item in the discrepancy list.
- Phenomenon: Restricted members see unauthorized files in search. Cause: The workflow preselected knowledge base was not authenticated by member identity, file-level filtering did not take effect, and search recalled based on knowledge base permissions.

## How to verify the setup

This function's acceptance: Use a restricted account to view the file list and perform one search, and check whether the visible range contains only files for which that member has read permission, with unauthorized files neither occupying a place nor being recalled.

Business test: Use a real record to find fields inconsistent with the ledger, check the name, quantity, date, signature, and receipt number, form a discrepancy list, and submit it to the reviewer for confirmation and write-back.

- Use a restricted member account to view the list and details, confirm that only files for which that member has read permission are returned, and check the authentication configuration of `teamId` and `tmbId`.
- Use a collaborator account to attempt to delete a file, confirm that only the creator can delete, and that non-creator items are filtered with a prompt.
