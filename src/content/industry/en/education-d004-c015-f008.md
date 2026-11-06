---
title: Workflow Orchestration for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c015-f008
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Workflows | Handover
meta_description: Student Mental Health: review workflows for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the primary and secondary school mental health screening and referral scenario, the standing materials include three types: the psychological screening plan, interview records, and referral forms. The psychological screening plan carries the screening scope, tool selection, schedule, and responsible persons; the interview records carry the interviewee, interview time, content summary, and interviewer signature; the referral form carries the referred subject, reason for referral, receiving party, and receipt. The materials are mostly drafted separately by school psychological teachers, homeroom teachers, and heads of moral education, and are updated on a rolling basis with screening batches and semester milestones; the field characteristics are concentrated in names, dates, quantities, version numbers, and signature fields. When entering this function, the psychological screening plan serves as the primary material defining the field framework, while the interview records and referral forms serve as derived materials aligned item by item; the three use the same record's name, quantity, and date as the cross-check baseline, and any material modified first will affect the field consistency of the other two.

## Configuration and implementation checks

This step is executed by the workflow node (user selection and branching), outputting the branch direction and interaction state records. The material drafts that can be issued and the handover records are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Fields are complete, responsible persons are clear, version and date are consistent, and the screening scope and tool selection can be compared item by item | Check the options and branch connections one by one in the node, and confirm that the plan fields correspond to the branch direction |
| Interview records | The interviewee, interview time, content summary, and interviewer signature are complete, and are consistent with the roster, quantity, and date in the plan | Reference the selection result variable `variables` in a subsequent node and run a trial once, and check the record fields |
| Referral form | The referred subject, reason for referral, receiving party, and receipt are complete, and are consistent with the name, quantity, and date in the interview records | Trigger the user selection node once, and check the correspondence between the node status and `nodeId` in the run records |
| Handover records | Responsible persons are clear, version and date are consistent, and signatures and receipts are not missing | Reference `variables` and `nodeId` in a subsequent node, and check the receipt column of the handover records |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the interview records and the referral form. Cause: The two materials were drafted separately and were not cross-checked against the same field baseline.
- Symptom: The psychological screening plan has been revised, but the interview records and referral form still use the old version number. Cause: The version was not synchronized, and each material kept its own copy.
- Symptom: The referral form lacks the receiving party's signature or receipt, so the handover step cannot confirm receipt. Cause: The signature field and receipt field were not included in the field completeness determination.

## How to verify the setup

This function's acceptance: run a trial for each option, check the branch direction and interaction state in the run records, confirm that each option corresponds to one branch, that the selection result variable `variables` has been passed to subsequent nodes, and that `nodeId` is consistent with the run records.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Run a trial for each option, check the branch direction and interaction state in the run records, and confirm that options and branch connections correspond one to one.
- Reference the selection result variable in a subsequent node and run a trial once, and check that fields are complete, responsible persons are clear, and version and date are consistent.
