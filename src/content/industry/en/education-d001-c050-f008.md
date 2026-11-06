---
title: Workflow Orchestration for Foreign Teacher Recruitment and Course Scheduling: Find Supporting Evidence
slug: /en/industry/education-d001-c050-f008
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Workflows | Evidence
meta_description: Foreign Teachers: review workflows for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Foreign Teacher Recruitment and Course Scheduling: Find Supporting Evidence

## What this category's data looks like

This category's data involves three types of materials: appointment contracts, work permit materials, and course schedules. Appointment contracts contain the appointment period, position, teaching hours, and signature page; work permit materials contain the permit number, validity period, issuance date, and receipt; course schedules contain weeks, classes, instructors, and class adjustment records. The three types of materials are updated by semester or appointment period; after a new version replaces the old version, the old version is archived. When entering the workflow, appointment contracts and work permit materials are used to verify personnel identity and appointment period boundaries, while course schedules are used to verify teaching records and dates, each participating as an independent source in the generation of basis entries.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Basis entries that can refer back to the original text" are completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether the fields, dates, and signatures match the work permit materials and course schedule | Check the options and branch connections one by one in the node, and reference `variables` and `nodeId` to record this selection, comparing the contract name, appointment start and end dates, and signature page |
| Work permit materials | Whether the permit number, validity period, and issuance date are consistent with the appointment contract and course schedule | Trigger a user selection once, check the node status in the run record, and verify the dates and numbers of the permit materials against the contract and course schedule |
| Course schedule | Whether the weeks, classes, instructors, and class adjustment records are consistent with the appointment contract and work permit materials | Reference the selection result variable in a subsequent node and run a trial once, verifying the names and quantities in the course schedule against the contract and permit materials |
| Basis entry | Whether it can refer back to the original text and whether the version is current | Check one by one the material name, version, and location pointed to by the entry source, and confirm there are no references to old versions |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the contract and the course schedule. Cause: The two materials are updated separately, and no cross-check has been performed.
- Symptom: The material version referenced by the basis entry is not synchronized. Cause: The old version was not archived, the new version was not marked with an effective date, and retrieval hits the old version.
- Symptom: The contract lacks a signature or the receipt is missing. Cause: The signing process was not closed-loop, the scanned materials are incomplete, and the signature page was not checked during verification.

## How to verify the setup

Feature acceptance: run trials for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and record `variables` and `nodeId`.

Business test: ask a basis question that spans materials, and see whether the answer provides a source that can be referred back to.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Reference the selection result variable in a subsequent node and run a trial once, checking the node status and branch direction in the run record.
