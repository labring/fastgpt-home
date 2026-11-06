---
title: Workflow Orchestration for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c063-f008
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Workflows | Handover
meta_description: Research Misconduct: review workflows for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the category of academic misconduct report investigation and handling, centering on the drafting and handover of three types of materials: report materials, investigation reports, and expert appraisal opinions. Report materials are submitted by the reporter, with fields including the accused, the course of events, the evidence list, the submission date, and the signature; investigation reports are drafted by the investigation team, with fields including investigation conclusions, the clauses relied upon, handling recommendations, the report date, and members' signatures; expert appraisal opinions are issued by the expert panel, with fields including the appraisal matters, opinion conclusions, expert signatures, and date. The material sources are the three stages of report acceptance, investigation and evidence collection, and expert deliberation, and the update rhythm advances version by version along with the progress of the investigation. When entering workflow orchestration, report materials serve as the starting input, while investigation reports and expert appraisal opinions serve as the outputs of subsequent nodes; the three flow within the same process along branches, and at handover it is necessary to check that fields are complete, responsible parties are clear, and versions and dates are consistent.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Signable material drafts and handover records" are completed by subsequent nodes continuing execution along the branches. When the user selection node is triggered, the conversation enters an interactive state and the workflow state is recorded; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Fields complete: the accused, the course of events, the evidence list, the submission date, and the reporter's signature are checked item by item; the date and signature must be consistent with the acceptance record | In the node, check the options and branch connections one by one, reference `variables` to pass the selection result, and run a trial to view the node status in the run record |
| Investigation report | Fields complete: investigation conclusions, the clauses relied upon, handling recommendations, the report date, and members' signatures are checked item by item; the name, quantity, and date of the same record must be consistent with the corresponding items in the report materials | In subsequent nodes, reference the selection result variable and run a trial, checking whether the branch direction corresponding to `nodeId` is consistent with the selected option |
| Expert appraisal opinion | Fields complete: the appraisal matters, opinion conclusions, expert signatures, and date are checked item by item; the version number must be synchronized with the current version of the investigation report, and it is intercepted if a signature or receipt is missing | Trigger an interaction once, view the node status in the run record, and check whether the material's version and date are consistent with the investigation report |
| Handover record | The responsible party is clear, the receipt fields are complete, and the version and date are consistent; the receipt information of the previous step and the next step must correspond | In the node, check the options and branch connections one by one, and run a trial to confirm that the process continues downward after handover |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: during drafting, checks were not performed against a unified field template, and the two places referenced different versions.
- Phenomenon: the version of the expert appraisal opinion was not synchronized; the investigation report had been updated while the appraisal opinion remained the old version. Cause: at handover, the version number and date were not checked, and inconsistencies were not intercepted.
- Phenomenon: materials lack signatures or receipts, and the handover record is incomplete. Cause: the node did not check the responsible party's receipt fields according to the branch direction, and directly let it pass after the interaction was completed.

## How to verify the setup

Acceptance of this feature: run a trial for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and verify by referencing `variables` and `nodeId`.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are intercepted.

- In the node, check the options and branch connections one by one, and confirm that each option corresponds to one branch.
- Trigger the user selection node once, view the node status in the run record, and confirm that the interaction state is recorded and the process continues downward.
