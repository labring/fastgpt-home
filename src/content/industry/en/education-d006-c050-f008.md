---
title: Workflow Orchestration for Foreign Teacher Recruitment and Course Scheduling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c050-f008
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Workflows | Progress
meta_description: Foreign Teachers: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Foreign Teacher Recruitment and Course Scheduling: Track Progress and Check Statistics

## What this category's data looks like

Foreign teacher appointment and course scheduling involves three types of materials: appointment contracts, work permit materials, and course schedules. Appointment contracts contain name, position, appointment period, and signature; work permit materials contain ID number, permit period, and receipt; course schedules contain course name, week number, class hours, and instructor. The materials come from HR, foreign affairs, and academic affairs, updated weekly and archived monthly. When entering workflow orchestration, the three types of materials respectively serve the following roles: the contract defines the appointment relationship and the basis for signature, the permit materials provide compliance dates and receipt evidence, and the course schedule provides week numbers and class hour records. The field characteristic is that the same teacher name appears in three places—the contract, the permit, and the course schedule—dates and quantities must be aligned item by item, and the latest signed document prevails as the version.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "Progress Table and Statistical Caliber Description" is completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether name, position, appointment period, and signature are consistent with the work permit materials, and whether any dates are missing | Compare the name, dates, and signature in the contract and permit materials one by one, and check whether the `variables` reference points to the same record |
| Work permit materials | Whether ID number, permit period, and receipt are aligned with the week numbers in the course schedule | Reference the selection result variable in a subsequent node and run a test once, and check the branch direction corresponding to `nodeId` |
| Course schedule | Whether course name, week number, class hours, and instructor match the contract position | Use one week's records to check the totals, and check whether the statistical caliber and exceptions are written in the header |
| Progress table and statistical caliber description | Whether the record count and statistical count match, and whether the caliber is written in the header | After summarizing by week, recheck item by item against the contract, permit, and course schedule |

## Three common errors

- Phenomenon: The same teacher's name is written differently in the contract and the course schedule, and is counted as two people during statistics. Cause: The materials are entered separately, and names and dates are not aligned to the same record.
- Phenomenon: After the permit materials are updated, the course schedule still uses the old week numbers, and the class hours do not match. Cause: The version was not synchronized, and subsequent nodes still reference the old branch result.
- Phenomenon: The contract lacks a signature or receipt, but the progress table still counts the appointed class hours. Cause: After the interaction is completed, the signature and receipt were not checked, and the exceptions were not clearly written in the header.

## How to verify the setup

Feature acceptance: Run a test for each option one by one, check the branch direction and interaction state in the run records, confirm that options and branch connections correspond one to one, and that the selection result variable has been passed to subsequent nodes.

Business testing: Use one week's records to check the totals, see whether the caliber and exceptions are clearly written, and check whether the names, quantities, and dates in the contract, permit materials, and course schedule match.

- In the node, check the options and branch connections one by one, trigger once, and view the node status in the run records.
- Reference the selection result variable in a subsequent node and run a test once, and check the correspondence between `variables` and `nodeId`.
