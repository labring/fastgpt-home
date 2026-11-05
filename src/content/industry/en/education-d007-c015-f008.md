---
title: Workflow Orchestration for School Mental Health Screening and Referrals: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c015-f008
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Workflows | Review
meta_description: Student Mental Health: review workflows for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Mental Health Screening and Referrals: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: screening plans, interview records, and referral forms. Screening plans are usually updated per semester or academic year, and contain screening scales, time windows, and responsibility assignments; interview records are filled in item by item by psychological teachers or homeroom teachers after screening, and contain student identifiers, interview dates, observation descriptions, and preliminary conclusions; referral forms are issued after an anomaly is found, and contain the referral target, referral reason, receiving party, and receipt. When the three types of materials enter workflow orchestration, their roles differ: screening plans provide the baseline for anomaly determination and field definitions, while interview records and referral forms provide the original record support for anomaly tracing. In terms of update cadence, screening plans change with policy and scale versions, while interview records and referral forms are generated in real time with individual cases. Field characteristics center on student name or ID, date, quantity, signature, and receipt. The same record often has mismatched names, quantities, and dates across two materials, versions are not synchronized, and signatures or receipts are missing.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), and outputs branch directions and interaction state records. The "anomaly list and review conclusions" are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Screening plan | Whether the screening dimensions, dates, and responsible persons in the plan are consistent with the interview records and referral forms | Check the plan fields against the dates and signatures in the interview records and referral forms item by item, and confirm that the anomaly determination baseline is traceable |
| Interview record | Whether the student identifier, interview date, and quantity in the record match the referral form | Check the options and branch connections one by one in the node, and reference `variables` to see whether the selection result variable is passed to subsequent nodes |
| Referral form | Whether the referral reason, receiving party, and receipt are consistent with the screening plan and interview records | Check the signature and receipt on the referral form, trigger a user selection node once, and view the node status corresponding to `nodeId` in the run record |
| User selection node | Each option corresponds to one branch, and the interaction state is recorded | Trigger it once and view the node status in the run record; reference the selection result variable in a subsequent node and run a trial once |

## Three common errors

- Symptom: the name and date of the same student do not match between the interview record and the referral form. Cause: the two materials are filled in separately, and the field definitions are not unified according to the screening plan.
- Symptom: after the screening plan is updated, the interview records and referral forms still reference the old version. Cause: the versions are not synchronized, and the node branches are not adjusted according to the new plan.
- Symptom: the referral form lacks a signature or receipt, and the anomaly cannot be closed. Cause: the review step does not enforce checking the signature and receipt fields in the node.

## How to verify the setup

This feature's acceptance: run trials option by option, check the branch direction and interaction state in the run record, and confirm that `variables`, `nodeId`, and the option branches correspond.

Business test: create an anomaly record, see whether the source material can be traced, and check the fields, dates, and signatures of the screening plan, interview record, and referral form.

- Check the options and branch connections one by one in the node, trigger a user selection node once, and view the node status in the run record.
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the branch direction is consistent with the recorded interaction state.
