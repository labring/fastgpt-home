---
title: Workflow Orchestration for Daily Kindergarten Care Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c001-f008
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Workflows | Checks
meta_description: Kindergarten Care: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Daily Kindergarten Care Management: Compare Documents and Locate Differences

## What this category's data looks like

This category's data covers three types of materials: daily life schedules, morning and afternoon check records, and child health observation records. The daily life schedule is compiled weekly by the childcare and education department, with fields including activity time slot, segment name, responsible person, and date; the morning and afternoon check records are filled in daily by class teachers, with fields including child name, body temperature, throat and hand condition, date, and signature; the child health observation records are supplemented as needed by health care personnel, with fields including observation time, symptom description, handling opinion, and receipt. The three types of materials have different update rhythms: the schedule is adjusted weekly, the morning and afternoon check records are generated daily, and the observation records are triggered by events. After the materials enter the workflow, the schedule serves as the baseline object, while the morning and afternoon check records and observation records serve as objects to be verified; together, the three support the comparison of name, quantity, date, and signature for the same child on the same date.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Whether activity time slot, segment name, responsible person, date, and signature are complete | Check the options and branch connections one by one in the node, confirm that the schedule enters the verification branch as the baseline object, and record `nodeId` |
| Morning and afternoon check records | Whether child name, body temperature, date, and signature are consistent with the corresponding records in the schedule | Trigger a user selection node once, view the node status in the run record, compare the name and quantity fields, and reference `variables` to verify the selection result |
| Child health observation records | Whether observation time, symptom description, handling opinion, and receipt are consistent with the morning and afternoon check records | Reference the selection result variable in a subsequent node and run a trial, locate discrepancies in date and signature, and confirm the branch direction corresponding to `nodeId` |
| Discrepancy list | Whether the name, quantity, and date of the same object are consistent across the two materials | Write the branch direction and interaction state records into the discrepancy list, submit it to the reviewer for confirmation, and write back |

## Three common errors

- Phenomenon: The same child's name is written differently in the morning and afternoon check records and the observation records. Cause: The two materials are entered by different personnel, and the names are not unified, so they cannot be matched during comparison.
- Phenomenon: The schedule has been updated to a new version, but the morning and afternoon check records are still filled in according to the old version. Cause: The versions are not synchronized, so the date and segment name do not match during verification.
- Phenomenon: The observation records lack a receipt or signature. Cause: The receipt was not archived together with the record, so the handling loop cannot be confirmed during verification.

## How to verify the setup

Acceptance of this function: run trials option by option, check the branch direction and interaction state in the run records, confirm that `variables` has been passed to subsequent nodes, reference this variable in subsequent nodes, and at the same time check the branch connections corresponding to `nodeId`.

Business test: use one real record to find fields inconsistent with the ledger, check the name, quantity, date, and signature, and submit the discrepancy list to the reviewer for confirmation and write-back.

- Check the options and branch connections one by one in the node, confirm that each option corresponds to one branch, and avoid still taking the default branch after selecting an option.
- Trigger a user selection node once, view the node status in the run record, and confirm that the process continues downward after the interaction is completed, without stopping or repeatedly entering the interaction.
