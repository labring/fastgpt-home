---
title: Workflow Orchestration for School Mental Health Screening and Referrals: Find Supporting Evidence
slug: /en/industry/education-d001-c015-f008
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Workflows | Evidence
meta_description: Student Mental Health: review workflows for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Mental Health Screening and Referrals: Find Supporting Evidence

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: psychological screening plans, interview records, and referral forms. A psychological screening plan is usually updated by the school psychology center at the beginning of each semester, and includes screening subjects, tool names, administration dates, and a signature field for the person in charge; interview records are filled in one by one by the homeroom teacher or psychology teacher, and include interview time, student name, problem description, and the recorder's signature; referral forms are initiated by the psychology teacher, and include the referral subject, reason for referral, receiving institution, receipt, and signatures of both parties. When these three types of materials enter this function, their roles differ: the psychological screening plan provides the source and version baseline for basis items, interview records provide individual facts and timeline, and referral forms provide destination and receipt evidence. In terms of update cadence, plans are by semester, records are by instance, and referral forms are by event. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. Cross-material verification requires referring back to the original text.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction status records. "Basis items that can be traced back to the original text" are then completed by subsequent nodes continuing execution according to the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether the version is current, and whether the administration date and number of screening subjects match the interview records | Check options and branch connections one by one in the node, trigger one run to view node status in the run records, and reference `variables` and `nodeId` in subsequent nodes for a trial run |
| Interview records | Whether the student name, interview date, and problem description are consistent with the plan roster and referral form, and whether signatures are complete | Compare fields in the plan roster and referral form one by one, check the recorder's signature and date, and verify whether referenced variables are passed to subsequent nodes |
| Referral form | Whether the referral subject, reason for referral, receiving institution, receipt, and signatures of both parties correspond to the interview records | Check the receipt and signature fields, compare the referral date with the interview date, and confirm that branch direction is consistent with the interaction status records |
| User selection node | Whether each option corresponds to one branch, and whether the selection result variable has been passed to subsequent nodes | Check options and branch connections one by one in the node, trigger one run to view node status in the run records, and reference `variables` and `nodeId` in subsequent nodes for a trial run |

## Three common errors

- Symptom: the name or number of people for the same student does not match between the screening plan and the interview records. Cause: the two materials were entered separately, no cross-material traceback verification was performed, and the name and quantity fields were not aligned.
- Symptom: the screening plan version referenced by the referral form is outdated. Cause: after the plan was updated by semester, it was not synchronized to the referral process, and the version was not synchronized, causing the basis items to become invalid.
- Symptom: interview records or referral forms lack the recorder's signature or receipt. Cause: no signature and receipt validation was set up in the material circulation step, and materials still enter subsequent nodes when signatures or receipts are missing.

## How to verify the setup

This function's acceptance: run a trial for each option one by one, check the branch direction and interaction status in the run records, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and reference `variables` and `nodeId` in subsequent nodes for one trial run.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and verify that the source comes from the institution’s materials, that the version is current, and that the item matches the original text.

- Check options and branch connections one by one in the node, trigger one run to view node status in the run records, and confirm that the process continues downward after interaction is completed.
- Reference the selection result variable in subsequent nodes and run a trial once, check the branch direction and interaction status records, and confirm that the source of basis items that can be traced back to the original text is complete.
