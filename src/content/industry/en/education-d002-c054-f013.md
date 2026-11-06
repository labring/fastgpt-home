---
title: Permissions and Data Isolation for Self-Study Exam Records and Graduation Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c054-f013
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Permissions | Checks
meta_description: Self-Study Exams: review permissions for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Permissions and Data Isolation for Self-Study Exam Records and Graduation Review: Compare Documents and Locate Differences

## What this category's data looks like

Self-taught examination registration and graduation review involves three types of materials: registration archives, course qualification certificates, and graduation application forms. Registration archives are updated by the provincial examination office after each exam registration, and contain name, exam registration number, ID number, major code, course scores, and transfer/exemption records; course qualification certificates are issued by the main examining institution after each round of unified exams, and contain course name, credits, qualification date, and seal; graduation application forms are submitted by candidates when they meet the conditions, and contain name, major, number of courses, signature, and receipt. When these three types of materials enter the material verification and discrepancy localization function, the registration archives serve as the baseline ledger, the course qualification certificates serve as the item-by-item comparison source, and the graduation application forms serve as the objects to be reviewed, used to locate inconsistencies in names, quantities, dates, and signatures.

## Configuration and implementation checks

Enable commercial file permissions and give the member read access to the knowledge base.

This step is executed by member permissions and file-level permissions (server-side authentication), and outputs the set of visible files filtered by member. The "discrepancy list" is subsequently completed by AI nodes, code nodes, or manual work; the file list and retrieval only return the readable set filtered by member. Team administrators do not bypass file-level permissions, and knowledge bases and files are still authenticated according to their respective collaborator configurations.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration archives | Name, exam registration number, major code, and course scores must match the ledger field by field | Use a restricted member account to view the file list and details, and check whether the readable files under `teamId` contain only authorized archives |
| Course qualification certificates | Course name, credits, qualification date, and seal must match the corresponding records in the registration archives | Use a collaborator account to try deleting a qualification certificate not created by oneself; it should be filtered out and a prompt should appear |
| Graduation application forms | Name, number of courses, signature, and receipt must match the summary of the registration archives and qualification certificates | Use a restricted member account to search for the same course, check whether unauthorized files are not recalled, and record the visible set corresponding to `tmbId` |

## Three common errors

- Phenomenon: The same candidate's name is written differently in the registration archives and the graduation application form, and the number of courses does not match. Cause: The two forms are entered at different stages, and no field-level comparison was performed.
- Phenomenon: A course qualification certificate has been updated to a new version, but the registration archives still reference the old course code. Cause: The version was not synchronized, and there is a lack of update receipt and timestamp verification.
- Phenomenon: A graduation application form lacks the signature or receipt of the main examining institution but still enters review. Cause: Signatures and receipts were not included in the material verification checklist.

## How to verify the setup

Acceptance of this function: Use a restricted account to view the list and perform one search, and check whether the visible scope contains only files readable by that member, with unauthorized files neither occupying space nor being recalled.

Business test: Use one real record to find fields inconsistent with the ledger, record discrepancies in name, quantity, and date, and submit them to the reviewer to confirm write-back.

- Check the authentication configuration of the verification workflow and nodes, confirm that authentication is based on member identity, and that retrieval is filtered by the files readable by the current member.
- Compare the fields, dates, and signatures of the registration archives, course qualification certificates, and graduation application forms item by item, generate a discrepancy list, and write back the review results.
