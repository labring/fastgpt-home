---
title: Workflow Orchestration for Kindergarten Operations and Quality Self-Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c006-f008
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Workflows | Checks
meta_description: Kindergarten Quality: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Kindergarten Operations and Quality Self-Assessment: Compare Documents and Locate Differences

## What this category's data looks like

This category's data covers three types of materials: self-assessment reports, issue lists, and rectification plans. Self-assessment reports are produced per semester or academic year, with fields including operating conditions, safety and hygiene, care and education, faculty and staff, and internal management, plus date and signature; issue lists are updated on a rolling basis by item, with fields including issue description, involved object, quantity, responsible person, and rectification deadline; rectification plans are synchronized by batch, with fields including measures, completion date, receipt, and signature. The three types of materials play different roles when entering the workflow: the self-assessment report serves as the baseline material providing names, quantities, and dates; the issue list serves as the comparison material exposing item discrepancies; the rectification plan serves as the write-back material carrying forward the review conclusions. In terms of update cadence, reports are low-frequency, lists are high-frequency, and plans change with batches; field characteristics are mainly the four types of name, quantity, date, and signature, and must be compared item by item.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is then completed by subsequent nodes continuing execution along the branches. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the chosen option.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Whether the name, quantity, date, and signature correspond item by item with the issue list | Check the options and branch connections one by one in the node, and use `variables` and `nodeId` to locate the items |
| Issue list | Whether the name, quantity, and date of the same record are consistent with the rectification plan | Trigger a user selection once, and check the node status and branch direction in the run records |
| Rectification plan | Whether the version is synchronized and whether the receipt and signature are complete | Reference the selection result variable in a subsequent node and run a trial once, comparing the receipt fields |
| User selection node | Whether each option corresponds to one branch and the selection result variable has been passed to subsequent nodes | Check the options and branch connections one by one in the node, and record the interaction state |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the self-assessment report and the issue list. Cause: The two materials are maintained separately and are not compared field by field for the same object.
- Symptom: The rectification plan version is not synchronized, and an old batch overwrites a new batch. Cause: The update cadences differ, and there is a lack of version identifiers and receipt verification.
- Symptom: After selecting an option, the default branch is still taken, and the process stops after the interaction completes. Cause: The options and branch connections were not checked one by one, and the selection result variable was not referenced correctly.

## How to verify the setup

Feature acceptance: run trials for each option one by one, check the branch direction and interaction state in the run records, and confirm that `variables` and `nodeId` point correctly.

Business testing: use one real record to find fields inconsistent with the ledger, and compare the name, quantity, date, and signature.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Trigger a user selection once, check the node status in the run records, and reference the selection result variable in a subsequent node to run a trial once.
