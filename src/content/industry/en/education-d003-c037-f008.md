---
title: Workflow Orchestration for Vocational Training Subsidy Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c037-f008
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Workflows | Intake
meta_description: Training Subsidies: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Vocational Training Subsidy Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

The intake materials for vocational training subsidy applications include training class filing, attendance records, completion assessment forms, and identity and account receipts. Class filing is submitted by the training institution before the class starts, and contains the course name, start and end dates, student roster, and the signature of the person in charge; attendance records are generated per session, and contain the date, time period, and the person's own signature; the completion assessment form is created after the assessment, and contains the score, assessment date, and the assessor's signature. Materials are updated on a rolling basis by class session, and the filing, attendance, and assessment forms for the same session often arrive in separate batches, with fields mainly consisting of names, quantities, dates, and signatures. When entering the workflow for Q&A intake and missing-item follow-up, class filing is used to check the class session and student scope, attendance records are used to check attendance and dates, completion assessment forms are used to check results and signatures, and receipts are used to check account information, each playing a different comparison role.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Intake records and items to be completed" are then completed by subsequent nodes continuing execution along the branch. On trigger, the conversation enters an interaction state and records the workflow state; after the selection is completed, execution continues along the branch corresponding to the chosen option.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing | Check whether the course name, start and end dates, student roster, and signature of the person in charge are complete, and whether the dates fall within the declared class session | Check the options and branch connections one by one in the node, confirm that the missing-item option points to the follow-up branch; reference `variables` in subsequent nodes and do a trial run |
| Attendance records | Check the date, time period, and the person's own signature of each attendance entry, and whether the attendance count matches the filed roster | Trigger an interaction once, and view the node status in the run records; use `nodeId` to locate the node and check the branch direction |
| Completion assessment form | Check the score, assessment date, and assessor's signature, and whether the assessment date is later than the class start and earlier than the application date | Reference the selection result variable in a subsequent node and do a trial run once, to confirm that missing items are followed up on and that answers are based on materials |
| Intake records and items to be completed | Check whether each identified missing item is followed up on one by one, and whether the follow-up content points to specific materials and fields | Before handing off to the case handler, review the interaction state records and branch directions, and confirm that the follow-up items correspond one-to-one with the material entries |

## Three common errors

- Symptom: the same student's name and count do not match between the filed roster and the attendance records. Cause: the two materials arrive in separate batches, and the name spelling and headcount criteria have not been unified.
- Symptom: the date on the completion assessment form conflicts with the start and end dates of the class filing. Cause: versions are not synchronized, and the assessment form still uses the old class session template without being updated.
- Symptom: the attendance record or receipt lacks a signature, and after follow-up it still continues along the default branch. Cause: the options and branch connections were not checked one by one, and the process stalls after the interaction is completed.

## How to verify the setup

Acceptance of this feature: run a trial for each option, check the branch directions and interaction state in the run records, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and use `nodeId` to locate nodes and `variables` to reference variables.

Business test: submit a question that lacks key information, and see whether it first follows up and then answers.

- Check the options and branch connections one by one in the node, and confirm that the missing-item option points to the follow-up branch and the non-missing-item option points to the intake branch.
- Trigger an interaction once, view the node status and branch direction in the run records, and confirm that the same session does not enter the interaction repeatedly.
