---
title: Workflow Orchestration for Foreign Teacher Recruitment and Course Scheduling: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c050-f008
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Workflows | Checks
meta_description: Foreign Teachers: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Foreign Teacher Recruitment and Course Scheduling: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the foreign teacher appointment and course scheduling scenario, covering three types of materials: appointment contracts, work permit materials, and course scheduling tables. Appointment contracts are updated by the personnel and foreign affairs departments in batches, with fields including position name, appointment period start and end, number of teaching hours, signatures of both parties, and signing date; work permit materials are maintained by foreign affairs specialists according to approval nodes, with fields including name, ID number, permit category, validity period, and receipt; course scheduling tables are updated on a rolling basis by the academic affairs office each semester, with fields including course name, class, week number, instructor, and scheduling date. After entering the workflow, the three types of materials each assume a role: the appointment contract serves as the baseline source for the appointment relationship, the work permit materials serve as the comparison source for compliance admission, and the course scheduling table serves as the verification source for scheduling implementation. In terms of update cadence, contracts and permits change by approval batch, while course tables change by semester and scheduling adjustment events; field naming, date formats, and quantity conventions differ across source systems, requiring field-by-field alignment during material verification and discrepancy localization.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution along the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether position name, appointment period start and end, number of teaching hours, signatures, and signing date are consistent across the two materials | Compare the contract and the ledger field by field, reference the field values in `variables`, and record inconsistent items |
| Work permit materials | Whether name, ID number, permit category, validity period, and receipt are consistent across the two materials | Check options and branch connections one by one in the node, use `nodeId` to locate the node, and trigger one inspection of the node status in the run records |
| Course scheduling table | Whether course name, class, week number, instructor, and scheduling date align with the ledger | Reference the selection result variable in subsequent nodes and run a trial once, recording the branch direction and interaction state |
| Discrepancy list | The name, quantity, and date of the same object are consistent across the two materials, versions are synchronized, and signatures and receipts are complete | Submit to the reviewer for confirmation and write back; before writing back, verify the discrepancy fields and source materials |

## Three common errors

- Symptom: the number of teaching hours for the same record does not match between the contract and the course table. Cause: the two materials are counted under different conventions, and the quantity unit and statistical scope were not unified before verification.
- Symptom: the version of the work permit materials is not synchronized, and the old version is still used in comparison. Cause: after the materials were updated, re-verification was not triggered, and the interaction state record remained at the previous version.
- Symptom: the appointment contract lacks a signature or receipt, yet the discrepancy list still shows consistency. Cause: the verification dimensions did not cover the signature and receipt fields, and the judgment conditions only compared names and dates.

## How to verify the setup

This feature's acceptance: run a trial for each option, check the branch direction and interaction state in the run records, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and check whether the `variables` and `nodeId` references are correct.

Business test: use a real record to find a field inconsistent with the ledger, submit it to the reviewer for confirmation and write back, and after writing back, recheck whether the name, quantity, and date of that field are consistent across the two materials.

- Check options and branch connections one by one in the node, trigger one inspection of the node status in the run records, and confirm that no option still follows the default branch.
- Reference the selection result variable in subsequent nodes and run a trial once, confirming that the process continues after the interaction is completed and that the same session does not enter the interaction repeatedly.
