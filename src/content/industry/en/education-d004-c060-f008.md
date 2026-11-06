---
title: Workflow Orchestration for Research Project Annual Progress and Acceptance: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c060-f008
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Workflows | Handover
meta_description: Research Progress: review workflows for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Annual Progress and Acceptance: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data covers three types of materials: annual progress reports, mid-term review materials, and acceptance reports. The sources are project execution ledgers, milestone deliverable lists, and funding usage records, with updates triggered quarterly or by milestones. The field characteristics center on name, quantity, date, responsible person, signature, and receipt. Annual progress reports focus on the completion of phase tasks and plans for the next year; mid-term review materials emphasize indicator comparison and deviation explanations; acceptance reports require deliverables, funding, and conclusions to be closed item by item. When the three types of materials enter the workflow, the annual progress report serves as the pre-input that triggers the branch, the mid-term review materials assume the role of verification and correction, and the acceptance report serves as the final output awaiting sign-off. Material drafting and responsibility handover require complete fields, clear responsible persons, consistent versions and dates, and handover to the next stage for sign-off.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Signable material drafts and handover records" are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether the name, quantity, date, and responsible person are consistent with the ledger, and whether signatures and receipts are complete | Check the options and branch connections one by one in the node, and reference `variables` and `nodeId` to view the run records |
| Mid-term review materials | Whether the indicator comparison and deviation explanation are from the same source as the annual progress report, and whether the versions are synchronized | Trigger an interactive state once and view the node status and branch direction in the run records |
| Acceptance report | Whether deliverables, funding, and conclusions are closed item by item, and whether signatures and receipts are complete | Reference the selection result variable in subsequent nodes and run a trial once to check whether missing fields are blocked |
| Handover record | Whether the responsible person, version, and date are consistent with the corresponding materials, and whether sign-off is completed | Draft one according to the template and complete a handover once, and check whether missing items and inconsistencies are blocked |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials were drafted separately and did not share the same field source and version.
- Symptom: The mid-term review materials have been updated, but the annual progress report still references the old version. Cause: The versions were not synchronized, and the node branch did not continue execution according to the latest materials.
- Symptom: The acceptance report lacks signatures or receipts, and the handover record has no sign-off. Cause: The responsibility handover was not completed, and the interactive state was not fully recorded.

## How to verify the setup

This feature acceptance: Run trials option by option, check the branch direction and interactive state in the run records, and confirm that `variables`, `nodeId`, and the selection result variable have been passed to subsequent nodes.

Business test: Draft one according to the template and complete a handover once, and see whether missing items are blocked.

- Check the options and branch connections one by one in the node, trigger an interactive state once, and view the run records.
- Reference the selection result variable in subsequent nodes and run a trial once to check whether the fields are complete, the responsible person is clear, and the version and date are consistent.
