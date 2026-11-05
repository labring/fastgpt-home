---
title: Workflow Orchestration for Teacher Qualification Exams and Certification: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c056-f008
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Workflows | Checks
meta_description: Teacher Qualifications: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Teacher Qualification Exams and Certification: Compare Documents and Locate Differences

## What this category's data looks like

This category's data covers three types of materials: written and interview exam registration forms, Mandarin proficiency certificates, and medical examination forms. Registration forms are filled in by candidates and then undergo preliminary review by the test site; their fields include name, ID number, exam subjects, exam date, and signature field. Mandarin proficiency certificates are issued by testing institutions; their fields include name, ID number, grade, test date, certificate number, and issuing seal. Medical examination forms are issued by designated hospitals; their fields include name, examination date, conclusions for each department, physician signature, and hospital receipt. The three types of materials update at different rhythms: registration forms update with each exam session, Mandarin proficiency certificates are valid long-term but reissuance or replacement generates a new version, and medical examination forms have a validity period according to the certification batch. When materials enter workflow orchestration, the registration form serves as the primary record source, while the Mandarin proficiency certificate and medical examination form serve as comparison sources, each taking on the role of field verification and discrepancy localization, with branch direction driven by user selection nodes.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction status records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview exam registration form | Name, quantity, date, and signature are consistent with the ledger | Verify whether the name and ID number are identical character by character, whether the number of exam subjects equals the number of ledger entries, and whether the exam date and signature field are complete; use `variables` to compare field by field |
| Mandarin proficiency certificate | Name, quantity, date, and seal are consistent with the registration form | Verify whether the name and ID number are the same as in the registration form, whether the grade and test date are consistent with the ledger records, and whether the certificate number and issuing seal are missing; use `nodeId` to locate the node where the discrepancy is located |
| Medical examination form | Name, quantity, date, and signature are consistent with the receipt | Verify whether the name and examination date are the same as in the registration form, whether the number of conclusions for each department equals the ledger, and whether the physician signature and hospital receipt are missing; confirm whether the version is synchronized |
| Discrepancy list | If the fields of the same object do not match across the two materials, it is marked | List inconsistent fields and the material they are in one by one, mark items whose versions are not synchronized and items missing signatures, and submit them to the reviewer for confirmation and write-back |

## Three common errors

- Phenomenon: The name or ID number of the same record does not match between the registration form and the Mandarin proficiency certificate. Cause: The two materials are entered in different stages, and field-by-field comparison is not performed before proceeding to the next node.
- Phenomenon: The version of the medical examination form is not synchronized, and the old version's conclusion is used as the current conclusion. Cause: After the material is updated, comparison is not triggered again, and the ledger still points to the old version record.
- Phenomenon: The medical examination form lacks a physician signature or hospital receipt, and the registration form lacks the candidate's signature. Cause: When materials are collected, the signature field and receipt field are not verified, and the discrepancy list does not mark the missing items.

## How to verify the setup

Feature acceptance: Try running each option one by one, check the branch direction and interaction status in the run records, confirm that `variables` and `nodeId` can be referenced in subsequent nodes, and verify that options correspond one by one to branch connections.

Business test: Use one real record to find fields inconsistent with the ledger, verify the three items of name, quantity, and date, and mark items whose versions are not synchronized and items missing signatures.

- In the user selection node, verify options and branch connections one by one; after triggering once, check the node status and interaction status in the run records.
- In subsequent nodes, reference the selection result variable and run a trial once to confirm that the branch direction corresponds one by one to the fields in the discrepancy list.
