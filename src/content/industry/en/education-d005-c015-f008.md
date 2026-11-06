---
title: Workflow Orchestration for School Mental Health Screening and Referrals: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c015-f008
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Workflows | Versions
meta_description: Student Mental Health: review workflows for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Mental Health Screening and Referrals: Maintain Document Versions and Changes

## What this category's data looks like

In the scenario of mental health screening and referral in primary and secondary schools, materials are usually divided into three categories: psychological screening plans, interview records, and referral forms. Screening plans come from unified deployment at the beginning of the semester, with fields including screening dimensions, scale name, administration date, and person in charge; interview records are filled in by psychological teachers one by one, with fields including interview time, chief complaint summary, risk level, and signature; referral forms are initiated by the homeroom teacher or psychological teacher, with fields including reason for referral, receiving party, receipt, and date. The three types of materials have different update rhythms: plans are revised by semester, interview records are appended as cases arise, and referral forms are supplemented with signatures during circulation. When entering workflow orchestration, screening plans serve as the basis for branching, interview records and referral forms serve as business deliverables to be verified, and the version ledger and change records are completed by subsequent nodes continuing execution according to the branch.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction status records. The version ledger and change records are then completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interactive state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether the plan version number, scale name, administration date, and signature uniquely correspond to the current version | In the node, check the options and branch connections one by one, confirm that the plan version points to a unique branch, and view the branch's `nodeId` and status in the run record |
| Interview record | Whether the name, count, and date of the same record match across the two materials, and whether signatures are complete | In subsequent nodes, reference the selection result variable `variables` and run a trial, comparing the name, count, and date fields in the interview record and the screening plan |
| Referral form | Whether the reason for referral, receiving party, receipt, and date are consistent with the interview record, and whether the old version is traceable | Trigger a user selection, view the node status in the run record, and check whether the referral form receipt and interview record references are updated synchronously |
| Version ledger and change records | Whether the current version is unique, the old version is traceable, and references are synchronized | After changing one piece of content, rerun the branch, check whether the version number and references are updated synchronously, and record the number of array entries and the reference text tokens |

## Three common errors

- Phenomenon: The name, count, and date of the same record do not match between the screening plan and the interview record. Cause: The two types of materials have different update rhythms; the plan is revised by semester while interviews are appended as cases arise, and no field-level comparison was performed.
- Phenomenon: The referral form has been updated, but the interview record still references the old version. Cause: The version was not synchronized, the branch direction did not change with the version number, and the old version reference was not checked back.
- Phenomenon: The referral form lacks the receiving party's signature or receipt. Cause: No signature and receipt verification was set up in the circulation step; after the interaction is completed, the process stops and does not enter subsequent nodes for supplementary signing.

## How to verify the setup

Acceptance of this feature: Run a trial for each option one by one, check the branch direction and interaction status in the run record, confirm that each option corresponds to one branch, that the selection result variable `variables` has been passed to subsequent nodes, and record the `nodeId`.

Business test: Change one piece of content and see whether the version number and references are updated synchronously.

- In the node, check the options and branch connections one by one, and confirm that options and branches correspond one-to-one.
- In subsequent nodes, reference the selection result variable and run a trial once, and check that the reference text tokens and the number of array entries are recorded separately.
