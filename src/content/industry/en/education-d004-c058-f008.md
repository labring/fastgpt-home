---
title: Workflow Orchestration for Research Project Task Agreement Signing: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c058-f008
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Workflows | Handover
meta_description: Research Agreements: review workflows for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Task Agreement Signing: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like this
Signing a research project task statement involves three types of materials: the project task statement, the subject task breakdown table, and the budget statement. The project task statement comes from the application and project approval reply, and is updated along with the signing node; the subject task breakdown table is drafted by the subject leader and revised on a rolling basis according to the task cycle; the budget statement is prepared according to funding categories and adjusted along with budget review comments. All three types of materials contain fields such as project name, subject number, undertaking unit, start and end dates, funding amount, signature column, and version number. When entering workflow orchestration, the project task statement serves as the main basis, while the subject task breakdown table and budget statement serve as attachment materials, each taking on the roles of field source and responsibility handover. In the material drafting and responsibility handover stage, it is necessary to ensure that the name, quantity, and date of the same record are consistent across the project task statement, subject task breakdown table, and budget statement, that versions and dates are synchronized, and that signatures and receipts are complete, before it can enter the next stage of receipt.

## Configuration and implementation checks

This stage is executed by workflow nodes (user selection and branches), outputting branch directions and interaction status records. The "issuable material drafts and handover records" are continued and completed by subsequent nodes according to the branches. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task statement | Check whether the project name, subject number, start and end dates, funding amount, and signature column are complete, and whether the version number and date are consistent | Check the options and branch connections one by one in the node, confirm that each option corresponds to one branch, and check the branch direction corresponding to `nodeId` |
| Subject task breakdown table | Check whether the subject name, task quantity, responsible person, and start and end dates are consistent with the project task statement, and whether the version is synchronized | Trigger a user selection node once, view the node status in the run record, confirm that the interaction status is recorded, and reference `variables` in a subsequent node to run a trial once |
| Budget statement | Check whether the funding categories, amounts, and dates match the project task statement and subject task breakdown table, and whether signatures and receipts are complete | Reference the selection result variable in a subsequent node and run a trial once, confirm that `variables` has been passed to the subsequent node, and that the branch direction is consistent with the option |
| Handover record | Check whether the responsible person, handover date, version number, and receipt signature are clear, and whether the fields are complete | Draft one according to the template and complete one handover, check whether missing items are blocked, and check whether the branch corresponding to `nodeId` is executed according to the option |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the project task statement and the subject task breakdown table. Cause: During drafting, the project task statement was not used as the field source, and the breakdown table was filled in independently without cross-checking.
- Phenomenon: The budget statement version is not synchronized and still references the amount in the old version of the project task statement. Cause: After the version update, re-checking was not triggered, and the node branch still continued execution according to the old selection.
- Phenomenon: The handover record lacks a signature or receipt, but the material still enters the next stage. Cause: The options and branches were not checked one by one, missing items were not blocked, and the interaction status record did not cover the signature and receipt fields.

## How to verify the setup

Acceptance of this function: run trials for each option one by one, check the branch direction and interaction status in the run record, confirm that each option corresponds to one branch, that `nodeId` and `variables` can be referenced in subsequent nodes, and that the selection result variable has been passed correctly.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the user selection node, check the options and branch connections one by one, confirm that each option corresponds to one branch, and record `nodeId` and the branch direction.
- Trigger a user selection node once, view the node status in the run record, confirm that the interaction status is recorded, and reference `variables` in a subsequent node to run a trial once.
