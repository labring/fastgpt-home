---
title: Workflow Orchestration for School Mental Health Screening and Referrals: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c015-f008
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Workflows | Checks
meta_description: Student Mental Health: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Mental Health Screening and Referrals: Compare Documents and Locate Differences

## What this category's data looks like

Materials in the primary and secondary school mental health screening and referral scenario mainly come from three types: screening plans, interview records, and referral forms. The screening plan is updated by the school mental health center each semester and includes the screening subjects, scale name, administration date, and a signature field for the responsible teacher; the interview record is filled in item by item by the homeroom teacher or mental health teacher and includes the student's name, interview date, problem description, and the interviewer's signature; the referral form is initiated by the mental health teacher and includes the referral subject, reason for referral, referral date, receiving party, and a receipt field. After the three types of materials enter the workflow, their roles differ: the screening plan is the baseline ledger, the interview record is the process trace, and the referral form is the destination voucher. Material fields center on names, quantities, dates, signatures, and receipts; the update rhythm is centralized entry at the beginning of the semester and supplementary entry case by case during the semester, and cross-material alignment depends on the same object identifier.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is completed next by subsequent nodes continuing execution according to the branch. After the user completes the selection, execution continues along the branch corresponding to the selected option, and the interaction state and selection result variables are recorded together.

| Object | Check | Verification action |
| --- | --- | --- |
| Screening plan | Check whether the screening subject name, quantity, administration date, and responsible teacher signature in the plan are complete | Check the options and branch connections one by one in the node, and confirm that the plan fields enter the comparison branch |
| Interview record | Check whether the student name, interview date, problem description, and interviewer signature in the interview record are consistent with the plan | Reference the selection result variable in `variables` in a subsequent node and run a trial once |
| Referral form | Check whether the referral subject, reason for referral, referral date, receiving party, and receipt in the referral form are consistent with the interview record | Trigger a user selection node once and check the `nodeId` and node status in the run record |
| Workflow node | Check whether each option corresponds to one branch and whether the process continues after the interaction is completed | Check the options and branch connections one by one in the node, and confirm that `variables` has been passed to subsequent nodes |

## Three common errors

- Symptom: the name or date of the same student does not match between the screening plan and the interview record. Cause: the two materials are entered separately, and there is no field comparison using the same object identifier.
- Symptom: the referral form has been sent but the receipt field is blank. Cause: the receipt was not synchronized during the material circulation step, and the signature and receipt fields were not included in the verification.
- Symptom: after the screening plan is updated, the interview record still references the old version. Cause: the version was not synchronized, and inconsistent material update rhythms led to field discrepancies.

## How to verify the setup

Feature acceptance: run trials option by option, check the branch direction and interaction state in the run record, and confirm that `variables`, `nodeId`, and the interaction state record are consistent.

Business test: use one real record to find fields inconsistent with the ledger, submit the discrepancy list to the reviewer for confirmation, and write it back.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Trigger a user selection node once and check the node status and selection result variable in the run record.
