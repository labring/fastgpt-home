---
title: Workflow Orchestration for Research Project Annual Progress and Acceptance: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c060-f008
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Workflows | Access
meta_description: Research Progress: review workflows for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Annual Progress and Acceptance: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the category of annual progress and acceptance of research projects, covering three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are updated quarterly or semi-annually, with fields including project name, principal investigator, phase objectives, budget execution, and number of outputs; mid-term review materials are updated at milestones, with fields including indicator completion, deviation explanation, adjustment request, and expert opinions; acceptance reports are updated at project closure, with fields including task book indicators, output list, budget final accounts, signatures, and receipts. The three types of materials play different roles when entering workflow orchestration: annual progress reports serve as the basis for the visible scope of branch entry points, mid-term review materials serve as the judgment input for authorization scope, and acceptance reports serve as the final product of external services. Material sources are archived documents from the project management system and paper scans, with update cadence synchronized with project milestones. Field characteristics include multiple versions coexisting, signature and receipt positions prone to being missing, and the need for cross-comparison of names, quantities, and dates of the same record across different materials.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Externally available entry points and authorization scope" are subsequently completed by follow-up nodes continuing execution along the branches. When a user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether fields, dates, and signatures are consistent with mid-term review materials and acceptance reports, and whether the name, quantity, and date of the same record match | Check options and branch connections one by one in the node, confirm the visible scope of the branch corresponding to the progress report; reference `variables` and `nodeId` and run a trial |
| Mid-term review materials | Whether versions are synchronized, and whether deviation explanations and adjustment requests lack signatures or receipts | Trigger a user selection node once, check the node status in the run record, and confirm the branch direction corresponding to the mid-term review materials |
| Acceptance report | Whether task book indicators, output list, budget final accounts, and signature receipts are complete, and whether the external service scope exceeds authority | Reference the selection result variable in follow-up nodes and run a trial, check the authorization scope and external entry points of the acceptance report branch |

## Three common errors

- Phenomenon: The same project name is written differently in the annual progress report and the acceptance report, and quantities do not match. Cause: The two materials are filled in by different nodes, and versions are not synchronized.
- Phenomenon: The adjustment request in the mid-term review materials lacks a signature or receipt but still enters the external service branch. Cause: The authorization scope judgment does not check the signature position, and the branch direction defaults to allow.
- Phenomenon: After selecting an option, the default branch is still taken, and the process stops after the interaction completes. Cause: The option and branch connections are misaligned, and the selection result variable is not passed to follow-up nodes.

## How to verify the setup

Acceptance of this feature: Run trials for each option one by one, check the branch direction and interaction state in the run record, and confirm that `variables` and `nodeId` are correctly referenced in follow-up nodes.

Business test: Access once with a restricted identity, check whether the visible scope matches the settings, and ensure unauthorized content is not visible.

- Check options and branch connections one by one in the node, and confirm the branches corresponding to the three types of materials: annual progress reports, mid-term review materials, and acceptance reports.
- Trigger a user selection node once, check the node status in the run record, and confirm that the interaction state is recorded and the selection result variable has been passed to follow-up nodes.
