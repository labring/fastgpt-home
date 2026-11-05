---
title: Workflow Orchestration for Grade Entry and Credit Recognition: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c020-f008
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Workflows | Checks
meta_description: Grades and Credits: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Grade Entry and Credit Recognition: Compare Documents and Locate Differences

## What this category's data looks like

In the grade entry and credit recognition scenario, materials come from grade sheets exported from the academic affairs system, leave-of-absence (deferred exam) applications submitted by students, and make-up exam schedules arranged by academic affairs. The update cadence advances with the semester: grade sheets are generated after entry, deferred exam applications flow through approval, and make-up exam schedules are published by exam batch. Field characteristics center on course name, credit count, exam date, signature, and receipt. The grade sheet serves as the baseline for grades and credits, the deferred exam application states the reason for not taking the exam and the approval status, and the make-up exam schedule gives the make-up exam time and venue. Once the three types of materials enter the workflow, each acts as an independent verification object, and the user-selection node decides which one to verify first and whether to proceed to the next one.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution along the branch. When the node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the chosen option.

| Object | Check | Verification action |
| --- | --- | --- |
| Grade sheet | Whether course name, credit count, exam date, and signature field match the ledger item by item | Check options and branch connections one by one in the node, reference `variables` to record the selection result, and view the run record after a trial run |
| Deferred exam application | Whether application date, approval status, signature or receipt match the corresponding record in the ledger | Trigger an interaction once, view the node status in the run record, and check whether the branch corresponding to `nodeId` follows the option |
| Make-up exam schedule | Whether make-up exam date, venue, course name, and count match the grade sheet and deferred exam application | Reference the selection result variable in a subsequent node and run a trial once to confirm the branch direction and interaction state record |
| Discrepancy list | Whether the name, count, and date of the same object are consistent across the two materials, and whether the versions are in sync | Write each inconsistent field into the discrepancy list item by item, hand it to the reviewer for confirmation, and write it back |

## Three common errors

- Symptom: the course name or count of the same record does not match between the grade sheet and the make-up exam schedule. Cause: the two materials are entered separately, without field-level comparison.
- Symptom: the deferred exam application version is not in sync, and the old version is missing a signature. Cause: the approval receipt was not updated together with the new version, so the old file was retrieved during verification.
- Symptom: after selecting an option, the default branch is still taken, and the process stops after the interaction completes. Cause: the options and branch connections were not checked one by one, or the selection result variable was not passed to subsequent nodes.

## How to verify the setup

Feature acceptance: run a trial for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, and that `variables`, `nodeId`, and the selection result variable are all correctly referenced.

Business test: use one real record to find a field inconsistent with the ledger, write it into the discrepancy list, and hand it to the reviewer for confirmation and write-back.

- Check options and branch connections one by one in the node, and view the node status in the run record after triggering an interaction once.
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the branch direction and interaction state record are consistent.
