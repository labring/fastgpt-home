---
title: Workflow Orchestration for School Safety Inspections and Incident Reporting: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c016-f008
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Workflows | Checks
meta_description: Campus Safety: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Safety Inspections and Incident Reporting: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of school safety hazard inspections and campus incident reporting. Materials come from three categories: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are filled in weekly or monthly by duty teachers and security personnel, with fields including inspection item, location, hazard description, inspection date, and inspector signature; hazard rectification ledgers are updated on an event-driven basis, with fields including hazard name, quantity, rectification deadline, responsible person, and acceptance signature; emergency incident reports are submitted immediately upon occurrence, with fields including incident name, number of people involved, occurrence date, reporter, and receipt. After the three types of materials enter the workflow, their roles differ: the checklist serves as the hazard discovery source, the ledger serves as the main line of rectification tracking, and the incident report serves as a supplementary record for emergencies. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same hazard often has inconsistent name wording, quantity definitions, and date nodes across the three materials, and missing signatures and receipts are also common. Therefore, material verification and discrepancy localization must be done first, before proceeding to review and write-back.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. When the user selection node is triggered, the conversation enters an interaction state and the workflow state is recorded. After the user completes the selection, execution continues along the branch corresponding to the selected option. The "discrepancy list" is then completed by subsequent nodes continuing execution along the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether the inspection item name, inspection date, and inspector signature are consistent with the ledger records | Compare the name, date, and signature between the checklist and the ledger item by item, and reference `variables` in the node to record discrepancy fields |
| Hazard rectification ledger | Whether the hazard name, quantity, rectification deadline, and acceptance signature are consistent with the incident report | Use `nodeId` to locate the ledger node, verify the quantity and date, and mark items whose versions are not synchronized or whose signatures are missing |
| Emergency incident report | Whether the incident name, number of people involved, occurrence date, and reporting receipt are consistent with the ledger | Compare the name, number of people, and date between the report and the ledger, check whether the receipt is complete, and write it into the interaction state record |
| User selection node | Whether each option corresponds to one branch connection | Check the options and branch connections one by one in the node, and after a trial run, view the node status in the run record |

## Three common errors

- Symptom: The same hazard has different name wording and mismatched quantities in the checklist and the ledger. Cause: The filling definitions in the two places are not unified, and the name and quantity fields lack comparison rules.
- Symptom: The rectification deadline has been updated, but the incident report still uses the old date. Cause: Versions are not synchronized, the material update rhythms are inconsistent, and the old version remains in the workflow input.
- Symptom: The acceptance signature or reporting receipt is missing, and the discrepancy list cannot be closed. Cause: The signature and receipt were not submitted together with the materials, and the reviewer cannot confirm that rectification is complete.

## How to verify the setup

This feature acceptance: run a trial for each option, check the branch direction and interaction state in the run record, and confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes.

Business test: use one real record to find fields inconsistent with the ledger, and verify the name, quantity, date, and signature of that record in the checklist, ledger, and incident report.

- In the user selection node, check the options and branch connections one by one, run a trial once, and view the node status in the run record.
- In subsequent nodes, reference the selection result variable, compare the name, quantity, date, and signature of the same record across the three materials, and mark discrepancy fields.
