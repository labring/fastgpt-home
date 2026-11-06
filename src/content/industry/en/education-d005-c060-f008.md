---
title: Workflow Orchestration for Research Project Annual Progress and Acceptance: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c060-f008
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Workflows | Versions
meta_description: Research Progress: review workflows for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Annual Progress and Acceptance: Maintain Document Versions and Changes

## What this category's data looks like

Annual progress and acceptance of research projects involve three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Sources include drafts submitted by the project team, receipts from collaborating units, expert review opinions, and templates from the competent authority. The update cadence rolls forward as milestones advance: annual progress reports are submitted annually, mid-term review materials are consolidated at the mid-term milestone, and acceptance reports are finalized at the project completion stage. The three types of materials play different roles when entering workflow orchestration: annual progress reports provide phased tasks and indicator completion status, mid-term review materials supplement adjustment explanations and fund execution, and acceptance reports carry the final conclusions and signature pages. Field characteristics center on project name, number of indicators, start and end dates, responsible person's signature, and unit receipt. The same record often flows across multiple materials, and a version ledger and change records are needed to lock the current version, ensuring old versions remain traceable and references stay synchronized.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "version ledger and change records" are completed by subsequent nodes continuing execution along the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields, dates, and signatures must be aligned item by item with the mid-term review materials and acceptance report; the name, quantity, and dates of the same record must not have two different versions | Check the options and branch connections one by one in the node, confirm that the selected material type follows the corresponding branch, and reference the selection result variable in a subsequent node and run a test once |
| Mid-term review materials | Adjustment explanations and fund execution must connect with the annual progress report; missing signatures or receipts are considered not closed-loop | Trigger the node once, check the node status in the run records, and verify whether the branch for this material is correctly recorded and continues execution downward |
| Acceptance report | The signature on the conclusion page and the unit receipt must be complete, and referenced content must point to the current version | Reference `variables` and `nodeId` in a subsequent node, run a test once to confirm that references are updated synchronously and old versions remain traceable |
| Version ledger and change records | The current version is unique, old versions are traceable, and references are synchronized | Change one piece of content, observe whether the version number and references are updated synchronously, and check the branch direction and interaction state records |

## Three common errors

- Symptom: The name, quantity, and dates of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials are maintained separately, and a unified standard has not been established through the version ledger.
- Symptom: The material has been revised, but references still point to the old version. Cause: The version was not synchronized, and the change records were not updated as branch execution continued.
- Symptom: The acceptance report is missing signatures or receipts. Cause: After the interaction is completed, the process stops and does not continue along the branch to the signature and receipt nodes.

## How to verify the setup

Feature acceptance: run a test for each option one by one, check the branch direction and interaction state in the run records, and confirm that `variables` and `nodeId` are correctly referenced in subsequent nodes.

Business test: change one piece of content, see whether the version number and references are updated synchronously, and check that the current version is unique and old versions are traceable.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Trigger the user selection node once, and check whether the node status and selection result variable in the run records have been passed to subsequent nodes.
