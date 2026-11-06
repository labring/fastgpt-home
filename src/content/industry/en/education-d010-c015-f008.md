---
title: Workflow Orchestration for School Mental Health Screening and Referrals: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c015-f008
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Workflows | Operations
meta_description: Student Mental Health: review workflows for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Mental Health Screening and Referrals: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: psychological screening plans, interview records, and referral forms. Psychological screening plans come from unified deployment at the beginning of the semester and contain scale version, screening dimensions, and decision threshold fields; their update cadence follows semester or policy adjustments. Interview records are filled in by psychological teachers on a per-session basis and include interview date, subject, chief complaint, and signature field. Referral forms are initiated by homeroom teachers or psychological teachers and include referral reason, recipient, receipt, and signature. When these three types of materials enter workflow orchestration, their roles differ: screening plans provide the basis for branching, interview records supplement individual information, and referral forms carry cross-role handover. Field characteristics are concentrated in four categories: name, quantity, date, and signature. During cross-material comparison, the most common issues are inconsistent names for the same record, misaligned dates, missing signatures or receipts, and unsynchronized versions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. "Handover-ready deployment status and operation records" are then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| User selection node options and branches | Each option corresponds to one branch; option names and branch connections correspond one-to-one within the node | Check each option and branch connection one by one in the node; after a trial run, see whether the branch direction in the run record matches the option |
| Interaction state record | The state is recorded when entering the node, and the state is updated after the selection is completed | Trigger a user selection node once, and check whether the node state and interaction state appear in pairs in the run record |
| Selection result variable | It has been passed to subsequent nodes, and subsequent nodes can reference it | Reference this variable in a subsequent node and run a trial once; verify that the `variables` value matches the selected option, and record the `nodeId` |
| Psychological screening plans, interview records, and referral forms | The names, quantities, dates, and signatures of the three types of materials are consistent during cross-material comparison | Check item by item according to the handover form: whether the name, quantity, and date of the same record match across the three materials, whether signatures and receipts are complete, and whether versions are synchronized |

## Three common errors

- Symptom: after selecting an option, the default branch is still followed. Cause: the options and branch connections were not checked one by one, or the selection result variable was not correctly passed to subsequent nodes.
- Symptom: the name, quantity, and date of the same record do not match between the screening plan and the referral form. Cause: cross-material comparison was not checked item by item, and versions were not synchronized.
- Symptom: after the interaction is completed, the process stops, or the same session repeatedly enters the interaction. Cause: the interaction state record was not updated with the selection, and subsequent branches were not triggered when signatures or receipts were missing.

## How to verify the setup

Acceptance of this feature: run trials for each option one by one, check the branch direction and interaction state in the run records, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and record `variables` and `nodeId`.

Business test: check once item by item according to the handover form, see which record is missing, and focus on checking name, quantity, date, and signature.

- Check each option and branch connection one by one in the node; after a trial run, compare the branch direction and interaction state in the run record.
- Reference the selection result variable in a subsequent node and run a trial once; verify that the `variables` value matches the selected option, and record the `nodeId`.
