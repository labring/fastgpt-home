---
title: Workflow Orchestration for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c050-f008
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Workflows | Intake
meta_description: Foreign Teachers: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on foreign teacher appointment and course scheduling. The materials come from three categories: appointment contracts, work permit materials, and course schedules. The appointment contract contains the position name, appointment start and end dates, and signature and receipt fields; the work permit materials contain the document name, number, validity period, and issue date; the course schedule contains the course name, number of classes, teaching dates, and instructor signature. The materials are updated according to appointment batches and the semester rhythm, and the fields are mainly names, quantities, dates, and signatures. When entering the Q&A intake and missing-item follow-up function, the appointment contract serves as the basis for the appointment relationship and signatures, the work permit materials serve as the basis for qualifications and dates, and the course schedule serves as the basis for courses and quantities. Together, the three support the generation of intake records and follow-up questions for completion.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "intake records and follow-up questions for completion" are continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether the name, dates, and signature match the work permit materials and course schedule | Compare item by item the contract position name, appointment start and end dates, signature, and receipt, and check whether they are consistent with the other two materials |
| Work permit materials | Whether the document name, number, validity period, and issue date are consistent with the contract and course schedule | Check how the document name and number are written in the contract and course schedule, and check whether the validity period and issue date match |
| Course schedule | Whether the course name, number of classes, teaching dates, and instructor signature are complete | Check the records of the course name and quantity in the two materials, and check whether the teaching dates and signature are missing |
| User selection node | Whether each option corresponds to one branch, and whether the interaction state is recorded | In the node, check the options and branch connections one by one, trigger it once and view the node status in the run record, and reference `variables` and `nodeId` in subsequent nodes for a trial run |

## Three common errors

- Symptom: The position name and number of classes for the same appointment record do not match between the contract and the course schedule. Cause: The two materials are maintained separately, no field-level comparison is performed, and the naming and quantity standards are inconsistent.
- Symptom: The work permit materials have been replaced with a new version, but the contract and course schedule still reference the old dates. Cause: The versions are not synchronized, the update rhythm is inconsistent, and the old records are not marked as invalid.
- Symptom: The course schedule is missing the instructor signature, and the appointment contract is missing the receipt. Cause: The signature and receipt steps are not closed-loop, and the signature fields are not checked item by item when the materials are collected.

## How to verify the setup

This function's acceptance: run each option one by one, check the branch direction and interaction state in the run record, and confirm that each option corresponds to one branch, the interaction state is recorded, and the selection result variable has been passed to subsequent nodes.

Business test: submit a question missing key information, see whether it asks follow-up questions before answering, and confirm that the missing items are identified and followed up on, and that the answer is based on materials.

- In the user selection node, check the options and branch connections one by one, trigger it once and then view the node status in the run record, and reference `variables` and `nodeId` in subsequent nodes for one trial run.
- Compare the appointment contract, work permit materials, and course schedule item by item for names, quantities, dates, and signatures, mark inconsistencies, and generate follow-up questions for completion.
