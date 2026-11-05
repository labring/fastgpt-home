---
title: Workflow Orchestration for Public Vocational Skills Level Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c034-f008
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Workflows | Checks
meta_description: Skills Certification: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Public Vocational Skills Level Assessment: Compare Documents and Locate Differences

## What this category's data looks like

The core materials for material verification and discrepancy location in social evaluation of occupational skill level certification include the evaluation implementation plan, candidate registration forms, and assessor dispatch forms. The evaluation implementation plan is prepared by the evaluation agency before the certification batch starts, and contains the occupation direction, level, assessment modules, and time schedule; the candidate registration form is submitted by the candidate or the registration point, and contains identity information, declared occupation and level, and years of work; the assessor dispatch form is scheduled by the evaluation agency before the exam, and contains the assessor's name, assessment occupation, dispatch date, and signature field. The three types of materials enter in batches as the batch progresses: the implementation plan enters first, registration forms enter in bulk as registration closes, and dispatch forms enter before the exam. Field characteristics are four categories: name, quantity, date, and signature; the update rhythm is based on the batch cycle; the same record appears repeatedly across different materials; signatures and receipts serve as completeness markers.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Compare with the candidate registration form and assessor dispatch form to see whether the name, quantity, and date of the same record are consistent, and whether the signature field is complete | Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and reference `variables` for a trial run |
| Candidate registration form | Compare with the evaluation implementation plan and assessor dispatch form to see whether the name and quantity of the declared occupation, level, and date match, and whether the receipt is attached | Reference `variables` in subsequent nodes and run a trial once, and check whether the fields of that record are consistent across the two types of materials |
| Assessor dispatch form | Compare with the evaluation implementation plan and candidate registration form to see whether the assessor's name, dispatch date, and signature are consistent, and whether the version is synchronized | Check the branch connection corresponding to `nodeId` in the node, and confirm that options and branches correspond one-to-one |
| Workflow node (user selection and branching) | Each option corresponds to one branch, the interaction state is recorded, and the selection result variable has been passed to subsequent nodes | Trigger once and view the node status in the run record; reference that variable in subsequent nodes and run a trial once |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the evaluation implementation plan and the candidate registration form. Cause: The two types of materials enter in batches, and fields are not aligned to the same record.
- Symptom: The assessor dispatch form version is not synchronized, and signatures or receipts are missing. Cause: Pre-exam scheduling changes were not written back, and completeness markers were not checked.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: Options and branch connections were not checked one by one, and the interaction state was not recorded.

## How to verify the setup

Acceptance of this feature: run trials for each option one by one, check the branch direction and interaction state in the run record, confirm that options and branches correspond one-to-one, and reference `variables` and `nodeId` to check variable passing and node status.

Business test: use one real record to find fields inconsistent with the ledger, and check the name, quantity, date, and signature of that record in the evaluation implementation plan, candidate registration form, and assessor dispatch form.

- Check the options and branch connections one by one in the node, and trigger once to view the node status in the run record
- Reference `variables` in subsequent nodes and run a trial once, and check whether the fields of that record are consistent across the two types of materials
