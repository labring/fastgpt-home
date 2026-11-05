---
title: Workflow Orchestration for Research Project Annual Progress and Acceptance: Find Supporting Evidence
slug: /en/industry/education-d001-c060-f008
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Workflows | Evidence
meta_description: Research Progress: review workflows for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Annual Progress and Acceptance: Find Supporting Evidence

## What this category's data looks like

Annual progress and acceptance of research projects involve three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted at annual milestones, with fields including task name, indicator value, completion date, and responsible person's signature; mid-term review materials are formed when the project is past halfway, with fields including stage objectives, fund usage, review comments, and seals; acceptance reports are issued at project closure, with fields including results list, indicator comparison, acceptance conclusion, and signed receipt. The three types of materials play different roles when entering the workflow: annual progress reports and mid-term review materials serve as process basis, while acceptance reports serve as final basis, and all must point back to the original text entries. The update rhythm is annual submission, mid-term correction, and acceptance consolidation; field characteristics center on names, quantities, dates, and signed receipts, and the same record must remain on the current version when cross-checked across materials.

## Configuration and implementation checks

This link is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. Basis entries that can point back to the original text are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields include task name, indicator value, completion date, and responsible person's signature, compared item by item with mid-term review materials and acceptance reports | In the node, check the options and branch connections one by one, and use `variables` and `nodeId` to locate the source entries |
| Mid-term review materials | Stage objectives, fund usage, review comments, and seals must be consistent with the dates in the annual progress report, and the version must be current | Trigger a user selection node once, and check the node status and branch direction in the run record |
| Acceptance report | Results list, indicator comparison, acceptance conclusion, and signed receipt must match the names, quantities, and dates in the process materials | In subsequent nodes, reference the selection result variable and run a trial, checking the `variables` values and the `nodeId` branch record |
| User selection node | Each option corresponds to one branch, the interaction state is recorded, and the selection result variable has been passed to subsequent nodes | Run trials for each option one by one, check the branch direction and interaction state in the run record, and confirm `nodeId` and `variables` |

## Three common errors

- Symptom: The names and quantities of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials were entered separately, without cross-material comparison and version synchronization.
- Symptom: The dates in the mid-term review materials are inconsistent with the annual progress report, and the versions are not synchronized. Cause: After the materials were updated, the old version was not written back, and the current-version determination is missing.
- Symptom: The acceptance report lacks a signature or receipt, and the materials are incomplete. Cause: The signature step was not included in the check, and the receipt was not archived together with the materials.

## How to verify the setup

Acceptance of this function: run trials for each option one by one, check the branch direction and interaction state in the run record, and confirm that `nodeId` and `variables` are correctly referenced in subsequent nodes.

Business test: ask a cross-material basis question and see whether the answer gives a source that can be pointed back to.

- In the node, check the options and branch connections one by one, confirming that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes.
- Trigger a user selection node once, check the node status in the run record, and confirm that the process continues downward after the interaction is completed.
