---
title: Workflow Orchestration for School Safety Inspections and Incident Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c016-f008
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Workflows | Intake
meta_description: Campus Safety: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Safety Inspections and Incident Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

School safety hazard inspections and campus incident reporting involve three types of materials: safety inspection checklists, updated weekly or monthly, containing inspection items, responsible persons, dates, and signatures; hazard rectification ledgers, updated on an event-driven basis, containing hazard names, quantities, rectification deadlines, and receipts; and emergency incident reports, submitted immediately when an incident occurs, containing the incident process, involved personnel, handling results, and approvals. After the three types of materials enter the workflow, their roles differ: checklists provide inspection items and initial determinations, ledgers provide rectification status and the basis for closure, and incident reports provide supplementary facts for emergency scenarios. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. The update cadence ranges from periodic to immediate, and the same record is often scattered across multiple materials, requiring consistency comparison during the intake stage.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. "Intake records and follow-up questions to be completed" are then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and the workflow status is recorded. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether inspection items, responsible persons, dates, and signatures are complete, and whether they are consistent with the ledger's names and quantities | Check options and branch connections one by one in the node, reference `variables` and `nodeId` for a trial run, and review the run records |
| Hazard rectification ledger | Whether rectification deadlines, receipts, and signatures are complete, and whether the same record's name, quantity, and date match those in the inspection checklist | Reference the selection result variable in subsequent nodes and run a trial once, and check field differences between the ledger and the checklist |
| Emergency incident report | Whether the incident process, involved personnel, handling results, and approvals have missing items, and whether the version is synchronized with the ledger | Trigger the user selection node once, check whether the interaction status is recorded, and verify the report against the ledger's dates and signatures |
| Intake records and follow-up questions to be completed | Whether missing items are identified and followed up on, and whether answers are based on materials | Ask a question missing key information, see whether it follows up first before answering, and check whether the follow-up items correspond to material fields |

## Three common errors

- Symptom: The same hazard's name and quantity do not match between the checklist and the ledger. Cause: The two materials are entered separately, and field comparison and follow-up are not performed during the intake stage.
- Symptom: The rectification ledger version is not synchronized, and the old version still shows unremediated. Cause: The update cadences differ, and version verification and receipt confirmation steps are missing.
- Symptom: An incident report missing a signature or receipt is still circulated as a complete material. Cause: Missing-item identification does not trigger follow-up, and it directly enters subsequent branches.

## How to verify the setup

Feature acceptance: Run trials option by option, check the branch directions and interaction status in the run records, and confirm that `variables`, `nodeId`, and the selection result variable have been passed to subsequent nodes.

Business test: Ask a question missing key information, see whether it follows up first before answering, and check whether the follow-up items correspond to the fields of the checklist, ledger, and incident report.

- Check options and branch connections one by one in the node, trigger the user selection node once, and review the node status and branch directions in the run records.
- Reference the selection result variable in subsequent nodes and run a trial once, check whether intake records and follow-up questions to be completed continue execution according to the branch, and compare the consistency of material fields.
