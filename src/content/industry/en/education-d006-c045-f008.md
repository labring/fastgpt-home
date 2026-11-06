---
title: Workflow Orchestration for Off-Campus Training Registration and Compliance: Track Progress and Check Statistics
slug: /en/industry/education-d006-c045-f008
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Workflows | Progress
meta_description: Training Compliance: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Off-Campus Training Registration and Compliance: Track Progress and Check Statistics

## What this category's data looks like

For off-campus training compliance filing and penalty response, materials come from three categories: school operating licenses, course filing materials, and fee disclosure. School operating licenses record the institution name, address, validity period, and issuance date; course filing materials record the course name, class hours, start date, and filing number; fee disclosures record fee items, amounts, disclosure dates, and signature fields. The three types of materials are updated weekly or monthly, and their field characteristics center on names, quantities, dates, signatures, and receipts. When entering workflow orchestration, the school operating license serves as the basis for the entity's qualifications, course filing materials serve as the source for course progress and statistical scope, and fee disclosures serve as the basis for verifying fee compliance and disclosure timing. Together, the three support the generation of the progress table and statistical scope statement, and retain branch directions and interaction status records for subsequent nodes to continue execution.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "Progress Table and Statistical Scope Statement" is completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interaction state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Whether the fields, dates, and signatures match the course filing materials and fee disclosure | Check the institution name, validity period, issuance date, and signature field, compare the three materials item by item, and record inconsistencies |
| Course filing materials | Whether the course name, class hours, and start date are consistent with the fee disclosure | Record the course name and class hours weekly, check the filing number and start date, and check whether the versions are synchronized |
| Fee disclosure | Whether the fee items, amounts, disclosure date, and signature receipt are complete | Check the fee items and disclosure date, check the signature and receipt, and confirm consistency with the course filing materials in name and quantity |
| User selection node | Whether options correspond one-to-one with branches, and whether the interaction status is recorded | Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and use `variables` and `nodeId` for a trial run |

## Three common errors

- Symptom: The name and quantity of the same course do not match between the course filing materials and the fee disclosure. Cause: The two materials were entered separately, without field-level verification and version synchronization.
- Symptom: The dates and signature field of the school operating license are missing from the progress table. Cause: After the materials were updated, they were not synchronized to the statistical scope, and missing signatures or receipts were not marked.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the selection result variable was not passed to subsequent nodes.

## How to verify the setup

Acceptance for this feature: run trials for each option one by one, check the branch directions and interaction status in the run records, confirm that `variables` and `nodeId` are correctly referenced in subsequent nodes, and ensure the same session does not repeatedly enter interaction.

Business test: use one week of records to verify the totals, check whether the scope and exceptions are clearly stated, and confirm that the number of records matches the statistical count and that the scope is written in the table header.

- Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and confirm that the selection result variable has been passed to subsequent nodes.
- Use one week of records to verify the totals, and check whether the names, quantities, dates, and signatures of the school operating license, course filing materials, and fee disclosure are consistent, and whether the versions are synchronized.
