---
title: Workflow Orchestration for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c045-f008
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Workflows | Intake
meta_description: Training Compliance: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Off-Campus Training Registration and Compliance: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of off-campus training compliance filing and penalty response. Materials come from three categories: school operating licenses, course filing materials, and fee disclosure. School operating licenses record institution name, address, validity period, and signature; course filing materials include course name, number of class hours, start date, and approval signature; fee disclosure includes fee items, amounts, disclosure date, and receipt. These materials are updated by semester or batch. The field characteristics are that the four types of information—name, quantity, date, and signature—are scattered across multiple documents. The name, quantity, and date of the same record often do not match across different materials, versions are not synchronized, and signatures or receipts are missing. When materials enter the workflow, the school operating license serves as the basis for subject qualification, course filing materials serve as the basis for business content, and fee disclosure serves as the basis for fee compliance. Together, the three support Q&A intake and missing-item follow-up.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Intake records and items to be completed" are continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Check whether the institution name, address, validity period, and signature are consistent with the course filing materials | Compare the name, date, and signature of the school operating license and the course filing materials item by item, and record inconsistencies |
| Course filing materials | Check whether the course name, number of class hours, start date, and approval signature are consistent with the fee disclosure | Compare the name, quantity, and date of the course filing materials and the fee disclosure item by item, and record missing signatures or receipts |
| Fee disclosure | Check whether the fee items, amounts, disclosure date, and receipt are synchronized with the versions of the school operating license and course filing materials | Compare the dates and versions of the fee disclosure, school operating license, and course filing materials item by item, and record unsynchronized items |
| User selection node | Check that each option corresponds to one branch, the interaction state is recorded, and the selection result variable is passed to subsequent nodes | In the node, check the options and branch connections one by one, trigger it once to view the node state in the run record, reference `variables` in a subsequent node, and run a trial |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the school operating license and the course filing materials. Cause: The two materials were filed separately without cross-checking.
- Symptom: The fee disclosure and course filing materials versions are not synchronized, and old-version content is still referenced. Cause: After materials were updated, they were not uniformly replaced, and version identifiers are missing.
- Symptom: The course filing materials lack an approval signature or the fee disclosure lacks a receipt. Cause: When materials were archived, the signature and receipt fields were not checked, and follow-up questions were not triggered.

## How to verify the setup

Run trials for each option one by one, check the branch direction and interaction state in the run record, and confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and check whether the `nodeId` and `variables` references are correct.

Business test: submit a question that lacks key information and see whether it asks a follow-up question before answering.

- Run trials for each option one by one, check the branch direction and interaction state in the run record, and confirm that the selection result variable has been passed to subsequent nodes.
- Reference `variables` in a subsequent node and run a trial once, and check whether the branch connection corresponding to `nodeId` matches the options one by one.
