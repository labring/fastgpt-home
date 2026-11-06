---
title: Workflow Orchestration for Training Provider Admissions and Inquiry Follow-Up: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c043-f008
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Workflows | Intake
meta_description: Training Admissions: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Training Provider Admissions and Inquiry Follow-Up: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data for training institution enrollment consultation conversion involves three core types of materials: enrollment brochures, consultation records, and trial class schedules. The enrollment brochure contains the course name, number of class hours, start date, refund terms, and signature/seal fields; the consultation record contains the consulter's name, intended course, communication date, receptionist's signature, and receipt column; the trial class schedule contains the trial time, instructor, classroom number, and confirmation signature. When these three types of materials enter the Q&A intake and missing-item follow-up function, their roles differ: the enrollment brochure serves as the source of basis for answering course and fee questions, the consultation record serves as the draft basis for intake records and follow-up clues, and the trial class schedule serves as the verification basis for appointment-type questions. The material update cadence is: revise the brochure before each enrollment period, supplement records after each consultation, and synchronize the trial class schedule weekly. In terms of field characteristics, the same course name, number of class hours, and date must remain consistent across the three materials, and signatures and receipts are necessary fields for closing the intake loop.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Intake records and items to be completed" are continued by subsequent nodes according to the branch. When a node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course name, number of class hours, start date, and signature/seal fields are consistent with the consultation record and trial class schedule; if a signature or receipt is missing, it is regarded as a missing item | Compare the name, quantity, and date fields of the three materials item by item, and check whether the signature/seal and receipt columns are filled in |
| Consultation record | Whether the consulter's name, intended course, communication date, and receptionist's signature are complete, and whether the name and date in the same record match across the two materials | Retrieve the consultation record and enrollment brochure and check them side by side, marking entries missing a signature or receipt |
| Trial class schedule | Whether the trial time, instructor, classroom number, and confirmation signature are complete, and whether the version is synchronized with the latest brochure | Check the trial class schedule against the brochure's start date and course name, and inspect entries whose versions are not synchronized |
| User selection node | Each option corresponds to one branch, the interaction state is recorded, and the selection result variable has been passed to subsequent nodes | Check the options and branch connections one by one in the node, reference `variables` and run a trial once, and inspect the `nodeId` and interaction state in the run record |

## Three common errors

- Symptom: the same course name is written differently in the enrollment brochure and the consultation record, and the quantity and date do not match. Cause: the two materials are entered separately and no field-level comparison is performed.
- Symptom: the trial class schedule has been updated, but the consultation record still references the old start date. Cause: the versions are not synchronized, and the material update cadence is inconsistent.
- Symptom: the consultation record lacks the receptionist's signature or the receipt column is blank, so the intake loop cannot be closed. Cause: the signature and receipt fields are not verified during the supplementary entry step.

## How to verify the setup

Acceptance of this function: run a trial for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and review by referencing `variables` and `nodeId` in subsequent nodes.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- Compare the course name, quantity, and date fields in the enrollment brochure, consultation record, and trial class schedule item by item, and mark inconsistent entries.
- Check the signature and receipt columns of the three materials, initiate follow-up questions for missing items, and record the follow-up results.
